import type { AppLocale } from '@/shared/config';

export type ProductReviewDictionary = {
  reviews: string;
  writeReview: string;
  rating: string;
  orderNumber: string;
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
  orderNumberRequired: string;
  textRequired: string;
  pending: string;
  approved: string;
  rejected: string;
  published: string;
  hidden: string;
  anonymous: string;
  endpointPending: string;
  checkingPurchase: string;
  purchaseRequiredTitle: string;
  purchaseRequiredDescription: string;
  purchaseCheckErrorTitle: string;
  orderMustContainProduct: string;
  previous: string;
  next: string;
};

const dictionaries: Record<AppLocale | 'en', ProductReviewDictionary> = {
  ru: {
    reviews: 'Отзывы',
    writeReview: 'Оставить отзыв',
    rating: 'Оценка',
    orderNumber: 'Номер заказа',
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
    orderNumberRequired: 'Укажите номер заказа',
    textRequired: 'Напишите комментарий',
    pending: 'На модерации',
    approved: 'Одобрен',
    rejected: 'Отклонён',
    published: 'Опубликован',
    hidden: 'Скрыт',
    anonymous: 'Покупатель',
    endpointPending:
      'Создание отзывов будет доступно при подключении real API.',
    checkingPurchase: 'Проверяем ваши заказы',
    purchaseRequiredTitle: 'Отзыв доступен после заказа',
    purchaseRequiredDescription:
      'Вы сможете оставить отзыв после того, как оформите заказ с этим товаром.',
    purchaseCheckErrorTitle: 'Не удалось проверить заказы',
    orderMustContainProduct: 'Укажите номер заказа, в котором был этот товар',
    previous: 'Назад',
    next: 'Далее',
  },
  kk: {
    reviews: 'Пікірлер',
    writeReview: 'Пікір қалдыру',
    rating: 'Баға',
    orderNumber: 'Тапсырыс нөмірі',
    title: 'Тақырып',
    text: 'Пікір',
    advantages: 'Артықшылықтары',
    disadvantages: 'Кемшіліктері',
    submit: 'Пікір жіберу',
    submitting: 'Пікір жіберілуде',
    authRequiredTitle: 'Пікір қалдыру үшін кіріңіз',
    authRequiredDescription:
      'Пікірді тек авторизацияланған пайдаланушылар қалдыра алады.',
    login: 'Кіру',
    noReviews: 'Әзірге пікір жоқ',
    firstReview: 'Бұл тауарға бірінші болып пікір қалдырыңыз.',
    reviewCreated: 'Пікір жіберілді',
    reviewModeration: 'Пікір модератор тексергеннен кейін пайда болады.',
    createError: 'Пікірді жіберу мүмкін болмады',
    loadError: 'Пікірлерді жүктеу мүмкін болмады',
    retry: 'Қайталау',
    ratingRequired: 'Баға таңдаңыз',
    orderNumberRequired: 'Тапсырыс нөмірін көрсетіңіз',
    textRequired: 'Пікір жазыңыз',
    pending: 'Модерацияда',
    approved: 'Мақұлданды',
    rejected: 'Қабылданбады',
    published: 'Жарияланды',
    hidden: 'Жасырылды',
    anonymous: 'Сатып алушы',
    endpointPending:
      'Пікір жіберу real API қосылғанда қолжетімді болады.',
    checkingPurchase: 'Тапсырыстарыңызды тексеріп жатырмыз',
    purchaseRequiredTitle: 'Пікір тапсырыстан кейін қолжетімді',
    purchaseRequiredDescription:
      'Бұл тауарға тапсырыс жасағаннан кейін пікір қалдыра аласыз.',
    purchaseCheckErrorTitle: 'Тапсырыстарды тексеру мүмкін болмады',
    orderMustContainProduct: 'Осы тауар болған тапсырыс нөмірін көрсетіңіз',
    previous: 'Артқа',
    next: 'Келесі',
  },
  en: {
    reviews: 'Reviews', writeReview: 'Write a review', rating: 'Rating', orderNumber: 'Order number',
    title: 'Title', text: 'Review', advantages: 'Pros', disadvantages: 'Cons', submit: 'Submit review',
    submitting: 'Submitting review', authRequiredTitle: 'Sign in to write a review',
    authRequiredDescription: 'Only signed-in customers can write reviews.', login: 'Sign in',
    noReviews: 'No reviews yet', firstReview: 'Be the first to review this product.',
    reviewCreated: 'Review submitted',
    reviewModeration: 'Your review has been submitted for moderation',
    createError: 'Could not submit the review', loadError: 'Could not load reviews', retry: 'Retry',
    ratingRequired: 'Choose a rating', orderNumberRequired: 'Enter an order number',
    textRequired: 'Write your review', pending: 'Pending moderation', approved: 'Approved',
    rejected: 'Rejected', published: 'Published', hidden: 'Hidden', anonymous: 'Customer',
    endpointPending: 'Review submission is available when the real API is connected.',
    checkingPurchase: 'Checking your orders', purchaseRequiredTitle: 'Purchase required',
    purchaseRequiredDescription: 'You can review this product after an eligible purchase.',
    purchaseCheckErrorTitle: 'Could not verify your orders',
    orderMustContainProduct: 'Enter an eligible order that contains this product',
    previous: 'Previous', next: 'Next',
  },
};

export const getProductReviewDictionary = (locale: AppLocale) => dictionaries[locale];
