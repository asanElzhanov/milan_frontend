import { cn } from '@/shared/lib';

import type { HomeBanner } from './home.types';

type HomeBannerMediaProps = {
  banner: HomeBanner;
  className?: string;
};

type MediaProps = {
  url: string;
  type: 'image' | 'video';
  className?: string;
};

function Media({ className, type, url }: MediaProps) {
  if (type === 'video') {
    return (
      <video
        aria-hidden
        autoPlay
        className={cn('absolute inset-0 h-full w-full object-cover', className)}
        loop
        muted
        playsInline
        preload="metadata"
        src={url}
      />
    );
  }

  return (
    // Banner media is already resized by the backend and may be animated (GIF).
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden
      className={cn('absolute inset-0 h-full w-full object-cover', className)}
      src={url}
    />
  );
}

export function HomeBannerMedia({ banner, className }: HomeBannerMediaProps) {
  if (!banner.imageUrl) {
    return null;
  }

  const hasMobileMedia = Boolean(banner.imageMobileUrl);

  return (
    <div aria-hidden className={cn('absolute inset-0', className)}>
      <Media
        className={hasMobileMedia ? 'hidden md:block' : undefined}
        type={banner.imageType}
        url={banner.imageUrl}
      />
      {banner.imageMobileUrl ? (
        <Media
          className="md:hidden"
          type={banner.imageMobileType ?? 'image'}
          url={banner.imageMobileUrl}
        />
      ) : null}
    </div>
  );
}
