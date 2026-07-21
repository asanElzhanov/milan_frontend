import { apiClient, isMockApiMode } from '@/shared/api';
import type { AppLocale } from '@/shared/config';

import { adaptDeliveryMethods } from '../lib/delivery-method.adapters';
import type { DeliveryMethod } from '../model/delivery-method.types';

const DELIVERY_METHODS_ENDPOINT = '/api/v1/orders/delivery-methods/';

export const deliveryMethodApi = {
  async getDeliveryMethods(locale: AppLocale = 'ru'): Promise<DeliveryMethod[]> {
    if (isMockApiMode) {
      return [];
    }

    const response = await apiClient.get<unknown>(DELIVERY_METHODS_ENDPOINT);

    return adaptDeliveryMethods(response, locale);
  },
};
