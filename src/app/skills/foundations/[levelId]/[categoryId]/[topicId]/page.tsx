'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Code2,
  ExternalLink,
  Target,
  Layers,
  Lightbulb,
} from 'lucide-react';
import {
  getFoundationLevelById,
  getCategoryById,
  getTopicById,
  getNextAndPrevTopic,
} from '@/data/csFoundationsData';
import { CSVisualizer } from '@/components/CSVisualizer';

export default function TopicDetailPage() {
  const params = useParams();
  const levelId = params.levelId as string;
  const categoryId = params.categoryId as string;
  const topicId = params.topicId as string;

  const level = getFoundationLevelById(levelId);
  const category = getCategoryById(levelId, categoryId);
  const topic = getTopicById(levelId, categoryId, topicId);
  const { prev, next } = getNextAndPrevTopic(levelId, categoryId, topicId);

  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (!topic?.example.code) return;
    navigator.clipboard.writeText(topic.example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!level || !category || !topic) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans">
        <div className="text-center space-y-4 max-w-md bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-800">
          <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-cyan-400">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-display text-white">Topic Not Found</h2>
          <p className="text-xs text-slate-400">
            No topic module found for <code className="font-mono text-cyan-300">"{topicId}"</code>.
          </p>
          <Link
            href={category ? `/skills/foundations/${level?.id}/${category.id}` : '/skills/foundations'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs font-mono transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Category
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href={`/skills/foundations/${level.id}/${category.id}`}
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Back to {category.title}</span>
              <span className="sm:hidden">Back</span>
            </Link>

            {/* Breadcrumbs */}
            <nav className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/skills" className="hover:text-slate-200 transition">
                Skills Trail
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href="/skills/foundations" className="hover:text-slate-200 transition">
                CS Foundations
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href={`/skills/foundations/${level.id}`} className="hover:text-slate-200 transition truncate max-w-[120px]">
                {level.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href={`/skills/foundations/${level.id}/${category.id}`} className="hover:text-slate-200 transition truncate max-w-[120px]">
                {category.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-cyan-400 font-semibold truncate max-w-[160px]">{topic.title}</span>
            </nav>
          </div>
        </header>

        {/* Main Learning Content */}
        <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 space-y-10 flex-1">
          {/* Topic Title Banner */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
                {level.title} • {category.title}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              {topic.title}
            </h1>
            <p className="text-base text-slate-300 font-medium leading-relaxed">
              {topic.summary}
            </p>
          </div>

          {/* Section 1: What You'll Learn */}
          <section className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-3 backdrop-blur-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>What You&apos;ll Learn</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {topic.whatYouWillLearn}
            </p>
          </section>

          {/* Section 2: Concept */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>Concept</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {topic.concept}
            </p>
          </section>

          {/* Section 3: Why It Matters */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span>Why It Matters</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {topic.whyItMatters}
            </p>
          </section>

          {/* Section 4: Visual Explanation (CSVisualizer) */}
          {topic.visualizerType && topic.visualizerType !== 'none' && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span>Visual Explanation</span>
              </h2>
              <CSVisualizer type={topic.visualizerType} />
            </section>
          )}

          {/* Section 5: Code / Implementation Example */}
          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <span>Code Example</span>
              </h2>
              <span className="text-xs font-mono uppercase text-slate-500">
                {topic.example.language}
              </span>
            </div>

            {/* Code Block Container */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                <code>{topic.example.code}</code>
              </pre>

              <div className="p-4 bg-slate-900/60 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 font-mono">
                💡 <strong className="text-cyan-300">Walkthrough:</strong> {topic.example.explanation}
              </div>
            </div>
          </section>

          {/* Section 6: Key Takeaways */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Key Takeaways</span>
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {topic.keyTakeaways.map((takeaway, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                    {takeaway}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Practice Problems */}
          {topic.practiceProblems.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Practice Problems</span>
              </h2>
              <div className="space-y-3">
                {topic.practiceProblems.map((prob, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white font-mono">
                        {prob.title}
                      </h3>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          prob.difficulty === 'Easy'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : prob.difficulty === 'Medium'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {prob.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {prob.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Sequential Topic Navigation */}
          <div className="pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
            {prev ? (
              <Link
                href={`/skills/foundations/${prev.level.id}/${prev.category.id}/${prev.topic.id}`}
                className="flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition group"
              >
                <ArrowLeft className="w-4 h-4 text-cyan-400 transition-transform group-hover:-translate-x-1" />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Previous</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white truncate max-w-[150px] sm:max-w-[200px] block">
                    {prev.topic.title}
                  </span>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                href={`/skills/foundations/${next.level.id}/${next.category.id}/${next.topic.id}`}
                className="flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-right transition group shadow-lg shadow-cyan-600/20"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-900 font-bold uppercase block">Next Topic</span>
                  <span className="text-xs sm:text-sm font-bold truncate max-w-[150px] sm:max-w-[200px] block">
                    {next.topic.title}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-950 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                href={`/skills/foundations/${level.id}/${category.id}`}
                className="flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-right transition group"
              >
                <span className="text-xs sm:text-sm font-bold">Category Complete 🎉</span>
                <Check className="w-4 h-4" />
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
