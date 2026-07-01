# Frontend API Coverage

| Feature | Endpoint(s) | Status | Notes |
| --- | --- | --- | --- |
| Auth register/login/token refresh/logout/me | `/auth/register/`, `/auth/login/`, `/auth/token/refresh/`, `/auth/logout/`, `/auth/me/` | implemented | Tokens are saved from `tokens.access` / `tokens.refresh`; refresh retries once on 401. |
| Profile PATCH | `PATCH /auth/me/` | implemented | Account settings sends `first_name`, `last_name`, `phone`. |
| Change password | `/auth/change-password/` | API method added | No large new UI added. |
| OTP request/verify | `/auth/otp/request/`, `/auth/otp/verify/` | API methods added | Authenticated verification contract is available. |
| Catalog | catalog categories, brands, colors, sizes, products, banners | implemented | Product list reads paginated `results`. |
| Product detail | `/catalog/products/{slug}/`, `/similar/`, `/reviews/` | implemented | Variant-based add-to-cart is connected. |
| Cart | `/orders/cart/`, `/orders/cart/items/`, item update/delete, clear | implemented | Guest cart token is stored and sent as `X-Cart-Token`; guest get without token returns empty cart locally. |
| Promo apply/remove | `/orders/cart/promo-code/apply/`, `/orders/cart/promo-code/` | implemented | Standalone catalog promo check is not used for cart. |
| Cart merge | `/orders/cart/merge/` | implemented | Sends `guest_cart_token`. |
| Addresses | `/auth/addresses/`, `/auth/addresses/{id}/` | implemented | Payload matches backend guide fields. |
| Wishlist | `/auth/wishlist/`, `/auth/wishlist/toggle/{product_id}/` | implemented | Toggle maps `status=added|removed`; no localStorage wishlist. |
| Delivery methods | `/orders/delivery-methods/` | implemented | Adapter supports `base_price`, `delivery_type`, `price_type`. |
| Checkout | `/orders/checkout/` | implemented | Payload is flattened; frontend totals are not sent. |
| Orders | `/orders/history/`, `/orders/{order_number}/` | implemented | Backend statuses/payment statuses are accepted. |
| Kaspi payment | `/payments/kaspi/create/` | implemented | Uses backend `redirect_url`. |
| Stripe intent | `/payments/stripe/create-intent/` | implemented | Stores `client_secret`; Stripe Elements UI remains pending. |
| Product reviews read/create | `/catalog/products/{slug}/reviews/`, `/catalog/reviews/` | implemented | Backend validates purchase/order eligibility. |
| Notifications | `/notifications/`, `/notifications/{id}/mark-read/`, `/notifications/mark-all-read/`, `/notifications/read-all/` | implemented | Supports `is_read`, `event_type`, and `page` filters. |
| CMS pages | `/cms/pages/`, `/cms/pages/{slug}/` | optional/future | Static pages remain local fallback. |
| Manager/Admin | stock/import/admin endpoints | out of scope | Not connected to storefront UI. |
| Account reviews | not documented | pending-backend-contract | No fake endpoint added. |
| Forgot password | not documented | pending-backend-contract | UI remains safe pending. |
| Payment status | not documented | pending-backend-contract | No fake polling/status endpoint. |
