export { authApi } from './api/auth.api';
export { authKeys } from './api/auth.keys';
export {
  useCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
} from './api/auth.queries';
export { getAuthDictionary } from './auth.dictionary';
export { adaptAuthResult, mapIdentifierToLoginPayload } from './lib/auth.adapters';
export {
  isValidEmail,
  isValidEmailOrPhone,
  isValidPhone,
  validatePassword,
  validateRequired,
} from './lib/auth-ui.validation';
export {
  extractAuthTokens,
  getCurrentAccessToken,
  getCurrentRefreshToken,
  normalizeAccessToken,
  normalizeRefreshToken,
  removeAuthTokens,
  saveAuthTokens,
  saveAuthTokensFromResponse,
} from './lib/auth-token-manager';
export {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  hasAuthTokens,
  setAuthTokens,
} from './lib/auth-token-storage';
export type {
  AuthResult,
  AuthTokens,
  LoginPayload,
  LogoutPayload,
  RefreshPayload,
  RegisterPayload,
} from './model/auth.types';
export type { AuthDictionary, AuthFormProps, AuthShellProps } from './model/auth-ui.types';
export { AuthDivider } from './ui/auth-divider';
export { AuthLegalNote } from './ui/auth-legal-note';
export { AuthShell } from './ui/auth-shell';
export { ForgotPasswordForm } from './ui/forgot-password-form';
export { LoginForm } from './ui/login-form';
export { RegisterForm } from './ui/register-form';
