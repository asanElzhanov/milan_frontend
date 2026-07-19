export type Brand = {
  id: string | number;
  name: string;
  name_ru?: string | null;
  name_kz?: string | null;
  name_en?: string | null;
  slug: string;
  description?: string | null;
  logoUrl?: string | null;
  isActive?: boolean;
};
