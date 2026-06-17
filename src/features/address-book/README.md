# Address Book Feature

## Purpose

`src/features/address-book` contains reusable address book UI for account pages and future checkout
address selection.

## Components

- `AddressForm`
- `AddressCard`
- `AddressList`
- `AddressDeleteDialog`
- `AddressEmptyState`

## Validation

The form validates recipient name, phone, city, and either street or address line 1. Phone validation
is Kazakhstan-friendly and intentionally simple.

## Default Address

Cards expose a set-default action. The feature UI calls callbacks only; entity mutations decide how
the backend is updated.

## Checkout Reuse

Address types, selectors, cards, and form values are exported so checkout can reuse saved addresses
later.

## What Is Intentionally Not Included

- checkout integration;
- localStorage addresses;
- fake address data;
- delivery methods;
- order creation.
