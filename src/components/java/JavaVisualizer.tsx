'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Cpu,
  RefreshCw,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowRight
} from 'lucide-react';
import { JavaVisualizerType } from '@/data/java/javaTopicsData';

interface JavaVisualizerProps {
  type?: JavaVisualizerType;
  title?: string;
  description?: string;
  asciiDiagram?: string;
  steps?: string[];
}

export function JavaVisualizer({
  type = 'memory-box',
  title = 'Interactive Concept Visualizer',
  description,
  asciiDiagram,
  steps = []
}: JavaVisualizerProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fallback if type is none
  if (type === 'none') {
    return null;
  }

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-b from-neutral-900/90 to-neutral-950/95 p-5 md:p-6 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30">
            {type === 'jvm-architecture' && <Cpu className="h-5 w-5" />}
            {type === 'memory-box' && <Database className="h-5 w-5" />}
            {type === 'loop-cycle' && <RefreshCw className="h-5 w-5" />}
            {type === 'method-stack' && <Layers className="h-5 w-5" />}
            {(type === 'decision-tree' || type === 'exception-flow' || type === 'array-index') && (
              <Layers className="h-5 w-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300 uppercase tracking-wider">
                Java Visualizer
              </span>
              <span className="text-xs text-neutral-400 capitalize">
                {type.replace('-', ' ')}
              </span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white mt-0.5">{title}</h3>
          </div>
        </div>

        {steps.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
              className="rounded-lg border border-white/10 bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:bg-neutral-700 transition"
            >
              Prev
            </button>
            <span className="text-xs text-neutral-400 font-mono">
              {activeStep + 1} / {steps.length}
            </span>
            <button
              onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="rounded-lg border border-white/10 bg-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/30 transition"
            >
              Next Step
            </button>
          </div>
        )}
      </div>

      {description && (
        <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{description}</p>
      )}

      {/* Visual Renderings based on Visualizer Type */}
      <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-neutral-950 p-4 md:p-5">
        {type === 'jvm-architecture' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                <span className="text-xs font-mono text-blue-400 uppercase">Step 1: Source</span>
                <p className="mt-1 text-sm font-bold text-white">App.java</p>
                <span className="mt-2 block text-xs text-neutral-400">Human-readable code</span>
              </div>
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <span className="text-xs font-mono text-amber-400 uppercase">Step 2: Javac Compiler</span>
                <p className="mt-1 text-sm font-bold text-white">App.class (Bytecode)</p>
                <span className="mt-2 block text-xs text-neutral-400">Platform-neutral instructions</span>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <span className="text-xs font-mono text-emerald-400 uppercase">Step 3: JVM Execution</span>
                <p className="mt-1 text-sm font-bold text-white">Native CPU Instructions</p>
                <span className="mt-2 block text-xs text-neutral-400">JIT / Interpreter Execution</span>
              </div>
            </div>
          </div>
        )}

        {type === 'memory-box' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-4">
              <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  JVM Stack (Thread Local)
                </span>
                <span className="text-[10px] rounded bg-indigo-500/20 px-1.5 py-0.5 text-indigo-300">
                  Fast • Primitive bit values
                </span>
              </div>
              <div className="mt-3 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between rounded bg-neutral-900/80 p-2 text-neutral-300">
                  <span>int score = 85</span>
                  <span className="text-emerald-400">[ 4 Bytes ]</span>
                </div>
                <div className="flex items-center justify-between rounded bg-neutral-900/80 p-2 text-neutral-300">
                  <span>double rate = 3.14</span>
                  <span className="text-emerald-400">[ 8 Bytes ]</span>
                </div>
                <div className="flex items-center justify-between rounded bg-neutral-900/80 p-2 text-neutral-300">
                  <span>String ref = @0x4f2a</span>
                  <span className="text-amber-400">[ Pointer → Heap ]</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-4">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  JVM Heap Memory (Shared)
                </span>
                <span className="text-[10px] rounded bg-amber-500/20 px-1.5 py-0.5 text-amber-300">
                  Objects • String Pool • Arrays
                </span>
              </div>
              <div className="mt-3 space-y-2 font-mono text-xs">
                <div className="rounded border border-amber-500/20 bg-neutral-900/80 p-2 text-neutral-300">
                  <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                    <span>String Constant Pool</span>
                    <span>@0x4f2a</span>
                  </div>
                  <div className="mt-1 font-semibold text-amber-300">"LevelUpDev"</div>
                </div>
                <div className="rounded border border-amber-500/20 bg-neutral-900/80 p-2 text-neutral-300">
                  <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                    <span>int[] array object (length: 3)</span>
                    <span>@0x8b1c</span>
                  </div>
                  <div className="mt-1 flex gap-2">
                    <span className="rounded bg-neutral-800 px-2 py-0.5 text-emerald-300">[0]: 10</span>
                    <span className="rounded bg-neutral-800 px-2 py-0.5 text-emerald-300">[1]: 20</span>
                    <span className="rounded bg-neutral-800 px-2 py-0.5 text-emerald-300">[2]: 30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'method-stack' && (
          <div className="space-y-3">
            <div className="text-xs font-mono text-neutral-400">JVM Thread Call Stack (LIFO: Last In, First Out)</div>
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs font-mono text-amber-200"
              >
                <div className="flex justify-between items-center font-bold">
                  <span>▲ Active Frame: calculateTotal(100.0, 0.08)</span>
                  <span className="text-[10px] bg-amber-500/30 px-1.5 py-0.5 rounded">Top of Stack</span>
                </div>
                <div className="mt-1 text-neutral-300 text-[11px]">Local slots: price=100.0, taxRate=0.08 → Computes 108.0</div>
              </motion.div>
              <div className="rounded-lg border border-white/10 bg-neutral-900 p-3 text-xs font-mono text-neutral-400">
                <div className="flex justify-between items-center font-medium">
                  <span>main(String[] args) Frame</span>
                  <span className="text-[10px] text-neutral-500">Waiting for return</span>
                </div>
                <div className="mt-1 text-neutral-500 text-[11px]">Local variable: double total</div>
              </div>
            </div>
          </div>
        )}

        {type === 'array-index' && (
          <div className="space-y-3">
            <div className="text-xs font-mono text-neutral-400">Array Indexing & Bounds (0 to Length - 1)</div>
            <div className="grid grid-cols-5 gap-2 text-center font-mono">
              {[
                { idx: 0, val: '12', valid: true },
                { idx: 1, val: '34', valid: true },
                { idx: 2, val: '56', valid: true },
                { idx: 3, val: '78', valid: true },
                { idx: 4, val: '90', valid: true }
              ].map((cell) => (
                <div key={cell.idx} className="rounded-xl border border-amber-500/30 bg-neutral-900 p-3">
                  <span className="text-[10px] text-neutral-400 block">Index [{cell.idx}]</span>
                  <span className="text-base font-bold text-amber-300 block mt-1">{cell.val}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-400 bg-neutral-900/80 p-2.5 rounded-lg border border-white/5">
              <span>Length: <strong className="text-white">5</strong></span>
              <span>First: <strong className="text-emerald-400">arr[0]</strong></span>
              <span>Last: <strong className="text-emerald-400">arr[arr.length - 1]</strong></span>
            </div>
          </div>
        )}

        {type === 'loop-cycle' && (
          <div className="space-y-3">
            <div className="text-xs font-mono text-neutral-400">Loop State Transition Engine</div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center">
              <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2.5 text-xs">
                <span className="text-blue-400 font-bold block">1. Initialization</span>
                <span className="text-neutral-300 text-[11px] font-mono mt-1 block">int i = 1;</span>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs">
                <span className="text-amber-400 font-bold block">2. Condition Check</span>
                <span className="text-neutral-300 text-[11px] font-mono mt-1 block">i &lt;= 5 (true)</span>
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs">
                <span className="text-emerald-400 font-bold block">3. Execute Body</span>
                <span className="text-neutral-300 text-[11px] font-mono mt-1 block">System.out...</span>
              </div>
              <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-2.5 text-xs">
                <span className="text-purple-400 font-bold block">4. Step Update</span>
                <span className="text-neutral-300 text-[11px] font-mono mt-1 block">i++ (i becomes 2)</span>
              </div>
            </div>
          </div>
        )}

        {type === 'exception-flow' && (
          <div className="space-y-3">
            <div className="text-xs font-mono text-neutral-400">Try-Catch-Finally Execution Pipeline</div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
              <div className="w-full rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-center">
                <strong className="text-blue-300 block">1. try {`{ ... }`}</strong>
                <span className="text-neutral-400 text-[11px]">Executes risky code</span>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-500 rotate-90 md:rotate-0 shrink-0" />
              <div className="w-full rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-center">
                <strong className="text-amber-300 block">2. catch (Exception e)</strong>
                <span className="text-neutral-400 text-[11px]">Intercepts & handles</span>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-500 rotate-90 md:rotate-0 shrink-0" />
              <div className="w-full rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-center">
                <strong className="text-emerald-300 block">3. finally {`{ ... }`}</strong>
                <span className="text-neutral-400 text-[11px]">Guaranteed cleanup</span>
              </div>
            </div>
          </div>
        )}

        {asciiDiagram && (
          <div className="mt-4">
            <div className="text-xs font-mono text-neutral-400 mb-1.5">Architecture Flow Diagram:</div>
            <pre className="overflow-x-auto rounded-lg bg-neutral-900/90 p-3 font-mono text-xs text-amber-200/90 border border-white/5 leading-relaxed">
              {asciiDiagram}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
