import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AuthShell, RegisterForm, getAuthDictionary } from '@/features/auth';
import { isSupportedLocale, type AppLocale } from '@/shared/config';

type RegisterRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const metadataTitle: Record<AppLocale, string> = {
  ru: 'Регистрация — Sara Milan',
  kk: 'Тіркелу — Sara Milan',
  en: 'Register — Sara Milan',
};

export async function generateMetadata({ params }: RegisterRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    title: metadataTitle[locale],
  };
}

export default async function RegisterPage({ params }: RegisterRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = getAuthDictionary(locale);

  return (
    <AuthShell
      locale={locale}
      subtitle={dictionary.registerSubtitle}
      title={dictionary.registerTitle}
    >
      <RegisterForm dictionary={dictionary} locale={locale} />
    </AuthShell>
  );
}
