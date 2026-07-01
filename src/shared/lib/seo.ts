import type { Metadata } from 'next';

import { env, SUPPORTED_LOCALES, withLocale, type AppLocale } from '@/shared/config';

const normalizeSiteUrl = (value: string | undefined): string | null => {
  if (!value?.trim()) {
    return null;
  }

  try {
    const url = new URL(value);

    return url.origin;
  } catch {
    return null;
  }
};

export const getSiteUrl = (): string | null => normalizeSiteUrl(env.siteUrl);

export function createPageMetadata({
  description,
  locale,
  path,
  title,
}: {
  title: string;
  description: string;
  locale: AppLocale;
  path: string;
}): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = withLocale(locale, path);
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((language) => [language, withLocale(language, path)]),
  );

  return {
    title,
    description,
    alternates: {
      canonical: siteUrl ? new URL(canonicalPath, siteUrl).toString() : canonicalPath,
      languages: siteUrl
        ? Object.fromEntries(
            Object.entries(languages).map(([language, href]) => [
              language,
              new URL(href, siteUrl).toString(),
            ]),
          )
        : languages,
    },
    openGraph: {
      title,
      description,
      locale,
      siteName: 'Sara Milan',
      type: 'website',
      url: siteUrl ? new URL(canonicalPath, siteUrl).toString() : undefined,
    },
  };
}
