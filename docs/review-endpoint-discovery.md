# Review Endpoint Discovery

## Sources checked

- `src/shared/api/generated/schema.ts`: no review paths or review schemas were found.
- `backend-README.md`: confirms `GET/POST /api/v1/catalog/products/<slug>/reviews/`.
- `docs/api-page-mapping.md`: independently maps the same product list/create endpoint.
- `docs/frontend-api-map-update.md`: lists both the product endpoint and
  `/api/v1/catalog/reviews/`, but does not define an HTTP method or current-user semantics for the
  latter. The same document calls it a creation endpoint, which conflicts with using it as “my
  reviews”.

## Confirmed and used

- Product list: `GET /api/v1/catalog/products/{slug}/reviews/` (public read).
- Product create: `POST /api/v1/catalog/products/{slug}/reviews/` (authenticated).

## Not confirmed

- No current-user/account reviews endpoint was confirmed.
- No review detail, edit, or delete endpoint was confirmed.
- No eligibility endpoint was found.

`/api/v1/catalog/reviews/` is not used until its method, permissions, response shape, and
current-user filtering semantics are documented. In real API mode the account hook returns a
readable contract-pending error; in mock mode it returns an empty list. No fake reviews are used.

Eligibility is backend-controlled; frontend does not fake purchase verification. If a signed-in
user is not eligible, the create endpoint response is shown by the form.

## Assumptions intentionally not made

- The frontend does not assume that `/catalog/reviews/` means “my reviews”.
- It does not infer approval from missing status fields.
- It does not optimistically publish created reviews.
- It does not implement customer edit/delete or moderation actions.
