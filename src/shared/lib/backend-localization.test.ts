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
});
