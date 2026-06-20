# Frontend Architecture

## 1. Overview

Sara Milan uses a layered frontend architecture inspired by Feature-Sliced Design and adapted for
e-commerce.

- `app` owns Next.js routes, layouts, metadata, and app-level providers.
- `shared` contains reusable infrastructure: config, utilities, common types, future UI primitives,
  and the future API client.
- `entities` contains business entities such as product, category, brand, user, cart, order, review,
  and notification.
- `features` contains user actions and business capabilities such as auth, cart actions, checkout,
  wishlist, review creation, and promo code flows.
- `widgets` contains larger composition blocks such as header, footer, product grid, and account
  sidebar.

The current foundation includes shared UI primitives and localized layout widgets, but still avoids
business page implementations, client stores, forms libraries, and direct backend feature flows.

## 2. Layers

### app

Routes, layouts, metadata, and providers. App-level files may compose any lower layer when building
pages or layouts.

### shared

Reusable foundation code:

- `api` for the HTTP/API client, token handling, and guest cart token foundation.
- `config` for environment and theme configuration.
- `lib` for common utilities.
- `types` for common project-wide types.
- `ui` for future UI Kit primitives.

### entities

Business entities:

- `product`
- `category`
- `brand`
- `banner`
- `color`
- `size`
- `user`
- `address`
- `cart`
- `order`
- `review`
- `notification`
- `wishlist`
- `delivery-method`
- `payment`
- `stock`

Each entity has `api`, `model`, `ui`, `lib`, and `index.ts` folders/files prepared for future code.

### features

User-facing actions and flows:

- `auth`
- `cart`
- `checkout`
- `wishlist`
- `product-review`
- `promo-code`
- `otp`
- `notifications`

Each feature has `api`, `model`, `ui`, `lib`, and `index.ts` prepared for future implementation.

### widgets

Large composition blocks:

- `header`
- `footer`
- `product-grid`
- `account-sidebar`
- `cart-summary`

Each widget has `ui`, `model`, `lib`, and `index.ts` prepared for future implementation.

## 3. Layout Widgets

Localized storefront routes live under `src/app/[locale]` with supported locales `ru` and `kk`.
The root route `/` redirects to `/ru`; unsupported locale segments return `notFound()`.

`src/app/[locale]/layout.tsx` composes:

- `src/widgets/header` for announcement bar, navigation, search drawer, mobile drawer, account/cart
  links, optional wishlist link, and locale switching.
- `src/widgets/footer` for localized navigation, contact placeholders, legal links, and newsletter
  placeholder behavior.

The header category navigation uses the shared API client only in real API mode. In mock mode it
does not make network calls and falls back to generic links such as catalog, about, delivery, and
contacts.

## 4. Home Page

The storefront Home page is implemented under `src/app/[locale]/home` and is mounted by
`src/app/[locale]/page.tsx` for `/ru` and `/kk`.

Home fetches banners, categories, new products, and sale products server-side through the catalog
entity APIs. It uses `Promise.allSettled` and renders empty states in mock mode or on API failure,
without creating fake catalog data.

The layout-level widgets live in `src/widgets/header` and `src/widgets/footer`. Header contains
lightweight fetchers for category tree navigation and cart count, but these are not the full
catalog/cart business API layers. Full catalog APIs will live under entities, and full cart APIs will
live under the cart feature later.

The catalog API layer now lives in catalog-related entities: `product`, `category`, `brand`,
`banner`, `color`, and `size`. These modules expose API methods, DTO adapters, query keys, and
React Query hooks without UI components.

Product presentation components live in `src/entities/product/ui`. The reusable product grid lives
in `src/widgets/product-grid` and receives products via props without fetching data.

## 5. Catalog Page

The production Catalog page is implemented under `src/app/[locale]/catalog/catalog` and mounted by:

- `src/app/[locale]/catalog/page.tsx`
- `src/app/[locale]/catalog/[categorySlug]/page.tsx`

Catalog consumes `productApi`, `categoryApi`, `brandApi`, `colorApi`, and `sizeApi` server-side.
Filters, search, sorting, and pagination are stored in canonical URL query params. `ProductGrid`
remains presentation-only and receives normalized products through props.

## 6. Product Detail Page

The production Product detail page is implemented under `src/app/[locale]/product/product-detail`
and mounted by `src/app/[locale]/product/[slug]/page.tsx`.

Product detail consumes product detail, similar products, and read-only reviews server-side. The
variant resolver is a pure UI/domain helper with no React or API dependencies. Add-to-cart UI keeps
quantity and selected `variant_id` locally, but it does not call cart APIs yet.

## 7. Guest Cart Token Foundation

Guest cart tracking is a shared API concern. `http-client.ts` injects `X-Cart-Token` when a token is
available and request options do not disable cart token headers.

`cart-token-storage.ts` handles client-side localStorage access safely for SSR. `cart-token-manager.ts`
normalizes backend tokens and syncs tokens explicitly from cart responses. The header cart badge uses
this manager when fetching `/api/v1/orders/cart/`.

`src/features/cart/lib/cart-merge.ts` prepares pure helpers for future Auth integration after login.

## 8. Cart API Layer

The Cart API layer lives in `src/entities/cart`. It includes normalized cart model types, safe
adapters, query keys, API methods, React Query hooks, and pure selectors.

Cart API methods use the shared `apiClient`, support `X-Cart-Token`, and explicitly sync cart
tokens from cart responses before adapting data. Mock API mode returns an empty cart without fake
items or network calls.

## 9. Cart Page

The Cart page is implemented at `src/app/[locale]/cart`. It is a client-side interactive page that
uses Cart API hooks for reading the backend cart, updating quantities, removing items, and clearing
the cart.

The backend cart remains the source of truth. The page does not store cart items in localStorage and
does not introduce a client cart store. After successful cart mutations, the page refreshes the route
so the server-rendered header cart badge can update.

## 10. Cart Promo Code

The cart page includes promo code apply/remove UI. Promo mutations live in `src/entities/cart` and
use cart endpoints:

- `POST /api/v1/orders/cart/promo-code/apply/`
- `DELETE /api/v1/orders/cart/promo-code/`

The frontend does not call `/api/v1/catalog/promo/check/` in the MVP cart flow and does not create
fake promo validation or fake discounts. Promo state, discounts, and totals are read from the backend
cart response.

Checkout, auth integration, product detail add-to-cart integration, and payment remain future flows.

## 11. Auth UI

Auth UI is implemented in `src/features/auth` and `src/features/otp`, with routes mounted at:

- `/:locale/login`
- `/:locale/register`
- `/:locale/forgot-password`
- `/:locale/otp`

These pages use the shared UI Kit, locale dictionaries, and local validation helpers.

Login and register forms call the Auth API layer. Forgot-password and OTP remain UI-only until
backend endpoints are confirmed.

## 12. Auth API Layer

The Auth API layer lives in `src/features/auth`. It includes API methods, token storage/manager,
React Query hooks, adapters, and form integration for:

- `POST /api/v1/auth/register/`
- `POST /api/v1/auth/login/`
- `POST /api/v1/auth/logout/`
- `POST /api/v1/auth/refresh/`
- `GET /api/v1/auth/me/`

Access tokens are stored client-side for now and injected by `src/shared/api/http-client.ts` as
`Authorization: Bearer <token>` unless a request passes `{ auth: false }`. `/auth/me/` remains the
source of truth for current user data; user objects are not stored in localStorage.

After token-backed login/register, auth mutations attempt guest cart merge through
`cartApi.mergeCart()` when a guest cart token exists. Merge errors do not fail authentication.

Auto-refresh on `401`, protected account pages, account/profile APIs, order history, address APIs,
and role-based manager UI remain future work.

## 13. Account Shell

The Account shell is implemented under `src/app/[locale]/account/account` and mounted by account
routes such as `/:locale/account` and `/:locale/account/settings`.

`AccountShellClient` uses `useCurrentUserQuery`, so `/api/v1/auth/me/` remains the current user
source of truth. If no user is available, the shell renders an auth-required state instead of fake
profile data. Logout uses the existing auth mutation flow.

The settings page is read-only until a profile update endpoint is confirmed. Orders, addresses,
wishlist, reviews, and notifications routes are placeholders with localized pending messages and no
feature API calls.

## 14. Address Book

The Address API layer lives in `src/entities/address`. It includes normalized address types,
adapters, selectors, API methods, query keys, and React Query hooks for authenticated endpoints under
`/api/v1/auth/addresses/`.

Reusable address book UI lives in `src/features/address-book`. The account addresses page is mounted
at `/:locale/account/addresses` and uses `AccountShell` auth behavior. It supports list, create,
edit, delete, and default address selection through backend data only.

Saved addresses are prepared for future checkout reuse. Checkout, delivery method selection, order
creation, and payment remain separate future flows.

## 15. Wishlist

The Wishlist API layer lives in `src/entities/wishlist`. It normalizes backend wishlist responses
into stable `items`, `productIds`, and `count` fields and exposes React Query hooks for:

- `GET /api/v1/auth/wishlist/`
- `POST /api/v1/auth/wishlist/toggle/{product_id}/`

`src/features/wishlist` contains authenticated toggle UI. ProductCard and ProductGrid remain
presentation-only; account wishlist page passes wishlist state into ProductGrid. Product detail uses
`WishlistToggleButton` client-side without adding wishlist fetches to product detail server data.

Guest/localStorage wishlist is intentionally not implemented. Catalog/Home wishlist toggle can be
expanded later with a client wrapper if needed.

## 16. Checkout API Foundation

Delivery methods live in `src/entities/delivery-method` and read
`/api/v1/orders/delivery-methods/` without fake fallback methods.

Checkout payload helpers and mutation live in `src/features/checkout`. The feature prepares saved
address checkout through `address_id`, manual address checkout through `delivery_address`, and posts
to `/api/v1/orders/checkout/`. The shared API client provides `Authorization` and `X-Cart-Token`
headers when available.

Checkout responses are normalized through `src/entities/order` as `CheckoutOrder` and
`CheckoutResult`. Checkout page UI, payment UI, payment API, order history, and account orders remain
future flows.

The production checkout page is implemented at `/:locale/checkout`. It reads the cart as source of
truth, supports guest checkout through the cart token header, supports authenticated saved addresses,
and offers manual address entry for both user states. Checkout redirects to backend-provided
`paymentUrl` / `redirectUrl` when present, otherwise to `/:locale/payment/:orderNumber`.

## 17. Payment API and Pages

Payment integration lives in `src/entities/payment` and `src/app/[locale]/payment`.

Confirmed payment start/create endpoints:

- `POST /api/v1/payments/kaspi/create/`
- `POST /api/v1/payments/stripe/create-intent/`

The payment order page can call those provider endpoints and safely redirect to backend-provided
`paymentUrl`, `redirectUrl`, or `qrUrl`. External payment URLs must be `https://`; relative URLs must
remain local paths.

Payment status endpoints are not confirmed in the current OpenAPI fallback or docs, so
`paymentApi.getPaymentStatus()` returns `null` and payment status polling is disabled. Result pages
are production-looking return placeholders and do not claim backend success without a confirmed
status source.

## 18. Order History and Detail

Order history integration lives in `src/entities/order` and `src/app/[locale]/account/orders`.

Confirmed order endpoints:

- `GET /api/v1/orders/history/`
- `GET /api/v1/orders/{order_number}/`

The account order list and detail pages render inside `AccountShell`, preserving the existing
auth-required behavior. They show order status, payment status, timeline, items, delivery snapshots,
payment details, and backend-owned totals. Continue-payment actions use a safe backend payment URL
when one is present, otherwise they link to `/:locale/payment/:orderNumber`.

Cancellation, refund, reorder, admin/manager orders, review creation from orders, localStorage
orders, and fake order data are intentionally not implemented.

## 19. Import Rules

- `shared` does not import from `entities`, `features`, or `widgets`.
- `entities` may import only from `shared`.
- `features` may import from `shared` and `entities`.
- `widgets` may import from `shared`, `entities`, and `features`.
- `app` may import from all layers.
- Cyclic dependencies are not allowed.
- Do not import directly from internal files of another module when a public API exists through
  `index.ts`.

## 20. Public API Rule

Every module folder should expose an `index.ts` public API.

External code should import through public APIs so internal files can change without rewriting the
whole project.

Preferred:

```ts
import { formatPriceKzt } from '@/shared/lib';
```

Avoid in business modules:

```ts
import { formatPriceKzt } from '@/shared/lib/format-price';
```

Direct imports in app-level files are acceptable when they simplify Next.js usage, but business
modules should prefer public APIs.

## 21. Naming Conventions

- Components: `PascalCase`.
- Hooks: `useSomething`.
- API files: `*.api.ts`.
- Model/state files: `*.store.ts`, `*.types.ts`, `*.schemas.ts`.
- Utilities: kebab-case or descriptive lowercase.
- DTO adapters: `*.adapter.ts`.
- Server/client components should use `'use client'` only when the component actually needs client
  behavior.

## 22. Planned Next Steps

1. Confirm payment status endpoint contract.
2. Build product reviews and account reviews.
