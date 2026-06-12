'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib';

import type { ProductGalleryItem } from './product-detail.types';

type ProductDetailGalleryProps = {
  items: ProductGalleryItem[];
  productName: string;
};

export function ProductDetailGallery({ items, productName }: ProductDetailGalleryProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  if (!activeItem) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="sara-card overflow-hidden bg-sara-beige">
        {activeItem.type === 'video' ? (
          <video
            className="aspect-square w-full object-cover"
            controls
            poster={items.find((item) => item.type === 'image')?.url}
            src={activeItem.url}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={activeItem.alt ?? productName}
            className="aspect-square w-full object-cover"
            src={activeItem.url}
          />
        )}
      </div>

      {items.length > 1 ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {items.map((item) => (
            <button
              aria-label={item.alt ?? productName}
              className={cn(
                'sara-focus aspect-square overflow-hidden border bg-sara-beige',
                item.id === activeItem.id ? 'border-sara-graphite' : 'border-sara-beige-dark',
              )}
              key={item.id}
              onClick={() => setActiveId(item.id)}
              type="button"
            >
              {item.type === 'video' ? (
                <span className="flex h-full w-full items-center justify-center bg-sara-black text-xs font-medium uppercase tracking-[0.16em] text-sara-white">
                  Video
                </span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={item.alt ?? productName}
                  className="h-full w-full object-cover"
                  src={item.url}
                />
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
