import { cartApi, getCartItemsCount } from '@/entities/cart';
import { isMockApiMode } from '@/shared/api';

import type { HeaderCartSummary } from '../model/types';

export async function getHeaderCartSummary(): Promise<HeaderCartSummary> {
  if (isMockApiMode) {
    return { count: 0 };
  }

  try {
    const cart = await cartApi.getCart();

    return { count: getCartItemsCount(cart) };
  } catch {
    return { count: 0 };
  }
}
