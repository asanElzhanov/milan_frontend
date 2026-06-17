import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getAccessToken } from '@/shared/api';

import type { Wishlist } from '../model/wishlist.types';
import { wishlistApi } from './wishlist.api';
import { wishlistKeys } from './wishlist.keys';

const updateWishlistAfterToggle = (
  current: Wishlist | undefined,
  productId: string | number,
  isWishlisted: boolean,
): Wishlist => {
  const fallback: Wishlist = current ?? { items: [], productIds: [], count: 0 };
  const hasProductId = fallback.productIds.map(String).includes(String(productId));
  const nextProductIds = isWishlisted
    ? hasProductId
      ? fallback.productIds
      : [...fallback.productIds, productId]
    : fallback.productIds.filter((id) => String(id) !== String(productId));
  const nextItems = isWishlisted
    ? fallback.items
    : fallback.items.filter((item) => String(item.productId) !== String(productId));

  return {
    items: nextItems,
    productIds: nextProductIds,
    count: nextItems.length || nextProductIds.length,
  };
};

export function useWishlistQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: wishlistKeys.current(),
    queryFn: () => wishlistApi.getWishlist(),
    enabled: options?.enabled ?? Boolean(getAccessToken()),
    retry: 1,
  });
}

export function useToggleWishlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string | number) => wishlistApi.toggleWishlist(productId),
    retry: false,
    onSuccess: async (result) => {
      if (result.wishlist) {
        queryClient.setQueryData(wishlistKeys.current(), result.wishlist);
      } else {
        queryClient.setQueryData<Wishlist | undefined>(wishlistKeys.current(), (current) =>
          updateWishlistAfterToggle(current, result.productId, result.isWishlisted),
        );
      }

      await queryClient.invalidateQueries({ queryKey: wishlistKeys.current() });
    },
  });
}
