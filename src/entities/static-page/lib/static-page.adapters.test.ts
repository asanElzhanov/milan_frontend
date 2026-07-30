import { describe, expect, it } from 'vitest';

import { adaptStaticPage } from './static-page.adapters';

const pageResponse = {
  id: 1,
  slug: 'delivery',
  title_ru: 'Доставка',
  title_kz: 'Жеткізу',
  title_en: 'Delivery',
  content_ru: 'Вводный текст',
  content_kz: '',
  content_en: 'Introduction',
  seo_title: 'Доставка',
  seo_description: 'Условия доставки',
  blocks: [
    {
      id: 10,
      title_ru: 'По городу',
      title_kz: '',
      title_en: 'City delivery',
      content_ru: 'Основной текст',
      content_kz: '',
      content_en: 'Main text',
      sort_order: 10,
    },
  ],
};

describe('static page adapter', () => {
  it('localizes a page and its blocks', () => {
    expect(adaptStaticPage(pageResponse, 'en')).toMatchObject({
      slug: 'delivery',
      title: 'Delivery',
      content: 'Introduction',
      blocks: [{ id: 10, title: 'City delivery', content: 'Main text', sortOrder: 10 }],
    });
  });

  it('uses the _kz API fields for kk and falls back to Russian', () => {
    expect(adaptStaticPage(pageResponse, 'kk')).toMatchObject({
      title: 'Жеткізу',
      content: 'Вводный текст',
      blocks: [{ title: 'По городу', content: 'Основной текст' }],
    });
  });

  it('rejects unknown page slugs', () => {
    expect(adaptStaticPage({ ...pageResponse, slug: 'privacy' }, 'ru')).toBeNull();
  });
});
