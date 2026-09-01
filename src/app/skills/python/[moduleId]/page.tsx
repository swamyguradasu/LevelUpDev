'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  getPythonModuleById,
  getModuleTopics,
  getAllPythonModules,
  PythonModuleMetadata,
  PythonTopicDetail,
} from '@/data/pythonSkillsData';
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
} from 'lucide-react';

export default function PythonModulePage() {
  const params = useParams();
  const router = useRouter();
  const rawModuleId = params.moduleId as string;

  const { userData, loading } = useAuth();
  const [dynamicData, setDynamicData] = useState<UserDynamicData | null>(null);

  const moduleMeta = useMemo(() => {
    return getPythonModuleById(rawModuleId);
  }, [rawModuleId]);

  const allModules = useMemo(() => getAllPythonModules(), []);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  useEffect(() => {
    async function loadData() {
      if (userData?.email) {
        const d = await fetchUserDynamicData(userData.email);
        setDynamicData(d);
      }
    }
    loadData();
  }, [userData]);

  // Compute unlock & completion status for all modules to protect routes and navigation
  const moduleStatusMap = useMemo(() => {
    if (!userData) return {};
    const pyProgress: Record<string, ModuleProgressRecord> =
      dynamicData?.progress?.python || {};

    const map: Record<
      string,
      {
        isUnlocked: boolean;
        isCompleted: boolean;
        topicsCompleted: string[];
        allTopicsCompleted: boolean;
        assignmentPassed: boolean;
        assignmentScore?: number;
      }
    > = {};

    allModules.forEach((m, idx) => {
      const rec = pyProgress[m.id] || pyProgress[`module-${m.moduleNumber}`];
      const completedTopics = rec?.topicsCompleted || [];
      const allDone = completedTopics.length >= m.topicIds.length;
      const passed = !!rec?.assignmentPassed || rec?.status === 'completed';

      let unlocked = false;
      if (idx === 0) {
        unlocked = true;
      } else {
        const prevM = allModules[idx - 1];
        const prevRec = pyProgress[prevM.id] || pyProgress[`module-${prevM.moduleNumber}`];
        unlocked = !!prevRec?.assignmentPassed || prevRec?.status === 'completed';
      }

      map[m.id] = {
        isUnlocked: unlocked,
        isCompleted: passed,
        topicsCompleted: completedTopics,
        allTopicsCompleted: allDone,
        assignmentPassed: passed,
        assignmentScore: rec?.assignmentScore,
      };
    });

    return map;
  }, [userData, dynamicData, allModules]);

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-300">
        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-800">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Loading Module...</span>
        </div>
      </div>
    );
  }

  if (!moduleMeta) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="text-center space-y-4 max-w-md bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-[#006cd2]">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Module Not Found</h2>
          <p className="text-xs text-slate-400">
            Could not find module <code className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">&quot;{rawModuleId}&quot;</code>.
          </p>
          <Link
            href="/skills/python"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006cd2] hover:bg-[#005bb5] text-white text-xs font-mono font-semibold rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Python Roadmap
          </Link>
        </div>
      </div>
    );
  }

  const currentModStatus = moduleStatusMap[moduleMeta.id] || {
    isUnlocked: moduleMeta.moduleNumber === 1,
    isCompleted: false,
    topicsCompleted: [],
    allTopicsCompleted: false,
    assignmentPassed: false,
  };

  // URL Bypass Protection
  if (!currentModStatus.isUnlocked) {
    const prevMod = allModules[moduleMeta.moduleNumber - 2];
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="text-center space-y-4 max-w-lg bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Module {moduleMeta.moduleNumber} is Locked</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            You must complete all topics and pass the assignment for{' '}
            <strong className="text-blue-400">Module {prevMod?.moduleNumber}: {prevMod?.title}</strong> before accessing this module.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/skills/python"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" /> Python Roadmap
            </Link>
            {prevMod && (
              <Link
                href={`/skills/python/${prevMod.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#006cd2] hover:bg-[#005bb5] text-white text-xs font-mono font-bold rounded-xl transition shadow-lg shadow-[#006cd2]/30"
              >
                <span>Go to Module {prevMod.moduleNumber}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const topics = getModuleTopics(moduleMeta.id);
  const completedTopicsCount = currentModStatus.topicsCompleted.length;
  const totalTopicsCount = topics.length;
  const progressRatio = totalTopicsCount > 0 ? (completedTopicsCount / totalTopicsCount) * 100 : 0;

  const prevModule = moduleMeta.moduleNumber > 1 ? allModules[moduleMeta.moduleNumber - 2] : null;
  const nextModule = moduleMeta.moduleNumber < allModules.length ? allModules[moduleMeta.moduleNumber] : null;
  const isNextModuleUnlocked = nextModule ? !!moduleStatusMap[nextModule.id]?.isUnlocked : false;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-[#006cd2] selection:text-white flex flex-col overflow-x-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#006cd2]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-32 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/skills/python"
              className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl hover:border-slate-700 transition"
            >
              <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
              <span>Back to Python Roadmap</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                Topics: <strong className="text-blue-400">{completedTopicsCount}/{totalTopicsCount} Completed</strong>
              </span>

              {currentModStatus.isCompleted ? (
                <span className="px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Module Completed ✓
                </span>
              ) : (
                <span className="px-3.5 py-1.5 bg-[#006cd2]/15 border border-[#006cd2]/40 text-blue-300 text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#006cd2]" /> In Progress
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8 flex-1">
          {/* Module Banner */}
          <div className="bg-slate-900/90 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-[#006cd2]" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg uppercase tracking-wider border border-blue-500/30">
                  MODULE {moduleMeta.moduleNumber} • PYTHON SKILLS TRAIL
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Module {moduleMeta.moduleNumber} — {moduleMeta.title}
              </h1>
              <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {moduleMeta.longDescription}
              </p>

              {/* Progress bar */}
              <div className="pt-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Topic Completion Progress</span>
                  <span className="text-white font-bold">{completedTopicsCount} / {totalTopicsCount} Topics Completed</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      currentModStatus.allTopicsCompleted
                        ? 'bg-emerald-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                    }`}
                    style={{ width: `${progressRatio}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Topics List Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#006cd2]" />
                Module Syllabus Topics
              </h2>
              <span className="font-mono text-xs text-slate-400">
                {topics.length} Topic{topics.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-3">
              {topics.map((t, idx) => {
                const isTopicDone = currentModStatus.topicsCompleted.includes(t.id);

                return (
                  <Link
                    key={t.id}
                    href={`/skills/python/${moduleMeta.id}/${t.id}`}
                    className={`block bg-slate-900/80 backdrop-blur-md rounded-2xl border p-5 sm:p-6 shadow-xl transition-all duration-200 group hover:translate-x-1 ${
                      isTopicDone
                        ? 'border-emerald-500/30 hover:border-emerald-500/60'
                        : 'border-slate-800 hover:border-[#006cd2]/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            isTopicDone
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-[#006cd2]/20 text-blue-300 border border-[#006cd2]/40'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-slate-400 uppercase">
                              Topic {idx + 1}
                            </span>
                            {isTopicDone && (
                              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                Completed ✓
                              </span>
                            )}
                          </div>
                          <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                            {t.title}
                          </h3>
                          <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {t.shortSummary}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono text-slate-400 group-hover:text-blue-300 transition-colors">
                        <span>{isTopicDone ? 'Review' : 'Start'}</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Module Assignment Card */}
          <section className="pt-4">
            <div
              className={`rounded-3xl p-7 sm:p-8 border backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all ${
                currentModStatus.assignmentPassed
                  ? 'bg-slate-900/90 border-emerald-500/40'
                  : currentModStatus.allTopicsCompleted
                  ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/60 border-[#006cd2]/60 shadow-[#006cd2]/10'
                  : 'bg-slate-950/40 border-slate-900/80 opacity-60'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg uppercase tracking-wider border border-amber-500/30">
                      MODULE {moduleMeta.moduleNumber} ASSESSMENT
                    </span>
                    {currentModStatus.assignmentPassed ? (
                      <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        Passed ({currentModStatus.assignmentScore || 100}%) ✓
                      </span>
                    ) : currentModStatus.allTopicsCompleted ? (
                      <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30 animate-pulse">
                        Assignment Ready
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-white">
                    Module {moduleMeta.moduleNumber} Final Assignment
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {currentModStatus.assignmentPassed
                      ? 'You have successfully passed this module assignment. You can retry anytime to practice new randomized problem sets.'
                      : currentModStatus.allTopicsCompleted
                      ? 'All topics completed! Test your understanding across multi-type questions (MCQs, Output Prediction, Debugging, Code Writing) to unlock the next module.'
                      : `Complete all ${totalTopicsCount} topics in this module to unlock this assignment.`}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-blue-400" /> Multi-Format Questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-emerald-400" /> Passing: 70%
                    </span>
                  </div>
                </div>

                {/* Assignment Button */}
                <div className="shrink-0 w-full md:w-auto">
                  {currentModStatus.allTopicsCompleted ? (
                    <Link
                      href={`/skills/python/${moduleMeta.id}/assignment`}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs font-bold rounded-xl shadow-lg shadow-[#006cd2]/30 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <Award className="w-4 h-4" />
                      <span>{currentModStatus.assignmentPassed ? 'Retake Assignment' : 'Start Module Assignment →'}</span>
                    </Link>
                  ) : (
                    <div className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 border border-slate-800 text-slate-500 text-xs font-mono rounded-xl select-none">
                      <Lock className="w-4 h-4" />
                      <span>Complete All Topics to Unlock</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Module-to-Module Navigation */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
            {prevModule ? (
              <Link
                href={`/skills/python/${prevModule.id}`}
                className="flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition group"
              >
                <ArrowLeft className="w-4 h-4 text-[#006cd2] transition-transform group-hover:-translate-x-1" />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Previous Module</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white truncate max-w-[150px] sm:max-w-[200px] block">
                    Module {prevModule.moduleNumber}: {prevModule.title}
                  </span>
                </div>
              </Link>
            ) : <div />}

            {nextModule ? (
              isNextModuleUnlocked ? (
                <Link
                  href={`/skills/python/${nextModule.id}`}
                  className="flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-2xl bg-[#006cd2] hover:bg-[#005bb5] text-white text-right transition group shadow-lg shadow-[#006cd2]/20"
                >
                  <div>
                    <span className="text-[10px] font-mono text-blue-200 uppercase block">Next Module</span>
                    <span className="text-xs sm:text-sm font-bold truncate max-w-[150px] sm:max-w-[200px] block">
                      Module {nextModule.moduleNumber}: {nextModule.title}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <div className="flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-500 text-right opacity-70 select-none">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center justify-end gap-1">
                      <Lock className="w-3 h-3" /> Next Module Locked
                    </span>
                    <span className="text-xs font-bold truncate max-w-[150px] sm:max-w-[200px] block">
                      Pass Module {moduleMeta.moduleNumber} Assignment first
                    </span>
                  </div>
                </div>
              )
            ) : (
              <Link
                href="/skills/python/final-challenge"
                className="flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-right transition group shadow-lg shadow-indigo-600/30"
              >
                <span className="text-xs sm:text-sm font-bold">Final Capstone Challenge 🎉</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
