import { cn } from '@/shared/lib';
import { Badge } from '@/shared/ui';

export type ProductBadgesProps = {
  isNew?: boolean;
  isSale?: boolean;
  inStock?: boolean;
  discountPercent?: number | null;
  labels?: {
    new?: string;
    sale?: string;
    outOfStock?: string;
  };
  className?: string;
};

export function ProductBadges({
  className,
  discountPercent,
  inStock,
  isNew,
  isSale,
  labels,
}: ProductBadgesProps) {
  const saleLabel = discountPercent ? `-${discountPercent}%` : (labels?.sale ?? 'Скидка');

  if (!isNew && !isSale && !discountPercent && inStock !== false) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {isNew ? <Badge variant="bronze">{labels?.new ?? 'Новинка'}</Badge> : null}
      {isSale || discountPercent ? <Badge variant="danger">{saleLabel}</Badge> : null}
      {inStock === false ? (
        <Badge variant="muted">{labels?.outOfStock ?? 'Нет в наличии'}</Badge>
      ) : null}
    </div>
  );
}
