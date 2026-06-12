export type Category = {
  id: string | number;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  parentId?: string | number | null;
  isActive?: boolean;
  children?: Category[];
};
