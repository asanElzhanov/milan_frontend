export type ProductReview = {
  id: string | number;
  productId?: string | number | null;
  productSlug?: string | null;
  authorName?: string | null;
  rating: number;
  text?: string | null;
  status?: string | null;
  createdAt?: string | null;
};
