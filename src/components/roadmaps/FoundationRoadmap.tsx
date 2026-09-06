'use client';

import React, { useState } from 'react';
import { COMMON_FOUNDATION_CATEGORIES, FoundationCategory } from '@/data/commonFoundationData';
import { FoundationCategoryCard } from './FoundationCategoryCard';
import {
  Layers,
  Sparkles,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Maximize2,
  Minimize2,
  Compass,
  Trophy,
  Rocket,
  Code2,
  Cpu,
  Brain,
  Database,
  FolderGit2,
  Terminal,
  Globe,
  Wrench,
  Users,
} from 'lucide-react';

const NODE_ICONS: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  Brain: <Brain className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  FolderGit2: <FolderGit2 className="w-4 h-4" />,
  Terminal: <Terminal className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  Wrench: <Wrench className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
};

interface FoundationRoadmapProps {
  isTopicCompleted: (topicId: string) => boolean;
  onToggleTopic: (topicId: string) => void;
  onSetCategoryTopics: (category: FoundationCategory, markAll: boolean) => void;
  onResetAllProgress: () => void;
  getCategoryProgress: (category: FoundationCategory) => {
    completed: number;
    total: number;
    percentage: number;
    isFullyCompleted: boolean;
  };
  progressPercentage: number;
  completedCategoriesCount: number;
  totalCategoriesCount: number;
  completedTopicsCount: number;
  totalTopicsCount: number;
  isAllCompleted: boolean;
  onScrollToSpecialization: () => void;
}

export function FoundationRoadmap({
  isTopicCompleted,
  onToggleTopic,
  onSetCategoryTopics,
  onResetAllProgress,
  getCategoryProgress,
  progressPercentage,
  completedCategoriesCount,
  totalCategoriesCount,
  completedTopicsCount,
  totalTopicsCount,
  isAllCompleted,
  onScrollToSpecialization,
}: FoundationRoadmapProps) {
  // Category expanded state (Default: 01 Programming open)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    programming: true,
  });

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    COMMON_FOUNDATION_CATEGORIES.forEach((c) => (all[c.id] = true));
    setExpandedCategories(all);
  };

  const collapseAll = () => {
    setExpandedCategories({});
  };

  const scrollToCategory = (id: string) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      const el = document.getElementById(`foundation-stage-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="space-y-10">
      {/* 1. Progress Header Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>FOUNDATION TRACKER</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              YOUR FOUNDATION PROGRESS
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans">
              Master every core module at your own pace before diving into role-specific tracks.
            </p>
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={expandAll}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono transition flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand All</span>
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono transition flex items-center gap-1.5"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Collapse All</span>
            </button>
            {completedTopicsCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all foundation progress?')) {
                    onResetAllProgress();
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress Metric Bars */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-2 font-bold">
              <span className="text-lg sm:text-xl text-white font-extrabold">
                {progressPercentage}%
              </span>{' '}
              Complete
            </span>
            <span className="text-slate-400">
              <strong className="text-cyan-300">{completedCategoriesCount}</strong> /{' '}
              {totalCategoriesCount} Areas Completed •{' '}
              <strong className="text-blue-300">{completedTopicsCount}</strong> / {totalTopicsCount}{' '}
              Topics Mastered
            </span>
          </div>

          {/* Large Multi-hue Progress Bar */}
          <div className="w-full h-3.5 rounded-full bg-slate-950 border border-slate-800 p-0.5 overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isAllCompleted
                  ? 'bg-emerald-400'
                  : 'bg-gradient-to-r from-[#006cd2] via-cyan-400 to-emerald-400'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Completion Celebration State */}
        {isAllCompleted && (
          <div className="rounded-2xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/30 to-slate-950 border border-emerald-500/50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-lg font-black text-white">
                  🎉 FOUNDATION COMPLETE!
                </h4>
                <p className="text-xs text-emerald-300 font-sans">
                  You've built your core software foundation. You are now prepared to tackle any
                  specialized career roadmap.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onScrollToSpecialization}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center gap-2 whitespace-nowrap"
            >
              <span>Your next step → Choose a Career Path</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Connected Stage Navigator (Desktop Connected Nodes / Mobile Horizontal Carousel) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span className="flex items-center gap-1.5 uppercase font-bold text-slate-300">
            <Compass className="w-4 h-4 text-[#006cd2]" />
            <span>FOUNDATION STAGE MAP (10 LEVELS)</span>
          </span>
          <span className="text-[11px] hidden sm:inline">Click node to jump & expand</span>
        </div>

        {/* Node Pipeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {COMMON_FOUNDATION_CATEGORIES.map((cat, idx) => {
            const catProgress = getCategoryProgress(cat);
            const isOpen = expandedCategories[cat.id];

            return (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`relative rounded-2xl p-3.5 text-left border transition-all duration-200 flex flex-col justify-between group ${
                  catProgress.isFullyCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 shadow-sm'
                    : isOpen
                    ? 'bg-[#006cd2]/20 border-[#006cd2] text-white shadow-md shadow-[#006cd2]/20 ring-1 ring-[#006cd2]'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    STAGE {cat.levelNumber}
                  </span>
                  <div className="text-[#006cd2] group-hover:scale-110 transition-transform">
                    {NODE_ICONS[cat.iconName] || <Code2 className="w-4 h-4" />}
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  <div className="font-display text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {cat.shortName}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>
                      {catProgress.completed}/{catProgress.total}
                    </span>
                    {catProgress.isFullyCompleted ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <span>{catProgress.percentage}%</span>
                    )}
                  </div>
                </div>

                {/* Bottom mini indicator */}
                <div className="w-full h-1 bg-slate-950 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      catProgress.isFullyCompleted ? 'bg-emerald-400' : 'bg-cyan-400'
                    }`}
                    style={{ width: `${catProgress.percentage}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. The 10 Foundation Stage Expandable Cards */}
      <div className="space-y-6">
        {COMMON_FOUNDATION_CATEGORIES.map((category) => {
          const catProgress = getCategoryProgress(category);
          const isExpanded = !!expandedCategories[category.id];

          return (
            <FoundationCategoryCard
              key={category.id}
              category={category}
              isExpanded={isExpanded}
              onToggleExpand={() => toggleCategory(category.id)}
              isTopicCompleted={isTopicCompleted}
              onToggleTopic={onToggleTopic}
              onSetCategoryTopics={onSetCategoryTopics}
              progress={catProgress}
            />
          );
        })}
      </div>

      {/* 4. Visual Transition Section to Career Roadmaps */}
      <div
        id="career-specialization-transition"
        className="rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-[#006cd2]/40 p-8 text-center space-y-6 shadow-2xl"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006cd2]/15 border border-[#006cd2]/30 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
          <Rocket className="w-3.5 h-3.5 text-[#006cd2]" />
          <span>STAGE 03 • SELECT SPECIALIZATION</span>
        </div>

        <div className="space-y-2 max-w-2xl mx-auto">
          <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            FOUNDATION COMPLETE?
          </h3>
          <p className="font-display text-lg sm:text-xl font-bold text-cyan-400">
            Now choose your career path.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            With your software fundamentals locked in, select the engineering discipline below that
            matches your passion and goals.
          </p>
        </div>

        {/* Visual Pipeline Progression */}
        <div className="max-w-4xl mx-auto pt-2">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
              COMMON FOUNDATION
            </span>
            <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:inline" />
            <span className="px-3 py-1.5 rounded-xl bg-[#006cd2]/25 text-blue-300 border border-[#006cd2]/50 font-bold">
              CHOOSE YOUR PATH
            </span>
            <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:inline" />
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800">
              ROLE-SPECIFIC ROADMAP
            </span>
            <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:inline" />
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800">
              PROJECTS
            </span>
            <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:inline" />
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800">
              INTERVIEW PREP
            </span>
            <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:inline" />
            <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
              JOB READY
            </span>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onScrollToSpecialization}
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition group"
          >
            <span>Browse All Career Roadmaps Below</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
