'use client';

import { useRouter } from 'next/navigation';

import { Select } from '@/shared/ui';

import { buildCatalogHref, RECOMMENDED_SORT, setFilterValue } from './catalog-url';
import type { CatalogDictionary, CatalogPageProps } from './catalog.types';

type CatalogSortProps = Pick<CatalogPageProps, 'categorySlug' | 'locale' | 'searchParams'> & {
  dictionary: CatalogDictionary;
};

const DEFAULT_SORT = 'default';

export function CatalogSort({ categorySlug, dictionary, locale, searchParams }: CatalogSortProps) {
  const router = useRouter();
  const currentValue = searchParams.ordering || DEFAULT_SORT;

  const handleChange = (value: string) => {
    router.push(
      buildCatalogHref(
        locale,
        setFilterValue(searchParams, 'ordering', value === DEFAULT_SORT ? undefined : value),
        categorySlug,
      ),
    );
  };

  return (
    <Select
      ariaLabel={dictionary.sort}
      onValueChange={handleChange}
      options={[
        { value: DEFAULT_SORT, label: dictionary.allSort },
        { value: RECOMMENDED_SORT, label: dictionary.recommended },
        { value: 'price', label: dictionary.priceAsc },
        { value: '-price', label: dictionary.priceDesc },
        { value: '-created_at', label: dictionary.newest },
        { value: '-rating', label: dictionary.rating },
        { value: '-orders_count', label: dictionary.popular },
      ]}
      value={currentValue}
    />
  );
}
