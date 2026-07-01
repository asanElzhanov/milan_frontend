# Sara Milan Frontend

Production frontend foundation for the Sara Milan fashion e-commerce store.

## Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- ESLint
- Prettier

## Project status

This repository contains the production frontend foundation, localized layout shell, UI kit,
catalog/home/product/cart/auth/account/address/wishlist/checkout/payment/orders/reviews/
notifications flows, static pages, and SEO basics for the Sara Milan storefront.

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

| Variable                        | Default                        | Purpose                                                |
| ------------------------------- | ------------------------------ | ------------------------------------------------------ |
| `NEXT_PUBLIC_API_BASE_URL`      | `http://localhost:8000/api/v1` | Django REST API base URL including API prefix.         |
| `NEXT_PUBLIC_API_MODE`          | `real`                         | `real` for backend integration, `mock` for fallback.   |
| `NEXT_PUBLIC_SITE_URL`          | `http://localhost:3000`        | Frontend site URL for SEO, sitemap and canonical URLs. |
| `NEXT_PUBLIC_DEFAULT_LOCALE`    | `ru`                           | Default locale.                                        |
| `NEXT_PUBLIC_SUPPORTED_LOCALES` | `ru,kk`                        | Supported locales.                                     |
| `NEXT_PUBLIC_ENABLE_WISHLIST`   | `false`                        | Wishlist feature flag.                                 |
| `NEXT_PUBLIC_ENABLE_NEWSLETTER` | `false`                        | Newsletter feature flag.                               |
| `NEXT_PUBLIC_CONTACT_PHONE`     | empty                          | Optional public phone shown on contacts page.          |
| `NEXT_PUBLIC_CONTACT_EMAIL`     | empty                          | Optional public email shown on contacts page.          |
| `NEXT_PUBLIC_CONTACT_INSTAGRAM` | empty                          | Optional public Instagram shown on contacts page.      |
| `NEXT_PUBLIC_CONTACT_ADDRESS`   | empty                          | Optional public address shown on contacts page.        |

For production, configure `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_SITE_URL`, backend CORS, and
public contact values only after they are confirmed by the business.

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

There is no project test script yet. Use `docs/manual-smoke-test.md` before production handoff.

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
- `src/shared` for reusable config, utilities, common types, API client, and UI primitives.
- `src/entities` for business entities such as product, category, user, cart, order, and review.
- `src/features` for user actions such as auth, cart actions, checkout, wishlist, reviews, and
  promo code flows.
- `src/widgets` for larger composition blocks such as header, footer, product grid, and account
  sidebar.

See `docs/frontend-architecture.md` for import rules, public API conventions, and planned next
steps.

## Backend connection note

The Django REST API base URL is configured through `NEXT_PUBLIC_API_BASE_URL`, including `/api/v1`.
Catalog, cart, auth, checkout, payment, orders, reviews, wishlist, addresses, and notification
modules use the shared API client and normalized adapters.

## API foundation

API infrastructure lives in `src/shared/api`:

- typed fetch client and API error helpers;
- query string utilities;
- SSR-safe temporary token storage;
- guest cart token storage for `X-Cart-Token`;
- TanStack Query client config;
- fallback OpenAPI types in `src/shared/api/generated/schema.ts`.

OpenAPI types are generated with:

```bash
npm run api:generate
```

The backend must be running and expose `/api/schema/` for generation. Endpoint coverage is tracked
in `docs/frontend-api-coverage.md`.

The React Query provider is connected in `src/app/providers.tsx` and mounted from
`src/app/layout.tsx`.

## Backend contract update

The frontend foundation supports the updated backend contract:

- guest cart token through `X-Cart-Token`;
- cart token storage in `src/shared/api/cart-token-storage.ts`;
- cart token manager in `src/shared/api/cart-token-manager.ts`;
- cart token helper in `src/shared/api/cart-token.ts`;
- expanded architecture folders for catalog, delivery, payment, wishlist, notifications, stock;
- UI Kit additions: ErrorState, RatingStars, QuantitySelector.

## Guest cart token

The frontend supports backend guest cart tracking through `X-Cart-Token`.

Current foundation:

- token storage: `src/shared/api/cart-token-storage.ts`
- token manager: `src/shared/api/cart-token-manager.ts`
- header cart badge syncs `cart_token` from cart response
- future cart API methods must call token sync explicitly

## Cart API layer

Cart API methods live in `src/entities/cart`.

Supported endpoints:

- `GET /api/v1/orders/cart/`
- `POST /api/v1/orders/cart/add/`
- `POST /api/v1/orders/cart/items/`
- `PATCH /api/v1/orders/cart/items/{id}/`
- `DELETE /api/v1/orders/cart/items/{id}/`
- `DELETE /api/v1/orders/cart/items/{id}/delete/`
- `DELETE /api/v1/orders/cart/clear/`
- `POST /api/v1/orders/cart/merge/`

All cart requests support `X-Cart-Token`. Cart page and promo code are implemented later.

## Cart page

The cart page is available at `/:locale/cart`.

It uses the Cart API layer and backend cart as the source of truth. Guest cart tracking is handled
through `X-Cart-Token`. Checkout is implemented in a later prompt.

## Cart promo code

The cart page supports promo code apply/remove through cart endpoints:

- `POST /api/v1/orders/cart/promo-code/apply/`
- `DELETE /api/v1/orders/cart/promo-code/`

Promo state and discounts are read from the backend cart response.

## Checkout API foundation

Checkout foundation lives in `src/features/checkout`.

It supports:

- delivery methods from `/api/v1/orders/delivery-methods/`;
- checkout order creation through `/api/v1/orders/checkout/`;
- saved address and manual address payload preparation.

Checkout UI and payment UI are implemented.

## Checkout page

Checkout is available at `/:locale/checkout`.

It supports guest and authenticated checkout, saved/manual address modes, delivery method selection,
payment method selection and checkout submit through `/api/v1/orders/checkout/`.

Checkout redirects directly to backend-provided `paymentUrl` / `redirectUrl` when present. If only
an order number is returned, it navigates to `/:locale/payment/:orderNumber`.

## Payment API and pages

Payment pages are available at:

- `/:locale/payment/:orderNumber`
- `/:locale/payment/success`
- `/:locale/payment/fail`
- `/:locale/payment/pending`

Confirmed payment start/create endpoints:

- `POST /api/v1/payments/kaspi/create/`
- `POST /api/v1/payments/stripe/create-intent/`

Payment status endpoints are not confirmed in the current OpenAPI fallback or docs, so status
polling is disabled and documented as pending backend contract. The frontend does not fake payment
success, does not use Stripe/Kaspi SDKs, and treats checkout/payment redirects from backend as the
source of truth.

## Order history

Order history is available at:

- `/:locale/account/orders`
- `/:locale/account/orders/:orderNumber`

It uses authenticated order endpoints when available and renders order status, payment status,
items, delivery and totals. Continue-payment links use a safe backend payment URL when present or
fall back to the local payment route for the order number.

## Auth UI

Auth UI pages are available at:

- `/:locale/login`
- `/:locale/register`
- `/:locale/otp`
- `/:locale/forgot-password`

Login, registration, and authenticated OTP request/verify flows are connected to the Auth API layer.
Forgot-password remains a visual/local-validation flow until a backend endpoint is confirmed.

## Auth API layer

Auth API methods and hooks live in `src/features/auth`.

Supported endpoints:

- `POST /api/v1/auth/register/`
- `POST /api/v1/auth/login/`
- `POST /api/v1/auth/logout/`
- `POST /api/v1/auth/token/refresh/`
- `GET /api/v1/auth/me/`
- `PATCH /api/v1/auth/me/`
- `POST /api/v1/auth/change-password/`
- `POST /api/v1/auth/otp/request/`
- `POST /api/v1/auth/otp/verify/`

The frontend stores JWT tokens client-side for now, injects the access token into API requests, and
attempts guest cart merge after successful login/register.

## Account shell

The account area is available at:

- `/:locale/account`
- `/:locale/account/settings`

It uses the current user query from `/api/v1/auth/me/` and shows an auth-required state when the user
is not logged in. Profile editing, addresses, orders, wishlist and notifications are implemented in
later prompts.

## Address book

The address book is available at `/:locale/account/addresses`.

It uses authenticated address endpoints under `/api/v1/auth/addresses/` and supports list, create,
edit, delete and default address selection. Saved addresses will be reused by checkout later.

## Wishlist

Wishlist is available at `/:locale/account/wishlist`.

It uses authenticated endpoints:

- `GET /api/v1/auth/wishlist/`
- `POST /api/v1/auth/wishlist/toggle/:product_id/`

Wishlist is backend-driven and does not use localStorage fallback.

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
- `src/widgets/footer` renders localized navigation, neutral contact copy, legal links, and
  deferred newsletter behavior without API calls.
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

## Product detail page

Product detail is available at `/:locale/product/:slug`.

It uses product detail, similar products and read-only reviews endpoints. Add-to-cart sends the
selected `variant_id` and quantity through the cart API layer.

## Next steps

1. Layout/Header/Footer.
2. Catalog API layer.
3. ProductCard/ProductGrid.
4. Auth, account, checkout, and payment flows.

## Reviews

Reviews are shown on product detail pages and in `/:locale/account/reviews`.

Review creation is authenticated and backend-controlled. The frontend does not fake purchase
eligibility or moderation state.

## Notifications

Notifications are available at `/:locale/account/notifications`.

The frontend uses:

- `GET /api/v1/notifications/`
- `POST /api/v1/notifications/{id}/mark-read/`
- `POST /api/v1/notifications/mark-all-read/`
- `POST /api/v1/notifications/read-all/`

Realtime notifications, push notifications and notification preferences are not implemented yet.

## Static pages and SEO

Static informational pages are available for both locales:

- `/:locale/about`
- `/:locale/delivery`
- `/:locale/payment`
- `/:locale/faq`
- `/:locale/contacts`
- `/:locale/privacy`
- `/:locale/terms`

The project also includes localized metadata, not-found pages, robots and sitemap helpers.

## Route Map Summary

- Public: `/:locale`, `/:locale/catalog`, `/:locale/catalog/:categorySlug`,
  `/:locale/product/:slug`
- Auth: `/:locale/login`, `/:locale/register`, `/:locale/otp`,
  `/:locale/forgot-password`
- Cart and checkout: `/:locale/cart`, `/:locale/checkout`
- Payment: `/:locale/payment`, `/:locale/payment/:orderNumber`,
  `/:locale/payment/success`, `/:locale/payment/fail`, `/:locale/payment/pending`
- Account: `/:locale/account`, settings, addresses, wishlist, orders, reviews, notifications
- Static: about, delivery, FAQ, contacts, privacy, terms
- System: `robots.txt`, `sitemap.xml`, localized and global not-found pages

## Known Pending Backend Contracts

- Forgot-password endpoint
- Account current-user reviews endpoint
- Payment status endpoint
- Newsletter or contact form endpoint

## Production Checklist

Before production, review:

- `docs/frontend-final-qa.md`
- `docs/frontend-api-coverage.md`
- `docs/production-readiness-checklist.md`
- `docs/manual-smoke-test.md`
- `docs/deployment.md`
- `docs/deployment-checklist.md`
- `docs/backend-integration-notes.md`
- `docs/hosting-options.md`

Minimum automated checks:

```bash
npm run lint
npm run typecheck
npm run build
npm run format:check
```

## Deployment

Use `.env.production.example` as the public production env checklist. Build with `npm run build`
and run with `npm run start` for a Node deployment, or configure the same commands on a managed
Next.js host.

Docker is optional. Production container packaging is provided through `Dockerfile` and
`docker-compose.yml`, with usage documented in `docs/docker.md`. `.dockerignore` is included so
container builds do not copy local env files or build artifacts.

Backend integration notes:

- configure backend CORS for `NEXT_PUBLIC_SITE_URL`;
- set `NEXT_PUBLIC_API_BASE_URL` to the public backend API;
- allow `Authorization: Bearer <access>` and `X-Cart-Token`;
- configure media/CDN image hosts before enabling remote image optimization;
- keep payment redirects HTTPS.

After deploy, run `docs/manual-smoke-test.md` and `docs/deployment-checklist.md`.
