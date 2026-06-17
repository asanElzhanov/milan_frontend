# Cart Feature

## Purpose

The cart feature is reserved for storefront cart actions and future UI integration.

## Guest cart token

Guest cart identity is stored through the shared API cart token foundation. The current feature
exports pure helpers that allow Auth integration to check whether a guest cart token exists after
login.

## Future API integration

The Cart API layer now lives in `src/entities/cart`. Feature-level UI actions will later compose the
entity API and hooks.

## What is intentionally not included

- cart page implementation;
- cart store;
- add-to-cart mutation;
- auth integration;
- checkout integration.

Cart merge after login will be connected later.
