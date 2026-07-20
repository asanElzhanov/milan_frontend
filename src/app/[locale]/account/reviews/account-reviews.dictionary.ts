import type { AppLocale } from '@/shared/config';

export type AccountReviewsDictionary = {
  title: string;
  subtitle: string;
  emptyTitle: string;
  emptyDescription: string;
  goToCatalog: string;
  loadError: string;
  retry: string;
  loading: string;
  pending: string;
  approved: string;
  rejected: string;
  published: string;
  hidden: string;
  anonymous: string;
  viewProduct: string;
  advantages: string;
  disadvantages: string;
};

const dictionaries: Record<AppLocale, AccountReviewsDictionary> = {
  ru: {
    title: 'Мои отзывы',
    subtitle: 'Здесь отображаются ваши отзывы и их статус модерации.',
    emptyTitle: 'Вы ещё не оставляли отзывы',
    emptyDescription: 'После покупки товара вы сможете поделиться впечатлениями.',
    goToCatalog: 'Перейти в каталог',
    loadError: 'Не удалось загрузить отзывы',
    retry: 'Повторить',
    loading: 'Загружаем отзывы',
    pending: 'На модерации',
    approved: 'Одобрен',
    rejected: 'Отклонён',
    published: 'Опубликован',
    hidden: 'Скрыт',
    anonymous: 'Покупатель',
    viewProduct: 'Открыть товар',
    advantages: 'Плюсы',
    disadvantages: 'Минусы',
  },
  kk: {
    title: 'Менің пікірлерім',
    subtitle: 'Бұл жерде пікірлеріңіз және модерация статусы көрсетіледі.',
    emptyTitle: 'Сіз әлі пікір қалдырмадыңыз',
    emptyDescription: 'Тауар сатып алғаннан кейін пікір қалдыра аласыз.',
    goToCatalog: 'Каталогқа өту',
    loadError: 'Пікірлерді жүктеу мүмкін болмады',
    retry: 'Қайталау',
    loading: 'Пікірлер жүктелуде',
    pending: 'Модерацияда',
    approved: 'Мақұлданды',
    rejected: 'Қабылданбады',
    published: 'Жарияланды',
    hidden: 'Жасырылды',
    anonymous: 'Сатып алушы',
    viewProduct: 'Тауарды ашу',
    advantages: 'Артықшылықтары',
    disadvantages: 'Кемшіліктері',
  },
  en: {
    title: 'My reviews',
    subtitle: 'Your reviews and their moderation status appear here.',
    emptyTitle: "You haven't submitted any reviews yet",
    emptyDescription: 'After purchasing a product, you can share your experience.',
    goToCatalog: 'Browse catalog',
    loadError: 'Unable to load reviews',
    retry: 'Try again',
    loading: 'Loading reviews',
    pending: 'Pending moderation',
    approved: 'Approved',
    rejected: 'Rejected',
    published: 'Published',
    hidden: 'Hidden',
    anonymous: 'Customer',
    viewProduct: 'View product',
    advantages: 'Pros',
    disadvantages: 'Cons',
  },
};

export const getAccountReviewsDictionary = (locale: AppLocale) => dictionaries[locale];
