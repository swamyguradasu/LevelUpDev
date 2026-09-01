'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  INTERNSHIP_OPPORTUNITIES,
  InternshipOpportunity,
  InternshipApplication,
  ApplicationStatus,
} from '@/data/internshipsData';
import {
  getInternshipApplications,
  getApplicationsByUser,
  submitInternshipApplication,
} from '@/lib/internshipStorage';
import { isAdminEmail } from '@/lib/content';
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  Filter,
  Code2,
  LineChart,
  Brain,
  Globe,
  X,
  Send,
  Building,
  AlertCircle,
  FileCheck2,
  RefreshCw,
  UserCheck,
  ChevronRight,
  Laptop,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-[#006cd2]" />,
  LineChart: <LineChart className="w-6 h-6 text-emerald-400" />,
  Brain: <Brain className="w-6 h-6 text-purple-400" />,
  Globe: <Globe className="w-6 h-6 text-cyan-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-400" />,
};

export default function InternshipsPage() {
  const { userData } = useAuth();

  // Active view tab: 'explore' | 'my-applications'
  const [activeTab, setActiveTab] = useState<'explore' | 'my-applications'>('explore');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal States
  const [selectedInternship, setSelectedInternship] = useState<InternshipOpportunity | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<InternshipApplication | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Form inputs
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEducation, setFormEducation] = useState('');
  const [formSkills, setFormSkills] = useState('');
  const [formError, setFormError] = useState('');

  // Applications list
  const [myApplications, setMyApplications] = useState<InternshipApplication[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  // Load user applications
  const loadApplications = async () => {
    setLoadingApps(true);
    const identifier = userData?.email || userData?.uid || 'guest';
    const list = await getApplicationsByUser(identifier);
    setMyApplications(list);
    setLoadingApps(false);
  };

  useEffect(() => {
    loadApplications();

    // Listen for updates from other tabs / admin actions
    const handleUpdate = () => loadApplications();
    window.addEventListener('internship_applications_updated', handleUpdate);
    return () => window.removeEventListener('internship_applications_updated', handleUpdate);
  }, [userData]);

  // Autofill form when applying
  const handleOpenApplyModal = (internship: InternshipOpportunity) => {
    setSelectedInternship(internship);
    setIsApplying(true);
    setSubmissionSuccess(false);
    setFormError('');

    // Pre-fill inputs with logged-in user profile if available
    setFormName(userData?.name || '');
    setFormEmail(userData?.email || '');
    setFormPhone('');
    const eduStr = [userData?.branch, userData?.college].filter(Boolean).join(', ');
    setFormEducation(eduStr || 'B.Tech Computer Science / AI & ML');
    const skillsStr = (userData?.skillsCompleted || []).join(', ');
    setFormSkills(skillsStr || internship.skills.join(', '));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim() || !formEmail.trim() || !formPhone.trim() || !formEducation.trim() || !formSkills.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }

    if (!selectedInternship) return;

    setIsSubmitting(true);
    try {
      const newApp = await submitInternshipApplication({
        user_id: userData?.uid || 'guest',
        internship_id: selectedInternship.id,
        internship_title: selectedInternship.title,
        full_name: formName,
        email: formEmail,
        phone: formPhone,
        education: formEducation,
        skills: formSkills,
      });

      setSubmittedApp(newApp);
      setSubmissionSuccess(true);
      await loadApplications();
    } catch (err) {
      console.error('Submission error:', err);
      setFormError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered internships
  const filteredInternships = INTERNSHIP_OPPORTUNITIES.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Software Development', 'Data & Analytics', 'Artificial Intelligence', 'Web Development', 'Generative AI'];

  // Check if current user has applied to an internship
  const getApplicationForInternship = (internshipId: string) => {
    return myApplications.find((a) => a.internship_id === internshipId);
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Interested':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Interested
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Under Review
          </span>
        );
      case 'Selected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Selected
          </span>
        );
      case 'Not Selected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
            <X className="w-3.5 h-3.5" />
            Not Selected
          </span>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Background Decor Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[#006cd2]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen pb-mobile-nav">
        {/* Top Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/home"
                className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
                <span>Return to Portfolio</span>
              </Link>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
                <Briefcase className="w-4 h-4 text-[#006cd2]" />
                <span>Internship Experience</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-xs font-mono text-cyan-400 hover:text-white px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/roadmaps"
                className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition"
              >
                Career Roadmaps
              </Link>
              {isAdminEmail(userData?.email || '') && (
                <Link
                  href="/admin"
                  className="px-3 py-1.5 rounded-full bg-[#006cd2]/20 border border-[#006cd2]/40 text-blue-300 hover:text-white font-mono text-xs font-bold transition flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
          {/* ========================================================================= */}
          {/* 1. HERO SECTION */}
          {/* ========================================================================= */}
          <section className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006cd2]/15 border border-[#006cd2]/30 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-[#006cd2]" />
              <span>SIMULATED WORKPLACE EXPERIENCE</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              Internships
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore internship opportunities and experience how the internship application process works.
            </p>

            {/* Educational Demo Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/40 border border-[#006cd2]/40 text-left flex items-start gap-3 shadow-lg shadow-[#006cd2]/5">
              <div className="w-9 h-9 rounded-xl bg-[#006cd2]/20 border border-[#006cd2]/40 text-[#006cd2] flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 text-xs sm:text-sm">
                <div className="font-display font-bold text-white flex items-center gap-2">
                  <span>🎓 Demo Experience</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px] uppercase font-bold">
                    Educational Simulation
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  This section is designed for educational purposes. Submit your interest in an internship to experience
                  a simplified internship application workflow.
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 2. TAB SWITCHER & FILTER BAR */}
          {/* ========================================================================= */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            {/* Tabs */}
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 w-fit">
              <button
                onClick={() => setActiveTab('explore')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 ${
                  activeTab === 'explore'
                    ? 'bg-[#006cd2] text-white shadow-sm shadow-[#006cd2]/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Explore Internships</span>
                <span className="ml-1 px-1.5 py-0.2 rounded bg-slate-950 text-slate-300 text-[10px]">
                  {INTERNSHIP_OPPORTUNITIES.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('my-applications')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 ${
                  activeTab === 'my-applications'
                    ? 'bg-[#006cd2] text-white shadow-sm shadow-[#006cd2]/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>My Applications</span>
                {myApplications.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-bold">
                    {myApplications.length}
                  </span>
                )}
              </button>
            </div>

            {/* Quick Search */}
            {activeTab === 'explore' && (
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search role or skill..."
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#006cd2] focus:ring-1 focus:ring-[#006cd2]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: EXPLORE INTERNSHIPS */}
          {/* ========================================================================= */}
          {activeTab === 'explore' && (
            <div className="space-y-6">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-medium whitespace-nowrap transition border ${
                      selectedCategory === cat
                        ? 'bg-blue-950/70 border-[#006cd2] text-blue-300 ring-1 ring-[#006cd2]/40'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Internship Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInternships.map((internship) => {
                  const existingApp = getApplicationForInternship(internship.id);

                  return (
                    <div
                      key={internship.id}
                      className="rounded-3xl p-6 sm:p-7 bg-slate-900/70 border border-slate-800 hover:border-[#006cd2]/60 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-lg shadow-black/40"
                    >
                      <div className="space-y-4">
                        {/* Header Badge Row */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-[10px] font-mono font-bold uppercase">
                            <Sparkles className="w-3 h-3" />
                            Demo Internship
                          </span>

                          <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                            {internship.category}
                          </span>
                        </div>

                        {/* Title & Icon */}
                        <div className="flex items-start gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            {ICON_MAP[internship.iconName] || <Briefcase className="w-6 h-6 text-[#006cd2]" />}
                          </div>
                          <div>
                            <h3 className="font-display text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                              {internship.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400 font-mono">
                              <span className="flex items-center gap-1 text-emerald-400">
                                <MapPin className="w-3 h-3" />
                                {internship.mode}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-500" />
                                {internship.duration}
                              </span>
                              <span>•</span>
                              <span className="text-slate-300">{internship.level}</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                          {internship.description}
                        </p>

                        {/* Skills Chips */}
                        <div className="space-y-1.5 pt-1">
                          <div className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                            Required Skills
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {internship.skills.map((sk, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 font-mono text-[11px] border border-slate-800"
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                        {existingApp ? (
                          <div className="flex items-center justify-between w-full">
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-mono text-slate-500 uppercase">Your Status</span>
                              <div>{getStatusBadge(existingApp.status)}</div>
                            </div>
                            <button
                              onClick={() => setSelectedInternship(internship)}
                              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-mono font-medium border border-slate-800 transition"
                            >
                              View Details
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => setSelectedInternship(internship)}
                              className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white font-sans text-xs font-semibold border border-slate-800 transition flex-1 text-center"
                            >
                              View Internship
                            </button>
                            <button
                              onClick={() => handleOpenApplyModal(internship)}
                              className="px-4 py-2 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-bold transition shadow-sm shadow-[#006cd2]/30 flex items-center gap-1.5"
                            >
                              <span>Apply</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredInternships.length === 0 && (
                <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
                  <Search className="w-8 h-8 text-slate-600 mx-auto" />
                  <h4 className="font-display text-base font-bold text-white">No internships found</h4>
                  <p className="text-xs text-slate-400">Try adjusting your search keywords or category filters.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-4 py-1.5 rounded-xl bg-slate-800 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: MY APPLICATIONS */}
          {/* ========================================================================= */}
          {activeTab === 'my-applications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-[#006cd2]" />
                    <span>My Internship Applications</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Track the real-time review status of your demo applications.
                  </p>
                </div>
                <button
                  onClick={loadApplications}
                  disabled={loadingApps}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-800 transition flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingApps ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {myApplications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {myApplications.map((app) => (
                    <div
                      key={app.id}
                      className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-4 shadow-lg shadow-black/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30 uppercase font-bold">
                              Demo Application
                            </span>
                            <span className="font-mono text-[10px] text-slate-500">
                              Applied {new Date(app.submitted_at).toLocaleDateString()}
                            </span>
                          </div>
                          <h4 className="font-display text-lg font-bold text-white">{app.internship_title}</h4>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs font-mono">
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="text-slate-500">Applicant:</span>
                          <span className="text-white font-medium">{app.full_name}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="text-slate-500">Email:</span>
                          <span className="text-slate-300">{app.email}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="text-slate-500">Education:</span>
                          <span className="text-slate-300 text-right truncate max-w-[200px]">{app.education}</span>
                        </div>
                        <div className="pt-1 border-t border-slate-800/60">
                          <span className="text-slate-500 block mb-1">Submitted Skills:</span>
                          <div className="text-slate-300 font-sans text-xs">{app.skills}</div>
                        </div>
                      </div>

                      {app.admin_notes && (
                        <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs">
                          <span className="font-mono text-[10px] text-blue-300 font-bold uppercase block mb-0.5">
                            Mentor / Review Feedback
                          </span>
                          <p className="text-slate-300 text-xs">{app.admin_notes}</p>
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span>Application ID: {app.id.substring(0, 14)}...</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Registered
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display text-lg font-bold text-white">No Applications Yet</h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                      You have not applied for any simulated demo internships yet. Explore available roles and submit your
                      interest to experience the workflow.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="px-6 py-2.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-bold rounded-full transition shadow-md shadow-[#006cd2]/30 inline-flex items-center gap-2"
                  >
                    <span>Browse Internships</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* ========================================================================= */}
        {/* MODAL 1: DETAILED INTERNSHIP OVERVIEW */}
        {/* ========================================================================= */}
        {selectedInternship && !isApplying && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedInternship(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 font-mono text-xs font-bold uppercase border border-blue-500/30">
                    🎓 Demo Internship
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-400 font-mono text-xs border border-slate-800">
                    {selectedInternship.category}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">{selectedInternship.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedInternship.mode}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedInternship.duration}
                  </span>
                  <span>•</span>
                  <span>Level: {selectedInternship.level}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-slate-400 uppercase">Role Overview</h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{selectedInternship.description}</p>
              </div>

              {/* What You Will Learn */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-blue-300 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>What You Will Learn &amp; Build</span>
                </h4>
                <ul className="space-y-1.5">
                  {selectedInternship.learningOutcomes.map((item, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Skills */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-slate-400 uppercase">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedInternship.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simulation Notice */}
              <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-[#006cd2]/40 text-xs text-blue-200">
                <strong>🎓 Demo Simulation: </strong>
                This is an educational simulation. Applying allows you to experience the application workflow and
                connect with learning mentors.
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedInternship(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => handleOpenApplyModal(selectedInternship)}
                  className="px-6 py-2.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-bold shadow-lg shadow-[#006cd2]/30 flex items-center gap-2"
                >
                  <span>Apply for Demo Internship</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 2: APPLICATION FORM & SUCCESS STATE */}
        {/* ========================================================================= */}
        {isApplying && selectedInternship && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              {!submissionSuccess ? (
                <>
                  <button
                    onClick={() => setIsApplying(false)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
                  >
                    ✕
                  </button>

                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                      INTERNSHIP APPLICATION
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white">{selectedInternship.title}</h3>
                    <p className="text-xs text-slate-400">
                      Submit your student details to register your interest for this simulated internship role.
                    </p>
                  </div>

                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    {/* 1. Full Name */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-slate-300 font-medium block">
                        Full Name <span className="text-[#006cd2]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Swamy Guradasu"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#006cd2]"
                      />
                    </div>

                    {/* 2. Email Address */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-slate-300 font-medium block">
                        Email Address <span className="text-[#006cd2]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. yourname@gmail.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#006cd2]"
                      />
                    </div>

                    {/* 3. Phone Number */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-slate-300 font-medium block">
                        Phone Number <span className="text-[#006cd2]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#006cd2]"
                      />
                    </div>

                    {/* 4. Education */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-slate-300 font-medium block">
                        Education / Degree &amp; College <span className="text-[#006cd2]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formEducation}
                        onChange={(e) => setFormEducation(e.target.value)}
                        placeholder="e.g. B.Tech Artificial Intelligence, Swarnandhra College"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#006cd2]"
                      />
                    </div>

                    {/* 5. Skills */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-slate-300 font-medium block">
                        Skills &amp; Technologies <span className="text-[#006cd2]">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formSkills}
                        onChange={(e) => setFormSkills(e.target.value)}
                        placeholder="e.g. Python, SQL, FastAPI, Git, Problem Solving, Data Structures"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#006cd2]"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsApplying(false)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-bold shadow-lg shadow-[#006cd2]/30 flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Application</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* SUCCESS STATE */
                <div className="text-center space-y-5 py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-white">
                      Application Submitted Successfully! 🎉
                    </h3>
                    <p className="font-sans text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      You have successfully registered your interest in this demo internship.
                    </p>
                    <p className="font-mono text-xs text-blue-300 bg-blue-950/40 p-3 rounded-xl border border-blue-900/40 max-w-md mx-auto">
                      An admin can now see your application in the Internship Management section.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsApplying(false);
                        setSelectedInternship(null);
                        setActiveTab('my-applications');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-bold shadow-md shadow-[#006cd2]/30 flex items-center gap-2"
                    >
                      <FileCheck2 className="w-4 h-4" />
                      <span>View My Applications</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsApplying(false);
                        setSelectedInternship(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-sans text-xs font-medium"
                    >
                      Browse More Internships
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-500 font-mono text-xs py-8 px-6 md:px-12 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© 2024 LevelUpDev • Simulated Internship Learning Portal</div>
            <div className="flex items-center gap-4">
              <Link href="/home" className="hover:text-slate-300 transition-colors">
                Portfolio
              </Link>
              <span>•</span>
              <Link href="/roadmaps" className="hover:text-slate-300 transition-colors">
                Roadmaps
              </Link>
              <span>•</span>
              <Link href="/daily" className="hover:text-slate-300 transition-colors">
                Daily Challenge
              </Link>
              <span>•</span>
              <Link href="/leaderboard" className="hover:text-slate-300 transition-colors">
                Leaderboard
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
