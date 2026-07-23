import { describe, expect, it } from 'vitest';

import { createApiUrl } from './http-client';

describe('createApiUrl', () => {
  it('builds a same-origin URL from a relative API base', () => {
    expect(createApiUrl('/api/v1', '/api/v1/orders/cart/items/')).toBe(
      '/api/v1/orders/cart/items/',
    );
  });

  it('keeps support for absolute backend URLs', () => {
    expect(createApiUrl('https://saramilan.com/api/v1', '/api/v1/orders/cart/')).toBe(
      'https://saramilan.com/api/v1/orders/cart/',
    );
  });

  it('appends query parameters to a relative URL', () => {
    expect(createApiUrl('/api/v1', '/api/v1/catalog/products/', { page: 2 })).toBe(
      '/api/v1/catalog/products/?page=2',
    );
  });
});
