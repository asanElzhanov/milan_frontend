import type { AppLocale } from '@/shared/config';

export type ProductReviewDictionary = {
  reviews: string;
  writeReview: string;
  rating: string;
  title: string;
  text: string;
  advantages: string;
  disadvantages: string;
  submit: string;
  submitting: string;
  authRequiredTitle: string;
  authRequiredDescription: string;
  login: string;
  noReviews: string;
  firstReview: string;
  reviewCreated: string;
  reviewModeration: string;
  createError: string;
  loadError: string;
  retry: string;
  ratingRequired: string;
  textRequired: string;
  pending: string;
  approved: string;
  rejected: string;
  published: string;
  hidden: string;
  anonymous: string;
  endpointPending: string;
};

const dictionaries: Record<AppLocale, ProductReviewDictionary> = {
  ru: {
    reviews: 'Отзывы',
    writeReview: 'Оставить отзыв',
    rating: 'Оценка',
    title: 'Заголовок',
    text: 'Комментарий',
    advantages: 'Плюсы',
    disadvantages: 'Минусы',
    submit: 'Отправить отзыв',
    submitting: 'Отправляем отзыв',
    authRequiredTitle: 'Войдите, чтобы оставить отзыв',
    authRequiredDescription: 'Отзывы могут оставлять только авторизованные пользователи.',
    login: 'Войти',
    noReviews: 'Отзывов пока нет',
    firstReview: 'Станьте первым, кто оставит отзыв об этом товаре.',
    reviewCreated: 'Отзыв отправлен',
    reviewModeration: 'Отзыв появится после проверки модератором.',
    createError: 'Не удалось отправить отзыв',
    loadError: 'Не удалось загрузить отзывы',
    retry: 'Повторить',
    ratingRequired: 'Выберите оценку',
    textRequired: 'Напишите комментарий',
    pending: 'На модерации',
    approved: 'Одобрен',
    rejected: 'Отклонён',
    published: 'Опубликован',
    hidden: 'Скрыт',
    anonymous: 'Покупатель',
    endpointPending: 'Создание отзывов будет доступно при подключении real API.',
  },
  kk: {
    reviews: 'Пікірлер',
    writeReview: 'Пікір қалдыру',
    rating: 'Баға',
    title: 'Тақырып',
    text: 'Пікір',
    advantages: 'Артықшылықтары',
    disadvantages: 'Кемшіліктері',
    submit: 'Пікір жіберу',
    submitting: 'Пікір жіберілуде',
    authRequiredTitle: 'Пікір қалдыру үшін кіріңіз',
    authRequiredDescription: 'Пікірді тек авторизацияланған пайдаланушылар қалдыра алады.',
    login: 'Кіру',
    noReviews: 'Әзірге пікір жоқ',
    firstReview: 'Бұл тауарға бірінші болып пікір қалдырыңыз.',
    reviewCreated: 'Пікір жіберілді',
    reviewModeration: 'Пікір модератор тексергеннен кейін пайда болады.',
    createError: 'Пікірді жіберу мүмкін болмады',
    loadError: 'Пікірлерді жүктеу мүмкін болмады',
    retry: 'Қайталау',
    ratingRequired: 'Баға таңдаңыз',
    textRequired: 'Пікір жазыңыз',
    pending: 'Модерацияда',
    approved: 'Мақұлданды',
    rejected: 'Қабылданбады',
    published: 'Жарияланды',
    hidden: 'Жасырылды',
    anonymous: 'Сатып алушы',
    endpointPending: 'Пікір жіберу real API қосылғанда қолжетімді болады.',
  },
};

export const getProductReviewDictionary = (locale: AppLocale) => dictionaries[locale];
