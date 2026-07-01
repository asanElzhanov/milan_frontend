import type { MetadataRoute } from 'next';

import { SUPPORTED_LOCALES, withLocale } from '@/shared/config';
import { getSiteUrl } from '@/shared/lib';

const staticPaths = [
  '/',
  '/catalog',
  '/about',
  '/delivery',
  '/payment',
  '/faq',
  '/contacts',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return [];
  }

  return SUPPORTED_LOCALES.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: new URL(withLocale(locale, path), siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: path === '/' || path === '/catalog' ? 'weekly' : 'monthly',
      priority: path === '/' ? 1 : path === '/catalog' ? 0.9 : 0.6,
    })),
  );
}
