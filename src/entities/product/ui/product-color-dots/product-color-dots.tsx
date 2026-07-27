import { cn } from '@/shared/lib';

import type { ProductColorSwatch } from '../../model/product.types';

export type ProductColorDotsProps = {
  colors?: string[];
  swatches?: ProductColorSwatch[];
  maxVisible?: number;
  className?: string;
  ariaLabel?: string;
};

const HEX_PATTERN = /^#(?:[0-9a-f]{3}){1,2}$/i;

const isHex = (value: string): boolean => HEX_PATTERN.test(value.trim());

// Fallback map for common color names (ru/kk/en) so swatches still render a
// recognisable color when the backend does not provide a hex code.
const NAMED_COLORS: Record<string, string> = {
  черный: '#1a1a1a',
  чёрный: '#1a1a1a',
  қара: '#1a1a1a',
  black: '#1a1a1a',
  белый: '#ffffff',
  ақ: '#ffffff',
  white: '#ffffff',
  серый: '#9ca3af',
  сұр: '#9ca3af',
  gray: '#9ca3af',
  grey: '#9ca3af',
  красный: '#c0392b',
  қызыл: '#c0392b',
  red: '#c0392b',
  синий: '#2c3e79',
  көк: '#2c3e79',
  blue: '#2c3e79',
  голубой: '#7bb0d6',
  зеленый: '#2e7d4f',
  зелёный: '#2e7d4f',
  жасыл: '#2e7d4f',
  green: '#2e7d4f',
  желтый: '#e1b12c',
  жёлтый: '#e1b12c',
  сары: '#e1b12c',
  yellow: '#e1b12c',
  бежевый: '#d8c3a5',
  бежевый_светлый: '#e8dcc8',
  beige: '#d8c3a5',
  коричневый: '#8b5a2b',
  қоңыр: '#8b5a2b',
  brown: '#8b5a2b',
  розовый: '#e39ab0',
  pink: '#e39ab0',
  бордовый: '#7b1e2b',
  фиолетовый: '#7d5ba6',
  purple: '#7d5ba6',
  оранжевый: '#e2762e',
  orange: '#e2762e',
  золотой: '#c8a24a',
  gold: '#c8a24a',
  серебряный: '#c9ccce',
  silver: '#c9ccce',
};

const DEFAULT_SWATCH_COLOR = '#f4eee6';

const resolveColor = (swatch: ProductColorSwatch): string => {
  if (swatch.hex && isHex(swatch.hex)) {
    return swatch.hex;
  }

  const name = swatch.name.trim();

  if (isHex(name)) {
    return name;
  }

  return NAMED_COLORS[name.toLowerCase()] ?? DEFAULT_SWATCH_COLOR;
};

export function ProductColorDots({
  ariaLabel = 'Available colors',
  className,
  colors,
  maxVisible = 4,
  swatches,
}: ProductColorDotsProps) {
  const resolvedSwatches: ProductColorSwatch[] =
    swatches && swatches.length > 0
      ? swatches
      : (colors ?? []).map((color) => ({
          name: color,
          hex: isHex(color) ? color.trim() : null,
        }));

  if (resolvedSwatches.length === 0) {
    return null;
  }

  const visibleSwatches = resolvedSwatches.slice(0, maxVisible);
  const hiddenCount = Math.max(0, resolvedSwatches.length - visibleSwatches.length);

  return (
    <div className={cn('flex items-center gap-1.5', className)} aria-label={ariaLabel}>
      {visibleSwatches.map((swatch, index) => {
        const label = swatch.name.trim() || swatch.hex || '';

        return (
          <span
            aria-label={label}
            className="h-3.5 w-3.5 rounded-full border border-sara-beige-dark"
            key={`${label}-${index}`}
            role="img"
            style={{ backgroundColor: resolveColor(swatch) }}
            title={label}
          />
        );
      })}
      {hiddenCount > 0 ? (
        <span className="text-xs text-sara-graphite/55">+{hiddenCount}</span>
      ) : null}
    </div>
  );
}
