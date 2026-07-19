export type ProductSize = {
  id: string | number;
  name: string;
  name_ru?: string | null;
  name_kz?: string | null;
  name_en?: string | null;
  value?: string;
  slug?: string;
  sortOrder?: number | null;
  isActive?: boolean;
};
