import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { AccountShell } from '../account/account-shell';

type AccountPasswordRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const metadataTitle: Record<AppLocale, string> = {
  ru: 'Смена пароля — Sara Milan',
  kk: 'Құпиясөзді өзгерту — Sara Milan',
  en: 'Change password — Sara Milan',
};

export async function generateMetadata({ params }: AccountPasswordRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    title: metadataTitle[locale],
  };
}

export default async function AccountPasswordPage({ params }: AccountPasswordRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <AccountShell activeKey="password" locale={locale} />;
}
