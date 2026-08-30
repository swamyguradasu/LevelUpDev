'use client';

import React, { useState } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  ShieldCheck,
  KeyRound,
} from 'lucide-react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  isFirstTimePrompt?: boolean;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  userEmail,
  isFirstTimePrompt = false,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Strength calculation
  const getStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getStrength(newPassword);
  const strengthLabels = ['Too Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = ['bg-rose-500', 'bg-rose-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500', 'bg-emerald-400'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!currentPassword) {
      setErrorMsg('Please enter your current password.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('New passwords do not match. Please re-check.');
      return;
    }

    if (newPassword === currentPassword) {
      setErrorMsg('New password must be different from your current password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Failed to update password.');
      } else {
        setSuccessMsg(data.message || 'Password successfully updated!');
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'A network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in relative overflow-hidden my-8">
        {/* Top Accent Gradient */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006cd2] via-cyan-400 to-[#006cd2]" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-[#006cd2]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                {isFirstTimePrompt ? 'Secure Your Account' : 'Change Password'}
              </h2>
              <div className="font-mono text-xs text-blue-400 truncate max-w-[220px]">
                {userEmail}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Note */}
        <div className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-2xl text-xs text-slate-300 space-y-1">
          <div className="flex items-center gap-1.5 text-blue-400 font-bold font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Database-Enforced Security</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            {isFirstTimePrompt
              ? 'You are currently logged in with your default registration number. Please set a custom password for privacy and security.'
              : 'Your new password will be stored securely in the database. Only this password will be accepted for future logins.'}
          </p>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div className="space-y-1">
            <label className="block font-mono text-xs font-bold text-slate-300 uppercase">
              Current Password / Registration No.
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="e.g. 24A21A6145 or existing password"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#006cd2] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="block font-mono text-xs font-bold text-slate-300 uppercase">
              New Custom Password
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min. 6 characters)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#006cd2] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Strength Meter */}
            {newPassword.length > 0 && (
              <div className="pt-1 space-y-1">
                <div className="flex gap-1 h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 transition-all duration-300 ${
                        strength >= i ? strengthColors[strength] : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Strength: {strengthLabels[strength]}</span>
                  <span>Min 6 characters</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1">
            <label className="block font-mono text-xs font-bold text-slate-300 uppercase">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your new password"
                className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none pr-10 ${
                  confirmPassword && confirmPassword !== newPassword
                    ? 'border-rose-500/60 focus:border-rose-500'
                    : 'border-slate-800 focus:border-[#006cd2]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && confirmPassword === newPassword && (
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Passwords match
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white font-mono text-xs transition"
            >
              {isFirstTimePrompt ? 'Remind Me Later' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={loading || !newPassword || newPassword !== confirmPassword}
              className="px-6 py-2.5 rounded-xl bg-[#006cd2] hover:bg-[#005bb5] text-white font-sans text-xs font-bold transition shadow-lg shadow-[#006cd2]/30 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
