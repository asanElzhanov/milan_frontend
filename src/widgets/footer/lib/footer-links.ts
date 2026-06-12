import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/config';

import type { FooterLinkGroup } from '../model/types';
import { footerDictionary } from './footer.dictionary';

export const getFooterLinkGroups = (locale: AppLocale): FooterLinkGroup[] => {
  const dictionary = footerDictionary[locale];

  return [
    {
      title: dictionary.navigation,
      links: [
        { label: dictionary.links.catalog, href: withLocale(locale, '/catalog') },
        { label: dictionary.links.about, href: withLocale(locale, '/about') },
        { label: dictionary.links.delivery, href: withLocale(locale, '/delivery') },
        { label: dictionary.links.faq, href: withLocale(locale, '/faq') },
        { label: dictionary.links.contacts, href: withLocale(locale, '/contacts') },
      ],
    },
    {
      title: dictionary.customer,
      links: [
        { label: dictionary.links.account, href: withLocale(locale, '/account') },
        { label: dictionary.links.orders, href: withLocale(locale, '/account/orders') },
        { label: dictionary.links.privacy, href: withLocale(locale, '/privacy') },
        { label: dictionary.links.terms, href: withLocale(locale, '/terms') },
      ],
    },
  ];
};
