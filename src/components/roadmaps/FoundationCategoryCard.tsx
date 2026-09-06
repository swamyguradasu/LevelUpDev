'use client';

import React, { useState } from 'react';
import { FoundationCategory, FoundationTopic } from '@/data/commonFoundationData';
import { RoadmapVisualFlow } from './RoadmapVisualFlow';
import {
  Code2,
  Cpu,
  Brain,
  Database,
  Layers,
  FolderGit2,
  Terminal,
  Globe,
  Wrench,
  Users,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  Sparkles,
  Info,
  CheckSquare,
  Square,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  FolderGit2: <FolderGit2 className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
};

interface FoundationCategoryCardProps {
  category: FoundationCategory;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isTopicCompleted: (topicId: string) => boolean;
  onToggleTopic: (topicId: string) => void;
  onSetCategoryTopics: (category: FoundationCategory, markAll: boolean) => void;
  progress: {
    completed: number;
    total: number;
    percentage: number;
    isFullyCompleted: boolean;
  };
}

export function FoundationCategoryCard({
  category,
  isExpanded,
  onToggleExpand,
  isTopicCompleted,
  onToggleTopic,
  onSetCategoryTopics,
  progress,
}: FoundationCategoryCardProps) {
  const [activeSubgroup, setActiveSubgroup] = useState<string>('all');

  const filteredTopics = category.topics.filter((topic) => {
    if (activeSubgroup === 'all') return true;
    return topic.subgroup === activeSubgroup;
  });

  const getDifficultyBadge = (difficulty?: string) => {
    if (difficulty === 'beginner') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Beginner
        </span>
      );
    }
    if (difficulty === 'intermediate') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Intermediate
        </span>
      );
    }
    if (difficulty === 'advanced') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          Advanced
        </span>
      );
    }
    return null;
  };

  return (
    <div
      id={`foundation-stage-${category.id}`}
      className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
        progress.isFullyCompleted
          ? 'bg-slate-900/90 border-emerald-500/40 shadow-xl shadow-emerald-500/5'
          : isExpanded
          ? 'bg-slate-900/95 border-[#006cd2]/70 shadow-2xl shadow-[#006cd2]/10 ring-1 ring-[#006cd2]/40'
          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 shadow-lg'
      }`}
    >
      {/* Card Header / Clickable summary */}
      <div
        onClick={onToggleExpand}
        className="p-6 sm:p-7 cursor-pointer select-none space-y-4 transition-colors"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Level Number & Icon */}
            <div className="relative flex-shrink-0">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
                  progress.isFullyCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : isExpanded
                    ? 'bg-[#006cd2]/25 text-blue-300 border border-[#006cd2]/50 scale-105'
                    : 'bg-slate-800/90 text-slate-300 border border-slate-700/80'
                }`}
              >
                {ICON_MAP[category.iconName] || <Code2 className="w-6 h-6" />}
              </div>
              <span className="absolute -top-2 -left-2 px-2 py-0.5 rounded-lg bg-slate-950 text-slate-400 font-mono text-[10px] font-bold border border-slate-800 shadow">
                {category.levelNumber}
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {category.title}
                </h3>
                {progress.isFullyCompleted && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    COMPLETED
                  </span>
                )}
              </div>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>

          {/* Progress Pill & Expand Chevron */}
          <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
            <div className="text-right space-y-1">
              <div className="flex items-center justify-end gap-2">
                <span className="font-mono text-xs text-slate-400">
                  <strong
                    className={
                      progress.isFullyCompleted
                        ? 'text-emerald-400'
                        : progress.completed > 0
                        ? 'text-blue-400'
                        : 'text-slate-300'
                    }
                  >
                    {progress.completed}
                  </strong>{' '}
                  / {progress.total} Topics
                </span>
                <span className="font-mono text-xs font-bold text-slate-400">
                  ({progress.percentage}%)
                </span>
              </div>
              {/* Mini Progress Bar */}
              <div className="w-32 sm:w-36 h-2 rounded-full bg-slate-800 overflow-hidden ml-auto">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    progress.isFullyCompleted
                      ? 'bg-emerald-400'
                      : 'bg-gradient-to-r from-[#006cd2] to-cyan-400'
                  }`}
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                isExpanded
                  ? 'bg-[#006cd2]/20 border-[#006cd2] text-blue-300'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 transition-transform" />
              ) : (
                <ChevronDown className="w-5 h-5 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Recommended note / summary hint */}
        {(category.recommendedText || category.importantNote) && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {category.recommendedText && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 text-cyan-300 text-xs font-mono border border-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                {category.recommendedText}
              </span>
            )}
            {category.importantNote && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-200 text-xs font-sans border border-amber-500/20">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                {category.importantNote}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Expanded Topic Details */}
      {isExpanded && (
        <div className="px-6 sm:px-8 pb-7 pt-2 border-t border-slate-800/80 space-y-6 bg-slate-950/50">
          {/* Interactive Visual Preview if applicable */}
          {category.visualType && category.visualType !== 'none' && (
            <div className="pt-2">
              <RoadmapVisualFlow type={category.visualType} />
            </div>
          )}

          {/* Subcategory Tabs if applicable */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explore Specific Module:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSubgroup('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition ${
                    activeSubgroup === 'all'
                      ? 'bg-[#006cd2] text-white font-bold shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  All Topics ({category.topics.length})
                </button>
                {category.subcategories.map((sub) => {
                  const subCount = category.topics.filter((t) => t.subgroup === sub.name).length;
                  const isActive = activeSubgroup === sub.name;
                  return (
                    <button
                      key={sub.name}
                      onClick={() => setActiveSubgroup(sub.name)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition ${
                        isActive
                          ? 'bg-[#006cd2] text-white font-bold shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {sub.name} ({subCount})
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Topics Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>CORE TOPICS & KEY CONCEPTS ({filteredTopics.length})</span>
              <span className="text-[11px] text-slate-400">Click checkboxes to track completion</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {filteredTopics.map((topic, index) => {
                const completed = isTopicCompleted(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => onToggleTopic(topic.id)}
                    className={`group relative rounded-2xl p-3.5 border cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 ${
                      completed
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                          completed
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                            : 'bg-slate-950 border-slate-700 text-slate-500 group-hover:border-slate-500'
                        }`}
                        aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {completed ? (
                          <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-slate-950" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs font-semibold leading-snug ${
                              completed
                                ? 'line-through text-slate-400'
                                : 'text-white group-hover:text-blue-200'
                            }`}
                          >
                            {topic.name}
                          </span>
                        </div>
                        {topic.subgroup && (
                          <span className="text-[10px] font-mono text-slate-400 block truncate">
                            {topic.subgroup}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex items-center gap-1.5">
                      {getDifficultyBadge(topic.difficulty)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSetCategoryTopics(category, true)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/30 transition flex items-center gap-1.5"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Mark All Complete</span>
              </button>
              {progress.completed > 0 && (
                <button
                  type="button"
                  onClick={() => onSetCategoryTopics(category, false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition flex items-center gap-1.5"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>Clear Category</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onToggleExpand}
              className="text-slate-400 hover:text-slate-200 transition flex items-center gap-1"
            >
              <span>Collapse Category</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
