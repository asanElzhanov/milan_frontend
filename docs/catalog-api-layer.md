# Catalog API Layer

## 1. Purpose

The catalog API layer provides reusable entity-level methods, DTO adapters, query keys, and React
Query hooks for catalog data. It does not render catalog UI.

## 2. Endpoints

- `GET /api/v1/catalog/categories/`
- `GET /api/v1/catalog/categories/{slug}/`
- `GET /api/v1/catalog/categories/tree/`
- `GET /api/v1/catalog/brands/`
- `GET /api/v1/catalog/brands/{slug}/`
- `GET /api/v1/catalog/colors/`
- `GET /api/v1/catalog/sizes/`
- `GET /api/v1/catalog/products/`
- `GET /api/v1/catalog/products/{slug}/`
- `GET /api/v1/catalog/products/{slug}/similar/`
- `GET /api/v1/catalog/products/{slug}/reviews/`
- `GET /api/v1/catalog/banners/`

## 3. Canonical Frontend Query Params

Product list queries use one canonical frontend shape:

- `category_slug`
- `brand_slug`
- `color`
- `size`
- `material`
- `season`
- `in_stock`
- `has_discount`
- `is_sale`
- `is_new`
- `price_min`
- `price_max`
- `search`
- `ordering`
- `page`

Supported ordering values are `price`, `-price`, `created_at`, `-created_at`, `rating`, `-rating`,
`orders_count`, and `-orders_count`.

## 4. DTO Adapters

Each entity has local safe adapters that parse unknown backend responses into frontend models. List
adapters support plain arrays and DRF paginated responses where relevant.

## 5. React Query Hooks

Each entity exposes stable query keys and hooks. Hooks are client-safe and should not be used in
server components.

Product UI consumes `ProductListItem`. `ProductGrid` is presentation-only and receives product data
through props. The Home, Catalog, and Product detail pages use catalog API methods server-side
instead of React Query hooks. Product detail also uses a minimal read-only review API for product
reviews.

## 6. Mock Mode Behavior

When `NEXT_PUBLIC_API_MODE=mock`, catalog API methods return empty arrays or `null`. The layer does
not generate fake catalog data.

## 7. What Is Intentionally Not Included

- Cart, auth, wishlist, checkout, review mutations, or add-to-cart logic.
- Mock data or prototype pages.

## 8. Next Steps

Prompt 14 should implement the cart token manager and cart API/page layer.
