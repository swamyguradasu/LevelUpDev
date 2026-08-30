'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, UserProfileData } from '@/context/AuthContext';
import { isAdminEmail, getAllSkills } from '@/lib/content';
import { StaticUserProfile } from '@/lib/csvRoster';
import {
  InternshipApplication,
  ApplicationStatus,
} from '@/data/internshipsData';
import {
  UserDynamicData,
  ModuleProgressRecord,
  UserProjectRecord,
  CalendarActivityRecord,
  UserAchievementRecord,
} from '@/lib/dynamicDatabase';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FolderGit2,
  BookOpen,
  Award,
  Download,
  Upload,
  Settings,
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  Search,
  RefreshCw,
  Trash2,
  Eye,
  ExternalLink,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles,
  Calendar,
  AlertTriangle,
  X,
  Mail,
  GraduationCap,
  LogOut,
  Flame,
  Check,
  FileSpreadsheet,
  FileCode,
  Lock,
  KeyRound,
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { getHistoricalManifest } from '@/lib/historicalData';

type AdminTab =
  | 'dashboard'
  | 'internships'
  | 'students'
  | 'projects'
  | 'skills'
  | 'achievements'
  | 'export'
  | 'settings';

export default function AdminDashboardPage() {
  const { userData, loading, logout, openChangePasswordModal } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Static Profiles from CSV
  const [staticProfiles, setStaticProfiles] = useState<StaticUserProfile[]>([]);
  const [fetchingProfiles, setFetchingProfiles] = useState(true);

  // Dynamic Data & Applications
  const [dynamicUsers, setDynamicUsers] = useState<UserDynamicData[]>([]);
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [fetchingData, setFetchingData] = useState(true);

  // Search & Filter States
  const [studentSearch, setStudentSearch] = useState('');
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('All');
  const [projectSearch, setProjectSearch] = useState('');

  // Selected Detail Modals
  const [selectedStudent, setSelectedStudent] = useState<StaticUserProfile | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<InternshipApplication | null>(null);
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Export Safeguard Modal
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Danger Zone Reset States
  const [dangerAcknowledged, setDangerAcknowledged] = useState(false);
  const [dangerConfirmText, setDangerConfirmText] = useState('');
  const [isResettingDB, setIsResettingDB] = useState(false);

  const isUserAdmin = !!userData && (userData.role === 'admin' || isAdminEmail(userData.email || ''));

  // Load All Admin Data
  const loadAllData = async () => {
    if (!userData?.email) return;
    setFetchingData(true);
    setFetchingProfiles(true);

    try {
      // 1. Load static profiles from CSV
      const profRes = await fetch('/api/auth/profile');
      if (profRes.ok) {
        const pData = await profRes.json();
        setStaticProfiles(pData.profiles || []);
      }

      // 2. Load dynamic export datasets to get all dynamic users
      const expRes = await fetch(`/api/admin/export-db?adminEmail=${encodeURIComponent(userData.email)}`);
      if (expRes.ok) {
        const expData = await expRes.json();
        const datasets = expData.datasets || {};

        // Group dynamic user data by email
        const userMap: Record<string, UserDynamicData> = {};
        (datasets.students_progress || []).forEach((row: any) => {
          const email = row.email;
          if (!userMap[email]) {
            userMap[email] = {
              userId: row.user_id,
              email,
              progress: {},
              skillsCompleted: [],
              unlockedSkills: ['python'],
              projects: [],
              selectedProjectId: null,
              projectGithubUrl: null,
              projectLiveUrl: null,
              achievements: [],
              calendarActivity: [],
              streak: { currentStreak: 0, longestStreak: 0, activeDays: 0, lastActivityDate: '', activeDates: [] },
              updatedAt: new Date().toISOString(),
            };
          }
          if (!userMap[email].progress[row.skill]) userMap[email].progress[row.skill] = {};
          userMap[email].progress[row.skill][row.module_id] = {
            skillId: row.skill,
            moduleId: row.module_id,
            status: row.status,
            completedAt: row.completed_at,
            lastAccessedAt: row.last_accessed_at,
          };
        });

        (datasets.projects || []).forEach((p: any) => {
          const email = p.email;
          if (!userMap[email]) {
            userMap[email] = {
              userId: p.user_id,
              email,
              progress: {},
              skillsCompleted: [],
              unlockedSkills: ['python'],
              projects: [],
              selectedProjectId: p.project_id,
              projectGithubUrl: p.github_url,
              projectLiveUrl: p.live_url,
              achievements: [],
              calendarActivity: [],
              streak: { currentStreak: 0, longestStreak: 0, activeDays: 0, lastActivityDate: '', activeDates: [] },
              updatedAt: p.updated_at,
            };
          }
          userMap[email].projects.push({
            projectId: p.project_id,
            title: p.title,
            category: p.category,
            status: p.status,
            selectedAt: p.updated_at || new Date().toISOString(),
            githubUrl: p.github_url || null,
            liveUrl: p.live_url || null,
            updatedAt: p.updated_at,
          });
        });

        (datasets.achievements || []).forEach((a: any) => {
          const email = a.email;
          if (userMap[email]) {
            userMap[email].achievements.push({
              achievementId: a.achievement_id,
              achievementTitle: a.achievement_title,
              achievementType: a.achievement_type,
              earnedAt: a.earned_at,
            });
          }
        });

        (datasets.calendar || []).forEach((c: any) => {
          const email = c.email;
          if (userMap[email]) {
            userMap[email].calendarActivity.push({
              activityDate: c.activity_date,
              activityType: c.activity_type,
              timestamp: c.timestamp,
            });
          }
        });

        setDynamicUsers(Object.values(userMap));
      }

      // 3. Load internship applications
      const appRes = await fetch('/api/db/internships?role=admin');
      if (appRes.ok) {
        const appData = await appRes.json();
        setApplications(appData.applications || []);
      }
    } catch (err) {
      console.warn('Failed to load admin data:', err);
    } finally {
      setFetchingData(false);
      setFetchingProfiles(false);
    }
  };

  useEffect(() => {
    if (isUserAdmin) {
      loadAllData();
    }
  }, [isUserAdmin]);

  // Compute Real Overview Metrics
  const metrics = useMemo(() => {
    const totalStudents = staticProfiles.length;
    const totalApplications = applications.length;

    let activeProjects = 0;
    let completedProjects = 0;
    const activeSkillUsers = new Set<string>();

    dynamicUsers.forEach((u) => {
      (u.projects || []).forEach((p) => {
        if (p.status === 'Completed') completedProjects++;
        else activeProjects++;
      });

      if (u.progress) {
        Object.keys(u.progress).forEach((skill) => {
          const modMap = u.progress[skill] || {};
          const hasDone = Object.values(modMap).some((m) => m.status === 'completed');
          if (hasDone) activeSkillUsers.add(u.email);
        });
      }
    });

    return {
      totalStudents,
      totalApplications,
      activeProjects,
      completedProjects,
      skillActivityCount: activeSkillUsers.size,
    };
  }, [staticProfiles, applications, dynamicUsers]);

  // Handle Application Status Update
  const handleUpdateAppStatus = async (appId: string, status: ApplicationStatus) => {
    if (!userData?.email) return;
    setUpdatingAppId(appId);
    try {
      const res = await fetch('/api/db/internships', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: appId,
          status,
          adminNotes: adminNoteInput,
          adminEmail: userData.email,
        }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, status, admin_notes: adminNoteInput } : a))
        );
        if (selectedApplicant && selectedApplicant.id === appId) {
          setSelectedApplicant((prev) => (prev ? { ...prev, status, admin_notes: adminNoteInput } : null));
        }
      }
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdatingAppId(null);
    }
  };

  // Handle Database Reset (Danger Zone)
  const handleExecuteResetDB = async () => {
    if (dangerConfirmText !== 'RESET DATABASE') {
      alert('Please type "RESET DATABASE" exactly to confirm.');
      return;
    }
    setIsResettingDB(true);
    try {
      const res = await fetch('/api/admin/reset-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminEmail: userData?.email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to reset database.');
      } else {
        alert(`✓ ${data.message}`);
        setDangerConfirmText('');
        await loadAllData();
      }
    } catch (err: any) {
      alert(`Error during reset: ${err.message || err}`);
    } finally {
      setIsResettingDB(false);
    }
  };

  // Helper to Download CSV
  const downloadCSV = (filename: string, headers: string[], rows: string[][]) => {
    const csvContent = [headers.join(','), ...rows.map((r) => r.map((c) => `"${(c || '').replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  // Excel Multi-Sheet Export Handler
  const handleExportExcel = async () => {
    if (!userData?.email) return;
    setIsExporting(true);
    try {
      const res = await fetch(`/api/admin/export-db?adminEmail=${encodeURIComponent(userData.email)}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert('Failed to retrieve export datasets.');
        setIsExporting(false);
        return;
      }

      const datasets = data.datasets || {};
      const dateTag = new Date().toISOString().split('T')[0];
      const wb = XLSX.utils.book_new();

      // 1. Skill Progress Sheet
      const progressData = (datasets.students_progress || []).map((r: any) => ({
        'User ID': r.user_id,
        'Email': r.email,
        'Skill': r.skill,
        'Module ID': r.module_id,
        'Status': r.status,
        'Completed At': r.completed_at || '',
        'Last Accessed At': r.last_accessed_at || '',
      }));
      const wsProgress = XLSX.utils.json_to_sheet(progressData);
      XLSX.utils.book_append_sheet(wb, wsProgress, 'Skill Progress');

      // 2. Projects Sheet
      const projectsData = (datasets.projects || []).map((r: any) => ({
        'User ID': r.user_id,
        'Email': r.email,
        'Project ID': r.project_id,
        'Title': r.title,
        'Category': r.category,
        'Status': r.status,
        'GitHub URL': r.github_url || '',
        'Live URL': r.live_url || '',
        'Updated At': r.updated_at || '',
      }));
      const wsProjects = XLSX.utils.json_to_sheet(projectsData);
      XLSX.utils.book_append_sheet(wb, wsProjects, 'Projects');

      // 3. Internships Sheet
      const internshipsData = (datasets.internships || []).map((r: any) => ({
        'Application ID': r.id,
        'User ID': r.user_id,
        'Email': r.email,
        'Internship ID': r.internship_id,
        'Internship Title': r.internship_title,
        'Status': r.status,
        'Applied At': r.applied_at,
        'Full Name': r.full_name,
        'Phone': r.phone || '',
        'Education': r.education || '',
        'Skills': r.skills || '',
        'Admin Notes': r.admin_notes || '',
      }));
      const wsInternships = XLSX.utils.json_to_sheet(internshipsData);
      XLSX.utils.book_append_sheet(wb, wsInternships, 'Internships');

      // 4. Achievements Sheet
      const achievementsData = (datasets.achievements || []).map((r: any) => ({
        'User ID': r.user_id,
        'Email': r.email,
        'Achievement ID': r.achievement_id,
        'Achievement Title': r.achievement_title,
        'Achievement Type': r.achievement_type,
        'Earned At': r.earned_at || '',
      }));
      const wsAchievements = XLSX.utils.json_to_sheet(achievementsData);
      XLSX.utils.book_append_sheet(wb, wsAchievements, 'Achievements');

      // 5. Calendar Activity Sheet
      const calendarData = (datasets.calendar || []).map((r: any) => ({
        'User ID': r.user_id,
        'Email': r.email,
        'Activity Date': r.activity_date,
        'Activity Type': r.activity_type,
        'Timestamp': r.timestamp || '',
      }));
      const wsCalendar = XLSX.utils.json_to_sheet(calendarData);
      XLSX.utils.book_append_sheet(wb, wsCalendar, 'Calendar Activity');

      // 6. Backup Metadata Sheet
      const metadataData = [
        { Property: 'Backup Format Version', Value: data.manifest?.formatVersion || 'levelupdev-backup-v1.0' },
        { Property: 'Application Version', Value: '1.0.0' },
        { Property: 'Exported At', Value: data.manifest?.exportedAt || new Date().toISOString() },
        { Property: 'Exported By', Value: data.manifest?.exportedBy || userData.email },
        { Property: 'Total Students in Roster', Value: String(data.metadata?.totalStudentsInRoster || staticProfiles.length) },
        { Property: 'Total Active Dynamic Users', Value: String(data.metadata?.totalActiveDynamicUsers || dynamicUsers.length) },
        { Property: 'Skill Progress Records', Value: String(progressData.length) },
        { Property: 'Projects Records', Value: String(projectsData.length) },
        { Property: 'Internship Applications', Value: String(internshipsData.length) },
        { Property: 'Achievements Records', Value: String(achievementsData.length) },
        { Property: 'Calendar Records', Value: String(calendarData.length) },
      ];
      const wsMetadata = XLSX.utils.json_to_sheet(metadataData);
      XLSX.utils.book_append_sheet(wb, wsMetadata, 'Backup Metadata');

      XLSX.writeFile(wb, `levelupdev_backup_${dateTag}.xlsx`);
      alert('✓ Excel export successfully generated with all 6 dynamic dataset sheets.');
    } catch (err: any) {
      alert(`Excel Export error: ${err.message || err}`);
    } finally {
      setIsExporting(false);
    }
  };

  // Export Handler (JSON / CSVs)
  const handlePerformExport = async (type: 'all-csv' | 'json' | 'progress' | 'projects' | 'internships' | 'achievements' | 'calendar') => {
    if (!userData?.email) return;
    setIsExporting(true);
    try {
      const res = await fetch(`/api/admin/export-db?adminEmail=${encodeURIComponent(userData.email)}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert('Failed to retrieve export datasets.');
        setIsExporting(false);
        return;
      }

      const datasets = data.datasets || {};
      const dateTag = new Date().toISOString().split('T')[0];

      if (type === 'json' || type === 'all-csv') {
        const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const jsonLink = document.createElement('a');
        jsonLink.href = URL.createObjectURL(jsonBlob);
        jsonLink.download = `levelupdev_backup_${dateTag}.json`;
        jsonLink.click();
      }

      if (type === 'all-csv' || type === 'progress') {
        const headers = ['user_id', 'email', 'skill', 'module_id', 'status', 'completed_at', 'last_accessed_at'];
        const rows = (datasets.students_progress || []).map((r: any) => [
          r.user_id,
          r.email,
          r.skill,
          r.module_id,
          r.status,
          r.completed_at,
          r.last_accessed_at,
        ]);
        downloadCSV(`students_progress_${dateTag}.csv`, headers, rows);
      }

      if (type === 'all-csv' || type === 'projects') {
        const headers = ['user_id', 'email', 'project_id', 'title', 'category', 'status', 'github_url', 'live_url', 'updated_at'];
        const rows = (datasets.projects || []).map((r: any) => [
          r.user_id,
          r.email,
          r.project_id,
          r.title,
          r.category,
          r.status,
          r.github_url,
          r.live_url,
          r.updated_at,
        ]);
        downloadCSV(`projects_${dateTag}.csv`, headers, rows);
      }

      if (type === 'all-csv' || type === 'internships') {
        const headers = ['id', 'user_id', 'email', 'internship_id', 'internship_title', 'status', 'applied_at', 'full_name', 'phone', 'education', 'skills', 'admin_notes'];
        const rows = (datasets.internships || []).map((r: any) => [
          r.id,
          r.user_id,
          r.email,
          r.internship_id,
          r.internship_title,
          r.status,
          r.applied_at,
          r.full_name,
          r.phone,
          r.education,
          r.skills,
          r.admin_notes,
        ]);
        downloadCSV(`internships_${dateTag}.csv`, headers, rows);
      }

      if (type === 'all-csv' || type === 'achievements') {
        const headers = ['user_id', 'email', 'achievement_id', 'achievement_title', 'achievement_type', 'earned_at'];
        const rows = (datasets.achievements || []).map((r: any) => [
          r.user_id,
          r.email,
          r.achievement_id,
          r.achievement_title,
          r.achievement_type,
          r.earned_at,
        ]);
        downloadCSV(`achievements_${dateTag}.csv`, headers, rows);
      }

      if (type === 'all-csv' || type === 'calendar') {
        const headers = ['user_id', 'email', 'activity_date', 'activity_type', 'timestamp'];
        const rows = (datasets.calendar || []).map((r: any) => [
          r.user_id,
          r.email,
          r.activity_date,
          r.activity_type,
          r.timestamp,
        ]);
        downloadCSV(`calendar_${dateTag}.csv`, headers, rows);
      }

      setShowExportModal(false);
    } catch (err: any) {
      alert(`Export error: ${err.message || err}`);
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-400">
        <div className="flex items-center gap-3 bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Verifying Administrator Access...</span>
        </div>
      </div>
    );
  }

  if (!isUserAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl shadow-2xl border border-rose-500/30 text-center space-y-5">
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center mx-auto text-rose-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-white">Access Denied</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your account <code className="font-mono bg-slate-950 px-1.5 py-0.5 rounded text-rose-300 font-bold">&quot;{userData?.email || 'Guest'}&quot;</code> does not have administrative privileges.
            </p>
          </div>
          <Link
            href="/home"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold rounded-xl transition shadow-md shadow-[#006cd2]/30"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Filtered lists
  const filteredStudents = staticProfiles.filter((s) => {
    const q = studentSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      s.fullName.toLowerCase().includes(q) ||
      s.levelupdevEmail.toLowerCase().includes(q) ||
      s.college.toLowerCase().includes(q) ||
      s.branch.toLowerCase().includes(q) ||
      s.registerNumber.toLowerCase().includes(q)
    );
  });

  const filteredApplicants = applications.filter((a) => {
    const q = appSearch.toLowerCase().trim();
    const matchSearch =
      !q ||
      a.full_name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.internship_title.toLowerCase().includes(q) ||
      a.skills.toLowerCase().includes(q);
    const matchStatus = appStatusFilter === 'All' || a.status === appStatusFilter;
    return matchSearch && matchStatus;
  });

  // Get dynamic data for a student
  const getStudentDynamic = (email: string): UserDynamicData | undefined => {
    return dynamicUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col selection:bg-[#006cd2] selection:text-white">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center shadow-md">
            <img src="/levelupdev-icon.png" alt="LevelUpDev Logo" className="w-full h-full object-contain rounded-lg" />
          </div>
          <div>
            <span className="font-display font-bold text-base text-white tracking-tight flex items-center gap-1.5">
              Level<span className="text-[#006cd2]">Up</span>Dev <span className="text-blue-400 font-mono text-xs font-semibold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Admin</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/internships"
            className="hidden sm:inline-flex text-xs font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700 transition"
          >
            Public Internships
          </Link>
          <Link
            href="/home"
            className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl hover:border-slate-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#006cd2]" />
            <span>Return to Portfolio</span>
          </Link>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <button
            onClick={() => openChangePasswordModal(false)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
            title="Change Account Password"
          >
            <KeyRound className="w-4 h-4 text-blue-400" />
          </button>

          <button
            onClick={async () => {
              await logout();
              router.push('/login');
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-rose-500/20 text-rose-400 transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body: Sidebar + Tab Views */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-950/80 border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0 hidden md:flex">
          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'internships', label: 'Internship Applicants', icon: Briefcase, badge: applications.length },
              { id: 'students', label: 'Students Roster', icon: Users, badge: staticProfiles.length },
              { id: 'projects', label: '7-Day Projects', icon: FolderGit2 },
              { id: 'skills', label: 'Skill Progress', icon: BookOpen },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'export', label: 'Data Export', icon: Download },
              { id: 'settings', label: 'Settings & Reset', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-sans text-xs font-semibold transition ${
                    isActive
                      ? 'bg-[#006cd2] text-white shadow-md shadow-[#006cd2]/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Admin Profile Info */}
          <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-xs text-white font-bold truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate">{userData?.name || 'Administrator'}</span>
            </div>
            <div className="font-mono text-[11px] text-slate-500 truncate">{userData?.email}</div>
          </div>
        </aside>

        {/* Mobile Tab Pills */}
        <div className="md:hidden sticky top-16 z-40 bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {(['dashboard', 'internships', 'students', 'projects', 'skills', 'achievements', 'export', 'settings'] as AdminTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize shrink-0 ${
                activeTab === tab ? 'bg-[#006cd2] text-white font-bold' : 'text-slate-400 bg-slate-900 border border-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* ========================================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Platform Dashboard</h1>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
                    Live dynamic analytics from verified database &amp; CSV sources.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={loadAllData}
                    disabled={fetchingData}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-mono font-semibold rounded-xl transition flex items-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${fetchingData ? 'animate-spin' : ''}`} />
                    <span>Sync Platform</span>
                  </button>
                  <button
                    onClick={() => setShowExportModal(true)}
                    className="px-4 py-2 bg-[#006cd2] hover:bg-[#005bb5] text-white text-xs font-sans font-semibold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-[#006cd2]/30"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Data</span>
                  </button>
                </div>
              </div>

              {/* 5 Real Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400 font-bold uppercase">Total Students</span>
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="font-display text-3xl font-extrabold text-white">{metrics.totalStudents}</div>
                  <div className="font-mono text-[11px] text-slate-500">From static CSV roster</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400 font-bold uppercase">Applications</span>
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="font-display text-3xl font-extrabold text-cyan-400">{metrics.totalApplications}</div>
                  <div className="font-mono text-[11px] text-slate-500">Submitted for internships</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400 font-bold uppercase">Active Projects</span>
                    <FolderGit2 className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="font-display text-3xl font-extrabold text-amber-400">{metrics.activeProjects}</div>
                  <div className="font-mono text-[11px] text-slate-500">Selected or In Progress</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400 font-bold uppercase">Completed Projects</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="font-display text-3xl font-extrabold text-emerald-400">{metrics.completedProjects}</div>
                  <div className="font-mono text-[11px] text-slate-500">Verified &amp; deployed</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400 font-bold uppercase">Skill Activity</span>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="font-display text-3xl font-extrabold text-purple-400">{metrics.skillActivityCount}</div>
                  <div className="font-mono text-[11px] text-slate-500">Students with module progress</div>
                </div>
              </div>

              {/* Quick Actions & Platform Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Applications Card */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#006cd2]" />
                      <span>Recent Internship Applications</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('internships')}
                      className="text-xs font-mono text-blue-400 hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  {applications.length > 0 ? (
                    <div className="space-y-3">
                      {applications.slice(0, 4).map((app) => (
                        <div
                          key={app.id}
                          className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="font-bold text-xs text-white">{app.full_name}</div>
                            <div className="font-mono text-[11px] text-slate-400">{app.internship_title}</div>
                          </div>
                          <span
                            className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              app.status === 'Selected'
                                ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
                                : 'text-blue-300 bg-blue-950/60 border-blue-800/40'
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-500 font-mono">
                      No internship applications submitted yet.
                    </div>
                  )}
                </div>

                {/* CSV Roster Snapshot */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>Static CSV Roster Members</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('students')}
                      className="text-xs font-mono text-blue-400 hover:underline"
                    >
                      View Roster →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {staticProfiles.slice(0, 4).map((p) => (
                      <div
                        key={p.levelupdevEmail}
                        onClick={() => setSelectedStudent(p)}
                        className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 cursor-pointer transition"
                      >
                        <div>
                          <div className="font-bold text-xs text-white">{p.fullName}</div>
                          <div className="font-mono text-[11px] text-slate-400">{p.levelupdevEmail} • {p.branch}</div>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {p.registerNumber}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: INTERNSHIP APPLICANTS */}
          {/* ========================================================================= */}
          {activeTab === 'internships' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-[#006cd2]" />
                    <span>Internship Applicants</span>
                  </h1>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
                    Manage and review submitted internship applications from authenticated members.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="relative w-48 sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search applicants..."
                      value={appSearch}
                      onChange={(e) => setAppSearch(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#006cd2]"
                    />
                  </div>

                  <select
                    value={appStatusFilter}
                    onChange={(e) => setAppStatusFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 rounded-xl px-3 py-1.5 focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Interested">Interested</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Selected">Selected</option>
                    <option value="Not Selected">Not Selected</option>
                  </select>
                </div>
              </div>

              {filteredApplicants.length > 0 ? (
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                        <tr>
                          <th className="py-3.5 px-4">Student</th>
                          <th className="py-3.5 px-4">Internship Role</th>
                          <th className="py-3.5 px-4">Education</th>
                          <th className="py-3.5 px-4">Applied Date</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredApplicants.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-800/40 transition">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-white">{app.full_name}</div>
                              <div className="font-mono text-[11px] text-slate-400">{app.email}</div>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-semibold text-blue-300">{app.internship_title}</td>
                            <td className="py-3.5 px-4 text-slate-300 truncate max-w-xs">{app.education}</td>
                            <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                              {app.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : 'Recent'}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                  app.status === 'Selected'
                                    ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
                                    : app.status === 'Under Review'
                                    ? 'text-amber-400 bg-amber-950/60 border-amber-800/40'
                                    : 'text-blue-300 bg-blue-950/60 border-blue-800/40'
                                }`}
                              >
                                {app.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedApplicant(app);
                                  setAdminNoteInput(app.admin_notes || '');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-[#006cd2] text-slate-200 hover:text-white font-mono text-xs border border-slate-800 transition"
                              >
                                View Details →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-12 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-2">
                  <Briefcase className="w-8 h-8 text-slate-500 mx-auto" />
                  <h3 className="font-display text-base font-bold text-white">No applications found</h3>
                  <p className="font-sans text-xs text-slate-400">Applications submitted through the LMS will appear here.</p>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: STUDENTS ROSTER */}
          {/* ========================================================================= */}
          {activeTab === 'students' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                    <Users className="w-6 h-6 text-[#006cd2]" />
                    <span>Student Management Roster</span>
                  </h1>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
                    Static profile from CSV combined with live dynamic activity records.
                  </p>
                </div>

                <div className="relative w-48 sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#006cd2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredStudents.map((s) => {
                  const dyn = getStudentDynamic(s.levelupdevEmail);
                  const completedMods = dyn?.progress
                    ? Object.values(dyn.progress).reduce((acc, curr) => acc + Object.values(curr).filter((m) => m.status === 'completed').length, 0)
                    : 0;
                  const projectsCount = dyn?.projects?.length || 0;

                  return (
                    <div
                      key={s.levelupdevEmail}
                      className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-[#006cd2]/50 transition-all shadow-xl space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-display text-base font-bold text-white">{s.fullName}</h3>
                            <div className="font-mono text-xs text-blue-400">{s.levelupdevEmail}</div>
                          </div>
                          <span className="font-mono text-[11px] font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {s.registerNumber}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2">{s.headline || s.shortBio}</p>

                        <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-[11px]">
                          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                            <span className="text-slate-500 block">Modules Done:</span>
                            <span className="font-bold text-emerald-400">{completedMods} Modules</span>
                          </div>
                          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                            <span className="text-slate-500 block">Projects:</span>
                            <span className="font-bold text-blue-400">{projectsCount} Selected</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedStudent(s)}
                        className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-[#006cd2] text-slate-200 hover:text-white font-mono text-xs font-semibold border border-slate-800 transition flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Complete Admin Dossier</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: PROJECTS TRACKER */}
          {/* ========================================================================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                    <FolderGit2 className="w-6 h-6 text-amber-400" />
                    <span>7-Day Mini Projects Tracker</span>
                  </h1>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
                    Live dynamic projects selected by students with validated GitHub and live hosted URLs.
                  </p>
                </div>
              </div>

              {dynamicUsers.some((u) => u.projects && u.projects.length > 0) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {dynamicUsers.flatMap((u) =>
                    (u.projects || []).map((p) => (
                      <div
                        key={`${u.email}_${p.projectId}`}
                        className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                              {p.category || '7-Day Project'}
                            </span>
                            <h3 className="font-display text-lg font-bold text-white mt-1">{p.title || p.projectId}</h3>
                            <div className="font-mono text-xs text-slate-400">Student: {u.email}</div>
                          </div>
                          <span
                            className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                              p.status === 'Completed'
                                ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
                                : 'text-blue-300 bg-blue-950/60 border-blue-800/40'
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          {p.githubUrl ? (
                            <a
                              href={p.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs border border-slate-800 flex items-center gap-1.5 transition"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                              <span>GitHub Repo</span>
                            </a>
                          ) : (
                            <span className="font-mono text-xs text-slate-500">GitHub: Not Linked</span>
                          )}

                          {p.liveUrl ? (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs border border-[#006cd2]/40 flex items-center gap-1.5 transition"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Hosted URL</span>
                            </a>
                          ) : (
                            <span className="font-mono text-xs text-slate-500">Live Demo: Not Added</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="p-12 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-2">
                  <FolderGit2 className="w-8 h-8 text-slate-500 mx-auto" />
                  <h3 className="font-display text-base font-bold text-white">No active projects yet</h3>
                  <p className="font-sans text-xs text-slate-400">When students select 7-day projects, they will be listed here.</p>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: SKILL PROGRESS OVERVIEW */}
          {/* ========================================================================= */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-4">
                <h1 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                  <span>Skill Trail Module Completions</span>
                </h1>
                <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
                  Dynamic module progress across Python and foundational learning trails.
                </p>
              </div>

              <div className="space-y-4">
                {staticProfiles.map((s) => {
                  const dyn = getStudentDynamic(s.levelupdevEmail);
                  const pyProgress = dyn?.progress?.python || {};
                  const pyDone = Object.values(pyProgress).filter((m) => m.status === 'completed').length;

                  return (
                    <div
                      key={s.levelupdevEmail}
                      className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="font-bold text-sm text-white">{s.fullName}</div>
                        <div className="font-mono text-xs text-slate-400">{s.levelupdevEmail} • {s.branch}</div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="space-y-1 text-right">
                          <span className="font-mono text-xs text-slate-300">
                            Python Mastery: <strong>{pyDone}/7 Modules</strong>
                          </span>
                          <div className="w-36 bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#006cd2] to-emerald-400"
                              style={{ width: `${Math.round((pyDone / 7) * 100)}%` }}
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedStudent(s)}
                          className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-mono text-slate-300 border border-slate-800"
                        >
                          Details →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: ACHIEVEMENTS OVERVIEW */}
          {/* ========================================================================= */}
          {activeTab === 'achievements' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-800 pb-4">
                <h1 className="font-display text-2xl font-extrabold text-white flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-400" />
                  <span>Platform Achievements &amp; Streaks</span>
                </h1>
                <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
                  Verified achievements and active streaks recorded dynamically in Firestore.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {staticProfiles.map((s) => {
                  const dyn = getStudentDynamic(s.levelupdevEmail);
                  const streak = dyn?.streak?.currentStreak || 0;
                  const activeDays = dyn?.streak?.activeDays || 0;

                  return (
                    <div key={s.levelupdevEmail} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-sm text-white">{s.fullName}</div>
                        <span className="flex items-center gap-1 font-mono text-xs text-orange-400 bg-orange-950/40 px-2 py-0.5 rounded border border-orange-800/40 font-bold">
                          <Flame className="w-3.5 h-3.5 fill-orange-400" />
                          <span>{streak} Days</span>
                        </span>
                      </div>
                      <div className="font-mono text-xs text-slate-400">Total Active Days: {activeDays} Days</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: DATABASE EXPORT CENTER */}
          {/* ========================================================================= */}
          {activeTab === 'export' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div className="border-b border-slate-800 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
                      <Download className="w-7 h-7 text-[#006cd2]" />
                      <span>Database Export Center</span>
                    </h1>
                    <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
                      Export live dynamic database records into portable Excel (.xlsx) and JSON files for offline snapshot creation.
                    </p>
                  </div>
                </div>
              </div>

              {/* THREE-TIER ARCHITECTURE STATUS CARD */}
              {(() => {
                const histManifest = getHistoricalManifest();
                return (
                  <div className="p-6 rounded-3xl bg-slate-900/90 border border-[#006cd2]/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2.5 text-blue-400">
                        <ShieldCheck className="w-5 h-5 text-[#006cd2]" />
                        <h3 className="font-display text-base font-bold text-white">System Data Architecture Status</h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold">
                        Historical Snapshot v{histManifest.snapshotVersion} Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                      {/* Tier 1 */}
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <span className="text-slate-400 font-bold block text-[11px] uppercase tracking-wider">1. Static Member Source</span>
                        <div className="text-sm font-bold text-emerald-400">{staticProfiles.length} Verified Members</div>
                        <p className="text-[10px] text-slate-500 font-sans">Sourced from static CSV (read-only identity source).</p>
                      </div>

                      {/* Tier 2 */}
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <span className="text-slate-400 font-bold block text-[11px] uppercase tracking-wider">2. Historical Snapshot</span>
                        <div className="text-sm font-bold text-purple-400">{histManifest.recordCounts.skillProgressRecords + histManifest.recordCounts.projectRecords + histManifest.recordCounts.internshipRecords} Records</div>
                        <p className="text-[10px] text-slate-500 font-sans">Compiled static baseline prior to database reset.</p>
                      </div>

                      {/* Tier 3 */}
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <span className="text-slate-400 font-bold block text-[11px] uppercase tracking-wider">3. Live Dynamic Activity</span>
                        <div className="text-sm font-bold text-cyan-400">{dynamicUsers.length} Active Users</div>
                        <p className="text-[10px] text-slate-500 font-sans">Current activity created in Firebase after reset.</p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* MAIN EXPORT ACTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Excel Export Card */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Multi-Sheet Workbook</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">Download Excel (.xlsx)</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Exports a single .xlsx file with dedicated sheets for Skill Progress, Projects, Internships, Achievements, Calendar, and Metadata.
                    </p>
                  </div>

                  <button
                    onClick={handleExportExcel}
                    disabled={isExporting}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Download Multi-Sheet Excel</span>
                  </button>
                </div>

                {/* JSON Archive Card */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-[#006cd2]" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold uppercase">
                      <FileCode className="w-4 h-4" />
                      <span>Portable JSON Archive</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">Download JSON Archive</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Exports versioned portable JSON backup data with schema manifests, ready for manual Antigravity CLI compilation into the codebase.
                    </p>
                  </div>

                  <button
                    onClick={() => handlePerformExport('json')}
                    disabled={isExporting}
                    className="w-full py-3 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-bold rounded-xl shadow-lg shadow-[#006cd2]/30 flex items-center justify-center gap-2 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>
              </div>

              {/* Individual CSV Downloads */}
              <div className="space-y-4 pt-2">
                <h3 className="font-display text-lg font-bold text-white">Individual CSV Table Downloads</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'progress', title: 'students_progress.csv', desc: 'User ID, skill, module ID, status, completion timestamp' },
                    { id: 'projects', title: 'projects.csv', desc: 'User ID, project ID, status, GitHub URL, live demo URL' },
                    { id: 'internships', title: 'internships.csv', desc: 'Applications, status, submitted applicant details' },
                    { id: 'achievements', title: 'achievements.csv', desc: 'User ID, achievement ID, date earned' },
                    { id: 'calendar', title: 'calendar_activity.csv', desc: 'User ID, activity date, activity type' },
                  ].map((ds) => (
                    <div
                      key={ds.id}
                      className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{ds.title}</span>
                        </div>
                        <div className="font-sans text-[11px] text-slate-400">{ds.desc}</div>
                      </div>
                      <button
                        onClick={() => handlePerformExport(ds.id as any)}
                        className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 rounded-lg shrink-0 transition"
                      >
                        Download ↓
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: SETTINGS & DANGER ZONE (SAFEGUARDED RESET) */}
          {/* ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div className="border-b border-slate-800 pb-4">
                <h1 className="font-display text-2xl font-extrabold text-white flex items-center gap-2.5">
                  <Settings className="w-6 h-6 text-slate-400" />
                  <span>Platform Settings &amp; Danger Zone</span>
                </h1>
                <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
                  Controlled database maintenance, quota optimization, and safe dynamic clearing.
                </p>
              </div>

              {/* Danger Zone Card */}
              <div className="p-8 rounded-3xl bg-rose-950/20 border border-rose-500/30 space-y-6">
                <div className="flex items-center gap-2.5 text-rose-400">
                  <AlertTriangle className="w-6 h-6 shrink-0" />
                  <h3 className="font-display text-lg font-bold">Danger Zone — Reset Dynamic Database</h3>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/20 space-y-2 text-xs text-rose-200 leading-relaxed">
                  <p>
                    <strong>⚠️ Warning:</strong> This operation will clear all dynamic student activity (completed modules, selected projects, submitted internship applications, and streak logs) from Firebase to reduce usage/quota.
                  </p>
                  <p className="text-slate-300">
                    <strong>Safe Guardrails:</strong> The static CSV (<code className="font-mono text-amber-300">LevelUpDev – Portfolio Profile.csv</code>), member login credentials, historical data snapshot, and LeetCode problem configurations <strong>will NEVER be deleted</strong>.
                  </p>
                </div>

                {/* Current Estimated Record Counts */}
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-slate-300 uppercase block">Current Database Contents to be Cleared</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 block">Active Dynamic Users</span>
                      <span className="text-sm font-bold text-white">{dynamicUsers.length}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 block">Internship Apps</span>
                      <span className="text-sm font-bold text-white">{applications.length}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 block">Static Profiles (Safe)</span>
                      <span className="text-sm font-bold text-emerald-400">{staticProfiles.length} Members</span>
                    </div>
                  </div>
                </div>

                {/* Explicit Checkbox Confirmation */}
                <div className="pt-2 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={dangerAcknowledged}
                      onChange={(e) => setDangerAcknowledged(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded bg-slate-950 border-rose-500/50 text-rose-600 focus:ring-rose-500 focus:ring-offset-slate-900 cursor-pointer"
                    />
                    <span className="text-xs text-slate-300 group-hover:text-white leading-relaxed">
                      I understand that dynamic database data will be cleared and confirm that a verified export has been created.
                    </span>
                  </label>

                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-slate-400">
                      To execute reset, please type <strong className="text-white font-bold">RESET DATABASE</strong>:
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <input
                        type="text"
                        placeholder="RESET DATABASE"
                        value={dangerConfirmText}
                        onChange={(e) => setDangerConfirmText(e.target.value)}
                        className="bg-slate-950 border border-rose-500/40 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 flex-1"
                      />
                      <button
                        onClick={handleExecuteResetDB}
                        disabled={dangerConfirmText !== 'RESET DATABASE' || !dangerAcknowledged || isResettingDB}
                        className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-rose-600/30 shrink-0"
                      >
                        {isResettingDB ? 'Clearing Database...' : 'Reset Dynamic Database'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: STUDENT DETAILS DOSSIER */}
      {/* ========================================================================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#006cd2]/20 border border-[#006cd2]/40 flex items-center justify-center text-blue-300 font-bold">
                  {selectedStudent.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-white">{selectedStudent.fullName}</h2>
                  <div className="font-mono text-xs text-blue-400">{selectedStudent.levelupdevEmail}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile CSV Section */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-[#006cd2] uppercase">Static Profile (From CSV)</h4>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div><strong>College:</strong> {selectedStudent.college}</div>
                  <div><strong>Degree:</strong> {selectedStudent.degree}</div>
                  <div><strong>Reg No:</strong> {selectedStudent.registerNumber}</div>
                  <div><strong>Branch:</strong> {selectedStudent.branch}</div>
                  <div><strong>Year:</strong> {selectedStudent.currentYear} (Grad {selectedStudent.graduationYear})</div>
                  <div><strong>Location:</strong> {[selectedStudent.city, selectedStudent.state, selectedStudent.country].filter(Boolean).join(', ')}</div>
                </div>
                {selectedStudent.aboutMe && (
                  <div className="pt-2 border-t border-slate-800 text-slate-300">
                    <strong>About Me:</strong> {selectedStudent.aboutMe}
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Activity Section */}
            {(() => {
              const dyn = getStudentDynamic(selectedStudent.levelupdevEmail);
              const pyProgress = dyn?.progress?.python || {};
              const pyDone = Object.values(pyProgress).filter((m) => m.status === 'completed').length;
              const studentApps = applications.filter((a) => a.email.toLowerCase() === selectedStudent.levelupdevEmail.toLowerCase());

              return (
                <div className="space-y-4">
                  <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase">Combined Activity (Historical + Live)</h4>

                  {/* Skill Progress */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Python Trail Progress:</span>
                      <span className="font-mono text-emerald-400 font-bold">{pyDone} / 7 Modules Completed</span>
                    </div>
                  </div>

                  {/* Selected Projects */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <span className="font-bold text-white block">Selected 7-Day Projects ({dyn?.projects?.length || 0}):</span>
                    {dyn?.projects && dyn.projects.length > 0 ? (
                      dyn.projects.map((p) => (
                        <div key={p.projectId} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                          <div>
                            <div className="font-bold text-white">{p.title || p.projectId}</div>
                            <div className="font-mono text-[11px] text-slate-400">Status: {p.status}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {p.githubUrl && (
                              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                GitHub ↗
                              </a>
                            )}
                            {p.liveUrl && (
                              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                                Live Demo ↗
                              </a>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-500 font-mono">No projects selected yet.</span>
                    )}
                  </div>

                  {/* Internship Applications */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <span className="font-bold text-white block">Internship Applications ({studentApps.length}):</span>
                    {studentApps.length > 0 ? (
                      studentApps.map((a) => (
                        <div key={a.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                          <span>{a.internship_title}</span>
                          <span className="font-mono font-bold text-blue-300">{a.status}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-500 font-mono">No applications submitted yet.</span>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: INTERNSHIP APPLICANT DETAIL PANEL */}
      {/* ========================================================================= */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="font-display text-lg font-bold text-white">{selectedApplicant.full_name}</h2>
                <div className="font-mono text-xs text-blue-400">{selectedApplicant.internship_title}</div>
              </div>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div><strong>Email:</strong> {selectedApplicant.email}</div>
                <div><strong>Phone:</strong> {selectedApplicant.phone || 'Not provided'}</div>
                <div><strong>Education:</strong> {selectedApplicant.education}</div>
                <div><strong>Skills:</strong> {selectedApplicant.skills}</div>
                <div><strong>Submitted Date:</strong> {new Date(selectedApplicant.submitted_at).toLocaleString()}</div>
              </div>

              {/* Status Updater */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs font-bold text-slate-400 uppercase">Application Status</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Interested', 'Under Review', 'Selected', 'Not Selected'] as ApplicationStatus[]).map((st) => (
                    <button
                      key={st}
                      disabled={updatingAppId === selectedApplicant.id}
                      onClick={() => handleUpdateAppStatus(selectedApplicant.id, st)}
                      className={`p-2 rounded-xl text-xs font-mono font-bold transition border ${
                        selectedApplicant.status === st
                          ? 'bg-[#006cd2] text-white border-[#006cd2]'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs font-bold text-slate-400 uppercase">Admin Evaluation Notes</label>
                <textarea
                  rows={3}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="Add evaluation remarks or interview feedback..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#006cd2]"
                />
                <button
                  onClick={() => handleUpdateAppStatus(selectedApplicant.id, selectedApplicant.status)}
                  disabled={updatingAppId === selectedApplicant.id}
                  className="px-4 py-2 bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs rounded-xl"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: EXPORT SAFEGUARD MODAL */}
      {/* ========================================================================= */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3 text-blue-400 border-b border-slate-800 pb-3">
              <Download className="w-6 h-6 shrink-0" />
              <h3 className="font-display text-lg font-bold text-white">Export Platform Data?</h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This export contains dynamic student activity data (progress records, project selections, live URLs, and applications) and should be stored securely.
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white font-mono text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePerformExport('all-csv')}
                disabled={isExporting}
                className="px-6 py-2.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-bold transition shadow-lg shadow-[#006cd2]/30 flex items-center gap-2"
              >
                {isExporting ? 'Preparing Export...' : 'Confirm & Export Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
