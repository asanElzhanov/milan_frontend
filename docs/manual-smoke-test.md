# Manual Smoke Test

Run this checklist against a local or staging build before production.

## Public Browsing

- Open `/ru` and `/kk`.
- Browse `/ru/catalog` and `/kk/catalog`.
- Try catalog search, sort, filters, and pagination.
- Open a category route from catalog/header navigation.
- Open a product detail page from a product card.

## Cart And Checkout

- Add a product to cart when backend cart mutations are available.
- Open cart and confirm totals come from backend data.
- Apply an invalid promo code and confirm a readable error.
- Proceed to checkout as guest.
- Select delivery and payment options.
- Submit checkout and confirm redirect target is safe.

## Auth And Account

- Open login/register/OTP/forgot-password pages in both locales.
- Log in with a staging account.
- Open account overview, settings, addresses, wishlist, orders, reviews, and notifications.
- Create/edit/delete an address on staging if backend allows it.
- Toggle wishlist from product UI.
- Open order list and an order detail route.
- Use read-all notifications when unread notifications exist.

## Payments

- Open `/ru/payment` and `/kk/payment`.
- Open a payment detail route with a known staging order number.
- Verify success, fail, and pending return pages.

## Static And System Pages

- Open about, delivery, FAQ, contacts, privacy, and terms pages in RU and KK.
- Check `robots.txt`.
- Check `sitemap.xml`.
- Trigger an invalid route and verify the not-found page.

## Mobile Viewport

- Repeat home, catalog, product detail, cart, checkout, account, order detail, and static page checks
  at a narrow mobile width around 375px.

## Post-Deploy Checks

- Open the deployed site from the public domain.
- Verify API requests target the production backend from `NEXT_PUBLIC_API_BASE_URL`.
- Log in with a staging/production test account.
- Verify guest cart creates or reuses `X-Cart-Token`.
- Verify product and banner images load from the expected media host.
- Run checkout with a safe test order flow.
- Verify payment redirect or fallback behavior.
- Open `/robots.txt`.
- Open `/sitemap.xml`.
- Check browser console for runtime errors.
