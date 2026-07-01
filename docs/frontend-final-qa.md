# Frontend Final QA

## Scope

Final QA reviewed the Next.js App Router frontend before demo/production handoff. The audit covered
routes, links, API modules, auth/cart/payment safety, user-facing placeholder language, docs, and
build checks.

## Route Audit

Build output confirms the main localized public, account, payment, static, and system routes are
registered. Dynamic routes remain on-demand:

- public: home, catalog, category catalog, product detail, auth pages
- cart/checkout/payment: cart, checkout, payment info, payment detail, success, fail, pending
- account: overview, settings, addresses, wishlist, orders, order detail, reviews, notifications
- static/system: about, delivery, FAQ, contacts, privacy, terms, `robots.txt`, `sitemap.xml`

No browser smoke test was run; this route audit is based on file inspection and `next build`.

## API Coverage

Detailed endpoint coverage is in `docs/frontend-api-coverage.md`.

## Auth Behavior

Public pages are available to guests. Account pages use `AccountShell` and current-user data from
`/api/v1/auth/me/`. Tokens are stored through SSR-safe helpers. Logout clears tokens and query
cache. Guest wishlist/review actions show auth-required or login flows.

## Cart And Checkout Behavior

Guest cart uses `X-Cart-Token`. Cart and checkout read backend cart/order data and do not create
local order/cart data. Product detail add-to-cart sends `variant_id`. Checkout sends the backend
payload shape and redirects only to safe backend URLs or known localized payment routes.

## Payment Behavior

Payment start endpoints are integrated for Kaspi and Stripe intent creation. Stripe Elements UI and
payment status remain pending backend/frontend work. Unsafe redirect URLs are rejected.

## Error/Loading/Empty States

Main API pages use skeleton/loading, `ErrorState`, `EmptyState`, readable API errors, and retry where
appropriate. Known backend-pending contracts are presented as graceful unavailable states.

## Responsive Notes

Layouts use responsive grids and spacing for header, product grid, product detail, cart, checkout,
account shell, order detail, and static pages. No automated visual viewport test was added.

## Performance Notes

Most route pages remain server components where possible. Client components are limited to query,
form, router, and browser-token interactions. Product images use the existing product image
component/fallback. The remaining lint warning is the existing header logo `<img>` recommendation.

## Security Notes

No `dangerouslySetInnerHTML` usage was found. External payment redirects are filtered to relative
URLs or `https:` URLs. localStorage access is guarded for SSR. No client secrets or hardcoded tokens
were found.

## Pending Backend Contracts

- Forgot-password endpoint
- Account current-user reviews endpoint
- Payment status endpoint
- Stripe Elements confirmation UI
- Newsletter/contact form endpoints

## Known Limitations

- No advanced SEO microdata
- No dynamic product/category sitemap
- No realtime/push notifications
- No admin or manager dashboard
- Manual browser/device smoke testing still required before production

## How To Run Checks

```bash
npm run lint
npm run typecheck
npm run build
npm run format:check
```
