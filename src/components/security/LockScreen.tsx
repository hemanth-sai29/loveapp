import React, { useState } from 'react';
import { Heart, Lock, KeyRound, Sparkles, Eye, EyeOff, ShieldCheck, HelpCircle } from 'lucide-react';
import { verifyPasscode, unlockApp, getSecurityConfig } from '../../utils/security';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [inputCode, setInputCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = getSecurityConfig();

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputCode.trim()) {
      setError(true);
      setErrorMessage('Please enter the secret code ❤️');
      return;
    }

    setIsSubmitting(true);
    if (verifyPasscode(inputCode)) {
      unlockApp(inputCode, true);
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setErrorMessage("That doesn't match our secret word. Check the hint below!");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FFFBFB] to-[#FFEFEF]">
      {/* Decorative blurred backdrop glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div
          className={`glass-card p-6 sm:p-8 rounded-3xl border border-rose-200/80 shadow-2xl shadow-rose-500/10 backdrop-blur-xl bg-white/85 transition-all duration-300 ${
            error ? 'animate-shake border-rose-400 ring-2 ring-rose-200' : ''
          }`}
        >
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 to-rose-400 flex items-center justify-center text-white shadow-xl shadow-rose-500/30 transform transition-transform group-hover:scale-105">
                <Lock className="w-9 h-9 stroke-[2.2]" />
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-rose-500">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse-subtle" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-medium mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Private & Link-Only Access</span>
            </div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
              A Private Space For Her
            </h1>
            <p className="mt-2 text-sm text-slate-500 font-sans leading-relaxed">
              This little book is personal, intimate, and strictly reserved for someone special.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label
                htmlFor="passcodeInput"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
              >
                Enter Secret Passcode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4 text-rose-400" />
                </div>
                <input
                  id="passcodeInput"
                  type={showPassword ? 'text' : 'password'}
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Enter secret word or PIN..."
                  autoFocus
                  autoComplete="off"
                  className="w-full pl-10 pr-11 py-3 text-sm bg-rose-50/30 border border-rose-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all text-slate-800 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {error && (
                <p className="mt-2 text-xs text-rose-600 font-medium flex items-center gap-1 animate-fade-in">
                  <span>⚠️</span> {errorMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium rounded-2xl shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/35 transition-all duration-200 flex items-center justify-center gap-2 group active:scale-[0.99]"
            >
              <span>Unlock Book</span>
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </form>

          {/* Hint Accordion */}
          <div className="mt-5 pt-4 border-t border-rose-100 text-center">
            {!showHint ? (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Need a hint?</span>
              </button>
            ) : (
              <div className="p-3 bg-rose-50/70 border border-rose-200/70 rounded-2xl text-xs text-rose-800 animate-fade-in">
                <p className="font-semibold text-rose-900 mb-0.5">Secret Hint:</p>
                <p className="italic font-romantic text-sm">{config.hint}</p>
              </div>
            )}

            <p className="mt-3 text-[11px] text-slate-400 leading-normal">
              Shared with a link? If someone sent you a direct magic link, it unlocks automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
