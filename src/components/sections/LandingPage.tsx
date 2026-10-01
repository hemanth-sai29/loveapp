import React from 'react';
import { Heart, Sparkles, ArrowRight, BookHeart } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onPreviewDemo: () => void;
  onViewManual?: () => void;
  hasExistingAnswers: boolean;
  girlfriendName?: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onPreviewDemo,
  onViewManual,
  hasExistingAnswers,
  girlfriendName,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 py-12 sm:py-20 text-center overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] bg-gradient-to-tr from-rose-200/50 via-pink-200/30 to-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Romantic Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-rose-200/80 shadow-xs mb-8 animate-fadeIn">
        <Sparkles className="w-4 h-4 text-rose-500 animate-spin-slow" />
        <span className="font-romantic italic text-base sm:text-lg text-rose-800 tracking-wide font-medium">
          A personal digital keepsake & journal
        </span>
      </div>

      {/* Floating Animated Heart Emblem */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-rose-400/20 rounded-full blur-xl transform scale-125 group-hover:scale-150 transition-all duration-700" />
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-rose-400 via-rose-500 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/30 animate-float cursor-default">
          <Heart className="w-12 h-12 sm:w-14 sm:h-14 fill-white animate-pulse-subtle" />
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.15] max-w-3xl">
        I Want To Know You Better{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-rose-400">
          ❤️
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-xl text-base sm:text-xl text-slate-600 font-romantic italic leading-relaxed sm:leading-loose">
        “Because if I’m going to be by your side, I want to remember the little things that make you… you.”
      </p>

      {/* Call to Actions */}
      <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        <button
          type="button"
          onClick={onStart}
          className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-base sm:text-lg shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
        >
          <span>{hasExistingAnswers ? 'Continue Questionnaire 💕' : 'Let’s Begin 💕'}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {hasExistingAnswers && onViewManual && (
          <button
            type="button"
            onClick={onViewManual}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-rose-50 text-rose-700 font-semibold text-base border border-rose-200 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookHeart className="w-5 h-5 text-rose-500" />
            <span>Open User Manual</span>
          </button>
        )}
      </div>

      {/* Secondary reassurance text */}
      <p className="mt-4 text-xs sm:text-sm text-slate-500 font-medium">
        No wrong answers. Just tell me about you.
      </p>

      {/* Quick Demo Preview Link */}
      {!hasExistingAnswers && (
        <div className="mt-8 pt-6 border-t border-rose-100/60 max-w-xs">
          <button
            type="button"
            onClick={onPreviewDemo}
            className="text-xs text-rose-600 hover:text-rose-800 font-medium hover:underline inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Want to see what the final manual looks like? Preview demo</span>
          </button>
        </div>
      )}
    </div>
  );
};
