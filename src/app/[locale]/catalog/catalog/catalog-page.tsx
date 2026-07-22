import { Container, ErrorState, SectionTitle } from '@/shared/ui';
import { ProductGrid } from '@/widgets/product-grid';
import type { Category } from '@/entities/category';
import { getLocalizedField } from '@/shared/lib';

import { getCatalogData } from './catalog.api';
import { CatalogActiveFilters } from './catalog-active-filters';
import { CatalogFilterSidebar } from './catalog-filter-sidebar';
import { CatalogMobileFilters } from './catalog-mobile-filters';
import { CatalogPagination } from './catalog-pagination';
import { CatalogSearch } from './catalog-search';
import { CatalogSort } from './catalog-sort';
import { getCatalogDictionary } from './catalog.dictionary';
import type { CatalogPageProps } from './catalog.types';

const findCategory = (categories: Category[], slug: string): Category | undefined => {
  for (const category of categories) {
    if (category.slug === slug) return category;
    const child = findCategory(category.children ?? [], slug);
    if (child) return child;
  }
  return undefined;
};

export async function CatalogPage({ categorySlug, locale, searchParams }: CatalogPageProps) {
  const dictionary = getCatalogDictionary(locale);
  const data = await getCatalogData({ categorySlug, searchParams });

  const filterProps = {
    brands: data.brands,
    categories: data.categories,
    categorySlug,
    colors: data.colors,
    dictionary,
    locale,
    searchParams,
    sizes: data.sizes,
  };
  const filterKey = `${categorySlug ?? 'all'}-${JSON.stringify(searchParams)}`;
  const activeCategory = categorySlug ? findCategory(data.categories, categorySlug) : undefined;
  const pageTitle = activeCategory
    ? getLocalizedField(activeCategory, 'name', locale)
    : categorySlug || dictionary.title;

  return (
    <Container className="sara-section space-y-10">
      <SectionTitle
        description={`${dictionary.found}: ${data.totalCount} ${dictionary.products}`}
        eyebrow={categorySlug ? dictionary.categoryTitle : 'Sara Milan'}
        title={pageTitle}
      />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <CatalogFilterSidebar key={filterKey} {...filterProps} />
        </div>

        <div className="space-y-8">
          <div className="grid gap-4 xl:grid-cols-[1fr_260px]">
            <CatalogSearch
              categorySlug={categorySlug}
              dictionary={dictionary}
              locale={locale}
              searchParams={searchParams}
            />
            <div className="flex items-start gap-3">
              <CatalogMobileFilters key={filterKey} {...filterProps} />
              <CatalogSort
                categorySlug={categorySlug}
                dictionary={dictionary}
                locale={locale}
                searchParams={searchParams}
              />
            </div>
          </div>

          <CatalogActiveFilters
            categorySlug={categorySlug}
            dictionary={dictionary}
            locale={locale}
            searchParams={searchParams}
          />

          {data.hasError ? (
            <ErrorState title={dictionary.errorTitle} description={dictionary.errorDescription} />
          ) : (
            <>
              <ProductGrid
                emptyDescription={dictionary.emptyDescription}
                emptyTitle={dictionary.emptyTitle}
                locale={locale}
                products={data.products}
              />
              <CatalogPagination
                categorySlug={categorySlug}
                currentPage={data.currentPage}
                locale={locale}
                searchParams={searchParams}
                totalPages={data.totalPages}
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
