import React, { useState } from 'react';
import { ImportantDate, DateCategory, ValidationErrors } from '../../types/questionnaire';
import { SectionHeader } from '../common/SectionHeader';
import { DateTimeline } from './dates/DateTimeline';
import { NavigationButtons } from '../common/NavigationButtons';
import { DATE_CATEGORIES } from '../../utils/constants';
import { validateDateItem } from '../../utils/validation';
import { Plus, Check, X, Calendar } from 'lucide-react';

interface ImportantDatesSectionProps {
  dates: ImportantDate[];
  onChange: (dates: ImportantDate[]) => void;
  onNext: () => void;
  onPrev: () => void;
  onSave?: () => void;
  errors: ValidationErrors;
}

export const ImportantDatesSection: React.FC<ImportantDatesSectionProps> = ({
  dates,
  onChange,
  onNext,
  onPrev,
  onSave,
  errors: _stepErrors,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dateVal, setDateVal] = useState('');
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState<DateCategory>('Birthday 🎂');
  const [whyImportant, setWhyImportant] = useState('');
  const [reminderNote, setReminderNote] = useState('');
  const [formErrors, setFormErrors] = useState<ValidationErrors>({});
  const [showAddForm, setShowAddForm] = useState(dates.length === 0);

  const resetForm = () => {
    setEditingId(null);
    setDateVal('');
    setEventName('');
    setCategory('Birthday 🎂');
    setWhyImportant('');
    setReminderNote('');
    setFormErrors({});
  };

  const handleStartEdit = (item: ImportantDate) => {
    setEditingId(item.id);
    setDateVal(item.date);
    setEventName(item.eventName);
    setCategory(item.category);
    setWhyImportant(item.whyImportant || '');
    setReminderNote(item.reminderNote || '');
    setFormErrors({});
    setShowAddForm(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    onChange(dates.filter((d) => d.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  const handleSaveDate = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateDateItem(
      dateVal,
      eventName,
      whyImportant,
      reminderNote,
      dates,
      editingId || undefined
    );

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    if (editingId) {
      // Update
      const updated = dates.map((d) =>
        d.id === editingId
          ? {
              ...d,
              date: dateVal,
              eventName: eventName.trim(),
              category,
              whyImportant: whyImportant.trim(),
              reminderNote: reminderNote.trim(),
            }
          : d
      );
      onChange(updated);
    } else {
      // Create new
      if (dates.length >= 50) {
        alert('You have reached the maximum of 50 dates! ❤️');
        return;
      }
      const newEntry: ImportantDate = {
        id: `date-${Date.now()}`,
        date: dateVal,
        eventName: eventName.trim(),
        category,
        whyImportant: whyImportant.trim(),
        reminderNote: reminderNote.trim(),
      };
      onChange([...dates, newEntry]);
    }

    resetForm();
    setShowAddForm(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fadeIn">
      <SectionHeader
        badge="Section 5 • Milestones"
        title="Dates I Never Want To Forget 🗓️"
        subtitle="Her birthday, your anniversary, graduations, and moments to always celebrate."
      />

      {/* Add / Edit Form Card */}
      <div className="mb-8">
        {!showAddForm && dates.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowAddForm(true);
            }}
            className="w-full py-4 px-6 rounded-2xl border-2 border-dashed border-rose-300 hover:border-rose-400 bg-rose-50/40 hover:bg-rose-50/80 text-rose-700 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-5 h-5" />
            <span>Add Another Important Date 🗓️</span>
          </button>
        ) : (
          <div className="glass-card rounded-3xl p-5 sm:p-7 border border-rose-200 shadow-md">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-100">
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
                <span>🗓️</span>
                <span>{editingId ? 'Edit Important Date' : 'Add A New Important Date'}</span>
              </h3>
              {dates.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowAddForm(false);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <form onSubmit={handleSaveDate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dateVal}
                    onChange={(e) => {
                      setDateVal(e.target.value);
                      if (formErrors.date) setFormErrors((prev) => ({ ...prev, date: '' }));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-slate-800 text-sm focus:outline-hidden ${
                      formErrors.date ? 'border-rose-500 ring-2 ring-rose-200' : 'border-rose-200 focus:border-rose-400'
                    }`}
                  />
                  {formErrors.date && (
                    <p className="mt-1 text-xs text-rose-600">{formErrors.date}</p>
                  )}
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DateCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-white text-slate-800 text-sm focus:outline-hidden focus:border-rose-400"
                  >
                    {DATE_CATEGORIES.map((cat) => (
                      <option key={cat.label} value={cat.label}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Event Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Event Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Her Birthday 🎂, Our First Date, Graduation Day"
                  value={eventName}
                  maxLength={100}
                  onChange={(e) => {
                    setEventName(e.target.value);
                    if (formErrors.eventName) setFormErrors((prev) => ({ ...prev, eventName: '' }));
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-slate-800 text-sm focus:outline-hidden ${
                    formErrors.eventName ? 'border-rose-500 ring-2 ring-rose-200' : 'border-rose-200 focus:border-rose-400'
                  }`}
                />
                {formErrors.eventName && (
                  <p className="mt-1 text-xs text-rose-600">{formErrors.eventName}</p>
                )}
              </div>

              {/* Why Important */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Why is this date important? (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., The day we met in the rain; the day she was born"
                  value={whyImportant}
                  maxLength={300}
                  onChange={(e) => setWhyImportant(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-white text-slate-800 text-sm focus:outline-hidden focus:border-rose-400"
                />
              </div>

              {/* Reminder Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Reminder note for him (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Buy white lilies & book our favorite restaurant in advance"
                  value={reminderNote}
                  maxLength={300}
                  onChange={(e) => setReminderNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-white text-slate-800 text-sm focus:outline-hidden focus:border-rose-400"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-xl text-slate-600 text-sm hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm shadow-md shadow-rose-500/25 flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingId ? 'Update Date' : 'Save Date ❤️'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Saved Dates Timeline */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-editorial text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>📅</span>
            <span>Saved Timeline ({dates.length})</span>
          </h3>
          <span className="text-xs text-slate-400">
            {dates.length === 0 ? 'No dates yet' : 'Chronologically arranged'}
          </span>
        </div>

        <DateTimeline
          dates={dates}
          onEdit={handleStartEdit}
          onDelete={handleDelete}
        />
      </div>

      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        onSave={onSave}
        canPrev={true}
        nextLabel="Likes & Dislikes 💗"
      />
    </div>
  );
};
