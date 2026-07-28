# Review Endpoint Contract

## Source

The current contract is documented in backend `docs/REVIEWS_FRONTEND_GUIDE.md`.

## Confirmed and used

- Public product reviews: `GET /api/v1/catalog/products/{slug}/reviews/?page=`
- Create review: `POST /api/v1/catalog/reviews/` with JSON or multipart form data
- Current user's reviews: `GET /api/v1/catalog/reviews/mine/?page=`

Review media uses repeated multipart fields named `media`. The frontend accepts at most five files,
validates the documented image/video formats and size limits, and still displays backend validation
errors because backend is the source of truth.

New reviews remain out of the public list until backend status becomes `published`. Personal
reviews expose all moderation statuses, media, verified purchase state, and an optional moderation
comment.

## Not provided by the backend

- Customer review editing
- Customer review deletion
- Frontend moderation actions

The frontend does not optimistically publish reviews or infer moderation results.
