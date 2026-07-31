import { useQuery } from '@tanstack/react-query';

import type { AppLocale } from '@/shared/config';

import { infoDocApi } from './info-doc.api';
import { infoDocKeys } from './info-doc.keys';

export const useInfoDocsQuery = (locale: AppLocale) =>
  useQuery({
    queryKey: infoDocKeys.list(locale),
    queryFn: () => infoDocApi.getInfoDocs(locale),
  });
