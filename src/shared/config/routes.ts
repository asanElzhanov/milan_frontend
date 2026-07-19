import { DEFAULT_LOCALE, isSupportedLocale, type AppLocale, type SupportedLocale } from './locales';

const normalizePath = (path: string): string => {
  if (!path || path === '/') {
    return '';
  }

  return path.startsWith('/') ? path : `/${path}`;
};

export const withLocale = (locale: SupportedLocale, path = '/'): string => {
  const normalizedPath = normalizePath(path);

  return normalizedPath ? `/${locale}${normalizedPath}` : `/${locale}`;
};

export const routePaths = {
  home: '/',
  catalog: '/catalog',
  product: '/product',
  cart: '/cart',
  checkout: '/checkout',
  account: '/account',
  accountSettings: '/account/settings',
  accountOrders: '/account/orders',
  accountAddresses: '/account/addresses',
  accountWishlist: '/account/wishlist',
  accountReviews: '/account/reviews',
  accountNotifications: '/account/notifications',
  login: '/login',
  register: '/register',
  otp: '/otp',
  forgotPassword: '/forgot-password',
  payment: '/payment',
  paymentSuccess: '/payment/success',
  paymentFail: '/payment/fail',
  paymentPending: '/payment/pending',
} as const;

export const localizedRoutes = {
  home: (locale: AppLocale) => withLocale(locale, routePaths.home),
  catalog: (locale: AppLocale) => withLocale(locale, routePaths.catalog),
  product: (locale: AppLocale, slug: string) =>
    withLocale(locale, `${routePaths.product}/${encodeURIComponent(slug)}`),
  cart: (locale: AppLocale) => withLocale(locale, routePaths.cart),
  checkout: (locale: AppLocale) => withLocale(locale, routePaths.checkout),
  account: (locale: AppLocale) => withLocale(locale, routePaths.account),
  accountSettings: (locale: AppLocale) => withLocale(locale, routePaths.accountSettings),
  accountOrders: (locale: AppLocale) => withLocale(locale, routePaths.accountOrders),
  accountOrderDetail: (locale: AppLocale, orderNumber: string | number) =>
    withLocale(locale, `${routePaths.accountOrders}/${encodeURIComponent(String(orderNumber))}`),
  accountAddresses: (locale: AppLocale) => withLocale(locale, routePaths.accountAddresses),
  accountWishlist: (locale: AppLocale) => withLocale(locale, routePaths.accountWishlist),
  accountReviews: (locale: AppLocale) => withLocale(locale, routePaths.accountReviews),
  accountNotifications: (locale: AppLocale) => withLocale(locale, routePaths.accountNotifications),
  login: (locale: AppLocale) => withLocale(locale, routePaths.login),
  register: (locale: AppLocale) => withLocale(locale, routePaths.register),
  otp: (locale: AppLocale) => withLocale(locale, routePaths.otp),
  forgotPassword: (locale: AppLocale) => withLocale(locale, routePaths.forgotPassword),
  payment: (locale: AppLocale, orderNumber: string | number) =>
    withLocale(locale, `${routePaths.payment}/${encodeURIComponent(String(orderNumber))}`),
  paymentSuccess: (locale: AppLocale) => withLocale(locale, routePaths.paymentSuccess),
  paymentFail: (locale: AppLocale) => withLocale(locale, routePaths.paymentFail),
  paymentPending: (locale: AppLocale) => withLocale(locale, routePaths.paymentPending),
} as const;

export function getSafeCallbackUrl(value: string | null, fallback: string): string {
  if (!value?.startsWith('/') || value.startsWith('//')) {
    return fallback;
  }

  try {
    const url = new URL(value, 'https://sara-milan.local');

    if (url.origin !== 'https://sara-milan.local') {
      return fallback;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function loginWithCallback(locale: AppLocale, callbackPath: string): string {
  const callbackUrl = getSafeCallbackUrl(callbackPath, withLocale(locale));

  return `${withLocale(locale, '/login')}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}

export const replaceLocale = (pathname: string, targetLocale: SupportedLocale): string => {
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
