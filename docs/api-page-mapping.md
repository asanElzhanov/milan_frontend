# API to Frontend Page Mapping

## 1. Backend API summary

Source: `backend-README.md`.

### Auth / Accounts

Base path: `/api/v1/auth/`

| Method | Endpoint | Frontend use |
| --- | --- | --- |
| `POST` | `/api/v1/auth/register/` | Register account. |
| `POST` | `/api/v1/auth/login/` | Login and receive JWT tokens. |
| `POST` | `/api/v1/auth/logout/` | Logout/blacklist token. |
| `POST` | `/api/v1/auth/token/refresh/` | Refresh access token. |
| `GET/PATCH` | `/api/v1/auth/me/` | Current user profile view/update. |
| `POST` | `/api/v1/auth/change-password/` | Password change. |
| `GET/POST` | `/api/v1/auth/addresses/` | List/create shipping addresses. |
| `GET/PATCH/DELETE` | `/api/v1/auth/addresses/<pk>/` | Address detail/update/delete. |
| `GET` | `/api/v1/auth/wishlist/` | Wishlist/favorites list. |
| `POST` | `/api/v1/auth/wishlist/toggle/<id>/` | Add/remove product from wishlist. |
| `POST` | `/api/v1/auth/otp/request/` | Request OTP. |
| `POST` | `/api/v1/auth/otp/verify/` | Verify OTP. |

### Catalog

Base path: `/api/v1/catalog/`

| Method | Endpoint | Frontend use |
| --- | --- | --- |
| `GET` | `/api/v1/catalog/categories/` | Category tree/navigation/filter facets. |
| `GET` | `/api/v1/catalog/brands/` | Brand filter/list. |
| `GET` | `/api/v1/catalog/products/` | Product list with filters. |
| `GET` | `/api/v1/catalog/products/<slug>/` | Product detail by slug. |
| `GET` | `/api/v1/catalog/products/<slug>/similar/` | Similar/related products. |
| `GET/POST` | `/api/v1/catalog/products/<slug>/reviews/` | Product reviews list/create. |
| `GET` | `/api/v1/catalog/banners/?position=hero` | Home/catalog banners. |
| `POST` | `/api/v1/catalog/promo/check/` | Promo code validation. |

Documented `GET /api/v1/catalog/products/` filters:

| Parameter | Purpose |
| --- | --- |
| `category`, `brand`, `color`, `size` | Main facets. |
| `price_min`, `price_max` | Price range. |
| `material`, `season` | Extra product attributes. |
| `in_stock=true`, `has_discount=true`, `is_new=true` | Boolean filters. |
| `search=<text>` | Search query. |
| `ordering=price \| -price \| created_at \| -rating \| orders_count` | Sorting. |

### Orders

Base path: `/api/v1/orders/`

| Method | Endpoint | Frontend use |
| --- | --- | --- |
| `GET` | `/api/v1/orders/cart/` | Current cart. |
| `POST` | `/api/v1/orders/cart/add/` | Add product variant to cart. |
| `PATCH` | `/api/v1/orders/cart/items/<pk>/` | Update cart item quantity. |
| `DELETE` | `/api/v1/orders/cart/items/<pk>/delete/` | Remove cart item. |
| `DELETE` | `/api/v1/orders/cart/clear/` | Clear cart. |
| `POST` | `/api/v1/orders/` | Create order. |
| `GET` | `/api/v1/orders/history/` | Order history. |
| `GET` | `/api/v1/orders/<number>/` | Order detail/status. |

### Payments

Base path: `/api/v1/payments/`

| Method | Endpoint | Frontend use |
| --- | --- | --- |
| `POST` | `/api/v1/payments/stripe/create-intent/` | Create Stripe PaymentIntent. |
| `POST` | `/api/v1/payments/stripe/webhook/` | Backend webhook; not called by frontend. |
| `POST` | `/api/v1/payments/kaspi/create/` | Create Kaspi Pay link/flow. |
| `POST` | `/api/v1/payments/kaspi/webhook/` | Backend callback; not called by frontend. |

### Notifications

`backend-README.md` describes `notifications` as email notifications through Celery tasks. No frontend-facing notifications endpoint was found in README. Treat any notification-center UI as not found in README / disabled placeholder.

### Documentation

| Endpoint | Purpose |
| --- | --- |
| `/docs/` | Swagger UI. |
| `/api/docs/` | Swagger UI alias. |
| `/api/schema/` | OpenAPI schema. Use for API client/DTO generation. |
| `/api/redoc/` | Redoc docs. |

## 2. Page to endpoint mapping

| Frontend page/component | Current data source | Backend endpoint | Integration priority | Notes/Risks |
| --- | --- | --- | --- | --- |
| Home hero | Inline Unsplash image/copy in `Premium E-commerce Website Design.zip::src/app/pages/Home.tsx` | `GET /api/v1/catalog/banners/?position=hero` | High | Need banner DTO and media fallback. Confirm banner positions beyond `hero` if more home sections are needed. |
| Home category tiles | Inline array in `Home.tsx` | `GET /api/v1/catalog/categories/` | High | Backend returns category tree; frontend needs top-level/highlight adapter and localized labels. |
| Home new arrivals | `MOCK_PRODUCTS.filter(p => p.isNew)` | `GET /api/v1/catalog/products/?is_new=true` | High | Product card adapter required. Remove USD formatting. |
| Home best sellers | `bestSellers` computed but not rendered | Expected / needs confirmation: `GET /api/v1/catalog/products/?ordering=orders_count` or similar | Low | `orders_count` appears as ordering option, but no explicit bestseller endpoint exists. |
| Header category nav | `CATEGORIES.slice(0, 4)` in `Layout.tsx` | `GET /api/v1/catalog/categories/` | High | Needs cached server fetch or revalidation strategy. |
| Header cart badge | Hardcoded `2` in `Layout.tsx` | `GET /api/v1/orders/cart/` | High | Must handle anonymous/authenticated cart policy, not described in README. |
| Header wishlist icon | Static link to `/account/favorites` | `GET /api/v1/auth/wishlist/` | Medium | Optional feature flag; business may disable wishlist. |
| Footer newsletter | Static form in `Layout.tsx` | Not found in README | Low | Disable, make mailto/marketing link, or add backend later. |
| Catalog grid | `MOCK_PRODUCTS` plus duplicated mock list | `GET /api/v1/catalog/products/` | High | Needs pagination response shape from `/api/schema/`. |
| Catalog filters | Inline `categories`, `sizes`, price inputs | `GET /api/v1/catalog/products/`, `GET /api/v1/catalog/categories/`, `GET /api/v1/catalog/brands/` | High | Need facet source. Size/color/material/season options may come from products or schema; not explicitly listed as endpoints. |
| Catalog sort | Static Sort button | `GET /api/v1/catalog/products/?ordering=...` | High | Supported values documented: `price`, `-price`, `created_at`, `-rating`, `orders_count`. |
| Product detail | `MOCK_PRODUCTS.find(p.id)` | `GET /api/v1/catalog/products/<slug>/` | High | Route must change from id to slug. Need 404 handling. |
| Product gallery | `image`, `hoverImage`, repeated image | `GET /api/v1/catalog/products/<slug>/` | High | Backend model has `ProductImage` and `ProductVideo`; adapter must choose primary, hover, gallery, video. |
| Product variants | `colors`, `sizes` arrays | `GET /api/v1/catalog/products/<slug>/` | High | Backend model has `ProductVariant(color + size + stock)`. UI must disable unavailable combinations. |
| Product reviews | Static page has no reviews UI | `GET/POST /api/v1/catalog/products/<slug>/reviews/` | Medium | Add reviews section and auth requirement for POST if backend enforces it. |
| Similar products | `MOCK_PRODUCTS.map` | `GET /api/v1/catalog/products/<slug>/similar/` | Medium | Reuse product card adapter. |
| Add to cart | Button with no handler | `POST /api/v1/orders/cart/add/` | High | Must send product variant ID/quantity; exact payload from schema required. |
| Wishlist toggle | Heart button with no handler | `POST /api/v1/auth/wishlist/toggle/<id>/` | Medium | Feature flag and auth handling required. Endpoint uses `<id>` while product detail uses slug. |
| Cart page | Inline `cartItems` from mock products | `GET /api/v1/orders/cart/` | High | Backend totals should be authoritative. |
| Cart quantity update | Buttons with no handlers | `PATCH /api/v1/orders/cart/items/<pk>/` | High | Needs optimistic/pessimistic mutation decision and stock error handling. |
| Cart remove | Button with no handler | `DELETE /api/v1/orders/cart/items/<pk>/delete/` | High | Use backend cart item `pk`, not product ID. |
| Cart clear | No UI currently | `DELETE /api/v1/orders/cart/clear/` | Medium | Add if business wants clear-cart action. |
| Promo code | No UI currently | `POST /api/v1/catalog/promo/check/` | Medium | Should be added to cart or checkout; exact payload/discount response from schema required. |
| Checkout | Placeholder route | `GET /api/v1/orders/cart/`, address endpoints, `POST /api/v1/orders/` | High | Full page missing. Need delivery/payment/business validation requirements. |
| Stripe payment | No UI currently | `POST /api/v1/payments/stripe/create-intent/` | High after checkout | Webhook is backend-only. Frontend success/fail/pending routes not found in README. |
| Kaspi payment | No UI currently | `POST /api/v1/payments/kaspi/create/` | High after checkout | Need redirect/deeplink behavior and status polling/return route; not described in README. |
| Login/register | Placeholder route | Auth endpoints listed above | High | Need token storage, refresh, OTP, validation, error states. |
| Logout | Account sign-out button no handler | `POST /api/v1/auth/logout/` | High | Clear local auth state after successful logout. |
| Account profile | Inline profile values | `GET/PATCH /api/v1/auth/me/` | High | Needs protected route and form validation. |
| Change password | No UI currently | `POST /api/v1/auth/change-password/` | Medium | Add account security section. |
| Account orders | Inline order array | `GET /api/v1/orders/history/`, `GET /api/v1/orders/<number>/` | High | Replace USD totals and English statuses with localized values. |
| Account addresses | Inline address | `GET/POST /api/v1/auth/addresses/`, `GET/PATCH/DELETE /api/v1/auth/addresses/<pk>/` | High | Required for checkout reuse. |
| Account favorites | `MOCK_PRODUCTS.slice(0, 3)` | `GET /api/v1/auth/wishlist/` | Medium | Optional feature flag. |
| Account loyalty | Inline points/tier | Not found in README | Low | Keep disabled/placeholder; do not ship as live account feature. |
| About | Placeholder route; home has brand story block | Not found in README | Medium | Static content can ship if business copy exists. |
| Delivery/FAQ/Contacts/Terms/Privacy | Placeholder routes | Not found in README | Medium | Static pages are acceptable; legal/business copy required. |
| Notifications | No current page/component | Not found in README | Low | README mentions backend email tasks only. |

## 3. MockData replacement map

| MockData / static source | Current fields | Replace with | Production priority | Adapter notes |
| --- | --- | --- | --- | --- |
| `MOCK_PRODUCTS` in `src/app/data/mockData.ts` | `id`, `name`, `price`, `salePrice`, `image`, `hoverImage`, `category`, `isNew`, `isBestseller`, `colors`, `sizes` | Catalog product list/detail/similar endpoints | High | Build product adapters for card/detail. Convert price to KZT. Map `ProductImage`, `ProductVideo`, `ProductVariant`, category, brand, stock, discount, rating. |
| `CATEGORIES` in `src/app/data/mockData.ts` | `name`, `link` | `GET /api/v1/catalog/categories/` | High | Backend category tree needs navigation flattening and localized labels/slugs. |
| Home inline hero | Image URL, title, season, CTA | `GET /api/v1/catalog/banners/?position=hero` | High | Confirm banner payload has title/subtitle/CTA/image fields. |
| Home inline category tiles | `title`, `image` | `GET /api/v1/catalog/categories/` plus category image fields if available | Medium | Category images are not explicitly described in README; expected / needs confirmation in schema. |
| Home inline benefits | Title/description with USD threshold | Static localized content or future content API | Medium | No backend endpoint found. Must use KZT and ru/kk. |
| Catalog inline filters | Category names, sizes, price min/max inputs | Product filters plus categories/brands endpoints | High | Need available values for color/size/material/season. If no facet endpoint exists, derive from schema/product response or ask backend. |
| Cart inline `cartItems` | Product, quantity, size, color | `GET /api/v1/orders/cart/` | High | Use cart item `pk`, product variant, backend totals, stock messages. |
| Account inline profile | Name, email, phone | `GET/PATCH /api/v1/auth/me/` | High | Match backend user serializer fields from schema. |
| Account inline orders | `id`, `date`, `status`, `total` | `GET /api/v1/orders/history/`, `GET /api/v1/orders/<number>/` | High | Localize statuses and dates, KZT totals. |
| Account inline address | Name/address/city | Address endpoints | High | DTO adapter must match backend address field names. |
| Account favorites | `MOCK_PRODUCTS.slice(0, 3)` | `GET /api/v1/auth/wishlist/` | Medium | Optional feature flag. |
| Account loyalty | Tier/points | Not found in README | Low | Disabled/placeholder until backend adds endpoint. |
| Layout cart badge | Hardcoded `2` | `GET /api/v1/orders/cart/` | High | Cart count from backend response item quantities. |
| Layout newsletter form | Email input only | Not found in README | Low | Disable or make non-submitting until backend support exists. |

## 4. DTO / adapter requirements

| Adapter | Needed for | Why |
| --- | --- | --- |
| `productToCardViewModel` | Home, catalog, related products, wishlist | Backend product shape is richer than prototype card. Needs `slug`, primary image, hover image, KZT price, discount state, stock/wishlist flags. |
| `productToDetailViewModel` | Product detail | Must map gallery, videos, variants, selected color/size availability, description, materials, delivery copy, reviews summary. |
| `categoryTreeToNav` | Header, home category tiles, catalog filters | Backend returns category tree; UI needs top nav items, filter options, localized labels, URLs. |
| `cartToViewModel` | Header badge, cart, checkout | Backend must own totals. Adapter should normalize line items, variant labels, product image, quantity, subtotal, discounts, shipping/payment summaries. |
| `orderToSummaryViewModel` | Account order history | Localize order status/date and format KZT totals. |
| `addressToFormValues` / `formValuesToAddressPayload` | Account addresses, checkout | Backend field names must be confirmed from schema. |
| `userToProfileForm` / `profileFormToPatchPayload` | Account profile | Avoid leaking backend-only fields and support partial update. |
| `mediaUrlToImageProps` | All product/banner/category images | Backend may use MinIO/S3. Need absolute URL handling, Next image remote patterns, fallback image, alt text. |
| `apiErrorToFormErrors` | Auth, checkout, account forms | DRF validation errors need consistent display. |

Known field mismatches from prototype:

| Prototype field/behavior | Backend expectation / risk |
| --- | --- |
| Product route uses `id` | Backend detail endpoint uses `<slug>`. |
| Product prices are plain numbers in USD | Production requires KZT and likely decimal/string-safe formatting. |
| `colors` and `sizes` are independent arrays | Backend has `ProductVariant(color + size + stock)`, so availability is combination-based. |
| `image` and `hoverImage` are flat URLs | Backend has `ProductImage` many relation and possibly S3/MinIO URLs. |
| Product card has no brand/material/season/rating | Backend filters and ordering imply these fields may exist and should be surfaced where useful. |
| Cart uses product objects directly | Backend cart item should reference product variant and cart item ID. |
| Order numbers are display strings like `#SM-10492` | Backend endpoint uses `<number>`; exact field from schema needed. |

## 5. Backend dependencies

| Feature | Backend dependency | Status from README |
| --- | --- | --- |
| API client generation | `/api/schema/` | Found. Recommended first integration step. |
| Home banners | `/api/v1/catalog/banners/?position=hero` | Found. Other banner positions need confirmation. |
| Catalog/product | Catalog endpoints and filters | Found. Pagination/response shape requires schema. |
| Product media | `ProductImage`, `ProductVideo`, MinIO/S3 media URLs | Models/MinIO notes found. Serializer fields require schema. |
| Cart | Orders cart endpoints | Found. Anonymous cart/session behavior not described. |
| Checkout | Cart, addresses, `POST /api/v1/orders/` | Found. Required order payload not described in README. |
| Payments | Stripe/Kaspi create endpoints | Found. Frontend return/status flows not described. |
| Auth/token refresh | Auth endpoints | Found. Cookie vs local storage policy not described. |
| OTP | OTP request/verify endpoints | Found. UX/business rule needs confirmation. |
| Wishlist | Wishlist endpoints | Found. Business may disable; use feature flag. |
| Notifications UI | Frontend-facing notifications endpoint | Not found in README. |
| Loyalty | Points/tier endpoint | Not found in README. |
| Newsletter | Subscription endpoint | Not found in README. |
| Static content/CMS | About, delivery, FAQ, legal content endpoints | Not found in README. |

## 6. Frontend implementation priority

| Priority | Work | Rationale |
| --- | --- | --- |
| 1 | Setup + theme + selected UI kit | Establish Next.js foundations without copying unused prototype code. |
| 2 | API client from `/api/schema/` and DTO adapters | Prevent frontend from depending on mock shapes. |
| 3 | Layout/Header/Footer | Shared shell, categories, cart badge, locale/currency conventions. |
| 4 | Home | High business value and straightforward banner/category/product APIs. |
| 5 | Catalog | Core shopping journey; needs filters, sorting, pagination. |
| 6 | Product detail | Required before cart because add-to-cart depends on variants. |
| 7 | Cart | Replace unsafe mock totals with backend cart. |
| 8 | Auth | Required for account, wishlist, protected checkout behavior. |
| 9 | Checkout | Depends on cart, addresses, order creation. |
| 10 | Payment | Depends on successful order/checkout design. |
| 11 | Account profile/orders/addresses | Post-purchase and user management. |
| 12 | i18n ru/kk | Should start early, but full copy pass after core pages stabilize. |
| 13 | Responsive QA | Validate real data, mobile filters/header, checkout forms, image fallbacks. |
| 14 | Docker/build | Production packaging, env config, CI/build verification. |

## 7. Open questions / risks

| Question / risk | Impact |
| --- | --- |
| What is the exact OpenAPI schema for product, cart, order, payment, address, and user serializers? | Required for reliable DTO adapters. |
| Does cart support anonymous users, or only authenticated users? | Affects header badge, cart persistence, checkout, and token timing. |
| What is the exact `POST /api/v1/orders/` payload? | Blocks checkout implementation. |
| What are the Stripe/Kaspi frontend return URLs and pending/success/fail state rules? | Blocks payment UX. README only lists create and webhook endpoints. |
| Are category images included in `categories/`? | Affects home category tiles. Not confirmed in README. |
| Are available filter facets exposed separately? | Catalog sidebar may need derived options if no facet endpoint exists. |
| Should wishlist ship? | Backend supports it, but business may disable it. Use feature flag. |
| Is OTP required for all auth or optional? | Changes login/register UX. |
| Are ru and kk fields returned by backend, or should frontend own translations for labels/content? | Affects DTO and i18n architecture. |
| Should static pages be hardcoded, MDX, or backend/CMS-driven later? | README has no content endpoints. |
| Is newsletter collection required at launch? | No endpoint found in README. |
| How should MinIO/S3 media URLs be exposed in production? | Next image config and fallback behavior depend on domain format. |
| Are notifications ever visible in frontend? | README mentions email tasks only; no frontend API found. |
