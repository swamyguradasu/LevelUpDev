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
  Cpu,
  Code2,
  Brain,
  Activity,
  Boxes,
  Database,
  Terminal,
  Globe,
  FolderGit2,
  GitBranch,
  Webhook,
} from 'lucide-react';
import { getFoundationLevelById, getTotalTopicsCount } from '@/data/csFoundationsData';

const ICON_MAP: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  Boxes: <Boxes className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  FolderGit2: <FolderGit2 className="w-6 h-6" />,
  GitBranch: <GitBranch className="w-6 h-6" />,
  Webhook: <Webhook className="w-6 h-6" />,
};

export default function LevelTopicExplorerPage() {
  const params = useParams();
  const levelId = params.levelId as string;
  const level = getFoundationLevelById(levelId);

  if (!level) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans">
        <div className="text-center space-y-4 max-w-md bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-800">
          <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-cyan-400">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-display text-white">Foundation Level Not Found</h2>
          <p className="text-xs text-slate-400">
            No CS foundation roadmap module found for <code className="font-mono text-cyan-300">"{levelId}"</code>.
          </p>
          <Link
            href="/skills/foundations"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs font-mono transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to CS Foundations
          </Link>
        </div>
      </div>
    );
  }

  const totalTopics = getTotalTopicsCount(level);
  const hasMultipleCategories = level.categories.length > 1;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[50%] -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/skills/foundations"
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>Back to Roadmap</span>
            </Link>

            {/* Breadcrumb Navigation */}
            <nav className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/skills" className="hover:text-slate-200 transition">
                Skills Trail
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href="/skills/foundations" className="hover:text-slate-200 transition">
                CS Foundations
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-cyan-400 font-semibold truncate max-w-[200px]">{level.title}</span>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 space-y-12 flex-1">
          {/* Header Banner */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
              <span>LEVEL {level.levelNumber}</span>
              <span>•</span>
              <span>{totalTopics} {totalTopics === 1 ? 'TOPIC' : 'TOPICS'}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                {ICON_MAP[level.iconName] || <Cpu className="w-7 h-7" />}
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                  {level.title}
                </h1>
                <p className="text-sm text-cyan-400 font-mono mt-1">
                  {level.shortDescription}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {level.longDescription}
            </p>
          </div>

          {/* If multi-category (e.g. DSA, Databases), show Category Cards */}
          {hasMultipleCategories ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <span>Explore Topic Categories</span>
                  <span className="text-xs font-mono font-normal text-slate-500">
                    ({level.categories.length} Categories)
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {level.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/skills/foundations/${level.id}/${category.id}`}
                    className="flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 backdrop-blur-xl shadow-lg hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-200 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {category.title}
                        </h3>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                          {category.topics.length} Topics
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {category.tagline}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-end">
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                        Explore <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            /* Single Category: Display direct numbered topic cards */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <span>Topics in this Level</span>
                  <span className="text-xs font-mono font-normal text-slate-500">
                    ({level.categories[0].topics.length} Topics)
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {level.categories[0].topics.map((topic, idx) => (
                  <Link
                    key={topic.id}
                    href={`/skills/foundations/${level.id}/${level.categories[0].id}/${topic.id}`}
                    className="flex flex-col justify-between rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 backdrop-blur-xl shadow-lg hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-200 group"
                  >
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        {String(idx + 1).padStart(2, '0')} — Topic
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {topic.summary}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-end">
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                        Start Topic <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
