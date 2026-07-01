# Backend Smoke Test Report

## Date

2026-07-01

## Environment

- Frontend env: `.env.local`
- `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- `NEXT_PUBLIC_API_MODE=real`

## Backend URL

`http://localhost:8000`

Backend availability:

- `GET /docs/`: PASS, `200`
- `GET /api/schema/`: PASS, `200`

## Frontend URL

`http://localhost:3000`

Frontend availability:

- `GET /ru`: PASS, `200`

## Summary

Smoke testing verified the local backend is reachable, the frontend is running, public catalog APIs
return real data, transactional guest/auth cart and checkout flows work, and the frontend now builds
API URLs under `/api/v1`.

Main frontend fixes during smoke:

- Fixed shared API URL composition so leading slash paths do not drop `/api/v1`.
- Updated `.env.local` to `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1`.
- Cleared guest cart token after successful cart merge.
- Cleared guest cart token after successful guest checkout.
- Added a Stripe `client_secret` message instead of treating it as a missing payment link.

Remaining blockers are backend/data-side:

- Stripe intent endpoint returns `500` with an empty body for the smoke order.
- Review creation returns `400` with an empty body for the smoke order, likely because backend
  eligibility requires a completed/valid order state.

## Checks

### 1. Public catalog flow

Status: PASS

Verified backend endpoints:

- `GET /api/v1/catalog/banners/?position=hero`: `200`
- `GET /api/v1/catalog/categories/tree/`: `200`
- `GET /api/v1/catalog/products/`: `200`, paginated response with `results`
- `GET /api/v1/catalog/brands/`: `200`
- `GET /api/v1/catalog/colors/`: `200`
- `GET /api/v1/catalog/sizes/`: `200`

Verified frontend pages:

- `/ru`: `200`
- `/kk`: `200`
- `/ru/catalog`: `200`
- `/kk/catalog`: `200`

Notes:

- Requests are under `http://localhost:8000/api/v1/...`.
- No `/api/v1/api/v1` issue was found in the verified URL builder examples.

### 2. Product detail and variants

Status: PASS

Smoke product: `seed-nike-cap-demo`

Verified backend endpoints:

- `GET /api/v1/catalog/products/seed-nike-cap-demo/`: `200`
- `GET /api/v1/catalog/products/seed-nike-cap-demo/similar/`: `200`
- `GET /api/v1/catalog/products/seed-nike-cap-demo/reviews/`: `200`

Verified:

- Product detail page `/ru/product/seed-nike-cap-demo`: `200`
- Variant id found: `11`
- Add-to-cart code path sends `{ "variant_id": 11, "quantity": 1 }`.

### 3. Guest cart flow

Status: PASS

Verified backend endpoints:

- `POST /api/v1/orders/cart/items/`: PASS, returned `cart_token`
- `GET /api/v1/orders/cart/` with `X-Cart-Token`: PASS
- `PATCH /api/v1/orders/cart/items/{cart_item_id}/`: PASS

Verified:

- Guest cart response contained `cart_token`.
- Follow-up cart request worked with `X-Cart-Token`.
- Quantity update returned `total_quantity=2`.

Not directly exercised:

- Promo apply/remove and clear-cart were code/path verified but not executed in transactional smoke,
  to avoid over-mutating the backend smoke order/cart.

### 4. Auth flow

Status: PASS

Smoke user: `codex.smoke.1782896455@example.com`

Verified backend endpoints:

- `POST /api/v1/auth/register/`: PASS
- `POST /api/v1/auth/login/`: PASS
- `GET /api/v1/auth/me/`: PASS
- `POST /api/v1/auth/logout/`: PASS

Verified:

- Register payload used `password2`.
- Auth response returned `tokens.access` and `tokens.refresh`.
- `Authorization: Bearer <access>` worked for `/auth/me/`.
- Logout sent refresh token and completed.

### 5. Cart merge after login

Status: PASS

Verified backend endpoint:

- `POST /api/v1/orders/cart/merge/`: PASS

Verified payload:

```json
{
  "guest_cart_token": "0a71489f-8446-461e-b6a9-60e921814fcc"
}
```

Frontend fixed during smoke:

- `mergeGuestCartAfterAuth` now clears the guest cart token after a successful merge.

### 6. Authenticated cart flow

Status: PASS

Verified as part of cart merge and checkout:

- Authenticated cart contained merged item.
- Checkout used authenticated headers and created an order.

### 7. Address flow

Status: PASS

Verified backend endpoints:

- `POST /api/v1/auth/addresses/`: PASS, created id `2`
- `PATCH /api/v1/auth/addresses/{id}/`: PASS
- `DELETE /api/v1/auth/addresses/{id}/`: PASS

Verified payload fields:

- `title`
- `country`
- `city`
- `street`
- `apartment`
- `postal_code`
- `is_default`

### 8. Checkout flow

Status: PASS

Verified backend endpoints:

- `GET /api/v1/orders/delivery-methods/`: PASS
- `POST /api/v1/orders/checkout/`: PASS

Smoke order:

- `ORD-A9A3F9C4`
- status: `new`

Verified checkout payload shape:

- `customer_name`
- `first_name`
- `last_name`
- `email`
- `phone`
- `city`
- `delivery_address` as string
- `delivery_method`
- `delivery_method_code`
- `delivery_method_id`
- `comment`

Verified:

- No frontend-calculated `delivery_price`, `discount_amount`, or totals were sent.
- Frontend now clears guest cart token after successful guest checkout.

### 9. Payment flow

Status: PARTIAL

Kaspi:

- `POST /api/v1/payments/kaspi/create/`: PASS
- Response contained `redirect_url`.
- Also tested without `email` for authenticated order: PASS.

Stripe:

- `POST /api/v1/payments/stripe/create-intent/`: FAIL/BLOCKED
- Backend returned `500 Internal Server Error` with empty response body.

Frontend fixed during smoke:

- If Stripe returns `client_secret`, payment UI now shows a production-safe Stripe Elements required
  message and does not fake success.

### 10. Order history/detail

Status: PASS

Verified backend endpoints:

- `GET /api/v1/orders/history/`: PASS
- `GET /api/v1/orders/ORD-A9A3F9C4/`: PASS

Verified:

- Order history returned count.
- Order detail returned `order_number`.

### 11. Wishlist

Status: PASS

Verified backend endpoints:

- `GET /api/v1/auth/wishlist/`: PASS
- `POST /api/v1/auth/wishlist/toggle/{product_id}/`: PASS

Verified:

- Toggle response returned `status=added`.
- Frontend code maps `added` / `removed` to active state and uses no localStorage wishlist.

### 12. Reviews

Status: PARTIAL

Verified backend endpoints:

- `GET /api/v1/catalog/products/seed-nike-cap-demo/reviews/`: PASS
- `POST /api/v1/catalog/reviews/`: BLOCKED

Create review payload used:

```json
{
  "product_slug": "seed-nike-cap-demo",
  "order_number": "ORD-A9A3F9C4",
  "rating": 5,
  "text": "Smoke review"
}
```

Backend response:

- `400 Bad Request`
- Empty body

Assessment:

- Frontend endpoint and payload are aligned with the guide.
- Backend likely rejected eligibility because the order is not completed/valid for review.
- Backend should ideally return a readable validation body.

### 13. Notifications

Status: PARTIAL

Verified backend endpoints:

- `GET /api/v1/notifications/`: PASS
- `GET /api/v1/notifications/?is_read=false`: PASS
- `POST /api/v1/notifications/mark-all-read/`: PASS

Not tested:

- `POST /api/v1/notifications/{id}/mark-read/`, because the smoke user had no notification item.
- `GET /api/v1/notifications/?event_type=payment_error`, code/path verified but not called during
  the transactional run.

### 14. Static pages

Status: PASS

Verified frontend pages:

- `/ru/about`: `200`
- `/ru/delivery`: `200`
- `/ru/payment`: `200`
- `/ru/faq`: `200`
- `/ru/contacts`: `200`
- `/ru/privacy`: `200`
- `/ru/terms`: `200`
- `/kk/about`: `200`
- `/robots.txt`: `200`
- `/sitemap.xml`: `200`
- `/ru/not-existing-page`: `404`

### 15. Error handling

Status: PARTIAL

Verified:

- Frontend API error helper is code-verified for `detail`, field errors, arrays, and nested objects.
- Stripe backend `500` and review backend `400` produced empty bodies; frontend can show fallback
  request-failed text, but backend did not provide readable validation details.

### 16. Responsive sanity check

Status: NOT TESTED

Reason:

- No interactive browser viewport tool was available in this run.
- HTTP route checks confirm pages render, but visual mobile/tablet/desktop inspection was not
  performed.

## Fixed during smoke test

- Fixed `src/shared/api/http-client.ts` URL normalization so `/api/v1/...` paths are resolved under
  `NEXT_PUBLIC_API_BASE_URL` instead of dropping the base path.
- Updated `.env.local` to `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1`.
- Fixed guest cart token cleanup after successful merge.
- Fixed guest cart token cleanup after successful guest checkout.
- Added explicit Stripe Elements required messaging when backend returns `client_secret`.

## Remaining frontend issues

- Browser console/hydration/responsive checks still need manual browser verification.
- Header logo still produces a Next lint warning for `<img>` instead of `next/image`; lint passes
  with warning.

## Backend/API issues or blockers

- `POST /api/v1/payments/stripe/create-intent/` returned `500` with empty body for
  `ORD-A9A3F9C4`.
- `POST /api/v1/catalog/reviews/` returned `400` with empty body for the smoke order. This is likely
  valid eligibility rejection, but the empty body prevents a specific user-facing message.
- Seed category data contains mojibake/profane text in one category name returned by
  `/catalog/categories/tree/`; frontend renders backend data as-is.

## Final status

PARTIAL PASS

Core storefront integration is working for public catalog, product detail reads, guest cart, auth,
cart merge, address CRUD, checkout, Kaspi payment creation, orders, wishlist, notifications list,
and static pages.

The smoke is not a full browser QA pass. Stripe payment creation and review creation remain blocked
by backend/data responses observed during the run.
