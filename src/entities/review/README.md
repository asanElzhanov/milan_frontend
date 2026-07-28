# Review Entity

## Purpose

Normalizes backend review payloads and owns review API calls, React Query hooks, selectors, and
presentation-only review cards/statuses.

## Endpoint discovery

See `docs/review-endpoint-discovery.md`.

## Endpoints

- Public product reviews: `GET /api/v1/catalog/products/{slug}/reviews/`
- Create a review: `POST /api/v1/catalog/reviews/` (JSON or multipart with repeated `media` fields)
- Current user's reviews: `GET /api/v1/catalog/reviews/mine/`

## Normalized model

`ProductReview` supports product/order context, localized product names, author, rating, text,
moderation status/comment, image/video media, verified purchase state, and timestamps. Adapters
accept arrays, DRF pagination, and common `data`/`review(s)` wrappers.

## API methods and React Query hooks

- `reviewApi.getProductReviews` / `useProductReviewsQuery`
- `reviewApi.createProductReview` / `useCreateProductReviewMutation`
- `reviewApi.getMyReviews` / `useMyReviewsQuery`

## UI components

`ReviewCard`, `ReviewMediaList`, `ReviewRating`, and `ReviewStatusBadge` make no API calls.

## What is intentionally not included

Fake reviews, localStorage persistence, optimistic moderation, eligibility inference, edit/delete,
and admin or manager moderation UI.
