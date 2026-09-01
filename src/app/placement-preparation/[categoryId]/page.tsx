'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { isPlacementPrepAllowed } from '@/lib/content';
import {
  PLACEMENT_CATEGORIES,
  getPlacementCategoryById,
} from '@/data/placementPrepData';
import {
  getPlacementUserState,
  calculateCategoryProgress,
  calculateLevelProgress,
  calculateConceptProgress,
  updateTopicStatus,
  PlacementUserState,
  createEmptyPlacementState,
} from '@/lib/placementStorage';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Sparkles,
  Layers,
  Code2,
  Brain,
  Activity,
  Boxes,
  Database,
  Terminal,
  Globe,
  FolderGit2,
  Calculator,
  MessageSquare,
  Award,
  UserCheck,
  Briefcase,
  Target,
  CheckSquare,
  Users,
  CheckCircle2,
  Clock,
  Lock,
  Layers3,
  Webhook,
  ChevronDown,
  Layers2,
  Check,
  Circle,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6" />,
  Calculator: <Calculator className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Cpu: <CpuIcon className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Boxes: <Boxes className="w-6 h-6" />,
  FolderGit2: <FolderGit2 className="w-6 h-6" />,
  Webhook: <Webhook className="w-6 h-6" />,
  Layers3: <Layers3 className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  MessageSquare: <MessageSquare className="w-6 h-6" />,
  UserCheck: <UserCheck className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  CheckSquare: <CheckSquare className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
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

export default function PlacementCategoryLevelsPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  const { userData, loading } = useAuth();
  const category = getPlacementCategoryById(categoryId);

  const [placementState, setPlacementState] = useState<PlacementUserState | null>(null);
  const [stateLoading, setStateLoading] = useState(true);

  // Check access permission
  const hasAccess = isPlacementPrepAllowed(userData?.email);

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

  const categoryProgress = useMemo(() => {
    if (!category) return null;
    return calculateCategoryProgress(category, placementState?.topicProgress || {});
  }, [category, placementState]);

  if (loading || (hasAccess && stateLoading)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-400">
        <div className="flex items-center gap-3 bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Verifying Placement Preparation Credentials...</span>
        </div>
      </div>
    );
  }

  // Access Denied
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
              This roadmap module is private to authorized accounts.
            </p>
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

  if (!category) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans">
        <div className="text-center space-y-4 max-w-md bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-800">
          <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-blue-400">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-display text-white">Category Not Found</h2>
          <p className="text-xs text-slate-400">
            No placement preparation category found for <code className="font-mono text-blue-300">&quot;{categoryId}&quot;</code>.
          </p>
          <Link
            href="/placement-preparation"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-bold rounded-xl text-xs font-mono transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Placement Prep
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = PLACEMENT_CATEGORIES.findIndex((c) => c.id === category.id);
  const prevCategory = currentIndex > 0 ? PLACEMENT_CATEGORIES[currentIndex - 1] : null;
  const nextCategory =
    currentIndex < PLACEMENT_CATEGORIES.length - 1 ? PLACEMENT_CATEGORIES[currentIndex + 1] : null;

  const icon = ICON_MAP[category.iconName] || <Code2 className="w-6 h-6" />;
  const totalTopicsCount = category.levels.reduce(
    (acc, l) => acc + l.concepts.reduce((cAcc, c) => cAcc + c.topics.length, 0),
    0
  );
  const totalConceptsCount = category.levels.reduce((acc, l) => acc + l.concepts.length, 0);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/placement-preparation"
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>Back to Placement Prep</span>
            </Link>

            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/placement-preparation" className="hover:text-slate-200 transition">
                Placement Prep
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-blue-400 font-semibold truncate max-w-xs">{category.title}</span>
            </nav>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-12 space-y-12 flex-1">
          {/* Category Hero Header Banner */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-lg">
                  {icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      CARD {category.cardNumber}
                    </span>
                    <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                      {category.phaseName} Phase
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-1">
                    {category.title}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs border border-slate-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>{category.estimatedHours}</span>
                </span>
                <span className="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-300 font-mono text-xs border border-blue-500/30 font-semibold">
                  {category.badge}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
              {category.description}
            </p>

            {/* Dynamic Progress Bar */}
            {categoryProgress && (
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Category Mastery</span>
                  <span className={categoryProgress.percentage === 100 ? 'text-emerald-400 font-bold' : 'text-blue-400'}>
                    {categoryProgress.percentage}% ({categoryProgress.completedTopics}/{categoryProgress.totalTopics} Topics Completed)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      categoryProgress.percentage === 100
                        ? 'bg-emerald-400'
                        : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400'
                    }`}
                    style={{ width: `${categoryProgress.percentage}%` }}
                  />
                </div>
              </div>
            )}

            {/* Quick Metrics Bar */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>{category.levels.length} Structured Levels</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Layers2 className="w-4 h-4 text-cyan-400" />
                  <span>{totalConceptsCount} Concepts</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>{totalTopicsCount} Topics</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="text-slate-500">Tested At:</span>
                <span className="text-blue-300 font-semibold">{category.targetMNCs.slice(0, 3).join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Structured Levels Architecture */}
          <div className="space-y-10">
            {category.levels.map((level) => {
              const levelProgress = calculateLevelProgress(
                level,
                placementState?.topicProgress || {}
              );

              return (
                <section
                  key={level.id}
                  className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden"
                >
                  {/* Level Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-xl border border-blue-500/30">
                          LEVEL {level.levelNumber}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                          {level.title}
                        </h2>
                      </div>
                      <p className="text-xs text-slate-400">{level.shortDescription}</p>
                    </div>

                    {/* Level Meta Metrics */}
                    <div className="flex items-center gap-2 shrink-0 font-mono text-xs text-slate-400">
                      <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-1.5">
                        <span className={levelProgress.percentage === 100 ? 'text-emerald-400 font-bold' : 'text-blue-400'}>
                          {levelProgress.percentage}%
                        </span>
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>{level.estimatedHours}</span>
                      </span>
                    </div>
                  </div>

                  {/* Concepts & Topics within Level */}
                  <div className="space-y-6">
                    {level.concepts.map((concept) => {
                      const conceptProgress = calculateConceptProgress(
                        concept,
                        placementState?.topicProgress || {}
                      );

                      return (
                        <div
                          key={concept.id}
                          className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-5 space-y-4"
                        >
                          {/* Concept Header */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="space-y-0.5">
                              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-400" />
                                <span>{concept.title}</span>
                              </h3>
                              <p className="text-xs text-slate-400">{concept.tagline}</p>
                            </div>

                            <span className="font-mono text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                              {conceptProgress.completedTopics}/{conceptProgress.totalTopics} Done ({conceptProgress.percentage}%)
                            </span>
                          </div>

                          {/* Topics Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            {concept.topics.map((topic) => {
                              const topicStatus =
                                placementState?.topicProgress[topic.id]?.status || 'not_started';

                              return (
                                <Link
                                  key={topic.id}
                                  href={`/placement-preparation/${category.id}/${topic.id}`}
                                  className={`group p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 hover:shadow-lg ${
                                    topicStatus === 'completed'
                                      ? 'bg-emerald-950/20 border-emerald-500/40 hover:bg-emerald-950/30'
                                      : topicStatus === 'in_progress'
                                      ? 'bg-blue-950/20 border-blue-500/40 hover:bg-blue-950/30'
                                      : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800/80 hover:border-blue-500/50'
                                  }`}
                                >
                                  <div className="space-y-1.5 min-w-0">
                                    <div className="flex items-center gap-2">
                                      {topicStatus === 'completed' ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                      ) : topicStatus === 'in_progress' ? (
                                        <Circle className="w-3.5 h-3.5 text-blue-400 fill-blue-400/30 shrink-0" />
                                      ) : (
                                        <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                                      )}
                                      <div className="font-display text-xs sm:text-sm font-bold text-slate-200 group-hover:text-blue-300 transition-colors truncate">
                                        {topic.title}
                                      </div>
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-snug line-clamp-2 pl-5.5">
                                      {topic.summary}
                                    </p>
                                  </div>

                                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Previous / Next Category Navigation */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
            {prevCategory ? (
              <Link
                href={`/placement-preparation/${prevCategory.id}`}
                className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-left space-y-1 transition group max-w-[48%]"
              >
                <div className="flex items-center gap-1 font-mono text-[11px] text-slate-400 group-hover:text-blue-400">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Previous Card</span>
                </div>
                <div className="font-display text-sm font-bold text-white truncate">
                  {prevCategory.cardNumber} — {prevCategory.title}
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextCategory && (
              <Link
                href={`/placement-preparation/${nextCategory.id}`}
                className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-right space-y-1 transition group max-w-[48%]"
              >
                <div className="flex items-center justify-end gap-1 font-mono text-[11px] text-slate-400 group-hover:text-blue-400">
                  <span>Next Card</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="font-display text-sm font-bold text-white truncate">
                  {nextCategory.cardNumber} — {nextCategory.title}
                </div>
              </Link>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-500 font-mono text-xs py-8 px-6 md:px-12 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© 2024 LevelUpDev • Personal Placement Preparation Portal</div>
            <div className="flex items-center gap-4">
              <Link href="/placement-preparation" className="hover:text-slate-300 transition-colors">
                All Cards
              </Link>
              <span>•</span>
              <Link href="/home" className="hover:text-slate-300 transition-colors">
                Portfolio
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
