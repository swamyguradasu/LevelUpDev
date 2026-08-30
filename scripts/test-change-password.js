/**
 * Automated Test Suite for Custom Password Change & Authentication Workflow
 */

const { verifyUserPassword, saveUserCredential, getUserCredential } = require('../src/lib/authCredentials');
const { getStaticProfileByEmail } = require('../src/lib/csvRoster');

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
  console.log('=== LevelUpDev Change Password & Authentication Test Suite ===\n');

  const testEmail = 'dhanisha@levelupdev.com';
  const defaultRegNo = '25A21A6130';
  const newCustomPassword = 'Dhanisha@Secure2026';

  // TEST 1: Member profile exists in static CSV
  const profile = getStaticProfileByEmail(testEmail);
  assert('Student Profile Found in CSV Roster', !!profile && profile.levelupdevEmail === testEmail, `Email: ${testEmail}`);

  // TEST 2: Initial Login with Default Registration Number
  const initialAuth = await verifyUserPassword(testEmail, defaultRegNo);
  assert('Default Registration Number Login Succeeds and Flags mustPromptChange',
    initialAuth.valid && initialAuth.mustPromptChange === true && initialAuth.isCustom === false,
    'Initial login with registration number succeeded and signaled to prompt password change popup.'
  );

  // TEST 3: Save Custom Password to Database (Simulating Change Password Modal)
  const savedCred = await saveUserCredential(testEmail, newCustomPassword);
  assert('Custom Password Saved and Hashed in Database',
    savedCred && savedCred.passwordHash && savedCred.salt && savedCred.isCustom === true,
    `Salt: ${savedCred.salt.slice(0, 8)}..., Hash: ${savedCred.passwordHash.slice(0, 12)}...`
  );

  // TEST 4: Login with the NEW Custom Password
  const newPassAuth = await verifyUserPassword(testEmail, newCustomPassword);
  assert('Login with NEW Custom Password Succeeds without Prompting Change',
    newPassAuth.valid && newPassAuth.isCustom === true && newPassAuth.mustPromptChange === false,
    'Custom password login succeeded. Database enforcement active.'
  );

  // TEST 5: Old Default Registration Number is Now REJECTED
  const oldRegNoAuth = await verifyUserPassword(testEmail, defaultRegNo);
  assert('Old Default Registration Number is REJECTED after Password Change',
    oldRegNoAuth.valid === false,
    'Previous default password no longer grants access.'
  );

  // TEST 6: Wrong Password is REJECTED
  const wrongPassAuth = await verifyUserPassword(testEmail, 'WrongPassword123');
  assert('Random / Incorrect Password is REJECTED',
    wrongPassAuth.valid === false,
    'Invalid password rejected as expected.'
  );

  // TEST 7: Admin Account Password Change
  const adminEmail = 'swamy@levelupdev.com';
  const adminDefaultRegNo = '24A21A6145';
  const adminNewPass = 'SwamyAdmin#2026';

  const adminInitAuth = await verifyUserPassword(adminEmail, adminDefaultRegNo);
  assert('Admin Initial Login with Default Password Succeeds', adminInitAuth.valid);

  await saveUserCredential(adminEmail, adminNewPass);
  const adminNewAuth = await verifyUserPassword(adminEmail, adminNewPass);
  assert('Admin Login with New Custom Password Succeeds', adminNewAuth.valid && adminNewAuth.isCustom === true);

  const adminOldAuth = await verifyUserPassword(adminEmail, adminDefaultRegNo);
  assert('Admin Old Registration Number is REJECTED after Password Change', adminOldAuth.valid === false);

  // Restore Admin default password for consistency in tests if desired, or verify credential retrieval
  const retrievedCred = await getUserCredential(adminEmail);
  assert('Retrieved Credential Matches Stored Database Record',
    retrievedCred && retrievedCred.email === adminEmail && retrievedCred.isCustom === true,
    'Firestore user_auth credential validated.'
  );

  console.log('\n=== PASSWORD FEATURE TEST SUMMARY ===');
  console.table(results);

  const allPassed = results.every(r => r.status === 'PASS');
  if (allPassed) {
    console.log('\n✓ ALL PASSWORD FEATURE TESTS PASSED SUCCESSFULLY!');
    process.exit(0);
  } else {
    console.error('\n❌ SOME TESTS FAILED.');
    process.exit(1);
  }
}

runTests();
