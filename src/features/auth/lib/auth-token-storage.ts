import type { AuthTokens } from '../model/auth.types';
import {
  clearTokens,
  getAccessToken as getSharedAccessToken,
  getRefreshToken as getSharedRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/shared/api/token-storage';

export const AUTH_ACCESS_TOKEN_KEY = 'access_token';
export const AUTH_REFRESH_TOKEN_KEY = 'refresh_token';

export function getAccessToken(): string | null {
  return getSharedAccessToken();
}

export function getRefreshToken(): string | null {
  return getSharedRefreshToken();
}

// localStorage is used for the current frontend integration. A backend httpOnly cookie strategy is
// safer and can replace this when the backend session contract supports it.
export function setAuthTokens(tokens: AuthTokens | null): void {
  setAccessToken(tokens?.access ?? null);
  setRefreshToken(tokens?.refresh ?? null);
}

export function clearAuthTokens(): void {
  clearTokens();
}

export function hasAuthTokens(): boolean {
  return Boolean(getAccessToken());
}
