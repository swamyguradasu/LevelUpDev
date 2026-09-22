'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  getJavaModuleById,
  getJavaModuleTopics,
  getAllJavaModules,
  JavaModuleMetadata,
  JavaTopicDetail,
} from '@/data/java/javaSkillsData';
import {
  fetchUserDynamicData,
  UserDynamicData,
  ModuleProgressRecord,
} from '@/lib/dynamicDatabase';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lock,
  Sparkles,
  Award,
  RotateCcw,
  HelpCircle,
  Clock,
  ChevronRight,
  Target,
  FileText,
  Coffee,
  Zap
} from 'lucide-react';

export default function JavaModulePage() {
  const params = useParams();
  const router = useRouter();
  const rawModuleId = params.moduleId as string;

  const { userData, loading } = useAuth();
  const [dynamicData, setDynamicData] = useState<UserDynamicData | null>(null);

  const moduleMeta = useMemo(() => {
    return getJavaModuleById(rawModuleId);
  }, [rawModuleId]);

  const allModules = useMemo(() => getAllJavaModules(), []);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      if (userData?.email) {
        const d = await fetchUserDynamicData(userData.email);
        if (mounted) setDynamicData(d);
      }
    }
    loadData();

    const handleUpdate = (e: any) => {
      if (e?.detail?.data) {
        setDynamicData(e.detail.data);
      } else {
        loadData();
      }
    };

    window.addEventListener('levelupdev:dynamic_update', handleUpdate);
    return () => {
      mounted = false;
      window.removeEventListener('levelupdev:dynamic_update', handleUpdate);
    };
  }, [userData]);

  // Compute unlock & completion status for all modules
  const moduleStatusMap = useMemo(() => {
    if (!userData) return {};
    const javaProgress: Record<string, ModuleProgressRecord> =
      dynamicData?.progress?.java || {};

    const map: Record<
      string,
      {
        isUnlocked: boolean;
        isCompleted: boolean;
        topicsCompleted: string[];
        allTopicsCompleted: boolean;
        assignmentPassed: boolean;
        assignmentScore?: number;
        assignmentAttempts: any[];
      }
    > = {};

    allModules.forEach((m, idx) => {
      const rec =
        javaProgress[m.id] ||
        javaProgress[`module-${m.moduleNumber}`] ||
        javaProgress[`m${m.moduleNumber}`] ||
        javaProgress[String(m.moduleNumber)];
      const topicsCompleted = rec?.topicsCompleted || [];
      const totalTopicsCount = m.topicIds.length;
      const allTopicsCompleted =
        totalTopicsCount > 0 &&
        (topicsCompleted.length >= totalTopicsCount ||
          m.topicIds.every((tid) => topicsCompleted.includes(tid)));
      const assignmentPassed = !!rec?.assignmentPassed || rec?.status === 'completed';

      let isUnlocked = false;
      if (idx === 0) {
        isUnlocked = true;
      } else {
        const prevM = allModules[idx - 1];
        const prevRec =
          javaProgress[prevM.id] ||
          javaProgress[`module-${prevM.moduleNumber}`] ||
          javaProgress[`m${prevM.moduleNumber}`] ||
          javaProgress[String(prevM.moduleNumber)];
        isUnlocked = !!prevRec?.assignmentPassed || prevRec?.status === 'completed';
      }

      map[m.id] = {
        isUnlocked: m.isUpcoming ? false : isUnlocked,
        isCompleted: assignmentPassed,
        topicsCompleted,
        allTopicsCompleted,
        assignmentPassed,
        assignmentScore: rec?.assignmentScore,
        assignmentAttempts: rec?.assignmentAttempts || [],
      };
    });

    return map;
  }, [userData, dynamicData, allModules]);

  const currentModuleStatus = moduleMeta ? moduleStatusMap[moduleMeta.id] : null;

  // Topics for this module
  const topics: JavaTopicDetail[] = useMemo(() => {
    if (!moduleMeta) return [];
    return getJavaModuleTopics(moduleMeta.id);
  }, [moduleMeta]);

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono text-sm">
        <div className="flex items-center gap-3 bg-slate-900/80 px-6 py-4 rounded-2xl border border-slate-800">
          <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-300">Loading Module Details...</span>
        </div>
      </div>
    );
  }

  if (!moduleMeta) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <HelpCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Module Not Found</h2>
          <p className="text-xs text-slate-400">
            Module <code className="text-amber-400 font-mono">"{rawModuleId}"</code> is not registered.
          </p>
          <Link
            href="/skills/java"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Java Trail
          </Link>
        </div>
      </div>
    );
  }

  // Check if locked
  if (currentModuleStatus && !currentModuleStatus.isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Module {moduleMeta.moduleNumber} is Locked</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            You must pass the assignment for <strong>Module {moduleMeta.moduleNumber - 1}</strong> with at least <strong>70% score</strong> to unlock this module.
          </p>
          <Link
            href="/skills/java"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs font-mono transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Java Trail Map
          </Link>
        </div>
      </div>
    );
  }

  const completedTopicsCount = currentModuleStatus?.topicsCompleted?.length || 0;
  const totalTopicsCount = topics.length;
  const allTopicsDone = completedTopicsCount >= totalTopicsCount && totalTopicsCount > 0;
  const isAssignmentPassed = !!currentModuleStatus?.assignmentPassed;
  const bestScore = currentModuleStatus?.assignmentScore;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden flex flex-col">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/skills/java"
              className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 text-amber-500" />
              <span>Java Skills Trail Map</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="hidden sm:inline text-slate-400">
                Module {moduleMeta.moduleNumber} / 21
              </span>
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold px-2.5 py-1 rounded-lg">
                {completedTopicsCount}/{totalTopicsCount} Topics Done
              </span>
            </div>
          </div>
        </header>

        {/* Module Title Banner */}
        <div className="max-w-5xl mx-auto w-full px-4 pt-8 pb-4">
          <div className="p-6 md:p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-amber-500/10 via-slate-900/80 to-slate-900/90 shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-md">
                Module {moduleMeta.moduleNumber} • {moduleMeta.track?.toUpperCase()}
              </span>
              {isAssignmentPassed && (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" /> Module Certified ({bestScore}%)
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold font-display text-white">
              {moduleMeta.title}
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed">
              {moduleMeta.longDescription}
            </p>
          </div>
        </div>

        {/* Topics List & Assignment Section */}
        <main className="max-w-5xl mx-auto w-full px-4 py-6 space-y-8">
          {/* Section: Topics Checklist */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg md:text-xl font-bold text-white font-display">
                  Module Topics & Interactive Visualizers
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {completedTopicsCount} of {totalTopicsCount} Completed
              </span>
            </div>

            <div className="space-y-3">
              {topics.map((topic, index) => {
                const isTopicCompleted = currentModuleStatus?.topicsCompleted?.includes(topic.id);

                return (
                  <Link
                    key={topic.id}
                    href={`/skills/java/${moduleMeta.id}/${topic.id}`}
                    className={`flex items-center justify-between p-4 md:p-5 rounded-2xl border transition-all duration-200 group ${
                      isTopicCompleted
                        ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40'
                        : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/50 shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 flex-1 pr-4">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5 ${
                          isTopicCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {isTopicCompleted ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm md:text-base font-bold text-white group-hover:text-amber-300 transition">
                            {topic.title}
                          </h3>
                          {topic.visualizerType && topic.visualizerType !== 'none' && (
                            <span className="text-[10px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded">
                              Visualizer
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
                          {topic.shortSummary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-amber-400 transition shrink-0">
                      <span>{isTopicCompleted ? 'Review' : 'Start Lesson'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section: Module Assessment / Assignment Card */}
          <div className="p-6 md:p-8 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isAssignmentPassed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : allTopicsDone
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  <Award className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                    Mandatory Certification Exam
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white font-display">
                    Module {moduleMeta.moduleNumber} Assignment & Challenges
                  </h3>
                </div>
              </div>

              {isAssignmentPassed ? (
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
                  Passed ({bestScore}%)
                </span>
              ) : (
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  Requirement: ≥ 70%
                </span>
              )}
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Complete the randomized multi-format assessment (MCQs, output predictions, debugging exercises, and live code challenge) to unlock the next module.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80">
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  30 Mins Limit
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Anti-Cheating Randomized
                </span>
              </div>

              {allTopicsDone ? (
                <Link
                  href={`/skills/java/${moduleMeta.id}/assignment`}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold font-mono text-xs transition shadow-lg ${
                    isAssignmentPassed
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>{isAssignmentPassed ? 'Retake Exam for Higher Score' : 'Start Module Exam'}</span>
                </Link>
              ) : (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/60 text-slate-500 font-mono text-xs cursor-not-allowed border border-slate-800">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Complete All {totalTopicsCount} Topics to Unlock Exam</span>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
