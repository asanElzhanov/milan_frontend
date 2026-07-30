export type StaticPageSlug = 'about' | 'delivery' | 'payment' | 'faq' | 'contacts';

export type StaticPageBlock = {
  id: number;
  title: string;
  content: string;
  sortOrder: number;
};

export type StaticPage = {
  id: number;
  slug: StaticPageSlug;
  title: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  blocks: StaticPageBlock[];
};
