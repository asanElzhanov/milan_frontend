# Cart Feature

## Purpose

The cart feature contains cross-flow cart helpers used outside the cart entity API layer.

## Guest Cart Token

Guest cart identity is stored through the shared API cart token foundation. Helpers can check and
read the current guest `X-Cart-Token`.

## Merge After Auth

`mergeGuestCartAfterAuth()` calls `cartApi.mergeCart()` when a guest cart token exists. Auth
mutations use it after successful login/register so backend cart state remains the source of truth.
The helper does not clear the cart token itself; token updates are left to the cart API/token
manager response handling.

## What Is Intentionally Not Included

- cart store;
- checkout integration;
- account/order UI.
