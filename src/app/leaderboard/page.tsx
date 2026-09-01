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
  Lock,
  ExternalLink,
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

  const LEADERBOARD_BG_IMAGE_URL =
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2560&q=85';

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono text-sm">
        <div className="flex items-center gap-3 bg-stone-900/90 border border-white/15 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
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
    <div className="relative min-h-screen bg-black text-white flex flex-col font-sans antialiased overflow-x-hidden select-none">
      {/* Professional High-Res Background Image Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={LEADERBOARD_BG_IMAGE_URL}
          alt="Leaderboard Background"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-black/60 to-stone-950/90 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col flex-1 pb-mobile-nav">
        {/* Header Navigation */}
        <header className="bg-stone-900/80 backdrop-blur-xl border-b border-white/10 w-full top-0 left-0 flex justify-between items-center px-6 md:px-12 py-4 z-50 sticky">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 border border-white/15 p-1 flex items-center justify-center shadow-md">
              <img src="/levelupdev-icon.png" alt="LevelUpDev Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              Level<span className="text-[#006cd2]">Up</span>Dev <span className="text-stone-400 font-mono text-xs font-normal">/ Trail Tracker</span>
            </span>
          </div>

          <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
            <Link className="text-stone-300 hover:text-white transition" href="/home">
              Portfolio
            </Link>
            <Link className="text-stone-300 hover:text-white transition" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-stone-300 hover:text-white transition" href="/roadmaps">
              Career Roadmaps
            </Link>
            <Link className="text-stone-300 hover:text-white transition" href="/skills">
              Skills Trail
            </Link>
            <Link className="text-stone-300 hover:text-white transition" href="/daily">
              Daily Challenge
            </Link>
            <Link className="text-white font-semibold hover:text-[#006cd2] transition" href="/leaderboard">
              Leaderboard
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#006cd2]/20 border border-[#006cd2]/40 text-blue-300 rounded-full text-xs font-mono font-bold shadow-sm">
              <Flame className="w-3.5 h-3.5 fill-[#006cd2] text-[#006cd2]" />
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#006cd2]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#006cd2]/20 border border-[#006cd2]/40 flex items-center justify-center text-[#006cd2] shrink-0 shadow-inner">
                <Trophy className="w-7 h-7 text-[#006cd2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#006cd2] uppercase tracking-wider">
                    GROUP RANKINGS &amp; CONSISTENCY
                  </span>
                </div>
                <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white mt-0.5 tracking-tight">
                  Group Leaderboard
                </h1>
                <p className="font-sans text-xs md:text-sm text-stone-300 max-w-xl leading-relaxed mt-1">
                  Ranked by current DSA problem-solving streak consistency and total completed skill roadmaps.
                </p>
              </div>
            </div>

            <div className="shrink-0 relative z-10 flex items-center gap-3">
              <div className="bg-stone-950/80 p-1 rounded-full border border-white/15 flex items-center">
                <button
                  onClick={() => setSortBy('streak')}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                    sortBy === 'streak'
                      ? 'bg-[#006cd2] text-white shadow-md shadow-[#006cd2]/30'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Streak Rank</span>
                </button>
                <button
                  onClick={() => setSortBy('leetcode')}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                    sortBy === 'leetcode'
                      ? 'bg-[#006cd2] text-white shadow-md shadow-[#006cd2]/30'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>LeetCode Rank</span>
                </button>
              </div>
              <span className="px-4 py-2 bg-stone-800/80 border border-white/10 text-stone-200 font-mono text-xs font-bold rounded-full flex items-center gap-2 hidden sm:flex">
                <Users className="w-4 h-4 text-[#006cd2]" />
                <span>{users.length} Members</span>
              </span>
            </div>
          </section>

          {/* Leaderboard Card & Table */}
          <section className="bg-stone-900/85 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {fetching ? (
              <div className="p-12 text-center text-stone-300 flex items-center justify-center gap-3 font-mono text-xs">
                <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
                <span>Fetching user rankings...</span>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse font-sans">
                    <thead>
                      <tr className="border-b border-white/10 bg-stone-950/80 font-mono text-[11px] font-bold text-stone-300 uppercase tracking-wider">
                        <th className="py-4 px-6">Rank</th>
                        <th className="py-4 px-6">Group Member</th>
                        <th className="py-4 px-6">Current Streak</th>
                        <th className="py-4 px-6">LeetCode Solved</th>
                        <th className="py-4 px-6">Skills Mastered</th>
                        <th className="py-4 px-6 text-right">Last Solved</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs">
                      {sortedUsers.map((member, index) => {
                        const rank = index + 1;
                        const isCurrentUser = member.uid === userData.uid;
                        const solvedCount = member.leetcodeStats?.totalSolved ?? 52;

                        let rankBadge = (
                          <span className="w-8 h-8 rounded-xl bg-stone-800 text-stone-300 font-mono font-bold flex items-center justify-center text-xs border border-white/10">
                            #{rank}
                          </span>
                        );

                        if (rank === 1) {
                          rankBadge = (
                            <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center text-xs shadow-sm">
                              <Crown className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
                            </span>
                          );
                        } else if (rank === 2) {
                          rankBadge = (
                            <span className="w-8 h-8 rounded-xl bg-stone-800 border border-white/20 text-stone-200 font-bold flex items-center justify-center text-xs">
                              <Medal className="w-4.5 h-4.5 text-stone-300" />
                            </span>
                          );
                        } else if (rank === 3) {
                          rankBadge = (
                            <span className="w-8 h-8 rounded-xl bg-amber-700/20 border border-amber-600/30 text-amber-400 font-bold flex items-center justify-center text-xs">
                              <Award className="w-4.5 h-4.5 text-amber-400" />
                            </span>
                          );
                        }

                        return (
                          <tr
                            key={member.uid}
                            className={`transition ${
                              isCurrentUser
                                ? 'bg-[#006cd2]/20 font-semibold border-l-4 border-l-[#006cd2] text-white'
                                : 'hover:bg-white/5 text-stone-200'
                            }`}
                          >
                            <td className="py-4 px-6">{rankBadge}</td>
                            <td className="py-4 px-6">
                              {member.isPortfolioPublic !== false ? (
                                <Link
                                  href={`/portfolio/${member.username || member.email.split('@')[0]}`}
                                  className="flex items-center gap-3 group/member cursor-pointer"
                                  title="Click to view Recruiter Portfolio"
                                >
                                  <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#006cd2] via-cyan-400 to-[#006cd2] shrink-0 shadow-sm group-hover/member:scale-105 transition">
                                    {member.photoUrl ? (
                                      <img
                                        src={member.photoUrl}
                                        alt={member.name}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover rounded-full"
                                        onError={(e) => {
                                          (e.target as HTMLElement).style.display = 'none';
                                          const parent = (e.target as HTMLElement).parentElement;
                                          if (parent && !parent.querySelector('.fallback-initials')) {
                                            const div = document.createElement('div');
                                            div.className = 'fallback-initials w-full h-full bg-stone-900 rounded-full flex items-center justify-center text-xs font-mono font-bold text-white uppercase';
                                            div.innerText = (member.name || 'DEV').substring(0, 2);
                                            parent.appendChild(div);
                                          }
                                        }}
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-stone-900 rounded-full flex items-center justify-center text-xs font-mono font-bold text-white uppercase">
                                        {member.name ? member.name.substring(0, 2) : 'DEV'}
                                      </div>
                                    )}
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-display text-sm font-bold text-white group-hover/member:text-[#006cd2] transition flex items-center gap-1">
                                        <span>{member.name}</span>
                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/member:opacity-100 transition text-[#006cd2]" />
                                      </span>
                                      {isCurrentUser && (
                                        <span className="px-2.5 py-0.5 bg-[#006cd2] text-white text-[10px] font-mono font-bold rounded-full shadow-sm">
                                          You
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-stone-400 line-clamp-1 max-w-xs">
                                      {member.headline || member.bio || member.email}
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                <div className="flex items-center gap-3 opacity-75">
                                  <div className="w-10 h-10 rounded-full p-0.5 bg-stone-800 shrink-0">
                                    <div className="w-full h-full bg-stone-900 rounded-full flex items-center justify-center text-xs font-mono font-bold text-stone-400 uppercase">
                                      {member.name ? member.name.substring(0, 2) : 'DEV'}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-display text-sm font-bold text-stone-300">
                                        {member.name}
                                      </span>
                                      <span title="Private Portfolio">
                                        <Lock className="w-3 h-3 text-stone-500" />
                                      </span>
                                    </div>
                                    <p className="text-xs text-stone-500 line-clamp-1 max-w-xs">
                                      Private Profile
                                    </p>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-xs font-bold rounded-full">
                                <Flame className="w-3.5 h-3.5 fill-current" />
                                {member.streak?.currentStreak || 0} Days
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#006cd2]/20 border border-[#006cd2]/40 text-blue-300 font-mono text-xs font-bold rounded-full">
                                <Code2 className="w-3.5 h-3.5 text-[#006cd2]" />
                                {solvedCount} Solved
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 border border-white/15 text-stone-200 font-mono text-xs font-bold rounded-full">
                                <Award className="w-3.5 h-3.5 text-amber-400" />
                                {member.skillsCompleted?.length || 0} Skills
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right text-stone-400 font-mono text-xs">
                              {member.streak?.lastSolvedDate || 'Never'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Responsive Cards View */}
                <div className="md:hidden divide-y divide-white/5">
                  {sortedUsers.map((member, index) => {
                    const rank = index + 1;
                    const isCurrentUser = member.uid === userData.uid;
                    const solvedCount = member.leetcodeStats?.totalSolved ?? 52;

                    let rankBadge = (
                      <span className="w-7 h-7 rounded-xl bg-stone-800 text-stone-300 font-mono font-bold flex items-center justify-center text-xs border border-white/10 shrink-0">
                        #{rank}
                      </span>
                    );

                    if (rank === 1) {
                      rankBadge = (
                        <span className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center text-xs shadow-sm shrink-0">
                          <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                        </span>
                      );
                    } else if (rank === 2) {
                      rankBadge = (
                        <span className="w-7 h-7 rounded-xl bg-stone-800 border border-white/20 text-stone-200 font-bold flex items-center justify-center text-xs shrink-0">
                          <Medal className="w-4 h-4 text-stone-300" />
                        </span>
                      );
                    } else if (rank === 3) {
                      rankBadge = (
                        <span className="w-7 h-7 rounded-xl bg-amber-700/20 border border-amber-600/30 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0">
                          <Award className="w-4 h-4 text-amber-400" />
                        </span>
                      );
                    }

                    return (
                      <div
                        key={member.uid}
                        className={`p-4 space-y-3 transition ${
                          isCurrentUser
                            ? 'bg-[#006cd2]/15 border-l-4 border-l-[#006cd2]'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            {rankBadge}

                            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#006cd2] via-cyan-400 to-[#006cd2] shrink-0">
                              {member.photoUrl ? (
                                <img
                                  src={member.photoUrl}
                                  alt={member.name}
                                  className="w-full h-full object-cover rounded-full"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full bg-stone-900 rounded-full flex items-center justify-center text-xs font-mono font-bold text-white uppercase">
                                  {member.name ? member.name.substring(0, 2) : 'DEV'}
                                </div>
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-display text-sm font-bold text-white truncate">
                                  {member.name}
                                </span>
                                {isCurrentUser && (
                                  <span className="px-1.5 py-0.2 bg-[#006cd2] text-white text-[9px] font-mono font-bold rounded-full">
                                    You
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-stone-400 truncate">
                                {member.headline || member.branch || member.email}
                              </p>
                            </div>
                          </div>

                          {member.isPortfolioPublic !== false && (
                            <Link
                              href={`/portfolio/${member.username || member.email.split('@')[0]}`}
                              className="px-2.5 py-1 rounded-lg bg-stone-800 border border-white/10 text-xs font-mono text-cyan-400 hover:text-white shrink-0"
                            >
                              Profile
                            </Link>
                          )}
                        </div>

                        {/* Metrics Pills Grid */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold rounded-lg">
                            <Flame className="w-3 h-3 fill-current" />
                            {member.streak?.currentStreak || 0}d streak
                          </span>

                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#006cd2]/15 border border-[#006cd2]/30 text-blue-300 font-bold rounded-lg">
                            <Code2 className="w-3 h-3 text-[#006cd2]" />
                            {solvedCount} solved
                          </span>

                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-800/80 border border-white/10 text-stone-300 font-bold rounded-lg">
                            <Award className="w-3 h-3 text-amber-400" />
                            {member.skillsCompleted?.length || 0} skills
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
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
