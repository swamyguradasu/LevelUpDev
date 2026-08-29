'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { StaticUserProfile } from '@/lib/csvRoster';
import {
  UserDynamicData,
  fetchUserDynamicData,
} from '@/lib/dynamicDatabase';
import {
  Briefcase,
  Globe,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  ArrowLeft,
  Flame,
  Lock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FolderGit2,
  MapPin,
  Eye,
  Check,
  Code2,
} from 'lucide-react';

export default function RecruiterPortfolioPage() {
  const params = useParams();
  const router = useRouter();
  const slug = String(params?.slug || '').toLowerCase();

  const [profile, setProfile] = useState<StaticUserProfile | null>(null);
  const [dynamicData, setDynamicData] = useState<UserDynamicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadPortfolio() {
      if (!slug) return;
      setLoading(true);
      setNotFound(false);

      try {
        // 1. Fetch static profiles from API
        const res = await fetch('/api/auth/profile');
        if (!res.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const data = await res.json();
        const allProfiles: StaticUserProfile[] = data.profiles || [];

        // Match slug
        const matched = allProfiles.find((p) => {
          const uName = (p.username || '').toLowerCase();
          const emailPrefix = (p.levelupdevEmail.split('@')[0] || '').toLowerCase();
          const regNo = (p.registerNumber || '').toLowerCase();
          return uName === slug || emailPrefix === slug || regNo === slug;
        });

        if (!matched) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setProfile(matched);

        // 2. Fetch dynamic activity data
        const dynamic = await fetchUserDynamicData(matched.levelupdevEmail);
        setDynamicData(dynamic);
      } catch (err) {
        console.error('Failed to load portfolio:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolio();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-400">
        <div className="flex items-center gap-3 bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Loading Developer Portfolio...</span>
        </div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-800 text-center space-y-5">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <Briefcase className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-white">Portfolio Not Found</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              We could not find a registered developer profile for identifier: <code className="font-mono bg-slate-950 px-1.5 py-0.5 rounded text-blue-400 font-bold">&quot;{slug}&quot;</code>
            </p>
          </div>
          <Link
            href="/leaderboard"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold rounded-xl transition shadow-md shadow-[#006cd2]/30"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Leaderboard
          </Link>
        </div>
      </div>
    );
  }

  // Respect Privacy Setting: Make Portfolio Public?
  if (profile.isPortfolioPublic === false) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl shadow-2xl border border-amber-500/30 text-center space-y-5">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-white">Private Portfolio</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>{profile.fullName}</strong> has designated their developer portfolio as private.
            </p>
          </div>
          <Link
            href="/leaderboard"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-sans text-xs font-semibold rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Leaderboard
          </Link>
        </div>
      </div>
    );
  }

  // Derived Dynamic Activity Metrics
  const pythonProgress = dynamicData?.progress?.python || {};
  const pyCompletedCount = Object.values(pythonProgress).filter((m) => m.status === 'completed').length;
  const projects = dynamicData?.projects || [];
  const achievements = dynamicData?.achievements || [];
  const streak = dynamicData?.streak?.currentStreak || 0;
  const activeDays = dynamicData?.streak?.activeDays || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Top Recruiter View Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/leaderboard"
            className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl hover:border-slate-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#006cd2]" />
            <span>Leaderboard</span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full font-mono text-[11px] font-bold">
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Recruiter View (Read-Only)</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-mono text-xs text-orange-400 bg-orange-950/40 border border-orange-800/40 px-3 py-1 rounded-full font-bold">
            <Flame className="w-3.5 h-3.5 fill-orange-400" />
            <span>{streak} Day Streak</span>
          </div>

          <Link
            href="/home"
            className="text-xs font-mono font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition"
          >
            My Account
          </Link>
        </div>
      </header>

      {/* Main Portfolio Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-10 space-y-10">
        {/* ========================================================================= */}
        {/* 1. HERO PROFILE CARD */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-emerald-400" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Profile Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:sem:h-28 rounded-3xl p-1 bg-gradient-to-tr from-[#006cd2] via-cyan-400 to-emerald-400 shadow-xl">
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover rounded-[22px]"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center font-display font-extrabold text-2xl text-blue-400">
                    {profile.fullName.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center" title="Verified Member">
                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
              </span>
            </div>

            {/* Profile Header Info */}
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {profile.fullName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#006cd2]/20 border border-[#006cd2]/40 text-blue-300 font-mono text-[11px] font-bold">
                  {profile.registerNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <p className="font-sans text-sm text-blue-300 font-medium leading-snug">
                {profile.headline || 'Aspiring Software Developer'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>{profile.degree} {profile.branch} ({profile.currentYear})</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{[profile.city, profile.state, profile.country].filter(Boolean).join(', ') || 'India'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Short Bio */}
          {profile.shortBio && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
              {profile.shortBio}
            </p>
          )}

          {/* Social & Professional Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80">
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-mono text-xs rounded-xl flex items-center gap-2 transition"
              >
                <Code2 className="w-4 h-4 text-slate-300" />
                <span>GitHub Profile ↗</span>
              </a>
            )}

            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/30 text-blue-300 font-mono text-xs rounded-xl flex items-center gap-2 transition"
              >
                <Globe className="w-4 h-4 text-[#0077b5]" />
                <span>LinkedIn ↗</span>
              </a>
            )}

            {profile.websiteUrl && (
              <a
                href={profile.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-cyan-300 font-mono text-xs rounded-xl flex items-center gap-2 transition"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Website ↗</span>
              </a>
            )}

            {/* Privacy-Respecting Contact Email */}
            {profile.showEmailPublicly !== false && profile.contactEmail && (
              <a
                href={`mailto:${profile.contactEmail}`}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono text-xs rounded-xl flex items-center gap-2 transition"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{profile.contactEmail}</span>
              </a>
            )}

            {/* Privacy-Respecting Phone */}
            {profile.showPhonePublicly === true && profile.phone && (
              <span className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs rounded-xl flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{profile.phone}</span>
              </span>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. ABOUT ME SECTION */}
        {/* ========================================================================= */}
        {profile.aboutMe && (
          <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>About Developer</span>
            </h2>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 whitespace-pre-line">
              {profile.aboutMe}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 3. VERIFIED SKILLS TRAIL PROGRESS */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <span>Verified Skills Trail</span>
              </h2>
              <p className="font-sans text-xs text-slate-400 mt-0.5">
                Authentic module assessments completed by the student.
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-full">
              {pyCompletedCount} / 7 Python Modules Verified
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Python Developer Core Trail</span>
                </span>
                <span className="text-slate-400">{Math.round((pyCompletedCount / 7) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#006cd2] to-emerald-400 transition-all duration-500"
                  style={{ width: `${Math.round((pyCompletedCount / 7) * 100)}%` }}
                />
              </div>
            </div>

            {profile.careerInterest && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-mono text-slate-400">Career Interests:</span>
                {profile.careerInterest.split(',').map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-blue-300"
                  >
                    {interest.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. 7-DAY MINI PROJECTS */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-amber-400" />
              <span>7-Day Mini Projects</span>
            </h2>
            <p className="font-sans text-xs text-slate-400 mt-0.5">
              Production mini projects built, tested, and deployed by {profile.fullName}.
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((p) => (
                <div
                  key={p.projectId}
                  className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                        {p.category || '7-Day Project'}
                      </span>
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          p.status === 'Completed'
                            ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
                            : 'text-blue-300 bg-blue-950/60 border-blue-800/40'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-white">{p.title || p.projectId}</h3>
                    {p.description && (
                      <p className="font-sans text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-850">
                    {p.githubUrl ? (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs border border-slate-800 flex items-center gap-1.5 transition"
                      >
                        <Code2 className="w-3.5 h-3.5 text-slate-300" />
                        <span>Source Code ↗</span>
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-slate-500">No Repo Link</span>
                    )}

                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs border border-[#006cd2]/40 flex items-center gap-1.5 transition shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo ↗</span>
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-slate-500">No Hosted URL</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-2 font-mono text-xs text-slate-500">
              <FolderGit2 className="w-8 h-8 text-slate-600 mx-auto" />
              <div>No projects selected yet.</div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 5. VERIFIED ACHIEVEMENTS & CONSISTENCY */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Platform Achievements &amp; Consistency</span>
            </h2>
            <p className="font-sans text-xs text-slate-400 mt-0.5">
              Milestone achievements and continuous challenge solve streak.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                <Flame className="w-6 h-6 fill-orange-400" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white">{streak} Days</div>
                <div className="font-mono text-xs text-slate-400">Current Solving Streak</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Calendar className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white">{activeDays} Days</div>
                <div className="font-mono text-xs text-slate-400">Total Active Platform Footprint</div>
              </div>
            </div>
          </div>
        </section>

        {/* Recruiter Action Footer */}
        <footer className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <h3 className="font-display text-lg font-bold text-white">Interested in {profile.fullName}?</h3>
          <p className="font-sans text-xs text-slate-400 max-w-md mx-auto">
            Connect directly with the developer for internships, full-time opportunities, or project collaborations.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            {profile.showEmailPublicly !== false && profile.contactEmail && (
              <a
                href={`mailto:${profile.contactEmail}?subject=Recruiter%20Inquiry%20via%20LevelUpDev`}
                className="px-6 py-2.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-bold rounded-xl shadow-lg shadow-[#006cd2]/30 transition"
              >
                Send Email Message
              </a>
            )}
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-sans text-xs font-bold rounded-xl border border-slate-800 transition"
              >
                View LinkedIn
              </a>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}
