import { getCartToken, hasCartToken } from '@/shared/api';

export function shouldMergeGuestCartAfterLogin(): boolean {
  return hasCartToken();
}

export function getGuestCartTokenForMerge(): string | null {
  return getCartToken();
}
