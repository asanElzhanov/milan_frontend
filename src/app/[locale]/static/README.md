# Static Pages

## Purpose

Localized production informational pages for Sara Milan.

## Routes

- `/:locale/about`
- `/:locale/delivery`
- `/:locale/payment`
- `/:locale/faq`
- `/:locale/contacts`
- `/:locale/privacy`
- `/:locale/terms`

## Localization

About, delivery, payment, FAQ, and contacts are loaded from `/api/v1/cms/pages/{slug}/`. Kazakh
uses the backend's historical `_kz` field suffix, with Russian as a fallback. Privacy and terms
continue to use `static.dictionary.ts`. The project does not use `next-intl`.

## Metadata

Static pages use `createPageMetadata()` for localized title, description, Open Graph defaults,
canonical links, and alternate locale links.

## SEO Helpers

`src/shared/lib/seo.ts` contains the shared metadata helper. `robots.ts` and `sitemap.ts` use the
configured site URL.

## What Is Intentionally Not Included

- complex SEO microdata
- blog
- dynamic product sitemap
- fake legal/company details
- fake contact details
