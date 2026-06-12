'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import type { Brand } from '@/entities/brand';
import type { Category } from '@/entities/category';
import type { ProductColor } from '@/entities/color';
import type { ProductSize } from '@/entities/size';
import { Button, Checkbox, Input } from '@/shared/ui';

import {
  buildCatalogHref,
  getSearchParam,
  resetFiltersHref,
  setFilterValue,
  toggleFilterValue,
} from './catalog-url';
import type { CatalogDictionary, CatalogPageProps } from './catalog.types';

type CatalogFilterSidebarProps = Pick<
  CatalogPageProps,
  'categorySlug' | 'locale' | 'searchParams'
> & {
  brands: Brand[];
  categories: Category[];
  colors: ProductColor[];
  dictionary: CatalogDictionary;
  sizes: ProductSize[];
};

type LinkOptionProps = {
  active?: boolean;
  children: React.ReactNode;
  href: string;
};

function LinkOption({ active, children, href }: LinkOptionProps) {
  return (
    <Link
      aria-current={active ? 'page' : undefined}
      className={`sara-focus flex min-h-9 items-center justify-between border px-3 py-2 text-sm transition-colors ${
        active
          ? 'border-sara-graphite bg-sara-graphite text-sara-white'
          : 'border-sara-beige-dark bg-sara-white text-sara-graphite hover:bg-sara-beige'
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}

export function CatalogFilterSidebar({
  brands,
  categories,
  categorySlug,
  colors,
  dictionary,
  locale,
  searchParams,
  sizes,
}: CatalogFilterSidebarProps) {
  const router = useRouter();
  const [priceMin, setPriceMin] = useState(searchParams.price_min ?? '');
  const [priceMax, setPriceMax] = useState(searchParams.price_max ?? '');
  const [material, setMaterial] = useState(searchParams.material ?? '');
  const [season, setSeason] = useState(searchParams.season ?? '');

  const pushFilter = (key: keyof CatalogPageProps['searchParams'], value?: string) => {
    router.push(buildCatalogHref(locale, setFilterValue(searchParams, key, value), categorySlug));
  };

  const pushToggle = (key: keyof CatalogPageProps['searchParams'], value: string) => {
    router.push(
      buildCatalogHref(locale, toggleFilterValue(searchParams, key, value), categorySlug),
    );
  };

  const handleAdvancedSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let next = setFilterValue(searchParams, 'price_min', priceMin);
    next = setFilterValue(next, 'price_max', priceMax);
    next = setFilterValue(next, 'material', material);
    next = setFilterValue(next, 'season', season);

    router.push(buildCatalogHref(locale, next, categorySlug));
  };

  const categoryBaseSearch = { ...searchParams, page: '1' };

  return (
    <aside className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-sara-black">{dictionary.filters}</h2>
        <Button asChild size="sm" variant="link">
          <Link href={resetFiltersHref(locale, categorySlug)}>{dictionary.reset}</Link>
        </Button>
      </div>

      {categories.length > 0 ? (
        <section className="space-y-3">
          <h3 className="text-caption font-semibold uppercase text-sara-bronze">
            {dictionary.categories}
          </h3>
          <div className="space-y-2">
            <LinkOption active={!categorySlug} href={buildCatalogHref(locale, categoryBaseSearch)}>
              {dictionary.allCategories}
            </LinkOption>
            {categories.slice(0, 12).map((category) => (
              <LinkOption
                active={category.slug === categorySlug}
                href={buildCatalogHref(locale, categoryBaseSearch, category.slug)}
                key={category.id}
              >
                {category.name}
              </LinkOption>
            ))}
          </div>
        </section>
      ) : null}

      {brands.length > 0 ? (
        <section className="space-y-3">
          <h3 className="text-caption font-semibold uppercase text-sara-bronze">
            {dictionary.brands}
          </h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <Checkbox
                checked={getSearchParam(searchParams, 'brand_slug') === brand.slug}
                key={brand.id}
                label={brand.name}
                onCheckedChange={() => pushToggle('brand_slug', brand.slug)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {colors.length > 0 ? (
        <section className="space-y-3">
          <h3 className="text-caption font-semibold uppercase text-sara-bronze">
            {dictionary.colors}
          </h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const value = color.slug ?? color.name;
              const active = getSearchParam(searchParams, 'color') === value;

              return (
                <button
                  className={`sara-focus flex h-9 items-center gap-2 border px-3 text-sm ${
                    active
                      ? 'border-sara-graphite bg-sara-graphite text-sara-white'
                      : 'border-sara-beige-dark bg-sara-white text-sara-graphite'
                  }`}
                  key={color.id}
                  onClick={() => pushToggle('color', value)}
                  type="button"
                >
                  {color.hex ? (
                    <span
                      aria-hidden
                      className="h-3 w-3 rounded-full border border-sara-beige-dark"
                      style={{ backgroundColor: color.hex }}
                    />
                  ) : null}
                  {color.name}
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {sizes.length > 0 ? (
        <section className="space-y-3">
          <h3 className="text-caption font-semibold uppercase text-sara-bronze">
            {dictionary.sizes}
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const value = size.value ?? size.slug ?? size.name;
              const active = getSearchParam(searchParams, 'size') === value;

              return (
                <button
                  className={`sara-focus h-9 min-w-11 border px-3 text-sm ${
                    active
                      ? 'border-sara-graphite bg-sara-graphite text-sara-white'
                      : 'border-sara-beige-dark bg-sara-white text-sara-graphite'
                  }`}
                  key={size.id}
                  onClick={() => pushToggle('size', value)}
                  type="button"
                >
                  {size.name}
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      <form className="space-y-4" onSubmit={handleAdvancedSubmit}>
        <section className="space-y-3">
          <h3 className="text-caption font-semibold uppercase text-sara-bronze">
            {dictionary.price}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Input
              inputMode="numeric"
              label={dictionary.priceFrom}
              onChange={(event) => setPriceMin(event.target.value)}
              value={priceMin}
            />
            <Input
              inputMode="numeric"
              label={dictionary.priceTo}
              onChange={(event) => setPriceMax(event.target.value)}
              value={priceMax}
            />
          </div>
        </section>

        <Input
          label={dictionary.material}
          onChange={(event) => setMaterial(event.target.value)}
          value={material}
        />
        <Input
          label={dictionary.season}
          onChange={(event) => setSeason(event.target.value)}
          value={season}
        />
        <Button fullWidth type="submit">
          {dictionary.apply}
        </Button>
      </form>

      <section className="space-y-3">
        <Checkbox
          checked={searchParams.in_stock === 'true'}
          label={dictionary.inStock}
          onCheckedChange={() =>
            pushFilter('in_stock', searchParams.in_stock === 'true' ? undefined : 'true')
          }
        />
        <Checkbox
          checked={searchParams.is_sale === 'true'}
          label={dictionary.sale}
          onCheckedChange={() =>
            pushFilter('is_sale', searchParams.is_sale === 'true' ? undefined : 'true')
          }
        />
        <Checkbox
          checked={searchParams.is_new === 'true'}
          label={dictionary.new}
          onCheckedChange={() =>
            pushFilter('is_new', searchParams.is_new === 'true' ? undefined : 'true')
          }
        />
      </section>
    </aside>
  );
}
