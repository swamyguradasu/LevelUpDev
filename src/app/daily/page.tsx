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

  if (loading || !userData) {
    return (
      <div className="min-h-screen topo-bg flex items-center justify-center text-[#0F2E28] font-mono text-sm">
        <div className="flex items-center gap-3 bg-white/90 px-6 py-4 rounded-2xl shadow-sm border border-[#5C7A6B]/20">
          <div className="w-5 h-5 border-2 border-[#0F2E28] border-t-transparent rounded-full animate-spin" />
          <span>Loading Daily Challenge...</span>
        </div>
      </div>
    );
  }

  const [showStreakModal, setShowStreakModal] = useState(false);
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
    <div className="text-[#1A1C1B] min-h-screen flex flex-col topo-bg font-sans antialiased relative overflow-hidden select-none">
      {/* Daily Challenge Solved Celebration Modal Popup */}
      {showStreakModal && (
        <div className="fixed inset-0 bg-[#0F2E28]/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-[#5C7A6B]/30 shadow-2xl text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5C7A6B] via-[#C98A3E] to-[#E2654B]" />
            
            <div className="w-20 h-20 mx-auto rounded-full bg-[#E2654B]/15 border-2 border-[#E2654B]/40 flex items-center justify-center text-[#E2654B] shadow-inner animate-bounce">
              <Flame className="w-10 h-10 fill-current" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-800 border border-amber-500/30 text-xs font-mono font-bold rounded-full uppercase tracking-wider">
                🎉 Daily Challenge Completed!
              </span>
              <h3 className="font-display text-2xl font-extrabold text-[#0F2E28]">
                Streak Updated!
              </h3>
              <p className="font-sans text-xs text-[#5C7A6B] leading-relaxed">
                Great job solving today&apos;s algorithm challenge! Your daily streak has been updated and saved to your profile across all devices.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F2E28] text-white space-y-1">
              <div className="font-mono text-xs text-[#C98A3E] font-bold uppercase">
                Active Solve Streak
              </div>
              <div className="font-display text-4xl font-black text-white flex items-center justify-center gap-2">
                <Flame className="w-8 h-8 text-[#E2654B] fill-current" />
                <span>{userData.streak?.currentStreak || 1} Days</span>
              </div>
            </div>

            <button
              onClick={() => setShowStreakModal(false)}
              className="w-full py-3.5 bg-[#C98A3E] hover:bg-[#C98A3E]/90 text-[#0F2E28] font-sans font-bold rounded-full transition shadow-md text-sm"
            >
              Continue Practice
            </button>
          </div>
        </div>
      )}
      {/* Layer 1: Parallax Ambient Glow */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#C98A3E]/10 rounded-full blur-3xl pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
        }}
      />

      {/* Header Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#5C7A6B]/15 w-full top-0 left-0 flex justify-between items-center px-6 md:px-12 py-4 z-50 sticky">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0F2E28] flex items-center justify-center text-[#C98A3E] font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-lg text-[#0F2E28] tracking-tight">
            LevelUpDev <span className="text-[#5C7A6B] font-mono text-xs font-normal">/ Trail Tracker</span>
          </span>
        </div>

        <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
          <Link className="text-[#414846] hover:text-[#0F2E28] transition" href="/home">
            Portfolio
          </Link>
          <Link className="text-[#414846] hover:text-[#0F2E28] transition" href="/skills/python">
            Skill Trails
          </Link>
          <Link className="text-[#0F2E28] font-semibold hover:text-[#C98A3E] transition" href="/daily">
            Daily Challenge
          </Link>
          <Link className="text-[#414846] hover:text-[#0F2E28] transition" href="/leaderboard">
            Leaderboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E2654B] text-white rounded-full text-xs font-mono font-bold shadow-sm">
            <Flame className="w-3.5 h-3.5 fill-white" />
            <span>{userData.streak?.currentStreak || 1} Day Streak</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl hover:bg-red-50 text-red-600 transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-12 py-8 space-y-10">
        {/* Banner */}
        <section className="w-full bg-[#0F2E28] text-white rounded-3xl p-6 md:p-8 shadow-md border border-[#5C7A6B]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C98A3E]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#E2654B]/20 border border-[#E2654B]/40 flex items-center justify-center text-[#E2654B] shrink-0">
              <Flame className="w-7 h-7 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#C98A3E] uppercase tracking-wider">
                  DAILY PRACTICE • {todayStr}
                </span>
              </div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-white mt-0.5 tracking-tight">
                Daily DSA &amp; Algorithm Challenge
              </h1>
              <p className="font-sans text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed mt-1">
                Solve today&apos;s curated problem on LeetCode, paste your code solution below to mark it completed, and build your consistency streak!
              </p>
            </div>
          </div>

          <div className="shrink-0 relative z-10">
            {submittedToday ? (
              <span className="px-4 py-2 bg-[#5C7A6B]/30 border border-[#5C7A6B]/50 text-white text-xs font-mono font-bold rounded-full flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C98A3E]" /> Solved Today!
              </span>
            ) : (
              <span className="px-4 py-2 bg-[#C98A3E]/20 border border-[#C98A3E]/40 text-[#C98A3E] text-xs font-mono font-bold rounded-full flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C98A3E]" /> Challenge Active
              </span>
            )}
          </div>
        </section>

        {/* Challenge Details & Submission Card */}
        {challenge && (
          <section className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-[#5C7A6B]/20 shadow-[0_4px_20px_rgba(15,46,40,0.06)] space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#5C7A6B]/15 pb-5">
              <div>
                <span className="font-mono text-[11px] font-bold text-[#5C7A6B] uppercase tracking-wider">
                  CURRENT PROBLEM
                </span>
                <h2 className="font-display text-2xl font-bold text-[#0F2E28] mt-0.5">
                  {challenge.title}
                </h2>
              </div>

              <a
                href={challenge.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#C98A3E] hover:bg-[#C98A3E]/90 text-[#0F2E28] font-sans font-semibold text-xs rounded-full transition shadow-sm flex items-center gap-2 shrink-0"
              >
                <span>Open Problem on LeetCode</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Notes / Instructions */}
            <div className="space-y-2">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F2E28] flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#C98A3E]" />
                <span>Problem Description &amp; Constraints</span>
              </h3>
              <div className="p-5 rounded-2xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/20 font-sans text-xs md:text-sm text-[#414846] leading-relaxed">
                {challenge.notes}
              </div>
            </div>

            {/* Code Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="font-mono text-xs font-bold text-[#0F2E28] flex items-center gap-2 uppercase">
                  <Terminal className="w-4 h-4 text-[#C98A3E]" />
                  <span>Paste Working Solution Code</span>
                </label>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  required
                  rows={7}
                  placeholder="# Paste your Python, C++, Java, or JavaScript solution here..."
                  className="w-full p-4 rounded-2xl bg-[#EDF2ED]/60 border border-[#5C7A6B]/30 font-mono text-xs text-[#0F2E28] placeholder-[#5C7A6B]/60 focus:outline-none focus:border-[#C98A3E]"
                />
              </div>

              {submittedToday && (
                <div className="p-4 rounded-2xl bg-[#EDF2ED] border border-[#5C7A6B]/30 text-[#0F2E28] font-mono text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C98A3E] shrink-0" />
                  <span>Daily solve recorded! Great consistency on today&apos;s algorithm puzzle.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto px-8 py-3 bg-[#C98A3E] text-[#0F2E28] font-sans font-semibold rounded-full hover:bg-[#C98A3E]/90 transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
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
        <section className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-[#5C7A6B]/20 shadow-[0_4px_20px_rgba(15,46,40,0.06)] space-y-6">
          <div className="flex items-center justify-between border-b border-[#5C7A6B]/15 pb-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0F2E28] flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#E2654B]" />
                <span>Daily Streak Heatmap</span>
              </h2>
              <p className="font-sans text-xs text-[#5C7A6B] mt-0.5">
                Visual log of your daily problem-solving activity.
              </p>
            </div>
            <span className="font-mono text-xs px-3 py-1 bg-[#EDF2ED] text-[#0F2E28] rounded-full border border-[#5C7A6B]/20">
              SOLVE HISTORY
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#EDF2ED]/40 border border-[#5C7A6B]/20">
            <HeatmapCalendar solvedDates={userData.streak?.solvedDates || []} compact={false} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-transparent text-[#414846] font-mono text-xs w-full flex flex-col md:flex-row justify-between items-center gap-4 py-8 px-6 md:px-12 mt-auto border-t border-[#5C7A6B]/15">
        <div>© 2024 Engineering Skill Trail. All rights reserved.</div>
        <div className="flex gap-4">
          <a className="hover:text-[#0F2E28] transition-colors" href="#">
            Privacy Policy
          </a>
          <span>•</span>
          <a className="hover:text-[#0F2E28] transition-colors" href="#">
            Support
          </a>
        </div>
      </footer>
    </div>
  );
}

