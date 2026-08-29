import { db, isFirebaseConfigured } from '@/lib/firebase';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';

export interface ModuleProgressRecord {
  skillId: string;
  moduleId: string;
  status: 'completed' | 'in_progress';
  completedAt?: string;
  lastAccessedAt: string;
}

export interface UserProjectRecord {
  projectId: string;
  title?: string;
  description?: string;
  category?: string;
  difficulty?: string;
  duration?: string;
  suggestedTech?: string[];
  status: 'Selected' | 'In Progress' | 'Completed';
  selectedAt: string;
  githubUrl: string | null;
  liveUrl: string | null;
  completedAt?: string | null;
  updatedAt: string;
}

export interface UserAchievementRecord {
  achievementId: string;
  achievementTitle: string;
  achievementType: string;
  earnedAt: string;
  metadata?: Record<string, any>;
}

export interface CalendarActivityRecord {
  activityDate: string; // YYYY-MM-DD
  activityType: 'module_completion' | 'daily_solve' | 'project_update';
  timestamp: string;
}

export interface UserStreakMetrics {
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  lastActivityDate: string;
  activeDates: string[];
}

export interface BackupManifest {
  formatVersion: 'levelupdev-backup-v1.0';
  appVersion: string;
  exportedAt: string;
  exportedBy: string;
  recordCounts: {
    students: number;
    skillProgress: number;
    projects: number;
    internships: number;
    achievements: number;
    calendar: number;
  };
  datasets: string[];
}

export interface DynamicBackupPackage {
  manifest: BackupManifest;
  datasets: {
    students_progress: Array<{
      user_id: string;
      email: string;
      skill: string;
      module_id: string;
      status: string;
      completed_at: string;
      last_accessed_at: string;
    }>;
    projects: Array<{
      user_id: string;
      email: string;
      project_id: string;
      title: string;
      category: string;
      status: string;
      github_url: string | null;
      live_url: string | null;
      updated_at: string;
    }>;
    internships: Array<{
      id: string;
      user_id: string;
      email: string;
      internship_id: string;
      internship_title: string;
      status: string;
      applied_at: string;
      full_name: string;
      phone: string;
      education: string;
      skills: string;
      admin_notes?: string;
    }>;
    achievements: Array<{
      user_id: string;
      email: string;
      achievement_id: string;
      achievement_title: string;
      achievement_type: string;
      earned_at: string;
    }>;
    calendar: Array<{
      user_id: string;
      email: string;
      activity_date: string;
      activity_type: string;
      timestamp: string;
    }>;
  };
}

export interface UserDynamicData {
  userId: string; // normalized stable identifier (e.g. user_swamy_levelupdev_com)
  email: string;
  progress: Record<string, Record<string, ModuleProgressRecord>>; // skillId -> moduleId -> Record
  skillsCompleted: string[];
  unlockedSkills: string[];
  projects: UserProjectRecord[];
  selectedProjectId: string | null;
  projectGithubUrl: string | null;
  projectLiveUrl: string | null;
  achievements: UserAchievementRecord[];
  calendarActivity: CalendarActivityRecord[];
  streak: UserStreakMetrics;
  lastActiveModule?: {
    skillId: string;
    moduleId: string;
    moduleTitle: string;
    updatedAt: string;
  };
  leetcodeId?: string;
  leetcodeStats?: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    lastSyncedAt?: string;
  };
  updatedAt: string;
}

export function normalizeUserId(email: string): string {
  return `user_${email.trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
}

export function createEmptyDynamicData(email: string): UserDynamicData {
  const userId = normalizeUserId(email);
  const nowIso = new Date().toISOString();

  return {
    userId,
    email: email.trim().toLowerCase(),
    progress: {},
    skillsCompleted: [],
    unlockedSkills: ['python'],
    projects: [],
    selectedProjectId: null,
    projectGithubUrl: null,
    projectLiveUrl: null,
    achievements: [],
    calendarActivity: [],
    streak: {
      currentStreak: 0,
      longestStreak: 0,
      activeDays: 0,
      lastActivityDate: '',
      activeDates: [],
    },
    updatedAt: nowIso,
  };
}

/**
 * Calculates currentStreak, longestStreak, and activeDays from activity logs.
 */
export function calculateStreakFromActivity(activities: CalendarActivityRecord[]): UserStreakMetrics {
  const uniqueDates = Array.from(new Set(activities.map((a) => a.activityDate))).filter(Boolean);
  uniqueDates.sort();

  if (uniqueDates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      activeDays: 0,
      lastActivityDate: '',
      activeDates: [],
    };
  }

  const activeDays = uniqueDates.length;
  const lastActivityDate = uniqueDates[uniqueDates.length - 1];

  // Calculate streaks
  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;
  let prevDate: Date | null = null;

  for (const dateStr of uniqueDates) {
    const currDate = new Date(dateStr);
    if (!prevDate) {
      tempStreak = 1;
    } else {
      const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    }
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
    prevDate = currDate;
  }

  // Check if current streak includes today or yesterday
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastActivityDate === todayStr || lastActivityDate === yesterdayStr) {
    currentStreak = tempStreak;
  } else {
    currentStreak = 0;
  }

  return {
    currentStreak,
    longestStreak,
    activeDays,
    lastActivityDate,
    activeDates: uniqueDates,
  };
}

/**
 * Fetch dynamic data for a user from Firestore (or LocalStorage fallback).
 */
export async function fetchUserDynamicData(email: string): Promise<UserDynamicData> {
  const cleanEmail = email.trim().toLowerCase();
  const userId = normalizeUserId(cleanEmail);
  const empty = createEmptyDynamicData(cleanEmail);

  if (isFirebaseConfigured) {
    try {
      const userRef = doc(db, 'user_activity', userId);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data() as Partial<UserDynamicData>;
        return {
          ...empty,
          ...data,
          userId,
          email: cleanEmail,
        };
      }
    } catch (err) {
      console.warn('Firestore fetch notice for user_activity:', err);
    }
  }

  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(`levelupdev_dynamic_${userId}`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return {
          ...empty,
          ...parsed,
          userId,
          email: cleanEmail,
        };
      } catch {
        return empty;
      }
    }
  }

  return empty;
}

/**
 * Save user dynamic activity data to Firestore & LocalStorage.
 */
export async function saveUserDynamicData(
  email: string,
  dynamicData: Partial<UserDynamicData>
): Promise<void> {
  const cleanEmail = email.trim().toLowerCase();
  const userId = normalizeUserId(cleanEmail);
  const nowIso = new Date().toISOString();

  const payload = {
    ...dynamicData,
    userId,
    email: cleanEmail,
    updatedAt: nowIso,
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(`levelupdev_dynamic_${userId}`, JSON.stringify(payload));
  }

  if (isFirebaseConfigured) {
    try {
      const userRef = doc(db, 'user_activity', userId);
      await setDoc(userRef, payload, { merge: true });
    } catch (err) {
      console.warn('Firestore save notice for user_activity:', err);
    }
  }
}

/**
 * Resets the entire dynamic database:
 * Purges obsolete legacy collections in Firestore and reinitializes clean dynamic records.
 */
export async function resetAllDynamicDatabase(): Promise<{ clearedUsers: number; message: string }> {
  let clearedCount = 0;

  if (isFirebaseConfigured) {
    try {
      // 1. Delete legacy 'users' collection documents
      const legacySnap = await getDocs(collection(db, 'users'));
      for (const docSnap of legacySnap.docs) {
        await deleteDoc(docSnap.ref);
        clearedCount++;
      }

      // 2. Delete all existing user_activity records
      const activitySnap = await getDocs(collection(db, 'user_activity'));
      for (const docSnap of activitySnap.docs) {
        await deleteDoc(docSnap.ref);
      }

      // 3. Delete seed internship applications
      const appsSnap = await getDocs(collection(db, 'internship_applications'));
      for (const docSnap of appsSnap.docs) {
        await deleteDoc(docSnap.ref);
      }
    } catch (err) {
      console.error('Error during Firestore database reset:', err);
    }
  }

  // Also clear localStorage dynamic caches if on client
  if (typeof window !== 'undefined') {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('levelupdev_dynamic_') || k.startsWith('levelupdev_user_') || k.startsWith('levelupdev_internship_'))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  }

  return {
    clearedUsers: clearedCount,
    message: 'Database successfully cleared. All dynamic activity reset to authentic empty state.',
  };
}
