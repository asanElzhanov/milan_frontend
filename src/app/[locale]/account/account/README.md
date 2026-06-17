# Account Shell

## Purpose

The account shell provides the protected customer account area for Sara Milan storefront pages.

## Routes

- `/:locale/account`
- `/:locale/account/settings`
- `/:locale/account/orders`
- `/:locale/account/addresses`
- `/:locale/account/wishlist`
- `/:locale/account/reviews`
- `/:locale/account/notifications`

## Auth Behavior

`AccountShellClient` uses `useCurrentUserQuery` on the client. While the query is loading it shows a
loading state. If `/api/v1/auth/me/` does not return a user, the shell shows an auth-required state
with login, register, and catalog actions.

## Current User Source

The current user source of truth is `/api/v1/auth/me/`. The account area does not read a user object
from localStorage and does not create fake user data.

## Logout

`AccountLogoutButton` uses `useLogoutMutation`, which calls the existing auth logout flow and clears
the local session tokens. After logout it redirects to `/:locale/login`.

## Implemented Pages

- Overview page with profile summary and quick links.
- Settings page with read-only profile/contact fields.

## Placeholder Pages

Orders, addresses, wishlist, reviews, and notifications are routed through the same protected shell
and show localized pending messages. They do not call feature APIs yet.

## What Is Intentionally Not Included

- orders API;
- addresses API;
- wishlist API;
- reviews API;
- notifications API;
- profile update request;
- change password request;
- manager/admin dashboard;
- role-based permissions UI.

## Future Integrations

Future prompts can connect profile editing, address book, order history, wishlist, reviews, and
notifications without replacing the shell structure.
