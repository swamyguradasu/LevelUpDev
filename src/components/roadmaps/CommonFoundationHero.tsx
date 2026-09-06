'use client';

import React from 'react';
import Link from 'next/link';
import {
  Rocket,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface CommonFoundationHeroProps {
  totalCategoriesCount: number;
  totalTopicsCount: number;
}

export function CommonFoundationHero({
  totalCategoriesCount,
  totalTopicsCount,
}: CommonFoundationHeroProps) {
  const pipelineSteps = [
    { label: 'START HERE', active: true, step: '01' },
    { label: 'FOUNDATION', active: true, step: '02' },
    { label: 'SPECIALIZE', active: false, step: '03' },
    { label: 'BUILD', active: false, step: '04' },
    { label: 'GET JOB READY', active: false, step: '05' },
  ];

  return (
    <Link
      href="/roadmaps/common-software-foundation"
      className="group relative block rounded-3xl overflow-hidden border border-[#006cd2]/50 hover:border-[#006cd2] bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-950/95 p-6 sm:p-8 md:p-10 shadow-2xl shadow-[#006cd2]/15 transition-all duration-300 hover:shadow-cyan-500/20 hover:-translate-y-0.5"
    >
      {/* Background radial accent glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#006cd2]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#006cd2]/25 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

      <div className="relative z-10 space-y-7">
        {/* Top Tag & Stats Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-500/20 border border-[#006cd2]/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider shadow-inner">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>🚀 START HERE • ESSENTIAL BASELINE</span>
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Curriculum:</span>
            <span className="font-bold text-cyan-300">{totalCategoriesCount} Core Modules</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">{totalTopicsCount}+ Topics</span>
          </div>
        </div>

        {/* Main Headings */}
        <div className="space-y-3 max-w-4xl">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-none group-hover:text-blue-200 transition-colors">
            Common Software Foundation
          </h2>
          <p className="font-display text-base sm:text-xl font-bold text-blue-300 tracking-tight">
            Build these core skills before choosing your career path.
          </p>
          <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
            These fundamentals are useful across Software Development, Data, AI/ML, Cloud,
            Cybersecurity and other technology careers. Master the core building blocks so you can
            excel in any specialization.
          </p>
        </div>

        {/* Highlight Feature Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs text-slate-300">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <strong className="text-white">{totalCategoriesCount} Core Areas</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <strong className="text-white">{totalTopicsCount}+ Topics</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <strong className="text-white">Beginner Friendly</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <strong className="text-white">Career Agnostic</strong>
          </div>
        </div>

        {/* Visual Roadmap Indicator Pipeline */}
        <div className="pt-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Recommended Progression Pipeline:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {pipelineSteps.map((step, idx) => (
              <div
                key={step.label}
                className={`relative rounded-xl p-3 border transition-all ${
                  step.active
                    ? 'bg-[#006cd2]/20 border-[#006cd2] text-white shadow-md shadow-[#006cd2]/10'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    STAGE {step.step}
                  </span>
                  {idx < pipelineSteps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-600 hidden sm:block" />
                  )}
                </div>
                <div className="font-mono text-xs font-extrabold mt-1 tracking-wider">
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-300 font-sans">
            <span className="font-semibold text-white">Everyone starts with the foundation.</span>{' '}
            Click to open the complete interactive syllabus.
          </div>

          <div className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#006cd2] to-cyan-500 group-hover:from-blue-600 group-hover:to-cyan-400 text-white font-mono font-bold text-sm shadow-xl shadow-[#006cd2]/30 group-hover:shadow-cyan-500/30 transition-all duration-300">
            <span>Explore Foundation Roadmap</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
