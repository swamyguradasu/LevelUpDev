'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  Cpu,
  Code2,
  Brain,
  Layers,
  Activity,
  Boxes,
  Database,
  Terminal,
  Globe,
  FolderGit2,
  GitBranch,
  Webhook,
  Sparkles,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { CS_FOUNDATIONS_LEVELS, getTotalTopicsCount } from '@/data/csFoundationsData';

const ICON_MAP: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  Boxes: <Boxes className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  FolderGit2: <FolderGit2 className="w-6 h-6" />,
  GitBranch: <GitBranch className="w-6 h-6" />,
  Webhook: <Webhook className="w-6 h-6" />,
};

export default function CSFoundationsRoadmapPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-cyan-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[70%] -right-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* Top Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/skills"
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
              <span>Back to Skills Trail</span>
            </Link>

            {/* Breadcrumb Header */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/skills" className="hover:text-slate-200 transition">
                Skills Trail
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-cyan-400 font-semibold">CS Foundations</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 space-y-12 flex-1">
          {/* Header Banner */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wide shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>FOUNDATION ROADMAP</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              CS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Foundations</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              The essential knowledge every computer science student should build. Follow the structured sequence from hardware basics to advanced algorithms and system architectures.
            </p>
          </div>

          {/* Connected Roadmap Timeline */}
          <div className="relative pt-6 pb-12">
            {/* Center Roadmap Connector Line */}
            <div className="absolute top-12 bottom-12 left-6 sm:left-10 w-0.5 bg-gradient-to-b from-cyan-500/40 via-blue-500/40 to-indigo-500/40 pointer-events-none" />

            <div className="space-y-8 relative">
              {CS_FOUNDATIONS_LEVELS.map((level, index) => {
                const totalTopics = getTotalTopicsCount(level);
                const isDSA = level.id === 'dsa';
                const isAlgoAnalysis = level.id === 'algorithm-analysis';

                return (
                  <div key={level.id} className="relative flex items-start gap-4 sm:gap-8 group">
                    {/* Step Number Circle / Node */}
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-900 border-2 border-cyan-500/40 flex items-center justify-center font-mono font-bold text-sm sm:text-base text-cyan-300 shadow-lg shadow-cyan-950/40 group-hover:border-cyan-400 group-hover:scale-105 group-hover:bg-slate-850 transition-all duration-300">
                      {level.levelNumber}
                    </div>

                    {/* Level Card */}
                    <div className="flex-1 rounded-3xl bg-slate-900/70 border border-slate-800/90 p-5 sm:p-7 backdrop-blur-xl shadow-xl shadow-black/40 hover:border-cyan-500/40 transition-all duration-300 group-hover:translate-y-[-2px] space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                            {ICON_MAP[level.iconName] || <Cpu className="w-5 h-5" />}
                          </div>
                          <div>
                            <span className="text-[11px] font-mono font-semibold text-cyan-400 tracking-wider uppercase block">
                              Level {level.levelNumber}
                            </span>
                            <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {level.title}
                            </h3>
                          </div>
                        </div>

                        {level.badge && (
                          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                            {level.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {level.shortDescription}
                      </p>

                      {/* DSA / Multi-category preview tag */}
                      {level.categories.length > 1 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {level.categories.slice(0, 6).map((cat) => (
                            <span
                              key={cat.id}
                              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-950/60 border border-slate-800 text-slate-400"
                            >
                              {cat.title}
                            </span>
                          ))}
                          {level.categories.length > 6 && (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-950/60 border border-slate-800 text-cyan-400 font-semibold">
                              +{level.categories.length - 6} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Card Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                          <span>
                            {totalTopics} {totalTopics === 1 ? 'Topic' : 'Topics'}
                            {level.categories.length > 1 && ` • ${level.categories.length} Categories`}
                          </span>
                        </div>

                        <Link
                          href={`/skills/foundations/${level.id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 text-xs font-mono font-bold tracking-wide transition-all duration-200 group-hover:shadow-md group-hover:shadow-cyan-500/20"
                        >
                          <span>Explore Topics</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
