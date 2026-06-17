# Wishlist Feature

## Purpose

`src/features/wishlist` contains UI behavior for authenticated wishlist actions.

## Toggle Button

`WishlistToggleButton` redirects unauthenticated users to login with a callback URL and calls the
wishlist toggle mutation for authenticated users.

## Auth Behavior

Wishlist has no guest/localStorage mode. Backend wishlist remains the source of truth.

## ProductCard/ProductGrid Integration

ProductCard and ProductGrid remain presentation-only. Account wishlist page passes wishlist props to
ProductGrid, and product detail uses `WishlistToggleButton`.

## What Is Intentionally Not Included

- guest wishlist;
- fake toggles;
- add-to-cart changes;
- checkout changes.
