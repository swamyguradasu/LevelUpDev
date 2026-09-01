'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Award,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
  Target,
} from 'lucide-react';
import { AssignmentQuestion } from '@/data/pythonSkillsData';

export interface QuestionResultSummary {
  question: AssignmentQuestion;
  userAnswer: any;
  isCorrect: boolean;
  earnedPoints: number;
  maxPoints: number;
}

interface PythonAssignmentResultProps {
  moduleId: string;
  moduleNumber: number;
  moduleTitle: string;
  scorePercent: number;
  totalPointsEarned: number;
  totalPossiblePoints: number;
  passed: boolean;
  timeSpentSeconds: number;
  questionSummaries: QuestionResultSummary[];
  weakTopics: Array<{ id: string; title: string }>;
  onRetry: () => void;
}

export default function PythonAssignmentResult({
  moduleId,
  moduleNumber,
  moduleTitle,
  scorePercent,
  totalPointsEarned,
  totalPossiblePoints,
  passed,
  timeSpentSeconds,
  questionSummaries,
  weakTopics,
  onRetry,
}: PythonAssignmentResultProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  const correctCount = questionSummaries.filter((q) => q.isCorrect).length;
  const incorrectCount = questionSummaries.length - correctCount;

  return (
    <div className="max-w-4xl mx-auto w-full py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Banner Card */}
      <div
        className={`rounded-3xl p-8 sm:p-10 border backdrop-blur-xl shadow-2xl text-center space-y-5 relative overflow-hidden ${
          passed
            ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/40 border-emerald-500/50 shadow-emerald-950/30'
            : 'bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950/40 border-rose-500/40 shadow-rose-950/30'
        }`}
      >
        <div
          className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-lg ${
            passed
              ? 'bg-[#006cd2] text-white shadow-[#006cd2]/40'
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-rose-500/20'
          }`}
        >
          {passed ? <Award className="w-10 h-10" /> : <RotateCcw className="w-10 h-10" />}
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
            MODULE {moduleNumber} ASSIGNMENT RESULT
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            {passed ? '🎉 Assignment Passed!' : 'Assignment Not Passed'}
          </h1>
          <p className="font-sans text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {passed
              ? `Outstanding job! You scored ${scorePercent}% (threshold: 70%). Your progress has been saved and the next module is now unlocked!`
              : `You scored ${scorePercent}% (threshold: 70%). Review your weak topics below and retry with a new randomized set of questions.`}
          </p>
        </div>

        {/* Score & Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block">Final Score</span>
            <strong
              className={`text-xl font-mono font-bold ${
                passed ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {scorePercent}%
            </strong>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block">Points</span>
            <strong className="text-xl font-mono font-bold text-white">
              {totalPointsEarned}/{totalPossiblePoints}
            </strong>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block">Accuracy</span>
            <strong className="text-xl font-mono font-bold text-blue-400">
              {correctCount}/{questionSummaries.length}
            </strong>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block">Time Taken</span>
            <strong className="text-xl font-mono font-bold text-slate-200">
              {formatTime(timeSpentSeconds)}
            </strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {passed ? (
            <>
              <Link
                href="/skills/python"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-mono text-xs font-bold rounded-xl shadow-lg shadow-[#006cd2]/30 transition"
              >
                <span>Continue on Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={onRetry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold rounded-xl transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Practice Again (New Questions)</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onRetry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold rounded-xl shadow-lg shadow-rose-600/30 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Assignment (New Random Set)</span>
              </button>
              <Link
                href={`/skills/python/${moduleId}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold rounded-xl transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Module Syllabus</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Weak Topics Diagnostic Card */}
      {weakTopics.length > 0 && (
        <section className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                Weak Areas Detected ({weakTopics.length})
              </h2>
              <p className="text-xs text-slate-400">
                Review these specific topics before your next attempt to master the underlying concepts:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {weakTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/skills/python/${moduleId}/${topic.id}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white">
                    {topic.title}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Question-by-Question Breakdown */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Target className="w-5 h-5 text-[#006cd2]" />
          Detailed Question Review
        </h2>

        <div className="space-y-3">
          {questionSummaries.map((item, idx) => (
            <div
              key={item.question.id}
              className={`p-6 rounded-2xl border space-y-3 transition-all ${
                item.isCorrect
                  ? 'bg-slate-900/60 border-emerald-500/30'
                  : 'bg-slate-900/60 border-rose-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {item.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono mb-1">
                      <span className="font-bold text-slate-400">Q{idx + 1}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-blue-400 font-medium">{item.question.topicTitle}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 uppercase">{item.question.type}</span>
                    </div>
                    <p className="text-sm font-semibold text-white leading-snug font-sans">
                      {item.question.prompt}
                    </p>
                  </div>
                </div>

                <span
                  className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${
                    item.isCorrect
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {item.earnedPoints} / {item.maxPoints} pts
                </span>
              </div>

              {/* Code snippet if any */}
              {item.question.codeSnippet && (
                <div className="pl-8">
                  <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto">
                    <code>{item.question.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Explanation */}
              <div className="pl-8 pt-1 text-xs font-mono text-slate-300">
                💡 <strong className="text-blue-300">Explanation:</strong> {item.question.explanation}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ChevronRight(props: any) {
  return <ArrowRight {...props} />;
}
