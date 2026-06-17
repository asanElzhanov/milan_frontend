import type { AuthTokens } from '../model/auth.types';

export const AUTH_ACCESS_TOKEN_KEY = 'sara_milan_access_token';
export const AUTH_REFRESH_TOKEN_KEY = 'sara_milan_refresh_token';

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

const setToken = (key: string, token: string | null | undefined): void => {
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

export function getAccessToken(): string | null {
  return getToken(AUTH_ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return getToken(AUTH_REFRESH_TOKEN_KEY);
}

// localStorage is used for the current frontend integration. A backend httpOnly cookie strategy is
// safer and can replace this when the backend session contract supports it.
export function setAuthTokens(tokens: AuthTokens | null): void {
  setToken(AUTH_ACCESS_TOKEN_KEY, tokens?.access);
  setToken(AUTH_REFRESH_TOKEN_KEY, tokens?.refresh);
}

export function clearAuthTokens(): void {
  setToken(AUTH_ACCESS_TOKEN_KEY, null);
  setToken(AUTH_REFRESH_TOKEN_KEY, null);
}

export function hasAuthTokens(): boolean {
  return Boolean(getAccessToken());
}
