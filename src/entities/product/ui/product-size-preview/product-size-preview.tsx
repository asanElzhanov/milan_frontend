import { cn } from '@/shared/lib';

export type ProductSizePreviewProps = {
  sizes?: string[];
  maxVisible?: number;
  className?: string;
};

export function ProductSizePreview({
  className,
  maxVisible = 4,
  sizes = [],
}: ProductSizePreviewProps) {
  if (sizes.length === 0) {
    return null;
  }

  const visibleSizes = sizes.slice(0, maxVisible);
  const hiddenCount = Math.max(0, sizes.length - visibleSizes.length);

  return (
    <div
      className={cn('flex flex-wrap items-center gap-1.5', className)}
      aria-label="Доступные размеры"
    >
      {visibleSizes.map((size) => (
        <span
          className="border border-sara-beige-dark px-2 py-0.5 text-[0.7rem] text-sara-graphite/75"
          key={size}
        >
          {size}
        </span>
      ))}
      {hiddenCount > 0 ? (
        <span className="text-xs text-sara-graphite/55">+{hiddenCount}</span>
      ) : null}
    </div>
  );
}
