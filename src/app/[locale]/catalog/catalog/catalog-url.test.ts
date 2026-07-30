import { describe, expect, it } from 'vitest';

import {
  buildCatalogHref,
  isRecommendedSort,
  parseCatalogSearchParams,
  shouldUseRecommendations,
} from './catalog-url';

describe('recommended catalog mode', () => {
  it('keeps recommended in the URL with the other filters', () => {
    expect(buildCatalogHref('ru', { ordering: 'recommended', brand: ['nike'], page: '2' })).toBe(
      '/ru/catalog?brand=nike&ordering=recommended&page=2',
    );
  });

  it('does not send recommended as catalog ordering', () => {
    const query = parseCatalogSearchParams({ ordering: 'recommended', search: 'boots' });
    expect(query).toMatchObject({ search: 'boots', page: 1 });
    expect(query.ordering).toBeUndefined();
    expect(isRecommendedSort('recommended')).toBe(true);
  });

  it('bypasses recommendations when a category is selected', () => {
    expect(shouldUseRecommendations({ ordering: 'recommended' }, 'men')).toBe(false);
    expect(parseCatalogSearchParams({}, 'men')).toMatchObject({
      category: 'men',
      category_slug: 'men',
    });
  });

  it('bypasses recommendations when another catalog filter is selected', () => {
    expect(shouldUseRecommendations({ ordering: 'recommended', color: 'black' })).toBe(false);
    expect(shouldUseRecommendations({ ordering: 'recommended' })).toBe(true);
  });
});
