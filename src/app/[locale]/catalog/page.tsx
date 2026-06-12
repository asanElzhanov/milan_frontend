import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { CatalogPage } from './catalog/catalog-page';
import { getCatalogDictionary } from './catalog/catalog.dictionary';
import type { CatalogSearchParams } from './catalog/catalog.types';

type CatalogRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<CatalogSearchParams>;
}>;

export async function generateMetadata({ params }: CatalogRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    title: getCatalogDictionary(locale).metadata.title,
  };
}

export default async function CatalogRoute({ params, searchParams }: CatalogRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <CatalogPage locale={locale as AppLocale} searchParams={await searchParams} />;
}
