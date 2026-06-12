import type { AppLocale } from '@/shared/config';

export type HeaderNavItem = {
  id: string;
  label: string;
  href: string;
};

export type HeaderCategory = {
  id: string | number;
  name: string;
  slug: string;
  href: string;
};

export type HeaderCartSummary = {
  count: number;
  total?: number | string | null;
};

export type HeaderProps = {
  locale: AppLocale;
};
