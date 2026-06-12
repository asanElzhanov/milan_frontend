# Frontend API Map Update

## 1. Reason For Update

Backend contract changed and added new customer-facing endpoints. The frontend foundation now keeps
space for those modules without implementing business API calls in this patch.

## 2. New Customer-Facing Endpoints

Catalog:

- `/api/v1/catalog/categories/`
- `/api/v1/catalog/categories/{slug}/`
- `/api/v1/catalog/categories/tree/`
- `/api/v1/catalog/brands/`
- `/api/v1/catalog/brands/{slug}/`
- `/api/v1/catalog/colors/`
- `/api/v1/catalog/sizes/`
- `/api/v1/catalog/products/`
- `/api/v1/catalog/products/{slug}/`
- `/api/v1/catalog/products/{slug}/similar/`
- `/api/v1/catalog/banners/`

Cart:

- `/api/v1/orders/cart/`
- `/api/v1/orders/cart/add/`
- `/api/v1/orders/cart/items/`
- `/api/v1/orders/cart/items/{id}/`
- `/api/v1/orders/cart/items/{id}/delete/`
- `/api/v1/orders/cart/clear/`
- `/api/v1/orders/cart/merge/`
- `/api/v1/orders/cart/promo-code/apply/`
- `/api/v1/orders/cart/promo-code/`

Checkout:

- `/api/v1/orders/delivery-methods/`
- `/api/v1/orders/checkout/`

Orders:

- `/api/v1/orders/history/`
- `/api/v1/orders/{order_number}/`

Payments:

- `/api/v1/payments/kaspi/create/`
- `/api/v1/payments/stripe/create-intent/`

Reviews:

- `/api/v1/catalog/products/{slug}/reviews/`
- `/api/v1/catalog/reviews/`

Notifications:

- `/api/v1/notifications/`
- `/api/v1/notifications/read-all/`

Optional manager:

- `/api/v1/catalog/stock/`
- `/api/v1/catalog/stock/adjust/`
- `/api/v1/catalog/stock/movements/`

## 3. Important Implementation Changes

- Header categories should use `/catalog/categories/tree/?active=true`.
- Header cart count should use `/orders/cart/`.
- Guest cart must use `X-Cart-Token`.
- Promo code should use cart promo-code endpoints.
- Checkout should use `/orders/checkout/`, not root `/orders/`.
- Product creation review endpoint is `/catalog/reviews/`.
- Notifications are no longer placeholder-only.
- Manager stock is optional if Django Admin is enough.

## 4. Updated Prompt Order

1. Patch foundation for backend update.
2. Layout/Header/Footer.
3. Catalog API layer.
4. ProductCard/ProductGrid.
5. Home page.
6. Catalog page.
7. Product detail page.
8. Cart token manager/cart API/cart page.
9. Promo code.
10. Auth/API integration with cart merge.
11. Checkout/delivery/orders/payments.
