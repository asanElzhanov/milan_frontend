import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { AccountShell } from './account/account-shell';

type AccountRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const metadataTitle: Record<AppLocale, string> = {
  ru: 'Личный кабинет — Sara Milan',
  kk: 'Жеке кабинет — Sara Milan',
  en: 'My account — Sara Milan',
};

export async function generateMetadata({ params }: AccountRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    title: metadataTitle[locale],
  };
}

export default async function AccountPage({ params }: AccountRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <AccountShell activeKey="overview" locale={locale} />;
}
