import React from 'react';
import { DailyHabits, ValidationErrors, Chronotype } from '../../types/questionnaire';
import { SectionHeader } from '../common/SectionHeader';
import { QuestionCard } from '../common/QuestionCard';
import { ChoiceButton } from '../common/ChoiceButton';
import { TextQuestion } from '../common/TextQuestion';
import { TextareaQuestion } from '../common/TextareaQuestion';
import { NavigationButtons } from '../common/NavigationButtons';

interface DailyHabitsSectionProps {
  data: DailyHabits;
  onChange: (fields: Partial<DailyHabits>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSave?: () => void;
  errors: ValidationErrors;
}

export const DailyHabitsSection: React.FC<DailyHabitsSectionProps> = ({
  data,
  onChange,
  onNext,
  onPrev,
  onSave,
  errors,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fadeIn">
      <SectionHeader
        badge="Section 3 • Daily Rhythms"
        title="Understanding Your Little Habits 🌷"
        subtitle="How you spend your days, how you unwind, and what helps you feel grounded."
      />

      <div className="space-y-6">
        {/* Morning person or night owl (Required) */}
        <QuestionCard
          id="field-chronotype"
          title="Are you a morning person or night owl?"
          icon="☀️"
          description="Your natural internal clock and when your energy shines brightest."
          required
          error={errors.chronotype}
        >
          <ChoiceButton<Chronotype>
            value={data.chronotype}
            onChange={(val) => onChange({ chronotype: val })}
            options={[
              {
                value: 'Morning Person 🌅',
                label: 'Morning Person',
                icon: '🌅',
                sublabel: 'I wake up early feeling refreshed and energized.',
              },
              {
                value: 'Night Owl 🌙',
                label: 'Night Owl',
                icon: '🌙',
                sublabel: 'My creative thoughts come alive after midnight.',
              },
              {
                value: 'Somewhere in Between',
                label: 'In Between',
                icon: '⚖️',
                sublabel: 'Depends on the season, my mood, and coffee.',
              },
            ]}
          />
        </QuestionCard>

        {/* Wake and Sleep times */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextQuestion
            id="wakeTime"
            title="Usual wake up time?"
            icon="⏰"
            placeholder="e.g., 7:30 AM, or 9:00 AM on weekends"
            value={data.wakeTime}
            onChange={(val) => onChange({ wakeTime: val })}
          />

          <TextQuestion
            id="sleepTime"
            title="Usual bedtime?"
            icon="🛌"
            placeholder="e.g., 11:30 PM, or 1:30 AM"
            value={data.sleepTime}
            onChange={(val) => onChange({ sleepTime: val })}
          />
        </div>

        {/* Stressed and Sad */}
        <TextareaQuestion
          id="whenStressed"
          title="What do you usually do when you're stressed?"
          icon="🌧️"
          description="How stress shows up in your body and mind."
          placeholder="e.g., I get quiet and retreat, or I need to vent, or I clean everything in sight..."
          value={data.whenStressed}
          onChange={(val) => onChange({ whenStressed: val })}
          maxLength={500}
          rows={3}
        />

        <TextareaQuestion
          id="whenSad"
          title="What do you need when you're feeling sad?"
          icon="🩹"
          description="What brings you comfort and lets you breathe easier."
          placeholder="e.g., Wrap me in a blanket, bring me sweet snacks, and just sit beside me in silence..."
          value={data.whenSad}
          onChange={(val) => onChange({ whenSad: val })}
          maxLength={500}
          rows={3}
        />

        <TextQuestion
          id="whatCalms"
          title="What makes you feel calm and centered?"
          icon="🍃"
          description="Sounds, scents, environments, or soothing rituals."
          placeholder="e.g., Rain sounds, head scratches, smelling vanilla candles, a quiet drive"
          value={data.whatCalms}
          onChange={(val) => onChange({ whatCalms: val })}
        />

        {/* Communication preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextQuestion
            id="callsOrText"
            title="Do you prefer calls or texting?"
            icon="📱"
            placeholder="e.g., Texts during day, phone call at night"
            value={data.callsOrText}
            onChange={(val) => onChange({ callsOrText: val })}
          />

          <TextQuestion
            id="talkFrequency"
            title="How often do you like talking in a day?"
            icon="💬"
            placeholder="e.g., Quick check-ins 2-3 times, continuous chat"
            value={data.talkFrequency}
            onChange={(val) => onChange({ talkFrequency: val })}
          />
        </div>

        {/* Together vs Personal Space */}
        <TextQuestion
          id="togetherVsSpace"
          title="Together time vs. Personal space balance?"
          icon="🫧"
          description="How much solo recharge time you love having."
          placeholder="e.g., Love spending whole days together, but need 1 hour of quiet reading time"
          value={data.togetherVsSpace}
          onChange={(val) => onChange({ togetherVsSpace: val })}
        />

        {/* Habit to understand */}
        <TextareaQuestion
          id="habitToUnderstand"
          title="What is one little habit of yours you want me to understand?"
          icon="🧩"
          description="Something you do that has a deeper meaning or just makes you uniquely you."
          placeholder="e.g., If I pause before replying, I'm just gathering my thoughts, not upset at all..."
          value={data.habitToUnderstand}
          onChange={(val) => onChange({ habitToUnderstand: val })}
          maxLength={500}
          rows={2}
        />

        {/* Annoy quickly vs feel loved */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextQuestion
            id="annoysQuickly"
            title="One thing that annoys you quickly?"
            icon="⚡"
            placeholder="e.g., Chronic lateness, chewing loudly, interrupting"
            value={data.annoysQuickly}
            onChange={(val) => onChange({ annoysQuickly: val })}
          />

          <TextQuestion
            id="makesFeelLovedHabit"
            title="One little thing that makes you feel loved?"
            icon="💖"
            placeholder="e.g., Remembering small things I mentioned in passing"
            value={data.makesFeelLovedHabit}
            onChange={(val) => onChange({ makesFeelLovedHabit: val })}
          />
        </div>
      </div>

      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        onSave={onSave}
        canPrev={true}
        nextLabel="Love & Relationship ❤️"
      />
    </div>
  );
};
