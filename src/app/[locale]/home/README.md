# Home Page

## Purpose

`src/app/[locale]/home` contains the route-level storefront Home implementation for `/ru` and
`/kk`. It composes local sections and keeps temporary Home-specific preview UI out of shared
business layers.

## API Endpoints Used

- `GET /api/v1/catalog/banners/?position=hero`
- `GET /api/v1/catalog/categories/`
- `GET /api/v1/catalog/products/?is_new=true`

The fetchers use the shared API client only when `NEXT_PUBLIC_API_MODE=real`. Mock mode returns
empty arrays and does not make network requests.

## Fallback Behavior

Each endpoint is fetched independently. If an endpoint fails, returns an unexpected shape, or the
backend is unavailable, the page keeps rendering:

- Hero uses a static Sara Milan editorial fallback.
- Categories use neutral navigation links.
- New arrivals render an empty state with a catalog CTA.
- Secondary banner uses a static editorial CTA.

## What Is Intentionally Not Included

- No final `ProductCard` or `ProductGrid`.
- No catalog page implementation.
- No cart, auth, wishlist, checkout, or add-to-cart behavior.
- No static product mock data or fake API results.
- No full i18n library.

## Future Improvements

- ProductCard will be implemented in Prompt 9.
- Catalog API layer will be implemented in Prompt 10.
- Catalog page will be implemented in Prompt 11.
- Full i18n will be implemented later.
