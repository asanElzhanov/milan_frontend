# Account Orders

## Routes

- `/:locale/account/orders`
- `/:locale/account/orders/:orderNumber`

## Auth Behavior

Both pages render inside `AccountShell`, so the existing account auth-required behavior remains the
gate for unauthenticated users.

## API Hooks

- List page uses `useOrdersQuery()`.
- Detail page uses `useOrderQuery(orderNumber)`.

## Order List

The list shows order number, date, order status, payment status, item count, total, detail link, and
a continue-payment CTA when payment is pending.

## Order Detail

The detail page shows status badges, timeline, items, totals, delivery/customer details, payment
details, and continue-payment actions when available.

## Continue Payment

If an order has a safe `paymentUrl`, the CTA uses it. Otherwise it links to
`/:locale/payment/:orderNumber`, where payment start/redirect handling lives.

## Fallback Behavior

Mock mode returns an empty order list and `null` detail. Real API errors render production-looking
error states with retry.

## What Is Intentionally Not Included

- Fake orders or mockData.
- localStorage orders.
- Cancellation, refund, reorder, admin, or manager order flows.
- Payment SDK integration.
