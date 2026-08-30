/**
 * Antigravity Historical Export Converter
 * 
 * Takes an admin-exported CSV package, Excel (.xlsx), or JSON file
 * and compiles it into static, versioned historical data snapshots in src/data/historical/.
 * 
 * Usage:
 *   node scripts/import-historical-export.js [path-to-export-file]
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Paths
const HISTORICAL_DIR = path.join(__dirname, '..', 'src', 'data', 'historical');
const CSV_ROSTER_PATH = path.join(__dirname, '..', 'LevelUpDev – Portfolio Profile.csv');

function parseStaticRosterEmails() {
  if (!fs.existsSync(CSV_ROSTER_PATH)) return new Set();
  const raw = fs.readFileSync(CSV_ROSTER_PATH, 'utf-8');
  const lines = raw.split('\n').filter(Boolean);
  const emails = new Set();

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    const email = (cols[1] || '').trim().toLowerCase();
    if (email && email.includes('@')) {
      emails.add(email);
    }
  }
  return emails;
}

function normalizeUserId(email) {
  return `user_${email.trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
}

async function convertExportToHistoricalSnapshot(exportFilePath) {
  console.log('========================================================================');
  console.log('🏛️  LevelUpDev Antigravity Historical Snapshot Compiler');
  console.log('========================================================================\n');

  let targetPath = exportFilePath;

  // Auto-discover if no path provided
  if (!targetPath) {
    const possibleFiles = fs.readdirSync(process.cwd()).filter((f) => 
      (f.startsWith('levelupdev_backup') || f.startsWith('backup_')) && 
      (f.endsWith('.json') || f.endsWith('.xlsx'))
    );
    if (possibleFiles.length > 0) {
      targetPath = path.join(process.cwd(), possibleFiles[0]);
    }
  }

  if (!targetPath || !fs.existsSync(targetPath)) {
    console.error(`❌ Export file not found. Provide a path or place a levelupdev_backup_*.json / .xlsx in the workspace.`);
    process.exit(1);
  }

  console.log(`📂 Source Export File: ${path.basename(targetPath)}`);
  const validEmails = parseStaticRosterEmails();
  console.log(`📋 Validated Static Roster Members: ${validEmails.size} accounts`);

  let datasets = {};
  let manifest = {
    snapshotVersion: '1.0.0',
    createdAt: new Date().toISOString(),
    sourceExportDate: new Date().toISOString(),
    description: 'LevelUpDev immutable historical student activity snapshot prior to Firebase quota reset',
  };

  // 1. Parse File
  if (targetPath.endsWith('.xlsx') || targetPath.endsWith('.xls')) {
    const wb = XLSX.readFile(targetPath);
    const progressRows = wb.Sheets['Skill Progress'] ? XLSX.utils.sheet_to_json(wb.Sheets['Skill Progress']) : [];
    const projectsRows = wb.Sheets['Projects'] ? XLSX.utils.sheet_to_json(wb.Sheets['Projects']) : [];
    const internshipsRows = wb.Sheets['Internships'] ? XLSX.utils.sheet_to_json(wb.Sheets['Internships']) : [];
    const achievementsRows = wb.Sheets['Achievements'] ? XLSX.utils.sheet_to_json(wb.Sheets['Achievements']) : [];
    const calendarRows = wb.Sheets['Calendar Activity'] ? XLSX.utils.sheet_to_json(wb.Sheets['Calendar Activity']) : [];

    datasets.students_progress = progressRows.map((r) => ({
      user_id: r['User ID'] || r.user_id,
      email: r['Email'] || r.email,
      skill: r['Skill'] || r.skill,
      module_id: r['Module ID'] || r.module_id,
      status: r['Status'] || r.status,
      completed_at: r['Completed At'] || r.completed_at,
      last_accessed_at: r['Last Accessed At'] || r.last_accessed_at,
    }));

    datasets.projects = projectsRows.map((r) => ({
      user_id: r['User ID'] || r.user_id,
      email: r['Email'] || r.email,
      project_id: r['Project ID'] || r.project_id,
      title: r['Title'] || r.title,
      category: r['Category'] || r.category,
      status: r['Status'] || r.status,
      github_url: r['GitHub URL'] || r.github_url,
      live_url: r['Live URL'] || r.live_url,
      updated_at: r['Updated At'] || r.updated_at,
    }));

    datasets.internships = internshipsRows.map((r) => ({
      id: r['Application ID'] || r.id,
      user_id: r['User ID'] || r.user_id,
      email: r['Email'] || r.email,
      internship_id: r['Internship ID'] || r.internship_id,
      internship_title: r['Internship Title'] || r.internship_title,
      status: r['Status'] || r.status,
      applied_at: r['Applied At'] || r.applied_at,
      full_name: r['Full Name'] || r.full_name,
      phone: r['Phone'] || r.phone || '',
      education: r['Education'] || r.education || '',
      skills: r['Skills'] || r.skills || '',
      admin_notes: r['Admin Notes'] || r.admin_notes || '',
    }));

    datasets.achievements = achievementsRows.map((r) => ({
      user_id: r['User ID'] || r.user_id,
      email: r['Email'] || r.email,
      achievement_id: r['Achievement ID'] || r.achievement_id,
      achievement_title: r['Achievement Title'] || r.achievement_title,
      achievement_type: r['Achievement Type'] || r.achievement_type,
      earned_at: r['Earned At'] || r.earned_at,
    }));

    datasets.calendar = calendarRows.map((r) => ({
      user_id: r['User ID'] || r.user_id,
      email: r['Email'] || r.email,
      activity_date: r['Activity Date'] || r.activity_date,
      activity_type: r['Activity Type'] || r.activity_type,
      timestamp: r['Timestamp'] || r.timestamp,
    }));
  } else {
    const raw = fs.readFileSync(targetPath, 'utf-8');
    const parsed = JSON.parse(raw);
    datasets = parsed.datasets || parsed;
    if (parsed.manifest?.exportedAt) {
      manifest.sourceExportDate = parsed.manifest.exportedAt;
    }
  }

  // 2. Normalize and Sanitize (Zero Sensitive Data)
  const studentsInvolved = new Set();
  const normalizedSkillProgress = [];
  const normalizedProjects = [];
  const normalizedInternships = [];
  const normalizedAchievements = [];
  const normalizedCalendar = [];
  let invalidRecords = 0;

  // Skill progress
  (datasets.students_progress || []).forEach((row) => {
    const email = String(row.email || '').trim().toLowerCase();
    if (!email || !validEmails.has(email)) {
      invalidRecords++;
      return;
    }
    studentsInvolved.add(email);
    normalizedSkillProgress.push({
      userId: normalizeUserId(email),
      email,
      skillId: String(row.skill || 'python').toLowerCase(),
      moduleId: String(row.module_id || '').trim(),
      status: row.status === 'completed' ? 'completed' : 'in_progress',
      completedAt: row.completed_at || undefined,
      lastAccessedAt: row.last_accessed_at || row.completed_at || new Date().toISOString(),
    });
  });

  // Projects
  (datasets.projects || []).forEach((row) => {
    const email = String(row.email || '').trim().toLowerCase();
    if (!email || !validEmails.has(email)) {
      invalidRecords++;
      return;
    }
    studentsInvolved.add(email);
    normalizedProjects.push({
      userId: normalizeUserId(email),
      email,
      projectId: String(row.project_id || '').trim(),
      title: row.title || row.project_id,
      category: row.category || 'General',
      status: row.status || 'Completed',
      githubUrl: (row.github_url || '').startsWith('http') ? row.github_url : null,
      liveUrl: (row.live_url || '').startsWith('http') ? row.live_url : null,
      selectedAt: row.selected_at || row.updated_at || new Date().toISOString(),
      updatedAt: row.updated_at || new Date().toISOString(),
    });
  });

  // Internships
  (datasets.internships || []).forEach((row) => {
    const email = String(row.email || '').trim().toLowerCase();
    if (!email || !validEmails.has(email)) {
      invalidRecords++;
      return;
    }
    studentsInvolved.add(email);
    normalizedInternships.push({
      id: row.id || `hist_app_${normalizeUserId(email)}_${row.internship_id}`,
      userId: normalizeUserId(email),
      email,
      internshipId: String(row.internship_id || '').trim(),
      internshipTitle: row.internship_title || row.internship_id,
      fullName: row.full_name || email,
      phone: row.phone || '',
      education: row.education || '',
      skills: row.skills || '',
      status: row.status || 'Interested',
      submittedAt: row.applied_at || row.submitted_at || new Date().toISOString(),
      adminNotes: row.admin_notes || '',
    });
  });

  // Achievements
  (datasets.achievements || []).forEach((row) => {
    const email = String(row.email || '').trim().toLowerCase();
    if (!email || !validEmails.has(email)) {
      invalidRecords++;
      return;
    }
    studentsInvolved.add(email);
    normalizedAchievements.push({
      userId: normalizeUserId(email),
      email,
      achievementId: String(row.achievement_id || '').trim(),
      achievementTitle: row.achievement_title || row.achievement_id,
      achievementType: row.achievement_type || 'Milestone',
      earnedAt: row.earned_at || new Date().toISOString(),
    });
  });

  // Calendar
  (datasets.calendar || []).forEach((row) => {
    const email = String(row.email || '').trim().toLowerCase();
    if (!email || !validEmails.has(email)) {
      invalidRecords++;
      return;
    }
    studentsInvolved.add(email);
    normalizedCalendar.push({
      userId: normalizeUserId(email),
      email,
      activityDate: String(row.activity_date || '').trim(),
      activityType: row.activity_type || 'module_completion',
      timestamp: row.timestamp || new Date().toISOString(),
    });
  });

  // 3. Write Snapshot Files
  if (!fs.existsSync(HISTORICAL_DIR)) {
    fs.mkdirSync(HISTORICAL_DIR, { recursive: true });
  }

  manifest.recordCounts = {
    students: studentsInvolved.size,
    skillProgressRecords: normalizedSkillProgress.length,
    projectRecords: normalizedProjects.length,
    internshipRecords: normalizedInternships.length,
    achievementRecords: normalizedAchievements.length,
    calendarRecords: normalizedCalendar.length,
  };

  fs.writeFileSync(path.join(HISTORICAL_DIR, 'historical-manifest.json'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(HISTORICAL_DIR, 'historical-skill-progress.json'), JSON.stringify(normalizedSkillProgress, null, 2));
  fs.writeFileSync(path.join(HISTORICAL_DIR, 'historical-projects.json'), JSON.stringify(normalizedProjects, null, 2));
  fs.writeFileSync(path.join(HISTORICAL_DIR, 'historical-internships.json'), JSON.stringify(normalizedInternships, null, 2));
  fs.writeFileSync(path.join(HISTORICAL_DIR, 'historical-achievements.json'), JSON.stringify(normalizedAchievements, null, 2));
  fs.writeFileSync(path.join(HISTORICAL_DIR, 'historical-calendar.json'), JSON.stringify(normalizedCalendar, null, 2));

  // 4. Print Report
  console.log('✅ Static Historical Snapshot Successfully Generated!\n');
  console.log('--- Snapshot Migration Report ---');
  console.log(`Students represented:  ${studentsInvolved.size}`);
  console.log(`Skill records:         ${normalizedSkillProgress.length}`);
  console.log(`Projects:              ${normalizedProjects.length}`);
  console.log(`Internship records:    ${normalizedInternships.length}`);
  console.log(`Achievements:          ${normalizedAchievements.length}`);
  console.log(`Calendar records:      ${normalizedCalendar.length}`);
  console.log(`Invalid records:       ${invalidRecords}`);
  console.log('\nDestination: src/data/historical/');
  console.log('========================================================================\n');
}

const argFile = process.argv[2];
convertExportToHistoricalSnapshot(argFile).catch((err) => {
  console.error('❌ Conversion failed:', err);
  process.exit(1);
});
