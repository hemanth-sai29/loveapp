import React from 'react';
import { Calendar, Trash2, Edit3, Tag, Heart } from 'lucide-react';
import { ImportantDate, DateCategory } from '../../../types/questionnaire';
import { DATE_CATEGORIES } from '../../../utils/constants';

interface DateCardProps {
  item: ImportantDate;
  onEdit?: (item: ImportantDate) => void;
  onDelete?: (id: string) => void;
  isTimeline?: boolean;
}

export const DateCard: React.FC<DateCardProps> = ({
  item,
  onEdit,
  onDelete,
  isTimeline = false,
}) => {
  const categoryMeta = DATE_CATEGORIES.find((c) => c.label === item.category) || DATE_CATEGORIES[0];

  const dateObj = new Date(item.date);
  const formattedDate = !isNaN(dateObj.getTime())
    ? dateObj.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : item.date;

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 transition-all duration-200 relative group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Calendar badge */}
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200/80 flex flex-col items-center justify-center text-rose-600 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
              {!isNaN(dateObj.getTime())
                ? dateObj.toLocaleDateString(undefined, { month: 'short' })
                : 'DATE'}
            </span>
            <span className="text-base font-bold text-slate-800 leading-none">
              {!isNaN(dateObj.getTime()) ? dateObj.getDate() : '—'}
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-base sm:text-lg font-semibold text-slate-800 leading-tight">
                {item.eventName}
              </h4>
              <span
                className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${categoryMeta.color}`}
              >
                {item.category}
              </span>
            </div>

            <p className="text-xs text-slate-400 font-sans mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </p>
          </div>
        </div>

        {/* Action icons */}
        {(onEdit || onDelete) && (
          <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(item)}
                title="Edit date"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                title="Remove date"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Details */}
      {(item.whyImportant || item.reminderNote) && (
        <div className="mt-3 pt-3 border-t border-rose-100/70 text-xs sm:text-sm space-y-1.5">
          {item.whyImportant && (
            <p className="text-slate-600">
              <strong className="text-slate-700 font-medium">Why it matters: </strong>
              {item.whyImportant}
            </p>
          )}
          {item.reminderNote && (
            <p className="text-rose-700 bg-rose-50/60 p-2 rounded-xl border border-rose-100/70 font-medium flex items-center gap-1.5">
              <span>💡</span>
              <span>{item.reminderNote}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
