import type { ProductDetail, ProductMedia } from '@/entities/product';
import { IMAGE_FALLBACK, getMediaUrl } from '@/shared/lib';

import type { ProductGalleryItem } from './product-detail.types';

const toGalleryItem = (item: ProductMedia, index: number): ProductGalleryItem | null => {
  if (!item.url) {
    return null;
  }

  return {
    id: String(item.id ?? `${item.type}-${index}-${item.url}`),
    type: item.type,
    url: getMediaUrl(item.url),
    alt: item.alt,
  };
};

export const getProductGalleryItems = (product: ProductDetail): ProductGalleryItem[] => {
  const media = [...(product.images ?? []), ...(product.media ?? []), ...(product.videos ?? [])];
  const seen = new Set<string>();
  const items = media
    .map(toGalleryItem)
    .filter((item): item is ProductGalleryItem => Boolean(item))
    .filter((item) => {
      const key = `${item.type}:${item.url}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);

      return true;
    });

  if (items.length > 0) {
    return items;
  }

  return [
    {
      id: 'fallback',
      type: 'image',
      url: product.mainImage ? getMediaUrl(product.mainImage) : IMAGE_FALLBACK,
      alt: product.name,
    },
  ];
};
