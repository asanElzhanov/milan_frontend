# Product Grid Widget

## Purpose

`src/widgets/product-grid` renders product collections using normalized `ProductListItem` data.

## Data Input

ProductGrid receives products through props. It does not fetch data and does not use catalog API
hooks directly.

## States

- Loading uses `ProductGridSkeleton`.
- Error uses shared `ErrorState`.
- Empty uses shared `EmptyState`.
- Success renders entity-level `ProductCard` components.

## What Is Intentionally Not Included

- API calls.
- Add-to-cart.
- Wishlist API integration.
- Catalog filtering or pagination controls.
