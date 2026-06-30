# Notification Entity

## Purpose

Normalizes backend notification data and exposes the API, React Query hooks, selectors, and
presentation components used by the account notifications page and header badge.

## Endpoint Discovery

Discovery is documented in `docs/notification-endpoint-discovery.md`.

## Endpoints

- `GET /api/v1/notifications/`
- `POST /api/v1/notifications/read-all/`

Individual mark-as-read is not implemented because no endpoint is confirmed.

## Normalized Model

`Notification` exposes `id`, `type`, `title`, `message`, `isRead`, `link`, `createdAt`, and
`updatedAt`. `NotificationListResponse` exposes normalized pagination and unread count.

## API Methods

- `notificationApi.getNotifications(params)`
- `notificationApi.markAllAsRead()`

Mock mode returns an empty list for reads and rejects mutations with a readable API error.

## React Query Hooks

- `useNotificationsQuery(params, options)`
- `useMarkAllNotificationsReadMutation()`

Queries are enabled when an auth token exists, or when the caller explicitly passes
`{ enabled: true }`.

## UI Components

- `NotificationCard`
- `NotificationTypeBadge`

Links are rendered only when they are safe relative URLs or safe `https` external URLs.

## What Is Intentionally Not Included

- fake notifications
- localStorage notification state
- individual mark-as-read
- realtime WebSocket/SSE
- push notifications
- email notification settings
- notification preferences
