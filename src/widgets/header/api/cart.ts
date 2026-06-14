import { apiClient, isMockApiMode, syncCartTokenFromResponse } from '@/shared/api';

import { adaptHeaderCartSummary } from '../lib/header.adapters';
import type { HeaderCartSummary } from '../model/types';

export async function getHeaderCartSummary(): Promise<HeaderCartSummary> {
  if (isMockApiMode) {
    return { count: 0 };
  }

  try {
    const response = await apiClient.get<unknown>('/api/v1/orders/cart/', {
      auth: false,
    });

    syncCartTokenFromResponse(response);

    return adaptHeaderCartSummary(response);
  } catch {
    return { count: 0 };
  }
}
