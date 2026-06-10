import { DEFAULT_LOCALE, isSupportedLocale, type AppLocale } from '@/shared/config';

const normalizePath = (path: string): string => {
  if (!path || path === '/') {
    return '';
  }

  return path.startsWith('/') ? path : `/${path}`;
};

export const withLocale = (locale: AppLocale, path = '/'): string => {
  const normalizedPath = normalizePath(path);

  return normalizedPath ? `/${locale}${normalizedPath}` : `/${locale}`;
};

export const replaceLocale = (pathname: string, targetLocale: AppLocale): string => {
  const segments = pathname.split('/').filter(Boolean);
  const [, ...rest] = segments;

  if (segments[0] && isSupportedLocale(segments[0])) {
    const suffix = rest.length > 0 ? `/${rest.join('/')}` : '';

    return `/${targetLocale}${suffix}`;
  }

  return withLocale(targetLocale, pathname === '/' ? '' : pathname);
};

export const getLocaleFromPathname = (pathname: string): AppLocale => {
  const firstSegment = pathname.split('/').filter(Boolean)[0];

  return firstSegment && isSupportedLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
};
