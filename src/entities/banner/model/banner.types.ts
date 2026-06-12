export type Banner = {
  id: string | number;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  position?: string | null;
  imageUrl?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  isActive?: boolean;
  sortOrder?: number | null;
};
