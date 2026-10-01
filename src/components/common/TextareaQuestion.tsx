import React from 'react';
import { QuestionCard } from './QuestionCard';

interface TextareaQuestionProps {
  id: string;
  title: string;
  icon?: string;
  description?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  error?: string;
}

export const TextareaQuestion: React.FC<TextareaQuestionProps> = ({
  id,
  title,
  icon,
  description,
  value,
  onChange,
  placeholder,
  required,
  maxLength = 500,
  rows = 3,
  error,
}) => {
  return (
    <QuestionCard
      id={`field-${id}`}
      icon={icon}
      title={title}
      description={description}
      required={required}
      error={error}
    >
      <div className="relative">
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={!!error}
          className={`w-full px-4 py-3 rounded-xl border bg-white/90 text-slate-800 text-sm sm:text-base placeholder-slate-400 focus:outline-hidden transition-all duration-200 resize-y min-h-[90px] ${
            error
              ? 'border-rose-400 focus:ring-3 focus:ring-rose-200'
              : 'border-rose-200/90 focus:border-rose-400 focus:ring-3 focus:ring-rose-100 hover:border-rose-300'
          }`}
        />
        <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
          <span>{required ? 'Required field' : 'Optional note'}</span>
          <span>
            {value.length}/{maxLength}
          </span>
        </div>
      </div>
    </QuestionCard>
  );
};
