# Checkout Page

## Purpose

Production checkout UI for creating an order from the current backend cart.

## Route

- `/:locale/checkout`

## API Hooks Used

- `useCartQuery`
- `useCurrentUserQuery`
- `useAddressesQuery`
- `useDeliveryMethodsQuery`
- `useCheckoutMutation`

## Guest vs Authenticated Checkout

Guests can checkout with a manual delivery address. Guest cart tracking continues through
`X-Cart-Token` from the shared API client.

Authenticated users can reuse profile data and saved addresses. Auth requests use the existing
`Authorization` header behavior from the shared API client.

## Saved Address Mode

When saved address mode is selected, checkout sends `address_id` and does not send
`delivery_address`.

## Manual Address Mode

Manual address mode sends `delivery_address` prepared by the checkout mapper. It does not create or
save a new address from the checkout page.

## Delivery Methods

Delivery methods come from `/api/v1/orders/delivery-methods/`. The page does not create fake
methods or calculate delivery prices locally.

## Payment Placeholder

Payment method cards are visual placeholders. The selected value is passed with checkout payload,
but no payment API, SDK, or provider integration is called here.

## Submit Flow

The form validates locally, maps values with `checkoutFormValuesToPayload()`, and submits through
`useCheckoutMutation()`.

## Redirect Behavior

After successful checkout the page redirects to `paymentUrl`, `redirectUrl`, `/:locale/payment/:id`,
or `/:locale/payment/pending`.

## What Is Intentionally Not Included

- Payment API
- Stripe or Kaspi SDK
- Order history
- Account orders
- Fake checkout success
- Mock order data
