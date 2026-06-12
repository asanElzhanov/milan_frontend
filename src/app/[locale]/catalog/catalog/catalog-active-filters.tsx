import Link from 'next/link';
import { X } from 'lucide-react';

import { Badge, Button } from '@/shared/ui';

import { buildCatalogHref, removeFilter, resetFiltersHref } from './catalog-url';
import type { CatalogDictionary, CatalogPageProps } from './catalog.types';

type CatalogActiveFiltersProps = CatalogPageProps & {
  dictionary: CatalogDictionary;
};

const activeFilterKeys = [
  'search',
  'brand_slug',
  'color',
  'size',
  'price_min',
  'price_max',
  'material',
  'season',
  'in_stock',
  'is_sale',
  'is_new',
] as const;

export function CatalogActiveFilters({
  categorySlug,
  dictionary,
  locale,
  searchParams,
}: CatalogActiveFiltersProps) {
  const items = activeFilterKeys
    .map((key) => {
      const value = searchParams[key];

      if (!value) {
        return null;
      }

      return {
        key,
        value,
      };
    })
    .filter((item): item is { key: (typeof activeFilterKeys)[number]; value: string } =>
      Boolean(item),
    );

  if (items.length === 0 && !categorySlug) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-caption font-medium text-sara-graphite">
        {dictionary.activeFilters}
      </span>
      {categorySlug ? (
        <Badge variant="muted">
          {dictionary.selectedCategory}: {categorySlug}
        </Badge>
      ) : null}
      {items.map((item) => (
        <Button asChild key={item.key} size="sm" variant="ghost">
          <Link href={buildCatalogHref(locale, removeFilter(searchParams, item.key), categorySlug)}>
            {item.value}
            <X aria-hidden className="h-3 w-3" />
          </Link>
        </Button>
      ))}
      <Button asChild size="sm" variant="link">
        <Link href={resetFiltersHref(locale, categorySlug)}>{dictionary.reset}</Link>
      </Button>
    </div>
  );
}
