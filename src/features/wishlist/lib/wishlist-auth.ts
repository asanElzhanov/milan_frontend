import { getSafeCallbackUrl, loginWithCallback, type AppLocale } from '@/shared/config';

export function buildWishlistLoginHref(locale: AppLocale, callbackPath: string): string {
  return loginWithCallback(locale, getSafeCallbackUrl(callbackPath, `/${locale}`));
}
