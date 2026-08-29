'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getSkillById, Skill, Module } from '@/lib/content';
import { ArrowLeft, Check, Lock, HelpCircle } from 'lucide-react';

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

export default function SkillPathMapPage() {
  const params = useParams();
  const router = useRouter();
  const skillId = params.skillId as string;

  const { userData, loading } = useAuth();
  const [skill, setSkill] = useState<Skill | null>(null);

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
    if (skillId) {
      const data = getSkillById(skillId);
      setSkill(data);
    }
  }, [skillId]);

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-label-mono text-sm">
        <div className="flex items-center gap-3 bg-stone-900/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/10">
          <div className="w-5 h-5 border-2 border-[#006cd2] border-t-transparent rounded-full animate-spin" />
          <span className="text-stone-200">Loading Skill Trail...</span>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-stone-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10">
          <div className="w-14 h-14 bg-stone-800 rounded-full flex items-center justify-center mx-auto text-[#006cd2]">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h2 className="font-headline-md text-headline-md font-bold text-white">Trail Not Found</h2>
          <p className="font-body-sm text-body-sm text-stone-300">
            No roadmap configuration found for <code className="font-label-mono bg-stone-800 px-1.5 py-0.5 rounded text-blue-300">&quot;{skillId}&quot;</code>.
          </p>
          <Link
            href="/home"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006cd2] hover:bg-[#005bb5] text-white font-medium rounded-xl text-body-sm transition shadow-lg shadow-[#006cd2]/30"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Profile
          </Link>
        </div>
      </div>
    );
  }

  const skillProgress = userData.progress?.[skill.skillId.toLowerCase()] || {};
  const firstUncompletedIndex = skill.modules.findIndex((mod: Module) => !skillProgress[mod.moduleId]);

  // Compute status for each module in sequence
  const modulesWithStatus = skill.modules.map((mod: Module, index: number) => {
    const isCompleted = !!skillProgress[mod.moduleId];

    let isUnlocked = false;
    if (index === 0) {
      isUnlocked = true; // Module 1 is always unlocked
    } else {
      const prevModule = skill.modules[index - 1];
      isUnlocked = !!skillProgress[prevModule.moduleId];
    }

    const isCurrent = !isCompleted && isUnlocked && (firstUncompletedIndex === -1 ? false : index === firstUncompletedIndex);

    let status: 'completed' | 'in-progress' | 'locked' = 'locked';
    if (isCompleted) {
      status = 'completed';
    } else if (isUnlocked) {
      status = 'in-progress';
    } else {
      status = 'locked';
    }

    return {
      ...mod,
      status,
      isUnlocked,
      isCompleted,
      isCurrent,
      moduleNumber: index + 1,
    };
  });

  return (
    <div className="relative min-h-screen bg-black text-on-surface font-body-md antialiased overflow-x-hidden">
      {/* Base Image Layer */}
      <div
        className="fixed inset-0 bg-center bg-cover bg-no-repeat z-0 pointer-events-none hero-zoom"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      {/* Reveal Layer */}
      <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

      {/* Dark overlay for contrast */}
      <div className="fixed inset-0 bg-black/40 z-[2] pointer-events-none" />

      {/* Roadmap Content */}
      <div className="relative z-10 min-h-screen">
        {/* Top Navigation */}
        <header className="flex justify-between items-center w-full px-container-padding-mobile md:px-container-padding-desktop py-4 bg-transparent flat no shadows border-none z-50 relative">
          <Link
            aria-label="Back to Profile"
            className="flex items-center gap-2 text-white/90 hover:text-white hover:opacity-80 transition-opacity scale-95 duration-200"
            href="/home"
          >
            <ArrowLeft className="w-5 h-5 text-white/90" />
            <span className="hidden md:inline font-body-sm text-body-sm">Profile</span>
          </Link>
          <h1 className="font-headline-md text-headline-md font-bold text-white tracking-tight drop-shadow-md">
            {skill.title} Skill Trail
          </h1>
          <div className="w-8"></div> {/* Spacer for flex centering */}
        </header>

      {/* Main Content Canvas */}
      <main className="relative max-w-[1280px] mx-auto w-full min-h-[800px] py-12 px-container-padding-mobile md:px-container-padding-desktop">
        {/* SVG Trail Line Background */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 800">
            <path
              className="trail-path"
              d="M 500,50 Q 750,200 500,350 T 500,650"
              stroke="#006cd2"
              strokeOpacity="0.6"
              strokeWidth="3"
              strokeDasharray="8 8"
              fill="none"
            />
          </svg>
        </div>
        <div className="absolute inset-0 pointer-events-none z-0 block md:hidden">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 800">
            <path
              className="trail-path"
              d="M 200,50 Q 300,200 200,350 T 200,650"
              stroke="#006cd2"
              strokeOpacity="0.6"
              strokeWidth="3"
              strokeDasharray="8 8"
              fill="none"
            />
          </svg>
        </div>

        {/* Trail Nodes Container with Fixed Left/Right Axis */}
        <div className="relative z-10 flex flex-col items-center gap-28 md:gap-36 w-full max-w-4xl mx-auto mt-8">
          {modulesWithStatus.map((mod, index) => {
            const isEven = index % 2 === 0;
            const modCode = `M${String(index + 1).padStart(2, '0')}`;
            const topicSummary =
              mod.topics.map((t) => t.name).join(', ') || 'Core concepts and practical exercises.';

            return (
              <div key={mod.moduleId} className="relative flex items-center justify-center w-full min-h-[140px]">
                {/* Center Axis Node Badge */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  {mod.isCompleted ? (
                    <div className="w-12 h-12 rounded-full bg-[#006cd2] flex items-center justify-center shadow-lg shadow-[#006cd2]/40 border-2 border-white/30">
                      <Check className="w-6 h-6 text-white stroke-[3]" />
                    </div>
                  ) : mod.isCurrent || (mod.isUnlocked && !mod.isCompleted && firstUncompletedIndex === index) ? (
                    <div className="w-14 h-14 rounded-full bg-stone-950 border-4 border-[#006cd2] flex items-center justify-center shadow-[0_0_25px_rgba(0,108,210,0.7)] animate-pulse">
                      <div className="w-5 h-5 rounded-full bg-[#006cd2] shadow-inner"></div>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-stone-900/90 shadow-inner">
                      <Lock className="w-4 h-4 text-stone-400" />
                    </div>
                  )}
                </div>

                {/* Fixed Card Position (Left for Even, Right for Odd) */}
                <div
                  className={`absolute z-10 w-[calc(50%-2.5rem)] sm:w-80 ${
                    isEven
                      ? 'right-1/2 mr-8 md:mr-12 text-right'
                      : 'left-1/2 ml-8 md:ml-12 text-left'
                  }`}
                >
                  {mod.isCompleted ? (
                    <Link
                      href={`/skills/${skill.skillId}/${mod.moduleId}`}
                      className="bg-stone-900/75 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl hover:border-[#006cd2]/60 hover:shadow-2xl hover:shadow-[#006cd2]/20 hover:scale-[1.02] transition-all duration-300 block group"
                    >
                      <div className={`flex items-center justify-between mb-2 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                        <span className="font-label-mono text-label-mono text-[#006cd2] font-semibold">{modCode}</span>
                        <span className="text-xs text-emerald-400 font-mono font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Completed ✓
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-white group-hover:text-blue-300 transition-colors mb-2 font-bold">{mod.title}</h3>
                      <p className="font-body-sm text-body-sm text-stone-300/90 line-clamp-2">
                        {topicSummary}
                      </p>
                    </Link>
                  ) : mod.isCurrent || (mod.isUnlocked && !mod.isCompleted && firstUncompletedIndex === index) ? (
                    <div className="bg-stone-900/90 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-[#006cd2]/70 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_25px_rgba(0,108,210,0.25)] relative group hover:scale-[1.02] transition-all duration-300">
                      <div className={`flex items-center justify-between mb-3 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="flex items-center gap-2">
                          <span className="font-label-mono text-label-mono text-[#006cd2] font-bold">{modCode}</span>
                          <span className="bg-[#006cd2] text-white px-2.5 py-0.5 rounded-full font-label-caps text-[10px] font-extrabold shadow-sm shadow-[#006cd2]/40 uppercase tracking-wider">
                            CURRENT
                          </span>
                        </div>
                        <span className="font-label-mono text-xs text-stone-300 bg-stone-800/80 px-2 py-0.5 rounded border border-white/10">
                          3.0 ECTS
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-white mb-2 font-extrabold text-lg sm:text-xl tracking-tight">
                        {mod.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-stone-300/90 mb-4 line-clamp-2 leading-relaxed">
                        {topicSummary}
                      </p>
                      <Link
                        href={`/skills/${skill.skillId}/${mod.moduleId}`}
                        className="w-full bg-[#006cd2] hover:bg-[#005bb5] text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-lg shadow-[#006cd2]/30 hover:shadow-[#006cd2]/50 active:scale-95 transition-all block text-center mt-4"
                      >
                        Resume Trail →
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-stone-950/50 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/10 shadow-none opacity-60">
                      <div className={`flex items-center justify-between mb-2 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                        <span className="font-label-mono text-label-mono text-stone-400 font-medium">{modCode}</span>
                        <span className="text-xs text-stone-500 font-mono">Locked</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-stone-300/80 mb-2 font-semibold">
                        {mod.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-stone-400/80 line-clamp-2">{topicSummary}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      </div>
    </div>
  );
}

