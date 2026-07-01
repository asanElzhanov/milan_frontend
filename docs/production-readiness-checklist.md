# Production Readiness Checklist

## Required Before Production

- [ ] API base URL configured
- [ ] Site URL configured
- [ ] Contact env variables configured
- [ ] Deployment host selected
- [ ] Runtime environment variables configured on host
- [ ] Backend CORS configured
- [ ] Auth endpoints verified
- [ ] Payment endpoints verified
- [ ] Order endpoints verified
- [ ] Review endpoints verified
- [ ] Notification endpoints verified
- [ ] Images/media domain configured
- [ ] Error monitoring configured
- [ ] Analytics configured if needed
- [ ] Sitemap URL verified
- [ ] Robots verified

## Deployment

- [ ] Node/Vercel/Docker hosting mode selected
- [ ] Reverse proxy or platform routing configured
- [ ] HTTPS configured
- [ ] Rollback artifact or previous deployment available
- [ ] `.env.production.example` reviewed
- [ ] `docs/deployment-checklist.md` completed

## Frontend Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run format:check`
- [ ] Manual route smoke test
- [ ] Mobile responsive smoke test
- [ ] Cart/checkout smoke test
- [ ] Auth smoke test

## Monitoring And Rollback

- [ ] Error monitoring configured if required
- [ ] Analytics configured if required
- [ ] Deployment logs accessible
- [ ] Backend logs accessible
- [ ] Rollback plan documented

## Intentionally Deferred

- Admin dashboard
- Manager dashboard
- Push notifications
- Realtime notifications
- Advanced SEO microdata
- Dynamic product sitemap
- Mobile app
