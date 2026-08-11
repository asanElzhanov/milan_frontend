import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { AuthShell, ResetPasswordForm, getAuthDictionary } from '@/features/auth';
import { isSupportedLocale, type AppLocale } from '@/shared/config';

type ResetPasswordRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const metadataTitle: Record<AppLocale, string> = {
  ru: 'Новый пароль — Sara Milan',
  kk: 'Жаңа құпиясөз — Sara Milan',
  en: 'New password — Sara Milan',
};

export async function generateMetadata({ params }: ResetPasswordRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    title: metadataTitle[locale],
  };
}

export default async function ResetPasswordPage({ params }: ResetPasswordRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = getAuthDictionary(locale);

  return (
    <AuthShell locale={locale} subtitle={dictionary.resetSubtitle} title={dictionary.resetTitle}>
      <Suspense fallback={null}>
        <ResetPasswordForm dictionary={dictionary} locale={locale} />
      </Suspense>
    </AuthShell>
  );
}
