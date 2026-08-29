'use client';

import React, { useState, useEffect, useRef } from 'react';
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

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';
const SPOTLIGHT_R = 260;

function RevealLayer({ image, cursorX, cursorY }: { image: string; cursorX: number; cursorY: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const revealDiv = revealRef.current;
    if (!canvas || !revealDiv) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (cursorX !== -999 && cursorY !== -999) {
      const gradient = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.75)');
      gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(0.88, 'rgba(255, 255, 255, 0.12)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    const dataUrl = canvas.toDataURL();
    revealDiv.style.maskImage = `url(${dataUrl})`;
    revealDiv.style.webkitMaskImage = `url(${dataUrl})`;
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ display: 'none' }} />
      <div
        ref={revealRef}
        className="fixed inset-0 bg-center bg-cover bg-no-repeat z-1 pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
    </>
  );
}

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

  // Mouse tracking spotlight
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateSmoothPosition = () => {
      if (mouseRef.current.x !== -999 && mouseRef.current.y !== -999) {
        if (smoothRef.current.x === -999 && smoothRef.current.y === -999) {
          smoothRef.current = { ...mouseRef.current };
        } else {
          smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.1;
          smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.1;
        }
        setCursorPos({ x: smoothRef.current.x, y: smoothRef.current.y });
      }
      rafRef.current = requestAnimationFrame(updateSmoothPosition);
    };

    rafRef.current = requestAnimationFrame(updateSmoothPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

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
      <div className="min-h-screen bg-black flex items-center justify-center font-mono text-sm text-stone-300">
        <div className="flex items-center gap-3 bg-stone-900/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/10">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span>Loading Module Content...</span>
        </div>
      </div>
    );
  }

  if (!skill || !module) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md bg-stone-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10">
          <div className="w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center mx-auto text-[#006cd2]">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Module Not Found</h2>
          <p className="font-sans text-sm text-stone-300">
            Could not find module <code className="font-mono bg-stone-800 px-1.5 py-0.5 rounded text-blue-300">&quot;{moduleId}&quot;</code> under skill <code className="font-mono bg-stone-800 px-1.5 py-0.5 rounded text-blue-300">&quot;{skillId}&quot;</code>.
          </p>
          <Link
            href={`/skills/${skillId}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-sm font-semibold rounded-full transition shadow-lg shadow-[#006cd2]/30"
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
    <div className="relative min-h-screen bg-black text-white font-sans antialiased select-none flex flex-col overflow-x-hidden">
      {/* Base Image Layer */}
      <div
        className="fixed inset-0 bg-center bg-cover bg-no-repeat z-0 pointer-events-none hero-zoom"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      {/* Reveal Layer */}
      <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/50 z-[2] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col flex-1">
        {/* Top Glassmorphic Navigation Bar */}
        <header className="sticky top-0 z-50 bg-stone-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
            <Link
              href={`/skills/${skill.skillId}`}
              className="flex items-center gap-2 font-mono text-xs font-semibold text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#006cd2]" />
              <span>Back to Level Map</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block font-mono text-xs text-stone-300 uppercase tracking-wider">
                {skill.title} Trail
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>

              {isAlreadyCompleted || (submitted && passed) ? (
                <span className="px-3.5 py-1 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold rounded-full flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Completed
                </span>
              ) : (
                <span className="px-3.5 py-1 bg-[#006cd2]/15 border border-[#006cd2]/40 text-blue-300 text-xs font-mono font-bold rounded-full flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#006cd2]" /> Active Level
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 space-y-8 flex-1">
          {/* Module Title Banner */}
          <div className="bg-stone-900/85 backdrop-blur-xl text-white rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-[#006cd2]" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#006cd2] bg-[#006cd2]/15 px-3 py-1 rounded-full uppercase tracking-wider border border-[#006cd2]/30">
                  {module.moduleId.toUpperCase()} • {skill.title}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {module.title}
              </h1>
              <p className="font-sans text-sm text-stone-300 max-w-2xl leading-relaxed">
                Review topic summaries below, test your knowledge with the assessment questions, and unlock the next module in your roadmap.
              </p>
            </div>
          </div>

          {/* 1. Module Topics Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#006cd2]" />
                Module Syllabus Topics
              </h2>
              <span className="font-mono text-xs text-stone-400">
                {module.topics.length} Key Concept{module.topics.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-3">
              {module.topics.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-stone-900/75 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl hover:border-[#006cd2]/50 transition-all space-y-2 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#006cd2]/20 border border-[#006cd2]/40 text-blue-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {t.name}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-stone-300/90 leading-relaxed pl-10">
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
                <div className="bg-stone-900/85 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-2xl mt-8">
                  <div className="w-16 h-16 bg-[#006cd2]/15 border border-[#006cd2]/30 rounded-2xl flex items-center justify-center mx-auto text-[#006cd2] shadow-inner">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="font-display text-2xl font-extrabold text-white tracking-tight">
                      Ready for Knowledge Assessment?
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
                      Test your understanding of {module.title} concepts to complete this module and unlock the next path on your roadmap.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAssessment(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-sm font-semibold rounded-full shadow-lg shadow-[#006cd2]/30 hover:scale-[1.03] active:scale-95 transition-all duration-200"
                  >
                    <span>Start Knowledge Assessment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <section className="space-y-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#006cd2]" />
                        Knowledge Assessment
                      </h2>
                      <p className="font-sans text-xs text-stone-400 mt-0.5">
                        Answer all questions correctly to mark this module as completed in Firestore.
                      </p>
                    </div>
                    {!submitted && (
                      <button
                        type="button"
                        onClick={() => setShowAssessment(false)}
                        className="text-xs text-stone-400 hover:text-white underline font-mono"
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
                      className="bg-stone-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl"
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
                            'bg-stone-800/60 border-white/10 text-stone-200 hover:border-[#006cd2] hover:bg-stone-800/80';

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
                          ? 'bg-stone-900/90 border-emerald-500/50 text-white'
                          : 'bg-stone-900/90 border-rose-500/40 text-white'
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
                          <p className="font-sans text-xs text-stone-300 leading-relaxed">
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
                          className="w-full sm:w-auto px-6 py-3.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-sm font-semibold rounded-full transition shadow-lg shadow-[#006cd2]/30 flex items-center justify-center gap-2 shrink-0"
                        >
                          <span>Return to Level Map</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="w-full sm:w-auto px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-sans text-sm font-semibold rounded-full transition shadow-md shrink-0"
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
                      className="w-full sm:w-auto px-8 py-4 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-sm font-semibold rounded-full shadow-lg shadow-[#006cd2]/30 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

