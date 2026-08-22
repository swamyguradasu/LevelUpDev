'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getSkillById, Skill, Module } from '@/lib/content';
import { ArrowLeft, Check, Lock, HelpCircle } from 'lucide-react';

export default function SkillPathMapPage() {
  const params = useParams();
  const router = useRouter();
  const skillId = params.skillId as string;

  const { userData, loading } = useAuth();
  const [skill, setSkill] = useState<Skill | null>(null);

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
      <div className="min-h-screen topo-bg flex items-center justify-center text-primary-container font-label-mono text-sm">
        <div className="flex items-center gap-3 bg-surface-container-lowest px-6 py-4 rounded-2xl shadow-sm border border-outline-variant/30">
          <div className="w-5 h-5 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
          <span>Loading Skill Trail...</span>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen topo-bg text-on-surface flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/30">
          <div className="w-14 h-14 bg-surface-container-low rounded-full flex items-center justify-center mx-auto text-primary-container">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Trail Not Found</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            No roadmap configuration found for <code className="font-label-mono bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface">&quot;{skillId}&quot;</code>.
          </p>
          <Link
            href="/home"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-container text-white font-medium rounded-lg text-body-sm hover:opacity-90 transition shadow-sm"
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
    <div className="min-h-screen topo-bg text-on-surface font-body-md antialiased overflow-x-hidden">
      {/* Top Navigation */}
      <header className="flex justify-between items-center w-full px-container-padding-mobile md:px-container-padding-desktop py-4 bg-transparent flat no shadows border-none z-50 relative">
        <Link
          aria-label="Back to Profile"
          className="flex items-center gap-2 text-on-surface-variant hover:opacity-80 transition-opacity scale-95 duration-200"
          href="/home"
        >
          <ArrowLeft className="w-5 h-5 text-on-surface-variant" />
          <span className="hidden md:inline font-body-sm text-body-sm">Profile</span>
        </Link>
        <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">
          {skill.title} Skill Trail
        </h1>
        <div className="w-8"></div> {/* Spacer for flex centering */}
      </header>

      {/* Main Content Canvas */}
      <main className="relative max-w-[1280px] mx-auto w-full min-h-[800px] py-12 px-container-padding-mobile md:px-container-padding-desktop">
        {/* SVG Trail Line Background */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 800">
            <path className="trail-path" d="M 500,50 Q 800,200 500,350 T 500,650" />
          </svg>
        </div>
        <div className="absolute inset-0 pointer-events-none z-0 block md:hidden">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 800">
            <path className="trail-path" d="M 200,50 Q 300,200 200,350 T 200,650" />
          </svg>
        </div>

        {/* Trail Nodes Container */}
        <div className="relative z-10 flex flex-col items-center gap-24 md:gap-32 w-full max-w-3xl mx-auto mt-8">
          {modulesWithStatus.map((mod, index) => {
            const isEven = index % 2 === 0;
            const modCode = `M${String(index + 1).padStart(2, '0')}`;
            const topicSummary =
              mod.topics.map((t) => t.name).join(', ') || 'Core concepts and practical exercises.';

            // Node 1 & Node 2 style: Completed Node
            if (mod.isCompleted) {
              return (
                <div
                  key={mod.moduleId}
                  className={`flex items-center group w-full ${
                    isEven ? 'md:-ml-32' : 'flex-row-reverse md:-mr-32'
                  }`}
                >
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 rounded-full bg-[#C98A3E] flex items-center justify-center shadow-sm">
                      <Check className="w-6 h-6 text-white stroke-[3]" />
                    </div>
                  </div>
                  <Link
                    href={`/skills/${skill.skillId}/${mod.moduleId}`}
                    className={`${
                      isEven ? 'ml-6' : 'mr-6 text-right'
                    } bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30 shadow-sm w-72 hover:border-[#5C7A6B]/40 transition-colors block`}
                  >
                    <div className={`flex ${isEven ? 'justify-between' : 'justify-end'} items-start mb-2`}>
                      <span className="font-label-mono text-label-mono text-[#5C7A6B]">{modCode}</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{mod.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {topicSummary}
                    </p>
                  </Link>
                </div>
              );
            }

            // Node 3 style: Current Active Node
            if (mod.isCurrent || (mod.isUnlocked && !mod.isCompleted && firstUncompletedIndex === index)) {
              return (
                <div key={mod.moduleId} className="flex items-center group w-full relative z-20">
                  <div className="flex-shrink-0 relative ml-0 md:ml-0 mx-auto md:mx-0 absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0">
                    <div className="w-12 h-12 rounded-full bg-surface-container-lowest border-4 border-primary-container flex items-center justify-center glow-ring">
                      <div className="w-4 h-4 rounded-full bg-[#C98A3E]"></div>
                    </div>
                  </div>
                  <div className="ml-auto md:ml-6 mt-20 md:mt-0 bg-surface-container-lowest p-6 rounded-lg border border-primary-container/20 shadow-md w-full md:w-80 relative bg-white">
                    <div className="absolute -top-3 right-4">
                      <span className="bg-[#E2654B] text-white px-2 py-1 rounded font-label-caps text-[10px]">
                        CURRENT
                      </span>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-label-mono text-label-mono text-primary-container">{modCode}</span>
                      <span className="font-label-mono text-label-mono text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
                        3.0 ECTS
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary-container mb-2 font-bold">
                      {mod.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 line-clamp-2">
                      {topicSummary}
                    </p>
                    <Link
                      href={`/skills/${skill.skillId}/${mod.moduleId}`}
                      className="w-full bg-primary-container text-white font-body-sm text-body-sm py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity block text-center"
                    >
                      Resume Trail
                    </Link>
                  </div>
                </div>
              );
            }

            // Node 4 & Node 5 style: Locked Nodes
            return (
              <div
                key={mod.moduleId}
                className={`flex items-center group w-full ${
                  isEven
                    ? 'md:-ml-32 opacity-40 backdrop-blur-sm grayscale-[50%]'
                    : 'flex-row-reverse md:-mr-32 opacity-60 backdrop-blur-sm grayscale-[30%]'
                }`}
              >
                <div className="flex-shrink-0 relative">
                  <div className="w-10 h-10 rounded-full border-2 border-outline-variant flex items-center justify-center bg-surface">
                    <Lock className="w-4 h-4 text-outline-variant" />
                  </div>
                </div>
                <div
                  className={`${
                    isEven ? 'ml-6' : 'mr-6 text-right'
                  } bg-surface-container-low p-6 rounded-lg border border-outline-variant/20 shadow-none w-72 relative`}
                >
                  <div className={`flex ${isEven ? 'justify-start' : 'justify-end'} items-start mb-2`}>
                    <span className="font-label-mono text-label-mono text-outline">{modCode}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface-variant mb-2">
                    {mod.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline line-clamp-2">{topicSummary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

