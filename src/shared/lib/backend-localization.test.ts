import { describe, expect, it } from 'vitest';

import { localizeBackendValue } from './backend-localization';

describe('localizeBackendValue', () => {
  it('uses stable backend codes when localized values are missing', () => {
    expect(localizeBackendValue('Courier delivery', 'ru', 'courier')).toBe('Курьерская доставка');
    expect(localizeBackendValue('Courier delivery', 'kk', 'courier')).toBe('Курьерлік жеткізу');
  });

  it('translates known backend values and preserves unknown content', () => {
    expect(localizeBackendValue('Black', 'kk')).toBe('Қара');
    expect(localizeBackendValue('Custom collection', 'ru')).toBe('Custom collection');
  });

  it.each([
    ['ru', '\u0427\u0451\u0440\u043d\u044b\u0439'],
    ['kk', '\u049a\u0430\u0440\u0430'],
    ['en', 'Black'],
  ] as const)('localizes a color filter slug in %s', (locale, expected) => {
    expect(localizeBackendValue('black', locale, 'black')).toBe(expected);
  });

  it('uses the category slug when the backend name is in another locale', () => {
    expect(
      localizeBackendValue('\u0416\u0435\u043d\u0449\u0438\u043d\u0430\u043c', 'en', 'women'),
    ).toBe('Women');
  });
});
