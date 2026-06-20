# Order Endpoint Discovery

## Sources Checked

- `src/shared/api/generated/schema.ts`
- `backend-README.md`
- `docs/frontend-api-map-update.md`
- `docs/api-page-mapping.md`
- `docs/frontend-architecture.md`
- `README.md`
- Repository mentions for `orders`, `order history`, `order detail`, `order_number`, `status`,
  and `payment_status`

## Confirmed Order Endpoints

- `GET /api/v1/orders/history/`
  - Found in `backend-README.md`
  - Found in `docs/frontend-api-map-update.md`
  - Found in `docs/api-page-mapping.md`
  - Used for account order list.
- `GET /api/v1/orders/{order_number}/`
  - Found in `backend-README.md` as `GET <number>/`
  - Found in `docs/frontend-api-map-update.md`
  - Found in `docs/api-page-mapping.md` as `/api/v1/orders/<number>/`
  - Used for account order detail with the route `orderNumber` param.

## Related Endpoints

- `POST /api/v1/orders/checkout/`
  - Used by checkout, not by order history.
- `GET /api/v1/orders/cart/` and cart mutation endpoints
  - Used by cart, not by order history.

## Endpoints Not Found

- `GET /api/v1/orders/`
- `GET /api/v1/orders/{id}/` as a separate id-based detail contract
- `GET /api/v1/orders/my/`
- Order cancellation endpoint
- Refund endpoint
- Reorder endpoint

## OpenAPI Status

`src/shared/api/generated/schema.ts` is still a temporary fallback with empty `paths` and
`components`. It does not confirm exact order serializers, so adapters remain defensive and support
common DRF wrappers.

## Assumptions Not Made

- No unconfirmed endpoint names were invented.
- No fake orders or localStorage order history were added.
- No cancellation, refund, reorder, review-from-order, admin, or manager flows were added.
- Payment continuation links reuse backend `payment_url` / `paymentUrl` only when safe, otherwise
  they link to the existing payment page for the order number.
