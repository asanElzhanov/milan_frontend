import { describe, expect, it } from 'vitest';

import { adaptReview, adaptReviewList } from './review.adapters';

describe('review backend adapters', () => {
  it('adapts a personal review with localized product, moderation and media fields', () => {
    const review = adaptReview({
      id: 31,
      product: {
        id: 8,
        slug: 'nike-air',
        name_ru: 'Кроссовки',
        name_kz: 'Кроссовка',
        name_en: 'Sneakers',
      },
      order: { id: 17, order_number: 'ORD-ABC12345' },
      user_name: 'Амина',
      rating: 5,
      text: 'Отлично',
      status: 'rejected',
      media: [
        { id: 52, url: '/media/reviews/photo.jpg', media_type: 'image' },
        { id: 53, url: '/media/reviews/video.mp4', media_type: 'video' },
      ],
      is_verified_purchase: true,
      moderation_comment: 'Уточните описание',
      moderated_at: '2026-07-29T13:00:00+05:00',
      created_at: '2026-07-29T12:00:00+05:00',
      updated_at: '2026-07-29T13:00:00+05:00',
    });

    expect(review).toMatchObject({
      id: 31,
      productId: 8,
      productSlug: 'nike-air',
      productNames: { ru: 'Кроссовки', kk: 'Кроссовка', en: 'Sneakers' },
      orderId: 17,
      orderNumber: 'ORD-ABC12345',
      status: 'rejected',
      moderationComment: 'Уточните описание',
      isVerifiedPurchase: true,
      media: [
        { id: 52, url: '/media-proxy/media/reviews/photo.jpg', mediaType: 'image' },
        { id: 53, url: '/media-proxy/media/reviews/video.mp4', mediaType: 'video' },
      ],
    });
  });

  it('adapts the paginated mine response', () => {
    const result = adaptReviewList({
      count: 11,
      next: 'http://localhost:8000/api/v1/catalog/reviews/mine/?page=2',
      previous: null,
      results: [{ id: 1, rating: 4, text: 'Хорошо', media: [] }],
    });

    expect(result).toMatchObject({ count: 11, currentPage: 1, totalPages: 2 });
    expect(result.reviews).toHaveLength(1);
  });
});
