# Deployment Checklist

## Before Deploy

- [ ] `NEXT_PUBLIC_API_BASE_URL` configured
- [ ] `NEXT_PUBLIC_SITE_URL` configured
- [ ] Contact env configured or intentionally empty
- [ ] Image/media domains configured or remote images intentionally unoptimized
- [ ] Backend CORS configured
- [ ] Auth endpoints verified
- [ ] Cart endpoints verified
- [ ] Checkout endpoint verified
- [ ] Payment endpoints verified or fallback accepted
- [ ] Order endpoints verified or fallback accepted
- [ ] Review endpoints verified or fallback accepted
- [ ] Notification endpoints verified
- [ ] Sitemap URL opens
- [ ] Robots opens

## Build Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run format:check`
- [ ] tests if available

## Smoke Test

- [ ] Home opens
- [ ] Catalog opens
- [ ] Product detail opens
- [ ] Cart works
- [ ] Auth works
- [ ] Account pages protected
- [ ] Checkout works
- [ ] Payment redirect/fallback works
- [ ] Static pages open
- [ ] Mobile viewport checked

## After Deploy

- [ ] Check browser console
- [ ] Check network API base URL
- [ ] Check media images
- [ ] Check sitemap
- [ ] Check robots
- [ ] Check key user flows
