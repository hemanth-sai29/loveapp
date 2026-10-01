import React from 'react';

interface QuestionCardProps {
  id?: string;
  icon?: string;
  title: string;
  description?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  icon,
  title,
  description,
  required,
  error,
  children,
  className = '',
}) => {
  return (
    <div
      id={id}
      className={`glass-card rounded-2xl p-5 sm:p-6 transition-all duration-300 relative ${
        error ? 'ring-2 ring-rose-400 border-rose-400 bg-rose-50/20' : ''
      } ${className}`}
    >
      <div className="mb-3.5">
        <label className="block text-base sm:text-lg font-semibold text-slate-800 leading-snug">
          {icon && <span className="mr-2 text-lg sm:text-xl">{icon}</span>}
          {title}
          {required && (
            <span className="text-rose-500 ml-1.5 font-bold" title="Required field">
              *
            </span>
          )}
        </label>
        {description && (
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="mt-2">{children}</div>

      {error && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-rose-600 animate-fadeIn">
          <span>❤️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
