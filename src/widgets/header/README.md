# Header Widget

Production storefront header for localized Sara Milan pages.

## Responsibilities

- Renders announcement bar, sticky desktop navigation, mobile drawer, search drawer, language
  switcher, account link, cart link, and optional wishlist link.
- Accepts the current locale from `src/app/[locale]/layout.tsx`.
- Fetches catalog categories only when `NEXT_PUBLIC_API_MODE=real`.
- Uses static safe fallback links in mock mode and when the category endpoint is unavailable.

## API Notes

Category data is requested from `/api/v1/catalog/categories/` through `apiClient`.

The adapter accepts both array responses and DRF paginated `{ results: [...] }` responses. Supported
category fields are `id`, `name`, `title`, and `slug`.

Cart count is intentionally passed as `0` until cart state is implemented in a later prompt.
