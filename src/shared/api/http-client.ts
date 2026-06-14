import { API_BASE_URL } from './config';
import { getCartToken } from './cart-token-storage';
import { ApiError } from './errors';
import { appendQueryParams } from './query-params';
import { getAccessToken } from './token-storage';
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

const createUrl = (baseUrl: string, path: string, query?: ApiRequestOptions['query']): string => {
  const url = isAbsoluteUrl(path) ? path : new URL(path, baseUrl).toString();

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

  const request = async <T>(
    method: HttpMethod,
    path: string,
    body?: RequestBody,
    options: ApiRequestOptions = {},
  ): Promise<T> => {
    const response = await fetch(createUrl(clientConfig.baseUrl, path, options.query), {
      body: createBody(body),
      credentials: options.credentials ?? clientConfig.credentials,
      headers: createHeaders(body, options, clientConfig),
      method,
      signal: options.signal,
    });

    const payload = await parseResponse(response);

    if (!response.ok) {
      // Refresh token flow will be added in the auth integration prompt.
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
