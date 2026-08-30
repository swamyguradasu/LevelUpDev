'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSkillById } from '@/lib/content';
import type { StaticUserProfile } from '@/lib/csvRoster';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import {
  fetchUserDynamicData,
  saveUserDynamicData,
  calculateStreakFromActivity,
  UserDynamicData,
  UserProjectRecord,
  ModuleProgressRecord,
  CalendarActivityRecord,
  normalizeUserId,
} from '@/lib/dynamicDatabase';

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

export interface UserPortfolioProject {
  projectId: string;
  title: string;
  description: string;
  category: string;
  difficulty?: string;
  duration?: string;
  suggestedTech: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  status: 'Selected' | 'In Progress' | 'Completed';
  selectedDate?: string;
  completedDate?: string;
}

export interface UserProfileData {
  // Stable identity
  uid: string;
  email: string;
  levelupdevEmail: string;
  role: 'admin' | 'member';

  // Static profile information (from CSV)
  name: string;
  username: string;
  personalEmail: string;
  headline: string;
  shortBio: string;
  bio: string;
  aboutMe: string;
  photoUrl: string;
  college: string;
  degree: string;
  registerNumber: string;
  branch: string;
  currentYear: string;
  graduationYear: string;
  city: string;
  state: string;
  country: string;
  currentRole: string;
  careerInterest: string;
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  otherUrl: string;
  contactEmail: string;
  phone: string;
  isPortfolioPublic: boolean;
  showEmailPublicly: boolean;
  showPhonePublicly: boolean;

  // Dynamic user data (from dynamic database layer)
  joinedDate: string;
  selectedProjectId?: string | null;
  projectGithubUrl?: string | null;
  projectLiveUrl?: string | null;
  portfolioProjects?: UserPortfolioProject[];
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

  // LeetCode Integration
  leetcodeId?: string;
  leetcodeStats?: LeetCodeStats;
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
  openChangePasswordModal: (isFirstTime?: boolean) => void;
  closeChangePasswordModal: () => void;
  isChangePasswordOpen: boolean;
  updateProfile: (updates: Partial<UserProfileData>) => Promise<void>;
  updateUserProject: (
    projectId: string | null,
    githubUrl?: string | null,
    liveUrl?: string | null
  ) => Promise<void>;
  addProjectToPortfolio: (project: any) => Promise<void>;
  updatePortfolioProject: (projectId: string, updates: Partial<UserPortfolioProject>) => Promise<void>;
  removePortfolioProject: (projectId: string) => Promise<void>;
  toggleModuleProgress: (skillId: string, moduleId: string, forceState?: boolean) => Promise<void>;
  unlockSkill: (skillId: string) => Promise<void>;
  recordDailySolve: (targetDate?: string) => Promise<void>;
  syncLeetCodeStats: (username?: string) => Promise<void>;
  resetDatabase: () => Promise<{ success: boolean; message: string }>;
}

export function mapFirebaseError(err: any): string {
  return err?.message || 'An unexpected error occurred. Please try again.';
}

export function getFirestoreDocId(email: string): string {
  return normalizeUserId(email);
}

export const DUMMY_DEMO_USER: UserProfileData = {
  uid: 'user_demo_preview',
  email: 'demo@levelupdev.preview',
  levelupdevEmail: 'demo@levelupdev.preview',
  role: 'member',
  name: 'Alex Rivera (Demo Preview)',
  username: 'Alex_Rivera',
  personalEmail: 'alex.rivera@example.com',
  headline: 'Full-Stack & AI Systems Enthusiast • Platform Explorer',
  shortBio: 'Explore LevelUpDev in read-only Demo Mode. This profile demonstrates unlocked verified skill cards, production projects, collectible achievement badges, and credentials without affecting real database accounts.',
  bio: 'Explore LevelUpDev in read-only Demo Mode.',
  aboutMe: 'Passionate software engineering student exploring distributed systems, modern web development, and AI engineering.',
  photoUrl: '',
  college: 'National Institute of Technology • LevelUpDev Cohort',
  degree: 'BTech',
  registerNumber: '24DEMO6001',
  branch: 'Computer Science & Engineering',
  currentYear: '3rd Year',
  graduationYear: '2028',
  city: 'Hyderabad',
  state: 'Telangana',
  country: 'India',
  currentRole: 'Student',
  careerInterest: 'AI & Full-Stack Development',
  githubUrl: 'https://github.com/alexrivera-demo',
  linkedinUrl: 'https://linkedin.com/in/alexrivera-demo',
  websiteUrl: 'https://alexrivera.dev',
  otherUrl: '',
  contactEmail: 'alex.rivera@example.com',
  phone: '+91 98765 43210',
  isPortfolioPublic: true,
  showEmailPublicly: true,
  showPhonePublicly: false,
  joinedDate: '2024-01-15T00:00:00.000Z',
  skillsCompleted: ['python'],
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
  },
  unlockedSkills: ['python', 'sql', 'machine-learning'],
  streak: {
    currentStreak: 14,
    lastSolvedDate: new Date().toISOString().split('T')[0],
    solvedDates: [
      new Date().toISOString().split('T')[0],
      new Date(Date.now() - 86400000).toISOString().split('T')[0],
    ],
  },
  selectedProjectId: 'expense-tracker-cli',
  projectGithubUrl: 'https://github.com/alexrivera-demo/expense-tracker-cli',
  projectLiveUrl: 'https://expense-tracker.demo.app',
  portfolioProjects: [
    {
      projectId: 'expense-tracker-cli',
      title: 'Expense Tracker CLI',
      description: 'A command-line application to track categorized expenses with JSON persistence.',
      category: 'Python',
      difficulty: 'Beginner',
      duration: '7 Days',
      suggestedTech: ['Python', 'JSON', 'Argparse'],
      githubUrl: 'https://github.com/alexrivera-demo/expense-tracker-cli',
      liveUrl: 'https://expense-tracker.demo.app',
      status: 'Completed',
      selectedDate: 'Aug 2026',
    },
  ],
  leetcodeId: 'Alex_Rivera_Dev',
  leetcodeStats: {
    totalSolved: 128,
    easySolved: 72,
    mediumSolved: 48,
    hardSolved: 8,
    lastSyncedAt: new Date().toISOString(),
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState<boolean>(false);
  const [isFirstTimePasswordPrompt, setIsFirstTimePasswordPrompt] = useState<boolean>(false);

  const openChangePasswordModal = (isFirstTime = false) => {
    setIsFirstTimePasswordPrompt(isFirstTime);
    setIsChangePasswordOpen(true);
  };

  const closeChangePasswordModal = () => {
    setIsChangePasswordOpen(false);
    setIsFirstTimePasswordPrompt(false);
  };

  // Helper to convert dynamic database structure to view model
  function assembleUserProfile(
    staticProfile: StaticUserProfile,
    dynamicData: UserDynamicData
  ): UserProfileData {
    const userId = normalizeUserId(staticProfile.levelupdevEmail);

    // Map progress record map to boolean map for UI consumers
    const booleanProgress: Record<string, Record<string, boolean>> = {};
    if (dynamicData.progress) {
      Object.keys(dynamicData.progress).forEach((sk) => {
        booleanProgress[sk] = {};
        const modMap = dynamicData.progress[sk];
        if (modMap) {
          Object.keys(modMap).forEach((mk) => {
            const val = modMap[mk];
            booleanProgress[sk][mk] = typeof val === 'object' ? val.status === 'completed' : Boolean(val);
          });
        }
      });
    }

    // Map UserProjectRecord array to UserPortfolioProject array
    const portfolioProjects: UserPortfolioProject[] = (dynamicData.projects || []).map((p) => ({
      projectId: p.projectId,
      title: p.title || p.projectId,
      description: p.description || '',
      category: p.category || 'General',
      difficulty: p.difficulty || 'Beginner',
      duration: p.duration || '7 Days',
      suggestedTech: p.suggestedTech || [],
      githubUrl: p.githubUrl || null,
      liveUrl: p.liveUrl || null,
      status: p.status || 'Selected',
      selectedDate: p.selectedAt ? new Date(p.selectedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Aug 2026',
    }));

    return {
      // Stable identity
      uid: userId,
      email: staticProfile.levelupdevEmail,
      levelupdevEmail: staticProfile.levelupdevEmail,
      role: staticProfile.role,

      // Static Profile Fields directly from CSV
      name: staticProfile.fullName || staticProfile.username || 'Developer',
      username: staticProfile.username || '',
      personalEmail: staticProfile.personalEmail || '',
      headline: staticProfile.headline || 'Aspiring Software Developer',
      shortBio: staticProfile.shortBio || '',
      bio: staticProfile.shortBio || staticProfile.aboutMe || '',
      aboutMe: staticProfile.aboutMe || '',
      photoUrl: staticProfile.photoUrl || '',
      college: staticProfile.college || 'Swarnandhra College of Engineering and Technology',
      degree: staticProfile.degree || 'BTech',
      registerNumber: staticProfile.registerNumber || '',
      branch: staticProfile.branch || 'AIML',
      currentYear: staticProfile.currentYear || '',
      graduationYear: staticProfile.graduationYear || '',
      city: staticProfile.city || '',
      state: staticProfile.state || '',
      country: staticProfile.country || 'India',
      currentRole: staticProfile.currentRole || 'Student',
      careerInterest: staticProfile.careerInterest || '',
      githubUrl: staticProfile.githubUrl || '',
      linkedinUrl: staticProfile.linkedinUrl || '',
      websiteUrl: staticProfile.websiteUrl || '',
      otherUrl: staticProfile.otherUrl || '',
      contactEmail: staticProfile.contactEmail || staticProfile.personalEmail || '',
      phone: staticProfile.phone || '',
      isPortfolioPublic: staticProfile.isPortfolioPublic !== false,
      showEmailPublicly: staticProfile.showEmailPublicly !== false,
      showPhonePublicly: staticProfile.showPhonePublicly === true,

      // Dynamic User Activity
      joinedDate: dynamicData.updatedAt || new Date().toISOString(),
      skillsCompleted: dynamicData.skillsCompleted || [],
      progress: booleanProgress,
      unlockedSkills: dynamicData.unlockedSkills || ['python'],
      streak: {
        currentStreak: dynamicData.streak?.currentStreak || 0,
        lastSolvedDate: dynamicData.streak?.lastActivityDate || '',
        solvedDates: dynamicData.streak?.activeDates || [],
      },
      portfolioProjects,
      selectedProjectId: dynamicData.selectedProjectId || null,
      projectGithubUrl: dynamicData.projectGithubUrl || null,
      projectLiveUrl: dynamicData.projectLiveUrl || null,
      lastActiveModule: dynamicData.lastActiveModule,
      leetcodeId: dynamicData.leetcodeId || '',
      leetcodeStats: dynamicData.leetcodeStats,
    };
  }

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

      try {
        // 1. Fetch static profile from CSV
        const res = await fetch(`/api/auth/profile?email=${encodeURIComponent(activeEmail)}`);
        if (!res.ok) {
          localStorage.removeItem('levelupdev_active_email');
          setLoading(false);
          return;
        }

        const { profile: staticProfile } = await res.json();
        if (!staticProfile) {
          localStorage.removeItem('levelupdev_active_email');
          setLoading(false);
          return;
        }

        // 2. Fetch dynamic activity data
        const dynamicData = await fetchUserDynamicData(activeEmail);
        const fullProfile = assembleUserProfile(staticProfile, dynamicData);
        setUserData(fullProfile);
      } catch (err) {
        console.error('Session load error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadActiveSession();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }

      const staticProfile: StaticUserProfile = data.user.staticProfile;
      const cleanEmail = staticProfile.levelupdevEmail;

      // Load dynamic database record
      const dynamicData = await fetchUserDynamicData(cleanEmail);
      const fullProfile = assembleUserProfile(staticProfile, dynamicData);

      setUserData(fullProfile);
      setIsDemoMode(false);
      localStorage.setItem('levelupdev_active_email', cleanEmail);
      sessionStorage.removeItem('levelupdev_is_demo_mode');

      // If user signed in with default registration number, prompt them with popup card
      if (data.mustPromptChange) {
        setIsFirstTimePasswordPrompt(true);
        setIsChangePasswordOpen(true);
      }
    } catch (err: any) {
      setLoading(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, pass: string) => {
    await login(email, pass);
  };

  const logout = async () => {
    setUserData(null);
    setIsDemoMode(false);
    localStorage.removeItem('levelupdev_active_email');
    sessionStorage.removeItem('levelupdev_is_demo_mode');
  };

  const demoLogin = () => {
    setIsDemoMode(true);
    setUserData(DUMMY_DEMO_USER);
    sessionStorage.setItem('levelupdev_is_demo_mode', 'true');
    localStorage.setItem('levelupdev_active_email', 'demo@levelupdev.preview');
  };

  const updateProfile = async (updates: Partial<UserProfileData>) => {
    if (!userData) return;
    const updated: UserProfileData = {
      ...userData,
      ...updates,
    };
    setUserData(updated);
  };

  const updateUserProject = async (
    projectId: string | null,
    githubUrl?: string | null,
    liveUrl?: string | null
  ) => {
    if (!userData || !projectId) return;

    await fetch('/api/db/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userData.email,
        project: {
          projectId,
          githubUrl,
          liveUrl,
        },
      }),
    });

    const updatedProjects = (userData.portfolioProjects || []).map((p) =>
      p.projectId === projectId
        ? {
            ...p,
            githubUrl: githubUrl !== undefined ? githubUrl : p.githubUrl,
            liveUrl: liveUrl !== undefined ? liveUrl : p.liveUrl,
          }
        : p
    );

    setUserData({
      ...userData,
      selectedProjectId: projectId,
      projectGithubUrl: githubUrl !== undefined ? githubUrl : userData.projectGithubUrl,
      projectLiveUrl: liveUrl !== undefined ? liveUrl : userData.projectLiveUrl,
      portfolioProjects: updatedProjects,
    });
  };

  const addProjectToPortfolio = async (project: any) => {
    if (!userData) return;

    await fetch('/api/db/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userData.email,
        project: {
          projectId: project.projectId,
          title: project.title,
          description: project.description,
          category: project.category,
          difficulty: project.difficulty,
          duration: project.duration,
          suggestedTech: project.suggestedTech,
          status: 'Selected',
          githubUrl: project.githubUrl || null,
          liveUrl: project.liveUrl || null,
        },
      }),
    });

    const existingList = userData.portfolioProjects || [];
    const foundIndex = existingList.findIndex((p) => p.projectId === project.projectId);
    let updatedList: UserPortfolioProject[];

    const newEntry: UserPortfolioProject = {
      projectId: project.projectId,
      title: project.title,
      description: project.description,
      category: project.category || 'General',
      difficulty: project.difficulty || 'Beginner',
      duration: project.duration || '7 Days',
      suggestedTech: project.suggestedTech || [],
      githubUrl: project.githubUrl || null,
      liveUrl: project.liveUrl || null,
      status: 'Selected',
      selectedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    if (foundIndex >= 0) {
      updatedList = [...existingList];
      updatedList[foundIndex] = {
        ...updatedList[foundIndex],
        ...newEntry,
      };
    } else {
      updatedList = [newEntry, ...existingList];
    }

    setUserData({
      ...userData,
      portfolioProjects: updatedList,
      selectedProjectId: project.projectId,
      projectGithubUrl: project.githubUrl || userData.projectGithubUrl || null,
      projectLiveUrl: project.liveUrl || userData.projectLiveUrl || null,
    });
  };

  const updatePortfolioProject = async (projectId: string, updates: Partial<UserPortfolioProject>) => {
    if (!userData) return;

    await fetch('/api/db/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userData.email,
        project: {
          projectId,
          ...updates,
        },
      }),
    });

    const existingList = userData.portfolioProjects || [];
    const index = existingList.findIndex((p) => p.projectId === projectId);
    let updatedList: UserPortfolioProject[];

    if (index >= 0) {
      updatedList = [...existingList];
      updatedList[index] = {
        ...updatedList[index],
        ...updates,
      };
    } else {
      const fallbackEntry: UserPortfolioProject = {
        projectId,
        title: updates.title || projectId,
        description: updates.description || '',
        category: updates.category || 'General',
        suggestedTech: updates.suggestedTech || [],
        githubUrl: updates.githubUrl || null,
        liveUrl: updates.liveUrl || null,
        status: updates.status || 'Selected',
        selectedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        ...updates,
      };
      updatedList = [fallbackEntry, ...existingList];
    }

    const currentActive = updatedList.find((p) => p.projectId === projectId);

    setUserData({
      ...userData,
      portfolioProjects: updatedList,
      selectedProjectId: userData.selectedProjectId === projectId ? projectId : userData.selectedProjectId,
      projectGithubUrl: currentActive?.githubUrl !== undefined ? currentActive.githubUrl : userData.projectGithubUrl,
      projectLiveUrl: currentActive?.liveUrl !== undefined ? currentActive.liveUrl : userData.projectLiveUrl,
    });
  };

  const removePortfolioProject = async (projectId: string) => {
    if (!userData) return;

    const existingList = userData.portfolioProjects || [];
    const updatedList = existingList.filter((p) => p.projectId !== projectId);

    const dynamicData = await fetchUserDynamicData(userData.email);
    const updatedProjects = (dynamicData.projects || []).filter((p) => p.projectId !== projectId);

    await saveUserDynamicData(userData.email, {
      projects: updatedProjects,
      selectedProjectId: userData.selectedProjectId === projectId ? (updatedList[0]?.projectId || null) : userData.selectedProjectId,
    });

    setUserData({
      ...userData,
      portfolioProjects: updatedList,
      selectedProjectId: userData.selectedProjectId === projectId ? (updatedList[0]?.projectId || null) : userData.selectedProjectId,
    });
  };

  const toggleModuleProgress = async (skillId: string, moduleId: string, forceState?: boolean) => {
    if (!userData) return;
    const normSkillId = skillId.toLowerCase();
    const currentSkillProgress = { ...(userData.progress[normSkillId] || {}) };
    const newState = forceState !== undefined ? forceState : !currentSkillProgress[moduleId];

    // Call server API for persistence
    try {
      const res = await fetch('/api/db/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          skillId: normSkillId,
          moduleId,
          status: newState ? 'completed' : 'in_progress',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedProgress = {
          ...userData.progress,
          [normSkillId]: {
            ...currentSkillProgress,
            [moduleId]: newState,
          },
        };

        setUserData({
          ...userData,
          progress: updatedProgress,
          skillsCompleted: data.skillsCompleted || userData.skillsCompleted,
          streak: {
            currentStreak: data.streak?.currentStreak || userData.streak.currentStreak,
            lastSolvedDate: data.streak?.lastActivityDate || userData.streak.lastSolvedDate,
            solvedDates: data.streak?.activeDates || userData.streak.solvedDates,
          },
        });
      }
    } catch (err) {
      console.warn('Progress toggle error:', err);
    }
  };

  const unlockSkill = async (skillId: string) => {
    if (!userData) return;
    const normSkillId = skillId.toLowerCase();
    if (userData.unlockedSkills?.includes(normSkillId)) return;

    const unlocked = [...(userData.unlockedSkills || ['python']), normSkillId];
    await saveUserDynamicData(userData.email, { unlockedSkills: unlocked });

    setUserData({
      ...userData,
      unlockedSkills: unlocked,
    });
  };

  const recordDailySolve = async (targetDate?: string) => {
    if (!userData) return;
    const todayStr = targetDate || new Date().toISOString().split('T')[0];

    const dynamicData = await fetchUserDynamicData(userData.email);
    const newActivity: CalendarActivityRecord = {
      activityDate: todayStr,
      activityType: 'daily_solve',
      timestamp: new Date().toISOString(),
    };

    const updatedActivities = [...dynamicData.calendarActivity, newActivity];
    const updatedStreak = calculateStreakFromActivity(updatedActivities);

    await saveUserDynamicData(userData.email, {
      calendarActivity: updatedActivities,
      streak: updatedStreak,
    });

    setUserData({
      ...userData,
      streak: {
        currentStreak: updatedStreak.currentStreak,
        lastSolvedDate: updatedStreak.lastActivityDate,
        solvedDates: updatedStreak.activeDates,
      },
    });
  };

  const syncLeetCodeStats = async (username?: string) => {
    if (!userData) return;
    const targetUsername = username || userData.leetcodeId;
    if (!targetUsername) return;

    try {
      const res = await fetch(`/api/leetcode?username=${encodeURIComponent(targetUsername)}`);
      if (res.ok) {
        const data = await res.json();
        const stats: LeetCodeStats = {
          totalSolved: data.totalSolved,
          easySolved: data.easySolved,
          mediumSolved: data.mediumSolved,
          hardSolved: data.hardSolved,
          lastSyncedAt: data.lastSyncedAt,
        };

        await saveUserDynamicData(userData.email, {
          leetcodeId: targetUsername,
          leetcodeStats: stats,
        });

        setUserData({
          ...userData,
          leetcodeId: targetUsername,
          leetcodeStats: stats,
        });
      }
    } catch (err) {
      console.warn('Failed to sync LeetCode stats:', err);
    }
  };

  const resetDatabase = async (): Promise<{ success: boolean; message: string }> => {
    if (!userData) throw new Error('Not authenticated');

    const res = await fetch('/api/admin/reset-db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminEmail: userData.email }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to reset database.');
    }

    // Refresh current user session
    const dynamicData = await fetchUserDynamicData(userData.email);
    setUserData((prev) => (prev ? {
      ...prev,
      progress: {},
      skillsCompleted: [],
      portfolioProjects: [],
      selectedProjectId: null,
      projectGithubUrl: null,
      projectLiveUrl: null,
      streak: {
        currentStreak: 0,
        lastSolvedDate: '',
        solvedDates: [],
      },
    } : null));

    return {
      success: true,
      message: data.message,
    };
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
        openChangePasswordModal,
        closeChangePasswordModal,
        isChangePasswordOpen,
        updateProfile,
        updateUserProject,
        addProjectToPortfolio,
        updatePortfolioProject,
        removePortfolioProject,
        toggleModuleProgress,
        unlockSkill,
        recordDailySolve,
        syncLeetCodeStats,
        resetDatabase,
      }}
    >
      {children}
      {userData && (
        <ChangePasswordModal
          isOpen={isChangePasswordOpen}
          onClose={closeChangePasswordModal}
          userEmail={userData.email}
          isFirstTimePrompt={isFirstTimePasswordPrompt}
        />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
