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

This step creates structure only. It does not add API integration, stores, UI Kit components, or
business logic.

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
- `user`
- `cart`
- `order`
- `review`
- `notification`

Each entity has `api`, `model`, `ui`, `lib`, and `index.ts` folders/files prepared for future code.

### features

User-facing actions and flows:

- `auth`
- `cart`
- `checkout`
- `wishlist`
- `product-review`
- `promo-code`

Each feature has `api`, `model`, `ui`, `lib`, and `index.ts` prepared for future implementation.

### widgets

Large composition blocks:

- `header`
- `footer`
- `product-grid`
- `account-sidebar`

Each widget has `ui`, `model`, `lib`, and `index.ts` prepared for future implementation.

## 3. Import Rules

- `shared` does not import from `entities`, `features`, or `widgets`.
- `entities` may import only from `shared`.
- `features` may import from `shared` and `entities`.
- `widgets` may import from `shared`, `entities`, and `features`.
- `app` may import from all layers.
- Cyclic dependencies are not allowed.
- Do not import directly from internal files of another module when a public API exists through
  `index.ts`.

## 4. Public API Rule

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

## 5. Naming Conventions

- Components: `PascalCase`.
- Hooks: `useSomething`.
- API files: `*.api.ts`.
- Model/state files: `*.store.ts`, `*.types.ts`, `*.schemas.ts`.
- Utilities: kebab-case or descriptive lowercase.
- DTO adapters: `*.adapter.ts`.
- Server/client components should use `'use client'` only when the component actually needs client
  behavior.

## 6. Planned Next Steps

1. Prompt 5: API client foundation from `/api/schema/`.
2. Prompt 6: UI Kit.
3. Prompt 7: Layout/Header/Footer.
