import type { AppLocale } from '@/shared/config';
import { getLocalizedField, localizeBackendValue } from '@/shared/lib';

import type { ProductColorSwatch } from '../model/product.types';

/**
 * Colors on products arrive as flattened strings (the backend's `name_ru`) so
 * they can serve as a stable identity for variant matching. The localized
 * names, however, live on the color swatches. This builds a lookup that maps
 * every known alias of a color (its ru/kz/en name and slug) to the name in the
 * requested locale, falling back to the shared backend-value dictionary for
 * anything the swatches don't cover.
 */
export function createColorLocalizer(
  swatches: ProductColorSwatch[] | undefined,
  locale: AppLocale,
): (value: string | null | undefined) => string {
  const byAlias = new Map<string, string>();

  for (const swatch of swatches ?? []) {
    const localized = getLocalizedField(swatch, 'name', locale) || swatch.name;

    if (!localized) {
      continue;
    }

    for (const alias of [
      swatch.name,
      swatch.name_ru,
      swatch.name_kz,
      swatch.name_en,
      swatch.slug,
    ]) {
      const key = alias?.trim().toLowerCase();

      if (key) {
        byAlias.set(key, localized);
      }
    }
  }

  return (value) => {
    const raw = value?.trim() ?? '';

    if (!raw) {
      return '';
    }

    return byAlias.get(raw.toLowerCase()) ?? localizeBackendValue(raw, locale, raw);
  };
}
