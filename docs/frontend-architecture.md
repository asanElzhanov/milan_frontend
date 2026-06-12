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

- `api` for the future HTTP/API client.
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

Home is currently a storefront placeholder. The production Home page should be implemented after the
catalog API layer and ProductCard/ProductGrid.

The layout-level widgets live in `src/widgets/header` and `src/widgets/footer`. Header contains
lightweight fetchers for category tree navigation and cart count, but these are not the full
catalog/cart business API layers. Full catalog APIs will live under entities, and full cart APIs will
live under the cart feature later.

The catalog API layer now lives in catalog-related entities: `product`, `category`, `brand`,
`banner`, `color`, and `size`. These modules expose API methods, DTO adapters, query keys, and
React Query hooks without UI components.

## 5. Import Rules

- `shared` does not import from `entities`, `features`, or `widgets`.
- `entities` may import only from `shared`.
- `features` may import from `shared` and `entities`.
- `widgets` may import from `shared`, `entities`, and `features`.
- `app` may import from all layers.
- Cyclic dependencies are not allowed.
- Do not import directly from internal files of another module when a public API exists through
  `index.ts`.

## 6. Public API Rule

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

## 7. Naming Conventions

- Components: `PascalCase`.
- Hooks: `useSomething`.
- API files: `*.api.ts`.
- Model/state files: `*.store.ts`, `*.types.ts`, `*.schemas.ts`.
- Utilities: kebab-case or descriptive lowercase.
- DTO adapters: `*.adapter.ts`.
- Server/client components should use `'use client'` only when the component actually needs client
  behavior.

## 8. Planned Next Steps

1. Prompt 9: ProductCard, ProductGrid, and price display refinements.
2. Build catalog API in the proper entity layer.
3. Build catalog, cart, auth, and account flows after the layout shell is stable.
