import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AuthShell } from '@/features/auth';
import { OtpForm, getOtpDictionary } from '@/features/otp';
import { isSupportedLocale, type AppLocale } from '@/shared/config';

type OtpRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const metadataTitle: Record<AppLocale, string> = {
  ru: 'Подтверждение кода — Sara Milan',
  kk: 'Кодты растау — Sara Milan',
};

export async function generateMetadata({ params }: OtpRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    title: metadataTitle[locale],
  };
}

export default async function OtpPage({ params }: OtpRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = getOtpDictionary(locale);

  return (
    <AuthShell locale={locale} subtitle={dictionary.otpSubtitle} title={dictionary.otpTitle}>
      <OtpForm dictionary={dictionary} locale={locale} />
    </AuthShell>
  );
}
