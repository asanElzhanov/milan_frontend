import { clearCartToken, getCartToken, setCartToken } from './cart-token-storage';

export type CartTokenSource = 'cart_response' | 'manual' | 'merge' | 'unknown';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readCartTokenCandidate = (response: unknown): unknown => {
  if (!isRecord(response)) {
    return undefined;
  }

  const topLevelToken = response.cart_token ?? response.cartToken ?? response.token;

  if (topLevelToken !== undefined) {
    return topLevelToken;
  }

  if (isRecord(response.cart) && response.cart.cart_token !== undefined) {
    return response.cart.cart_token;
  }

  if (isRecord(response.data) && response.data.cart_token !== undefined) {
    return response.data.cart_token;
  }

  return undefined;
};

export function normalizeCartToken(token: unknown): string | null {
  if (typeof token !== 'string') {
    return null;
  }

  const normalizedToken = token.trim();

  return normalizedToken || null;
}

export function saveCartToken(
  token: unknown,
  options?: { source?: CartTokenSource },
): string | null {
  void options;

  const normalizedToken = normalizeCartToken(token);

  if (!normalizedToken) {
    return null;
  }

  setCartToken(normalizedToken);

  return normalizedToken;
}

export function removeCartToken(): void {
  clearCartToken();
}

export function getCurrentCartToken(): string | null {
  return getCartToken();
}

export function syncCartTokenFromResponse(response: unknown): string | null {
  const tokenCandidate = readCartTokenCandidate(response);

  if (tokenCandidate === undefined) {
    return null;
  }

  return saveCartToken(tokenCandidate, { source: 'cart_response' });
}
