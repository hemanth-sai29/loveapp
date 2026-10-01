import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  quote?: string;
  badge?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  quote,
  badge,
  className = '',
}) => {
  return (
    <div className={`text-center max-w-2xl mx-auto mb-8 sm:mb-10 ${className}`}>
      {badge && (
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80 mb-3 shadow-xs">
          {badge}
        </span>
      )}

      <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight leading-tight">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
          {subtitle}
        </p>
      )}

      {quote && (
        <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50/70 to-rose-50 border border-rose-200/70 shadow-xs">
          <p className="font-romantic text-base sm:text-lg text-rose-800 italic text-center font-medium">
            “{quote}”
          </p>
        </div>
      )}
    </div>
  );
};
