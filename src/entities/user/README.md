# User Entity

## Purpose

`src/entities/user` contains the normalized customer/user model used by auth and future account
features.

## Normalized User Type

The `User` type keeps backend shape differences out of UI code. It supports common customer fields
such as email, phone, name, avatar, role and verification flags.

## Adapter

`adaptUser(raw)` safely accepts unknown backend responses. It supports raw user objects plus
`user` and `data.user` wrappers and returns `null` for unsupported shapes.
