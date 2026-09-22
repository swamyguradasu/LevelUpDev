'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  getJavaTopic,
  getAdjacentJavaTopics,
  getJavaModuleById,
  JavaTopicDetail,
} from '@/data/java/javaSkillsData';
import {
  fetchUserDynamicData,
  saveUserDynamicData,
  UserDynamicData,
  ModuleProgressRecord,
} from '@/lib/dynamicDatabase';
import { JavaVisualizer } from '@/components/java/JavaVisualizer';
import { JavaCodeEditor } from '@/components/java/JavaCodeEditor';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Check,
  RotateCcw,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Code2,
  Terminal,
  Layers,
  Award,
  ChevronRight,
  Coffee,
  XCircle,
  Target
} from 'lucide-react';

export default function JavaTopicLessonPage() {
  const params = useParams();
  const router = useRouter();
  const rawModuleId = params.moduleId as string;
  const rawTopicId = params.topicId as string;

  const { userData, loading } = useAuth();
  const [dynamicData, setDynamicData] = useState<UserDynamicData | null>(null);

  const topic: JavaTopicDetail | undefined = useMemo(() => {
    return getJavaTopic(rawTopicId);
  }, [rawTopicId]);

  const moduleMeta = useMemo(() => {
    return getJavaModuleById(rawModuleId);
  }, [rawModuleId]);

  const { prevTopic, nextTopic } = useMemo(() => {
    return getAdjacentJavaTopics(rawTopicId);
  }, [rawTopicId]);

  // Checkpoint Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [savingProgress, setSavingProgress] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      if (userData?.email) {
        const d = await fetchUserDynamicData(userData.email);
        if (mounted) {
          setDynamicData(d);
          const javaProgress = d?.progress?.java || {};
          const modRecord =
            javaProgress[rawModuleId] ||
            javaProgress[`module-${rawModuleId.replace('m', '')}`] ||
            javaProgress[`m${rawModuleId.replace('m', '')}`];
          const completedTopics = modRecord?.topicsCompleted || [];
          if (completedTopics.includes(rawTopicId)) {
            setIsCompleted(true);
          }
        }
      }
    }
    loadData();
    return () => {
      mounted = false;
    };
  }, [userData, rawModuleId, rawTopicId]);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!topic?.checkpoint || topic.checkpoint.length === 0) return;
    setQuizSubmitted(true);

    const allCorrect = topic.checkpoint.every(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    );

    if (allCorrect && userData?.email && moduleMeta) {
      setSavingProgress(true);
      try {
        const currentDyn = await fetchUserDynamicData(userData.email);
        const javaProg = currentDyn.progress?.java || {};
        const canonicalModId = moduleMeta.id;
        const existingModRec = javaProg[canonicalModId] || {
          skillId: 'java',
          moduleId: canonicalModId,
          status: 'in_progress',
          lastAccessedAt: new Date().toISOString(),
          topicsCompleted: [],
        };

        const existingTopics = existingModRec.topicsCompleted || [];
        const updatedTopics = existingTopics.includes(topic.id)
          ? existingTopics
          : [...existingTopics, topic.id];

        await saveUserDynamicData(userData.email, {
          progress: {
            ...currentDyn.progress,
            java: {
              ...javaProg,
              [canonicalModId]: {
                ...existingModRec,
                topicsCompleted: updatedTopics,
                lastAccessedAt: new Date().toISOString(),
              },
            },
          },
        });
        setIsCompleted(true);
      } catch (err) {
        console.error('Failed to save topic progress:', err);
      } finally {
        setSavingProgress(false);
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono text-sm">
        <div className="flex items-center gap-3 bg-slate-900/80 px-6 py-4 rounded-2xl border border-slate-800">
          <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-300">Loading Lesson Content...</span>
        </div>
      </div>
    );
  }

  if (!topic || !moduleMeta) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <HelpCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Topic Not Found</h2>
          <p className="text-xs text-slate-400">
            Topic <code className="text-amber-400 font-mono">"{rawTopicId}"</code> could not be located.
          </p>
          <Link
            href={`/skills/java/${rawModuleId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Module
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden flex flex-col">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link
              href={`/skills/java/${moduleMeta.id}`}
              className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 text-amber-500" />
              <span>Back to Module {moduleMeta.moduleNumber}</span>
            </Link>

            <div className="flex items-center gap-3">
              {isCompleted && (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Topic Completed
                </span>
              )}
              <div className="text-xs font-mono text-slate-400 hidden sm:block">
                Topic {topic.topicNumber} of {moduleMeta.topicIds.length}
              </div>
            </div>
          </div>
        </header>

        {/* Lesson Hero */}
        <div className="max-w-4xl mx-auto w-full px-4 pt-8 pb-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md">
              Module {moduleMeta.moduleNumber} • Topic {topic.topicNumber}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            {topic.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {topic.shortSummary}
          </p>
        </div>

        {/* Main Lesson Content Body */}
        <main className="max-w-4xl mx-auto w-full px-4 py-6 space-y-8">
          {/* Section 1: Concept Explanation */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8 space-y-6 shadow-xl">
            <div>
              <h2 className="text-base md:text-lg font-bold text-amber-400 font-display flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> What Is It?
              </h2>
              <p className="mt-2 text-sm md:text-base text-slate-200 leading-relaxed">
                {topic.whatIsIt}
              </p>
            </div>

            <div>
              <h2 className="text-base md:text-lg font-bold text-amber-400 font-display flex items-center gap-2">
                <Target className="w-5 h-5" /> Why Do We Need It?
              </h2>
              <p className="mt-2 text-sm md:text-base text-slate-200 leading-relaxed">
                {topic.whyDoWeNeedIt}
              </p>
            </div>

            {/* Syntax Box */}
            {topic.syntax && (
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Standard Java Syntax
                </h3>
                <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 font-mono text-xs md:text-sm text-amber-200 border border-white/5 leading-relaxed">
                  {topic.syntax}
                </pre>
              </div>
            )}
          </div>

          {/* Section 2: Interactive Concept Visualizer */}
          {topic.visualizerType && topic.visualizerType !== 'none' && (
            <JavaVisualizer
              type={topic.visualizerType}
              title={topic.visualExplanation?.title}
              description={topic.visualExplanation?.description}
              asciiDiagram={topic.visualExplanation?.asciiDiagram}
              steps={topic.visualExplanation?.steps}
            />
          )}

          {/* Section 3: Live Code Examples */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Code2 className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white font-display">
                  Code Walkthrough & Execution Output
                </h2>
              </div>

              {topic.basicExample && (
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    Basic Example
                  </span>
                  <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 font-mono text-xs md:text-sm text-slate-200 border border-white/5 leading-relaxed">
                    {topic.basicExample.code}
                  </pre>
                  <div className="rounded-xl bg-slate-950/80 p-3 border border-white/5 font-mono text-xs text-emerald-400">
                    <span className="text-slate-500 block text-[10px] uppercase">Console Output:</span>
                    <pre className="mt-1 whitespace-pre-wrap">{topic.basicExample.output}</pre>
                  </div>
                </div>
              )}

              {topic.detailedExample && (
                <div className="space-y-3 pt-4 border-t border-slate-800/80">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    Detailed Production Example
                  </span>
                  <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 font-mono text-xs md:text-sm text-slate-200 border border-white/5 leading-relaxed">
                    {topic.detailedExample.code}
                  </pre>
                  <div className="rounded-xl bg-slate-950/80 p-3 border border-white/5 font-mono text-xs text-emerald-400">
                    <span className="text-slate-500 block text-[10px] uppercase">Console Output:</span>
                    <pre className="mt-1 whitespace-pre-wrap">{topic.detailedExample.output}</pre>
                  </div>
                </div>
              )}

              {topic.codeExplanation && topic.codeExplanation.length > 0 && (
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Key Line Breakdown:
                  </span>
                  <ul className="space-y-2 text-xs md:text-sm text-slate-300">
                    {topic.codeExplanation.map((line, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Common Mistakes & Important Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.commonMistakes && topic.commonMistakes.length > 0 && (
              <div className="rounded-3xl border border-red-500/20 bg-red-950/10 p-6 space-y-4">
                <div className="flex items-center gap-2 text-red-400 font-bold text-base font-display">
                  <AlertTriangle className="w-5 h-5" />
                  Common Traps & Mistakes
                </div>
                <div className="space-y-3 text-xs md:text-sm">
                  {topic.commonMistakes.map((m, idx) => (
                    <div key={idx} className="rounded-xl bg-neutral-900/80 p-3 border border-red-500/20 space-y-1">
                      <div className="font-bold text-red-300">❌ {m.mistake}</div>
                      <div className="text-slate-400 text-xs">{m.whyItIsWrong}</div>
                      <div className="text-emerald-400 text-xs font-mono mt-1">✓ {m.correction}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {topic.importantRules && topic.importantRules.length > 0 && (
              <div className="rounded-3xl border border-amber-500/20 bg-amber-950/10 p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base font-display">
                  <Sparkles className="w-5 h-5" />
                  Golden Rules & Best Practices
                </div>
                <ul className="space-y-2 text-xs md:text-sm text-slate-300">
                  {topic.importantRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 rounded-xl bg-neutral-900/80 p-2.5 border border-amber-500/20">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Section 5: Interview Perspective */}
          {topic.interviewPerspective && (
            <div className="rounded-3xl border border-blue-500/20 bg-blue-950/10 p-6 md:p-8 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-base font-display">
                <Layers className="w-5 h-5" />
                Technical Interview Perspective
              </div>
              <div className="space-y-2 text-sm text-slate-200">
                <p className="font-bold text-white">Q: {topic.interviewPerspective.question}</p>
                <p className="text-slate-300 leading-relaxed">A: {topic.interviewPerspective.answer}</p>
                {topic.interviewPerspective.trap && (
                  <p className="text-xs text-amber-300/90 font-mono bg-blue-900/30 p-2.5 rounded-xl border border-blue-500/20">
                    ⚠️ Watch out: {topic.interviewPerspective.trap}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Section 6: Checkpoint Quiz to Complete Topic */}
          {topic.checkpoint && topic.checkpoint.length > 0 && (
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg md:text-xl font-bold text-white font-display">
                    Topic Knowledge Checkpoint
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {topic.checkpoint.length} Question{topic.checkpoint.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-6">
                {topic.checkpoint.map((q, qIndex) => {
                  const selected = selectedAnswers[q.id];
                  const isAnswered = selected !== undefined;
                  const isCorrect = selected === q.correctAnswer;

                  return (
                    <div key={q.id} className="space-y-3">
                      <p className="text-sm md:text-base font-semibold text-white">
                        {qIndex + 1}. {q.prompt}
                      </p>

                      {q.options && (
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isOptionSelected = selected === optIdx;
                            const isCorrectOpt = q.correctAnswer === optIdx;

                            let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                            if (quizSubmitted) {
                              if (isCorrectOpt) {
                                btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                              } else if (isOptionSelected && !isCorrect) {
                                btnStyle = 'bg-red-950/40 border-red-500 text-red-300';
                              }
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectOption(q.id, optIdx)}
                                disabled={quizSubmitted}
                                className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {quizSubmitted && isCorrectOpt && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                )}
                                {quizSubmitted && isOptionSelected && !isCorrect && (
                                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {quizSubmitted && (
                        <div
                          className={`p-3 rounded-xl text-xs leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-500/20'
                              : 'bg-red-950/30 text-red-300 border border-red-500/20'
                          }`}
                        >
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Actions */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                {!quizSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < topic.checkpoint.length}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20"
                  >
                    Submit Checkpoint & Complete Topic
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleResetQuiz}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Try Again
                    </button>
                    {isCompleted && (
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Lesson Marked Complete!
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Bar (Prev / Next Topic) */}
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-800">
            {prevTopic ? (
              <Link
                href={`/skills/java/${moduleMeta.id}/${prevTopic.id}`}
                className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Prev: {prevTopic.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextTopic ? (
              <Link
                href={`/skills/java/${moduleMeta.id}/${nextTopic.id}`}
                className="flex items-center gap-2 text-xs font-mono font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition px-5 py-2.5 rounded-xl shadow-md shadow-amber-500/20"
              >
                <span>Next: {nextTopic.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href={`/skills/java/${moduleMeta.id}`}
                className="flex items-center gap-2 text-xs font-mono font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 transition px-5 py-2.5 rounded-xl shadow-md shadow-emerald-500/20"
              >
                <span>Complete Module & Take Exam</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
