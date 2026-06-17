import { DEFAULT_LOCALE, isSupportedLocale, type AppLocale } from './locales';

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

export const routePaths = {
  home: '/',
  catalog: '/catalog',
  login: '/login',
  register: '/register',
  otp: '/otp',
  forgotPassword: '/forgot-password',
} as const;

export const localizedRoutes = {
  home: (locale: AppLocale) => withLocale(locale, routePaths.home),
  catalog: (locale: AppLocale) => withLocale(locale, routePaths.catalog),
  login: (locale: AppLocale) => withLocale(locale, routePaths.login),
  register: (locale: AppLocale) => withLocale(locale, routePaths.register),
  otp: (locale: AppLocale) => withLocale(locale, routePaths.otp),
  forgotPassword: (locale: AppLocale) => withLocale(locale, routePaths.forgotPassword),
} as const;

export const replaceLocale = (pathname: string, targetLocale: AppLocale): string => {
  const [path = '/', query = ''] = pathname.split('?');
  const segments = path.split('/').filter(Boolean);

  if (segments[0] && isSupportedLocale(segments[0])) {
    const rest = segments.slice(1);
    const suffix = rest.length > 0 ? `/${rest.join('/')}` : '';

    return `/${targetLocale}${suffix}${query ? `?${query}` : ''}`;
  }

  const localizedPath = path === '/' ? withLocale(targetLocale) : withLocale(targetLocale, path);

  return `${localizedPath}${query ? `?${query}` : ''}`;
};

export const getLocaleFromPathname = (pathname: string): AppLocale => {
  const firstSegment = pathname.split('/').filter(Boolean)[0];

  return firstSegment && isSupportedLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
};
