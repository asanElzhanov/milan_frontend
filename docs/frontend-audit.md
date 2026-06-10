# Frontend Prototype Audit

## 1. Repository / Prototype structure

The checked-in repository is currently a fresh Next.js scaffold, not the production storefront implementation:

| Path | Purpose |
| --- | --- |
| `package.json` | Next.js 16.2.9, React 19.2.4, Tailwind CSS 4, TypeScript scaffold scripts. |
| `app/page.tsx`, `app/layout.tsx`, `app/globals.css` | Default App Router files. Not the audited storefront prototype. |
| `backend-README.md` | Backend API overview, endpoint list, Docker/MinIO notes, and model summary. |
| `Premium E-commerce Website Design.zip` | React/Vite storefront prototype archive audited for this document. |
| `CLAUDE.md`, `AGENTS.md` | Local agent instructions. |

Prototype archive structure, inspected from `Premium E-commerce Website Design.zip`:

| Archive path | Purpose |
| --- | --- |
| `package.json` | Vite prototype dependency manifest. |
| `vite.config.ts`, `index.html`, `postcss.config.mjs` | Vite application shell. |
| `src/main.tsx` | React entrypoint. |
| `src/app/App.tsx` | Renders `RouterProvider`. |
| `src/app/routes.tsx` | React Router route table and placeholder routes. |
| `src/app/pages/Home.tsx` | Home page implementation. |
| `src/app/pages/Catalog.tsx` | Catalog listing and filters UI. |
| `src/app/pages/Product.tsx` | Product detail page. |
| `src/app/pages/Cart.tsx` | Shopping bag page. |
| `src/app/pages/Account.tsx` | Account area with profile, orders, favorites, addresses, loyalty tabs. |
| `src/app/components/Layout.tsx` | Header, announcement bar, footer, outlet layout. |
| `src/app/components/ProductCard.tsx` | Reusable product card. |
| `src/app/components/figma/ImageWithFallback.tsx` | Figma-generated image fallback helper. |
| `src/app/components/ui/*.tsx` | shadcn/Radix-style UI kit components. Mostly unused by current pages. |
| `src/app/data/mockData.ts` | Central product and category mock data. |
| `src/styles/*.css` | Tailwind, theme tokens, font imports. |

No backend code was changed. No Next.js project was created.

## 2. Current frontend stack

Checked-in scaffold:

| Area | Current value |
| --- | --- |
| Framework | Next.js 16.2.9 with App Router files under `app/`. |
| Language | TypeScript. |
| Styling | Tailwind CSS 4 through `@tailwindcss/postcss`. |
| React | React 19.2.4. |
| Scripts | `dev`, `build`, `start`, `lint`. |

Prototype archive:

| Area | Current value |
| --- | --- |
| Framework/build | Vite 6.3.5 with `@vitejs/plugin-react`. |
| Routing | `react-router` 7.13.0, browser router in `src/app/routes.tsx`. |
| State | Local React state only. No Redux/Zustand/query cache. |
| Styling | Tailwind CSS 4.1.12 with custom theme tokens in `src/styles/theme.css`. |
| UI libraries | Radix UI primitives, shadcn-style component files, lucide-react icons, MUI dependencies in manifest. |
| Forms | Local uncontrolled inputs; `react-hook-form` is installed but not used by audited pages. |
| Data | `src/app/data/mockData.ts` plus several inline mock arrays/objects inside pages. |

## 3. Existing pages

| Route | Component file | Purpose | Main components | Current data source | Backend replacement | Reusable in Next.js |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | `Premium E-commerce Website Design.zip::src/app/pages/Home.tsx` | Luxury storefront home with hero, categories, new arrivals, brand story, benefits. | `Layout`, `ProductCard`, `Link`, `ArrowRight`. | `MOCK_PRODUCTS`, inline hero/category images, inline benefits copy. `bestSellers` is computed but unused. | `GET /api/v1/catalog/banners/?position=hero`, `GET /api/v1/catalog/categories/`, `GET /api/v1/catalog/products/?is_new=true`; benefits/content not found in README. | Strong visual basis: hero, editorial spacing, category tiles, product grid, premium palette. Replace USD copy with KZT and ru/kk text. |
| `/catalog` | `Premium E-commerce Website Design.zip::src/app/pages/Catalog.tsx` | Product listing with filter sidebar, sort button, responsive grid. | `ProductCard`, local filter controls, lucide icons. | `MOCK_PRODUCTS`, inline categories, sizes, duplicate product map for demo fill. | `GET /api/v1/catalog/products/` with filters: `category`, `brand`, `color`, `size`, `price_min`, `price_max`, `material`, `season`, `in_stock`, `has_discount`, `is_new`, `search`, `ordering`; `GET /api/v1/catalog/categories/`; `GET /api/v1/catalog/brands/`. | Reuse layout and filter UI direction. Rewrite data loading, URL query syncing, pagination, loading/error/empty states. |
| `/product/:id` | `Premium E-commerce Website Design.zip::src/app/pages/Product.tsx` | Product detail with gallery, size/color selection, actions, product details, related products. | `ProductCard`, `Link`, local selected size/color state. | `MOCK_PRODUCTS.find(p.id)`, generated description/material copy, repeated image fields, `MOCK_PRODUCTS` for related products. | Backend documents `GET /api/v1/catalog/products/<slug>/`, `GET /api/v1/catalog/products/<slug>/similar/`, `GET/POST /api/v1/catalog/products/<slug>/reviews/`, `POST /api/v1/orders/cart/add/`, `POST /api/v1/auth/wishlist/toggle/<id>/`. | Reuse visual gallery/product info. Change route to slug, add variants/stock, reviews, image fallback, KZT, API-driven related products. |
| `/cart` | `Premium E-commerce Website Design.zip::src/app/pages/Cart.tsx` | Shopping bag with line items, quantity controls, summary, checkout CTA. | `Link`, lucide quantity/remove icons. | Inline `cartItems` from `MOCK_PRODUCTS[0..1]`, local subtotal math. | `GET /api/v1/orders/cart/`, `POST /api/v1/orders/cart/add/`, `PATCH /api/v1/orders/cart/items/<pk>/`, `DELETE /api/v1/orders/cart/items/<pk>/delete/`, `DELETE /api/v1/orders/cart/clear/`, `POST /api/v1/catalog/promo/check/`. | Reuse table/summary layout. Rewrite all mutations and totals from backend cart response. |
| `/account` | `Premium E-commerce Website Design.zip::src/app/pages/Account.tsx` | Account dashboard with tabs for profile, orders, favorites, addresses, loyalty. | Local tab state, `ProductCard`, lucide icons. | Inline profile, orders, address, loyalty data; favorites from `MOCK_PRODUCTS.slice(0, 3)`. | `GET/PATCH /api/v1/auth/me/`, `GET /api/v1/orders/history/`, `GET /api/v1/orders/<number>/`, `GET/POST /api/v1/auth/addresses/`, `GET/PATCH/DELETE /api/v1/auth/addresses/<pk>/`, `GET /api/v1/auth/wishlist/`; loyalty API not found in README. | Reuse sidebar/tab layout. Split into route segments in Next.js and protect with auth. Loyalty should remain disabled/placeholder until backend exists. |
| `/account/favorites` | `src/app/routes.tsx` maps to `Account` | Shortcut to account page, intended favorites section. | `Account`. | Same as account; does not activate favorites tab by route. | `GET /api/v1/auth/wishlist/`. | Convert to `/account/favorites` page or query-driven tab. Optional feature flag because wishlist may be disabled by business. |
| `/login` | `src/app/routes.tsx` placeholder | Sign in/register placeholder. | Inline `Placeholder`. | Static placeholder only. | `POST /api/v1/auth/login/`, `POST /api/v1/auth/register/`, `POST /api/v1/auth/logout/`, `POST /api/v1/auth/token/refresh/`, `POST /api/v1/auth/otp/request/`, `POST /api/v1/auth/otp/verify/`. | Visual design must be created; no usable auth UI exists. |
| `/checkout` | `src/app/routes.tsx` placeholder | Checkout placeholder. | Inline `Placeholder`. | Static placeholder only. | `GET /api/v1/orders/cart/`, `GET/POST /api/v1/auth/addresses/`, `POST /api/v1/orders/`, payment endpoints. | Needs full production implementation. |
| `/about` | `src/app/routes.tsx` placeholder | Brand story placeholder. | Inline `Placeholder`. | Static placeholder only; home has reusable brand-story block. | Content endpoint not found in README. | Can reuse home editorial section as starting point. |
| `/delivery` | `src/app/routes.tsx` placeholder | Delivery and returns placeholder. | Inline `Placeholder`. | Static placeholder only. | Content endpoint not found in README. | Static MDX/content page is acceptable if business copy is supplied. |
| `/faq` | `src/app/routes.tsx` placeholder | FAQ placeholder. | Inline `Placeholder`. | Static placeholder only. | Content endpoint not found in README. | Static page or CMS later. |
| `/contacts` | `src/app/routes.tsx` placeholder | Contacts placeholder. | Inline `Placeholder`. | Static placeholder only. | Contact endpoint not found in README. | Static contacts plus WhatsApp link can be built without backend. |
| `/terms` | `src/app/routes.tsx` placeholder | Terms placeholder. | Inline `Placeholder`. | Static placeholder only. | Content endpoint not found in README. | Static legal page. |
| `/privacy` | `src/app/routes.tsx` placeholder | Privacy placeholder. | Inline `Placeholder`. | Static placeholder only. | Content endpoint not found in README. | Static legal page. |
| `*` | `src/app/routes.tsx` placeholder | Not found page. | Inline `Placeholder`. | Static placeholder only. | No backend needed. | Build as Next.js `not-found.tsx`. |

Implemented pages found: 5 (`Home`, `Catalog`, `Product`, `Cart`, `Account`). Total route entries found: 15 including placeholders and wildcard.

## 4. Existing components

| Component | File | Used by | Notes |
| --- | --- | --- | --- |
| `Layout` | `Premium E-commerce Website Design.zip::src/app/components/Layout.tsx` | All routes through `Outlet`. | Contains announcement bar, sticky header, category nav, icon links, cart badge, footer, newsletter form. Depends on `CATEGORIES` mock data. Cart count is hardcoded to `2`. |
| `ProductCard` | `Premium E-commerce Website Design.zip::src/app/components/ProductCard.tsx` | Home, Catalog, Product related products, Account favorites. | Good reusable visual component. Needs DTO adapter for product images, slug, KZT price display, wishlist state, discount labels, accessibility polish. |
| `ImageWithFallback` | `Premium E-commerce Website Design.zip::src/app/components/figma/ImageWithFallback.tsx` | Not used by audited pages. | Useful idea for MinIO/S3 media fallback, but Next.js implementation should use `next/image` with explicit fallback policy. |
| `Placeholder` | `Premium E-commerce Website Design.zip::src/app/routes.tsx` | Login, checkout, static pages, 404. | Not production-ready. |
| UI kit files | `Premium E-commerce Website Design.zip::src/app/components/ui/*.tsx` | Mostly unused by current pages. | shadcn/Radix-style components can seed the production UI kit, but should be copied selectively and aligned with Next.js, React 19, app-level theme, and accessibility requirements. |

## 5. Existing mockData

| Mock/static source | File | Entities | Used in | Backend replacement | Mismatch / DTO adapter needs |
| --- | --- | --- | --- | --- | --- |
| `MOCK_PRODUCTS` | `Premium E-commerce Website Design.zip::src/app/data/mockData.ts` | 4 products with `id`, `name`, `price`, `salePrice`, `image`, `hoverImage`, `category`, `isNew`, `isBestseller`, `colors`, `sizes`. | `Home`, `Catalog`, `Product`, `Cart`, `Account`, `ProductCard`. | `GET /api/v1/catalog/products/`, `GET /api/v1/catalog/products/<slug>/`, `GET /api/v1/catalog/products/<slug>/similar/`. | Uses USD numbers, product `id` for route, one/two image URLs, flat colors/sizes, no slug, SKU, variants, stock, brand, material, season, rating, review count, media URL normalization, or KZT formatting. Adapter should map backend product/images/variants to card and detail view models. |
| `CATEGORIES` | `Premium E-commerce Website Design.zip::src/app/data/mockData.ts` | Category nav labels and links. | `Layout` desktop nav. | `GET /api/v1/catalog/categories/`. | Static English labels and query links. Backend likely returns tree; adapter should flatten top-level nav and localize ru/kk labels. |
| Home hero/category/benefits arrays | `Premium E-commerce Website Design.zip::src/app/pages/Home.tsx` | Hero image/copy, 3 category tiles, benefits. | Home only. | `GET /api/v1/catalog/banners/?position=hero`, `GET /api/v1/catalog/categories/`; benefits/content endpoint not found in README. | Images are Unsplash URLs, English copy, USD threshold. Need KZT business copy and backend/media fallback. |
| Catalog filters | `Premium E-commerce Website Design.zip::src/app/pages/Catalog.tsx` | Inline category and size filter values. | Catalog sidebar. | Product filters documented on `GET /api/v1/catalog/products/`; categories and brands endpoints. | Needs backend-driven available facets, query param state, numeric KZT ranges, empty/loading states. |
| Cart items | `Premium E-commerce Website Design.zip::src/app/pages/Cart.tsx` | Two hardcoded cart lines using mock products. | Cart. | `GET /api/v1/orders/cart/` and cart mutation endpoints. | Production cannot keep local cart totals; backend cart item IDs, product variant IDs, stock validation, promo and shipping totals are required. |
| Account profile/orders/address/loyalty | `Premium E-commerce Website Design.zip::src/app/pages/Account.tsx` | User profile, order history, address, loyalty points, favorites. | Account tabs. | `GET/PATCH /api/v1/auth/me/`, `GET /api/v1/orders/history/`, `GET /api/v1/orders/<number>/`, address endpoints, wishlist endpoint. Loyalty endpoint not found in README. | English sample data, USD totals, no auth state, no server validation. Loyalty should be disabled or feature-flagged until backend exists. |
| Layout badge/newsletter/shipping copy | `Premium E-commerce Website Design.zip::src/app/components/Layout.tsx` | Cart count `2`, free shipping over `$500`, newsletter form. | Header/footer. | Cart count from `GET /api/v1/orders/cart/`; newsletter endpoint not found in README. | Replace USD with KZT, localize ru/kk, wire cart count to API/client state. Newsletter should be static/disabled unless backend endpoint is added. |

Mock/static data sources found: 7 grouped sources, including 2 central exports and 5 inline page/layout data groups.

## 6. Reusable design/theme assets

| Asset | File | Recommendation |
| --- | --- | --- |
| Color tokens | `Premium E-commerce Website Design.zip::src/styles/theme.css` | Reuse as Sara Milan base palette: `sara-white`, `sara-beige`, `sara-beige-dark`, `sara-bronze`, `sara-graphite`, `sara-black`. Fits premium fashion direction. |
| Typography | `Premium E-commerce Website Design.zip::src/styles/fonts.css` | Inter + Playfair Display works visually. Production should decide whether to self-host or use `next/font` instead of CSS `@import`. |
| Spacing/layout | Page files | Reuse max width `1440px`, desktop side padding `80px`, editorial hero/category/product grid patterns. |
| Product imagery behavior | `ProductCard.tsx`, `Product.tsx` | Reuse hover-image and gallery idea, but map to backend `ProductImage` and add fallbacks for MinIO/S3 media URLs. |
| UI kit | `src/app/components/ui/*.tsx` | Selectively migrate components actually needed: buttons, dialogs/sheets, form controls, tabs, accordion, select, checkbox, tooltip. Avoid copying unused chart/sidebar/calendar complexity unless required. |

## 7. Gaps and risks

| Area | Risk |
| --- | --- |
| Currency | Prototype uses `$` and USD thresholds. Production must use KZT formatting everywhere. |
| Localization | Prototype is English only. Production requires ru/kk copy, routes and formatting decisions. |
| Product route | Prototype uses `/product/:id`; backend documents product detail by slug. Next.js should use `/product/[slug]` or localized equivalent. |
| Product model | Mock product is much flatter than backend model with images, videos, variants, reviews, brand/category relations, stock. DTO adapters are required. |
| Cart | Cart is hardcoded and local. Production cart must be backend-first to avoid incorrect totals, variants, promo, and stock handling. |
| Checkout/payment | Checkout is a placeholder. Backend has order creation plus Stripe/Kaspi creation/webhook endpoints, but frontend success/fail/pending return routes are not documented in README. |
| Auth | Login/register are placeholders. Token storage, refresh, route protection, OTP flows, and logout behavior need design. |
| Wishlist | Backend supports wishlist, but business may disable it. Use an optional feature flag. |
| Notifications | README describes email/Celery notifications only; no frontend-facing notifications API found in README. Treat frontend notification center as disabled/not planned. |
| Static content | About, delivery, FAQ, contacts, privacy, terms have no content/API in README. Can be static files/pages initially. |
| Newsletter | Footer form has no backend endpoint in README. Keep disabled or wire later after backend support. |
| Media | Backend may use MinIO/S3. Production needs absolute media URL handling, image domain allowlist, fallback images, and broken-image telemetry. |
| Current scaffold | Repo already contains a Next scaffold, but it is not the production storefront. It should be replaced/expanded deliberately, not by copying the Vite app wholesale. |

## 8. Recommended migration approach

1. Setup + theme + UI Kit
   - Keep the existing Next.js App Router direction.
   - Port only reusable theme tokens, typography, base layout spacing, and selected UI kit components.
   - Define KZT formatter, ru/kk locale structure, image fallback helper, and feature flags (`wishlist`, `loyalty`, `newsletter`).

2. API client from `/api/schema/`
   - Generate or hand-type API DTOs from OpenAPI schema.
   - Add adapters from backend DTOs to frontend view models: `ProductCardVM`, `ProductDetailVM`, `CartVM`, `AccountVM`, `AddressVM`, `OrderVM`.
   - Do not rely on prototype mock product shape in production code.

3. Layout/Header/Footer
   - Rebuild `Layout` as Next.js app layout/components.
   - Connect nav categories to `GET /api/v1/catalog/categories/`.
   - Connect cart badge to cart API or authenticated cart state.
   - Keep newsletter and wishlist behind feature flags until confirmed.

4. Home
   - Reuse visual composition from prototype.
   - Replace hero/category/product sections with banners, categories, and product list APIs.
   - Convert English/USD copy to ru/kk and KZT.

5. Catalog
   - Implement API-backed product grid and filters.
   - Sync filters with URL search params.
   - Add pagination/infinite loading based on backend response shape from schema.

6. Product detail
   - Build slug route.
   - Integrate product detail, similar products, reviews, cart add, wishlist toggle.
   - Map variants for color/size/stock availability.

7. Cart
   - Replace hardcoded items with backend cart.
   - Implement add/update/delete/clear and promo check.
   - Make backend totals authoritative.

8. Auth
   - Build login/register/logout/token refresh/me flows.
   - Add OTP request/verify if business wants phone/OTP auth.
   - Protect account and checkout routes.

9. Checkout
   - Integrate cart, addresses, order creation.
   - Confirm delivery fields, validation, and guest checkout policy with backend/business.

10. Payment
   - Add Stripe and Kaspi create flows.
   - Define frontend success/fail/pending routes because README only lists create and webhook endpoints.

11. Account orders/profile
   - Implement profile, password change, addresses, order history/detail.
   - Wishlist optional. Loyalty remains placeholder unless backend endpoint is added.

12. i18n ru/kk
   - Externalize all user-facing copy.
   - Localize currency, dates, statuses, validation messages, and static legal pages.

13. Responsive QA
   - Test mobile header/menu, product grid, filters, product gallery, cart table, checkout forms.
   - Verify image fallbacks for missing or slow MinIO/S3 media.

14. Docker/build
   - Add production build checks, env docs, API base URL config, image remote patterns, and deployment notes.

Mock data that can temporarily remain during migration:

| Can temporarily remain | Reason |
| --- | --- |
| Static about/delivery/FAQ/contact/legal copy | README has no content API; static pages are acceptable if business copy is approved. |
| Benefits/editorial home copy | Can be static while catalog APIs are integrated, but must be localized and KZT-correct. |
| Loyalty visual placeholder | Only behind a disabled/preview feature flag. |

Mock data that must not remain in production:

| Must remove | Reason |
| --- | --- |
| `MOCK_PRODUCTS` for catalog/product/cart/favorites | Would create incorrect inventory, prices, variants, images, and order behavior. |
| Hardcoded cart items and cart badge | Cart must be backend-authoritative. |
| Inline account profile/orders/addresses | User data must come from authenticated API. |
| USD prices and thresholds | Business currency is KZT. |
| Unsplash product images as real catalog data | Backend media should own product images. |
