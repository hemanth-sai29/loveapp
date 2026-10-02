import React from 'react';
import { LikesDislikes, ValidationErrors } from '../../types/questionnaire';
import { SectionHeader } from '../common/SectionHeader';
import { TextQuestion } from '../common/TextQuestion';
import { TextareaQuestion } from '../common/TextareaQuestion';
import { NavigationButtons } from '../common/NavigationButtons';
import { Heart, Ban } from 'lucide-react';

interface LikesDislikesSectionProps {
  data: LikesDislikes;
  onChange: (fields: Partial<LikesDislikes>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSave?: () => void;
  errors: ValidationErrors;
}

export const LikesDislikesSection: React.FC<LikesDislikesSectionProps> = ({
  data,
  onChange,
  onNext,
  onPrev,
  onSave,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fadeIn">
      <SectionHeader
        badge="Section 6 • Tastes & Boundaries"
        title="Likes & Dislikes 💗"
        subtitle="The entertainment and art that inspires you, alongside the clear boundaries that protect your peace."
      />

      <div className="space-y-10">
        {/* CARD 1: Things I Love ❤️ */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-rose-50/70 via-pink-50/40 to-white border-2 border-rose-200/80 shadow-md">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-rose-200/80">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/25">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-slate-800">
                Things I Love ❤️
              </h2>
              <p className="text-xs text-rose-700 font-sans">
                Stories, music, hobbies, and little joys that capture your imagination.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <TextQuestion
                id="favoriteMovie"
                title="Favorite movie?"
                icon="🎬"
                placeholder="e.g., Before Sunrise, About Time, La La Land"
                value={data.favoriteMovie}
                maxLength={200}
                onChange={(val) => onChange({ favoriteMovie: val })}
              />

              <TextQuestion
                id="favoriteSeries"
                title="Favorite TV series?"
                icon="📺"
                placeholder="e.g., Gilmore Girls, Fleabag, Modern Family"
                value={data.favoriteSeries}
                maxLength={200}
                onChange={(val) => onChange({ favoriteSeries: val })}
              />

              <TextQuestion
                id="favoriteSong"
                title="Favorite song?"
                icon="🎵"
                placeholder="e.g., Lover, Yellow, August"
                value={data.favoriteSong}
                maxLength={200}
                onChange={(val) => onChange({ favoriteSong: val })}
              />

              <TextQuestion
                id="favoriteSinger"
                title="Favorite singer / musical artist?"
                icon="🎤"
                placeholder="e.g., Taylor Swift, Prateek Kuhad, Gracie Abrams"
                value={data.favoriteSinger}
                maxLength={200}
                onChange={(val) => onChange({ favoriteSinger: val })}
              />

              <TextQuestion
                id="favoriteActor"
                title="Favorite actor?"
                icon="🎭"
                placeholder="e.g., Cillian Murphy, Timothée Chalamet"
                value={data.favoriteActor}
                maxLength={200}
                onChange={(val) => onChange({ favoriteActor: val })}
              />

              <TextQuestion
                id="favoriteActress"
                title="Favorite actress?"
                icon="🌟"
                placeholder="e.g., Anne Hathaway, Florence Pugh"
                value={data.favoriteActress}
                maxLength={200}
                onChange={(val) => onChange({ favoriteActress: val })}
              />
            </div>

            <TextQuestion
              id="favoriteBook"
              title="Favorite book or author?"
              icon="📖"
              placeholder="e.g., The Little Prince, Normal People, A Little Life"
              value={data.favoriteBook}
              maxLength={200}
              onChange={(val) => onChange({ favoriteBook: val })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <TextQuestion
                id="favoriteHobby"
                title="Favorite hobby or pastime?"
                icon="🎨"
                placeholder="e.g., Pottery, reading, baking, journaling"
                value={data.favoriteHobby}
                maxLength={200}
                onChange={(val) => onChange({ favoriteHobby: val })}
              />

              <TextQuestion
                id="favoriteGame"
                title="Favorite game (board/video/mobile)?"
                icon="🎮"
                placeholder="e.g., Wordle, Mario Kart, Codenames, Sims"
                value={data.favoriteGame}
                maxLength={200}
                onChange={(val) => onChange({ favoriteGame: val })}
              />
            </div>

            <TextQuestion
              id="favoriteSocialMedia"
              title="Favorite social media / internet pastime?"
              icon="📱"
              placeholder="e.g., Pinterest moodboards, Instagram cat reels, YouTube vlogs"
              value={data.favoriteSocialMedia}
              maxLength={200}
              onChange={(val) => onChange({ favoriteSocialMedia: val })}
            />
          </div>
        </div>

        {/* CARD 2: Things I Don't Like 🚫 */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-50/80 via-rose-50/30 to-amber-50/20 border-2 border-slate-200 shadow-md">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-200">
            <div className="w-10 h-10 rounded-2xl bg-slate-700 text-white flex items-center justify-center shadow-md shadow-slate-700/25">
              <Ban className="w-5 h-5 text-rose-300" />
            </div>
            <div>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-slate-800">
                Things I Don't Like 🚫
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                Pet peeves, triggers, and things that drain your battery.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <TextQuestion
              id="dislikedFoods"
              title="Foods or textures you dislike?"
              icon="🥦"
              placeholder="e.g., Bitter gourd, slimy mushrooms, raw onion aftertaste"
              value={data.dislikedFoods}
              maxLength={200}
              onChange={(val) => onChange({ dislikedFoods: val })}
            />

            <TextQuestion
              id="annoysMe"
              title="Things that instantly annoy you?"
              icon="😤"
              placeholder="e.g., Being talked over, unreliability, clutter on clean desks"
              value={data.annoysMe}
              maxLength={200}
              onChange={(val) => onChange({ annoysMe: val })}
            />

            <TextareaQuestion
              id="hateBeingTold"
              title="Things you hate being told or hear?"
              icon="🛑"
              description="Phrases that feel dismissive or frustrate you."
              placeholder='e.g., "Calm down", "You are overthinking it", "It is not a big deal"...'
              value={data.hateBeingTold}
              maxLength={500}
              rows={2}
              onChange={(val) => onChange({ hateBeingTold: val })}
            />

            <TextareaQuestion
              id="makesUncomfortable"
              title="Things or situations that make you uncomfortable?"
              icon="🫧"
              description="Environments, behaviors, or social settings to avoid or handle with care."
              placeholder="e.g., Sudden aggressive shouting, being pressured into making fast decisions in public..."
              value={data.makesUncomfortable}
              maxLength={500}
              rows={2}
              onChange={(val) => onChange({ makesUncomfortable: val })}
            />

            <TextQuestion
              id="dontEnjoyDoing"
              title="Things you really don't enjoy doing?"
              icon="🙅"
              placeholder="e.g., Packing luggage in a rush, large crowded parties, waking up early without tea"
              value={data.dontEnjoyDoing}
              maxLength={200}
              onChange={(val) => onChange({ dontEnjoyDoing: val })}
            />
          </div>
        </div>
      </div>

      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        onSave={onSave}
        canPrev={true}
        nextLabel="Her Dreams 🌙"
      />
    </div>
  );
};
