import { UserProfile } from '../types/questionnaire';
import { STORAGE_KEY, INITIAL_EMPTY_PROFILE, SAMPLE_DEMO_PROFILE } from './constants';
import { obfuscateData, deobfuscateData, getSecurityConfig } from './security';

export const loadProfileFromStorage = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    let jsonStr = raw;
    // Check if stored data is obfuscated
    if (!raw.trim().startsWith('{')) {
      jsonStr = deobfuscateData(raw);
    }

    const parsed = JSON.parse(jsonStr);
    if (parsed && typeof parsed === 'object' && parsed.basicDetails) {
      // Merge with initial template in case schema added new fields
      return {
        ...INITIAL_EMPTY_PROFILE,
        ...parsed,
        basicDetails: { ...INITIAL_EMPTY_PROFILE.basicDetails, ...(parsed.basicDetails || {}) },
        foodPreferences: { ...INITIAL_EMPTY_PROFILE.foodPreferences, ...(parsed.foodPreferences || {}) },
        habits: { ...INITIAL_EMPTY_PROFILE.habits, ...(parsed.habits || {}) },
        relationship: {
          ...INITIAL_EMPTY_PROFILE.relationship,
          ...(parsed.relationship || {}),
          whenUpset: parsed.relationship?.whenUpset || [],
          makesFeelLoved: parsed.relationship?.makesFeelLoved || [],
        },
        importantDates: parsed.importantDates || [],
        likesDislikes: { ...INITIAL_EMPTY_PROFILE.likesDislikes, ...(parsed.likesDislikes || {}) },
        dreams: { ...INITIAL_EMPTY_PROFILE.dreams, ...(parsed.dreams || {}) },
        aboutUs: { ...INITIAL_EMPTY_PROFILE.aboutUs, ...(parsed.aboutUs || {}) },
        rapidFire: { ...INITIAL_EMPTY_PROFILE.rapidFire, ...(parsed.rapidFire || {}) },
        metadata: {
          ...INITIAL_EMPTY_PROFILE.metadata,
          ...(parsed.metadata || {}),
        },
      };
    }
  } catch (err) {
    console.error('Error loading saved profile from localStorage:', err);
  }
  return null;
};

export const saveProfileToStorage = (profile: UserProfile): boolean => {
  try {
    const updated: UserProfile = {
      ...profile,
      metadata: {
        ...profile.metadata,
        lastUpdated: new Date().toISOString(),
      },
    };
    const jsonStr = JSON.stringify(updated);
    const config = getSecurityConfig();
    const finalStored = config.obfuscateStorage ? obfuscateData(jsonStr) : jsonStr;
    localStorage.setItem(STORAGE_KEY, finalStored);
    return true;
  } catch (err) {
    console.error('Error saving profile to localStorage:', err);
    return false;
  }
};

export const clearProfileFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing profile from localStorage:', err);
  }
};

export const exportProfileAsJSON = (profile: UserProfile): void => {
  try {
    const herName = profile.basicDetails.callName?.trim() || 'her';
    const cleanFileName = `know_her_${herName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_profile.json`;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', cleanFileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  } catch (err) {
    console.error('Failed to export profile JSON:', err);
    alert('Something went wrong exporting your answers, but your answers are safe on your device ❤️');
  }
};

export const getDemoProfile = (): UserProfile => {
  return JSON.parse(JSON.stringify(SAMPLE_DEMO_PROFILE));
};

export const getEmptyProfile = (): UserProfile => {
  return JSON.parse(JSON.stringify(INITIAL_EMPTY_PROFILE));
};
