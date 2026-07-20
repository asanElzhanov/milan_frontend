import { notFound } from 'next/navigation';

import { DEFAULT_LOCALE, isSupportedLocale, SUPPORTED_LOCALES } from '@/shared/config';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen bg-sara-white text-sara-graphite">{children}</main>
      <Footer locale={locale} />
    </>
  );
}

export const metadata = {
  alternates: {
    canonical: `/${DEFAULT_LOCALE}`,
    languages: {
      ru: '/ru',
      kk: '/kk',
      en: '/en',
    },
  },
  openGraph: {
    siteName: 'Sara Milan',
    type: 'website',
  },
};
