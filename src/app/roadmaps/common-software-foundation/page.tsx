'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COMMON_FOUNDATION_CATEGORIES, TOTAL_FOUNDATION_TOPICS_COUNT } from '@/data/commonFoundationData';
import { CAREER_ROADMAPS_LIST } from '@/data/careerRoadmapsList';
import { RoadmapVisualFlow } from '@/components/roadmaps/RoadmapVisualFlow';
import {
  Compass,
  ArrowLeft,
  ArrowRight,
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
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Rocket,
  Maximize2,
  Minimize2,
  BookOpen,
  Info,
  Layers3,
  ExternalLink,
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

export default function CommonSoftwareFoundationRoadmapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDifficulty, setActiveDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    programming: true,
    dsa: true,
  });

  const toggleStage = (id: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    COMMON_FOUNDATION_CATEGORIES.forEach((c) => (all[c.id] = true));
    setExpandedStages(all);
  };

  const collapseAll = () => {
    setExpandedStages({});
  };

  const scrollToStage = (id: string) => {
    setExpandedStages((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      const el = document.getElementById(`stage-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

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
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Background Decor Gradients & Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#006cd2]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/roadmaps"
                className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
                <span>Career Roadmaps</span>
              </Link>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Rocket className="w-4 h-4 text-cyan-400" />
                <span>Common Software Foundation</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/home"
                className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition"
              >
                Portfolio
              </Link>
              <Link
                href="/dashboard"
                className="text-xs font-mono text-cyan-400 hover:text-white px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>Dashboard</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12 flex-1">
          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden border border-[#006cd2]/50 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-950/95 p-6 sm:p-10 shadow-2xl shadow-[#006cd2]/15 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-500/20 border border-[#006cd2]/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider shadow-inner">
                <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                <span>🚀 CORE BASELINE • 10 LEVELS</span>
              </div>

              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Total Curriculum:</span>
                <span className="font-bold text-cyan-300">{COMMON_FOUNDATION_CATEGORIES.length} Stages</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">{TOTAL_FOUNDATION_TOPICS_COUNT} Topics</span>
              </div>
            </div>

            <div className="space-y-3 max-w-4xl">
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-none">
                Common Software Foundation
              </h1>
              <p className="font-display text-lg sm:text-2xl font-bold text-blue-300 tracking-tight">
                Build these core skills before choosing your career path.
              </p>
              <p className="font-sans text-xs sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                These fundamentals are useful across Software Development, Data, AI/ML, Cloud,
                Cybersecurity and other technology careers. Master the core building blocks so you can
                excel in any engineering specialization.
              </p>
            </div>

            {/* Visual Roadmap Indicator */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                Recommended Progression Pipeline:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { label: 'START HERE', active: true, step: '01' },
                  { label: 'FOUNDATION', active: true, step: '02' },
                  { label: 'SPECIALIZE', active: false, step: '03' },
                  { label: 'BUILD', active: false, step: '04' },
                  { label: 'GET JOB READY', active: false, step: '05' },
                ].map((step, idx) => (
                  <div
                    key={step.label}
                    className={`rounded-xl p-3 border transition-all ${
                      step.active
                        ? 'bg-[#006cd2]/25 border-[#006cd2] text-white shadow-md shadow-[#006cd2]/10'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        STAGE {step.step}
                      </span>
                      {idx < 4 && <ArrowRight className="w-3 h-3 text-slate-600 hidden sm:block" />}
                    </div>
                    <div className="font-mono text-xs font-extrabold mt-1 tracking-wider">
                      {step.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search and Filters */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter topics (e.g. Recursion, SQL, Git, Linux, OOP)..."
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#006cd2] focus:ring-1 focus:ring-[#006cd2] transition shadow-inner"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setActiveDifficulty('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
                    activeDifficulty === 'all'
                      ? 'bg-[#006cd2] text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  All Levels
                </button>
                <button
                  onClick={() => setActiveDifficulty('beginner')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
                    activeDifficulty === 'beginner'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-950 text-emerald-400 hover:text-emerald-300 border border-slate-800'
                  }`}
                >
                  🟢 Beginner
                </button>
                <button
                  onClick={() => setActiveDifficulty('intermediate')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
                    activeDifficulty === 'intermediate'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'bg-slate-950 text-amber-300 hover:text-amber-200 border border-slate-800'
                  }`}
                >
                  🟡 Intermediate
                </button>
                <button
                  onClick={() => setActiveDifficulty('advanced')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
                    activeDifficulty === 'advanced'
                      ? 'bg-rose-600 text-white font-bold'
                      : 'bg-slate-950 text-rose-300 hover:text-rose-200 border border-slate-800'
                  }`}
                >
                  🔴 Advanced
                </button>
                <button
                  onClick={expandAll}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono transition flex items-center gap-1.5"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand All</span>
                </button>
                <button
                  onClick={collapseAll}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono transition flex items-center gap-1.5"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Collapse All</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stage Navigator (10 Stage Jumper Grid) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span className="flex items-center gap-1.5 uppercase font-bold text-slate-300">
                <Compass className="w-4 h-4 text-[#006cd2]" />
                <span>FOUNDATION STAGE MAP (10 MODULES)</span>
              </span>
              <span className="text-[11px] hidden sm:inline">Click any node to jump & explore</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {COMMON_FOUNDATION_CATEGORIES.map((cat) => {
                const isOpen = expandedStages[cat.id];
                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollToStage(cat.id)}
                    className={`relative rounded-2xl p-3.5 text-left border transition-all duration-200 flex flex-col justify-between group ${
                      isOpen
                        ? 'bg-[#006cd2]/20 border-[#006cd2] text-white shadow-md shadow-[#006cd2]/20 ring-1 ring-[#006cd2]'
                        : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        STAGE {cat.levelNumber}
                      </span>
                      <div className="text-[#006cd2] group-hover:scale-110 transition-transform">
                        {ICON_MAP[cat.iconName] || <Code2 className="w-4 h-4" />}
                      </div>
                    </div>

                    <div className="mt-2 space-y-1">
                      <div className="font-display text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {cat.shortName}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {cat.topics.length} Topics
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Stage Modules */}
          <div className="space-y-6">
            {COMMON_FOUNDATION_CATEGORIES.map((category) => {
              const isExpanded = !!expandedStages[category.id];

              // Filter topics based on search and difficulty
              const filteredTopics = category.topics.filter((topic) => {
                const matchesSearch =
                  !searchQuery ||
                  topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (topic.subgroup && topic.subgroup.toLowerCase().includes(searchQuery.toLowerCase()));
                const matchesDifficulty =
                  activeDifficulty === 'all' || topic.difficulty === activeDifficulty;
                return matchesSearch && matchesDifficulty;
              });

              if (searchQuery && filteredTopics.length === 0) {
                return null;
              }

              return (
                <div
                  key={category.id}
                  id={`stage-${category.id}`}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-slate-900/95 border-[#006cd2]/70 shadow-2xl shadow-[#006cd2]/10 ring-1 ring-[#006cd2]/40'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 shadow-lg'
                  }`}
                >
                  {/* Card Header / Summary */}
                  <div
                    onClick={() => toggleStage(category.id)}
                    className="p-6 sm:p-7 cursor-pointer select-none space-y-4 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="relative flex-shrink-0">
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
                              isExpanded
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

                        <div className="space-y-1">
                          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                            {category.title}
                          </h2>
                          <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                        <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 font-semibold">
                          {category.topics.length} Topics
                        </span>

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

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-6 sm:px-8 pb-7 pt-2 border-t border-slate-800/80 space-y-6 bg-slate-950/50">
                      {category.visualType && category.visualType !== 'none' && (
                        <div className="pt-2">
                          <RoadmapVisualFlow type={category.visualType} />
                        </div>
                      )}

                      {/* Subcategory summary preview */}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          {category.subcategories.map((sub) => (
                            <div
                              key={sub.name}
                              className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-1.5"
                            >
                              <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{sub.name}</span>
                              </div>
                              {sub.description && (
                                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                                  {sub.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Topic List */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                          <span>CORE SYLLABUS ({filteredTopics.length} Topics)</span>
                          <span className="text-[11px] text-slate-400">Essential Engineering Topics</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {filteredTopics.map((topic, index) => {
                            const num = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
                            return (
                              <div
                                key={topic.id}
                                className="group relative rounded-2xl p-3.5 border bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-900 transition-all duration-200 flex items-center justify-between gap-3"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <span className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs font-bold text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-500/40 transition">
                                    {num}
                                  </span>
                                  <div className="min-w-0">
                                    <span className="text-xs font-semibold leading-snug text-white group-hover:text-blue-200 transition">
                                      {topic.name}
                                    </span>
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

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => toggleStage(category.id)}
                          className="text-slate-400 hover:text-slate-200 transition flex items-center gap-1 text-xs font-mono"
                        >
                          <span>Collapse Module</span>
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Callout: Transition to Career Roadmaps */}
          <div className="rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950 border border-[#006cd2]/50 p-8 sm:p-10 text-center space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006cd2]/15 border border-[#006cd2]/30 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Rocket className="w-3.5 h-3.5 text-[#006cd2]" />
              <span>READY TO SPECIALIZE?</span>
            </div>

            <div className="space-y-2 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Now Choose Your Career Path
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Once you grasp the common software foundation, dive into any of our 17 role-specific
                curated roadmaps with project milestones and interview preparation.
              </p>
            </div>

            {/* Quick Link Grid to Career Roadmaps */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto pt-2">
              {CAREER_ROADMAPS_LIST.filter((c) => c.status === 'active')
                .slice(0, 8)
                .map((role) => (
                  <Link
                    key={role.id}
                    href={`/roadmaps/${role.slug}`}
                    className="group rounded-2xl p-4 bg-slate-950/80 border border-slate-800 hover:border-[#006cd2] text-left transition flex flex-col justify-between space-y-2"
                  >
                    <div className="font-display text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {role.title}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#006cd2] group-hover:text-cyan-400">
                      <span>{role.stageCount} Stages</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
            </div>

            <div className="pt-2">
              <Link
                href="/roadmaps"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#006cd2] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white font-mono font-bold text-xs sm:text-sm shadow-xl shadow-[#006cd2]/20 transition"
              >
                <span>Browse All 17 Developer Roadmaps</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-500 font-mono text-xs py-8 px-6 md:px-12 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© 2024 LevelUpDev • Common Software Foundation</div>
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/home" className="hover:text-slate-300 transition-colors">
                Portfolio
              </Link>
              <span>•</span>
              <Link href="/roadmaps" className="hover:text-slate-300 transition-colors">
                All Career Roadmaps
              </Link>
              <span>•</span>
              <Link href="/roadmaps/software-engineer" className="hover:text-slate-300 transition-colors">
                Software Engineer
              </Link>
              <span>•</span>
              <Link href="/roadmaps/python-developer" className="hover:text-slate-300 transition-colors">
                Python Developer
              </Link>
              <span>•</span>
              <Link href="/roadmaps/ai-engineer" className="hover:text-slate-300 transition-colors">
                AI Engineer
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
