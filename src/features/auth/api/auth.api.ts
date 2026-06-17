import type { User } from '@/entities/user';
import { adaptUser } from '@/entities/user';
import { ApiError, apiClient, isMockApiMode } from '@/shared/api';

import { adaptAuthResult } from '../lib/auth.adapters';
import {
  getCurrentRefreshToken,
  removeAuthTokens,
  saveAuthTokens,
  saveAuthTokensFromResponse,
} from '../lib/auth-token-manager';
import type {
  AuthResult,
  AuthTokens,
  LoginPayload,
  LogoutPayload,
  RefreshPayload,
  RegisterPayload,
} from '../model/auth.types';

const AUTH_DISABLED_ERROR = 'Auth API is disabled in mock mode';

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthResult> {
    if (isMockApiMode) {
      throw new ApiError({
        status: 503,
        message: AUTH_DISABLED_ERROR,
        code: 'auth_mock_mode',
      });
    }

    const response = await apiClient.post<unknown>('/api/v1/auth/login/', payload, {
      auth: false,
    });
    const result = adaptAuthResult(response);

    saveAuthTokens(result.tokens);

    return result;
  },

  async register(payload: RegisterPayload): Promise<AuthResult> {
    if (isMockApiMode) {
      throw new ApiError({
        status: 503,
        message: AUTH_DISABLED_ERROR,
        code: 'auth_mock_mode',
      });
    }

    const response = await apiClient.post<unknown>('/api/v1/auth/register/', payload, {
      auth: false,
    });
    const result = adaptAuthResult(response);

    saveAuthTokens(result.tokens);

    return result;
  },

  async logout(payload?: LogoutPayload): Promise<void> {
    const refresh = payload?.refresh ?? getCurrentRefreshToken();

    if (!isMockApiMode) {
      try {
        await apiClient.post<unknown>('/api/v1/auth/logout/', refresh ? { refresh } : {});
      } catch {
        // Local session cleanup still wins if the backend logout request fails.
      }
    }

    removeAuthTokens();
  },

  async refresh(payload?: RefreshPayload): Promise<AuthTokens | null> {
    if (isMockApiMode) {
      return null;
    }

    const refresh = payload?.refresh ?? getCurrentRefreshToken();

    if (!refresh) {
      return null;
    }

    const response = await apiClient.post<unknown>(
      '/api/v1/auth/refresh/',
      { refresh },
      { auth: false },
    );

    return saveAuthTokensFromResponse(response);
  },

  async me(): Promise<User | null> {
    if (isMockApiMode) {
      return null;
    }

    const response = await apiClient.get<unknown>('/api/v1/auth/me/');

    return adaptUser(response);
  },
};
