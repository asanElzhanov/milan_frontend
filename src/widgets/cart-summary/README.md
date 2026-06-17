# Cart Summary

## Purpose

Presentation-only summary widget for cart totals and checkout CTA.

## Behavior

- shows subtotal;
- shows `discountAmount` when present and greater than zero;
- shows `totalAfterDiscount` when present;
- shows total fallback;
- displays existing `promoCode` from the cart response.

## Boundaries

This widget does not call APIs, does not apply or remove promo codes, and does not implement checkout
logic.
