# Account Reviews Page

## Route and auth behavior

Available at `/:locale/account/reviews` inside `AccountShell`; the shell owns auth-required UI.

## API hooks and states

`ReviewsPageClient` uses `useMyReviewsQuery` and renders loading skeletons, retryable errors, an
empty state, pagination, or status-aware review cards from `GET /api/v1/catalog/reviews/mine/`.
Rejected reviews show the backend moderation comment when present. Product links are shown only
for published reviews.

## What is intentionally not included

Fake data, localStorage reviews, edit/delete, and moderation controls.
