'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getAllSkills, Skill, getAllProjects, getProjectById, ProjectIdea, isAdminEmail } from '@/lib/content';
import { HeatmapCalendar } from '@/components/HeatmapCalendar';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import {
  PLATFORM_ACHIEVEMENTS_LIST,
  PortfolioAchievement,
  PortfolioCertificate,
  PortfolioExperience,
  PortfolioEducation,
} from '@/data/portfolioData';
import {
  Flame,
  Pencil,
  X,
  Compass,
  GraduationCap,
  Settings,
  Check,
  MapPin,
  FolderGit2,
  Lock,
  ExternalLink,
  Sparkles,
  Play,
  Mail,
  Share2,
  Code2,
  LogOut,
  Plus,
  RefreshCw,
  AlertTriangle,
  Upload,
  User,
  ShieldCheck,
  Award,
  BookOpen,
  Briefcase,
  Search,
  CheckCircle2,
  ArrowRight,
  Eye,
  Copy,
  Download,
  Terminal,
  Cpu,
  Database,
  Layers,
  Star,
  Activity,
  Layers3,
  Calendar,
  Filter,
} from 'lucide-react';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCeImeuYYYUrCiVonGEBFUpCkEZiehGncFXeYHxaVkJl8fxQflctQxvXzd_sgXHjlOO9sjk_p2uTzRRTOu0chpmEn32zM5aJbOALiZEjm1pFnCqktUT5w9_2VHjtJdEU-7Dgw2Uj52To4J80eBe-Eb6rnLSnvX2d13dzXYgNM7OxwV7dqWBA_x2LA6fjraZrCAqmlgF5zXHVgFv4RcTA2Mw00lEFupmVx_9RBhYQt5U6OC5juqv46SkRg';

export default function HomePage() {
  const { userData, loading, isDemoMode, updateProfile, updateUserProject, logout, syncLeetCodeStats } = useAuth();
  const router = useRouter();

  // Welcome Screen State
  const [showWelcome, setShowWelcome] = useState(false);

  // Recruiter Mode Toggle
  const [isRecruiterView, setIsRecruiterView] = useState(false);

  // Active Section Filter
  const [activeFilter, setActiveFilter] = useState<'all' | 'skills' | 'projects' | 'achievements' | 'certifications' | 'education'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSharingProfile, setIsSharingProfile] = useState(false);
  const [selectedSkillModal, setSelectedSkillModal] = useState<{
    skill: Skill;
    completedCount: number;
    totalCount: number;
    isEarned: boolean;
  } | null>(null);
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectIdea | null>(null);
  const [selectedCertModal, setSelectedCertModal] = useState<PortfolioCertificate | null>(null);

  // Edit Profile Form State
  const [nameInput, setNameInput] = useState('');
  const [headlineInput, setHeadlineInput] = useState('');
  const [bioInput, setBioInput] = useState('');
  const [locationInput, setLocationInput] = useState('India');
  const [collegeInput, setCollegeInput] = useState('');
  const [branchInput, setBranchInput] = useState('');
  const [githubInput, setGithubInput] = useState('');
  const [linkedinInput, setLinkedinInput] = useState('');
  const [leetcodeInput, setLeetcodeInput] = useState('');
  const [photoInput, setPhotoInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [syncingLeetCode, setSyncingLeetCode] = useState(false);

  // Project Selection & Management States
  const [isSelectingProject, setIsSelectingProject] = useState(false);
  const [isConfirmingChange, setIsConfirmingChange] = useState(false);
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [projGithubInput, setProjGithubInput] = useState('');
  const [projLiveInput, setProjLiveInput] = useState('');
  const [hasDeployed, setHasDeployed] = useState(false);
  const [savingProjectLinks, setSavingProjectLinks] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Content Data
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [allProjects, setAllProjects] = useState<ProjectIdea[]>([]);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    } else if (userData) {
      const isPending = sessionStorage.getItem('levelupdev_welcome_pending');
      if (isPending === 'true') {
        setShowWelcome(true);
      }
    }
  }, [userData, loading, router]);

  const handleWelcomeComplete = () => {
    sessionStorage.removeItem('levelupdev_welcome_pending');
    setShowWelcome(false);
  };

  useEffect(() => {
    if (userData) {
      setNameInput(userData.name || 'Swamy Guradasu');
      setHeadlineInput(userData.headline || 'AIML Developer • ML Enthusiast • Full-Stack Builder');
      setBioInput(
        userData.bio ||
          'Building intelligent products while continuously learning and shipping projects. Passionate about machine learning pipelines, backend systems, and clean developer tooling.'
      );
      setCollegeInput(userData.college || 'Swarnandhra College of Engineering & Technology');
      setBranchInput(userData.branch || 'B.Tech — Artificial Intelligence & Machine Learning');
      setGithubInput(userData.githubUrl || 'https://github.com/swamyguradasu');
      setLinkedinInput(userData.linkedinUrl || 'https://linkedin.com/in/swamyguradasu');
      setLeetcodeInput(userData.leetcodeId || 'Swamy_Guradasu');
      setPhotoInput(userData.photoUrl || '');

      setProjGithubInput(userData.projectGithubUrl || '');
      setProjLiveInput(userData.projectLiveUrl || '');
      setHasDeployed(!!userData.projectLiveUrl);
    }
  }, [userData]);

  useEffect(() => {
    setAllSkills(getAllSkills());
    setAllProjects(getAllProjects());
  }, []);

  // Compute Dynamic Skills (Earned vs In-Progress)
  const { earnedSkills, inProgressSkills } = useMemo(() => {
    if (!userData || allSkills.length === 0) return { earnedSkills: [], inProgressSkills: [] };

    const earned: {
      skill: Skill;
      completedCount: number;
      totalCount: number;
      earnedDate: string;
      percentage: number;
    }[] = [];

    const inProgress: {
      skill: Skill;
      completedCount: number;
      totalCount: number;
      percentage: number;
    }[] = [];

    allSkills.forEach((sk) => {
      const skillProgressObj = userData.progress?.[sk.skillId.toLowerCase()] || {};
      const totalCount = sk.modules.length;
      const completedCount = sk.modules.filter((m) => skillProgressObj[m.moduleId] === true).length;
      const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

      if (completedCount === totalCount && totalCount > 0) {
        earned.push({
          skill: sk,
          completedCount,
          totalCount,
          earnedDate: 'August 2026',
          percentage: 100,
        });
      } else if (completedCount > 0) {
        inProgress.push({
          skill: sk,
          completedCount,
          totalCount,
          percentage,
        });
      }
    });

    return { earnedSkills: earned, inProgressSkills: inProgress };
  }, [userData, allSkills]);

  // Compute Completed / Linked Projects
  const userProjects = useMemo(() => {
    if (!userData || !userData.selectedProjectId) return [];
    const proj = getProjectById(userData.selectedProjectId);
    if (!proj) return [];
    return [
      {
        ...proj,
        githubUrl: userData.projectGithubUrl || null,
        liveUrl: userData.projectLiveUrl || null,
        completedDate: 'August 2026',
        status: userData.projectLiveUrl ? 'Deployed' : userData.projectGithubUrl ? 'Completed' : 'In Development',
      },
    ];
  }, [userData]);

  // Compute Dynamic Achievements
  const achievements = useMemo(() => {
    if (!userData) return [];

    const solvedCount = userData.streak?.solvedDates?.length || 0;
    const streakDays = userData.streak?.currentStreak || 0;
    const hasLinkedProject = !!userData.projectGithubUrl;
    const pythonDone = earnedSkills.some((s) => s.skill.skillId.toLowerCase() === 'python');

    return PLATFORM_ACHIEVEMENTS_LIST.map((ach) => {
      let isUnlocked = false;
      let earnedDate: string | undefined;

      if (ach.id === 'python-mastery' && pythonDone) {
        isUnlocked = true;
        earnedDate = 'Aug 2026';
      } else if (ach.id === 'first-project' && hasLinkedProject) {
        isUnlocked = true;
        earnedDate = 'Aug 2026';
      } else if (ach.id === 'streak-7' && streakDays >= 7) {
        isUnlocked = true;
        earnedDate = 'Aug 2026';
      } else if (ach.id === 'streak-30' && streakDays >= 30) {
        isUnlocked = true;
        earnedDate = 'Aug 2026';
      } else if (ach.id === 'first-solve' && solvedCount >= 1) {
        isUnlocked = true;
        earnedDate = 'Aug 2026';
      } else if (ach.id === 'dsa-grinder' && solvedCount >= 10) {
        isUnlocked = true;
        earnedDate = 'Aug 2026';
      } else if (ach.id === 'perfect-module' && pythonDone) {
        isUnlocked = true;
        earnedDate = 'Aug 2026';
      } else if (ach.id === 'recruiter-ready' && (earnedSkills.length > 0 || hasLinkedProject)) {
        isUnlocked = true;
        earnedDate = 'Aug 2026';
      }

      return {
        ...ach,
        isUnlocked,
        earnedDate,
      };
    });
  }, [userData, earnedSkills]);

  // Compute Verified Certifications
  const certifications = useMemo<PortfolioCertificate[]>(() => {
    if (!userData) return [];
    const list: PortfolioCertificate[] = [];

    earnedSkills.forEach((s) => {
      const code = s.skill.skillId.toUpperCase();
      const userHash = userData.uid ? userData.uid.slice(0, 6).toUpperCase() : 'DEV01';
      list.push({
        id: `cert-${s.skill.skillId}`,
        title: `Certified ${s.skill.title} Specialist`,
        skillId: s.skill.skillId,
        issuedBy: 'LevelUpDev Platform & LMS Authority',
        issueDate: 'August 2026',
        credentialId: `LUD-${code}-2026-${userHash}`,
        verificationUrl: `https://levelupdev.com/verify/LUD-${code}-2026-${userHash}`,
        skillsCovered: s.skill.modules.map((m) => m.title),
        gradeScore: '96% (Verified Assessment)',
        isUnlocked: true,
      });
    });

    return list;
  }, [userData, earnedSkills]);

  // Compute Portfolio Strength Score
  const portfolioStrength = useMemo(() => {
    if (!userData) return { score: 40, checks: [] };

    const checks = [
      { label: 'Profile headline & bio configured', done: !!(userData.name && userData.headline && userData.bio) },
      { label: 'Avatar & college education linked', done: !!(userData.college && userData.branch) },
      { label: 'GitHub or LinkedIn profile connected', done: !!(userData.githubUrl || userData.linkedinUrl) },
      { label: 'At least 1 verified skill unlocked', done: earnedSkills.length > 0 },
      { label: 'At least 1 project built & deployed', done: userProjects.length > 0 },
      { label: 'Milestone achievements earned', done: achievements.filter((a) => a.isUnlocked).length >= 2 },
    ];

    const completed = checks.filter((c) => c.done).length;
    const score = Math.min(100, Math.round((completed / checks.length) * 100));

    return { score, checks };
  }, [userData, earnedSkills, userProjects, achievements]);

  // Static Experience & Education Lists
  const experiences: PortfolioExperience[] = [
    {
      id: 'exp-1',
      role: 'Artificial Intelligence & Machine Learning Scholar',
      organization: 'LevelUpDev Engineering Group',
      location: 'India',
      period: '2024 — Present',
      type: 'Open Source',
      description: [
        'Mastering end-to-end Python internals, algorithm optimization, and machine learning pipelines.',
        'Building scalable asynchronous microservices, REST APIs with FastAPI, and predictive systems.',
        'Solving daily algorithmic problems and contributing to developer peer code reviews.',
      ],
      technologies: ['Python 3.12', 'FastAPI', 'Machine Learning', 'Docker', 'Git'],
    },
  ];

  const educations: PortfolioEducation[] = [
    {
      id: 'edu-1',
      degree: 'Bachelor of Technology (B.Tech)',
      major: userData?.branch || 'Artificial Intelligence & Machine Learning',
      institution: userData?.college || 'Swarnandhra College of Engineering & Technology',
      period: '2024 — 2028',
      gpaOrScore: '8.8 / 10.0 CGPA',
      highlights: [
        'Core coursework: Data Structures, Algorithms, Linear Algebra, Probability, Database Systems, Computer Networks.',
        'Active member of the developer engineering club and AI research cohort.',
      ],
    },
  ];

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono text-sm">
        <div className="flex items-center gap-3 bg-slate-900/90 px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Syncing Dynamic Portfolio Dashboard...</span>
        </div>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDemoMode) {
      alert('You are exploring in Demo Viewing Mode. Changes are disabled and not saved to the database.');
      setIsEditingProfile(false);
      return;
    }
    setSaving(true);
    await updateProfile({
      name: nameInput,
      headline: headlineInput,
      bio: bioInput,
      college: collegeInput,
      branch: branchInput,
      githubUrl: githubInput,
      linkedinUrl: linkedinInput,
      leetcodeId: leetcodeInput,
      photoUrl: photoInput,
    });
    setIsEditingProfile(false);
    setSaving(false);
  };

  const handleSelectProjectIdea = async (projectId: string) => {
    if (isDemoMode) {
      alert('You are exploring in Demo Viewing Mode. Project changes are disabled in this preview.');
      setIsSelectingProject(false);
      return;
    }
    setIsSelectingProject(false);
    await updateUserProject(projectId, null, null);
    setProjGithubInput('');
    setProjLiveInput('');
    setHasDeployed(false);
    setIsEditingLinks(true);
  };

  const handleSaveProjectLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDemoMode) {
      alert('You are exploring in Demo Viewing Mode. Changes will not be saved to the database.');
      setIsEditingLinks(false);
      return;
    }
    if (!projGithubInput) return;
    setSavingProjectLinks(true);
    const activeProjId = userData.selectedProjectId || 'task-queue';
    await updateUserProject(
      activeProjId,
      projGithubInput,
      hasDeployed && projLiveInput ? projLiveInput : null
    );
    setIsEditingLinks(false);
    setSavingProjectLinks(false);
  };

  const handleConfirmChangeProject = async () => {
    if (isDemoMode) {
      alert('Project modification is disabled in Demo Viewing Mode.');
      setIsConfirmingChange(false);
      return;
    }
    setIsConfirmingChange(false);
    await updateUserProject(null, null, null);
    setProjGithubInput('');
    setProjLiveInput('');
    setHasDeployed(false);
    setIsSelectingProject(true);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}/home?user=${userData.uid || 'public'}`;
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const displayName = userData.name || 'Swamy Guradasu';
  const displayHeadline = userData.headline || 'AIML Developer • ML Enthusiast • Full-Stack Builder';
  const displayCollege = userData.college || 'Swarnandhra College of Engineering & Technology';
  const displayBranch = userData.branch || 'B.Tech — Artificial Intelligence & Machine Learning';
  const displayBio =
    userData.bio ||
    'Building intelligent products while continuously learning and shipping projects. Passionate about machine learning pipelines, backend systems, and clean developer tooling.';

  const unlockedCount = earnedSkills.length;
  const projectCount = userProjects.length;
  const unlockedAchCount = achievements.filter((a) => a.isUnlocked).length;
  const certCount = certifications.length;
  const streakCount = userData.streak?.currentStreak || 0;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white">
      {/* Background Decor Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[#006cd2]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Welcome Screen Overlay */}
        {showWelcome && <WelcomeScreen userData={userData} onComplete={handleWelcomeComplete} />}

        {/* ========================================================================= */}
        {/* TOP MAIN NAVIGATION */}
        {/* ========================================================================= */}
        <header className="bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 w-full top-0 left-0 flex justify-between items-center px-4 sm:px-8 md:px-12 py-3.5 z-50 sticky">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center shadow-md">
              <img src="/levelupdev-icon.png" alt="LevelUpDev Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <span className="font-display font-bold text-base sm:text-lg text-white tracking-tight flex items-center gap-1.5">
                LevelUpDev <span className="text-slate-500 font-mono text-xs font-normal">/ Portfolio</span>
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
            <Link className="text-[#006cd2] font-semibold flex items-center gap-1" href="/home">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </Link>
            <Link className="text-slate-300 hover:text-white transition" href="/roadmaps">
              Career Roadmaps
            </Link>
            <Link className="text-slate-300 hover:text-white transition" href="/internships">
              Internships
            </Link>
            <Link className="text-slate-300 hover:text-white transition" href="/skills/python">
              Skill Trails
            </Link>
            <Link className="text-slate-300 hover:text-white transition" href="/daily">
              Daily Challenge
            </Link>
            <Link className="text-slate-300 hover:text-white transition" href="/leaderboard">
              Leaderboard
            </Link>
            {isAdminEmail(userData?.email || '') && (
              <Link
                className="text-blue-300 font-bold hover:text-white transition flex items-center gap-1 bg-[#006cd2]/20 px-2.5 py-0.5 rounded-full border border-[#006cd2]/40 text-xs"
                href="/admin"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Recruiter View Toggle */}
            <button
              onClick={() => setIsRecruiterView(!isRecruiterView)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition border ${
                isRecruiterView
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
              title="Toggle Recruiter Clean Presentation Mode"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isRecruiterView ? 'Recruiter Mode: ON' : 'Recruiter View'}</span>
            </button>

            {/* Share Profile Button */}
            <button
              onClick={() => setIsSharingProfile(true)}
              className="px-3 py-1.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-[#006cd2]/30 transition"
              title="Share Public Portfolio"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Edit Profile */}
            <button
              onClick={() => setIsEditingProfile(true)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Edit Profile"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-rose-500/20 text-rose-400 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* DEMO VIEWING MODE BANNER (When in demo mode) */}
        {/* ========================================================================= */}
        {isDemoMode && (
          <div className="bg-amber-950/70 border-b border-amber-500/40 py-2.5 px-4 text-xs font-mono text-amber-200 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-lg shadow-black/40">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>👁️ Demo Viewing Mode:</strong> You are exploring LevelUpDev with a dummy member profile. This is a read-only preview for exploration and does not affect the database.
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shrink-0 shadow-sm text-[11px]"
            >
              Exit Demo &amp; Sign In
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* RECRUITER BANNER CALLOUT (When active) */}
        {/* ========================================================================= */}
        {isRecruiterView && (
          <div className="bg-emerald-950/40 border-b border-emerald-500/30 py-2 px-4 text-center text-xs font-mono text-emerald-300 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              <strong>Recruiter View Active: </strong> Showing verified skills, production projects, certifications, and
              education. Gamified badges and locked trails are hidden.
            </span>
            <button
              onClick={() => setIsRecruiterView(false)}
              className="underline font-bold text-white ml-2 hover:text-emerald-200"
            >
              Exit
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION NAVIGATION PILLS */}
        {/* ========================================================================= */}
        <div className="bg-slate-950/90 border-b border-slate-800/80 sticky top-[61px] z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 shrink-0">
              {(['all', 'skills', 'projects', 'achievements', 'certifications', 'education'] as const).map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium capitalize transition shrink-0 ${
                      isActive
                        ? 'bg-[#006cd2] text-white shadow-sm shadow-[#006cd2]/30 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative w-48 sm:w-64 shrink-0 hidden sm:block">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search portfolio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#006cd2] font-mono"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN PORTFOLIO BODY */}
        {/* ========================================================================= */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* ========================================================================= */}
          {/* 1. PORTFOLIO HERO / PROFILE CARD */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#006cd2]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Left: Avatar & Profile Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10 flex-1">
              {/* Avatar with Online Glow */}
              <div className="relative shrink-0 mx-auto sm:mx-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-tr from-[#006cd2] via-cyan-400 to-[#006cd2] shadow-xl overflow-hidden bg-slate-900">
                  <img
                    className="w-full h-full rounded-2xl object-cover border-2 border-slate-900"
                    src={userData.photoUrl && userData.photoUrl.trim() !== '' ? userData.photoUrl : DEFAULT_AVATAR}
                    alt={displayName}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                    }}
                  />
                </div>
                {/* Active Indicator */}
                <div
                  className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 border-4 border-slate-900 flex items-center justify-center shadow-lg"
                  title="Active on LevelUpDev LMS"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              {/* Bio & Details */}
              <div className="space-y-2.5 text-center sm:text-left flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {displayName}
                  </h1>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40 w-fit mx-auto sm:mx-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>LMS Verified Developer</span>
                  </span>
                </div>

                <p className="font-sans text-sm font-semibold text-[#006cd2]">
                  {displayHeadline}
                </p>

                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {displayBio}
                </p>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 font-mono text-xs text-slate-400">
                  <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-[#006cd2]" />
                    <span>{locationInput}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{displayBranch}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Currently Learning: Python &amp; ML</span>
                  </span>
                </div>

                {/* Social Badges */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  <a
                    href={userData.githubUrl || 'https://github.com/swamyguradasu'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-[#006cd2] text-xs font-mono flex items-center gap-2 transition"
                  >
                    <GithubIcon />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={userData.linkedinUrl || 'https://linkedin.com/in/swamyguradasu'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-[#006cd2] text-xs font-mono flex items-center gap-2 transition"
                  >
                    <LinkedinIcon />
                    <span>LinkedIn</span>
                  </a>
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono flex items-center gap-1.5 border border-slate-800 transition"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Portfolio Dynamic Stats Card */}
            <div className="w-full lg:w-72 bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-4 shrink-0 shadow-inner relative z-10">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="font-mono text-xs font-bold text-slate-400 uppercase">LMS Verified Stats</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <div className="font-display text-2xl font-extrabold text-white">{unlockedCount}</div>
                  <div className="font-mono text-[11px] text-slate-400">Skills Unlocked</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <div className="font-display text-2xl font-extrabold text-blue-400">{projectCount}</div>
                  <div className="font-mono text-[11px] text-slate-400">Projects Built</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <div className="font-display text-2xl font-extrabold text-amber-400">{unlockedAchCount}</div>
                  <div className="font-mono text-[11px] text-slate-400">Achievements</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <div className="font-display text-2xl font-extrabold text-purple-400">{certCount}</div>
                  <div className="font-mono text-[11px] text-slate-400">Certifications</div>
                </div>
              </div>

              {!isRecruiterView && (
                <div className="p-2.5 rounded-xl bg-blue-950/30 border border-[#006cd2]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span className="font-mono text-xs font-bold text-slate-200">Learning Streak</span>
                  </div>
                  <span className="font-mono text-xs font-extrabold text-orange-300">{streakCount} Days</span>
                </div>
              )}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 2. PORTFOLIO STRENGTH / COMPLETION COMPONENT */}
          {/* ========================================================================= */}
          {!isRecruiterView && (
            <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-7 backdrop-blur-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#006cd2] uppercase">PORTFOLIO STRENGTH</span>
                    <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded bg-slate-800">
                      {portfolioStrength.score}%
                    </span>
                  </div>
                  <p className="font-sans text-xs text-slate-400">
                    {portfolioStrength.score >= 80
                      ? 'Your portfolio is recruiter-ready with verified skills and live project builds.'
                      : 'Complete skills and link projects to boost your recruiter-readiness score.'}
                  </p>
                </div>

                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-xs font-mono text-[#006cd2] hover:underline self-start sm:self-center"
                >
                  Improve Profile →
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#006cd2] via-cyan-400 to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${portfolioStrength.score}%` }}
                />
              </div>

              {/* Check items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                {portfolioStrength.checks.map((check, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    {check.done ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span className={check.done ? 'text-slate-300' : 'text-slate-400'}>{check.label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* 3. FEATURED EARNED SKILLS SECTION */}
          {/* ========================================================================= */}
          {(activeFilter === 'all' || activeFilter === 'skills') && (
            <section id="skills" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#006cd2]" />
                    <span>Verified Skills</span>
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 mt-0.5">
                    Skills earned through completed learning trails and verified assessments.
                  </p>
                </div>

                <Link
                  href="/skills/python"
                  className="text-xs font-mono font-semibold text-[#006cd2] hover:text-blue-300 flex items-center gap-1 self-start sm:self-center"
                >
                  <span>Explore All Learning Trails</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Earned Skills Grid */}
              {earnedSkills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {earnedSkills.map(({ skill, completedCount, totalCount, earnedDate }) => (
                    <div
                      key={skill.skillId}
                      className="p-6 rounded-3xl bg-slate-900/80 border border-[#006cd2]/50 hover:border-[#006cd2] transition-all shadow-lg shadow-[#006cd2]/10 space-y-4 group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-2xl bg-[#006cd2]/20 border border-[#006cd2]/40 text-2xl flex items-center justify-center">
                            {skill.skillId.toLowerCase() === 'python' ? '🐍' : '⚡'}
                          </div>
                          <span className="font-mono text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40 flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Verified Skill</span>
                          </span>
                        </div>

                        <div>
                          <h3 className="font-display text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {skill.title}
                          </h3>
                          <span className="font-mono text-xs text-slate-400">Core Programming &amp; Architecture</span>
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-2">
                          {skill.description || 'Mastery of fundamental syntax, OOP, testing, and application design.'}
                        </p>

                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 font-mono text-xs text-slate-400">
                          <div className="flex items-center justify-between text-slate-300">
                            <span>Modules Completed:</span>
                            <span className="text-emerald-400 font-bold">
                              {completedCount}/{totalCount} (100%)
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span>Earned Date:</span>
                            <span className="text-slate-400">{earnedDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() =>
                            setSelectedSkillModal({
                              skill,
                              completedCount,
                              totalCount,
                              isEarned: true,
                            })
                          }
                          className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-[#006cd2] text-slate-200 hover:text-white font-sans text-xs font-semibold border border-slate-800 transition flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <span>View Verified Skill Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty Skill State */
                <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 mx-auto flex items-center justify-center text-slate-500 shadow-inner">
                    <Lock className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <h3 className="font-display text-lg font-bold text-white">Your Verified Skills Will Appear Here</h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-400">
                      Complete every module in a learning path and pass the assessment to unlock your official verified
                      skill badge.
                    </p>
                  </div>
                  <Link
                    href="/skills/python"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold shadow-md shadow-[#006cd2]/30 transition"
                  >
                    <span>Explore Learning Trails</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* Skills Within Reach (In Progress) */}
              {!isRecruiterView && inProgressSkills.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                      SKILLS WITHIN REACH
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="font-mono text-xs text-slate-400">In-progress trails nearing completion</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {inProgressSkills.map(({ skill, completedCount, totalCount, percentage }) => (
                      <div
                        key={skill.skillId}
                        className="p-5 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3 opacity-90 hover:opacity-100 transition"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{skill.skillId.toLowerCase() === 'python' ? '🐍' : '⚡'}</span>
                            <h4 className="font-display text-base font-bold text-white">{skill.title}</h4>
                          </div>
                          <span className="font-mono text-xs text-amber-400 font-semibold">{percentage}%</span>
                        </div>

                        {/* Progress */}
                        <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                          <span>
                            {completedCount} / {totalCount} modules done
                          </span>
                          <span className="text-slate-500">{totalCount - completedCount} remaining</span>
                        </div>

                        <Link
                          href={`/skills/${skill.skillId.toLowerCase()}`}
                          className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 font-mono text-xs font-medium border border-slate-800 flex items-center justify-center gap-1.5 transition"
                        >
                          <span>Continue Trail</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ========================================================================= */}
          {/* 4. PROJECTS SECTION */}
          {/* ========================================================================= */}
          {(activeFilter === 'all' || activeFilter === 'projects') && (
            <section id="projects" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-[#006cd2]" />
                    <span>Projects</span>
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 mt-0.5">
                    Production systems and applications built, submitted, and verified through LevelUpDev.
                  </p>
                </div>

                <button
                  onClick={() => setIsSelectingProject(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-mono text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition self-start sm:self-center"
                >
                  <Plus className="w-3.5 h-3.5 text-[#006cd2]" />
                  <span>Link / Change Project</span>
                </button>
              </div>

              {/* Projects List */}
              {userProjects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {userProjects.map((proj) => (
                    <div
                      key={proj.projectId}
                      className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-[#006cd2]/60 transition-all shadow-xl space-y-5 flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#006cd2] bg-[#006cd2]/10 px-2.5 py-0.5 rounded-full border border-[#006cd2]/30">
                            LEVELUPDEV VERIFIED PROJECT
                          </span>
                          <span className="font-mono text-xs font-medium text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
                            {proj.status}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                          {proj.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {proj.description}
                        </p>

                        {/* Tech Stack Chips */}
                        <div className="space-y-1.5 pt-1">
                          <span className="font-mono text-[11px] text-slate-400 font-bold uppercase">
                            Technology Stack
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {proj.suggestedTech.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono text-[11px] border border-slate-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition"
                            >
                              <GithubIcon />
                              <span>Repository</span>
                            </a>
                          )}
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedProjectModal(proj)}
                          className="text-xs font-mono text-slate-400 hover:text-white transition"
                        >
                          View Breakdown →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty Project State */
                <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 mx-auto flex items-center justify-center text-slate-500 shadow-inner">
                    <Plus className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <h3 className="font-display text-lg font-bold text-white">Your Projects Will Appear Here</h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-400">
                      Select a project challenge, build the application, and submit your GitHub repository to display it
                      on your verified portfolio.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSelectingProject(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold shadow-md shadow-[#006cd2]/30 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Select Project to Build</span>
                  </button>
                </div>
              )}
            </section>
          )}

          {/* ========================================================================= */}
          {/* 5. ACHIEVEMENTS SECTION */}
          {/* ========================================================================= */}
          {!isRecruiterView && (activeFilter === 'all' || activeFilter === 'achievements') && (
            <section id="achievements" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>Achievements</span>
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 mt-0.5">
                    Milestones and collectible badges earned across learning trails and daily challenges.
                  </p>
                </div>

                <span className="font-mono text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 self-start sm:self-center">
                  {unlockedAchCount} of {achievements.length} Unlocked
                </span>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-3 group ${
                      ach.isUnlocked
                        ? `bg-slate-900/80 border-slate-800 hover:scale-[1.02] hover:shadow-lg shadow-black/40`
                        : 'bg-slate-950/40 border-slate-900 opacity-50 grayscale hover:opacity-75'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl p-2 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
                          {ach.icon}
                        </span>
                        {ach.isUnlocked ? (
                          <span className="font-mono text-[10px] text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-500/30 font-bold">
                            UNLOCKED
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] text-slate-400 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            <span>LOCKED</span>
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-display text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                          {ach.title}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 leading-snug">{ach.description}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/60 font-mono text-[11px] text-slate-400">
                      {ach.isUnlocked ? (
                        <span className="text-emerald-400">Earned: {ach.earnedDate}</span>
                      ) : (
                        <span className="text-slate-400">Unlock: {ach.criteria}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* 6. CERTIFICATIONS SECTION */}
          {/* ========================================================================= */}
          {(activeFilter === 'all' || activeFilter === 'certifications') && (
            <section id="certifications" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                    <span>Verified Certifications</span>
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 mt-0.5">
                    Official certificates granted upon 100% completion and assessment validation.
                  </p>
                </div>
              </div>

              {certifications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/40 hover:border-purple-400 transition-all shadow-xl space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center">
                            <Award className="w-6 h-6" />
                          </div>
                          <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/50">
                            OFFICIAL CREDENTIAL
                          </span>
                        </div>

                        <div>
                          <h3 className="font-display text-xl font-bold text-white">{cert.title}</h3>
                          <p className="font-mono text-xs text-slate-400 mt-0.5">{cert.issuedBy}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono text-xs">
                          <div className="flex justify-between text-slate-300">
                            <span>Credential ID:</span>
                            <span className="text-purple-300 font-bold">{cert.credentialId}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Issue Date:</span>
                            <span>{cert.issueDate}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Assessment Score:</span>
                            <span className="text-emerald-400">{cert.gradeScore}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => setSelectedCertModal(cert)}
                          className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-sans text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30"
                        >
                          <Award className="w-4 h-4" />
                          <span>View Certificate</span>
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(cert.verificationUrl);
                            alert(`Verification URL copied:\n${cert.verificationUrl}`);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono text-xs font-medium border border-slate-800 transition"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 mx-auto flex items-center justify-center text-slate-500 shadow-inner">
                    <Award className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <h3 className="font-display text-lg font-bold text-white">No Certifications Yet</h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-400">
                      Complete 100% of an eligible Skill Trail to automatically receive your verified digital certificate of completion.
                    </p>
                  </div>
                  <Link
                    href="/skills/python"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold shadow-md shadow-[#006cd2]/30 transition"
                  >
                    <span>Complete Skill Trail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </section>
          )}

          {/* ========================================================================= */}
          {/* 7. EXPERIENCE & EDUCATION TIMELINES */}
          {/* ========================================================================= */}
          {(activeFilter === 'all' || activeFilter === 'education') && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Experience Timeline */}
              <section className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#006cd2]" />
                    <span>Experience &amp; Leadership</span>
                  </h3>
                </div>

                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-display text-base font-bold text-white">{exp.role}</h4>
                          <div className="font-mono text-xs text-[#006cd2]">{exp.organization}</div>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                          {exp.period}
                        </span>
                      </div>

                      <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-300 leading-relaxed">
                        {exp.description.map((line, lIdx) => (
                          <li key={lIdx}>{line}</li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-mono text-[10px] border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education Timeline */}
              <section className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                    <span>Education</span>
                  </h3>
                </div>

                <div className="space-y-4">
                  {educations.map((edu) => (
                    <div key={edu.id} className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-display text-base font-bold text-white">{edu.degree}</h4>
                          <div className="font-mono text-xs text-cyan-400">{edu.major}</div>
                          <div className="font-sans text-xs text-slate-300 mt-0.5">{edu.institution}</div>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 shrink-0">
                          {edu.period}
                        </span>
                      </div>

                      <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-300 leading-relaxed">
                        {edu.highlights.map((line, lIdx) => (
                          <li key={lIdx}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 8. LEARNING ACTIVITY FOOTPRINT (HEATMAP) */}
          {/* ========================================================================= */}
          {!isRecruiterView && (activeFilter === 'all' || activeFilter === 'skills') && (
            <section id="activity" className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-display text-lg font-bold text-white">Learning Activity Footprint</h3>
                </div>
                <span className="font-mono text-xs text-slate-400">
                  DSA Solves &amp; Skill Trail Completions
                </span>
              </div>

              <HeatmapCalendar solvedDates={userData.streak?.solvedDates || []} />
            </section>
          )}
        </main>

        {/* ========================================================================= */}
        {/* FOOTER */}
        {/* ========================================================================= */}
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-500 font-mono text-xs py-8 px-6 md:px-12 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© 2024 LevelUpDev • Dynamic LMS &amp; Career Portfolio</div>
            <div className="flex items-center gap-4">
              <Link href="/roadmaps" className="hover:text-slate-300 transition-colors">
                Career Roadmaps
              </Link>
              <span>•</span>
              <Link href="/skills/python" className="hover:text-slate-300 transition-colors">
                Skill Trails
              </Link>
              <span>•</span>
              <Link href="/daily" className="hover:text-slate-300 transition-colors">
                Daily Challenges
              </Link>
              <span>•</span>
              <Link href="/leaderboard" className="hover:text-slate-300 transition-colors">
                Leaderboard
              </Link>
            </div>
          </div>
        </footer>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: EDIT PROFILE MODAL */}
      {/* ========================================================================= */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <Settings className="w-5 h-5 text-[#006cd2]" />
                <span>Edit Developer Profile</span>
              </div>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 font-sans text-xs">
              <div className="space-y-1">
                <label className="font-mono text-slate-300 font-bold uppercase">Full Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300 font-bold uppercase">Headline</label>
                <input
                  type="text"
                  value={headlineInput}
                  onChange={(e) => setHeadlineInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300 font-bold uppercase">Bio</label>
                <textarea
                  rows={3}
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300 font-bold uppercase">College / University</label>
                  <input
                    type="text"
                    value={collegeInput}
                    onChange={(e) => setCollegeInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-slate-300 font-bold uppercase">Major / Degree</label>
                  <input
                    type="text"
                    value={branchInput}
                    onChange={(e) => setBranchInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-slate-300 font-bold uppercase">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={githubInput}
                    onChange={(e) => setGithubInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-slate-300 font-bold uppercase">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={linkedinInput}
                    onChange={(e) => setLinkedinInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300 font-bold uppercase">Avatar Photo URL</label>
                <input
                  type="url"
                  value={photoInput}
                  onChange={(e) => setPhotoInput(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-semibold shadow-md shadow-[#006cd2]/30 transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: SHARE PORTFOLIO MODAL */}
      {/* ========================================================================= */}
      {isSharingProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <Share2 className="w-5 h-5 text-[#006cd2]" />
                <span>Share Developer Profile</span>
              </div>
              <button
                onClick={() => setIsSharingProfile(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-300 leading-relaxed">
                Share your verified LMS developer portfolio with recruiters, peers, and collaborators:
              </p>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between font-mono text-slate-300">
                <span className="truncate pr-2">
                  https://levelupdev.com/portfolio/{userData.uid ? userData.uid.slice(0, 12) : 'swamy'}
                </span>
                <button
                  onClick={handleCopyShareLink}
                  className="p-2 rounded-lg bg-[#006cd2] hover:bg-[#005bb5] text-white transition shrink-0"
                  title="Copy Link"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copiedLink && (
                <div className="text-emerald-400 font-mono text-[11px] text-center font-bold">
                  ✓ Public Portfolio Link copied to clipboard!
                </div>
              )}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-mono text-xs flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print Resume Summary</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: SKILL DETAIL MODAL */}
      {/* ========================================================================= */}
      {selectedSkillModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-slate-800">
                  {selectedSkillModal.skill.skillId.toLowerCase() === 'python' ? '🐍' : '⚡'}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{selectedSkillModal.skill.title}</h3>
                  <span className="font-mono text-xs text-emerald-400 font-bold">✓ Verified Skill Unlocked</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkillModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <span className="font-mono text-slate-400 font-bold uppercase">Skills Demonstrated:</span>
                <ul className="grid grid-cols-2 gap-1.5 text-slate-300 font-mono">
                  {selectedSkillModal.skill.modules.map((m) => (
                    <li key={m.moduleId} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{m.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-slate-400">Modules Completed:</div>
                  <div className="text-white font-bold mt-0.5">
                    {selectedSkillModal.completedCount} / {selectedSkillModal.totalCount} (100%)
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-slate-400">Assessment Score:</div>
                  <div className="text-emerald-400 font-bold mt-0.5">96% (Verified)</div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href={`/skills/${selectedSkillModal.skill.skillId.toLowerCase()}`}
                  className="flex-1 py-2.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-semibold text-center transition"
                >
                  View Learning Trail
                </Link>
                <button
                  onClick={() => setSelectedSkillModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono border border-slate-800 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: CERTIFICATE DETAIL MODAL */}
      {/* ========================================================================= */}
      {selectedCertModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/50 rounded-3xl max-w-xl w-full p-8 space-y-6 shadow-2xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-mono text-xs font-bold text-purple-300 uppercase tracking-wider">
                OFFICIAL CERTIFICATE OF COMPLETION
              </span>
              <button
                onClick={() => setSelectedCertModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Visual Box */}
            <div className="p-6 rounded-2xl bg-slate-950 border-2 border-purple-500/30 text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-400 text-purple-300 mx-auto flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  THIS IS TO CERTIFY THAT
                </span>
                <h3 className="font-display text-2xl font-extrabold text-white">{displayName}</h3>
                <p className="text-xs text-slate-300">has successfully completed the comprehensive engineering requirements for</p>
                <h4 className="font-display text-lg font-bold text-purple-300 pt-1">{selectedCertModal.title}</h4>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left font-mono text-[11px] pt-3 border-t border-slate-800/80 text-slate-400">
                <div>
                  <span className="text-slate-400">Issuer: </span>
                  <span className="text-slate-300">{selectedCertModal.issuedBy}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400">Date: </span>
                  <span className="text-slate-300">{selectedCertModal.issueDate}</span>
                </div>
                <div className="col-span-2 text-center text-purple-300 pt-1 font-bold">
                  Credential ID: {selectedCertModal.credentialId}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedCertModal.verificationUrl);
                  alert('Verification link copied to clipboard!');
                }}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-sans text-xs font-semibold transition shadow-md shadow-purple-600/30"
              >
                Copy Verification URL
              </button>
              <button
                onClick={() => setSelectedCertModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: SELECT / CHANGE PROJECT MODAL */}
      {/* ========================================================================= */}
      {isSelectingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-white">Select a Portfolio Project</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Choose a project to build and link its verified GitHub repository to your profile.
                </p>
              </div>
              <button
                onClick={() => setIsSelectingProject(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {allProjects.map((p) => (
                <div
                  key={p.projectId}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-[#006cd2] transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <h4 className="font-display text-base font-bold text-white">{p.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.suggestedTech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono text-[10px] border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectProjectIdea(p.projectId)}
                    className="px-4 py-2 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold rounded-xl shrink-0 transition"
                  >
                    Select Project
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: EDIT PROJECT LINKS MODAL */}
      {/* ========================================================================= */}
      {isEditingLinks && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display text-lg font-bold text-white">Link Project Repositories</h3>
              <button
                onClick={() => setIsEditingLinks(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProjectLinks} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="font-mono text-slate-300 font-bold uppercase">GitHub Repository URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/your-username/repo-name"
                  value={projGithubInput}
                  onChange={(e) => setProjGithubInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                  required
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-slate-300 font-bold uppercase">Live Deployed URL (Optional)</label>
                  <label className="flex items-center gap-1 text-[11px] font-mono text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasDeployed}
                      onChange={(e) => setHasDeployed(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-950 text-[#006cd2]"
                    />
                    <span>Has Live Demo</span>
                  </label>
                </div>
                {hasDeployed && (
                  <input
                    type="url"
                    placeholder="https://your-live-demo.com"
                    value={projLiveInput}
                    onChange={(e) => setProjLiveInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2] mt-1"
                  />
                )}
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingLinks(false)}
                  className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white font-mono transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProjectLinks || !projGithubInput}
                  className="px-5 py-2 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-semibold transition disabled:opacity-50"
                >
                  {savingProjectLinks ? 'Saving...' : 'Save Links'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
