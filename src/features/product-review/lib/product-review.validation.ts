export type ProductReviewFormErrors = { rating?: string; text?: string };

export function validateProductReviewForm(values: {
  rating: number;
  text: string;
}): ProductReviewFormErrors {
  return {
    rating: values.rating < 1 || values.rating > 5 ? 'rating' : undefined,
    text: values.text.trim() ? undefined : 'text',
  };
}

export function hasProductReviewFormErrors(errors: ProductReviewFormErrors): boolean {
  return Boolean(errors.rating || errors.text);
}
