# Sara Milan Frontend

Production frontend foundation for the Sara Milan fashion e-commerce store.

## Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- ESLint
- Prettier

## Project status

This repository currently contains the production frontend foundation. It does not yet include
production storefront pages, prototype UI migration, auth, cart, catalog API integration, or backend
data fetching.

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

The Django REST API will be connected in later implementation phases. The future API base URL is
configured through `NEXT_PUBLIC_API_URL`. This foundation intentionally avoids API integration for
now.

## API foundation

API infrastructure lives in `src/shared/api`:

- typed fetch client and API error helpers;
- query string utilities;
- temporary token storage placeholder;
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

## Theme foundation

The Sara Milan visual foundation is defined in:

- `src/app/globals.css` for Tailwind CSS 4 theme tokens, base styles, typography helpers, layout
  helpers, and premium utility classes.
- `src/shared/config/theme.ts` for typed theme values used by TypeScript code.
- `src/shared/lib/format-price.ts` for KZT price formatting with the `ru-KZ` locale.
- `src/shared/lib/media.ts` for safe media URL handling and image fallback support.
- `public/images/product-placeholder.svg` for lightweight missing-image placeholders.

Full production pages, feature architecture, API integration, and UI Kit components will be added in
later phases.

## UI Kit

Reusable UI primitives live in `src/shared/ui` and are exported through:

```tsx
import { Button, Input, Price } from '@/shared/ui';
```

The preview page is available at `/ui-kit`. It is a temporary technical page for checking shared UI
components, not a production storefront page.

The UI Kit does not contain business logic, backend API calls, product models, order models, or user
models. ProductCard and ProductGrid will be implemented later in the entity/widget layers.

## Next steps

1. Prompt 7: Layout/Header/Footer.
2. Build ProductCard/ProductGrid in the proper entity/widget layers.
3. Build production storefront pages after the foundation and theme are stable.
