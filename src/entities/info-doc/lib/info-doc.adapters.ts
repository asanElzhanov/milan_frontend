import type { AppLocale } from '@/shared/config';
import { isRecord, toNumberOrNull, toStringOrNull } from '@/shared/lib';

import type { InfoDoc } from '../model/info-doc.types';

const readLocalizedTitle = (value: Record<string, unknown>, locale: AppLocale): string => {
  const localeSuffix = locale === 'kk' ? 'kz' : locale;

  return (
    toStringOrNull(value[`title_${localeSuffix}`]) ?? toStringOrNull(value.title_ru) ?? ''
  );
};

export const adaptInfoDoc = (value: unknown, locale: AppLocale): InfoDoc | null => {
  if (!isRecord(value)) {
    return null;
  }

  const id = toNumberOrNull(value.id);
  const fileUrl = toStringOrNull(value.file);

  if (id === null || !fileUrl) {
    return null;
  }

  return {
    id,
    title: readLocalizedTitle(value, locale),
    fileUrl,
    sortOrder: toNumberOrNull(value.sort_order) ?? 0,
  };
};

export const adaptInfoDocs = (value: unknown, locale: AppLocale): InfoDoc[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => adaptInfoDoc(item, locale))
    .filter((doc): doc is InfoDoc => doc !== null)
    .sort((a, b) => a.sortOrder - b.sortOrder);
};
