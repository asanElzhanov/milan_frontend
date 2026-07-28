import { describe, expect, it } from 'vitest';

import { createReviewPayload } from '@/entities/review';
import { validateProductReviewForm, validateReviewMediaFiles } from './product-review.validation';

describe('product review submission', () => {
  it('keeps rating numeric and uses confirmed ids only', () => {
    expect(createReviewPayload({ rating: 5, text: 'Great', productId: 123, orderId: 456 })).toEqual(
      { rating: 5, text: 'Great', product_id: 123, order_id: 456 },
    );
  });

  it('validates rating, order and text', () => {
    expect(validateProductReviewForm({ rating: 0, orderNumber: '', text: '' })).toEqual({
      rating: 'rating',
      orderNumber: 'orderNumber',
      text: 'text',
      media: undefined,
    });
  });

  it('enforces media count, format and size limits from the backend contract', () => {
    const image = { name: 'photo.jpg', type: 'image/jpeg', size: 1024 };

    expect(validateReviewMediaFiles(Array.from({ length: 6 }, () => image))).toBe('mediaCount');
    expect(
      validateReviewMediaFiles([{ name: 'document.pdf', type: 'application/pdf', size: 1024 }]),
    ).toBe('mediaType');
    expect(validateReviewMediaFiles([{ ...image, size: 10 * 1024 * 1024 + 1 }])).toBe('imageSize');
    expect(
      validateReviewMediaFiles([
        { name: 'video.mp4', type: 'video/mp4', size: 50 * 1024 * 1024 + 1 },
      ]),
    ).toBe('videoSize');
    expect(
      validateReviewMediaFiles([{ name: 'vector.svg', type: 'image/svg+xml', size: 1024 }]),
    ).toBe('mediaType');
  });
});
