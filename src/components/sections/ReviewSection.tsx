import React from 'react';
import { UserProfile, StepId } from '../../types/questionnaire';
import { SectionHeader } from '../common/SectionHeader';
import { Edit3, Heart } from 'lucide-react';

interface ReviewSectionProps {
  profile: UserProfile;
  onEditSection: (stepId: StepId) => void;
  onSubmit: () => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  profile,
  onEditSection,
  onSubmit,
}) => {
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
  } = profile;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
      <SectionHeader
        badge="Review & Confirmation"
        title="One Last Look ❤️"
        subtitle="Review everything you've shared. If anything needs adjusting, just tap the Edit button beside that section."
      />

      <div className="space-y-6">
        {/* Section 1: Basic Details */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-rose-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-100">
            <h3 className="font-editorial text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>🌸</span>
              <span>A Little About You</span>
            </h3>
            <button
              type="button"
              onClick={() => onEditSection('basic')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit ✏️</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-slate-400 block">Name to call you</span>
              <strong className="text-slate-800">{basicDetails.callName || '—'}</strong>
            </div>
            {basicDetails.nickname && (
              <div>
                <span className="text-xs text-slate-400 block">Nickname</span>
                <span className="text-slate-800 font-medium">{basicDetails.nickname}</span>
              </div>
            )}
            {basicDetails.favoriteColor && (
              <div>
                <span className="text-xs text-slate-400 block">Favorite Color</span>
                <span className="text-slate-800">{basicDetails.favoriteColor}</span>
              </div>
            )}
            {basicDetails.favoriteFlower && (
              <div>
                <span className="text-xs text-slate-400 block">Favorite Flower</span>
                <span className="text-slate-800">{basicDetails.favoriteFlower}</span>
              </div>
            )}
            {basicDetails.favoriteAnimal && (
              <div>
                <span className="text-xs text-slate-400 block">Favorite Animal</span>
                <span className="text-slate-800">{basicDetails.favoriteAnimal}</span>
              </div>
            )}
            {basicDetails.favoriteSeason && (
              <div>
                <span className="text-xs text-slate-400 block">Favorite Season</span>
                <span className="text-slate-800">{basicDetails.favoriteSeason}</span>
              </div>
            )}
            {basicDetails.favoritePlace && (
              <div className="sm:col-span-2">
                <span className="text-xs text-slate-400 block">Favorite Place</span>
                <span className="text-slate-800">{basicDetails.favoritePlace}</span>
              </div>
            )}
            <div className="sm:col-span-2 bg-rose-50/60 p-3 rounded-2xl border border-rose-100">
              <span className="text-xs text-rose-700 font-medium block">Instantly makes her happy</span>
              <p className="text-slate-800 mt-0.5">{basicDetails.instantHappy || '—'}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Favorite Foods */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-rose-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-100">
            <h3 className="font-editorial text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>😋</span>
              <span>Favorite Foods & Treats</span>
            </h3>
            <button
              type="button"
              onClick={() => onEditSection('food')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit ✏️</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="sm:col-span-2">
              <span className="text-xs text-rose-500 font-semibold block">Ultimate Favorite Food</span>
              <strong className="text-base text-slate-900">{foodPreferences.favoriteFood || '—'}</strong>
            </div>
            {foodPreferences.favoriteSnack && (
              <div>
                <span className="text-xs text-slate-400 block">Favorite Snack</span>
                <span className="text-slate-800">{foodPreferences.favoriteSnack}</span>
              </div>
            )}
            {foodPreferences.favoriteChocolate && (
              <div>
                <span className="text-xs text-slate-400 block">Favorite Chocolate</span>
                <span className="text-slate-800">{foodPreferences.favoriteChocolate}</span>
              </div>
            )}
            {foodPreferences.favoriteDrink && (
              <div>
                <span className="text-xs text-slate-400 block">Favorite Drink</span>
                <span className="text-slate-800">{foodPreferences.favoriteDrink}</span>
              </div>
            )}
            {foodPreferences.favoriteDessert && (
              <div>
                <span className="text-xs text-slate-400 block">Favorite Dessert</span>
                <span className="text-slate-800">{foodPreferences.favoriteDessert}</span>
              </div>
            )}
            {foodPreferences.dislikedFood && (
              <div>
                <span className="text-xs text-red-500 font-medium block">Disliked Foods</span>
                <span className="text-slate-800">{foodPreferences.dislikedFood}</span>
              </div>
            )}
            {foodPreferences.allergiesOrAvoid && (
              <div className="sm:col-span-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs">
                <strong className="text-amber-800">Allergies / Avoid: </strong>
                <span className="text-slate-700">{foodPreferences.allergiesOrAvoid}</span>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Daily Habits */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-rose-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-100">
            <h3 className="font-editorial text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>🌷</span>
              <span>Daily Habits & Recharge</span>
            </h3>
            <button
              type="button"
              onClick={() => onEditSection('habits')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit ✏️</span>
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs text-slate-400 block">Chronotype</span>
              <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-semibold text-xs">
                {habits.chronotype || 'Not specified'}
              </span>
            </div>
            {habits.whenSad && (
              <div>
                <span className="text-xs text-slate-400 block">When sad</span>
                <p className="text-slate-800 mt-0.5">{habits.whenSad}</p>
              </div>
            )}
            {habits.whatCalms && (
              <div>
                <span className="text-xs text-slate-400 block">What calms her</span>
                <p className="text-slate-800 mt-0.5">{habits.whatCalms}</p>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Love & Relationship */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-rose-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-100">
            <h3 className="font-editorial text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>❤️</span>
              <span>Love & Relationship</span>
            </h3>
            <button
              type="button"
              onClick={() => onEditSection('love')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit ✏️</span>
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <span className="text-xs text-rose-600 font-semibold block mb-1">
                What makes her feel loved
              </span>
              <div className="flex flex-wrap gap-2">
                {relationship.makesFeelLoved && relationship.makesFeelLoved.length > 0 ? (
                  relationship.makesFeelLoved.map((l) => (
                    <span
                      key={l}
                      className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-medium border border-rose-200"
                    >
                      {l}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 italic">None selected</span>
                )}
              </div>
            </div>

            {relationship.whenUpset && relationship.whenUpset.length > 0 && (
              <div>
                <span className="text-xs text-slate-500 font-medium block mb-1">
                  When she's upset
                </span>
                <div className="flex flex-wrap gap-2">
                  {relationship.whenUpset.map((u) => (
                    <span
                      key={u}
                      className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs"
                    >
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {relationship.idealDate && (
              <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                <span className="text-xs text-rose-700 font-semibold block">Ideal Date</span>
                <p className="text-slate-800 mt-0.5">{relationship.idealDate}</p>
              </div>
            )}
          </div>
        </div>

        {/* Section 5: Important Dates */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-rose-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-100">
            <h3 className="font-editorial text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>🗓️</span>
              <span>Important Dates ({importantDates.length})</span>
            </h3>
            <button
              type="button"
              onClick={() => onEditSection('dates')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit ✏️</span>
            </button>
          </div>

          {importantDates.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No dates added yet.</p>
          ) : (
            <div className="space-y-2">
              {importantDates.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-rose-100 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-rose-600 font-bold">{d.date}</span>
                    <strong className="text-slate-800">{d.eventName}</strong>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-medium">
                    {d.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 6: Likes & Dislikes */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-rose-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-100">
            <h3 className="font-editorial text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>💗</span>
              <span>Likes & Dislikes</span>
            </h3>
            <button
              type="button"
              onClick={() => onEditSection('likes')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit ✏️</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {likesDislikes.favoriteMovie && (
              <div>
                <span className="text-slate-400 block">Favorite Movie:</span>
                <span className="font-medium text-slate-800">{likesDislikes.favoriteMovie}</span>
              </div>
            )}
            {likesDislikes.favoriteSong && (
              <div>
                <span className="text-slate-400 block">Favorite Song:</span>
                <span className="font-medium text-slate-800">{likesDislikes.favoriteSong}</span>
              </div>
            )}
            {likesDislikes.favoriteHobby && (
              <div>
                <span className="text-slate-400 block">Favorite Hobby:</span>
                <span className="font-medium text-slate-800">{likesDislikes.favoriteHobby}</span>
              </div>
            )}
            {likesDislikes.annoysMe && (
              <div>
                <span className="text-slate-400 block">Annoys Her:</span>
                <span className="font-medium text-slate-800">{likesDislikes.annoysMe}</span>
              </div>
            )}
          </div>
        </div>

        {/* Section 7: Dreams */}
        {(dreams.biggestDream || dreams.whereToTravel) && (
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-rose-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-100">
              <h3 className="font-editorial text-xl font-bold text-slate-800 flex items-center gap-2">
                <span>🌙</span>
                <span>Her Dreams</span>
              </h3>
              <button
                type="button"
                onClick={() => onEditSection('dreams')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 cursor-pointer transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit ✏️</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {dreams.biggestDream && (
                <div>
                  <span className="text-slate-400 block">Biggest Dream:</span>
                  <p className="text-slate-800 font-romantic text-sm italic">{dreams.biggestDream}</p>
                </div>
              )}
              {dreams.whereToTravel && (
                <div>
                  <span className="text-slate-400 block">Dream Travel:</span>
                  <span className="text-slate-800 font-medium">{dreams.whereToTravel}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 8: About Us */}
        {(aboutUs.favoriteMemory || aboutUs.promiseWanted) && (
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-rose-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-100">
              <h3 className="font-editorial text-xl font-bold text-slate-800 flex items-center gap-2">
                <span>💕</span>
                <span>A Little About Us</span>
              </h3>
              <button
                type="button"
                onClick={() => onEditSection('about')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 cursor-pointer transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit ✏️</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {aboutUs.favoriteMemory && (
                <div>
                  <span className="text-slate-400 block">Favorite Memory:</span>
                  <p className="text-slate-800">{aboutUs.favoriteMemory}</p>
                </div>
              )}
              {aboutUs.promiseWanted && (
                <div>
                  <span className="text-slate-400 block">Promise Wanted:</span>
                  <p className="text-slate-800 italic">“{aboutUs.promiseWanted}”</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 9: Rapid Fire */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-rose-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-100">
            <h3 className="font-editorial text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>⚡</span>
              <span>Rapid-Fire Instincts</span>
            </h3>
            <button
              type="button"
              onClick={() => onEditSection('rapid')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit ✏️</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            {Object.entries(rapidFire).map(([key, val]) => (
              <div key={key} className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-100 text-center">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="text-rose-900 font-bold mt-0.5 block">
                  {val || 'Not chosen'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Action Bar */}
      <div className="mt-12 text-center pt-8 border-t border-rose-100">
        <p className="font-romantic text-xl text-rose-800 italic font-semibold mb-4">
          Everything looks good ❤️
        </p>

        <button
          type="button"
          onClick={onSubmit}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-lg shadow-xl shadow-rose-500/30 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center justify-center gap-3 cursor-pointer"
        >
          <Heart className="w-6 h-6 fill-white animate-pulse-subtle" />
          <span>Save My Answers</span>
        </button>
      </div>
    </div>
  );
};
