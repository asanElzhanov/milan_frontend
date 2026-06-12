import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { CatalogPage } from '../catalog/catalog-page';
import { getCatalogDictionary } from '../catalog/catalog.dictionary';
import type { CatalogSearchParams } from '../catalog/catalog.types';

type CategoryCatalogRouteProps = Readonly<{
  params: Promise<{
    locale: string;
    categorySlug: string;
  }>;
  searchParams: Promise<CatalogSearchParams>;
}>;

export async function generateMetadata({ params }: CategoryCatalogRouteProps): Promise<Metadata> {
  const { categorySlug, locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = getCatalogDictionary(locale);

  return {
    title: `${dictionary.categoryTitle}: ${decodeURIComponent(categorySlug)} - Sara Milan`,
  };
}

export default async function CategoryCatalogRoute({
  params,
  searchParams,
}: CategoryCatalogRouteProps) {
  const { categorySlug, locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <CatalogPage
      categorySlug={decodeURIComponent(categorySlug)}
      locale={locale as AppLocale}
      searchParams={await searchParams}
    />
  );
}
