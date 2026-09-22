'use client';

import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  Award,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  CareerHubResource,
  PROVIDER_CATALOG,
  COST_TYPE_METADATA,
  RESOURCE_TYPE_METADATA,
  CAREER_PATHS_CATALOG,
} from '@/data/careerHub';

interface ResourceCompareModalProps {
  resources: CareerHubResource[];
  onClose: () => void;
  onRemoveResource: (id: string) => void;
  onViewDetails: (resource: CareerHubResource) => void;
}

export default function ResourceCompareModal({
  resources,
  onClose,
  onRemoveResource,
  onViewDetails,
}: ResourceCompareModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!resources || resources.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md p-3 sm:p-6"
      onClick={onClose}
    >
      <div className="min-h-full flex items-center justify-center py-6 sm:py-10">
        <div
          className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mt-32" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition border border-slate-700/60 z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Resource Comparison Table</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-display">
            Compare Learning &amp; Credentials ({resources.length} Selected)
          </h2>
          <p className="text-xs text-slate-400">
            Neutral side-by-side comparison of provider, skills, difficulty, cost status, and credential format.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <th className="p-3.5 bg-slate-950/80 w-36 rounded-tl-xl">Feature</th>
                {resources.map((res) => {
                  const provider = PROVIDER_CATALOG[res.provider] || PROVIDER_CATALOG.other;
                  return (
                    <th key={res.id} className="p-3.5 bg-slate-950/50 min-w-[220px]">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${provider.badgeBg} ${provider.badgeBorder} ${provider.textColor}`}
                        >
                          {provider.name}
                        </span>
                        <button
                          onClick={() => onRemoveResource(res.id)}
                          className="text-slate-500 hover:text-rose-400 transition"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-sm font-bold text-white line-clamp-2 mt-2">
                        {res.name}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80">
              {/* Resource Type */}
              <tr>
                <td className="p-3.5 font-mono text-slate-400 bg-slate-950/40">Resource Type</td>
                {resources.map((res) => {
                  const typeMeta = RESOURCE_TYPE_METADATA[res.resourceType];
                  return (
                    <td key={res.id} className="p-3.5 text-slate-200">
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${typeMeta?.badgeClass || 'bg-slate-800 text-slate-300'}`}
                      >
                        {typeMeta?.label || res.resourceType}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Cost Status */}
              <tr>
                <td className="p-3.5 font-mono text-slate-400 bg-slate-950/40">Cost &amp; Pricing</td>
                {resources.map((res) => {
                  const costMeta = COST_TYPE_METADATA[res.costType] || COST_TYPE_METADATA.check_provider;
                  return (
                    <td key={res.id} className="p-3.5 text-slate-200">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${costMeta.badgeClass}`}>
                        {costMeta.label}
                      </span>
                      <div className="text-[11px] text-slate-400 mt-1">{res.costDescription}</div>
                    </td>
                  );
                })}
              </tr>

              {/* Difficulty & Duration */}
              <tr>
                <td className="p-3.5 font-mono text-slate-400 bg-slate-950/40">Level &amp; Duration</td>
                {resources.map((res) => (
                  <td key={res.id} className="p-3.5 text-slate-300">
                    <div className="font-semibold uppercase text-xs text-white">{res.difficulty}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{res.duration || 'Self-paced'}</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Target Careers */}
              <tr>
                <td className="p-3.5 font-mono text-slate-400 bg-slate-950/40">Target Careers</td>
                {resources.map((res) => (
                  <td key={res.id} className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {res.careerPaths.map((cpId) => (
                        <span
                          key={cpId}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                        >
                          {CAREER_PATHS_CATALOG[cpId]?.name || cpId}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Key Skills */}
              <tr>
                <td className="p-3.5 font-mono text-slate-400 bg-slate-950/40">Key Skills</td>
                {resources.map((res) => (
                  <td key={res.id} className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {res.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Prerequisites */}
              <tr>
                <td className="p-3.5 font-mono text-slate-400 bg-slate-950/40">Prerequisites</td>
                {resources.map((res) => (
                  <td key={res.id} className="p-3.5 text-xs text-slate-300">
                    {res.prerequisites && res.prerequisites.length > 0
                      ? res.prerequisites.join(', ')
                      : 'No specific prerequisites listed.'}
                  </td>
                ))}
              </tr>

              {/* Official Actions */}
              <tr>
                <td className="p-3.5 font-mono text-slate-400 bg-slate-950/40">Actions</td>
                {resources.map((res) => (
                  <td key={res.id} className="p-3.5 space-y-2">
                    <button
                      onClick={() => onViewDetails(res)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                    >
                      View Full Details
                    </button>
                    <a
                      href={res.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#006cd2]/20 hover:bg-[#006cd2]/30 text-xs font-semibold text-cyan-300 border border-[#006cd2]/40 transition"
                    >
                      <span>Official Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            * Neutral comparison matrix. Pricing &amp; eligibility subject to provider updates.
          </span>
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
