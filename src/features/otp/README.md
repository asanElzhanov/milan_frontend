# OTP UI

## Purpose

`src/features/otp` contains the visual OTP confirmation form for the storefront auth flow. It is
prepared for future backend OTP verification but does not call an API yet.

## Route

- `/:locale/otp`

## Validation

The OTP input accepts digits only and validates 4-6 digits locally. The UI prefers a 6-digit code
while leaving room for the final backend contract.

## What Is Intentionally Not Included

- OTP verification request;
- resend request;
- token storage;
- fake successful authentication;
- redirect after submit.

## Future Backend Integration

The next backend integration step should connect OTP endpoints, resend behavior, final error
mapping, and post-verification navigation.
