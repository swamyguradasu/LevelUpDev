'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { RESOURCE_TYPE_METADATA, ResourceType } from '@/data/careerHub';

export default function ResourceGlossaryCard() {
  const [isOpen, setIsOpen] = useState(false);

  const entries = Object.entries(RESOURCE_TYPE_METADATA) as [
    ResourceType,
    { label: string; description: string; badgeClass: string }
  ][];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/40 transition"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-cyan-400">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">
              Understanding Resource &amp; Credential Types
            </h4>
            <p className="text-xs text-slate-400">
              Not sure whether to choose a Course, Certification, Skill Badge, or Applied Skill?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
          <span>{isOpen ? 'Hide Guide' : 'View Guide'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 pt-0 border-t border-slate-800/60 mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {entries.map(([type, meta]) => (
            <div
              key={type}
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md border ${meta.badgeClass}`}
                >
                  {meta.label}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{meta.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
