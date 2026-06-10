import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/lib';

import type { HeaderNavItem } from '../model/types';

export const getFallbackHeaderLinks = (locale: AppLocale): HeaderNavItem[] => [
  { label: 'Каталог', href: withLocale(locale, '/catalog') },
  { label: 'О бренде', href: withLocale(locale, '/about') },
  { label: 'Доставка', href: withLocale(locale, '/delivery') },
  { label: 'Контакты', href: withLocale(locale, '/contacts') },
];
