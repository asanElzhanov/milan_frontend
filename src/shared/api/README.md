# API Foundation

## 1. Overview

The shared API layer provides frontend infrastructure only:

- fetch-based HTTP client;
- OpenAPI type generation;
- TanStack Query provider;
- temporary token storage placeholder;
- `mock` / `real` API mode config.

Business API modules are intentionally not implemented here.

## 2. Environment

- `NEXT_PUBLIC_API_URL` points to the Django REST API base URL.
- `NEXT_PUBLIC_API_MODE` supports `mock` and `real`.

Unknown API mode values fall back to `mock`.

## 3. Type Generation

Run:

```bash
npm run api:generate
```

The backend must be available at `/api/schema/`. The generated file is written to:

```text
src/shared/api/generated/schema.ts
```

If the backend is not running, generation can fail. The committed fallback file keeps
`typecheck` and `build` working until the backend schema is available.

## 4. HTTP Client Usage

```ts
import { apiClient } from '@/shared/api';

const products = await apiClient.get('/api/v1/catalog/products/');
```

## 5. React Query Usage

`src/app/providers.tsx` creates the `QueryClient` and wraps the App Router tree.

Entity and feature hooks will be added later in their own modules. Do not add product, auth, cart,
or order hooks directly to `shared/api`.

## 6. Auth / Token Note

Token storage is temporary and uses client-side `localStorage`. The auth flow prompt may replace
this strategy.

For now, `401` responses are returned as `ApiError`. Refresh token handling will be added during
auth integration.

## 7. What Not To Put Here

Do not put these in `shared/api`:

- `productApi`
- `authApi`
- `cartApi`
- `orderApi`
- business DTO adapters

Those belong in the corresponding `entities` or `features` modules.
