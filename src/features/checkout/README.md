# Checkout Feature

## Purpose

`src/features/checkout` prepares checkout payloads and submits the current backend cart as an order.
It contains no checkout form UI, payment UI, redirects, or fake order data.

## Endpoint

- `POST /api/v1/orders/checkout/`

## Payload

`CheckoutPayload` uses backend snake_case fields:

- `customer`
- `address_id`
- `delivery_address`
- `delivery_method_id`
- `delivery_method_code`
- `payment_method`
- `comment`

## Saved vs Manual Address

`checkoutFormValuesToPayload()` maps saved address mode to `address_id` and omits
`delivery_address`.

Manual address mode maps the form address through `createAddressPayload()` and sends
`delivery_address` while omitting `address_id`.

## Delivery Method

Delivery method IDs come from `src/entities/delivery-method` and are passed to checkout as
`delivery_method_id`.

## Order Result

Checkout responses are normalized through `adaptCheckoutResult()` from `src/entities/order`.

## What Is Intentionally Not Included

- Checkout page UI
- Payment UI
- Payment API
- Order history
- Account orders page
- Fake order data
- Mock checkout success

## Future Checkout Page

The future page can reuse:

- `useDeliveryMethodsQuery()`
- `createInitialCheckoutFormValues()`
- `validateCheckoutForm()`
- `checkoutFormValuesToPayload()`
- `useCheckoutMutation()`
