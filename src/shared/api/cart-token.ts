import { setCartToken } from './cart-token-storage';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export function persistCartTokenFromResponse(response: unknown): void {
  if (!isRecord(response)) {
    return;
  }

  const token = response.cart_token ?? response.cartToken;

  if (typeof token === 'string' && token.trim()) {
    setCartToken(token);
  }
}
