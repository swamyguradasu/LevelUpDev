'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Target,
  Clock,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Link2,
  FileCheck,
  Edit3,
  FolderGit2,
  GraduationCap,
  Award,
  BookOpen,
  Info,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  CareerHubResource,
  PROVIDER_CATALOG,
  COST_TYPE_METADATA,
  RESOURCE_TYPE_METADATA,
  CAREER_PATHS_CATALOG,
} from '@/data/careerHub';
import {
  UserCareerHubResourceRecord,
  ResourcePlanStatus,
} from '@/lib/careerHubStorage';

interface ResourceDetailModalProps {
  resource: CareerHubResource | null;
  onClose: () => void;
  userRecord?: UserCareerHubResourceRecord | null;
  onToggleSave?: (resource: CareerHubResource) => void;
  onUpdatePlanStatus?: (
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

export default function ResourceDetailModal({
  resource,
  onClose,
  userRecord,
  onToggleSave,
  onUpdatePlanStatus,
}: ResourceDetailModalProps) {
  const [activePlanStatus, setActivePlanStatus] = useState<ResourcePlanStatus | 'none'>('none');
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  const [completedDate, setCompletedDate] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [verificationUrl, setVerificationUrl] = useState('');
  const [studentNotes, setStudentNotes] = useState('');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    if (userRecord) {
      setActivePlanStatus(userRecord.planStatus || 'none');
      setCompletedDate(userRecord.completedAt?.split('T')[0] || '');
      setCredentialUrl(userRecord.credentialUrl || '');
      setVerificationUrl(userRecord.verificationUrl || '');
      setStudentNotes(userRecord.studentNotes || '');
    } else {
      setActivePlanStatus('none');
      setCompletedDate('');
      setCredentialUrl('');
      setVerificationUrl('');
      setStudentNotes('');
    }
  }, [userRecord]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!resource) return null;

  const provider = PROVIDER_CATALOG[resource.provider] || PROVIDER_CATALOG.other;
  const costMeta = COST_TYPE_METADATA[resource.costType] || COST_TYPE_METADATA.check_provider;
  const typeMeta = RESOURCE_TYPE_METADATA[resource.resourceType];
  const isSaved = userRecord?.isSaved || false;

  const handleStatusChange = (newStatus: ResourcePlanStatus | 'none') => {
    if (newStatus === 'completed') {
      setActivePlanStatus('completed');
      setShowCompletionForm(true);
      if (!completedDate) {
        setCompletedDate(new Date().toISOString().split('T')[0]);
      }
    } else {
      setShowCompletionForm(false);
      const statusValue = newStatus === 'none' ? null : newStatus;
      setActivePlanStatus(newStatus);
      if (onUpdatePlanStatus) {
        onUpdatePlanStatus(resource, statusValue);
        setSaveSuccessNotice(newStatus === 'none' ? 'Removed from plan' : `Updated status to ${newStatus}`);
        setTimeout(() => setSaveSuccessNotice(null), 3000);
      }
    }
  };

  const handleSaveCompletionDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdatePlanStatus) {
      onUpdatePlanStatus(resource, 'completed', {
        completedAt: completedDate || new Date().toISOString(),
        credentialUrl: credentialUrl.trim() || undefined,
        verificationUrl: verificationUrl.trim() || undefined,
        studentNotes: studentNotes.trim() || undefined,
      });
      setShowCompletionForm(false);
      setSaveSuccessNotice('Resource marked as Completed and saved to your profile.');
      setTimeout(() => setSaveSuccessNotice(null), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-slate-200 overflow-hidden"
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

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${provider.badgeBg} ${provider.badgeBorder} ${provider.textColor}`}
          >
            {provider.name}
          </span>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${typeMeta?.badgeClass || 'bg-slate-800 text-slate-300 border-slate-700'}`}
          >
            {typeMeta?.label || resource.resourceType}
          </span>
          <span
            className={`text-xs font-mono px-2.5 py-1 rounded-md border ${costMeta.badgeClass}`}
          >
            {costMeta.label}
          </span>
          <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
            {resource.difficulty} Level
          </span>
          {resource.duration && (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {resource.duration}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
          {resource.name}
        </h2>

        {/* Official Trust Note */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 mb-6">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Curated from official <strong className="text-slate-200">{provider.name}</strong> ({provider.officialDomain}) platform. LevelUpDev curates official resources to guide your career path.
          </span>
        </div>

        {/* Interactive Student Action Bar: Save & Status Planning */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 mb-6 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Save Button */}
            {onToggleSave && (
              <button
                onClick={() => onToggleSave(resource)}
                className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold transition border ${
                  isSaved
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-amber-400" />
                    <span>Saved to My Resources</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save for Later</span>
                  </>
                )}
              </button>
            )}

            {/* Plan Status Segment */}
            {onUpdatePlanStatus && (
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                <span className="text-[11px] font-mono text-slate-400 px-2">Plan Status:</span>
                {(['none', 'planned', 'in_progress', 'completed'] as const).map((status) => {
                  const labels = {
                    none: 'Not in Plan',
                    planned: 'Planned',
                    in_progress: 'In Progress',
                    completed: 'Completed',
                  };
                  const isSelected = activePlanStatus === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => handleStatusChange(status)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition ${
                        isSelected
                          ? status === 'completed'
                            ? 'bg-emerald-600 text-white font-bold'
                            : status === 'in_progress'
                            ? 'bg-cyan-600 text-white font-bold'
                            : status === 'planned'
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'bg-slate-800 text-slate-200'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {labels[status]}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Feedback Toast */}
          {saveSuccessNotice && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg">
              <Check className="w-3.5 h-3.5" />
              <span>{saveSuccessNotice}</span>
            </div>
          )}

          {/* Completion Information Form (when marked completed) */}
          {showCompletionForm && (
            <form onSubmit={handleSaveCompletionDetails} className="pt-3 border-t border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark as Completed - Record Credential Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Completion Date</label>
                  <input
                    type="date"
                    value={completedDate}
                    onChange={(e) => setCompletedDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl p-2 outline-none focus:border-emerald-500/60"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Credential URL (Optional)</label>
                  <input
                    type="url"
                    value={credentialUrl}
                    onChange={(e) => setCredentialUrl(e.target.value)}
                    placeholder="https://credly.com/badges/..."
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl p-2 outline-none focus:border-emerald-500/60"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Verification Code / ID (Optional)</label>
                  <input
                    type="text"
                    value={verificationUrl}
                    onChange={(e) => setVerificationUrl(e.target.value)}
                    placeholder="Certificate ID or Verification Link"
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl p-2 outline-none focus:border-emerald-500/60"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Personal Notes (Optional)</label>
                  <input
                    type="text"
                    value={studentNotes}
                    onChange={(e) => setStudentNotes(e.target.value)}
                    placeholder="Key takeaways or exam score"
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl p-2 outline-none focus:border-emerald-500/60"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500 font-mono">
                  * Student-provided credential information.
                </span>
                <button
                  type="submit"
                  className="py-1.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
                >
                  Save Credential Record
                </button>
              </div>
            </form>
          )}
        </div>

        {/* SECTION: WHY THIS RESOURCE? */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-2xl bg-blue-950/25 border border-blue-800/30 space-y-1.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Why This Resource?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {resource.whyItMatters ||
                `This resource can help you build structured technical skills in ${resource.skills.slice(0, 3).join(', ')} that support your career roadmap and real-world project development.`}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Description &amp; Syllabus Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {resource.longDescription || resource.shortDescription}
            </p>
          </div>
        </div>

        {/* WHAT YOU WILL LEARN */}
        {resource.learningOutcomes && resource.learningOutcomes.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              What You Will Learn
            </h4>
            <ul className="space-y-2">
              {resource.learningOutcomes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* PREREQUISITES & COST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 mb-6">
          {/* Prerequisites */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>Recommended Before Starting</span>
            </div>
            {resource.prerequisites && resource.prerequisites.length > 0 ? (
              <ul className="space-y-1 text-xs text-slate-300">
                {resource.prerequisites.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No specific prerequisites listed.</p>
            )}
          </div>

          {/* Cost Information */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Cost &amp; Pricing Status
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-xs font-mono px-2.5 py-0.5 rounded-md border ${costMeta.badgeClass}`}>
                {costMeta.label}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-1">
              {resource.costDescription}
            </p>
            <p className="text-[10px] text-slate-500 font-mono italic">
              Pricing and eligibility can change. Verify on the official provider page.
            </p>
          </div>
        </div>

        {/* RELEVANT CAREERS & SKILLS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 mb-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Target Career Paths
            </div>
            <div className="flex flex-wrap gap-1.5">
              {resource.careerPaths.map((cpId) => {
                const cp = CAREER_PATHS_CATALOG[cpId];
                return (
                  <span
                    key={cpId}
                    className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                  >
                    {cp ? cp.name : cpId}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Skills &amp; Technologies
            </div>
            <div className="flex flex-wrap gap-1.5">
              {resource.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RELATED LEVELUPDEV SKILLS & PROJECTS */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4" />
              <span>Related LevelUpDev Skills &amp; Projects</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link
              href="/skills"
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Skills Trail Modules</div>
                  <div className="text-[11px] text-slate-400">Practice core coding concepts &amp; assignments</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <Link
              href="/roadmaps"
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Career Roadmap Capstones</div>
                  <div className="text-[11px] text-slate-400">Build portfolio projects with guided plans</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>
          </div>
        </div>

        {/* OFFICIAL ACTION BUTTONS */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Opens directly on <span className="text-slate-300">{provider.name}</span>'s platform
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
            >
              Close
            </button>

            {resource.learningUrl && resource.learningUrl !== resource.officialUrl && (
              <a
                href={resource.learningUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 transition flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Open Learning Path</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {resource.credentialUrl && resource.credentialUrl !== resource.officialUrl && (
              <a
                href={resource.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300 hover:text-white border border-slate-700 transition flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>View Credential</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {resource.officialUrl &&
            (resource.officialUrl.startsWith('https://') || resource.officialUrl.startsWith('http://')) ? (
              <a
                href={resource.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition active:scale-95"
              >
                <span>Open Official Resource</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <div
                className="py-2.5 px-4 rounded-xl bg-slate-800/80 border border-amber-500/30 text-xs font-mono text-amber-300 flex items-center gap-1.5"
                title="Official link needs admin verification"
              >
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Official link needs verification</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
