# Account Sidebar Widget

The production account navigation is currently route-local in
`src/app/[locale]/account/account/account-sidebar.tsx` because it depends on account route labels,
active route state, and logout composition.

This widget folder remains available for a future shared account-sidebar widget if the navigation is
needed outside the account route tree.
