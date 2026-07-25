import type { NextRequest } from 'next/server';

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

const REQUEST_HEADERS = ['accept', 'if-modified-since', 'if-none-match', 'range'] as const;
const RESPONSE_HEADERS = [
  'accept-ranges',
  'cache-control',
  'content-length',
  'content-range',
  'content-type',
  'etag',
  'last-modified',
] as const;

const getBackendOrigin = (): string => {
  const apiUrl =
    process.env.INTERNAL_API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    'http://localhost:8000/api/v1';

  return new URL(apiUrl).origin;
};

const createBackendMediaUrl = (request: NextRequest, path: string[]): URL => {
  const safePath = path.map(encodeURIComponent).join('/');
  const url = new URL(`/${safePath}`, getBackendOrigin());

  url.search = request.nextUrl.search;

  return url;
};

const proxyMedia = async (request: NextRequest, context: RouteContext): Promise<Response> => {
  const { path } = await context.params;
  const headers = new Headers();

  REQUEST_HEADERS.forEach((name) => {
    const value = request.headers.get(name);

    if (value) {
      headers.set(name, value);
    }
  });

  const upstreamResponse = await fetch(createBackendMediaUrl(request, path), {
    cache: 'no-store',
    headers,
    method: request.method,
    redirect: 'follow',
    signal: request.signal,
  });
  const responseHeaders = new Headers();

  RESPONSE_HEADERS.forEach((name) => {
    const value = upstreamResponse.headers.get(name);

    if (value) {
      responseHeaders.set(name, value);
    }
  });

  if (!responseHeaders.has('cache-control')) {
    responseHeaders.set('cache-control', 'public, max-age=3600');
  }

  return new Response(request.method === 'HEAD' ? null : upstreamResponse.body, {
    headers: responseHeaders,
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
  });
};

export const dynamic = 'force-dynamic';

export const GET = proxyMedia;
export const HEAD = proxyMedia;
