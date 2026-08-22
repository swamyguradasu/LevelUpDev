import React from 'react';
import Link from 'next/link';
import { Flame, Compass, Mountain, CheckCircle2, Lock, ArrowRight, Code2, ShieldAlert, Award } from 'lucide-react';

export const metadata = {
  title: 'Design System & Style Guide | LevelUpDev',
  description: 'Learning Trail design tokens, typography, and component patterns preview.',
};

export default function StyleGuidePage() {
  const colors = [
    {
      name: '--ink',
      hex: '#0F2E28',
      tailwind: 'bg-ink / text-ink',
      role: 'Deep Forest — Dark surfaces, headers, primary text on light background',
      bgClass: 'bg-ink',
      textClass: 'text-paper',
      borderClass: 'border-ink',
    },
    {
      name: '--mist',
      hex: '#EDF2ED',
      tailwind: 'bg-mist / text-mist',
      role: 'Page Background — Soft sage-white, not pure white',
      bgClass: 'bg-mist',
      textClass: 'text-ink',
      borderClass: 'border-moss/30',
    },
    {
      name: '--gold',
      hex: '#C98A3E',
      tailwind: 'bg-gold / text-gold',
      role: 'Accent — Unlocked states, active elements, primary buttons',
      bgClass: 'bg-gold',
      textClass: 'text-ink',
      borderClass: 'border-gold',
    },
    {
      name: '--moss',
      hex: '#5C7A6B',
      tailwind: 'bg-moss / text-moss',
      role: 'Secondary text, locked/muted states, outline borders',
      bgClass: 'bg-moss',
      textClass: 'text-paper',
      borderClass: 'border-moss',
    },
    {
      name: '--ember',
      hex: '#E2654B',
      tailwind: 'bg-ember / text-ember',
      role: 'Streak/fire indicator only — use sparingly, not a general accent',
      bgClass: 'bg-ember',
      textClass: 'text-paper',
      borderClass: 'border-ember',
    },
    {
      name: '--paper',
      hex: '#FFFFFF',
      tailwind: 'bg-paper / text-paper',
      role: 'Card backgrounds — Sitting on top of --mist canvas',
      bgClass: 'bg-paper',
      textClass: 'text-ink',
      borderClass: 'border-moss/20',
    },
  ];

  return (
    <div className="min-h-screen bg-mist text-ink px-4 py-8 md:px-12 md:py-14 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <header className="bg-paper rounded-2xl p-8 md:p-10 shadow-md border border-moss/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist border border-moss/20 text-moss text-xs font-mono font-medium">
            <Compass className="w-4 h-4 text-gold" />
            <span>LEARNING TRAIL DESIGN SYSTEM</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-ink tracking-tight">
            Engineering Trail Style Guide
          </h1>
          <p className="font-sans text-moss text-base md:text-lg max-w-3xl leading-relaxed">
            A cohesive hiking-trail metaphor design system for engineering students. Built with custom CSS variables, Tailwind theme extensions, Google Fonts, and warm-tinted soft depth.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gold text-ink font-semibold rounded-full px-5 py-2.5 text-sm hover:bg-gold/90 transition shadow-sm"
            >
              Back to App Root
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="font-mono text-xs text-moss px-3 py-1 bg-mist rounded-full border border-moss/10">
              URL: /style-guide
            </span>
          </div>
        </div>
      </header>

      {/* 1. Color Palette Swatches */}
      <section className="space-y-6">
        <div className="border-b border-moss/20 pb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-ink">
              1. Color Tokens & Swatches
            </h2>
            <p className="font-sans text-moss text-sm mt-1">
              Custom color tokens mapped to CSS variables and Tailwind utility classes (<code className="font-mono text-xs bg-paper px-1.5 py-0.5 rounded border border-moss/20">bg-ink</code>, <code className="font-mono text-xs bg-paper px-1.5 py-0.5 rounded border border-moss/20">bg-mist</code>, <code className="font-mono text-xs bg-paper px-1.5 py-0.5 rounded border border-moss/20">bg-gold</code>, etc.)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colors.map((color) => (
            <div
              key={color.name}
              className="bg-paper rounded-2xl p-5 shadow-sm border border-moss/15 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div>
                <div
                  className={`h-28 rounded-xl ${color.bgClass} border ${color.borderClass} flex items-end p-3 shadow-inner relative overflow-hidden`}
                >
                  <span className={`font-mono text-xs font-bold px-2 py-1 rounded bg-black/30 backdrop-blur-sm text-white`}>
                    {color.hex}
                  </span>
                </div>
                <div className="mt-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-ink">{color.name}</h3>
                    <code className="font-mono text-xs px-2 py-0.5 rounded bg-mist text-ink border border-moss/20">
                      {color.tailwind}
                    </code>
                  </div>
                  <p className="font-sans text-moss text-xs leading-normal pt-1">
                    {color.role}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-moss/10 flex items-center gap-2 text-xs font-mono">
                <span className="text-moss">Preview:</span>
                <span
                  style={{ backgroundColor: `var(${color.name})` }}
                  className="w-4 h-4 rounded-full border border-ink/20 inline-block"
                />
                <span className="text-ink font-semibold">var({color.name})</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography & Fonts */}
      <section className="space-y-8">
        <div className="border-b border-moss/20 pb-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-ink">
            2. Typography & Font Families
          </h2>
          <p className="font-sans text-moss text-sm mt-1">
            Three dedicated fonts loaded via <code className="font-mono text-xs bg-paper px-1.5 py-0.5 rounded border border-moss/20">next/font/google</code>: Space Grotesk for headings, Inter for body, and IBM Plex Mono for data metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Headings Font - Space Grotesk */}
          <div className="bg-paper rounded-2xl p-6 shadow-sm border border-moss/15 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-moss/15">
              <div>
                <h3 className="font-display text-lg font-bold text-ink">Space Grotesk</h3>
                <span className="font-mono text-xs text-moss">Headings (font-display)</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-gold/15 text-ink text-xs font-mono font-semibold">
                Display
              </span>
            </div>
            <div className="space-y-4 font-display">
              <div>
                <span className="font-mono text-xs text-moss block mb-1">h1 / 4xl (Bold)</span>
                <h1 className="text-3xl font-bold text-ink">Trail Milestone 04</h1>
              </div>
              <div>
                <span className="font-mono text-xs text-moss block mb-1">h2 / 2xl (Bold)</span>
                <h2 className="text-2xl font-bold text-ink">Distributed Systems Path</h2>
              </div>
              <div>
                <span className="font-mono text-xs text-moss block mb-1">h3 / xl (SemiBold)</span>
                <h3 className="text-xl font-semibold text-ink">Consensus Algorithms</h3>
              </div>
              <div>
                <span className="font-mono text-xs text-moss block mb-1">h4 / lg (Medium)</span>
                <h4 className="text-lg font-medium text-ink">Raft & Paxos Fundamentals</h4>
              </div>
            </div>
          </div>

          {/* Body Font - Inter */}
          <div className="bg-paper rounded-2xl p-6 shadow-sm border border-moss/15 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-moss/15">
              <div>
                <h3 className="font-sans text-lg font-bold text-ink">Inter</h3>
                <span className="font-mono text-xs text-moss">Body Text (font-sans, default)</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-mist text-ink text-xs font-mono font-semibold border border-moss/20">
                Sans
              </span>
            </div>
            <div className="space-y-4 font-sans">
              <div>
                <span className="font-mono text-xs text-moss block mb-1">Lead Text (18px)</span>
                <p className="text-lg text-ink leading-relaxed">
                  Navigate through structured engineering paths with clear checkpoints and practical challenges.
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-moss block mb-1">Regular Body (16px)</span>
                <p className="text-base text-ink/90 leading-relaxed">
                  Each trail node represents a core competency. Complete code reviews, solve algorithmic puzzles, and track your streak.
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-moss block mb-1">Muted Secondary (14px)</span>
                <p className="text-sm text-moss leading-relaxed">
                  Locked checkpoints unlock sequentially as your study squad verifies your node submissions.
                </p>
              </div>
            </div>
          </div>

          {/* Data Font - IBM Plex Mono */}
          <div className="bg-paper rounded-2xl p-6 shadow-sm border border-moss/15 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-moss/15">
              <div>
                <h3 className="font-mono text-lg font-bold text-ink">IBM Plex Mono</h3>
                <span className="font-mono text-xs text-moss">Data, Streaks & Badges (font-mono)</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-ember/15 text-ember text-xs font-mono font-semibold border border-ember/30">
                Mono
              </span>
            </div>
            <div className="space-y-4 font-mono">
              <div>
                <span className="font-mono text-xs text-moss block mb-1">Streak Indicator</span>
                <div className="inline-flex items-center gap-1.5 bg-ember/15 text-ember font-bold px-3 py-1 rounded-full border border-ember/25 text-sm">
                  <Flame className="w-4 h-4 fill-ember" />
                  <span>14 DAY STREAK</span>
                </div>
              </div>
              <div>
                <span className="font-mono text-xs text-moss block mb-1">Module ID & Badges</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-mist text-ink text-xs rounded border border-moss/20 font-semibold">
                    MOD-08: GRAPH THEORY
                  </span>
                  <span className="px-2.5 py-1 bg-gold/20 text-ink text-xs rounded font-semibold border border-gold/30">
                    STATUS: UNLOCKED
                  </span>
                </div>
              </div>
              <div>
                <span className="font-mono text-xs text-moss block mb-1">Code Snippet Preview</span>
                <div className="bg-ink text-mist p-3 rounded-xl text-xs overflow-x-auto border border-ink/40">
                  <code>{`function hikeTrail(node) {\n  return node.unlocked ? 'ASCEND' : 'REST';\n}`}</code>
                </div>
              </div>
              <div>
                <span className="font-mono text-xs text-moss block mb-1">Timestamp & Metrics</span>
                <p className="text-xs text-moss">LAST_COMPLETED: 2026-08-22 15:09 UTC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Base Rules & Trail Component Patterns */}
      <section className="space-y-8">
        <div className="border-b border-moss/20 pb-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-ink">
            3. Base Rules & Trail UI Patterns
          </h2>
          <p className="font-sans text-moss text-sm mt-1">
            Rounded-2xl paper cards, rounded-full trail buttons, soft warm dark shadows, and trail marker status indicators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card & Button Styles */}
          <div className="bg-paper rounded-2xl p-6 shadow-sm border border-moss/15 space-y-6">
            <h3 className="font-display text-xl font-bold text-ink">Buttons & Interactive Elements</h3>
            
            <div className="space-y-4">
              <div>
                <span className="font-mono text-xs text-moss block mb-2">Primary Action (Solid --gold fill + --ink text, rounded-full)</span>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-gold text-ink font-semibold rounded-full px-6 py-2.5 hover:bg-gold/90 transition shadow-sm active:scale-95">
                    Continue Trail Node
                  </button>
                  <button className="bg-gold text-ink font-semibold rounded-full px-5 py-2 hover:bg-gold/90 transition shadow-sm text-sm inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Complete Module
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <span className="font-mono text-xs text-moss block mb-2">Secondary Action (Ghost/Outline + --moss border, rounded-full)</span>
                <div className="flex flex-wrap gap-3">
                  <button className="border border-moss/40 text-ink font-medium rounded-full px-6 py-2.5 hover:bg-moss/10 transition">
                    View Trail Map
                  </button>
                  <button className="border border-moss/40 text-ink font-medium rounded-full px-5 py-2 text-sm hover:bg-moss/10 transition inline-flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-moss" />
                    Review Code
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <span className="font-mono text-xs text-moss block mb-2">Ember Indicator (Used Sparingly for Streaks)</span>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 bg-ember/15 text-ember font-mono font-bold px-4 py-1.5 rounded-full border border-ember/25 text-sm">
                    <Flame className="w-4 h-4 fill-ember" />
                    <span>7 DAY FIRE STREAK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards & Trail Node States */}
          <div className="space-y-4">
            {/* Active Unlocked Node Card */}
            <div className="bg-paper rounded-2xl p-6 shadow-md border border-gold/40 relative">
              <div className="absolute top-4 right-4 px-3 py-1 bg-gold/20 text-ink text-xs font-mono font-bold rounded-full border border-gold/30">
                ACTIVE MARKER
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold rounded-full text-ink font-bold font-mono">
                  03
                </div>
                <div className="space-y-2">
                  <h4 className="font-display text-xl font-bold text-ink">Data Structures Peak</h4>
                  <p className="font-sans text-sm text-ink/80">
                    Master Binary Search Trees, Heaps, and Graph Traversals with your squad.
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs font-mono text-moss">
                    <span>PROGRESS: 85%</span>
                    <span>12/14 CHECKPOINTS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Locked Trail Node Card */}
            <div className="bg-mist rounded-2xl p-6 border border-moss/20 relative opacity-90">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-moss/20 text-moss rounded-full">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-lg font-bold text-moss">System Design Altitude</h4>
                    <span className="font-mono text-xs px-2 py-0.5 bg-moss/15 text-moss rounded">MOD-04</span>
                  </div>
                  <p className="font-sans text-xs text-moss">
                    Unlocks when Data Structures Peak is completed by 3 squad members.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Verification Check */}
      <section className="bg-paper rounded-2xl p-6 shadow-sm border border-moss/15 space-y-4">
        <h2 className="font-display text-xl font-bold text-ink flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-gold" />
          Token Availability Checklist
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-2.5 rounded bg-mist border border-moss/20 text-ink">
            text-ink ✓
          </div>
          <div className="p-2.5 rounded bg-mist border border-moss/20 text-ink">
            bg-mist ✓
          </div>
          <div className="p-2.5 rounded bg-mist border border-moss/20 text-ink">
            bg-gold ✓
          </div>
          <div className="p-2.5 rounded bg-mist border border-moss/20 text-ink">
            text-moss ✓
          </div>
          <div className="p-2.5 rounded bg-mist border border-moss/20 text-ink">
            text-ember ✓
          </div>
          <div className="p-2.5 rounded bg-mist border border-moss/20 text-ink">
            bg-paper ✓
          </div>
          <div className="p-2.5 rounded bg-mist border border-moss/20 text-ink">
            font-display ✓
          </div>
          <div className="p-2.5 rounded bg-mist border border-moss/20 text-ink">
            font-mono ✓
          </div>
        </div>
      </section>
    </div>
  );
}
