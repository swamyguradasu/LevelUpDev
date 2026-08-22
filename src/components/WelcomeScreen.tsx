'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';
import { UserProfileData } from '@/context/AuthContext';
import { Flame, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  userData: UserProfileData | null;
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ userData, onComplete }) => {
  const userName = userData?.name || 'Developer';
  const headlineText = `Welcome back, ${userName}`;

  const { displayed, done } = useTypewriter(headlineText, 38, 400);

  // Subtitle subtitle logic
  const streak = userData?.streak?.currentStreak || 0;
  const hasProgress = Object.values(userData?.progress || {}).some((modMap) =>
    Object.values(modMap).some(Boolean)
  );

  let subtitleText = 'Ready to start Python?';
  if (streak > 1) {
    subtitleText = `Day ${streak} streak — keep it going! 🔥`;
  } else if (hasProgress) {
    subtitleText = 'Day 1 streak — keep it going! 🔥';
  }

  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    if (done) {
      const subTimer = setTimeout(() => {
        setShowSubtitle(true);
      }, 300);

      const navTimer = setTimeout(() => {
        onComplete();
      }, 300 + 1200);

      return () => {
        clearTimeout(subTimer);
        clearTimeout(navTimer);
      };
    }
  }, [done, onComplete]);

  return (
    <div
      onClick={onComplete}
      className="fixed inset-0 z-[100] bg-white text-slate-900 flex flex-col items-center justify-center p-6 cursor-pointer select-none"
    >
      <div className="max-w-xl w-full text-center space-y-6">
        {/* Main Headline with Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
        >
          <span>{displayed}</span>
          {!done && <span className="animate-blink text-indigo-600 font-normal ml-0.5">|</span>}
        </motion.div>

        {/* Subtitle Line Fading In */}
        <AnimatePresence>
          {showSubtitle && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base sm:text-lg font-medium text-slate-600 flex items-center justify-center gap-2"
            >
              {streak > 0 ? (
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              ) : (
                <Sparkles className="w-5 h-5 text-indigo-500" />
              )}
              <span>{subtitleText}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tap anywhere hint */}
      <div className="absolute bottom-8 text-xs text-slate-400 font-medium">
        Click or tap anywhere to skip
      </div>
    </div>
  );
};
