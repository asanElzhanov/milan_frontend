import { withLocale, type AppLocale } from '@/shared/config';

import type { AccountDictionary, AccountNavItem } from './account.types';

export function getAccountNavItems(locale: AppLocale, labels: AccountDictionary): AccountNavItem[] {
  return [
    { key: 'overview', label: labels.overview, href: withLocale(locale, '/account') },
    { key: 'settings', label: labels.settings, href: withLocale(locale, '/account/settings') },
    { key: 'orders', label: labels.orders, href: withLocale(locale, '/account/orders') },
    { key: 'addresses', label: labels.addresses, href: withLocale(locale, '/account/addresses') },
    { key: 'wishlist', label: labels.wishlist, href: withLocale(locale, '/account/wishlist') },
    { key: 'reviews', label: labels.reviews, href: withLocale(locale, '/account/reviews') },
    {
      key: 'notifications',
      label: labels.notifications,
      href: withLocale(locale, '/account/notifications'),
    },
  ];
}
