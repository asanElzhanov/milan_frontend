# Backend Integration Notes

## API URL

The frontend reads the public backend URL from `NEXT_PUBLIC_API_BASE_URL`, including `/api/v1`.

## CORS

Backend CORS should allow the deployed frontend origin from `NEXT_PUBLIC_SITE_URL`.

## Auth

The current frontend sends access tokens as:

```text
Authorization: Bearer <access>
```

Tokens are stored with SSR-safe browser storage helpers. If the backend migrates to httpOnly cookies,
the frontend API client will need credentials/session contract changes.

## Cart Token

Guest cart requests can include:

```text
X-Cart-Token: <token>
```

The frontend syncs this token from cart responses when available.

## Media

Relative media paths are resolved against the API base URL. If remote image optimization is enabled,
the backend/media/CDN host must be added to `next.config.ts` image remote patterns.

## Payments

External payment redirects must be HTTPS. The frontend rejects empty, protocol-relative,
`javascript:`, and unsafe payment URLs.

## Pending Contracts

- OTP and forgot-password endpoints
- Account current-user reviews endpoint
- Payment status endpoint
- Newsletter/contact form endpoints
