import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { AccountShell } from '../account/account-shell';
import { AddressesPageClient } from './addresses-page-client';

type AccountAddressesRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const metadataTitle: Record<AppLocale, string> = {
  ru: 'Адреса — Sara Milan',
  kk: 'Мекенжайлар — Sara Milan',
};

export async function generateMetadata({ params }: AccountAddressesRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    title: metadataTitle[locale],
  };
}

export default async function AccountAddressesPage({ params }: AccountAddressesRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <AccountShell activeKey="addresses" locale={locale}>
      <AddressesPageClient locale={locale} />
    </AccountShell>
  );
}
