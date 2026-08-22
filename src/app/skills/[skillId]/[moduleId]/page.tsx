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
  Code2,
  ChevronRight,
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
      <div className="min-h-screen topo-bg flex items-center justify-center font-mono text-sm text-[#5C7A6B]">
        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-[#5C7A6B]/20">
          <div className="w-5 h-5 border-2 border-[#5C7A6B] border-t-transparent rounded-full animate-spin" />
          <span>Loading Module Content...</span>
        </div>
      </div>
    );
  }

  if (!skill || !module) {
    return (
      <div className="min-h-screen topo-bg text-[#0F2E28] flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-[#5C7A6B]/20">
          <div className="w-16 h-16 bg-[#5C7A6B]/10 rounded-2xl flex items-center justify-center mx-auto text-[#C98A3E]">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#0F2E28]">Module Not Found</h2>
          <p className="font-sans text-sm text-[#414846]">
            Could not find module <code className="font-mono bg-[#E2E8E2] px-1.5 py-0.5 rounded text-[#0F2E28]">&quot;{moduleId}&quot;</code> under skill <code className="font-mono bg-[#E2E8E2] px-1.5 py-0.5 rounded text-[#0F2E28]">&quot;{skillId}&quot;</code>.
          </p>
          <Link
            href={`/skills/${skillId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F2E28] text-white font-sans text-sm font-semibold rounded-full hover:bg-[#5C7A6B] transition shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Skill Map
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
      // Write progress.[skillId].[moduleId] = true to Firestore user doc
      await toggleModuleProgress(skill.skillId, module.moduleId, true);

      // Check if this was the last module in the skill
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
    <div className="min-h-screen topo-bg text-on-surface font-sans antialiased select-none flex flex-col">
      {/* Top Glassmorphic Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#5C7A6B]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href={`/skills/${skill.skillId}`}
            className="flex items-center gap-2 font-mono text-xs font-semibold text-[#5C7A6B] hover:text-[#0F2E28] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C98A3E]" />
            <span>Back to Level Map</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block font-mono text-xs text-[#414846] uppercase tracking-wider">
              {skill.title} Trail
            </span>
            <span className="text-[#5C7A6B]/30 hidden sm:inline">•</span>

            {isAlreadyCompleted || (submitted && passed) ? (
              <span className="px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-mono font-bold rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Completed
              </span>
            ) : (
              <span className="px-3.5 py-1 bg-[#C98A3E]/10 border border-[#C98A3E]/30 text-[#0F2E28] text-xs font-mono font-bold rounded-full flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C98A3E]" /> Active Level
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 space-y-8 flex-1">
        {/* Module Title Banner */}
        <div className="bg-[#0F2E28] text-white rounded-3xl p-8 border border-[#5C7A6B]/30 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#5C7A6B] via-[#C98A3E] to-[#E2654B]" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#C98A3E] bg-[#C98A3E]/15 px-3 py-1 rounded-full uppercase tracking-wider border border-[#C98A3E]/30">
                {module.moduleId.toUpperCase()} • {skill.title}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {module.title}
            </h1>
            <p className="font-sans text-sm text-[#EDF2ED]/80 max-w-2xl leading-relaxed">
              Review topic summaries below, test your knowledge with the assessment questions, and unlock the next module in your roadmap.
            </p>
          </div>
        </div>

        {/* 1. Module Topics Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#5C7A6B]/20 pb-3">
            <h2 className="font-display text-xl font-bold text-[#0F2E28] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#5C7A6B]" />
              Module Syllabus Topics
            </h2>
            <span className="font-mono text-xs text-[#5C7A6B]">
              {module.topics.length} Key Concept{module.topics.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-3">
            {module.topics.map((t, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#5C7A6B]/20 p-6 shadow-sm hover:shadow-md hover:border-[#5C7A6B]/40 transition-all space-y-2 group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-[#5C7A6B]/15 border border-[#5C7A6B]/30 text-[#0F2E28] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="font-display text-base font-bold text-[#0F2E28]">
                    {t.name}
                  </h3>
                </div>
                <p className="font-sans text-sm text-[#414846] leading-relaxed pl-10">
                  {t.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Assessment Section */}
        {module.assessment && module.assessment.questions.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-[#5C7A6B]/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-[#0F2E28] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C98A3E]" />
                  Knowledge Assessment
                </h2>
                <p className="font-sans text-xs text-[#414846] mt-0.5">
                  Answer all questions correctly to mark this module as completed in Firestore.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitAssessment} className="space-y-6">
              {module.assessment.questions.map((q, qIndex) => {
                const selectedOpt = userAnswers[q.id];

                return (
                  <div
                    key={q.id}
                    className="bg-white/90 backdrop-blur-xl border border-[#5C7A6B]/20 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold text-[#C98A3E] bg-[#C98A3E]/10 px-2.5 py-1 rounded-lg border border-[#C98A3E]/20 shrink-0 mt-0.5">
                        Q{qIndex + 1}
                      </span>
                      <p className="font-display text-base font-semibold text-[#0F2E28] leading-snug">
                        {q.question}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0 sm:pl-9">
                      {q.options.map((optionText, oIdx) => {
                        const isSelected = selectedOpt === oIdx;

                        let optionStyle =
                          'bg-[#E2E8E2]/40 border-[#5C7A6B]/20 text-[#1A1C1B] hover:border-[#C98A3E] hover:bg-white';

                        if (submitted) {
                          const isCorrectOpt = oIdx === q.correctAnswer;
                          if (isCorrectOpt) {
                            optionStyle =
                              'bg-emerald-500/15 border-emerald-600 text-emerald-950 font-bold shadow-sm';
                          } else if (isSelected && !isCorrectOpt) {
                            optionStyle = 'bg-[#E2654B]/15 border-[#E2654B] text-[#E2654B] font-medium';
                          }
                        } else if (isSelected) {
                          optionStyle =
                            'bg-[#C98A3E]/15 border-[#C98A3E] text-[#0F2E28] font-bold shadow-sm ring-1 ring-[#C98A3E]/50';
                        }

                        return (
                          <label
                            key={oIdx}
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            className={`p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all duration-200 flex items-center justify-between select-none ${optionStyle}`}
                          >
                            <span className="leading-snug">{optionText}</span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#C98A3E] text-[#0F2E28] flex items-center justify-center shrink-0 ml-2">
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
                    className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl ${
                      passed
                        ? 'bg-[#0F2E28] border-emerald-500/40 text-white'
                        : 'bg-[#E2654B]/10 border-[#E2654B]/30 text-[#0F2E28]'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                          passed
                            ? 'bg-[#C98A3E] text-[#0F2E28]'
                            : 'bg-[#E2654B]/20 text-[#E2654B] border border-[#E2654B]/30'
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
                        <p className="font-sans text-xs opacity-90 leading-relaxed">
                          {passed
                            ? 'Your progress has been recorded live in Firestore. The next module is now unlocked on your level map.'
                            : 'Review the topic summaries above and try again to unlock the next module.'}
                        </p>
                        {isSkillFinished && passed && (
                          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#C98A3E]/20 border border-[#C98A3E]/40 text-[#C98A3E] text-xs font-mono font-bold rounded-lg">
                            <Trophy className="w-4 h-4 text-[#C98A3E]" /> Entire Skill Mastered! Saved to Resume Portfolio.
                          </div>
                        )}
                      </div>
                    </div>

                    {passed ? (
                      <Link
                        href={`/skills/${skill.skillId}`}
                        className="w-full sm:w-auto px-6 py-3.5 bg-[#C98A3E] text-[#0F2E28] font-sans text-sm font-semibold rounded-full hover:bg-[#C98A3E]/90 transition shadow-lg flex items-center justify-center gap-2 shrink-0"
                      >
                        <span>Return to Level Map</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="w-full sm:w-auto px-6 py-3 bg-[#E2654B] text-white font-sans text-sm font-semibold rounded-full hover:bg-[#E2654B]/90 transition shadow-md shrink-0"
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
                    className="w-full sm:w-auto px-8 py-4 bg-[#C98A3E] text-[#0F2E28] font-sans text-sm font-semibold rounded-full hover:bg-[#C98A3E]/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Award className="w-4 h-4" />
                    <span>Submit Assessment</span>
                  </button>
                </div>
              )}
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

