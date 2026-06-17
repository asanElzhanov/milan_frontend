import { adaptUser } from '@/entities/user';

import { isValidEmail } from './auth-ui.validation';
import { extractAuthTokens } from './auth-token-manager';
import type { AuthResult, LoginPayload } from '../model/auth.types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readWrappedUser = (raw: unknown): unknown => {
  if (!isRecord(raw)) {
    return raw;
  }

  if (raw.user !== undefined) {
    return raw.user;
  }

  if (isRecord(raw.data) && raw.data.user !== undefined) {
    return raw.data.user;
  }

  return raw;
};

export function adaptAuthResult(raw: unknown): AuthResult {
  return {
    user: adaptUser(readWrappedUser(raw)),
    tokens: extractAuthTokens(raw),
  };
}

export function mapIdentifierToLoginPayload(input: {
  identifier: string;
  password: string;
}): LoginPayload {
  const identifier = input.identifier.trim();

  if (isValidEmail(identifier)) {
    return {
      email: identifier,
      password: input.password,
    };
  }

  return {
    phone: identifier,
    password: input.password,
  };
}
