import crypto from 'crypto';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStaticProfileByEmail, validateMemberCredentials, StaticUserProfile } from '@/lib/csvRoster';

export interface UserAuthCredential {
  email: string;
  passwordHash: string;
  salt: string;
  isCustom: boolean;
  updatedAt: string;
}

// In-memory cache fallback in case of Firestore network blips or local demo runs
const memoryCredentialsCache: Record<string, UserAuthCredential> = {};

/**
 * Generates a SHA-256 hash using a cryptographic salt.
 */
export function hashPassword(password: string, salt: string): string {
  return crypto.createHash('sha256').update(`${salt}:${password.trim()}`).digest('hex');
}

/**
 * Generates a random cryptographic salt.
 */
export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Retrieves a custom user credential document from Firestore `user_auth` collection.
 */
export async function getUserCredential(email: string): Promise<UserAuthCredential | null> {
  const cleanEmail = email.trim().toLowerCase();

  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, 'user_auth', cleanEmail);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as UserAuthCredential;
        memoryCredentialsCache[cleanEmail] = data;
        return data;
      }
    } catch (err: any) {
      console.warn('Notice: Firestore user_auth lookup fallback:', err?.code || err?.message);
    }
  }

  return memoryCredentialsCache[cleanEmail] || null;
}

/**
 * Saves a new custom password securely to Firestore `user_auth` collection.
 */
export async function saveUserCredential(
  email: string,
  newPassword: string
): Promise<UserAuthCredential> {
  const cleanEmail = email.trim().toLowerCase();
  const salt = generateSalt();
  const passwordHash = hashPassword(newPassword, salt);

  const credential: UserAuthCredential = {
    email: cleanEmail,
    passwordHash,
    salt,
    isCustom: true,
    updatedAt: new Date().toISOString(),
  };

  // Cache in memory
  memoryCredentialsCache[cleanEmail] = credential;

  // Persist in Firestore
  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, 'user_auth', cleanEmail);
      await setDoc(docRef, credential, { merge: true });
    } catch (err: any) {
      console.warn('Notice: Firestore user_auth write fallback:', err?.code || err?.message);
    }
  }

  return credential;
}

export interface VerificationResult {
  valid: boolean;
  isCustom: boolean;
  mustPromptChange: boolean;
  profile: StaticUserProfile | null;
}

/**
 * Comprehensive Password Verifier:
 * 1. Checks if a custom password exists in database (user_auth). If so, verifies against custom password.
 * 2. If no custom password exists, checks against static CSV default password (Registration Number).
 */
export async function verifyUserPassword(
  email: string,
  enteredPassword: string
): Promise<VerificationResult> {
  const cleanEmail = email.trim().toLowerCase();
  const profile = getStaticProfileByEmail(cleanEmail);

  if (!profile) {
    return {
      valid: false,
      isCustom: false,
      mustPromptChange: false,
      profile: null,
    };
  }

  const customCred = await getUserCredential(cleanEmail);

  // 1. If custom password is set in database, enforce ONLY the custom password
  if (customCred && customCred.passwordHash && customCred.salt) {
    const computedHash = hashPassword(enteredPassword, customCred.salt);
    const isValid = computedHash === customCred.passwordHash;
    return {
      valid: isValid,
      isCustom: true,
      mustPromptChange: false,
      profile: isValid ? profile : null,
    };
  }

  // 2. No custom password yet: check static registration number / admin password
  const defaultValidProfile = validateMemberCredentials(cleanEmail, enteredPassword);
  if (defaultValidProfile) {
    return {
      valid: true,
      isCustom: false,
      mustPromptChange: true, // Prompt the user to set a custom password
      profile: defaultValidProfile,
    };
  }

  return {
    valid: false,
    isCustom: false,
    mustPromptChange: false,
    profile: null,
  };
}
