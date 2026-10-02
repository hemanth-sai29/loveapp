import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, StepId, ValidationErrors } from './types/questionnaire';
import {
  QUESTIONNAIRE_SECTIONS,
  INITIAL_EMPTY_PROFILE,
} from './utils/constants';
import {
  loadProfileFromStorage,
  saveProfileToStorage,
  clearProfileFromStorage,
  getDemoProfile,
  getEmptyProfile,
} from './utils/storage';
import { validateStep, scrollToFirstError } from './utils/validation';

// Common Components
import { Header } from './components/common/Header';
import { ProgressBar } from './components/common/ProgressBar';
import { FloatingHearts } from './components/common/FloatingHearts';
import { PrivacyNotice } from './components/common/PrivacyNotice';
import { WelcomeBackModal } from './components/common/WelcomeBackModal';
import { ConfirmModal } from './components/common/ConfirmModal';
import { LockScreen } from './components/security/LockScreen';
import { SecurityModal } from './components/security/SecurityModal';
import { isAppUnlocked, checkUrlMagicKey } from './utils/security';

// Section Components
import { LandingPage } from './components/sections/LandingPage';
import { BasicDetailsSection } from './components/sections/BasicDetailsSection';
import { FoodPreferencesSection } from './components/sections/FoodPreferencesSection';
import { DailyHabitsSection } from './components/sections/DailyHabitsSection';
import { LoveRelationshipSection } from './components/sections/LoveRelationshipSection';
import { ImportantDatesSection } from './components/sections/ImportantDatesSection';
import { LikesDislikesSection } from './components/sections/LikesDislikesSection';
import { DreamsSection } from './components/sections/DreamsSection';
import { AboutUsSection } from './components/sections/AboutUsSection';
import { RapidFireSection } from './components/sections/RapidFireSection';
import { ReviewSection } from './components/sections/ReviewSection';
import { FinalMessageSection } from './components/sections/FinalMessageSection';
import { ProfileDashboard } from './components/profile/ProfileDashboard';

export function App() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_EMPTY_PROFILE);
  const [currentStep, setCurrentStep] = useState<StepId>('landing');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [savedLastTime, setSavedLastTime] = useState<string | undefined>(undefined);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });
  const [saveIndicatorText, setSaveIndicatorText] = useState('Autosaved');

  // Security & Link-only Access State
  const [isLocked, setIsLocked] = useState<boolean>(() => {
    // Check if URL has valid magic key (?key=... or ?passcode=...)
    const unlockedViaMagicUrl = checkUrlMagicKey();
    if (unlockedViaMagicUrl) return false;
    return !isAppUnlocked();
  });
  const [securityModalOpen, setSecurityModalOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadProfileFromStorage();
    if (saved) {
      setProfile(saved);
      setSavedLastTime(saved.metadata.lastUpdated);

      // If user had previous progress, show the welcome modal
      const hasMeaningfulData =
        !!saved.basicDetails.callName ||
        saved.importantDates.length > 0 ||
        saved.metadata.isCompleted;

      if (hasMeaningfulData) {
        setWelcomeModalOpen(true);
      }
    }
  }, []);

  // Autosave to localStorage on profile change
  const updateProfileAndSave = useCallback((updater: (prev: UserProfile) => UserProfile) => {
    setProfile((prev) => {
      const next = updater(prev);
      saveProfileToStorage(next);
      setSaveIndicatorText('Saved just now');
      return next;
    });
  }, []);

  // Reset toast indicator after a short interval
  useEffect(() => {
    if (saveIndicatorText === 'Saved just now') {
      const timer = setTimeout(() => {
        setSaveIndicatorText('Autosaved');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [saveIndicatorText]);

  // Map step IDs to step numbers (1-9)
  const stepIdToNumber = (id: StepId): number => {
    const found = QUESTIONNAIRE_SECTIONS.find((s) => s.id === id);
    return found ? found.stepNumber : 1;
  };

  const stepNumberToId = (num: number): StepId => {
    const found = QUESTIONNAIRE_SECTIONS.find((s) => s.stepNumber === num);
    return found ? found.id : 'basic';
  };

  // Step navigation with validation
  const goToNextStep = (stepNumber: number) => {
    // Clear existing errors
    setErrors({});

    // Validate current step
    const errs = validateStep(stepNumber, profile);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      scrollToFirstError(errs);
      return;
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (stepNumber >= 9) {
      // Completed all 9 sections -> go to review
      setCurrentStep('review');
    } else {
      const nextStepId = stepNumberToId(stepNumber + 1);
      setCurrentStep(nextStepId);
    }
  };

  const goToPrevStep = (stepNumber: number) => {
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (stepNumber <= 1) {
      setCurrentStep('landing');
    } else {
      setCurrentStep(stepNumberToId(stepNumber - 1));
    }
  };

  // Jump directly to step
  const handleJumpToStep = (targetStepNumber: number) => {
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(stepNumberToId(targetStepNumber));
  };

  // Final submission from review page
  const handleFinalSubmit = () => {
    updateProfileAndSave((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        isCompleted: true,
      },
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep('final');
  };

  // Restart questionnaire handler
  const handleRequestRestart = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Restart Questionnaire?',
      message:
        'This will clear your currently entered answers so you can start fresh. Are you sure?',
      onConfirm: () => {
        clearProfileFromStorage();
        setProfile(getEmptyProfile());
        setCurrentStep('landing');
        setErrors({});
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Load realistic demo profile
  const handleLoadDemo = () => {
    const demo = getDemoProfile();
    setProfile(demo);
    saveProfileToStorage(demo);
    setCurrentStep('manual');
    setErrors({});
  };

  // Check if current step is in questionnaire
  const currentStepNum = stepIdToNumber(currentStep);
  const isQuestionnaireStep =
    currentStep !== 'landing' &&
    currentStep !== 'review' &&
    currentStep !== 'final' &&
    currentStep !== 'manual';

  const hasAnswers =
    !!profile.basicDetails.callName ||
    profile.importantDates.length > 0 ||
    profile.metadata.isCompleted ||
    !!profile.foodPreferences.favoriteFood;

  // If app is locked, present private lock screen
  if (isLocked) {
    return <LockScreen onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBFB] text-slate-800 relative selection:bg-rose-200 selection:text-rose-900">
      {/* Subtle Floating Hearts and Sparkles Background */}
      <FloatingHearts count={14} />

      {/* Persistent Romantic Header */}
      <Header
        currentStep={currentStep}
        onNavigate={(step) => {
          setErrors({});
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentStep(step);
        }}
        onReset={handleRequestRestart}
        onLoadDemo={handleLoadDemo}
        onOpenSecurity={() => setSecurityModalOpen(true)}
        isDemo={!!profile.metadata.isDemo}
        hasAnswers={hasAnswers}
        lastSavedText={saveIndicatorText}
      />

      {/* Questionnaire Progress Indicator */}
      {isQuestionnaireStep && (
        <div className="sticky top-16 z-30 bg-[#FFFBFB]/95 backdrop-blur-md border-b border-rose-100/60 no-print">
          <ProgressBar
            currentStepIndex={currentStepNum}
            totalSteps={9}
            onStepClick={(step) => handleJumpToStep(step)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {/* Landing Page */}
        {currentStep === 'landing' && (
          <LandingPage
            onStart={() => {
              setErrors({});
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentStep('basic');
            }}
            onPreviewDemo={handleLoadDemo}
            onViewManual={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentStep('manual');
            }}
            hasExistingAnswers={hasAnswers}
            girlfriendName={profile.basicDetails.callName}
          />
        )}

        {/* Step 1: Basic Details */}
        {currentStep === 'basic' && (
          <BasicDetailsSection
            data={profile.basicDetails}
            onChange={(fields) =>
              updateProfileAndSave((prev) => ({
                ...prev,
                basicDetails: { ...prev.basicDetails, ...fields },
              }))
            }
            onNext={() => goToNextStep(1)}
            onPrev={() => goToPrevStep(1)}
            onSave={() => setSaveIndicatorText('Saved just now')}
            errors={errors}
          />
        )}

        {/* Step 2: Food Preferences */}
        {currentStep === 'food' && (
          <FoodPreferencesSection
            data={profile.foodPreferences}
            onChange={(fields) =>
              updateProfileAndSave((prev) => ({
                ...prev,
                foodPreferences: { ...prev.foodPreferences, ...fields },
              }))
            }
            onNext={() => goToNextStep(2)}
            onPrev={() => goToPrevStep(2)}
            onSave={() => setSaveIndicatorText('Saved just now')}
            errors={errors}
          />
        )}

        {/* Step 3: Daily Habits */}
        {currentStep === 'habits' && (
          <DailyHabitsSection
            data={profile.habits}
            onChange={(fields) =>
              updateProfileAndSave((prev) => ({
                ...prev,
                habits: { ...prev.habits, ...fields },
              }))
            }
            onNext={() => goToNextStep(3)}
            onPrev={() => goToPrevStep(3)}
            onSave={() => setSaveIndicatorText('Saved just now')}
            errors={errors}
          />
        )}

        {/* Step 4: Love & Relationship */}
        {currentStep === 'love' && (
          <LoveRelationshipSection
            data={profile.relationship}
            onChange={(fields) =>
              updateProfileAndSave((prev) => ({
                ...prev,
                relationship: { ...prev.relationship, ...fields },
              }))
            }
            onNext={() => goToNextStep(4)}
            onPrev={() => goToPrevStep(4)}
            onSave={() => setSaveIndicatorText('Saved just now')}
            errors={errors}
          />
        )}

        {/* Step 5: Important Dates */}
        {currentStep === 'dates' && (
          <ImportantDatesSection
            dates={profile.importantDates}
            onChange={(newDates) =>
              updateProfileAndSave((prev) => ({
                ...prev,
                importantDates: newDates,
              }))
            }
            onNext={() => goToNextStep(5)}
            onPrev={() => goToPrevStep(5)}
            onSave={() => setSaveIndicatorText('Saved just now')}
            errors={errors}
          />
        )}

        {/* Step 6: Likes & Dislikes */}
        {currentStep === 'likes' && (
          <LikesDislikesSection
            data={profile.likesDislikes}
            onChange={(fields) =>
              updateProfileAndSave((prev) => ({
                ...prev,
                likesDislikes: { ...prev.likesDislikes, ...fields },
              }))
            }
            onNext={() => goToNextStep(6)}
            onPrev={() => goToPrevStep(6)}
            onSave={() => setSaveIndicatorText('Saved just now')}
            errors={errors}
          />
        )}

        {/* Step 7: Dreams */}
        {currentStep === 'dreams' && (
          <DreamsSection
            data={profile.dreams}
            onChange={(fields) =>
              updateProfileAndSave((prev) => ({
                ...prev,
                dreams: { ...prev.dreams, ...fields },
              }))
            }
            onNext={() => goToNextStep(7)}
            onPrev={() => goToPrevStep(7)}
            onSave={() => setSaveIndicatorText('Saved just now')}
            errors={errors}
          />
        )}

        {/* Step 8: About Us */}
        {currentStep === 'about' && (
          <AboutUsSection
            data={profile.aboutUs}
            onChange={(fields) =>
              updateProfileAndSave((prev) => ({
                ...prev,
                aboutUs: { ...prev.aboutUs, ...fields },
              }))
            }
            onNext={() => goToNextStep(8)}
            onPrev={() => goToPrevStep(8)}
            onSave={() => setSaveIndicatorText('Saved just now')}
            errors={errors}
          />
        )}

        {/* Step 9: Rapid Fire */}
        {currentStep === 'rapid' && (
          <RapidFireSection
            data={profile.rapidFire}
            onChange={(fields) =>
              updateProfileAndSave((prev) => ({
                ...prev,
                rapidFire: { ...prev.rapidFire, ...fields },
              }))
            }
            onNext={() => goToNextStep(9)}
            onPrev={() => goToPrevStep(9)}
            onSave={() => setSaveIndicatorText('Saved just now')}
            errors={errors}
          />
        )}

        {/* Step 10: Review Answers */}
        {currentStep === 'review' && (
          <ReviewSection
            profile={profile}
            onEditSection={(sectionId) => {
              setErrors({});
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentStep(sectionId);
            }}
            onSubmit={handleFinalSubmit}
          />
        )}

        {/* Step 11: Final Message Screen */}
        {currentStep === 'final' && (
          <FinalMessageSection
            profile={profile}
            onOpenManual={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentStep('manual');
            }}
          />
        )}

        {/* Step 12: Her User Manual */}
        {currentStep === 'manual' && (
          <ProfileDashboard
            profile={profile}
            onEditSection={(sectionId) => {
              setErrors({});
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentStep(sectionId);
            }}
            onRestart={handleRequestRestart}
          />
        )}

        {/* Privacy Notice on Questionnaire and Landing pages */}
        {currentStep !== 'manual' && currentStep !== 'final' && (
          <PrivacyNotice />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-xs text-slate-400 border-t border-rose-100/60 no-print">
        <p className="font-romantic text-sm text-slate-500">
          Know Her ❤️ — “A little digital book about the girl I love.”
        </p>
        <p className="mt-1">
          Handcrafted with devotion. All answers remain completely private on your device.
        </p>
      </footer>

      {/* Welcome Back Modal */}
      <WelcomeBackModal
        isOpen={welcomeModalOpen}
        girlfriendName={profile.basicDetails.callName}
        lastUpdated={savedLastTime}
        onContinue={() => {
          setWelcomeModalOpen(false);
          // If completed, go to manual, else go to basic
          if (profile.metadata.isCompleted) {
            setCurrentStep('manual');
          } else {
            setCurrentStep('basic');
          }
        }}
        onStartOver={() => {
          setWelcomeModalOpen(false);
          handleRequestRestart();
        }}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Security & Link-only Access Modal */}
      <SecurityModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
        onLockNow={() => setIsLocked(true)}
      />
    </div>
  );
}

export default App;
