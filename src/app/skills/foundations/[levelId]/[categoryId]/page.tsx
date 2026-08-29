'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Sparkles,
  Layers,
} from 'lucide-react';
import { getFoundationLevelById, getCategoryById } from '@/data/csFoundationsData';

export default function CategoryDetailPage() {
  const params = useParams();
  const levelId = params.levelId as string;
  const categoryId = params.categoryId as string;

  const level = getFoundationLevelById(levelId);
  const category = getCategoryById(levelId, categoryId);

  if (!level || !category) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans">
        <div className="text-center space-y-4 max-w-md bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-800">
          <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-cyan-400">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-display text-white">Category Not Found</h2>
          <p className="text-xs text-slate-400">
            No category found for <code className="font-mono text-cyan-300">"{categoryId}"</code> in {level?.title || levelId}.
          </p>
          <Link
            href={level ? `/skills/foundations/${level.id}` : '/skills/foundations'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs font-mono transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Level Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href={`/skills/foundations/${level.id}`}
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>Back to {level.title}</span>
            </Link>

            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/skills" className="hover:text-slate-200 transition">
                Skills Trail
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href="/skills/foundations" className="hover:text-slate-200 transition">
                CS Foundations
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href={`/skills/foundations/${level.id}`} className="hover:text-slate-200 transition truncate max-w-[150px]">
                {level.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-cyan-400 font-semibold">{category.title}</span>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 space-y-10 flex-1">
          {/* Category Banner */}
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>{level.title} • {category.topics.length} TOPICS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              {category.title}
            </h1>

            <p className="text-sm sm:text-base text-cyan-300 font-medium leading-relaxed">
              {category.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Topics Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-display font-bold text-white">
                Interactive Topic Modules
              </h2>
              <span className="text-xs font-mono text-slate-400">
                Click any topic to start learning
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.topics.map((topic, idx) => (
                <Link
                  key={topic.id}
                  href={`/skills/foundations/${level.id}/${category.id}/${topic.id}`}
                  className="flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 backdrop-blur-xl shadow-lg hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-200 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        {String(idx + 1).padStart(2, '0')} — Topic
                      </span>
                      {topic.visualizerType && topic.visualizerType !== 'none' && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          ⚡ Visualizer
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {topic.summary}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-800/50 mt-4">
                    <span className="text-[11px] font-mono text-slate-500">
                      {topic.practiceProblems.length} Practice {topic.practiceProblems.length === 1 ? 'Problem' : 'Problems'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                      Learn <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
