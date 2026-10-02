import React, { useState } from 'react';
import { UserProfile, StepId } from '../../types/questionnaire';
import { ProfileCard } from './ProfileCard';
import { DateTimeline } from '../sections/dates/DateTimeline';
import { exportProfileAsJSON } from '../../utils/storage';
import {
  Heart,
  BookHeart,
  Download,
  Printer,
  Edit3,
  BookmarkCheck,
  ChevronRight,
} from 'lucide-react';

interface ProfileDashboardProps {
  profile: UserProfile;
  onEditSection: (stepId: StepId) => void;
  onRestart?: () => void;
}

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({
  profile,
  onEditSection,
  onRestart: _onRestart,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'reminders'>('all');

  const {
    basicDetails,
    foodPreferences,
    habits,
    relationship,
    importantDates,
    likesDislikes,
    dreams,
    aboutUs,
    rapidFire,
    metadata,
  } = profile;

  const fallback = 'Not answered yet ❤️';

  // Compute Birthday from importantDates or text
  const birthdayDate = importantDates.find(
    (d) =>
      d.category === 'Birthday 🎂' ||
      d.eventName.toLowerCase().includes('birthday')
  );

  const formattedBirthday = birthdayDate
    ? `${birthdayDate.eventName}: ${new Date(birthdayDate.date).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
      })}`
    : fallback;

  // Formatted important dates string
  const importantDatesSummary =
    importantDates.length > 0
      ? importantDates.map((d) => `${d.eventName} (${d.date})`).join(' • ')
      : fallback;

  // Print helper
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
      {/* Top Banner & Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold mb-4 shadow-xs">
          <BookHeart className="w-4 h-4 text-rose-500" />
          <span>Personal Keepsake Edition</span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          {basicDetails.callName ? `${basicDetails.callName}’s User Manual` : 'Her User Manual'} — Handle With Love ❤️
        </h1>

        <p className="mt-3 text-base sm:text-xl text-slate-600 font-romantic italic leading-relaxed">
          “Not actually a manual. Just a reminder to pay attention to the little things.”
        </p>

        {/* Action Toolbar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 no-print">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'all' ? 'reminders' : 'all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
              activeTab === 'reminders'
                ? 'bg-rose-600 text-white shadow-rose-500/25'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{activeTab === 'reminders' ? 'View Full Manual' : '📝 Things He Should Remember'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print / Save as PDF</span>
          </button>

          <button
            type="button"
            onClick={() => exportProfileAsJSON(profile)}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export JSON</span>
          </button>

          <button
            type="button"
            onClick={() => onEditSection('review')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-700 text-xs sm:text-sm font-medium border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Edit3 className="w-4 h-4 text-rose-500" />
            <span>Edit Answers</span>
          </button>
        </div>
      </div>

      {/* SPECIAL SECTION: Things He Should Remember ❤️ (Prominently displayed) */}
      <div className={`mb-10 avoid-break ${activeTab === 'reminders' ? 'ring-4 ring-rose-400 rounded-3xl p-1' : ''}`}>
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 text-white shadow-xl shadow-rose-500/25 relative overflow-hidden">
          {/* Subtle watermark */}
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <div>
                <h2 className="font-editorial text-2xl font-bold tracking-tight">
                  Things He Should Remember ❤️
                </h2>
                <p className="text-xs text-rose-100 font-sans mt-0.5">
                  A boyfriend’s heartfelt cheat-sheet generated automatically from her answers.
                </p>
              </div>
            </div>

            <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/30">
              Handle With Extreme Care ✨
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <span className="text-xs font-semibold text-rose-100 flex items-center gap-1.5 mb-1">
                <span>🍕</span>
                <span>Favorite food</span>
              </span>
              <p className="font-bold text-white text-base">
                {foodPreferences.favoriteFood || fallback}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <span className="text-xs font-semibold text-rose-100 flex items-center gap-1.5 mb-1">
                <span>🍫</span>
                <span>Favorite chocolate</span>
              </span>
              <p className="font-bold text-white text-base">
                {foodPreferences.favoriteChocolate || fallback}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <span className="text-xs font-semibold text-rose-100 flex items-center gap-1.5 mb-1">
                <span>🎂</span>
                <span>Birthday</span>
              </span>
              <p className="font-bold text-white text-base">
                {formattedBirthday}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <span className="text-xs font-semibold text-rose-100 flex items-center gap-1.5 mb-1">
                <span>🗓️</span>
                <span>Important dates</span>
              </span>
              <p className="font-bold text-white text-base truncate">
                {importantDatesSummary}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <span className="text-xs font-semibold text-rose-100 flex items-center gap-1.5 mb-1">
                <span>🩹</span>
                <span>When she's sad</span>
              </span>
              <p className="text-white text-sm leading-relaxed">
                {habits.whenSad || fallback}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <span className="text-xs font-semibold text-rose-100 flex items-center gap-1.5 mb-1">
                <span>✨</span>
                <span>Ideal date</span>
              </span>
              <p className="text-white text-sm leading-relaxed">
                {relationship.idealDate || fallback}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <span className="text-xs font-semibold text-rose-100 flex items-center gap-1.5 mb-1">
                <span>🚫</span>
                <span>Things to avoid</span>
              </span>
              <p className="text-white text-sm leading-relaxed">
                {likesDislikes.annoysMe || likesDislikes.dislikedFoods || foodPreferences.dislikedFood || fallback}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <span className="text-xs font-semibold text-rose-100 flex items-center gap-1.5 mb-1">
                <span>☀️</span>
                <span>Things that make her happy</span>
              </span>
              <p className="text-white text-sm leading-relaxed">
                {basicDetails.instantHappy || fallback}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Card 1: ❤️ Her Favorites */}
        <ProfileCard
          icon="❤️"
          title="Her Favorites"
          subtitle="Tastes, flavors & simple delights"
          headerAction={
            <button
              type="button"
              onClick={() => onEditSection('food')}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-0.5 no-print"
            >
              <span>Edit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between py-1.5 border-b border-rose-50">
              <span className="text-slate-500">Favorite Food:</span>
              <strong className="text-slate-800 text-right">{foodPreferences.favoriteFood || fallback}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-rose-50">
              <span className="text-slate-500">Favorite Chocolate:</span>
              <span className="text-slate-800 font-medium text-right">{foodPreferences.favoriteChocolate || fallback}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-rose-50">
              <span className="text-slate-500">Favorite Drink:</span>
              <span className="text-slate-800 text-right">{foodPreferences.favoriteDrink || fallback}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-rose-50">
              <span className="text-slate-500">Favorite Color:</span>
              <span className="text-slate-800 text-right">{basicDetails.favoriteColor || fallback}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-rose-50">
              <span className="text-slate-500">Favorite Movie:</span>
              <span className="text-slate-800 text-right">{likesDislikes.favoriteMovie || fallback}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-rose-50">
              <span className="text-slate-500">Favorite Music / Singer:</span>
              <span className="text-slate-800 text-right">{likesDislikes.favoriteSinger || likesDislikes.favoriteSong || fallback}</span>
            </div>
            {foodPreferences.favoriteDessert && (
              <div className="flex justify-between py-1.5 border-b border-rose-50">
                <span className="text-slate-500">Favorite Dessert:</span>
                <span className="text-slate-800 text-right">{foodPreferences.favoriteDessert}</span>
              </div>
            )}
            {basicDetails.favoriteFlower && (
              <div className="flex justify-between py-1.5 border-b border-rose-50">
                <span className="text-slate-500">Favorite Flower:</span>
                <span className="text-slate-800 text-right">{basicDetails.favoriteFlower}</span>
              </div>
            )}
          </div>
        </ProfileCard>

        {/* Card 2: 🌸 Her Personality */}
        <ProfileCard
          icon="🌸"
          title="Her Personality"
          subtitle="Daily rhythms & how she unwinds"
          headerAction={
            <button
              type="button"
              onClick={() => onEditSection('habits')}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-0.5 no-print"
            >
              <span>Edit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center justify-between">
              <span className="text-slate-600 text-xs font-medium">Daily Chronotype</span>
              <strong className="text-rose-800 text-sm">{habits.chronotype || fallback}</strong>
            </div>

            {habits.whatCalms && (
              <div>
                <span className="text-xs text-slate-400 block font-medium">Things that calm her:</span>
                <p className="text-slate-800 mt-0.5 font-sans leading-relaxed">{habits.whatCalms}</p>
              </div>
            )}

            {basicDetails.instantHappy && (
              <div>
                <span className="text-xs text-slate-400 block font-medium">Instantly makes her happy:</span>
                <p className="text-slate-800 mt-0.5 font-sans leading-relaxed">{basicDetails.instantHappy}</p>
              </div>
            )}

            {habits.habitToUnderstand && (
              <div>
                <span className="text-xs text-slate-400 block font-medium">Habit she wants me to understand:</span>
                <p className="text-slate-800 mt-0.5 font-sans leading-relaxed italic">“{habits.habitToUnderstand}”</p>
              </div>
            )}
          </div>
        </ProfileCard>

        {/* Card 3: 💕 How She Likes To Be Loved */}
        <ProfileCard
          icon="💕"
          title="How She Likes To Be Loved"
          subtitle="Heart connection & love languages"
          headerAction={
            <button
              type="button"
              onClick={() => onEditSection('love')}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-0.5 no-print"
            >
              <span>Edit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs font-semibold text-rose-600 block mb-1.5">
                Primary Ways She Feels Loved:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {relationship.makesFeelLoved && relationship.makesFeelLoved.length > 0 ? (
                  relationship.makesFeelLoved.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-medium border border-rose-200"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-xs italic">{fallback}</span>
                )}
              </div>
            </div>

            {relationship.whenUpset && relationship.whenUpset.length > 0 && (
              <div>
                <span className="text-xs font-medium text-slate-500 block mb-1.5">
                  When she is upset, she prefers:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {relationship.whenUpset.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {relationship.idealDate && (
              <div>
                <span className="text-xs font-medium text-slate-400 block">Her Ideal Date:</span>
                <p className="text-slate-800 mt-0.5 leading-relaxed">{relationship.idealDate}</p>
              </div>
            )}

            {relationship.partnerShouldRemember && (
              <div className="p-3 rounded-2xl bg-pink-50/70 border border-pink-200/60">
                <span className="text-xs font-semibold text-rose-800 block">Boyfriend Golden Rule:</span>
                <p className="text-rose-900 mt-0.5 italic">“{relationship.partnerShouldRemember}”</p>
              </div>
            )}
          </div>
        </ProfileCard>

        {/* Card 4: 🚫 Things To Avoid */}
        <ProfileCard
          icon="🚫"
          title="Things To Avoid"
          subtitle="Clear boundaries, dislikes & triggers"
          headerAction={
            <button
              type="button"
              onClick={() => onEditSection('likes')}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-0.5 no-print"
            >
              <span>Edit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs font-medium text-slate-500 block">Disliked Foods:</span>
              <p className="text-slate-800 mt-0.5">
                {likesDislikes.dislikedFoods || foodPreferences.dislikedFood || fallback}
              </p>
            </div>

            {likesDislikes.annoysMe && (
              <div>
                <span className="text-xs font-medium text-slate-500 block">Things That Annoy Her:</span>
                <p className="text-slate-800 mt-0.5">{likesDislikes.annoysMe}</p>
              </div>
            )}

            {likesDislikes.hateBeingTold && (
              <div>
                <span className="text-xs font-medium text-slate-500 block">Hates Being Told:</span>
                <p className="text-slate-800 mt-0.5 italic">“{likesDislikes.hateBeingTold}”</p>
              </div>
            )}

            {likesDislikes.makesUncomfortable && (
              <div>
                <span className="text-xs font-medium text-slate-500 block">Makes Her Uncomfortable:</span>
                <p className="text-slate-800 mt-0.5">{likesDislikes.makesUncomfortable}</p>
              </div>
            )}

            {foodPreferences.allergiesOrAvoid && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                <strong className="text-amber-800">Health / Allergies Note: </strong>
                <span className="text-slate-700">{foodPreferences.allergiesOrAvoid}</span>
              </div>
            )}
          </div>
        </ProfileCard>

        {/* Card 5: ✨ Her Dreams */}
        <ProfileCard
          icon="✨"
          title="Her Dreams"
          subtitle="Aspirations, travels & milestones"
          headerAction={
            <button
              type="button"
              onClick={() => onEditSection('dreams')}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-0.5 no-print"
            >
              <span>Edit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-3 text-sm">
            {dreams.biggestDream && (
              <div>
                <span className="text-xs font-semibold text-purple-700 block">Biggest Dream:</span>
                <p className="text-slate-800 mt-0.5 font-romantic text-base italic leading-relaxed">
                  “{dreams.biggestDream}”
                </p>
              </div>
            )}

            {dreams.whereToTravel && (
              <div>
                <span className="text-xs font-medium text-slate-500 block">Dream Travel Places:</span>
                <p className="text-slate-800 mt-0.5">{dreams.whereToTravel}</p>
              </div>
            )}

            {dreams.careerGoal && (
              <div>
                <span className="text-xs font-medium text-slate-500 block">Career Ambitions:</span>
                <p className="text-slate-800 mt-0.5">{dreams.careerGoal}</p>
              </div>
            )}

            {dreams.experienceTogether && (
              <div>
                <span className="text-xs font-medium text-slate-500 block">Experience Together:</span>
                <p className="text-slate-800 mt-0.5">{dreams.experienceTogether}</p>
              </div>
            )}
          </div>
        </ProfileCard>

        {/* Card 6: ⚡ Rapid-Fire Instincts */}
        <ProfileCard
          icon="⚡"
          title="Rapid-Fire Instincts"
          subtitle="Quick preferences & style"
          headerAction={
            <button
              type="button"
              onClick={() => onEditSection('rapid')}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-0.5 no-print"
            >
              <span>Edit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(rapidFire).map(([key, val]) => (
              <div key={key} className="p-2 rounded-xl bg-rose-50/50 border border-rose-100">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="text-rose-900 font-bold mt-0.5 block truncate">
                  {val || fallback}
                </span>
              </div>
            ))}
          </div>
        </ProfileCard>
      </div>

      {/* Card 7: 📅 Important Dates (Full Width Timeline) */}
      <div className="mt-8 avoid-break">
        <ProfileCard
          icon="📅"
          title="Important Dates & Timeline"
          subtitle="Milestones, birthdays, and celebrations we never want to miss"
          headerAction={
            <button
              type="button"
              onClick={() => onEditSection('dates')}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-0.5 no-print"
            >
              <span>Manage Dates</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <DateTimeline dates={importantDates} />
        </ProfileCard>
      </div>

      {/* Card 8: 💕 A Little About Us (Full Width) */}
      {(aboutUs.firstImpression || aboutUs.favoriteMemory || aboutUs.promiseWanted) && (
        <div className="mt-8 avoid-break">
          <ProfileCard
            icon="💞"
            title="A Little About Us"
            subtitle="Our shared journey, favorite memories, and sweet promises"
            headerAction={
              <button
                type="button"
                onClick={() => onEditSection('about')}
                className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-0.5 no-print"
              >
                <span>Edit</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {aboutUs.firstImpression && (
                <div>
                  <span className="text-xs font-semibold text-rose-600 block">First Impression of Me:</span>
                  <p className="text-slate-800 mt-1 leading-relaxed">{aboutUs.firstImpression}</p>
                </div>
              )}

              {aboutUs.favoriteMemory && (
                <div>
                  <span className="text-xs font-semibold text-rose-600 block">Favorite Memory Together:</span>
                  <p className="text-slate-800 mt-1 leading-relaxed">{aboutUs.favoriteMemory}</p>
                </div>
              )}

              {aboutUs.favoriteThingAboutUs && (
                <div>
                  <span className="text-xs font-semibold text-rose-600 block">Favorite Thing About Us:</span>
                  <p className="text-slate-800 mt-1 leading-relaxed">{aboutUs.favoriteThingAboutUs}</p>
                </div>
              )}

              {aboutUs.promiseWanted && (
                <div>
                  <span className="text-xs font-semibold text-rose-600 block">Promise She Wants:</span>
                  <p className="text-slate-800 mt-1 italic leading-relaxed">“{aboutUs.promiseWanted}”</p>
                </div>
              )}
            </div>
          </ProfileCard>
        </div>
      )}

      {/* Footer reassurance & manual metadata */}
      <div className="mt-12 text-center text-xs text-slate-400 space-y-1">
        <p>Know Her ❤️ — Crafted with boundless love and devotion.</p>
        <p>Saved on device • Schema v{metadata.schemaVersion} • Last updated {new Date(metadata.lastUpdated).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
