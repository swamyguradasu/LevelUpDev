'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { getSkillById, isEmailAllowed } from '@/lib/content';
import { getRosterUserByEmail, validateRosterCredentials, RosterDeveloper } from '@/lib/roster';

export interface UserStreak {
  currentStreak: number;
  lastSolvedDate: string;
  solvedDates: string[];
}

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  lastSyncedAt?: string;
}

export interface UserProfileData {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
  bio: string;
  headline?: string;
  college?: string;
  branch?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  leetcodeId?: string;
  leetcodeStats?: LeetCodeStats;
  joinedDate?: string;
  selectedProjectId?: string | null;
  projectGithubUrl?: string | null;
  projectLiveUrl?: string | null;
  lastActiveModule?: {
    skillId: string;
    moduleId: string;
    moduleTitle: string;
    updatedAt: string;
  };
  skillsCompleted: string[];
  progress: Record<string, Record<string, boolean>>;
  unlockedSkills: string[];
  streak: UserStreak;
}

interface AuthContextType {
  user: null;
  userData: UserProfileData | null;
  loading: boolean;
  isDemoMode: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  demoLogin: () => void;
  updateProfile: (
    updates: Partial<
      Pick<
        UserProfileData,
        | 'name'
        | 'photoUrl'
        | 'bio'
        | 'headline'
        | 'college'
        | 'branch'
        | 'githubUrl'
        | 'linkedinUrl'
        | 'leetcodeId'
      >
    >
  ) => Promise<void>;
  updateUserProject: (
    projectId: string | null,
    githubUrl?: string | null,
    liveUrl?: string | null
  ) => Promise<void>;
  toggleModuleProgress: (skillId: string, moduleId: string, forceState?: boolean) => Promise<void>;
  unlockSkill: (skillId: string) => Promise<void>;
  recordDailySolve: (targetDate?: string) => Promise<void>;
  syncLeetCodeStats: (username?: string) => Promise<void>;
}

export function mapFirebaseError(err: any): string {
  return err?.message || 'An unexpected error occurred. Please try again.';
}

export function getFirestoreDocId(email: string): string {
  return email.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
}

export const DUMMY_DEMO_USER: UserProfileData = {
  uid: 'demo-preview-dummy-user',
  name: 'Alex Rivera (Demo Preview)',
  email: 'demo@levelupdev.preview',
  photoUrl: '',
  headline: 'Full-Stack & AI Systems Enthusiast • Platform Explorer',
  college: 'National Institute of Technology • LevelUpDev Cohort',
  branch: 'Computer Science & Engineering',
  bio: 'Explore LevelUpDev in read-only Demo Mode. This profile demonstrates unlocked verified skill cards, production projects, collectible achievement badges, and credentials without affecting real database accounts.',
  githubUrl: 'https://github.com/alexrivera-demo',
  linkedinUrl: 'https://linkedin.com/in/alexrivera-demo',
  leetcodeId: 'Alex_Rivera_Dev',
  leetcodeStats: {
    totalSolved: 128,
    easySolved: 72,
    mediumSolved: 48,
    hardSolved: 8,
    lastSyncedAt: new Date().toISOString(),
  },
  joinedDate: '2024-01-15T00:00:00.000Z',
  skillsCompleted: ['python', 'sql'],
  progress: {
    python: {
      'mod-py-1': true,
      'mod-py-2': true,
      'mod-py-3': true,
      'mod-py-4': true,
      'mod-py-5': true,
      'mod-py-6': true,
      'mod-py-7': true,
    },
    sql: {
      'mod-sql-1': true,
      'mod-sql-2': true,
      'mod-sql-3': true,
      'mod-sql-4': true,
      'mod-sql-5': true,
    },
  },
  unlockedSkills: ['python', 'sql', 'machine-learning', 'docker'],
  streak: {
    currentStreak: 14,
    lastSolvedDate: new Date().toISOString().split('T')[0],
    solvedDates: [
      new Date().toISOString().split('T')[0],
      new Date(Date.now() - 86400000).toISOString().split('T')[0],
      new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
      new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
      new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0],
      new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
      new Date(Date.now() - 86400000 * 6).toISOString().split('T')[0],
    ],
  },
  selectedProjectId: 'task-queue',
  projectGithubUrl: 'https://github.com/alexrivera-demo/distributed-task-queue',
  projectLiveUrl: 'https://taskqueue-demo.levelupdev.app',
  lastActiveModule: {
    skillId: 'python',
    moduleId: 'mod-py-7',
    moduleTitle: 'Python Mastery: Advanced Asynchronous Services',
    updatedAt: new Date().toISOString(),
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  // Load active session on mount
  useEffect(() => {
    async function loadActiveSession() {
      const isDemo = sessionStorage.getItem('levelupdev_is_demo_mode') === 'true';
      const activeEmail = localStorage.getItem('levelupdev_active_email');

      if (isDemo || activeEmail === 'demo@levelupdev.preview') {
        setIsDemoMode(true);
        setUserData(DUMMY_DEMO_USER);
        setLoading(false);
        return;
      }

      if (!activeEmail) {
        setLoading(false);
        return;
      }

      const rosterUser = getRosterUserByEmail(activeEmail);
      if (!rosterUser) {
        localStorage.removeItem('levelupdev_active_email');
        setLoading(false);
        return;
      }

      const docId = getFirestoreDocId(activeEmail);
      let profile: UserProfileData | null = null;

      if (isFirebaseConfigured) {
        try {
          const userRef = doc(db, 'users', docId);
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            const data = snap.data() as Partial<UserProfileData>;
            profile = buildMergedProfile(rosterUser, data);
          }
        } catch (err: any) {
          if (err?.code === 'permission-denied') {
            console.info('Firestore rules in Firebase Console require publishing for unauthenticated roster reads.');
          } else {
            console.warn('Firestore read notice:', err?.message || err);
          }
        }
      }

      if (!profile) {
        const savedLocal = localStorage.getItem(`levelupdev_user_${docId}`);
        if (savedLocal) {
          try {
            profile = buildMergedProfile(rosterUser, JSON.parse(savedLocal));
          } catch {
            profile = buildInitialRosterProfile(rosterUser);
          }
        } else {
          profile = buildInitialRosterProfile(rosterUser);
        }
      }

      setUserData(profile);
      setLoading(false);
    }

    loadActiveSession();
  }, []);

  function buildInitialRosterProfile(rosterUser: RosterDeveloper): UserProfileData {
    const nowIso = new Date().toISOString();
    const hasLeetcode = rosterUser.leetcodeId && rosterUser.leetcodeId.trim().length > 0;
    return {
      uid: `user-${rosterUser.registerNumber}`,
      name: rosterUser.name,
      email: rosterUser.email,
      photoUrl: '',
      headline: rosterUser.headline || 'Learning Developer',
      college: rosterUser.college || 'Swarnandhra College of Engineering and Technology',
      branch: rosterUser.branch || 'AIML',
      bio: rosterUser.bio || '',
      githubUrl: rosterUser.githubUrl || '',
      linkedinUrl: rosterUser.linkedinUrl || '',
      leetcodeId: hasLeetcode ? rosterUser.leetcodeId : '',
      leetcodeStats: hasLeetcode && rosterUser.leetcodeSolved !== undefined
        ? {
            totalSolved: rosterUser.leetcodeSolved,
            easySolved: Math.round(rosterUser.leetcodeSolved * 0.6),
            mediumSolved: Math.round(rosterUser.leetcodeSolved * 0.3),
            hardSolved: Math.round(rosterUser.leetcodeSolved * 0.1),
            lastSyncedAt: nowIso,
          }
        : undefined,
      joinedDate: nowIso,
      skillsCompleted: [],
      progress: {},
      unlockedSkills: ['python'],
      streak: {
        currentStreak: 0,
        lastSolvedDate: '',
        solvedDates: [],
      },
      selectedProjectId: null,
      projectGithubUrl: null,
      projectLiveUrl: null,
    };
  }

  function buildMergedProfile(
    rosterUser: RosterDeveloper,
    storedData: Partial<UserProfileData>
  ): UserProfileData {
    const initial = buildInitialRosterProfile(rosterUser);
    const hasRosterLeetcode = rosterUser.leetcodeId && rosterUser.leetcodeId.trim().length > 0;

    const finalLeetcodeId = hasRosterLeetcode
      ? (storedData.leetcodeId !== undefined ? storedData.leetcodeId : rosterUser.leetcodeId)
      : '';

    const finalLeetcodeStats = hasRosterLeetcode
      ? (storedData.leetcodeStats || initial.leetcodeStats)
      : undefined;

    return {
      ...initial,
      photoUrl: storedData.photoUrl !== undefined ? storedData.photoUrl : initial.photoUrl,
      headline: storedData.headline || rosterUser.headline || initial.headline,
      bio: storedData.bio || rosterUser.bio || initial.bio,
      branch: storedData.branch || rosterUser.branch || initial.branch,
      college: storedData.college || rosterUser.college || initial.college,
      githubUrl: storedData.githubUrl || rosterUser.githubUrl || initial.githubUrl,
      linkedinUrl: storedData.linkedinUrl || rosterUser.linkedinUrl || initial.linkedinUrl,
      leetcodeId: finalLeetcodeId,
      leetcodeStats: finalLeetcodeStats,
      skillsCompleted: storedData.skillsCompleted || initial.skillsCompleted,
      progress: storedData.progress || initial.progress,
      unlockedSkills: storedData.unlockedSkills || initial.unlockedSkills,
      streak: storedData.streak || initial.streak,
      selectedProjectId: storedData.selectedProjectId !== undefined ? storedData.selectedProjectId : initial.selectedProjectId,
      projectGithubUrl: storedData.projectGithubUrl !== undefined ? storedData.projectGithubUrl : initial.projectGithubUrl,
      projectLiveUrl: storedData.projectLiveUrl !== undefined ? storedData.projectLiveUrl : initial.projectLiveUrl,
      lastActiveModule: storedData.lastActiveModule || initial.lastActiveModule,
    };
  }

  const login = async (email: string, pass: string) => {
    // 1. Check Roster existence
    const rosterUser = getRosterUserByEmail(email);
    if (!rosterUser) {
      throw new Error('Email address is not in the Developer Registration roster.');
    }

    // 2. Validate Password against Registration Number
    const validUser = validateRosterCredentials(email, pass);
    if (!validUser) {
      throw new Error('Invalid password. Please use your Registration Number as password.');
    }

    setLoading(true);
    const docId = getFirestoreDocId(email);
    let profile: UserProfileData | null = null;

    if (isFirebaseConfigured) {
      try {
        const userRef = doc(db, 'users', docId);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          profile = buildMergedProfile(rosterUser, snap.data() as Partial<UserProfileData>);
        } else {
          profile = buildInitialRosterProfile(rosterUser);
          await setDoc(userRef, {
            ...profile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err: any) {
        if (err?.code === 'permission-denied') {
          console.info('Firestore rules in Firebase Console require publishing for unauthenticated roster writes.');
        } else {
          console.warn('Firestore user fetch notice:', err?.message || err);
        }
      }
    }

    if (!profile) {
      const savedLocal = localStorage.getItem(`levelupdev_user_${docId}`);
      if (savedLocal) {
        try {
          profile = buildMergedProfile(rosterUser, JSON.parse(savedLocal));
        } catch {
          profile = buildInitialRosterProfile(rosterUser);
        }
      } else {
        profile = buildInitialRosterProfile(rosterUser);
      }
    }

    localStorage.setItem('levelupdev_active_email', email.trim().toLowerCase());
    setUserData(profile);
    setLoading(false);
  };

  const signup = async (name: string, email: string, pass: string) => {
    throw new Error('Self-registration is disabled. Log in with your registered Email and Registration Number.');
  };

  const logout = async () => {
    setLoading(true);
    setIsDemoMode(false);
    sessionStorage.removeItem('levelupdev_is_demo_mode');
    localStorage.removeItem('levelupdev_active_email');
    setUserData(null);
    setLoading(false);
  };

  const demoLogin = () => {
    setIsDemoMode(true);
    sessionStorage.setItem('levelupdev_is_demo_mode', 'true');
    localStorage.setItem('levelupdev_active_email', 'demo@levelupdev.preview');
    setUserData(DUMMY_DEMO_USER);
  };

  const saveToStore = async (updated: UserProfileData, patch: Partial<UserProfileData>) => {
    // If in demo preview mode or dummy user, DO NOT write to database or persistent storage!
    if (isDemoMode || updated.email === 'demo@levelupdev.preview') {
      return;
    }

    const docId = getFirestoreDocId(updated.email);
    localStorage.setItem(`levelupdev_user_${docId}`, JSON.stringify(updated));

    if (isFirebaseConfigured) {
      try {
        const userRef = doc(db, 'users', docId);
        await setDoc(
          userRef,
          {
            ...patch,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err) {
        console.warn('Firestore setDoc failed:', err);
      }
    }
  };

  // Targeted Profile Edits (includes photoUrl upload)
  const updateProfile = async (
    updates: Partial<
      Pick<
        UserProfileData,
        | 'name'
        | 'photoUrl'
        | 'bio'
        | 'headline'
        | 'college'
        | 'branch'
        | 'githubUrl'
        | 'linkedinUrl'
        | 'leetcodeId'
      >
    >
  ) => {
    if (!userData) return;
    const updated: UserProfileData = { ...userData, ...updates };
    setUserData(updated);
    await saveToStore(updated, updates);

    if (updates.leetcodeId && updates.leetcodeId !== userData.leetcodeId) {
      syncLeetCodeStats(updates.leetcodeId);
    }
  };

  const updateUserProject = async (
    projectId: string | null,
    githubUrl?: string | null,
    liveUrl?: string | null
  ) => {
    if (!userData) return;
    const patch = {
      selectedProjectId: projectId,
      projectGithubUrl: githubUrl !== undefined ? githubUrl : userData.projectGithubUrl,
      projectLiveUrl: liveUrl !== undefined ? liveUrl : userData.projectLiveUrl,
    };
    const updated: UserProfileData = {
      ...userData,
      ...patch,
    };
    setUserData(updated);
    await saveToStore(updated, patch);
  };

  const toggleModuleProgress = async (skillId: string, moduleId: string, forceState?: boolean) => {
    if (!userData) return;
    const normSkillId = skillId.toLowerCase();
    const currentSkillProgress = { ...(userData.progress[normSkillId] || {}) };
    
    const newState = forceState !== undefined ? forceState : !currentSkillProgress[moduleId];
    currentSkillProgress[moduleId] = newState;

    const updatedProgress = {
      ...userData.progress,
      [normSkillId]: currentSkillProgress,
    };

    const unlocked = Array.from(new Set([...(userData.unlockedSkills || ['python']), normSkillId]));

    const skillDef = getSkillById(normSkillId);
    let updatedSkillsCompleted = [...(userData.skillsCompleted || [])];
    let isFullyCompleted = false;

    if (skillDef && skillDef.modules.length > 0) {
      isFullyCompleted = skillDef.modules.every(
        (m) => currentSkillProgress[m.moduleId] === true
      );

      if (isFullyCompleted) {
        if (!updatedSkillsCompleted.includes(normSkillId)) {
          updatedSkillsCompleted.push(normSkillId);
        }
      } else {
        updatedSkillsCompleted = updatedSkillsCompleted.filter((s) => s !== normSkillId);
      }
    }

    const modDef = skillDef?.modules.find((m) => m.moduleId === moduleId);
    const lastActiveModule = {
      skillId: normSkillId,
      moduleId,
      moduleTitle: modDef ? `${skillDef?.title || normSkillId}: ${modDef.title}` : `${skillDef?.title || normSkillId}`,
      updatedAt: new Date().toISOString(),
    };

    const patch = {
      progress: updatedProgress,
      unlockedSkills: unlocked,
      skillsCompleted: updatedSkillsCompleted,
      lastActiveModule,
    };

    const updatedUserData: UserProfileData = {
      ...userData,
      ...patch,
    };

    setUserData(updatedUserData);
    await saveToStore(updatedUserData, patch);
  };

  const unlockSkill = async (skillId: string) => {
    if (!userData) return;
    const normSkillId = skillId.toLowerCase();
    if (userData.unlockedSkills?.includes(normSkillId)) return;

    const unlocked = [...(userData.unlockedSkills || ['python']), normSkillId];
    const patch = { unlockedSkills: unlocked };
    const updatedUserData = {
      ...userData,
      ...patch,
    };

    setUserData(updatedUserData);
    await saveToStore(updatedUserData, patch);
  };

  const recordDailySolve = async (targetDate?: string) => {
    if (!userData) return;

    const todayDate = new Date();
    const todayStr = targetDate || todayDate.toISOString().split('T')[0];

    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(todayDate.getDate() - 1);
    const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

    const currentSolvedDates = userData.streak?.solvedDates || [];
    let updatedSolvedDates = [...currentSolvedDates];

    if (!updatedSolvedDates.includes(todayStr)) {
      updatedSolvedDates.push(todayStr);
    }

    let newStreak = userData.streak?.currentStreak || 0;
    if (!currentSolvedDates.includes(todayStr)) {
      if (currentSolvedDates.includes(yesterdayStr)) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    }

    const updatedStreak: UserStreak = {
      currentStreak: newStreak,
      lastSolvedDate: todayStr,
      solvedDates: updatedSolvedDates,
    };

    const patch = { streak: updatedStreak };
    const updatedUserData: UserProfileData = {
      ...userData,
      ...patch,
    };

    setUserData(updatedUserData);
    await saveToStore(updatedUserData, patch);
  };

  const syncLeetCodeStats = async (usernameOverride?: string) => {
    const targetUsername = usernameOverride || userData?.leetcodeId;
    if (!targetUsername) return;

    try {
      const res = await fetch(`/api/leetcode?username=${encodeURIComponent(targetUsername)}`);
      const data = await res.json();
      if (data.success && userData) {
        const stats: LeetCodeStats = {
          totalSolved: data.totalSolved,
          easySolved: data.easySolved,
          mediumSolved: data.mediumSolved,
          hardSolved: data.hardSolved,
          lastSyncedAt: data.lastSyncedAt,
        };

        const patch = {
          leetcodeId: targetUsername,
          leetcodeStats: stats,
        };

        const updated: UserProfileData = {
          ...userData,
          ...patch,
        };

        setUserData(updated);
        await saveToStore(updated, patch);
      }
    } catch (err) {
      console.warn('Failed to sync LeetCode stats:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: null,
        userData,
        loading,
        isDemoMode,
        login,
        signup,
        logout,
        demoLogin,
        updateProfile,
        updateUserProject,
        toggleModuleProgress,
        unlockSkill,
        recordDailySolve,
        syncLeetCodeStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
