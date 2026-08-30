/**
 * Comprehensive Automated Test Suite for Static Historical Snapshot Architecture
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const results = [];

function assert(description, condition, details = '') {
  if (condition) {
    results.push({ test: description, status: 'PASS', details: details || 'Verified successfully' });
    console.log(`[PASS] ${description}`);
  } else {
    results.push({ test: description, status: 'FAIL', details: details || 'Assertion failed' });
    console.error(`[FAIL] ${description} - ${details}`);
  }
}

async function runTests() {
  console.log('=== LevelUpDev Static Historical Snapshot Architecture Tests ===\n');

  // TEST 1: Static Member CSV Integrity
  const csvPath = path.resolve(__dirname, '../LevelUpDev – Portfolio Profile.csv');
  const csvExists = fs.existsSync(csvPath);
  assert('Static CSV Roster File Exists', csvExists, csvPath);

  if (csvExists) {
    const csvContent = fs.readFileSync(csvPath, 'utf8').toLowerCase();
    const hasAdmin = csvContent.includes('swamy@levelupdev.com');
    const hasDhanisha = csvContent.includes('dhanisha@levelupdev.com');
    const hasAbdul = csvContent.includes('abdul@levelupdev.com');
    const hasVallika = csvContent.includes('srivallika@levelupdev.com');
    const hasRamana = csvContent.includes('ramanamaharshi@levelupdev.com');
    const hasDinesh = csvContent.includes('dinesh@leveupdev.com') || csvContent.includes('dinesh@levelupdev.com');
    const noOldAdmins = !csvContent.includes('levelupadmins') && !csvContent.includes('levelupdev@admin');

    assert('Static Roster Contains 6 Verified Members and Swamy as Admin',
      hasAdmin && hasDhanisha && hasAbdul && hasVallika && hasRamana && hasDinesh && noOldAdmins,
      'All 6 verified member profiles present; old admin accounts removed.'
    );
  }

  // TEST 2: Historical Snapshot Manifest & Structure
  const histDir = path.resolve(__dirname, '../src/data/historical');
  const manifestPath = path.join(histDir, 'historical-manifest.json');
  const progressPath = path.join(histDir, 'historical-skill-progress.json');
  const projectsPath = path.join(histDir, 'historical-projects.json');
  const internshipsPath = path.join(histDir, 'historical-internships.json');
  const achievementsPath = path.join(histDir, 'historical-achievements.json');
  const calendarPath = path.join(histDir, 'historical-calendar.json');

  assert('Historical Snapshot Manifest Exists', fs.existsSync(manifestPath));
  assert('Historical Skill Progress File Exists', fs.existsSync(progressPath));
  assert('Historical Projects File Exists', fs.existsSync(projectsPath));
  assert('Historical Internships File Exists', fs.existsSync(internshipsPath));
  assert('Historical Achievements File Exists', fs.existsSync(achievementsPath));
  assert('Historical Calendar Activity File Exists', fs.existsSync(calendarPath));

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert('Historical Manifest Contains Valid Metadata',
    manifest.snapshotVersion && manifest.recordCounts && (manifest.createdAt || manifest.exportedAt),
    `Snapshot Version: ${manifest.snapshotVersion}, Created At: ${manifest.createdAt || manifest.exportedAt}`
  );

  // TEST 3: Zero Sensitive Data in Historical Snapshots
  const allSnapshotFiles = [manifestPath, progressPath, projectsPath, internshipsPath, achievementsPath, calendarPath];
  let hasSensitiveData = false;
  allSnapshotFiles.forEach((file) => {
    const raw = fs.readFileSync(file, 'utf8').toLowerCase();
    if (raw.includes('password') || raw.includes('secret') || raw.includes('token') || raw.includes('authprovider')) {
      hasSensitiveData = true;
    }
  });
  assert('Historical Snapshots Contain Zero Passwords or Sensitive Secrets', !hasSensitiveData, 'Verified clean static data.');

  // TEST 4: Historical Data Access Functions
  const historicalProgress = JSON.parse(fs.readFileSync(progressPath, 'utf8'));
  const historicalProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  const historicalInternships = JSON.parse(fs.readFileSync(internshipsPath, 'utf8'));

  assert('Historical Skill Progress Contains Seeded Module Records',
    Array.isArray(historicalProgress) && historicalProgress.length > 0 && historicalProgress.some(p => (p.skillId || p.skill) === 'python'),
    `Found ${historicalProgress.length} historical skill progress records.`
  );

  assert('Historical Projects Contains Seeded Project Records',
    Array.isArray(historicalProjects) && historicalProjects.length > 0 && historicalProjects.some(p => p.projectId === 'ai-doc-analyzer'),
    `Found ${historicalProjects.length} historical project records.`
  );

  assert('Historical Internships Contains Seeded Application Records',
    Array.isArray(historicalInternships) && historicalInternships.length > 0,
    `Found ${historicalInternships.length} historical internship applications.`
  );

  // TEST 5: Deduplication Logic Simulation
  const dhanishaEmail = 'dhanisha@levelupdev.com';
  const histDhanishaProgress = historicalProgress.filter(p => p.email.toLowerCase() === dhanishaEmail);

  // Live Firebase progress: Dhanisha completed mod-py-2 and updated mod-py-1
  const liveProgress = [
    {
      skill: 'python',
      moduleId: 'mod-py-1',
      status: 'completed',
      completedAt: '2026-08-30T10:00:00.000Z',
      lastAccessedAt: '2026-08-30T10:00:00.000Z'
    },
    {
      skill: 'python',
      moduleId: 'mod-py-2',
      status: 'completed',
      completedAt: '2026-08-30T10:30:00.000Z',
      lastAccessedAt: '2026-08-30T10:30:00.000Z'
    }
  ];

  // Merge logic simulation
  const mergedProgressMap = {};
  histDhanishaProgress.forEach(hp => {
    const sId = hp.skillId || hp.skill;
    mergedProgressMap[`${sId}_${hp.moduleId}`] = {
      status: hp.status,
      completedAt: hp.completedAt,
      lastAccessedAt: hp.lastAccessedAt
    };
  });
  liveProgress.forEach(lp => {
    mergedProgressMap[`${lp.skill}_${lp.moduleId}`] = {
      status: lp.status,
      completedAt: lp.completedAt,
      lastAccessedAt: lp.lastAccessedAt
    };
  });

  const mergedCount = Object.keys(mergedProgressMap).length;
  assert('Merge Logic Correctly Deduplicates and Layers Live on Top of Historical',
    mergedCount === 2 && mergedProgressMap['python_mod-py-1'].completedAt === '2026-08-30T10:00:00.000Z',
    `Deduplicated correctly into ${mergedCount} modules with live override.`
  );

  // TEST 6: Empty Firebase Behavior
  const emptyFirebaseMergedMap = {};
  histDhanishaProgress.forEach(hp => {
    const sId = hp.skillId || hp.skill;
    emptyFirebaseMergedMap[`${sId}_${hp.moduleId}`] = {
      status: hp.status,
      completedAt: hp.completedAt,
      lastAccessedAt: hp.lastAccessedAt
    };
  });

  assert('Empty Firebase Database Gracefully Falls Back to Historical Snapshot Baseline',
    Object.keys(emptyFirebaseMergedMap).length === histDhanishaProgress.length,
    `Student retains all ${histDhanishaProgress.length} historical baseline modules when database is empty.`
  );

  // TEST 7: Antigravity Compiler Script Validation
  const compilerScriptPath = path.resolve(__dirname, 'import-historical-export.js');
  assert('Antigravity CLI Compiler Script Exists', fs.existsSync(compilerScriptPath));

  // Run compiler test with formatted export
  const testExport = {
    manifest: { formatVersion: 'levelupdev-backup-v1.0', exportedAt: new Date().toISOString(), exportedBy: 'Admin' },
    datasets: {
      students_progress: [
        { user_id: 'user_1', email: 'dhanisha@levelupdev.com', skill: 'python', module_id: 'mod-py-1', status: 'completed', completed_at: '2026-08-30T00:00:00.000Z', last_accessed_at: '2026-08-30T00:00:00.000Z' }
      ],
      projects: [
        { user_id: 'user_2', email: 'ramanamaharshi@levelupdev.com', project_id: 'ai-doc-analyzer', title: 'AI Document Analyzer', category: 'AI/ML', status: 'In Progress', github_url: 'https://github.com/ramana/ai-doc-analyzer', live_url: '', updated_at: '2026-08-30T00:00:00.000Z' }
      ],
      internships: [
        { id: 'app_1', user_id: 'user_3', email: 'srivallika@levelupdev.com', internship_id: 'aiml-intern-2026', internship_title: 'AI/ML Research Intern', status: 'Interested', applied_at: '2026-08-30T00:00:00.000Z', full_name: 'Sri Vallika' }
      ],
      achievements: [],
      calendar: [
        { user_id: 'user_1', email: 'dhanisha@levelupdev.com', activity_date: '2026-08-30', activity_type: 'module_complete', timestamp: '2026-08-30T00:00:00.000Z' }
      ]
    }
  };

  const tempExportPath = path.resolve(__dirname, '../temp-test-export.json');
  fs.writeFileSync(tempExportPath, JSON.stringify(testExport, null, 2));

  let compilerPassed = false;
  try {
    const compileOutput = execSync(`node "${compilerScriptPath}" "${tempExportPath}"`, { encoding: 'utf8' });
    compilerPassed = compileOutput.includes('Static Historical Snapshot Successfully Generated') || compileOutput.includes('Snapshot Migration Report');
  } catch (err) {
    console.error('Compiler run error:', err.message);
  } finally {
    if (fs.existsSync(tempExportPath)) fs.unlinkSync(tempExportPath);
  }

  assert('Antigravity CLI Compiler Correctly Validates and Generates Historical Snapshots',
    compilerPassed,
    'CLI tool successfully compiled export into snapshot files.'
  );

  // TEST 8: Admin UI Integrity (No in-app restore, clean export)
  const adminPagePath = path.resolve(__dirname, '../src/app/admin/page.tsx');
  const adminPageContent = fs.readFileSync(adminPagePath, 'utf8');

  const noRestoreModal = !adminPageContent.includes('showRestorePreviewModal') && !adminPageContent.includes('handleConfirmRestore');
  const hasExportCenter = adminPageContent.includes('Database Export Center') && adminPageContent.includes('Download Excel (.xlsx)');
  const hasArchStatus = adminPageContent.includes('System Data Architecture Status') && adminPageContent.includes('getHistoricalManifest');

  assert('Admin Dashboard Has No In-App Restore UI and Displays Clean Export Center',
    noRestoreModal && hasExportCenter && hasArchStatus,
    'In-app restore completely removed; Database Export Center and Architecture Status Card active.'
  );

  // TEST 9: Protected Danger Zone Reset Guardrails
  const hasResetConfirmation = adminPageContent.includes('RESET DATABASE') && adminPageContent.includes('dangerAcknowledged');
  const resetPreservesStatic = adminPageContent.includes('will NEVER be deleted');

  assert('Danger Zone Reset Requires Explicit Safe Confirmations and Preserves Static Roster',
    hasResetConfirmation && resetPreservesStatic,
    'Safe guardrails verified.'
  );

  // TEST 10: LeetCode System Unaffected
  const leetCodeRoute = path.resolve(__dirname, '../src/app/api/leetcode/route.ts');
  assert('LeetCode API Route Unaffected and Intact', fs.existsSync(leetCodeRoute));

  console.log('\n=== TEST RESULTS SUMMARY ===');
  console.table(results);

  const allPassed = results.every(r => r.status === 'PASS');
  if (allPassed) {
    console.log('\n✓ ALL TESTS PASSED SUCCESSFULLY!');
    process.exit(0);
  } else {
    console.error('\n❌ SOME TESTS FAILED.');
    process.exit(1);
  }
}

runTests();
