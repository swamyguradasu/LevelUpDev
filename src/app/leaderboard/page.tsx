'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, UserProfileData } from '@/context/AuthContext';
import { fetchLeaderboardUsers } from '@/lib/leaderboard';
import {
  Flame,
  Trophy,
  Award,
  Crown,
  Medal,
  Users,
  Compass,
  LogOut,
  Code2,
} from 'lucide-react';

export default function LeaderboardPage() {
  const { userData, loading, logout } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<UserProfileData[]>([]);
  const [fetching, setFetching] = useState(true);
  const [sortBy, setSortBy] = useState<'streak' | 'leetcode'>('streak');

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
    async function loadData() {
      if (userData) {
        setFetching(true);
        const data = await fetchLeaderboardUsers(userData);
        setUsers(data);
        setFetching(false);
      }
    }
    loadData();
  }, [userData]);

  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === 'leetcode') {
      const aSolved = a.leetcodeStats?.totalSolved ?? 52;
      const bSolved = b.leetcodeStats?.totalSolved ?? 52;
      if (bSolved !== aSolved) return bSolved - aSolved;
    }
    const streakA = a.streak?.currentStreak || 0;
    const streakB = b.streak?.currentStreak || 0;
    return streakB - streakA;
  });

  if (loading || !userData) {
    return (
      <div className="min-h-screen topo-bg flex items-center justify-center text-[#0F2E28] font-mono text-sm">
        <div className="flex items-center gap-3 bg-white/90 px-6 py-4 rounded-2xl shadow-sm border border-[#5C7A6B]/20">
          <div className="w-5 h-5 border-2 border-[#0F2E28] border-t-transparent rounded-full animate-spin" />
          <span>Loading Leaderboard...</span>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="text-[#1A1C1B] min-h-screen flex flex-col topo-bg font-sans antialiased relative overflow-hidden select-none">
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
          <Link className="text-[#414846] hover:text-[#0F2E28] transition" href="/daily">
            Daily Challenge
          </Link>
          <Link className="text-[#0F2E28] font-semibold hover:text-[#C98A3E] transition" href="/leaderboard">
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
            <div className="w-14 h-14 rounded-2xl bg-[#C98A3E]/20 border border-[#C98A3E]/40 flex items-center justify-center text-[#C98A3E] shrink-0">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#C98A3E] uppercase tracking-wider">
                  GROUP RANKINGS &amp; CONSISTENCY
                </span>
              </div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-white mt-0.5 tracking-tight">
                Group Leaderboard
              </h1>
              <p className="font-sans text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed mt-1">
                Ranked by current DSA problem-solving streak consistency and total completed skill roadmaps.
              </p>
            </div>
          </div>

          <div className="shrink-0 relative z-10 flex items-center gap-3">
            <div className="bg-white/10 p-1 rounded-full border border-white/20 flex items-center">
              <button
                onClick={() => setSortBy('streak')}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                  sortBy === 'streak'
                    ? 'bg-[#C98A3E] text-[#0F2E28] shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Streak Rank</span>
              </button>
              <button
                onClick={() => setSortBy('leetcode')}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                  sortBy === 'leetcode'
                    ? 'bg-[#C98A3E] text-[#0F2E28] shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>LeetCode Rank</span>
              </button>
            </div>
            <span className="px-4 py-2 bg-[#5C7A6B]/30 border border-[#5C7A6B]/50 text-white font-mono text-xs font-bold rounded-full flex items-center gap-2 hidden sm:flex">
              <Users className="w-4 h-4 text-[#C98A3E]" />
              <span>{users.length} Members</span>
            </span>
          </div>
        </section>

        {/* Leaderboard Card & Table */}
        <section className="bg-white/90 backdrop-blur-md rounded-3xl border border-[#5C7A6B]/20 shadow-[0_4px_20px_rgba(15,46,40,0.06)] overflow-hidden">
          {fetching ? (
            <div className="p-12 text-center text-[#5C7A6B] flex items-center justify-center gap-3 font-mono text-xs">
              <div className="w-5 h-5 border-2 border-[#0F2E28] border-t-transparent rounded-full animate-spin" />
              <span>Fetching user rankings...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans">
                <thead>
                  <tr className="border-b border-[#5C7A6B]/20 bg-[#EDF2ED]/60 font-mono text-[11px] font-bold text-[#0F2E28] uppercase tracking-wider">
                    <th className="py-4 px-6">Rank</th>
                    <th className="py-4 px-6">Group Member</th>
                    <th className="py-4 px-6">Current Streak</th>
                    <th className="py-4 px-6">LeetCode Solved</th>
                    <th className="py-4 px-6">Skills Mastered</th>
                    <th className="py-4 px-6 text-right">Last Solved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#5C7A6B]/15 text-xs">
                  {sortedUsers.map((member, index) => {
                    const rank = index + 1;
                    const isCurrentUser = member.uid === userData.uid;
                    const solvedCount = member.leetcodeStats?.totalSolved ?? 52;

                    // Rank Badges
                    let rankBadge = (
                      <span className="w-8 h-8 rounded-xl bg-[#EDF2ED] text-[#414846] font-mono font-bold flex items-center justify-center text-xs border border-[#5C7A6B]/20">
                        #{rank}
                      </span>
                    );

                    if (rank === 1) {
                      rankBadge = (
                        <span className="w-8 h-8 rounded-xl bg-[#C98A3E]/20 border border-[#C98A3E]/40 text-[#0F2E28] font-bold flex items-center justify-center text-xs shadow-sm">
                          <Crown className="w-4.5 h-4.5 text-[#C98A3E] fill-[#C98A3E]" />
                        </span>
                      );
                    } else if (rank === 2) {
                      rankBadge = (
                        <span className="w-8 h-8 rounded-xl bg-[#EDF2ED] border border-[#5C7A6B]/40 text-[#0F2E28] font-bold flex items-center justify-center text-xs">
                          <Medal className="w-4.5 h-4.5 text-[#5C7A6B]" />
                        </span>
                      );
                    } else if (rank === 3) {
                      rankBadge = (
                        <span className="w-8 h-8 rounded-xl bg-[#E2654B]/15 border border-[#E2654B]/30 text-[#E2654B] font-bold flex items-center justify-center text-xs">
                          <Award className="w-4.5 h-4.5 text-[#E2654B]" />
                        </span>
                      );
                    }

                    return (
                      <tr
                        key={member.uid}
                        className={`transition ${
                          isCurrentUser
                            ? 'bg-[#C98A3E]/10 font-semibold border-l-4 border-l-[#C98A3E]'
                            : 'hover:bg-[#EDF2ED]/50'
                        }`}
                      >
                        {/* Rank */}
                        <td className="py-4 px-6">{rankBadge}</td>

                        {/* User Details */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#5C7A6B] via-[#C98A3E] to-[#5C7A6B] shrink-0 shadow-sm">
                              {member.photoUrl ? (
                                <img
                                  src={member.photoUrl}
                                  alt={member.name}
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xs font-mono font-bold text-[#0F2E28] uppercase">
                                  {member.name ? member.name.substring(0, 2) : 'DEV'}
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-display text-sm font-bold text-[#0F2E28]">
                                  {member.name}
                                </span>
                                {isCurrentUser && (
                                  <span className="px-2.5 py-0.5 bg-[#C98A3E] text-[#0F2E28] text-[10px] font-mono font-bold rounded-full">
                                    You
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#5C7A6B] line-clamp-1 max-w-xs">
                                {member.headline || member.bio || member.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Streak */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E2654B]/15 border border-[#E2654B]/30 text-[#E2654B] font-mono text-xs font-bold rounded-full">
                            <Flame className="w-3.5 h-3.5 fill-current" />
                            {member.streak?.currentStreak || 0} Days
                          </span>
                        </td>

                        {/* LeetCode Solved */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-900 font-mono text-xs font-bold rounded-full">
                            <Code2 className="w-3.5 h-3.5 text-[#C98A3E]" />
                            {solvedCount} Solved
                          </span>
                        </td>

                        {/* Skills Mastered */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EDF2ED] border border-[#5C7A6B]/25 text-[#0F2E28] font-mono text-xs font-bold rounded-full">
                            <Award className="w-3.5 h-3.5 text-[#C98A3E]" />
                            {member.skillsCompleted?.length || 0} Skills
                          </span>
                        </td>

                        {/* Last Solved */}
                        <td className="py-4 px-6 text-right text-[#5C7A6B] font-mono text-xs">
                          {member.streak?.lastSolvedDate || 'Never'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
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

