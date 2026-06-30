# Notification Endpoint Discovery

## Sources Checked

- `src/shared/api/generated/schema.ts`
- `docs/frontend-api-map-update.md`
- `docs/frontend-architecture.md`
- `README.md`
- `backend-README.md`

## Found Endpoints

- `GET /api/v1/notifications/`
- `POST /api/v1/notifications/read-all/`

These endpoints are listed in `docs/frontend-api-map-update.md` as customer-facing notification
endpoints.

## Not Found

No confirmed individual mark-as-read endpoint was found for:

- `POST /api/v1/notifications/{id}/read/`
- `PATCH /api/v1/notifications/{id}/`
- `POST /api/v1/notifications/read/{id}/`

`src/shared/api/generated/schema.ts` does not currently expose notification paths. `backend-README.md`
mentions notifications as backend email/Celery tasks, not a frontend notification-center contract.

## Frontend Decision

The frontend implements only:

- list notifications
- mark all notifications as read

Individual mark-as-read is pending backend contract and intentionally not implemented.

## Assumptions Not Made

- No fake notification data is generated.
- No localStorage notification state is used.
- No WebSocket, SSE, push notification, email preference, or notification preference behavior is
  assumed.
- No individual read endpoint is guessed from common REST naming patterns.
