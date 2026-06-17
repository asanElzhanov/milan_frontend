'use client';

import type { ReactNode } from 'react';

import { useCurrentUserQuery } from '@/features/auth';
import type { AppLocale } from '@/shared/config';
import { Skeleton } from '@/shared/ui';

import { AccountAuthRequired } from './account-auth-required';
import { getAccountDictionary } from './account.dictionary';
import { AccountMobileNav } from './account-mobile-nav';
import { getAccountNavItems } from './account-nav';
import { AccountOverview } from './account-overview';
import { AccountPlaceholder } from './account-placeholder';
import { AccountSettings } from './account-settings';
import { AccountSidebar } from './account-sidebar';
import type { AccountDictionary, AccountNavItem } from './account.types';

export type AccountShellClientProps = {
  locale: AppLocale;
  activeKey: AccountNavItem['key'];
  children?: ReactNode;
};

function AccountLoadingState({ label }: { label: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <Skeleton className="hidden h-[360px] lg:block" />
      <div className="space-y-4">
        <p className="text-caption">{label}</p>
        <Skeleton className="h-28" />
        <Skeleton className="h-52" />
      </div>
    </div>
  );
}

function AccountContent({
  activeKey,
  labels,
  locale,
  user,
}: {
  activeKey: AccountNavItem['key'];
  labels: AccountDictionary;
  locale: AppLocale;
  user: NonNullable<ReturnType<typeof useCurrentUserQuery>['data']>;
}) {
  switch (activeKey) {
    case 'overview':
      return <AccountOverview labels={labels} locale={locale} user={user} />;
    case 'settings':
      return <AccountSettings labels={labels} user={user} />;
    case 'orders':
      return <AccountPlaceholder message={labels.ordersPending} title={labels.orders} />;
    case 'addresses':
      return <AccountPlaceholder message={labels.addressesPending} title={labels.addresses} />;
    case 'wishlist':
      return <AccountPlaceholder message={labels.wishlistPending} title={labels.wishlist} />;
    case 'reviews':
      return <AccountPlaceholder message={labels.reviewsPending} title={labels.reviews} />;
    case 'notifications':
      return (
        <AccountPlaceholder message={labels.notificationsPending} title={labels.notifications} />
      );
  }
}

export function AccountShellClient({ activeKey, children, locale }: AccountShellClientProps) {
  const labels = getAccountDictionary(locale);
  const currentUserQuery = useCurrentUserQuery({ enabled: true });
  const navItems = getAccountNavItems(locale, labels);

  if (currentUserQuery.isLoading) {
    return <AccountLoadingState label={labels.loadingProfile} />;
  }

  if (!currentUserQuery.data) {
    return <AccountAuthRequired labels={labels} locale={locale} />;
  }

  return (
    <div className="space-y-6">
      <AccountMobileNav activeKey={activeKey} items={navItems} />
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <AccountSidebar activeKey={activeKey} items={navItems} labels={labels} locale={locale} />
        <div className="min-w-0">
          {children ?? (
            <AccountContent
              activeKey={activeKey}
              labels={labels}
              locale={locale}
              user={currentUserQuery.data}
            />
          )}
        </div>
      </div>
    </div>
  );
}
