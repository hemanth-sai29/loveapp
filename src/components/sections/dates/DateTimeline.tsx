import React from 'react';
import { ImportantDate } from '../../../types/questionnaire';
import { DateCard } from './DateCard';
import { CalendarHeart } from 'lucide-react';

interface DateTimelineProps {
  dates: ImportantDate[];
  onEdit?: (item: ImportantDate) => void;
  onDelete?: (id: string) => void;
}

export const DateTimeline: React.FC<DateTimelineProps> = ({
  dates,
  onEdit,
  onDelete,
}) => {
  if (dates.length === 0) {
    return (
      <div className="text-center py-10 px-4 rounded-3xl border-2 border-dashed border-rose-200/80 bg-rose-50/30">
        <div className="w-12 h-12 mx-auto rounded-full bg-rose-100/70 text-rose-500 flex items-center justify-center mb-3">
          <CalendarHeart className="w-6 h-6" />
        </div>
        <p className="font-editorial text-lg text-slate-700 font-medium">
          No dates added yet ❤️
        </p>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Add her birthday, your anniversary, or any milestone date above to begin your shared timeline.
        </p>
      </div>
    );
  }

  // Sort dates chronologically
  const sortedDates = [...dates].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-[11px] sm:before:left-[15px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-rose-300 before:via-pink-300 before:to-rose-200">
      {sortedDates.map((item) => (
        <div key={item.id} className="relative group">
          {/* Timeline node */}
          <div className="absolute -left-[23px] sm:-left-[27px] top-5 w-4 h-4 rounded-full bg-rose-500 ring-4 ring-rose-100 group-hover:scale-125 transition-transform" />

          {/* Card */}
          <DateCard
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            isTimeline={true}
          />
        </div>
      ))}
    </div>
  );
};
