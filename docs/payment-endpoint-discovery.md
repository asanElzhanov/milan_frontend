# Payment Endpoint Discovery

## Sources Checked

- `src/shared/api/generated/schema.ts`
- `backend-README.md`
- `docs/frontend-api-map-update.md`
- `docs/catalog-api-layer.md`
- `docs/frontend-architecture.md`
- `README.md`
- Repository mentions for `payments`, `payment`, `kaspi`, `stripe`, `checkout`,
  `order payment`, and `payment status`

## Confirmed Payment Endpoints

- `POST /api/v1/payments/kaspi/create/`
  - Found in `backend-README.md`
  - Found in `docs/frontend-api-map-update.md`
  - Found in `docs/api-page-mapping.md`
- `POST /api/v1/payments/stripe/create-intent/`
  - Found in `backend-README.md`
  - Found in `docs/frontend-api-map-update.md`
  - Found in `docs/api-page-mapping.md`

## Backend-Only Endpoints

- `POST /api/v1/payments/kaspi/webhook/`
  - Found in `backend-README.md`
  - Webhook/callback endpoint, not called by frontend.
- `POST /api/v1/payments/stripe/webhook/`
  - Found in `backend-README.md`
  - Webhook endpoint, not called by frontend.

## Endpoints Not Found

- `GET /api/v1/payments/{order_number}/status/`
- `GET /api/v1/orders/{order_number}/payment-status/`
- `POST /api/v1/payments/start/`
- `POST /api/v1/payments/create/`
- `POST /api/v1/payments/{order_number}/start/`
- `POST /api/v1/orders/{order_number}/payment/`

## OpenAPI Status

`src/shared/api/generated/schema.ts` is a temporary fallback with empty `paths` and
`components`. It does not confirm payment payloads, payment status responses, or provider return
URL fields.

## Implementation Decision

Payment API integration is limited to:

- checkout redirect handling through `paymentUrl` / `redirectUrl` returned by checkout;
- provider-specific start/create calls for the confirmed Kaspi and Stripe endpoints;
- safe redirect handling for backend-provided payment URLs.

Payment status API integration remains pending backend contract. The frontend does not fake payment
success, does not fake status polling, and does not use localStorage as a payment source of truth.

## Assumptions Not Made

- No unconfirmed status endpoint path was invented.
- No Stripe SDK or Kaspi SDK was added.
- No fake payment session, fake payment success, or fake polling result was added.
- Webhook endpoints were not used from the browser.
