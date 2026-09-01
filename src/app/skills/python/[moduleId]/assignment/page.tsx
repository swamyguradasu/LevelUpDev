'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  getPythonModuleById,
  generateRandomizedAssignment,
  AssignmentQuestion,
  ModuleAssignmentConfig,
} from '@/data/pythonSkillsData';
import { runPythonCode } from '@/lib/pythonRunner';
import PythonAssignmentResult, { QuestionResultSummary } from '@/components/PythonAssignmentResult';
import {
  ArrowLeft,
  Clock,
  Award,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Code2,
  FileCode,
  Check,
  AlertTriangle,
} from 'lucide-react';

export default function PythonModuleAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const rawModuleId = params.moduleId as string;

  const { userData, loading } = useAuth();
  const moduleMeta = useMemo(() => getPythonModuleById(rawModuleId), [rawModuleId]);

  // Randomized Assignment Instance State
  const [assignmentConfig, setAssignmentConfig] = useState<ModuleAssignmentConfig | null>(null);
  const [questions, setQuestions] = useState<AssignmentQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // User Answers State: Map questionId -> answer
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});

  // Code Execution & Testing State per Question
  const [testResults, setTestResults] = useState<
    Record<string, { passed: boolean; output: string; error?: string; running?: boolean }>
  >({});

  // Timer State
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  // Submission & Result States
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultData, setResultData] = useState<{
    scorePercent: number;
    totalPointsEarned: number;
    totalPossiblePoints: number;
    passed: boolean;
    timeSpentSeconds: number;
    questionSummaries: QuestionResultSummary[];
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
    const { config, questions: sampledQuestions } = generateRandomizedAssignment(rawModuleId);
    setAssignmentConfig(config);
    setQuestions(sampledQuestions);
    setCurrentQIndex(0);

    // Initialize default starter code for code/debugging questions
    const initialAns: Record<string, any> = {};
    sampledQuestions.forEach((q) => {
      if (q.starterCode) {
        initialAns[q.id] = q.starterCode;
      }
    });
    setUserAnswers(initialAns);
    setTestResults({});

    const totalSeconds = (config.timeLimitMinutes || 25) * 60;
    setTimeLeftSeconds(totalSeconds);
    setIsTimerRunning(true);
    setIsSubmitted(false);
    setResultData(null);
    startTimeRef.current = Date.now();
  };

  useEffect(() => {
    initSession();
  }, [rawModuleId]);

  // Countdown Timer Interval
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectMCQ = (qId: string, optIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleToggleMultiSelect = (qId: string, optIndex: number) => {
    if (isSubmitted) return;
    const current = (userAnswers[qId] as number[]) || [];
    const next = current.includes(optIndex)
      ? current.filter((i) => i !== optIndex)
      : [...current, optIndex];
    setUserAnswers((prev) => ({ ...prev, [qId]: next }));
  };

  const handleTextChange = (qId: string, text: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: text }));
  };

  // Run Test Cases for Code / Debugging / Scenario Questions
  const handleRunCodeTests = async (q: AssignmentQuestion) => {
    const userCode = userAnswers[q.id] || q.starterCode || '';
    setTestResults((prev) => ({
      ...prev,
      [q.id]: { passed: false, output: 'Running test cases...', running: true },
    }));

    try {
      let allPassed = true;
      let lastOutput = '';

      if (q.testCases && q.testCases.length > 0) {
        for (const tc of q.testCases) {
          const res = await runPythonCode(userCode, tc.input);
          const normalizedActual = res.stdout.trim().replace(/\r\n/g, '\n');
          const normalizedExpected = tc.expectedOutput.trim().replace(/\r\n/g, '\n');

          if (normalizedActual !== normalizedExpected) {
            allPassed = false;
            lastOutput = `Failed on input:\n${tc.input || '(empty)'}\nExpected:\n${normalizedExpected}\nActual:\n${normalizedActual || res.stderr}`;
            break;
          } else {
            lastOutput = `Passed: ${normalizedActual}`;
          }
        }
      } else {
        const res = await runPythonCode(userCode, '');
        allPassed = res.success;
        lastOutput = res.stdout || res.stderr || 'Executed cleanly';
      }

      setTestResults((prev) => ({
        ...prev,
        [q.id]: { passed: allPassed, output: lastOutput, running: false },
      }));
    } catch (err: any) {
      setTestResults((prev) => ({
        ...prev,
        [q.id]: { passed: false, output: err?.message || 'Execution error', running: false },
      }));
    }
  };

  // Evaluate All Questions and Submit
  const handleFinalSubmit = async () => {
    if (!userData || !moduleMeta || questions.length === 0 || submitting) return;
    setSubmitting(true);
    setIsTimerRunning(false);

    let totalEarnedPoints = 0;
    let totalPossiblePoints = 0;
    const summaries: QuestionResultSummary[] = [];
    const missedTopicMap = new Map<string, string>();

    for (const q of questions) {
      const uAns = userAnswers[q.id];
      const maxPts =
        q.points ||
        (q.type === 'code-writing' || q.type === 'scenario'
          ? 5
          : q.type === 'debugging' || q.type === 'code-completion'
          ? 3
          : q.type === 'output' || q.type === 'code-tracing' || q.type === 'multiple-select'
          ? 2
          : 1);
      totalPossiblePoints += maxPts;

      let isCorrect = false;

      if (q.type === 'mcq' || q.type === 'short-answer') {
        if (typeof q.correctAnswer === 'number') {
          isCorrect = uAns === q.correctAnswer;
        } else {
          isCorrect = String(uAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
        }
      } else if (q.type === 'multiple-select') {
        const expectedIndices = (q.correctAnswer as number[]) || [];
        const userIndices = (uAns as number[]) || [];
        isCorrect =
          expectedIndices.length === userIndices.length &&
          expectedIndices.every((idx) => userIndices.includes(idx));
      } else if (q.type === 'output' || q.type === 'code-tracing') {
        const normalizedUser = String(uAns || '').trim().replace(/\r\n/g, '\n').toLowerCase();
        const normalizedExpected = String(q.correctAnswer || '').trim().replace(/\r\n/g, '\n').toLowerCase();
        isCorrect = normalizedUser === normalizedExpected;
      } else if (q.type === 'debugging' || q.type === 'code-writing' || q.type === 'code-completion' || q.type === 'scenario') {
        // Run test cases verification
        const code = String(uAns || '');
        if (q.testCases && q.testCases.length > 0) {
          let testPassed = true;
          for (const tc of q.testCases) {
            const res = await runPythonCode(code, tc.input);
            const actual = res.stdout.trim().replace(/\r\n/g, '\n');
            const expected = tc.expectedOutput.trim().replace(/\r\n/g, '\n');
            if (actual !== expected) {
              testPassed = false;
              break;
            }
          }
          isCorrect = testPassed;
        } else {
          // Check heuristic solution match
          const cleanUser = code.replace(/\s+/g, '');
          const cleanSol = String(q.solutionCode || '').replace(/\s+/g, '');
          isCorrect = cleanUser.length > 0 && cleanUser === cleanSol;
        }
      }

      const earnedPts = isCorrect ? maxPts : 0;
      totalEarnedPoints += earnedPts;

      if (!isCorrect) {
        missedTopicMap.set(q.topicId, q.topicTitle);
      }

      summaries.push({
        question: q,
        userAnswer: uAns,
        isCorrect,
        earnedPoints: earnedPts,
        maxPoints: maxPts,
      });
    }

    const calculatedScorePercent =
      totalPossiblePoints > 0 ? Math.round((totalEarnedPoints / totalPossiblePoints) * 100) : 0;
    const isPassing = calculatedScorePercent >= (assignmentConfig?.passingScorePercent || 70);
    const timeSpentSeconds = Math.max(
      1,
      Math.round((Date.now() - startTimeRef.current) / 1000)
    );

    const weakTopicsList = Array.from(missedTopicMap.entries()).map(([id, title]) => ({
      id,
      title,
    }));

    const attemptRecord = {
      attemptNumber: 1,
      scorePercent: calculatedScorePercent,
      passed: isPassing,
      timeTakenSeconds: timeSpentSeconds,
      date: new Date().toISOString(),
      weakTopicIds: weakTopicsList.map((t) => t.id),
    };

    // Save attempt and score to dynamic database
    try {
      await fetch('/api/db/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          skillId: 'python',
          moduleId: moduleMeta.id,
          assignmentScore: calculatedScorePercent,
          assignmentPassed: isPassing,
          assignmentAttempt: attemptRecord,
          weakTopics: weakTopicsList,
          status: isPassing ? 'completed' : 'in_progress',
        }),
      });
    } catch (err) {
      console.warn('Failed to save assignment progress:', err);
    }

    setResultData({
      scorePercent: calculatedScorePercent,
      totalPointsEarned: totalEarnedPoints,
      totalPossiblePoints,
      passed: isPassing,
      timeSpentSeconds,
      questionSummaries: summaries,
      weakTopics: weakTopicsList,
    });

    setIsSubmitted(true);
    setSubmitting(false);
  };

  const handleAutoSubmit = () => {
    handleFinalSubmit();
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-300">
        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-800">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Loading Assignment...</span>
        </div>
      </div>
    );
  }

  if (!moduleMeta) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="text-center space-y-4 max-w-md bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-[#006cd2]">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Module Not Found</h2>
          <Link
            href="/skills/python"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006cd2] text-white text-xs font-mono font-bold rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Python Roadmap
          </Link>
        </div>
      </div>
    );
  }

  if (isSubmitted && resultData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-[#006cd2] selection:text-white flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href={`/skills/python/${moduleMeta.id}`}
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
              <span>Back to Module {moduleMeta.moduleNumber}</span>
            </Link>
            <span className="text-xs font-mono text-slate-300">
              Module {moduleMeta.moduleNumber} Result Review
            </span>
          </div>
        </header>

        <PythonAssignmentResult
          moduleId={moduleMeta.id}
          moduleNumber={moduleMeta.moduleNumber}
          moduleTitle={moduleMeta.title}
          scorePercent={resultData.scorePercent}
          totalPointsEarned={resultData.totalPointsEarned}
          totalPossiblePoints={resultData.totalPossiblePoints}
          passed={resultData.passed}
          timeSpentSeconds={resultData.timeSpentSeconds}
          questionSummaries={resultData.questionSummaries}
          weakTopics={resultData.weakTopics}
          onRetry={initSession}
        />
      </div>
    );
  }

  const currentQ = questions[currentQIndex];
  const isTimerCritical = timeLeftSeconds <= 180; // <= 3 mins

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-[#006cd2] selection:text-white flex flex-col overflow-x-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#006cd2]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Sticky Header with Timer & Progress */}
        <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href={`/skills/python/${moduleMeta.id}`}
              className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
              <span className="hidden sm:inline">Exit Assignment</span>
              <span className="sm:hidden">Exit</span>
            </Link>

            <div className="flex items-center gap-3">
              {/* Question counter */}
              <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                Question <strong className="text-white">{currentQIndex + 1}</strong> / {questions.length}
              </span>

              {/* Countdown Timer */}
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                  isTimerCritical
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                    : 'bg-slate-900 border-slate-800 text-cyan-300'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Question Interface */}
        <main className="max-w-5xl mx-auto w-full py-8 px-4 sm:px-6 space-y-6 flex-1">
          {/* Question Navigator Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {questions.map((q, idx) => {
              const isAnswered =
                userAnswers[q.id] !== undefined &&
                userAnswers[q.id] !== '' &&
                (Array.isArray(userAnswers[q.id]) ? userAnswers[q.id].length > 0 : true);
              const isCurrent = idx === currentQIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`w-9 h-9 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-[#006cd2] text-white shadow-lg shadow-[#006cd2]/40 ring-2 ring-blue-400'
                      : isAnswered
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {currentQ && (
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg uppercase tracking-wider border border-blue-500/20">
                    Q{currentQIndex + 1} • {currentQ.type.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Topic: <strong className="text-slate-300">{currentQ.topicTitle}</strong>
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-400">
                  {currentQ.points || (currentQ.type === 'code-writing' || currentQ.type === 'scenario' ? 5 : currentQ.type === 'debugging' || currentQ.type === 'code-completion' ? 3 : currentQ.type === 'output' || currentQ.type === 'code-tracing' || currentQ.type === 'multiple-select' ? 2 : 1)} Points
                </span>
              </div>

              {/* Question Prompt */}
              <div className="space-y-3">
                <h2 className="font-display text-base sm:text-xl font-bold text-white leading-relaxed">
                  {currentQ.prompt}
                </h2>

                {currentQ.codeSnippet && (
                  <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                    <code>{currentQ.codeSnippet}</code>
                  </pre>
                )}
              </div>

              {/* Dynamic Input Renderers */}
              {/* 1. MCQ */}
              {currentQ.type === 'mcq' && currentQ.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = userAnswers[currentQ.id] === oIdx;

                    return (
                      <label
                        key={oIdx}
                        onClick={() => handleSelectMCQ(currentQ.id, oIdx)}
                        className={`p-4 rounded-2xl border text-xs sm:text-sm cursor-pointer transition flex items-center justify-between select-none ${
                          isSelected
                            ? 'bg-[#006cd2]/20 border-[#006cd2] text-white font-bold ring-1 ring-[#006cd2]'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-blue-500 hover:bg-slate-900'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#006cd2] stroke-[3]" />}
                      </label>
                    );
                  })}
                </div>
              )}

              {/* 2. Multiple Select */}
              {currentQ.type === 'multiple-select' && currentQ.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentQ.options.map((opt, oIdx) => {
                    const selectedList = (userAnswers[currentQ.id] as number[]) || [];
                    const isSelected = selectedList.includes(oIdx);

                    return (
                      <label
                        key={oIdx}
                        onClick={() => handleToggleMultiSelect(currentQ.id, oIdx)}
                        className={`p-4 rounded-2xl border text-xs sm:text-sm cursor-pointer transition flex items-center justify-between select-none ${
                          isSelected
                            ? 'bg-[#006cd2]/20 border-[#006cd2] text-white font-bold ring-1 ring-[#006cd2]'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-blue-500 hover:bg-slate-900'
                        }`}
                      >
                        <span>{opt}</span>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#006cd2] border-[#006cd2] text-white'
                              : 'border-slate-700 bg-slate-900'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* 3. Output Prediction & Code Tracing */}
              {(currentQ.type === 'output' || currentQ.type === 'code-tracing') && (
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-mono text-slate-400">
                    Enter the exact output / variable value:
                  </label>
                  <input
                    type="text"
                    value={userAnswers[currentQ.id] || ''}
                    onChange={(e) => handleTextChange(currentQ.id, e.target.value)}
                    placeholder="Type output here (e.g. 50 or True)"
                    className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-[#006cd2]"
                  />
                </div>
              )}

              {/* 4. Short Answer Conceptual Multiple Choice */}
              {currentQ.type === 'short-answer' && currentQ.options && (
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = userAnswers[currentQ.id] === oIdx;

                    return (
                      <label
                        key={oIdx}
                        onClick={() => handleSelectMCQ(currentQ.id, oIdx)}
                        className={`p-4 rounded-2xl border text-xs sm:text-sm cursor-pointer transition flex items-center justify-between select-none ${
                          isSelected
                            ? 'bg-[#006cd2]/20 border-[#006cd2] text-white font-bold ring-1 ring-[#006cd2]'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-blue-500 hover:bg-slate-900'
                        }`}
                      >
                        <span className="leading-relaxed">{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#006cd2] stroke-[3]" />}
                      </label>
                    );
                  })}
                </div>
              )}

              {/* 5. Code Writing, Debugging, Code Completion, Scenario */}
              {(currentQ.type === 'code-writing' ||
                currentQ.type === 'debugging' ||
                currentQ.type === 'code-completion' ||
                currentQ.type === 'scenario') && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Python Code Editor:</span>
                    <button
                      type="button"
                      onClick={() => handleRunCodeTests(currentQ)}
                      disabled={testResults[currentQ.id]?.running}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-sm"
                    >
                      {testResults[currentQ.id]?.running ? (
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Play className="w-3 h-3" />
                      )}
                      <span>Run Test Cases</span>
                    </button>
                  </div>

                  <textarea
                    rows={8}
                    value={userAnswers[currentQ.id] || ''}
                    onChange={(e) => handleTextChange(currentQ.id, e.target.value)}
                    placeholder="Write your Python code here..."
                    className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs sm:text-sm focus:outline-none focus:border-[#006cd2] leading-relaxed resize-y"
                    spellCheck={false}
                  />

                  {/* Test output banner */}
                  {testResults[currentQ.id] && (
                    <div
                      className={`p-4 rounded-xl border font-mono text-xs ${
                        testResults[currentQ.id].passed
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                          : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold mb-1">
                        {testResults[currentQ.id].passed ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>All Test Cases Passed!</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                            <span>Test Case Feedback:</span>
                          </>
                        )}
                      </div>
                      <pre className="overflow-x-auto whitespace-pre-wrap">
                        {testResults[currentQ.id].output}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation and Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs font-bold rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>

                {currentQIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="px-6 py-2.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs font-bold rounded-xl transition shadow-md shadow-[#006cd2]/30"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={submitting}
                    className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Grading Assignment...</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-4 h-4" />
                        <span>Submit Final Assignment</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
