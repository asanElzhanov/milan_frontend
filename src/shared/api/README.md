# API Foundation

## 1. Overview

The shared API layer provides frontend infrastructure only:

- fetch-based HTTP client;
- OpenAPI type generation;
- TanStack Query provider;
- SSR-safe temporary token storage for the current integration;
- `mock` / `real` API mode config.

Business API modules are intentionally not implemented here.

## 2. Environment

- `NEXT_PUBLIC_API_BASE_URL` points to the Django REST API base URL including `/api/v1`.
- `NEXT_PUBLIC_API_MODE` supports `mock` and `real`.

Unknown API mode values fall back to `mock`.

## 3. Type Generation

Run:

```bash
npm run api:generate
```

The backend must be available at `/api/schema/`. The generated file is written to:

```text
src/shared/api/generated/schema.ts
```

If the backend is not running, generation can fail. The committed fallback file keeps
`typecheck` and `build` working until the backend schema is available.

## 4. HTTP Client Usage

```ts
import { apiClient } from '@/shared/api';

const products = await apiClient.get('/api/v1/catalog/products/');
```

## 5. React Query Usage

`src/app/providers.tsx` creates the `QueryClient` and wraps the App Router tree.

Entity and feature hooks live in their own modules. Do not add product, auth, cart, or order hooks
directly to `shared/api`.

## 6. Auth / Token Note

Token storage is temporary and uses client-side `localStorage`. The auth flow prompt may replace
this strategy.

For now, `401` responses are returned as `ApiError`. Refresh token handling will be added during
auth integration.

## 7. Cart Token

The backend uses `X-Cart-Token` to identify guest carts.

Files:

- `cart-token-storage.ts` stores the token on the client.
- `cart-token-manager.ts` normalizes, saves and syncs tokens from cart responses.
- `http-client.ts` injects `X-Cart-Token` automatically when available.
- `cart-token.ts` keeps backward-compatible helper exports.

Rules:

- Do not generate fake cart tokens on frontend.
- Save only tokens returned by backend.
- Do not clear token automatically when cart is empty.
- Cart API methods must explicitly call `syncCartTokenFromResponse`.
- After login, Auth integration should call cart merge if a guest cart token exists.

Example used by cart API methods:

```ts
const cart = await cartApi.getCart();
syncCartTokenFromResponse(cart);
```

Important future cart and checkout endpoints:

```text
GET    /api/v1/orders/cart/
POST   /api/v1/orders/cart/add/
POST   /api/v1/orders/cart/items/
PATCH  /api/v1/orders/cart/items/{id}/
DELETE /api/v1/orders/cart/items/{id}/
DELETE /api/v1/orders/cart/items/{id}/delete/
DELETE /api/v1/orders/cart/clear/
POST   /api/v1/orders/cart/merge/
POST   /api/v1/orders/cart/promo-code/apply/
DELETE /api/v1/orders/cart/promo-code/
POST   /api/v1/orders/checkout/
```

Pass `{ cartToken: false }` to an API request when a public or auth request should not include
`X-Cart-Token`.

## 8. What Not To Put Here

Do not put these in `shared/api`:

- `productApi`
- `authApi`
- `cartApi`
- `orderApi`
- business DTO adapters

Those belong in the corresponding `entities` or `features` modules.
