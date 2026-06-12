# Sara Milan Frontend

Production frontend foundation for the Sara Milan fashion e-commerce store.

## Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- ESLint
- Prettier

## Project status

This repository currently contains the production frontend foundation, localized layout shell,
catalog API layer, product presentation UI, and production Home page. It does not yet include the
catalog/product detail pages, auth, cart, checkout, or full feature flows.

The prototype audit is available in:

- `docs/frontend-audit.md`
- `docs/api-page-mapping.md`

## Requirements

- Node.js compatible with the installed Next.js version
- npm

## Installation

```bash
npm install
```

## Environment variables

Create a local `.env.local` from `.env.example` when local overrides are needed.

| Variable                        | Default                 | Purpose                                              |
| ------------------------------- | ----------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`           | `http://localhost:8000` | Django REST API base URL for future API integration. |
| `NEXT_PUBLIC_API_MODE`          | `mock`                  | Public mode flag for development.                    |
| `NEXT_PUBLIC_SITE_URL`          | `http://localhost:3000` | Frontend site URL.                                   |
| `NEXT_PUBLIC_DEFAULT_LOCALE`    | `ru`                    | Default locale.                                      |
| `NEXT_PUBLIC_SUPPORTED_LOCALES` | `ru,kk`                 | Supported locales.                                   |
| `NEXT_PUBLIC_ENABLE_WISHLIST`   | `false`                 | Wishlist feature flag.                               |
| `NEXT_PUBLIC_ENABLE_NEWSLETTER` | `false`                 | Newsletter feature flag.                             |

## Development commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run format
npm run format:check
npm run api:generate
```

## Project structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  shared/
    config/
      env.ts
    lib/
      cn.ts
    types/
```

## Frontend architecture

The source tree is organized into layered frontend modules:

- `src/app` for Next.js routes, layouts, metadata, and app-level composition.
- `src/shared` for reusable config, utilities, common types, future API client, and future UI
  primitives.
- `src/entities` for business entities such as product, category, user, cart, order, and review.
- `src/features` for user actions such as auth, cart actions, checkout, wishlist, reviews, and
  promo code flows.
- `src/widgets` for larger composition blocks such as header, footer, product grid, and account
  sidebar.

See `docs/frontend-architecture.md` for import rules, public API conventions, and planned next
steps.

## Backend connection note

The Django REST API base URL is configured through `NEXT_PUBLIC_API_URL`. Catalog entity APIs are
used by the Home page, while auth, cart, checkout, and payment feature flows are added in later
implementation phases.

## API foundation

API infrastructure lives in `src/shared/api`:

- typed fetch client and API error helpers;
- query string utilities;
- temporary token storage placeholder;
- guest cart token storage for `X-Cart-Token`;
- TanStack Query client config;
- fallback OpenAPI types in `src/shared/api/generated/schema.ts`.

OpenAPI types are generated with:

```bash
npm run api:generate
```

The backend must be running and expose `/api/schema/` for generation. Business API modules such as
product, auth, cart, and order APIs will be added later inside their corresponding entities/features.

The React Query provider is connected in `src/app/providers.tsx` and mounted from
`src/app/layout.tsx`.

## Backend contract update

The frontend foundation supports the updated backend contract:

- guest cart token through `X-Cart-Token`;
- cart token storage in `src/shared/api/cart-token-storage.ts`;
- cart token helper in `src/shared/api/cart-token.ts`;
- expanded architecture folders for catalog, delivery, payment, wishlist, notifications, stock;
- UI Kit additions: ErrorState, RatingStars, QuantitySelector.

## Theme foundation

The Sara Milan visual foundation is defined in:

- `src/app/globals.css` for Tailwind CSS 4 theme tokens, base styles, typography helpers, layout
  helpers, and premium utility classes.
- `src/shared/config/theme.ts` for typed theme values used by TypeScript code.
- `src/shared/lib/format-price.ts` for KZT price formatting with the `ru-KZ` locale.
- `src/shared/lib/media.ts` for safe media URL handling and image fallback support.
- `public/images/product-placeholder.svg` for lightweight missing-image placeholders.

Additional production pages and feature flows will be added in later phases.

## UI Kit

Reusable UI primitives live in `src/shared/ui` and are exported through:

```tsx
import { Button, Input, Price } from '@/shared/ui';
```

The preview page is available at `/ui-kit`. It is a temporary technical page for checking shared UI
components, not a production storefront page.

The UI Kit does not contain business logic, backend API calls, product models, order models, or user
models. ProductCard and ProductGrid live in the entity/widget layers.

## Layout widgets

Localized storefront pages live under `src/app/[locale]` with `ru` and `kk` support. The root `/`
redirects to `/ru`; `/ui-kit` and `/theme` remain technical preview pages outside the storefront
shell.

The production layout shell is composed in `src/app/[locale]/layout.tsx`:

- `src/widgets/header` renders the announcement bar, sticky navigation, mobile drawer, search
  drawer, locale switcher, account/cart links, and optional wishlist link.
- `src/widgets/footer` renders localized navigation, contact placeholders, legal links, and
  newsletter placeholder behavior without fake API calls.
- `src/shared/lib/routes.ts` contains locale-aware route helpers.

Header categories are fetched only in `NEXT_PUBLIC_API_MODE=real`; mock mode uses safe generic
fallback links and makes no network call.

## Layout widgets

- Header: `src/widgets/header`
- Footer: `src/widgets/footer`
- Locale storefront routes: `src/app/[locale]`
- Header categories use `/api/v1/catalog/categories/tree/?active=true`
- Header cart badge uses `/api/v1/orders/cart/`
- Guest cart token is sent through `X-Cart-Token`
- Search currently redirects to catalog query and does not call API
- Wishlist icon is controlled by feature flag
- Newsletter does not call API yet

`/ru` and `/kk` render the production Home page from `src/app/[locale]/home`.

## Catalog API layer

Catalog API modules live in:

- `src/entities/product`
- `src/entities/category`
- `src/entities/brand`
- `src/entities/color`
- `src/entities/size`
- `src/entities/banner`

The layer provides typed API methods, DTO adapters and React Query hooks. The Home page uses these
API methods server-side for banners, categories, new products, and sale products.

## Product UI

Reusable product UI components live in:

- `src/entities/product/ui`
- `src/widgets/product-grid`

They are presentation-only and receive normalized `ProductListItem` data from the Catalog API layer.

## Home page

The localized Home page lives in `src/app/[locale]/home` and is mounted at `/ru` and `/kk`.

- Hero and promo banners use `/api/v1/catalog/banners/`.
- Category cards use `/api/v1/catalog/categories/tree/`.
- Product sections use `/api/v1/catalog/products/` with `is_new` and `is_sale`.
- Mock mode and API failures render empty states instead of fake catalog data.

## Catalog page

The catalog is available at:

- `/ru/catalog`
- `/kk/catalog`
- `/ru/catalog/[categorySlug]`
- `/kk/catalog/[categorySlug]`

It uses catalog entity API methods, ProductGrid, URL-based filters, sorting and pagination.

## Next steps

1. Layout/Header/Footer.
2. Catalog API layer.
3. ProductCard/ProductGrid.
4. Product detail page.
5. Cart token manager/cart API/cart page.
6. Auth, account, checkout, and payment flows.
