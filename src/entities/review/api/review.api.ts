import { apiClient, isMockApiMode } from '@/shared/api';

import { adaptReview, adaptReviewList } from '../lib/review.adapters';
import type {
  CreateProductReviewPayload,
  ProductReview,
  ReviewListResponse,
} from '../model/review.types';

const PRODUCT_REVIEWS_ENDPOINT = '/api/v1/catalog/products/{slug}/reviews/';
const CREATE_REVIEW_ENDPOINT = '/api/v1/catalog/reviews/';

export const reviewEndpointConfig = {
  productList: PRODUCT_REVIEWS_ENDPOINT,
  productCreate: CREATE_REVIEW_ENDPOINT,
  accountList: null,
  productCreateConfigured: true,
  accountListConfigured: false,
} as const;

export const createEmptyReviewList = (page = 1): ReviewListResponse => ({
  reviews: [],
  count: 0,
  currentPage: page,
  totalPages: 1,
});

const productReviewsPath = (slug: string) =>
  `/api/v1/catalog/products/${encodeURIComponent(slug)}/reviews/`;

export const reviewApi = {
  async getProductReviews(slug: string): Promise<ReviewListResponse> {
    if (isMockApiMode) return createEmptyReviewList();

    const response = await apiClient.get<unknown>(productReviewsPath(slug), {
      auth: false,
      cartToken: false,
    });

    return adaptReviewList(response);
  },

  async createProductReview(
    slug: string,
    payload: CreateProductReviewPayload,
  ): Promise<ProductReview | null> {
    if (isMockApiMode) {
      throw new Error('Создание отзывов недоступно в текущем режиме API.');
    }

    const response = await apiClient.post<unknown>(
      CREATE_REVIEW_ENDPOINT,
      {
        product_slug: slug,
        ...payload,
      },
      {
        cartToken: false,
      },
    );

    return adaptReview(response);
  },

  async getMyReviews(params?: { page?: number }): Promise<ReviewListResponse> {
    const page = params?.page && params.page > 0 ? params.page : 1;

    if (isMockApiMode) return createEmptyReviewList(page);

    throw new Error('Backend endpoint для отзывов текущего пользователя пока не подтвержден.');
  },
};
