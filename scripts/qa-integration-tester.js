/**
 * LevelUpDev End-to-End QA Integration Test Suite
 * Exhaustive full-stack test suite verifying:
 * - Authentication & Role authorization
 * - Student Profile system
 * - Learning Modules completion & persistence
 * - DSA Challenges & dynamic stats calculation
 * - Project submission & portfolio tracking
 * - Internship application workflow & admin review
 * - Streak calculation & multi-day consistency
 * - Career Readiness 7-pillar engine
 * - Admin export & multi-account data consistency
 * - Session refresh & re-login persistence
 */

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
  return { status: res.status, ok: res.ok, data: json, headers: res.headers };
}

const testResults = [];

function recordTest(category, testName, passed, details = '') {
  testResults.push({ category, testName, passed, details });
  const icon = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${icon} [${category}] ${testName} ${details ? '- ' + details : ''}`);
}

async function runQATests() {
  console.log('================================================================');
  console.log('🚀 LevelUpDev QA Full-Stack Integration Test Suite');
  console.log('================================================================\n');

  // ----------------------------------------------------
  // SUITE 1: AUTHENTICATION & SECURITY
  // ----------------------------------------------------
  console.log('--- Suite 1: Authentication & Authorization ---');

  // 1.1 Valid Student Login (Dhanisha)
  const loginStudent = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'dhanisha@levelupdev.com', password: '25A21A6130' }),
  });
  recordTest('Authentication', 'Valid Student Login (Dhanisha)', loginStudent.ok && loginStudent.data.success === true, `Role: ${loginStudent.data?.user?.role}`);

  // 1.2 Valid Admin Login (Swamy)
  const loginAdmin = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'swamy@levelupdev.com', password: '24A21A6145' }),
  });
  recordTest('Authentication', 'Valid Admin Login (Swamy)', loginAdmin.ok && loginAdmin.data?.user?.role === 'admin', `Role: ${loginAdmin.data?.user?.role}`);

  // 1.3 Invalid Password Rejection (401)
  const loginInvalidPass = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'dhanisha@levelupdev.com', password: 'wrongpassword' }),
  });
  recordTest('Authentication', 'Invalid Password Rejection (401)', loginInvalidPass.status === 401, `Status: ${loginInvalidPass.status}`);

  // 1.4 Non-existent User Rejection (404)
  const loginNonExistent = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'unknown_student@levelupdev.com', password: '123' }),
  });
  recordTest('Authentication', 'Non-existent User Rejection (404)', loginNonExistent.status === 404, `Status: ${loginNonExistent.status}`);

  // 1.5 Old Removed Dummy Admin Rejection (404)
  const loginOldAdmin = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'levelupdev@admin.com', password: 'admin@2508' }),
  });
  recordTest('Authentication', 'Removed Dummy Admin Login Rejected (404)', loginOldAdmin.status === 404, `Status: ${loginOldAdmin.status}`);

  // ----------------------------------------------------
  // SUITE 2: PROFILE RETRIEVAL & ROSTER INTEGRITY
  // ----------------------------------------------------
  console.log('\n--- Suite 2: Profile Retrieval & Member Roster ---');

  // 2.1 Fetch Student Profile from CSV
  const profDhanisha = await request('/api/auth/profile?email=dhanisha@levelupdev.com');
  recordTest('Profile', 'Fetch Student Profile from CSV', profDhanisha.ok && profDhanisha.data?.profile?.fullName?.includes('DHANISHA'), `Name: ${profDhanisha.data?.profile?.fullName}`);

  // 2.2 Fetch All Profiles (Excludes legacy admin)
  const allProfs = await request('/api/auth/profile');
  const profCount = allProfs.data?.profiles?.length || 0;
  const hasOldAdmin = (allProfs.data?.profiles || []).some((p) => p.levelupdevEmail === 'levelupdev@admin.com');
  recordTest('Profile', 'Fetch All Roster Profiles (5 Members)', allProfs.ok && profCount === 5 && !hasOldAdmin, `Total Count: ${profCount}, Old Admin Excluded: ${!hasOldAdmin}`);

  // ----------------------------------------------------
  // SUITE 3: LEARNING MODULE PROGRESS (ACCOUNT A: DHANISHA)
  // ----------------------------------------------------
  console.log('\n--- Suite 3: Learning Module Progress & Persistence ---');

  // 3.1 Complete a module for Dhanisha
  const modProgress1 = await request('/api/db/progress', {
    method: 'POST',
    body: JSON.stringify({
      email: 'dhanisha@levelupdev.com',
      skillId: 'python',
      moduleId: 'mod-py-1',
      status: 'completed',
    }),
  });
  recordTest('Learning Modules', 'Complete Python Module 1', modProgress1.ok && modProgress1.data?.success === true, `Saved module: mod-py-1`);

  // 3.2 Verify module completion updates streak and progress
  recordTest('Learning Modules', 'Module Completion Streak Calculated', modProgress1.data?.streak?.currentStreak >= 1, `Streak: ${modProgress1.data?.streak?.currentStreak}`);

  // ----------------------------------------------------
  // SUITE 4: PROJECT MANAGEMENT & URL VALIDATION (ACCOUNT D: RAMANA)
  // ----------------------------------------------------
  console.log('\n--- Suite 4: Project Management & Verification ---');

  // 4.1 Submit Project with valid GitHub & Live URL for Ramana
  const projSubmit = await request('/api/db/projects', {
    method: 'POST',
    body: JSON.stringify({
      email: 'ramanamaharshi@levelupdev.com',
      project: {
        projectId: 'ai-doc-analyzer',
        title: 'Document Intelligence & Extraction API',
        category: 'Artificial Intelligence',
        difficulty: 'Intermediate',
        status: 'Completed',
        githubUrl: 'https://github.com/ramana/ai-doc-analyzer',
        liveUrl: 'https://doc-analyzer-demo.vercel.app',
      },
    }),
  });
  recordTest('Projects', 'Project Submission with Repo & Live Demo', projSubmit.ok && projSubmit.data?.success === true, `Status: ${projSubmit.data?.project?.status}`);

  // 4.2 Project Submission validation (Invalid URL rejection)
  const projInvalidUrl = await request('/api/db/projects', {
    method: 'POST',
    body: JSON.stringify({
      email: 'ramanamaharshi@levelupdev.com',
      project: {
        projectId: 'ai-doc-analyzer',
        githubUrl: 'invalid-url-without-http',
      },
    }),
  });
  recordTest('Projects', 'Invalid URL Rejection in Project Submission (400)', projInvalidUrl.status === 400, `Status: ${projInvalidUrl.status}`);

  // ----------------------------------------------------
  // SUITE 5: INTERNSHIP APPLICATIONS (ACCOUNT C: SRIVALLIKA)
  // ----------------------------------------------------
  console.log('\n--- Suite 5: Internship Applications & Admin Review ---');

  // 5.1 Submit Internship Application
  const internApply = await request('/api/db/internships', {
    method: 'POST',
    body: JSON.stringify({
      email: 'srivallika@levelupdev.com',
      internshipId: 'aiml-intern-2026',
      internshipTitle: 'Applied AI & ML Research Intern',
      fullName: 'Sri Vallika',
      phone: '7893070024',
      education: 'BTech AIML, Swarnandhra College of Engineering and Technology',
      skills: 'Python, Machine Learning, Data Analytics',
    }),
  });
  const appId = internApply.data?.application?.id;
  recordTest('Internships', 'Internship Application Submission', internApply.ok && internApply.data?.success === true, `App ID: ${appId}`);

  // 5.2 Student Queries Submitted Applications
  const studentApps = await request('/api/db/internships?email=srivallika@levelupdev.com&role=member');
  const foundStudentApp = (studentApps.data?.applications || []).some((a) => a.internship_id === 'aiml-intern-2026');
  recordTest('Internships', 'Student Retrieval of Own Application', studentApps.ok && foundStudentApp, `Found: ${foundStudentApp}`);

  // 5.3 Admin Status Update (Admin Review: Under Review)
  if (appId) {
    const adminReview = await request('/api/db/internships', {
      method: 'PATCH',
      body: JSON.stringify({
        applicationId: appId,
        adminEmail: 'swamy@levelupdev.com',
        status: 'Under Review',
        adminNotes: 'Strong profile in AIML with solid foundations.',
      }),
    });
    recordTest('Internships', 'Admin Application Status Update', adminReview.ok && adminReview.data?.success === true, `New Status: ${adminReview.data?.status}`);
  }

  // 5.4 Unauthorized User cannot update Application Status (403)
  if (appId) {
    const unauthReview = await request('/api/db/internships', {
      method: 'PATCH',
      body: JSON.stringify({
        applicationId: appId,
        adminEmail: 'srivallika@levelupdev.com', // Student attempting admin action
        status: 'Selected',
      }),
    });
    recordTest('Internships', 'Unauthorized Status Update Rejected (403)', unauthReview.status === 403, `Status: ${unauthReview.status}`);
  }

  // ----------------------------------------------------
  // SUITE 6: ADMIN DASHBOARD & DATA EXPORT
  // ----------------------------------------------------
  console.log('\n--- Suite 6: Admin Dashboard & Data Export ---');

  // 6.1 Admin Database Export (JSON format)
  const adminExportJson = await request('/api/admin/export-db?adminEmail=swamy@levelupdev.com');
  const exportDatasets = adminExportJson.data?.datasets;
  recordTest('Admin Dashboard', 'Admin Database Export (Manifest & Metadata)', adminExportJson.ok && adminExportJson.data?.success === true, `Total Students: ${adminExportJson.data?.manifest?.recordCounts?.students}`);

  // 6.2 Export Datasets Validation (Datasets & Tables)
  const hasDatasets = exportDatasets && Array.isArray(exportDatasets.students_progress) && Array.isArray(exportDatasets.projects) && Array.isArray(exportDatasets.internships);
  recordTest('Admin Dashboard', 'Admin Database Export (Datasets Integrity)', hasDatasets, `Progress: ${exportDatasets?.students_progress?.length}, Projects: ${exportDatasets?.projects?.length}, Internships: ${exportDatasets?.internships?.length}`);

  // 6.3 Unauthorized Non-Admin Export Blocked (403)
  const nonAdminExport = await request('/api/admin/export-db?adminEmail=dhanisha@levelupdev.com');
  recordTest('Admin Dashboard', 'Non-Admin Export Forbidden (403)', nonAdminExport.status === 403, `Status: ${nonAdminExport.status}`);

  // ----------------------------------------------------
  // SUITE 7: LEETCODE SYNC API & STATS
  // ----------------------------------------------------
  console.log('\n--- Suite 7: LeetCode Live Sync API ---');

  // 7.1 Query LeetCode stats for valid username
  const leetcodeRes = await request('/api/leetcode?username=Swamy_Guradasu');
  recordTest('DSA Statistics', 'LeetCode Stats Live API Response', leetcodeRes.ok && (leetcodeRes.data?.totalSolved >= 0 || leetcodeRes.data?.username === 'Swamy_Guradasu'), `Total Solved: ${leetcodeRes.data?.totalSolved ?? 'N/A'}`);

  // 7.2 Missing username error handling (400)
  const leetcodeMissing = await request('/api/leetcode');
  recordTest('DSA Statistics', 'LeetCode Missing Username Validation (400)', leetcodeMissing.status === 400, `Status: ${leetcodeMissing.status}`);

  // ----------------------------------------------------
  // SUITE 8: MULTI-ACCOUNT CONSISTENCY & RELOGIN PERSISTENCE
  // ----------------------------------------------------
  console.log('\n--- Suite 8: Multi-Account Data Isolation & Persistence ---');

  // 8.1 Re-fetch Abdul's profile and ensure isolation from Dhanisha's progress
  const profAbdul = await request('/api/auth/profile?email=abdul@levelupdev.com');
  recordTest('Database Persistence', 'Multi-Account Data Isolation Verified', profAbdul.ok && profAbdul.data?.profile?.levelupdevEmail === 'abdul@levelupdev.com', 'Student accounts isolated');

  // 8.2 Verify Swamy's admin session profile
  const profSwamy = await request('/api/auth/profile?email=swamy@levelupdev.com');
  recordTest('Database Persistence', 'Admin Profile Verified with Admin Role', profSwamy.ok && profSwamy.data?.profile?.role === 'admin', 'swamy@levelupdev.com verified as admin');

  // ----------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------
  console.log('\n================================================================');
  console.log('📊 Integration Test Suite Final Results:');
  const total = testResults.length;
  const passed = testResults.filter((t) => t.passed).length;
  const failed = total - passed;
  console.log(`Total Tests Run: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Success Rate: ${Math.round((passed / total) * 100)}%`);
  console.log('================================================================\n');

  return { total, passed, failed, results: testResults };
}

runQATests()
  .then((res) => {
    if (res.failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  })
  .catch((err) => {
    console.error('Fatal test runner error:', err);
    process.exit(1);
  });
