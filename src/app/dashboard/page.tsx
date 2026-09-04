'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  getAllSkills,
  Skill,
  getAllDailyChallenges,
  DailyChallenge,
  isAdminEmail,
  isPlacementPrepAllowed,
  isEnglishCareerAllowed,
} from '@/lib/content';
import {
  getAllFoundationLevels,
  FoundationLevel,
} from '@/data/csFoundationsData';
import {
  getApplicationsByUser,
} from '@/lib/internshipStorage';
import { InternshipApplication } from '@/data/internshipsData';
import {
  calculateDSAStats,
  calculateCareerReadiness,
  generateRecommendedActions,
  DSAStatistics,
  CareerReadinessReport,
  RecommendedAction,
} from '@/lib/progressAnalytics';
import {
  Sparkles,
  Flame,
  Layers,
  Code2,
  Mic,
  Cpu,
  FolderGit2,
  GitBranch,
  Share2,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  Target,
  Zap,
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  Check,
  KeyRound,
} from 'lucide-react';

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  FolderGit2: <FolderGit2 className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Share2: <Share2 className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
};

export default function StudentDashboardPage() {
  const { userData, loading, syncLeetCodeStats, openChangePasswordModal } = useAuth();
  const router = useRouter();

  // Content Data
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [foundationLevels, setFoundationLevels] = useState<FoundationLevel[]>([]);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
  const [userApplications, setUserApplications] = useState<InternshipApplication[]>([]);

  // LeetCode Sync state
  const [leetcodeInput, setLeetcodeInput] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Topic filter for DSA section
  const [dsaSearchQuery, setDsaSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  useEffect(() => {
    setAllSkills(getAllSkills());
    setFoundationLevels(getAllFoundationLevels());
    setDailyChallenges(getAllDailyChallenges());

    if (userData?.email) {
      getApplicationsByUser(userData.email).then((apps) => {
        setUserApplications(apps);
      });
      if (userData.leetcodeId) {
        setLeetcodeInput(userData.leetcodeId);
      }
    }
  }, [userData]);

  // Compute dynamic statistics
  const dsaStats: DSAStatistics = useMemo(() => {
    return calculateDSAStats(userData, foundationLevels, dailyChallenges);
  }, [userData, foundationLevels, dailyChallenges]);

  const careerReadiness: CareerReadinessReport = useMemo(() => {
    return calculateCareerReadiness(userData, allSkills, foundationLevels, userApplications);
  }, [userData, allSkills, foundationLevels, userApplications]);

  const recommendedActions: RecommendedAction[] = useMemo(() => {
    return generateRecommendedActions(userData, foundationLevels, dsaStats, careerReadiness, userApplications);
  }, [userData, foundationLevels, dsaStats, careerReadiness, userApplications]);

  const filteredTopicStats = useMemo(() => {
    if (!dsaSearchQuery.trim()) return dsaStats.topicStats;
    const query = dsaSearchQuery.toLowerCase();
    return dsaStats.topicStats.filter((t) => t.topicName.toLowerCase().includes(query));
  }, [dsaStats.topicStats, dsaSearchQuery]);

  const handleSyncLeetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leetcodeInput.trim()) return;
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      await syncLeetCodeStats(leetcodeInput.trim());
      setSyncFeedback('LeetCode stats successfully synced!');
      setTimeout(() => setSyncFeedback(null), 4000);
    } catch (err: any) {
      setSyncFeedback(err?.message || 'Failed to sync LeetCode stats.');
    } finally {
      setIsSyncing(false);
    }
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-sans">
        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl">
          <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading Student Progress Dashboard...</span>
        </div>
      </div>
    );
  }

  // Circular progress stroke calculation
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (careerReadiness.overallPercentage / 100) * circumference;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-10 -right-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* ========================================================================= */}
        {/* TOP NAVIGATION HEADER */}
        {/* ========================================================================= */}
        <header className="bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 w-full top-0 left-0 flex justify-between items-center px-4 sm:px-8 md:px-12 py-3.5 z-50 sticky">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center shadow-md">
              <img src="/levelupdev-icon.png" alt="LevelUpDev Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <span className="font-display font-bold text-base sm:text-lg text-white tracking-tight flex items-center gap-1.5">
                Level<span className="text-[#006cd2]">Up</span>Dev <span className="text-cyan-400 font-mono text-xs font-normal">/ Student Dashboard</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
            <Link className="text-slate-300 hover:text-white transition" href="/home">
              Portfolio
            </Link>
            <Link className="text-cyan-400 font-semibold flex items-center gap-1" href="/dashboard">
              <TrendingUp className="w-3.5 h-3.5" />
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
            {isEnglishCareerAllowed(userData?.email) && (
              <Link
                className="text-blue-300 font-bold hover:text-white transition flex items-center gap-1 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 text-xs"
                href="/english-career"
              >
                <Mic className="w-3.5 h-3.5 text-blue-400" />
                <span>English &amp; Career</span>
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

          {/* User Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/home"
              className="px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Portfolio View</span>
            </Link>

            <button
              onClick={() => openChangePasswordModal(false)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
              title="Change Account Password"
            >
              <KeyRound className="w-4 h-4 text-blue-400" />
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{userData.streak?.currentStreak || 0}d Streak</span>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* MAIN DASHBOARD CONTENT */}
        {/* ========================================================================= */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 flex-1">
          {/* ======================================================================= */}
          {/* HERO & STUDENT IDENTITY BANNER */}
          {/* ======================================================================= */}
          <div className="relative rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-blue-500/5 to-transparent rounded-full pointer-events-none blur-3xl" />

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>STUDENT PROGRESS INTELLIGENCE</span>
                  <span>•</span>
                  <span>LIVE DATABASE SYNC</span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight flex items-center gap-3">
                    <span>{userData.name || userData.username}</span>
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                      {userData.registerNumber || 'Student Member'}
                    </span>
                  </h1>
                  <p className="text-sm text-slate-300 font-medium mt-1">
                    {userData.college ? `${userData.college} • ` : ''}
                    {userData.branch ? `${userData.branch} (${userData.currentYear || '2026'})` : 'Developer Member'}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                  Real-time analytics evaluating your programming modules, DSA problem solves, system architecture mastery, project deployments, and technical interview readiness.
                </p>
              </div>

              {/* Quick Metrics Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase block">DSA Solves</span>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-cyan-400">
                    {dsaStats.totalSolved}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 block">Verified Problems</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase block">Career Ready</span>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-400">
                    {careerReadiness.overallPercentage}%
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 block">Target 85%+</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase block">Coding Streak</span>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-amber-400 flex items-center justify-center gap-1">
                    <Flame className="w-5 h-5 fill-amber-400" />
                    <span>{userData.streak?.currentStreak || 0}d</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 block">Active Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* SECTION 1: CAREER READINESS */}
          {/* ======================================================================= */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2.5">
                  <Target className="w-6 h-6 text-cyan-400" />
                  <span>Career Readiness</span>
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Dynamic benchmark measuring competency across 7 key engineering dimensions
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{careerReadiness.statusHeadline}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Overall Radial Score Card */}
              <div className="lg:col-span-4 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl flex flex-col items-center justify-center text-center relative overflow-hidden shadow-xl">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      className="text-slate-800"
                    />
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="text-cyan-400 transition-all duration-1000 ease-out drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
                      {careerReadiness.overallPercentage}%
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mt-1">
                      Readiness Score
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-2 w-full">
                  <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
                    {careerReadiness.statusHeadline}
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Calculated dynamically from your completed modules, solved DSA problems, repository code quality, and mock evaluations.
                  </p>
                </div>
              </div>

              {/* 7 Breakdown Dimensions */}
              <div className="lg:col-span-8 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Competency Breakdown (7 Pillars)
                  </h3>
                  <span className="text-xs font-mono text-slate-500">Live Calculated</span>
                </div>

                <div className="space-y-4">
                  {Object.values(careerReadiness.categories).map((cat) => (
                    <div key={cat.id} className="space-y-1.5 group">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="p-1 rounded-lg bg-slate-800 text-cyan-400">
                            {CATEGORY_ICON_MAP[cat.iconName] || <Sparkles className="w-3.5 h-3.5" />}
                          </span>
                          <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {cat.name}
                          </span>
                          <span className="text-slate-500 hidden sm:inline">• {cat.description}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                              cat.percentage >= 75
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : cat.percentage >= 50
                                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                                : cat.percentage >= 30
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            }`}
                          >
                            {cat.status}
                          </span>
                          <span className="font-bold text-white w-10 text-right">{cat.percentage}%</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2.5 rounded-full bg-slate-950 border border-slate-800/80 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-700 ease-out`}
                          style={{ width: `${Math.max(4, cat.percentage)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ======================================================================= */}
          {/* SECTION 2: DSA STATISTICS */}
          {/* ======================================================================= */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2.5">
                  <Layers className="w-6 h-6 text-cyan-400" />
                  <span>DSA Statistics</span>
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Live problem solving metrics across core data structures and algorithm categories
                </p>
              </div>

              {/* LeetCode Sync Form */}
              <form onSubmit={handleSyncLeetCode} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="LeetCode Username"
                  value={leetcodeInput}
                  onChange={(e) => setLeetcodeInput(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition w-36 sm:w-44"
                />
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-slate-950 transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync LeetCode'}</span>
                </button>
              </form>
            </div>

            {syncFeedback && (
              <div
                className={`p-3 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                  syncFeedback.includes('successfully')
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{syncFeedback}</span>
              </div>
            )}

            {/* Metric Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-2 shadow-md">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Problems Solved</span>
                  <Award className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-display font-extrabold text-white">
                  {dsaStats.totalSolved}
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {userData.leetcodeStats?.lastSyncedAt
                    ? `Synced from LeetCode`
                    : `Tracked on Platform`}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-2 shadow-md">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Easy</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                </div>
                <div className="text-3xl font-display font-extrabold text-emerald-400">
                  {dsaStats.easySolved}
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {dsaStats.totalSolved > 0
                    ? `${Math.round((dsaStats.easySolved / dsaStats.totalSolved) * 100)}% of solves`
                    : '0%'}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-2 shadow-md">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Medium</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                </div>
                <div className="text-3xl font-display font-extrabold text-amber-400">
                  {dsaStats.mediumSolved}
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {dsaStats.totalSolved > 0
                    ? `${Math.round((dsaStats.mediumSolved / dsaStats.totalSolved) * 100)}% of solves`
                    : '0%'}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-2 shadow-md">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Hard</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                </div>
                <div className="text-3xl font-display font-extrabold text-rose-400">
                  {dsaStats.hardSolved}
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {dsaStats.totalSolved > 0
                    ? `${Math.round((dsaStats.hardSolved / dsaStats.totalSolved) * 100)}% of solves`
                    : '0%'}
                </div>
              </div>
            </div>

            {/* Topic-Wise Statistics */}
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-display font-bold text-white">
                    Topic-Wise Statistics & Mastery
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Solved problem counts and readiness targets per data structure
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={dsaSearchQuery}
                    onChange={(e) => setDsaSearchQuery(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-36 sm:w-48"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTopicStats.map((topic) => (
                  <Link
                    key={topic.topicId}
                    href={`/skills/foundations/dsa/${topic.categorySlug || topic.topicId}`}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-all group block relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <span>{topic.topicName}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                      <span className="font-bold text-cyan-400 text-sm">
                        {topic.solvedCount}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1">
                      <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                          style={{ width: `${Math.max(3, topic.percentage)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>Benchmark: {topic.totalProblems} problems</span>
                        <span>{topic.percentage}% Mastery</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ======================================================================= */}
          {/* SECTION 3: RECOMMENDED NEXT ACTIONS */}
          {/* ======================================================================= */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2.5">
                  <Lightbulb className="w-6 h-6 text-amber-400" />
                  <span>Recommended Next Actions</span>
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Personalized next steps generated dynamically from your lowest competency scores and pending modules
                </p>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                {recommendedActions.length} Actions Available
              </span>
            </div>

            {recommendedActions.length === 0 ? (
              <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-2 backdrop-blur-xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white font-display">All Milestones Up To Date!</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  You have completed all pending foundation modules and daily solves. Keep building full-stack projects to reach top tier!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {recommendedActions.map((action) => (
                  <div
                    key={action.id}
                    className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 group transition-all"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 border border-slate-700 text-slate-300">
                            {action.category}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                              action.priority === 'High'
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            }`}
                          >
                            {action.priority} Priority
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        {action.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                        {action.reason}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80">
                      <Link
                        href={action.href}
                        className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-cyan-600 hover:text-slate-950 text-cyan-400 border border-slate-800 hover:border-transparent text-xs font-mono font-bold transition group/btn"
                      >
                        <span>{action.actionText}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ======================================================================= */}
          {/* SECTION 4: RECENT LEARNING & SOLVE TIMELINE */}
          {/* ======================================================================= */}
          <section className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span>Recent Activity & Solves</span>
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Recorded submissions, module completions, and daily challenges
                </p>
              </div>

              <Link
                href="/daily"
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
              >
                <span>Daily Challenge</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Last Active Module</span>
                <p className="text-xs sm:text-sm font-bold text-white font-mono truncate">
                  {userData.lastActiveModule?.moduleTitle || 'Python & Computer Foundations'}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{userData.lastActiveModule?.updatedAt ? new Date(userData.lastActiveModule.updatedAt).toLocaleDateString() : 'Active Recently'}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Daily DSA Streak</span>
                <p className="text-xs sm:text-sm font-bold text-white font-mono">
                  {userData.streak?.currentStreak || 0} Consecutive Days Solved
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400">
                  <Flame className="w-3 h-3 fill-amber-400" />
                  <span>Last Solved: {userData.streak?.lastSolvedDate || 'Today'}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2 col-span-1 sm:col-span-2 lg:col-span-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Portfolio Status</span>
                <p className="text-xs sm:text-sm font-bold text-white font-mono">
                  {userData.portfolioProjects?.length || 0} Projects Linked
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <Check className="w-3 h-3" />
                  <span>{userData.isPortfolioPublic ? 'Public Profile Enabled' : 'Private Profile'}</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
