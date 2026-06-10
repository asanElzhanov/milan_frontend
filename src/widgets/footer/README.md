# Footer Widget

Production storefront footer for localized Sara Milan pages.

## Responsibilities

- Renders brand text, locale-aware navigation groups, contact placeholders, and legal links.
- Does not render fake social media links.
- Does not submit newsletter data or call fake APIs.
- Uses `NEXT_PUBLIC_ENABLE_NEWSLETTER` only to decide whether to show a disabled future newsletter
  form or a short informational note.

Confirmed business contacts and newsletter integration should be added in later prompts.
