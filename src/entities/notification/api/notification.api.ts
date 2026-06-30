import { ApiError, apiClient, isMockApiMode } from '@/shared/api';

import { adaptNotificationList, createEmptyNotificationList } from '../lib/notification.adapters';
import type { NotificationListResponse } from '../model/notification.types';

const NOTIFICATIONS_ENDPOINT = '/api/v1/notifications/';
const NOTIFICATIONS_READ_ALL_ENDPOINT = '/api/v1/notifications/read-all/';
const NOTIFICATIONS_MUTATION_DISABLED = 'Notifications API is disabled in mock mode';

export const notificationEndpointConfig = {
  list: NOTIFICATIONS_ENDPOINT,
  readAll: NOTIFICATIONS_READ_ALL_ENDPOINT,
} as const;

export const notificationApi = {
  async getNotifications(params?: { page?: number }): Promise<NotificationListResponse> {
    const page = params?.page && params.page > 0 ? params.page : 1;

    if (isMockApiMode) {
      return createEmptyNotificationList(page);
    }

    const response = await apiClient.get<unknown>(notificationEndpointConfig.list, {
      cartToken: false,
      query: page > 1 ? { page } : undefined,
    });

    return adaptNotificationList(response);
  },

  async markAllAsRead(): Promise<NotificationListResponse | null> {
    if (isMockApiMode) {
      throw new ApiError({
        status: 503,
        message: NOTIFICATIONS_MUTATION_DISABLED,
        code: 'notifications_mock_mode',
      });
    }

    const response = await apiClient.post<unknown>(notificationEndpointConfig.readAll, undefined, {
      cartToken: false,
    });

    return response === undefined || response === null ? null : adaptNotificationList(response);
  },
};
