# Auth Feature

## Purpose

`src/features/auth` contains the storefront auth API layer and visual auth forms for login,
registration, and password recovery.

## Endpoints

- `POST /api/v1/auth/register/`
- `POST /api/v1/auth/login/`
- `POST /api/v1/auth/logout/`
- `POST /api/v1/auth/token/refresh/`
- `GET /api/v1/auth/me/`

## Token Storage

JWT tokens are stored client-side with `sara_milan_access_token` and
`sara_milan_refresh_token`. The shared HTTP client injects the access token as
`Authorization: Bearer <token>` unless a request passes `{ auth: false }`.

This localStorage strategy is temporary. A backend httpOnly cookie strategy is safer and can replace
it later.

## Current User

`useCurrentUserQuery` reads the source-of-truth user from `/api/v1/auth/me/`. The user object is not
stored in localStorage.

## Login/Register Flow

`LoginForm` and `RegisterForm` keep local validation, call real auth mutations, show inline API
errors, and redirect to a safe callback URL or catalog after token-backed success.

## Cart Merge After Login

After successful login/register with tokens, auth mutations attempt `cartApi.mergeCart()` when a
guest cart token exists. Merge failures are swallowed so they do not fail authentication.

## What Is Intentionally Not Included

- protected account layout;
- account/profile API;
- address API;
- order history;
- forgot-password backend request;
- OTP backend request;
- role-based manager UI;
- fake login or mock user.

## Future Improvements

- automatic refresh on `401`;
- httpOnly cookie session strategy;
- logout UI in account/header;
- protected account pages.
