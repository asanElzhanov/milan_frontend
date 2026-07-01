import {
  apiClient,
  getAccessToken,
  getCartToken,
  isMockApiMode,
  syncCartTokenFromResponse,
} from '@/shared/api';

import { adaptCart, createEmptyCart } from '../lib/cart.adapters';
import type {
  AddCartItemPayload,
  ApplyPromoCodePayload,
  Cart,
  CartMergePayload,
  CreateCartItemPayload,
  UpdateCartItemPayload,
} from '../model/cart.types';

const CART_ENDPOINT = '/api/v1/orders/cart/';

const toCart = (response: unknown): Cart => {
  syncCartTokenFromResponse(response);

  if (response === undefined) {
    return createEmptyCart();
  }

  return adaptCart(response);
};

export const cartApi = {
  async getCart(): Promise<Cart> {
    if (isMockApiMode) {
      return createEmptyCart();
    }

    if (!getAccessToken() && !getCartToken()) {
      return createEmptyCart();
    }

    const response = await apiClient.get<unknown>(CART_ENDPOINT);

    return toCart(response);
  },

  async addItem(payload: AddCartItemPayload): Promise<Cart> {
    if (isMockApiMode) {
      return createEmptyCart();
    }

    const response = await apiClient.post<unknown>('/api/v1/orders/cart/items/', payload);

    return toCart(response);
  },

  async createItem(payload: CreateCartItemPayload): Promise<Cart> {
    if (isMockApiMode) {
      return createEmptyCart();
    }

    const response = await apiClient.post<unknown>('/api/v1/orders/cart/items/', payload);

    return toCart(response);
  },

  async updateItem(itemId: string | number, payload: UpdateCartItemPayload): Promise<Cart> {
    if (isMockApiMode) {
      return createEmptyCart();
    }

    const response = await apiClient.patch<unknown>(
      `/api/v1/orders/cart/items/${encodeURIComponent(String(itemId))}/`,
      payload,
    );

    return toCart(response);
  },

  async removeItem(itemId: string | number): Promise<Cart> {
    if (isMockApiMode) {
      return createEmptyCart();
    }

    const response = await apiClient.delete<unknown>(
      `/api/v1/orders/cart/items/${encodeURIComponent(String(itemId))}/`,
    );

    return toCart(response);
  },

  async removeItemByDeleteEndpoint(itemId: string | number): Promise<Cart> {
    if (isMockApiMode) {
      return createEmptyCart();
    }

    const response = await apiClient.delete<unknown>(
      `/api/v1/orders/cart/items/${encodeURIComponent(String(itemId))}/delete/`,
    );

    return toCart(response);
  },

  async clearCart(): Promise<Cart> {
    if (isMockApiMode) {
      return createEmptyCart();
    }

    const response = await apiClient.delete<unknown>('/api/v1/orders/cart/clear/');

    return toCart(response);
  },

  async mergeCart(payload?: CartMergePayload): Promise<Cart> {
    if (isMockApiMode) {
      return createEmptyCart();
    }

    const response = await apiClient.post<unknown>('/api/v1/orders/cart/merge/', payload ?? {});

    return toCart(response);
  },

  async applyPromoCode(payload: ApplyPromoCodePayload): Promise<Cart> {
    if (isMockApiMode) {
      return createEmptyCart();
    }

    const response = await apiClient.post<unknown>(
      '/api/v1/orders/cart/promo-code/apply/',
      payload,
    );

    return toCart(response);
  },

  async removePromoCode(): Promise<Cart> {
    if (isMockApiMode) {
      return createEmptyCart();
    }

    const response = await apiClient.delete<unknown>('/api/v1/orders/cart/promo-code/');

    return toCart(response);
  },
};
