# Docker

## Local Production Container

Backend expected on the host machine:

```text
http://localhost:8000
```

Frontend public API URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

Server-side rendering inside Docker uses:

```env
INTERNAL_API_BASE_URL=http://host.docker.internal:8000/api/v1
```

This keeps browser requests pointed at `localhost:8000`, while the Node process inside the container
can reach the host backend.

## Build And Run

```bash
docker compose up --build
```

Open:

```text
http://localhost:3000
```

## Production Build With Custom API URL

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.example.com/api/v1 \
  --build-arg NEXT_PUBLIC_SITE_URL=https://www.example.com \
  -t sara-milan-frontend:latest .
```

```bash
docker run --rm -p 3000:3000 \
  -e INTERNAL_API_BASE_URL=https://api.example.com/api/v1 \
  sara-milan-frontend:latest
```

Note: `NEXT_PUBLIC_*` values are baked into the Next.js client bundle at build time. Rebuild the
image when public frontend URLs change.
