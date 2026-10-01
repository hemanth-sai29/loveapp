import React from 'react';
import { BasicDetails, ValidationErrors } from '../../types/questionnaire';
import { SectionHeader } from '../common/SectionHeader';
import { TextQuestion } from '../common/TextQuestion';
import { TextareaQuestion } from '../common/TextareaQuestion';
import { NavigationButtons } from '../common/NavigationButtons';

interface BasicDetailsSectionProps {
  data: BasicDetails;
  onChange: (fields: Partial<BasicDetails>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSave?: () => void;
  errors: ValidationErrors;
}

export const BasicDetailsSection: React.FC<BasicDetailsSectionProps> = ({
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
        badge="Section 1 • Essentials"
        title="A Little About You 🌸"
        subtitle="The essential little details that bring a smile to my face whenever I think of you."
      />

      <div className="space-y-6">
        {/* What should I call you? (Required) */}
        <TextQuestion
          id="callName"
          title="What should I call you?"
          icon="✨"
          description="The name you love hearing from me the most."
          placeholder="e.g., Ananya, Sarah, My Love"
          value={data.callName}
          onChange={(val) => onChange({ callName: val })}
          required
          maxLength={50}
          error={errors.callName}
        />

        {/* Nickname (Optional) */}
        <TextQuestion
          id="nickname"
          title="What is your nickname?"
          icon="🎀"
          description="A sweet pet name, family nickname, or something just for us."
          placeholder="e.g., Chinnu, Cookie, Sunshine"
          value={data.nickname}
          onChange={(val) => onChange({ nickname: val })}
          maxLength={50}
          error={errors.nickname}
        />

        {/* 2-Column Grid for Favorites */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextQuestion
            id="favoriteColor"
            title="Favorite color?"
            icon="🎨"
            placeholder="e.g., Lavender, Forest Green, Warm Peach"
            value={data.favoriteColor}
            onChange={(val) => onChange({ favoriteColor: val })}
          />

          <TextQuestion
            id="favoriteFlower"
            title="Favorite flower?"
            icon="🌷"
            placeholder="e.g., Baby's Breath, White Lilies, Peonies"
            value={data.favoriteFlower}
            onChange={(val) => onChange({ favoriteFlower: val })}
          />

          <TextQuestion
            id="favoriteAnimal"
            title="Favorite animal?"
            icon="🐾"
            placeholder="e.g., Golden Retrievers, Kittens, Otters"
            value={data.favoriteAnimal}
            onChange={(val) => onChange({ favoriteAnimal: val })}
          />

          <TextQuestion
            id="favoriteSeason"
            title="Favorite season?"
            icon="🍂"
            placeholder="e.g., Rainy Monsoon, Cozy Winter, Spring"
            value={data.favoriteSeason}
            onChange={(val) => onChange({ favoriteSeason: val })}
          />
        </div>

        {/* Favorite place */}
        <TextQuestion
          id="favoritePlace"
          title="What is your favorite place in the world?"
          icon="🏡"
          description="Anywhere you feel completely at peace and happy."
          placeholder="e.g., A quiet balcony garden, my bedroom reading nook, the beach at twilight"
          value={data.favoritePlace}
          onChange={(val) => onChange({ favoritePlace: val })}
        />

        {/* What instantly makes you happy? (Required) */}
        <TextareaQuestion
          id="instantHappy"
          title="What is one thing that instantly makes you happy?"
          icon="☀️"
          description="A gesture, a treat, a sound, or a little moment that lifts your mood."
          placeholder="e.g., When you bring me iced coffee unexpectedly, forehead kisses, baby animal videos, or clean bedsheets..."
          value={data.instantHappy}
          onChange={(val) => onChange({ instantHappy: val })}
          required
          maxLength={500}
          rows={3}
          error={errors.instantHappy}
        />
      </div>

      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        onSave={onSave}
        canPrev={true}
        nextLabel="Favorite Foods 😋"
      />
    </div>
  );
};
