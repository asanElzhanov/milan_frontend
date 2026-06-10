import type { ApiErrorPayload, ApiValidationErrors } from './types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const toStringArray = (value: unknown): string[] | undefined => {
  if (typeof value === 'string') {
    return [value];
  }

  if (!Array.isArray(value)) {
    return undefined;
  }

  const messages = value.filter((item): item is string => typeof item === 'string');

  return messages.length > 0 ? messages : undefined;
};

const getValidationErrors = (payload: unknown): ApiValidationErrors | undefined => {
  if (!isRecord(payload)) {
    return undefined;
  }

  const errors: ApiValidationErrors = {};

  Object.entries(payload).forEach(([key, value]) => {
    const messages = toStringArray(value);

    if (messages) {
      errors[key] = messages;
    }
  });

  return Object.keys(errors).length > 0 ? errors : undefined;
};

const getPayloadMessage = (payload: unknown): string | undefined => {
  if (typeof payload === 'string') {
    return payload;
  }

  if (!isRecord(payload)) {
    return undefined;
  }

  if (typeof payload.detail === 'string') {
    return payload.detail;
  }

  const nonFieldErrors = toStringArray(payload.non_field_errors);

  if (nonFieldErrors) {
    return nonFieldErrors.join(' ');
  }

  const validationErrors = getValidationErrors(payload);
  const firstValidationMessage = validationErrors
    ? Object.values(validationErrors).flat().at(0)
    : undefined;

  return firstValidationMessage;
};

export class ApiError extends Error {
  status: number;
  payload?: unknown;
  code?: string;
  validationErrors?: ApiValidationErrors;

  constructor({
    status,
    payload,
    message,
    code,
  }: {
    status: number;
    payload?: unknown;
    message?: string;
    code?: string;
  }) {
    super(message ?? getPayloadMessage(payload) ?? `API request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
    this.code = code;
    this.validationErrors = getValidationErrors(payload);
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;

export const getApiErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  const payloadMessage = getPayloadMessage(error as ApiErrorPayload);

  return payloadMessage ?? 'Unexpected error';
};
