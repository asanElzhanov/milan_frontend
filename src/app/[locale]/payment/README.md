# Payment Pages

## Routes

- `/:locale/payment/:orderNumber`
- `/:locale/payment/success`
- `/:locale/payment/fail`
- `/:locale/payment/pending`

Locales are validated through the shared locale config.

## Payment Start

The order payment page can start payment with confirmed provider endpoints:

- Kaspi: `POST /api/v1/payments/kaspi/create/`
- Stripe/card: `POST /api/v1/payments/stripe/create-intent/`

If backend returns `paymentUrl`, `redirectUrl`, or `qrUrl`, the page redirects only when the URL is
safe.

## Payment Status

Payment status API is not called because no status endpoint is confirmed. Polling is disabled until
the backend contract exists.

## Redirect Handling

External payment URLs must be `https://`. Relative URLs must start with `/` and must not start with
`//`. Empty, `javascript:`, and protocol-relative URLs are rejected.

## Fallback When Backend Payment Endpoints Are Missing

The page shows an honest pending/backend-contract message and keeps navigation back to catalog,
cart, and account orders. It does not mark payment as successful without backend truth.

## What Is Intentionally Not Included

- Fake payment result.
- Fake payment status polling.
- Stripe or Kaspi SDK.
- Order history implementation.
- Refund, cancel, or admin payment flows.
