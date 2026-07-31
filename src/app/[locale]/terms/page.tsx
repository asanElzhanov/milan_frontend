import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { infoDocApi } from '@/entities/info-doc';
import { isSupportedLocale } from '@/shared/config';
import { createPageMetadata } from '@/shared/lib';

import { InfoDocsSection } from '../static/info-docs-section';
import { getStaticDictionary } from '../static/static.dictionary';
import { StaticPageSection } from '../static/static-page-section';
import { StaticPageShell } from '../static/static-page-shell';

type StaticRouteProps = Readonly<{ params: Promise<{ locale: string }> }>;

export const dynamic = 'force-dynamic';

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

async function getInfoDocs(locale: Parameters<typeof getStaticDictionary>[0]) {
  try {
    return await infoDocApi.getInfoDocs(locale);
  } catch {
    return [];
  }
}

export default async function TermsPage({ params }: StaticRouteProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const dictionary = getStaticDictionary(locale);
  const page = dictionary.terms;
  const docs = await getInfoDocs(locale);

  return (
    <StaticPageShell locale={locale} title={page.title} subtitle={page.subtitle}>
      <InfoDocsSection docs={docs} title={dictionary.labels.documents} />
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
