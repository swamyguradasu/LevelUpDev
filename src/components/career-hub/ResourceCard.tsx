'use client';

import React from 'react';
import {
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Clock,
  Info,
  ShieldCheck,
  FolderGit2,
  CheckSquare,
  Square,
  AlertCircle,
} from 'lucide-react';
import {
  CareerHubResource,
  PROVIDER_CATALOG,
  COST_TYPE_METADATA,
  RESOURCE_TYPE_METADATA,
} from '@/data/careerHub';

interface ResourceCardProps {
  resource: CareerHubResource;
  isSaved?: boolean;
  onToggleSave?: (resource: CareerHubResource) => void;
  onViewDetails: (resource: CareerHubResource) => void;
  highlightCareerId?: string;
  isCompared?: boolean;
  onToggleCompare?: (id: string) => void;
}

export default function ResourceCard({
  resource,
  isSaved = false,
  onToggleSave,
  onViewDetails,
  highlightCareerId,
  isCompared = false,
  onToggleCompare,
}: ResourceCardProps) {
  const provider = PROVIDER_CATALOG[resource.provider] || PROVIDER_CATALOG.other;
  const costMeta = COST_TYPE_METADATA[resource.costType] || COST_TYPE_METADATA.check_provider;
  const typeMeta = RESOURCE_TYPE_METADATA[resource.resourceType];

  const difficultyColors = {
    beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    intermediate: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    advanced: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  };

  // Freshness check (format Month Year)
  const formattedVerifiedDate = React.useMemo(() => {
    if (!resource.lastVerified) return null;
    try {
      const d = new Date(resource.lastVerified);
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (e) {
      return null;
    }
  }, [resource.lastVerified]);

  // Check if verified date is older than 6 months (e.g., before 2025-09)
  const isStale = React.useMemo(() => {
    if (!resource.lastVerified) return false;
    try {
      const d = new Date(resource.lastVerified);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return d < sixMonthsAgo;
    } catch (e) {
      return false;
    }
  }, [resource.lastVerified]);

  // Suggested LevelUpDev Project mapping
  const suggestedProject = React.useMemo(() => {
    const s = resource.skills.join(' ').toLowerCase();
    const c = resource.category.toLowerCase();
    if (s.includes('cloud') || s.includes('docker') || s.includes('container') || s.includes('azure'))
      return 'Deploy a Microservice Web App';
    if (s.includes('genai') || s.includes('llm') || s.includes('rag') || s.includes('agent'))
      return 'AI Resume Analyzer & Chatbot';
    if (s.includes('data') || s.includes('sql') || s.includes('power bi') || s.includes('pandas'))
      return 'Student Analytics Dashboard';
    if (s.includes('python'))
      return 'Expense Tracker CLI';
    return null;
  }, [resource.skills, resource.category]);

  const displayCostLabel =
    resource.costType === 'free_with_eligibility'
      ? 'Free if eligible'
      : costMeta.label;

  return (
    <div className="group relative flex flex-col justify-between bg-slate-900/70 hover:bg-slate-900/95 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 transition-all duration-300 shadow-lg hover:shadow-cyan-950/20">
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Provider Badge */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${provider.badgeBg} ${provider.badgeBorder} ${provider.textColor}`}
            >
              {provider.name}
            </span>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${typeMeta?.badgeClass || 'bg-slate-800 text-slate-300 border-slate-700'}`}
            >
              {typeMeta?.label || resource.resourceType}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Compare Checkbox Toggle */}
            {onToggleCompare && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(resource.id);
                }}
                className={`p-1.5 rounded-lg border text-xs font-mono flex items-center gap-1 transition ${
                  isCompared
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                }`}
                title={isCompared ? 'Remove from compare' : 'Add to compare'}
              >
                {isCompared ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Bookmark Button */}
            {onToggleSave && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(resource);
                }}
                title={isSaved ? 'Remove from Saved' : 'Save to My Resources'}
                className={`p-1.5 rounded-lg border transition ${
                  isSaved
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
                aria-label={isSaved ? 'Saved resource' : 'Save resource'}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onViewDetails(resource)}
          className="text-base font-semibold text-white group-hover:text-cyan-300 transition line-clamp-2 cursor-pointer mb-2"
        >
          {resource.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {resource.shortDescription}
        </p>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {resource.skills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
            >
              {skill}
            </span>
          ))}
          {resource.skills.length > 4 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/40 text-slate-500">
              +{resource.skills.length - 4}
            </span>
          )}
        </div>

        {/* Suggested LevelUpDev Project Connection */}
        {suggestedProject && (
          <div className="mb-3 p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] flex items-center gap-1.5 text-slate-300">
            <FolderGit2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-slate-400 font-mono">Suggested Project:</span>
            <span className="text-emerald-300 font-medium truncate">{suggestedProject}</span>
          </div>
        )}
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-3 border-t border-slate-800/80 space-y-3">
        {/* Meta badges: Difficulty, Duration, Cost */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${difficultyColors[resource.difficulty]}`}
            >
              {resource.difficulty}
            </span>
            {resource.duration && (
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                {resource.duration.split(' ')[0]} {resource.duration.split(' ')[1] || ''}
              </span>
            )}
          </div>

          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${costMeta.badgeClass}`}
          >
            {displayCostLabel}
          </span>
        </div>

        {/* Verified Source & Freshness Label */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>Official Source</span>
          </span>
          <span>
            {isStale ? (
              <span className="text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-2.5 h-2.5" />
                <span>Check availability</span>
              </span>
            ) : formattedVerifiedDate ? (
              `Checked ${formattedVerifiedDate}`
            ) : (
              'Source verified'
            )}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onViewDetails(resource)}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition border border-slate-700/80"
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Details</span>
          </button>

          {resource.officialUrl &&
          (resource.officialUrl.startsWith('https://') || resource.officialUrl.startsWith('http://')) ? (
            <a
              href={resource.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Opens official website on ${provider.officialDomain}`}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#006cd2]/20 hover:bg-[#006cd2]/30 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition border border-[#006cd2]/40"
            >
              <span>Official Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <div
              className="w-full flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-slate-800/60 text-[10px] font-mono text-amber-300/80 border border-amber-500/30 text-center"
              title="Official link needs admin verification"
            >
              <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">Needs verification</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
