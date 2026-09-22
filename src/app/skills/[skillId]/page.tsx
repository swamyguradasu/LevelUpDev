'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getSkillById, Skill } from '@/lib/content';
import {
  PYTHON_MODULES,
  getPythonTrackSections,
  PythonModuleMetadata,
  PythonTrackSection,
} from '@/data/pythonSkillsData';
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
} from 'lucide-react';

export default function SkillPathMapPage() {
  const params = useParams();
  const router = useRouter();
  const skillId = (params.skillId as string)?.toLowerCase();

  const { userData, loading } = useAuth();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [dynamicData, setDynamicData] = useState<UserDynamicData | null>(null);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  useEffect(() => {
    if (skillId === 'java') {
      router.replace('/skills/java');
      return;
    }
    if (skillId) {
      const data = getSkillById(skillId);
      setSkill(data);
    }
  }, [skillId, router]);

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

  // Specialized Python Trail Modules Computation across all 21 modules
  const pythonModulesWithStatus = useMemo(() => {
    if (skillId !== 'python' || !userData) return [];

    const pyProgress: Record<string, ModuleProgressRecord> =
      dynamicData?.progress?.python || ({} as Record<string, ModuleProgressRecord>);

    return PYTHON_MODULES.map((mod, index) => {
      const modRecord =
        pyProgress[mod.id] ||
        pyProgress[`module-${mod.moduleNumber}`] ||
        pyProgress[`m${mod.moduleNumber}`] ||
        pyProgress[String(mod.moduleNumber)];
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
        const prevMod = PYTHON_MODULES[index - 1];
        const prevRecord =
          pyProgress[prevMod.id] ||
          pyProgress[`module-${prevMod.moduleNumber}`] ||
          pyProgress[`m${prevMod.moduleNumber}`] ||
          pyProgress[String(prevMod.moduleNumber)];
        isUnlocked = !!prevRecord?.assignmentPassed || prevRecord?.status === 'completed';
      }

      // Determine UI status
      let moduleStatus: 'Not Started' | 'In Progress' | 'Topics Completed' | 'Completed' | 'Assignment Failed' = 'Not Started';
      let assignmentStatus: 'Locked' | 'Available' | 'Passed' | 'Failed' = 'Locked';

      if (assignmentPassed) {
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
        isUnlocked,
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
  }, [skillId, userData, dynamicData]);

  // Track Sections
  const trackSections = useMemo(() => {
    return getPythonTrackSections();
  }, []);

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono text-sm">
        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-800">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-300">Loading Skill Trail...</span>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans">
        <div className="text-center space-y-4 max-w-md bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800">
          <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-[#006cd2]">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-display text-white">Skill Trail Not Found</h2>
          <p className="text-xs text-slate-400">
            No roadmap configuration found for <code className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">&quot;{skillId}&quot;</code>.
          </p>
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-medium rounded-xl text-xs font-mono transition shadow-lg shadow-[#006cd2]/30"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Skills Trail Hub
          </Link>
        </div>
      </div>
    );
  }

  // Calculate overall Python progress (21 modules)
  const completedPythonModulesCount = pythonModulesWithStatus.filter((m) => m.isCompleted).length;
  const totalPythonModulesCount = pythonModulesWithStatus.length || 21;
  const progressPercent = Math.round((completedPythonModulesCount / totalPythonModulesCount) * 100);
  const isMasterCertified = completedPythonModulesCount >= 21;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient static background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#006cd2]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[70%] -right-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
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
              <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
              <span>Back to Skills Trail</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs font-mono text-slate-400">
                Progress: <strong className="text-blue-400">{completedPythonModulesCount}/{totalPythonModulesCount} Modules ({progressPercent}%)</strong>
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                <Compass className="w-3.5 h-3.5 text-[#006cd2]" />
                <span className="font-bold text-white">Python Skills Trail</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto w-full px-4 pt-10 pb-6 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006cd2]/10 border border-[#006cd2]/30 text-blue-400 text-xs font-mono font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>21-MODULE FULL PYTHON MASTERY CURRICULUM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Python <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">Skills Trail</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Master Python end-to-end across 4 specialized tracks: Foundation, Core Python, Real-World Engineering, and Capstone Project.
          </p>

          {/* Sequential Flow Explanation Banner */}
          <div className="max-w-2xl mx-auto bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs font-mono text-slate-400 text-left gap-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0">1</span>
              <span>Complete Topics</span>
            </div>
            <span className="text-slate-600">→</span>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">2</span>
              <span>Attempt Assignment</span>
            </div>
            <span className="text-slate-600">→</span>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">3</span>
              <span>Pass (≥70%) to Unlock Next</span>
            </div>
          </div>

          {/* Overall 21-Module Progress Bar */}
          <div className="max-w-2xl mx-auto bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-2 text-left">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Overall Python Trail Progress</span>
              <span className="text-blue-400 font-bold">{completedPythonModulesCount}/21 Modules Completed ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4 Specialized Tracks Display */}
        <main className="max-w-5xl mx-auto w-full py-6 px-4 sm:px-6 space-y-12 flex-1">
          {trackSections.map((section, sIdx) => {
            const sectionModules = pythonModulesWithStatus.filter((m) =>
              section.modules.some((sm) => sm.id === m.id)
            );

            return (
              <section key={section.track} className="space-y-5">
                {/* Track Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 uppercase">
                        {section.badge}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Section Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sectionModules.map((mod) => {
                    const isLocked = !mod.isUnlocked;
                    const isCapstone = mod.isCapstone;

                    return (
                      <div
                        key={mod.id}
                        className={`flex flex-col justify-between rounded-3xl p-6 sm:p-7 border backdrop-blur-xl transition-all duration-300 relative group overflow-hidden ${
                          isLocked
                            ? 'bg-slate-950/40 border-slate-900/80 opacity-60'
                            : mod.isCompleted
                            ? 'bg-slate-900/90 border-emerald-500/40 shadow-xl shadow-emerald-950/20 hover:border-emerald-500/70'
                            : isCapstone
                            ? 'bg-slate-900/90 border-emerald-500/50 shadow-xl shadow-emerald-950/30 hover:border-emerald-500/80'
                            : 'bg-slate-900/90 border-[#006cd2]/40 shadow-xl shadow-blue-950/30 hover:border-[#006cd2]/80'
                        }`}
                      >
                        <div className="space-y-4">
                          {/* Card Header: Module Number & Status Badge */}
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg uppercase tracking-wider border border-blue-500/20">
                              {isCapstone ? 'CAPSTONE PROJECT' : `MODULE ${mod.moduleNumber}`}
                            </span>

                            {/* Status Badges */}
                            {isLocked ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-500 text-[11px] font-mono font-medium">
                                <Lock className="w-3 h-3" /> Locked
                              </span>
                            ) : mod.isCompleted ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Completed ✓
                              </span>
                            ) : mod.moduleStatus === 'Topics Completed' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold animate-pulse">
                                <Award className="w-3.5 h-3.5 text-amber-400" /> Assignment Available
                              </span>
                            ) : mod.moduleStatus === 'Assignment Failed' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-300 text-[11px] font-mono font-bold">
                                <RotateCcw className="w-3.5 h-3.5 text-rose-400" /> Retry Assignment
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006cd2]/15 border border-[#006cd2]/40 text-blue-300 text-[11px] font-mono font-bold">
                                <Sparkles className="w-3.5 h-3.5 text-[#006cd2]" /> In Progress
                              </span>
                            )}
                          </div>

                          {/* Title and Description */}
                          <div>
                            <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                              {mod.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed font-sans">
                              {mod.shortDescription}
                            </p>
                          </div>

                          {/* Progress Stats Block */}
                          <div className="pt-2 border-t border-slate-800/80 space-y-2">
                            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                              <span>Topics Progress</span>
                              <strong className="text-slate-200">
                                {mod.completedTopicsCount}/{mod.totalTopicsCount} Completed
                              </strong>
                            </div>

                            {/* Mini Progress Bar */}
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  mod.isCompleted
                                    ? 'bg-emerald-500'
                                    : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                                }`}
                                style={{
                                  width: `${(mod.completedTopicsCount / mod.totalTopicsCount) * 100}%`,
                                }}
                              />
                            </div>

                            {/* Assignment Status Row */}
                            <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                              <span className="text-slate-500">
                                {isCapstone ? 'Capstone Status:' : 'Assignment:'}
                              </span>
                              <span
                                className={
                                  mod.assignmentStatus === 'Passed'
                                    ? 'text-emerald-400 font-bold'
                                    : mod.assignmentStatus === 'Available'
                                    ? 'text-amber-400 font-bold'
                                    : mod.assignmentStatus === 'Failed'
                                    ? 'text-rose-400 font-bold'
                                    : 'text-slate-500'
                                }
                              >
                                {isCapstone
                                  ? mod.isCompleted
                                    ? 'Certified & Complete 🎉'
                                    : 'Ready to Build & Submit'
                                  : mod.assignmentStatus === 'Passed'
                                  ? `Passed (${mod.bestScore || 100}%)`
                                  : mod.assignmentStatus === 'Available'
                                  ? 'Ready to Attempt'
                                  : mod.assignmentStatus === 'Failed'
                                  ? 'Failed (Retry Available)'
                                  : 'Locked (Complete topics first)'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* CTA Action Button */}
                        <div className="pt-5 mt-4">
                          {isLocked ? (
                            <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-500 text-xs font-mono select-none">
                              <Lock className="w-3.5 h-3.5" />
                              <span>Complete Module {mod.moduleNumber - 1} first</span>
                            </div>
                          ) : (
                            <Link
                              href={isCapstone ? '/skills/python/m21' : `/skills/python/${mod.id}`}
                              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-bold tracking-wide transition shadow-lg ${
                                isCapstone
                                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30'
                                  : mod.isCompleted
                                  ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30'
                                  : mod.moduleStatus === 'Topics Completed'
                                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-600/30'
                                  : mod.moduleStatus === 'Assignment Failed'
                                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                                  : 'bg-[#006cd2] hover:bg-[#005bb5] text-white shadow-[#006cd2]/30'
                              }`}
                            >
                              <span>
                                {isCapstone
                                  ? mod.isCompleted
                                    ? 'View Capstone Project'
                                    : 'Launch Capstone Workspace →'
                                  : mod.isCompleted
                                  ? 'Review Module'
                                  : mod.moduleStatus === 'Topics Completed'
                                  ? 'Take Module Assignment →'
                                  : mod.moduleStatus === 'Assignment Failed'
                                  ? 'Retry Assignment →'
                                  : mod.completedTopicsCount > 0
                                  ? 'Continue Learning'
                                  : 'Start Module'}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}
