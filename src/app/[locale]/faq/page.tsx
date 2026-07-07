import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import { notFound } from 'next/navigation';

import { isSupportedLocale } from '@/shared/config';
import { createPageMetadata } from '@/shared/lib';

import { getStaticDictionary } from '../static/static.dictionary';
import { StaticPageShell } from '../static/static-page-shell';

type StaticRouteProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({ params }: StaticRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  const page = getStaticDictionary(locale).faq;

  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    locale,
    path: '/faq',
  });
}

export default async function FaqPage({ params }: StaticRouteProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const page = getStaticDictionary(locale).faq;

  return (
    <StaticPageShell locale={locale} title={page.title} subtitle={page.subtitle}>
      <div className="space-y-3">
        {page.faq?.map((item) => (
          <details
            className="group border border-sara-beige-dark/70 bg-sara-white p-5"
            key={item.question}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-sara-graphite">
              <span>{item.question}</span>
              <ChevronDown
                aria-hidden="true"
                className="shrink-0 text-lg leading-none text-sara-graphite/60 transition-transform duration-200 group-open:rotate-180"
                size={20}
              />
            </summary>
            <p className="mt-4 text-sm leading-7 text-sara-graphite/70">{item.answer}</p>
          </details>
        ))}
      </div>
    </StaticPageShell>
  );
}
