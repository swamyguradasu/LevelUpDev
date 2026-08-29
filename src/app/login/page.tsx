'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, mapFirebaseError } from '@/context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { isFirebaseConfigured } from '@/lib/firebase';
import { LoginCursor } from '@/components/LoginCursor';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { user, userData, login, demoLogin } = useAuth();
  const router = useRouter();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user || userData) {
      router.replace('/home');
    }
  }, [user, userData, router]);

  // Subtle parallax effect on mouse movement for ambient background layers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      sessionStorage.setItem('levelupdev_welcome_pending', 'true');
      router.push('/home');
    } catch (err: any) {
      setError(mapFirebaseError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoSignIn = () => {
    demoLogin();
    sessionStorage.setItem('levelupdev_welcome_pending', 'true');
    router.push('/home');
  };

  const logoSrc = '/levelupdev-icon.png';

  const LOGIN_BG_IMAGE_URL =
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2560&q=85';

  return (
    <div className="min-h-screen w-full bg-black flex flex-col font-sans text-on-surface antialiased relative overflow-x-hidden select-none">
      <LoginCursor />

      {/* Professional High-Res Background Image Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={LOGIN_BG_IMAGE_URL}
          alt="LevelUpDev Background"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-black/50 to-stone-950/85 backdrop-blur-[1px]" />
      </div>

      {/* Main Content Container */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-md animate-fade-in">
          {/* High-Craft Dark Glassmorphic Card */}
          <div className="bg-stone-900/85 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:border-white/30">
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-[#006cd2] opacity-90" />

            {/* Brand Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-stone-900/90 p-2 shadow-md border border-white/15 flex items-center justify-center">
                <img
                  alt="Trail Tracker Logo"
                  className="w-full h-full object-contain rounded-xl"
                  src={logoSrc}
                />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1">
                Developer Portal
              </h1>
              <p className="font-sans text-xs sm:text-sm text-stone-300">
                Enter your registered Email &amp; Registration Number to log in
              </p>
            </div>

            {/* Roster Authentication Notice */}
            <div className="mb-6 w-full p-3.5 bg-[#006cd2]/15 border border-[#006cd2]/30 rounded-2xl text-stone-200 text-xs flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#006cd2] shrink-0 mt-0.5" />
              <span>
                Use your registered <strong>Email</strong> and your <strong>Registration Number</strong> (e.g. <code>24A21A0000</code>) as your password.
              </span>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 w-full p-3.5 bg-rose-500/20 border border-rose-500/40 rounded-2xl text-rose-300 text-xs text-left font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block font-mono text-xs font-semibold text-stone-300 uppercase tracking-wider"
                >
                  Registered Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#006cd2]">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@levelupdev.com"
                    className="w-full pl-11 pr-4 py-3 bg-stone-950/70 border border-white/15 rounded-xl focus:ring-1 focus:ring-[#006cd2] focus:border-[#006cd2] focus:bg-stone-900 transition-all font-mono text-sm text-white placeholder-stone-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Field (Registration Number) */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block font-mono text-xs font-semibold text-stone-300 uppercase tracking-wider"
                  >
                    Registration Number (Password)
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#006cd2]">
                    <Lock className="w-5 h-5" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="e.g. 24A21A0000"
                    className="w-full pl-11 pr-4 py-3 bg-stone-950/70 border border-white/15 rounded-xl focus:ring-1 focus:ring-[#006cd2] focus:border-[#006cd2] focus:bg-stone-900 transition-all font-mono text-sm text-white placeholder-stone-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-3 space-y-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans font-semibold rounded-full shadow-lg shadow-[#006cd2]/30 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50"
                >
                  <span>{submitting ? 'Logging in...' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-white/10" />
                  <span className="flex-shrink-0 mx-3 text-stone-400 text-xs font-mono uppercase tracking-wider">
                    or
                  </span>
                  <div className="flex-grow border-t border-white/10" />
                </div>

                <button
                  type="button"
                  onClick={handleDemoSignIn}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-stone-800/80 border border-white/15 text-white font-sans font-semibold rounded-full hover:bg-stone-800 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#006cd2]" />
                  <span>Demo Mode (Instant Access)</span>
                </button>
              </div>
            </form>

            {/* Footer Information */}
            <div className="mt-6 text-center">
              <p className="font-mono text-xs text-stone-400">
                Registration is managed via the Developer Registration roster.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Organic Section Footer */}
      <footer className="w-full py-6 bg-transparent border-t border-white/10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-6 max-w-5xl mx-auto text-xs text-stone-400 font-mono">
          <p>© 2024 Engineering Skill Trail. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}


