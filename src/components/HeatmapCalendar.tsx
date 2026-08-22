'use client';

import React from 'react';

interface HeatmapCalendarProps {
  solvedDates: string[];
  compact?: boolean;
}

export const HeatmapCalendar: React.FC<HeatmapCalendarProps> = ({ solvedDates = [], compact = false }) => {
  const solvedSet = new Set(solvedDates);
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Number of days to display
  const daysToShow = compact ? 84 : 182; // 12 weeks for compact, 26 weeks (~6 months) for full

  // Generate array of past dates
  const datesList: { dateStr: string; dayOfWeek: number; monthName: string; isToday: boolean; isSolved: boolean }[] = [];

  for (let i = daysToShow - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay(); // 0 = Sun, 1 = Mon ...
    const monthName = d.toLocaleString('default', { month: 'short' });

    datesList.push({
      dateStr,
      dayOfWeek,
      monthName,
      isToday: dateStr === todayStr,
      isSolved: solvedSet.has(dateStr),
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="font-semibold text-slate-300">
          {solvedDates.length} Problem{solvedDates.length === 1 ? '' : 's'} Solved Total
        </span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-900 border border-slate-800"></span>
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-950 border border-emerald-800"></span>
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600"></span>
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 shadow-sm shadow-emerald-400/50"></span>
          <span>More</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl overflow-x-auto scrollbar-thin">
        <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-full">
          {datesList.map((item) => {
            let bgClass = 'bg-slate-900 border-slate-800/60 hover:border-slate-700';

            if (item.isSolved) {
              bgClass = 'bg-emerald-500 border-emerald-400 shadow-sm shadow-emerald-500/40 hover:bg-emerald-400';
            }

            if (item.isToday) {
              bgClass += ' ring-2 ring-indigo-500 ring-offset-1 ring-offset-slate-950';
            }

            return (
              <div
                key={item.dateStr}
                className={`w-3.5 h-3.5 rounded-sm border transition ${bgClass} group relative cursor-pointer`}
                title={`${item.dateStr}: ${item.isSolved ? 'DSA Challenge Completed ✓' : 'No submission'}`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
