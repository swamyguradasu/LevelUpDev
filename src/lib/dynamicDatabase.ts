import { db, isFirebaseConfigured } from '@/lib/firebase';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';

export interface AssignmentAttemptRecord {
  attemptNumber: number;
  scorePercent: number;
  passed: boolean;
  timeTakenSeconds: number;
  date: string;
  weakTopicIds: string[];
}

export interface ModuleProgressRecord {
  skillId?: string;
  moduleId: string;
  status: 'completed' | 'in_progress';
  completedAt?: string;
  lastAccessedAt?: string;
  topicsCompleted?: string[];
  assignmentPassed?: boolean;
  assignmentScore?: number;
  assignmentAttempts?: AssignmentAttemptRecord[];
  weakTopics?: Array<{ id: string; title: string }>;
  selectedProject?: string;
  githubUrl?: string;
  demoUrl?: string;
  checklist?: Record<string, boolean>;
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

export interface DailyChallengeSubmissionRecord {
  challengeId: number;
  sequenceNumber: number;
  date: string; // YYYY-MM-DD (IST)
  completedAt: string;
  language: string;
  submittedSolution?: string;
  problemTitle?: string;
  leetcodeNumber?: number;
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
  finalChallenge?: {
    completed: boolean;
    score?: number;
    completedAt?: string;
  };
  capstone?: {
    selectedProject?: string;
    githubUrl?: string;
    demoUrl?: string;
    notes?: string;
    checklist?: Record<string, boolean>;
    submittedAt?: string;
    completed?: boolean;
  };
  dailyChallengeProgress?: Record<string, DailyChallengeSubmissionRecord>; // date -> Submission
  dailyChallengeCompletedIds?: number[];
  updatedAt: string;
}

// In-Memory Fast Cache
const _inMemoryCache = new Map<string, { data: UserDynamicData; timestamp: number }>();
const CACHE_TTL_MS = 30000; // 30 seconds

// Safe Timeout wrapper for async network calls
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
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
    dailyChallengeProgress: {},
    dailyChallengeCompletedIds: [],
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

  // Check if current streak includes today or yesterday (evaluating in IST and UTC)
  const now = new Date();
  let todayStr = now.toISOString().split('T')[0];
  let yesterdayStr = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  try {
    todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
    yesterdayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(
      new Date(now.getTime() - 24 * 60 * 60 * 1000)
    );
  } catch {}

  const utcTodayStr = now.toISOString().split('T')[0];

  if (
    lastActivityDate === todayStr ||
    lastActivityDate === yesterdayStr ||
    lastActivityDate === utcTodayStr
  ) {
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

import {
  getHistoricalProgressForUser,
  getHistoricalProjectsForUser,
  getHistoricalAchievementsForUser,
  getHistoricalCalendarForUser,
} from '@/lib/historicalData';

/**
 * Intelligent Deep Merge for Progress Objects (Lossless, Anti-Overwrite)
 */
function mergeProgressMaps(
  primary: Record<string, Record<string, ModuleProgressRecord>> | undefined,
  secondary: Record<string, Record<string, ModuleProgressRecord>> | undefined
): Record<string, Record<string, ModuleProgressRecord>> {
  const result: Record<string, Record<string, ModuleProgressRecord>> = {};

  const allSkills = Array.from(
    new Set([...Object.keys(primary || {}), ...Object.keys(secondary || {})])
  );

  for (const skill of allSkills) {
    result[skill] = {};
    const pSkill = primary?.[skill] || {};
    const sSkill = secondary?.[skill] || {};
    const allMods = Array.from(new Set([...Object.keys(pSkill), ...Object.keys(sSkill)]));

    for (const modId of allMods) {
      const pMod = pSkill[modId];
      const sMod = sSkill[modId];

      if (pMod && sMod) {
        // Union of completed topics
        const mergedTopics = Array.from(
          new Set([...(pMod.topicsCompleted || []), ...(sMod.topicsCompleted || [])])
        );

        // Combined attempts deduplicated
        const attemptsMap = new Map<number, AssignmentAttemptRecord>();
        (sMod.assignmentAttempts || []).forEach((a) => attemptsMap.set(a.attemptNumber, a));
        (pMod.assignmentAttempts || []).forEach((a) => attemptsMap.set(a.attemptNumber, a));
        const mergedAttempts = Array.from(attemptsMap.values()).sort(
          (a, b) => a.attemptNumber - b.attemptNumber
        );

        const isPassed = Boolean(pMod.assignmentPassed || sMod.assignmentPassed);
        const bestScore = Math.max(pMod.assignmentScore || 0, sMod.assignmentScore || 0);

        result[skill][modId] = {
          ...sMod,
          ...pMod,
          moduleId: modId,
          skillId: skill,
          topicsCompleted: mergedTopics,
          assignmentPassed: isPassed,
          assignmentScore: bestScore > 0 ? bestScore : undefined,
          assignmentAttempts: mergedAttempts.length > 0 ? mergedAttempts : undefined,
          status: isPassed || pMod.status === 'completed' || sMod.status === 'completed' ? 'completed' : 'in_progress',
          lastAccessedAt: pMod.lastAccessedAt || sMod.lastAccessedAt || new Date().toISOString(),
          completedAt: pMod.completedAt || sMod.completedAt,
        };
      } else if (pMod) {
        result[skill][modId] = { ...pMod };
      } else if (sMod) {
        result[skill][modId] = { ...sMod };
      }
    }
  }

  return result;
}

/**
 * Fetch dynamic data for a user with instant local caching and safe Firestore synchronization.
 */
export async function fetchUserDynamicData(email: string): Promise<UserDynamicData> {
  const cleanEmail = email.trim().toLowerCase();
  const userId = normalizeUserId(cleanEmail);
  const empty = createEmptyDynamicData(cleanEmail);

  // 1. Check in-memory cache first for instant sub-millisecond response
  const cached = _inMemoryCache.get(userId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // 2. Load static historical data (read-only baseline)
  const histProgress = getHistoricalProgressForUser(cleanEmail);
  const histProjects = getHistoricalProjectsForUser(cleanEmail);
  const histAchievements = getHistoricalAchievementsForUser(cleanEmail);
  const histCalendar = getHistoricalCalendarForUser(cleanEmail);

  // 3. Load client-side localStorage dynamic data
  let localCacheData: Partial<UserDynamicData> = {};
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(`levelupdev_dynamic_${userId}`);
      if (raw) {
        localCacheData = JSON.parse(raw);
      }
    } catch {}
  }

  // 4. Load Firestore data with a 3.0s timeout safeguard
  let firestoreData: Partial<UserDynamicData> = {};
  if (isFirebaseConfigured) {
    try {
      const userRef = doc(db, 'user_activity', userId);
      const snap = await withTimeout(getDoc(userRef), 3000, null as any);
      if (snap && snap.exists()) {
        firestoreData = snap.data() as Partial<UserDynamicData>;
      }
    } catch (err: any) {
      console.warn('Firestore fetch notice for user_activity:', err?.code || err?.message);
    }
  }

  // 5. Intelligent Deep Merge: Local Cache + Firestore + Historical
  const liveMergedProgress = mergeProgressMaps(localCacheData.progress, firestoreData.progress);
  const fullMergedProgress = mergeProgressMaps(liveMergedProgress, histProgress);

  // 6. Merge Projects (Deduplicated by projectId, Live overrides Historical)
  const projectMap = new Map<string, UserProjectRecord>();
  histProjects.forEach((p) => projectMap.set(p.projectId, p));
  (firestoreData.projects || []).forEach((p) => projectMap.set(p.projectId, p));
  (localCacheData.projects || []).forEach((p) => projectMap.set(p.projectId, p));
  const mergedProjects = Array.from(projectMap.values());

  // 7. Merge Achievements
  const achMap = new Map<string, UserAchievementRecord>();
  histAchievements.forEach((a) => achMap.set(a.achievementId, a));
  (firestoreData.achievements || []).forEach((a) => achMap.set(a.achievementId, a));
  (localCacheData.achievements || []).forEach((a) => achMap.set(a.achievementId, a));
  const mergedAchievements = Array.from(achMap.values());

  // 8. Merge Calendar Activity
  const calKeySet = new Set<string>();
  const mergedCalendar: CalendarActivityRecord[] = [];
  [
    ...histCalendar,
    ...(firestoreData.calendarActivity || []),
    ...(localCacheData.calendarActivity || []),
  ].forEach((c) => {
    const key = `${c.activityDate}_${c.activityType}`;
    if (!calKeySet.has(key)) {
      calKeySet.add(key);
      mergedCalendar.push(c);
    }
  });

  const mergedStreak = calculateStreakFromActivity(mergedCalendar);
  const selectedProj =
    mergedProjects.find((p) => p.status === 'Selected' || p.status === 'In Progress') ||
    mergedProjects[0];

  const finalMerged: UserDynamicData = {
    ...empty,
    ...firestoreData,
    ...localCacheData,
    userId,
    email: cleanEmail,
    progress: fullMergedProgress,
    projects: mergedProjects,
    selectedProjectId: selectedProj ? selectedProj.projectId : localCacheData.selectedProjectId || firestoreData.selectedProjectId || null,
    projectGithubUrl: selectedProj ? selectedProj.githubUrl : localCacheData.projectGithubUrl || firestoreData.projectGithubUrl || null,
    projectLiveUrl: selectedProj ? selectedProj.liveUrl : localCacheData.projectLiveUrl || firestoreData.projectLiveUrl || null,
    achievements: mergedAchievements,
    calendarActivity: mergedCalendar,
    streak: mergedStreak,
    capstone: localCacheData.capstone || firestoreData.capstone || undefined,
    finalChallenge: localCacheData.finalChallenge || firestoreData.finalChallenge || undefined,
    updatedAt: localCacheData.updatedAt || firestoreData.updatedAt || empty.updatedAt,
  };

  // Update in-memory cache
  _inMemoryCache.set(userId, { data: finalMerged, timestamp: Date.now() });

  // Update localStorage cache
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`levelupdev_dynamic_${userId}`, JSON.stringify(finalMerged));
    } catch {}
  }

  return finalMerged;
}

/**
 * Save user dynamic activity data with immediate local write & reliable Firestore background sync.
 */
export async function saveUserDynamicData(
  email: string,
  dynamicData: Partial<UserDynamicData>
): Promise<void> {
  const cleanEmail = email.trim().toLowerCase();
  const userId = normalizeUserId(cleanEmail);
  const nowIso = new Date().toISOString();

  // 1. Get current local state
  let existingLocal: Partial<UserDynamicData> = {};
  const inMem = _inMemoryCache.get(userId);
  if (inMem) {
    existingLocal = inMem.data;
  } else if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(`levelupdev_dynamic_${userId}`);
      if (raw) {
        existingLocal = JSON.parse(raw);
      }
    } catch {}
  }

  // 2. Perform deep merge of progress maps
  const mergedProgress = mergeProgressMaps(dynamicData.progress, existingLocal.progress);

  const payload: UserDynamicData = {
    ...createEmptyDynamicData(cleanEmail),
    ...existingLocal,
    ...dynamicData,
    progress: mergedProgress,
    userId,
    email: cleanEmail,
    capstone: dynamicData.capstone || existingLocal.capstone,
    finalChallenge: dynamicData.finalChallenge || existingLocal.finalChallenge,
    updatedAt: nowIso,
  };

  // 3. Immediately store in in-memory cache
  _inMemoryCache.set(userId, { data: payload, timestamp: Date.now() });

  // 4. Immediately write to localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`levelupdev_dynamic_${userId}`, JSON.stringify(payload));
      // Notify all active React components in window of instant state update
      window.dispatchEvent(
        new CustomEvent('levelupdev:dynamic_update', {
          detail: { email: cleanEmail, userId, data: payload },
        })
      );
    } catch {}
  }

  // 5. Asynchronously persist to Firestore with timeout guard
  if (isFirebaseConfigured) {
    try {
      const userRef = doc(db, 'user_activity', userId);
      await withTimeout(setDoc(userRef, payload, { merge: true }), 4000, null);
    } catch (err: any) {
      console.warn('Firestore save notice for user_activity:', err?.code || err?.message);
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
    } catch (err: any) {
      console.warn('Firestore database reset notice:', err?.code || err?.message);
    }
  }

  // Clear in-memory cache
  _inMemoryCache.clear();

  // Also clear localStorage dynamic caches if on client
  if (typeof window !== 'undefined') {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (
        k &&
        (k.startsWith('levelupdev_dynamic_') ||
          k.startsWith('levelupdev_user_') ||
          k.startsWith('levelupdev_internship_'))
      ) {
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
