'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  LayoutDashboard,
  Compass,
  GraduationCap,
  MoreHorizontal,
  Briefcase,
  Flame,
  Trophy,
  Target,
  ShieldCheck,
  X,
  LogOut,
  KeyRound,
  ChevronRight,
  Mic,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { isAdminEmail, isPlacementPrepAllowed, isEnglishCareerAllowed } from '@/lib/content';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { userData, logout, openChangePasswordModal } = useAuth();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Close "More" sheet when route changes
  useEffect(() => {
    setIsMoreOpen(false);
  }, [pathname]);

  // Don't show bottom nav on auth pages (login, signup) or when no user is logged in
  if (!pathname || pathname === '/login' || pathname === '/signup') {
    return null;
  }

  // Active state detection
  const isPortfolioActive = pathname === '/home' || pathname.startsWith('/portfolio');
  const isDashboardActive = pathname === '/dashboard';
  const isRoadmapsActive = pathname.startsWith('/roadmaps');
  const isSkillsActive = pathname.startsWith('/skills');

  // "More" item active check
  const isInternshipsActive = pathname.startsWith('/internships');
  const isDailyActive = pathname.startsWith('/daily');
  const isLeaderboardActive = pathname.startsWith('/leaderboard');
  const isPlacementPrepActive = pathname.startsWith('/placement-preparation');
  const isEnglishCareerActive = pathname.startsWith('/english-career');
  const isAdminActive = pathname.startsWith('/admin');

  const isMoreActive =
    isInternshipsActive ||
    isDailyActive ||
    isLeaderboardActive ||
    isPlacementPrepActive ||
    isEnglishCareerActive ||
    isAdminActive;

  const hasPlacementAccess = isPlacementPrepAllowed(userData?.email);
  const hasEnglishCareerAccess = isEnglishCareerAllowed(userData?.email);
  const hasAdminAccess = isAdminEmail(userData?.email || '');

  const primaryNavItems = [
    {
      label: 'Portfolio',
      href: '/home',
      icon: Sparkles,
      isActive: isPortfolioActive,
      activeColor: 'text-[#006cd2]',
      activeGlow: 'bg-[#006cd2]/15 shadow-[0_0_12px_rgba(0,108,210,0.3)]',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      isActive: isDashboardActive,
      activeColor: 'text-cyan-400',
      activeGlow: 'bg-cyan-500/15 shadow-[0_0_12px_rgba(6,182,212,0.3)]',
    },
    {
      label: 'Roadmaps',
      href: '/roadmaps',
      icon: Compass,
      isActive: isRoadmapsActive,
      activeColor: 'text-indigo-400',
      activeGlow: 'bg-indigo-500/15 shadow-[0_0_12px_rgba(99,102,241,0.3)]',
    },
    {
      label: 'Skills',
      href: '/skills',
      icon: GraduationCap,
      isActive: isSkillsActive,
      activeColor: 'text-sky-400',
      activeGlow: 'bg-sky-500/15 shadow-[0_0_12px_rgba(56,189,248,0.3)]',
    },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* FIXED MOBILE BOTTOM NAVIGATION BAR */}
      {/* ========================================================================= */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/92 backdrop-blur-2xl border-t border-slate-800/80 shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-center justify-around px-2 py-1.5 h-16 max-w-lg mx-auto">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-2xl transition-all duration-200 active:scale-90 ${
                  item.isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Active Indicator Backdrop Pill */}
                {item.isActive && (
                  <motion.div
                    layoutId="mobileNavActivePill"
                    className={`absolute inset-0 rounded-2xl ${item.activeGlow} border border-slate-700/60`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      item.isActive ? `${item.activeColor} scale-110` : 'text-slate-400'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-medium tracking-tight mt-1 ${
                      item.isActive ? `${item.activeColor} font-semibold` : 'text-slate-400'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}

          {/* More Menu Trigger Button */}
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-2xl transition-all duration-200 active:scale-90 ${
              isMoreOpen || isMoreActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-expanded={isMoreOpen}
            aria-label="More navigation options"
          >
            {(isMoreOpen || isMoreActive) && (
              <motion.div
                layoutId="mobileNavActivePill"
                className="absolute inset-0 rounded-2xl bg-amber-500/15 shadow-[0_0_12px_rgba(245,158,11,0.3)] border border-amber-500/30"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}

            <div className="relative z-10 flex flex-col items-center">
              <MoreHorizontal
                className={`w-5 h-5 transition-transform duration-200 ${
                  isMoreOpen || isMoreActive ? 'text-amber-400 scale-110' : 'text-slate-400'
                }`}
              />
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 flex items-center gap-1 ${
                  isMoreOpen || isMoreActive ? 'text-amber-400 font-semibold' : 'text-slate-400'
                }`}
              >
                More
                {isMoreActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
              </span>
            </div>
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* "MORE" BOTTOM SHEET DRAWER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMoreOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreOpen(false)}
              className="md:hidden fixed inset-0 bg-black/75 backdrop-blur-sm z-50"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/98 border-t border-slate-800 rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
              style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
            >
              {/* Sheet Drag Handle & Header */}
              <div className="pt-3 px-6 pb-4 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-3 self-center" />
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-white text-base">
                      Level<span className="text-[#006cd2]">Up</span>Dev
                    </span>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                      Explore More
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMoreOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sheet Scrollable Content */}
              <div className="p-4 overflow-y-auto space-y-4 flex-1">
                {/* User Snapshot Card */}
                {userData && (
                  <div className="bg-slate-900/80 rounded-2xl p-3 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#006cd2]/20 border border-[#006cd2]/30 flex items-center justify-center font-bold text-blue-400">
                        {userData.photoUrl ? (
                          <img
                            src={userData.photoUrl}
                            alt={userData.name}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          userData.name?.charAt(0)?.toUpperCase() || 'U'
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white truncate max-w-[180px]">
                          {userData.name}
                        </div>
                        <div className="text-xs text-slate-400 font-mono truncate max-w-[180px]">
                          {userData.email}
                        </div>
                      </div>
                    </div>

                    {userData.streak && (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-bold">
                        <Flame className="w-3.5 h-3.5 fill-orange-500" />
                        <span>{userData.streak.currentStreak || 0}d</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Primary Navigation Hubs */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-2">
                    Learning & Growth
                  </div>

                  {/* Internships */}
                  <Link
                    href="/internships"
                    className={`flex items-center justify-between p-3 rounded-2xl transition border ${
                      isInternshipsActive
                        ? 'bg-[#006cd2]/15 border-[#006cd2]/40 text-white'
                        : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Internships</div>
                        <div className="text-xs text-slate-400">Apply & build real-world project portfolios</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  {/* Daily Challenge */}
                  <Link
                    href="/daily"
                    className={`flex items-center justify-between p-3 rounded-2xl transition border ${
                      isDailyActive
                        ? 'bg-amber-500/15 border-amber-500/40 text-white'
                        : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <Flame className="w-4 h-4 fill-amber-500" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Daily Challenge</div>
                        <div className="text-xs text-slate-400">Daily DSA problem & streak tracking</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  {/* Leaderboard */}
                  <Link
                    href="/leaderboard"
                    className={`flex items-center justify-between p-3 rounded-2xl transition border ${
                      isLeaderboardActive
                        ? 'bg-purple-500/15 border-purple-500/40 text-white'
                        : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Leaderboard</div>
                        <div className="text-xs text-slate-400">Batch rankings, XP & challenge standings</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>

                  {/* Placement Prep (conditional) */}
                  {hasPlacementAccess && (
                    <Link
                      href="/placement-preparation"
                      className={`flex items-center justify-between p-3 rounded-2xl transition border ${
                        isPlacementPrepActive
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-white'
                          : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Target className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold flex items-center gap-1.5">
                            Placement Prep
                            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                              PRO
                            </span>
                          </div>
                          <div className="text-xs text-slate-400">Curated questions, company rounds & mock prep</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </Link>
                  )}

                  {/* English & Career Communication Trainer (conditional) */}
                  {hasEnglishCareerAccess && (
                    <Link
                      href="/english-career"
                      className={`flex items-center justify-between p-3 rounded-2xl transition border ${
                        isEnglishCareerActive
                          ? 'bg-blue-500/15 border-blue-500/40 text-white'
                          : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                          <Mic className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold flex items-center gap-1.5">
                            English &amp; Career
                            <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-full border border-blue-500/30">
                              PRIVATE
                            </span>
                          </div>
                          <div className="text-xs text-slate-400">Speaking, tech interviews &amp; executive presence</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </Link>
                  )}

                  {/* Admin Panel (conditional) */}
                  {hasAdminAccess && (
                    <Link
                      href="/admin"
                      className={`flex items-center justify-between p-3 rounded-2xl transition border ${
                        isAdminActive
                          ? 'bg-rose-500/15 border-rose-500/40 text-white'
                          : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold flex items-center gap-1.5">
                            Admin Portal
                            <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded-full border border-rose-500/30">
                              ADMIN
                            </span>
                          </div>
                          <div className="text-xs text-slate-400">Manage students, cohorts, and assignments</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </Link>
                  )}
                </div>

                {/* Account Actions */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-2">
                    Account & Security
                  </div>

                  {openChangePasswordModal && (
                    <button
                      onClick={() => {
                        setIsMoreOpen(false);
                        openChangePasswordModal();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-slate-300 hover:bg-slate-900 hover:text-white transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                          <KeyRound className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold">Change Password</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setIsMoreOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
                        <LogOut className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold">Sign Out</span>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
