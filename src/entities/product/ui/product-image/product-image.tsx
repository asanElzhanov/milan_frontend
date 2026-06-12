'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { cn, getMediaUrl, IMAGE_FALLBACK } from '@/shared/lib';

export type ProductImageProps = {
  src?: string | null;
  alt: string;
  hoverSrc?: string | null;
  href?: string;
  priority?: boolean;
  aspectRatio?: 'portrait' | 'square' | 'wide';
  className?: string;
  imageClassName?: string;
};

const aspectRatioClasses = {
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
  wide: 'aspect-[4/3]',
};

export function ProductImage({
  alt,
  aspectRatio = 'portrait',
  className,
  hoverSrc,
  href,
  imageClassName,
  priority = false,
  src,
}: ProductImageProps) {
  const [primaryFailed, setPrimaryFailed] = useState(false);
  const [hoverFailed, setHoverFailed] = useState(false);
  const imageSrc = primaryFailed ? IMAGE_FALLBACK : getMediaUrl(src);
  const hoverImageSrc = hoverSrc && !hoverFailed ? getMediaUrl(hoverSrc) : null;

  const content = (
    <div
      className={cn(
        'group relative overflow-hidden border border-sara-beige-dark bg-sara-beige',
        aspectRatioClasses[aspectRatio],
        className,
      )}
    >
      <Image
        alt={alt}
        className={cn(
          'object-cover transition-transform duration-300 group-hover:scale-[1.03]',
          imageClassName,
        )}
        fill
        onError={() => setPrimaryFailed(true)}
        priority={priority}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        src={imageSrc}
        unoptimized={imageSrc.startsWith('http')}
      />
      {hoverImageSrc ? (
        <Image
          alt=""
          aria-hidden
          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          fill
          onError={() => setHoverFailed(true)}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          src={hoverImageSrc}
          unoptimized={hoverImageSrc.startsWith('http')}
        />
      ) : null}
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link className="sara-focus block" href={href}>
      {content}
    </Link>
  );
}
