'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { Button, Input } from '@/shared/ui';

import { buildCatalogHref, setFilterValue } from './catalog-url';
import type { CatalogDictionary, CatalogPageProps } from './catalog.types';

type CatalogSearchProps = Pick<CatalogPageProps, 'categorySlug' | 'locale' | 'searchParams'> & {
  dictionary: CatalogDictionary;
};

export function CatalogSearch({
  categorySlug,
  dictionary,
  locale,
  searchParams,
}: CatalogSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState(searchParams.search ?? '');
  const canApplySearch = value.trim().length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(
      buildCatalogHref(locale, setFilterValue(searchParams, 'search', value), categorySlug),
    );
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        aria-label={dictionary.searchPlaceholder}
        leftIcon={<Search aria-hidden className="h-4 w-4" />}
        onChange={(event) => setValue(event.target.value)}
        placeholder={dictionary.searchPlaceholder}
        value={value}
      />
      <Button className="shrink-0" disabled={!canApplySearch} type="submit">
        {dictionary.apply}
      </Button>
    </form>
  );
}
