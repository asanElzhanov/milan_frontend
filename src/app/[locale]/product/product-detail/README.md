# Product Detail Page

## Purpose

Production product detail page for viewing product media, price, variant options, stock state,
read-only reviews preview, and similar products.

## Route

- `/ru/product/[slug]`
- `/kk/product/[slug]`

## API endpoints used

- `GET /api/v1/catalog/products/{slug}/`
- `GET /api/v1/catalog/products/{slug}/similar/`
- `GET /api/v1/catalog/products/{slug}/reviews/`

## Variant resolver

`variant-resolver.ts` is a pure helper. It derives available colors and sizes from variants when
available, falls back to product-level options, resolves the selected variant, and exposes stock
helpers.

## Add-to-cart placeholder

The add-to-cart UI keeps quantity locally and knows the selected `variant_id`, but it does not call
cart API yet. The actual mutation will be connected when the cart API layer is implemented.

## Reviews preview

Reviews are read-only and limited to a short preview. There is no create review flow, auth guard, or
account reviews integration.

## Fallback behavior

Mock mode or product fetch failures render a friendly fallback with a link back to catalog. Similar
products and reviews fail independently and fall back to empty arrays.

## What is intentionally not included

- Cart API layer or real add-to-cart mutation.
- Cart store.
- Wishlist API integration.
- Auth, checkout, payment, or full reviews feature.
- Mock products.

## Future integrations

Connect cart mutation with `variant_id` and quantity, add wishlist state, and expand review features
after the cart/auth layers are in place.
