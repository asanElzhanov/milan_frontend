export const SUPPORTED_LOCALES = ['ru', 'kk', 'en'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type AppLocale = SupportedLocale;

export const DEFAULT_LOCALE: AppLocale = 'ru';

export function isSupportedLocale(locale: string): locale is AppLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}
