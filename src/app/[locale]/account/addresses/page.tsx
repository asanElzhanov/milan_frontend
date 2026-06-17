import { notFound } from 'next/navigation';

import { isSupportedLocale } from '@/shared/config';

import { AccountShell } from '../account/account-shell';

type AccountAddressesRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function AccountAddressesPage({ params }: AccountAddressesRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <AccountShell activeKey="addresses" locale={locale} />;
}
