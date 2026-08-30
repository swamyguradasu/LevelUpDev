import fs from 'fs';
import path from 'path';

export interface StaticUserProfile {
  timestamp: string;
  levelupdevEmail: string;
  username: string;
  personalEmail: string;
  fullName: string;
  headline: string;
  shortBio: string;
  photoUrl: string;
  aboutMe: string;
  college: string;
  degree: string;
  registerNumber: string;
  branch: string;
  currentYear: string;
  graduationYear: string;
  city: string;
  state: string;
  country: string;
  currentRole: string;
  careerInterest: string;
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  otherUrl: string;
  contactEmail: string;
  phone: string;
  isPortfolioPublic: boolean;
  showEmailPublicly: boolean;
  showPhonePublicly: boolean;
  accuracyDeclaration: string;
  role: 'admin' | 'member';
}

/**
 * Formats raw Google Drive / cloud storage links into direct loadable image URLs.
 */
export function formatProfilePhotoUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Convert Google Drive form view/open links to direct high-res CDN URLs
  if (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com')) {
    // 1. Extract ?id=... or &id=...
    const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }

    // 2. Extract /d/...
    const dMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (dMatch && dMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${dMatch[1]}`;
    }

    // 3. Extract /file/d/...
    const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch && fileMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
    }
  }

  return trimmed;
}

/**
 * Standard CSV Parser handling quotes, commas, and multiline cells.
 */
export function parseCSV(csvContent: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < csvContent.length; i++) {
    const char = csvContent[i];
    const nextChar = csvContent[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n
      }
      currentRow.push(currentField);
      currentField = '';
      if (currentRow.length > 0 && currentRow.some((f) => f.trim().length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some((f) => f.trim().length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

const ADMIN_EMAILS = [
  'swamy@levelupdev.com',
];

/**
 * Reads and parses LevelUpDev – Portfolio Profile.csv on server.
 */
export function getStaticProfilesFromCSV(): StaticUserProfile[] {
  const possiblePaths = [
    path.join(process.cwd(), 'LevelUpDev – Portfolio Profile.csv'),
    path.join(process.cwd(), 'LevelUpDev - Portfolio Profile.csv'),
  ];

  let rawContent = '';
  for (const filePath of possiblePaths) {
    if (fs.existsSync(/* turbopackIgnore: true */ filePath)) {
      rawContent = fs.readFileSync(/* turbopackIgnore: true */ filePath, 'utf-8');
      break;
    }
  }

  if (!rawContent) {
    console.warn('LevelUpDev – Portfolio Profile.csv not found on server filesystem.');
    return [];
  }

  const rows = parseCSV(rawContent);
  if (rows.length <= 1) return [];

  // Row 0 is header
  const profiles: StaticUserProfile[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.length < 2) continue;

    const levelupdevEmail = (row[1] || '').trim().toLowerCase();
    if (!levelupdevEmail) continue;

    const isAdmin = ADMIN_EMAILS.includes(levelupdevEmail);
    const rawPhotoUrl = (row[7] || '').trim();

    const profile: StaticUserProfile = {
      timestamp: (row[0] || '').trim(),
      levelupdevEmail,
      username: (row[2] || '').trim(),
      personalEmail: (row[3] || '').trim(),
      fullName: (row[4] || '').trim(),
      headline: (row[5] || '').trim(),
      shortBio: (row[6] || '').trim(),
      photoUrl: formatProfilePhotoUrl(rawPhotoUrl),
      aboutMe: (row[8] || '').trim(),
      college: (row[9] || '').trim(),
      degree: (row[10] || '').trim(),
      registerNumber: (row[11] || '').trim(),
      branch: (row[12] || '').trim(),
      currentYear: (row[13] || '').trim(),
      graduationYear: (row[14] || '').trim(),
      city: (row[15] || '').trim(),
      state: (row[16] || '').trim(),
      country: (row[17] || '').trim(),
      currentRole: (row[18] || '').trim(),
      careerInterest: (row[19] || '').trim(),
      githubUrl: (row[20] || '').trim(),
      linkedinUrl: (row[21] || '').trim(),
      websiteUrl: (row[22] || '').trim(),
      otherUrl: (row[23] || '').trim(),
      contactEmail: (row[24] || '').trim(),
      phone: (row[25] || '').trim(),
      isPortfolioPublic: (row[26] || '').trim().toLowerCase() === 'yes',
      showEmailPublicly: (row[27] || '').trim().toLowerCase() === 'yes',
      showPhonePublicly: (row[28] || '').trim().toLowerCase() === 'yes',
      accuracyDeclaration: (row[29] || '').trim(),
      role: isAdmin ? 'admin' : 'member',
    };

    profiles.push(profile);
  }

  return profiles;
}

export function getStaticProfileByEmail(email: string): StaticUserProfile | null {
  if (!email) return null;
  const clean = email.trim().toLowerCase();
  const all = getStaticProfilesFromCSV();
  return all.find((p) => p.levelupdevEmail === clean) || null;
}

/**
 * Server-side credential validation.
 * Checks password against registration number (case-insensitive) or admin password.
 */
export function validateMemberCredentials(
  email: string,
  pass: string
): StaticUserProfile | null {
  const profile = getStaticProfileByEmail(email);
  if (!profile) return null;

  const cleanPass = pass.trim().toLowerCase();
  const expectedRegNo = profile.registerNumber.trim().toLowerCase();

  // Allow registration number as password, or admin password for admin accounts
  if (
    cleanPass === expectedRegNo ||
    (profile.role === 'admin' && (cleanPass === 'admin@2508' || cleanPass === expectedRegNo))
  ) {
    return profile;
  }

  return null;
}
