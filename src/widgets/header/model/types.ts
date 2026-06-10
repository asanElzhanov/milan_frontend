import type { AppLocale } from '@/shared/config';

export type HeaderCategory = {
  id: string | number;
  name: string;
  slug: string;
  href: string;
};

export type HeaderNavItem = {
  label: string;
  href: string;
};

export type HeaderProps = {
  locale: AppLocale;
  cartCount?: number;
};
