import type { ProductDetail, ProductVariant } from '@/entities/product';

const unique = (values: Array<string | null | undefined>): string[] =>
  Array.from(new Set(values.filter((value): value is string => Boolean(value))));

export type VariantOption = {
  value: string;
  inStock: boolean;
};

const hasColorDimension = (product: ProductDetail): boolean =>
  getAvailableColors(product).length > 0;

const hasSizeDimension = (product: ProductDetail): boolean => getAvailableSizes(product).length > 0;

export function getAvailableColors(product: ProductDetail): string[] {
  const variantColors = unique(product.variants?.map((variant) => variant.color) ?? []);

  return unique([...variantColors, ...(product.availableColors ?? [])]);
}

export function getAvailableSizes(product: ProductDetail): string[] {
  const variantSizes = unique(product.variants?.map((variant) => variant.size) ?? []);

  return unique([...variantSizes, ...(product.availableSizes ?? [])]);
}

export function getColorOptions(
  product: ProductDetail,
  selectedSize?: string | null,
): VariantOption[] {
  const variants = product.variants ?? [];

  return getAvailableColors(product).map((value) => ({
    value,
    inStock: variants.some(
      (variant) =>
        variant.color === value &&
        (!selectedSize || variant.size === selectedSize) &&
        isVariantInStock(variant),
    ),
  }));
}

export function getSizeOptions(
  product: ProductDetail,
  selectedColor?: string | null,
): VariantOption[] {
  const variants = product.variants ?? [];

  return getAvailableSizes(product).map((value) => ({
    value,
    inStock: variants.some(
      (variant) =>
        variant.size === value &&
        (!selectedColor || variant.color === selectedColor) &&
        isVariantInStock(variant),
    ),
  }));
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

  if (
    (hasColorDimension(args.product) && !args.selectedColor) ||
    (hasSizeDimension(args.product) && !args.selectedSize)
  ) {
    return null;
  }

  return (
    variants.find(
      (variant) =>
        (!hasColorDimension(args.product) || variant.color === args.selectedColor) &&
        (!hasSizeDimension(args.product) || variant.size === args.selectedSize),
    ) ?? null
  );
}

export function isVariantInStock(variant?: ProductVariant | null): boolean {
  if (!variant) {
    return false;
  }

  if (
    variant.inStock === false ||
    (variant.stockQuantity !== null &&
      variant.stockQuantity !== undefined &&
      variant.stockQuantity <= 0)
  ) {
    return false;
  }

  return variant.inStock === true || (variant.stockQuantity ?? 0) > 0;
}

export function getVariantStockQuantity(variant?: ProductVariant | null): number | null {
  return typeof variant?.stockQuantity === 'number' ? variant.stockQuantity : null;
}
