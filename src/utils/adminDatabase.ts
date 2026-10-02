import { UserProfile } from '../types/questionnaire';

export interface StoredSubmission {
  id: string;
  submittedAt: string;
  deviceInfo?: string;
  profile: UserProfile;
}

const ADMIN_STORAGE_KEY = 'know_her_admin_submissions_v1';
const ADMIN_AUTH_KEY = 'know_her_admin_session_v1';
const ADMIN_PASS_KEY = 'know_her_admin_password_v1';
const DEFAULT_ADMIN_PASS = 'admin777';

// Dedicated cloud synchronization channel for hemanth-sai29's loveapp
const DEFAULT_CLOUD_TOPIC = 'loveapp_hemanth_vault_2026';
const CLOUD_ENDPOINT = `https://ntfy.sh/${DEFAULT_CLOUD_TOPIC}`;

/**
 * Retrieves the configured admin password (default: admin777)
 */
export const getAdminPassword = (): string => {
  try {
    return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_ADMIN_PASS;
  } catch {
    return DEFAULT_ADMIN_PASS;
  }
};

/**
 * Updates the admin password
 */
export const setAdminPassword = (newPass: string): void => {
  try {
    localStorage.setItem(ADMIN_PASS_KEY, newPass.trim() || DEFAULT_ADMIN_PASS);
  } catch (err) {
    console.error('Failed to set admin password:', err);
  }
};

/**
 * Verifies if entered password matches admin password
 */
export const verifyAdminPassword = (input: string): boolean => {
  const current = getAdminPassword();
  return input.trim() === current.trim();
};

/**
 * Checks if admin is currently authenticated in this session
 */
export const isAdminAuthenticated = (): boolean => {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
};

/**
 * Authenticates admin session
 */
export const loginAdmin = (password: string): boolean => {
  if (verifyAdminPassword(password)) {
    sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    return true;
  }
  return false;
};

/**
 * Logs out admin
 */
export const logoutAdmin = (): void => {
  try {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  } catch (err) {
    console.error('Error logging out admin:', err);
  }
};

/**
 * Retrieves all stored submissions from local storage
 */
export const getLocalSubmissions = (): StoredSubmission[] => {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse local submissions:', err);
    return [];
  }
};

/**
 * Saves or updates a submission in local storage
 */
export const saveSubmissionLocally = (submission: StoredSubmission): void => {
  try {
    const existing = getLocalSubmissions();
    const index = existing.findIndex((s) => s.id === submission.id);
    if (index >= 0) {
      existing[index] = submission;
    } else {
      existing.unshift(submission);
    }
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to save submission locally:', err);
  }
};

/**
 * Deletes a submission by ID
 */
export const deleteSubmission = (id: string): void => {
  try {
    const existing = getLocalSubmissions();
    const filtered = existing.filter((s) => s.id !== id);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete submission:', err);
  }
};

/**
 * Clears all submissions
 */
export const clearAllSubmissions = (): void => {
  try {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear submissions:', err);
  }
};

/**
 * Submits user profile answers to the cloud database
 */
export const submitProfileToCloudDatabase = async (
  profile: UserProfile
): Promise<{ success: boolean; id?: string; error?: string }> => {
  const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const submission: StoredSubmission = {
    id: submissionId,
    submittedAt: new Date().toISOString(),
    deviceInfo: navigator.userAgent ? navigator.userAgent.substring(0, 100) : 'Browser',
    profile,
  };

  // Always save locally on the device as fallback
  saveSubmissionLocally(submission);

  try {
    const herName = profile.basicDetails.callName?.trim() || 'Her';
    const payload = JSON.stringify(submission);

    const response = await fetch(CLOUD_ENDPOINT, {
      method: 'POST',
      headers: {
        Title: encodeURIComponent(`❤️ New Questionnaire Answers from ${herName}`),
        Tags: 'heart,love_letter',
        Priority: 'high',
        'Content-Type': 'text/plain',
      },
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`Cloud server responded with status: ${response.status}`);
    }

    return { success: true, id: submissionId };
  } catch (err: any) {
    console.warn('Cloud database sync warning (saved locally):', err);
    // Still return success if stored locally
    return { success: true, id: submissionId, error: err?.message };
  }
};

/**
 * Fetches all submissions from the cloud database and merges them into local database
 */
export const fetchCloudSubmissions = async (): Promise<StoredSubmission[]> => {
  const localList = getLocalSubmissions();
  const idMap = new Map<string, StoredSubmission>();

  // Add existing local ones to map
  localList.forEach((item) => idMap.set(item.id, item));

  try {
    // Poll the cloud topic for past messages
    const res = await fetch(`${CLOUD_ENDPOINT}/json?poll=1`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch cloud database: ${res.statusText}`);
    }

    const text = await res.text();
    const lines = text.split('\n').filter((l) => l.trim().length > 0);

    for (const line of lines) {
      try {
        const ntfyMsg = JSON.parse(line);
        if (ntfyMsg.message) {
          const parsedSubmission: StoredSubmission = JSON.parse(ntfyMsg.message);
          if (parsedSubmission && parsedSubmission.id && parsedSubmission.profile) {
            idMap.set(parsedSubmission.id, parsedSubmission);
          }
        }
      } catch {
        // Skip unparseable lines
      }
    }

    const merged = Array.from(idMap.values()).sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    // Update local cache with merged
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch (err) {
    console.error('Error fetching cloud submissions:', err);
    return localList;
  }
};
