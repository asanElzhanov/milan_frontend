# Catalog Page

## Purpose

Production catalog page for browsing Sara Milan products with URL-based filters, sorting, search,
and pagination.

## Routes

- `/ru/catalog`
- `/kk/catalog`
- `/ru/catalog/[categorySlug]`
- `/kk/catalog/[categorySlug]`

## API endpoints used

- `GET /api/v1/catalog/products/`
- `GET /api/v1/catalog/categories/tree/`
- `GET /api/v1/catalog/brands/?active=true`
- `GET /api/v1/catalog/colors/?active=true`
- `GET /api/v1/catalog/sizes/?active=true`

## Filters

The page supports category route, brand, color, size, price range, material, season, in-stock, sale,
and new filters.

## URL query params

Only canonical frontend params are used: `search`, `brand_slug`, `color`, `size`, `material`,
`season`, `in_stock`, `is_sale`, `is_new`, `price_min`, `price_max`, `ordering`, and `page`.

## Fallback behavior

Mock mode returns empty products and filters without fake data. If product loading fails in real API
mode, the page renders an inline error state. Filter endpoint failures do not block product results.

## What is intentionally not included

- Product detail page.
- Add-to-cart.
- Wishlist API integration.
- Auth, cart, checkout, payment, or reviews logic.
- Mock catalog data.

## Future integrations

Product detail, cart actions, wishlist state, and richer filter metadata can be added in later
prompts without changing the URL contract.
