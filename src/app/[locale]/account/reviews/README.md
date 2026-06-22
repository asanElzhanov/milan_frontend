# Account Reviews Page

## Route and auth behavior

Available at `/:locale/account/reviews` inside `AccountShell`; the shell owns auth-required UI.

## API hooks and states

`ReviewsPageClient` uses `useMyReviewsQuery` and renders loading skeletons, retryable errors, an
empty state, or status-aware review cards. Because a current-user endpoint is not confirmed, real
mode currently shows a readable contract-pending error rather than calling an invented endpoint.

## What is intentionally not included

Fake data, localStorage reviews, edit/delete, and moderation controls.
