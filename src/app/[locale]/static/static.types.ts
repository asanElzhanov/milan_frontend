export type StaticPageKey =
  | 'about'
  | 'delivery'
  | 'payment'
  | 'faq'
  | 'contacts'
  | 'privacy'
  | 'terms';

export type StaticPageContent = {
  title: string;
  subtitle?: string;
  metaTitle: string;
  metaDescription: string;
};

export type StaticSection = {
  title: string;
  body: string[];
};

export type StaticFaqItem = {
  question: string;
  answer: string;
};
