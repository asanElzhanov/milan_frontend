export const SUPPORTED_LOCALES = ['ru', 'kk', 'en'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// `AppLocale` remains the component contract used by legacy dictionaries.
// Runtime locale validation also accepts English while dictionaries migrated
// in the active storefront flows expose an `en` entry.
export type AppLocale = 'ru' | 'kk';

export const DEFAULT_LOCALE: AppLocale = 'ru';

export function isSupportedLocale(locale: string): locale is AppLocale {
  return SUPPORTED_LOCALES.includes(locale as AppLocale);
}
