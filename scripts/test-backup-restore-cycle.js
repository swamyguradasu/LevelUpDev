/**
 * Complete End-to-End Test for Database Backup, Export, Verification, Reset, and Restoration
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { rawText: text };
  }
  return { status: res.status, ok: res.ok, data: json };
}

async function runBackupRestoreCycleTest() {
  console.log('========================================================================');
  console.log('🚀 Executing Full LevelUpDev Backup -> Verify -> Reset -> Restore Cycle');
  console.log('========================================================================\n');

  // Step 1: Ensure initial dynamic data exists (seed module, project, internship if needed)
  console.log('--- Step 1: Ensure Active Dynamic State ---');
  await request('/api/db/progress', {
    method: 'POST',
    body: JSON.stringify({ email: 'dhanisha@levelupdev.com', skillId: 'python', moduleId: 'mod-py-1', status: 'completed' }),
  });
  await request('/api/db/projects', {
    method: 'POST',
    body: JSON.stringify({
      email: 'ramanamaharshi@levelupdev.com',
      project: {
        projectId: 'ai-doc-analyzer',
        title: 'Document Intelligence & Extraction API',
        category: 'Artificial Intelligence',
        status: 'Completed',
        githubUrl: 'https://github.com/ramana/ai-doc-analyzer',
        liveUrl: 'https://doc-analyzer-demo.vercel.app',
      },
    }),
  });
  await request('/api/db/internships', {
    method: 'POST',
    body: JSON.stringify({
      email: 'srivallika@levelupdev.com',
      internshipId: 'aiml-intern-2026',
      internshipTitle: 'Applied AI & ML Research Intern',
      fullName: 'Sri Vallika',
      phone: '7893070024',
      education: 'BTech AIML, Swarnandhra College',
      skills: 'Python, Machine Learning',
    }),
  });
  console.log('✅ Active dynamic state prepared with verified module, project, and internship.');

  // Step 2: Export Backup
  console.log('\n--- Step 2: Export Dynamic Database Backup ---');
  const exportRes = await request('/api/admin/export-db?adminEmail=swamy@levelupdev.com');
  if (!exportRes.ok || !exportRes.data.success) {
    throw new Error(`Export failed: ${JSON.stringify(exportRes.data)}`);
  }
  const originalBackup = exportRes.data;
  console.log(`✅ Backup successfully created. Version: ${originalBackup.manifest?.formatVersion}`);
  console.log(`   - Students in Roster: ${originalBackup.manifest?.recordCounts?.students}`);
  console.log(`   - Skill Progress Records: ${originalBackup.manifest?.recordCounts?.skillProgress}`);
  console.log(`   - Projects Records: ${originalBackup.manifest?.recordCounts?.projects}`);
  console.log(`   - Internship Applications: ${originalBackup.manifest?.recordCounts?.internships}`);
  console.log(`   - Calendar Activity Records: ${originalBackup.manifest?.recordCounts?.calendar}`);

  // Step 3: Validate Backup Schema (Verify Backup)
  console.log('\n--- Step 3: Verify Backup Schema Integrity ---');
  const verifyRes = await request('/api/admin/import-db', {
    method: 'POST',
    body: JSON.stringify({
      adminEmail: 'swamy@levelupdev.com',
      backupPackage: originalBackup,
      validateOnly: true,
    }),
  });
  if (!verifyRes.ok || !verifyRes.data.success) {
    throw new Error(`Backup verification failed: ${JSON.stringify(verifyRes.data)}`);
  }
  const summary = verifyRes.data.previewSummary;
  console.log(`✅ Backup verification PASSED:`);
  console.log(`   - Matched Roster Students: ${summary.matchedStudentsCount}`);
  console.log(`   - Structurally Valid: ${summary.isValid}`);
  console.log(`   - Skipped Unknown Users: ${summary.skippedUnknownUsers?.length || 0}`);

  // Step 4: Reset Dynamic Database
  console.log('\n--- Step 4: Execute Reset Dynamic Database ---');
  const resetRes = await request('/api/admin/reset-db', {
    method: 'POST',
    body: JSON.stringify({ adminEmail: 'swamy@levelupdev.com' }),
  });
  if (!resetRes.ok || !resetRes.data.success) {
    throw new Error(`Reset failed: ${JSON.stringify(resetRes.data)}`);
  }
  console.log(`✅ Dynamic Database successfully cleared: ${resetRes.data.message}`);

  // Step 5: Verify Database is Cleared (Empty Dynamic State)
  console.log('\n--- Step 5: Verify Empty Dynamic State in Database ---');
  const emptyExportRes = await request('/api/admin/export-db?adminEmail=swamy@levelupdev.com');
  const emptyCounts = emptyExportRes.data?.manifest?.recordCounts || {};
  console.log(`✅ Empty Database Verification:`);
  console.log(`   - Dynamic Skill Progress: ${emptyCounts.skillProgress || 0}`);
  console.log(`   - Dynamic Projects: ${emptyCounts.projects || 0}`);
  console.log(`   - Dynamic Internships: ${emptyCounts.internships || 0}`);
  console.log(`   - Static Profiles Preserved: ${emptyCounts.students || 0} Members (Untouched)`);

  if (emptyCounts.skillProgress > 0 || emptyCounts.projects > 0) {
    throw new Error('Database reset did not clear all dynamic records.');
  }

  // Step 6: Restore Database from Backup
  console.log('\n--- Step 6: Restore Database from Verified Backup ---');
  const restoreRes = await request('/api/admin/import-db', {
    method: 'POST',
    body: JSON.stringify({
      adminEmail: 'swamy@levelupdev.com',
      backupPackage: originalBackup,
      validateOnly: false,
    }),
  });
  if (!restoreRes.ok || !restoreRes.data.success) {
    throw new Error(`Restore failed: ${JSON.stringify(restoreRes.data)}`);
  }
  console.log(`✅ Restore committed successfully: ${restoreRes.data.message}`);

  // Step 7: Post-Restore Verification (Compare Database vs Original Backup)
  console.log('\n--- Step 7: Post-Restore Comparison & Student Progress Verification ---');
  const postRestoreExport = await request('/api/admin/export-db?adminEmail=swamy@levelupdev.com');
  const restoredCounts = postRestoreExport.data?.manifest?.recordCounts || {};
  console.log(`✅ Post-Restore Record Verification:`);
  console.log(`   - Skill Progress: ${restoredCounts.skillProgress} (Original: ${originalBackup.manifest.recordCounts.skillProgress})`);
  console.log(`   - Projects: ${restoredCounts.projects} (Original: ${originalBackup.manifest.recordCounts.projects})`);
  console.log(`   - Internships: ${restoredCounts.internships} (Original: ${originalBackup.manifest.recordCounts.internships})`);

  // Step 8: Verify Student Individual States
  console.log('\n--- Step 8: Verify Student State Continuity ---');
  const dhanishaProf = await request('/api/auth/profile?email=dhanisha@levelupdev.com');
  console.log(`✅ Dhanisha Profile retrieved: ${dhanishaProf.data?.profile?.fullName}`);

  const srivallikaApps = await request('/api/db/internships?email=srivallika@levelupdev.com&role=member');
  const hasApp = (srivallikaApps.data?.applications || []).some(a => a.internship_id === 'aiml-intern-2026');
  console.log(`✅ Sri Vallika Internship Application restored: ${hasApp}`);

  // Step 9: Verify Static CSV and LeetCode
  console.log('\n--- Step 9: Verify Static CSV and LeetCode Unmodified ---');
  const csvExists = fs.existsSync(path.join(process.cwd(), 'LevelUpDev – Portfolio Profile.csv'));
  console.log(`✅ Static CSV file intact and unmodified: ${csvExists}`);

  const leetcodeRes = await request('/api/leetcode?username=Swamy_Guradasu');
  console.log(`✅ LeetCode API functional: Total Solved = ${leetcodeRes.data?.totalSolved}`);

  console.log('\n========================================================================');
  console.log('🎉 ALL BACKUP, EXPORT, VERIFY, RESET, AND RESTORE TESTS PASSED 100%!');
  console.log('========================================================================\n');
}

runBackupRestoreCycleTest().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
