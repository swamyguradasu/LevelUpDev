'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BI_ROADMAP_STAGES,
  BI_PROJECT_PROGRESSION,
  BI_WORKFLOW_STAGES,
  BI_TOOLKIT,
  BI_SPECIALIZATIONS,
  BI_THINKING_LADDER,
  BI_COMMON_MISTAKES,
  BI_DASHBOARD_CHECKLIST,
  BI_FOUR_PILLARS,
  BIWorkflowStage,
} from '@/data/biAnalystRoadmap';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Briefcase,
  FileSpreadsheet,
  Database,
  Filter,
  Layers,
  BarChart3,
  Calculator,
  Presentation,
  Target,
  Cloud,
  TrendingUp,
  Workflow,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Compass,
  Layers3,
  RefreshCw,
  LineChart,
  LayoutDashboard,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="w-6 h-6" />,
  FileSpreadsheet: <FileSpreadsheet className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Filter: <Filter className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  Calculator: <Calculator className="w-6 h-6" />,
  Presentation: <Presentation className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Workflow: <Workflow className="w-6 h-6" />,
  LineChart: <LineChart className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  LayoutDashboard: <LayoutDashboard className="w-6 h-6" />,
};

export default function BIAnalystRoadmapPage() {
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'business-data-fundamentals': true, // Stage 01 open by default
  });

  const [selectedWorkflowStage, setSelectedWorkflowStage] = useState<BIWorkflowStage>(
    BI_WORKFLOW_STAGES[0]
  );

  const [selectedWireframeSection, setSelectedWireframeSection] = useState<string>('kpis');

  const toggleStage = (id: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    BI_ROADMAP_STAGES.forEach((s) => (all[s.id] = true));
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
        <div className="absolute bottom-[10%] -right-40 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[160px]" />
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
                <BarChart3 className="w-4 h-4 text-[#006cd2]" />
                <span>BI Analyst Path</span>
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
              <BarChart3 className="w-3.5 h-3.5 text-[#006cd2]" />
              <span>CAREER ROADMAP</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              BI Analyst Roadmap
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Your step-by-step path from Excel and SQL fundamentals to data modeling, Power BI, DAX,
              interactive dashboards, business insights, and data-driven decision making.
            </p>

            {/* Visual Pipeline Flow: BUSINESS DATA -> CLEAN -> MODEL -> ANALYZE -> VISUALIZE -> INSIGHT -> DECISION */}
            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-2xl max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2 font-mono text-[11px] sm:text-xs font-bold text-slate-300">
                <span className="px-2 py-0.5 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  BUSINESS DATA
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-0.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  CLEAN
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-0.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                  MODEL
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-0.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  ANALYZE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-0.5 rounded-lg bg-pink-950/60 border border-pink-500/30 text-pink-300">
                  VISUALIZE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-0.5 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-300">
                  INSIGHT
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-0.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  DECISION
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
                <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                Business Intelligence
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
              {BI_ROADMAP_STAGES.map((st) => {
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
                        {ICON_MAP[st.iconName] || <BarChart3 className="w-4 h-4" />}
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
              {BI_ROADMAP_STAGES.map((st) => (
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
          {/* 3. INTERACTIVE BI WORKFLOW */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>INTERACTIVE WORKFLOW MAP</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                The BI Analyst Analytical Workflow
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Click any stage of the BI delivery workflow below to inspect what happens, common tools, and outputs:
              </p>
            </div>

            {/* Workflow Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BI_WORKFLOW_STAGES.map((item) => {
                const isSelected = selectedWorkflowStage.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedWorkflowStage(item)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#006cd2]/20 border-[#006cd2] text-white shadow-md shadow-[#006cd2]/20 ring-1 ring-[#006cd2]'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className={`${isSelected ? 'text-[#006cd2]' : 'text-slate-400'}`}>
                        {ICON_MAP[item.icon] || <BarChart3 className="w-4 h-4" />}
                      </div>
                      <span className="font-display text-xs font-bold truncate">
                        {item.stepNumber}. {item.stepName}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Workflow Stage Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-[#006cd2]/40 shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                    Selected Workflow Step
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-white flex items-center gap-2.5">
                    {ICON_MAP[selectedWorkflowStage.icon] || <BarChart3 className="w-6 h-6 text-[#006cd2]" />}
                    <span>
                      {selectedWorkflowStage.stepNumber}. {selectedWorkflowStage.stepName}
                    </span>
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedWorkflowStage.commonTools.map((tool, tIdx) => (
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
                      {selectedWorkflowStage.whatHappens}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-[#006cd2] uppercase">Why It Matters</span>
                    <p className="font-sans text-xs sm:text-sm text-blue-200 leading-relaxed font-medium">
                      {selectedWorkflowStage.whyItMatters}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase">Deliverable Output</span>
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 font-medium">
                      {selectedWorkflowStage.output}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">Real-World Example</span>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      {selectedWorkflowStage.example}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-rose-400 uppercase">Common Pitfall to Avoid</span>
                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-200">
                      {selectedWorkflowStage.commonMistakes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. VISUAL BLUEPRINTS: FROM RAW DATA TO DECISION & DASHBOARD ANATOMY */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-10">
            {/* Visual 1: From Raw Data to Decision */}
            <div className="space-y-4">
              <div className="text-center space-y-2 max-w-3xl mx-auto">
                <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                  END-TO-END BUSINESS VALUE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  From Raw Data to Business Decision
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400">
                  Business Intelligence is not just creating charts—it is turning raw transactional records into measurable executive actions:
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">1. Raw Data</span>
                    <div className="font-mono text-[11px] text-blue-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      Customer • Product • Date • Region • Quantity • Price
                    </div>
                    <p className="text-slate-400">
                      Millions of transactional rows stored in operational SQL databases.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase">2. Model &amp; DAX</span>
                    <div className="font-mono text-[11px] text-cyan-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      Fact_Sales + Dim_Customer + Dim_Product + Dim_Date
                    </div>
                    <p className="text-slate-400">
                      Star Schema model with dynamic DAX metrics (Revenue, Margin, YoY Growth).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-[#006cd2]/50 space-y-2">
                    <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase">3. Insight &amp; Action</span>
                    <div className="font-sans text-[11px] text-emerald-300 bg-slate-950 p-2.5 rounded-xl border border-emerald-500/30 font-medium">
                      &ldquo;South region revenue fell 12% due to Category B supplier defects → Terminate contract &amp; reallocate ad spend.&rdquo;
                    </div>
                    <p className="text-slate-400">
                      Executive dashboard empowers concrete strategic operational changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual 2: Interactive BI Dashboard Anatomy (Wireframe) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-amber-400 uppercase">
                    DASHBOARD WIREFRAME
                  </span>
                  <h4 className="font-display text-xl font-bold text-white">
                    The 6-Section Executive Dashboard Anatomy
                  </h4>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Click any section below to learn why it exists:
                </p>
              </div>

              {/* Wireframe Mockup */}
              <div className="space-y-3">
                {/* 1. Header */}
                <div
                  onClick={() => setSelectedWireframeSection('header')}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    selectedWireframeSection === 'header'
                      ? 'bg-[#006cd2]/20 border-[#006cd2] text-white ring-1 ring-[#006cd2]'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span>1. HEADER: Sales &amp; Profitability Executive Dashboard</span>
                    <span className="text-[10px] text-slate-400">Scope: Global • Currency: USD • Refresh: 6:00 AM UTC</span>
                  </div>
                </div>

                {/* 2. Top KPI Cards */}
                <div
                  onClick={() => setSelectedWireframeSection('kpis')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    selectedWireframeSection === 'kpis'
                      ? 'bg-[#006cd2]/20 border-[#006cd2] text-white ring-1 ring-[#006cd2]'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="text-[11px] font-mono font-bold text-blue-300 mb-2">2. PRIMARY KPI CARDS BANNER</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <div className="text-slate-400 text-[10px]">TOTAL REVENUE</div>
                      <div className="text-white font-bold text-sm">$8.42M</div>
                      <div className="text-emerald-400 text-[10px]">+14.2% YoY</div>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <div className="text-slate-400 text-[10px]">GROSS MARGIN</div>
                      <div className="text-white font-bold text-sm">38.4%</div>
                      <div className="text-rose-400 text-[10px]">-2.1% vs Target</div>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <div className="text-slate-400 text-[10px]">TOTAL ORDERS</div>
                      <div className="text-white font-bold text-sm">142,500</div>
                      <div className="text-emerald-400 text-[10px]">+8.5% YoY</div>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <div className="text-slate-400 text-[10px]">AVERAGE ORDER (AOV)</div>
                      <div className="text-white font-bold text-sm">$59.10</div>
                      <div className="text-emerald-400 text-[10px]">+5.2% YoY</div>
                    </div>
                  </div>
                </div>

                {/* 3 & 4. Trends and Breakdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    onClick={() => setSelectedWireframeSection('trend')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      selectedWireframeSection === 'trend'
                        ? 'bg-[#006cd2]/20 border-[#006cd2] text-white ring-1 ring-[#006cd2]'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold text-cyan-300 mb-1">3. MONTHLY REVENUE TREND LINE</div>
                    <div className="p-3 bg-slate-950 rounded border border-slate-800 text-[11px] font-mono text-slate-400 text-center">
                      [Continuous Line Chart: Actual Revenue vs Budget Target Line]
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedWireframeSection('breakdown')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      selectedWireframeSection === 'breakdown'
                        ? 'bg-[#006cd2]/20 border-[#006cd2] text-white ring-1 ring-[#006cd2]'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold text-purple-300 mb-1">4. REGIONAL &amp; CATEGORY BREAKDOWN</div>
                    <div className="p-3 bg-slate-950 rounded border border-slate-800 text-[11px] font-mono text-slate-400 text-center">
                      [Horizontal Bar Charts: Slicing Revenue by Territory &amp; Product Type]
                    </div>
                  </div>
                </div>

                {/* 5 & 6. Detail Matrix & Insight Panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div
                    onClick={() => setSelectedWireframeSection('detail')}
                    className={`md:col-span-2 p-3.5 rounded-xl border cursor-pointer transition ${
                      selectedWireframeSection === 'detail'
                        ? 'bg-[#006cd2]/20 border-[#006cd2] text-white ring-1 ring-[#006cd2]'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold text-indigo-300 mb-1">5. OPERATIONAL DETAIL MATRIX TABLE</div>
                    <div className="p-3 bg-slate-950 rounded border border-slate-800 text-[11px] font-mono text-slate-400 text-center">
                      [Customer &amp; SKU Level Drill-Down Table with Conditional Data Bars]
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedWireframeSection('insights')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      selectedWireframeSection === 'insights'
                        ? 'bg-[#006cd2]/20 border-[#006cd2] text-white ring-1 ring-[#006cd2]'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold text-emerald-300 mb-1">6. ACTIONABLE INSIGHT PANEL</div>
                    <div className="p-3 bg-slate-950 rounded border border-emerald-500/30 text-[10px] font-sans text-emerald-200">
                      • South region sales down 12%<br />
                      • Category B returns up 4.2x<br />
                      • Recommendation: Halt vendor contract
                    </div>
                  </div>
                </div>
              </div>

              {/* Wireframe Explanation Box */}
              <div className="p-4 rounded-2xl bg-blue-950/30 border border-[#006cd2]/40 text-xs text-blue-200">
                {selectedWireframeSection === 'header' && (
                  <div>
                    <strong className="text-white">Section 1 (Header): </strong>
                    Establishes immediate context—report title, organizational scope, reporting currency, and timestamp of the last automated data refresh.
                  </div>
                )}
                {selectedWireframeSection === 'kpis' && (
                  <div>
                    <strong className="text-white">Section 2 (Primary KPI Cards): </strong>
                    The "5-second rule"—decision-makers scan top-line revenue, profit margins, orders, and Year-over-Year variance percentages at a glance.
                  </div>
                )}
                {selectedWireframeSection === 'trend' && (
                  <div>
                    <strong className="text-white">Section 3 (Monthly Trends): </strong>
                    Displays trajectory over time using a continuous line chart, allowing executives to detect seasonality, momentum, and target budget deviations.
                  </div>
                )}
                {selectedWireframeSection === 'breakdown' && (
                  <div>
                    <strong className="text-white">Section 4 (Categorical Breakdowns): </strong>
                    Uses horizontal bar charts to compare performance across regions, product categories, and sales channels with clear direct labels.
                  </div>
                )}
                {selectedWireframeSection === 'detail' && (
                  <div>
                    <strong className="text-white">Section 5 (Detail Table): </strong>
                    Provides granular customer and SKU level numbers with drill-through capabilities and conditional formatting for operational managers.
                  </div>
                )}
                {selectedWireframeSection === 'insights' && (
                  <div>
                    <strong className="text-white">Section 6 (Actionable Insights Panel): </strong>
                    The most critical section—translates charts into plain-English takeaways, root causes, and prioritized business recommendations.
                  </div>
                )}
              </div>
            </div>

            {/* Visual 3: KPI Design Blueprint ("How to Design a Good KPI") */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#006cd2] uppercase">
                  METRIC ARCHITECTURE
                </span>
                <h4 className="font-display text-lg font-bold text-white">
                  How to Design a Production KPI (With Full Business Context)
                </h4>
                <p className="text-xs text-slate-400">
                  &ldquo;A KPI without context can be misleading.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center text-xs pt-1">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">1. METRIC</span>
                  <div className="font-display font-bold text-white">Monthly Revenue</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-mono text-[10px] text-blue-300 font-bold uppercase">2. TARGET</span>
                  <div className="font-display font-bold text-blue-200">$1,000,000</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-mono text-[10px] text-amber-300 font-bold uppercase">3. ACTUAL</span>
                  <div className="font-display font-bold text-amber-200">$870,000</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-mono text-[10px] text-rose-400 font-bold uppercase">4. VARIANCE</span>
                  <div className="font-display font-bold text-rose-300">-13.0% (Deficit)</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-mono text-[10px] text-purple-300 font-bold uppercase">5. TREND</span>
                  <div className="font-display font-bold text-purple-200">↓ 3 Months Declining</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-1">
                  <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase">6. CONTEXT / ACTION</span>
                  <div className="font-sans text-[11px] text-emerald-300 font-medium leading-tight">
                    Audit Southern sales team discounting
                  </div>
                </div>
              </div>
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
                  <span>The 12 BI Analyst Stages</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-slate-400 mt-0.5">
                  Click any stage to expand detailed syllabus topics, production concepts, practice exercises, and projects.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {BI_ROADMAP_STAGES.map((stage, sIdx) => {
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
                          {ICON_MAP[stage.iconName] || <BarChart3 className="w-6 h-6" />}
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
                              <TrendingUp className="w-4 h-4 text-[#006cd2]" />
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
                            <Briefcase className="w-5 h-5 text-[#006cd2] shrink-0 mt-0.5" />
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
                              <BarChart3 className="w-4 h-4 text-[#006cd2]" />
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
                              <span>Hands-On BI Exercises</span>
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
                              <BarChart3 className="w-4 h-4 text-[#006cd2]" />
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

                          {sIdx < BI_ROADMAP_STAGES.length - 1 && (
                            <button
                              onClick={() => scrollToStage(BI_ROADMAP_STAGES[sIdx + 1].id)}
                              className="px-4 py-2 bg-slate-900 hover:bg-[#006cd2] text-white font-sans text-xs font-semibold rounded-xl border border-slate-800 transition flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                            >
                              <span>Next: Stage {BI_ROADMAP_STAGES[sIdx + 1].stageNumber}</span>
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
          {/* 6. ROLE COMPARISONS (BI Analyst vs DA vs DE vs DS) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="space-y-2 max-w-3xl">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                ROLE COMPARISONS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                BI Analyst vs Data Analyst vs Data Engineer vs Data Scientist
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Understand how Business Intelligence connects data platforms to executive decision making:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
              {/* BI Analyst */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-[#006cd2]/60 ring-1 ring-[#006cd2]/30 space-y-3 shadow-lg shadow-[#006cd2]/10">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#006cd2]" />
                  <h3 className="font-display text-base font-bold text-white">BI Analyst</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on Power BI dashboards, DAX calculations, Star Schema models, KPI definition, and executive business decision support.
                </p>
                <div className="font-mono text-[10px] text-[#006cd2] pt-2 border-t border-slate-800/80 font-bold">
                  DATA → MODEL → KPI → DASHBOARD → DECISION
                </div>
              </div>

              {/* Data Analyst */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-display text-base font-bold text-white">Data Analyst</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on exploratory analysis, ad-hoc SQL querying, data cleaning with Python/Pandas, and statistical hypothesis testing.
                </p>
                <div className="font-mono text-[10px] text-cyan-300 pt-2 border-t border-slate-800/80">
                  DATA → QUERY → ANALYSIS → INSIGHT
                </div>
              </div>

              {/* Data Engineer */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-display text-base font-bold text-white">Data Engineer</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on data extraction, pipeline orchestration (Airflow), cloud data warehouses (Snowflake), and big data processing (Spark).
                </p>
                <div className="font-mono text-[10px] text-indigo-300 pt-2 border-t border-slate-800/80">
                  SOURCE → PIPELINE → WAREHOUSE → SERVE
                </div>
              </div>

              {/* Data Scientist */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <h3 className="font-display text-base font-bold text-white">Data Scientist</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on predictive machine learning, mathematical modeling, deep learning, and predicting future trends (What will happen?).
                </p>
                <div className="font-mono text-[10px] text-purple-300 pt-2 border-t border-slate-800/80">
                  DATA → FEATURES → MODEL → PREDICTION
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400 italic">
              BI Analysts bridge the gap between technical data platforms and executive leadership by turning complex numbers into clear business decisions.
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 7. HOW A BI ANALYST THINKS */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                EXECUTIVE MINDSET
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                How a BI Analyst Thinks
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                &ldquo;A strong BI Analyst starts with the business decision, not the chart.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {BI_THINKING_LADDER.map((item) => (
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
          {/* 8. REAL-WORLD CASE STUDY (E-Commerce Profitability Diagnostic) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="space-y-2 max-w-3xl">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                REAL-WORLD CASE STUDY
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                E-Commerce Business Intelligence: Profitability Diagnostic
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Follow an entire analytical project from management’s initial problem statement to final strategic recommendations:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-mono text-[10px] text-rose-400 font-bold uppercase">1. Business Problem</span>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Executive Challenge: </strong>Management noticed that while Q3 revenue rose 8%, quarterly net profit dropped by 14% ($420k deficit).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase">2. Star Schema &amp; DAX</span>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Data Model: </strong>Fact_Sales &amp; Fact_Returns modeled with Dim_Product, Dim_Customer, and Dim_Date with [Return Rate %] and [Net Margin] DAX measures.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-mono text-[10px] text-amber-400 font-bold uppercase">3. Diagnostic Findings</span>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Root Cause: </strong>South Region Category B products suffered a 4.2x spike in customer return rates due to a recent supplier manufacturing defect.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/50 space-y-2">
                <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase">4. Strategic Actions</span>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Recommendations: </strong>Terminate Category B vendor contract, issue proactive store credits to affected VIP customers, and reallocate $150k ad budget.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 9. REAL-WORLD BI PROJECT PATH (6 Projects) */}
          {/* ========================================================================= */}
          <section id="projects-section" className="space-y-8 pt-4">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>PROJECT PROGRESSION MATRIX</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                What Should You Build?
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                Build real business intelligence solutions—progressing from Excel modeling to analytical SQL,
                Star Schema Power BI reports, SaaS cohort analytics, enterprise RLS deployments, and full-stack BI platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BI_PROJECT_PROGRESSION.map((proj, pIdx) => {
                const isFinal = pIdx === BI_PROJECT_PROGRESSION.length - 1;

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
                        <strong className="text-white">Business Problem: </strong>
                        {proj.businessProblem}
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

                      {/* Key KPIs */}
                      <div className="space-y-1.5 pt-1">
                        <span className="font-mono text-[11px] text-slate-400 font-bold uppercase">
                          Key KPIs Tracked
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {proj.kpis.map((kpi, kIdx) => (
                            <span
                              key={kIdx}
                              className="px-2 py-0.5 rounded bg-blue-950/50 text-blue-300 font-mono text-[10px] border border-blue-900/40"
                            >
                              {kpi}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Business Insight */}
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-sans">
                        <strong className="text-emerald-400">Key Finding: </strong>
                        {proj.businessInsights}
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
          {/* 10. BI SPECIALIZATIONS ("Where Can BI Take You?") */}
          {/* ========================================================================= */}
          <section className="space-y-6 pt-4">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <Compass className="w-3.5 h-3.5" />
                <span>CAREER PATHWAYS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Where Can Business Intelligence Take You?
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                Build strong BI fundamentals first, then specialize in one of these high-demand career tracks:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BI_SPECIALIZATIONS.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-3xl p-6 sm:p-7 bg-slate-900/70 border border-slate-800 hover:border-[#006cd2]/60 hover:bg-slate-900 transition flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#006cd2]/20 border border-[#006cd2]/40 text-[#006cd2] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {ICON_MAP[spec.icon] || <BarChart3 className="w-6 h-6" />}
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
          {/* 11. BI TOOLKIT */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-[#006cd2]" />
                  <span>The BI Analyst Tech Stack</span>
                </h3>
                <p className="font-sans text-xs text-slate-400 mt-0.5">
                  Core tools clearly separated from specialized enterprise platform components.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BI_TOOLKIT.map((cat, cIdx) => (
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
                        Specialized / Advanced
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cat.specializedItems.map((item, iIdx) => (
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
          {/* 12. PRODUCTION DASHBOARD CHECKLIST */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-[#006cd2]/40 text-blue-300 font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006cd2]" />
                <span>DASHBOARD READINESS SCORECARD</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Is Your BI Dashboard Production Ready?
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Benchmark your Power BI dashboards across these 4 production readiness pillars:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
              {BI_DASHBOARD_CHECKLIST.map((cat, cIdx) => (
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
              <span className="text-blue-400">QUESTION</span>
              <span className="text-slate-600">→</span>
              <span className="text-cyan-400">DATA</span>
              <span className="text-slate-600">→</span>
              <span className="text-purple-400">MODEL</span>
              <span className="text-slate-600">→</span>
              <span className="text-amber-400">ANALYZE</span>
              <span className="text-slate-600">→</span>
              <span className="text-pink-400">VISUALIZE</span>
              <span className="text-slate-600">→</span>
              <span className="text-emerald-400">DECIDE</span>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 13. COMMON BI LEARNING MISTAKES */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">
                AVOID THESE TRAPS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Common BI Learning Mistakes
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Steer clear of these frequent pitfalls that trap aspiring Business Intelligence Analysts:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BI_COMMON_MISTAKES.map((mistake, mIdx) => (
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
          {/* 14. WHERE TO PRACTICE */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#006cd2] uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Where to Practice &amp; Build Business Intelligence Portfolios</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Microsoft Excel &amp; Financial Sheets</div>
                <p className="text-xs text-slate-400">
                  Build multi-tab financial models, XLOOKUP lookups, and dynamic Pivot Tables.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">PostgreSQL &amp; HackerRank SQL</div>
                <p className="text-xs text-slate-400">
                  Master window functions, cohort retention queries, and customer segmentation.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Power BI Community &amp; DAX Studio</div>
                <p className="text-xs text-slate-400">
                  Build Star Schema models, calculate Time Intelligence, and optimize slow measures.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Kaggle &amp; Open E-Commerce Data</div>
                <p className="text-xs text-slate-400">
                  Analyze multi-table retail transactional datasets and publish interactive portfolio reports.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 15. WHAT COMPANIES LOOK FOR (4 Pillars) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                HIRING EVALUATION PILLARS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                What Companies Look For in a BI Analyst
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Mastery across four essential business intelligence pillars:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {BI_FOUR_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-3 flex flex-col items-center justify-start hover:border-[#006cd2]/50 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#006cd2]/20 border border-[#006cd2]/40 text-[#006cd2] flex items-center justify-center shadow-inner">
                    {ICON_MAP[pillar.icon] || <BarChart3 className="w-6 h-6" />}
                  </div>
                  <h3 className="font-display text-base font-bold text-white">{pillar.title}</h3>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">{pillar.subtitle}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 16. FINAL SECTION: TURN DATA INTO DECISIONS */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-[#006cd2]" />

            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="px-3.5 py-1 rounded-full bg-[#006cd2]/20 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider border border-[#006cd2]/30">
                BUSINESS INTELLIGENCE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Turn data into decisions.
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed italic">
                &ldquo;Business Intelligence connects data with decision-making. Learn how to transform raw business
                data into reliable metrics, meaningful dashboards, and actionable insights.&rdquo;
              </p>
            </div>

            {/* Continuous Loop */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2 font-mono text-xs sm:text-sm font-bold text-white">
                <span className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  QUESTION
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  DATA
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                  MODEL
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  KPI
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-300">
                  DASHBOARD
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300">
                  INSIGHT
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  DECISION
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollToStage('business-data-fundamentals')}
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
            <div>© 2024 LevelUpDev • BI Analyst Learning Roadmap</div>
            <div className="flex items-center gap-4">
              <Link href="/home" className="hover:text-slate-300 transition-colors">
                Portfolio
              </Link>
              <span>•</span>
              <Link href="/roadmaps/data-analyst" className="hover:text-slate-300 transition-colors">
                Data Analyst
              </Link>
              <span>•</span>
              <Link href="/roadmaps/data-engineer" className="hover:text-slate-300 transition-colors">
                Data Engineer
              </Link>
              <span>•</span>
              <Link href="/roadmaps/data-scientist" className="hover:text-slate-300 transition-colors">
                Data Scientist
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
