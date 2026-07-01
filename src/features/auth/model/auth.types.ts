import type { User } from '@/entities/user';

export type AuthTokens = {
  access: string;
  refresh?: string | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  password: string;
  password2: string;
};

export type RefreshPayload = {
  refresh: string;
};

export type LogoutPayload = {
  refresh?: string | null;
};

export type UpdateProfilePayload = {
  first_name?: string;
  last_name?: string;
  phone?: string;
};

export type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
};

export type OtpPurpose = 'email_verify' | 'phone_verify';

export type OtpRequestPayload = {
  purpose: OtpPurpose;
};

export type OtpVerifyPayload = {
  purpose: OtpPurpose;
  code: string;
};

export type AuthResult = {
  user: User | null;
  tokens: AuthTokens | null;
};
