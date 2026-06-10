const ACCESS_TOKEN_KEY = 'sara_milan_access_token';
const REFRESH_TOKEN_KEY = 'sara_milan_refresh_token';

const getStorage = (): Storage | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
};

const getToken = (key: string): string | null => getStorage()?.getItem(key) ?? null;

const setToken = (key: string, token: string | null): void => {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  if (token) {
    storage.setItem(key, token);
    return;
  }

  storage.removeItem(key);
};

export const getAccessToken = (): string | null => getToken(ACCESS_TOKEN_KEY);

// Temporary localStorage strategy. Prompt 14 auth flow may replace token storage.
export const setAccessToken = (token: string | null): void => {
  setToken(ACCESS_TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null => getToken(REFRESH_TOKEN_KEY);

export const setRefreshToken = (token: string | null): void => {
  setToken(REFRESH_TOKEN_KEY, token);
};

export const clearTokens = (): void => {
  setAccessToken(null);
  setRefreshToken(null);
};
