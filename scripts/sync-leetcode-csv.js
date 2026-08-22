const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '..', 'Developer Profile Registration.csv');
const JSON_PATH = path.join(__dirname, '..', 'content', 'registered-developers.json');
const ALLOWED_EMAILS_PATH = path.join(__dirname, '..', 'content', 'allowed-emails.json');

async function fetchLeetCodeStats(username) {
  if (!username || !username.trim()) return 0;
  const cleanUser = username.trim();
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({
        query: `
          query userProblemsSolved($username: String!) {
            matchedUser(username: $username) {
              username
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
        variables: { username: cleanUser },
      }),
    });

    if (!res.ok) {
      console.warn(`[LeetCode Sync] Warning: HTTP ${res.status} for username: ${cleanUser}`);
      return 0;
    }

    const data = await res.json();
    const acSubmissions = data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
    const allItem = acSubmissions.find((item) => item.difficulty === 'All');
    return allItem ? allItem.count : 0;
  } catch (err) {
    console.error(`[LeetCode Sync] Error fetching stats for ${cleanUser}:`, err.message);
    return 0;
  }
}

function parseCSVLine(text) {
  const result = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(cell);
      cell = '';
    } else {
      cell += char;
    }
  }
  result.push(cell);
  return result;
}

function formatCSVLine(cells) {
  return cells
    .map((c) => {
      const cellStr = c === null || c === undefined ? '' : String(c);
      if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    })
    .join(',');
}

async function runSync() {
  console.log('🔄 Syncing LeetCode solved statistics and allowed developer emails into CSV, JSON, and allowed-emails...');

  if (!fs.existsSync(CSV_PATH)) {
    console.error('❌ CSV file not found at:', CSV_PATH);
    process.exit(1);
  }

  const rawCSV = fs.readFileSync(CSV_PATH, 'utf-8');
  const lines = rawCSV.split(/\r?\n/).filter((l) => l.trim().length > 0);

  if (lines.length === 0) {
    console.error('❌ CSV file is empty.');
    process.exit(1);
  }

  const headerCells = parseCSVLine(lines[0]).map((h) => h.trim());
  
  // Find column indices
  let emailIdx = headerCells.findIndex((h) => h.toLowerCase() === 'email');
  let nameIdx = headerCells.findIndex((h) => h.toLowerCase() === 'full name' || h.toLowerCase() === 'name');
  let regNoIdx = headerCells.findIndex((h) => h.toLowerCase().includes('registration number') || h.toLowerCase() === 'regno');
  let collegeIdx = headerCells.findIndex((h) => h.toLowerCase() === 'college name' || h.toLowerCase() === 'college');
  let branchIdx = headerCells.findIndex((h) => h.toLowerCase().includes('branch'));
  let headlineIdx = headerCells.findIndex((h) => h.toLowerCase().includes('headline'));
  let bioIdx = headerCells.findIndex((h) => h.toLowerCase().includes('bio'));
  let githubIdx = headerCells.findIndex((h) => h.toLowerCase().includes('github'));
  let linkedinIdx = headerCells.findIndex((h) => h.toLowerCase().includes('linkedin'));
  let leetcodeIdIdx = headerCells.findIndex(
    (h) => h.toLowerCase() === 'leetcode id' || h.toLowerCase() === 'leetcodeid'
  );
  let solvedIdx = headerCells.findIndex(
    (h) => h.toLowerCase() === 'leetcode solved' || h.toLowerCase() === 'problems solved'
  );

  if (emailIdx === -1) emailIdx = 0;
  if (nameIdx === -1) nameIdx = 1;
  if (regNoIdx === -1) regNoIdx = 2;
  if (collegeIdx === -1) collegeIdx = 3;
  if (branchIdx === -1) branchIdx = 4;
  if (headlineIdx === -1) headlineIdx = 5;
  if (bioIdx === -1) bioIdx = 6;
  if (githubIdx === -1) githubIdx = 7;
  if (linkedinIdx === -1) linkedinIdx = 8;

  if (leetcodeIdIdx === -1) {
    headerCells.push('leetcode Id');
    leetcodeIdIdx = headerCells.length - 1;
  }

  if (solvedIdx === -1) {
    headerCells.push('LeetCode Solved');
    solvedIdx = headerCells.length - 1;
  }

  const updatedCSVLines = [formatCSVLine(headerCells)];
  const updatedJsonDevelopers = [];
  const allowedEmailsList = [];

  for (let i = 1; i < lines.length; i++) {
    const rowCells = parseCSVLine(lines[i]);
    while (rowCells.length < headerCells.length) {
      rowCells.push('');
    }

    const emailRaw = (rowCells[emailIdx] || '').trim();
    const name = (rowCells[nameIdx] || '').trim();
    const regNo = (rowCells[regNoIdx] || '').trim();
    const college = (rowCells[collegeIdx] || '').trim();
    const branch = (rowCells[branchIdx] || '').trim();
    const headline = (rowCells[headlineIdx] || '').trim();
    const bio = (rowCells[bioIdx] || '').trim();
    const githubUrl = (rowCells[githubIdx] || '').trim();
    const linkedinUrl = (rowCells[linkedinIdx] || '').trim();
    const leetcodeId = (rowCells[leetcodeIdIdx] || '').trim();
    const existingSolvedStr = (rowCells[solvedIdx] || '').trim();

    if (!name && !regNo && !emailRaw) continue;

    let solvedCount = parseInt(existingSolvedStr, 10) || 0;
    if (leetcodeId) {
      console.log(`📡 Fetching LeetCode problems solved for '${leetcodeId}'...`);
      const fetchedCount = await fetchLeetCodeStats(leetcodeId);
      if (fetchedCount > 0) solvedCount = fetchedCount;
      console.log(`   └─ Solved: ${solvedCount} problems`);
    }

    rowCells[solvedIdx] = String(solvedCount);
    updatedCSVLines.push(formatCSVLine(rowCells));

    let email = emailRaw;
    if (!email && name.toLowerCase().includes('swamy')) {
      email = 'swamy@levelupdev.com';
    } else if (!email && regNo) {
      email = `${regNo.toLowerCase()}@levelupdev.com`;
    }

    if (email) {
      const cleanEmail = email.trim().toLowerCase();
      if (!allowedEmailsList.includes(cleanEmail)) {
        allowedEmailsList.push(cleanEmail);
      }

      updatedJsonDevelopers.push({
        name: name || 'Registered Developer',
        headline: headline || 'Learning Developer',
        registerNumber: regNo,
        college: college || 'Swarnandhra College of Engineering and Technology',
        branch: branch || 'Engineering',
        bio: bio || '',
        githubUrl: githubUrl || '',
        linkedinUrl: linkedinUrl || '',
        leetcodeId: leetcodeId || '',
        leetcodeSolved: solvedCount,
        email: cleanEmail,
      });
    }
  }

  // Ensure Admin account is present
  const adminEmail = 'levelupdev@admin.com';
  if (!allowedEmailsList.includes(adminEmail)) {
    allowedEmailsList.push(adminEmail);
  }

  const hasAdminInJson = updatedJsonDevelopers.some((d) => d.email === adminEmail);
  if (!hasAdminInJson) {
    updatedJsonDevelopers.push({
      name: 'LevelUp Admin',
      headline: 'System Administrator',
      registerNumber: 'admin@2508',
      branch: 'CSE',
      bio: 'Platform Administrator',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      leetcodeId: 'LeetCode',
      leetcodeSolved: 100,
      email: adminEmail,
    });
  }

  try {
    fs.writeFileSync(CSV_PATH, updatedCSVLines.join('\n') + '\n', 'utf-8');
    console.log('✅ Updated CSV file:', CSV_PATH);
  } catch (err) {
    console.warn('⚠️ Could not overwrite CSV file (file may be open in editor):', err.message);
  }

  fs.writeFileSync(JSON_PATH, JSON.stringify(updatedJsonDevelopers, null, 2) + '\n', 'utf-8');
  console.log('✅ Updated JSON roster:', JSON_PATH);

  fs.writeFileSync(ALLOWED_EMAILS_PATH, JSON.stringify(allowedEmailsList, null, 2) + '\n', 'utf-8');
  console.log('✅ Updated allowed emails list:', ALLOWED_EMAILS_PATH);

  console.log('🎉 Sync complete!');
}

runSync();
