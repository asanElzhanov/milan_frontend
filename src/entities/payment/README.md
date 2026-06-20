# Payment Entity

## Purpose

`src/entities/payment` contains payment types, adapters, selectors, query keys, API methods, and
React Query hooks. It keeps payment provider integration behind backend contracts only.

## Endpoint Discovery

Discovery is documented in `docs/payment-endpoint-discovery.md`.

## Supported Endpoints

- `POST /api/v1/payments/kaspi/create/`
- `POST /api/v1/payments/stripe/create-intent/`

Payment status endpoints are not confirmed in the current schema or docs.

## API Methods

- `paymentApi.startPayment(payload)`
  - Uses the confirmed provider create endpoint for `kaspi` or `stripe`.
  - Throws a readable error in mock mode.
  - Throws `Payment start endpoint is not configured` for unsupported providers.
- `paymentApi.getPaymentStatus(orderNumber)`
  - Returns `null` until a status endpoint is confirmed.

## Status Handling

Status helpers normalize known values:

- `paid`, `success`, `completed` are paid.
- `failed`, `error`, `cancelled`, `expired` are failed.
- `pending`, `created`, `processing`, `requires_action` are pending.

Adapters parse unknown payloads safely and support common wrappers such as `payment`, `session`,
`data`, `data.payment`, and `data.session`.

## What Is Intentionally Not Included

- Fake payment success.
- Fake status polling.
- Stripe SDK.
- Kaspi SDK.
- localStorage payment source of truth.
- Refund, cancel, admin, or order history flows.
