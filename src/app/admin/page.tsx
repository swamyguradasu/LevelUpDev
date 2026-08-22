'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, UserProfileData } from '@/context/AuthContext';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { fetchLeaderboardUsers } from '@/lib/leaderboard';
import { isAdminEmail } from '@/lib/content';
import {
  ArrowLeft,
  Download,
  Users,
  Award,
  Flame,
  Calendar,
  Search,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  Code2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { userData, loading } = useAuth();
  const router = useRouter();

  const [usersList, setUsersList] = useState<UserProfileData[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Load all user documents from Firestore or CSV roster
  const loadUsers = async () => {
    setFetching(true);
    let loaded: UserProfileData[] = [];

    if (isFirebaseConfigured) {
      try {
        const q = query(collection(db, 'users'));
        const snap = await getDocs(q);
        snap.forEach((docSnap) => {
          loaded.push(docSnap.data() as UserProfileData);
        });
      } catch (err) {
        console.warn('Admin: Failed to fetch Firestore users, using CSV roster fallback:', err);
      }
    }

    if (loaded.length === 0) {
      loaded = await fetchLeaderboardUsers(userData);
    }

    loaded.sort((a, b) => (b.joinedDate || '').localeCompare(a.joinedDate || ''));
    setUsersList(loaded);
    setFetching(false);
  };

  useEffect(() => {
    if (userData && isAdminEmail(userData.email || '')) {
      loadUsers();
    }
  }, [userData]);

  if (loading) {
    return (
      <div className="min-h-screen topo-bg flex items-center justify-center font-mono text-sm text-[#5C7A6B]">
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-[#5C7A6B]/20">
          <div className="w-5 h-5 border-2 border-[#5C7A6B] border-t-transparent rounded-full animate-spin" />
          <span>Verifying Admin Credentials...</span>
        </div>
      </div>
    );
  }

  // Explicit Access Denied screen showing WHY access was rejected
  if (!userData || !isAdminEmail(userData.email || '')) {
    return (
      <div className="min-h-screen topo-bg text-[#0F2E28] flex flex-col items-center justify-center p-6 select-none">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl p-8 rounded-3xl shadow-xl border border-red-500/30 text-center space-y-5 relative overflow-hidden">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto text-red-600">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-[#0F2E28]">Access Denied</h2>
            <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20 text-xs text-red-800 font-sans leading-relaxed text-left">
              <strong>Reason:</strong> Your email address <code className="font-mono bg-white px-1.5 py-0.5 rounded text-red-900 font-bold">&quot;{userData?.email || 'Guest'}&quot;</code> is not listed in <code className="font-mono bg-white px-1.5 py-0.5 rounded text-red-900 font-bold">content/admin-emails.json</code>.
            </div>
          </div>
          <p className="font-sans text-xs text-[#414846] leading-relaxed">
            Only authorized administrator emails listed in <code className="font-mono text-[#0F2E28]">content/admin-emails.json</code> can access this dashboard.
          </p>
          <Link
            href="/home"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#0F2E28] text-white font-sans text-xs font-semibold rounded-full hover:bg-[#5C7A6B] transition shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Profile Page
          </Link>
        </div>
      </div>
    );
  }

  // Filtered users for search query
  const filteredUsers = usersList.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.college || '').toLowerCase().includes(q) ||
      (u.headline || '').toLowerCase().includes(q)
    );
  });

  // Client-Side CSV Export Function
  const handleDownloadCSV = () => {
    if (filteredUsers.length === 0) return;

    const headers = [
      'UID',
      'Name',
      'Email',
      'College',
      'Branch',
      'LeetCode ID',
      'LeetCode Solved',
      'Skills Completed',
      'Current Streak',
      'Last Active Date',
      'Joined Date',
      'Selected Project',
    ];

    const csvRows = [headers.join(',')];

    filteredUsers.forEach((u) => {
      const skillsStr = (u.skillsCompleted || []).join('; ') || 'None';
      const streak = u.streak?.currentStreak || 0;
      const lastActive = u.lastActiveModule?.updatedAt
        ? new Date(u.lastActiveModule.updatedAt).toLocaleDateString()
        : u.joinedDate
        ? new Date(u.joinedDate).toLocaleDateString()
        : 'N/A';
      const joinedDate = u.joinedDate ? new Date(u.joinedDate).toLocaleDateString() : 'N/A';

      const row = [
        `"${u.uid}"`,
        `"${(u.name || '').replace(/"/g, '""')}"`,
        `"${(u.email || '').replace(/"/g, '""')}"`,
        `"${(u.college || '').replace(/"/g, '""')}"`,
        `"${(u.branch || '').replace(/"/g, '""')}"`,
        `"${(u.leetcodeId || '').replace(/"/g, '""')}"`,
        `${u.leetcodeStats?.totalSolved ?? 52}`,
        `"${skillsStr}"`,
        `${streak}`,
        `"${lastActive}"`,
        `"${joinedDate}"`,
        `"${u.selectedProjectId || 'None'}"`,
      ];

      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `levelupdev_users_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen topo-bg text-on-surface font-sans antialiased select-none flex flex-col">
      {/* Top Glassmorphic Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#5C7A6B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/home"
            className="flex items-center gap-2 font-mono text-xs font-semibold text-[#5C7A6B] hover:text-[#0F2E28] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C98A3E]" />
            <span>Return to Profile</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#0F2E28] text-[#C98A3E] text-xs font-mono font-bold rounded-full border border-[#C98A3E]/30 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C98A3E]" /> Admin Console
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 space-y-8 flex-1">
        {/* Admin Header Card */}
        <div className="bg-[#0F2E28] text-white rounded-3xl p-8 border border-[#5C7A6B]/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#5C7A6B] via-[#C98A3E] to-[#E2654B]" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C98A3E] uppercase tracking-wider">
                <Users className="w-4 h-4 text-[#C98A3E]" /> Member Directory &amp; Reporting
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white">
                Admin Control Dashboard
              </h1>
              <p className="font-sans text-sm text-[#EDF2ED]/80 max-w-xl leading-relaxed">
                Overview of registered developers, skill progress, active streaks, and portfolio selections.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={loadUsers}
                disabled={fetching}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans text-xs font-semibold rounded-full transition flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${fetching ? 'animate-spin' : ''}`} />
                <span>Refresh Data</span>
              </button>

              <button
                onClick={handleDownloadCSV}
                disabled={filteredUsers.length === 0}
                className="px-6 py-2.5 bg-[#C98A3E] text-[#0F2E28] font-sans text-xs font-bold rounded-full hover:bg-[#C98A3E]/90 hover:shadow-lg transition flex items-center gap-2 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Download as CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Directory Controls & Table Container */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-[#5C7A6B]/20 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5C7A6B]">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search member by name or email..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#E2E8E2]/50 border border-[#5C7A6B]/20 rounded-2xl text-xs font-mono text-[#0F2E28] placeholder-[#5C7A6B]/60 focus:outline-none focus:border-[#C98A3E] focus:bg-white transition"
              />
            </div>

            <div className="font-mono text-xs text-[#414846]">
              Showing <span className="font-bold text-[#0F2E28]">{filteredUsers.length}</span> member
              {filteredUsers.length === 1 ? '' : 's'}
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#5C7A6B]/15">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0F2E28] text-white font-mono text-xs uppercase tracking-wider border-b border-[#5C7A6B]/20">
                  <th className="py-4 px-5">Developer</th>
                  <th className="py-4 px-5">Email Address</th>
                  <th className="py-4 px-5">LeetCode ID</th>
                  <th className="py-4 px-5">LeetCode Solved</th>
                  <th className="py-4 px-5">Skills Completed</th>
                  <th className="py-4 px-5">Current Streak</th>
                  <th className="py-4 px-5">Last Active Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#5C7A6B]/15 font-sans text-xs sm:text-sm">
                {fetching ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#5C7A6B] font-mono">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#5C7A6B] border-t-transparent rounded-full animate-spin" />
                        <span>Querying Firestore documents...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#414846] font-mono">
                      No members match the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const skillsCount = u.skillsCompleted?.length || 0;
                    const streakCount = u.streak?.currentStreak || 0;
                    const lastActive = u.lastActiveModule?.updatedAt
                      ? new Date(u.lastActiveModule.updatedAt).toLocaleDateString()
                      : u.joinedDate
                      ? new Date(u.joinedDate).toLocaleDateString()
                      : 'N/A';

                    return (
                      <tr
                        key={u.uid}
                        className="hover:bg-[#5C7A6B]/5 transition-colors group"
                      >
                        {/* Developer */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#0F2E28] text-[#C98A3E] font-display font-bold text-xs flex items-center justify-center shrink-0 border border-[#C98A3E]/40">
                              {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                              <div className="font-display font-bold text-[#0F2E28] text-sm">
                                {u.name || 'Member'}
                              </div>
                              <div className="text-xs text-[#414846] font-mono">
                                {u.college || 'Engineering College'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-4 px-5 font-mono text-xs text-[#0F2E28]">
                          {u.email}
                        </td>

                        {/* LeetCode ID */}
                        <td className="py-4 px-5 font-mono text-xs text-[#0F2E28]">
                          {u.leetcodeId ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#5C7A6B]/30 rounded-lg">
                              <Code2 className="w-3.5 h-3.5 text-[#C98A3E]" />
                              {u.leetcodeId}
                            </span>
                          ) : (
                            <span className="text-[#5C7A6B]">N/A</span>
                          )}
                        </td>

                        {/* LeetCode Solved */}
                        <td className="py-4 px-5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-900 font-mono text-xs font-bold rounded-full">
                            {u.leetcodeStats?.totalSolved ?? 52} Solved
                          </span>
                        </td>

                        {/* Skills Completed */}
                        <td className="py-4 px-5">
                          {skillsCount > 0 ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-mono font-bold rounded-full">
                              <Award className="w-3.5 h-3.5 text-emerald-600" />
                              {skillsCount} Mastered ({u.skillsCompleted.join(', ')})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#E2E8E2] text-[#5C7A6B] text-xs font-mono rounded-full">
                              0 Mastered
                            </span>
                          )}
                        </td>

                        {/* Current Streak */}
                        <td className="py-4 px-5 font-mono">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E2654B]/10 border border-[#E2654B]/30 text-[#E2654B] font-bold text-xs rounded-full">
                            <Flame className="w-3.5 h-3.5 fill-[#E2654B]" />
                            {streakCount} Day{streakCount === 1 ? '' : 's'}
                          </div>
                        </td>

                        {/* Last Active Date */}
                        <td className="py-4 px-5 font-mono text-xs text-[#414846]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#5C7A6B]" />
                            <span>{lastActive}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
