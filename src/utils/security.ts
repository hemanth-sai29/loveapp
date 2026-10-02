// Security and Privacy utilities for Know Her ❤️

export interface SecurityConfig {
  passcode: string;
  hint: string;
  requirePasscode: boolean;
  obfuscateStorage: boolean;
}

const SECURITY_STORAGE_KEY = 'know_her_security_config_v1';
const AUTH_SESSION_KEY = 'know_her_auth_token_v1';

// Default configuration: accessible via passcode 'ourlove' or via magic link ?key=ourlove
export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  passcode: 'ourlove',
  hint: 'Our special secret word or try: ourlove',
  requirePasscode: true,
  obfuscateStorage: true,
};

/**
 * Retrieves the stored security configuration or default.
 */
export const getSecurityConfig = (): SecurityConfig => {
  try {
    const raw = localStorage.getItem(SECURITY_STORAGE_KEY);
    if (!raw) return DEFAULT_SECURITY_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      passcode: parsed.passcode || DEFAULT_SECURITY_CONFIG.passcode,
      hint: parsed.hint || DEFAULT_SECURITY_CONFIG.hint,
      requirePasscode: parsed.requirePasscode ?? true,
      obfuscateStorage: parsed.obfuscateStorage ?? true,
    };
  } catch {
    return DEFAULT_SECURITY_CONFIG;
  }
};

/**
 * Saves updated security configuration.
 */
export const saveSecurityConfig = (config: Partial<SecurityConfig>): SecurityConfig => {
  const current = getSecurityConfig();
  const updated: SecurityConfig = {
    ...current,
    ...config,
  };
  try {
    localStorage.setItem(SECURITY_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save security configuration:', err);
  }
  return updated;
};

/**
 * Checks if current user/browser is authenticated.
 */
export const isAppUnlocked = (): boolean => {
  const config = getSecurityConfig();
  if (!config.requirePasscode) return true;

  try {
    const token = sessionStorage.getItem(AUTH_SESSION_KEY) || localStorage.getItem(AUTH_SESSION_KEY);
    if (!token) return false;
    // Simple verification token matches configured passcode hash
    return token === hashString(config.passcode);
  } catch {
    return false;
  }
};

/**
 * Validates a given passcode or magic key against the configured passcode.
 */
export const verifyPasscode = (input: string): boolean => {
  const config = getSecurityConfig();
  const cleanInput = input.trim().toLowerCase();
  const cleanPasscode = config.passcode.trim().toLowerCase();
  return cleanInput === cleanPasscode;
};

/**
 * Authenticates the current session with a valid passcode.
 */
export const unlockApp = (passcode: string, persist = true): boolean => {
  if (verifyPasscode(passcode)) {
    const hashed = hashString(getSecurityConfig().passcode);
    sessionStorage.setItem(AUTH_SESSION_KEY, hashed);
    if (persist) {
      localStorage.setItem(AUTH_SESSION_KEY, hashed);
    }
    return true;
  }
  return false;
};

/**
 * Locks the app immediately.
 */
export const lockApp = (): void => {
  try {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    localStorage.removeItem(AUTH_SESSION_KEY);
  } catch (err) {
    console.error('Error locking app:', err);
  }
};

/**
 * Checks URL query params for a magic key or passcode (?key=... or ?passcode=...)
 * If valid, unlocks and cleans the URL without page reload.
 */
export const checkUrlMagicKey = (): boolean => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const keyParam = searchParams.get('key') || searchParams.get('passcode') || searchParams.get('secret');

    if (keyParam && verifyPasscode(keyParam)) {
      unlockApp(keyParam, true);

      // Clean the query parameter from URL bar for privacy
      searchParams.delete('key');
      searchParams.delete('passcode');
      searchParams.delete('secret');
      const newQuery = searchParams.toString();
      const newPath = window.location.pathname + (newQuery ? `?${newQuery}` : '') + window.location.hash;
      window.history.replaceState({}, document.title, newPath);

      return true;
    }
  } catch (err) {
    console.error('Error checking magic URL key:', err);
  }
  return false;
};

/**
 * Generates the full shareable magic link with link-only access.
 */
export const generateShareableLink = (customKey?: string): string => {
  const config = getSecurityConfig();
  const keyToUse = customKey || config.passcode;
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?key=${encodeURIComponent(keyToUse)}`;
};

/**
 * Lightweight deterministic string hash.
 */
const hashString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `kh_auth_${Math.abs(hash).toString(36)}`;
};

/**
 * Obfuscates sensitive data stored in localStorage.
 */
export const obfuscateData = (data: string): string => {
  try {
    return btoa(
      encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  } catch {
    return data;
  }
};

/**
 * Deobfuscates data from localStorage.
 */
export const deobfuscateData = (data: string): string => {
  try {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(data), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return data;
  }
};
