'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  PYTHON_FINAL_CHALLENGE,
  getAllPythonModules,
} from '@/data/pythonSkillsData';
import { runPythonCode } from '@/lib/pythonRunner';
import {
  fetchUserDynamicData,
  UserDynamicData,
} from '@/lib/dynamicDatabase';
import {
  ArrowLeft,
  Trophy,
  CheckCircle2,
  Play,
  Copy,
  Check,
  Code2,
  Sparkles,
  Lock,
  Award,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';

export default function PythonFinalChallengePage() {
  const router = useRouter();
  const { userData, loading } = useAuth();
  const [dynamicData, setDynamicData] = useState<UserDynamicData | null>(null);

  const challenge = PYTHON_FINAL_CHALLENGE;
  const allModules = useMemo(() => getAllPythonModules(), []);

  const [userCode, setUserCode] = useState<string>(challenge.starterCode);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testFeedback, setTestFeedback] = useState<{
    passed: boolean;
    message: string;
    details?: string;
  } | null>(null);

  const [copiedSample, setCopiedSample] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [savingProgress, setSavingProgress] = useState(false);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  useEffect(() => {
    async function loadData() {
      if (userData?.email) {
        const d = await fetchUserDynamicData(userData.email);
        setDynamicData(d);
        if (d.finalChallenge?.completed) {
          setIsCompleted(true);
        }
      }
    }
    loadData();
  }, [userData]);

  // Check if Module 7 is completed before allowing access
  const isUnlocked = useMemo(() => {
    if (!dynamicData) return false;
    const pyProgress = dynamicData.progress?.python || {};
    const mod7Record = pyProgress['m7'] || pyProgress['module-7'];
    return !!mod7Record?.assignmentPassed || mod7Record?.status === 'completed';
  }, [dynamicData]);

  const handleCopySample = () => {
    navigator.clipboard.writeText(challenge.sampleInput);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  const handleRunTests = async () => {
    setIsRunningTests(true);
    setTestFeedback(null);

    try {
      let allPassed = true;
      let failDetails = '';

      for (let i = 0; i < challenge.testCases.length; i++) {
        const tc = challenge.testCases[i];
        const res = await runPythonCode(userCode, tc.input);

        const cleanActual = res.stdout.trim().replace(/\r\n/g, '\n');
        const cleanExpected = tc.expectedOutput.trim().replace(/\r\n/g, '\n');

        if (cleanActual !== cleanExpected) {
          allPassed = false;
          failDetails = `Test Case ${i + 1} Failed:\nExpected:\n${cleanExpected}\n\nActual Output:\n${cleanActual || res.stderr}`;
          break;
        }
      }

      if (allPassed) {
        setTestFeedback({
          passed: true,
          message: 'All test cases passed cleanly! Exceptional capstone solution.',
        });

        // Save completion
        if (userData?.email) {
          setSavingProgress(true);
          await fetch('/api/db/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: userData.email,
              skillId: 'python',
              finalChallenge: {
                completed: true,
                score: 100,
              },
            }),
          });
          setIsCompleted(true);
          setSavingProgress(false);
        }
      } else {
        setTestFeedback({
          passed: false,
          message: 'Some test cases did not match the expected specification.',
          details: failDetails,
        });
      }
    } catch (err: any) {
      setTestFeedback({
        passed: false,
        message: 'Error during script execution.',
        details: err?.message,
      });
    } finally {
      setIsRunningTests(false);
    }
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-300">
        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-800">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Loading Final Challenge...</span>
        </div>
      </div>
    );
  }

  if (!isUnlocked && dynamicData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="text-center space-y-4 max-w-md bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Capstone Challenge Locked</h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            You must pass all 7 Python module assignments before unlocking this beginner capstone challenge.
          </p>
          <Link
            href="/skills/python"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006cd2] text-white text-xs font-mono font-bold rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Python Roadmap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-[#006cd2] selection:text-white flex flex-col overflow-x-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-mobile-nav">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/skills/python"
              className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
              <span>Back to Python Roadmap</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>Capstone Project</span>
              </span>
              {isCompleted && (
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/40 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Challenge Mastered ✓
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto w-full py-8 px-4 sm:px-6 space-y-8 flex-1">
          {/* Capstone Header Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg uppercase tracking-wider border border-indigo-500/30">
                FINAL CHALLENGE (MODULES 1–7)
              </span>
              <span className="text-xs font-mono text-slate-400">Est. Time: {challenge.estimatedTime}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              {challenge.title}
            </h1>
            <p className="font-sans text-sm text-slate-300 max-w-2xl leading-relaxed">
              {challenge.description}
            </p>
          </div>

          {/* Specification Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Requirements Card */}
            <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 space-y-3 backdrop-blur-xl">
              <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Project Requirements</span>
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {challenge.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-mono font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Input Expectations & Constraints */}
            <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 space-y-3 backdrop-blur-xl">
              <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span>Input Format & Constraints</span>
              </h2>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 font-sans">
                {challenge.inputExpectations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-400 font-mono font-bold">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-slate-800 text-xs font-mono text-slate-400 flex flex-wrap gap-2">
                {challenge.constraints.map((c, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sample I/O */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Sample Standard Input</span>
                <button
                  onClick={handleCopySample}
                  className="flex items-center gap-1 hover:text-white"
                >
                  {copiedSample ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSample ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto">
                <code>{challenge.sampleInput}</code>
              </pre>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span>Expected Standard Output</span>
              </div>
              <pre className="p-4 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto">
                <code>{challenge.sampleOutput}</code>
              </pre>
            </div>
          </div>

          {/* Code Editor and Test Runner */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <h2 className="font-display text-lg font-bold text-white">Your Python Solution</h2>
              </div>

              <button
                type="button"
                onClick={handleRunTests}
                disabled={isRunningTests}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition disabled:opacity-50"
              >
                {isRunningTests ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Evaluating Test Cases...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Automated Test Cases</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              rows={16}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full p-5 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono text-xs sm:text-sm focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
              spellCheck={false}
            />

            {/* Test Feedback */}
            {testFeedback && (
              <div
                className={`p-5 rounded-2xl border font-mono text-xs space-y-2 ${
                  testFeedback.passed
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-bold">
                  {testFeedback.passed ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>{testFeedback.message}</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                      <span>{testFeedback.message}</span>
                    </>
                  )}
                </div>

                {testFeedback.details && (
                  <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto text-slate-300 whitespace-pre-wrap">
                    {testFeedback.details}
                  </pre>
                )}

                {testFeedback.passed && (
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      🏆 Python Skills Trail Completely Mastered & Verified!
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
