import type { Banner } from '@/entities/banner';
import type { Category } from '@/entities/category';
import type { ProductListItem } from '@/entities/product';
import type { PaginatedResponse } from '@/shared/api';
import { withLocale, type AppLocale } from '@/shared/config';

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
        title: banner.title?.trim() || 'Sara Milan',
        subtitle: banner.subtitle?.trim() || undefined,
        description: banner.description?.trim() || undefined,
        imageUrl: banner.imageUrl?.trim() || undefined,
        ctaLabel: banner.ctaLabel?.trim() || fallbackLabel,
        ctaUrl: target.href,
        isExternal: target.isExternal,
      };
    });

export const adaptHomeCategories = (categories: Category[], locale: AppLocale): HomeCategory[] =>
  categories
    .filter((category) => category.isActive !== false)
    .map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description?.trim() || undefined,
      imageUrl: category.imageUrl?.trim() || undefined,
      href: withLocale(locale, `/catalog/${category.slug}`),
    }));

export const extractProducts = (
  response: PaginatedResponse<ProductListItem> | ProductListItem[],
): ProductListItem[] => (Array.isArray(response) ? response : response.results);
