export interface BasicDetails {
  callName: string; // required, 2-50 chars
  nickname: string; // optional, max 50 chars
  favoriteColor: string;
  favoriteFlower: string;
  favoriteAnimal: string;
  favoriteSeason: string;
  favoritePlace: string;
  instantHappy: string; // required, max 500 chars
}

export interface FoodPreferences {
  favoriteFood: string; // required, 2-100 chars
  favoriteIndianFood: string;
  favoriteSouthIndianFood: string;
  favoriteSnack: string;
  favoriteChocolate: string;
  favoriteIceCream: string;
  favoriteFruit: string;
  favoriteDrink: string;
  favoriteFastFood: string;
  favoriteRestaurant: string;
  favoriteDessert: string;
  eatAnytime: string;
  dislikedFood: string;
  allergiesOrAvoid: string; // optional, max 500 chars
}

export type Chronotype = 'Morning Person 🌅' | 'Night Owl 🌙' | 'Somewhere in Between' | '';

export interface DailyHabits {
  chronotype: Chronotype; // required
  wakeTime: string;
  sleepTime: string;
  whenStressed: string;
  whenSad: string;
  whatCalms: string;
  callsOrText: string;
  talkFrequency: string;
  togetherVsSpace: string;
  habitToUnderstand: string;
  annoysQuickly: string;
  makesFeelLovedHabit: string;
}

export interface LoveRelationship {
  loveLanguage: string;
  feelAppreciated: string;
  likeSurprises: string;
  likeGifts: string;
  likeNotes: string;
  likeLongCalls: string;
  likeDates: string;
  idealDate: string;
  feelSpecial: string;
  neverForget: string;
  whenUpset: string[]; // multi-select, max 3
  makesFeelLoved: string[]; // required, min 1, max 3
  partnerShouldRemember: string;
}

export type DateCategory =
  | 'Birthday 🎂'
  | 'Anniversary ❤️'
  | 'Family 👨‍👩‍👧‍👦'
  | 'Friendship 🫶'
  | 'College 🎓'
  | 'Personal 🌸'
  | 'Other ⭐';

export interface ImportantDate {
  id: string;
  date: string; // YYYY-MM-DD
  eventName: string; // required, 2-100 chars
  whyImportant: string; // optional, <=300 chars
  reminderNote: string; // optional, <=300 chars
  category: DateCategory;
}

export interface LikesDislikes {
  // Things I Love
  favoriteMovie: string;
  favoriteSeries: string;
  favoriteSong: string;
  favoriteSinger: string;
  favoriteActor: string;
  favoriteActress: string;
  favoriteBook: string;
  favoriteHobby: string;
  favoriteGame: string;
  favoriteSocialMedia: string;
  // Things I Don't Like
  dislikedFoods: string;
  annoysMe: string;
  hateBeingTold: string;
  makesUncomfortable: string;
  dontEnjoyDoing: string;
}

export interface Dreams {
  biggestDream: string;
  whereToTravel: string;
  careerGoal: string;
  wantToAchieve: string;
  experienceTogether: string;
  dreamVacation: string;
  alwaysWantedToTry: string;
}

export interface AboutUs {
  firstImpression: string;
  favoriteMemory: string;
  favoriteThingAboutUs: string;
  wantToDoTogether: string;
  kindOfDates: string;
  visitTogether: string;
  memoryToCreate: string;
  wishUnderstoodBetter: string;
  promiseWanted: string;
}

export interface RapidFireAnswers {
  teaOrCoffee: 'Tea ☕' | 'Coffee ☕' | '';
  callOrText: 'Call 📞' | 'Text 💬' | '';
  beachOrMountains: 'Beach 🏖️' | 'Mountains 🏔️' | '';
  sunriseOrSunset: 'Sunrise 🌅' | 'Sunset 🌇' | '';
  sweetOrSpicy: 'Sweet 🍫' | 'Spicy 🌶️' | '';
  movieOrSeries: 'Movie 🎬' | 'Series 📺' | '';
  stayHomeOrGoOut: 'Stay Home 🏠' | 'Go Out 🌃' | '';
  longDriveOrLongWalk: 'Long Drive 🚗' | 'Long Walk 🚶‍♀️' | '';
  giftsOrQualityTime: 'Gifts 🎁' | 'Quality Time ❤️' | '';
}

export interface ProfileMetadata {
  schemaVersion: string;
  lastUpdated: string;
  isCompleted: boolean;
  currentStep: number;
  isDemo?: boolean;
}

export interface UserProfile {
  basicDetails: BasicDetails;
  foodPreferences: FoodPreferences;
  habits: DailyHabits;
  relationship: LoveRelationship;
  importantDates: ImportantDate[];
  likesDislikes: LikesDislikes;
  dreams: Dreams;
  aboutUs: AboutUs;
  rapidFire: RapidFireAnswers;
  metadata: ProfileMetadata;
}

export type StepId =
  | 'landing'
  | 'basic'
  | 'food'
  | 'habits'
  | 'love'
  | 'dates'
  | 'likes'
  | 'dreams'
  | 'about'
  | 'rapid'
  | 'review'
  | 'final'
  | 'manual';

export interface SectionMeta {
  id: StepId;
  stepNumber: number; // 1 to 9 for questionnaire steps
  title: string;
  shortTitle: string;
  emoji: string;
  subtitle: string;
}

export interface ValidationErrors {
  [key: string]: string;
}
