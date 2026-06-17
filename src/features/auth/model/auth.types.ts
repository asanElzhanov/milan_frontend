import type { User } from '@/entities/user';

export type AuthTokens = {
  access: string;
  refresh?: string | null;
};

export type LoginPayload = {
  identifier?: string;
  email?: string;
  phone?: string;
  password: string;
};

export type RegisterPayload = {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  password: string;
  password_confirm?: string;
};

export type RefreshPayload = {
  refresh: string;
};

export type LogoutPayload = {
  refresh?: string | null;
};

export type AuthResult = {
  user: User | null;
  tokens: AuthTokens | null;
};
