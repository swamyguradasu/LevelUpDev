'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GENAI_ROADMAP_STAGES,
  GENAI_PROJECT_PROGRESSION,
  GENAI_TOOLKIT,
  GENAI_SPECIALIZATIONS,
  GENAI_COMMON_MISTAKES,
  GENAI_FOUR_PILLARS,
  GENAI_APPLICATION_ARCHITECTURE_STEPS,
  RAG_ARCHITECTURE_BLUEPRINT,
  GENAI_DECISION_TREE,
  GENAI_THINKING_LADDER,
  GENAI_SCORECARD,
} from '@/data/generativeAIEngineerRoadmap';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Terminal,
  Brain,
  Cpu,
  Network,
  Sparkles,
  MessageSquare,
  Database,
  Search,
  Sliders,
  Bot,
  ShieldCheck,
  Cloud,
  Rocket,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Compass,
  Laptop,
  Users,
  Target,
  Layers3,
  Layers,
  HelpCircle,
  TrendingUp,
  Workflow,
  Check,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Network: <Network className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  MessageSquare: <MessageSquare className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Search: <Search className="w-6 h-6" />,
  Sliders: <Sliders className="w-6 h-6" />,
  Bot: <Bot className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Layers3: <Layers3 className="w-6 h-6" />,
};

export default function GenerativeAIEngineerRoadmapPage() {
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'python-software-engineering': true, // Stage 01 open by default
  });

  const toggleStage = (id: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    GENAI_ROADMAP_STAGES.forEach((s) => (all[s.id] = true));
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

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white">
      {/* Background Decor Gradients & Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[#006cd2]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] -right-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen pb-mobile-nav">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/roadmaps"
                className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
                <span>All Career Roadmaps</span>
              </Link>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
                <Compass className="w-4 h-4 text-[#006cd2]" />
                <span>GenAI Engineering Path</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={expandAll}
                className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-slate-800 transition"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-slate-800 transition"
              >
                Collapse All
              </button>
              <a
                href="#projects-section"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-sans font-semibold bg-[#006cd2] hover:bg-[#005bb5] text-white px-3.5 py-1.5 rounded-full transition shadow-sm shadow-[#006cd2]/30"
              >
                <span>Project Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
          {/* ========================================================================= */}
          {/* 1. HERO SECTION */}
          {/* ========================================================================= */}
          <section className="text-center space-y-6 max-w-4xl mx-auto pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006cd2]/15 border border-[#006cd2]/30 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#006cd2]" />
              <span>CAREER ROADMAP</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Generative AI Engineer Roadmap
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Your step-by-step path from Python and AI fundamentals to LLMs, RAG, fine-tuning, AI agents, evaluation,
              and production-grade Generative AI applications.
            </p>

            {/* Visual Indicator: PROMPT -> MODEL -> CONTEXT -> GENERATION -> APPLICATION */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-2xl max-w-3xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs font-bold text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  PROMPT
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  MODEL
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                  CONTEXT
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  GENERATION
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  APPLICATION
                </span>
              </div>
            </div>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <span className="px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Beginner → Advanced
              </span>
              <span className="px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-medium flex items-center gap-1.5">
                <Layers3 className="w-3.5 h-3.5 text-[#006cd2]" />
                12 Learning Stages
              </span>
              <span className="px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Generative AI Engineering
              </span>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 2. ROADMAP OVERVIEW (12 Stages Visual Flow) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#006cd2]" />
                  <span>Roadmap Overview &amp; Learning Flow</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click any stage below to jump directly to its syllabus and practice projects.
                </p>
              </div>
              <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 w-fit">
                Recommended order — explore any stage whenever you want
              </span>
            </div>

            {/* Desktop Horizontal & Zig-Zag Flow (12 stages in grid) */}
            <div className="hidden lg:grid grid-cols-6 gap-3 relative">
              {GENAI_ROADMAP_STAGES.map((st) => {
                const isOpen = !!expandedStages[st.id];
                return (
                  <button
                    key={st.id}
                    onClick={() => scrollToStage(st.id)}
                    className={`relative p-3.5 rounded-2xl border text-left transition-all group flex flex-col justify-between min-h-[105px] ${
                      isOpen
                        ? 'bg-[#006cd2]/10 border-[#006cd2] shadow-lg shadow-[#006cd2]/10 ring-1 ring-[#006cd2]/50'
                        : 'bg-slate-950/80 border-slate-800 hover:border-[#006cd2]/50 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                          isOpen ? 'bg-[#006cd2] text-white' : 'bg-slate-800 text-slate-400 group-hover:text-white'
                        }`}
                      >
                        {st.stageNumber}
                      </span>
                      <div className="text-slate-400 group-hover:text-[#006cd2] transition-colors">
                        {ICON_MAP[st.iconName] || <Sparkles className="w-4 h-4" />}
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-xs font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                        {st.shortTitle}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <span>View stage</span>
                        <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile / Tablet Flow */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:hidden gap-2.5">
              {GENAI_ROADMAP_STAGES.map((st) => (
                <button
                  key={st.id}
                  onClick={() => scrollToStage(st.id)}
                  className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-[#006cd2] text-left transition flex items-center gap-2.5"
                >
                  <span className="font-mono text-xs font-bold text-[#006cd2] bg-slate-900 px-2 py-0.5 rounded shrink-0">
                    {st.stageNumber}
                  </span>
                  <span className="font-display text-xs font-bold text-white truncate">
                    {st.shortTitle}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. PROMPT -> RAG -> FINE-TUNING DECISION TREE */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                STRATEGIC DECISION FRAMEWORK
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Which Technique Should I Use?
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Never fine-tune simply because you can. Choose the simplest architecture that reliably solves the problem:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {GENAI_DECISION_TREE.map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-[#006cd2]/50 transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#006cd2] text-white font-mono text-xs font-bold flex items-center justify-center">
                        {item.step}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400 uppercase">Question {item.step}</span>
                    </div>
                    <p className="font-display text-sm font-bold text-white leading-snug">
                      &ldquo;{item.question}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-800/80">
                    <div className="p-2.5 rounded-xl bg-blue-950/40 border border-[#006cd2]/40 text-xs">
                      <div className="font-mono font-bold text-blue-300 uppercase">{item.yesAction}</div>
                      <div className="font-sans text-[11px] text-slate-300 mt-1 leading-snug">{item.yesDesc}</div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 text-center italic">
                      If No → {item.noFollowup}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. GENAI APPLICATION ARCHITECTURE (Visual Highlight) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                PRODUCTION SYSTEM BLUEPRINT
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Production GenAI Application Architecture
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                A full-stack 11-step enterprise pipeline connecting the user interface to grounded real-time intelligence:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center pt-2">
              {GENAI_APPLICATION_ARCHITECTURE_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 flex flex-col justify-between hover:border-[#006cd2]/60 transition"
                >
                  <div className="w-6 h-6 rounded-full bg-[#006cd2] text-white font-mono text-xs font-bold mx-auto flex items-center justify-center shadow-sm">
                    {step.step}
                  </div>
                  <div className="font-display text-xs font-bold text-white uppercase">{step.title}</div>
                  <div className="font-mono text-[9px] text-slate-400 line-clamp-2 leading-tight">{step.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 5. MAIN INTERACTIVE ROADMAP (12 STAGES) */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                  <Target className="w-6 h-6 text-[#006cd2]" />
                  <span>The 12 Generative AI Engineering Stages</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-slate-400 mt-0.5">
                  Click any stage to expand detailed syllabus topics, practice suggestions, and production system goals.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {GENAI_ROADMAP_STAGES.map((stage, sIdx) => {
                const isExpanded = !!expandedStages[stage.id];

                return (
                  <div
                    key={stage.id}
                    id={`stage-${stage.id}`}
                    className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? 'bg-slate-900/90 border-[#006cd2]/60 shadow-2xl shadow-[#006cd2]/10 ring-1 ring-[#006cd2]/30'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                    }`}
                  >
                    {/* Collapsed Header Bar */}
                    <div
                      onClick={() => toggleStage(stage.id)}
                      className="p-6 sm:p-7 cursor-pointer select-none flex items-start sm:items-center justify-between gap-4 group"
                    >
                      <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                            isExpanded
                              ? 'bg-[#006cd2] text-white border-white/20 shadow-lg shadow-[#006cd2]/40 scale-105'
                              : 'bg-slate-950 text-slate-300 border-slate-800 group-hover:border-[#006cd2]/60 group-hover:text-white'
                          }`}
                        >
                          {ICON_MAP[stage.iconName] || <Sparkles className="w-6 h-6" />}
                        </div>

                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#006cd2] tracking-wider uppercase">
                              STAGE {stage.stageNumber}
                            </span>
                            <span className="text-slate-600 hidden sm:inline">•</span>
                            <span className="font-mono text-xs text-slate-400 hidden sm:inline">
                              {stage.technologies.slice(0, 3).join(', ')}
                            </span>
                          </div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {stage.title}
                          </h3>
                          <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
                            {stage.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden md:inline-block font-mono text-xs font-semibold text-slate-400 group-hover:text-white">
                          {isExpanded ? 'Collapse' : 'Explore Stage →'}
                        </span>
                        <div
                          className={`w-9 h-9 rounded-full border border-slate-800 flex items-center justify-center transition-transform duration-200 ${
                            isExpanded ? 'bg-[#006cd2] text-white border-[#006cd2]' : 'bg-slate-950 text-slate-400'
                          }`}
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Body */}
                    {isExpanded && (
                      <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-slate-800/80 space-y-8 animate-fade-in">
                        {/* 1. Goal & Why It Matters */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#006cd2] uppercase">
                              <Target className="w-4 h-4" />
                              <span>Stage Goal</span>
                            </div>
                            <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                              &ldquo;{stage.goal}&rdquo;
                            </p>
                          </div>

                          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                            <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 uppercase">
                              <Lightbulb className="w-4 h-4" />
                              <span>Why This Matters</span>
                            </div>
                            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {stage.whyItMatters}
                            </p>
                          </div>
                        </div>

                        {/* Recommended Approach callout if present */}
                        {stage.recommendedApproach && (
                          <div className="p-4 rounded-2xl bg-blue-950/40 border border-[#006cd2]/40 flex items-start gap-3 text-xs sm:text-sm text-blue-200">
                            <Sparkles className="w-5 h-5 text-[#006cd2] shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-white">Recommended Approach: </strong>
                              {stage.recommendedApproach}
                            </div>
                          </div>
                        )}

                        {/* 2. What to Learn (Categorized Grid) */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <h4 className="font-display text-base font-bold text-white flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-[#006cd2]" />
                              <span>What to Learn in Stage {stage.stageNumber}</span>
                            </h4>
                            <span className="font-mono text-xs text-slate-500">Core Curriculum</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stage.topics.map((tGroup, tIdx) => (
                              <div
                                key={tIdx}
                                className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3"
                              >
                                <h5 className="font-mono text-xs font-bold text-blue-300 uppercase tracking-wider">
                                  {tGroup.category}
                                </h5>
                                <ul className="space-y-2">
                                  {tGroup.items.map((item, iIdx) => (
                                    <li
                                      key={iIdx}
                                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-snug"
                                    >
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 3. Tech Stack Chips & Key Concepts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h5 className="font-mono text-xs font-bold uppercase text-slate-300 flex items-center gap-2">
                              <Database className="w-4 h-4 text-[#006cd2]" />
                              <span>Recommended Technologies &amp; Tools</span>
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {stage.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs font-medium hover:border-[#006cd2] transition"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h5 className="font-mono text-xs font-bold uppercase text-slate-300 flex items-center gap-2">
                              <Layers3 className="w-4 h-4 text-[#006cd2]" />
                              <span>Key Concepts to Master</span>
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {stage.keyConcepts.map((concept, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 rounded-xl bg-[#006cd2]/10 border border-[#006cd2]/30 text-blue-200 font-sans text-xs font-semibold"
                                >
                                  {concept}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 4. Practice Ideas & Stage Projects */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                            <h5 className="font-mono text-xs font-bold uppercase text-slate-200 flex items-center gap-2">
                              <Target className="w-4 h-4 text-emerald-400" />
                              <span>Engineering Hands-On Exercises</span>
                            </h5>
                            <ul className="space-y-2.5">
                              {stage.practiceSuggestions.map((prac, pIdx) => (
                                <li key={pIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                                  <span className="font-mono text-emerald-400 font-bold">›</span>
                                  <span>{prac}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                            <h5 className="font-mono text-xs font-bold uppercase text-slate-200 flex items-center gap-2">
                              <Rocket className="w-4 h-4 text-[#006cd2]" />
                              <span>Stage System Project</span>
                            </h5>
                            <div className="space-y-3">
                              {stage.projectSuggestions.map((proj, prIdx) => (
                                <div
                                  key={prIdx}
                                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-display text-sm font-bold text-white">{proj.title}</span>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-blue-300 border border-slate-700">
                                      {proj.level}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-400">{proj.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 5. Common Mistakes */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                          <div className="flex items-center gap-2 font-mono text-xs font-bold text-rose-400 uppercase">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Common Pitfalls to Avoid in Stage {stage.stageNumber}</span>
                          </div>
                          <ul className="space-y-1.5 pl-6 list-disc text-xs sm:text-sm text-rose-200/90">
                            {stage.commonMistakes.map((mistake, mIdx) => (
                              <li key={mIdx}>{mistake}</li>
                            ))}
                          </ul>
                        </div>

                        {/* 6. Learning Outcome & Next Step */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                          <div className="space-y-0.5">
                            <span className="font-mono text-[11px] font-bold text-[#006cd2] uppercase">
                              LEARNING OUTCOME
                            </span>
                            <p className="text-xs sm:text-sm text-slate-300">{stage.learningOutcome}</p>
                          </div>

                          {sIdx < GENAI_ROADMAP_STAGES.length - 1 && (
                            <button
                              onClick={() => scrollToStage(GENAI_ROADMAP_STAGES[sIdx + 1].id)}
                              className="px-4 py-2 bg-slate-900 hover:bg-[#006cd2] text-white font-sans text-xs font-semibold rounded-xl border border-slate-800 transition flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                            >
                              <span>Next: Stage {GENAI_ROADMAP_STAGES[sIdx + 1].stageNumber}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 6. RAG ARCHITECTURE BLUEPRINT (Visual Highlight) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/40">
                <Database className="w-3.5 h-3.5" />
                <span>RAG ARCHITECTURE BLUEPRINT</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                The Complete Retrieval Augmented Generation Architecture
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect external enterprise documents to foundation models with strict grounding and verifiable citations:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 text-center pt-2">
              {RAG_ARCHITECTURE_BLUEPRINT.map((step) => (
                <div
                  key={step.step}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 flex flex-col justify-between hover:border-[#006cd2]/60 transition"
                >
                  <div className="w-6 h-6 rounded-full bg-[#006cd2] text-white font-mono text-xs font-bold mx-auto flex items-center justify-center shadow-sm">
                    {step.step}
                  </div>
                  <div className="font-display text-xs font-bold text-white uppercase">{step.title}</div>
                  <div className="font-mono text-[9px] text-slate-400 line-clamp-2 leading-tight">{step.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 7. GENAI EVALUATION SCORECARD */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-[#006cd2]/40 text-blue-300 font-mono text-xs font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006cd2]" />
                <span>BENCHMARKING &amp; RELIABILITY</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Is Your GenAI Application Production Ready?
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                An impressive demo is not a reliable production product. Benchmark your applications across these evaluation pillars:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {GENAI_SCORECARD.map((cat, cIdx) => (
                <div key={cIdx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                    {cat.category}
                  </h4>
                  <div className="space-y-2.5">
                    {cat.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="space-y-0.5">
                        <div className="font-display text-xs font-bold text-slate-200">{m.name}</div>
                        <div className="font-sans text-[11px] text-slate-400 leading-tight">{m.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Continuous Improvement Loop Concept */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <span className="font-mono text-[11px] text-slate-400 uppercase font-bold">
                The GenAI Development Lifecycle
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs font-bold text-white">
                <span className="px-3 py-1 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-500/30">
                  IDEA
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1 rounded-xl bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  PROTOTYPE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                  PROMPT
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-500/30">
                  BUILD
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1 rounded-xl bg-rose-950/60 text-rose-300 border border-rose-500/30">
                  EVALUATE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-500/30">
                  RAG / FINE-TUNE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  DEPLOY
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-500/30">
                  MONITOR
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-500/30">
                  IMPROVE
                </span>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 8. ROLE COMPARISONS (GenAI vs AI vs ML) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="space-y-2 max-w-3xl">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                CAREER COMPARISON
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                GenAI Engineer vs AI Engineer vs ML Engineer
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Understand how Generative AI Engineering compares to traditional Machine Learning and broader AI roles:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {/* ML Engineer */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  <h4 className="font-display text-base font-bold text-white">ML Engineer</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on building training pipelines, feature engineering, model training, Scikit-learn/XGBoost,
                  model serving, and MLOps infrastructure.
                </p>
                <div className="font-mono text-[10px] text-blue-300 pt-2 border-t border-slate-800/80">
                  DATA → TRAIN → MODEL → SERVE → MONITOR
                </div>
              </div>

              {/* AI Engineer */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-display text-base font-bold text-white">AI Engineer</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on building intelligent products across computer vision, NLP, classic predictive models,
                  and foundational AI systems integration.
                </p>
                <div className="font-mono text-[10px] text-cyan-300 pt-2 border-t border-slate-800/80">
                  DATA → MODEL → AI SYSTEM → APPLICATION → DEPLOY
                </div>
              </div>

              {/* GenAI Engineer */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-[#006cd2]/60 ring-1 ring-[#006cd2]/30 space-y-3 shadow-lg shadow-[#006cd2]/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#006cd2]" />
                  <h4 className="font-display text-base font-bold text-white">GenAI Engineer</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on Large Language Models, prompt engineering, RAG pipelines, fine-tuning (LoRA/QLoRA),
                  stateful AI agents, LLM evaluation, and LLMOps.
                </p>
                <div className="font-mono text-[10px] text-[#006cd2] pt-2 border-t border-slate-800/80 font-bold">
                  PROMPT → LLM → RAG/TOOLS → AGENTS → EVAL → DEPLOY
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 9. HOW A GENAI ENGINEER THINKS (Thinking Ladder) */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                SYSTEMS THINKING
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                How a GenAI Engineer Thinks
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Good GenAI engineering is about choosing the simplest architecture that reliably solves the problem:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {GENAI_THINKING_LADDER.map((item) => (
                <div
                  key={item.step}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-center flex flex-col justify-between hover:border-[#006cd2]/50 transition"
                >
                  <div className="w-6 h-6 rounded-full bg-[#006cd2]/20 border border-[#006cd2]/40 text-[#006cd2] font-mono text-xs font-bold mx-auto flex items-center justify-center">
                    {item.step}
                  </div>
                  <div className="font-display text-xs font-bold text-blue-300 uppercase leading-snug">
                    {item.label}
                  </div>
                  <p className="font-sans text-xs text-slate-300 italic">{item.question}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 10. WHERE CAN GENERATIVE AI TAKE YOU? (Specializations) */}
          {/* ========================================================================= */}
          <section className="space-y-6 pt-6">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <Compass className="w-3.5 h-3.5" />
                <span>SPECIALIZATION PATHWAYS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Where Can Generative AI Take You?
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                Build strong GenAI engineering fundamentals first, then specialize in one of these high-impact domains:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GENAI_SPECIALIZATIONS.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-3xl p-6 sm:p-7 bg-slate-900/70 border border-slate-800 hover:border-[#006cd2]/60 hover:bg-slate-900 transition flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#006cd2]/20 border border-[#006cd2]/40 text-[#006cd2] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {ICON_MAP[spec.icon] || <Sparkles className="w-6 h-6" />}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {spec.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{spec.description}</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800/80">
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">Core Tech Stack</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {spec.coreTech.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono text-[11px] border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-blue-300 bg-blue-950/30 p-2 rounded-lg border border-blue-900/40">
                      <strong>Focus: </strong>
                      {spec.focus}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 11. GENAI ENGINEERING TOOLKIT */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-[#006cd2]" />
                  <span>The Generative AI Engineering Tech Stack</span>
                </h3>
                <p className="font-sans text-xs text-slate-400 mt-0.5">
                  Core competencies separated from advanced / specialized infrastructure.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {GENAI_TOOLKIT.map((cat, cIdx) => (
                <div key={cIdx} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <h4 className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                    {cat.category}
                  </h4>

                  <div className="space-y-2">
                    <div>
                      <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase">Core Skills</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cat.coreItems.map((item, iIdx) => (
                          <span
                            key={iIdx}
                            className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">
                        Advanced / Specialized
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cat.advancedItems.map((item, iIdx) => (
                          <span
                            key={iIdx}
                            className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-mono text-xs border border-slate-800/60"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 12. WHERE TO PRACTICE */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#006cd2] uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Where to Practice &amp; Build GenAI Systems</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Hugging Face</div>
                <p className="text-xs text-slate-400">
                  Explore open models, tokenizers, instruction datasets, PEFT tools, and Spaces demos.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">GitHub</div>
                <p className="text-xs text-slate-400">
                  Inspect LangGraph agent graphs, build modular packages, and showcase portfolio repos.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Kaggle</div>
                <p className="text-xs text-slate-400">
                  Access free GPU environments for running quantized LLMs and fine-tuning experiments.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Papers With Code</div>
                <p className="text-xs text-slate-400">
                  Read original AI research papers (Transformers, LoRA, RAGAS) and examine implementations.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 13. COMMON GENERATIVE AI LEARNING MISTAKES */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">
                AVOID THESE TRAPS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Common GenAI Learning Mistakes
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Steer clear of these frequent pitfalls that trap aspiring GenAI engineers:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {GENAI_COMMON_MISTAKES.map((mistake, mIdx) => (
                <div
                  key={mIdx}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Pitfall #{mIdx + 1}</span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-white">{mistake.title}</h4>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 text-xs text-slate-300 border border-slate-800/80">
                    <strong className="text-emerald-400">Remedy: </strong>
                    {mistake.solution}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 14. REAL-WORLD GENAI PROJECT PATH (Project Progression Matrix) */}
          {/* ========================================================================= */}
          <section id="projects-section" className="space-y-8 pt-4">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <Rocket className="w-3.5 h-3.5" />
                <span>PROJECT PROGRESSION MATRIX</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                What Should You Build?
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                Build real production GenAI systems—progressing from streaming APIs to advanced multi-agent platforms
                with smart model routing and automated evaluation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GENAI_PROJECT_PROGRESSION.map((proj, pIdx) => {
                const isFinal = pIdx === GENAI_PROJECT_PROGRESSION.length - 1;

                return (
                  <div
                    key={proj.id}
                    className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between space-y-5 transition-all duration-300 ${
                      isFinal
                        ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-[#006cd2]/60 shadow-xl shadow-[#006cd2]/10 md:col-span-2 lg:col-span-1'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                          {proj.stage}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono font-medium text-slate-300">
                          {proj.difficulty}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white leading-snug">{proj.name}</h3>

                      <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>

                      {/* Business Problem */}
                      <div className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-900/40 text-[11px] text-blue-200 font-sans">
                        <strong className="text-white">Problem: </strong>
                        {proj.problemSolved}
                      </div>

                      {/* Recommended Stack */}
                      <div className="space-y-1.5 pt-1">
                        <span className="font-mono text-[11px] text-slate-400 font-bold uppercase">
                          Recommended Stack
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.recommendedStack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 font-mono text-[11px] border border-slate-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Architecture & Metrics */}
                      <div className="space-y-1 text-[11px] font-mono text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div>
                          <strong className="text-slate-200">Architecture: </strong>
                          {proj.aiArchitecture}
                        </div>
                        <div className="pt-1">
                          <strong className="text-slate-200">Metrics: </strong>
                          {proj.evaluationMetrics}
                        </div>
                        <div className="pt-1">
                          <strong className="text-slate-200">Deployment: </strong>
                          {proj.deploymentDetails}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80">
                      <div className="flex flex-wrap gap-1">
                        {proj.skillsLearned.map((sk, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded"
                          >
                            #{sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 15. WHAT COMPANIES LOOK FOR (4 Pillars) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                HIRING EVALUATION MATRIX
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                What Companies Look For in a GenAI Engineer
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Evaluation criteria across software engineering, Generative AI foundations, application development, and system thinking:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {GENAI_FOUR_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-3 flex flex-col items-center justify-start hover:border-[#006cd2]/50 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#006cd2]/20 border border-[#006cd2]/40 text-[#006cd2] flex items-center justify-center shadow-inner">
                    {ICON_MAP[pillar.icon] || <Sparkles className="w-6 h-6" />}
                  </div>
                  <h3 className="font-display text-base font-bold text-white">{pillar.title}</h3>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">{pillar.subtitle}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 16. CLOSING SECTION: TURN GENERATIVE AI INTO REAL PRODUCTS */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-[#006cd2]" />

            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="px-3.5 py-1 rounded-full bg-[#006cd2]/20 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider border border-[#006cd2]/30">
                PRODUCTION GENAI
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Turn Generative AI into real products.
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed italic">
                &ldquo;A Generative AI Engineer bridges the gap between powerful foundation models and useful real-world
                applications. Learn how to work with models, context, retrieval, tools, evaluation, deployment, and
                production infrastructure.&rdquo;
              </p>
            </div>

            {/* Continuous Learning Loop */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 font-mono text-xs sm:text-sm font-bold text-white">
                <span className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  PROMPT
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  MODEL
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                  CONTEXT
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  RETRIEVE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-300">
                  GENERATE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300">
                  USE TOOLS
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300">
                  EVALUATE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  DEPLOY
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  IMPROVE
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollToStage('python-software-engineering')}
                className="px-8 py-3.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans font-semibold text-sm rounded-full transition shadow-lg shadow-[#006cd2]/30 flex items-center gap-2"
              >
                <span>Start with Stage 01</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/roadmaps"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-sans font-medium text-sm rounded-full border border-slate-800 transition"
              >
                View All Career Roadmaps
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-500 font-mono text-xs py-8 px-6 md:px-12 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© 2024 LevelUpDev • Generative AI Engineer Learning Roadmap</div>
            <div className="flex items-center gap-4">
              <Link href="/home" className="hover:text-slate-300 transition-colors">
                Portfolio
              </Link>
              <span>•</span>
              <Link href="/roadmaps/ai-engineer" className="hover:text-slate-300 transition-colors">
                AI Engineer
              </Link>
              <span>•</span>
              <Link href="/roadmaps/ml-engineer" className="hover:text-slate-300 transition-colors">
                ML Engineer
              </Link>
              <span>•</span>
              <Link href="/roadmaps" className="hover:text-slate-300 transition-colors">
                Career Hub
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
