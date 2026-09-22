'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Compass,
  Award,
  Zap,
  BookOpen,
  ArrowRight,
  Layers,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import {
  CareerPathId,
  CareerHubResource,
  CAREER_PATHS_CATALOG,
  CAREER_PATHS_LIST,
  DetailedCareerPath,
} from '@/data/careerHub';

interface CareerMatchBannerProps {
  primaryCareerId: CareerPathId | null;
  inspectedCareerId: CareerPathId | null;
  onInspectCareer: (careerId: CareerPathId | null) => void;
  catalog: CareerHubResource[];
  onViewCareerJourney: (careerPath: DetailedCareerPath) => void;
  detailedPath?: DetailedCareerPath | null;
}

export default function CareerMatchBanner({
  primaryCareerId,
  inspectedCareerId,
  onInspectCareer,
  catalog,
  onViewCareerJourney,
  detailedPath,
}: CareerMatchBannerProps) {
  const activeCareerId = inspectedCareerId || primaryCareerId;
  const isInspectingAlternative = inspectedCareerId !== null && inspectedCareerId !== primaryCareerId;

  if (!activeCareerId) {
    return (
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-900/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalized Career Guidance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Choose a career path to get personalized recommendations.
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Select your target engineering role to unlock tailored courses, verified skill badges, applied labs, and real portfolio capstones.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href="/roadmaps"
            className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Career Paths</span>
          </Link>
        </div>
      </div>
    );
  }

  const careerDefinition = CAREER_PATHS_CATALOG[activeCareerId];
  const relevantResources = catalog.filter((r) => r.careerPaths.includes(activeCareerId));
  const freeCount = relevantResources.filter(
    (r) =>
      r.isFree ||
      r.costType === 'free' ||
      r.costType === 'free_credential' ||
      r.costType === 'free_training' ||
      r.costType === 'free_with_eligibility'
  ).length;
  const practicalCount = relevantResources.filter(
    (r) => r.resourceType === 'applied_skill' || r.resourceType === 'hands_on_lab'
  ).length;
  const learningPathsCount = relevantResources.filter(
    (r) => r.resourceType === 'learning_path' || r.resourceType === 'course'
  ).length;

  return (
    <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Top Bar with Career Badge and Inspect Alternative Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>YOUR CAREER RESOURCES</span>
          </div>

          {isInspectingAlternative && (
            <span className="text-xs font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
              <span>Previewing Alternative Career</span>
            </span>
          )}
        </div>

        {/* Explore Another Career Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-[11px] font-mono text-slate-400 whitespace-nowrap hidden sm:inline">
            Explore another path:
          </label>
          <select
            value={activeCareerId}
            onChange={(e) => {
              const selected = e.target.value as CareerPathId;
              onInspectCareer(selected === primaryCareerId ? null : selected);
            }}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-1.5 outline-none focus:border-cyan-500/60 transition"
          >
            {CAREER_PATHS_LIST.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {primaryCareerId === c.id ? '(Your Primary Path)' : ''}
              </option>
            ))}
          </select>

          {isInspectingAlternative && (
            <button
              onClick={() => onInspectCareer(null)}
              title="Reset to your primary career"
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Career Title & Summary Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Your Selected Path:{' '}
            <span className="text-cyan-400 underline decoration-cyan-500/40 underline-offset-4">
              {careerDefinition?.name}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {careerDefinition?.description}
          </p>
        </div>

        {detailedPath && (
          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => onViewCareerJourney(detailedPath)}
              className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>View Full Career Journey</span>
            </button>
          </div>
        )}
      </div>

      {/* Match Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/60">
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="text-lg sm:text-2xl font-black text-white font-display">
            {relevantResources.length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Relevant Resources</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="text-lg sm:text-2xl font-black text-emerald-400 font-display">
            {freeCount}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Free Opportunities</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="text-lg sm:text-2xl font-black text-cyan-400 font-display">
            {practicalCount}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Practical Credentials</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="text-lg sm:text-2xl font-black text-indigo-400 font-display">
            {learningPathsCount}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Learning Paths</div>
        </div>
      </div>
    </div>
  );
}
