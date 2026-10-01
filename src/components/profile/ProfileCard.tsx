import React from 'react';

interface ProfileCardProps {
  icon: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  icon,
  title,
  subtitle,
  badge,
  children,
  className = '',
  headerAction,
}) => {
  return (
    <div
      className={`glass-card rounded-3xl p-6 sm:p-7 border border-rose-100 shadow-md relative overflow-hidden avoid-break ${className}`}
    >
      <div className="flex items-start justify-between gap-3 pb-4 mb-5 border-b border-rose-100/80">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-100 text-rose-600 flex items-center justify-center text-xl shrink-0 border border-rose-200/60 shadow-xs">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-editorial text-xl font-bold text-slate-900 tracking-tight">
                {title}
              </h3>
              {badge && (
                <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 font-sans mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {headerAction && <div>{headerAction}</div>}
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
};
