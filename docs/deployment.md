# Deployment Guide

## Overview

Sara Milan frontend is a Next.js App Router application. The production deployment should build the
app with confirmed public environment variables and run it with `next start` or an equivalent
managed Next.js host.

## Required Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: public backend API base URL.
- `NEXT_PUBLIC_SITE_URL`: public frontend URL used by metadata, sitemap, robots and canonical links.
- `NEXT_PUBLIC_API_MODE=real`: enables real backend calls.

Optional public values:

- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_INSTAGRAM`
- `NEXT_PUBLIC_CONTACT_ADDRESS`
- `NEXT_PUBLIC_ANALYTICS_ID`
- `NEXT_PUBLIC_SENTRY_DSN`

Do not put private secrets into `NEXT_PUBLIC_*` variables.

## Local Production Build

```bash
npm install
npm run lint
npm run typecheck
npm run build
npm run start
```

The app listens on the Next.js default port `3000` unless the hosting environment overrides `PORT`.

## Node Deployment

1. Install dependencies with `npm ci` or `npm install`.
2. Set production environment variables.
3. Run `npm run build`.
4. Start with `npm run start`.
5. Put a reverse proxy or load balancer in front if required by hosting.

## Optional Docker Deployment

No Dockerfile is committed as the required deployment path. If the deployment target uses Docker,
start from this minimal pattern and adapt it to the chosen platform:

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "run", "start"]
```

Use `.dockerignore` so local env files and build artifacts are not copied into images.

## Reverse Proxy / Nginx Notes

Conceptual example:

```nginx
server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://frontend:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Use HTTPS in production. Configure the public frontend domain in backend CORS settings.

## Backend API And CORS

- `NEXT_PUBLIC_API_BASE_URL` must point to the public backend API URL.
- Backend CORS should allow `NEXT_PUBLIC_SITE_URL`.
- The frontend sends `Authorization: Bearer <access>` when an access token exists.
- Guest cart requests can send `X-Cart-Token`.

## Images / Media Domains

Product/media URLs are normalized against the API base URL when relative. Remote product images are
currently rendered unoptimized in the shared product image component. If the deployment enables Next
image optimization for remote media later, configure `next.config.ts` with confirmed backend,
MinIO/S3, or CDN hosts. Do not guess domains.

## Sitemap And Robots

`src/app/sitemap.ts` and `src/app/robots.ts` use `NEXT_PUBLIC_SITE_URL`. Configure it before
production so sitemap and canonical URLs use the public domain.

## Post-Deploy Smoke Test

Use `docs/manual-smoke-test.md`. At minimum, verify:

- home, catalog, product detail and static pages
- login/account protection
- cart token and checkout flow
- payment redirect or fallback behavior
- media images
- `robots.txt` and `sitemap.xml`

## Rollback Notes

Keep the previous deployed artifact or image available. Roll back both frontend and public env
changes together if the release depends on new backend endpoints.

## Known Pending Backend Contracts

- OTP and forgot-password endpoints
- Account current-user reviews endpoint
- Payment status endpoint
- Newsletter/contact form endpoints
