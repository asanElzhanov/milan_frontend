# Cart Entity

## Purpose

`src/entities/cart` owns the normalized cart model, backend API methods, React Query hooks,
adapters, query keys, and pure selectors.

## Endpoints

- `GET /api/v1/orders/cart/`
- `POST /api/v1/orders/cart/add/`
- `POST /api/v1/orders/cart/items/`
- `PATCH /api/v1/orders/cart/items/{id}/`
- `DELETE /api/v1/orders/cart/items/{id}/`
- `DELETE /api/v1/orders/cart/items/{id}/delete/`
- `DELETE /api/v1/orders/cart/clear/`
- `POST /api/v1/orders/cart/merge/`
- `POST /api/v1/orders/cart/promo-code/apply/`
- `DELETE /api/v1/orders/cart/promo-code/`

## X-Cart-Token

Cart requests use the shared HTTP client, so `X-Cart-Token` is sent automatically when a guest cart
token exists. Cart API methods explicitly call `syncCartTokenFromResponse` before adapting the
response.

## API methods

`cartApi` exposes `getCart`, `addItem`, `createItem`, `updateItem`, `removeItem`,
`removeItemByDeleteEndpoint`, `clearCart`, `mergeCart`, `applyPromoCode`, and `removePromoCode`.

In mock API mode these methods return an empty cart and do not create fake cart items.

## React Query hooks

The entity exports `useCartQuery` plus mutation hooks for add, create, update, remove, clear, merge,
apply promo code, and remove promo code. Successful mutations update `cartKeys.current()` and
invalidate the current cart query.

## Adapters

Adapters accept `unknown` backend responses and normalize common cart shapes, item arrays, totals,
promo code fields, discount fields, token fields, product snapshots, variant snapshots, quantities,
stock fields, and empty-cart state.

## What is intentionally not included

- cart page;
- checkout;
- auth integration;
- product detail add-to-cart integration;
- Zustand store or localStorage cart items.
