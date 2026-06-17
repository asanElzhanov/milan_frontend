# Account Wishlist Page

## Route

`/:locale/account/wishlist`

## Auth Behavior

The page is rendered inside `AccountShell`, so unauthenticated users see the account auth-required
state.

## API Hooks Used

- `useWishlistQuery`
- `useToggleWishlistMutation`

## Empty/Error/Loading States

The page shows skeleton loading, readable API errors with retry, and a catalog CTA when the wishlist
is empty.

## Future Improvements

Wishlist count in header and broader catalog/home toggle integration can be added later without
changing the entity API layer.
