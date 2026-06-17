import { notFound } from 'next/navigation';

import { isSupportedLocale } from '@/shared/config';

import { AccountShell } from '../account/account-shell';

type AccountNotificationsRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function AccountNotificationsPage({ params }: AccountNotificationsRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <AccountShell activeKey="notifications" locale={locale} />;
}
