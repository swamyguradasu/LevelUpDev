'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CAREER_ROADMAPS_LIST, CareerRoleCard } from '@/data/careerRoadmapsList';
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  Code2,
  Database,
  Globe,
  Sparkles,
  Layers,
  Laptop,
  Server,
  Cloud,
  Brain,
  Shield,
  Search,
  CheckCircle2,
  LineChart,
  BarChart3,
  Cpu,
  Bot,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Laptop: <Laptop className="w-7 h-7" />,
  Code2: <Code2 className="w-7 h-7" />,
  LineChart: <LineChart className="w-7 h-7" />,
  BarChart3: <BarChart3 className="w-7 h-7" />,
  Globe: <Globe className="w-7 h-7" />,
  Server: <Server className="w-7 h-7" />,
  Layers: <Layers className="w-7 h-7" />,
  Cloud: <Cloud className="w-7 h-7" />,
  Brain: <Brain className="w-7 h-7" />,
  Database: <Database className="w-7 h-7" />,
  Shield: <Shield className="w-7 h-7" />,
  Sparkles: <Sparkles className="w-7 h-7" />,
  Cpu: <Cpu className="w-7 h-7" />,
  Bot: <Bot className="w-7 h-7" />,
};

export default function CareerRoadmapsHubPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoadmaps = CAREER_ROADMAPS_LIST.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyTech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#006cd2]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/home"
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
              <span>Return to Portfolio</span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/internships"
                className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition"
              >
                🎓 Internships
              </Link>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
                <Compass className="w-4 h-4 text-[#006cd2]" />
                <span>Career Roadmaps Hub</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-12 flex-1">
          {/* Header Banner */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006cd2]/15 border border-[#006cd2]/30 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#006cd2]" />
              <span>EXPLORE DEVELOPER PATHWAYS</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Developer Career Roadmaps
            </h1>
            <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Click any engineering role below to explore its step-by-step interactive learning roadmap, recommended
              order of topics, curated tech stack, and hands-on project milestones.
            </p>

            {/* Search Input */}
            <div className="max-w-md mx-auto pt-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search roadmaps, skills, or technologies (e.g. Python, SQL, React)..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#006cd2] focus:ring-1 focus:ring-[#006cd2] transition shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Career Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredRoadmaps.map((card) => {
              const isActive = card.status === 'active';

              if (isActive) {
                return (
                  <Link
                    key={card.id}
                    href={`/roadmaps/${card.slug}`}
                    className="group relative rounded-3xl p-7 bg-slate-900/80 border border-[#006cd2]/60 hover:border-[#006cd2] shadow-xl hover:shadow-2xl hover:shadow-[#006cd2]/20 transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-[#006cd2]/20 border border-[#006cd2]/40 text-[#006cd2] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                          {ICON_MAP[card.iconName] || <Code2 className="w-7 h-7" />}
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#006cd2] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm">
                          {card.badgeLabel || 'ACTIVE ROADMAP'}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h2 className="font-display text-2xl font-extrabold text-white group-hover:text-blue-300 transition-colors">
                          {card.title}
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {card.tagline}
                        </p>
                      </div>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {card.keyTech.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 text-xs font-mono border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-[#006cd2] group-hover:text-blue-300">
                      <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                        <span>{card.stageCount} Stages</span>
                        <span>•</span>
                        <span>{card.projectCount} Projects</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Open Roadmap</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              }

              return (
                <div
                  key={card.id}
                  className="rounded-3xl p-7 bg-slate-900/40 border border-slate-800 flex flex-col justify-between space-y-6 opacity-85 hover:border-slate-700 transition"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center">
                        {ICON_MAP[card.iconName] || <Code2 className="w-7 h-7" />}
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-400 text-[10px] font-mono uppercase border border-slate-700">
                        {card.badgeLabel || 'Coming Soon'}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-display text-xl font-bold text-slate-200">
                        {card.title}
                      </h3>
                      <p className="font-sans text-xs text-slate-400 leading-relaxed">
                        {card.tagline}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {card.keyTech.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-slate-950/70 text-slate-500 text-xs font-mono border border-slate-800/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>{card.stageCount} Stages</span>
                    <span>Roadmap Curating</span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-500 font-mono text-xs py-8 px-6 md:px-12 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© 2024 LevelUpDev • Career Roadmaps Hub</div>
            <div className="flex items-center gap-4">
              <Link href="/home" className="hover:text-slate-300 transition-colors">
                Portfolio
              </Link>
              <span>•</span>
              <Link href="/roadmaps/software-engineer" className="hover:text-slate-300 transition-colors">
                Software Engineer
              </Link>
              <span>•</span>
              <Link href="/roadmaps/python-developer" className="hover:text-slate-300 transition-colors">
                Python Developer
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
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
