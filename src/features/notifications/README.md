# Notifications Feature

## Header Badge

`NotificationHeaderBadge` is a small client-only badge rendered on the existing account icon in the
header. It uses `useNotificationsQuery(undefined, { enabled: hasAuthTokens() })` and shows nothing
on loading, errors, unauthenticated sessions, or zero unread notifications.

No new major header icon is introduced.

## Deferred Realtime Updates

Realtime notifications are deferred. The frontend does not use polling, WebSocket, SSE, or push
notifications.

## What Is Intentionally Not Included

- fake notifications
- localStorage notification state
- individual mark-as-read
- email notification settings
- notification preferences
