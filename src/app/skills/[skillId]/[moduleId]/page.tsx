'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getSkillById, getModuleById, Skill, Module } from '@/lib/content';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Award,
  Check,
  RefreshCw,
  Trophy,
  ChevronRight,
  Compass,
} from 'lucide-react';

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();

  const skillId = params.skillId as string;
  const moduleId = params.moduleId as string;

  const { userData, loading, toggleModuleProgress } = useAuth();

  const [skill, setSkill] = useState<Skill | null>(null);
  const [module, setModule] = useState<Module | null>(null);

  // Selected option indexes by question ID
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});

  // Submission & Score States
  const [submitted, setSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isSkillFinished, setIsSkillFinished] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [userData, loading, router]);

  useEffect(() => {
    if (skillId && moduleId) {
      const skillObj = getSkillById(skillId);
      const modObj = getModuleById(skillId, moduleId);
      setSkill(skillObj);
      setModule(modObj);
    }
  }, [skillId, moduleId]);

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-mono text-sm text-slate-300">
        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-800">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Loading Module Content...</span>
        </div>
      </div>
    );
  }

  if (!skill || !module) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="text-center space-y-4 max-w-md bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-[#006cd2]">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Module Not Found</h2>
          <p className="font-sans text-sm text-slate-400">
            Could not find module <code className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">&quot;{moduleId}&quot;</code> under skill <code className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-blue-300">&quot;{skillId}&quot;</code>.
          </p>
          <Link
            href={`/skills/${skillId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-sm font-semibold rounded-xl transition shadow-lg shadow-[#006cd2]/30"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Skill Trail
          </Link>
        </div>
      </div>
    );
  }

  const isAlreadyCompleted = !!userData.progress?.[skill.skillId.toLowerCase()]?.[module.moduleId];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return; // Lock choices once submitted
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!module.assessment || module.assessment.questions.length === 0) return;

    let correctCount = 0;
    const totalQuestions = module.assessment.questions.length;

    module.assessment.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const isPassing = correctCount === totalQuestions;
    setScore({ correct: correctCount, total: totalQuestions });
    setPassed(isPassing);
    setSubmitted(true);

    if (isPassing) {
      await toggleModuleProgress(skill.skillId, module.moduleId, true);

      const currentSkillProgress = userData.progress?.[skill.skillId.toLowerCase()] || {};
      const completedModulesCount = Object.keys(currentSkillProgress).filter(
        (k) => currentSkillProgress[k] || k === module.moduleId
      ).length;
      if (completedModulesCount >= skill.modules.length) {
        setIsSkillFinished(true);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-[#006cd2] selection:text-white flex flex-col overflow-x-hidden">
      {/* Lightweight Static Ambient Background (Zero lag, zero canvas CPU overhead) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#006cd2]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-32 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col flex-1 pb-mobile-nav">
        {/* Sticky Header Navigation */}
        <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href={`/skills/${skill.skillId}`}
              className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl hover:border-slate-700 transition"
            >
              <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
              <span>Back to {skill.title} Trail</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                <Compass className="w-3.5 h-3.5 text-[#006cd2]" />
                <span>{skill.title} Trail</span>
              </span>

              {isAlreadyCompleted || (submitted && passed) ? (
                <span className="px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Completed ✓
                </span>
              ) : (
                <span className="px-3.5 py-1.5 bg-[#006cd2]/15 border border-[#006cd2]/40 text-blue-300 text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#006cd2]" /> In Progress
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8 flex-1">
          {/* Module Title Banner */}
          <div className="bg-slate-900/90 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-[#006cd2]" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg uppercase tracking-wider border border-blue-500/30">
                  {module.moduleId.toUpperCase()} • {skill.title}
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                {module.title}
              </h1>
              <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Review topic summaries below, test your knowledge with the assessment questions, and unlock the next module in your roadmap.
              </p>
            </div>
          </div>

          {/* 1. Module Topics Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#006cd2]" />
                Module Syllabus Topics
              </h2>
              <span className="font-mono text-xs text-slate-400">
                {module.topics.length} Key Concept{module.topics.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-3">
              {module.topics.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl hover:border-[#006cd2]/50 transition-all space-y-2 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#006cd2]/20 border border-[#006cd2]/40 text-blue-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {t.name}
                    </h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed pl-10">
                    {t.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Assessment Section */}
          {module.assessment && module.assessment.questions.length > 0 && (
            <>
              {!showAssessment && !submitted ? (
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-2xl mt-8">
                  <div className="w-16 h-16 bg-[#006cd2]/15 border border-[#006cd2]/30 rounded-2xl flex items-center justify-center mx-auto text-[#006cd2] shadow-inner">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="font-display text-2xl font-extrabold text-white tracking-tight">
                      Ready for Knowledge Assessment?
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Test your understanding of {module.title} concepts to complete this module and unlock the next path on your roadmap.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAssessment(true)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold rounded-xl shadow-lg shadow-[#006cd2]/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                  >
                    <span>Start Knowledge Assessment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <section className="space-y-6 pt-6 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#006cd2]" />
                        Knowledge Assessment
                      </h2>
                      <p className="font-sans text-xs text-slate-400 mt-0.5">
                        Answer all questions correctly to mark this module as completed in Firestore.
                      </p>
                    </div>
                    {!submitted && (
                      <button
                        type="button"
                        onClick={() => setShowAssessment(false)}
                        className="text-xs text-slate-400 hover:text-white underline font-mono"
                      >
                        Hide Assessment
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSubmitAssessment} className="space-y-6">
                    {module.assessment.questions.map((q, qIndex) => {
                      const selectedOpt = userAnswers[q.id];

                      return (
                        <div
                          key={q.id}
                          className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl"
                        >
                          <div className="flex items-start gap-3">
                            <span className="font-mono text-xs font-bold text-[#006cd2] bg-[#006cd2]/15 px-2.5 py-1 rounded-lg border border-[#006cd2]/30 shrink-0 mt-0.5">
                              Q{qIndex + 1}
                            </span>
                            <p className="font-display text-base font-semibold text-white leading-snug">
                              {q.question}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0 sm:pl-9">
                            {q.options.map((optionText, oIdx) => {
                              const isSelected = selectedOpt === oIdx;

                              let optionStyle =
                                'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-[#006cd2] hover:bg-slate-900';

                              if (submitted) {
                                const isCorrectOpt = oIdx === q.correctAnswer;
                                if (isCorrectOpt) {
                                  optionStyle =
                                    'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-md';
                                } else if (isSelected && !isCorrectOpt) {
                                  optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-medium';
                                }
                              } else if (isSelected) {
                                optionStyle =
                                  'bg-[#006cd2]/20 border-[#006cd2] text-white font-bold shadow-md ring-1 ring-[#006cd2]';
                              }

                              return (
                                <label
                                  key={oIdx}
                                  onClick={() => handleSelectOption(q.id, oIdx)}
                                  className={`p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all duration-200 flex items-center justify-between select-none ${optionStyle}`}
                                >
                                  <span className="leading-snug">{optionText}</span>
                                  {isSelected && (
                                    <span className="w-5 h-5 rounded-full bg-[#006cd2] text-white flex items-center justify-center shrink-0 ml-2 shadow-sm">
                                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    </span>
                                  )}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                    {/* Assessment Submission & Score State Banners */}
                    {submitted ? (
                      <div className="space-y-4">
                        <div
                          className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl backdrop-blur-xl ${
                            passed
                              ? 'bg-slate-900/90 border-emerald-500/50 text-white'
                              : 'bg-slate-900/90 border-rose-500/40 text-white'
                          }`}
                        >
                          <div className="flex items-start sm:items-center gap-4">
                            <div
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                                passed
                                  ? 'bg-[#006cd2] text-white shadow-lg shadow-[#006cd2]/30'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {passed ? <Award className="w-7 h-7" /> : <RefreshCw className="w-7 h-7" />}
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-display text-lg font-bold">
                                {passed
                                  ? 'Assessment Passed! Module Completed 🎉'
                                  : `Assessment Review — Score: ${score.correct}/${score.total}`}
                              </h4>
                              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                                {passed
                                  ? 'Your progress has been recorded live in Firestore. The next module is now unlocked on your level map.'
                                  : 'Review the topic summaries above and try again to unlock the next module.'}
                              </p>
                              {isSkillFinished && passed && (
                                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#006cd2]/20 border border-[#006cd2]/40 text-blue-300 text-xs font-mono font-bold rounded-lg">
                                  <Trophy className="w-4 h-4 text-[#006cd2]" /> Entire Skill Mastered! Saved to Resume Portfolio.
                                </div>
                              )}
                            </div>
                          </div>

                          {passed ? (
                            <Link
                              href={`/skills/${skill.skillId}`}
                              className="w-full sm:w-auto px-6 py-3.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold rounded-xl transition shadow-lg shadow-[#006cd2]/30 flex items-center justify-center gap-2 shrink-0"
                            >
                              <span>Return to Skill Trail</span>
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSubmitted(false)}
                              className="w-full sm:w-auto px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-sans text-xs font-semibold rounded-xl transition shadow-md shrink-0"
                            >
                              Retry Assessment
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={Object.keys(userAnswers).length < module.assessment.questions.length}
                          className="w-full sm:w-auto px-8 py-3.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-semibold rounded-xl shadow-lg shadow-[#006cd2]/30 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Award className="w-4 h-4" />
                          <span>Submit Assessment</span>
                        </button>
                      </div>
                    )}
                  </form>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
