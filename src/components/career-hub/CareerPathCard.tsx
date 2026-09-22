'use client';

import React from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  Award,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { DetailedCareerPath } from '@/data/careerHub';

interface CareerPathCardProps {
  careerPath: DetailedCareerPath;
  isStudentSelected?: boolean;
  onSelectPath: (careerPath: DetailedCareerPath) => void;
  completedStagesCount?: number;
}

export default function CareerPathCard({
  careerPath,
  isStudentSelected = false,
  onSelectPath,
  completedStagesCount = 0,
}: CareerPathCardProps) {
  const totalStages = careerPath.stages.length;
  const progressPercent =
    totalStages > 0 ? Math.round((completedStagesCount / totalStages) * 100) : 0;

  return (
    <div
      onClick={() => onSelectPath(careerPath)}
      className={`group relative flex flex-col justify-between rounded-3xl p-6 border transition-all duration-300 cursor-pointer shadow-xl ${
        isStudentSelected
          ? 'bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border-[#006cd2]/50 hover:border-cyan-400/80 shadow-cyan-950/30'
          : 'bg-slate-900/70 hover:bg-slate-900/95 border-slate-800 hover:border-slate-700/80 shadow-slate-950/50'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-cyan-300 border border-blue-500/20">
              {careerPath.category}
            </span>
            {isStudentSelected && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>YOUR FOCUS</span>
              </span>
            )}
          </div>

          <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/60">
            {totalStages} Stages
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition mb-2">
          {careerPath.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {careerPath.description}
        </p>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {careerPath.skills.slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/70"
            >
              {skill}
            </span>
          ))}
          {careerPath.skills.length > 5 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/40 text-slate-500">
              +{careerPath.skills.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Footer Meta & Action */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        {/* Duration & Difficulty */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{careerPath.estimatedDuration}</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">{careerPath.difficulty}</span>
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectPath(careerPath);
          }}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition shadow-md active:scale-95 ${
            isStudentSelected
              ? 'bg-[#006cd2] hover:bg-[#005bb5] text-white shadow-blue-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
          }`}
        >
          <span>{isStudentSelected ? 'Continue Career Path' : 'View Career Journey'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
