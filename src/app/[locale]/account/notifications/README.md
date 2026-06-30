# Account Notifications Page

## Route

`/:locale/account/notifications`

Supported locales are `ru` and `kk`.

## Auth Behavior

The page renders inside `AccountShell`, so it uses the existing current-user check and auth-required
state.

## API Hooks

The client page uses `useNotificationsQuery({ page }, { enabled: true })` after `AccountShell`
confirms the user is available.

## Read-All Behavior

The read-all button appears only when `unreadCount > 0`. It calls
`useMarkAllNotificationsReadMutation()`, updates returned list data when available, and invalidates
notification list queries.

If the backend returns `204` or an empty response, the mutation returns `null` and relies on query
invalidation.

## Empty/Loading/Error States

The page renders skeletons while loading, `ErrorState` with retry on failures, and `EmptyState` when
the backend returns no notifications.

## What Is Intentionally Not Included

- fake notifications
- localStorage notification state
- individual notification read action
- WebSocket/SSE or push notifications
- notification preferences
