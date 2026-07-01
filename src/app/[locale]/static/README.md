# Static Pages

## Purpose

Localized production informational pages for Sara Milan that do not depend on catalog, order, or CMS
data.

## Routes

- `/:locale/about`
- `/:locale/delivery`
- `/:locale/payment`
- `/:locale/faq`
- `/:locale/contacts`
- `/:locale/privacy`
- `/:locale/terms`

## Localization

Content lives in `static.dictionary.ts` for `ru` and `kk`. The project does not use `next-intl`.

## Metadata

Static pages use `createPageMetadata()` for localized title, description, Open Graph defaults,
canonical links, and alternate locale links.

## Contact Data

The contacts page reads public contact values from `env.contact`, backed by:

- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_INSTAGRAM`
- `NEXT_PUBLIC_CONTACT_ADDRESS`

If they are missing, the page shows a graceful pending message and does not invent contacts.

## SEO Helpers

`src/shared/lib/seo.ts` contains the shared metadata helper. `robots.ts` and `sitemap.ts` use the
configured site URL.

## What Is Intentionally Not Included

- complex SEO microdata
- blog
- CMS integration
- dynamic content API
- dynamic product sitemap
- fake legal/company details
- fake contact details
