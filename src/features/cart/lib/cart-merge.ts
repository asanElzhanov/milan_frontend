import { cartApi } from '@/entities/cart';
import { clearCartToken, getCartToken, hasCartToken } from '@/shared/api';

export function shouldMergeGuestCartAfterLogin(): boolean {
  return hasCartToken();
}

export function getGuestCartTokenForMerge(): string | null {
  return getCartToken();
}

export async function mergeGuestCartAfterAuth(): Promise<void> {
  const guestCartToken = getCartToken();

  if (!guestCartToken) {
    return;
  }

  await cartApi.mergeCart({ guest_cart_token: guestCartToken });
  clearCartToken();
}
