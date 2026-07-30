# Footer Widget

## Purpose

`src/widgets/footer` renders the storefront footer with brand copy, navigation, customer links, and
contacts loaded from the CMS.

## Locale-Aware Links

All links are generated with the active locale prefix, for example `/ru/catalog` or `/kk/catalog`.

## Contacts

The footer loads the localized title and blocks from `/api/v1/cms/pages/contacts/`. Known WhatsApp,
phone, and email blocks are rendered as links.

## What Will Be Connected Later

- Newsletter backend integration, if a confirmed endpoint is added.
- Account and orders flows after auth integration.
