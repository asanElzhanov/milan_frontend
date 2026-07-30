import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale } from '@/shared/config';

import { CmsStaticPage, createCmsStaticPageMetadata } from '../static/cms-static-page';

type StaticRouteProps = Readonly<{ params: Promise<{ locale: string }> }>;

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: StaticRouteProps): Promise<Metadata> {
  const { locale } = await params;

  return isSupportedLocale(locale) ? createCmsStaticPageMetadata('faq', locale) : {};
}

export default async function FaqPage({ params }: StaticRouteProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) notFound();

  return <CmsStaticPage faq locale={locale} slug="faq" />;
}
