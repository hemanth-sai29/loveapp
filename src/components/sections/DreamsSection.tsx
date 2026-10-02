import React from 'react';
import { Dreams, ValidationErrors } from '../../types/questionnaire';
import { TextQuestion } from '../common/TextQuestion';
import { TextareaQuestion } from '../common/TextareaQuestion';
import { NavigationButtons } from '../common/NavigationButtons';
import { Moon } from 'lucide-react';

interface DreamsSectionProps {
  data: Dreams;
  onChange: (fields: Partial<Dreams>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSave?: () => void;
  errors: ValidationErrors;
}

export const DreamsSection: React.FC<DreamsSectionProps> = ({
  data,
  onChange,
  onNext,
  onPrev,
  onSave,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Starry Night themed header banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white shadow-xl relative overflow-hidden mb-8 border border-purple-800/40">
        {/* Subtle twinkling background dots */}
        <div className="absolute inset-0 stars-twinkle opacity-60 pointer-events-none" />

        <div className="relative z-10 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 shadow-md mb-3 animate-float">
            <Moon className="w-6 h-6 fill-amber-300" />
          </div>

          <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-pink-300 bg-white/10 px-3 py-1 rounded-full border border-pink-300/30 mb-2">
            Section 7 • Aspirations
          </span>

          <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Your Dreams Matter To Me 🌙
          </h1>

          <p className="mt-2 text-sm sm:text-base text-purple-200/90 font-romantic italic max-w-lg mx-auto">
            “Tell me what your heart wishes for when you look up at the stars. I want to cheer for every single one.”
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Biggest dream */}
        <TextareaQuestion
          id="biggestDream"
          title="What is your biggest, most cherished dream in life?"
          icon="✨"
          description="The vision for your life that brings you hope and passion."
          placeholder="e.g., Having a warm, peaceful home filled with books, art, and laughter, or building my own creative brand..."
          value={data.biggestDream}
          maxLength={500}
          rows={3}
          onChange={(val) => onChange({ biggestDream: val })}
        />

        {/* Where to travel & dream vacation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextQuestion
            id="whereToTravel"
            title="Where do you most want to travel?"
            icon="✈️"
            placeholder="e.g., Amalfi Coast, Kyoto in spring, Swiss Alps"
            value={data.whereToTravel}
            maxLength={200}
            onChange={(val) => onChange({ whereToTravel: val })}
          />

          <TextQuestion
            id="dreamVacation"
            title="Describe your dream vacation pace?"
            icon="🏖️"
            placeholder="e.g., A slow 2-week coastal villa stay with zero alarms"
            value={data.dreamVacation}
            maxLength={200}
            onChange={(val) => onChange({ dreamVacation: val })}
          />
        </div>

        {/* Career & Achievement */}
        <TextareaQuestion
          id="careerGoal"
          title="What career or creative goal excites you most?"
          icon="💼"
          description="What you are working hard towards or aspire to master."
          placeholder="e.g., Publishing my own illustrated book, leading a design studio, or working flexibly from anywhere..."
          value={data.careerGoal}
          maxLength={500}
          rows={2}
          onChange={(val) => onChange({ careerGoal: val })}
        />

        <TextareaQuestion
          id="wantToAchieve"
          title="What is a personal milestone you want to achieve?"
          icon="🏆"
          description="Something that would make your younger self immensely proud."
          placeholder="e.g., Financial peace of mind, running a 10k, learning fluent Italian, adopting two dogs..."
          value={data.wantToAchieve}
          maxLength={500}
          rows={2}
          onChange={(val) => onChange({ wantToAchieve: val })}
        />

        {/* Experience together */}
        <TextareaQuestion
          id="experienceTogether"
          title="What is something you want us to experience together?"
          icon="💫"
          description="A memory you want us to live through hand in hand."
          placeholder="e.g., Watching the Northern Lights from a glass igloo, road-tripping through coastal roads, stargazing on a quiet mountain peak..."
          value={data.experienceTogether}
          maxLength={500}
          rows={3}
          onChange={(val) => onChange({ experienceTogether: val })}
        />

        {/* Always wanted to try */}
        <TextQuestion
          id="alwaysWantedToTry"
          title="What is something you've always secretly wanted to try?"
          icon="🪁"
          description="A fun hobby, adventure sport, class, or spontaneous activity."
          placeholder="e.g., Scuba diving, taking an authentic pasta-making class, hot air ballooning..."
          value={data.alwaysWantedToTry}
          maxLength={200}
          onChange={(val) => onChange({ alwaysWantedToTry: val })}
        />
      </div>

      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        onSave={onSave}
        canPrev={true}
        nextLabel="About Us 💕"
      />
    </div>
  );
};
