import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AuthShell, LoginForm, getAuthDictionary } from '@/features/auth';
import { isSupportedLocale, type AppLocale } from '@/shared/config';

type LoginRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const metadataTitle: Record<AppLocale, string> = {
  ru: 'Вход — Sara Milan',
  kk: 'Кіру — Sara Milan',
  en: 'Sign in — Sara Milan',
};

export async function generateMetadata({ params }: LoginRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    title: metadataTitle[locale],
  };
}

export default async function LoginPage({ params }: LoginRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = getAuthDictionary(locale);

  return (
    <AuthShell locale={locale} subtitle={dictionary.loginSubtitle} title={dictionary.loginTitle}>
      <LoginForm dictionary={dictionary} locale={locale} />
    </AuthShell>
  );
}
