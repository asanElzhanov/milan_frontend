const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const LEGACY_ACCESS_TOKEN_KEY = 'sara_milan_access_token';
const LEGACY_REFRESH_TOKEN_KEY = 'sara_milan_refresh_token';

const getStorage = (): Storage | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const getToken = (key: string): string | null => {
  try {
    return getStorage()?.getItem(key) ?? null;
  } catch {
    return null;
  }
};

const setToken = (key: string, token: string | null): void => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    if (token?.trim()) {
      storage.setItem(key, token);
      return;
    }

    storage.removeItem(key);
  } catch {
    // localStorage can be unavailable in restricted browser contexts.
  }
};

const getTokenWithLegacyFallback = (currentKey: string, legacyKey: string): string | null =>
  getToken(currentKey) ?? getToken(legacyKey);

export const getAccessToken = (): string | null =>
  getTokenWithLegacyFallback(ACCESS_TOKEN_KEY, LEGACY_ACCESS_TOKEN_KEY);

// Temporary localStorage strategy. A backend httpOnly cookie strategy is safer and can replace this
// when the backend session contract supports it.
export const setAccessToken = (token: string | null): void => {
  setToken(ACCESS_TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null =>
  getTokenWithLegacyFallback(REFRESH_TOKEN_KEY, LEGACY_REFRESH_TOKEN_KEY);

export const setRefreshToken = (token: string | null): void => {
  setToken(REFRESH_TOKEN_KEY, token);
};

export const clearTokens = (): void => {
  setAccessToken(null);
  setRefreshToken(null);
  setToken(LEGACY_ACCESS_TOKEN_KEY, null);
  setToken(LEGACY_REFRESH_TOKEN_KEY, null);
};
