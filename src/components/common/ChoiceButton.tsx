import React from 'react';
import { Check } from 'lucide-react';

interface ChoiceOption<T extends string> {
  value: T;
  label: string;
  sublabel?: string;
  icon?: string;
}

interface ChoiceButtonProps<T extends string> {
  options: ChoiceOption<T>[];
  value: T;
  onChange: (val: T) => void;
  layout?: 'grid' | 'stack';
}

export function ChoiceButton<T extends string>({
  options,
  value,
  onChange,
  layout = 'grid',
}: ChoiceButtonProps<T>) {
  return (
    <div
      role="radiogroup"
      className={`gap-3 ${
        layout === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-3'
          : 'flex flex-col sm:flex-row'
      }`}
    >
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={`group relative p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
              isSelected
                ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-400/40 shadow-xs'
                : 'bg-white/90 border-rose-100 hover:border-rose-300 hover:bg-rose-50/40'
            }`}
          >
            <div className="flex items-start justify-between w-full">
              <div className="flex items-center gap-2">
                {opt.icon && <span className="text-xl">{opt.icon}</span>}
                <span
                  className={`font-medium text-sm sm:text-base ${
                    isSelected ? 'text-rose-900 font-semibold' : 'text-slate-800'
                  }`}
                >
                  {opt.label}
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors shrink-0 ml-2 ${
                  isSelected
                    ? 'bg-rose-600 text-white'
                    : 'border border-slate-300 group-hover:border-rose-400'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>

            {opt.sublabel && (
              <p
                className={`mt-2 text-xs leading-relaxed ${
                  isSelected ? 'text-rose-700' : 'text-slate-500'
                }`}
              >
                {opt.sublabel}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
