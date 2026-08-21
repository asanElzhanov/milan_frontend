import type { AppLocale } from '@/shared/config';
import { localizeBackendValue } from '@/shared/lib';

/**
 * Product season codes. Mirrors `Product.Season` in the backend
 * (apps/catalog/models.py) — keep the two in sync.
 */
export const PRODUCT_SEASONS = ['ss', 'aw', 'as', 'all'] as const;

export type ProductSeason = (typeof PRODUCT_SEASONS)[number];

export type SeasonOption = {
  value: ProductSeason;
  label: string;
};

/**
 * Localized `{ value, label }` options for a season selector. Labels come from
 * the shared backend-value dictionary so they stay consistent with how a
 * product's season is rendered elsewhere.
 */
export const getSeasonOptions = (locale: AppLocale): SeasonOption[] =>
  PRODUCT_SEASONS.map((value) => ({
    value,
    label: localizeBackendValue(value, locale, value),
  }));
