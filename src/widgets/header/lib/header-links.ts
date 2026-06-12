import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/config';

import type { HeaderNavItem } from '../model/types';
import { headerDictionary } from './header.dictionary';

export const getFallbackHeaderLinks = (locale: AppLocale): HeaderNavItem[] => {
  const dictionary = headerDictionary[locale];

  return [
    { id: 'catalog', label: dictionary.catalog, href: withLocale(locale, '/catalog') },
    { id: 'about', label: dictionary.about, href: withLocale(locale, '/about') },
    { id: 'delivery', label: dictionary.delivery, href: withLocale(locale, '/delivery') },
    { id: 'contacts', label: dictionary.contacts, href: withLocale(locale, '/contacts') },
  ];
};
