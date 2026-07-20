import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AuthShell, ForgotPasswordForm, getAuthDictionary } from '@/features/auth';
import { isSupportedLocale, type AppLocale } from '@/shared/config';

type ForgotPasswordRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const metadataTitle: Record<AppLocale, string> = {
  ru: 'Восстановление пароля — Sara Milan',
  kk: 'Құпиясөзді қалпына келтіру — Sara Milan',
  en: 'Reset password — Sara Milan',
};

export async function generateMetadata({ params }: ForgotPasswordRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    title: metadataTitle[locale],
  };
}

export default async function ForgotPasswordPage({ params }: ForgotPasswordRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = getAuthDictionary(locale);

  return (
    <AuthShell locale={locale} subtitle={dictionary.forgotSubtitle} title={dictionary.forgotTitle}>
      <ForgotPasswordForm dictionary={dictionary} locale={locale} />
    </AuthShell>
  );
}
