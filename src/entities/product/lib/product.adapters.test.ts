import { describe, expect, it } from 'vitest';

import { adaptProductDetail, adaptProductListItem } from './product.adapters';

describe('product media adapters', () => {
  it('keeps the nested category slug for localized product-card labels', () => {
    expect(
      adaptProductListItem({
        id: 1,
        name: 'Sara Milan',
        slug: 'sara-milan',
        category_name: '\u0416\u0435\u043d\u0449\u0438\u043d\u0430\u043c',
        category: { id: 2, name: 'Women', slug: 'women' },
      }),
    ).toMatchObject({
      categoryName: '\u0416\u0435\u043d\u0449\u0438\u043d\u0430\u043c',
      categorySlug: 'women',
    });
  });

  it('extracts per-locale category and brand names from the nested objects', () => {
    expect(
      adaptProductListItem({
        id: 1,
        name: 'Sara Milan',
        slug: 'sara-milan',
        category: { id: 2, name_ru: 'Кроссовки', name_kz: 'Кроссовкалар', name_en: 'Sneakers', slug: 'sneakers' },
        brand: { id: 3, name_ru: 'Найк', name_kz: 'Найк', name_en: 'Nike', slug: 'nike' },
      }),
    ).toMatchObject({
      categoryName_ru: 'Кроссовки',
      categoryName_en: 'Sneakers',
      categoryName_kz: 'Кроссовкалар',
      brandName_ru: 'Найк',
      brandName_en: 'Nike',
      brandName_kz: 'Найк',
    });
  });

  it('maps the main product media type used by product cards', () => {
    expect(
      adaptProductListItem({
        id: 1,
        name: 'Video product',
        slug: 'video-product',
        main_image: '/media/products/main.mp4',
        main_media_type: 'video',
      }),
    ).toMatchObject({
      mainImage: '/media-proxy/media/products/main.mp4',
      mainMediaType: 'video',
    });
  });

  it('uses images[].media_type for mixed product galleries', () => {
    const product = adaptProductDetail({
      id: 1,
      name: 'Mixed gallery',
      slug: 'mixed-gallery',
      images: [
        { id: 10, image: '/media/products/front.webp', media_type: 'image' },
        { id: 11, image: '/media/products/look.webm', media_type: 'video' },
      ],
    });

    expect(product?.images).toEqual([
      {
        id: 10,
        url: '/media-proxy/media/products/front.webp',
        type: 'image',
        alt: null,
        isPrimary: undefined,
      },
      {
        id: 11,
        url: '/media-proxy/media/products/look.webm',
        type: 'video',
        alt: null,
        isPrimary: undefined,
      },
    ]);
  });
});
