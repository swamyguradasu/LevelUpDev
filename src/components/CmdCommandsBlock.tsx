'use client';

import React, { useState, useMemo } from 'react';
import {
  Terminal,
  Search,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  Play,
  RotateCcw,
  ChevronRight,
  Wrench,
  CornerDownRight,
  Maximize2,
  X,
  BookOpen,
} from 'lucide-react';
import {
  CMD_COMMANDS,
  CMD_CATEGORIES,
  TROUBLESHOOTING_COMMANDS,
  CmdCommand,
  CmdCategory,
} from '@/data/cmdCommandsData';

export default function CmdCommandsBlock() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCommandId, setActiveCommandId] = useState<string>('cmd-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<'before' | 'run' | 'after'>('after');

  const copyToClipboard = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter commands based on category and search query
  const filteredCommands = useMemo(() => {
    return CMD_COMMANDS.filter((cmd) => {
      // Category filter
      if (selectedCategory === 'troubleshooting') {
        const isTroubleshoot = TROUBLESHOOTING_COMMANDS.some(
          (t) => t.refId === cmd.id
        );
        if (!isTroubleshoot) return false;
      } else if (selectedCategory !== 'all') {
        if (cmd.categoryId !== selectedCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = cmd.name.toLowerCase().includes(query);
        const matchCmd = cmd.command.toLowerCase().includes(query);
        const matchDesc = cmd.description.toLowerCase().includes(query);
        const matchCat = cmd.category.toLowerCase().includes(query);
        if (!matchName && !matchCmd && !matchDesc && !matchCat) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const activeCommand = useMemo(() => {
    return (
      CMD_COMMANDS.find((c) => c.id === activeCommandId) || CMD_COMMANDS[0]
    );
  }, [activeCommandId]);

  const activeIndexInFiltered = useMemo(() => {
    return filteredCommands.findIndex((c) => c.id === activeCommand.id);
  }, [filteredCommands, activeCommand]);

  const goToNextCommand = () => {
    if (filteredCommands.length === 0) return;
    const nextIdx = (activeIndexInFiltered + 1) % filteredCommands.length;
    setActiveCommandId(filteredCommands[nextIdx].id);
    setSimStep('after');
  };

  const goToPrevCommand = () => {
    if (filteredCommands.length === 0) return;
    const prevIdx =
      (activeIndexInFiltered - 1 + filteredCommands.length) %
      filteredCommands.length;
    setActiveCommandId(filteredCommands[prevIdx].id);
    setSimStep('after');
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimStep('before');
    setTimeout(() => {
      setSimStep('run');
      setTimeout(() => {
        setSimStep('after');
        setIsSimulating(false);
      }, 900);
    }, 800);
  };

  return (
    <section
      id="essential-cmd-commands"
      className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/50 relative overflow-hidden space-y-8"
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Block Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>INTERACTIVE TERMINAL GUIDE</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
              63 Essential Commands
            </span>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
              Visual Before → After
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Essential Command Prompt Commands</span>
              <span className="text-sm font-mono font-semibold px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hidden sm:inline-block">
                Windows CMD
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Explore the most important Windows Command Prompt commands for programming, Git/GitHub, Python, Node.js, React/Vite projects, networking, and developer troubleshooting.
            </p>
          </div>
        </div>

        {/* Quick Guide summary badge card (Reference View) */}
        <div className="flex items-center gap-3.5 bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 self-start lg:self-auto min-w-[220px]">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-base">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-white">
              Visual Reference
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              12 Categories • 63 Cards
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search commands, flags, tools (e.g. mkdir, git, port, kill)..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs font-mono"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-slate-400">
            <span>Showing {filteredCommands.length} of {CMD_COMMANDS.length} commands</span>
          </div>
        </div>

        {/* Categories Horizontal Scroll / Grid */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition flex items-center gap-2 border ${
              selectedCategory === 'all'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <span>📚</span>
            <span>All Categories</span>
            <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">
              {CMD_COMMANDS.length}
            </span>
          </button>

          {CMD_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === 'troubleshooting'
                ? TROUBLESHOOTING_COMMANDS.length
                : cat.commandIds.length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.shortTitle}</span>
                <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Workspace: 2-Column Split (Command Cards List on Left + Visual Interactive Detail Viewer on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Command Cards Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>Command Index</span>
            <span className="text-[11px] text-slate-500">
              Select any command to view
            </span>
          </div>

          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-800">
            {filteredCommands.length === 0 ? (
              <div className="rounded-2xl bg-slate-950/60 border border-slate-800/80 p-8 text-center space-y-3">
                <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                <p className="text-sm text-slate-300 font-mono">
                  No commands matched your filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs font-mono text-emerald-400 underline hover:text-emerald-300"
                >
                  Reset search & filters
                </button>
              </div>
            ) : (
              filteredCommands.map((cmd) => {
                const isActive = activeCommand.id === cmd.id;

                return (
                  <div
                    key={cmd.id}
                    onClick={() => {
                      setActiveCommandId(cmd.id);
                      setSimStep('after');
                    }}
                    className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 border text-left flex items-start gap-3.5 relative group ${
                      isActive
                        ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-950/20'
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    {/* Number Badge */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 group-hover:text-slate-200'
                      }`}
                    >
                      {cmd.number}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`font-mono text-sm font-bold truncate ${
                            isActive
                              ? 'text-emerald-300'
                              : 'text-white group-hover:text-emerald-300 transition-colors'
                          }`}
                        >
                          {cmd.name}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                          {cmd.category.split(' ')[0]}
                        </span>
                      </div>

                      {/* Prominent Command snippet */}
                      <div className="bg-black/50 rounded-lg px-2.5 py-1.5 font-mono text-xs text-emerald-400 flex items-center justify-between border border-slate-800/60">
                        <code className="truncate">{cmd.command}</code>
                        <button
                          title="Copy command"
                          onClick={(e) => copyToClipboard(cmd.command, cmd.id, e)}
                          className="text-slate-500 hover:text-slate-200 transition-colors ml-2"
                        >
                          {copiedId === cmd.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-1">
                        {cmd.description}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 self-center transition-transform ${
                        isActive
                          ? 'text-emerald-400 translate-x-1'
                          : 'text-slate-600 group-hover:text-slate-400'
                      }`}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Visual Before → Run → After Card Viewer (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-5 sm:p-6 shadow-xl relative space-y-6">
            {/* Active Command Top Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                  Command {activeCommand.number} / {CMD_COMMANDS.length}
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  {activeCommand.category}
                </span>
              </div>

              {/* Action Buttons: Copy + Modal view */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    copyToClipboard(activeCommand.command, 'active-cmd')
                  }
                  title="Copy command to clipboard"
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-mono"
                >
                  {copiedId === 'active-cmd' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Command</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  title="Expand to Full View"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Command Header Info */}
            <div className="space-y-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="text-emerald-400">cmd &gt;</span>
                  <span>{activeCommand.name}</span>
                </h3>
                <p className="text-slate-300 text-sm font-sans mt-1">
                  {activeCommand.description}
                </p>
              </div>

              {/* Primary Command Code Highlight */}
              <div className="rounded-xl bg-black/80 border border-emerald-500/40 p-3.5 font-mono text-sm sm:text-base text-emerald-400 flex items-center justify-between shadow-inner relative group/code">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-slate-500 select-none">$</span>
                  <code className="font-bold text-emerald-300 select-all overflow-x-auto whitespace-pre">
                    {activeCommand.command}
                  </code>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(activeCommand.command, 'active-box')
                  }
                  className="text-xs font-mono text-slate-400 hover:text-emerald-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 hover:border-emerald-500/40 transition shrink-0 ml-2"
                >
                  {copiedId === 'active-box' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Warning callout if present */}
            {activeCommand.warning && (
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5 flex items-start gap-3 text-xs font-mono text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold">Important Notice:</span>
                  <p className="text-amber-200/90">{activeCommand.warning}</p>
                </div>
              </div>
            )}

            {/* Visual Before → Command → After Interactive Diagram */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>VISUAL EXECUTION BREAKDOWN</span>
                </span>

                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  {isSimulating ? (
                    <>
                      <RotateCcw className="w-3 h-3 animate-spin" />
                      <span>Simulating...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-emerald-400" />
                      <span>Replay Animation</span>
                    </>
                  )}
                </button>
              </div>

              {/* 3-Step Visual Container: BEFORE -> RUN -> AFTER */}
              <div className="space-y-3">
                {/* 1. BEFORE */}
                <div
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    simStep === 'before'
                      ? 'bg-slate-900 border-blue-500/60 ring-1 ring-blue-500/30'
                      : 'bg-slate-950 border-slate-800/80'
                  }`}
                >
                  <div className="bg-slate-900/90 px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-blue-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                      BEFORE
                    </span>
                    <span className="text-slate-500">Initial State</span>
                  </div>
                  <pre className="p-3.5 font-mono text-xs text-slate-300 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                    {activeCommand.before}
                  </pre>
                </div>

                {/* 2. RUN COMMAND */}
                <div
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    simStep === 'run'
                      ? 'bg-slate-900 border-emerald-500/80 ring-2 ring-emerald-500/40 scale-[1.01]'
                      : 'bg-slate-950 border-slate-800/80'
                  }`}
                >
                  <div className="bg-slate-900/90 px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <Play className="w-2.5 h-2.5 fill-emerald-400" />
                      RUN IN CMD
                    </span>
                    <span className="text-slate-500">Execution</span>
                  </div>
                  <div className="p-3.5 bg-black/60 font-mono text-xs text-emerald-400 flex items-center gap-2">
                    <span className="text-slate-500">&gt;</span>
                    <span className="font-bold select-all">
                      {activeCommand.runCommand}
                    </span>
                  </div>
                </div>

                {/* Arrow down */}
                <div className="flex justify-center text-slate-600">
                  <div className="w-0.5 h-3 bg-slate-800" />
                </div>

                {/* 3. AFTER */}
                <div
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    simStep === 'after'
                      ? 'bg-slate-900 border-teal-500/60 shadow-lg shadow-teal-950/20'
                      : 'bg-slate-950 border-slate-800/80'
                  }`}
                >
                  <div className="bg-slate-900/90 px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-teal-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />
                      AFTER
                    </span>
                    <span className="text-slate-500">Result & State Change</span>
                  </div>
                  <pre className="p-3.5 font-mono text-xs text-emerald-300/90 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                    {activeCommand.after}
                  </pre>
                </div>
              </div>

              {/* What happens summary */}
              {activeCommand.whatHappens && (
                <div className="rounded-xl bg-slate-900/60 border border-slate-800/60 p-3 text-xs text-slate-300 font-mono space-y-1">
                  <span className="text-slate-400 font-semibold block">
                    What happens after running it:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {activeCommand.whatHappens}
                  </p>
                </div>
              )}

              {/* Tip or Secondary Example */}
              {activeCommand.tip && (
                <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-3 text-xs font-mono text-cyan-300">
                  <span className="font-bold">Pro Tip: </span>
                  {activeCommand.tip}
                </div>
              )}

              {activeCommand.secondaryExample && (
                <div className="rounded-xl bg-slate-900 border border-slate-800 p-3.5 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <CornerDownRight className="w-3.5 h-3.5 text-emerald-400" />
                      {activeCommand.secondaryExample.title}
                    </span>
                    <code className="text-emerald-400 text-[11px] bg-black/50 px-2 py-0.5 rounded border border-slate-800">
                      {activeCommand.secondaryExample.command}
                    </code>
                  </div>
                  <p className="text-slate-400">
                    {activeCommand.secondaryExample.description}
                  </p>
                  {activeCommand.secondaryExample.after && (
                    <pre className="bg-black/50 p-2.5 rounded-lg border border-slate-800/80 text-emerald-300/90 text-[11px] overflow-x-auto">
                      {activeCommand.secondaryExample.after}
                    </pre>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Pagination Buttons: Previous Command & Next Command */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <button
                onClick={goToPrevCommand}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono font-medium transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Command</span>
              </button>

              <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
                Command {activeCommand.number} of {CMD_COMMANDS.length}
              </span>

              <button
                onClick={goToNextCommand}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white text-xs font-mono font-semibold shadow-md shadow-[#006cd2]/20 transition"
              >
                <span>Next Command</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Troubleshooting Spotlight Section */}
      <div className="rounded-2xl bg-slate-950/70 border border-amber-500/20 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono text-sm sm:text-base font-bold text-white">
                Developer Troubleshooting Quick Reference
              </h3>
              <p className="text-xs text-slate-400">
                10 essential commands for diagnosing broken builds, port conflicts, and hung processes.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedCategory('troubleshooting')}
            className="text-xs font-mono text-amber-400 hover:text-amber-300 underline self-start sm:self-auto"
          >
            Filter to Troubleshooting ({TROUBLESHOOTING_COMMANDS.length})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {TROUBLESHOOTING_COMMANDS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveCommandId(item.refId);
                setSimStep('after');
              }}
              className="cursor-pointer rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 p-3 space-y-1.5 transition group"
            >
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-emerald-400 group-hover:text-amber-300 transition">
                  {item.command}
                </code>
                <span className="text-[10px] text-slate-500 font-mono">
                  →
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium line-clamp-1">
                {item.title}
              </p>
              <p className="text-[10px] text-slate-500 line-clamp-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Modal View for Fullscreen Focus */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  Command #{activeCommand.number}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeCommand.category}
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-mono font-bold text-white">
                  {activeCommand.name}
                </h2>
                <p className="text-slate-300 text-base mt-1">
                  {activeCommand.description}
                </p>
              </div>

              <div className="bg-black/90 rounded-2xl border border-emerald-500/50 p-4 font-mono text-lg text-emerald-300 flex items-center justify-between">
                <code>$ {activeCommand.command}</code>
                <button
                  onClick={() =>
                    copyToClipboard(activeCommand.command, 'modal-cmd')
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition"
                >
                  {copiedId === 'modal-cmd' ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {activeCommand.warning && (
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 text-xs font-mono text-amber-300">
                  {activeCommand.warning}
                </div>
              )}

              {/* Big Visual Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-2">
                  <span className="text-blue-400 font-mono text-xs font-bold block">
                    BEFORE RUNNING:
                  </span>
                  <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap">
                    {activeCommand.before}
                  </pre>
                </div>
                <div className="rounded-xl bg-slate-950 border border-teal-500/40 p-4 space-y-2">
                  <span className="text-teal-400 font-mono text-xs font-bold block">
                    AFTER RUNNING:
                  </span>
                  <pre className="font-mono text-xs text-emerald-300 whitespace-pre-wrap">
                    {activeCommand.after}
                  </pre>
                </div>
              </div>

              {activeCommand.whatHappens && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                  <strong className="text-emerald-400 block mb-1">
                    What happens after running it:
                  </strong>
                  {activeCommand.whatHappens}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <button
                onClick={goToPrevCommand}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={goToNextCommand}
                className="px-4 py-2 rounded-xl bg-[#006cd2] text-white text-xs font-mono flex items-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
