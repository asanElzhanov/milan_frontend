import type { AuthTokens } from '../model/auth.types';
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
} from './auth-token-storage';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readString = (value: unknown): string | null =>
  typeof value === 'string' && value.trim() ? value : null;

const readNested = (record: Record<string, unknown>, path: string[]): unknown =>
  path.reduce<unknown>((current, key) => (isRecord(current) ? current[key] : undefined), record);

export function normalizeAccessToken(token: unknown): string | null {
  return readString(token);
}

export function normalizeRefreshToken(token: unknown): string | null {
  return readString(token);
}

export function extractAuthTokens(response: unknown): AuthTokens | null {
  if (!isRecord(response)) {
    return null;
  }

  const access =
    normalizeAccessToken(response.access) ??
    normalizeAccessToken(response.access_token) ??
    normalizeAccessToken(readNested(response, ['tokens', 'access'])) ??
    normalizeAccessToken(readNested(response, ['tokens', 'access_token'])) ??
    normalizeAccessToken(readNested(response, ['data', 'access'])) ??
    normalizeAccessToken(readNested(response, ['data', 'access_token'])) ??
    normalizeAccessToken(readNested(response, ['data', 'tokens', 'access'])) ??
    normalizeAccessToken(readNested(response, ['data', 'tokens', 'access_token']));

  if (!access) {
    return null;
  }

  const refresh =
    normalizeRefreshToken(response.refresh) ??
    normalizeRefreshToken(response.refresh_token) ??
    normalizeRefreshToken(readNested(response, ['tokens', 'refresh'])) ??
    normalizeRefreshToken(readNested(response, ['tokens', 'refresh_token'])) ??
    normalizeRefreshToken(readNested(response, ['data', 'refresh'])) ??
    normalizeRefreshToken(readNested(response, ['data', 'refresh_token'])) ??
    normalizeRefreshToken(readNested(response, ['data', 'tokens', 'refresh'])) ??
    normalizeRefreshToken(readNested(response, ['data', 'tokens', 'refresh_token']));

  return {
    access,
    refresh,
  };
}

export function saveAuthTokens(tokens: AuthTokens | null): AuthTokens | null {
  setAuthTokens(tokens);

  return tokens;
}

export function saveAuthTokensFromResponse(response: unknown): AuthTokens | null {
  return saveAuthTokens(extractAuthTokens(response));
}

export function removeAuthTokens(): void {
  clearAuthTokens();
}

export function getCurrentAccessToken(): string | null {
  return getAccessToken();
}

export function getCurrentRefreshToken(): string | null {
  return getRefreshToken();
}
