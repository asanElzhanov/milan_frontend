import { adaptProductListItem, type ProductListItem } from '@/entities/product';
import { apiClient } from '@/shared/api';
import { getArrayFromResponse, isRecord, toNumberOrNull } from '@/shared/lib';

export type RecommendationResult = {
  products: ProductListItem[];
  count: number;
  totalPages: number;
};

const unwrapRecommendationProduct = (value: unknown): unknown => {
  if (!isRecord(value)) return value;
  return value.product ?? value.item ?? value.recommended_product ?? value;
};

const adaptRecommendationResponse = (response: unknown): RecommendationResult => {
  const products = getArrayFromResponse(response)
    .map(unwrapRecommendationProduct)
    .map(adaptProductListItem)
    .filter((product): product is ProductListItem => Boolean(product));
  const record = isRecord(response) ? response : {};
  const count = toNumberOrNull(record.count) ?? products.length;
  const totalPages =
    toNumberOrNull(record.total_pages ?? record.totalPages) ??
    Math.max(Math.ceil(count / Math.max(products.length, 1)), 1);

  return { products, count, totalPages };
};

const getRecommendations = async (path: string, page: number): Promise<RecommendationResult> => {
  const response = await apiClient.get<unknown>(path, {
    cartToken: false,
    query: page > 1 ? { page } : undefined,
  });
  return adaptRecommendationResponse(response);
};

export const recommendationsApi = {
  getPersonalized: (page = 1) => getRecommendations('/api/v1/recommendations/', page),
  getPopular: (page = 1) => getRecommendations('/api/v1/recommendations/popular/', page),
};
