import { cartApi } from '@/entities/cart';
import { getCartToken, hasCartToken } from '@/shared/api';

export function shouldMergeGuestCartAfterLogin(): boolean {
  return hasCartToken();
}

export function getGuestCartTokenForMerge(): string | null {
  return getCartToken();
}

export async function mergeGuestCartAfterAuth(): Promise<void> {
  if (!hasCartToken()) {
    return;
  }

  await cartApi.mergeCart();
}
