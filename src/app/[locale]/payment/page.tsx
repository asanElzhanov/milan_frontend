import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { isSupportedLocale, localizedRoutes, type AppLocale } from '@/shared/config';
import { createPageMetadata } from '@/shared/lib';
import { Button } from '@/shared/ui';

import { getStaticDictionary } from '../static/static.dictionary';
import { StaticPageSection } from '../static/static-page-section';
import { StaticPageShell } from '../static/static-page-shell';

type StaticRouteProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: StaticRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  const page = getStaticDictionary(locale).payment;

  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    locale,
    path: '/payment',
  });
}

export default async function PaymentInfoPage({ params }: StaticRouteProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const dictionary = getStaticDictionary(locale);
  const page = dictionary.payment;

  return (
    <StaticPageShell locale={locale} title={page.title} subtitle={page.subtitle}>
      {page.sections?.map((section) => (
        <StaticPageSection key={section.title} title={section.title}>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </StaticPageSection>
      ))}
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href={localizedRoutes.cart(locale as AppLocale)}>{dictionary.labels.cart}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={localizedRoutes.checkout(locale as AppLocale)}>
            {dictionary.labels.checkout}
          </Link>
        </Button>
      </div>
    </StaticPageShell>
  );
}
