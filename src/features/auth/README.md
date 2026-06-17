# Auth UI

## Purpose

`src/features/auth` contains production-ready visual auth forms for login, registration, and password
recovery. The forms are ready for storefront use but intentionally remain UI-only until the backend
auth contract is connected.

## Routes

- `/:locale/login`
- `/:locale/register`
- `/:locale/forgot-password`

## Components

- `AuthShell` provides the premium two-column auth layout.
- `LoginForm` renders identifier, password, and remember-me controls.
- `RegisterForm` renders customer details, password confirmation, and terms acceptance.
- `ForgotPasswordForm` renders the password recovery identifier form.
- `AuthLegalNote` and `AuthDivider` provide shared presentation pieces.

## Validation

Validation is local only:

- required fields;
- email format;
- Kazakhstan-friendly phone numbers;
- password minimum length;
- matching password confirmation;
- required terms acceptance.

## What Is Intentionally Not Included

- real login or register requests;
- password reset requests;
- access or refresh token storage;
- auth store;
- protected routes;
- profile/account API;
- cart merge after login;
- logout.

## Future Backend Integration

The next backend integration step should connect auth endpoints, token/session management, account
state, protected routes, and cart merge after login without changing the visual route structure.
