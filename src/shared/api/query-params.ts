import type { ApiRequestOptions, ApiQueryValue } from './types';

const appendValue = (params: URLSearchParams, key: string, value: Exclude<ApiQueryValue, null>) => {
  if (value === undefined || value === '') {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => {
      params.append(key, String(item));
    });
    return;
  }

  params.append(key, String(value));
};

export const buildQueryString = (query?: ApiRequestOptions['query']): string => {
  if (!query) {
    return '';
  }

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === null) {
      return;
    }

    appendValue(params, key, value);
  });

  const queryString = params.toString().replace(/%2C/gi, ',');

  return queryString ? `?${queryString}` : '';
};

export const appendQueryParams = (url: string, query?: ApiRequestOptions['query']): string => {
  const queryString = buildQueryString(query);

  if (!queryString) {
    return url;
  }

  const separator = url.includes('?') ? '&' : '?';

  return `${url}${separator}${queryString.slice(1)}`;
};
