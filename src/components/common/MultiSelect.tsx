import React from 'react';
import { Check } from 'lucide-react';
import { QuestionCard } from './QuestionCard';

interface MultiSelectProps {
  id: string;
  title: string;
  icon?: string;
  description?: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelections?: number;
  minSelections?: number;
  required?: boolean;
  error?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  id,
  title,
  icon,
  description,
  options,
  selected = [],
  onChange,
  maxSelections = 3,
  minSelections = 0,
  required,
  error,
}) => {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      if (selected.length < maxSelections) {
        onChange([...selected, option]);
      }
    }
  };

  return (
    <QuestionCard
      id={`field-${id}`}
      icon={icon}
      title={title}
      description={description}
      required={required}
      error={error}
    >
      <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
        <span>
          {minSelections > 0 ? `Select between ${minSelections} and ${maxSelections}` : `Select up to ${maxSelections}`}
        </span>
        <span
          className={`font-semibold px-2 py-0.5 rounded-full ${
            selected.length >= maxSelections
              ? 'bg-rose-100 text-rose-700'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {selected.length} / {maxSelections} chosen
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {options.map((opt) => {
          const isSelected = selected.includes(opt);
          const isMaxed = selected.length >= maxSelections && !isSelected;

          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggleOption(opt)}
              disabled={isMaxed}
              aria-pressed={isSelected}
              className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-400/40 shadow-xs'
                  : isMaxed
                  ? 'bg-slate-50/70 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                  : 'bg-white border-rose-100/90 hover:border-rose-300 hover:bg-rose-50/30'
              }`}
            >
              <span
                className={`text-sm sm:text-base font-medium ${
                  isSelected ? 'text-rose-900 font-semibold' : 'text-slate-700'
                }`}
              >
                {opt}
              </span>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ml-3 transition-colors ${
                  isSelected
                    ? 'bg-rose-600 text-white'
                    : 'border border-slate-300'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </QuestionCard>
  );
};
