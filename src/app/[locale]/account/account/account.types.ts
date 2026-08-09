import type { User } from '@/entities/user';
import type { AppLocale } from '@/shared/config';

export type AccountNavKey =
  | 'overview'
  | 'settings'
  | 'password'
  | 'orders'
  | 'addresses'
  | 'wishlist'
  | 'reviews'
  | 'notifications';

export type AccountNavItem = {
  label: string;
  href: string;
  key: AccountNavKey;
};

export type AccountPageBaseProps = {
  locale: AppLocale;
};

export type AccountUserViewModel = {
  displayName: string;
  email?: string | null;
  phone?: string | null;
  roleLabel: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
};

export type AccountDictionary = {
  accountTitle: string;
  accountSubtitle: string;
  overview: string;
  settings: string;
  password: string;
  orders: string;
  addresses: string;
  wishlist: string;
  reviews: string;
  notifications: string;
  logout: string;
  profile: string;
  profileInfo: string;
  contactInfo: string;
  security: string;
  apply: string;
  name: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  verified: string;
  notVerified: string;
  customer: string;
  manager: string;
  admin: string;
  unknownRole: string;
  authRequiredTitle: string;
  authRequiredDescription: string;
  goToLogin: string;
  goToRegister: string;
  backToCatalog: string;
  loadingProfile: string;
  profileUpdatePending: string;
  changePasswordPending: string;
  changePasswordTitle: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  changePasswordSubmit: string;
  changePasswordSuccess: string;
  passwordMismatch: string;
  passwordTooShort: string;
  requiredField: string;
  showPassword: string;
  hidePassword: string;
  passwordChangeLockedHint: string;
  ordersPending: string;
  addressesPending: string;
  wishlistPending: string;
  reviewsPending: string;
  notificationsPending: string;
};

export type AccountUserProps = {
  user: User;
  labels: AccountDictionary;
};
