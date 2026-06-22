# Review Entity

## Purpose

Normalizes backend review payloads and owns review API calls, React Query hooks, selectors, and
presentation-only review cards/statuses.

## Endpoint discovery

See `docs/review-endpoint-discovery.md`.

## Endpoints

Product list/create use the confirmed `/api/v1/catalog/products/{slug}/reviews/` endpoint. The
account endpoint is deliberately unconfigured until its contract is confirmed.

## Normalized model

`ProductReview` supports product/order context, author, rating, text sections, moderation status,
and timestamps. Adapters accept arrays, DRF pagination, and common `data`/`review(s)` wrappers.

## API methods and React Query hooks

- `reviewApi.getProductReviews` / `useProductReviewsQuery`
- `reviewApi.createProductReview` / `useCreateProductReviewMutation`
- `reviewApi.getMyReviews` / `useMyReviewsQuery` (graceful pending contract in real mode)

## UI components

`ReviewCard`, `ReviewRating`, and `ReviewStatusBadge` make no API calls.

## What is intentionally not included

Fake reviews, localStorage persistence, optimistic moderation, eligibility inference, edit/delete,
and admin or manager moderation UI.
