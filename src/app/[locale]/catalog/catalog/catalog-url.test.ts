import { describe, expect, it } from 'vitest';

import { buildCatalogHref, isRecommendedSort, parseCatalogSearchParams } from './catalog-url';

describe('recommended catalog mode', () => {
  it('keeps recommended in the URL with the other filters', () => {
    expect(buildCatalogHref('ru', { ordering: 'recommended', brand: ['nike'], page: '2' }))
      .toBe('/ru/catalog?brand=nike&ordering=recommended&page=2');
  });

  it('does not send recommended as catalog ordering', () => {
    const query = parseCatalogSearchParams({ ordering: 'recommended', search: 'boots' });
    expect(query).toMatchObject({ search: 'boots', page: 1 });
    expect(query.ordering).toBeUndefined();
    expect(isRecommendedSort('recommended')).toBe(true);
  });
});
