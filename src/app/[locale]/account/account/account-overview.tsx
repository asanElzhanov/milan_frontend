import Link from 'next/link';

import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/config';

import { AccountProfileCard } from './account-profile-card';
import type { AccountDictionary, AccountUserProps } from './account.types';

const quickLinks = [
  { key: 'settings', href: '/account/settings', pending: 'profileUpdatePending' },
  { key: 'orders', href: '/account/orders', pending: 'ordersPending' },
  { key: 'addresses', href: '/account/addresses', pending: 'addressesPending' },
  { key: 'wishlist', href: '/account/wishlist', pending: 'wishlistPending' },
] as const;

export function AccountOverview({
  labels,
  locale,
  user,
}: AccountUserProps & {
  locale: AppLocale;
}) {
  return (
    <div className="space-y-5">
      <AccountProfileCard labels={labels} user={user} />

      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map((item) => (
          <Link
            className="sara-focus border border-sara-beige-dark bg-sara-white p-5 transition-colors hover:border-sara-graphite"
            href={withLocale(locale, item.href)}
            key={item.key}
          >
            <p className="font-medium text-sara-graphite">{labels[item.key]}</p>
            <p className="mt-2 text-sm leading-6 text-sara-graphite/65">
              {labels[item.pending as keyof AccountDictionary]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
