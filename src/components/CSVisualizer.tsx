'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, ChevronRight, CheckCircle2, ArrowLeft, ArrowRight, Zap } from 'lucide-react';

interface CSVisualizerProps {
  type: 'two-pointers' | 'binary-search' | 'sliding-window' | 'stack' | 'big-o' | 'array-traversal' | 'none';
}

export function CSVisualizer({ type }: CSVisualizerProps) {
  if (type === 'none') return null;

  if (type === 'two-pointers') {
    return <TwoPointersVisualizer />;
  }

  if (type === 'binary-search') {
    return <BinarySearchVisualizer />;
  }

  if (type === 'sliding-window') {
    return <SlidingWindowVisualizer />;
  }

  if (type === 'stack') {
    return <StackVisualizer />;
  }

  if (type === 'big-o') {
    return <BigOVisualizer />;
  }

  if (type === 'array-traversal') {
    return <ArrayTraversalVisualizer />;
  }

  return null;
}

// Two Pointers Interactive Visualizer (Two Sum in Sorted Array)
function TwoPointersVisualizer() {
  const array = [2, 7, 11, 15, 19, 23];
  const target = 26; // 7 + 19 = 26 (indices 1 & 4)

  const steps = [
    { left: 0, right: 5, sum: 25, action: 'Sum = 2 + 23 = 25 < 26. Since 25 < target, increment Left pointer (left++).' },
    { left: 1, right: 5, sum: 30, action: 'Sum = 7 + 23 = 30 > 26. Since 30 > target, decrement Right pointer (right--).' },
    { left: 1, right: 4, sum: 26, action: 'Sum = 7 + 19 = 26 == 26! Target found at indices [1, 4] (values 7 and 19).' },
  ];

  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = steps[stepIndex];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          <h4 className="text-sm font-semibold text-white font-mono">Interactive Two-Pointers Stepper</h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Target: <strong className="text-blue-400 font-bold">{target}</strong></span>
          <span>•</span>
          <span>Step {stepIndex + 1} of {steps.length}</span>
        </div>
      </div>

      {/* Array visualization */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 py-4 overflow-x-auto">
        {array.map((val, idx) => {
          const isLeft = idx === currentStep.left;
          const isRight = idx === currentStep.right;
          const isFound = stepIndex === steps.length - 1 && (isLeft || isRight);

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div
                className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-base transition-all duration-300 ${
                  isFound
                    ? 'bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105'
                    : isLeft
                    ? 'bg-blue-600/30 text-blue-300 border-2 border-blue-500 shadow-lg shadow-blue-500/20 scale-105'
                    : isRight
                    ? 'bg-amber-500/30 text-amber-300 border-2 border-amber-500 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-slate-800/80 text-slate-300 border border-slate-700/60'
                }`}
              >
                <span>{val}</span>
                <span className="text-[10px] text-slate-500 font-normal">idx {idx}</span>
              </div>

              {/* Pointer indicators */}
              <div className="h-6 flex items-center justify-center">
                {isLeft && (
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40">
                    L
                  </span>
                )}
                {isRight && (
                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    R
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Explanation */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3">
        <Zap className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
          {currentStep.action}
        </p>
      </div>

      {/* Stepper Controls */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setStepIndex(0)}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>

        <div className="flex items-center gap-2">
          <button
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
            className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Prev Step
          </button>
          <button
            disabled={stepIndex === steps.length - 1}
            onClick={() => setStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
            className="flex items-center gap-1 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm shadow-blue-600/30"
          >
            Next Step <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Binary Search Interactive Visualizer
function BinarySearchVisualizer() {
  const array = [3, 8, 12, 17, 24, 31, 45, 59, 72, 88];
  const target = 59;

  const steps = [
    { left: 0, right: 9, mid: 4, action: 'Range [0..9]. Mid = index 4 (value 24). Since 24 < 59, target is on the right half. Set left = mid + 1 (5).' },
    { left: 5, right: 9, mid: 7, action: 'Range [5..9]. Mid = index 7 (value 59). Value matches target! Target found at index 7 in just 2 steps!' },
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h4 className="text-sm font-semibold text-white font-mono">Binary Search Range Elimination</h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Target: <strong className="text-cyan-400 font-bold">{target}</strong></span>
          <span>•</span>
          <span>Step {stepIndex + 1} of {steps.length}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 py-4 overflow-x-auto">
        {array.map((val, idx) => {
          const inRange = idx >= currentStep.left && idx <= currentStep.right;
          const isMid = idx === currentStep.mid;
          const isFound = stepIndex === steps.length - 1 && isMid;

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-14 sm:w-12 sm:h-16 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm sm:text-base transition-all duration-300 ${
                  isFound
                    ? 'bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500 shadow-lg shadow-emerald-500/20 scale-110'
                    : isMid
                    ? 'bg-cyan-500/30 text-cyan-300 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                    : inRange
                    ? 'bg-slate-800 text-slate-200 border border-slate-700'
                    : 'bg-slate-950/40 text-slate-600 border border-slate-900 opacity-40'
                }`}
              >
                <span>{val}</span>
                <span className="text-[9px] text-slate-500">[{idx}]</span>
              </div>
              <div className="h-5 flex items-center justify-center">
                {isMid && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                    MID
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3">
        <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
          {currentStep.action}
        </p>
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setStepIndex(0)}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>

        <div className="flex items-center gap-2">
          <button
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
            className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Prev
          </button>
          <button
            disabled={stepIndex === steps.length - 1}
            onClick={() => setStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
            className="flex items-center gap-1 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Sliding Window Visualizer (Max Sum Subarray of Size K=3)
function SlidingWindowVisualizer() {
  const array = [2, 1, 5, 1, 3, 2];
  const k = 3;

  const steps = [
    { start: 0, end: 2, sum: 8, max: 8, action: 'Initial window [0..2] = [2, 1, 5]. Window Sum = 8. Max Sum = 8.' },
    { start: 1, end: 3, sum: 7, max: 8, action: 'Slide window right: subtract arr[0]=2, add arr[3]=1. Window [1..3] = [1, 5, 1]. Sum = 7. Max = 8.' },
    { start: 2, end: 4, sum: 9, max: 9, action: 'Slide window right: subtract arr[1]=1, add arr[4]=3. Window [2..4] = [5, 1, 3]. Sum = 9. New Max = 9!' },
    { start: 3, end: 5, sum: 6, max: 9, action: 'Slide window right: subtract arr[2]=5, add arr[5]=2. Window [3..5] = [1, 3, 2]. Sum = 6. Max remained 9.' },
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
          <h4 className="text-sm font-semibold text-white font-mono">Sliding Window (Size K = 3)</h4>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>Window Sum: <strong className="text-violet-300 font-bold">{currentStep.sum}</strong></span>
          <span>•</span>
          <span>Max Sum: <strong className="text-emerald-400 font-bold">{currentStep.max}</strong></span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-3 py-4 overflow-x-auto">
        {array.map((val, idx) => {
          const inWindow = idx >= currentStep.start && idx <= currentStep.end;

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-base transition-all duration-300 ${
                  inWindow
                    ? 'bg-violet-600/30 text-violet-200 border-2 border-violet-500 shadow-lg shadow-violet-500/20 scale-105'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/60 opacity-60'
                }`}
              >
                <span>{val}</span>
                <span className="text-[10px] text-slate-500">idx {idx}</span>
              </div>
              <div className="h-5 flex items-center justify-center">
                {inWindow && (
                  <span className="text-[9px] font-mono text-violet-400 font-bold uppercase">
                    {idx === currentStep.start ? 'START' : idx === currentStep.end ? 'END' : '•'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3">
        <Zap className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
          {currentStep.action}
        </p>
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setStepIndex(0)}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>

        <div className="flex items-center gap-2">
          <button
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
            className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Prev
          </button>
          <button
            disabled={stepIndex === steps.length - 1}
            onClick={() => setStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
            className="flex items-center gap-1 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Stack LIFO Visualizer
function StackVisualizer() {
  const [items, setItems] = useState<string[]>(['(', '{']);
  const [lastAction, setLastAction] = useState<string>('Initial state with nested parentheses.');

  const handlePush = (val: string) => {
    if (items.length >= 5) {
      setLastAction('Stack full (max 5 items in demo). Pop items first.');
      return;
    }
    setItems((prev) => [...prev, val]);
    setLastAction(`Pushed "${val}" onto top of stack.`);
  };

  const handlePop = () => {
    if (items.length === 0) {
      setLastAction('Stack underflow! Cannot pop from empty stack.');
      return;
    }
    const popped = items[items.length - 1];
    setItems((prev) => prev.slice(0, -1));
    setLastAction(`Popped "${popped}" from top of stack.`);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h4 className="text-sm font-semibold text-white font-mono">Stack (LIFO - Last In, First Out)</h4>
        </div>
        <span className="text-xs font-mono text-slate-400">Size: {items.length}</span>
      </div>

      <div className="flex flex-col items-center justify-center py-4">
        {/* Stack Container */}
        <div className="w-48 min-h-[160px] border-b-4 border-l-4 border-r-4 border-slate-700 rounded-b-xl flex flex-col-reverse items-center p-2 gap-1.5 bg-slate-950/60">
          {items.length === 0 ? (
            <span className="text-xs font-mono text-slate-600 my-auto">Stack is Empty</span>
          ) : (
            items.map((it, idx) => (
              <div
                key={idx}
                className={`w-full py-2 rounded-lg text-center font-mono font-bold text-sm transition-all duration-200 ${
                  idx === items.length - 1
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500 shadow-md shadow-emerald-500/20 scale-[1.02]'
                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                {it} {idx === items.length - 1 && <span className="text-[10px] text-emerald-400 ml-1">(TOP)</span>}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 font-mono">
        {lastAction}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePush('(')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-200 transition"
          >
            + Push '('
          </button>
          <button
            onClick={() => handlePush('[')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-200 transition"
          >
            + Push '['
          </button>
          <button
            onClick={() => handlePush('{')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-200 transition"
          >
            + Push '{'{'}'
          </button>
        </div>

        <button
          onClick={handlePop}
          className="px-3.5 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-mono transition"
        >
          - Pop Top
        </button>
      </div>
    </div>
  );
}

// Big-O Visualizer Curves
function BigOVisualizer() {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <h4 className="text-sm font-semibold text-white font-mono">Big-O Runtime Growth Rate Comparison</h4>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-1">
          <span className="text-xs font-mono font-bold text-emerald-400">O(1) & O(log N)</span>
          <p className="text-[11px] text-slate-300 font-mono">Instantaneous / Logarithmic. Highly scalable.</p>
          <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Excellent</span>
        </div>

        <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-1">
          <span className="text-xs font-mono font-bold text-blue-400">O(N)</span>
          <p className="text-[11px] text-slate-300 font-mono">Linear scan. Proportional to element count.</p>
          <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">Good</span>
        </div>

        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1">
          <span className="text-xs font-mono font-bold text-amber-400">O(N log N)</span>
          <p className="text-[11px] text-slate-300 font-mono">Standard comparison sorting (Merge/Quick Sort).</p>
          <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">Fair</span>
        </div>

        <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-1">
          <span className="text-xs font-mono font-bold text-rose-400">O(N^2) & O(2^N)</span>
          <p className="text-[11px] text-slate-300 font-mono">Quadratic & Exponential. Fails at large scale.</p>
          <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">Horrible</span>
        </div>
      </div>
    </div>
  );
}

// Array Traversal Visualizer
function ArrayTraversalVisualizer() {
  const array = [4, 9, 2, 7, 5];
  const [currIdx, setCurrIdx] = useState(0);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
          <h4 className="text-sm font-semibold text-white font-mono">Sequential Memory Traversal</h4>
        </div>
        <span className="text-xs font-mono text-slate-400">Visiting Index: {currIdx}</span>
      </div>

      <div className="flex items-center justify-center gap-2 py-4">
        {array.map((val, idx) => (
          <div
            key={idx}
            className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-base transition-all duration-300 ${
              idx === currIdx
                ? 'bg-blue-600 text-white border-2 border-blue-400 shadow-lg shadow-blue-500/30 scale-105'
                : idx < currIdx
                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/60'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <span>{val}</span>
            <span className="text-[10px] opacity-70">[{idx}]</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setCurrIdx(0)}
          className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>

        <button
          disabled={currIdx >= array.length - 1}
          onClick={() => setCurrIdx((prev) => Math.min(array.length - 1, prev + 1))}
          className="flex items-center gap-1 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next Element <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
