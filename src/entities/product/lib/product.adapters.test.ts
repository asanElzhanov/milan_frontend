import { describe, expect, it } from 'vitest';

import { adaptProductDetail, adaptProductListItem } from './product.adapters';

describe('product media adapters', () => {
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
