import React from 'react';
import { AboutUs, ValidationErrors } from '../../types/questionnaire';
import { SectionHeader } from '../common/SectionHeader';
import { TextQuestion } from '../common/TextQuestion';
import { TextareaQuestion } from '../common/TextareaQuestion';
import { NavigationButtons } from '../common/NavigationButtons';
import { Heart, Sparkles, MessageCircleHeart } from 'lucide-react';

interface AboutUsSectionProps {
  data: AboutUs;
  onChange: (fields: Partial<AboutUs>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSave?: () => void;
  errors: ValidationErrors;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  data,
  onChange,
  onNext,
  onPrev,
  onSave,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fadeIn">
      <SectionHeader
        badge="Section 8 • Shared Memories"
        title="A Little About Us ❤️"
        subtitle="The memories we share, the moments we treasure, and the future we are writing together."
      />

      <div className="space-y-6">
        {/* First impression & favorite memory */}
        <TextareaQuestion
          id="firstImpression"
          title="What was your very first impression of me?"
          icon="👀"
          description="Be completely honest! What did you think the first time our eyes met?"
          placeholder="e.g., You had a really warm, genuine smile and listened to everything I said with so much attention..."
          value={data.firstImpression}
          maxLength={500}
          rows={2}
          onChange={(val) => onChange({ firstImpression: val })}
        />

        <TextareaQuestion
          id="favoriteMemory"
          title="What is your absolute favorite memory with me so far?"
          icon="📸"
          description="A moment where you felt so close, laughing, or peaceful together."
          placeholder="e.g., When we got soaked in the sudden rain and couldn't stop giggling under that tiny umbrella..."
          value={data.favoriteMemory}
          maxLength={500}
          rows={3}
          onChange={(val) => onChange({ favoriteMemory: val })}
        />

        {/* Favorite thing about us */}
        <TextareaQuestion
          id="favoriteThingAboutUs"
          title="What is your favorite thing about US as a couple?"
          icon="💞"
          description="What makes our dynamic feel special to you?"
          placeholder="e.g., How safe I feel being my silly authentic self around you, and how we can sit in peaceful silence..."
          value={data.favoriteThingAboutUs}
          maxLength={500}
          rows={2}
          onChange={(val) => onChange({ favoriteThingAboutUs: val })}
        />

        {/* Want to do together & kind of dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextQuestion
            id="wantToDoTogether"
            title="Something you want us to do together?"
            icon="🥞"
            placeholder="e.g., Cook a complex dinner recipe from scratch"
            value={data.wantToDoTogether}
            maxLength={200}
            onChange={(val) => onChange({ wantToDoTogether: val })}
          />

          <TextQuestion
            id="kindOfDates"
            title="What kind of dates do you enjoy most?"
            icon="🕯️"
            placeholder="e.g., Strolling quiet bookstores & late night gelato"
            value={data.kindOfDates}
            maxLength={200}
            onChange={(val) => onChange({ kindOfDates: val })}
          />
        </div>

        {/* Place to visit & memory to create */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextQuestion
            id="visitTogether"
            title="One place you want us to visit together?"
            icon="🗺️"
            placeholder="e.g., A cozy cabin in the mountains or Lake Como"
            value={data.visitTogether}
            maxLength={200}
            onChange={(val) => onChange({ visitTogether: val })}
          />

          <TextQuestion
            id="memoryToCreate"
            title="One memory you want us to create?"
            icon="✨"
            placeholder="e.g., Slow dancing in our living room to our vinyl record"
            value={data.memoryToCreate}
            maxLength={200}
            onChange={(val) => onChange({ memoryToCreate: val })}
          />
        </div>

        {/* Wish understood better */}
        <TextareaQuestion
          id="wishUnderstoodBetter"
          title="Is there something you wish I understood even better about you?"
          icon="💭"
          description="Something you find hard to put into words during everyday conversations."
          placeholder="e.g., That when I pull away slightly, I just need gentle reassurance rather than logic..."
          value={data.wishUnderstoodBetter}
          maxLength={500}
          rows={3}
          onChange={(val) => onChange({ wishUnderstoodBetter: val })}
        />

        {/* Promise wanted */}
        <TextareaQuestion
          id="promiseWanted"
          title="What is one promise you want from me?"
          icon="🤝"
          description="A vow from my heart to yours."
          placeholder="e.g., To always choose kindness, even when we disagree, and to never stop dating me..."
          value={data.promiseWanted}
          maxLength={500}
          rows={2}
          onChange={(val) => onChange({ promiseWanted: val })}
        />
      </div>

      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        onSave={onSave}
        canPrev={true}
        nextLabel="Rapid-Fire Round ⚡"
      />
    </div>
  );
};
