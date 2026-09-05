'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowLeft,
  Terminal,
  Sparkles,
  ChevronRight,
  Code2,
} from 'lucide-react';
import CmdCommandsBlock from '@/components/CmdCommandsBlock';

export default function CmdCommandsPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-emerald-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[65%] -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]" />
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
              <span className="text-emerald-400 font-semibold">
                Command Prompt
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10 flex-1">
          {/* Header Banner */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold tracking-wide shadow-sm">
              <Terminal className="w-3.5 h-3.5" />
              <span>TERMINAL & CLI FOUNDATIONS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Essential Command Prompt{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Commands
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Interactive visual reference for the most essential Windows CMD commands every developer needs for navigation, Git & GitHub, Python, Node.js, API testing, and troubleshooting.
            </p>
          </div>

          {/* Interactive CMD Explorer */}
          <CmdCommandsBlock />
        </main>
      </div>
    </div>
  );
}
