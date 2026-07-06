export type ProductReviewFormErrors = { rating?: string; orderNumber?: string; text?: string };

export function validateProductReviewForm(values: {
  rating: number;
  orderNumber: string;
  text: string;
}): ProductReviewFormErrors {
  return {
    rating: values.rating < 1 || values.rating > 5 ? 'rating' : undefined,
    orderNumber: values.orderNumber.trim() ? undefined : 'orderNumber',
    text: values.text.trim() ? undefined : 'text',
  };
}

export function hasProductReviewFormErrors(errors: ProductReviewFormErrors): boolean {
  return Boolean(errors.rating || errors.orderNumber || errors.text);
}
