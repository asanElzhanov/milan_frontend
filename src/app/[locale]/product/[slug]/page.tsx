import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { productApi } from '@/entities/product';
import { isSupportedLocale, type AppLocale } from '@/shared/config';

import { ProductDetailPage } from '../product-detail/product-detail-page';

type ProductRouteProps = Readonly<{
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}>;

export async function generateMetadata({ params }: ProductRouteProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  try {
    const product = await productApi.getProductBySlug(slug);
    const title = product?.seoTitle || product?.metaTitle || product?.name || slug;
    const description = product?.seoDescription || product?.metaDescription || product?.description;

    return {
      title: `${title} - Sara Milan`,
      description: description ?? undefined,
    };
  } catch {
    return {
      title: `${slug} - Sara Milan`,
    };
  }
}

export default async function ProductRoute({ params }: ProductRouteProps) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <ProductDetailPage locale={locale as AppLocale} slug={slug} />;
}
