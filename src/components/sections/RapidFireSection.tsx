import React from 'react';
import { RapidFireAnswers, ValidationErrors } from '../../types/questionnaire';
import { NavigationButtons } from '../common/NavigationButtons';
import { RAPID_FIRE_QUESTIONS } from '../../utils/constants';
import { Zap, CheckCircle2 } from 'lucide-react';

interface RapidFireSectionProps {
  data: RapidFireAnswers;
  onChange: (fields: Partial<RapidFireAnswers>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSave?: () => void;
  errors: ValidationErrors;
}

export const RapidFireSection: React.FC<RapidFireSectionProps> = ({
  data,
  onChange,
  onNext,
  onPrev,
  onSave,
  errors,
}) => {
  const answeredCount = RAPID_FIRE_QUESTIONS.filter(
    (q) => !!data[q.id as keyof RapidFireAnswers]
  ).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Playful Header Badge */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold mb-3">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>Section 9 • Playful Intuition</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Rapid-Fire Round ⚡
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 font-romantic italic max-w-md mx-auto">
          “Trust your immediate gut feeling. Two big choices — pick whichever speaks to you right now!”
        </p>

        {/* Counter */}
        <div className="mt-3 inline-block text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80">
          Answered {answeredCount} of {RAPID_FIRE_QUESTIONS.length}
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-6">
        {RAPID_FIRE_QUESTIONS.map((q, index) => {
          const currentVal = data[q.id as keyof RapidFireAnswers];
          const hasError = !!errors[q.id];

          return (
            <div
              key={q.id}
              id={`field-${q.id}`}
              className={`glass-card rounded-3xl p-5 sm:p-6 transition-all duration-300 relative ${
                hasError
                  ? 'ring-2 ring-rose-500 border-rose-400 bg-rose-50/30'
                  : currentVal
                  ? 'border-rose-200 bg-white/95'
                  : 'border-slate-200 bg-white/80'
              }`}
            >
              {/* Question Index & Title */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h3 className="font-editorial text-lg font-bold text-slate-800">
                    {q.title}
                  </h3>
                  <span className="text-rose-500 text-sm font-bold" title="Required">
                    *
                  </span>
                </div>

                {currentVal ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Selected</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400 font-sans">
                    Pick one
                  </span>
                )}
              </div>

              {/* Two Large Choice Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option A */}
                <button
                  type="button"
                  onClick={() => onChange({ [q.id]: q.optionA })}
                  className={`p-5 rounded-2xl text-left border-2 transition-all duration-300 transform active:scale-95 cursor-pointer relative overflow-hidden group ${
                    currentVal === q.optionA
                      ? 'bg-gradient-to-br from-rose-500 to-rose-600 text-white border-rose-600 shadow-lg shadow-rose-500/25 scale-[1.02]'
                      : 'bg-white hover:bg-rose-50/50 border-rose-100 text-slate-800 hover:border-rose-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl sm:text-2xl font-bold tracking-tight">
                      {q.optionA}
                    </span>
                    {currentVal === q.optionA && (
                      <span className="w-6 h-6 rounded-full bg-white text-rose-600 flex items-center justify-center shadow-xs">
                        ✓
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs sm:text-sm font-sans leading-relaxed ${
                      currentVal === q.optionA ? 'text-rose-100' : 'text-slate-500'
                    }`}
                  >
                    {q.subA}
                  </p>
                </button>

                {/* Option B */}
                <button
                  type="button"
                  onClick={() => onChange({ [q.id]: q.optionB })}
                  className={`p-5 rounded-2xl text-left border-2 transition-all duration-300 transform active:scale-95 cursor-pointer relative overflow-hidden group ${
                    currentVal === q.optionB
                      ? 'bg-gradient-to-br from-rose-500 to-rose-600 text-white border-rose-600 shadow-lg shadow-rose-500/25 scale-[1.02]'
                      : 'bg-white hover:bg-rose-50/50 border-rose-100 text-slate-800 hover:border-rose-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl sm:text-2xl font-bold tracking-tight">
                      {q.optionB}
                    </span>
                    {currentVal === q.optionB && (
                      <span className="w-6 h-6 rounded-full bg-white text-rose-600 flex items-center justify-center shadow-xs">
                        ✓
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs sm:text-sm font-sans leading-relaxed ${
                      currentVal === q.optionB ? 'text-rose-100' : 'text-slate-500'
                    }`}
                  >
                    {q.subB}
                  </p>
                </button>
              </div>

              {/* Error message */}
              {hasError && (
                <div className="mt-2.5 text-xs text-rose-600 font-semibold flex items-center gap-1">
                  <span>❤️</span>
                  <span>{errors[q.id]}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        onSave={onSave}
        canPrev={true}
        isLastStep={true}
        nextLabel="Review Answers ❤️"
      />
    </div>
  );
};
