import { describe, expect, it } from 'vitest';

import { adaptBanner } from './banner.adapters';

describe('banner media adapter', () => {
  it('maps desktop and mobile media URLs and types', () => {
    expect(
      adaptBanner({
        id: 1,
        image: '/media/banners/desktop.mp4',
        image_type: 'video',
        image_mobile: '/media/banners/mobile.avif',
        image_mobile_type: 'image',
      }),
    ).toMatchObject({
      imageUrl: '/media-proxy/media/banners/desktop.mp4',
      imageType: 'video',
      imageMobileUrl: '/media-proxy/media/banners/mobile.avif',
      imageMobileType: 'image',
    });
  });

  it('keeps the optional mobile media fields nullable', () => {
    expect(
      adaptBanner({ id: 1, image: '/media/banners/desktop.gif', image_type: 'image' }),
    ).toMatchObject({
      imageType: 'image',
      imageMobileUrl: null,
      imageMobileType: null,
    });
  });
});
