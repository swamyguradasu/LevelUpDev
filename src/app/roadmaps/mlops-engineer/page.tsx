'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MLOPS_ROADMAP_STAGES,
  MLOPS_PROJECT_PROGRESSION,
  MLOPS_LIFECYCLE_MAP,
  MLOPS_TOOLKIT,
  MLOPS_SPECIALIZATIONS,
  MLOPS_THINKING_LADDER,
  MLOPS_COMMON_MISTAKES,
  MLOPS_CHECKLIST,
  MLOPS_FOUR_PILLARS,
  PRODUCTION_ARCHITECTURE_STEPS,
  MLOpsLifecycleItem,
} from '@/data/mlopsEngineerRoadmap';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Terminal,
  Server,
  Brain,
  Globe,
  Layers,
  Workflow,
  FlaskConical,
  GitFork,
  Cloud,
  Rocket,
  Activity,
  Shield,
  Sparkles,
  Database,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Compass,
  Target,
  Layers3,
  RefreshCw,
  GitBranch,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Workflow: <Workflow className="w-6 h-6" />,
  FlaskConical: <FlaskConical className="w-6 h-6" />,
  GitFork: <GitFork className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Layers3: <Layers3 className="w-6 h-6" />,
  GitBranch: <GitBranch className="w-6 h-6" />,
};

export default function MLOpsEngineerRoadmapPage() {
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'python-software-engineering': true, // Stage 01 open by default
  });

  const [selectedLifecycleStage, setSelectedLifecycleStage] = useState<MLOpsLifecycleItem>(
    MLOPS_LIFECYCLE_MAP[0]
  );

  const toggleStage = (id: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    MLOPS_ROADMAP_STAGES.forEach((s) => (all[s.id] = true));
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
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[#006cd2]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] -right-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]" />
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
                <span>MLOps Engineering Path</span>
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
              MLOps Engineer Roadmap
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Your step-by-step path from software engineering and machine learning foundations to automated ML
              pipelines, cloud infrastructure, deployment, monitoring, and production ML systems.
            </p>

            {/* Subtle Visual Flow: CODE -> MODEL -> PIPELINE -> DEPLOY -> MONITOR -> AUTOMATE */}
            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-2xl max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 font-mono text-[11px] sm:text-xs font-bold text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  CODE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  MODEL
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                  PIPELINE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  DEPLOY
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-pink-950/60 border border-pink-500/30 text-pink-300">
                  MONITOR
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  AUTOMATE
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
                <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                Machine Learning Operations
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
                  Click any stage below to jump directly to its syllabus, tools, and hands-on projects.
                </p>
              </div>
              <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 w-fit">
                Recommended order — explore any stage whenever you want
              </span>
            </div>

            {/* Desktop Horizontal & Zig-Zag Flow (12 stages grid) */}
            <div className="hidden lg:grid grid-cols-6 gap-3 relative">
              {MLOPS_ROADMAP_STAGES.map((st) => {
                const isOpen = !!expandedStages[st.id];
                return (
                  <button
                    key={st.id}
                    onClick={() => scrollToStage(st.id)}
                    className={`relative p-3.5 rounded-2xl border text-left transition-all group flex flex-col justify-between min-h-[110px] ${
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
                        {ICON_MAP[st.iconName] || <Workflow className="w-4 h-4" />}
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
              {MLOPS_ROADMAP_STAGES.map((st) => (
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
          {/* 3. MLOps LIFECYCLE MAP (Interactive Major Visual) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>INTERACTIVE LIFECYCLE</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                The Complete MLOps Lifecycle
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Click any stage of the lifecycle below to inspect what happens, common tooling, and production engineering requirements:
              </p>
            </div>

            {/* Lifecycle Stages Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {MLOPS_LIFECYCLE_MAP.map((item) => {
                const isSelected = selectedLifecycleStage.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedLifecycleStage(item)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#006cd2]/20 border-[#006cd2] text-white shadow-md shadow-[#006cd2]/20 ring-1 ring-[#006cd2]'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className={`${isSelected ? 'text-[#006cd2]' : 'text-slate-400'}`}>
                        {ICON_MAP[item.icon] || <Workflow className="w-4 h-4" />}
                      </div>
                      <span className="font-display text-xs font-bold truncate">{item.stageName}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Lifecycle Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-[#006cd2]/40 shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                    Selected MLOps Stage
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-white flex items-center gap-2.5">
                    {ICON_MAP[selectedLifecycleStage.icon] || <Workflow className="w-6 h-6 text-[#006cd2]" />}
                    <span>{selectedLifecycleStage.stageName}</span>
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLifecycleStage.commonTools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-[#006cd2]/40 text-blue-300 font-mono text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">What Happens</span>
                    <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedLifecycleStage.whatHappens}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-[#006cd2] uppercase">Why It Matters</span>
                    <p className="font-sans text-xs sm:text-sm text-blue-200 leading-relaxed font-medium">
                      {selectedLifecycleStage.whyItMatters}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">Real-World Example</span>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      {selectedLifecycleStage.example}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-amber-400 uppercase">Production Considerations</span>
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
                      {selectedLifecycleStage.productionConsiderations}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. PRODUCTION ARCHITECTURE & CONTINUOUS MODEL LIFECYCLE */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-10">
            {/* Visual 1: 15-Step Production MLOps Architecture */}
            <div className="space-y-4">
              <div className="text-center space-y-2 max-w-3xl mx-auto">
                <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                  SYSTEM BLUEPRINT
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  Enterprise Production MLOps Architecture
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400">
                  The complete end-to-end data, training, packaging, serving, and observability architecture:
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-center pt-2">
                {PRODUCTION_ARCHITECTURE_STEPS.map((step) => (
                  <div
                    key={step.step}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 flex flex-col justify-between hover:border-[#006cd2]/60 transition group"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#006cd2] text-white font-mono text-xs font-bold mx-auto flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      {step.step}
                    </div>
                    <div className="font-display text-xs font-bold text-white uppercase">{step.title}</div>
                    <div className="font-mono text-[9px] text-slate-400 line-clamp-2 leading-tight">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continuous ML Model Lifecycle Visual */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 text-center">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase">Continuous Lifecycle</span>
                <h4 className="font-display text-xl font-bold text-white">
                  An ML Model is Never Finished When Training Ends
                </h4>
                <p className="font-sans text-xs text-slate-400 max-w-2xl mx-auto">
                  Models continuously cycle through data ingestion, retraining, validation, deployment, and drift monitoring:
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 font-mono text-xs font-bold text-slate-200">
                <span className="px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  DATASET V1
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  EXPERIMENT
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                  MODEL V1
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  REGISTRY
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-300">
                  PRODUCTION
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300">
                  MONITORING
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300">
                  DRIFT DETECTED
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  MODEL V2 RETRAIN
                </span>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 5. BATCH VS REAL-TIME INFERENCE */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                INFERENCE STRATEGIES
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Batch vs Real-Time Online Inference
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Understand the architectural trade-offs between scheduled offline scoring and low-latency API serving:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Batch Inference */}
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-400 uppercase">Pattern A</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300">
                    High Throughput / Scheduled
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">Batch Inference</h3>
                <div className="p-2.5 rounded-xl bg-slate-900 font-mono text-xs text-cyan-300 text-center">
                  DATA → SCHEDULE / CRON → MODEL → PREDICTIONS → STORAGE
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong>Best for: </strong>Daily risk scores, nightly recommendation generation, periodic email reports, and offline dataset processing.</p>
                  <p><strong>Latency: </strong>Minutes to hours (asynchronous processing).</p>
                  <p><strong>Cost: </strong>Low to moderate (compute spun up only during scheduled batch jobs).</p>
                  <p><strong>Complexity: </strong>Simpler architecture (no strict latency or live uptime SLAs).</p>
                </div>
              </div>

              {/* Real-Time Inference */}
              <div className="p-6 rounded-3xl bg-slate-950 border border-[#006cd2]/60 ring-1 ring-[#006cd2]/30 space-y-4 shadow-lg shadow-[#006cd2]/10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#006cd2] uppercase">Pattern B</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 font-mono text-[11px] text-blue-300">
                    Sub-50ms / Live API
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">Real-Time Online Inference</h3>
                <div className="p-2.5 rounded-xl bg-slate-900 font-mono text-xs text-blue-300 text-center">
                  USER → REST / gRPC API → MODEL SERVER → PREDICTION → RESPONSE
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong>Best for: </strong>Credit card fraud detection, live dynamic pricing, search ranking, and interactive web/mobile features.</p>
                  <p><strong>Latency: </strong>10ms - 100ms (synchronous request/response).</p>
                  <p><strong>Cost: </strong>Higher (requires 24/7 dedicated servers or autoscaling pod clusters).</p>
                  <p><strong>Complexity: </strong>Higher (requires load balancers, caching, health checks, and 99.9% uptime).</p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 6. MAIN INTERACTIVE ROADMAP (12 STAGES) */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                  <Target className="w-6 h-6 text-[#006cd2]" />
                  <span>The 12 MLOps Engineering Stages</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-slate-400 mt-0.5">
                  Click any stage to expand detailed syllabus topics, production concepts, practice exercises, and projects.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {MLOPS_ROADMAP_STAGES.map((stage, sIdx) => {
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
                          {ICON_MAP[stage.iconName] || <Workflow className="w-6 h-6" />}
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

                        {/* Visual Intuition if present */}
                        {stage.visualIntuition && (
                          <div className="p-4 rounded-2xl bg-blue-950/30 border border-[#006cd2]/40 space-y-2">
                            <div className="font-mono text-xs font-bold text-blue-300 uppercase flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-[#006cd2]" />
                              <span>{stage.visualIntuition.label}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-200">
                              {stage.visualIntuition.steps.map((step, idx) => (
                                <div key={idx} className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                                  {step}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recommended Approach callout */}
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

                          {sIdx < MLOPS_ROADMAP_STAGES.length - 1 && (
                            <button
                              onClick={() => scrollToStage(MLOPS_ROADMAP_STAGES[sIdx + 1].id)}
                              className="px-4 py-2 bg-slate-900 hover:bg-[#006cd2] text-white font-sans text-xs font-semibold rounded-xl border border-slate-800 transition flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                            >
                              <span>Next: Stage {MLOPS_ROADMAP_STAGES[sIdx + 1].stageNumber}</span>
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
          {/* 7. ROLE COMPARISONS (MLOps vs DevOps vs ML Engineer) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="space-y-2 max-w-3xl">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                ROLE COMPARISONS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                MLOps Engineer vs DevOps Engineer vs ML Engineer
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Understand how MLOps extends traditional DevOps and how it interfaces with Machine Learning Engineering:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {/* DevOps Engineer */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-display text-base font-bold text-white">DevOps Engineer</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on traditional software systems: deterministic code, CI/CD automation, server infrastructure,
                  containerization, network routing, and software uptime.
                </p>
                <div className="font-mono text-[10px] text-cyan-300 pt-2 border-t border-slate-800/80">
                  CODE → BUILD → TEST → DEPLOY → MONITOR
                </div>
              </div>

              {/* MLOps Engineer */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-[#006cd2]/60 ring-1 ring-[#006cd2]/30 space-y-3 shadow-lg shadow-[#006cd2]/10">
                <div className="flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-[#006cd2]" />
                  <h3 className="font-display text-base font-bold text-white">MLOps Engineer</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Extends DevOps to non-deterministic ML: managing data validation, automated training pipelines, model
                  registries, serving infrastructure, telemetry, data drift, and closed-loop retraining.
                </p>
                <div className="font-mono text-[10px] text-[#006cd2] pt-2 border-t border-slate-800/80 font-bold">
                  DATA → TRAIN → VALIDATE → REGISTER → DEPLOY → MONITOR → RETRAIN
                </div>
              </div>

              {/* ML Engineer */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h3 className="font-display text-base font-bold text-white">ML Engineer</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on model development: mathematical loss functions, feature engineering, neural network
                  architectures, hyperparameter tuning, model performance, and inference algorithms.
                </p>
                <div className="font-mono text-[10px] text-purple-300 pt-2 border-t border-slate-800/80">
                  DATA → FEATURES → MODEL → TRAIN → OPTIMIZE
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400 italic">
              MLOps extends DevOps principles to machine learning systems. In many modern organizations, ML Engineers and MLOps Engineers collaborate closely or share overlapping responsibilities.
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 8. HOW AN MLOps ENGINEER THINKS (Thinking Ladder) */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                ENGINEERING MINDSET
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                How an MLOps Engineer Thinks
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                An MLOps Engineer always thinks beyond the model:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {MLOPS_THINKING_LADDER.map((item) => (
                <div
                  key={item.step}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between hover:border-[#006cd2]/50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#006cd2]/20 border border-[#006cd2]/40 text-[#006cd2] font-mono text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </div>
                    <div className="font-display text-xs font-bold text-blue-300 uppercase leading-snug">
                      {item.label}
                    </div>
                  </div>
                  <p className="font-sans text-xs text-slate-300 italic">{item.question}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 9. MLOps LEARNING LOOP */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                CORE PHILOSOPHY
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                The MLOps Learning &amp; Automation Loop
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                The continuous engineering cycle that keeps machine learning systems resilient, accurate, and scalable:
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs font-bold text-white">
                <span className="px-3 py-1.5 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-500/30">
                  DEVELOP
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  TEST
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                  PACKAGE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-500/30">
                  DEPLOY
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-pink-950/60 text-pink-300 border border-pink-500/30">
                  MONITOR
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-500/30">
                  DETECT DRIFT
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  RETRAIN
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-500/30">
                  REDEPLOY
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-500/30">
                  IMPROVE
                </span>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 10. REAL-WORLD MLOps PROJECT PATH (6 Progressive Projects) */}
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
                Build real production MLOps systems—progressing from containerized inference microservices to automated
                Airflow pipelines, GitHub Actions CI/CD, and enterprise Kubernetes platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MLOPS_PROJECT_PROGRESSION.map((proj, pIdx) => {
                const isFinal = pIdx === MLOPS_PROJECT_PROGRESSION.length - 1;

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

                      {/* Problem Solved */}
                      <div className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-900/40 text-[11px] text-blue-200 font-sans">
                        <strong className="text-white">Problem: </strong>
                        {proj.problem}
                      </div>

                      {/* Technologies */}
                      <div className="space-y-1.5 pt-1">
                        <span className="font-mono text-[11px] text-slate-400 font-bold uppercase">
                          Tech Stack
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 font-mono text-[11px] border border-slate-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Architecture & Details */}
                      <div className="space-y-1 text-[11px] font-mono text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div>
                          <strong className="text-slate-200">Architecture: </strong>
                          {proj.architecture}
                        </div>
                        <div className="pt-1">
                          <strong className="text-slate-200">Pipeline: </strong>
                          {proj.pipeline}
                        </div>
                        <div className="pt-1">
                          <strong className="text-slate-200">Infrastructure: </strong>
                          {proj.infrastructure}
                        </div>
                        <div className="pt-1">
                          <strong className="text-slate-200">Monitoring: </strong>
                          {proj.monitoring}
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
          {/* 11. MLOps SPECIALIZATIONS ("WHERE CAN MLOps TAKE YOU?") */}
          {/* ========================================================================= */}
          <section className="space-y-6 pt-4">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <Compass className="w-3.5 h-3.5" />
                <span>CAREER PATHWAYS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Where Can MLOps Take You?
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                Build strong MLOps fundamentals first, then specialize in one of these high-impact engineering domains:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MLOPS_SPECIALIZATIONS.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-3xl p-6 sm:p-7 bg-slate-900/70 border border-slate-800 hover:border-[#006cd2]/60 hover:bg-slate-900 transition flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#006cd2]/20 border border-[#006cd2]/40 text-[#006cd2] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {ICON_MAP[spec.icon] || <Workflow className="w-6 h-6" />}
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
          {/* 12. MLOps ENGINEERING TOOLKIT */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-[#006cd2]" />
                  <span>The MLOps Engineering Tech Stack</span>
                </h3>
                <p className="font-sans text-xs text-slate-400 mt-0.5">
                  Core tools clearly separated from advanced / specialized infrastructure components.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MLOPS_TOOLKIT.map((cat, cIdx) => (
                <div key={cIdx} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <h4 className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                    {cat.category}
                  </h4>

                  <div className="space-y-2">
                    <div>
                      <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase">Core Tools</span>
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
          {/* 13. MLOps PRODUCTION CHECKLIST */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-[#006cd2]/40 text-blue-300 font-mono text-xs font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006cd2]" />
                <span>PRODUCTION READINESS SCORECARD</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Is Your ML System Production Ready?
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Benchmark your ML pipelines, containers, and deployment infrastructure across these 6 production readiness pillars:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {MLOPS_CHECKLIST.map((cat, cIdx) => (
                <div key={cIdx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                    {cat.category}
                  </h4>
                  <div className="space-y-2.5">
                    {cat.items.map((item, iIdx) => (
                      <div key={iIdx} className="space-y-0.5">
                        <div className="font-display text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <div className="font-sans text-[11px] text-slate-400 leading-tight pl-5">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs font-mono font-bold text-white flex items-center justify-center gap-3">
              <span className="text-blue-400">BUILD</span>
              <span className="text-slate-600">→</span>
              <span className="text-cyan-400">VALIDATE</span>
              <span className="text-slate-600">→</span>
              <span className="text-purple-400">DEPLOY</span>
              <span className="text-slate-600">→</span>
              <span className="text-amber-400">MONITOR</span>
              <span className="text-slate-600">→</span>
              <span className="text-emerald-400">IMPROVE</span>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 14. COMMON MLOps LEARNING MISTAKES */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">
                AVOID THESE TRAPS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Common MLOps Learning Mistakes
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Steer clear of these frequent pitfalls that trap aspiring MLOps engineers:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MLOPS_COMMON_MISTAKES.map((mistake, mIdx) => (
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
          {/* 15. WHERE TO PRACTICE */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#006cd2] uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Where to Practice &amp; Build Production MLOps Systems</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">GitHub</div>
                <p className="text-xs text-slate-400">
                  Build automated CI/CD workflows, configure GitHub Actions runners, and host open-source MLOps repos.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Docker Docs</div>
                <p className="text-xs text-slate-400">
                  Study container architecture, multi-stage builds, non-root security, and Docker Compose orchestration.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Kubernetes (Minikube)</div>
                <p className="text-xs text-slate-400">
                  Deploy local K8s clusters, write Helm charts, configure Ingress, and test Horizontal Pod Autoscaling.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">MLflow &amp; Evidently</div>
                <p className="text-xs text-slate-400">
                  Set up experiment tracking servers, model registries, and generate statistical drift analysis reports.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 16. WHAT COMPANIES LOOK FOR (4 Pillars) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                HIRING EVALUATION PILLARS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                What Companies Look For in an MLOps Engineer
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Mastery across four essential engineering pillars:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {MLOPS_FOUR_PILLARS.map((pillar, idx) => (
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
          {/* 17. FINAL SECTION: MAKE MACHINE LEARNING PRODUCTION-READY */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-[#006cd2]" />

            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="px-3.5 py-1 rounded-full bg-[#006cd2]/20 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider border border-[#006cd2]/30">
                PRODUCTION MLOPS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Make machine learning production-ready.
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed italic">
                &ldquo;MLOps Engineering sits at the intersection of machine learning, software engineering, cloud
                infrastructure, automation, and reliability. Learn how to take models from experiments to scalable,
                observable, reproducible production systems.&rdquo;
              </p>
            </div>

            {/* Continuous Loop */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 font-mono text-xs sm:text-sm font-bold text-white">
                <span className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  DATA
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  MODEL
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                  PIPELINE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  DEPLOY
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-300">
                  MONITOR
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300">
                  RETRAIN
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  AUTOMATE
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
            <div>© 2024 LevelUpDev • MLOps Engineer Learning Roadmap</div>
            <div className="flex items-center gap-4">
              <Link href="/home" className="hover:text-slate-300 transition-colors">
                Portfolio
              </Link>
              <span>•</span>
              <Link href="/roadmaps/ml-engineer" className="hover:text-slate-300 transition-colors">
                ML Engineer
              </Link>
              <span>•</span>
              <Link href="/roadmaps/ai-engineer" className="hover:text-slate-300 transition-colors">
                AI Engineer
              </Link>
              <span>•</span>
              <Link href="/roadmaps/generative-ai-engineer" className="hover:text-slate-300 transition-colors">
                GenAI Engineer
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
