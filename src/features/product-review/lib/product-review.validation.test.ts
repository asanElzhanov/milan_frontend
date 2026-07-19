import { describe, expect, it } from 'vitest';

import { createReviewPayload } from '@/entities/review';
import { validateProductReviewForm } from './product-review.validation';

describe('product review submission', () => {
  it('keeps rating numeric and uses confirmed ids only', () => {
    expect(createReviewPayload({ rating: 5, text: 'Great', productId: 123, orderId: 456 }))
      .toEqual({ rating: 5, text: 'Great', product_id: 123, order_id: 456 });
  });

  it('validates rating, order and text', () => {
    expect(validateProductReviewForm({ rating: 0, orderNumber: '', text: '' }))
      .toEqual({ rating: 'rating', orderNumber: 'orderNumber', text: 'text' });
  });
});
