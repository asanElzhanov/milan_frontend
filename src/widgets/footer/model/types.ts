import type { AppLocale } from '@/shared/config';

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  title: string;
  links: FooterLink[];
};

export type FooterProps = {
  locale: AppLocale;
};
