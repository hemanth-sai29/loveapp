import React from 'react';
import { ArrowLeft, ArrowRight, HeartHandshake, BookmarkCheck } from 'lucide-react';

interface NavigationButtonsProps {
  onNext: () => void;
  onPrev?: () => void;
  onSave?: () => void;
  canPrev?: boolean;
  nextLabel?: string;
  isLastStep?: boolean;
  isSaving?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onPrev,
  onSave,
  canPrev = true,
  nextLabel,
  isLastStep = false,
  isSaving = false,
}) => {
  return (
    <div className="mt-10 sm:mt-12 pt-6 border-t border-rose-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
      {/* Back button */}
      <div>
        {canPrev && onPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-medium text-sm transition-all duration-200 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>

      {/* Right Action buttons */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            title="Save answers to this browser"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-700 font-medium text-sm transition-all duration-200 cursor-pointer"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{isSaving ? 'Saved!' : 'Save Progress'}</span>
          </button>
        )}

        <button
          type="button"
          onClick={onNext}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm sm:text-base shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
        >
          <span>{nextLabel || (isLastStep ? 'Review Answers ❤️' : 'Continue 💕')}</span>
          {isLastStep ? (
            <HeartHandshake className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
