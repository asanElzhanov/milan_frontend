export type Brand = {
  id: string | number;
  name: string;
  slug: string;
  description?: string | null;
  logoUrl?: string | null;
  isActive?: boolean;
};
