import React from 'react';
import { LoveRelationship, ValidationErrors } from '../../types/questionnaire';
import { SectionHeader } from '../common/SectionHeader';
import { TextQuestion } from '../common/TextQuestion';
import { TextareaQuestion } from '../common/TextareaQuestion';
import { MultiSelect } from '../common/MultiSelect';
import { NavigationButtons } from '../common/NavigationButtons';
import { WHEN_UPSET_OPTIONS, MAKES_FEEL_LOVED_OPTIONS } from '../../utils/constants';

interface LoveRelationshipSectionProps {
  data: LoveRelationship;
  onChange: (fields: Partial<LoveRelationship>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSave?: () => void;
  errors: ValidationErrors;
}

export const LoveRelationshipSection: React.FC<LoveRelationshipSectionProps> = ({
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
        badge="Section 4 • Emotional Connection"
        title="How Do You Like To Be Loved? ❤️"
        quote="I’m asking because I want to love you in the way YOU understand love."
        subtitle="Every person receives and feels love differently. Teach me your heart's native language."
      />

      <div className="space-y-6">
        {/* What makes you feel loved? (Required Multi-select, 1-3) */}
        <MultiSelect
          id="makesFeelLoved"
          title="What makes you feel deeply loved?"
          icon="❤️"
          description="Pick 1 to 3 primary ways your heart receives love."
          options={MAKES_FEEL_LOVED_OPTIONS}
          selected={data.makesFeelLoved || []}
          onChange={(selected) => onChange({ makesFeelLoved: selected })}
          minSelections={1}
          maxSelections={3}
          required
          error={errors.makesFeelLoved}
        />

        {/* When you're upset, what do you want? (Multi-select, max 3) */}
        <MultiSelect
          id="whenUpset"
          title="When you're upset or overwhelmed, what do you want from me?"
          icon="🫂"
          description="How I can support you in hard moments without overwhelming you."
          options={WHEN_UPSET_OPTIONS}
          selected={data.whenUpset || []}
          onChange={(selected) => onChange({ whenUpset: selected })}
          minSelections={0}
          maxSelections={3}
          error={errors.whenUpset}
        />

        {/* Love language description */}
        <TextQuestion
          id="loveLanguage"
          title="Describe your love language in your own words?"
          icon="💌"
          placeholder="e.g., Unplanned sweet gestures, listening intently without judgment, warm hugs"
          value={data.loveLanguage}
          onChange={(val) => onChange({ loveLanguage: val })}
        />

        {/* Feeling Appreciated */}
        <TextareaQuestion
          id="feelAppreciated"
          title="What makes you feel truly valued and appreciated?"
          icon="🌷"
          description="The small compliments or acknowledgments that stick with you."
          placeholder="e.g., When you notice the little things I prepared, or tell me you are proud of me..."
          value={data.feelAppreciated}
          onChange={(val) => onChange({ feelAppreciated: val })}
          maxLength={500}
          rows={2}
        />

        {/* Quick preference grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextQuestion
            id="likeSurprises"
            title="Do you like surprises?"
            icon="🎁"
            placeholder="e.g., Yes! Big surprises, or only sweet little ones"
            value={data.likeSurprises}
            onChange={(val) => onChange({ likeSurprises: val })}
          />

          <TextQuestion
            id="likeGifts"
            title="Do you like receiving gifts?"
            icon="🎀"
            placeholder="e.g., Yes, especially handwritten or sentimental ones"
            value={data.likeGifts}
            onChange={(val) => onChange({ likeGifts: val })}
          />

          <TextQuestion
            id="likeNotes"
            title="Do you like handwritten notes?"
            icon="✍️"
            placeholder="e.g., I love and keep every single one forever!"
            value={data.likeNotes}
            onChange={(val) => onChange({ likeNotes: val })}
          />

          <TextQuestion
            id="likeLongCalls"
            title="Do you like long late-night calls?"
            icon="🌙"
            placeholder="e.g., Yes, falling asleep on call is the sweetest"
            value={data.likeLongCalls}
            onChange={(val) => onChange({ likeLongCalls: val })}
          />
        </div>

        {/* Dates & Ideal Date */}
        <TextQuestion
          id="likeDates"
          title="What kind of dates do you enjoy most?"
          icon="🍷"
          placeholder="e.g., Cozy quiet bookstore dates, picnics, dressing up for fine dining"
          value={data.likeDates}
          onChange={(val) => onChange({ likeDates: val })}
        />

        <TextareaQuestion
          id="idealDate"
          title="Describe your dream or ideal date?"
          icon="✨"
          description="From start to finish, what would make an unforgettable evening?"
          placeholder="e.g., Picking up iced coffee, an afternoon drive to the beach, catching the golden sunset, and sharing a warm dessert under fairy lights..."
          value={data.idealDate}
          onChange={(val) => onChange({ idealDate: val })}
          maxLength={500}
          rows={3}
        />

        {/* Feel special & never forget */}
        <TextQuestion
          id="feelSpecial"
          title="What is one thing that makes you feel extra special?"
          icon="👑"
          placeholder="e.g., When you hold my hand in public, when you write letters"
          value={data.feelSpecial}
          onChange={(val) => onChange({ feelSpecial: val })}
        />

        <TextareaQuestion
          id="neverForget"
          title="What should I never forget about you?"
          icon="🗝️"
          description="A delicate truth about your emotions, past, or heart."
          placeholder="e.g., That beneath my strength, I feel deeply and just want to feel protected and cherished..."
          value={data.neverForget}
          onChange={(val) => onChange({ neverForget: val })}
          maxLength={500}
          rows={3}
        />

        {/* Partner should remember */}
        <TextareaQuestion
          id="partnerShouldRemember"
          title="What is something your partner should always remember?"
          icon="💍"
          description="A golden rule for keeping your heart happy."
          placeholder="e.g., Gentle patience and communication heal everything. Never go to bed angry..."
          value={data.partnerShouldRemember}
          onChange={(val) => onChange({ partnerShouldRemember: val })}
          maxLength={500}
          rows={2}
        />
      </div>

      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        onSave={onSave}
        canPrev={true}
        nextLabel="Important Dates 🗓️"
      />
    </div>
  );
};
