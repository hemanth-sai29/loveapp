import React from 'react';
import { Heart, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';

interface WelcomeBackModalProps {
  isOpen: boolean;
  girlfriendName?: string;
  lastUpdated?: string;
  onContinue: () => void;
  onStartOver: () => void;
}

export const WelcomeBackModal: React.FC<WelcomeBackModalProps> = ({
  isOpen,
  girlfriendName,
  lastUpdated,
  onContinue,
  onStartOver,
}) => {
  if (!isOpen) return null;

  const formattedDate = lastUpdated ? new Date(lastUpdated).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }) : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 text-center relative overflow-hidden">
        {/* Decorative heart watermark */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-rose-50 rounded-full blur-2xl pointer-events-none" />

        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 mb-5 animate-pulse-subtle">
          <Heart className="w-7 h-7 fill-white" />
        </div>

        <h2 className="font-editorial text-2xl font-bold text-slate-800">
          Welcome back ❤️
        </h2>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed font-sans">
          {girlfriendName ? (
            <>
              We found your saved answers for <strong className="text-rose-600">{girlfriendName}</strong>.
            </>
          ) : (
            'We found your saved questionnaire progress on this device.'
          )}
          <br />
          Would you like to continue where you left off?
        </p>

        {formattedDate && (
          <p className="mt-2 text-[11px] text-slate-400">
            Last saved: {formattedDate}
          </p>
        )}

        <div className="mt-7 flex flex-col gap-3">
          <button
            type="button"
            onClick={onContinue}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm sm:text-base shadow-md shadow-rose-500/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue where I left off</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onStartOver}
            className="w-full py-3 px-6 rounded-2xl border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-medium text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Fresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
