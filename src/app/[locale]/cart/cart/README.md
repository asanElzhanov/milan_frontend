# Cart Page

## Purpose

Production cart page for reviewing backend cart items before checkout.

## Route

`/:locale/cart`

## API hooks used

- `useCartQuery`
- `useUpdateCartItemMutation`
- `useRemoveCartItemMutation`
- `useClearCartMutation`
- `useApplyPromoCodeMutation`
- `useRemovePromoCodeMutation`

## X-Cart-Token behavior

The page uses the Cart API layer. `apiClient` sends `X-Cart-Token` automatically, and cart API
methods persist `cart_token` from backend responses.

## Quantity updates

Quantity changes are clamped to `>= 1` and to `availableStock` when present, then sent through the
update item mutation.

## Remove/clear behavior

Item removal and cart clearing call backend mutations. No local cart fallback is used.

## Summary

The summary is rendered by `src/widgets/cart-summary` and shows subtotal, discounts, totals, promo
status, and checkout CTA.

## Promo code

The promo block applies and removes promo codes through cart endpoints only. Invalid promo responses
show inline validation messages from the backend when available.

## What is intentionally not included

- checkout implementation;
- order create;
- payment;
- auth integration;
- product detail add-to-cart integration;
- localStorage cart items;
- Zustand cart store.

## Future integrations

Checkout remains a later flow.
