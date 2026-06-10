import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/lib';

import type { FooterLinkGroup } from '../model/types';

export const getFooterLinkGroups = (locale: AppLocale): FooterLinkGroup[] => [
  {
    title: 'Навигация',
    links: [
      { label: 'Каталог', href: withLocale(locale, '/catalog') },
      { label: 'О бренде', href: withLocale(locale, '/about') },
      { label: 'Доставка и оплата', href: withLocale(locale, '/delivery') },
      { label: 'Вопросы и ответы', href: withLocale(locale, '/faq') },
      { label: 'Контакты', href: withLocale(locale, '/contacts') },
    ],
  },
  {
    title: 'Покупателям',
    links: [
      { label: 'Профиль', href: withLocale(locale, '/account') },
      { label: 'Заказы', href: withLocale(locale, '/account') },
      { label: 'Возврат', href: withLocale(locale, '/delivery') },
      { label: 'Политика конфиденциальности', href: withLocale(locale, '/privacy') },
      { label: 'Публичная оферта', href: withLocale(locale, '/terms') },
    ],
  },
];
