import type { Banner } from '@/entities/banner';
import type { Category } from '@/entities/category';
import type { ProductListItem } from '@/entities/product';
import type { PaginatedResponse } from '@/shared/api';
import { withLocale, type AppLocale } from '@/shared/config';
import { getLocalizedField } from '@/shared/lib';

import type { HomeBanner, HomeCategory } from './home.types';

const isExternalUrl = (url: string): boolean => /^https?:\/\//i.test(url);

const normalizeHref = (locale: AppLocale, href?: string | null, fallback = '/catalog') => {
  const rawHref = href?.trim() || fallback;

  if (isExternalUrl(rawHref)) {
    return {
      href: rawHref,
      isExternal: true,
    };
  }

  return {
    href: withLocale(locale, rawHref.startsWith('/') ? rawHref : `/${rawHref}`),
    isExternal: false,
  };
};

export const adaptHomeBanners = (
  banners: Banner[],
  locale: AppLocale,
  fallbackLabel: string,
): HomeBanner[] =>
  banners
    .filter((banner) => banner.isActive !== false)
    .map((banner) => {
      const target = normalizeHref(locale, banner.ctaUrl);

      return {
        id: banner.id,
        title: getLocalizedField(banner, 'title', locale) || 'Sara Milan',
        subtitle: getLocalizedField(banner, 'subtitle', locale) || undefined,
        description: getLocalizedField(banner, 'description', locale) || undefined,
        imageUrl: banner.imageUrl?.trim() || undefined,
        ctaLabel: getLocalizedField(banner, 'ctaLabel', locale) || fallbackLabel,
        ctaUrl: target.href,
        isExternal: target.isExternal,
      };
    });

export const adaptHomeCategories = (categories: Category[], locale: AppLocale): HomeCategory[] =>
  categories
    .filter((category) => category.isActive !== false)
    .map((category) => ({
      id: category.id,
      name: getLocalizedField(category, 'name', locale),
      slug: category.slug,
      description: getLocalizedField(category, 'description', locale) || undefined,
      imageUrl: category.imageUrl?.trim() || undefined,
      href: withLocale(locale, `/catalog/${category.slug}`),
    }));

export const extractProducts = (
  response: PaginatedResponse<ProductListItem> | ProductListItem[],
): ProductListItem[] => (Array.isArray(response) ? response : response.results);
