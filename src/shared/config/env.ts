type ApiMode = 'mock' | 'real';

const splitCsv = (value: string): string[] =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const readBoolean = (value: string | undefined, fallback = false): boolean => {
  if (value === undefined) {
    return fallback;
  }

  return value.toLowerCase() === 'true';
};

const apiModeValue = process.env.NEXT_PUBLIC_API_MODE ?? 'mock';
const apiMode: ApiMode = apiModeValue === 'real' ? 'real' : 'mock';

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000',
  apiMode,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'ru',
  supportedLocales: splitCsv(process.env.NEXT_PUBLIC_SUPPORTED_LOCALES ?? 'ru,kk'),
  features: {
    wishlist: readBoolean(process.env.NEXT_PUBLIC_ENABLE_WISHLIST),
    newsletter: readBoolean(process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER),
  },
} as const;
