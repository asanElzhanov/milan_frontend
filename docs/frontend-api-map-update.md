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

Wishlist:

- `/api/v1/auth/wishlist/`
- `/api/v1/auth/wishlist/toggle/{product_id}/`

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
- Auth API layer is implemented for login, register, logout, refresh, and current user.
- Login/register UI is connected to backend auth mutations.
- Current user query uses `/api/v1/auth/me/` as source of truth.
- Access token is injected into API requests through `Authorization: Bearer <token>`.
- Guest cart merge is attempted after successful login/register when a guest cart token exists.
- OTP and forgot-password backend integration are still pending.
- Account shell is implemented and uses the current user query.
- Account settings is read-only until a profile update endpoint is confirmed.
- Address API layer and account addresses page are implemented.
- Account addresses supports list, create, edit, delete, and default address selection through
  `/api/v1/auth/addresses/`.
- Wishlist API layer and account wishlist page are implemented.
- Product detail wishlist toggle is implemented client-side through authenticated wishlist
  mutation.
- Catalog/Home wishlist toggle remains future work unless wrapped client-side.
- Delivery method API layer is implemented in `src/entities/delivery-method`.
- Checkout API foundation is implemented in `src/features/checkout`.
- Checkout supports saved address payloads through `address_id` and manual address payloads through
  `delivery_address`.
- Checkout order creation uses `/api/v1/orders/checkout/`.
- Checkout page is implemented at `/:locale/checkout`.
- Guest checkout is supported through the shared cart token header.
- Authenticated checkout supports saved addresses from `/api/v1/auth/addresses/`.
- Payment API/UI integration is implemented for confirmed provider create endpoints.
- Payment routes are implemented at `/:locale/payment/:orderNumber`, `/:locale/payment/success`,
  `/:locale/payment/fail`, and `/:locale/payment/pending`.
- Payment status endpoint remains pending backend contract; no fake status polling is implemented.
- Stripe and Kaspi SDKs are not used because the frontend expects backend-provided redirect URLs.
- Order endpoint discovery is documented in `docs/order-endpoint-discovery.md`.
- Order history/detail pages are implemented at `/:locale/account/orders` and
  `/:locale/account/orders/:orderNumber`.
- Order history uses `GET /api/v1/orders/history/`; order detail uses
  `GET /api/v1/orders/{order_number}/`.
- Order continue-payment CTAs link to a safe backend payment URL or
  `/:locale/payment/:orderNumber`.
- Order cancellation, refund, reorder, admin, and manager flows are intentionally not implemented.
- Product reviews list/create are implemented through the confirmed nested product endpoint.
- Account reviews UI is implemented, but its API integration remains pending because no
  current-user reviews endpoint contract is confirmed.
- Review moderation statuses are normalized and rendered; eligibility remains backend-controlled.
- Account profile API is still pending.
- Payment status API integration is still pending.
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
10. Account shell and profile pages.
11. Address book API and UI.
12. Checkout API foundation.
13. Checkout/delivery/orders/payments.
