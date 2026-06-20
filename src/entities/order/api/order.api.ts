import { apiClient, isMockApiMode } from '@/shared/api';

import { adaptOrder, adaptOrderList } from '../lib/order.adapters';
import type { Order, OrderListResponse } from '../model/order.types';

const ORDER_LIST_ENDPOINT = '/api/v1/orders/history/';
const ORDER_DETAIL_ENDPOINT = '/api/v1/orders/{orderNumber}/';

export const orderEndpointConfig = {
  list: ORDER_LIST_ENDPOINT,
  detail: ORDER_DETAIL_ENDPOINT,
} as const;

export const createEmptyOrderList = (page = 1): OrderListResponse => ({
  orders: [],
  count: 0,
  currentPage: page,
  totalPages: 1,
});

export const orderApi = {
  async getOrders(params?: { page?: number }): Promise<OrderListResponse> {
    const page = params?.page && params.page > 0 ? params.page : 1;

    if (isMockApiMode) {
      return createEmptyOrderList(page);
    }

    const response = await apiClient.get<unknown>(orderEndpointConfig.list, {
      cartToken: false,
      query: page > 1 ? { page } : undefined,
    });

    return adaptOrderList(response);
  },

  async getOrder(orderNumber: string | number): Promise<Order | null> {
    if (isMockApiMode) {
      return null;
    }

    const response = await apiClient.get<unknown>(
      `/api/v1/orders/${encodeURIComponent(String(orderNumber))}/`,
      { cartToken: false },
    );

    return adaptOrder(response);
  },
};
