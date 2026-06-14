# Cart Feature

## Purpose

The cart feature is reserved for storefront cart actions and future cart API integration.

## Guest cart token

Guest cart identity is stored through the shared API cart token foundation. The current feature
exports only pure helpers that allow Auth integration to check whether a guest cart token exists
after login.

## Future API integration

The Cart API layer will be implemented in the next prompt. Future cart API methods must explicitly
call `syncCartTokenFromResponse` when a cart endpoint returns a token.

## What is intentionally not included

- add, update, remove, clear, and merge requests;
- cart page implementation;
- cart store;
- add-to-cart mutation;
- auth integration;
- checkout integration.

Cart merge after login will be connected later.
