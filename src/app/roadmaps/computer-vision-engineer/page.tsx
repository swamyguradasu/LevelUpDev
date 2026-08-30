'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CV_ROADMAP_STAGES,
  CV_PROJECT_PROGRESSION,
  CV_TASK_MAP,
  CV_TOOLKIT,
  CV_SPECIALIZATIONS,
  CV_THINKING_LADDER,
  CV_COMMON_MISTAKES,
  CV_EVALUATION_SCORECARD,
  CV_FOUR_PILLARS,
  CV_PIPELINE_STEPS,
  CVTaskMapItem,
} from '@/data/computerVisionEngineerRoadmap';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Terminal,
  Sigma,
  Image as ImageIcon,
  Sliders,
  Scan,
  Brain,
  Grid,
  Layers,
  Video,
  Eye,
  Server,
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
  Camera,
  Laptop,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-6 h-6" />,
  Sigma: <Sigma className="w-6 h-6" />,
  Image: <ImageIcon className="w-6 h-6" />,
  Sliders: <Sliders className="w-6 h-6" />,
  Scan: <Scan className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Grid: <Grid className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Video: <Video className="w-6 h-6" />,
  Eye: <Eye className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Layers3: <Layers3 className="w-6 h-6" />,
  Camera: <Camera className="w-6 h-6" />,
  Laptop: <Laptop className="w-6 h-6" />,
};

export default function ComputerVisionEngineerRoadmapPage() {
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'python-software-engineering': true, // Stage 01 open by default
  });

  const [selectedTask, setSelectedTask] = useState<CVTaskMapItem>(CV_TASK_MAP[1]); // Object Detection selected by default

  const toggleStage = (id: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    CV_ROADMAP_STAGES.forEach((s) => (all[s.id] = true));
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
        <div className="absolute bottom-[10%] -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
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
                <Camera className="w-4 h-4 text-[#006cd2]" />
                <span>Computer Vision Path</span>
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
              <Camera className="w-3.5 h-3.5 text-[#006cd2]" />
              <span>CAREER ROADMAP</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Computer Vision Engineer Roadmap
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Your step-by-step path from Python and image processing to deep learning, object detection,
              segmentation, tracking, vision Transformers, multimodal AI, and production computer vision systems.
            </p>

            {/* Visual Flow: IMAGE -> PIXELS -> FEATURES -> VISION MODEL -> UNDERSTANDING -> ACTION */}
            <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-2xl max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 font-mono text-[11px] sm:text-xs font-bold text-slate-300">
                <span className="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  IMAGE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  PIXELS
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                  FEATURES
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  VISION MODEL
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-pink-950/60 border border-pink-500/30 text-pink-300">
                  UNDERSTANDING
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  ACTION
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
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                Computer Vision &amp; Visual AI
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
              {CV_ROADMAP_STAGES.map((st) => {
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
                        {ICON_MAP[st.iconName] || <Camera className="w-4 h-4" />}
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
              {CV_ROADMAP_STAGES.map((st) => (
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
          {/* 3. COMPUTER VISION TASK MAP ("Which Technique Should I Use?") */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <Target className="w-3.5 h-3.5" />
                <span>INTERACTIVE TASK SELECTOR</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Which Computer Vision Technique Should You Use?
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Click any computer vision task below to inspect recommended architectures, evaluation metrics, and project ideas:
              </p>
            </div>

            {/* Task Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CV_TASK_MAP.map((item) => {
                const isSelected = selectedTask.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTask(item)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#006cd2]/20 border-[#006cd2] text-white shadow-md shadow-[#006cd2]/20 ring-1 ring-[#006cd2]'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className={`${isSelected ? 'text-[#006cd2]' : 'text-slate-400'}`}>
                        {ICON_MAP[item.icon] || <Camera className="w-4 h-4" />}
                      </div>
                      <span className="font-display text-xs font-bold truncate">{item.taskName}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Task Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-[#006cd2]/40 shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                    Selected Task
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-white flex items-center gap-2.5">
                    {ICON_MAP[selectedTask.icon] || <Camera className="w-6 h-6 text-[#006cd2]" />}
                    <span>{selectedTask.taskName}</span>
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTask.modelTypes.map((m, mIdx) => (
                    <span
                      key={mIdx}
                      className="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-[#006cd2]/40 text-blue-300 font-mono text-xs font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">Problem Definition</span>
                    <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedTask.problem}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-[#006cd2] uppercase">Recommended Approach</span>
                    <p className="font-sans text-xs sm:text-sm text-blue-200 leading-relaxed font-medium">
                      {selectedTask.recommendedApproach}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">Real-World Example</span>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      {selectedTask.example}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-amber-400 uppercase">Evaluation Metrics</span>
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
                      {selectedTask.evaluationMetric}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase">Project Idea</span>
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200">
                      {selectedTask.projectIdea}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. CV PIPELINE & ARCHITECTURE BLUEPRINTS */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-10">
            {/* Visual 1: 10-Step Computer Vision Pipeline */}
            <div className="space-y-4">
              <div className="text-center space-y-2 max-w-3xl mx-auto">
                <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                  SYSTEM BLUEPRINT
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  The End-to-End Computer Vision Pipeline
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400">
                  From camera sensor capture to preprocessing, neural inference, post-processing, and telemetry:
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center pt-2">
                {CV_PIPELINE_STEPS.map((step) => (
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

            {/* Visual 2: Object Detection Architecture & NMS */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400 uppercase">Detection Architecture</span>
                  <h4 className="font-display text-lg font-bold text-white">
                    Object Detection, Bounding Boxes &amp; Non-Maximum Suppression (NMS)
                  </h4>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span>IoU Threshold: 0.50</span>
                  <span>•</span>
                  <span>Confidence &ge; 0.25</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="font-mono text-xs font-bold text-slate-300">1. Feature Extraction &amp; Candidates</div>
                  <p className="text-slate-400">
                    The detection backbone extracts multi-scale feature maps and predicts thousands of candidate bounding boxes across the image grid.
                  </p>
                  <div className="font-mono text-[10px] text-blue-300 bg-slate-950 p-2 rounded-lg">
                    IMAGE → BACKBONE → 8,400 CANDIDATE BOXES
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="font-mono text-xs font-bold text-slate-300">2. NMS Filtering &amp; Suppression</div>
                  <p className="text-slate-400">
                    Non-Maximum Suppression computes Intersection over Union (IoU) to eliminate overlapping duplicate bounding boxes around the same object.
                  </p>
                  <div className="font-mono text-[10px] text-cyan-300 bg-slate-950 p-2 rounded-lg">
                    SORT BY CONFIDENCE → SUPPRESS OVERLAPPING BOXES
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-[#006cd2]/50 space-y-2">
                  <div className="font-mono text-xs font-bold text-emerald-400">3. Final Output Detections</div>
                  <p className="text-slate-400">
                    Clean, isolated bounding boxes with class labels and confidence scores ready for downstream tracking or logic.
                  </p>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px] font-bold">
                    <span className="px-2 py-1 rounded bg-blue-950 border border-blue-500/40 text-blue-300">[PERSON] 0.94</span>
                    <span className="px-2 py-1 rounded bg-purple-950 border border-purple-500/40 text-purple-300">[CAR] 0.89</span>
                    <span className="px-2 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">[BICYCLE] 0.86</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual 3: Image Segmentation Differentiation */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="space-y-1 text-center max-w-2xl mx-auto">
                <span className="font-mono text-xs font-bold text-[#006cd2] uppercase">Segmentation Paradigms</span>
                <h4 className="font-display text-lg font-bold text-white">
                  Semantic vs Instance vs Panoptic Segmentation
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="font-display text-sm font-bold text-blue-300">Semantic Segmentation</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Classifies every pixel into a category (e.g. all cars share one single color mask). Does NOT distinguish individual object instances.
                  </p>
                  <div className="font-mono text-[10px] text-slate-400 bg-slate-950 p-2 rounded-lg">
                    Model: U-Net, DeepLabV3+
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-[#006cd2]/50 space-y-2">
                  <div className="font-display text-sm font-bold text-cyan-300">Instance Segmentation</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Detects distinct object instances AND creates a precise pixel boundary mask for each one (e.g. Car #1 mask vs Car #2 mask).
                  </p>
                  <div className="font-mono text-[10px] text-slate-400 bg-slate-950 p-2 rounded-lg">
                    Model: Mask R-CNN, YOLOV8-Seg
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="font-display text-sm font-bold text-purple-300">Panoptic Segmentation</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Unified segmentation combining Semantic background (&ldquo;stuff&rdquo; like road, sky) and Instance foreground (&ldquo;things&rdquo; like people, cars).
                  </p>
                  <div className="font-mono text-[10px] text-slate-400 bg-slate-950 p-2 rounded-lg">
                    Model: Panoptic FPN, Mask2Former
                  </div>
                </div>
              </div>
            </div>

            {/* Visual 4: Evolution Timeline */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="text-center space-y-1">
                <span className="font-mono text-xs font-bold text-indigo-400 uppercase">Technological Evolution</span>
                <h4 className="font-display text-lg font-bold text-white">
                  Traditional Computer Vision → Deep Learning → Vision Transformers → Multimodal AI
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="font-mono text-xs font-bold text-slate-300 uppercase">Phase 1: Traditional CV</div>
                  <p className="text-xs text-slate-400">
                    Handcrafted feature descriptors: SIFT, HOG, Sobel filters, edge contours, and classical ML (SVM/Random Forest).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="font-mono text-xs font-bold text-blue-300 uppercase">Phase 2: Deep Learning (CNNs)</div>
                  <p className="text-xs text-slate-400">
                    Learned hierarchical feature maps: AlexNet, VGG, ResNet, YOLO, Mask R-CNN, and Transfer Learning on ImageNet.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="font-mono text-xs font-bold text-purple-300 uppercase">Phase 3: Vision Transformers</div>
                  <p className="text-xs text-slate-400">
                    Self-attention on image patch tokens: ViT, Swin Transformer, DETR, and foundation segmentation models (SAM).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/40 space-y-2">
                  <div className="font-mono text-xs font-bold text-emerald-300 uppercase">Phase 4: Multimodal AI</div>
                  <p className="text-xs text-slate-400">
                    Vision converged with language: CLIP contrastive embeddings, Visual Question Answering, and Vision-Language LLMs.
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
                  <span>The 12 Computer Vision Engineering Stages</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-slate-400 mt-0.5">
                  Click any stage to expand detailed syllabus topics, mathematical concepts, practice exercises, and projects.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {CV_ROADMAP_STAGES.map((stage, sIdx) => {
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
                          {ICON_MAP[stage.iconName] || <Camera className="w-6 h-6" />}
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
                              <Camera className="w-4 h-4 text-[#006cd2]" />
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

                          {sIdx < CV_ROADMAP_STAGES.length - 1 && (
                            <button
                              onClick={() => scrollToStage(CV_ROADMAP_STAGES[sIdx + 1].id)}
                              className="px-4 py-2 bg-slate-900 hover:bg-[#006cd2] text-white font-sans text-xs font-semibold rounded-xl border border-slate-800 transition flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                            >
                              <span>Next: Stage {CV_ROADMAP_STAGES[sIdx + 1].stageNumber}</span>
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
          {/* 6. ROLE COMPARISONS (CV vs NLP vs AI Engineer) */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="space-y-2 max-w-3xl">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                ROLE COMPARISONS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Computer Vision vs NLP vs AI Engineer
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Understand how Computer Vision compares with Natural Language Processing and General AI Engineering:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {/* Computer Vision Engineer */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-[#006cd2]/60 ring-1 ring-[#006cd2]/30 space-y-3 shadow-lg shadow-[#006cd2]/10">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#006cd2]" />
                  <h3 className="font-display text-base font-bold text-white">Computer Vision Engineer</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on visual intelligence: pixels, image transformations, OpenCV, CNNs, YOLO object detection,
                  U-Net segmentation, video tracking, OCR, Vision Transformers, and Edge AI deployment.
                </p>
                <div className="font-mono text-[10px] text-[#006cd2] pt-2 border-t border-slate-800/80 font-bold">
                  IMAGE → PIXELS → FEATURES → VISION MODEL → UNDERSTANDING
                </div>
              </div>

              {/* NLP Engineer */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <h3 className="font-display text-base font-bold text-white">NLP Engineer</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on human language: text tokens, vocabulary embeddings, syntactic parsing, sequence models,
                  Transformer encoders/decoders, information extraction, vector search, and LLM text generation.
                </p>
                <div className="font-mono text-[10px] text-purple-300 pt-2 border-t border-slate-800/80">
                  TEXT → TOKENS → EMBEDDINGS → LANGUAGE MODEL → UNDERSTANDING
                </div>
              </div>

              {/* AI Engineer */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-display text-base font-bold text-white">AI Engineer</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses broadly on full-stack intelligent systems: machine learning algorithms, deep learning, LLM
                  APIs, RAG pipelines, autonomous AI agents, multi-modal integration, and production application deployment.
                </p>
                <div className="font-mono text-[10px] text-cyan-300 pt-2 border-t border-slate-800/80">
                  PROBLEM → AI ARCHITECTURE → RAG / AGENTS → PRODUCTION APP
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400 italic">
              Computer Vision Engineering is a specialized AI engineering pathway focused exclusively on perceptual and visual intelligence.
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 7. HOW A COMPUTER VISION ENGINEER THINKS */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                ENGINEERING MINDSET
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                How a Computer Vision Engineer Thinks
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                &ldquo;Choose the simplest vision architecture that reliably solves the real-world problem.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {CV_THINKING_LADDER.map((item) => (
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
          {/* 8. CV LEARNING LOOP & DATASET ANNOTATION FOUNDATION */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            {/* Learning Loop */}
            <div className="space-y-4 text-center max-w-3xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                CONTINUOUS ITERATION LOOP
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                The Computer Vision Learning Loop
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                The continuous engineering cycle required to build, evaluate, and deploy production vision models:
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs font-bold text-white">
                <span className="px-3 py-1.5 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-500/30">
                  DEFINE PROBLEM
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  COLLECT DATA
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                  ANNOTATE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-500/30">
                  PREPROCESS
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-pink-950/60 text-pink-300 border border-pink-500/30">
                  TRAIN / MODEL
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-500/30">
                  EVALUATE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                  OPTIMIZE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-500/30">
                  DEPLOY
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-500/30">
                  MONITOR &amp; IMPROVE
                </span>
              </div>
            </div>

            {/* Data & Annotation Foundation */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase">Dataset Quality</span>
                <h4 className="font-display text-lg font-bold text-white">
                  Data is the Foundation of Computer Vision
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 italic">
                  &ldquo;A cleaner, well-annotated dataset can matter far more than a more complicated neural architecture.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-white font-display">Standard Benchmark Datasets</div>
                  <p className="text-slate-400 leading-relaxed">
                    ImageNet (1.4M+ classes), COCO (80 object classes + segmentations), Pascal VOC, Open Images V7.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-white font-display">Annotation Types</div>
                  <p className="text-slate-400 leading-relaxed">
                    Classification labels, 2D Bounding Boxes (YOLO/COCO), Polygon Segmentation Masks, Keypoints &amp; Pose.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-white font-display">Annotation Platforms</div>
                  <p className="text-slate-400 leading-relaxed">
                    CVAT (Computer Vision Annotation Tool), Label Studio, Roboflow, and VGG Image Annotator (VIA).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 9. REAL-WORLD CV PROJECT PROGRESSION (6 Projects) */}
          {/* ========================================================================= */}
          <section id="projects-section" className="space-y-8 pt-4">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <Camera className="w-3.5 h-3.5" />
                <span>PROJECT PROGRESSION MATRIX</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                What Should You Build?
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                Build real production vision systems—progressing from real-time webcam OpenCV apps to fine-tuned YOLO
                detectors, document OCR pipelines, multi-object tracking, and enterprise GPU vision microservices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CV_PROJECT_PROGRESSION.map((proj, pIdx) => {
                const isFinal = pIdx === CV_PROJECT_PROGRESSION.length - 1;

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
                          <strong className="text-slate-200">Technique: </strong>
                          {proj.technique}
                        </div>
                        <div className="pt-1">
                          <strong className="text-slate-200">Metrics: </strong>
                          {proj.metrics}
                        </div>
                        <div className="pt-1">
                          <strong className="text-slate-200">Deployment: </strong>
                          {proj.deployment}
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
          {/* 10. COMPUTER VISION SPECIALIZATIONS ("Where Can CV Take You?") */}
          {/* ========================================================================= */}
          <section className="space-y-6 pt-4">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006cd2]/15 text-blue-300 font-mono text-xs font-bold uppercase border border-[#006cd2]/30">
                <Compass className="w-3.5 h-3.5" />
                <span>CAREER PATHWAYS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Where Can Computer Vision Take You?
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                Build strong Computer Vision fundamentals first, then specialize in one of these high-demand industries:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CV_SPECIALIZATIONS.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-3xl p-6 sm:p-7 bg-slate-900/70 border border-slate-800 hover:border-[#006cd2]/60 hover:bg-slate-900 transition flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#006cd2]/20 border border-[#006cd2]/40 text-[#006cd2] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {ICON_MAP[spec.icon] || <Camera className="w-6 h-6" />}
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
          {/* 11. COMPUTER VISION TOOLKIT */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-[#006cd2]" />
                  <span>The Computer Vision Engineering Tech Stack</span>
                </h3>
                <p className="font-sans text-xs text-slate-400 mt-0.5">
                  Core tools clearly separated from specialized and advanced frameworks.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CV_TOOLKIT.map((cat, cIdx) => (
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
          {/* 12. EVALUATION SCORECARD */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-[#006cd2]/40 text-blue-300 font-mono text-xs font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006cd2]" />
                <span>EVALUATION METRICS &amp; STANDARDS</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Is Your Computer Vision System Actually Working?
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Benchmark visual models and production pipelines using task-specific mathematical evaluation metrics:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {CV_EVALUATION_SCORECARD.map((cat, cIdx) => (
                <div key={cIdx} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                    {cat.category}
                  </h4>
                  <div className="space-y-2.5">
                    {cat.metrics.map((item, iIdx) => (
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
              <span className="text-cyan-400">MEASURE</span>
              <span className="text-slate-600">→</span>
              <span className="text-purple-400">ANALYZE</span>
              <span className="text-slate-600">→</span>
              <span className="text-emerald-400">IMPROVE</span>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 13. COMMON CV LEARNING MISTAKES */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">
                AVOID THESE TRAPS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Common Computer Vision Learning Mistakes
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Steer clear of these frequent pitfalls that trap aspiring Computer Vision engineers:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CV_COMMON_MISTAKES.map((mistake, mIdx) => (
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
              <span>Where to Practice &amp; Build Computer Vision Systems</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Kaggle</div>
                <p className="text-xs text-slate-400">
                  Massive computer vision datasets, competitions, and notebook benchmarks.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Hugging Face</div>
                <p className="text-xs text-slate-400">
                  Vision Transformers, CLIP models, multimodal pipelines, and interactive demos.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">GitHub</div>
                <p className="text-xs text-slate-400">
                  Open-source CV repositories, YOLO implementations, and production codebases.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">Papers With Code</div>
                <p className="text-xs text-slate-400">
                  State-of-the-art vision papers, evaluation benchmarks, and official code links.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-display text-sm font-bold text-white">OpenCV Docs</div>
                <p className="text-xs text-slate-400">
                  Official tutorials for image processing, camera calibration, and video streaming.
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
                What Companies Look For in a Computer Vision Engineer
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Mastery across four core engineering pillars:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CV_FOUR_PILLARS.map((pillar, idx) => (
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
          {/* 16. FINAL SECTION: TEACH MACHINES TO SEE */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-[#006cd2]" />

            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="px-3.5 py-1 rounded-full bg-[#006cd2]/20 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider border border-[#006cd2]/30">
                VISUAL INTELLIGENCE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Teach machines to see.
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed italic">
                &ldquo;Computer Vision Engineering sits at the intersection of images, video, mathematics, deep learning,
                and software engineering. Learn how to transform pixels into useful predictions, detections,
                measurements, and intelligent visual applications.&rdquo;
              </p>
            </div>

            {/* Continuous Loop */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 font-mono text-xs sm:text-sm font-bold text-white">
                <span className="px-2.5 py-1.5 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-300">
                  IMAGE
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  PIXELS
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                  FEATURES
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  VISION MODEL
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-pink-950/60 border border-pink-500/30 text-pink-300">
                  UNDERSTANDING
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300">
                  ACTION
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  APPLICATION
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
            <div>© 2024 LevelUpDev • Computer Vision Engineer Learning Roadmap</div>
            <div className="flex items-center gap-4">
              <Link href="/home" className="hover:text-slate-300 transition-colors">
                Portfolio
              </Link>
              <span>•</span>
              <Link href="/roadmaps/ml-engineer" className="hover:text-slate-300 transition-colors">
                ML Engineer
              </Link>
              <span>•</span>
              <Link href="/roadmaps/nlp-engineer" className="hover:text-slate-300 transition-colors">
                NLP Engineer
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
