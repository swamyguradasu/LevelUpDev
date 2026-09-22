'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  Code2,
  Sparkles,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { getSkillById } from '@/lib/content';

export default function SkillsTrailHubPage() {
  const pythonSkill = getSkillById('python');
  const pythonModuleCount = pythonSkill?.modules.length || 7;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#006cd2]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[45%] -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[60%] -right-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
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
              href="/home"
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
              <span>Return to Portfolio</span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-xs font-mono text-cyan-400 hover:text-white px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/roadmaps"
                className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition"
              >
                🧭 Career Roadmaps
              </Link>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
                <Sparkles className="w-4 h-4 text-[#006cd2]" />
                <span>Skills Trail Hub</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-16 flex-1">
          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006cd2]/10 border border-[#006cd2]/30 text-blue-400 text-xs font-mono font-semibold tracking-wide shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>SKILL DISCOVERY & LEARNING ROADMAP</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Skills <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">Trail</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Structured learning roadmaps designed to help you master practical industry-grade technical skills and developer workflows.
            </p>
          </div>

          {/* Primary Blocks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Block 1 — Technical Skills */}
            <div className="flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-black/40 hover:border-slate-700/80 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-all duration-500" />

              {/* Block Header */}
              <div className="space-y-3 pb-6 border-b border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-[#006cd2]">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold">
                    Hands-On Practice
                  </span>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                    Technical Skills
                  </h2>
                  <p className="text-sm font-medium text-blue-400 mt-0.5">
                    Build practical skills for your career
                  </p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Explore programming languages, development technologies, AI/ML tools, databases, and other career-focused technical skills.
                </p>
              </div>

                {/* Active Skill Cards */}
                <div className="py-6 flex-1 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Python Card (Active) */}
                    <div className="rounded-2xl bg-slate-950/70 border border-blue-500/30 p-5 space-y-4 shadow-lg shadow-blue-950/30 hover:border-blue-500/60 transition-all group/card">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-[#006cd2]/20 border border-[#006cd2]/40 flex items-center justify-center text-blue-400 font-mono font-bold text-lg">
                            🐍
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base sm:text-lg font-bold text-white group-hover/card:text-blue-300 transition-colors">
                                Python
                              </h3>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                                Active
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">Python Programming</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                          {pythonModuleCount} Mod
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                          Beginner → Advanced
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-blue-400">Interactive Sandbox</span>
                      </div>

                      <Link
                        href="/skills/python"
                        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white text-xs font-semibold font-mono tracking-wide shadow-md shadow-[#006cd2]/30 transition group-hover/card:translate-x-0.5"
                      >
                        <span>Continue Learning</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/card:translate-x-1" />
                      </Link>
                    </div>

                    {/* Java Card (Active) */}
                    <div className="rounded-2xl bg-slate-950/70 border border-amber-500/30 p-5 space-y-4 shadow-lg shadow-amber-950/30 hover:border-amber-500/60 transition-all group/card">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono font-bold text-lg">
                            ☕
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base sm:text-lg font-bold text-white group-hover/card:text-amber-300 transition-colors">
                                Java
                              </h3>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                                Active
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">Master Java & Enterprise Engineering</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                          7 Active Mod
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                          57 Topics
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-amber-400">Interactive Visualizers</span>
                      </div>

                      <Link
                        href="/skills/java"
                        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-slate-950 text-xs font-bold font-mono tracking-wide shadow-md shadow-amber-500/20 transition group-hover/card:translate-x-0.5"
                      >
                        <span>Start Java Trail</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/card:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Upcoming Future Skills Preview */}
                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                      Coming Soon to Skills Trail
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { name: 'JavaScript', icon: '⚡' },
                        { name: 'C++', icon: '⚙️' },
                        { name: 'SQL', icon: '🗄️' },
                        { name: 'React', icon: '⚛️' },
                        { name: 'Spring Boot', icon: '🍃' },
                        { name: 'ML/AI', icon: '🧠' },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-400 text-xs font-mono"
                        >
                          <span>{item.icon}</span>
                          <span className="truncate">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            </div>

            {/* Block 2 — Command Prompt */}
            <div className="flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-black/40 hover:border-slate-700/80 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-500" />

              {/* Block Header */}
              <div className="space-y-3 pb-6 border-b border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                    63 Commands
                  </span>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                    Command Prompt
                  </h2>
                  <p className="text-sm font-medium text-emerald-400 mt-0.5">
                    Essential Windows CMD commands for developers
                  </p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Master commands for Git/GitHub, Python, Node.js, React/Vite dev servers, API testing, and troubleshooting.
                </p>
              </div>

              {/* Featured Command Prompt Card */}
              <div className="py-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="rounded-2xl bg-slate-950/70 border border-emerald-500/30 p-5 space-y-4 shadow-lg shadow-emerald-950/20 hover:border-emerald-500/60 transition-all group/card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg">
                        💻
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover/card:text-emerald-300 transition-colors">
                            Command Reference
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                            Visual
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">Interactive CLI Explorer</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      12 Cat
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    Visual Before → Run → After execution breakdowns with practical examples and troubleshooting.
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Navigation & Files</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Git & GitHub Flow</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Python & Node.js</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Ports & Diagnostics</span>
                    </div>
                  </div>

                  <Link
                    href="/skills/cmd"
                    className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold font-mono tracking-wide shadow-md shadow-emerald-600/30 transition group-hover/card:translate-x-0.5"
                  >
                    <span>Explore Commands</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/card:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

