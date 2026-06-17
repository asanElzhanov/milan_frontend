# Account Addresses Page

## Route

`/:locale/account/addresses`

## Auth Behavior

The page is rendered inside `AccountShell`, so it uses the existing current-user query and shows an
auth-required state when `/api/v1/auth/me/` does not return a user.

## API Hooks Used

- `useAddressesQuery`
- `useCreateAddressMutation`
- `useUpdateAddressMutation`
- `useDeleteAddressMutation`
- `useSetDefaultAddressMutation`

## Create/Edit/Delete/Default Behavior

Address form validation runs locally before mutations. Backend responses remain the source of truth,
and successful mutations invalidate the address list.

## Fallback States

The page includes loading, error, and empty states. API errors are shown with readable messages from
the shared API error helper.

## Future Checkout Integration

Saved addresses are prepared for checkout reuse, but checkout integration is intentionally not part
of this page.
