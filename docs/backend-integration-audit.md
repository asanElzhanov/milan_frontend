# Backend Integration Audit

Source of truth: `D:\milan_backend\docs\FRONTEND_INTEGRATION.md`.

## Found Frontend Endpoints

- Auth: register, login, logout, token refresh, me GET/PATCH, change-password, OTP request/verify.
- Catalog: categories, category tree/detail, brands, colors, sizes, products, product detail, similar, product reviews, banners.
- Cart: get cart, add/create item, update item, delete item, clear, merge, promo apply/remove.
- Checkout/orders: delivery methods, checkout, order history, order detail.
- Payments: Kaspi create, Stripe create intent.
- Account: addresses, wishlist, notifications.
- Reviews: product review list, product review create.

## Matched And Fixed

- `NEXT_PUBLIC_API_BASE_URL` now defaults to `http://localhost:8000/api/v1`.
- The shared API client avoids double `/api/v1` when existing modules pass prefixed paths.
- API requests send `Accept: application/json`, JSON `Content-Type` when appropriate, `Authorization`, and `X-Cart-Token`.
- JWT refresh now uses `/auth/token/refresh/`, stores rotated access/refresh tokens, retries once, and clears tokens on failure.
- Auth storage now uses `access_token` and `refresh_token` with legacy `sara_milan_*` read fallback.
- Register sends `password2`; login sends `email` and `password`.
- Cart merge sends `guest_cart_token`.
- Product detail add-to-cart sends `variant_id` and `quantity`.
- Checkout payload is flattened for backend fields and converts saved/manual addresses to string `delivery_address`.
- Payment start calls real Kaspi/Stripe endpoints with backend payload shape.
- Review create uses `/catalog/reviews/`; product review read still uses `/catalog/products/{slug}/reviews/`.
- Notifications support list filters, mark-read, mark-all-read, and read-all compatibility.
- Media URL normalization now prefixes relative media with backend origin, not `/api/v1`.

## Payloads And Adapters Fixed

- Address payload maps `postalCode` to `postal_code` and `isDefault` to `is_default`, and omits unsupported frontend-only fields.
- Cart adapter supports `cart_token`, `items_count`, `total_quantity`, promo/discount totals, `variant_id`, `product_id`, `line_total`, stock fields, and image normalization.
- Delivery method adapter supports `delivery_type`, `base_price`, `price_type`, `free_from_amount`, and manager-calculation flags.
- Order adapter supports `order_number`, backend statuses, payment status, totals, delivery flags, text delivery address, items, and status history.
- Review adapter supports nested product/order, `user_name`, `status`, `images`, `is_verified_purchase`, timestamps.
- Notification adapter maps `event_type` to frontend notification type.

## Conscious Non-Usage

- Manager/admin stock and import endpoints are out of scope for the storefront.
- CMS pages remain optional/future; current static pages are local content.
- Account current-user reviews endpoint is not documented, so no fake endpoint was added.
- Forgot-password endpoint is not documented, so the page remains production-safe pending.
- Payment status endpoint is not documented, so status polling remains disabled.
- Stripe Elements UI is pending; the frontend obtains `client_secret` without faking payment success.
