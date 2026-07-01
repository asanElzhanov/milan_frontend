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

const apiModeValue = process.env.NEXT_PUBLIC_API_MODE ?? 'real';
const apiMode: ApiMode = apiModeValue === 'real' ? 'real' : 'mock';
const publicApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1';

export const env = {
  apiUrl:
    typeof window === 'undefined'
      ? (process.env.INTERNAL_API_BASE_URL ?? publicApiUrl)
      : publicApiUrl,
  apiMode,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'ru',
  supportedLocales: splitCsv(process.env.NEXT_PUBLIC_SUPPORTED_LOCALES ?? 'ru,kk'),
  features: {
    wishlist: readBoolean(process.env.NEXT_PUBLIC_ENABLE_WISHLIST),
    newsletter: readBoolean(process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER),
  },
  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
    instagram: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM ?? '',
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? '',
  },
} as const;
