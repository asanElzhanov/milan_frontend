import type { ProductDetail, ProductVariant } from '@/entities/product';
import { Badge } from '@/shared/ui';

import type { ProductDetailDictionary } from './product-detail.types';
import { getVariantStockQuantity, isVariantInStock } from './variant-resolver';

type ProductStockProps = {
  dictionary: ProductDetailDictionary;
  product: ProductDetail;
  selectedVariant: ProductVariant | null;
};

export function ProductStock({ dictionary, product, selectedVariant }: ProductStockProps) {
  const hasVariants = (product.variants?.length ?? 0) > 0;
  const inStock = hasVariants ? isVariantInStock(selectedVariant) : product.inStock !== false;
  const stockQuantity = getVariantStockQuantity(selectedVariant);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant={inStock ? 'success' : 'muted'}>
        {inStock ? dictionary.inStock : dictionary.outOfStock}
      </Badge>
      {stockQuantity !== null ? (
        <span className="text-sm text-sara-graphite/70">
          {dictionary.stockLeft}: {stockQuantity}
        </span>
      ) : null}
    </div>
  );
}
