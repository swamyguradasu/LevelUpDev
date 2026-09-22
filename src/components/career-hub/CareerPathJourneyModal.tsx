'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  Award,
  CheckCircle2,
  FolderGit2,
  ExternalLink,
  BookOpen,
  Info,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import {
  DetailedCareerPath,
  CareerHubResource,
  getResourceById,
  PROVIDER_CATALOG,
  COST_TYPE_METADATA,
  RESOURCE_TYPE_METADATA,
} from '@/data/careerHub';

interface CareerPathJourneyModalProps {
  careerPath: DetailedCareerPath | null;
  isStudentSelected?: boolean;
  onClose: () => void;
  onViewResourceDetails: (resource: CareerHubResource) => void;
}

export default function CareerPathJourneyModal({
  careerPath,
  isStudentSelected = false,
  onClose,
  onViewResourceDetails,
}: CareerPathJourneyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!careerPath) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mt-32" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition border border-slate-700/60 z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-500/10 text-cyan-300 border border-blue-500/20">
              {careerPath.category}
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {careerPath.stages.length} Structured Stages
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {careerPath.estimatedDuration}
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {careerPath.difficulty}
            </span>
            {isStudentSelected && (
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ACTIVE FOCUS</span>
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mb-2">
            {careerPath.title} Career Pathway
          </h2>

          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            {careerPath.description}
          </p>

          {/* Pathway Flow Philosophy */}
          <div className="mt-4 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
              <span className="text-cyan-400 font-bold">CAREER</span>
              <span className="text-slate-600">→</span>
              <span className="text-indigo-300 font-bold">SKILLS</span>
              <span className="text-slate-600">→</span>
              <span className="text-blue-300 font-bold">COURSES</span>
              <span className="text-slate-600">→</span>
              <span className="text-amber-300 font-bold">CREDENTIALS</span>
              <span className="text-slate-600">→</span>
              <span className="text-emerald-300 font-bold">PROJECTS</span>
            </div>

            {careerPath.roadmapSlug && (
              <Link
                href={`/roadmaps/${careerPath.roadmapSlug}`}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Full Interactive Roadmap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Stage-by-Stage Journey Cards */}
        <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-slate-800/80 before:z-0">
          {careerPath.stages.map((stage, idx) => (
            <div
              key={stage.stageNumber}
              className="relative z-10 pl-12 group transition"
            >
              {/* Stage Circle Number */}
              <div className="absolute left-0 top-1 w-10 h-10 rounded-2xl bg-slate-900 border-2 border-slate-700 group-hover:border-cyan-400 text-white font-mono font-black text-sm flex items-center justify-center transition shadow-lg">
                {stage.stageNumber}
              </div>

              {/* Stage Card */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl hover:border-slate-700/80 transition">
                {/* Stage Header */}
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
                    Stage {stage.stageNumber}: {stage.focus}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{stage.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Skills to Master */}
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                    Key Technical Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {stage.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Official Resources */}
                {stage.recommendedResourceIds && stage.recommendedResourceIds.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Curated Learning &amp; Credentials</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {stage.recommendedResourceIds.map((resId) => {
                        const res = getResourceById(resId);
                        if (!res) return null;
                        const provider = PROVIDER_CATALOG[res.provider] || PROVIDER_CATALOG.other;
                        const cost = COST_TYPE_METADATA[res.costType] || COST_TYPE_METADATA.check_provider;
                        const typeMeta = RESOURCE_TYPE_METADATA[res.resourceType];
                        const label = stage.resourceLabels?.[resId] || 'Recommended';

                        return (
                          <div
                            key={resId}
                            onClick={() => onViewResourceDetails(res)}
                            className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer transition flex flex-col justify-between group/res"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1.5">
                                <span
                                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${provider.badgeBg} ${provider.badgeBorder} ${provider.textColor}`}
                                >
                                  {provider.name}
                                </span>
                                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                  {label}
                                </span>
                              </div>

                              <div className="text-xs font-semibold text-white group-hover/res:text-cyan-300 transition line-clamp-1 mb-1">
                                {res.name}
                              </div>
                              <div className="text-[11px] text-slate-400 line-clamp-1">
                                {res.shortDescription}
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 mt-2 border-t border-slate-800/60">
                              <span>{typeMeta?.label || res.resourceType}</span>
                              <span className={cost.isFreeBadge ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                                {cost.label}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Suggested Hands-on Project */}
                {stage.suggestedProject && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                          Hands-on Project to Build
                        </div>
                        <div className="text-xs font-semibold text-white">
                          {stage.suggestedProject.title}
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-2">
                          {stage.suggestedProject.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 shrink-0">
                      {stage.suggestedProject.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Sticky Footer Action */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Ready to master <span className="text-slate-200 font-semibold">{careerPath.title}</span>?
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
            >
              Close
            </button>

            {careerPath.roadmapSlug ? (
              <Link
                href={`/roadmaps/${careerPath.roadmapSlug}`}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition active:scale-95"
              >
                <span>{isStudentSelected ? 'Continue Interactive Roadmap' : 'Start Career Roadmap'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition active:scale-95"
              >
                <span>Explore Resources</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
