import type { NextRequest } from 'next/server';

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

const REQUEST_HEADERS = [
  'accept',
  'accept-language',
  'authorization',
  'content-type',
  'x-cart-token',
] as const;

const RESPONSE_HEADERS = [
  'content-disposition',
  'content-language',
  'content-type',
  'x-cart-token',
] as const;

const getBackendApiUrl = (): string =>
  process.env.INTERNAL_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'http://localhost:8000/api/v1';

const createBackendUrl = (request: NextRequest, path: string[]): URL => {
  const baseUrl = getBackendApiUrl().replace(/\/+$/, '') + '/';
  const safePath = path.map(encodeURIComponent).join('/');
  const trailingSlash = request.nextUrl.pathname.endsWith('/') ? '/' : '';
  const url = new URL(`${safePath}${trailingSlash}`, baseUrl);

  url.search = request.nextUrl.search;

  return url;
};

const proxyRequest = async (request: NextRequest, context: RouteContext): Promise<Response> => {
  const { path } = await context.params;
  const headers = new Headers();

  REQUEST_HEADERS.forEach((name) => {
    const value = request.headers.get(name);

    if (value) {
      headers.set(name, value);
    }
  });

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
  const upstreamResponse = await fetch(createBackendUrl(request, path), {
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: 'no-store',
    headers,
    method: request.method,
    redirect: 'manual',
    signal: request.signal,
  });
  const responseHeaders = new Headers({ 'Cache-Control': 'no-store' });

  RESPONSE_HEADERS.forEach((name) => {
    const value = upstreamResponse.headers.get(name);

    if (value) {
      responseHeaders.set(name, value);
    }
  });

  return new Response(upstreamResponse.body, {
    headers: responseHeaders,
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
  });
};

export const dynamic = 'force-dynamic';

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
