'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  JAVA_MODULES,
  getJavaTrackSections,
  JavaModuleMetadata,
  JavaTrackSection,
} from '@/data/java/javaSkillsData';
import {
  fetchUserDynamicData,
  UserDynamicData,
  ModuleProgressRecord,
} from '@/lib/dynamicDatabase';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  Compass,
  Trophy,
  Award,
  RotateCcw,
  HelpCircle,
  Code2,
  Check,
  Zap,
  Coffee
} from 'lucide-react';

export default function JavaSkillTrailPage() {
  const router = useRouter();
  const { userData, loading } = useAuth();
  const [dynamicData, setDynamicData] = useState<UserDynamicData | null>(null);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  // Load dynamic progress data and listen for instant real-time updates
  useEffect(() => {
    let mounted = true;
    async function loadDynamic() {
      if (userData?.email) {
        const d = await fetchUserDynamicData(userData.email);
        if (mounted) setDynamicData(d);
      }
    }
    loadDynamic();

    const handleUpdate = (e: any) => {
      if (e?.detail?.data) {
        setDynamicData(e.detail.data);
      } else {
        loadDynamic();
      }
    };

    window.addEventListener('levelupdev:dynamic_update', handleUpdate);
    return () => {
      mounted = false;
      window.removeEventListener('levelupdev:dynamic_update', handleUpdate);
    };
  }, [userData]);

  // Java Trail Modules Computation across all 21 modules
  const javaModulesWithStatus = useMemo(() => {
    if (!userData) return [];

    const javaProgress: Record<string, ModuleProgressRecord> =
      dynamicData?.progress?.java || ({} as Record<string, ModuleProgressRecord>);

    return JAVA_MODULES.map((mod, index) => {
      const modRecord =
        javaProgress[mod.id] ||
        javaProgress[`module-${mod.moduleNumber}`] ||
        javaProgress[`m${mod.moduleNumber}`] ||
        javaProgress[String(mod.moduleNumber)];
      const completedTopics = modRecord?.topicsCompleted || [];
      const totalTopicsCount = mod.topicIds.length;
      const completedTopicsCount = completedTopics.length;
      const allTopicsCompleted =
        totalTopicsCount > 0 &&
        (completedTopicsCount >= totalTopicsCount ||
          mod.topicIds.every((tid) => completedTopics.includes(tid)));
      const assignmentPassed = !!modRecord?.assignmentPassed || modRecord?.status === 'completed';
      const hasFailedAttempt =
        (modRecord?.assignmentAttempts || []).length > 0 && !assignmentPassed;

      // Sequential lock state: Module N is unlocked if Module N-1 is passed
      let isUnlocked = false;
      if (index === 0) {
        isUnlocked = true;
      } else {
        const prevMod = JAVA_MODULES[index - 1];
        const prevRecord =
          javaProgress[prevMod.id] ||
          javaProgress[`module-${prevMod.moduleNumber}`] ||
          javaProgress[`m${prevMod.moduleNumber}`] ||
          javaProgress[String(prevMod.moduleNumber)];
        isUnlocked = !!prevRecord?.assignmentPassed || prevRecord?.status === 'completed';
      }

      // Determine UI status
      let moduleStatus: 'Not Started' | 'In Progress' | 'Topics Completed' | 'Completed' | 'Assignment Failed' | 'Planned' = 'Not Started';
      let assignmentStatus: 'Locked' | 'Available' | 'Passed' | 'Failed' | 'Planned' = 'Locked';

      if (mod.isUpcoming) {
        moduleStatus = 'Planned';
        assignmentStatus = 'Planned';
      } else if (assignmentPassed) {
        moduleStatus = 'Completed';
        assignmentStatus = 'Passed';
      } else if (hasFailedAttempt) {
        moduleStatus = 'Assignment Failed';
        assignmentStatus = 'Failed';
      } else if (allTopicsCompleted) {
        moduleStatus = 'Topics Completed';
        assignmentStatus = 'Available';
      } else if (completedTopicsCount > 0) {
        moduleStatus = 'In Progress';
        assignmentStatus = 'Locked';
      } else {
        moduleStatus = 'Not Started';
        assignmentStatus = 'Locked';
      }

      return {
        ...mod,
        isUnlocked: mod.isUpcoming ? false : isUnlocked,
        isCompleted: assignmentPassed,
        allTopicsCompleted,
        completedTopicsCount,
        totalTopicsCount,
        moduleStatus,
        assignmentStatus,
        bestScore: modRecord?.assignmentScore,
        attemptsCount: (modRecord?.assignmentAttempts || []).length,
      };
    });
  }, [userData, dynamicData]);

  // Track Sections
  const trackSections = useMemo(() => {
    return getJavaTrackSections();
  }, []);

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono text-sm">
        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-800">
          <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-300">Loading Java Skills Trail...</span>
        </div>
      </div>
    );
  }

  // Calculate overall Java progress (Active Modules 1-7)
  const completedJavaModulesCount = javaModulesWithStatus.filter((m) => m.isCompleted).length;
  const activeModulesCount = 7;
  const progressPercent = Math.round((completedJavaModulesCount / activeModulesCount) * 100);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-amber-500 selection:text-black flex flex-col">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-amber-500/15 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[70%] -right-40 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/skills"
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-amber-500" />
              <span>Back to Skills Trail</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs font-mono text-slate-400">
                Foundation Progress: <strong className="text-amber-400">{completedJavaModulesCount}/{activeModulesCount} Modules ({progressPercent}%)</strong>
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                <Coffee className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-bold text-white">Java Skills Trail</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto w-full px-4 pt-10 pb-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>21-MODULE FULL JAVA MASTERY CURRICULUM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Java <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400">Skills Trail</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Master Java from programming fundamentals, memory allocation, and algorithms to Spring Boot backend engineering and enterprise systems.
          </p>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Foundation Modules</span>
              <span className="text-lg font-bold font-display text-amber-400">7 Active</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Topics Implemented</span>
              <span className="text-lg font-bold font-display text-white">57 Deep Topics</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Pass Threshold</span>
              <span className="text-lg font-bold font-display text-emerald-400">70% Required</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Completed</span>
              <span className="text-lg font-bold font-display text-orange-400">{completedJavaModulesCount} / 7</span>
            </div>
          </div>
        </div>

        {/* Main Track Roadmap Container */}
        <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-12">
          {trackSections.map((section) => {
            return (
              <div key={section.track} className="space-y-4">
                {/* Track Header */}
                <div className={`p-5 rounded-2xl border border-slate-800 bg-gradient-to-r ${section.accentColor} backdrop-blur-md`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                        {section.badge}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                        {section.title}
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      Range: Modules {section.moduleRange}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {section.description}
                  </p>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.modules.map((mod) => {
                    const status = javaModulesWithStatus.find((m) => m.id === mod.id);
                    const isUnlocked = status?.isUnlocked ?? false;
                    const isCompleted = status?.isCompleted ?? false;
                    const isUpcoming = mod.isUpcoming ?? false;
                    const allTopicsCompleted = status?.allTopicsCompleted ?? false;
                    const completedTopics = status?.completedTopicsCount ?? 0;
                    const totalTopics = status?.totalTopicsCount ?? mod.topicIds.length;
                    const attempts = status?.attemptsCount ?? 0;
                    const bestScore = status?.bestScore;

                    return (
                      <div
                        key={mod.id}
                        className={`relative rounded-2xl border transition-all duration-300 flex flex-col justify-between p-5 ${
                          isCompleted
                            ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50'
                            : isUnlocked
                            ? 'bg-slate-900/80 border-slate-700/80 hover:border-amber-500/50 shadow-lg shadow-black/40'
                            : isUpcoming
                            ? 'bg-slate-900/40 border-slate-800/40 opacity-70'
                            : 'bg-slate-900/40 border-slate-800/60 opacity-80'
                        }`}
                      >
                        {/* Top Meta Line */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-mono font-bold text-amber-400/90">
                            Module {mod.moduleNumber}
                          </span>
                          <div>
                            {isCompleted ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3" /> Passed ({bestScore}%)
                              </span>
                            ) : isUpcoming ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
                                Planned / Upcoming
                              </span>
                            ) : isUnlocked ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                                <Zap className="w-3 h-3" /> In Progress
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 bg-slate-800/50 border border-slate-800 px-2 py-0.5 rounded-full">
                                <Lock className="w-3 h-3" /> Locked
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-1.5 flex-1">
                          <h3 className="text-base font-bold text-white font-display">
                            {mod.title}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {mod.shortDescription}
                          </p>
                        </div>

                        {/* Progress Bar & Actions */}
                        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
                          {!isUpcoming && (
                            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                              <span>Topics: {completedTopics}/{totalTopics}</span>
                              <span>
                                {allTopicsCompleted
                                  ? 'Assignment Ready'
                                  : `${Math.round((completedTopics / (totalTopics || 1)) * 100)}%`}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between gap-2">
                            {isUnlocked && !isUpcoming ? (
                              <Link
                                href={`/skills/java/${mod.id}`}
                                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs transition shadow-md shadow-amber-500/20"
                              >
                                <span>Enter Module</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            ) : isUpcoming ? (
                              <div className="w-full text-center py-2 px-3 rounded-xl bg-slate-800/50 text-slate-500 font-mono text-xs">
                                Planned Track Module
                              </div>
                            ) : (
                              <div className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/60 text-slate-500 font-mono text-xs cursor-not-allowed">
                                <Lock className="w-3.5 h-3.5" />
                                <span>Complete Module {mod.moduleNumber - 1} to Unlock</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}
