import { UserProfile, ValidationErrors, ImportantDate } from '../types/questionnaire';
import { RAPID_FIRE_QUESTIONS } from './constants';

export const validateStep = (stepNumber: number, profile: UserProfile): ValidationErrors => {
  const errors: ValidationErrors = {};

  switch (stepNumber) {
    case 1: { // Basic Details
      const callName = profile.basicDetails.callName?.trim() || '';
      if (!callName) {
        errors.callName = "Tell me what you'd like me to call you ❤️";
      } else if (callName.length < 2) {
        errors.callName = "A name should be at least 2 characters long ❤️";
      } else if (callName.length > 50) {
        errors.callName = "Please keep this under 50 characters ❤️";
      }

      if (profile.basicDetails.nickname && profile.basicDetails.nickname.length > 50) {
        errors.nickname = "Nickname should be under 50 characters";
      }

      const instantHappy = profile.basicDetails.instantHappy?.trim() || '';
      if (!instantHappy) {
        errors.instantHappy = "Tell me at least one little thing that brings a smile to your face ❤️";
      } else if (instantHappy.length > 500) {
        errors.instantHappy = "Please keep this under 500 characters ❤️";
      }
      break;
    }

    case 2: { // Favorite Foods
      const favoriteFood = profile.foodPreferences.favoriteFood?.trim() || '';
      if (!favoriteFood) {
        errors.favoriteFood = "Okay, this one is important 😋 What's your favorite food?";
      } else if (favoriteFood.length < 2) {
        errors.favoriteFood = "Please enter at least 2 characters 😋";
      } else if (favoriteFood.length > 100) {
        errors.favoriteFood = "Please keep this under 100 characters 😋";
      }

      if (profile.foodPreferences.allergiesOrAvoid && profile.foodPreferences.allergiesOrAvoid.length > 500) {
        errors.allergiesOrAvoid = "Please keep allergies/avoid note under 500 characters";
      }
      break;
    }

    case 3: { // Daily Habits
      if (!profile.habits.chronotype) {
        errors.chronotype = "Are you an early bird or a night owl? Pick whichever fits you best 🌅🌙";
      }
      break;
    }

    case 4: { // Love & Relationship
      const makesLoved = profile.relationship.makesFeelLoved || [];
      if (makesLoved.length === 0) {
        errors.makesFeelLoved = "Choose at least one — I want to understand how you feel loved ❤️";
      } else if (makesLoved.length > 3) {
        errors.makesFeelLoved = "Please select up to 3 favorites that resonate most ❤️";
      }

      const whenUpset = profile.relationship.whenUpset || [];
      if (whenUpset.length > 3) {
        errors.whenUpset = "Please select up to 3 options ❤️";
      }
      break;
    }

    case 5: { // Important Dates
      // Dates section allows continuing with 0 or more dates,
      // but individual dates added must be valid.
      // Validation for adding a date is handled in validateDateItem.
      break;
    }

    case 6: { // Likes & Dislikes
      // Character limit safeguards
      break;
    }

    case 7: { // Dreams
      // Character limits
      break;
    }

    case 8: { // About Us
      // Optional fields
      break;
    }

    case 9: { // Rapid Fire
      RAPID_FIRE_QUESTIONS.forEach((q) => {
        const val = profile.rapidFire[q.id as keyof typeof profile.rapidFire];
        if (!val) {
          errors[q.id] = "Pick one 😊";
        }
      });
      break;
    }

    default:
      break;
  }

  return errors;
};

export const validateDateItem = (
  date: string,
  eventName: string,
  whyImportant?: string,
  reminderNote?: string,
  existingDates: ImportantDate[] = [],
  currentEditingId?: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!date || !date.trim()) {
    errors.date = "Please select a valid date 🗓️";
  }

  const trimmedEvent = eventName?.trim() || '';
  if (!trimmedEvent) {
    errors.eventName = "Please give this special date a name ❤️";
  } else if (trimmedEvent.length < 2) {
    errors.eventName = "Event name must be at least 2 characters long";
  } else if (trimmedEvent.length > 100) {
    errors.eventName = "Event name must be under 100 characters";
  }

  // Prevent exact duplicate date + event name
  if (date && trimmedEvent) {
    const isDuplicate = existingDates.some(
      (item) =>
        item.id !== currentEditingId &&
        item.date === date &&
        item.eventName.trim().toLowerCase() === trimmedEvent.toLowerCase()
    );
    if (isDuplicate) {
      errors.eventName = "You've already added this exact date & event combination 🗓️";
    }
  }

  if (whyImportant && whyImportant.length > 300) {
    errors.whyImportant = "Please keep this note under 300 characters";
  }

  if (reminderNote && reminderNote.length > 300) {
    errors.reminderNote = "Please keep reminder note under 300 characters";
  }

  return errors;
};

export const scrollToFirstError = (errors: ValidationErrors) => {
  const firstErrorKey = Object.keys(errors)[0];
  if (!firstErrorKey) return;

  const element = document.getElementById(`field-${firstErrorKey}`) ||
                  document.querySelector(`[name="${firstErrorKey}"]`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.focus();
  }
};
