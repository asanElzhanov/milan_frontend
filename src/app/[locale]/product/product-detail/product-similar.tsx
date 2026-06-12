import type { ProductListItem } from '@/entities/product';
import type { AppLocale } from '@/shared/config';
import { SectionTitle } from '@/shared/ui';
import { ProductGrid } from '@/widgets/product-grid';

import type { ProductDetailDictionary } from './product-detail.types';

type ProductSimilarProps = {
  dictionary: ProductDetailDictionary;
  locale: AppLocale;
  products: ProductListItem[];
};

export function ProductSimilar({ dictionary, locale, products }: ProductSimilarProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-10">
      <SectionTitle title={dictionary.similar} />
      <ProductGrid locale={locale} products={products.slice(0, 4)} />
    </section>
  );
}
