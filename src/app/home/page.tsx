'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  getAllSkills,
  Skill,
  getAllProjects,
  getProjectById,
  getAllMiniProjects,
  getMiniProjectById,
  MiniProject,
  ProjectIdea,
  isAdminEmail,
  isPlacementPrepAllowed,
} from '@/lib/content';
import { UserPortfolioProject } from '@/context/AuthContext';
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
  Trash2,
  Globe,
  DollarSign,
  PieChart,
  CheckSquare,
  CloudRain,
  Book,
  Target,
  Clock,
  Zap,
  KeyRound,
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
  const {
    userData,
    loading,
    isDemoMode,
    updateProfile,
    updateUserProject,
    addProjectToPortfolio,
    updatePortfolioProject,
    removePortfolioProject,
    logout,
    syncLeetCodeStats,
    openChangePasswordModal,
  } = useAuth();
  const router = useRouter();

  // Welcome Screen State
  const [showWelcome, setShowWelcome] = useState(false);

  // Recruiter Mode Toggle
  const [isRecruiterView, setIsRecruiterView] = useState(false);

  // Active Section Filter
  const [activeFilter, setActiveFilter] = useState<'all' | 'skills' | 'projects' | 'achievements' | 'certifications' | 'education'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedSkillModal, setSelectedSkillModal] = useState<{
    skill: Skill;
    completedCount: number;
    totalCount: number;
    isEarned: boolean;
  } | null>(null);
  const [selectedProjectModal, setSelectedProjectModal] = useState<any | null>(null);
  const [selectedCertModal, setSelectedCertModal] = useState<PortfolioCertificate | null>(null);

  // 7-Day Mini Projects States
  const [isSelectingProject, setIsSelectingProject] = useState(false);
  const [searchMiniProject, setSearchMiniProject] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [viewingProjectDetails, setViewingProjectDetails] = useState<MiniProject | null>(null);
  const [editingProject, setEditingProject] = useState<UserPortfolioProject | null>(null);
  const [editForm, setEditForm] = useState({
    description: '',
    githubUrl: '',
    liveUrl: '',
    status: 'In Progress' as 'Selected' | 'In Progress' | 'Completed',
    tech: '',
  });
  const [urlError, setUrlError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Content Data
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [allProjects, setAllProjects] = useState<MiniProject[]>([]);

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
  const userProjects = useMemo<UserPortfolioProject[]>(() => {
    if (!userData) return [];

    if (userData.portfolioProjects && userData.portfolioProjects.length > 0) {
      return userData.portfolioProjects.map((p) => {
        const fullProj = getMiniProjectById(p.projectId);
        return {
          ...p,
          title: p.title || fullProj?.title || p.projectId,
          description: p.description || fullProj?.description || '',
          category: p.category || fullProj?.category || 'General',
          difficulty: p.difficulty || fullProj?.difficulty || 'Beginner',
          duration: p.duration || fullProj?.duration || '7 Days',
          suggestedTech: p.suggestedTech?.length ? p.suggestedTech : fullProj?.suggestedTech || [],
          githubUrl: p.githubUrl || null,
          liveUrl: p.liveUrl || null,
          status: p.status || (p.liveUrl ? 'Completed' : 'In Progress'),
          selectedDate: p.selectedDate || 'Aug 2026',
        };
      });
    }

    if (userData.selectedProjectId) {
      const proj = getMiniProjectById(userData.selectedProjectId);
      return [
        {
          projectId: userData.selectedProjectId,
          title: proj?.title || 'Selected Mini Project',
          description: proj?.description || '',
          category: proj?.category || 'Python',
          difficulty: proj?.difficulty || 'Beginner',
          duration: '7 Days',
          suggestedTech: proj?.suggestedTech || ['Python'],
          githubUrl: userData.projectGithubUrl || null,
          liveUrl: userData.projectLiveUrl || null,
          status: userData.projectLiveUrl ? 'Completed' : userData.projectGithubUrl ? 'In Progress' : 'Selected',
          selectedDate: 'Aug 2026',
        },
      ];
    }

    return [];
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSelectProjectFromDetails = async (project: MiniProject) => {
    if (isDemoMode) {
      alert('You are exploring in Demo Viewing Mode. Project changes are disabled in this preview.');
      return;
    }
    await addProjectToPortfolio(project);
    showToast(`"${project.title}" added to your portfolio! 🚀`);
    setViewingProjectDetails(null);
    setIsSelectingProject(false);
  };

  const handleOpenEditProject = (project: UserPortfolioProject) => {
    setEditingProject(project);
    setUrlError(null);
    setEditForm({
      description: project.description || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      status: project.status || 'In Progress',
      tech: (project.suggestedTech || []).join(', '),
    });
  };

  const handleSaveEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    // Validate URLs
    const cleanGh = editForm.githubUrl.trim();
    const cleanLive = editForm.liveUrl.trim();

    if (cleanGh && !cleanGh.startsWith('http://') && !cleanGh.startsWith('https://')) {
      setUrlError('Please enter a valid GitHub URL starting with https:// or http://');
      return;
    }
    if (cleanLive && !cleanLive.startsWith('http://') && !cleanLive.startsWith('https://')) {
      setUrlError('Please enter a valid Live Demo URL starting with https:// or http://');
      return;
    }

    setUrlError(null);
    const techArray = editForm.tech
      ? editForm.tech.split(',').map((t) => t.trim()).filter(Boolean)
      : editingProject.suggestedTech;

    await updatePortfolioProject(editingProject.projectId, {
      description: editForm.description,
      githubUrl: cleanGh || null,
      liveUrl: cleanLive || null,
      status: editForm.status,
      suggestedTech: techArray,
    });

    showToast('Project updated successfully! ✓');
    setEditingProject(null);
  };

  const handleRemoveProject = async (projectId: string) => {
    if (confirm('Are you sure you want to remove this project from your portfolio?')) {
      await removePortfolioProject(projectId);
      showToast('Project removed from portfolio.');
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const displayName = userData.name || userData.username || 'Developer';
  const displayHeadline = userData.headline || 'AIML Developer • ML Enthusiast • Full-Stack Builder';
  const displayCollege = userData.college || 'Swarnandhra College of Engineering & Technology';
  const displayBranch = userData.branch || 'Artificial Intelligence & Machine Learning';
  const displayDegree = userData.degree || 'BTech';
  const displayRegNo = userData.registerNumber || '';
  const displayYear = userData.currentYear || '';
  const displayGradYear = userData.graduationYear || '';
  const displayBio =
    userData.bio ||
    userData.shortBio ||
    'Building intelligent products while continuously learning and shipping projects. Passionate about machine learning pipelines, backend systems, and clean developer tooling.';
  const displayAboutMe = userData.aboutMe || '';
  const displayLocation = [userData.city, userData.state, userData.country].filter(Boolean).join(', ') || 'India';
  const displayCareerInterest = userData.careerInterest || '';

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

      <div className="relative z-10 flex flex-col min-h-screen pb-mobile-nav">
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
                Level<span className="text-[#006cd2]">Up</span>Dev <span className="text-slate-500 font-mono text-xs font-normal">/ Portfolio</span>
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
            <Link className="text-[#006cd2] font-semibold flex items-center gap-1" href="/home">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </Link>
            <Link className="text-slate-300 hover:text-white transition flex items-center gap-1" href="/dashboard">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dashboard</span>
            </Link>
            <Link className="text-slate-300 hover:text-white transition" href="/roadmaps">
              Career Roadmaps
            </Link>
            <Link className="text-slate-300 hover:text-white transition" href="/internships">
              Internships
            </Link>
            <Link className="text-slate-300 hover:text-white transition" href="/skills">
              Skills Trail
            </Link>
            <Link className="text-slate-300 hover:text-white transition" href="/daily">
              Daily Challenge
            </Link>
            <Link className="text-slate-300 hover:text-white transition" href="/leaderboard">
              Leaderboard
            </Link>
            {isPlacementPrepAllowed(userData?.email) && (
              <Link
                className="text-amber-300 font-bold hover:text-white transition flex items-center gap-1 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30 text-xs"
                href="/placement-preparation"
              >
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>Placement Prep</span>
              </Link>
            )}
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

            {/* Change Password Button */}
            {!isDemoMode && (
              <button
                onClick={() => openChangePasswordModal(false)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
                title="Change Account Password"
              >
                <KeyRound className="w-4 h-4 text-blue-400" />
              </button>
            )}

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
                    referrerPolicy="no-referrer"
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
                    <span>{displayLocation}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      {displayDegree} • {displayBranch}
                    </span>
                  </span>
                  {displayRegNo && (
                    <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                      <span className="text-[#006cd2] font-bold">ID:</span>
                      <span>{displayRegNo}</span>
                    </span>
                  )}
                  {displayYear && (
                    <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      <span>{displayYear}</span>
                      {displayGradYear && <span className="text-slate-500">• Grad &apos;{displayGradYear.slice(-2)}</span>}
                    </span>
                  )}
                  {displayCareerInterest && (
                    <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-amber-300">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{displayCareerInterest}</span>
                    </span>
                  )}
                </div>

                {/* Social Badges & Links */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  {userData.githubUrl && (
                    <a
                      href={userData.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-[#006cd2] text-xs font-mono flex items-center gap-2 transition"
                    >
                      <GithubIcon />
                      <span>GitHub</span>
                    </a>
                  )}
                  {userData.linkedinUrl && (
                    <a
                      href={userData.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-[#006cd2] text-xs font-mono flex items-center gap-2 transition"
                    >
                      <LinkedinIcon />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {userData.websiteUrl && (
                    <a
                      href={userData.websiteUrl.startsWith('http') ? userData.websiteUrl : `https://${userData.websiteUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-[#006cd2] text-xs font-mono flex items-center gap-2 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Portfolio Web</span>
                    </a>
                  )}
                  {userData.showEmailPublicly && (userData.contactEmail || userData.personalEmail) && (
                    <a
                      href={`mailto:${userData.contactEmail || userData.personalEmail}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono flex items-center gap-1.5 transition"
                      title="Contact Email"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#006cd2]" />
                      <span>{userData.contactEmail || userData.personalEmail}</span>
                    </a>
                  )}
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
          {/* 4. PROJECTS SECTION (7-DAY MINI PROJECTS) */}
          {/* ========================================================================= */}
          {(activeFilter === 'all' || activeFilter === 'projects') && (
            <section id="projects" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                      <FolderGit2 className="w-5 h-5 text-[#006cd2]" />
                      <span>Projects</span>
                    </h2>
                    <span className="font-mono text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                      7-DAY MINI PROJECTS
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
                    Practical, production-focused applications built, deployed, and verified through LevelUpDev.
                  </p>
                </div>

                <button
                  onClick={() => setIsSelectingProject(true)}
                  className="px-4 py-2 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs font-semibold flex items-center gap-2 transition self-start sm:self-center shadow-md shadow-[#006cd2]/20 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Explore 7-Day Mini Projects</span>
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
                      <div className="space-y-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold text-[#006cd2] bg-[#006cd2]/10 px-2.5 py-0.5 rounded-full border border-[#006cd2]/30">
                              {proj.category || '7-Day Project'}
                            </span>
                            <span className="font-mono text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
                              {proj.duration || '7 Days'}
                            </span>
                          </div>

                          <span
                            className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                              proj.status === 'Completed'
                                ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
                                : proj.status === 'In Progress'
                                ? 'text-amber-400 bg-amber-950/60 border-amber-800/40'
                                : 'text-blue-300 bg-blue-950/60 border-blue-800/40'
                            }`}
                          >
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
                          <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            Technologies
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
                      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {proj.githubUrl ? (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition shadow-sm"
                            >
                              <GithubIcon />
                              <span>View GitHub →</span>
                            </a>
                          ) : (
                            <button
                              onClick={() => handleOpenEditProject(proj)}
                              className="px-3 py-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white font-mono text-xs border border-dashed border-slate-700 flex items-center gap-1.5 transition"
                            >
                              <GithubIcon />
                              <span>+ Add GitHub URL</span>
                            </button>
                          )}

                          {proj.liveUrl ? (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>View Live Project →</span>
                            </a>
                          ) : (
                            <button
                              onClick={() => handleOpenEditProject(proj)}
                              className="px-2.5 py-1 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-500 hover:text-slate-300 font-mono text-[11px] border border-slate-800/80 transition"
                            >
                              <span>Live Demo — Not added yet</span>
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => {
                              const found = getMiniProjectById(proj.projectId);
                              if (found) setViewingProjectDetails(found);
                              else setViewingProjectDetails(proj as any);
                            }}
                            className="text-xs font-mono text-blue-400 hover:text-blue-300 transition underline underline-offset-4"
                          >
                            View 7-Day Plan →
                          </button>

                          <button
                            onClick={() => handleOpenEditProject(proj)}
                            className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                            title="Edit Project"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleRemoveProject(proj.projectId)}
                            className="p-1.5 rounded-lg bg-slate-950 hover:bg-red-950/40 text-slate-500 hover:text-rose-400 border border-slate-800 transition"
                            title="Remove from Portfolio"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty Project State */
                <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 mx-auto flex items-center justify-center text-slate-500 shadow-inner">
                    <FolderGit2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="space-y-1.5 max-w-md mx-auto">
                    <h3 className="font-display text-lg font-bold text-white">Your 7-Day Projects Will Appear Here</h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                      Choose from our curated 7-Day Mini Projects library, follow the day-by-day roadmap, and link your verified GitHub repository and live demo to your portfolio.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSelectingProject(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold shadow-md shadow-[#006cd2]/30 transition"
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
              <Link href="/skills" className="hover:text-slate-300 transition-colors">
                Skills Trail
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

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-[#006cd2]/80 text-white font-mono text-xs px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: 7-DAY MINI PROJECTS DISCOVERY MODAL */}
      {/* ========================================================================= */}
      {isSelectingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in my-8 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-2xl font-extrabold text-white">7-Day Mini Projects</h3>
                  <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                    CURATED LIBRARY
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  Build something real. Learn by doing. Complete it in 7 days.
                </p>
              </div>
              <button
                onClick={() => setIsSelectingProject(false)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Information Banner */}
            <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/40 flex items-center gap-3 text-xs text-blue-200 font-sans">
              <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
              <span>
                <strong>Every project is designed to be completed within 7 days</strong> by a beginner/intermediate developer. Select a project to view the day-by-day plan or add it directly to your portfolio.
              </span>
            </div>

            {/* Search and Filters Bar */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search mini projects by name, technology, or skills..."
                  value={searchMiniProject}
                  onChange={(e) => setSearchMiniProject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#006cd2]"
                />
              </div>

              {/* Category & Difficulty Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['All', 'Python', 'Web Development', 'SQL / Database', 'DSA', 'AI / ML'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg font-mono text-xs transition ${
                        selectedCategory === cat
                          ? 'bg-[#006cd2] text-white font-bold shadow-sm'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Difficulty Pills */}
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] text-slate-500 uppercase">Difficulty:</span>
                  {['All', 'Beginner', 'Intermediate'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-2.5 py-0.5 rounded font-mono text-[11px] transition ${
                        selectedDifficulty === diff
                          ? 'bg-slate-800 text-white font-bold border border-slate-600'
                          : 'bg-slate-950 text-slate-500 hover:text-slate-300 border border-slate-800/80'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="overflow-y-auto pr-1 flex-1 space-y-4">
              {(() => {
                const filtered = getAllMiniProjects().filter((p) => {
                  const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
                  const matchDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
                  const q = searchMiniProject.toLowerCase().trim();
                  const matchSearch =
                    !q ||
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.suggestedTech.some((t) => t.toLowerCase().includes(q)) ||
                    p.learnSkills.some((s) => s.toLowerCase().includes(q));
                  return matchCat && matchDiff && matchSearch;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="p-8 text-center text-slate-500 space-y-2">
                      <Search className="w-8 h-8 mx-auto text-slate-600" />
                      <p className="font-mono text-xs">No mini projects found matching your filters.</p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map((p) => {
                      const isAlreadyInPortfolio = userProjects.some((up) => up.projectId === p.projectId);

                      return (
                        <div
                          key={p.projectId}
                          className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-[#006cd2]/70 transition flex flex-col justify-between space-y-4 group"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30">
                                {p.category}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30 font-medium">
                                  {p.difficulty}
                                </span>
                                <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                  7 Days
                                </span>
                              </div>
                            </div>

                            <h4 className="font-display text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                              {p.title}
                            </h4>

                            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                              {p.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-1 pt-1">
                              {p.suggestedTech.slice(0, 4).map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono text-[10px] border border-slate-800"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                            <button
                              onClick={() => setViewingProjectDetails(p)}
                              className="text-xs font-mono text-slate-300 hover:text-white transition flex items-center gap-1"
                            >
                              <span>Explore 7-Day Plan</span>
                              <ArrowRight className="w-3 h-3 text-[#006cd2]" />
                            </button>

                            {isAlreadyInPortfolio ? (
                              <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800/50 font-bold flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                <span>In Portfolio</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => handleSelectProjectFromDetails(p)}
                                className="px-3.5 py-1.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold rounded-xl transition shadow-sm flex items-center gap-1"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add to Portfolio</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: DEDICATED 7-DAY PROJECT DETAILS MODAL */}
      {/* ========================================================================= */}
      {viewingProjectDetails && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in my-8 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                    {viewingProjectDetails.category}
                  </span>
                  <span className="font-mono text-xs text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    {viewingProjectDetails.difficulty}
                  </span>
                  <span className="font-mono text-xs text-slate-300 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800 font-bold">
                    ⏱ 7 Days
                  </span>
                </div>
                <h3 className="font-display text-2xl font-extrabold text-white">{viewingProjectDetails.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400">{viewingProjectDetails.description}</p>
              </div>

              <button
                onClick={() => setViewingProjectDetails(null)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="overflow-y-auto pr-2 space-y-6 flex-1 text-xs font-sans">
              {/* 1. Project Overview & Problem Statement */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <h4 className="font-mono text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                    1. Project Overview
                  </h4>
                  <p className="text-slate-300 leading-relaxed">{viewingProjectDetails.overview}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <h4 className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    2. Problem Statement
                  </h4>
                  <p className="text-slate-300 leading-relaxed">{viewingProjectDetails.problemStatement}</p>
                </div>
              </div>

              {/* 3. What You'll Learn */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-mono text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  3. What You Will Learn
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {viewingProjectDetails.learnSkills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 & 5. Core Features & Optional Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-mono text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                    4. Core Features
                  </h4>
                  <ul className="space-y-1.5 text-slate-300">
                    {viewingProjectDetails.coreFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    5. Optional / Extension Features
                  </h4>
                  <ul className="space-y-1.5 text-slate-400">
                    {viewingProjectDetails.optionalFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 6. Recommended Tech Stack */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  6. Recommended Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {viewingProjectDetails.suggestedTech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-slate-900 text-blue-300 font-mono text-xs border border-slate-800 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 7. 7-Day Development Plan Timeline */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                    7. 7-Day Step-by-Step Development Plan
                  </h4>
                  <span className="font-mono text-[10px] text-slate-500">Day 1 → Day 7</span>
                </div>

                <div className="space-y-3 pt-1">
                  {viewingProjectDetails.sevenDayPlan.map((step) => (
                    <div key={step.day} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <div className="w-12 shrink-0 text-center font-mono font-bold text-xs text-blue-400 bg-blue-500/10 py-1 rounded-lg border border-blue-500/30">
                        Day {step.day}
                      </div>
                      <div className="space-y-1">
                        <div className="font-display text-xs font-bold text-white">{step.title}</div>
                        <ul className="space-y-0.5 text-slate-400 text-[11px]">
                          {step.tasks.map((task, tIdx) => (
                            <li key={tIdx} className="flex items-center gap-1.5">
                              <span className="text-slate-600">→</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8 & 9. Expected Result & Portfolio Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <h4 className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    8. Expected Final Result
                  </h4>
                  <p className="text-slate-400 leading-relaxed">{viewingProjectDetails.expectedResult}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <h4 className="font-mono text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                    9. Recruiter & Portfolio Value
                  </h4>
                  <p className="text-slate-400 leading-relaxed">{viewingProjectDetails.portfolioValue}</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setViewingProjectDetails(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 text-slate-400 hover:text-white font-mono text-xs border border-slate-800 transition"
              >
                Close Breakdown
              </button>

              <button
                type="button"
                onClick={() => handleSelectProjectFromDetails(viewingProjectDetails)}
                className="px-6 py-2.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold shadow-lg shadow-[#006cd2]/30 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add to My Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 7: IN-PLACE EDIT PROJECT MODAL */}
      {/* ========================================================================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-white">Edit Portfolio Project</h3>
                <p className="text-xs text-slate-400">{editingProject.title}</p>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {urlError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-xs text-red-300 font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{urlError}</span>
              </div>
            )}

            <form onSubmit={handleSaveEditProject} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="font-mono text-slate-300 font-bold uppercase">Project Description</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Summarize the core features and architecture..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2] resize-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300 font-bold uppercase">Project Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                >
                  <option value="Selected">Selected</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300 font-bold uppercase">GitHub Repository URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/your-username/repo-name"
                  value={editForm.githubUrl}
                  onChange={(e) => setEditForm({ ...editForm, githubUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300 font-bold uppercase">Live Deployed URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://your-live-deployment.app"
                  value={editForm.liveUrl}
                  onChange={(e) => setEditForm({ ...editForm, liveUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-300 font-bold uppercase">Technologies (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Python, Streamlit, Pandas, Scikit-learn"
                  value={editForm.tech}
                  onChange={(e) => setEditForm({ ...editForm, tech: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#006cd2]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white font-mono transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-semibold transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
