import type { AppLocale } from '@/shared/config';
import { isRecord, toNumberOrNull, toStringOrNull } from '@/shared/lib';

import type { StaticPage, StaticPageBlock, StaticPageSlug } from '../model/static-page.types';

const staticPageSlugs = new Set<StaticPageSlug>([
  'about',
  'delivery',
  'payment',
  'faq',
  'contacts',
]);

const readLocalizedField = (
  value: Record<string, unknown>,
  field: 'title' | 'content',
  locale: AppLocale,
): string => {
  const localeSuffix = locale === 'kk' ? 'kz' : locale;

  return (
    toStringOrNull(value[`${field}_${localeSuffix}`]) ?? toStringOrNull(value[`${field}_ru`]) ?? ''
  );
};

const adaptStaticPageBlock = (value: unknown, locale: AppLocale): StaticPageBlock | null => {
  if (!isRecord(value)) {
    return null;
  }

  const id = toNumberOrNull(value.id);

  if (id === null) {
    return null;
  }

  return {
    id,
    title: readLocalizedField(value, 'title', locale),
    content: readLocalizedField(value, 'content', locale),
    sortOrder: toNumberOrNull(value.sort_order) ?? 0,
  };
};

export const adaptStaticPage = (value: unknown, locale: AppLocale): StaticPage | null => {
  if (!isRecord(value)) {
    return null;
  }

  const id = toNumberOrNull(value.id);
  const slug = toStringOrNull(value.slug);

  if (id === null || !slug || !staticPageSlugs.has(slug as StaticPageSlug)) {
    return null;
  }

  const rawBlocks = Array.isArray(value.blocks) ? value.blocks : [];

  return {
    id,
    slug: slug as StaticPageSlug,
    title: readLocalizedField(value, 'title', locale),
    content: readLocalizedField(value, 'content', locale),
    seoTitle: toStringOrNull(value.seo_title) ?? '',
    seoDescription: toStringOrNull(value.seo_description) ?? '',
    blocks: rawBlocks
      .map((block) => adaptStaticPageBlock(block, locale))
      .filter((block): block is StaticPageBlock => block !== null),
  };
};
