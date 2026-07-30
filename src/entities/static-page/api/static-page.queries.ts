import { useQuery } from '@tanstack/react-query';

import type { AppLocale } from '@/shared/config';

import type { StaticPageSlug } from '../model/static-page.types';
import { staticPageApi } from './static-page.api';
import { staticPageKeys } from './static-page.keys';

export const useStaticPageQuery = (slug: StaticPageSlug, locale: AppLocale) =>
  useQuery({
    queryKey: staticPageKeys.detail(slug, locale),
    queryFn: () => staticPageApi.getStaticPage(slug, locale),
  });
