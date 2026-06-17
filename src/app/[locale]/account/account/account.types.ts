import type { User } from '@/entities/user';
import type { AppLocale } from '@/shared/config';

export type AccountNavKey =
  | 'overview'
  | 'settings'
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
