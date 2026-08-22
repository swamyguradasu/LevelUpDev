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

  const logoSrc =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD66v-nMXafIXs1WucAHusttkFL-PqVcrIyDCZuXGP0O8ZDp-tBF_VdEgau_6eB_OAKYGjT4Jae1lY55emRjfKO_xnwBLwCEm5k0OfEydRTBNyk8OtEJm8PgWzD2b93rzN0fv2Dd6WgLHnLaL_Ke1GGJiwpenvNLA0AVzx3iE9-POPdrhbIactkuMh0FNCdfKjow8Yfv8NszLSe-fD8lIXI6hB947Y5am8n0fHEyBHZPof7u_nREHaUkA';

  return (
    <div className="min-h-screen w-full topo-bg flex flex-col font-sans text-on-surface antialiased relative overflow-hidden select-none">
      <LoginCursor />

      {/* Layer 1: Ambient Parallax Forest & Gold Glows */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`,
        }}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#C98A3E]/15 via-transparent to-transparent pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${-mousePos.x * 0.8}px, ${-mousePos.y * 0.8}px, 0)`,
        }}
      />

      {/* Layer 2: Soft Forest Overlay Texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center mix-blend-overlay filter blur-[2px]"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop")',
          transform: `scale(1.05) translate3d(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px, 0)`,
        }}
      />

      {/* Main Content Container */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-md animate-fade-in">
          {/* High-Craft Glassmorphic Card */}
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-[#5C7A6B]/20 shadow-[0_10px_40px_-10px_rgba(15,46,40,0.12)] relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:border-[#5C7A6B]/40">
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#5C7A6B] via-[#C98A3E] to-[#5C7A6B] opacity-80" />

            {/* Brand Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/90 p-2 shadow-md border border-[#5C7A6B]/15 flex items-center justify-center">
                <img
                  alt="Trail Tracker Logo"
                  className="w-full h-full object-contain rounded-xl"
                  src={logoSrc}
                />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#0F2E28] tracking-tight mb-1">
                Developer Portal
              </h1>
              <p className="font-sans text-sm text-[#414846]">
                Enter your registered Email &amp; Registration Number to log in
              </p>
            </div>

            {/* Roster Authentication Notice */}
            <div className="mb-6 w-full p-3.5 bg-[#5C7A6B]/10 border border-[#5C7A6B]/25 rounded-2xl text-[#0F2E28] text-xs flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#C98A3E] shrink-0 mt-0.5" />
              <span>
                Use your registered <strong>Email</strong> and your <strong>Registration Number</strong> (e.g. <code>24A21A6145</code>) as your password.
              </span>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 w-full p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-700 text-xs text-left font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block font-mono text-xs font-semibold text-[#0F2E28] uppercase tracking-wider"
                >
                  Registered Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#5C7A6B]">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="swamy@levelupdev.com"
                    className="w-full pl-11 pr-4 py-3 bg-[#E2E8E2]/50 border-0 border-b border-[#5C7A6B]/30 rounded-t-xl focus:ring-0 focus:border-[#C98A3E] focus:bg-white/90 transition-all font-mono text-sm text-[#1A1C1B] placeholder-[#5C7A6B]/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Field (Registration Number) */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block font-mono text-xs font-semibold text-[#0F2E28] uppercase tracking-wider"
                  >
                    Registration Number (Password)
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#5C7A6B]">
                    <Lock className="w-5 h-5" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="e.g. 24A21A6145"
                    className="w-full pl-11 pr-4 py-3 bg-[#E2E8E2]/50 border-0 border-b border-[#5C7A6B]/30 rounded-t-xl focus:ring-0 focus:border-[#C98A3E] focus:bg-white/90 transition-all font-mono text-sm text-[#1A1C1B] placeholder-[#5C7A6B]/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-3 space-y-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#C98A3E] text-[#0F2E28] font-sans font-semibold rounded-full hover:bg-[#C98A3E]/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
                >
                  <span>{submitting ? 'Logging in...' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-[#5C7A6B]/20" />
                  <span className="flex-shrink-0 mx-3 text-[#414846] text-xs font-mono uppercase tracking-wider">
                    or
                  </span>
                  <div className="flex-grow border-t border-[#5C7A6B]/20" />
                </div>

                <button
                  type="button"
                  onClick={handleDemoSignIn}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-transparent border-2 border-[#5C7A6B] text-[#0F2E28] font-sans font-semibold rounded-full hover:bg-[#5C7A6B]/10 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#C98A3E]" />
                  <span>Demo Mode (Instant Access)</span>
                </button>
              </div>
            </form>

            {/* Footer Information */}
            <div className="mt-6 text-center">
              <p className="font-mono text-xs text-[#414846]">
                Registration is managed via the Developer Registration roster.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Organic Section Footer */}
      <footer className="w-full py-6 bg-transparent border-t border-[#5C7A6B]/15 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-6 max-w-5xl mx-auto text-xs text-[#414846] font-mono">
          <p>© 2024 Engineering Skill Trail. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#0F2E28] transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#0F2E28] transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}


