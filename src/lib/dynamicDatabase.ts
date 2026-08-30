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

import {
  getHistoricalProgressForUser,
  getHistoricalProjectsForUser,
  getHistoricalAchievementsForUser,
  getHistoricalCalendarForUser,
} from '@/lib/historicalData';

/**
 * Fetch dynamic data for a user by merging static historical snapshot with live Firebase data.
 * Architecture: Historical Snapshot (Read-Only) + Live Firebase (Read/Write)
 */
export async function fetchUserDynamicData(email: string): Promise<UserDynamicData> {
  const cleanEmail = email.trim().toLowerCase();
  const userId = normalizeUserId(cleanEmail);
  const empty = createEmptyDynamicData(cleanEmail);

  // 1. Load static historical data (read-only baseline)
  const histProgress = getHistoricalProgressForUser(cleanEmail);
  const histProjects = getHistoricalProjectsForUser(cleanEmail);
  const histAchievements = getHistoricalAchievementsForUser(cleanEmail);
  const histCalendar = getHistoricalCalendarForUser(cleanEmail);

  // 2. Load dynamic Firebase data (new activity created after reset)
  let liveData: Partial<UserDynamicData> = {};

  if (isFirebaseConfigured) {
    try {
      const userRef = doc(db, 'user_activity', userId);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        liveData = snap.data() as Partial<UserDynamicData>;
      }
    } catch (err: any) {
      console.warn('Firestore fetch notice for user_activity:', err?.code || err?.message);
    }
  }

  if (Object.keys(liveData).length === 0 && typeof window !== 'undefined') {
    const raw = localStorage.getItem(`levelupdev_dynamic_${userId}`);
    if (raw) {
      try {
        liveData = JSON.parse(raw);
      } catch {
        liveData = {};
      }
    }
  }

  // 3. Merge Progress (Deep merge, Live overrides Historical)
  const mergedProgress: Record<string, Record<string, ModuleProgressRecord>> = {
    ...histProgress,
  };
  if (liveData.progress) {
    Object.keys(liveData.progress).forEach((skill) => {
      if (!mergedProgress[skill]) mergedProgress[skill] = {};
      Object.keys(liveData.progress![skill]).forEach((modId) => {
        mergedProgress[skill][modId] = liveData.progress![skill][modId];
      });
    });
  }

  // 4. Merge Projects (Deduplicated by projectId, Live overrides Historical)
  const projectMap = new Map<string, UserProjectRecord>();
  histProjects.forEach((p) => projectMap.set(p.projectId, p));
  (liveData.projects || []).forEach((p) => projectMap.set(p.projectId, p));
  const mergedProjects = Array.from(projectMap.values());

  // 5. Merge Achievements (Deduplicated by achievementId)
  const achMap = new Map<string, UserAchievementRecord>();
  histAchievements.forEach((a) => achMap.set(a.achievementId, a));
  (liveData.achievements || []).forEach((a) => achMap.set(a.achievementId, a));
  const mergedAchievements = Array.from(achMap.values());

  // 6. Merge Calendar Activity (Deduplicated by date + type)
  const calKeySet = new Set<string>();
  const mergedCalendar: CalendarActivityRecord[] = [];
  [...histCalendar, ...(liveData.calendarActivity || [])].forEach((c) => {
    const key = `${c.activityDate}_${c.activityType}`;
    if (!calKeySet.has(key)) {
      calKeySet.add(key);
      mergedCalendar.push(c);
    }
  });

  // 7. Calculate combined streak metrics from merged activity
  const mergedStreak = calculateStreakFromActivity(mergedCalendar);

  // Active selected project
  const selectedProj = mergedProjects.find((p) => p.status === 'Selected' || p.status === 'In Progress') || mergedProjects[0];

  return {
    ...empty,
    ...liveData,
    userId,
    email: cleanEmail,
    progress: mergedProgress,
    projects: mergedProjects,
    selectedProjectId: selectedProj ? selectedProj.projectId : liveData.selectedProjectId || null,
    projectGithubUrl: selectedProj ? selectedProj.githubUrl : liveData.projectGithubUrl || null,
    projectLiveUrl: selectedProj ? selectedProj.liveUrl : liveData.projectLiveUrl || null,
    achievements: mergedAchievements,
    calendarActivity: mergedCalendar,
    streak: mergedStreak,
    updatedAt: liveData.updatedAt || empty.updatedAt,
  };
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
