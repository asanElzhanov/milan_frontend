import { describe, expect, it } from 'vitest';

import { isSupportedLocale, SUPPORTED_LOCALES } from './locales';

describe('locale configuration', () => {
  it('treats English as a supported application locale', () => {
    expect(SUPPORTED_LOCALES).toContain('en');
    expect(isSupportedLocale('en')).toBe(true);
  });

  it('rejects unknown locales', () => {
    expect(isSupportedLocale('de')).toBe(false);
  });
});
