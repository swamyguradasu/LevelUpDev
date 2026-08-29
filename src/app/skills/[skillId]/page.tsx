'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getSkillById, Skill, Module } from '@/lib/content';
import { ArrowLeft, Check, Lock, HelpCircle, Sparkles, BookOpen, Compass } from 'lucide-react';

export default function SkillPathMapPage() {
  const params = useParams();
  const router = useRouter();
  const skillId = params.skillId as string;

  const { userData, loading } = useAuth();
  const [skill, setSkill] = useState<Skill | null>(null);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  useEffect(() => {
    if (skillId) {
      const data = getSkillById(skillId);
      setSkill(data);
    }
  }, [skillId]);

  // Compute status for each module in sequence (memoized for performance)
  const { modulesWithStatus, firstUncompletedIndex, completedCount, totalCount } = useMemo(() => {
    if (!skill || !userData) {
      return { modulesWithStatus: [], firstUncompletedIndex: -1, completedCount: 0, totalCount: 0 };
    }

    const skillProgress = userData.progress?.[skill.skillId.toLowerCase()] || {};
    const uncompletedIdx = skill.modules.findIndex((mod: Module) => !skillProgress[mod.moduleId]);
    let done = 0;

    const list = skill.modules.map((mod: Module, index: number) => {
      const isCompleted = !!skillProgress[mod.moduleId];
      if (isCompleted) done++;

      let isUnlocked = false;
      if (index === 0) {
        isUnlocked = true; // Module 1 is always unlocked
      } else {
        const prevModule = skill.modules[index - 1];
        isUnlocked = !!skillProgress[prevModule.moduleId];
      }

      const isCurrent = !isCompleted && isUnlocked && (uncompletedIdx === -1 ? false : index === uncompletedIdx);

      let status: 'completed' | 'in-progress' | 'locked' = 'locked';
      if (isCompleted) {
        status = 'completed';
      } else if (isUnlocked) {
        status = 'in-progress';
      } else {
        status = 'locked';
      }

      return {
        ...mod,
        status,
        isUnlocked,
        isCompleted,
        isCurrent,
        moduleNumber: index + 1,
      };
    });

    return {
      modulesWithStatus: list,
      firstUncompletedIndex: uncompletedIdx,
      completedCount: done,
      totalCount: skill.modules.length,
    };
  }, [skill, userData]);

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

  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Lightweight Static Ambient Background (Zero lag, zero canvas/mousemove CPU load) */}
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

      <div className="relative z-10 flex flex-col flex-1">
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
                Progress: <strong className="text-blue-400">{completedCount}/{totalCount} Modules ({progressPercent}%)</strong>
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                <Compass className="w-3.5 h-3.5 text-[#006cd2]" />
                <span className="font-bold text-white">{skill.title} Trail</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="max-w-4xl mx-auto w-full px-4 pt-10 pb-4 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/10 border border-[#006cd2]/30 text-blue-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE LEARNING TRAIL</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            {skill.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Trail</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {skill.description || 'Master core programming fundamentals, data structures, and problem-solving through interactive lessons and assessments.'}
          </p>
        </div>

        {/* Trail Roadmap Canvas */}
        <main className="relative max-w-[1100px] mx-auto w-full min-h-[700px] py-8 px-4 sm:px-6 flex-1">
          {/* Desktop SVG Trail Line */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 800">
              <path
                d="M 500,30 Q 720,180 500,340 T 500,680"
                stroke="#006cd2"
                strokeOpacity="0.4"
                strokeWidth="3"
                strokeDasharray="8 8"
                fill="none"
              />
            </svg>
          </div>

          {/* Mobile SVG Trail Line */}
          <div className="absolute inset-0 pointer-events-none z-0 block md:hidden">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 800">
              <path
                d="M 200,30 Q 280,180 200,340 T 200,680"
                stroke="#006cd2"
                strokeOpacity="0.4"
                strokeWidth="3"
                strokeDasharray="8 8"
                fill="none"
              />
            </svg>
          </div>

          {/* Trail Nodes Container */}
          <div className="relative z-10 flex flex-col items-center gap-24 md:gap-32 w-full max-w-4xl mx-auto my-6">
            {modulesWithStatus.map((mod, index) => {
              const isEven = index % 2 === 0;
              const modCode = `M${String(index + 1).padStart(2, '0')}`;
              const topicSummary =
                mod.topics.map((t) => t.name).join(', ') || 'Core concepts and practical exercises.';

              return (
                <div key={mod.moduleId} className="relative flex items-center justify-center w-full min-h-[140px]">
                  {/* Center Axis Node Badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    {mod.isCompleted ? (
                      <div className="w-12 h-12 rounded-full bg-[#006cd2] flex items-center justify-center shadow-lg shadow-[#006cd2]/40 border-2 border-white/30 hover:scale-110 transition-transform">
                        <Check className="w-6 h-6 text-white stroke-[3]" />
                      </div>
                    ) : mod.isCurrent || (mod.isUnlocked && !mod.isCompleted && firstUncompletedIndex === index) ? (
                      <div className="w-14 h-14 rounded-full bg-slate-950 border-4 border-[#006cd2] flex items-center justify-center shadow-[0_0_25px_rgba(0,108,210,0.7)] animate-pulse">
                        <div className="w-5 h-5 rounded-full bg-[#006cd2] shadow-inner"></div>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center bg-slate-900 shadow-inner">
                        <Lock className="w-4 h-4 text-slate-500" />
                      </div>
                    )}
                  </div>

                  {/* Node Content Card (Alternating Left/Right) */}
                  <div
                    className={`absolute z-10 w-[calc(50%-2.5rem)] sm:w-80 ${
                      isEven
                        ? 'right-1/2 mr-8 md:mr-12 text-right'
                        : 'left-1/2 ml-8 md:ml-12 text-left'
                    }`}
                  >
                    {mod.isCompleted ? (
                      <Link
                        href={`/skills/${skill.skillId}/${mod.moduleId}`}
                        className="bg-slate-900/80 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl hover:border-[#006cd2]/60 hover:shadow-2xl hover:shadow-[#006cd2]/20 hover:translate-y-[-2px] transition-all duration-200 block group"
                      >
                        <div className={`flex items-center justify-between mb-2 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                          <span className="font-mono text-xs text-[#006cd2] font-bold">{modCode}</span>
                          <span className="text-[11px] text-emerald-400 font-mono font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            Completed ✓
                          </span>
                        </div>
                        <h3 className="font-display text-base sm:text-lg text-white group-hover:text-blue-300 transition-colors mb-1.5 font-bold">{mod.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {topicSummary}
                        </p>
                      </Link>
                    ) : mod.isCurrent || (mod.isUnlocked && !mod.isCompleted && firstUncompletedIndex === index) ? (
                      <div className="bg-slate-900/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border-2 border-[#006cd2] shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_25px_rgba(0,108,210,0.25)] relative group hover:translate-y-[-2px] transition-all duration-200">
                        <div className={`flex items-center justify-between mb-3 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-blue-400 font-bold">{modCode}</span>
                            <span className="bg-[#006cd2] text-white px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider">
                              CURRENT
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                            {mod.topics.length} Topics
                          </span>
                        </div>
                        <h3 className="font-display text-lg sm:text-xl text-white mb-2 font-extrabold tracking-tight">
                          {mod.title}
                        </h3>
                        <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                          {topicSummary}
                        </p>
                        <Link
                          href={`/skills/${skill.skillId}/${mod.moduleId}`}
                          className="w-full bg-[#006cd2] hover:bg-[#005bb5] text-white font-semibold text-xs font-mono py-2.5 px-4 rounded-xl shadow-lg shadow-[#006cd2]/30 hover:shadow-[#006cd2]/50 active:scale-95 transition-all block text-center mt-3"
                        >
                          Resume Trail →
                        </Link>
                      </div>
                    ) : (
                      <div className="bg-slate-950/40 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-slate-900/80 shadow-none opacity-50">
                        <div className={`flex items-center justify-between mb-2 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                          <span className="font-mono text-xs text-slate-500 font-medium">{modCode}</span>
                          <span className="text-[11px] text-slate-600 font-mono">Locked</span>
                        </div>
                        <h3 className="font-display text-sm sm:text-base text-slate-400 mb-1 font-semibold">
                          {mod.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2">{topicSummary}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
