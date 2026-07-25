import { describe, expect, it } from 'vitest';

import { normalizeMediaUrl } from './media-url';

describe('normalizeMediaUrl', () => {
  it('routes relative backend media through the frontend origin', () => {
    expect(normalizeMediaUrl('/media/banners/summer.jpg')).toBe(
      '/media-proxy/media/banners/summer.jpg',
    );
    expect(normalizeMediaUrl('uploads/categories/shoes.png?v=2')).toBe(
      '/media-proxy/uploads/categories/shoes.png?v=2',
    );
  });

  it('does not proxy third-party absolute media', () => {
    expect(normalizeMediaUrl('https://cdn.example.com/products/1.jpg')).toBe(
      'https://cdn.example.com/products/1.jpg',
    );
  });
});
