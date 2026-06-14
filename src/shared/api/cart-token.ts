import { syncCartTokenFromResponse } from './cart-token-manager';

export function persistCartTokenFromResponse(response: unknown): void {
  syncCartTokenFromResponse(response);
}

export { syncCartTokenFromResponse } from './cart-token-manager';
