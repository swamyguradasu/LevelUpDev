'use client';

import React, { useState } from 'react';
import {
  Code,
  GitBranch,
  UploadCloud,
  Terminal,
  Server,
  Globe,
  Database,
  Cpu,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Layers,
  Search,
  Bug,
  Zap,
} from 'lucide-react';

interface VisualFlowProps {
  type: 'git-workflow' | 'terminal' | 'web-flow' | 'problem-flow';
}

export function RoadmapVisualFlow({ type }: VisualFlowProps) {
  // Git Flow state
  const [activeGitStep, setActiveGitStep] = useState(0);
  const gitSteps = [
    { label: 'CODE', detail: 'Write code & scripts in your IDE/editor', cmd: 'nano app.py / code .' },
    { label: 'ADD', detail: 'Stage modified files to the git index', cmd: 'git add .' },
    { label: 'COMMIT', detail: 'Snapshot staged changes with message', cmd: 'git commit -m "feat: login"' },
    { label: 'PUSH', detail: 'Upload committed branch to GitHub remote', cmd: 'git push origin main' },
    { label: 'GITHUB', detail: 'Create Pull Request, Review & Merge code', cmd: 'gh pr create --web' },
  ];

  // Web Flow state
  const [activeWebStep, setActiveWebStep] = useState(0);
  const webSteps = [
    { label: 'USER', icon: <Globe className="w-4 h-4" />, detail: 'Interacts with browser or mobile app UI' },
    { label: 'FRONTEND', icon: <Code className="w-4 h-4" />, detail: 'React / Next.js renders views & dispatches HTTP fetch' },
    { label: 'API / GATEWAY', icon: <Layers className="w-4 h-4" />, detail: 'REST/JSON router validates JWT & rates limits' },
    { label: 'BACKEND', icon: <Server className="w-4 h-4" />, detail: 'FastAPI / Node handles business logic & auth' },
    { label: 'DATABASE', icon: <Database className="w-4 h-4" />, detail: 'PostgreSQL / Redis persists ACID data transactions' },
  ];

  // Problem Solving flow state
  const [activePsStep, setActivePsStep] = useState(0);
  const psSteps = [
    { label: 'PROBLEM', detail: 'Read prompt carefully & list constraints' },
    { label: 'THINK', detail: 'Consider edge cases, inputs, and outputs' },
    { label: 'PLAN', detail: 'Draft pseudocode & Big-O strategy' },
    { label: 'CODE', detail: 'Implement clean, modular solution' },
    { label: 'TEST', detail: 'Dry-run with sample and corner cases' },
    { label: 'DEBUG', detail: 'Trace variables and isolate faults' },
    { label: 'OPTIMIZE', detail: 'Reduce space/time complexity bottlenecks' },
  ];

  // Terminal state
  const [terminalCmd, setTerminalCmd] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'whoami', output: 'levelup-developer' },
    { cmd: 'pwd', output: '/workspace/levelupdev' },
    { cmd: 'ls -la', output: 'total 32\ndrwxr-xr-x  6 dev dev 4096 Sep 06 15:00 .\ndrwxr-xr-x 12 dev dev 4096 Sep 06 14:30 ..\n-rw-r--r--  1 dev dev  820 Sep 06 15:00 package.json\n-rw-r--r--  1 dev dev 2048 Sep 06 15:00 README.md\ndrwxr-xr-x  5 dev dev 4096 Sep 06 15:00 src/' },
  ]);

  const runTerminalCommand = (customCmd?: string) => {
    const commandToRun = (customCmd || terminalCmd).trim();
    if (!commandToRun) return;

    let output = '';
    const lower = commandToRun.toLowerCase();

    if (lower === 'clear') {
      setTerminalHistory([]);
      setTerminalCmd('');
      return;
    } else if (lower === 'pwd') {
      output = '/home/developer/projects/foundation';
    } else if (lower.startsWith('ls')) {
      output = 'app.py  data/  Dockerfile  package.json  README.md  src/  tests/';
    } else if (lower.startsWith('mkdir')) {
      output = `Directory created: ${commandToRun.split(' ')[1] || 'new_folder'}`;
    } else if (lower.startsWith('touch')) {
      output = `File created: ${commandToRun.split(' ')[1] || 'script.py'}`;
    } else if (lower.startsWith('grep')) {
      output = 'main.py:24: [MATCH] connection_string = os.getenv("DATABASE_URL")';
    } else if (lower.startsWith('chmod')) {
      output = 'Permissions updated successfully: -rwxr-xr-x';
    } else if (lower === 'ps aux' || lower === 'top') {
      output = 'PID  USER   %CPU  %MEM  COMMAND\n101  dev    0.4   1.2   node dev-server.js\n108  dev    0.1   0.8   postgres: 16-alpine';
    } else if (lower.startsWith('cat')) {
      output = '{\n  "name": "levelupdev-learner",\n  "status": "ready_to_build",\n  "foundation": "100%"\n}';
    } else if (lower === 'git status') {
      output = 'On branch main\nYour branch is up to date with origin/main.\nNothing to commit, working tree clean.';
    } else {
      output = `Command executed: '${commandToRun}'. (Exit code 0)`;
    }

    setTerminalHistory((prev) => [...prev.slice(-6), { cmd: commandToRun, output }]);
    setTerminalCmd('');
  };

  if (type === 'git-workflow') {
    return (
      <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <span>Interactive Git & GitHub Lifecycle</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Click any step to inspect
          </span>
        </div>

        {/* Steps Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          {gitSteps.map((step, idx) => {
            const isActive = activeGitStep === idx;
            return (
              <button
                key={step.label}
                onClick={() => setActiveGitStep(idx)}
                className={`relative rounded-xl px-3 py-2.5 text-left border transition-all duration-200 flex flex-col justify-between group ${
                  isActive
                    ? 'bg-[#006cd2]/25 border-[#006cd2] text-white shadow-lg shadow-[#006cd2]/20 ring-1 ring-[#006cd2]'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">0{idx + 1}</span>
                  {idx < gitSteps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-600 hidden sm:block group-hover:text-cyan-400 transition" />
                  )}
                </div>
                <div className="font-mono text-xs font-bold mt-1 tracking-wider">{step.label}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Explanation Banner */}
        <div className="rounded-xl bg-slate-900/90 border border-slate-800/80 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="font-semibold text-slate-200 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">
                Stage 0{activeGitStep + 1}
              </span>
              <span>{gitSteps[activeGitStep].detail}</span>
            </div>
          </div>
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-cyan-300 font-mono text-xs whitespace-nowrap">
            $ {gitSteps[activeGitStep].cmd}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'web-flow') {
    return (
      <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Modern Web & API Communication Architecture</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            End-to-End Data Pipeline
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {webSteps.map((step, idx) => {
            const isActive = activeWebStep === idx;
            return (
              <button
                key={step.label}
                onClick={() => setActiveWebStep(idx)}
                className={`relative rounded-xl p-3 text-left border transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? 'bg-blue-600/25 border-blue-500 text-white shadow-lg shadow-blue-500/20 ring-1 ring-blue-500'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-blue-400">{step.icon}</div>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">0{idx + 1}</span>
                </div>
                <div className="font-mono text-xs font-bold mt-2 tracking-wide">{step.label}</div>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl bg-slate-900/90 border border-slate-800/80 p-3.5 flex items-center gap-3 text-xs text-slate-300">
          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold">
            {webSteps[activeWebStep].label}
          </span>
          <span>{webSteps[activeWebStep].detail}</span>
        </div>
      </div>
    );
  }

  if (type === 'problem-flow') {
    return (
      <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Algorithmic Problem Solving & Debugging Pipeline</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Deterministic 7-Step Method
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-1.5">
          {psSteps.map((step, idx) => {
            const isActive = activePsStep === idx;
            return (
              <button
                key={step.label}
                onClick={() => setActivePsStep(idx)}
                className={`rounded-xl p-2.5 text-center border transition-all duration-200 flex flex-col items-center justify-center ${
                  isActive
                    ? 'bg-emerald-600/25 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-500'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="text-[9px] font-mono text-slate-500 font-bold">0{idx + 1}</span>
                <span className="font-mono text-[11px] font-bold mt-1">{step.label}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl bg-slate-900/90 border border-slate-800/80 p-3.5 flex items-center gap-3 text-xs text-slate-300">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
            Step 0{activePsStep + 1} • {psSteps[activePsStep].label}
          </span>
          <span>{psSteps[activePsStep].detail}</span>
        </div>
      </div>
    );
  }

  // Terminal Preview
  return (
    <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
      {/* Terminal Titlebar */}
      <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>developer@levelupdev: ~/foundation</span>
          </span>
        </div>

        {/* Quick Command Chips */}
        <div className="hidden sm:flex items-center gap-1.5">
          {['ls -la', 'pwd', 'ps aux', 'grep', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => runTerminalCommand(cmd)}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              ${cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 font-mono text-xs space-y-3 bg-slate-950/95 max-h-60 overflow-y-auto">
        {terminalHistory.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="text-slate-500">$</span>
              <span>{item.cmd}</span>
            </div>
            {item.output && (
              <pre className="text-slate-300 text-[11px] whitespace-pre-wrap pl-4 leading-relaxed font-mono opacity-90">
                {item.output}
              </pre>
            )}
          </div>
        ))}

        {/* Input prompt */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runTerminalCommand();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <span className="text-emerald-400 font-bold">$</span>
          <input
            type="text"
            value={terminalCmd}
            onChange={(e) => setTerminalCmd(e.target.value)}
            placeholder="Type a linux command (e.g. ls, pwd, cat README.md, clear)..."
            className="flex-1 bg-transparent border-none text-slate-200 placeholder-slate-600 focus:outline-none text-xs font-mono"
          />
          <button
            type="submit"
            className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition"
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
}
