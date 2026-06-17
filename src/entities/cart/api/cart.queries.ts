import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  AddCartItemPayload,
  ApplyPromoCodePayload,
  Cart,
  CartMergePayload,
  CreateCartItemPayload,
  UpdateCartItemPayload,
} from '../model/cart.types';
import { cartApi } from './cart.api';
import { cartKeys } from './cart.keys';

const updateCartQuery = (cart: Cart, queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.setQueryData(cartKeys.current(), cart);
  void queryClient.invalidateQueries({ queryKey: cartKeys.current() });
};

export function useCartQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: cartKeys.current(),
    queryFn: () => cartApi.getCart(),
    enabled: options?.enabled,
    retry: 1,
  });
}

export function useAddCartItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddCartItemPayload) => cartApi.addItem(payload),
    retry: false,
    onSuccess: (cart) => updateCartQuery(cart, queryClient),
  });
}

export function useCreateCartItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCartItemPayload) => cartApi.createItem(payload),
    retry: false,
    onSuccess: (cart) => updateCartQuery(cart, queryClient),
  });
}

export function useUpdateCartItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      payload,
    }: {
      itemId: string | number;
      payload: UpdateCartItemPayload;
    }) => cartApi.updateItem(itemId, payload),
    retry: false,
    onSuccess: (cart) => updateCartQuery(cart, queryClient),
  });
}

export function useRemoveCartItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string | number) => cartApi.removeItem(itemId),
    retry: false,
    onSuccess: (cart) => updateCartQuery(cart, queryClient),
  });
}

export function useClearCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartApi.clearCart(),
    retry: false,
    onSuccess: (cart) => updateCartQuery(cart, queryClient),
  });
}

export function useMergeCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload?: CartMergePayload) => cartApi.mergeCart(payload),
    retry: false,
    onSuccess: (cart) => updateCartQuery(cart, queryClient),
  });
}

export function useApplyPromoCodeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ApplyPromoCodePayload) => cartApi.applyPromoCode(payload),
    retry: false,
    onSuccess: (cart) => updateCartQuery(cart, queryClient),
  });
}

export function useRemovePromoCodeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cartApi.removePromoCode(),
    retry: false,
    onSuccess: (cart) => updateCartQuery(cart, queryClient),
  });
}
