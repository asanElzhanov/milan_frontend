import { apiClient, isApiError } from '@/shared/api';
import type { AppLocale } from '@/shared/config';

import { adaptStaticPage } from '../lib/static-page.adapters';
import type { StaticPage, StaticPageSlug } from '../model/static-page.types';

export const staticPageApi = {
  async getStaticPage(slug: StaticPageSlug, locale: AppLocale): Promise<StaticPage | null> {
    try {
      const response = await apiClient.get<unknown>(`/api/v1/cms/pages/${slug}/`, {
        auth: false,
        cartToken: false,
      });
      const page = adaptStaticPage(response, locale);

      return page?.slug === slug ? page : null;
    } catch (error) {
      if (isApiError(error) && error.status === 404) {
        return null;
      }

      throw error;
    }
  },
};
