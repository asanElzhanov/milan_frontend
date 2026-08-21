import { describe, expect, it } from 'vitest';

import { PRODUCT_SEASONS, getSeasonOptions } from './season';

describe('getSeasonOptions', () => {
  it('exposes every backend season code', () => {
    expect(PRODUCT_SEASONS).toEqual(['ss', 'aw', 'as', 'all']);
    expect(getSeasonOptions('ru').map((option) => option.value)).toEqual(PRODUCT_SEASONS);
  });

  it('localizes labels, including the new Осень/Весна season', () => {
    const byValue = (locale: 'ru' | 'kk' | 'en') =>
      Object.fromEntries(getSeasonOptions(locale).map((option) => [option.value, option.label]));

    expect(byValue('ru').as).toBe('Осень/Весна');
    expect(byValue('kk').as).toBe('Күз/Көктем');
    expect(byValue('en').as).toBe('Autumn/Spring');

    // Previously-untranslated codes now resolve too.
    expect(byValue('en').ss).toBe('Spring/Summer');
    expect(byValue('kk').aw).toBe('Күз/Қыс');
    expect(byValue('en').all).toBe('All seasons');
  });
});
