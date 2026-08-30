'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { isPlacementPrepAllowed } from '@/lib/content';
import {
  PLACEMENT_PHASES,
  PLACEMENT_CATEGORIES,
  getTotalPlacementTopicsCount,
} from '@/data/placementPrepData';
import {
  getPlacementUserState,
  calculateOverallPlacementProgress,
  calculateCategoryProgress,
  PlacementUserState,
  OverallPlacementProgressMetric,
  createEmptyPlacementState,
} from '@/lib/placementStorage';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Code2,
  Brain,
  Layers,
  Activity,
  Boxes,
  Database,
  Terminal,
  Globe,
  FolderGit2,
  Sparkles,
  ChevronRight,
  BookOpen,
  Calculator,
  MessageSquare,
  Award,
  UserCheck,
  Briefcase,
  Target,
  CheckSquare,
  Users,
  Search,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Flame,
  Layers3,
  Webhook,
  Filter,
  PlayCircle,
  TrendingUp,
  History,
  Check,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />,
  Calculator: <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />,
  Brain: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
  BookOpen: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
  Cpu: <CpuIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
  Layers: <Layers className="w-5 h-5 sm:w-6 sm:h-6" />,
  Database: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
  Terminal: <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />,
  Globe: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
  Boxes: <Boxes className="w-5 h-5 sm:w-6 sm:h-6" />,
  FolderGit2: <FolderGit2 className="w-5 h-5 sm:w-6 sm:h-6" />,
  Webhook: <Webhook className="w-5 h-5 sm:w-6 sm:h-6" />,
  Layers3: <Layers3 className="w-5 h-5 sm:w-6 sm:h-6" />,
  Sparkles: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
  Award: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
  MessageSquare: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
  UserCheck: <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
  Briefcase: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />,
  Target: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
  CheckSquare: <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
  Users: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
};

function CpuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  );
}

export default function PlacementPreparationPage() {
  const { userData, loading } = useAuth();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [placementState, setPlacementState] = useState<PlacementUserState | null>(null);
  const [stateLoading, setStateLoading] = useState(true);

  // Check access permission
  const hasAccess = isPlacementPrepAllowed(userData?.email);

  // Load personal placement state from Firebase / cache
  useEffect(() => {
    if (!userData?.email || !hasAccess) {
      setStateLoading(false);
      return;
    }

    let isMounted = true;
    getPlacementUserState(userData.email)
      .then((state) => {
        if (isMounted) {
          setPlacementState(state);
          setStateLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load placement state:', err);
        if (isMounted) {
          setPlacementState(createEmptyPlacementState(userData.email!));
          setStateLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [userData?.email, hasAccess]);

  const metrics: OverallPlacementProgressMetric = useMemo(() => {
    if (!placementState) {
      return calculateOverallPlacementProgress(createEmptyPlacementState(userData?.email || ''));
    }
    return calculateOverallPlacementProgress(placementState);
  }, [placementState, userData?.email]);

  const filteredCategories = useMemo(() => {
    return PLACEMENT_CATEGORIES.filter((cat) => {
      const matchesPhase = selectedPhase === 'all' || cat.phaseId === selectedPhase;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cat.title.toLowerCase().includes(q) ||
        cat.tagline.toLowerCase().includes(q) ||
        cat.targetMNCs.some((m) => m.toLowerCase().includes(q)) ||
        cat.levels.some(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.concepts.some(
              (c) =>
                c.title.toLowerCase().includes(q) ||
                c.topics.some((t) => t.title.toLowerCase().includes(q))
            )
        );
      return matchesPhase && matchesSearch;
    });
  }, [searchQuery, selectedPhase]);

  const totalTopics = getTotalPlacementTopicsCount();

  // Loading state
  if (loading || (hasAccess && stateLoading)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-400">
        <div className="flex items-center gap-3 bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Verifying Placement Preparation Credentials &amp; Progress...</span>
        </div>
      </div>
    );
  }

  // Access Denied / Private Guard
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 bg-slate-800/80 border border-slate-700 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">Personal Workspace Only</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              The <strong className="text-slate-300">Placement Preparation</strong> portal is a private module assigned strictly to authorized accounts.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              Current account: <span className="text-slate-400 font-semibold">{userData?.email || 'Guest / Unauthenticated'}</span>
            </div>
          </div>
          <Link
            href="/home"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold rounded-xl transition shadow-md shadow-[#006cd2]/30"
          >
            <ArrowLeft className="w-4 h-4" /> Return to My Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[70%] -right-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Top Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/home"
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
              <span>Back to Portfolio</span>
            </Link>

            {/* Breadcrumb Header */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/home" className="hover:text-slate-200 transition">
                Portfolio
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-blue-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Placement Preparation
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 flex-1">
          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold tracking-wide shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#006cd2]" />
              <span>MNC PLACEMENT ROADMAP</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              MNC <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Placement Preparation</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
              Complete preparation roadmap for technical placements, coding assessments, interviews, and career readiness.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Build your preparation step by step — from programming fundamentals and aptitude to DSA, CS fundamentals, projects, interviews, and role-specific preparation.
            </p>
          </div>

          {/* PERSONAL DYNAMIC DASHBOARD */}
          <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h2 className="font-display text-lg font-bold text-white tracking-tight">
                    Personal Placement Dashboard
                  </h2>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Authenticated Workspace: <span className="text-slate-200">{userData?.email}</span>
                </p>
              </div>

              {metrics.continueLearningTopic && (
                <Link
                  href={`/placement-preparation/${metrics.continueLearningTopic.categoryId}/${metrics.continueLearningTopic.topicId}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs font-semibold rounded-xl transition shadow-md shadow-[#006cd2]/20 shrink-0"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Continue: {metrics.continueLearningTopic.title}</span>
                </Link>
              )}
            </div>

            {/* Dashboard 4-Column Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Overall Progress */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Overall Progress</span>
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    {metrics.percentage}%
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ({metrics.completedTopics}/{metrics.totalTopics} Topics)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 rounded-full"
                    style={{ width: `${metrics.percentage}%` }}
                  />
                </div>
              </div>

              {/* Card 2: Current Focus */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Current Focus</span>
                  <Target className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="font-display font-bold text-sm text-white truncate">
                  {metrics.currentFocusTopic?.title || metrics.continueLearningTopic?.title || 'Programming Basics'}
                </div>
                <div className="text-[11px] font-mono text-blue-400 truncate">
                  {metrics.currentFocusTopic?.categoryTitle || metrics.continueLearningTopic?.categoryTitle || 'Phase 01'}
                </div>
              </div>

              {/* Card 3: Categories Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Categories Track</span>
                  <Layers className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    {metrics.categoriesStarted}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    / {PLACEMENT_CATEGORIES.length} Started
                  </span>
                </div>
                <div className="text-[11px] font-mono text-emerald-400">
                  {metrics.categoriesCompleted} Categories Completed
                </div>
              </div>

              {/* Card 4: Preparation Status */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Preparation Status</span>
                  <Flame className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-lg font-display font-bold text-white">
                  {metrics.percentage === 0
                    ? 'Not Started'
                    : metrics.percentage === 100
                    ? 'Placement Ready'
                    : 'In Progress'}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {metrics.inProgressTopics} topics in active study
                </div>
              </div>
            </div>

            {/* Recent Activity List */}
            {metrics.recentCompletedTopics.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                  <History className="w-3.5 h-3.5 text-slate-500" />
                  <span>Recent Activity</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {metrics.recentCompletedTopics.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/placement-preparation/${item.categoryId}/${item.topicId}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-sans flex items-center gap-2 hover:border-blue-500/40 transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-medium truncate max-w-xs">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Structured Phase Progression Flow Banner */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <span>Recommended Preparation Flow</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Follow the 7-phase sequence to maximize retention and assessment pass rates.
                </p>
              </div>
              <span className="font-mono text-xs text-slate-500">Phase 01 → Phase 07</span>
            </div>

            {/* Horizontal / Zig-Zag Visual Flow */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {PLACEMENT_PHASES.map((phase, idx) => {
                const isSelected = selectedPhase === phase.id;
                return (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhase(selectedPhase === phase.id ? 'all' : phase.id)}
                    className={`p-3 rounded-2xl text-left border transition relative flex flex-col justify-between gap-2 group ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/10'
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-900 text-slate-400 group-hover:text-slate-300'
                        }`}
                      >
                        P{phase.phaseNumber}
                      </span>
                      {idx < PLACEMENT_PHASES.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-slate-600 hidden lg:block" />
                      )}
                    </div>
                    <div>
                      <div className="font-display text-xs font-bold text-white truncate">
                        {phase.title}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {phase.categoryIds.length} Modules
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Phase Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedPhase('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition shrink-0 ${
                  selectedPhase === 'all'
                    ? 'bg-[#006cd2] text-white shadow-md shadow-[#006cd2]/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All Cards ({PLACEMENT_CATEGORIES.length})
              </button>
              {PLACEMENT_PHASES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPhase(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition shrink-0 ${
                    selectedPhase === p.id
                      ? 'bg-[#006cd2] text-white shadow-md shadow-[#006cd2]/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics, MNCs, concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#006cd2] font-mono transition"
              />
            </div>
          </div>

          {/* Cards Grid Organized by Phase */}
          <div className="space-y-12">
            {PLACEMENT_PHASES.map((phase) => {
              const phaseCards = filteredCategories.filter((c) => c.phaseId === phase.id);
              if (phaseCards.length === 0) return null;

              return (
                <section key={phase.id} className="space-y-5">
                  {/* Phase Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-xl border border-blue-500/30">
                        PHASE {phase.phaseNumber}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                        {phase.title}
                      </h2>
                    </div>
                    <span className="text-xs text-slate-400 font-sans">{phase.subtitle}</span>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {phaseCards.map((category) => {
                      const icon = ICON_MAP[category.iconName] || <Code2 className="w-6 h-6" />;
                      const catMetric = calculateCategoryProgress(
                        category,
                        placementState?.topicProgress || {}
                      );

                      return (
                        <Link
                          key={category.id}
                          href={`/placement-preparation/${category.id}`}
                          className="group relative bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between gap-5 hover:shadow-xl hover:shadow-blue-500/5"
                        >
                          <div className="space-y-4">
                            {/* Card Top Row: Number, Icon, Badge */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-500/20 transition-all">
                                  {icon}
                                </div>
                                <div>
                                  <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-blue-400 transition-colors">
                                    CARD {category.cardNumber}
                                  </span>
                                  <div className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-slate-500" />
                                    <span>{category.estimatedHours}</span>
                                  </div>
                                </div>
                              </div>

                              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-slate-950 text-slate-300 border border-slate-800 group-hover:border-blue-500/40 transition-colors">
                                {category.badge}
                              </span>
                            </div>

                            {/* Card Title & Tagline */}
                            <div className="space-y-1.5">
                              <h3 className="font-display text-lg font-bold text-white group-hover:text-blue-300 transition-colors flex items-center justify-between">
                                <span>{category.title}</span>
                                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                              </h3>
                              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                                {category.tagline}
                              </p>
                            </div>

                            {/* Dynamic Progress Bar */}
                            <div className="space-y-1.5 pt-1">
                              <div className="flex items-center justify-between text-[11px] font-mono">
                                <span className="text-slate-400">Progress</span>
                                <span className={catMetric.percentage === 100 ? 'text-emerald-400 font-bold' : 'text-blue-400'}>
                                  {catMetric.percentage}% ({catMetric.completedTopics}/{catMetric.totalTopics})
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                                <div
                                  className={`h-full transition-all duration-300 rounded-full ${
                                    catMetric.percentage === 100
                                      ? 'bg-emerald-400'
                                      : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                                  }`}
                                  style={{ width: `${catMetric.percentage}%` }}
                                />
                              </div>
                            </div>

                            {/* Levels and Concepts Preview */}
                            <div className="space-y-1.5 pt-1">
                              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                                <span>{category.levels.length} Structured Levels</span>
                                <span>
                                  {category.levels.reduce((acc, l) => acc + l.concepts.length, 0)} Concepts
                                </span>
                              </div>
                              <ul className="space-y-1 text-slate-400 font-sans text-xs">
                                {category.levels.slice(0, 2).map((lvl, lIdx) => (
                                  <li key={lIdx} className="flex items-center gap-2 truncate">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80 shrink-0" />
                                    <span className="truncate">
                                      Level {lvl.levelNumber} — {lvl.title}
                                    </span>
                                  </li>
                                ))}
                                {category.levels.length > 2 && (
                                  <li className="text-[11px] font-mono text-slate-500 pl-3.5">
                                    +{category.levels.length - 2} more levels...
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>

                          {/* Card Footer: Target MNCs & Action */}
                          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-1">
                              {category.targetMNCs.slice(0, 2).map((mnc, mIdx) => (
                                <span
                                  key={mIdx}
                                  className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 font-mono text-[10px] border border-slate-800"
                                >
                                  {mnc}
                                </span>
                              ))}
                              {category.targetMNCs.length > 2 && (
                                <span className="px-1.5 py-0.5 rounded-md bg-slate-950 text-slate-500 font-mono text-[10px]">
                                  +{category.targetMNCs.length - 2}
                                </span>
                              )}
                            </div>

                            <span className="font-mono text-xs text-[#006cd2] group-hover:text-blue-300 flex items-center gap-1 font-semibold transition-colors shrink-0">
                              <span>Explore</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-500 font-mono text-xs py-8 px-6 md:px-12 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Personal Placement Preparation Workspace • LevelUpDev</span>
            </div>
            <div className="text-slate-400">
              Only accessible by authorized account ({userData?.email})
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
