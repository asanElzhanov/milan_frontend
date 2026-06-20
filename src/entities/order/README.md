# Order Entity

## Purpose

`src/entities/order` normalizes checkout results and authenticated order history/detail data.

## Endpoint Discovery

Discovery is documented in `docs/order-endpoint-discovery.md`.

## Endpoints

- `GET /api/v1/orders/history/`
- `GET /api/v1/orders/{order_number}/`

## Normalized Model

The entity exposes `Order`, `OrderItem`, delivery/address snapshots, `OrderListResponse`, and the
existing checkout-specific `CheckoutOrder` / `CheckoutResult` types.

## API Methods

- `orderApi.getOrders(params)`
- `orderApi.getOrder(orderNumber)`

Mock mode returns an empty list or `null`. Real mode calls confirmed endpoints only.

## React Query Hooks

- `useOrdersQuery(params, options)`
- `useOrderQuery(orderNumber, options)`

## UI Components

- `OrderStatusBadge`
- `PaymentStatusBadge`
- `OrderTimeline`

## What Is Intentionally Not Included

- Fake orders.
- localStorage order history.
- Order cancellation, refund, reorder, admin, or manager flows.
- Review creation from orders.
