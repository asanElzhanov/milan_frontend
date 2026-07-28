export type ReviewStatus = 'pending' | 'published' | 'rejected' | 'hidden' | string;

export type ReviewMedia = {
  id: string | number;
  url: string;
  mediaType: 'image' | 'video';
};

export type ReviewProductNames = {
  ru?: string | null;
  kk?: string | null;
  en?: string | null;
};

export type ProductReview = {
  id: string | number;
  productId?: string | number | null;
  productSlug?: string | null;
  productName?: string | null;
  productImageUrl?: string | null;
  orderId?: string | number | null;
  orderNumber?: string | null;
  media: ReviewMedia[];
  productNames?: ReviewProductNames;
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
  moderationComment?: string | null;
  moderatedAt?: string | null;
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
  media?: File[];
};
