'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  CheckCircle2,
  Clock,
  ExternalLink,
  Info,
  Calendar,
  Sparkles,
  Award,
  Link2,
  Trash2,
  Edit3,
  Layers,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  CareerHubResource,
  getResourceById,
  PROVIDER_CATALOG,
  COST_TYPE_METADATA,
  RESOURCE_TYPE_METADATA,
  CAREER_PATHS_CATALOG,
} from '@/data/careerHub';
import {
  UserCareerHubResourceRecord,
  ResourcePlanStatus,
} from '@/lib/careerHubStorage';

interface MyResourcesManagerProps {
  records: UserCareerHubResourceRecord[];
  onViewDetails: (resource: CareerHubResource) => void;
  onToggleSave: (resource: CareerHubResource) => void;
  onUpdatePlanStatus: (
    resource: CareerHubResource,
    status: ResourcePlanStatus | null,
    details?: {
      completedAt?: string;
      credentialUrl?: string;
      verificationUrl?: string;
      studentNotes?: string;
    }
  ) => void;
}

type FilterSection = 'all' | 'planned' | 'in_progress' | 'completed' | 'saved';

export default function MyResourcesManager({
  records,
  onViewDetails,
  onToggleSave,
  onUpdatePlanStatus,
}: MyResourcesManagerProps) {
  const [activeSection, setActiveSection] = useState<FilterSection>('all');
  const [selectedForEdit, setSelectedForEdit] = useState<CareerHubResource | null>(null);

  // Filter records based on selected section
  const filteredRecords = records.filter((r) => {
    if (activeSection === 'all') return r.isSaved || r.planStatus !== null;
    if (activeSection === 'planned') return r.planStatus === 'planned';
    if (activeSection === 'in_progress') return r.planStatus === 'in_progress';
    if (activeSection === 'completed') return r.planStatus === 'completed';
    if (activeSection === 'saved') return r.isSaved;
    return true;
  });

  const plannedCount = records.filter((r) => r.planStatus === 'planned').length;
  const inProgressCount = records.filter((r) => r.planStatus === 'in_progress').length;
  const completedCount = records.filter((r) => r.planStatus === 'completed').length;
  const savedCount = records.filter((r) => r.isSaved).length;

  return (
    <div className="space-y-6">
      {/* Header & Sub-Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white font-display">My Career Learning &amp; Plan</h3>
          <p className="text-xs text-slate-400">
            Track your planned courses, in-progress learning, completed credentials, and saved resources.
          </p>
        </div>

        {/* Section Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
              activeSection === 'all'
                ? 'bg-[#006cd2] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Items ({records.length})
          </button>

          <button
            onClick={() => setActiveSection('planned')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
              activeSection === 'planned'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Planned ({plannedCount})
          </button>

          <button
            onClick={() => setActiveSection('in_progress')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
              activeSection === 'in_progress'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            In Progress ({inProgressCount})
          </button>

          <button
            onClick={() => setActiveSection('completed')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
              activeSection === 'completed'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Completed ({completedCount})
          </button>

          <button
            onClick={() => setActiveSection('saved')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
              activeSection === 'saved'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Saved ({savedCount})
          </button>
        </div>
      </div>

      {/* Records List Grid */}
      {filteredRecords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRecords.map((record) => {
            const resource = getResourceById(record.resourceId);
            if (!resource) return null;

            const provider = PROVIDER_CATALOG[resource.provider] || PROVIDER_CATALOG.other;
            const costMeta = COST_TYPE_METADATA[resource.costType] || COST_TYPE_METADATA.check_provider;
            const typeMeta = RESOURCE_TYPE_METADATA[resource.resourceType];

            const statusColors = {
              planned: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
              in_progress: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
              completed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
            };

            return (
              <div
                key={record.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition shadow-lg space-y-4"
              >
                {/* Top Info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${provider.badgeBg} ${provider.badgeBorder} ${provider.textColor}`}
                      >
                        {provider.name}
                      </span>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${typeMeta?.badgeClass || 'bg-slate-800 text-slate-300 border-slate-700'}`}
                      >
                        {typeMeta?.label || resource.resourceType}
                      </span>
                    </div>

                    {/* Status Pill */}
                    {record.planStatus ? (
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase ${statusColors[record.planStatus]}`}
                      >
                        {record.planStatus.replace('_', ' ')}
                      </span>
                    ) : record.isSaved ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        SAVED
                      </span>
                    ) : null}
                  </div>

                  <h4
                    onClick={() => onViewDetails(resource)}
                    className="text-base font-semibold text-white hover:text-cyan-300 cursor-pointer transition line-clamp-2 mb-1.5"
                  >
                    {resource.name}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {resource.shortDescription}
                  </p>

                  {/* Completed info banner */}
                  {record.planStatus === 'completed' && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-[11px] space-y-1 mb-3">
                      <div className="flex items-center justify-between text-emerald-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                        {record.completedAt && (
                          <span className="font-mono text-slate-400 text-[10px]">
                            {record.completedAt.split('T')[0]}
                          </span>
                        )}
                      </div>

                      {record.credentialUrl && (
                        <a
                          href={record.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-cyan-400 hover:underline truncate"
                        >
                          <Link2 className="w-3 h-3 shrink-0" />
                          <span className="truncate">{record.credentialUrl}</span>
                        </a>
                      )}

                      {record.studentNotes && (
                        <div className="text-slate-300 italic line-clamp-1">
                          "{record.studentNotes}"
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onViewDetails(resource)}
                      className="w-full flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
                    >
                      <Info className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Details &amp; Status</span>
                    </button>

                    <a
                      href={resource.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-[#006cd2]/20 hover:bg-[#006cd2]/30 text-xs font-semibold text-cyan-300 transition border border-[#006cd2]/40"
                    >
                      <span>Official Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white">No Resources in this Section</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Browse our curated certifications, applied skills, and courses to add items to your plan or bookmark them for later.
          </p>
        </div>
      )}
    </div>
  );
}
