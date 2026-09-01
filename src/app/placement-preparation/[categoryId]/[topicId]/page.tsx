'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { isPlacementPrepAllowed } from '@/lib/content';
import {
  getPlacementCategoryById,
  getPlacementTopicById,
} from '@/data/placementPrepData';
import {
  getPlacementUserState,
  updateTopicStatus,
  savePlacementTopicNote,
  togglePlacementBookmark,
  PlacementUserState,
  createEmptyPlacementState,
} from '@/lib/placementStorage';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Code2,
  ExternalLink,
  Target,
  Layers,
  Lightbulb,
  Lock,
  MessageSquare,
  CheckSquare,
  Clock,
  StickyNote,
  Save,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  Circle,
} from 'lucide-react';

export default function PlacementTopicLearningPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.categoryId as string;
  const topicId = params.topicId as string;

  const { userData, loading } = useAuth();
  const category = getPlacementCategoryById(categoryId);
  const topicData = getPlacementTopicById(categoryId, topicId);

  const [copied, setCopied] = useState(false);
  const [placementState, setPlacementState] = useState<PlacementUserState | null>(null);
  const [stateLoading, setStateLoading] = useState(true);
  const [personalNote, setPersonalNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Check access permission
  const hasAccess = isPlacementPrepAllowed(userData?.email);

  // Load personal placement state
  useEffect(() => {
    if (!userData?.email || !hasAccess) {
      setStateLoading(false);
      return;
    }

    let isMounted = true;
    getPlacementUserState(userData.email)
      .then((state) => {
        if (isMounted) {
          setPlacementState(state);
          const savedNote = state.notes[topicId]?.noteText || '';
          setPersonalNote(savedNote);
          setLastSaved(state.notes[topicId]?.updatedAt ? new Date(state.notes[topicId].updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null);
          setStateLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load placement state:', err);
        if (isMounted) {
          setPlacementState(createEmptyPlacementState(userData.email!));
          setStateLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [userData?.email, hasAccess, topicId]);

  if (loading || (hasAccess && stateLoading)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-400">
        <div className="flex items-center gap-3 bg-slate-900 px-6 py-4 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Verifying Placement Preparation Credentials...</span>
        </div>
      </div>
    );
  }

  // Access Denied
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 bg-slate-800/80 border border-slate-700 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">Personal Workspace Only</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              This roadmap module is private to authorized accounts.
            </p>
          </div>
          <Link
            href="/home"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold rounded-xl transition shadow-md shadow-[#006cd2]/30"
          >
            <ArrowLeft className="w-4 h-4" /> Return to My Portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (!category || !topicData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans">
        <div className="text-center space-y-4 max-w-md bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-800">
          <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-blue-400">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-display text-white">Topic Not Found</h2>
          <p className="text-xs text-slate-400">
            No placement learning module found for <code className="font-mono text-blue-300">&quot;{topicId}&quot;</code>.
          </p>
          <Link
            href={category ? `/placement-preparation/${category.id}` : '/placement-preparation'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-bold rounded-xl text-xs font-mono transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to {category?.title || 'Placement Prep'}
          </Link>
        </div>
      </div>
    );
  }

  const { topic, level, concept } = topicData;
  const currentStatus = placementState?.topicProgress[topic.id]?.status || 'not_started';
  const isBookmarked = placementState?.bookmarks.includes(topic.id) || false;

  const handleToggleCompletion = async () => {
    if (!placementState || !userData?.email) return;
    setIsUpdatingStatus(true);
    try {
      const nextStatus = currentStatus === 'completed' ? 'in_progress' : 'completed';
      const updated = await updateTopicStatus(
        placementState,
        category.id,
        level.id,
        concept.id,
        topic.id,
        nextStatus
      );
      setPlacementState(updated);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNote = async () => {
    if (!placementState || !userData?.email) return;
    try {
      const updated = await savePlacementTopicNote(placementState, topic.id, personalNote);
      setPlacementState(updated);
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2500);
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  };

  const handleToggleBookmark = async () => {
    if (!placementState || !userData?.email) return;
    try {
      const updated = await togglePlacementBookmark(placementState, topic.id);
      setPlacementState(updated);
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

  const handleCopyCode = () => {
    if (!topic.codeSnippet?.code) return;
    navigator.clipboard.writeText(topic.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find all topics in the category to calculate prev/next
  const allTopics: { topic: typeof topic; level: typeof level; concept: typeof concept }[] = [];
  category.levels.forEach((l) => {
    l.concepts.forEach((c) => {
      c.topics.forEach((t) => {
        allTopics.push({ topic: t, level: l, concept: c });
      });
    });
  });

  const currentIdx = allTopics.findIndex((item) => item.topic.id === topic.id);
  const prevItem = currentIdx > 0 ? allTopics[currentIdx - 1] : null;
  const nextItem = currentIdx < allTopics.length - 1 ? allTopics[currentIdx + 1] : null;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href={`/placement-preparation/${category.id}`}
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Back to {category.shortTitle}</span>
              <span className="sm:hidden">Back</span>
            </Link>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2.5">
              {/* Bookmark Toggle */}
              <button
                onClick={handleToggleBookmark}
                title={isBookmarked ? 'Bookmarked' : 'Bookmark topic'}
                className={`p-2 rounded-xl border transition ${
                  isBookmarked
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>

              {/* Status Completion Toggle */}
              <button
                onClick={handleToggleCompletion}
                disabled={isUpdatingStatus}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition shadow-sm ${
                  currentStatus === 'completed'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                    : 'bg-[#006cd2] hover:bg-[#005bb5] text-white shadow-[#006cd2]/20'
                }`}
              >
                {currentStatus === 'completed' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5" />
                    <span>Mark as Completed</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-12 space-y-10 flex-1">
          {/* Topic Hero Card */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  LEVEL {level.levelNumber}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950 text-slate-400 border border-slate-800">
                  {concept.title}
                </span>
              </div>

              {/* Topic Status Pill */}
              <span
                className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold border flex items-center gap-1.5 ${
                  currentStatus === 'completed'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : currentStatus === 'in_progress'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                {currentStatus === 'completed' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Completed</span>
                  </>
                ) : currentStatus === 'in_progress' ? (
                  <>
                    <Circle className="w-3.5 h-3.5 text-blue-400 fill-blue-400/30" />
                    <span>In Progress</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5 text-slate-500" />
                    <span>Not Started</span>
                  </>
                )}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {topic.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{topic.summary}</p>
          </div>

          {/* 1. What You Will Learn Box */}
          <div className="bg-blue-950/20 border border-blue-500/30 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 font-display text-sm font-bold text-blue-300">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>What You Will Master in this Module</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{topic.whatYouWillLearn}</p>
          </div>

          {/* 2. The Core Concept & Why It Matters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-white">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>The Core Concept</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{topic.concept}</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-white">
                <Target className="w-4 h-4 text-cyan-400" />
                <span>Why It Matters in MNC Interviews</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{topic.whyItMatters}</p>
            </div>
          </div>

          {/* 3. Implementation Code Example (if present) */}
          {topic.codeSnippet && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-display text-sm font-bold text-white">
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  <span>Implementation Example ({topic.codeSnippet.language})</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
                <code>{topic.codeSnippet.code}</code>
              </pre>

              <p className="text-xs text-slate-400 font-sans italic">{topic.codeSnippet.explanation}</p>
            </div>
          )}

          {/* 4. Key Takeaways Checklist */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 font-display text-sm font-bold text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Key Interview Takeaways &amp; Rules</span>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {topic.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Frequently Asked Interview Questions (if present) */}
          {topic.interviewQuestions && topic.interviewQuestions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-white">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span>Frequently Asked Technical Interview Questions</span>
              </div>

              <div className="space-y-3">
                {topic.interviewQuestions.map((q, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="font-display text-xs sm:text-sm font-bold text-white">
                        Q: {q.question}
                      </h4>
                      {q.frequentlyAskedAt && (
                        <div className="flex gap-1 shrink-0">
                          {q.frequentlyAskedAt.map((company, cIdx) => (
                            <span
                              key={cIdx}
                              className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40 text-[10px] font-mono"
                            >
                              {company}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{q.answerSummary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Recommended Practice Problems (if present) */}
          {topic.practiceProblems && topic.practiceProblems.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-white">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <span>Recommended Practice Coding Challenges</span>
              </div>

              <div className="space-y-3">
                {topic.practiceProblems.map((prob, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            prob.difficulty === 'Easy'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : prob.difficulty === 'Medium'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {prob.difficulty}
                        </span>
                        <h4 className="font-display font-bold text-sm text-white">{prob.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400">{prob.description}</p>
                    </div>

                    {prob.link && (
                      <a
                        href={prob.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition shrink-0 shadow-md shadow-[#006cd2]/20"
                      >
                        <span>Solve Challenge</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Personal Notes & Revision Workspace (Private to swamy@levelupdev.com) */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-white">
                <StickyNote className="w-4 h-4 text-amber-400" />
                <span>My Personal Notes &amp; Insights</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Private to {userData?.email}
                </span>
              </div>
              {lastSaved && (
                <span className="text-[11px] font-mono text-slate-500">
                  Last saved: {lastSaved}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Jot down personal memory hooks, interview traps you encountered, or custom formulas for this topic.
            </p>

            <textarea
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
              placeholder="e.g. In the interview, make sure to emphasize that this algorithm handles negative numbers by checking..."
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans transition resize-y"
            />

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleToggleCompletion}
                disabled={isUpdatingStatus}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition ${
                  currentStatus === 'completed'
                    ? 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {currentStatus === 'completed' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Topic Completed</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Mark as Completed</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSaveNote}
                className="px-4 py-2 bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs font-semibold rounded-xl flex items-center gap-2 transition shadow-md shadow-[#006cd2]/20"
              >
                {noteSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Saved to Firebase &amp; Cache</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Note</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Previous / Next Topic Navigation */}
          <div className="pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
            {prevItem ? (
              <Link
                href={`/placement-preparation/${category.id}/${prevItem.topic.id}`}
                className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-left space-y-1 transition group max-w-[48%]"
              >
                <div className="flex items-center gap-1 font-mono text-[11px] text-slate-400 group-hover:text-blue-400">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Previous Topic</span>
                </div>
                <div className="font-display text-sm font-bold text-white truncate">
                  {prevItem.topic.title}
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextItem && (
              <Link
                href={`/placement-preparation/${category.id}/${nextItem.topic.id}`}
                className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-right space-y-1 transition group max-w-[48%]"
              >
                <div className="flex items-center justify-end gap-1 font-mono text-[11px] text-slate-400 group-hover:text-blue-400">
                  <span>Next Topic</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="font-display text-sm font-bold text-white truncate">
                  {nextItem.topic.title}
                </div>
              </Link>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-500 font-mono text-xs py-8 px-6 md:px-12 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© 2024 LevelUpDev • Personal Placement Preparation Portal</div>
            <div className="flex items-center gap-4">
              <Link href={`/placement-preparation/${category.id}`} className="hover:text-slate-300 transition-colors">
                Back to {category.shortTitle}
              </Link>
              <span>•</span>
              <Link href="/placement-preparation" className="hover:text-slate-300 transition-colors">
                All Cards
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
