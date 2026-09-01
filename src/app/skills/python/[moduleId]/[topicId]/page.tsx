'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  getPythonTopicById,
  getPythonModuleById,
  getPreviousAndNextTopic,
  PythonTopicDetail,
} from '@/data/pythonSkillsData';
import {
  fetchUserDynamicData,
  UserDynamicData,
  ModuleProgressRecord,
} from '@/lib/dynamicDatabase';
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
  Code2,
  Target,
  Lightbulb,
  AlertTriangle,
  Award,
  Zap,
  RotateCcw,
} from 'lucide-react';

export default function PythonTopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawModuleId = params.moduleId as string;
  const rawTopicId = params.topicId as string;

  const { userData, loading } = useAuth();
  const [dynamicData, setDynamicData] = useState<UserDynamicData | null>(null);

  const topic = useMemo(() => getPythonTopicById(rawTopicId), [rawTopicId]);
  const moduleMeta = useMemo(() => getPythonModuleById(rawModuleId), [rawModuleId]);
  const { prev, next } = useMemo(() => getPreviousAndNextTopic(rawTopicId), [rawTopicId]);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  // Topic Checkpoint State
  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<string, any>>({});
  const [checkpointSubmitted, setCheckpointSubmitted] = useState(false);
  const [checkpointPassed, setCheckpointPassed] = useState(false);
  const [savingProgress, setSavingProgress] = useState(false);
  const [isTopicCompleted, setIsTopicCompleted] = useState(false);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  useEffect(() => {
    async function loadData() {
      if (userData?.email) {
        const d = await fetchUserDynamicData(userData.email);
        if (d) {
          setDynamicData(d);
          const canonicalModId = moduleMeta ? moduleMeta.id : rawModuleId;
          const modRecord = d.progress?.python?.[canonicalModId] || d.progress?.python?.[rawModuleId];
          const done = (modRecord?.topicsCompleted || []).includes(rawTopicId);
          setIsTopicCompleted(done);
          if (done) {
            setCheckpointPassed(true);
            setCheckpointSubmitted(true);
          }
        }
      }
    }
    loadData();
  }, [userData, rawModuleId, rawTopicId, moduleMeta]);

  const handleCopyCode = (codeText: string, key: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleSolution = (idx: number) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleSelectCheckpointOption = (questionId: string, optionIndex: number) => {
    if (checkpointSubmitted && checkpointPassed) return;
    setCheckpointAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleTextAnswerChange = (questionId: string, text: string) => {
    if (checkpointSubmitted && checkpointPassed) return;
    setCheckpointAnswers((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  };

  const handleSubmitCheckpoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || topic.checkpoint.length === 0) return;

    let correctCount = 0;
    topic.checkpoint.forEach((q) => {
      const userAns = checkpointAnswers[q.id];
      if (q.type === 'mcq' || q.type === 'output') {
        if (typeof q.correctAnswer === 'number') {
          if (userAns === q.correctAnswer) correctCount++;
        } else {
          if (String(userAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
            correctCount++;
          }
        }
      } else {
        if (String(userAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
          correctCount++;
        }
      }
    });

    const passed = correctCount === topic.checkpoint.length;
    setCheckpointPassed(passed);
    setCheckpointSubmitted(true);
  };

  const handleCompleteTopic = async () => {
    if (!userData || !topic || !checkpointPassed) return;
    setSavingProgress(true);

    try {
      const res = await fetch('/api/db/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          skillId: 'python',
          moduleId: topic.moduleId,
          topicId: topic.id,
          topicCompleted: true,
        }),
      });

      if (res.ok) {
        setIsTopicCompleted(true);
        // Refresh local cache
        const d = await fetchUserDynamicData(userData.email);
        setDynamicData(d);
      }
    } catch (err) {
      console.warn('Failed to save topic completion:', err);
    } finally {
      setSavingProgress(false);
    }
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-300">
        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-800">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Loading Topic Content...</span>
        </div>
      </div>
    );
  }

  if (!topic || !moduleMeta) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="text-center space-y-4 max-w-md bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800">
          <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-[#006cd2]">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-display text-white">Topic Not Found</h2>
          <p className="text-xs text-slate-400">
            No topic module found for <code className="font-mono text-blue-300">"{rawTopicId}"</code>.
          </p>
          <Link
            href={`/skills/python/${rawModuleId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-bold rounded-xl text-xs font-mono transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Module
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-[#006cd2] selection:text-white flex flex-col">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#006cd2]/10 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href={`/skills/python/${moduleMeta.id}`}
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
              <span className="hidden sm:inline">Back to Module {moduleMeta.moduleNumber}</span>
              <span className="sm:hidden">Back</span>
            </Link>

            {/* Breadcrumbs */}
            <nav className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/skills/python" className="hover:text-slate-200 transition">
                Python Trail
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href={`/skills/python/${moduleMeta.id}`} className="hover:text-slate-200 transition truncate max-w-[150px]">
                Module {moduleMeta.moduleNumber}: {moduleMeta.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-blue-400 font-semibold truncate max-w-[180px]">{topic.title}</span>
            </nav>

            {isTopicCompleted && (
              <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold rounded-xl flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Completed
              </span>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 space-y-12 flex-1">
          {/* Header Banner */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold">
                Module {moduleMeta.moduleNumber} • Topic {topic.topicNumber}
              </span>
              {isTopicCompleted && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
                  ✓ Done
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              {topic.title}
            </h1>
            <p className="text-base text-slate-300 font-medium leading-relaxed">
              {topic.shortSummary}
            </p>
          </div>

          {/* Section 1: What is it? */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>1. What is it?</span>
            </h2>
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 backdrop-blur-xl">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                {topic.whatIsIt}
              </p>
            </div>
          </section>

          {/* Section 2: Why do we need it? */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span>2. Why do we need it?</span>
            </h2>
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 backdrop-blur-xl">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                {topic.whyDoWeNeedIt}
              </p>
            </div>
          </section>

          {/* Section 3: Syntax */}
          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <span>3. Syntax</span>
              </h2>
              <span className="text-xs font-mono uppercase text-slate-500">Python 3</span>
            </div>

            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <button
                  onClick={() => handleCopyCode(topic.syntax, 'syntax')}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700"
                >
                  {copiedCode === 'syntax' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Syntax</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-cyan-300 leading-relaxed">
                <code>{topic.syntax}</code>
              </pre>
            </div>
          </section>

          {/* Section 4: Basic Example */}
          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>4. Basic Example</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Code */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
                <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>Source Code</span>
                  <button
                    onClick={() => handleCopyCode(topic.basicExample.code, 'basic')}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                  <code>{topic.basicExample.code}</code>
                </pre>
              </div>

              {/* Output */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
                <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <span>Terminal Output</span>
                </div>
                <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-400 leading-relaxed">
                  <code>{topic.basicExample.output}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Section 5: Detailed Example */}
          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>5. Detailed Example</span>
              </h2>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
                <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Practical Script</span>
                  <button
                    onClick={() => handleCopyCode(topic.detailedExample.code, 'detailed')}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                  <code>{topic.detailedExample.code}</code>
                </pre>

                {topic.detailedExample.output && (
                  <div className="p-4 bg-slate-900/80 border-t border-slate-800 font-mono text-xs text-emerald-400">
                    <span className="text-slate-400 block mb-1">Output:</span>
                    <pre className="overflow-x-auto">{topic.detailedExample.output}</pre>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 6: Explanation of the Code */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>6. Explanation of the Code</span>
            </h2>
            <div className="space-y-2.5">
              {topic.codeExplanation.map((line, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80"
                >
                  <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Common Mistakes */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>7. Common Mistakes</span>
            </h2>
            <div className="space-y-3">
              {topic.commonMistakes.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2.5 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm font-display">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center text-xs">✕</span>
                    <span>Mistake: {item.mistake}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 pl-7 leading-relaxed font-sans">
                    <strong className="text-rose-300">Why it is wrong:</strong> {item.whyItIsWrong}
                  </p>
                  <div className="pl-7 pt-1 text-xs sm:text-sm text-emerald-300 font-mono flex items-center gap-2">
                    <span className="text-emerald-400">✓ Correction:</span> {item.correction}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Important Rules */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>8. Important Rules to Remember</span>
            </h2>
            <div className="grid grid-cols-1 gap-2.5">
              {topic.importantRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 9: Interview Perspective */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <span>9. Interview Perspective</span>
            </h2>
            <div className="rounded-2xl bg-gradient-to-r from-slate-900/90 to-indigo-950/40 border border-indigo-500/30 p-6 backdrop-blur-xl">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {topic.interviewPerspective}
              </p>
            </div>
          </section>

          {/* Section 10: Practice Questions */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-2 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-amber-400" />
              <span>10. Practice Questions</span>
            </h2>
            <div className="space-y-3">
              {topic.practiceQuestions.map((prob, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                      <span className="text-blue-400 font-mono font-bold mr-2">Q{idx + 1}.</span>
                      {prob.question}
                    </p>
                    <button
                      onClick={() => toggleSolution(idx)}
                      className="shrink-0 text-xs font-mono text-blue-400 hover:text-blue-300 underline"
                    >
                      {revealedSolutions[idx] ? 'Hide Solution' : 'Show Solution'}
                    </button>
                  </div>

                  {prob.hint && (
                    <p className="text-xs font-mono text-slate-400 pl-6">
                      💡 Hint: {prob.hint}
                    </p>
                  )}

                  {revealedSolutions[idx] && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300">
                      <strong>Solution:</strong> {prob.solution}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 11: Topic Checkpoint & Completion Gate */}
          <section className="pt-6 border-t border-slate-800 space-y-6">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-[#006cd2]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg uppercase tracking-wider border border-blue-500/20">
                    TOPIC CHECKPOINT
                  </span>
                  {isTopicCompleted && (
                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Topic Completed ✓
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Topic Checkpoint Verification
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  Complete this brief checkpoint challenge to verify understanding before marking this topic as completed.
                </p>
              </div>

              {/* Checkpoint Question Form */}
              <form onSubmit={handleSubmitCheckpoint} className="space-y-5">
                {topic.checkpoint.map((q, qIdx) => {
                  const userAns = checkpointAnswers[q.id];

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/15 px-2.5 py-1 rounded-lg border border-blue-500/30 shrink-0 mt-0.5">
                          Q{qIdx + 1}
                        </span>
                        <p className="font-sans text-sm font-semibold text-white leading-snug">
                          {q.prompt}
                        </p>
                      </div>

                      {/* Multiple choice options */}
                      {q.options && q.options.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-0 sm:pl-9 pt-1">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = userAns === oIdx;

                            let optClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-blue-500 hover:bg-slate-850';
                            if (checkpointSubmitted) {
                              if (oIdx === q.correctAnswer) {
                                optClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                              } else if (isSelected && oIdx !== q.correctAnswer) {
                                optClass = 'bg-rose-500/20 border-rose-500 text-rose-300';
                              }
                            } else if (isSelected) {
                              optClass = 'bg-[#006cd2]/20 border-[#006cd2] text-white font-bold ring-1 ring-[#006cd2]';
                            }

                            return (
                              <label
                                key={oIdx}
                                onClick={() => handleSelectCheckpointOption(q.id, oIdx)}
                                className={`p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition flex items-center justify-between select-none ${optClass}`}
                              >
                                <span>{opt}</span>
                                {isSelected && <Check className="w-4 h-4 text-[#006cd2] stroke-[3]" />}
                              </label>
                            );
                          })}
                        </div>
                      )}

                      {/* Explanation review banner */}
                      {checkpointSubmitted && (
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 pl-3">
                          💡 <strong className="text-blue-300">Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Submission and Complete Topic Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  {!checkpointSubmitted || !checkpointPassed ? (
                    <button
                      type="submit"
                      disabled={Object.keys(checkpointAnswers).length < topic.checkpoint.length}
                      className="w-full sm:w-auto px-7 py-3 bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs font-bold rounded-xl shadow-lg shadow-[#006cd2]/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Verify Checkpoint Answers
                    </button>
                  ) : (
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>All checkpoint questions verified successfully!</span>
                      </div>

                      {!isTopicCompleted ? (
                        <button
                          type="button"
                          onClick={handleCompleteTopic}
                          disabled={savingProgress}
                          className="w-full sm:w-auto px-7 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                        >
                          {savingProgress ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>Mark Topic as Completed</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="px-5 py-2.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold rounded-xl flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Topic Completed in Database
                        </span>
                      )}
                    </div>
                  )}

                  {checkpointSubmitted && !checkpointPassed && (
                    <button
                      type="button"
                      onClick={() => setCheckpointSubmitted(false)}
                      className="w-full sm:w-auto px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retry Checkpoint</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>

          {/* Sequential Topic Navigation */}
          <div className="pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
            {prev ? (
              <Link
                href={`/skills/python/${prev.moduleId}/${prev.id}`}
                className="flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition group"
              >
                <ArrowLeft className="w-4 h-4 text-[#006cd2] transition-transform group-hover:-translate-x-1" />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Previous Topic</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white truncate max-w-[150px] sm:max-w-[200px] block">
                    {prev.title}
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                href={`/skills/python/${moduleMeta.id}`}
                className="flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition group"
              >
                <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
                <span className="text-xs sm:text-sm font-bold">Module Overview</span>
              </Link>
            )}

            {next && next.moduleId === moduleMeta.id ? (
              <Link
                href={`/skills/python/${next.moduleId}/${next.id}`}
                className="flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-2xl bg-[#006cd2] hover:bg-[#005bb5] text-white text-right transition group shadow-lg shadow-[#006cd2]/20"
              >
                <div>
                  <span className="text-[10px] font-mono text-blue-200 uppercase block">Next Topic</span>
                  <span className="text-xs sm:text-sm font-bold truncate max-w-[150px] sm:max-w-[200px] block">
                    {next.title}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                href={`/skills/python/${moduleMeta.id}`}
                className="flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-right transition group shadow-lg shadow-emerald-600/20"
              >
                <div>
                  <span className="text-[10px] font-mono text-emerald-200 uppercase block">All Topics Finished</span>
                  <span className="text-xs sm:text-sm font-bold">Module Assignment →</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
