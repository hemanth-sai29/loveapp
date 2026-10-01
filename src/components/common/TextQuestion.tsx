import React from 'react';
import { QuestionCard } from './QuestionCard';

interface TextQuestionProps {
  id: string;
  title: string;
  icon?: string;
  description?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  error?: string;
  type?: 'text' | 'time' | 'date';
}

export const TextQuestion: React.FC<TextQuestionProps> = ({
  id,
  title,
  icon,
  description,
  value,
  onChange,
  placeholder,
  required,
  maxLength,
  error,
  type = 'text',
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
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={!!error}
          className={`w-full px-4 py-3 rounded-xl border bg-white/90 text-slate-800 text-sm sm:text-base placeholder-slate-400 focus:outline-hidden transition-all duration-200 ${
            error
              ? 'border-rose-400 focus:ring-3 focus:ring-rose-200'
              : 'border-rose-200/90 focus:border-rose-400 focus:ring-3 focus:ring-rose-100 hover:border-rose-300'
          }`}
        />
        {maxLength && (
          <div className="text-right mt-1 text-[11px] text-slate-400">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    </QuestionCard>
  );
};
