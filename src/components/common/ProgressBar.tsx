import React from 'react';
import { QUESTIONNAIRE_SECTIONS } from '../../utils/constants';

interface ProgressBarProps {
  currentStepIndex: number; // 1 to 9
  totalSteps?: number;
  onStepClick?: (stepNumber: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStepIndex,
  totalSteps = 9,
  onStepClick,
}) => {
  const currentSection = QUESTIONNAIRE_SECTIONS.find((s) => s.stepNumber === currentStepIndex);
  const percentage = Math.round((currentStepIndex / totalSteps) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-6 pb-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            Step {currentStepIndex} of {totalSteps}
          </span>
          {currentSection && (
            <span className="text-sm font-medium text-slate-700 hidden sm:inline">
              {currentSection.emoji} {currentSection.shortTitle}
            </span>
          )}
        </div>
        <span className="text-xs font-semibold text-rose-500 tabular-nums">
          {percentage}% Completed
        </span>
      </div>

      {/* Progress track */}
      <div className="relative w-full h-2.5 bg-rose-100 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-xs"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step dot indicators (clickable for completed/prior steps) */}
      <div className="flex justify-between items-center mt-2 px-1">
        {QUESTIONNAIRE_SECTIONS.map((sec) => {
          const isPassed = sec.stepNumber < currentStepIndex;
          const isCurrent = sec.stepNumber === currentStepIndex;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => onStepClick && onStepClick(sec.stepNumber)}
              title={`${sec.stepNumber}. ${sec.title}`}
              aria-label={`Jump to step ${sec.stepNumber}: ${sec.shortTitle}`}
              className={`group relative flex items-center justify-center transition-all ${
                isPassed ? 'cursor-pointer' : isCurrent ? 'cursor-default' : 'opacity-40'
              }`}
            >
              <div
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'scale-125 bg-rose-600 ring-4 ring-rose-200'
                    : isPassed
                    ? 'bg-rose-400 group-hover:scale-110'
                    : 'bg-slate-300'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
