# Delivery Method Entity

## Purpose

`src/entities/delivery-method` normalizes delivery methods returned by the orders API. It does not
invent prices or local delivery methods; backend data is the source of truth.

## Endpoint

- `GET /api/v1/orders/delivery-methods/`

## Normalized Model

`DeliveryMethod` keeps stable frontend fields such as `id`, `code`, `name`, `price`, `priceType`,
`isFree`, `isActive`, `requiresManagerCalculation`, and `sortOrder`.

## API Hooks

- `deliveryMethodApi.getDeliveryMethods()`
- `useDeliveryMethodsQuery()`

The query uses a five minute stale time and retries once.
