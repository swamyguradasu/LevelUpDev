'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  DE_ROADMAP_STAGES,
  DE_PROJECT_PROGRESSION,
  DE_MAJOR_PIPELINE_STAGES,
  DE_TOOLKIT,
  DE_SPECIALIZATIONS,
  DE_THINKING_LADDER,
  DE_COMMON_MISTAKES,
  DE_CHECKLIST,
  DE_FOUR_PILLARS,
  MODERN_DATA_ARCHITECTURE_STEPS,
  DEMajorPipelineStage,
} from '@/data/dataEngineerRoadmap';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Code2,
  Database,
  Terminal,
  Layers,
  Workflow,
  Warehouse,
  Sparkles,
  GitFork,
  Cloud,
  Zap,
  ShieldCheck,
  Server,
  LineChart,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Compass,
  Target,
  Layers3,
  RefreshCw,
  Grid,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Workflow: <Workflow className="w-6 h-6" />,
  Warehouse: <Warehouse className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  GitFork: <GitFork className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  LineChart: <LineChart className="w-6 h-6" />,
  Grid: <Grid className="w-6 h-6" />,
  Layers3: <Layers3 className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
};

export default function DataEngineerRoadmapPage() {
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'python-programming': true, // Stage 01 open by default
  });

  const [selectedPipelineStage, setSelectedPipelineStage] = useState<DEMajorPipelineStage>(
    DE_MAJOR_PIPELINE_STAGES[0]
  );

  const toggleStage = (id: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    DE_ROADMAP_STAGES.forEach((s) => (all[s.id] = true));
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

      <div className="relative z-10 flex flex-col min-h-screen">
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
                <Database className="w-4 h-4 text-[#006cd2]" />
                <span>Data Engineering Path</span>
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
              <Database className="w-3.5 h-3.5 text-[#006cd2]" />
              <span>CAREER ROADMAP</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Data Engineer Roadmap
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Your step-by-step path from programming and SQL fundamentals to scalable data pipelines, data
              warehouses, big data, cloud platforms, and production data systems.
            </p>

            {/* Visual Pipeline Flow: DATA SOURCES -> INGEST -> STORE -> TRANSFORM -> VALIDATE -> SERVE */}
            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-2xl max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 font-mono text-[11px] sm:text-xs font-bold text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  DATA SOURCES
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  INGEST
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                  STORE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  TRANSFORM
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-pink-950/60 border border-pink-500/30 text-pink-300">
                  VALIDATE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  SERVE
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
                Data Engineering
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
              {DE_ROADMAP_STAGES.map((st) => {
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
                        {ICON_MAP[st.iconName] || <Database className="w-4 h-4" />}
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
              {DE_ROADMAP_STAGES.map((st) => (
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
          {/* 3. MODERN DATA PIPELINE (Interactive Major Visual) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>INTERACTIVE PIPELINE MAP</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                The Modern Data Engineering Pipeline
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Click any stage of the data pipeline below to inspect what happens, common technologies, and production engineering requirements:
              </p>
            </div>

            {/* Pipeline Stage Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {DE_MAJOR_PIPELINE_STAGES.map((item) => {
                const isSelected = selectedPipelineStage.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPipelineStage(item)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#006cd2]/20 border-[#006cd2] text-white shadow-md shadow-[#006cd2]/20 ring-1 ring-[#006cd2]'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className={`${isSelected ? 'text-[#006cd2]' : 'text-slate-400'}`}>
                        {ICON_MAP[item.icon] || <Database className="w-4 h-4" />}
                      </div>
                      <span className="font-display text-xs font-bold truncate">{item.stageName}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Pipeline Stage Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-[#006cd2]/40 shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                    Selected Pipeline Stage
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-white flex items-center gap-2.5">
                    {ICON_MAP[selectedPipelineStage.icon] || <Database className="w-6 h-6 text-[#006cd2]" />}
                    <span>{selectedPipelineStage.stageName}</span>
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPipelineStage.commonTools.map((tool, tIdx) => (
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
                      {selectedPipelineStage.whatHappens}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-[#006cd2] uppercase">Why It Matters</span>
                    <p className="font-sans text-xs sm:text-sm text-blue-200 leading-relaxed font-medium">
                      {selectedPipelineStage.whyItMatters}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">Real-World Example</span>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      {selectedPipelineStage.example}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-amber-400 uppercase">Production Considerations</span>
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
                      {selectedPipelineStage.productionConsiderations}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. MODERN DATA ARCHITECTURE & COMPARISONS */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-10">
            {/* Visual 1: 10-Step Modern Data Architecture */}
            <div className="space-y-4">
              <div className="text-center space-y-2 max-w-3xl mx-auto">
                <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                  SYSTEM BLUEPRINT
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  Enterprise Modern Data Architecture
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400">
                  The complete end-to-end ingestion, raw storage, distributed transformation, warehousing, and governance stack:
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center pt-2">
                {MODERN_DATA_ARCHITECTURE_STEPS.map((step) => (
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

              {/* Cross-Cutting Monitoring & Governance Banner */}
              <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-[#006cd2]/40 text-center font-mono text-xs font-bold text-blue-200 flex flex-wrap items-center justify-center gap-4">
                <span>DATA QUALITY (Great Expectations)</span>
                <span>•</span>
                <span>OBSERVABILITY (Prometheus/Grafana)</span>
                <span>•</span>
                <span>LINEAGE (OpenLineage/dbt)</span>
                <span>•</span>
                <span>GOVERNANCE &amp; SECURITY (IAM/RBAC)</span>
              </div>
            </div>

            {/* Visual 2: ETL vs ELT Comparison */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400 uppercase">Architecture Comparison</span>
                  <h4 className="font-display text-lg font-bold text-white">ETL vs ELT</h4>
                </div>
                <div className="text-xs text-slate-400 font-mono">Modern cloud platforms favor ELT with dbt</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="font-mono text-xs font-bold text-slate-300 uppercase">ETL (Extract, Transform, Load)</div>
                  <div className="font-mono text-[10px] text-blue-300 bg-slate-950 p-2 rounded-lg">
                    SOURCE → TRANSFORM ENGINE (Python/Spark) → TARGET WAREHOUSE
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Data is transformed on dedicated compute servers before loading into the database. Best suited for legacy systems, strict PII data masking before storage, and on-premises databases.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-[#006cd2]/50 space-y-2">
                  <div className="font-mono text-xs font-bold text-emerald-400 uppercase">ELT (Extract, Load, Transform)</div>
                  <div className="font-mono text-[10px] text-cyan-300 bg-slate-950 p-2 rounded-lg">
                    SOURCE → TARGET WAREHOUSE (Raw Landing) → TRANSFORM (SQL/dbt)
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Raw data is loaded directly into scalable cloud warehouses (Snowflake, BigQuery) and transformed in-place using declarative SQL models and dbt. High flexibility and lower compute bottlenecks.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual 3: Warehouse vs Data Lake vs Lakehouse Table */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#006cd2] uppercase">Storage Paradigms</span>
                <h4 className="font-display text-lg font-bold text-white">
                  Data Warehouse vs Data Lake vs Data Lakehouse
                </h4>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono">
                      <th className="py-2.5 px-3">Feature</th>
                      <th className="py-2.5 px-3">Data Warehouse (Snowflake/BigQuery)</th>
                      <th className="py-2.5 px-3">Data Lake (S3/GCS)</th>
                      <th className="py-2.5 px-3 text-blue-300 font-bold">Data Lakehouse (Delta/Iceberg)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">Data Types</td>
                      <td className="py-2.5 px-3">Structured, Curated Semi-structured</td>
                      <td className="py-2.5 px-3">Raw, Unstructured, Audio, Images, Logs</td>
                      <td className="py-2.5 px-3 text-blue-200">Structured, Semi-structured, &amp; Raw</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">Schema Design</td>
                      <td className="py-2.5 px-3">Schema-on-Write (Strict enforcement)</td>
                      <td className="py-2.5 px-3">Schema-on-Read (No strict schema)</td>
                      <td className="py-2.5 px-3 text-blue-200">ACID Transactions &amp; Schema Evolution</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">Analytics Performance</td>
                      <td className="py-2.5 px-3">Ultra-fast SQL BI &amp; Reporting</td>
                      <td className="py-2.5 px-3">Slow direct queries (requires Spark/Athena)</td>
                      <td className="py-2.5 px-3 text-blue-200">High-performance BI + Distributed ML</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-white">Storage Cost</td>
                      <td className="py-2.5 px-3">Moderate to High</td>
                      <td className="py-2.5 px-3">Extremely Low (Raw S3/GCS)</td>
                      <td className="py-2.5 px-3 text-blue-200">Low object storage + compute on demand</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visual 4: Batch vs Streaming */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-amber-400 uppercase">Processing Paradigms</span>
                <h4 className="font-display text-lg font-bold text-white">Batch vs Streaming Data Engineering</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="font-display text-sm font-bold text-cyan-300">Batch Processing</div>
                  <div className="font-mono text-[10px] text-slate-400 bg-slate-950 p-2 rounded-lg">
                    COLLECT → BATCH SCHEDULE (Hourly/Daily) → PROCESS → WAREHOUSE
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Latency: </strong>Minutes to Hours. Best for daily financial summaries, historical aggregations, executive dashboards, and large-scale bulk transformations.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-[#006cd2]/50 space-y-2">
                  <div className="font-display text-sm font-bold text-blue-300">Streaming Processing</div>
                  <div className="font-mono text-[10px] text-blue-300 bg-slate-950 p-2 rounded-lg">
                    EVENT → KAFKA MESSAGE BROKER → STREAM PROCESSOR → REAL-TIME SINK
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Latency: </strong>Milliseconds to Seconds. Best for credit card fraud detection, live IoT telemetry, real-time vehicle dispatch, and operational alerts.
                  </p>
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
                  <span>The 12 Data Engineering Stages</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-slate-400 mt-0.5">
                  Click any stage to expand detailed syllabus topics, production concepts, practice exercises, and projects.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {DE_ROADMAP_STAGES.map((stage, sIdx) => {
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
                          {ICON_MAP[stage.iconName] || <Database className="w-6 h-6" />}
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
                              <span>Hands-On Engineering Exercises</span>
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
                              <Database className="w-4 h-4 text-[#006cd2]" />
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

                          {sIdx < DE_ROADMAP_STAGES.length - 1 && (
                            <button
                              onClick={() => scrollToStage(DE_ROADMAP_STAGES[sIdx + 1].id)}
                              className="px-4 py-2 bg-slate-900 hover:bg-[#006cd2] text-white font-sans text-xs font-semibold rounded-xl border border-slate-800 transition flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                            >
                              <span>Next: Stage {DE_ROADMAP_STAGES[sIdx + 1].stageNumber}</span>
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
          {/* 6. ROLE COMPARISONS (DE vs DA vs DS vs MLOps) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="space-y-2 max-w-3xl">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                ROLE COMPARISONS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Data Engineer vs Data Analyst vs Data Scientist vs MLOps
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Understand how Data Engineering provides the foundational data platforms consumed by analytics and AI:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
              {/* Data Engineer */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-[#006cd2]/60 ring-1 ring-[#006cd2]/30 space-y-3 shadow-lg shadow-[#006cd2]/10">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#006cd2]" />
                  <h3 className="font-display text-base font-bold text-white">Data Engineer</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Builds data pipelines, cloud warehouses, distributed Spark jobs, streaming Kafka topics, and data quality frameworks.
                </p>
                <div className="font-mono text-[10px] text-[#006cd2] pt-2 border-t border-slate-800/80 font-bold">
                  SOURCE → PIPELINE → WAREHOUSE → SERVE
                </div>
              </div>

              {/* Data Analyst */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-display text-base font-bold text-white">Data Analyst</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Queries curated data marts using SQL, creates executive BI dashboards, and extracts actionable business insights.
                </p>
                <div className="font-mono text-[10px] text-cyan-300 pt-2 border-t border-slate-800/80">
                  DATA → SQL → INSIGHT → DASHBOARD
                </div>
              </div>

              {/* Data Scientist */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h3 className="font-display text-base font-bold text-white">Data Scientist</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Formulates mathematical hypotheses, trains predictive machine learning models, and conducts statistical experiments.
                </p>
                <div className="font-mono text-[10px] text-purple-300 pt-2 border-t border-slate-800/80">
                  DATA → FEATURES → MODEL → PREDICTION
                </div>
              </div>

              {/* MLOps Engineer */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-display text-base font-bold text-white">MLOps Engineer</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Automates model CI/CD, deploys low-latency inference APIs, monitors data drift, and triggers automated model retraining.
                </p>
                <div className="font-mono text-[10px] text-emerald-300 pt-2 border-t border-slate-800/80">
                  MODEL → PACKAGE → DEPLOY → MONITOR
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400 italic">
              Data Engineers build the foundational systems that make clean, reliable, and validated data available to analysts, scientists, and production applications.
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 7. HOW A DATA ENGINEER THINKS */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                ENGINEERING MINDSET
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                How a Data Engineer Thinks
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                &ldquo;A Data Engineer thinks about the entire data lifecycle, not just the final table.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {DE_THINKING_LADDER.map((item) => (
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
          {/* 8. REAL-WORLD DATA FLOW (E-Commerce Example) & LIFECYCLE */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            {/* Data Engineering Continuous Lifecycle */}
            <div className="space-y-4 text-center max-w-3xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                CONTINUOUS DATA LIFECYCLE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                The Data Engineering Lifecycle
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Data engineering is about building reliable, automated systems that make data available where and when it is needed:
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs font-bold text-white">
                <span className="px-3 py-1.5 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-500/30">
                  COLLECT
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  STORE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                  PROCESS
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-500/30">
                  TRANSFORM
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-pink-950/60 text-pink-300 border border-pink-500/30">
                  VALIDATE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  SERVE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-500/30">
                  MONITOR
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-500/30">
                  OPTIMIZE &amp; REPEAT
                </span>
              </div>
            </div>

            {/* Real-World E-Commerce Pipeline Blueprint */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase">Real-World Case Study</span>
                <h4 className="font-display text-lg font-bold text-white">
                  E-Commerce End-to-End Data Pipeline Flow
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="font-bold text-white font-display">1. Source Transactions</div>
                  <p className="text-slate-400 leading-relaxed">
                    Customer places order on website → written to PostgreSQL OLTP database (Orders, Customers, Products, Payments).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="font-bold text-white font-display">2. Ingestion to Data Lake</div>
                  <p className="text-slate-400 leading-relaxed">
                    Airflow batch pipeline extracts updated rows → dumps partitioned raw JSON files into AWS S3 / GCS landing zone.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="font-bold text-white font-display">3. dbt Transformation</div>
                  <p className="text-slate-400 leading-relaxed">
                    dbt transforms staging tables into Star Schema (Fact_Orders, Dim_Customers, Dim_Products) inside Snowflake/BigQuery.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-[#006cd2]/50 space-y-2">
                  <div className="font-bold text-emerald-400 font-display">4. Multi-Team Serving</div>
                  <p className="text-slate-400 leading-relaxed">
                    Sales Mart serves Tableau BI dashboards for finance, while ML features feed churn prediction models.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 9. REAL-WORLD DATA ENGINEERING PROJECT PATH (6 Projects) */}
          {/* ========================================================================= */}
          <section id="projects-section" className="space-y-8 pt-4">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <Database className="w-3.5 h-3.5" />
                <span>PROJECT PROGRESSION MATRIX</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                What Should You Build?
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                Build real production data systems—progressing from API ETL scripts to dimensional data warehouses,
                Airflow orchestration, PySpark big data pipelines, Kafka streaming, and modern cloud platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DE_PROJECT_PROGRESSION.map((proj, pIdx) => {
                const isFinal = pIdx === DE_PROJECT_PROGRESSION.length - 1;

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
                          <strong className="text-slate-200">Data Flow: </strong>
                          {proj.dataFlow}
                        </div>
                        <div className="pt-1">
                          <strong className="text-slate-200">Storage: </strong>
                          {proj.storage}
                        </div>
                        <div className="pt-1">
                          <strong className="text-slate-200">Testing: </strong>
                          {proj.testing}
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
          {/* 10. DATA ENGINEERING SPECIALIZATIONS ("Where Can DE Take You?") */}
          {/* ========================================================================= */}
          <section className="space-y-6 pt-4">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <Compass className="w-3.5 h-3.5" />
                <span>CAREER PATHWAYS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Where Can Data Engineering Take You?
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                Build strong Data Engineering fundamentals first, then specialize in one of these high-demand career tracks:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DE_SPECIALIZATIONS.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-3xl p-6 sm:p-7 bg-slate-900/70 border border-slate-800 hover:border-[#006cd2]/60 hover:bg-slate-900 transition flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#006cd2]/20 border border-[#006cd2]/40 text-[#006cd2] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {ICON_MAP[spec.icon] || <Database className="w-6 h-6" />}
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
          {/* 11. DATA ENGINEERING TOOLKIT */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                  <Database className="w-6 h-6 text-[#006cd2]" />
                  <span>The Data Engineering Tech Stack</span>
                </h3>
                <p className="font-sans text-xs text-slate-400 mt-0.5">
                  Core tools clearly separated from advanced / specialized platform components.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DE_TOOLKIT.map((cat, cIdx) => (
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
          {/* 12. PRODUCTION CHECKLIST */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-[#006cd2]/40 text-blue-300 font-mono text-xs font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006cd2]" />
                <span>PRODUCTION READINESS SCORECARD</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Is Your Data Pipeline Production Ready?
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Benchmark your pipelines, models, and cloud storage across these 6 production readiness pillars:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {DE_CHECKLIST.map((cat, cIdx) => (
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
              <span className="text-blue-400">INGEST</span>
              <span className="text-slate-600">→</span>
              <span className="text-cyan-400">TRANSFORM</span>
              <span className="text-slate-600">→</span>
              <span className="text-purple-400">VALIDATE</span>
              <span className="text-slate-600">→</span>
              <span className="text-amber-400">STORE</span>
              <span className="text-slate-600">→</span>
              <span className="text-emerald-400">MONITOR &amp; IMPROVE</span>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 13. COMMON DATA ENGINEERING LEARNING MISTAKES */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">
                AVOID THESE TRAPS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Common Data Engineering Learning Mistakes
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Steer clear of these frequent pitfalls that trap aspiring Data Engineers:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DE_COMMON_MISTAKES.map((mistake, mIdx) => (
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
              <span>Where to Practice &amp; Build Production Data Systems</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">PostgreSQL &amp; DuckDB</div>
                <p className="text-xs text-slate-400">
                  Master advanced window functions, CTEs, indexing, and query execution plans locally.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Apache Airflow Docs</div>
                <p className="text-xs text-slate-400">
                  Build and test DAGs, task dependencies, retries, sensors, and TaskFlow decorators.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">dbt &amp; Snowflake / BigQuery</div>
                <p className="text-xs text-slate-400">
                  Build modular dimensional models, test assertions, and document data lineage.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Apache Kafka &amp; PySpark</div>
                <p className="text-xs text-slate-400">
                  Stream events with Kafka producers/consumers and run distributed PySpark jobs.
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
                What Companies Look For in a Data Engineer
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Mastery across four essential engineering pillars:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {DE_FOUR_PILLARS.map((pillar, idx) => (
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
          {/* 16. FINAL SECTION: BUILD THE SYSTEMS THAT MOVE DATA */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-[#006cd2]" />

            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="px-3.5 py-1 rounded-full bg-[#006cd2]/20 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider border border-[#006cd2]/30">
                PRODUCTION DATA PLATFORMS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Build the systems that move data.
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed italic">
                &ldquo;Data Engineering sits at the foundation of modern analytics, machine learning, and AI. Learn how
                to collect, store, transform, validate, and serve reliable data at scale.&rdquo;
              </p>
            </div>

            {/* Continuous Loop */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 font-mono text-xs sm:text-sm font-bold text-white">
                <span className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  SOURCE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  INGEST
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                  STORE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  TRANSFORM
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-300">
                  VALIDATE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  SERVE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  SCALE
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollToStage('python-programming')}
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
            <div>© 2024 LevelUpDev • Data Engineer Learning Roadmap</div>
            <div className="flex items-center gap-4">
              <Link href="/home" className="hover:text-slate-300 transition-colors">
                Portfolio
              </Link>
              <span>•</span>
              <Link href="/roadmaps/data-analyst" className="hover:text-slate-300 transition-colors">
                Data Analyst
              </Link>
              <span>•</span>
              <Link href="/roadmaps/data-scientist" className="hover:text-slate-300 transition-colors">
                Data Scientist
              </Link>
              <span>•</span>
              <Link href="/roadmaps/mlops-engineer" className="hover:text-slate-300 transition-colors">
                MLOps Engineer
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
