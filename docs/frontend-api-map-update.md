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

Auth:

- `/api/v1/auth/register/`
- `/api/v1/auth/login/`
- `/api/v1/auth/logout/`
- `/api/v1/auth/refresh/`
- `/api/v1/auth/me/`

## 3. Important Implementation Changes

- Header categories should use `/catalog/categories/tree/?active=true`.
- Header cart count should use `/orders/cart/`.
- Guest cart must use `X-Cart-Token`.
- Cart token manager is implemented in `src/shared/api/cart-token-manager.ts`.
- `X-Cart-Token` is a shared API concern handled by `http-client.ts`.
- Cart API methods must explicitly sync tokens from cart responses instead of relying on global
  response auto-sync.
- Cart API layer is implemented in `src/entities/cart`.
- A pure cart merge helper is prepared for future Auth integration.
- Cart page is implemented at `/:locale/cart`.
- Promo code in cart is implemented through cart promo-code endpoints.
- `/api/v1/catalog/promo/check/` is not used in the MVP cart flow.
- Auth UI pages are implemented at `/:locale/login`, `/:locale/register`, `/:locale/otp`, and
  `/:locale/forgot-password`.
- Backend auth requests, token/session management, protected routes, account API, and cart merge
  after login are still pending.
- Checkout is still pending.
- Cart page uses backend cart data only; no localStorage cart items are stored.
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
8. Auth UI pages.
9. Auth API integration with cart merge.
10. Checkout/delivery/orders/payments.
