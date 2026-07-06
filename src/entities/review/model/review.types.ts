export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'published' | 'hidden' | string;

export type ProductReview = {
  id: string | number;
  productId?: string | number | null;
  productSlug?: string | null;
  productName?: string | null;
  productImageUrl?: string | null;
  orderId?: string | number | null;
  orderNumber?: string | null;
  images?: unknown[];
  isVerifiedPurchase?: boolean;
  authorName?: string | null;
  userName?: string | null;
  rating: number;
  title?: string | null;
  text?: string | null;
  advantages?: string | null;
  disadvantages?: string | null;
  status?: ReviewStatus | null;
  isApproved?: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type ReviewListResponse = {
  reviews: ProductReview[];
  count: number;
  currentPage: number;
  totalPages: number;
};

export type CreateProductReviewPayload = {
  rating: number;
  text?: string;
  order_id?: string | number;
  order_number?: string;
  product_id?: string | number;
  product_slug?: string;
};
