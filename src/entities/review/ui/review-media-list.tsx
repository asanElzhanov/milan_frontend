/* eslint-disable @next/next/no-img-element */

import type { ReviewMedia } from '../model/review.types';

export function ReviewMediaList({
  attachmentLabel,
  media,
}: {
  attachmentLabel: string;
  media: ReviewMedia[];
}) {
  if (media.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {media.map((item, index) =>
        item.mediaType === 'video' ? (
          <video
            className="aspect-square w-full bg-sara-black object-cover"
            controls
            key={item.id}
            preload="metadata"
            src={item.url}
          >
            {attachmentLabel}
          </video>
        ) : (
          <img
            alt={`${attachmentLabel} ${index + 1}`}
            className="aspect-square w-full bg-sara-beige object-cover"
            key={item.id}
            loading="lazy"
            src={item.url}
          />
        ),
      )}
    </div>
  );
}
