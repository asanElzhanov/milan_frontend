# Header Widget

## Purpose

`src/widgets/header` renders the storefront announcement bar, sticky desktop header, mobile drawer,
search drawer, account/cart links, optional wishlist link, and locale switcher.

## API Endpoints Used

- `GET /api/v1/catalog/categories/tree/?active=true`
- `GET /api/v1/orders/cart/`

These are lightweight widget fetchers only. They are not the full catalog or cart business API
layers.

## Category Tree Fallback Behavior

Category navigation uses the category tree endpoint in real API mode. Mock mode, backend failures,
or unexpected response shapes return generic locale-aware navigation links.

## Cart Count Behavior

The cart badge uses the current cart summary from `/api/v1/orders/cart/`. If the backend is
unavailable or the shape is unknown, the count falls back to `0`.

## X-Cart-Token Behavior

The shared HTTP client injects `X-Cart-Token` when a guest cart token exists. If the cart response
contains `cart_token` or `cartToken`, the widget fetcher calls `persistCartTokenFromResponse`.

## Search Behavior

Search is client-side navigation only. It redirects to `/{locale}/catalog?search=<query>` and does
not call a search API.

## Wishlist Feature Flag

The wishlist icon is visible only when `env.features.wishlist === true`. Wishlist API integration is
not implemented here.

## What Will Be Connected Later

- Full catalog API layer.
- Full cart API layer and cart page.
- Auth-aware account behavior.
- Wishlist API integration.
