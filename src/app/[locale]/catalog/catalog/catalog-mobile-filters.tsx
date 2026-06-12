'use client';

import { SlidersHorizontal } from 'lucide-react';

import { Button, Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui';

import { CatalogFilterSidebar } from './catalog-filter-sidebar';
import type { CatalogData, CatalogDictionary, CatalogPageProps } from './catalog.types';

type CatalogMobileFiltersProps = CatalogPageProps &
  Pick<CatalogData, 'brands' | 'categories' | 'colors' | 'sizes'> & {
    dictionary: CatalogDictionary;
  };

export function CatalogMobileFilters(props: CatalogMobileFiltersProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="lg:hidden" variant="outline">
          <SlidersHorizontal aria-hidden className="h-4 w-4" />
          {props.dictionary.filters}
        </Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <CatalogFilterSidebar {...props} />
      </DrawerContent>
    </Drawer>
  );
}
