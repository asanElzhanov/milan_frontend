import type { StaticPageSlug } from '../model/static-page.types';

export const staticPageKeys = {
  all: ['static-pages'] as const,
  detail: (slug: StaticPageSlug, locale: string) => [...staticPageKeys.all, slug, locale] as const,
};
