import React from 'react';
import { Heart, BookHeart, Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';
import { StepId } from '../../types/questionnaire';

interface HeaderProps {
  currentStep: StepId;
  onNavigate: (step: StepId) => void;
  onReset: () => void;
  onLoadDemo: () => void;
  isDemo: boolean;
  hasAnswers: boolean;
  lastSavedText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onNavigate,
  onReset,
  onLoadDemo,
  isDemo,
  hasAnswers,
  lastSavedText = 'Saved to device',
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-rose-100/80 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 text-left group transition-all"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-editorial text-xl font-bold tracking-tight text-slate-800 group-hover:text-rose-600 transition-colors">
                Know Her
              </span>
              <span className="text-rose-500 font-sans text-xs font-semibold px-1.5 py-0.5 rounded-full bg-rose-100">
                ❤️
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-romantic italic tracking-wide">
              A little digital book about the girl I love
            </p>
          </div>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Autosaved Indicator */}
          {hasAnswers && (
            <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lastSavedText}</span>
            </div>
          )}

          {/* Demo Badge or Demo Loader */}
          {isDemo ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full border border-amber-300">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Demo Mode
              </span>
              <button
                type="button"
                onClick={onReset}
                title="Reset demo data"
                className="text-xs text-slate-500 hover:text-rose-600 px-2 py-1 rounded-md hover:bg-rose-50 transition-colors"
              >
                Clear Demo
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onLoadDemo}
              title="Preview with realistic demo data"
              className="text-xs font-medium text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden sm:inline">Preview Demo</span>
            </button>
          )}

          {/* Quick toggle to User Manual */}
          {hasAnswers && (
            <button
              type="button"
              onClick={() => onNavigate('manual')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                currentStep === 'manual'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                  : 'bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200'
              }`}
            >
              <BookHeart className="w-3.5 h-3.5" />
              <span>Her Manual</span>
            </button>
          )}

          {/* Reset questionnaire button */}
          {hasAnswers && !isDemo && (
            <button
              type="button"
              onClick={onReset}
              title="Restart questionnaire"
              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-xl hover:bg-rose-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
