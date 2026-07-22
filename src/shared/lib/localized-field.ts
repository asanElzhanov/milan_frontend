import type { AppLocale } from '@/shared/config';
import { localizeBackendValue } from './backend-localization';

const suffixByLocale: Record<AppLocale | 'en', 'ru' | 'kz' | 'en'> = {
  ru: 'ru',
  kk: 'kz',
  en: 'en',
};

const asDisplayString = (value: unknown): string =>
  typeof value === 'string' || typeof value === 'number' ? String(value).trim() : '';

export function getLocalizedField<T extends object>(
  entity: T | null | undefined,
  field: string,
  locale: AppLocale,
): string {
  if (!entity) return '';
  const record = entity as Record<string, unknown>;
  const currentSuffix = suffixByLocale[locale as AppLocale | 'en'];
  const keys = [`${field}_${currentSuffix}`, `${field}_ru`, `${field}_en`, `${field}_kz`, field];

  for (const key of keys) {
    const value = asDisplayString(record[key]);
    if (value) {
      const stableKey =
        asDisplayString(record.slug) ||
        asDisplayString(record.code) ||
        asDisplayString(record.value);
      return localizeBackendValue(value, locale, stableKey);
    }
  }
  return '';
}
