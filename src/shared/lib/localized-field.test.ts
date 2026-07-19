import { describe, expect, it } from 'vitest';

import { getLocalizedField } from './localized-field';

const product = {
  name: 'Legacy',
  name_ru: 'Русский',
  name_kz: 'Қазақша',
  name_en: 'English',
};

describe('getLocalizedField', () => {
  it.each([
    ['ru', 'Русский'],
    ['kk', 'Қазақша'],
    ['en', 'English'],
  ] as const)('maps %s to the backend field', (locale, expected) => {
    expect(getLocalizedField(product, 'name', locale as 'ru' | 'kk')).toBe(expected);
  });

  it('uses the documented fallback order', () => {
    expect(getLocalizedField({ name_en: 'English' }, 'name', 'kk')).toBe(
      'English',
    );
  });

  it('returns an empty string when no translation exists', () => {
    expect(getLocalizedField({}, 'name', 'ru')).toBe('');
  });
});
