import { describe, expect, it } from 'vitest';

import { createColorLocalizer } from './color-localization';

const swatches = [
  { name: 'Красный', name_ru: 'Красный', name_kz: 'Қызыл', name_en: 'Red', slug: 'red', hex: null },
];

describe('createColorLocalizer', () => {
  it('localizes a flattened (name_ru) color value into the selected locale', () => {
    expect(createColorLocalizer(swatches, 'kk')('Красный')).toBe('Қызыл');
    expect(createColorLocalizer(swatches, 'en')('Красный')).toBe('Red');
    expect(createColorLocalizer(swatches, 'ru')('Красный')).toBe('Красный');
  });

  it('matches on any known alias (slug, other-locale name) case-insensitively', () => {
    const localize = createColorLocalizer(swatches, 'kk');

    expect(localize('red')).toBe('Қызыл');
    expect(localize('RED')).toBe('Қызыл');
    expect(localize('Red')).toBe('Қызыл');
  });

  it('falls back to the shared backend dictionary when no swatch matches', () => {
    const localize = createColorLocalizer(undefined, 'kk');

    expect(localize('black')).toBe('Қара');
  });

  it('returns the raw value for unknown colors and empty string for blanks', () => {
    const localize = createColorLocalizer(swatches, 'kk');

    expect(localize('Ультрамарин')).toBe('Ультрамарин');
    expect(localize('')).toBe('');
    expect(localize(null)).toBe('');
  });
});
