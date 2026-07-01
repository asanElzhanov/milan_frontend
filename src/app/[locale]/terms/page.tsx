import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale } from '@/shared/config';
import { createPageMetadata } from '@/shared/lib';

import { getStaticDictionary } from '../static/static.dictionary';
import { StaticPageSection } from '../static/static-page-section';
import { StaticPageShell } from '../static/static-page-shell';

type StaticRouteProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: StaticRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  const page = getStaticDictionary(locale).terms;

  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    locale,
    path: '/terms',
  });
}

export default async function TermsPage({ params }: StaticRouteProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const page = getStaticDictionary(locale).terms;

  return (
    <StaticPageShell locale={locale} title={page.title} subtitle={page.subtitle}>
      {page.sections?.map((section) => (
        <StaticPageSection key={section.title} title={section.title}>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </StaticPageSection>
      ))}
    </StaticPageShell>
  );
}
