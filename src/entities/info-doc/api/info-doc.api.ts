import { apiClient } from '@/shared/api';
import type { AppLocale } from '@/shared/config';

import { adaptInfoDocs } from '../lib/info-doc.adapters';
import type { InfoDoc } from '../model/info-doc.types';

export const infoDocApi = {
  async getInfoDocs(locale: AppLocale): Promise<InfoDoc[]> {
    const response = await apiClient.get<unknown>('/api/v1/cms/info-docs/', {
      auth: false,
      cartToken: false,
    });

    return adaptInfoDocs(response, locale);
  },
};
