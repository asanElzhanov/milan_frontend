import type { ProductDetail, ProductVariant } from '@/entities/product';

const unique = (values: Array<string | null | undefined>): string[] =>
  Array.from(new Set(values.filter((value): value is string => Boolean(value))));

export function getAvailableColors(product: ProductDetail): string[] {
  const variantColors = unique(product.variants?.map((variant) => variant.color) ?? []);

  return variantColors.length > 0 ? variantColors : (product.availableColors ?? []);
}

export function getAvailableSizes(product: ProductDetail, selectedColor?: string | null): string[] {
  const variants = product.variants ?? [];

  if (variants.length > 0) {
    const filtered = selectedColor
      ? variants.filter((variant) => variant.color === selectedColor)
      : variants;

    return unique(filtered.map((variant) => variant.size));
  }

  return product.availableSizes ?? [];
}

export function resolveSelectedVariant(args: {
  product: ProductDetail;
  selectedColor?: string | null;
  selectedSize?: string | null;
}): ProductVariant | null {
  const variants = args.product.variants ?? [];

  if (variants.length === 0) {
    return null;
  }

  return (
    variants.find(
      (variant) =>
        (!args.selectedColor || variant.color === args.selectedColor) &&
        (!args.selectedSize || variant.size === args.selectedSize),
    ) ?? null
  );
}

export function isVariantInStock(variant?: ProductVariant | null): boolean {
  if (!variant) {
    return false;
  }

  if (typeof variant.inStock === 'boolean') {
    return variant.inStock;
  }

  return (variant.stockQuantity ?? 0) > 0;
}

export function getVariantStockQuantity(variant?: ProductVariant | null): number | null {
  return typeof variant?.stockQuantity === 'number' ? variant.stockQuantity : null;
}
