'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getAllSkills, Skill, getAllProjects, getProjectById, ProjectIdea, isAdminEmail } from '@/lib/content';
import { HeatmapCalendar } from '@/components/HeatmapCalendar';
import { WelcomeScreen } from '@/components/WelcomeScreen';
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

export default function HomePage() {
  const { userData, loading, updateProfile, updateUserProject, logout, syncLeetCodeStats } = useAuth();
  const router = useRouter();

  // Welcome Screen State
  const [showWelcome, setShowWelcome] = useState(false);

  // Edit Profile Modal / Form State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [headlineInput, setHeadlineInput] = useState('');
  const [bioInput, setBioInput] = useState('');
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

  // Parallax backdrop
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Static Content
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [allProjects, setAllProjects] = useState<ProjectIdea[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      setNameInput(userData.name || 'Kalyan Reddy');
      setHeadlineInput(userData.headline || 'Aspiring Backend Developer');
      setBioInput(
        userData.bio ||
          'Passionate about building scalable backend microservices, algorithmic optimization, and cloud-native architectures. Currently exploring Python internals and distributed systems.'
      );
      setCollegeInput(userData.college || 'XYZ Institute of Technology');
      setBranchInput(userData.branch || 'B.Tech, CSE');
      setGithubInput(userData.githubUrl || 'https://github.com');
      setLinkedinInput(userData.linkedinUrl || 'https://linkedin.com');
      setLeetcodeInput(userData.leetcodeId || 'Swamy_Guradasu');
      setPhotoInput(userData.photoUrl || '');

      // Project links
      setProjGithubInput(userData.projectGithubUrl || 'https://github.com/example/task-queue');
      setProjLiveInput(userData.projectLiveUrl || 'https://task-queue-demo.example.com');
      setHasDeployed(!!userData.projectLiveUrl);
    }
  }, [userData]);

  useEffect(() => {
    setAllSkills(getAllSkills());
    setAllProjects(getAllProjects());
  }, []);

  if (loading || !userData) {
    return (
      <div className="min-h-screen topo-bg flex items-center justify-center text-[#0F2E28] font-mono text-sm">
        <div className="flex items-center gap-3 bg-white/90 px-6 py-4 rounded-2xl shadow-sm border border-[#5C7A6B]/20">
          <div className="w-5 h-5 border-2 border-[#0F2E28] border-t-transparent rounded-full animate-spin" />
          <span>Syncing Digital Resume Portfolio...</span>
        </div>
      </div>
    );
  }

  // Handle Save Profile Updates
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleManualLeetCodeSync = async () => {
    setSyncingLeetCode(true);
    await syncLeetCodeStats();
    setSyncingLeetCode(false);
  };

  // Select a project idea from list
  const handleSelectProjectIdea = async (projectId: string) => {
    setIsSelectingProject(false);
    await updateUserProject(projectId, null, null);
    setProjGithubInput('');
    setProjLiveInput('');
    setHasDeployed(false);
    setIsEditingLinks(true);
  };

  // Save Project Links
  const handleSaveProjectLinks = async (e: React.FormEvent) => {
    e.preventDefault();
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

  // Confirm Change Project (Clears saved links & resets selection)
  const handleConfirmChangeProject = async () => {
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

  const defaultAvatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCeImeuYYYUrCiVonGEBFUpCkEZiehGncFXeYHxaVkJl8fxQflctQxvXzd_sgXHjlOO9sjk_p2uTzRRTOu0chpmEn32zM5aJbOALiZEjm1pFnCqktUT5w9_2VHjtJdEU-7Dgw2Uj52To4J80eBe-Eb6rnLSnvX2d13dzXYgNM7OxwV7dqWBA_x2LA6fjraZrCAqmlgF5zXHVgFv4RcTA2Mw00lEFupmVx_9RBhYQt5U6OC5juqv46SkRg';

  // Selected Project Object
  const selectedProjId = userData.selectedProjectId ?? 'task-queue';
  const currentProject = selectedProjId ? getProjectById(selectedProjId) : null;

  const displayName = userData.name || 'Member';
  const displayHeadline = userData.headline || 'Learning Developer';
  const displayCollege = userData.college || 'Swarnandhra College of Engineering and Technology';
  const displayBranch = userData.branch || 'AIML';
  const displayBio =
    userData.bio ||
    'Passionate developer learning with LevelUpDev group.';

  // Dynamic Python progress calculation
  const pythonProgressObj = userData.progress?.python || {};
  const pythonSkillDef = allSkills.find((s) => s.skillId.toLowerCase() === 'python');
  const pythonModules = pythonSkillDef?.modules || [];
  const pythonTotalCount = pythonModules.length || 7;
  const pythonCompletedCount = pythonModules.filter((m) => pythonProgressObj[m.moduleId] === true).length;
  const pythonPercentage = Math.round((pythonCompletedCount / pythonTotalCount) * 100);
  const isPythonStarted = pythonCompletedCount > 0;
  const PALOMAR_VIDEO_URL =
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260820_010308_b1636845-4c15-4ab6-b0c9-9a29bfb0c6e3.mp4';

  return (
    <div className="relative min-h-screen bg-black text-[#1A1C1B] flex flex-col font-sans antialiased overflow-x-hidden select-none">
      {/* Palomar Video Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          src={PALOMAR_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col flex-1">
        {/* Welcome Overlay */}
        {showWelcome && (
          <WelcomeScreen userData={userData} onComplete={handleWelcomeComplete} />
        )}

        {/* Navigation Bar */}
        <header className="bg-stone-900/80 backdrop-blur-xl border-b border-white/10 w-full top-0 left-0 flex justify-between items-center px-6 md:px-12 py-4 z-50 sticky">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 border border-white/15 p-1 flex items-center justify-center shadow-md">
              <img src="/levelupdev-icon.png" alt="LevelUpDev Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              LevelUpDev <span className="text-stone-400 font-mono text-xs font-normal">/ Trail Tracker</span>
            </span>
          </div>

          <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
            <Link className="text-white font-semibold hover:text-[#e8702a] transition" href="/home">
              Portfolio
            </Link>
            <Link className="text-stone-300 hover:text-white transition" href="/skills/python">
              Skill Trails
            </Link>
            <Link className="text-stone-300 hover:text-white transition" href="/daily">
              Daily Challenge
            </Link>
            <Link className="text-stone-300 hover:text-white transition" href="/leaderboard">
              Leaderboard
            </Link>
            {isAdminEmail(userData?.email || '') && (
              <Link
                className="text-amber-300 font-bold hover:text-white transition flex items-center gap-1 bg-[#e8702a]/20 px-2.5 py-1 rounded-full border border-[#e8702a]/40"
                href="/admin"
              >
                Admin Console
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditingProfile(true)}
              className="p-2 rounded-xl hover:bg-white/10 text-stone-200 transition"
              title="Edit Portfolio Profile"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl hover:bg-rose-500/20 text-rose-400 transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Container */}
        <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-12 py-8 space-y-10">
          {/* 1. Currently Learning Highlight Strip (Top) */}
          <section className="w-full bg-stone-900/85 backdrop-blur-xl text-white rounded-3xl p-5 md:p-6 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8702a]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#e8702a]/20 border border-[#e8702a]/40 flex items-center justify-center text-[#e8702a] shrink-0 shadow-inner">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#e8702a] uppercase tracking-wider">
                    Active Learning Focus
                  </span>
                  <span className="px-2 py-0.5 rounded bg-stone-800 text-xs font-mono text-stone-300 border border-white/10">
                    {isPythonStarted ? 'IN PROGRESS' : 'NOT STARTED'}
                  </span>
                </div>
                <h2 className="font-display font-semibold text-lg md:text-xl text-white mt-0.5">
                  {userData.lastActiveModule
                    ? `Python Skill Trail — ${userData.lastActiveModule.moduleTitle} (${pythonCompletedCount}/${pythonTotalCount} Completed)`
                    : isPythonStarted
                    ? `Python Skill Trail — In Progress (${pythonCompletedCount}/${pythonTotalCount} Completed)`
                    : `Python Skill Trail — Get Started with Python Core Basics (0/${pythonTotalCount} Completed)`}
                </h2>
              </div>
            </div>

            <Link
              href="/skills/python"
              className="w-full md:w-auto px-6 py-3 bg-[#e8702a] hover:bg-[#d2611f] text-white font-sans font-semibold rounded-full transition shadow-lg shadow-[#e8702a]/30 flex items-center justify-center gap-2 shrink-0 relative z-10"
            >
              <span>{isPythonStarted ? 'Resume Trail' : 'Start Skill Trail'}</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </section>

          {/* 2. Professional Resume Header Section */}
          <section className="bg-stone-900/85 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start gap-8">
            {/* Profile Photo Avatar */}
            <div className="relative shrink-0 mx-auto md:mx-0">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-[#e8702a] via-amber-400 to-[#e8702a] shadow-xl overflow-hidden bg-stone-900">
                <img
                  className="w-full h-full rounded-full object-cover border-2 border-stone-900"
                  src={userData.photoUrl && userData.photoUrl.trim() !== '' ? userData.photoUrl : defaultAvatar}
                  alt={displayName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultAvatar;
                  }}
                />
              </div>
              {/* Streak Badge Pill */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#e8702a] text-white px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg border-2 border-stone-900 text-xs font-mono font-bold whitespace-nowrap">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>{userData.streak?.currentStreak || 0} Day Solve Streak</span>
              </div>
            </div>

            {/* Resume Bio & Header Meta */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      {displayName}
                    </h1>
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition"
                      title="Edit Profile"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-sans text-base font-semibold text-[#e8702a] mt-0.5">
                    {displayHeadline}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 font-mono text-xs text-stone-200 bg-stone-800/80 px-3.5 py-1.5 rounded-full border border-white/10">
                  <GraduationCap className="w-4 h-4 text-[#e8702a]" />
                  <span>{displayCollege}</span>
                  <span>•</span>
                  <span className="font-bold text-amber-300">{displayBranch}</span>
                </div>
              </div>

              <p className="font-sans text-sm text-stone-300 leading-relaxed max-w-3xl">
                {displayBio}
              </p>

              {/* Social & Contact Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 font-mono text-xs">
                <a
                  href={userData.githubUrl || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-white border border-white/10 hover:border-[#e8702a] transition flex items-center gap-2"
                >
                  <GithubIcon />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href={userData.linkedinUrl || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-white border border-white/10 hover:border-[#e8702a] transition flex items-center gap-2"
                >
                  <LinkedinIcon />
                  <span>LinkedIn Connect</span>
                </a>
                <div className="px-3 py-1.5 rounded-lg bg-stone-800/80 text-stone-300 border border-white/10 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#e8702a]" />
                  <span>{userData.email || 'kalyan.reddy@example.com'}</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Skills Section (Printable Resume Style) */}
          <section className="bg-stone-900/85 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                  <Code2 className="w-6 h-6 text-[#e8702a]" />
                  <span>Technical Skills &amp; Proficiency</span>
                </h2>
                <p className="font-sans text-xs text-stone-400 mt-0.5">
                  Verified skill modules and learning milestones completed on Trail Tracker.
                </p>
              </div>
              <span className="font-mono text-xs px-3 py-1 bg-stone-800 text-stone-300 rounded-full border border-white/10">
                RESUME PROFICIENCY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skill Card 1: Dynamic Python Card -> Clickable Link to /skills/python */}
              <Link
                href="/skills/python"
                className="p-6 rounded-2xl bg-stone-900/90 backdrop-blur-2xl border border-[#e8702a]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(232,112,42,0.2)] hover:border-[#e8702a] hover:shadow-[0_0_30px_rgba(232,112,42,0.3)] hover:scale-[1.01] transition-all duration-300 block group cursor-pointer relative"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-bold text-[#e8702a] uppercase tracking-wider">
                      {isPythonStarted ? `IN PROGRESS • ${pythonPercentage}% COMPLETE` : 'NOT STARTED • 0% COMPLETE'}
                    </span>
                    <h3 className="font-display text-xl font-extrabold text-white mt-0.5 group-hover:text-amber-300 transition-colors flex items-center gap-2">
                      <span>Python Programming &amp; Core Systems</span>
                      <ExternalLink className="w-4 h-4 text-[#e8702a] opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-[#e8702a]/20 text-amber-300 font-mono text-xs font-bold rounded-md border border-[#e8702a]/40">
                    {pythonCompletedCount} / {pythonTotalCount} Modules
                  </span>
                </div>

                <div className="space-y-1.5 mt-4">
                  <div className="flex justify-between text-xs font-mono text-stone-300">
                    <span>Progress: {pythonCompletedCount} of {pythonTotalCount} completed</span>
                    <span className="text-[#e8702a] font-bold">{pythonPercentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-[#e8702a] transition-all duration-300 rounded-full shadow-sm"
                      style={{ width: `${pythonPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-3 font-mono text-xs">
                  {pythonModules.length > 0 ? (
                    pythonModules.map((m) => {
                      const isDone = pythonProgressObj[m.moduleId] === true;
                      return (
                        <span
                          key={m.moduleId}
                          className={`px-2.5 py-1 rounded-md border transition-colors ${
                            isDone
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold'
                              : 'bg-stone-800/80 text-stone-300 border-white/10'
                          }`}
                        >
                          {m.title.split(':')[0]} {isDone ? '✓' : ''}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-xs font-mono text-stone-400">7 Core Modules</span>
                  )}
                </div>
              </Link>
            </div>
          </section>

        {/* 4. Featured Projects Section (Dynamic & Interactive) */}
        <section className="bg-stone-900/85 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-6 h-6 text-[#e8702a]" />
                <span>Featured Engineering Project</span>
              </h2>
              <p className="font-sans text-xs text-stone-400 mt-0.5">
                Practical, production-style project selected for portfolio showcase.
              </p>
            </div>
            {currentProject && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditingLinks(true)}
                  className="font-mono text-xs px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-full border border-white/10 transition flex items-center gap-1.5"
                >
                  <Pencil className="w-3 h-3 text-[#e8702a]" />
                  <span>Edit Links</span>
                </button>
                <button
                  onClick={() => setIsConfirmingChange(true)}
                  className="font-mono text-xs px-3 py-1.5 bg-stone-800 hover:bg-[#e8702a]/20 text-white hover:text-amber-300 rounded-full border border-white/10 transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3 text-[#e8702a]" />
                  <span>Change Project</span>
                </button>
              </div>
            )}
          </div>

          {/* Case A: No Project Selected Yet */}
          {!userData.selectedProjectId && (
            <div className="p-10 rounded-2xl bg-stone-950/60 border border-dashed border-white/15 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#e8702a]/15 border border-[#e8702a]/30 flex items-center justify-center text-[#e8702a]">
                <FolderGit2 className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-md">
                <h3 className="font-display text-lg font-bold text-white">
                  Choose a Project to Showcase
                </h3>
                <p className="font-sans text-xs text-stone-300 leading-relaxed">
                  Select a capstone project idea from our curated list to build and add to your digital resume.
                </p>
              </div>
              <button
                onClick={() => setIsSelectingProject(true)}
                className="px-6 py-2.5 bg-[#e8702a] hover:bg-[#d2611f] text-white font-sans font-semibold rounded-full transition shadow-lg shadow-[#e8702a]/30 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Choose a Project Idea</span>
              </button>
            </div>
          )}

          {/* Case B: Project Selected & GitHub Link Saved (Active Portfolio Card) */}
          {currentProject && (
            <div className="p-6 md:p-8 rounded-2xl bg-stone-950/70 border border-white/10 space-y-4 relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-[11px] font-bold text-[#e8702a] uppercase tracking-wider">
                    FEATURED CAPSTONE • IN PORTFOLIO
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mt-0.5">
                    {currentProject.title}
                  </h3>
                </div>

                <div className="flex gap-2 shrink-0">
                  {userData.projectGithubUrl ? (
                    <a
                      href={userData.projectGithubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-white border border-white/10 font-mono text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm"
                    >
                      <GithubIcon />
                      <span>View Code</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => setIsEditingLinks(true)}
                      className="px-3 py-1.5 bg-[#e8702a]/20 text-amber-300 border border-[#e8702a]/40 font-mono text-xs font-semibold rounded-xl flex items-center gap-1.5"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Add GitHub Link</span>
                    </button>
                  )}

                  {userData.projectLiveUrl && (
                    <a
                      href={userData.projectLiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-[#e8702a] hover:bg-[#d2611f] text-white font-mono text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-[#e8702a]/30"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              <p className="font-sans text-sm text-stone-300 leading-relaxed">
                {currentProject.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-2 font-mono text-xs">
                {currentProject.suggestedTech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-stone-800 text-stone-200 border border-white/10 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 5. LeetCode Live Problem Solving Tracker Section (Only shown if LeetCode ID is registered in CSV) */}
        {userData.leetcodeId && userData.leetcodeId.trim().length > 0 && (
          <section className="bg-stone-900/85 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e8702a]/20 text-amber-300 border border-[#e8702a]/40 text-[11px] font-mono font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#e8702a]" /> AUTOMATIC LIVE TRACKING
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2 mt-1">
                  <Code2 className="w-6 h-6 text-[#e8702a]" />
                  <span>LeetCode Solved Problems Tracker</span>
                </h2>
                <p className="font-sans text-xs text-stone-400 mt-0.5">
                  Automatically syncs live LeetCode stats when you solve problems on LeetCode.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleManualLeetCodeSync}
                  disabled={syncingLeetCode || !userData.leetcodeId}
                  className="px-4 py-2 bg-[#e8702a] text-white hover:bg-[#d2611f] font-mono text-xs font-bold rounded-full transition flex items-center gap-2 border border-[#e8702a]/30 shadow-lg shadow-[#e8702a]/30 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncingLeetCode ? 'animate-spin' : ''}`} />
                  <span>{syncingLeetCode ? 'Syncing...' : 'Sync Live Stats'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Total Solved Highlight */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-stone-950/70 text-white border border-white/10 space-y-4 relative overflow-hidden flex flex-col justify-between shadow-xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#e8702a]/10 rounded-full blur-xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#e8702a] font-bold uppercase tracking-wider">
                      LeetCode Profile ID
                    </span>
                    <a
                      href={`https://leetcode.com/u/${userData.leetcodeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-white/80 hover:text-amber-300 flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full border border-white/15 transition"
                    >
                      <span>@{userData.leetcodeId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-5xl font-extrabold text-white tracking-tight">
                      {userData.leetcodeStats?.totalSolved ?? 0}
                    </span>
                    <span className="font-sans text-base font-semibold text-[#e8702a]">
                      Problems Solved
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 text-xs font-mono text-stone-300 flex items-center justify-between">
                  <span>Auto-sync Status:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active
                  </span>
                </div>
              </div>

              {/* Difficulty Breakdown Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Easy Card */}
                <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-300 uppercase">Easy</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold text-emerald-200">
                      {userData.leetcodeStats?.easySolved ?? 0}
                    </div>
                    <div className="font-sans text-xs text-emerald-400 font-medium">Solved</div>
                  </div>
                </div>

                {/* Medium Card */}
                <div className="p-5 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-300 uppercase">Medium</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold text-amber-200">
                      {userData.leetcodeStats?.mediumSolved ?? 0}
                    </div>
                    <div className="font-sans text-xs text-amber-400 font-medium">Solved</div>
                  </div>
                </div>

                {/* Hard Card */}
                <div className="p-5 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-rose-300 uppercase">Hard</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold text-rose-200">
                      {userData.leetcodeStats?.hardSolved ?? 0}
                    </div>
                    <div className="font-sans text-xs text-rose-400 font-medium">Solved</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. Daily Activity Log & Heatmap Section */}
        <section className="bg-stone-900/85 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                <Flame className="w-6 h-6 text-[#e8702a]" />
                <span>Coding Activity &amp; Consistency Log</span>
              </h2>
              <p className="font-sans text-xs text-stone-400 mt-0.5">
                Daily DSA problem solves and module completions tracked over time.
              </p>
            </div>
            <span className="font-mono text-xs px-3 py-1 bg-stone-800 text-stone-300 rounded-full border border-white/10">
              6-MONTH HEATMAP
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-stone-950/70 border border-white/10 text-white">
            <HeatmapCalendar solvedDates={userData.streak?.solvedDates || []} compact={false} />
          </div>
        </section>
      </main>

      {/* Modal 1: Select Project Idea Modal */}
      {isSelectingProject && (
        <div className="fixed inset-0 bg-[#0F2E28]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#5C7A6B]/30 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#5C7A6B]/20 pb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0F2E28]">
                  Select a Project Idea
                </h3>
                <p className="font-sans text-xs text-[#5C7A6B] mt-0.5">
                  Pick a capstone project to implement and showcase on your portfolio.
                </p>
              </div>
              <button
                onClick={() => setIsSelectingProject(false)}
                className="p-1 rounded-full hover:bg-[#EDF2ED] text-[#5C7A6B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {allProjects.map((proj) => (
                <div
                  key={proj.projectId}
                  className="p-5 rounded-2xl bg-[#EDF2ED]/50 border border-[#5C7A6B]/20 hover:border-[#C98A3E] transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-display text-base font-bold text-[#0F2E28] group-hover:text-[#C98A3E] transition-colors">
                      {proj.title}
                    </h4>
                    <p className="font-sans text-xs text-[#414846] leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[11px]">
                      {proj.suggestedTech.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-white text-[#5C7A6B] border border-[#5C7A6B]/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectProjectIdea(proj.projectId)}
                    className="w-full sm:w-auto px-4 py-2 bg-[#C98A3E] text-[#0F2E28] font-sans font-semibold text-xs rounded-full hover:bg-[#C98A3E]/90 transition shadow-sm shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <span>Select Project</span>
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Project Links Form */}
      {isEditingLinks && (
        <div className="fixed inset-0 bg-[#0F2E28]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#5C7A6B]/30 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#5C7A6B]/20 pb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0F2E28]">
                  Project Links &amp; Deployment
                </h3>
                <p className="font-sans text-xs text-[#5C7A6B] mt-0.5">
                  Enter repository link to publish this project to your portfolio.
                </p>
              </div>
              <button
                onClick={() => setIsEditingLinks(false)}
                className="p-1 rounded-full hover:bg-[#EDF2ED] text-[#5C7A6B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProjectLinks} className="space-y-4 font-sans text-xs">
              <div className="space-y-1">
                <label className="block font-mono text-[#0F2E28] font-bold uppercase">
                  GitHub Repository URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={projGithubInput}
                  onChange={(e) => setProjGithubInput(e.target.value)}
                  placeholder="https://github.com/username/project-repo"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/30 text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hasDeployed}
                    onChange={(e) => setHasDeployed(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C98A3E] focus:ring-[#C98A3E]"
                  />
                  <span className="font-sans text-xs font-semibold text-[#0F2E28]">
                    I&apos;ve deployed this project (Live Demo)
                  </span>
                </label>
              </div>

              {hasDeployed && (
                <div className="space-y-1 pt-1 animate-fade-in">
                  <label className="block font-mono text-[#0F2E28] font-bold uppercase">
                    Hosted / Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={projLiveInput}
                    onChange={(e) => setProjLiveInput(e.target.value)}
                    placeholder="https://my-app.vercel.app"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/30 text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                  />
                </div>
              )}

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#5C7A6B]/20">
                <button
                  type="button"
                  onClick={() => setIsEditingLinks(false)}
                  className="px-5 py-2 rounded-full border border-[#5C7A6B]/30 text-[#0F2E28] font-medium hover:bg-[#EDF2ED] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProjectLinks || !projGithubInput}
                  className="px-6 py-2 rounded-full bg-[#C98A3E] text-[#0F2E28] font-semibold hover:bg-[#C98A3E]/90 transition shadow-sm disabled:opacity-50"
                >
                  {savingProjectLinks ? 'Saving...' : 'Save & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Confirm Change Project Dialog */}
      {isConfirmingChange && (
        <div className="fixed inset-0 bg-[#0F2E28]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#5C7A6B]/30 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold text-[#0F2E28]">
                Change Selected Project?
              </h3>
              <p className="font-sans text-xs text-[#414846] leading-relaxed">
                Switching projects will clear your current repository links from your portfolio showcase. Are you sure you want to select a new project?
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmingChange(false)}
                className="px-5 py-2 rounded-full border border-[#5C7A6B]/30 text-[#0F2E28] font-medium hover:bg-[#EDF2ED] transition text-xs"
              >
                Keep Current
              </button>
              <button
                type="button"
                onClick={handleConfirmChangeProject}
                className="px-5 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-500 transition shadow-sm text-xs"
              >
                Yes, Change Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-[#0F2E28]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#5C7A6B]/30 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#5C7A6B]/20 pb-4">
              <h3 className="font-display text-xl font-bold text-[#0F2E28]">
                Update Resume Profile
              </h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="p-1 rounded-full hover:bg-[#EDF2ED] text-[#5C7A6B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 font-sans text-xs">
              {/* Profile Photo Upload Field */}
              <div className="p-4 rounded-2xl bg-[#EDF2ED]/50 border border-[#5C7A6B]/20 space-y-2">
                <label className="block font-mono text-[#0F2E28] font-bold uppercase">
                  Profile Picture (Persists Across Devices)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C98A3E] shrink-0 bg-white flex items-center justify-center shadow-sm">
                    {photoInput ? (
                      <img src={photoInput} alt="Avatar Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-7 h-7 text-[#5C7A6B]" />
                    )}
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="px-4 py-2 bg-[#0F2E28] text-white hover:bg-[#0F2E28]/90 font-mono text-xs font-semibold rounded-xl cursor-pointer inline-flex items-center gap-1.5 shadow-sm transition">
                        <Upload className="w-3.5 h-3.5 text-[#C98A3E]" />
                        <span>Choose Image File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 2 * 1024 * 1024) {
                                alert('Please choose an image file under 2MB.');
                                return;
                              }
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                if (typeof reader.result === 'string') {
                                  setPhotoInput(reader.result);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      {photoInput && (
                        <button
                          type="button"
                          onClick={() => setPhotoInput('')}
                          className="px-3 py-2 text-red-600 font-mono text-xs hover:bg-red-50 rounded-xl transition"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>
                    <input
                      type="url"
                      value={photoInput}
                      onChange={(e) => setPhotoInput(e.target.value)}
                      placeholder="Or paste direct image URL (e.g. https://...)"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#5C7A6B]/30 font-mono text-xs text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block font-mono text-[#0F2E28] font-bold uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/30 text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                />
              </div>

              <div>
                <label className="block font-mono text-[#0F2E28] font-bold uppercase mb-1">
                  Headline / Target Aspiration
                </label>
                <input
                  type="text"
                  value={headlineInput}
                  onChange={(e) => setHeadlineInput(e.target.value)}
                  placeholder="e.g. Aspiring Backend Developer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/30 text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                />
              </div>

              <div>
                <label className="block font-mono text-[#0F2E28] font-bold uppercase mb-1">
                  Personal Bio / Summary
                </label>
                <textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/30 text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[#0F2E28] font-bold uppercase mb-1">
                    Degree &amp; Branch
                  </label>
                  <input
                    type="text"
                    value={branchInput}
                    onChange={(e) => setBranchInput(e.target.value)}
                    placeholder="e.g. B.Tech, CSE"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/30 text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[#0F2E28] font-bold uppercase mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    value={collegeInput}
                    onChange={(e) => setCollegeInput(e.target.value)}
                    placeholder="e.g. XYZ Institute of Technology"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/30 text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[#0F2E28] font-bold uppercase mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={githubInput}
                    onChange={(e) => setGithubInput(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/30 text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[#0F2E28] font-bold uppercase mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={linkedinInput}
                    onChange={(e) => setLinkedinInput(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/30 text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[#0F2E28] font-bold uppercase mb-1">
                  LeetCode Profile ID (Username)
                </label>
                <input
                  type="text"
                  value={leetcodeInput}
                  onChange={(e) => setLeetcodeInput(e.target.value)}
                  placeholder="e.g. Swamy_Guradasu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/30 text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                />
              </div>

              <div>
                <label className="block font-mono text-[#0F2E28] font-bold uppercase mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={photoInput}
                  onChange={(e) => setPhotoInput(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/30 text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#5C7A6B]/20">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-5 py-2 rounded-full border border-[#5C7A6B]/30 text-[#0F2E28] font-medium hover:bg-[#EDF2ED] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-full bg-[#C98A3E] text-[#0F2E28] font-semibold hover:bg-[#C98A3E]/90 transition shadow-sm"
                >
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-transparent text-[#414846] font-mono text-xs w-full flex flex-col md:flex-row justify-between items-center gap-4 py-8 px-6 md:px-12 mt-auto border-t border-[#5C7A6B]/15">
        <div>© 2024 Engineering Skill Trail. All rights reserved.</div>
        <div className="flex gap-4">
          <a className="hover:text-[#0F2E28] transition-colors" href="#">
            Privacy Policy
          </a>
          <span>•</span>
          <a className="hover:text-[#0F2E28] transition-colors" href="#">
            Support
          </a>
        </div>
      </footer>
      </div>
    </div>
  );
}


