# Home Page

Production storefront Home for `/ru` and `/kk`.

## Files

- `home-page.tsx` composes the page sections.
- `home.api.ts` fetches catalog data server-side with `Promise.allSettled`.
- `home.adapters.ts` converts catalog entities into Home view models.
- `home.dictionary.ts` stores localized copy and metadata.
- Section components render hero, categories, product blocks, promo banner, story, and benefits.

## Data Sources

- `bannerApi.getBanners({ position: 'hero', active: true })`
- `bannerApi.getBanners({ position: 'mid', active: true })`
- `categoryApi.getCategoryTree({ active: true })`
- `productApi.getProducts({ is_new: true })`
- `productApi.getProducts({ is_sale: true })`

Mock mode and failed requests return empty sections instead of fake catalog data.
