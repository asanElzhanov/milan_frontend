import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { staticPageApi, type StaticPageSlug } from '@/entities/static-page';
import type { AppLocale } from '@/shared/config';
import { createPageMetadata } from '@/shared/lib';

import { StaticPageSection } from './static-page-section';
import { StaticPageShell } from './static-page-shell';

export const getCmsStaticPage = cache((slug: StaticPageSlug, locale: AppLocale) =>
  staticPageApi.getStaticPage(slug, locale),
);

export async function createCmsStaticPageMetadata(
  slug: StaticPageSlug,
  locale: AppLocale,
): Promise<Metadata> {
  const page = await getCmsStaticPage(slug, locale);

  if (!page) {
    return {};
  }

  return createPageMetadata({
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.content,
    locale,
    path: `/${slug}`,
  });
}

type CmsStaticPageProps = {
  locale: AppLocale;
  slug: StaticPageSlug;
  faq?: boolean;
};

export async function CmsStaticPage({ faq = false, locale, slug }: CmsStaticPageProps) {
  const page = await getCmsStaticPage(slug, locale);

  if (!page) {
    notFound();
  }

  return (
    <StaticPageShell locale={locale} title={page.title} subtitle={page.content || undefined}>
      {faq ? (
        <div className="space-y-3">
          {page.blocks.map((block) => (
            <details
              className="group border border-sara-beige-dark/70 bg-sara-white p-5"
              key={block.id}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-sara-graphite">
                <span>{block.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="shrink-0 text-sara-graphite/60 transition-transform duration-200 group-open:rotate-180"
                  size={20}
                />
              </summary>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-sara-graphite/70">
                {block.content}
              </p>
            </details>
          ))}
        </div>
      ) : (
        page.blocks.map((block) => (
          <StaticPageSection key={block.id} title={block.title}>
            <p className="whitespace-pre-line">{block.content}</p>
          </StaticPageSection>
        ))
      )}
    </StaticPageShell>
  );
}
