import { ApiError, apiClient, isMockApiMode } from '@/shared/api';

import {
  adaptToggleWishlistResult,
  adaptWishlist,
  createEmptyWishlist,
} from '../lib/wishlist.adapters';
import type { ToggleWishlistResult, Wishlist } from '../model/wishlist.types';

const WISHLIST_ENDPOINT = '/api/v1/auth/wishlist/';
const WISHLIST_MUTATION_DISABLED = 'Wishlist API is disabled in mock mode';

export const wishlistApi = {
  async getWishlist(): Promise<Wishlist> {
    if (isMockApiMode) {
      return createEmptyWishlist();
    }

    const response = await apiClient.get<unknown>(WISHLIST_ENDPOINT);

    return adaptWishlist(response);
  },

  async toggleWishlist(productId: string | number): Promise<ToggleWishlistResult> {
    if (isMockApiMode) {
      throw new ApiError({
        status: 503,
        message: WISHLIST_MUTATION_DISABLED,
        code: 'wishlist_mock_mode',
      });
    }

    const response = await apiClient.post<unknown>(
      `/api/v1/auth/wishlist/toggle/${encodeURIComponent(String(productId))}/`,
    );

    return adaptToggleWishlistResult(response, productId);
  },
};
