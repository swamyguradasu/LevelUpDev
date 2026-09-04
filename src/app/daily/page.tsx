'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  DAILY_CHALLENGES,
  DailyChallenge,
  getDailyChallengeByDate,
  getUpcomingChallenge,
  getISTDateString,
  getISTFormattedDate,
  CURRICULUM_START_DATE,
} from '@/data/dailyChallenges';
import {
  Flame,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Calendar,
  Code2,
  ChevronRight,
  ChevronDown,
  Clock,
  Target,
  Cpu,
  Layers,
  ArrowRight,
  BookOpen,
  Trophy,
  Check,
  Copy,
  Info,
  Compass,
  Zap,
  Lock,
} from 'lucide-react';

const PROGRAMMING_LANGUAGES = [
  'Python',
  'JavaScript',
  'TypeScript',
  'Java',
  'C++',
  'Go',
  'Rust',
  'C#',
  'Other',
];

export default function DailyChallengePage() {
  const { userData, loading, recordDailySolve } = useAuth();
  const router = useRouter();

  // Selected date state (defaults to today in IST)
  const [currentDateStr, setCurrentDateStr] = useState<string>('');
  const [userCode, setUserCode] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Python');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false);
  const [solutionCopied, setSolutionCopied] = useState<boolean>(false);
  const [showPastCurriculum, setShowPastCurriculum] = useState<boolean>(false);
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('All');
  const [showSolutionPreview, setShowSolutionPreview] = useState<boolean>(false);

  // Initialize date in IST on mount
  useEffect(() => {
    const istDate = getISTDateString();
    setCurrentDateStr(istDate);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  // Derive daily challenge information for current date
  const challengeData = useMemo(() => {
    if (!currentDateStr) return getDailyChallengeByDate();
    return getDailyChallengeByDate(currentDateStr);
  }, [currentDateStr]);

  // Tomorrow's upcoming challenge
  const upcomingData = useMemo(() => {
    if (!currentDateStr) return getUpcomingChallenge();
    return getUpcomingChallenge(currentDateStr);
  }, [currentDateStr]);

  // Check if today's challenge is completed by user
  const isCompletedToday = useMemo(() => {
    if (!userData || !currentDateStr) return false;

    // 1. Check dailyChallengeProgress map
    if (userData.dailyChallengeProgress?.[currentDateStr]) {
      return true;
    }

    // 2. Check calendarActivity or streak solvedDates
    if (userData.streak?.solvedDates?.includes(currentDateStr)) {
      return true;
    }

    return false;
  }, [userData, currentDateStr]);

  // Submission record for today if completed
  const todaySubmission = useMemo(() => {
    if (!userData?.dailyChallengeProgress || !currentDateStr) return null;
    return userData.dailyChallengeProgress[currentDateStr] || null;
  }, [userData, currentDateStr]);

  // Total unique problems completed in curriculum
  const totalCompletedCount = useMemo(() => {
    if (!userData) return 0;
    if (userData.dailyChallengeCompletedIds && userData.dailyChallengeCompletedIds.length > 0) {
      return userData.dailyChallengeCompletedIds.length;
    }
    if (userData.dailyChallengeProgress) {
      return Object.keys(userData.dailyChallengeProgress).length;
    }
    return userData.streak?.solvedDates?.length || 0;
  }, [userData]);

  const currentStreak = userData?.streak?.currentStreak || 0;
  const progressPercent = Math.min(
    100,
    Math.round((totalCompletedCount / DAILY_CHALLENGES.length) * 100)
  );

  // All distinct phases for curriculum filter
  const allPhases = useMemo(() => {
    const phases = Array.from(new Set(DAILY_CHALLENGES.map((c) => c.phase)));
    return ['All', ...phases];
  }, []);

  const filteredCurriculum = useMemo(() => {
    if (selectedPhaseFilter === 'All') return DAILY_CHALLENGES;
    return DAILY_CHALLENGES.filter((c) => c.phase === selectedPhaseFilter);
  }, [selectedPhaseFilter]);

  const handleSubmitCompletion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData || isCompletedToday) return;

    setSubmitting(true);
    try {
      await recordDailySolve(currentDateStr, {
        challengeId: challengeData.challenge.id,
        sequenceNumber: challengeData.sequenceNumber,
        language: selectedLanguage,
        submittedSolution: userCode,
        problemTitle: challengeData.challenge.title,
        leetcodeNumber: challengeData.challenge.leetcodeNumber,
      });
      setShowCelebrationModal(true);
    } catch (err) {
      console.error('Failed to record daily solve:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const copySolutionToClipboard = () => {
    const codeToCopy = todaySubmission?.submittedSolution || userCode;
    if (codeToCopy) {
      navigator.clipboard.writeText(codeToCopy);
      setSolutionCopied(true);
      setTimeout(() => setSolutionCopied(false), 2000);
    }
  };

  // Difficulty badge styling
  const getDifficultyBadge = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Easy
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Medium
          </span>
        );
      case 'Hard':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Hard
          </span>
        );
      default:
        return null;
    }
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200 font-mono text-sm">
        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Loading Daily DSA Challenge...</span>
        </div>
      </div>
    );
  }

  const { challenge } = challengeData;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-[#006cd2] selection:text-white flex flex-col relative overflow-x-hidden">
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-[#006cd2]/10 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* ========================================================================= */}
        {/* CELEBRATION MODAL POPUP */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {showCelebrationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-emerald-400" />

                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center text-orange-400 shadow-inner">
                  <Flame className="w-10 h-10 fill-current animate-pulse" />
                </div>

                <div className="space-y-2">
                  <span className="px-3.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Challenge Completed!
                  </span>
                  <h3 className="font-display text-2xl font-black text-white tracking-tight">
                    Streak Leveled Up!
                  </h3>
                  <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                    Great job completing today&apos;s DSA mission on LeetCode! Your streak and curriculum progress have been recorded.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
                  <div className="space-y-1">
                    <div className="font-mono text-[11px] text-slate-400 uppercase font-semibold">
                      Current Streak
                    </div>
                    <div className="font-display text-2xl font-black text-orange-400 flex items-center gap-1.5">
                      <Flame className="w-5 h-5 fill-current" />
                      <span>{currentStreak} Days</span>
                    </div>
                  </div>
                  <div className="space-y-1 border-l border-slate-800 pl-3">
                    <div className="font-mono text-[11px] text-slate-400 uppercase font-semibold">
                      Total Solved
                    </div>
                    <div className="font-display text-2xl font-black text-white flex items-center gap-1.5">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <span>{totalCompletedCount} / 268</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowCelebrationModal(false)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#006cd2] to-blue-600 hover:from-[#005bb5] hover:to-blue-700 text-white font-sans font-bold rounded-2xl transition shadow-lg shadow-blue-500/25 text-sm"
                >
                  Awesome, Continue Practice
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header Navigation */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/home"
                className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
              >
                <ChevronRight className="w-3.5 h-3.5 rotate-180 text-[#006cd2]" />
                <span>Back to Home</span>
              </Link>
              <div className="h-4 w-px bg-slate-800 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-blue-400 font-semibold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#006cd2]" />
                  Daily DSA Tracker
                </span>
                <span className="text-slate-600">•</span>
                <span>Asia/Kolkata (IST)</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Streak Badge */}
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-orange-400 bg-orange-950/40 border border-orange-800/40 px-3 py-1.5 rounded-xl">
                <Flame className="w-3.5 h-3.5 fill-orange-400 animate-pulse" />
                <span>{currentStreak} Day Streak</span>
              </div>

              {/* Solved Count Badge */}
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                <span>{totalCompletedCount} / 268</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Dashboard */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 flex-1">
          {/* ========================================================================= */}
          {/* 1. HERO MISSION SECTION */}
          {/* ========================================================================= */}
          <section className="relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-indigo-500" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-[#006cd2]" />
                  <span>DAILY DSA PROBLEM TRACKER</span>
                  {challengeData.isPreview && (
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded text-[10px]">
                      Preview Mode (Starts Sep 1)
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{challengeData.formattedDate}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">
                      Day {challengeData.dayNumber} of {challengeData.totalDays}
                    </span>
                    {challengeData.cycle > 1 && (
                      <span className="text-cyan-400 font-semibold">
                        (Cycle {challengeData.cycle})
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                    Build your DSA consistency{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                      one problem at a time.
                    </span>
                  </h1>
                </div>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Solve today&apos;s curated algorithm on LeetCode. Then paste your working solution
                  to track completion and power your persistent streak.
                </p>
              </div>

              {/* Progress Summary Card */}
              <div className="w-full lg:w-80 bg-slate-950/70 border border-slate-800/90 rounded-2xl p-5 space-y-4 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#006cd2]" />
                    268-Day DSA Journey
                  </span>
                  <span className="font-mono text-xs font-bold text-blue-400">
                    {progressPercent}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-[#006cd2] via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.max(5, progressPercent)}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-center pt-1 border-t border-slate-800/60 font-mono text-xs">
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-semibold">
                      Problems Solved
                    </div>
                    <div className="text-white font-bold text-sm mt-0.5">
                      {totalCompletedCount}{' '}
                      <span className="text-slate-500 text-xs font-normal">/ 268</span>
                    </div>
                  </div>
                  <div className="border-l border-slate-800/60 pl-2">
                    <div className="text-slate-500 text-[10px] uppercase font-semibold">
                      Current Streak
                    </div>
                    <div className="text-orange-400 font-bold text-sm mt-0.5 flex items-center justify-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-orange-400" />
                      <span>{currentStreak} Days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cycle completion special milestone banner */}
            {challengeData.isCycleCompleted && (
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-blue-950/40 to-indigo-950/40 border border-emerald-500/30 flex items-center gap-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <div className="font-display font-bold text-sm text-emerald-400">
                    Grand Milestone Achieved!
                  </div>
                  <div className="text-xs text-slate-300">
                    You completed the full 268-day DSA curriculum and are now powering through Cycle {challengeData.cycle}!
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* 2. TODAY'S PROBLEM CARD & MISSION DASHBOARD */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Problem Information & Strategy */}
            <div className="lg:col-span-7 space-y-6">
              {/* Today's Problem Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6 relative overflow-hidden">
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-bold">
                      #{challenge.sequenceNumber}
                    </span>
                    <span className="text-slate-400 font-mono text-xs font-medium">
                      {challenge.phase}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {getDifficultyBadge(challenge.difficulty)}
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-slate-800 border border-slate-700 text-slate-300">
                      {challenge.category}
                    </span>
                  </div>
                </div>

                {/* Problem Title & Summary */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      TODAY&apos;S MISSION
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
                      <span>{challenge.title}</span>
                      {challenge.leetcodeNumber && (
                        <span className="text-slate-500 font-mono text-base font-normal">
                          (LeetCode #{challenge.leetcodeNumber})
                        </span>
                      )}
                    </h2>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {challenge.shortDescription}
                  </p>
                </div>

                {/* Strategy, Concepts & Complexity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400 uppercase">
                      <Target className="w-3.5 h-3.5" />
                      <span>Primary Pattern</span>
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {challenge.pattern}
                    </div>
                    <ul className="space-y-1 text-xs text-slate-400 list-disc list-inside">
                      {challenge.keyConcepts.map((concept, idx) => (
                        <li key={idx} className="leading-tight">
                          {concept}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Target Complexity</span>
                    </div>
                    {challenge.expectedComplexity ? (
                      <div className="space-y-1 font-mono text-xs">
                        <div className="flex justify-between py-0.5 border-b border-slate-800/60">
                          <span className="text-slate-400">Time:</span>
                          <span className="text-emerald-400 font-bold">
                            {challenge.expectedComplexity.time}
                          </span>
                        </div>
                        <div className="flex justify-between py-0.5">
                          <span className="text-slate-400">Space:</span>
                          <span className="text-cyan-400 font-bold">
                            {challenge.expectedComplexity.space}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400">Optimal asymptotic efficiency</div>
                    )}
                    <div className="text-[11px] text-slate-500 italic pt-1">
                      Solve with optimal bounds on LeetCode.
                    </div>
                  </div>
                </div>

                {/* Prominent LeetCode External Link Button */}
                <div className="pt-2">
                  <a
                    href={challenge.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 border border-amber-500/30 hover:border-amber-500/60 text-amber-300 hover:text-white font-sans font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/10 group text-sm sm:text-base"
                  >
                    <span>Open Problem on LeetCode</span>
                    <ExternalLink className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <p className="text-center text-[11px] text-slate-500 font-mono mt-2">
                    Opens official problem statement, test cases, and online judge in a new tab.
                  </p>
                </div>
              </div>

              {/* Up Next Card (Tomorrow's Teaser) */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase">
                    <Clock className="w-3.5 h-3.5 text-[#006cd2]" />
                    <span>UP NEXT: TOMORROW&apos;S CHALLENGE</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    Day {upcomingData.dayNumber}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-white text-base">
                        {upcomingData.challenge.title}
                      </span>
                      {getDifficultyBadge(upcomingData.challenge.difficulty)}
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {upcomingData.challenge.phase} • {upcomingData.challenge.pattern}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-slate-500 flex items-center gap-1 self-start sm:self-auto">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlocks in IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Solution Recording & Tracking Section */}
            <div className="lg:col-span-5 space-y-6">
              {isCompletedToday ? (
                /* ========================================================================= */
                /* ALREADY COMPLETED TODAY STATE */
                /* ========================================================================= */
                <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-[#006cd2]" />

                  {/* Completed Header Badge */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>COMPLETED TODAY</span>
                    </div>
                    <span className="font-mono text-xs text-slate-400">
                      Day {challengeData.dayNumber}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-black text-white">
                      {challenge.title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      You have already solved and recorded today&apos;s DSA challenge. Your streak has
                      been updated and saved.
                    </p>
                  </div>

                  {/* Solved Summary Metrics */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-400">Current Streak:</span>
                      <span className="text-orange-400 font-bold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-orange-400" />
                        {currentStreak} Days
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-xs border-t border-slate-800/60 pt-2">
                      <span className="text-slate-400">Curriculum Solved:</span>
                      <span className="text-white font-bold">
                        {totalCompletedCount} / 268 Problems
                      </span>
                    </div>
                    {todaySubmission?.language && (
                      <div className="flex items-center justify-between font-mono text-xs border-t border-slate-800/60 pt-2">
                        <span className="text-slate-400">Language:</span>
                        <span className="text-blue-400 font-bold">
                          {todaySubmission.language}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* View Solution Toggle Drawer */}
                  {todaySubmission?.submittedSolution && (
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowSolutionPreview(!showSolutionPreview)}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition"
                      >
                        <span className="flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 text-[#006cd2]" />
                          <span>View Saved Solution</span>
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${
                            showSolutionPreview ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {showSolutionPreview && (
                        <div className="relative p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto max-h-60">
                          <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-[11px] text-slate-500">
                            <span>{todaySubmission.language} Solution</span>
                            <button
                              onClick={copySolutionToClipboard}
                              className="text-slate-400 hover:text-white flex items-center gap-1 transition"
                            >
                              {solutionCopied ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>{solutionCopied ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                          <pre className="whitespace-pre-wrap leading-relaxed text-slate-200">
                            {todaySubmission.submittedSolution}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {/* LeetCode View Link */}
                  <a
                    href={challenge.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-sans font-semibold rounded-2xl flex items-center justify-center gap-2 transition text-xs"
                  >
                    <span>Review Problem on LeetCode</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              ) : (
                /* ========================================================================= */
                /* ACTIVE SOLUTION SUBMISSION FORM */
                /* ========================================================================= */
                <form
                  onSubmit={handleSubmitCompletion}
                  className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-5 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006cd2] via-blue-500 to-indigo-600" />

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-bold text-white tracking-tight">
                        Solved it on LeetCode?
                      </h3>
                      <span className="font-mono text-xs text-blue-400 font-semibold">
                        Step 4 of 5
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Complete the problem on LeetCode first. Then paste your accepted solution here
                      so LevelUpDev can record today&apos;s completion.
                    </p>
                  </div>

                  {/* Transparent Disclosure Notice */}
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-2.5 text-xs text-blue-300">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      LevelUpDev does not run or compile your code. Solve and get Accepted on
                      LeetCode first. LevelUpDev tracks your completion record and streak.
                    </span>
                  </div>

                  {/* Language Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300 font-semibold">
                      Programming Language:
                    </label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#006cd2] transition"
                    >
                      {PROGRAMMING_LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Solution Textarea */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-300 font-semibold">
                      Paste Accepted Solution:
                    </label>
                    <div className="relative">
                      <textarea
                        rows={7}
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        placeholder={`// Paste your accepted ${selectedLanguage} solution from LeetCode here...\nclass Solution:\n    def ${challenge.slug.replace(/-/g, '_')}(self):\n        pass`}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#006cd2] transition resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Mark Complete Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-[#006cd2] via-blue-600 to-indigo-600 hover:from-[#005bb5] hover:to-blue-700 text-white font-sans font-bold rounded-2xl transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Recording Daily Challenge...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>Mark Challenge Complete</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. YOUR DSA JOURNEY & 268 CURRICULUM EXPLORER */}
          {/* ========================================================================= */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#006cd2]" />
                  <span>268-Problem DSA Curriculum Directory</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Curated progression from Beginner to Advanced Interview Mastery.
                </p>
              </div>

              <button
                onClick={() => setShowPastCurriculum(!showPastCurriculum)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono font-semibold text-slate-200 transition self-start sm:self-auto"
              >
                <span>{showPastCurriculum ? 'Collapse Directory' : 'Explore All 268 Problems'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    showPastCurriculum ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Collapsible Curriculum Browser */}
            {showPastCurriculum && (
              <div className="space-y-4 pt-2">
                {/* Phase Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {allPhases.map((phase) => (
                    <button
                      key={phase}
                      onClick={() => setSelectedPhaseFilter(phase)}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition ${
                        selectedPhaseFilter === phase
                          ? 'bg-[#006cd2] text-white shadow-md'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {phase}
                    </button>
                  ))}
                </div>

                {/* Problem List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                  {filteredCurriculum.map((p) => {
                    const isProblemSolved =
                      userData?.dailyChallengeCompletedIds?.includes(p.id) ||
                      (p.id === challenge.id && isCompletedToday);

                    return (
                      <div
                        key={p.id}
                        className={`p-3.5 rounded-2xl border transition flex flex-col justify-between gap-2 ${
                          p.id === challenge.id
                            ? 'bg-blue-500/10 border-blue-500/40 shadow-sm'
                            : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-slate-500">Day {p.sequenceNumber}</span>
                            {isProblemSolved ? (
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <Check className="w-3 h-3" /> Solved
                              </span>
                            ) : p.id === challenge.id ? (
                              <span className="text-blue-400 font-bold">Today</span>
                            ) : (
                              <span className="text-slate-600">Pending</span>
                            )}
                          </div>
                          <div className="font-display font-bold text-white text-sm line-clamp-1">
                            {p.title}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            {p.pattern} • {p.category}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-xs">
                          {getDifficultyBadge(p.difficulty)}
                          <a
                            href={p.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                          >
                            <span>LeetCode</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
