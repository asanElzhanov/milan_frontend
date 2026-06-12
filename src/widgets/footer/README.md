# Footer Widget

## Purpose

`src/widgets/footer` renders the storefront footer with brand copy, navigation, customer links,
contact placeholders, and newsletter placeholder behavior.

## Locale-Aware Links

All links are generated with the active locale prefix, for example `/ru/catalog` or `/kk/catalog`.

## Newsletter Behavior

The newsletter form is disabled when shown and never sends fake API requests. Full newsletter
integration will be added only after a backend endpoint is confirmed.

## Contacts Placeholders

The footer does not invent phone, email, or social links. Contact details remain placeholder text
until business confirms public contacts.

## What Will Be Connected Later

- Real contact information.
- Newsletter backend integration, if a confirmed endpoint is added.
- Account and orders flows after auth integration.
