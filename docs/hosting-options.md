# Hosting Options

## Node Server

Build with `npm run build` and run with `npm run start`. Put Nginx, a platform proxy, or a load
balancer in front when needed.

## Docker

Docker is optional for this project. Use the sample in `docs/deployment.md` if the infrastructure
expects container images. Keep real env files out of the image.

## Managed Next.js Hosting

Vercel-style hosting can run the app if all required environment variables are configured in the
platform dashboard. Confirm API/CORS and media domains before release.

## Static Export

Static export is likely not suitable because the app uses dynamic routes, server rendering, Next
metadata routes, and image behavior that expects a Next.js runtime.

## CDN / Reverse Proxy

A CDN or reverse proxy can terminate HTTPS, cache static assets, and route traffic to the Node
server. Avoid caching authenticated API responses at the proxy.

## Environment Variables

Use `.env.production.example` as the production public env checklist. Do not expose private backend
secrets through `NEXT_PUBLIC_*`.
