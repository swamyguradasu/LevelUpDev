'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  CareerHubResource,
  CareerPathId,
  ProviderId,
  DifficultyLevel,
  CostType,
  ResourceType,
  getAllActiveResources,
  calculateCatalogStats,
  filterResources,
  PROVIDER_LIST,
  CAREER_PATHS_LIST,
  CAREER_PATHS_CATALOG,
  matchStudentCareerPath,
  DETAILED_CAREER_PATHS,
  DetailedCareerPath,
} from '@/data/careerHub';
import ResourceCard from '@/components/career-hub/ResourceCard';
import ResourceDetailModal from '@/components/career-hub/ResourceDetailModal';
import ResourceGlossaryCard from '@/components/career-hub/ResourceGlossaryCard';
import CareerPathCard from '@/components/career-hub/CareerPathCard';
import CareerPathJourneyModal from '@/components/career-hub/CareerPathJourneyModal';
import MyResourcesManager from '@/components/career-hub/MyResourcesManager';
import CareerMatchBanner from '@/components/career-hub/CareerMatchBanner';
import RecommendedNextCard from '@/components/career-hub/RecommendedNextCard';
import ResourceCompareModal from '@/components/career-hub/ResourceCompareModal';
import {
  Sparkles,
  Search,
  ShieldCheck,
  Compass,
  Award,
  BookOpen,
  Layers,
  Flame,
  RotateCcw,
  Bookmark,
  Zap,
  Target,
  ChevronRight,
  Cpu,
  ArrowRight,
  FolderGit2,
  CheckSquare,
  Check,
  Clock,
  ExternalLink,
  Eye,
  X,
  Filter,
} from 'lucide-react';
import { isPlacementPrepAllowed, isEnglishCareerAllowed } from '@/lib/content';
import {
  UserCareerHubResourceRecord,
  ResourcePlanStatus,
  getUserResourceRecords,
  toggleSaveResource,
  updateResourcePlanStatus,
  getRecentlyViewedResourceIds,
  addRecentlyViewedResourceId,
  trackCareerHubMetric,
} from '@/lib/careerHubStorage';

type TabType =
  | 'recommended'
  | 'career-paths'
  | 'free'
  | 'certifications'
  | 'courses'
  | 'badges'
  | 'hands-on'
  | 'my-resources';

export default function CareerHubPage() {
  const { userData } = useAuth();

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<TabType>('recommended');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<ProviderId | 'all'>('all');
  const [selectedCareer, setSelectedCareer] = useState<CareerPathId | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');
  const [selectedCost, setSelectedCost] = useState<CostType | 'all'>('all');

  // Interactive Modals & Active Records
  const [selectedResource, setSelectedResource] = useState<CareerHubResource | null>(null);
  const [selectedCareerJourney, setSelectedCareerJourney] = useState<DetailedCareerPath | null>(null);
  const [userResourceRecords, setUserResourceRecords] = useState<UserCareerHubResourceRecord[]>([]);

  // Smart Feature States
  const [inspectedCareerId, setInspectedCareerId] = useState<CareerPathId | null>(null);
  const [freeOnlyMode, setFreeOnlyMode] = useState(false);
  const [comparedResourceIds, setComparedResourceIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [externalLinkToast, setExternalLinkToast] = useState<{ name: string; domain: string } | null>(null);

  // Load all active catalog resources
  const activeCatalog = useMemo(() => getAllActiveResources(), []);
  const allCareerPaths = useMemo(() => Object.values(DETAILED_CAREER_PATHS), []);

  const userId = userData?.email || userData?.uid || 'guest_user';

  // Load student tracking records
  const loadUserRecords = useCallback(async () => {
    if (!userId) return;
    const records = await getUserResourceRecords(userId);
    setUserResourceRecords(records);
  }, [userId]);

  useEffect(() => {
    loadUserRecords();

    const handleUpdated = () => loadUserRecords();
    window.addEventListener('career_resources_updated', handleUpdated);
    return () => window.removeEventListener('career_resources_updated', handleUpdated);
  }, [loadUserRecords]);

  // Load recently viewed resources
  useEffect(() => {
    setRecentlyViewedIds(getRecentlyViewedResourceIds());
    const handleRecent = () => setRecentlyViewedIds(getRecentlyViewedResourceIds());
    window.addEventListener('career_recent_updated', handleRecent);
    return () => window.removeEventListener('career_recent_updated', handleRecent);
  }, []);

  // Handle Save / Bookmark
  const handleToggleSave = async (resource: CareerHubResource) => {
    const isCurrentlySaved = userRecordMap.get(resource.id)?.isSaved || false;
    await toggleSaveResource(userId, resource);
    await loadUserRecords();
    trackCareerHubMetric(isCurrentlySaved ? 'resource_unsaved' : 'resource_saved', {
      resourceId: resource.id,
      name: resource.name,
    });
  };

  // Handle Plan Status Update
  const handleUpdatePlanStatus = async (
    resource: CareerHubResource,
    status: ResourcePlanStatus | null,
    details?: {
      completedAt?: string;
      credentialUrl?: string;
      verificationUrl?: string;
      studentNotes?: string;
    }
  ) => {
    await updateResourcePlanStatus(userId, resource, status, details);
    await loadUserRecords();
    if (status === 'completed') {
      trackCareerHubMetric('resource_completed', { resourceId: resource.id, name: resource.name });
    } else if (status) {
      trackCareerHubMetric('resource_status_updated', { resourceId: resource.id, status });
    }
  };

  // Handle View Details with Recently Viewed Tracking
  const handleViewDetails = (resource: CareerHubResource) => {
    setSelectedResource(resource);
    addRecentlyViewedResourceId(resource.id);
    trackCareerHubMetric('resource_viewed', { resourceId: resource.id, name: resource.name });
  };

  // Handle Toggle Compare (up to 3 items)
  const handleToggleCompare = (resourceId: string) => {
    setComparedResourceIds((prev) => {
      if (prev.includes(resourceId)) {
        return prev.filter((id) => id !== resourceId);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], resourceId];
      }
      const nextList = [...prev, resourceId];
      trackCareerHubMetric('compare_opened', { comparedCount: nextList.length });
      return nextList;
    });
  };

  // Handle Inspecting Alternative Career
  const handleInspectCareer = (careerId: CareerPathId | null) => {
    setInspectedCareerId(careerId);
    if (careerId) {
      trackCareerHubMetric('career_switched', { inspectedCareerId: careerId });
    }
  };

  // Quick lookup map for user tracking records
  const userRecordMap = useMemo(() => {
    const map = new Map<string, UserCareerHubResourceRecord>();
    userResourceRecords.forEach((r) => map.set(r.resourceId, r));
    return map;
  }, [userResourceRecords]);

  // Determine Student's Matched Career Path ID
  const matchedStudentCareerId = useMemo(() => {
    if (!userData) return null;
    return (
      matchStudentCareerPath(userData.careerInterest) ||
      matchStudentCareerPath(userData.currentRole) ||
      null
    );
  }, [userData]);

  const activeSelectedCareerId = inspectedCareerId || matchedStudentCareerId;

  const studentCareerDefinition = activeSelectedCareerId
    ? DETAILED_CAREER_PATHS[activeSelectedCareerId] || CAREER_PATHS_CATALOG[activeSelectedCareerId]
    : null;

  // Dynamic Live Statistics
  const stats = useMemo(() => {
    return calculateCatalogStats(activeCatalog);
  }, [activeCatalog]);

  // Filter Logic via Catalog Service Layer
  const filteredResources = useMemo(() => {
    return activeCatalog.filter((res) => {
      const record = userRecordMap.get(res.id);

      // 0. Free-Only Mode (Toggle)
      if (freeOnlyMode) {
        const isFree =
          res.isFree ||
          res.costType === 'free' ||
          res.costType === 'free_training' ||
          res.costType === 'free_credential';
        if (!isFree) return false;
      }

      // 1. Tab filtering
      if (activeTab === 'recommended') {
        if (activeSelectedCareerId) {
          const matchesCareer = res.careerPaths.includes(activeSelectedCareerId);
          if (!matchesCareer && !res.isFeatured) return false;
        }
      } else if (activeTab === 'free') {
        const isFree =
          res.isFree ||
          res.costType === 'free' ||
          res.costType === 'free_credential' ||
          res.costType === 'free_training' ||
          res.costType === 'free_with_eligibility';
        if (!isFree) return false;
      } else if (activeTab === 'certifications') {
        if (res.resourceType !== 'certification' && res.resourceType !== 'certificate') return false;
      } else if (activeTab === 'courses') {
        if (res.resourceType !== 'course' && res.resourceType !== 'learning_path') return false;
      } else if (activeTab === 'badges') {
        if (res.resourceType !== 'skill_badge' && res.resourceType !== 'applied_skill') return false;
      } else if (activeTab === 'hands-on') {
        if (res.resourceType !== 'hands_on_lab' && res.resourceType !== 'applied_skill') return false;
      } else if (activeTab === 'my-resources') {
        if (!record || (!record.isSaved && !record.planStatus)) return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          res.name.toLowerCase().includes(q) ||
          res.provider.toLowerCase().includes(q) ||
          res.shortDescription.toLowerCase().includes(q) ||
          res.longDescription.toLowerCase().includes(q) ||
          res.skills.some((s) => s.toLowerCase().includes(q)) ||
          res.careerPaths.some((c) => c.toLowerCase().includes(q)) ||
          res.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // 3. Provider filter
      if (selectedProvider !== 'all' && res.provider !== selectedProvider) {
        return false;
      }

      // 4. Career filter
      if (selectedCareer !== 'all' && !res.careerPaths.includes(selectedCareer)) {
        return false;
      }

      // 5. Level filter
      if (selectedLevel !== 'all' && res.difficulty !== selectedLevel) {
        return false;
      }

      // 6. Cost filter
      if (selectedCost !== 'all') {
        if (selectedCost === 'free') {
          const isFree =
            res.isFree ||
            res.costType === 'free' ||
            res.costType === 'free_credential' ||
            res.costType === 'free_training';
          if (!isFree) return false;
        } else if (res.costType !== selectedCost) {
          return false;
        }
      }

      return true;
    });
  }, [
    activeCatalog,
    activeTab,
    activeSelectedCareerId,
    freeOnlyMode,
    searchQuery,
    selectedProvider,
    selectedCareer,
    selectedLevel,
    selectedCost,
    userRecordMap,
  ]);

  // Filtered Career Paths for the 'career-paths' view
  const filteredCareerPaths = useMemo(() => {
    return allCareerPaths.filter((cp) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = cp.title.toLowerCase().includes(q);
        const matchDesc = cp.description.toLowerCase().includes(q);
        const matchSkills = cp.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchSkills) return false;
      }
      if (selectedCareer !== 'all' && cp.careerId !== selectedCareer) {
        return false;
      }
      return true;
    });
  }, [allCareerPaths, searchQuery, selectedCareer]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedProvider('all');
    setSelectedCareer('all');
    setSelectedLevel('all');
    setSelectedCost('all');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedProvider !== 'all' ||
    selectedCareer !== 'all' ||
    selectedLevel !== 'all' ||
    selectedCost !== 'all';

  const savedAndTrackedCount = userResourceRecords.filter(
    (r) => r.isSaved || r.planStatus !== null
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-mobile-nav selection:bg-cyan-500/30">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/home" className="flex items-center gap-2 group">
              <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-cyan-300 transition">
                Level<span className="text-[#006cd2]">Up</span>Dev
              </span>
              <span className="text-xs font-mono bg-[#006cd2]/15 text-cyan-300 border border-[#006cd2]/30 px-2 py-0.5 rounded-full font-bold">
                Career Hub
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/home" className="hover:text-white transition">
              Portfolio
            </Link>
            <Link href="/dashboard" className="hover:text-white transition">
              Dashboard
            </Link>
            <Link href="/roadmaps" className="hover:text-white transition">
              Career Roadmaps
            </Link>
            <Link
              href="/internships"
              className="text-cyan-400 font-semibold flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Career Hub</span>
            </Link>
            <Link href="/skills" className="hover:text-white transition">
              Skills Trail
            </Link>
            <Link href="/daily" className="hover:text-white transition">
              Daily Challenge
            </Link>
            <Link href="/leaderboard" className="hover:text-white transition">
              Leaderboard
            </Link>
            {isPlacementPrepAllowed(userData?.email) && (
              <Link
                href="/placement-preparation"
                className="text-amber-300 font-bold hover:text-white transition flex items-center gap-1 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30 text-xs"
              >
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>Placement Prep</span>
              </Link>
            )}
            {isEnglishCareerAllowed(userData?.email) && (
              <Link
                href="/english-career"
                className="text-blue-300 font-bold hover:text-white transition flex items-center gap-1 bg-blue-500/15 px-2.5 py-0.5 rounded-full border border-blue-500/30 text-xs"
              >
                <span>English &amp; Career</span>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-8 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-[#006cd2]/10 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Trust Disclaimer Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Curated from official provider learning platforms</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-slate-400 font-mono text-[11px]">External Verified Credentials</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-4 font-display">
            Build Skills. Earn Credentials.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Become Job Ready.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover curated courses, certifications, skill badges, hands-on credentials and
            learning paths connecting your career to real-world projects.
          </p>

          {/* Primary Hero Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
            <button
              onClick={() => {
                setActiveTab('career-paths');
                setSelectedCareer('all');
              }}
              className="flex items-center gap-2 py-3 px-6 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white text-sm font-bold shadow-lg shadow-blue-500/25 transition active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Career Paths</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('free');
                setSelectedCost('all');
              }}
              className="flex items-center gap-2 py-3 px-6 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-semibold border border-slate-700/80 transition active:scale-95"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Explore Free Resources</span>
            </button>
          </div>

          {/* Philosophy Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase px-2">
              Career Journey:
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              CAREER
            </span>
            <span className="text-slate-600 font-mono">→</span>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
              SKILLS
            </span>
            <span className="text-slate-600 font-mono">→</span>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
              COURSES
            </span>
            <span className="text-slate-600 font-mono">→</span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
              CREDENTIALS
            </span>
            <span className="text-slate-600 font-mono">→</span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              PROJECTS
            </span>
          </div>
        </div>
      </section>

      {/* Top Quick Stats */}
      <section className="px-4 sm:px-8 -mt-6 relative z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-blue-500/10 text-cyan-400 border border-blue-500/20 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white font-display">
                {stats.totalResources}
              </div>
              <div className="text-xs text-slate-400">Curated Resources</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white font-display">
                {allCareerPaths.length} Roles
              </div>
              <div className="text-xs text-slate-400">Structured Pathways</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white font-display">
                {stats.providers}
              </div>
              <div className="text-xs text-slate-400">Technology Providers</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-xl flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-display">
                {stats.freeOpportunities}
              </div>
              <div className="text-xs text-slate-400">Opportunities Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80 scrollbar-none">
          <button
            onClick={() => setActiveTab('recommended')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'recommended'
                ? 'bg-[#006cd2] text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Recommended</span>
          </button>

          <button
            onClick={() => setActiveTab('career-paths')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'career-paths'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Career Paths ({allCareerPaths.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('free')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'free'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Free Resources</span>
          </button>

          <button
            onClick={() => setActiveTab('certifications')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'certifications'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certifications</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses</span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'badges'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Skill Badges</span>
          </button>

          <button
            onClick={() => setActiveTab('hands-on')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'hands-on'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Hands-on</span>
          </button>

          <button
            onClick={() => setActiveTab('my-resources')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'my-resources'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>My Resources ({savedAndTrackedCount})</span>
          </button>
        </div>

        {/* Top Career Match & Recommendation Sections */}
        {activeTab === 'recommended' && (
          <div className="space-y-6">
            <CareerMatchBanner
              primaryCareerId={matchedStudentCareerId}
              inspectedCareerId={inspectedCareerId}
              onInspectCareer={handleInspectCareer}
              catalog={activeCatalog}
              onViewCareerJourney={(cp) => setSelectedCareerJourney(cp)}
              detailedPath={studentCareerDefinition ? (studentCareerDefinition as DetailedCareerPath) : null}
            />

            <RecommendedNextCard
              careerId={activeSelectedCareerId}
              userRecords={userResourceRecords}
              allResources={activeCatalog}
              onOpenResource={(res) => handleViewDetails(res)}
            />
          </div>
        )}

        {/* CAREER PATHS TAB CONTENT */}
        {activeTab === 'career-paths' ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  Explore 16 Structured Career Pathways
                </h3>
                <p className="text-xs text-slate-400">
                  Select a career role to view the complete journey from foundations to credentials &amp; projects.
                </p>
              </div>

              {/* Career quick search */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter career paths..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500/60 text-xs text-white placeholder-slate-500 rounded-xl py-2 pl-9 pr-3 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareerPaths.map((careerPath) => (
                <CareerPathCard
                  key={careerPath.careerId}
                  careerPath={careerPath}
                  isStudentSelected={matchedStudentCareerId === careerPath.careerId}
                  onSelectPath={(cp) => setSelectedCareerJourney(cp)}
                />
              ))}
            </div>
          </div>
        ) : activeTab === 'my-resources' ? (
          /* MY RESOURCES TAB CONTENT */
          <MyResourcesManager
            records={userResourceRecords}
            onViewDetails={(res) => handleViewDetails(res)}
            onToggleSave={handleToggleSave}
            onUpdatePlanStatus={handleUpdatePlanStatus}
          />
        ) : (
          <>
            {/* Recently Viewed Resources Bar (if any) */}
            {recentlyViewedIds.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>RECENTLY VIEWED</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {recentlyViewedIds.length} stored locally (max 10)
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {recentlyViewedIds
                    .map((id) => activeCatalog.find((r) => r.id === id))
                    .filter((r): r is CareerHubResource => Boolean(r))
                    .map((res) => (
                      <button
                        key={res.id}
                        onClick={() => handleViewDetails(res)}
                        className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 text-left shrink-0 max-w-[200px] transition group"
                      >
                        <div className="text-[10px] font-mono text-cyan-400 truncate uppercase">
                          {res.provider}
                        </div>
                        <div className="text-xs font-semibold text-white group-hover:text-cyan-300 truncate">
                          {res.name}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Search & Filter Bar for Resources */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4 shadow-xl">
              {/* Top Search Input & Free Only Mode Toggle */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses, certifications, skills, companies (e.g. Python, Azure, GenAI, Docker)..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 text-sm text-white placeholder-slate-500 rounded-2xl py-3 pl-12 pr-4 transition outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Free Only Prominent Toggle */}
                <button
                  type="button"
                  onClick={() => setFreeOnlyMode((prev) => !prev)}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-mono font-bold transition border shrink-0 ${
                    freeOnlyMode
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Zap className={`w-4 h-4 ${freeOnlyMode ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>Show only free opportunities</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      freeOnlyMode ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                    }`}
                  />
                </button>
              </div>

              {/* Filter Dropdowns & Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-800/60">
                {/* Provider Filter */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Provider
                  </label>
                  <select
                    value={selectedProvider}
                    onChange={(e) => setSelectedProvider(e.target.value as ProviderId | 'all')}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl p-2.5 outline-none focus:border-cyan-500/60 transition"
                  >
                    <option value="all">All Providers ({PROVIDER_LIST.length})</option>
                    {PROVIDER_LIST.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Career Filter */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Career Role
                  </label>
                  <select
                    value={selectedCareer}
                    onChange={(e) => setSelectedCareer(e.target.value as CareerPathId | 'all')}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl p-2.5 outline-none focus:border-cyan-500/60 transition"
                  >
                    <option value="all">All Career Roles ({CAREER_PATHS_LIST.length})</option>
                    {CAREER_PATHS_LIST.map((career) => (
                      <option key={career.id} value={career.id}>
                        {career.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Level */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Level
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value as DifficultyLevel | 'all')}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl p-2.5 outline-none focus:border-cyan-500/60 transition"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                {/* Cost Filter */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Cost Status
                  </label>
                  <select
                    value={selectedCost}
                    onChange={(e) => setSelectedCost(e.target.value as CostType | 'all')}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl p-2.5 outline-none focus:border-cyan-500/60 transition"
                  >
                    <option value="all">All Costs</option>
                    <option value="free">Free / Free Access</option>
                    <option value="free_credential">Free Credential</option>
                    <option value="free_training">Free Training</option>
                    <option value="free_with_eligibility">Free with Aid / Eligibility</option>
                    <option value="paid">Paid / Exam Required</option>
                    <option value="check_provider">Check Provider</option>
                  </select>
                </div>
              </div>

              {/* Active Filter Chips & Reset */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/40 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-slate-400 font-mono text-[11px]">Active Filters:</span>
                    {searchQuery && (
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                        "{searchQuery}"
                      </span>
                    )}
                    {freeOnlyMode && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono">
                        Free Only
                      </span>
                    )}
                    {selectedProvider !== 'all' && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                        Provider: {selectedProvider}
                      </span>
                    )}
                    {selectedCareer !== 'all' && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                        Role: {CAREER_PATHS_CATALOG[selectedCareer]?.name || selectedCareer}
                      </span>
                    )}
                    {selectedLevel !== 'all' && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono uppercase">
                        Level: {selectedLevel}
                      </span>
                    )}
                    {selectedCost !== 'all' && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono uppercase">
                        Cost: {selectedCost.replace('_', ' ')}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              )}
            </div>

            {/* Educational Glossary Explainer */}
            <ResourceGlossaryCard />

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {activeTab === 'recommended' && 'Recommended Resources'}
                  {activeTab === 'free' && 'Free Opportunities & Credentials'}
                  {activeTab === 'certifications' && 'Industry Certifications & Certificates'}
                  {activeTab === 'courses' && 'Curated Courses & Learning Paths'}
                  {activeTab === 'badges' && 'Verifiable Digital Badges & Applied Skills'}
                  {activeTab === 'hands-on' && 'Hands-on Labs & Practical Sandboxes'}
                </h3>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                  {filteredResources.length} {filteredResources.length === 1 ? 'Resource' : 'Resources'}
                </span>
              </div>
            </div>

            {/* Resource Cards Grid */}
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    isSaved={userRecordMap.get(resource.id)?.isSaved || false}
                    onToggleSave={() => handleToggleSave(resource)}
                    onViewDetails={(res) => handleViewDetails(res)}
                    highlightCareerId={activeSelectedCareerId || undefined}
                    isCompared={comparedResourceIds.includes(resource.id)}
                    onToggleCompare={handleToggleCompare}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">No Matching Resources Found</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Try adjusting your search terms, clear active filters, or explore our free resources tab.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                  >
                    Clear Active Filters
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Floating Resource Comparison Bar */}
      {comparedResourceIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-cyan-500/40 rounded-2xl p-3 sm:px-6 sm:py-3.5 shadow-2xl backdrop-blur-xl flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white">
              {comparedResourceIds.length} {comparedResourceIds.length === 1 ? 'Resource' : 'Resources'} in Compare
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCompareModal(true)}
              className="py-1.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition shadow-md shadow-cyan-500/20"
            >
              Compare Side-by-Side
            </button>
            <button
              onClick={() => setComparedResourceIds([])}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
              title="Clear comparison"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Resource Comparison Modal */}
      {showCompareModal && (
        <ResourceCompareModal
          resources={comparedResourceIds
            .map((id) => activeCatalog.find((r) => r.id === id))
            .filter((r): r is CareerHubResource => Boolean(r))}
          onClose={() => setShowCompareModal(false)}
          onRemoveResource={handleToggleCompare}
          onViewDetails={(res) => {
            setShowCompareModal(false);
            handleViewDetails(res);
          }}
        />
      )}

      {/* Career Path Journey Modal */}
      {selectedCareerJourney && (
        <CareerPathJourneyModal
          careerPath={selectedCareerJourney}
          isStudentSelected={matchedStudentCareerId === selectedCareerJourney.careerId}
          onClose={() => setSelectedCareerJourney(null)}
          onViewResourceDetails={(res) => handleViewDetails(res)}
        />
      )}

      {/* Resource Detail Modal */}
      {selectedResource && (
        <ResourceDetailModal
          resource={selectedResource}
          userRecord={userRecordMap.get(selectedResource.id) || null}
          onClose={() => setSelectedResource(null)}
          onToggleSave={handleToggleSave}
          onUpdatePlanStatus={handleUpdatePlanStatus}
        />
      )}
    </div>
  );
}
