import { API_BASE_URL } from './config';
import { getCartToken } from './cart-token-storage';
import { ApiError } from './errors';
import { appendQueryParams } from './query-params';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from './token-storage';
import type { ApiClientConfig, ApiRequestOptions, HttpMethod } from './types';

type RequestBody = BodyInit | object | unknown[] | null;

export type ApiClient = {
  get<T>(path: string, options?: ApiRequestOptions): Promise<T>;
  post<T>(path: string, body?: RequestBody, options?: ApiRequestOptions): Promise<T>;
  patch<T>(path: string, body?: RequestBody, options?: ApiRequestOptions): Promise<T>;
  put<T>(path: string, body?: RequestBody, options?: ApiRequestOptions): Promise<T>;
  delete<T>(path: string, options?: ApiRequestOptions): Promise<T>;
};

const isAbsoluteUrl = (path: string): boolean => /^https?:\/\//i.test(path);

const normalizeBaseUrl = (baseUrl: string): string => baseUrl.replace(/\/+$/, '') + '/';

const normalizePath = (baseUrl: string, path: string): string => {
  if (isAbsoluteUrl(path)) {
    return path;
  }

  const basePath = (() => {
    try {
      return new URL(baseUrl).pathname.replace(/\/+$/, '');
    } catch {
      return '';
    }
  })();

  if (basePath.endsWith('/api/v1') && path.startsWith('/api/v1/')) {
    return path.slice('/api/v1/'.length);
  }

  return path.replace(/^\/+/, '');
};

const createUrl = (baseUrl: string, path: string, query?: ApiRequestOptions['query']): string => {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  const normalizedPath = normalizePath(normalizedBaseUrl, path);
  const url = isAbsoluteUrl(normalizedPath)
    ? normalizedPath
    : new URL(normalizedPath, normalizedBaseUrl).toString();

  return appendQueryParams(url, query);
};

const isFormData = (body: unknown): body is FormData =>
  typeof FormData !== 'undefined' && body instanceof FormData;

const createBody = (body: RequestBody | undefined): BodyInit | undefined => {
  if (body === undefined) {
    return undefined;
  }

  if (body === null) {
    return 'null';
  }

  if (isFormData(body) || typeof body === 'string' || body instanceof Blob) {
    return body;
  }

  return JSON.stringify(body);
};

const createHeaders = (
  body: RequestBody | undefined,
  options: ApiRequestOptions,
  config: ApiClientConfig,
): Headers => {
  const headers = new Headers(config.defaultHeaders);
  const optionHeaders = new Headers(options.headers);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  optionHeaders.forEach((value, key) => {
    headers.set(key, value);
  });

  if (body !== undefined && !isFormData(body) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = options.auth === false ? null : getAccessToken();

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Cart endpoints use X-Cart-Token for guest cart tracking.
  const cartToken = options.cartToken === false ? null : getCartToken();

  if (cartToken && !headers.has('X-Cart-Token')) {
    headers.set('X-Cart-Token', cartToken);
  }

  return headers;
};

const parseResponse = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return undefined;
  }

  const text = await response.text();

  if (!text) {
    return undefined;
  }

  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return JSON.parse(text);
  }

  return text;
};

export const createApiClient = (config: Partial<ApiClientConfig> = {}): ApiClient => {
  const clientConfig: ApiClientConfig = {
    baseUrl: config.baseUrl ?? API_BASE_URL,
    defaultHeaders: config.defaultHeaders,
    credentials: config.credentials,
  };

  let refreshPromise: Promise<boolean> | null = null;

  const refreshAccessToken = async (): Promise<boolean> => {
    const refresh = getRefreshToken();

    if (!refresh) {
      clearTokens();
      return false;
    }

    try {
      const response = await fetch(createUrl(clientConfig.baseUrl, '/auth/token/refresh/'), {
        body: JSON.stringify({ refresh }),
        credentials: clientConfig.credentials,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const payload = await parseResponse(response);

      if (!response.ok || typeof payload !== 'object' || payload === null) {
        clearTokens();
        return false;
      }

      const record = payload as Record<string, unknown>;
      const access = typeof record.access === 'string' ? record.access : null;
      const nextRefresh = typeof record.refresh === 'string' ? record.refresh : null;

      if (!access) {
        clearTokens();
        return false;
      }

      setAccessToken(access);

      if (nextRefresh) {
        setRefreshToken(nextRefresh);
      }

      return true;
    } catch {
      clearTokens();
      return false;
    }
  };

  const shouldAttemptRefresh = (
    status: number,
    path: string,
    options: ApiRequestOptions,
  ): boolean =>
    status === 401 &&
    options.auth !== false &&
    !path.includes('/auth/token/refresh/') &&
    !path.includes('/auth/logout/');

  const request = async <T>(
    method: HttpMethod,
    path: string,
    body?: RequestBody,
    options: ApiRequestOptions = {},
  ): Promise<T> => {
    const execute = () =>
      fetch(createUrl(clientConfig.baseUrl, path, options.query), {
        body: createBody(body),
        credentials: options.credentials ?? clientConfig.credentials,
        headers: createHeaders(body, options, clientConfig),
        method,
        signal: options.signal,
      });

    let response = await execute();
    let payload = await parseResponse(response);

    if (!response.ok && shouldAttemptRefresh(response.status, path, options)) {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });

      const refreshed = await refreshPromise;

      if (refreshed) {
        response = await execute();
        payload = await parseResponse(response);
      }
    }

    if (!response.ok) {
      throw new ApiError({
        status: response.status,
        payload,
        message: response.statusText || undefined,
        code: response.status === 401 ? 'unauthorized' : undefined,
      });
    }

    return payload as T;
  };

  return {
    get: (path, options) => request('GET', path, undefined, options),
    post: (path, body, options) => request('POST', path, body, options),
    patch: (path, body, options) => request('PATCH', path, body, options),
    put: (path, body, options) => request('PUT', path, body, options),
    delete: (path, options) => request('DELETE', path, undefined, options),
  };
};

export const apiClient = createApiClient();
