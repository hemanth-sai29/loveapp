import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Download, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../../types/questionnaire';
import { exportProfileAsJSON } from '../../utils/storage';

interface FinalMessageSectionProps {
  profile: UserProfile;
  onOpenManual: () => void;
}

export const FinalMessageSection: React.FC<FinalMessageSectionProps> = ({
  profile,
  onOpenManual,
}) => {
  useEffect(() => {
    // Subtle, gentle romantic confetti burst (soft pink, peach, gold)
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleDownload = () => {
    exportProfileAsJSON(profile);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 text-center animate-fadeIn">
      {/* Emblem */}
      <div className="relative inline-block mb-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-br from-rose-400 via-rose-500 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/30 animate-pulse-subtle">
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 fill-white" />
        </div>
      </div>

      {/* Main Title */}
      <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
        Thank You For Letting Me Know You Better{' '}
        <span className="text-rose-500">❤️</span>
      </h1>

      {/* Emotional message box */}
      <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white/90 border border-rose-200 shadow-xl shadow-rose-100/50 relative overflow-hidden">
        <div className="space-y-4 font-romantic italic text-lg sm:text-xl text-slate-700 leading-relaxed text-center sm:text-left">
          <p>
            “Now I know a little more about the girl I want beside me.
          </p>
          <p>
            I may not remember everything perfectly at first, but I promise I’ll keep learning the little things that make you happy.”
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-rose-100 flex items-center justify-center gap-2 text-rose-700 font-sans font-semibold text-sm sm:text-base">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Your answers are safe with me. ❤️</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleDownload}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 font-semibold text-sm sm:text-base border border-slate-200 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4 text-rose-500" />
          <span>Save My Answers 💾</span>
        </button>

        <button
          type="button"
          onClick={onOpenManual}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          <span>See My Little Profile ✨</span>
        </button>
      </div>

      <p className="mt-6 text-xs text-slate-400">
        You can revisit, edit, or print this manual at any time from your browser.
      </p>
    </div>
  );
};
