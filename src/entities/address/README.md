# Address Entity

## Purpose

`src/entities/address` contains the normalized address model, backend adapters, API methods, and
React Query hooks for the authenticated customer address book.

## Endpoints

- `GET /api/v1/auth/addresses/`
- `POST /api/v1/auth/addresses/`
- `GET /api/v1/auth/addresses/{id}/`
- `PATCH /api/v1/auth/addresses/{id}/`
- `DELETE /api/v1/auth/addresses/{id}/`

## Normalized Model

Backend fields are normalized into the frontend `Address` type. API payloads stay snake_case for
DRF compatibility.

## API Methods

`addressApi` exposes list, detail, create, update, delete, and set-default methods.

## React Query Hooks

The entity exports list/detail queries and create/update/delete/default mutations. Mutations
invalidate the address list and update detail cache where possible.

## What Is Intentionally Not Included

- checkout integration;
- delivery method selection;
- order creation;
- localStorage address storage;
- fake address data.
