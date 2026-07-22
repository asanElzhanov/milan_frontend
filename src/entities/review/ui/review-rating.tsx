import { RatingStars } from '@/shared/ui';
import { DEFAULT_LOCALE, type AppLocale } from '@/shared/config';

export function ReviewRating({
  rating,
  locale = DEFAULT_LOCALE,
}: {
  rating: number;
  locale?: AppLocale;
}) {
  const ariaLabel =
    locale === 'ru'
      ? `Рейтинг ${rating} из 5`
      : locale === 'kk'
        ? `Рейтинг: ${rating} / 5`
        : `Rating ${rating} out of 5`;
  return <RatingStars ariaLabel={ariaLabel} showValue value={rating} />;
}
