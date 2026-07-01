# Backend Integration Smoke Test

## Guest Purchase

1. Open product detail.
2. Select color/size variant.
3. Add to cart and confirm request sends `variant_id`.
4. Confirm `cart_token` is saved from the cart response.
5. Open cart and confirm `X-Cart-Token` is sent.
6. Apply promo code.
7. Open checkout.
8. Fill guest customer fields.
9. Select delivery method.
10. Submit checkout with `cart_token`.
11. Confirm `order_number` is returned.
12. Start Kaspi payment and confirm redirect uses backend `redirect_url`.

## Auth Purchase

1. Register or login.
2. If guest cart exists, confirm merge sends `guest_cart_token`.
3. Add item to cart.
4. Open checkout.
5. Use profile/address if available.
6. Submit checkout.
7. Open order history.
8. Open order detail.
9. Continue payment for `unpaid` or `waiting` order.

## Account

1. Load profile with `GET /auth/me/`.
2. Update profile with `PATCH /auth/me/`.
3. Run address create/update/delete/default flows.
4. Toggle wishlist for a product.
5. Load notifications.
6. Mark one notification read.
7. Mark all notifications read.

## Reviews

1. Open product reviews.
2. Submit review with `product_slug` and rating/text.
3. Confirm pending status or readable backend validation error for missing/invalid order.
