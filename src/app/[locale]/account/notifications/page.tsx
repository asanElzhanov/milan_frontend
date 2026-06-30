import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { AccountShell } from '../account/account-shell';
import { getNotificationsDictionary } from './notifications.dictionary';
import { NotificationsPageClient } from './notifications-page-client';

type AccountNotificationsRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({
  params,
}: AccountNotificationsRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  return {
    title: locale === 'kk' ? 'Хабарламалар — Sara Milan' : 'Уведомления — Sara Milan',
  };
}

export default async function AccountNotificationsPage({ params }: AccountNotificationsRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <AccountShell activeKey="notifications" locale={locale}>
      <NotificationsPageClient
        labels={getNotificationsDictionary(locale as AppLocale)}
        locale={locale as AppLocale}
      />
    </AccountShell>
  );
}
