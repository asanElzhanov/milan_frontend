export type ApiMode = 'mock' | 'real';

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type ApiQueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;

export type ApiRequestOptions = {
  auth?: boolean;
  cartToken?: boolean;
  headers?: HeadersInit;
  query?: Record<string, ApiQueryValue>;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
};

export type ApiErrorCode = 'network_error' | 'validation_error' | 'unauthorized' | 'unknown_error';

export type ApiValidationErrors = Record<string, string[]>;

export type ApiErrorPayload = {
  detail?: string;
  non_field_errors?: string[];
  [key: string]: unknown;
};

export type ApiResponseMeta = {
  status: number;
  headers: Headers;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ApiClientConfig = {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
  credentials?: RequestCredentials;
};
