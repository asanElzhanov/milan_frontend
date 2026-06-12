import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale } from '@/shared/config';

import { HomePage } from './home/home-page';
import { homeDictionary } from './home/home.dictionary';

type LocaleHomePageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: LocaleHomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  return {
    title: homeDictionary[locale].metadata.title,
    description: homeDictionary[locale].metadata.description,
  };
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale} />;
}
