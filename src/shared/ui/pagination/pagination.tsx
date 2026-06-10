import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/shared/lib';

import { Button } from '../button';

export type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  showPrevNext?: boolean;
  siblingCount?: number;
  className?: string;
};

const getRange = (start: number, end: number): number[] =>
  Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);

export function Pagination({
  className,
  disabled = false,
  onPageChange,
  page,
  showPrevNext = true,
  siblingCount = 1,
  totalPages,
}: PaginationProps) {
  const start = Math.max(1, page - siblingCount);
  const end = Math.min(totalPages, page + siblingCount);
  const pages = getRange(start, end);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-2', className)}
    >
      {showPrevNext ? (
        <Button
          aria-label="Previous page"
          disabled={disabled || page <= 1}
          onClick={() => onPageChange(page - 1)}
          size="icon"
          variant="outline"
        >
          <ChevronLeft aria-hidden className="h-4 w-4" />
        </Button>
      ) : null}
      {pages.map((item) => (
        <Button
          aria-current={item === page ? 'page' : undefined}
          disabled={disabled}
          key={item}
          onClick={() => onPageChange(item)}
          size="icon"
          variant={item === page ? 'primary' : 'outline'}
        >
          {item}
        </Button>
      ))}
      {showPrevNext ? (
        <Button
          aria-label="Next page"
          disabled={disabled || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          size="icon"
          variant="outline"
        >
          <ChevronRight aria-hidden className="h-4 w-4" />
        </Button>
      ) : null}
    </nav>
  );
}
