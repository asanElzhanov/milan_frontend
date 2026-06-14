export const CART_TOKEN_STORAGE_KEY = 'sara_milan_cart_token';

const getStorage = (): Storage | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export function getCartToken(): string | null {
  try {
    const token = getStorage()?.getItem(CART_TOKEN_STORAGE_KEY)?.trim();

    return token || null;
  } catch {
    return null;
  }
}

// Stored in localStorage for now; this can move to httpOnly cookies if the backend adopts them.
export function setCartToken(token: string | null): void {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  const normalizedToken = token?.trim();

  try {
    if (normalizedToken) {
      storage.setItem(CART_TOKEN_STORAGE_KEY, normalizedToken);
      return;
    }

    storage.removeItem(CART_TOKEN_STORAGE_KEY);
  } catch {
    // Ignore storage failures so SSR/private browsing modes do not break API calls.
  }
}

export function clearCartToken(): void {
  setCartToken(null);
}

export function hasCartToken(): boolean {
  return getCartToken() !== null;
}
