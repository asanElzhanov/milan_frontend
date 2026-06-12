const CART_TOKEN_KEY = 'sara_milan_cart_token';

const getStorage = (): Storage | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
};

export function getCartToken(): string | null {
  const token = getStorage()?.getItem(CART_TOKEN_KEY)?.trim();

  return token || null;
}

// Guest cart token support for X-Cart-Token. Full cart flows will use this in cart prompts.
export function setCartToken(token: string | null): void {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  const normalizedToken = token?.trim();

  if (normalizedToken) {
    storage.setItem(CART_TOKEN_KEY, normalizedToken);
    return;
  }

  storage.removeItem(CART_TOKEN_KEY);
}

export function clearCartToken(): void {
  setCartToken(null);
}
