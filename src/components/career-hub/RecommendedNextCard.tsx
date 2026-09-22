'use client';

import React from 'react';
import Link from 'next/link';
import {
  Target,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  FolderGit2,
  CheckCircle2,
  PlayCircle,
} from 'lucide-react';
import {
  CareerHubResource,
  CareerPathId,
  getResourceById,
} from '@/data/careerHub';
import { UserCareerHubResourceRecord } from '@/lib/careerHubStorage';

interface RecommendedNextItem {
  id: string;
  title: string;
  reason: string;
  category: 'Foundation' | 'Course' | 'Project' | 'Credential';
  actionLabel: string;
  resourceId?: string;
  href?: string;
}

interface RecommendedNextCardProps {
  careerId: CareerPathId | null;
  userRecords: UserCareerHubResourceRecord[];
  allResources: CareerHubResource[];
  onOpenResource: (resource: CareerHubResource) => void;
}

export default function RecommendedNextCard({
  careerId,
  userRecords,
  allResources,
  onOpenResource,
}: RecommendedNextCardProps) {
  if (!careerId) return null;

  // Compute non-random, contextual next action items
  const recommendations: RecommendedNextItem[] = [];

  const inProgressRecords = userRecords.filter((r) => r.planStatus === 'in_progress');
  const plannedRecords = userRecords.filter((r) => r.planStatus === 'planned');
  const completedRecords = userRecords.filter((r) => r.planStatus === 'completed');

  // 1. If student has an in-progress resource, that's top priority
  if (inProgressRecords.length > 0) {
    const firstActive = inProgressRecords[0];
    const res = getResourceById(firstActive.resourceId);
    if (res) {
      recommendations.push({
        id: `continue-${res.id}`,
        title: `Continue: ${res.name}`,
        reason: `You have this ${res.resourceType.replace('_', ' ')} in progress. Complete its modules to progress your ${careerId.replace('-', ' ')} journey.`,
        category: 'Course',
        actionLabel: 'Resume Learning',
        resourceId: res.id,
      });
    }
  }

  // 2. If student has planned resources but nothing in progress
  if (inProgressRecords.length === 0 && plannedRecords.length > 0) {
    const firstPlanned = plannedRecords[0];
    const res = getResourceById(firstPlanned.resourceId);
    if (res) {
      recommendations.push({
        id: `start-${res.id}`,
        title: `Start Planned Course: ${res.name}`,
        reason: `You added this resource to your plan. Begin the first module today to build momentum.`,
        category: 'Course',
        actionLabel: 'Start Learning',
        resourceId: res.id,
      });
    }
  }

  // 3. If no courses completed yet, recommend a foundational beginner course for their career
  if (completedRecords.length === 0 && inProgressRecords.length === 0 && plannedRecords.length === 0) {
    const beginnerRes = allResources.find(
      (r) => r.careerPaths.includes(careerId) && r.difficulty === 'beginner' && (r.isFree || r.costType === 'free_credential')
    );
    if (beginnerRes) {
      recommendations.push({
        id: `beginner-${beginnerRes.id}`,
        title: `Foundational Step: ${beginnerRes.name}`,
        reason: `Recommended starting point to establish core prerequisites for ${careerId.replace('-', ' ')}.`,
        category: 'Foundation',
        actionLabel: 'Explore Course',
        resourceId: beginnerRes.id,
      });
    }
  }

  // 4. Practical credential recommendation
  const practicalCredential = allResources.find(
    (r) =>
      r.careerPaths.includes(careerId) &&
      (r.resourceType === 'applied_skill' || r.resourceType === 'skill_badge') &&
      !completedRecords.some((cr) => cr.resourceId === r.id)
  );

  if (practicalCredential && recommendations.length < 2) {
    recommendations.push({
      id: `credential-${practicalCredential.id}`,
      title: `Prove Skill: ${practicalCredential.name}`,
      reason: `Validate hands-on competency with an official scenario-based assessment from ${practicalCredential.provider.toUpperCase()}.`,
      category: 'Credential',
      actionLabel: 'View Assessment',
      resourceId: practicalCredential.id,
    });
  }

  // 5. Project building next action
  if (recommendations.length < 3) {
    recommendations.push({
      id: 'build-project',
      title: 'Build a Portfolio Project',
      reason: 'Combine your learned skills into a functional project to showcase on your developer portfolio profile.',
      category: 'Project',
      actionLabel: 'Explore Projects',
      href: '/roadmaps',
    });
  }

  if (recommendations.length === 0) return null;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Recommended Next Steps
            </h3>
            <p className="text-xs text-slate-400">
              Personalized next actions based on your active progress and career focus
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {recommendations.slice(0, 3).map((item) => {
          const categoryBadges = {
            Foundation: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
            Course: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
            Credential: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
            Project: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          };

          return (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border ${categoryBadges[item.category]}`}
                  >
                    {item.category}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 mb-1">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {item.reason}
                </p>
              </div>

              <div>
                {item.resourceId ? (
                  <button
                    onClick={() => {
                      const res = getResourceById(item.resourceId!);
                      if (res) onOpenResource(res);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 hover:text-white transition border border-slate-700"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    href={item.href || '/roadmaps'}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition border border-slate-700"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
