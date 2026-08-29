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
  InternshipApplication,
  ApplicationStatus,
} from '@/data/internshipsData';
import {
  getInternshipApplications,
  updateApplicationStatus,
  deleteApplication,
} from '@/lib/internshipStorage';
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
  Briefcase,
  CheckCircle2,
  X,
  Trash2,
  Eye,
  Filter,
  GraduationCap,
  Phone,
  Mail,
  FileCheck2,
  Clock,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { userData, loading } = useAuth();
  const router = useRouter();

  // Active Admin Section: 'members' | 'internships'
  const [activeSection, setActiveSection] = useState<'members' | 'internships'>('internships');

  // Members state
  const [usersList, setUsersList] = useState<UserProfileData[]>([]);
  const [fetchingUsers, setFetchingUsers] = useState<boolean>(true);
  const [memberSearchQuery, setMemberSearchQuery] = useState<string>('');

  // Internship Applications state
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [fetchingApps, setFetchingApps] = useState<boolean>(true);
  const [appSearchQuery, setAppSearchQuery] = useState<string>('');
  const [appStatusFilter, setAppStatusFilter] = useState<string>('All');
  const [appRoleFilter, setAppRoleFilter] = useState<string>('All');

  // Selected Application for Details Modal
  const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState<string>('');
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  // Load user documents
  const loadUsers = async () => {
    setFetchingUsers(true);
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
    setFetchingUsers(false);
  };

  // Load internship applications
  const loadApplications = async () => {
    setFetchingApps(true);
    const list = await getInternshipApplications();
    setApplications(list);
    setFetchingApps(false);
  };

  useEffect(() => {
    if (userData && isAdminEmail(userData.email || '')) {
      loadUsers();
      loadApplications();
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

  // Explicit Access Denied screen
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

  // Filtered members
  const filteredUsers = usersList.filter((u) => {
    const q = memberSearchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.college || '').toLowerCase().includes(q) ||
      (u.headline || '').toLowerCase().includes(q)
    );
  });

  // Filtered applications
  const filteredApplications = applications.filter((app) => {
    const q = appSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      app.full_name.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      app.education.toLowerCase().includes(q) ||
      app.skills.toLowerCase().includes(q) ||
      app.internship_title.toLowerCase().includes(q);

    const matchesStatus = appStatusFilter === 'All' || app.status === appStatusFilter;
    const matchesRole = appRoleFilter === 'All' || app.internship_title === appRoleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Status Change Handler
  const handleStatusChange = async (appId: string, newStatus: ApplicationStatus) => {
    setUpdatingStatusId(appId);
    await updateApplicationStatus(appId, newStatus);
    await loadApplications();
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    setUpdatingStatusId(null);
  };

  // Save Admin Notes
  const handleSaveNotes = async () => {
    if (!selectedApp) return;
    await updateApplicationStatus(selectedApp.id, selectedApp.status, adminNoteInput);
    await loadApplications();
    setSelectedApp({ ...selectedApp, admin_notes: adminNoteInput });
  };

  // Delete Application Handler
  const handleDeleteApp = async (appId: string) => {
    if (confirm('Are you sure you want to delete this internship application record?')) {
      await deleteApplication(appId);
      await loadApplications();
      if (selectedApp && selectedApp.id === appId) {
        setSelectedApp(null);
      }
    }
  };

  // CSV Export for Users
  const handleDownloadUsersCSV = () => {
    if (filteredUsers.length === 0) return;
    const headers = ['UID', 'Name', 'Email', 'College', 'Branch', 'LeetCode ID', 'LeetCode Solved', 'Skills Completed', 'Current Streak', 'Joined Date'];
    const csvRows = [headers.join(',')];

    filteredUsers.forEach((u) => {
      const skillsStr = (u.skillsCompleted || []).join('; ') || 'None';
      const streak = u.streak?.currentStreak || 0;
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
        `"${joinedDate}"`,
      ];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `levelupdev_users_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // CSV Export for Internship Applications
  const handleDownloadAppsCSV = () => {
    if (filteredApplications.length === 0) return;
    const headers = ['Application ID', 'Student Name', 'Email', 'Phone', 'Education', 'Skills', 'Internship Applied For', 'Status', 'Submitted At', 'Admin Notes'];
    const csvRows = [headers.join(',')];

    filteredApplications.forEach((a) => {
      const row = [
        `"${a.id}"`,
        `"${(a.full_name || '').replace(/"/g, '""')}"`,
        `"${(a.email || '').replace(/"/g, '""')}"`,
        `"${(a.phone || '').replace(/"/g, '""')}"`,
        `"${(a.education || '').replace(/"/g, '""')}"`,
        `"${(a.skills || '').replace(/"/g, '""')}"`,
        `"${(a.internship_title || '').replace(/"/g, '""')}"`,
        `"${a.status}"`,
        `"${new Date(a.submitted_at).toLocaleDateString()}"`,
        `"${(a.admin_notes || '').replace(/"/g, '""')}"`,
      ];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `levelupdev_internship_applications_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Unique roles for filter dropdown
  const uniqueRoles = Array.from(new Set(applications.map((a) => a.internship_title)));

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

          <div className="flex items-center gap-3">
            <Link
              href="/internships"
              className="text-xs font-mono font-medium text-[#5C7A6B] hover:text-[#0F2E28] px-3 py-1.5 rounded-xl border border-[#5C7A6B]/20 hover:bg-[#5C7A6B]/10 transition"
            >
              View Internships Portal
            </Link>
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
                <Briefcase className="w-4 h-4 text-[#C98A3E]" /> Admin Control Dashboard
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white">
                Internship Management &amp; Reporting
              </h1>
              <p className="font-sans text-sm text-[#EDF2ED]/80 max-w-xl leading-relaxed">
                Review submitted internship interest, manage application evaluation statuses, and track member growth.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={activeSection === 'internships' ? loadApplications : loadUsers}
                disabled={activeSection === 'internships' ? fetchingApps : fetchingUsers}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans text-xs font-semibold rounded-full transition flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${(activeSection === 'internships' ? fetchingApps : fetchingUsers) ? 'animate-spin' : ''}`} />
                <span>Refresh Data</span>
              </button>

              <button
                onClick={activeSection === 'internships' ? handleDownloadAppsCSV : handleDownloadUsersCSV}
                className="px-6 py-2.5 bg-[#C98A3E] text-[#0F2E28] font-sans text-xs font-bold rounded-full hover:bg-[#C98A3E]/90 hover:shadow-lg transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-[#5C7A6B]/20 pb-4">
          <button
            onClick={() => setActiveSection('internships')}
            className={`px-5 py-2.5 rounded-2xl font-mono text-xs font-bold transition flex items-center gap-2 ${
              activeSection === 'internships'
                ? 'bg-[#0F2E28] text-[#C98A3E] shadow-md'
                : 'bg-white text-[#414846] border border-[#5C7A6B]/20 hover:text-[#0F2E28]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Internship Applications</span>
            <span className="ml-1.5 px-2 py-0.5 rounded-full bg-[#C98A3E] text-[#0F2E28] text-[11px] font-bold">
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSection('members')}
            className={`px-5 py-2.5 rounded-2xl font-mono text-xs font-bold transition flex items-center gap-2 ${
              activeSection === 'members'
                ? 'bg-[#0F2E28] text-[#C98A3E] shadow-md'
                : 'bg-white text-[#414846] border border-[#5C7A6B]/20 hover:text-[#0F2E28]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Member Directory</span>
            <span className="ml-1.5 px-2 py-0.5 rounded-full bg-[#5C7A6B]/20 text-[#0F2E28] text-[11px] font-bold">
              {usersList.length}
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: INTERNSHIP APPLICATIONS TABLE */}
        {/* ========================================================================= */}
        {activeSection === 'internships' && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-[#5C7A6B]/20 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Filters Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5C7A6B]">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={appSearchQuery}
                    onChange={(e) => setAppSearchQuery(e.target.value)}
                    placeholder="Search by student, email, skill..."
                    className="w-full pl-10 pr-4 py-2 bg-[#E2E8E2]/50 border border-[#5C7A6B]/20 rounded-2xl text-xs font-mono text-[#0F2E28] placeholder-[#5C7A6B]/60 focus:outline-none focus:border-[#C98A3E] focus:bg-white transition"
                  />
                </div>

                {/* Filter by Internship */}
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#414846]">
                  <Filter className="w-3.5 h-3.5 text-[#5C7A6B]" />
                  <select
                    value={appRoleFilter}
                    onChange={(e) => setAppRoleFilter(e.target.value)}
                    className="bg-[#E2E8E2]/50 border border-[#5C7A6B]/20 rounded-xl px-3 py-2 text-xs font-mono text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                  >
                    <option value="All">All Roles ({applications.length})</option>
                    {uniqueRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter by Status */}
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#414846]">
                  <select
                    value={appStatusFilter}
                    onChange={(e) => setAppStatusFilter(e.target.value)}
                    className="bg-[#E2E8E2]/50 border border-[#5C7A6B]/20 rounded-xl px-3 py-2 text-xs font-mono text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Interested">Interested</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Selected">Selected</option>
                    <option value="Not Selected">Not Selected</option>
                  </select>
                </div>
              </div>

              <div className="font-mono text-xs text-[#414846]">
                Showing <span className="font-bold text-[#0F2E28]">{filteredApplications.length}</span> application
                {filteredApplications.length === 1 ? '' : 's'}
              </div>
            </div>

            {/* Applications Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#5C7A6B]/15">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0F2E28] text-white font-mono text-xs uppercase tracking-wider border-b border-[#5C7A6B]/20">
                    <th className="py-4 px-5">Student Name</th>
                    <th className="py-4 px-5">Contact Details</th>
                    <th className="py-4 px-5">Internship Applied For</th>
                    <th className="py-4 px-5">Education</th>
                    <th className="py-4 px-5">Submitted Skills</th>
                    <th className="py-4 px-5">Applied Date</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#5C7A6B]/15 font-sans text-xs sm:text-sm">
                  {fetchingApps ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-[#5C7A6B] font-mono">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-[#5C7A6B] border-t-transparent rounded-full animate-spin" />
                          <span>Loading internship applications...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-[#414846] font-mono">
                        No internship applications match the filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((app) => {
                      return (
                        <tr key={app.id} className="hover:bg-[#5C7A6B]/5 transition-colors group">
                          {/* Student Name */}
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-[#0F2E28] text-[#C98A3E] font-display font-bold text-xs flex items-center justify-center shrink-0 border border-[#C98A3E]/40">
                                {app.full_name ? app.full_name.charAt(0).toUpperCase() : 'S'}
                              </div>
                              <div>
                                <div className="font-display font-bold text-[#0F2E28] text-sm">{app.full_name}</div>
                                <div className="text-[10px] text-[#5C7A6B] font-mono">ID: {app.id.substring(0, 10)}</div>
                              </div>
                            </div>
                          </td>

                          {/* Contact Details */}
                          <td className="py-4 px-5 font-mono text-xs text-[#0F2E28]">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5 text-slate-700">
                                <Mail className="w-3 h-3 text-[#5C7A6B]" />
                                <span>{app.email}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-600">
                                <Phone className="w-3 h-3 text-[#5C7A6B]" />
                                <span>{app.phone}</span>
                              </div>
                            </div>
                          </td>

                          {/* Internship Applied For */}
                          <td className="py-4 px-5">
                            <span className="font-display font-bold text-xs text-[#0F2E28] block">
                              {app.internship_title}
                            </span>
                            <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
                              Demo Role
                            </span>
                          </td>

                          {/* Education */}
                          <td className="py-4 px-5 font-sans text-xs text-[#414846] max-w-[180px] truncate" title={app.education}>
                            {app.education}
                          </td>

                          {/* Skills */}
                          <td className="py-4 px-5 max-w-[180px]">
                            <div className="text-xs font-mono text-slate-700 truncate" title={app.skills}>
                              {app.skills}
                            </div>
                          </td>

                          {/* Applied Date */}
                          <td className="py-4 px-5 font-mono text-xs text-[#414846]">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#5C7A6B]" />
                              <span>{new Date(app.submitted_at).toLocaleDateString()}</span>
                            </div>
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-4 px-5">
                            <select
                              value={app.status}
                              disabled={updatingStatusId === app.id}
                              onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                              className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border focus:outline-none cursor-pointer transition ${
                                app.status === 'Interested'
                                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                                  : app.status === 'Under Review'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : app.status === 'Selected'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-slate-100 text-slate-600 border-slate-300'
                              }`}
                            >
                              <option value="Interested">Interested</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Selected">Selected</option>
                              <option value="Not Selected">Not Selected</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setSelectedApp(app);
                                  setAdminNoteInput(app.admin_notes || '');
                                }}
                                title="View Details & Notes"
                                className="p-1.5 bg-white border border-[#5C7A6B]/20 rounded-lg hover:bg-[#5C7A6B]/10 text-[#0F2E28] transition"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteApp(app.id)}
                                title="Delete Record"
                                className="p-1.5 bg-white border border-red-200 rounded-lg hover:bg-red-50 text-red-600 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
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
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: MEMBER DIRECTORY TABLE */}
        {/* ========================================================================= */}
        {activeSection === 'members' && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-[#5C7A6B]/20 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5C7A6B]">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={memberSearchQuery}
                  onChange={(e) => setMemberSearchQuery(e.target.value)}
                  placeholder="Search member by name or email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#E2E8E2]/50 border border-[#5C7A6B]/20 rounded-2xl text-xs font-mono text-[#0F2E28] placeholder-[#5C7A6B]/60 focus:outline-none focus:border-[#C98A3E] focus:bg-white transition"
                />
              </div>

              <div className="font-mono text-xs text-[#414846]">
                Showing <span className="font-bold text-[#0F2E28]">{filteredUsers.length}</span> member
                {filteredUsers.length === 1 ? '' : 's'}
              </div>
            </div>

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
                  {fetchingUsers ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-[#5C7A6B] font-mono">
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
                        <tr key={u.uid} className="hover:bg-[#5C7A6B]/5 transition-colors group">
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-[#0F2E28] text-[#C98A3E] font-display font-bold text-xs flex items-center justify-center shrink-0 border border-[#C98A3E]/40">
                                {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <div>
                                <div className="font-display font-bold text-[#0F2E28] text-sm">{u.name || 'Member'}</div>
                                <div className="text-xs text-[#414846] font-mono">{u.college || 'Engineering College'}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-5 font-mono text-xs text-[#0F2E28]">{u.email}</td>

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

                          <td className="py-4 px-5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-900 font-mono text-xs font-bold rounded-full">
                              {u.leetcodeStats?.totalSolved ?? 52} Solved
                            </span>
                          </td>

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

                          <td className="py-4 px-5 font-mono">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E2654B]/10 border border-[#E2654B]/30 text-[#E2654B] font-bold text-xs rounded-full">
                              <Flame className="w-3.5 h-3.5 fill-[#E2654B]" />
                              {streakCount} Day{streakCount === 1 ? '' : 's'}
                            </div>
                          </td>

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
        )}
      </main>

      {/* ========================================================================= */}
      {/* APPLICATION DETAILS MODAL (ADMIN REVIEW) */}
      {/* ========================================================================= */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white border border-[#5C7A6B]/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-[#0F2E28] flex items-center justify-center"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[#C98A3E] uppercase tracking-wider">
                INTERNSHIP APPLICATION DETAILS
              </span>
              <h3 className="font-display text-2xl font-bold text-[#0F2E28]">{selectedApp.internship_title}</h3>
              <p className="text-xs text-[#5C7A6B] font-mono">
                Submitted on {new Date(selectedApp.submitted_at).toLocaleString()}
              </p>
            </div>

            {/* Applicant Bio Card */}
            <div className="p-4 rounded-2xl bg-[#E2E8E2]/40 border border-[#5C7A6B]/20 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-[#5C7A6B] uppercase font-bold block">Student Name</span>
                  <span className="font-display font-bold text-sm text-[#0F2E28]">{selectedApp.full_name}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#5C7A6B] uppercase font-bold block">Application Status</span>
                  <span className="font-mono font-bold text-xs text-[#0F2E28]">{selectedApp.status}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#5C7A6B] uppercase font-bold block">Email Address</span>
                  <span className="font-mono text-xs text-slate-700">{selectedApp.email}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#5C7A6B] uppercase font-bold block">Phone Number</span>
                  <span className="font-mono text-xs text-slate-700">{selectedApp.phone}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#5C7A6B]/20 text-xs">
                <span className="font-mono text-[10px] text-[#5C7A6B] uppercase font-bold block mb-1">Education</span>
                <p className="text-slate-800">{selectedApp.education}</p>
              </div>

              <div className="pt-2 border-t border-[#5C7A6B]/20 text-xs">
                <span className="font-mono text-[10px] text-[#5C7A6B] uppercase font-bold block mb-1">Submitted Skills</span>
                <p className="text-slate-800 font-mono text-xs">{selectedApp.skills}</p>
              </div>
            </div>

            {/* Mentor Notes Section */}
            <div className="space-y-2">
              <label className="font-mono text-xs font-bold text-[#0F2E28] uppercase block">
                Mentor / Admin Notes (Visible on Student Dashboard)
              </label>
              <textarea
                rows={3}
                value={adminNoteInput}
                onChange={(e) => setAdminNoteInput(e.target.value)}
                placeholder="Add feedback, screening observations, or review comments..."
                className="w-full bg-[#E2E8E2]/40 border border-[#5C7A6B]/20 rounded-xl p-3 text-xs text-[#0F2E28] focus:outline-none focus:border-[#C98A3E]"
              />
              <button
                onClick={handleSaveNotes}
                className="px-4 py-1.5 bg-[#0F2E28] text-white text-xs font-mono font-semibold rounded-lg hover:bg-[#5C7A6B] transition"
              >
                Save Notes
              </button>
            </div>

            {/* Change Status Fast Actions */}
            <div className="space-y-2 pt-2 border-t border-[#5C7A6B]/20">
              <span className="font-mono text-xs font-bold text-[#0F2E28] uppercase block">
                Change Application Status
              </span>
              <div className="flex flex-wrap gap-2">
                {(['Interested', 'Under Review', 'Selected', 'Not Selected'] as ApplicationStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedApp.id, st)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition border ${
                      selectedApp.status === st
                        ? 'bg-[#0F2E28] text-[#C98A3E] border-[#0F2E28]'
                        : 'bg-white text-slate-700 border-[#5C7A6B]/30 hover:bg-[#5C7A6B]/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#5C7A6B]/20 flex items-center justify-between">
              <button
                onClick={() => handleDeleteApp(selectedApp.id)}
                className="text-xs text-red-600 hover:text-red-800 font-mono flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Application</span>
              </button>
              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F2E28] font-sans text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
