import type { AppLocale } from '@/shared/config';

export type AuthDictionary = {
  loginTitle: string;
  loginSubtitle: string;
  registerTitle: string;
  registerSubtitle: string;
  forgotTitle: string;
  forgotSubtitle: string;
  resetTitle: string;
  resetSubtitle: string;
  identifier: string;
  email: string;
  phone: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  fullName: string;
  rememberMe: string;
  forgotPassword: string;
  loginButton: string;
  registerButton: string;
  resetButton: string;
  sendInstructions: string;
  haveAccount: string;
  noAccount: string;
  goToLogin: string;
  goToRegister: string;
  continueAsGuest: string;
  backToCatalog: string;
  termsPrefix: string;
  terms: string;
  privacy: string;
  authComingSoon: string;
  passwordResetEndpointPending: string;
  passwordResetRequestSuccess: string;
  resetSuccess: string;
  resetInvalidLink: string;
  registerPendingVerification: string;
  requiredField: string;
  invalidEmailOrPhone: string;
  passwordTooShort: string;
  passwordsDoNotMatch: string;
  showPassword: string;
  hidePassword: string;
};

export type AuthShellProps = {
  locale: AppLocale;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
};

export type AuthFormProps = {
  locale: AppLocale;
  dictionary: AuthDictionary;
};
