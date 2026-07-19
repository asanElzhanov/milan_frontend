export type Category = {
  id: string | number;
  name: string;
  name_ru?: string | null;
  name_kz?: string | null;
  name_en?: string | null;
  slug: string;
  description?: string | null;
  description_ru?: string | null;
  description_kz?: string | null;
  description_en?: string | null;
  imageUrl?: string | null;
  parentId?: string | number | null;
  isActive?: boolean;
  children?: Category[];
};
