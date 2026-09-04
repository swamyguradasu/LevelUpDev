'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { isEnglishCareerAllowed } from '@/lib/content';
import {
  TRAINING_TRACKS,
  GRAMMAR_TOPICS,
  VOCABULARY_LIST,
  PRONUNCIATION_LIST,
  SPEAKING_PROMPTS,
  LISTENING_SCENARIOS,
  TECHNICAL_ENGLISH_LESSONS,
  INTERVIEW_ENGLISH_LESSONS,
  PROFESSIONAL_EMAIL_TEMPLATES,
  ASSESSMENT_QUESTIONS,
  getDailyMicroMission,
  VocabularyItem,
  SpeakingPrompt,
  GrammarTopic,
} from '@/data/englishCareerData';
import {
  getEnglishCareerState,
  saveEnglishCareerState,
  calculateEnglishCareerMetrics,
  toggleTopicCompletion,
  toggleFlashcardMastery,
  saveSpeakingJournalEntry,
  logDailyTrainingPart,
  saveAssessmentResult,
  saveTopicNote,
  toggleBookmark,
  EnglishCareerUserState,
  EnglishCareerMetrics,
  createEmptyEnglishCareerState,
  SpeakingJournalEntry,
} from '@/lib/englishCareerStorage';
import {
  Mic,
  MicOff,
  Play,
  Square,
  Volume2,
  CheckCircle2,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  ChevronDown,
  Clock,
  Target,
  Cpu,
  Layers,
  Search,
  Lock,
  RefreshCw,
  Copy,
  Check,
  Headphones,
  FileText,
  TrendingUp,
  BarChart2,
  Calendar,
  Star,
  MessageSquare,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  UserCheck,
  Sliders,
  Send,
} from 'lucide-react';

type ActiveTab =
  | 'dashboard'
  | 'daily'
  | 'grammar'
  | 'vocabulary'
  | 'speaking'
  | 'listening'
  | 'technical'
  | 'interview'
  | 'professional'
  | 'assessment'
  | 'journal'
  | 'progress';

const NAVIGATION_TABS: Array<{ id: ActiveTab; label: string; icon: any }> = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
  { id: 'daily', label: 'Daily Training', icon: Flame },
  { id: 'grammar', label: 'Grammar', icon: CheckCircle2 },
  { id: 'vocabulary', label: 'Vocabulary', icon: BookOpen },
  { id: 'speaking', label: 'Speaking', icon: Mic },
  { id: 'listening', label: 'Listening', icon: Headphones },
  { id: 'technical', label: 'Technical English', icon: Cpu },
  { id: 'interview', label: 'Interview English', icon: Award },
  { id: 'professional', label: 'Professional Comm', icon: Briefcase },
  { id: 'assessment', label: 'Weekly Assessment', icon: FileText },
  { id: 'journal', label: 'Speaking Journal', icon: MessageSquare },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
];

function EnglishCareerContent() {
  const { userData, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab State
  const initialTab = (searchParams.get('tab') as ActiveTab) || 'dashboard';
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);

  // User State & Storage
  const [userState, setUserState] = useState<EnglishCareerUserState | null>(null);
  const [stateLoading, setStateLoading] = useState<boolean>(true);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Security Access Verification
  const hasAccess = isEnglishCareerAllowed(userData?.email);

  // Copy Feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('All');
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState<number>(0);
  const [showFlashcardBack, setShowFlashcardBack] = useState<boolean>(false);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordDuration, setRecordDuration] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedSpeakingPrompt, setSelectedSpeakingPrompt] = useState<SpeakingPrompt>(SPEAKING_PROMPTS[0]);
  const [journalSelfRating, setJournalSelfRating] = useState<number>(5);
  const [journalFillerCount, setJournalFillerCount] = useState<number>(0);
  const [journalReflection, setJournalReflection] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Quiz & Assessment Interactive State
  const [quizSelections, setQuizSelections] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [assessmentCompleted, setAssessmentCompleted] = useState<boolean>(false);

  // Notes Modal / Drawer State
  const [activeNoteTopicId, setActiveNoteTopicId] = useState<string | null>(null);
  const [currentNoteText, setCurrentNoteText] = useState<string>('');

  // Daily Mission Data
  const dailyMission = useMemo(() => getDailyMicroMission(), []);

  // Sync tab with URL query parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab') as ActiveTab;
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Load persistent state
  useEffect(() => {
    if (!userData?.email || !hasAccess) {
      setStateLoading(false);
      return;
    }

    let isMounted = true;
    getEnglishCareerState(userData.email)
      .then((state) => {
        if (isMounted) {
          setUserState(state);
          setStateLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load English Career state:', err);
        if (isMounted) {
          setUserState(createEmptyEnglishCareerState(userData.email!));
          setStateLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [userData?.email, hasAccess]);

  // Computed Metrics
  const metrics: EnglishCareerMetrics = useMemo(() => {
    if (!userState) {
      return calculateEnglishCareerMetrics(createEmptyEnglishCareerState(userData?.email || ''));
    }
    return calculateEnglishCareerMetrics(userState);
  }, [userState, userData?.email]);

  const showNotification = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Switch Tab Handler
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());
  };

  // Copy to Clipboard
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showNotification('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Topic Completion Toggle
  const handleToggleTopic = async (topicId: string) => {
    if (!userState) return;
    try {
      const updated = await toggleTopicCompletion(userState, topicId);
      setUserState(updated);
      const isDone = updated.completedTopicIds.includes(topicId);
      showNotification(isDone ? 'Topic marked as completed!' : 'Topic status updated.');
    } catch (err) {
      console.error('Error toggling topic:', err);
    }
  };

  // Flashcard Mastery Toggle
  const handleToggleMastery = async (vocabId: string) => {
    if (!userState) return;
    try {
      const updated = await toggleFlashcardMastery(userState, vocabId);
      setUserState(updated);
      const isMastered = updated.masteredVocabIds.includes(vocabId);
      showNotification(isMastered ? 'Word added to Mastered Vocabulary!' : 'Word removed from Mastered.');
    } catch (err) {
      console.error('Error toggling vocab mastery:', err);
    }
  };

  // Bookmark Toggle
  const handleToggleBookmark = async (topicId: string) => {
    if (!userState) return;
    try {
      const updated = await toggleBookmark(userState, topicId);
      setUserState(updated);
      const isBookmarked = updated.bookmarkedIds.includes(topicId);
      showNotification(isBookmarked ? 'Bookmarked for review.' : 'Bookmark removed.');
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  // Save Note Handler
  const handleSaveNote = async () => {
    if (!userState || !activeNoteTopicId) return;
    try {
      const updated = await saveTopicNote(userState, activeNoteTopicId, currentNoteText);
      setUserState(updated);
      setActiveNoteTopicId(null);
      showNotification('Note saved successfully!');
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  // Open Note Editor
  const openNoteEditor = (topicId: string) => {
    setActiveNoteTopicId(topicId);
    setCurrentNoteText(userState?.notes[topicId]?.noteText || '');
  };

  // =========================================================================
  // AUDIO RECORDING LOGIC (Web Audio / MediaRecorder)
  // =========================================================================
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordDuration(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access error:', err);
      alert('Microphone access is required to practice speaking. Please enable microphone permissions in your browser.');
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };

  const saveCurrentRecordingToJournal = async () => {
    if (!userState) return;
    try {
      const updated = await saveSpeakingJournalEntry(userState, {
        title: selectedSpeakingPrompt.title,
        promptId: selectedSpeakingPrompt.id,
        promptCategory: selectedSpeakingPrompt.category,
        durationSeconds: recordDuration || 60,
        selfRating: journalSelfRating,
        fillerWordCount: journalFillerCount,
        reflectionNotes: journalReflection || 'Practiced timed engineering delivery and structured articulation.',
        audioBlobUrl: audioUrl || undefined,
        dateStr: new Date().toISOString().split('T')[0],
      });
      setUserState(updated);
      setAudioUrl(null);
      setRecordDuration(0);
      setJournalReflection('');
      setJournalFillerCount(0);
      showNotification('Speaking practice recorded & saved to Journal!');
    } catch (err) {
      console.error('Failed to save journal entry:', err);
    }
  };

  // Complete Daily Micro-Drill Part
  const handleCompleteDailyPart = async (part: 'speech' | 'grammar' | 'vocab') => {
    if (!userState) return;
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const updated = await logDailyTrainingPart(userState, todayStr, part);
      setUserState(updated);
      showNotification(`Daily ${part} challenge completed!`);
    } catch (err) {
      console.error('Error logging daily drill:', err);
    }
  };

  // Submit Assessment
  const handleSubmitAssessment = async () => {
    if (!userState) return;
    let correct = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};

    ASSESSMENT_QUESTIONS.forEach((q) => {
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total += 1;

      if (assessmentAnswers[q.id] === q.correctIndex) {
        correct++;
        categoryBreakdown[q.category].correct += 1;
      }
    });

    const scorePercent = Math.round((correct / ASSESSMENT_QUESTIONS.length) * 100);

    try {
      const updated = await saveAssessmentResult(userState, {
        dateStr: new Date().toISOString().split('T')[0],
        scorePercent,
        totalQuestions: ASSESSMENT_QUESTIONS.length,
        correctCount: correct,
        categoryBreakdown,
      });
      setUserState(updated);
      setAssessmentCompleted(true);
      showNotification(`Weekly Assessment submitted! Score: ${scorePercent}%`);
    } catch (err) {
      console.error('Error saving assessment result:', err);
    }
  };

  // =========================================================================
  // ACCESS CONTROL SECURITY GUARD
  // =========================================================================
  if (loading || (hasAccess && stateLoading)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-400">
        <div className="flex items-center gap-3 bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Verifying Communication Trainer Access &amp; Records...</span>
        </div>
      </div>
    );
  }

  // Unauthorized Account Guard
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center mx-auto text-rose-400 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-mono font-bold rounded-full uppercase tracking-wider">
              Private Security Guard
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              Restricted Portal
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              The English &amp; Career Communication Trainer is an exclusive private module reserved
              for authorized personnel.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-400">
            Authenticated Account: <span className="text-white">{userData?.email || 'Guest'}</span>
          </div>

          <Link
            href="/home"
            className="w-full py-3.5 bg-gradient-to-r from-[#006cd2] to-blue-600 hover:from-[#005bb5] hover:to-blue-700 text-white font-sans font-bold rounded-2xl transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 text-sm"
          >
            <span>Return to LevelUpDev Hub</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Filtered Vocabulary Items
  const filteredVocab = VOCABULARY_LIST.filter((v) => {
    const matchesCat = selectedVocabCategory === 'All' || v.category === selectedVocabCategory;
    const matchesQuery =
      !searchQuery ||
      v.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.corporateContext.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-[#006cd2] selection:text-white flex flex-col relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-[#006cd2]/10 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px]" />
      </div>

      {/* Floating Save Toast */}
      <AnimatePresence>
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-mono shadow-2xl flex items-center gap-2 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note Editor Drawer / Modal */}
      <AnimatePresence>
        {activeNoteTopicId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-white font-bold font-display text-base">
                  <FileText className="w-4 h-4 text-[#006cd2]" />
                  <span>Personal Topic Note</span>
                </div>
                <button
                  onClick={() => setActiveNoteTopicId(null)}
                  className="text-slate-400 hover:text-white text-xs font-mono"
                >
                  ✕ Close
                </button>
              </div>

              <p className="text-xs text-slate-400 font-mono">
                Topic ID: <span className="text-cyan-400">{activeNoteTopicId}</span>
              </p>

              <textarea
                rows={6}
                value={currentNoteText}
                onChange={(e) => setCurrentNoteText(e.target.value)}
                placeholder="Write your personal reminders, power phrases, or speaking nuances here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#006cd2] resize-none"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setActiveNoteTopicId(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-mono text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNote}
                  className="px-5 py-2 bg-[#006cd2] hover:bg-blue-600 text-white rounded-xl text-xs font-mono font-bold shadow-md shadow-blue-500/20"
                >
                  Save Note
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* Top Header Navigation */}
        <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
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
                  <Mic className="w-3.5 h-3.5 text-[#006cd2]" />
                  English &amp; Career Communication Trainer
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-semibold">{metrics.currentLevel}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Training Streak */}
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-orange-400 bg-orange-950/40 border border-orange-800/40 px-3 py-1.5 rounded-xl">
                <Flame className="w-3.5 h-3.5 fill-orange-400 animate-pulse" />
                <span>{metrics.trainingStreak} Day Streak</span>
              </div>

              {/* Overall Readiness Badge */}
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1.5 rounded-xl">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>{metrics.overallReadiness}% Readiness</span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs Ribbon */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-1 border-t border-slate-900">
            {NAVIGATION_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#006cd2] text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
          {/* ========================================================================= */}
          {/* 1. DASHBOARD TAB */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Hero Banner */}
              <section className="relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-emerald-400" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono font-bold tracking-wide">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#006cd2]" />
                      <span>PERSONAL CAREER COMMUNICATION PORTAL</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                      Master English fluency for{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                        global tech leadership.
                      </span>
                    </h1>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Structured daily training for tech interviews, system architecture articulation,
                      constructive code reviews, and executive corporate presence.
                    </p>
                  </div>

                  {/* Readiness Metric Circle Card */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 w-full lg:w-80 space-y-3 text-center shadow-inner">
                    <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
                      Career Communication Readiness
                    </div>
                    <div className="font-display text-4xl font-black text-white flex items-center justify-center gap-2">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                        {metrics.overallReadiness}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#006cd2] to-emerald-400 h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(5, metrics.overallReadiness)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>Level: <b className="text-white">{metrics.currentLevel}</b></span>
                      <span>Streak: <b className="text-orange-400">{metrics.trainingStreak}d</b></span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Core Skill Progress Grid (8 Metrics) */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#006cd2]" />
                    <span>Communication Dimensions &amp; Progress</span>
                  </h2>
                  <span className="text-xs font-mono text-slate-400">
                    Calculated from completed drills &amp; assessments
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Metric 1: Speaking Confidence */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5 text-blue-400" /> Speaking Confidence
                      </span>
                      <span className="text-blue-400 font-bold">{metrics.speakingConfidence}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all"
                        style={{ width: `${metrics.speakingConfidence}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">Pacing, rhythm, and filler word control</p>
                  </div>

                  {/* Metric 2: Grammar Progress */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Technical Grammar
                      </span>
                      <span className="text-emerald-400 font-bold">{metrics.grammarProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all"
                        style={{ width: `${metrics.grammarProgress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">Conditionals, active voice &amp; RFC 2119</p>
                  </div>

                  {/* Metric 3: Vocabulary Progress */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Executive Vocabulary
                      </span>
                      <span className="text-amber-400 font-bold">{metrics.vocabularyProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all"
                        style={{ width: `${metrics.vocabularyProgress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">100+ high-impact corporate collocations</p>
                  </div>

                  {/* Metric 4: Listening Progress */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-indigo-400" /> Stakeholder Listening
                      </span>
                      <span className="text-indigo-400 font-bold">{metrics.listeningProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all"
                        style={{ width: `${metrics.listeningProgress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">Fast-paced global stakeholder briefs</p>
                  </div>

                  {/* Metric 5: Technical English */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Technical English
                      </span>
                      <span className="text-cyan-400 font-bold">{metrics.technicalProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-full rounded-full transition-all"
                        style={{ width: `${metrics.technicalProgress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">Code reviews &amp; architecture defense</p>
                  </div>

                  {/* Metric 6: Interview English */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-purple-400" /> Interview English (STAR)
                      </span>
                      <span className="text-purple-400 font-bold">{metrics.interviewProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-full rounded-full transition-all"
                        style={{ width: `${metrics.interviewProgress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">Behavioral stories &amp; live coding narration</p>
                  </div>

                  {/* Metric 7: Professional Communication */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-teal-400" /> Executive Presence
                      </span>
                      <span className="text-teal-400 font-bold">{metrics.professionalProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2">
                      <div
                        className="bg-teal-500 h-full rounded-full transition-all"
                        style={{ width: `${metrics.professionalProgress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">Email memos, diplomacy &amp; standups</p>
                  </div>

                  {/* Metric 8: Weekly Completion */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-orange-400" /> Weekly Consistency
                      </span>
                      <span className="text-orange-400 font-bold">
                        {metrics.weeklyCompletion.completedDays}/7 Days
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-full rounded-full transition-all"
                        style={{ width: `${metrics.weeklyCompletion.percent}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">Active speech drills over past 7 days</p>
                  </div>
                </div>
              </section>

              {/* Quick Jump Modules Cards */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Today's Daily Training */}
                <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 font-mono text-xs font-bold">
                      <Flame className="w-3.5 h-3.5 fill-orange-400" />
                      <span>TODAY&apos;S MICRO-MISSION</span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-white">
                      {dailyMission.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Impromptu Speech Drill: &ldquo;{dailyMission.speechDrill.prompt}&rdquo;
                    </p>
                  </div>

                  <button
                    onClick={() => handleTabChange('daily')}
                    className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-sans font-bold rounded-xl transition text-xs flex items-center justify-center gap-2"
                  >
                    <span>Start Today&apos;s Training</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card 2: Speaking Sandbox */}
                <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-mono text-xs font-bold">
                      <Mic className="w-3.5 h-3.5" />
                      <span>SPEAKING PRACTICE</span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-white">
                      Speech Sandbox &amp; Audio Journal
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Record timed responses to architectural trade-offs and track filler word counts.
                    </p>
                  </div>

                  <button
                    onClick={() => handleTabChange('speaking')}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-sans font-bold rounded-xl transition text-xs flex items-center justify-center gap-2"
                  >
                    <span>Launch Speech Recorder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card 3: Diagnostic Assessment */}
                <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">
                      <FileText className="w-3.5 h-3.5" />
                      <span>WEEKLY BENCHMARK</span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-white">
                      Diagnostic Communication Assessment
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Evaluate technical grammar, executive vocabulary precision, and diplomatic judgment.
                    </p>
                  </div>

                  <button
                    onClick={() => handleTabChange('assessment')}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-sans font-bold rounded-xl transition text-xs flex items-center justify-center gap-2"
                  >
                    <span>Take Weekly Assessment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. DAILY TRAINING TAB */}
          {/* ========================================================================= */}
          {activeTab === 'daily' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border border-orange-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold rounded-full">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>DAILY MICRO-MISSION</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Date: {dailyMission.dateStr}
                  </span>
                </div>

                <h2 className="text-2xl font-bold font-display text-white">
                  {dailyMission.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Target: Complete today&apos;s 3 micro-drills to maintain your communication streak.
                </p>
              </div>

              {/* 3 Step Daily Mission Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1: Speech Drill */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                        Drill 1: Impromptu Speech
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {dailyMission.speechDrill.targetDurationSeconds}s timer
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-sm">
                      {dailyMission.speechDrill.prompt}
                    </h3>

                    <div className="space-y-1 text-xs text-slate-300">
                      <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                        Key Phrases to Use:
                      </div>
                      <ul className="list-disc list-inside text-cyan-300 text-xs space-y-1">
                        {dailyMission.speechDrill.targetPhrases.map((phrase, idx) => (
                          <li key={idx}>{phrase}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCompleteDailyPart('speech')}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Speech Done</span>
                  </button>
                </div>

                {/* Step 2: Grammar Fix */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                        Drill 2: Grammar Polish
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {dailyMission.grammarDrill.rule}
                      </span>
                    </div>

                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300">
                      <span className="font-bold">Incorrect: </span>
                      &ldquo;{dailyMission.grammarDrill.sentenceWithFlaw}&rdquo;
                    </div>

                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
                      <span className="font-bold">Correct: </span>
                      &ldquo;{dailyMission.grammarDrill.correctSentence}&rdquo;
                    </div>

                    <p className="text-[11px] text-slate-400 italic">
                      Tip: {dailyMission.grammarDrill.hint}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCompleteDailyPart('grammar')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Grammar Done</span>
                  </button>
                </div>

                {/* Step 3: Vocabulary Booster */}
                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                        Drill 3: Word of the Day
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {dailyMission.vocabularyWord.category}
                      </span>
                    </div>

                    <div>
                      <div className="text-xl font-bold font-display text-white">
                        {dailyMission.vocabularyWord.term}
                      </div>
                      <div className="text-xs font-mono text-amber-300">
                        {dailyMission.vocabularyWord.phonetic}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300">
                      {dailyMission.vocabularyWord.definition}
                    </p>

                    <p className="text-[11px] text-slate-400 italic">
                      Example: &ldquo;{dailyMission.vocabularyWord.sampleSentences[0]}&rdquo;
                    </p>
                  </div>

                  <button
                    onClick={() => handleCompleteDailyPart('vocab')}
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-sans font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Word Mastered</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. GRAMMAR TAB */}
          {/* ========================================================================= */}
          {activeTab === 'grammar' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Grammar for Technical &amp; Engineering Leaders</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Eliminate ESL habits and master precise conditional &amp; modal structures.
                  </p>
                </div>
                <div className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {metrics.grammarProgress}% Mastered
                </div>
              </div>

              <div className="space-y-6">
                {GRAMMAR_TOPICS.map((topic) => {
                  const isCompleted = userState?.completedTopicIds.includes(topic.id);
                  const isBookmarked = userState?.bookmarkedIds.includes(topic.id);
                  const selectedQuizAnswer = quizSelections[topic.id];
                  const hasSubmittedQuiz = quizSubmitted[topic.id];

                  return (
                    <div
                      key={topic.id}
                      className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-md"
                    >
                      {/* Card Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold rounded-lg">
                            {topic.level}
                          </span>
                          <h3 className="text-lg font-bold font-display text-white">
                            {topic.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openNoteEditor(topic.id)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Notes</span>
                          </button>
                          <button
                            onClick={() => handleToggleBookmark(topic.id)}
                            className={`p-2 rounded-xl border text-xs font-mono transition ${
                              isBookmarked
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleTopic(topic.id)}
                            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                              isCompleted
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-emerald-500/40'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Rule Summary */}
                      <div className="space-y-2">
                        <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                          CORE PRINCIPLE
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed font-sans">
                          {topic.ruleSummary}
                        </p>
                      </div>

                      {/* Examples Comparison Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {topic.examples.map((ex, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2.5 text-xs"
                          >
                            <div className="font-mono text-cyan-400 font-semibold">
                              Scenario: {ex.scenario}
                            </div>
                            <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300">
                              <span className="font-bold">Avoid: </span>{ex.incorrect}
                            </div>
                            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300">
                              <span className="font-bold">Use Instead: </span>{ex.correct}
                            </div>
                            <p className="text-[11px] text-slate-400 italic">
                              Why: {ex.explanation}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Quick Interactive Knowledge Check */}
                      <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
                        <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>QUICK KNOWLEDGE CHECK</span>
                        </div>
                        <p className="text-xs sm:text-sm text-white font-medium">
                          {topic.quickQuiz.question}
                        </p>

                        <div className="space-y-2">
                          {topic.quickQuiz.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setQuizSelections((prev) => ({ ...prev, [topic.id]: optIdx }));
                                setQuizSubmitted((prev) => ({ ...prev, [topic.id]: true }));
                              }}
                              className={`w-full text-left p-3 rounded-xl font-mono text-xs transition border flex items-center justify-between ${
                                hasSubmittedQuiz
                                  ? optIdx === topic.quickQuiz.correctIndex
                                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                                    : selectedQuizAnswer === optIdx
                                    ? 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                                    : 'bg-slate-900 border-slate-800 text-slate-400'
                                  : selectedQuizAnswer === optIdx
                                  ? 'bg-[#006cd2]/20 border-[#006cd2] text-white'
                                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                              }`}
                            >
                              <span>{opt}</span>
                              {hasSubmittedQuiz && optIdx === topic.quickQuiz.correctIndex && (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                            </button>
                          ))}
                        </div>

                        {hasSubmittedQuiz && (
                          <p className="text-xs text-slate-400 font-mono pt-1">
                            Explanation: {topic.quickQuiz.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. VOCABULARY TAB */}
          {/* ========================================================================= */}
          {activeTab === 'vocabulary' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <span>Executive Tech Vocabulary Flashcards</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    High-impact precision words used in senior architecture and executive strategy.
                  </p>
                </div>
                <div className="font-mono text-xs text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {userState?.masteredVocabIds.length || 0} / {VOCABULARY_LIST.length} Mastered
                </div>
              </div>

              {/* Category Filter & Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                  {['All', 'Executive', 'System Architecture', 'Product & Strategy', 'Agile & Collaboration'].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedVocabCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition ${
                          selectedVocabCategory === cat
                            ? 'bg-amber-600 text-white font-bold'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search terms..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Flashcards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVocab.map((item) => {
                  const isMastered = userState?.masteredVocabIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between backdrop-blur-md relative overflow-hidden"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                            {item.category}
                          </span>
                          <button
                            onClick={() => handleToggleMastery(item.id)}
                            className={`p-1.5 rounded-lg border text-xs transition ${
                              isMastered
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${isMastered ? 'fill-emerald-400' : ''}`} />
                          </button>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold font-display text-white">
                            {item.term}
                          </h3>
                          <div className="text-xs font-mono text-amber-400">
                            {item.phonetic}
                          </div>
                        </div>

                        <p className="text-xs text-slate-200 leading-relaxed">
                          {item.definition}
                        </p>

                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1">
                          <span className="font-mono text-[10px] text-cyan-400 uppercase font-bold">
                            Corporate Context:
                          </span>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            {item.corporateContext}
                          </p>
                        </div>

                        <div className="space-y-1 text-xs">
                          <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">
                            Sample Sentence:
                          </span>
                          <p className="text-slate-300 text-xs italic">
                            &ldquo;{item.sampleSentences[0]}&rdquo;
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-500">
                          Synonyms: {item.synonyms.slice(0, 2).join(', ')}
                        </span>
                        <span className={isMastered ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                          {isMastered ? 'Mastered' : 'Unmastered'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. SPEAKING & PRONUNCIATION TAB */}
          {/* ========================================================================= */}
          {activeTab === 'speaking' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <Mic className="w-5 h-5 text-blue-400" />
                    <span>Speaking Fluency, Pacing &amp; Audio Recorder</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Record voice responses to high-stakes tech scenarios, review audio, and eliminate filler words.
                  </p>
                </div>
                <div className="font-mono text-xs text-blue-400 bg-blue-950/40 border border-blue-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {metrics.speakingConfidence}% Speaking Confidence
                </div>
              </div>

              {/* Interactive Audio Recording Studio */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-blue-400 uppercase font-bold">
                      SELECTED PROMPT
                    </span>
                    <h3 className="text-xl font-bold font-display text-white mt-1">
                      {selectedSpeakingPrompt.title}
                    </h3>
                  </div>

                  {/* Prompt Selector Dropdown */}
                  <select
                    value={selectedSpeakingPrompt.id}
                    onChange={(e) => {
                      const found = SPEAKING_PROMPTS.find((p) => p.id === e.target.value);
                      if (found) setSelectedSpeakingPrompt(found);
                    }}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-[#006cd2]"
                  >
                    {SPEAKING_PROMPTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Scenario & Key Guidance */}
                <div className="space-y-3">
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    <b className="text-white">Scenario: </b>{selectedSpeakingPrompt.scenario}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                      <div className="font-mono text-xs text-cyan-400 font-bold uppercase">
                        Points to Cover:
                      </div>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                        {selectedSpeakingPrompt.bulletPointsToCover.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                      <div className="font-mono text-xs text-rose-400 font-bold uppercase">
                        Filler Words Watchlist:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSpeakingPrompt.fillerWordWatchlist.map((w, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-mono"
                          >
                            &ldquo;{w}&rdquo;
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recorder Control Bar */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={isRecording ? stopAudioRecording : startAudioRecording}
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition shadow-lg ${
                        isRecording
                          ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                          : 'bg-blue-600 hover:bg-blue-500 text-white'
                      }`}
                    >
                      {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>

                    <div>
                      <div className="font-display font-bold text-white text-base">
                        {isRecording ? 'Recording in progress...' : 'Ready to record speech'}
                      </div>
                      <div className="font-mono text-xs text-slate-400">
                        {isRecording ? `Timer: ${recordDuration}s / ${selectedSpeakingPrompt.timeLimitSeconds}s` : 'Press mic to begin speaking'}
                      </div>
                    </div>
                  </div>

                  {/* Audio Playback Player if Recorded */}
                  {audioUrl && !isRecording && (
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <audio controls src={audioUrl} className="h-9 w-full sm:w-64" />
                    </div>
                  )}
                </div>

                {/* Self-Reflection & Journal Save Drawer */}
                {audioUrl && !isRecording && (
                  <div className="p-5 rounded-2xl bg-slate-950/90 border border-blue-500/30 space-y-4">
                    <div className="font-mono text-xs text-blue-400 font-bold uppercase">
                      SELF-EVALUATION &amp; JOURNAL LOGGING
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400">Self-Rating (Fluency &amp; Clarity):</label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setJournalSelfRating(star)}
                              className="text-amber-400"
                            >
                              <Star className={`w-5 h-5 ${journalSelfRating >= star ? 'fill-amber-400' : 'text-slate-600'}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400">Filler Words Counted (um/like/actually):</label>
                        <input
                          type="number"
                          min="0"
                          value={journalFillerCount}
                          onChange={(e) => setJournalFillerCount(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-400">Reflection Notes:</label>
                      <input
                        type="text"
                        value={journalReflection}
                        onChange={(e) => setJournalReflection(e.target.value)}
                        placeholder="What went well? Where did you hesitate?"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200"
                      />
                    </div>

                    <button
                      onClick={saveCurrentRecordingToJournal}
                      className="w-full py-3 bg-[#006cd2] hover:bg-blue-600 text-white font-sans font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
                    >
                      <SaveJournalIcon className="w-4 h-4" />
                      <span>Save Practice to Speaking Journal</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Pronunciation & Phonetics Directory */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Tech Pronunciation &amp; Syllable Stress Guides</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PRONUNCIATION_LIST.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold font-display text-white">
                          {item.term}
                        </span>
                        <span className="text-xs font-mono text-cyan-400">
                          {item.phonetic}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-amber-300">
                        Stress: {item.syllableBreakdown}
                      </div>

                      <p className="text-xs text-slate-300">
                        <b className="text-rose-400">Avoid: </b>{item.commonMispronunciation}
                      </p>

                      <p className="text-xs text-slate-400 italic">
                        &ldquo;{item.practiceSentence}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. LISTENING TAB */}
          {/* ========================================================================= */}
          {activeTab === 'listening' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-indigo-400" />
                    <span>Global Stakeholder Listening Comprehension</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Process rapid architectural briefings and subtle product requirement changes.
                  </p>
                </div>
                <div className="font-mono text-xs text-indigo-400 bg-indigo-950/40 border border-indigo-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {metrics.listeningProgress}% Completed
                </div>
              </div>

              <div className="space-y-6">
                {LISTENING_SCENARIOS.map((scenario) => (
                  <div
                    key={scenario.id}
                    className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono text-indigo-400 uppercase font-bold">
                          {scenario.speakerRole} ({scenario.accent})
                        </span>
                        <h3 className="text-lg font-bold font-display text-white mt-0.5">
                          {scenario.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-slate-500">
                        {scenario.durationApprox}
                      </span>
                    </div>

                    {/* Audio Transcript Box */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                      {scenario.audioTranscript}
                    </div>

                    <p className="text-xs text-cyan-300 font-mono italic">
                      Context Note: {scenario.contextNote}
                    </p>

                    {/* Comprehension Questions */}
                    <div className="space-y-4 pt-2">
                      <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                        Comprehension Verification:
                      </div>

                      {scenario.questions.map((q) => {
                        const selected = quizSelections[q.id];
                        const submitted = quizSubmitted[q.id];

                        return (
                          <div
                            key={q.id}
                            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5"
                          >
                            <p className="text-xs font-bold text-white">
                              {q.question}
                            </p>

                            <div className="space-y-1.5">
                              {q.options.map((opt, optIdx) => (
                                <button
                                  key={optIdx}
                                  onClick={() => {
                                    setQuizSelections((prev) => ({ ...prev, [q.id]: optIdx }));
                                    setQuizSubmitted((prev) => ({ ...prev, [q.id]: true }));
                                  }}
                                  className={`w-full text-left p-2.5 rounded-xl font-mono text-xs transition border flex items-center justify-between ${
                                    submitted
                                      ? optIdx === q.correctIndex
                                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                                        : selected === optIdx
                                        ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                                        : 'bg-slate-900 border-slate-800 text-slate-400'
                                      : selected === optIdx
                                      ? 'bg-indigo-950 border-indigo-500 text-white'
                                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                                  }`}
                                >
                                  <span>{opt}</span>
                                </button>
                              ))}
                            </div>

                            {submitted && (
                              <p className="text-[11px] text-slate-400 font-mono">
                                {q.explanation}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. TECHNICAL ENGLISH TAB */}
          {/* ========================================================================= */}
          {activeTab === 'technical' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <span>Technical English &amp; Architectural Articulation</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Constructive code reviews, blameless postmortems, and crisp RFC design documents.
                  </p>
                </div>
                <div className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {metrics.technicalProgress}% Mastered
                </div>
              </div>

              <div className="space-y-6">
                {TECHNICAL_ENGLISH_LESSONS.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                          {lesson.focusArea}
                        </span>
                        <h3 className="text-xl font-bold font-display text-white mt-0.5">
                          {lesson.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                        {lesson.framework}
                      </span>
                    </div>

                    {/* Good vs Bad Examples */}
                    <div className="space-y-4">
                      {lesson.goodVsBadExamples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                        >
                          <div className="font-mono text-xs text-white font-bold">
                            Situation: {ex.situation}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 space-y-1">
                              <span className="font-bold font-mono text-[10px] uppercase block">
                                Unprofessional / Abrasive:
                              </span>
                              &ldquo;{ex.unprofessional}&rdquo;
                            </div>

                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                              <span className="font-bold font-mono text-[10px] uppercase block">
                                High-Impact Engineering Leadership:
                              </span>
                              &ldquo;{ex.professional}&rdquo;
                            </div>
                          </div>

                          <p className="text-xs text-slate-400 italic">
                            Key Distinction: {ex.keyDifference}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Reusable Templates with Copy */}
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                        Reusable Fill-in-the-Blank Patterns:
                      </div>

                      {lesson.templates.map((tpl, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <span className="font-mono text-xs font-bold text-cyan-400">
                              {tpl.name}
                            </span>
                            <p className="text-xs text-slate-300 font-mono">
                              Pattern: {tpl.pattern}
                            </p>
                            <p className="text-xs text-slate-400 italic">
                              Example: &ldquo;{tpl.fillInExample}&rdquo;
                            </p>
                          </div>

                          <button
                            onClick={() => handleCopyText(tpl.fillInExample, `${lesson.id}_${tIdx}`)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                          >
                            {copiedId === `${lesson.id}_${tIdx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copiedId === `${lesson.id}_${tIdx}` ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 8. INTERVIEW ENGLISH TAB */}
          {/* ========================================================================= */}
          {activeTab === 'interview' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-400" />
                    <span>Tech Interview Communication &amp; STAR Method</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Behavioral mastery, system design trade-off narratives, and thinking aloud during live coding.
                  </p>
                </div>
                <div className="font-mono text-xs text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {metrics.interviewProgress}% Completed
                </div>
              </div>

              <div className="space-y-6">
                {INTERVIEW_ENGLISH_LESSONS.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono text-purple-400 uppercase font-bold">
                          {lesson.interviewType}
                        </span>
                        <h3 className="text-xl font-bold font-display text-white mt-0.5">
                          {lesson.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                        Framework: {lesson.framework}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-xs sm:text-sm text-purple-200">
                      <b className="text-white">Sample Interview Question: </b>
                      &ldquo;{lesson.sampleQuestion}&rdquo;
                    </div>

                    {/* Step-by-Step Breakdown Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {lesson.breakdown.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5"
                        >
                          <span className="font-mono text-xs font-bold text-cyan-400">
                            {step.phase}
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {step.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* High-Scoring Model Response */}
                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center justify-between">
                        <span>MODEL HIGH-SCORING RESPONSE:</span>
                        <button
                          onClick={() => handleCopyText(lesson.sampleHighScoringAnswer, lesson.id)}
                          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
                        >
                          {copiedId === lesson.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === lesson.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                        {lesson.sampleHighScoringAnswer}
                      </div>
                    </div>

                    {/* Power Phrases */}
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                        ANCHOR POWER PHRASES:
                      </span>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                        {lesson.powerPhrases.map((phrase, pIdx) => (
                          <li key={pIdx} className="italic">&ldquo;{phrase}&rdquo;</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 9. PROFESSIONAL EMAIL TAB */}
          {/* ========================================================================= */}
          {activeTab === 'professional' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-teal-400" />
                    <span>Executive Email &amp; Workplace Presence</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Proactive delay notices, diplomatic scope pushback, and promotion cases.
                  </p>
                </div>
                <div className="font-mono text-xs text-teal-400 bg-teal-950/40 border border-teal-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {metrics.professionalProgress}% Templates Mastered
                </div>
              </div>

              <div className="space-y-6">
                {PROFESSIONAL_EMAIL_TEMPLATES.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono text-teal-400 uppercase font-bold">
                          {tmpl.category}
                        </span>
                        <h3 className="text-xl font-bold font-display text-white mt-0.5">
                          {tmpl.title}
                        </h3>
                      </div>

                      <button
                        onClick={() => handleCopyText(`Subject: ${tmpl.subjectLine}\n\n${tmpl.body}`, tmpl.id)}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-md"
                      >
                        {copiedId === tmpl.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === tmpl.id ? 'Copied Full Email' : 'Copy Template'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 italic">
                      <b className="text-white not-italic">Scenario Context: </b>{tmpl.scenario}
                    </p>

                    {/* Email Window Preview */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden text-xs sm:text-sm font-sans">
                      <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 font-mono text-xs text-slate-300">
                        <span className="text-slate-500">Subject: </span>
                        <span className="text-white font-bold">{tmpl.subjectLine}</span>
                      </div>
                      <div className="p-5 text-slate-200 whitespace-pre-line leading-relaxed">
                        {tmpl.body}
                      </div>
                    </div>

                    {/* Key Strategic Principles */}
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                        KEY EXECUTIVE PRINCIPLES:
                      </span>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                        {tmpl.keyTakeaways.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 10. WEEKLY ASSESSMENT TAB */}
          {/* ========================================================================= */}
          {activeTab === 'assessment' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <span>Weekly Communication Diagnostic Benchmark</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Comprehensive 5-question evaluation testing technical grammar, vocabulary precision, and interview leadership.
                  </p>
                </div>
                <div className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {userState?.assessmentHistory.length || 0} Assessments Completed
                </div>
              </div>

              {assessmentCompleted ? (
                <div className="p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/40 space-y-6 text-center max-w-xl mx-auto shadow-2xl">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-display text-white">
                      Assessment Submitted!
                    </h3>
                    <p className="text-xs text-slate-300">
                      Your diagnostic score has been recorded and factored into your overall Career Communication Readiness index.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setAssessmentCompleted(false);
                      setAssessmentAnswers({});
                    }}
                    className="px-6 py-3 bg-[#006cd2] hover:bg-blue-600 text-white font-sans font-bold text-xs rounded-xl transition"
                  >
                    Retake Assessment
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {ASSESSMENT_QUESTIONS.map((q, idx) => {
                    const selected = assessmentAnswers[q.id];
                    return (
                      <div
                        key={q.id}
                        className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-emerald-400 uppercase font-bold">
                            Question {idx + 1} of {ASSESSMENT_QUESTIONS.length} • {q.category}
                          </span>
                        </div>

                        <p className="text-sm font-bold text-white leading-relaxed font-sans">
                          {q.question}
                        </p>

                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() =>
                                setAssessmentAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                              }
                              className={`w-full text-left p-3.5 rounded-xl font-mono text-xs transition border flex items-center justify-between ${
                                selected === optIdx
                                  ? 'bg-[#006cd2]/20 border-[#006cd2] text-white'
                                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                              }`}
                            >
                              <span>{opt}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  <button
                    onClick={handleSubmitAssessment}
                    disabled={Object.keys(assessmentAnswers).length < ASSESSMENT_QUESTIONS.length}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-sans font-bold text-sm rounded-2xl transition disabled:opacity-50 shadow-xl shadow-emerald-500/20"
                  >
                    Submit Assessment &amp; Update Readiness Index
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 11. SPEAKING JOURNAL TAB */}
          {/* ========================================================================= */}
          {activeTab === 'journal' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                    <span>Speaking Journal &amp; Self-Reflection Archive</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Review past speech recordings, self-evaluation scores, and filler word reductions.
                  </p>
                </div>
                <div className="font-mono text-xs text-blue-400 bg-blue-950/40 border border-blue-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {userState?.journalEntries.length || 0} Recorded Sessions
                </div>
              </div>

              {userState?.journalEntries.length === 0 ? (
                <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-4">
                  <Mic className="w-10 h-10 text-slate-600 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">No Speaking Sessions Yet</h3>
                    <p className="text-xs text-slate-400">
                      Head over to the Speaking tab to record your first 60-second architecture pitch!
                    </p>
                  </div>
                  <button
                    onClick={() => handleTabChange('speaking')}
                    className="px-5 py-2.5 bg-[#006cd2] text-white rounded-xl text-xs font-mono font-bold"
                  >
                    Go to Speaking Studio
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userState?.journalEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                        <div>
                          <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">
                            {entry.promptCategory || 'Impromptu Speech'}
                          </span>
                          <h4 className="text-base font-bold font-display text-white">
                            {entry.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span className="text-slate-400">{entry.dateStr}</span>
                          <span className="text-amber-400 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            {entry.selfRating}/5 Stars
                          </span>
                          <span className="text-rose-400">
                            {entry.fillerWordCount} Fillers
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 italic">
                        Reflection: &ldquo;{entry.reflectionNotes}&rdquo;
                      </p>

                      {entry.audioBlobUrl && (
                        <audio controls src={entry.audioBlobUrl} className="h-8 w-full sm:w-72 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 12. PROGRESS OVERVIEW TAB */}
          {/* ========================================================================= */}
          {activeTab === 'progress' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <span>Holistic Communication Mastery Breakdown</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Cross-track completion across all 8 specialized career communication tracks.
                  </p>
                </div>
                <div className="font-mono text-xs text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {metrics.overallReadiness}% Overall Index
                </div>
              </div>

              {/* Tracks Curriculum Directory */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TRAINING_TRACKS.map((track) => (
                  <div
                    key={track.id}
                    className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                          {track.category} TRACK
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          ~{track.estimatedHours} Hours
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-display text-white">
                        {track.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {track.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">
                        {track.totalModules} Core Lessons
                      </span>
                      <button
                        onClick={() => {
                          if (track.id === 'grammar') handleTabChange('grammar');
                          else if (track.id === 'vocabulary') handleTabChange('vocabulary');
                          else if (track.id === 'speaking') handleTabChange('speaking');
                          else if (track.id === 'listening') handleTabChange('listening');
                          else if (track.id === 'technical') handleTabChange('technical');
                          else if (track.id === 'interview') handleTabChange('interview');
                          else if (track.id === 'professional') handleTabChange('professional');
                          else handleTabChange('daily');
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-[#006cd2] text-xs font-mono text-slate-200 hover:text-white transition"
                      >
                        Open Track
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function SaveJournalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

export default function EnglishCareerTrainerPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-400">
          <div className="flex items-center gap-3 bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl">
            <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
            <span>Loading English &amp; Career Communication Trainer...</span>
          </div>
        </div>
      }
    >
      <EnglishCareerContent />
    </React.Suspense>
  );
}

