export const SUPPORTED_LOCALES = ['ru', 'kk', 'en'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type AppLocale = SupportedLocale;

export const DEFAULT_LOCALE: AppLocale = 'ru';

export const LOCALE_TAGS: Record<AppLocale, string> = {
  ru: 'ru-RU',
  kk: 'kk-KZ',
  en: 'en-US',
};

export function isSupportedLocale(locale: string): locale is AppLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}
