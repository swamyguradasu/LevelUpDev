'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getDailyChallenge, DailyChallenge } from '@/lib/content';
import { HeatmapCalendar } from '@/components/HeatmapCalendar';
import {
  Flame,
  ExternalLink,
  Code2,
  CheckCircle2,
  Sparkles,
  Send,
  Calendar,
  Terminal,
  Compass,
  Settings,
  LogOut,
} from 'lucide-react';

export default function DailyChallengePage() {
  const { userData, loading, recordDailySolve, logout } = useAuth();
  const router = useRouter();

  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [userCode, setUserCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedToday, setSubmittedToday] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);

  // Parallax backdrop
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const data = getDailyChallenge(todayStr);
    setChallenge(data);

    if (userData?.streak?.solvedDates?.includes(todayStr)) {
      setSubmittedToday(true);
    }
  }, [userData]);

  const PALOMAR_VIDEO_URL =
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260820_010308_b1636845-4c15-4ab6-b0c9-9a29bfb0c6e3.mp4';

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono text-sm">
        <div className="flex items-center gap-3 bg-stone-900/90 border border-white/15 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl">
          <div className="w-5 h-5 border-2 border-[#e8702a] border-t-transparent rounded-full animate-spin" />
          <span>Loading Daily Challenge...</span>
        </div>
      </div>
    );
  }

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await recordDailySolve(todayStr);
    setSubmittedToday(true);
    setSubmitting(false);
    setShowStreakModal(true);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col font-sans antialiased overflow-x-hidden select-none">
      {/* Palomar Video Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          src={PALOMAR_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col flex-1">
        {/* Daily Challenge Solved Celebration Modal Popup */}
        {showStreakModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-stone-950/95 rounded-3xl p-8 max-w-md w-full border border-white/15 shadow-2xl text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#e8702a] via-amber-400 to-[#e8702a]" />

              <div className="w-20 h-20 mx-auto rounded-full bg-[#e8702a]/20 border-2 border-[#e8702a]/40 flex items-center justify-center text-[#e8702a] shadow-inner animate-bounce">
                <Flame className="w-10 h-10 fill-current" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 bg-[#e8702a]/20 text-amber-300 border border-[#e8702a]/40 text-xs font-mono font-bold rounded-full uppercase tracking-wider">
                  🎉 Daily Challenge Completed!
                </span>
                <h3 className="font-display text-2xl font-extrabold text-white">
                  Streak Updated!
                </h3>
                <p className="font-sans text-xs text-stone-300 leading-relaxed">
                  Great job solving today&apos;s algorithm challenge! Your daily streak has been updated and saved to your profile across all devices.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900 text-white border border-white/10 space-y-1">
                <div className="font-mono text-xs text-[#e8702a] font-bold uppercase">
                  Active Solve Streak
                </div>
                <div className="font-display text-4xl font-black text-white flex items-center justify-center gap-2">
                  <Flame className="w-8 h-8 text-[#e8702a] fill-current" />
                  <span>{userData.streak?.currentStreak || 1} Days</span>
                </div>
              </div>

              <button
                onClick={() => setShowStreakModal(false)}
                className="w-full py-3.5 bg-[#e8702a] hover:bg-[#d2611f] text-white font-sans font-bold rounded-full transition shadow-lg shadow-[#e8702a]/30 text-sm"
              >
                Continue Practice
              </button>
            </div>
          </div>
        )}

        {/* Header Navigation */}
        <header className="bg-stone-900/80 backdrop-blur-xl border-b border-white/10 w-full top-0 left-0 flex justify-between items-center px-6 md:px-12 py-4 z-50 sticky">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 border border-white/15 p-1 flex items-center justify-center shadow-md">
              <img src="/levelupdev-icon.png" alt="LevelUpDev Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              LevelUpDev <span className="text-stone-400 font-mono text-xs font-normal">/ Trail Tracker</span>
            </span>
          </div>

          <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
            <Link className="text-stone-300 hover:text-white transition" href="/home">
              Portfolio
            </Link>
            <Link className="text-stone-300 hover:text-white transition" href="/skills/python">
              Skill Trails
            </Link>
            <Link className="text-white font-semibold hover:text-[#e8702a] transition" href="/daily">
              Daily Challenge
            </Link>
            <Link className="text-stone-300 hover:text-white transition" href="/leaderboard">
              Leaderboard
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#e8702a]/20 border border-[#e8702a]/40 text-amber-300 rounded-full text-xs font-mono font-bold shadow-sm">
              <Flame className="w-3.5 h-3.5 fill-[#e8702a] text-[#e8702a]" />
              <span>{userData.streak?.currentStreak || 1} Day Streak</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl hover:bg-rose-500/20 text-rose-400 transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Container */}
        <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-12 py-8 space-y-10">
          {/* Banner */}
          <section className="w-full bg-stone-900/85 backdrop-blur-xl text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8702a]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#e8702a]/20 border border-[#e8702a]/40 flex items-center justify-center text-[#e8702a] shrink-0 shadow-inner">
                <Flame className="w-7 h-7 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#e8702a] uppercase tracking-wider">
                    DAILY PRACTICE • {todayStr}
                  </span>
                </div>
                <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white mt-0.5 tracking-tight">
                  Daily DSA &amp; Algorithm Challenge
                </h1>
                <p className="font-sans text-xs md:text-sm text-stone-300 max-w-xl leading-relaxed mt-1">
                  Solve today&apos;s curated problem on LeetCode, paste your code solution below to mark it completed, and build your consistency streak!
                </p>
              </div>
            </div>

            <div className="shrink-0 relative z-10">
              {submittedToday ? (
                <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold rounded-full flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Solved Today!
                </span>
              ) : (
                <span className="px-4 py-2 bg-[#e8702a]/20 border border-[#e8702a]/40 text-amber-300 text-xs font-mono font-bold rounded-full flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#e8702a]" /> Challenge Active
                </span>
              )}
            </div>
          </section>

          {/* Challenge Details & Submission Card */}
          {challenge && (
            <section className="bg-stone-900/85 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="font-mono text-[11px] font-bold text-[#e8702a] uppercase tracking-wider">
                    CURRENT PROBLEM
                  </span>
                  <h2 className="font-display text-2xl font-extrabold text-white mt-0.5">
                    {challenge.title}
                  </h2>
                </div>

                <a
                  href={challenge.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#e8702a] hover:bg-[#d2611f] text-white font-sans font-semibold text-xs rounded-full transition shadow-lg shadow-[#e8702a]/30 flex items-center gap-2 shrink-0"
                >
                  <span>Open Problem on LeetCode</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Notes / Instructions */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#e8702a]" />
                  <span>Problem Description &amp; Constraints</span>
                </h3>
                <div className="p-5 rounded-2xl bg-stone-950/70 border border-white/10 font-sans text-xs md:text-sm text-stone-300 leading-relaxed">
                  {challenge.notes}
                </div>
              </div>

              {/* Code Submission Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold text-white flex items-center gap-2 uppercase">
                    <Terminal className="w-4 h-4 text-[#e8702a]" />
                    <span>Paste Working Solution Code</span>
                  </label>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    required
                    rows={7}
                    placeholder="# Paste your Python, C++, Java, or JavaScript solution here..."
                    className="w-full p-4 rounded-2xl bg-stone-950/80 border border-white/15 font-mono text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#e8702a] focus:ring-1 focus:ring-[#e8702a]"
                  />
                </div>

                {submittedToday && (
                  <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Daily solve recorded! Great consistency on today&apos;s algorithm puzzle.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full md:w-auto px-8 py-3.5 bg-[#e8702a] text-white font-sans font-semibold rounded-full hover:bg-[#d2611f] transition shadow-lg shadow-[#e8702a]/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {submitting
                      ? 'Submitting...'
                      : submittedToday
                      ? 'Update Submitted Solution'
                      : 'Submit Daily Solution'}
                  </span>
                </button>
              </form>
            </section>
          )}

          {/* Heatmap Calendar Section */}
          <section className="bg-stone-900/85 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#e8702a]" />
                  <span>Daily Streak Heatmap</span>
                </h2>
                <p className="font-sans text-xs text-stone-400 mt-0.5">
                  Visual log of your daily problem-solving activity.
                </p>
              </div>
              <span className="font-mono text-xs px-3 py-1 bg-stone-800 text-stone-300 rounded-full border border-white/10">
                SOLVE HISTORY
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-stone-950/70 border border-white/10 text-white">
              <HeatmapCalendar solvedDates={userData.streak?.solvedDates || []} compact={false} />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-transparent text-stone-400 font-mono text-xs w-full flex flex-col md:flex-row justify-between items-center gap-4 py-8 px-6 md:px-12 mt-auto border-t border-white/10">
          <div>© 2024 Engineering Skill Trail. All rights reserved.</div>
          <div className="flex gap-4">
            <a className="hover:text-white transition-colors" href="#">
              Privacy Policy
            </a>
            <span>•</span>
            <a className="hover:text-white transition-colors" href="#">
              Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

