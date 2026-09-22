'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  getJavaModuleById,
  generateRandomizedJavaAssignment,
  AssignmentQuestion,
  ModuleAssignmentConfig,
} from '@/data/java/javaSkillsData';
import {
  fetchUserDynamicData,
  saveUserDynamicData,
  ModuleProgressRecord,
} from '@/lib/dynamicDatabase';
import { JavaCodeEditor } from '@/components/java/JavaCodeEditor';
import {
  ArrowLeft,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Code2,
  FileCode,
  Check,
  AlertTriangle,
  Coffee,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export default function JavaModuleAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const rawModuleId = params.moduleId as string;

  const { userData, loading } = useAuth();
  const moduleMeta = useMemo(() => getJavaModuleById(rawModuleId), [rawModuleId]);

  // Randomized Assignment Session
  const [assignmentConfig, setAssignmentConfig] = useState<ModuleAssignmentConfig | null>(null);
  const [questions, setQuestions] = useState<AssignmentQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // User Answers State
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});

  // Timer State
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(30 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  // Result States
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultData, setResultData] = useState<{
    scorePercent: number;
    totalPointsEarned: number;
    totalPossiblePoints: number;
    passed: boolean;
    timeSpentSeconds: number;
    questionSummaries: Array<{
      id: string;
      topicTitle: string;
      type: string;
      pointsEarned: number;
      possiblePoints: number;
      isCorrect: boolean;
      userAnswer: any;
      correctAnswer: any;
      explanation: string;
    }>;
    weakTopics: Array<{ id: string; title: string }>;
  } | null>(null);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  // Initialize a fresh randomized assignment session
  const initSession = () => {
    if (!rawModuleId) return;
    const { config, questions: sampledQuestions } = generateRandomizedJavaAssignment(rawModuleId);
    setAssignmentConfig(config);
    setQuestions(sampledQuestions);
    setCurrentQIndex(0);

    const initialAns: Record<string, any> = {};
    sampledQuestions.forEach((q) => {
      if (q.starterCode) {
        initialAns[q.id] = q.starterCode;
      }
    });
    setUserAnswers(initialAns);

    const totalSeconds = (config.timeLimitMinutes || 30) * 60;
    setTimeLeftSeconds(totalSeconds);
    setIsTimerRunning(true);
    startTimeRef.current = Date.now();
    setIsSubmitted(false);
    setResultData(null);
  };

  useEffect(() => {
    if (moduleMeta) {
      initSession();
    }
  }, [moduleMeta]);

  // Timer Tick
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, isSubmitted]);

  const currentQ = questions[currentQIndex];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted || !currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIdx,
    }));
  };

  const handleTextChange = (val: string) => {
    if (isSubmitted || !currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: val,
    }));
  };

  // Submit and evaluate answers
  const handleSubmit = async () => {
    if (isSubmitted || submitting) return;
    setSubmitting(true);
    setIsTimerRunning(false);

    const timeSpent = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    let earned = 0;
    let possible = 0;
    const summaries: any[] = [];
    const weakMap: Record<string, string> = {};

    questions.forEach((q) => {
      const qPoints = q.points || 10;
      possible += qPoints;
      const userAns = userAnswers[q.id];
      let isCorrect = false;

      if (q.type === 'mcq') {
        isCorrect = userAns === q.correctAnswer;
      } else if (q.type === 'output' || q.type === 'short-answer') {
        const cleanUser = String(userAns || '').trim().toLowerCase();
        const cleanCorrect = String(q.correctAnswer || '').trim().toLowerCase();
        isCorrect = cleanUser === cleanCorrect || cleanUser.includes(cleanCorrect);
      } else if (q.type === 'code-writing' || q.type === 'debugging') {
        // Safe evaluation: verify core tokens exist
        const codeText = String(userAns || '');
        const hasCore = codeText.length > (q.starterCode?.length || 0) &&
          (codeText.includes('return') || codeText.includes('System.out') || codeText.includes('printf'));
        isCorrect = hasCore;
      }

      if (isCorrect) {
        earned += qPoints;
      } else {
        weakMap[q.topicId] = q.topicTitle;
      }

      summaries.push({
        id: q.id,
        topicTitle: q.topicTitle,
        type: q.type,
        pointsEarned: isCorrect ? qPoints : 0,
        possiblePoints: qPoints,
        isCorrect,
        userAnswer: userAns,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      });
    });

    const scorePercent = Math.round((earned / (possible || 1)) * 100);
    const passThreshold = assignmentConfig?.passingScorePercent || 70;
    const passed = scorePercent >= passThreshold;

    const weakTopics = Object.entries(weakMap).map(([id, title]) => ({ id, title }));

    const res = {
      scorePercent,
      totalPointsEarned: earned,
      totalPossiblePoints: possible,
      passed,
      timeSpentSeconds: timeSpent,
      questionSummaries: summaries,
      weakTopics,
    };

    setResultData(res);
    setIsSubmitted(true);

    // Save progress to database
    if (userData?.email && moduleMeta) {
      try {
        const existing = await fetchUserDynamicData(userData.email);
        const javaProg = existing?.progress?.java || {};
        const prevRecord = javaProg[moduleMeta.id] || {
          moduleId: moduleMeta.id,
          topicsCompleted: moduleMeta.topicIds,
          status: 'in_progress',
          assignmentAttempts: [],
        };

        const priorAttempts = prevRecord.assignmentAttempts || [];
        const newAttempts = [
          ...priorAttempts,
          {
            attemptNumber: priorAttempts.length + 1,
            scorePercent,
            passed,
            timeTakenSeconds: timeSpent,
            date: new Date().toISOString(),
            weakTopicIds: Object.keys(weakMap),
          },
        ];

        const updatedScore = Math.max(prevRecord.assignmentScore || 0, scorePercent);
        const updatedPassed = !!prevRecord.assignmentPassed || passed;

        const updatedProgress: Record<string, ModuleProgressRecord> = {
          ...javaProg,
          [moduleMeta.id]: {
            ...prevRecord,
            assignmentPassed: updatedPassed,
            assignmentScore: updatedScore,
            assignmentAttempts: newAttempts,
            status: updatedPassed ? 'completed' : 'in_progress',
          },
        };

        await saveUserDynamicData(userData.email, {
          progress: {
            ...existing?.progress,
            java: updatedProgress,
          },
        });
      } catch (err) {
        console.error('Error saving Java assignment result:', err);
      }
    }

    setSubmitting(false);
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono text-sm">
        <div className="flex items-center gap-3 bg-slate-900/80 px-6 py-4 rounded-2xl border border-slate-800">
          <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-300">Loading Exam Session...</span>
        </div>
      </div>
    );
  }

  if (!moduleMeta) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <HelpCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Exam Not Found</h2>
          <Link
            href="/skills/java"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Java Trail
          </Link>
        </div>
      </div>
    );
  }

  // Format time display
  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href={`/skills/java/${moduleMeta.id}`}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>Exit Exam</span>
          </Link>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-xs font-bold ${
                timeLeftSeconds < 300
                  ? 'bg-red-950/40 border-red-500/50 text-red-400 animate-pulse'
                  : 'bg-slate-900 border-slate-800 text-amber-400'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{timeDisplay}</span>
              </div>
            )}

            <span className="text-xs font-mono text-slate-300 hidden sm:block">
              Module {moduleMeta.moduleNumber} Certification
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-4 py-8 flex-1 space-y-6">
        {/* Results Screen */}
        {isSubmitted && resultData ? (
          <div className="space-y-6">
            <div className={`p-8 rounded-3xl border text-center space-y-4 ${
              resultData.passed
                ? 'bg-emerald-950/20 border-emerald-500/40'
                : 'bg-red-950/20 border-red-500/40'
            }`}>
              <div className={`w-16 h-16 mx-auto rounded-3xl flex items-center justify-center ${
                resultData.passed
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-red-500/20 text-red-400 border border-red-500/40'
              }`}>
                {resultData.passed ? <Award className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400">
                  Assessment Results
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
                  {resultData.passed ? 'Module Certified!' : 'Passing Threshold Not Met'}
                </h1>
              </div>

              <div className="flex items-center justify-center gap-6 pt-2 font-mono">
                <div>
                  <span className="text-xs text-slate-400 block">Final Score</span>
                  <span className={`text-3xl font-extrabold ${
                    resultData.passed ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {resultData.scorePercent}%
                  </span>
                </div>
                <div className="h-10 w-px bg-slate-800" />
                <div>
                  <span className="text-xs text-slate-400 block">Required Pass</span>
                  <span className="text-3xl font-extrabold text-white">70%</span>
                </div>
                <div className="h-10 w-px bg-slate-800" />
                <div>
                  <span className="text-xs text-slate-400 block">Points</span>
                  <span className="text-3xl font-extrabold text-amber-400">
                    {resultData.totalPointsEarned} / {resultData.totalPossiblePoints}
                  </span>
                </div>
              </div>

              {resultData.passed ? (
                <p className="text-sm text-emerald-300 max-w-lg mx-auto">
                  Congratulations! You have demonstrated mastery in Module {moduleMeta.moduleNumber}. The next module has been unlocked.
                </p>
              ) : (
                <p className="text-sm text-red-300 max-w-lg mx-auto">
                  You scored {resultData.scorePercent}%. A minimum of 70% is required to unlock the next module. Review the weak topics below and retry with fresh questions!
                </p>
              )}

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={initSession}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry Exam (Fresh Randomized Questions)</span>
                </button>
                <Link
                  href={`/skills/java/${moduleMeta.id}`}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition"
                >
                  <span>Return to Module Hub</span>
                </Link>
              </div>
            </div>

            {/* Weak Topics Analysis */}
            {resultData.weakTopics.length > 0 && (
              <div className="p-6 rounded-3xl border border-amber-500/20 bg-amber-950/10 space-y-3">
                <h3 className="text-base font-bold text-amber-300 font-display flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Recommended Revision Topics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {resultData.weakTopics.map((wt) => (
                    <Link
                      key={wt.id}
                      href={`/skills/java/${moduleMeta.id}/${wt.id}`}
                      className="p-3 rounded-xl bg-neutral-900 border border-slate-800 hover:border-amber-500/40 text-xs font-mono text-slate-200 flex items-center justify-between"
                    >
                      <span>{wt.title}</span>
                      <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Question Review */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display border-b border-slate-800 pb-2">
                Detailed Answers Breakdown
              </h3>
              {resultData.questionSummaries.map((qs, qIdx) => (
                <div
                  key={qs.id}
                  className={`p-5 rounded-2xl border space-y-2 text-xs font-mono ${
                    qs.isCorrect
                      ? 'border-emerald-500/20 bg-emerald-950/10 text-slate-300'
                      : 'border-red-500/20 bg-red-950/10 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-2 text-sm text-white">
                      {qs.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      Question {qIdx + 1} ({qs.topicTitle})
                    </span>
                    <span className={qs.isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                      {qs.pointsEarned} / {qs.possiblePoints} pts
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">{qs.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Active Question Interface */
          currentQ && (
            <div className="space-y-6">
              {/* Question Navigation Bar */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-amber-400">
                  Question {currentQIndex + 1} of {questions.length} • {currentQ.topicTitle}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {currentQ.points || 10} Points
                </span>
              </div>

              {/* Question Body */}
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 space-y-6 shadow-xl">
                <h2 className="text-base sm:text-lg font-bold text-white font-display">
                  {currentQ.prompt}
                </h2>

                {currentQ.codeSnippet && (
                  <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 font-mono text-xs md:text-sm text-amber-200 border border-white/5 leading-relaxed">
                    {currentQ.codeSnippet}
                  </pre>
                )}

                {/* Multiple Choice Options */}
                {currentQ.type === 'mcq' && currentQ.options && (
                  <div className="space-y-2.5">
                    {currentQ.options.map((opt, optIdx) => {
                      const isSelected = userAnswers[currentQ.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm transition flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Output / Short Answer Input */}
                {(currentQ.type === 'output' || currentQ.type === 'short-answer') && (
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400 block uppercase">
                      Enter your exact output prediction:
                    </label>
                    <input
                      type="text"
                      value={userAnswers[currentQ.id] || ''}
                      onChange={(e) => handleTextChange(e.target.value)}
                      placeholder="Type predicted output..."
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 font-mono text-sm text-amber-300 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                {/* Code Writing Challenge */}
                {(currentQ.type === 'code-writing' || currentQ.type === 'debugging') && (
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-slate-400 block uppercase">
                      Java Live Code Editor & Assertion Suite
                    </span>
                    <JavaCodeEditor
                      initialCode={userAnswers[currentQ.id] || currentQ.starterCode}
                      solutionCode={currentQ.solutionCode}
                      testCases={currentQ.testCases}
                      onCodeChange={handleTextChange}
                    />
                  </div>
                )}
              </div>

              {/* Question Navigation Controls */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentQIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs transition shadow-md shadow-amber-500/20"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold font-mono text-xs transition shadow-lg shadow-emerald-500/20"
                  >
                    <Award className="w-4 h-4" />
                    <span>{submitting ? 'Submitting & Evaluating...' : 'Submit Final Assessment'}</span>
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}
