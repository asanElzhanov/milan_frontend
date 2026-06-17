# Wishlist Entity

## Purpose

`src/entities/wishlist` contains normalized wishlist models, adapters, API methods, query keys, and
React Query hooks.

## Endpoints

- `GET /api/v1/auth/wishlist/`
- `POST /api/v1/auth/wishlist/toggle/{product_id}/`

## Normalized Model

Wishlist responses are normalized into `Wishlist`, with stable `items`, `productIds`, and `count`
fields for UI code.

## API Methods

- `wishlistApi.getWishlist()`
- `wishlistApi.toggleWishlist(productId)`

## React Query Hooks

- `useWishlistQuery`
- `useToggleWishlistMutation`

## What Is Intentionally Not Included

- guest/localStorage wishlist;
- fake wishlist data;
- add-to-cart behavior;
- checkout integration.
