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

## Backend connection note

The Django REST API will be connected in later implementation phases. The future API base URL is
configured through `NEXT_PUBLIC_API_URL`. This foundation intentionally avoids API integration for
now.

## Next steps

1. Prompt 3: migrate Sara Milan theme tokens from the prototype.
2. Add architecture folders for entities, features, and widgets.
3. Generate or implement the API client from the backend schema.
4. Build production storefront pages after the foundation and theme are stable.
