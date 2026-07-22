import { cn } from '@/shared/lib';

export type ProductColorDotsProps = {
  colors?: string[];
  maxVisible?: number;
  className?: string;
  ariaLabel?: string;
};

const isHex = (value: string): boolean => /^#(?:[0-9a-f]{3}){1,2}$/i.test(value.trim());

export function ProductColorDots({
  ariaLabel = 'Available colors',
  className,
  colors = [],
  maxVisible = 4,
}: ProductColorDotsProps) {
  if (colors.length === 0) {
    return null;
  }

  const visibleColors = colors.slice(0, maxVisible);
  const hiddenCount = Math.max(0, colors.length - visibleColors.length);

  return (
    <div className={cn('flex items-center gap-1.5', className)} aria-label={ariaLabel}>
      {visibleColors.map((color) => {
        const normalizedColor = color.trim();
        const hexColor = isHex(normalizedColor) ? normalizedColor : undefined;

        return (
          <span
            aria-label={normalizedColor}
            className="h-3.5 w-3.5 rounded-full border border-sara-beige-dark"
            key={normalizedColor}
            role="img"
            style={{ backgroundColor: hexColor ?? '#f4eee6' }}
            title={normalizedColor}
          />
        );
      })}
      {hiddenCount > 0 ? (
        <span className="text-xs text-sara-graphite/55">+{hiddenCount}</span>
      ) : null}
    </div>
  );
}
