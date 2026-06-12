export type UnknownRecord = Record<string, unknown>;

export const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null;

export const toStringOrNull = (value: unknown): string | null => {
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  return null;
};

export const toNumberOrNull = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

export const toBooleanOrUndefined = (value: unknown): boolean | undefined => {
  if (typeof value === 'boolean') {
    return value;
  }

  return undefined;
};

export const getArrayFromResponse = (response: unknown): unknown[] => {
  if (Array.isArray(response)) {
    return response;
  }

  if (isRecord(response) && Array.isArray(response.results)) {
    return response.results;
  }

  return [];
};

export const slugifyFallback = (value: string | number): string =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
