import type { AppLocale } from '@/shared/config';

export type PaymentDictionary = {
  title: string;
  subtitle: string;
  order: string;
  provider: string;
  amount: string;
  status: string;
  payWithKaspi: string;
  payWithCard: string;
  continuePayment: string;
  checkStatus: string;
  pendingTitle: string;
  pendingDescription: string;
  successTitle: string;
  successDescription: string;
  failTitle: string;
  failDescription: string;
  paymentUnavailableTitle: string;
  paymentUnavailableDescription: string;
  statusUnavailableDescription: string;
  noRedirectDescription: string;
  stripeElementsRequired: string;
  startPaymentError: string;
  backToCatalog: string;
  goToOrders: string;
  backToCart: string;
};

const paymentDictionary = {
  ru: {
    title: 'Оплата заказа',
    subtitle: 'Выберите способ оплаты или продолжите оплату по ссылке.',
    order: 'Заказ',
    provider: 'Способ оплаты',
    amount: 'Сумма',
    status: 'Статус',
    payWithKaspi: 'Оплатить через Kaspi',
    payWithCard: 'Оплатить картой',
    continuePayment: 'Продолжить оплату',
    checkStatus: 'Проверить статус',
    pendingTitle: 'Ожидаем оплату',
    pendingDescription:
      'Если вы уже оплатили заказ, статус обновится после подтверждения платежа backend-системой.',
    successTitle: 'Оплата прошла успешно',
    successDescription: 'Спасибо за заказ. Мы свяжемся с вами для подтверждения.',
    failTitle: 'Оплата не прошла',
    failDescription: 'Попробуйте еще раз или выберите другой способ оплаты.',
    paymentUnavailableTitle: 'Оплата пока недоступна',
    paymentUnavailableDescription:
      'Endpoint статуса оплаты пока не подтвержден. Если заказ создан, оплату можно продолжить через подтвержденный provider endpoint.',
    statusUnavailableDescription:
      'Автоматическая проверка статуса оплаты ожидает подтверждения backend contract. Фронтенд не показывает неподтвержденный успешный статус.',
    noRedirectDescription:
      'Backend не вернул ссылку для оплаты. Проверьте статус заказа позже или обратитесь в Sara Milan.',
    stripeElementsRequired:
      'Stripe вернул client_secret. Для оплаты картой требуется подключить Stripe Elements; frontend не показывает фейковый успешный статус.',
    startPaymentError: 'Не удалось начать оплату',
    backToCatalog: 'Вернуться в каталог',
    goToOrders: 'Мои заказы',
    backToCart: 'Вернуться в корзину',
  },
  kk: {
    title: 'Тапсырысты төлеу',
    subtitle: 'Төлем әдісін таңдаңыз немесе төлем сілтемесі арқылы жалғастырыңыз.',
    order: 'Тапсырыс',
    provider: 'Төлем әдісі',
    amount: 'Сома',
    status: 'Статус',
    payWithKaspi: 'Kaspi арқылы төлеу',
    payWithCard: 'Картамен төлеу',
    continuePayment: 'Төлемді жалғастыру',
    checkStatus: 'Статусты тексеру',
    pendingTitle: 'Төлем күтілуде',
    pendingDescription:
      'Егер тапсырысты төлеген болсаңыз, статус backend жүйесі растағаннан кейін жаңарады.',
    successTitle: 'Төлем сәтті өтті',
    successDescription: 'Тапсырысыңыз үшін рақмет. Біз растау үшін хабарласамыз.',
    failTitle: 'Төлем орындалмады',
    failDescription: 'Қайталап көріңіз немесе басқа төлем әдісін таңдаңыз.',
    paymentUnavailableTitle: 'Төлем әзірге қолжетімсіз',
    paymentUnavailableDescription:
      'Төлем статусы endpoint әзірге расталмаған. Тапсырыс жасалса, төлемді расталған provider endpoint арқылы жалғастыруға болады.',
    statusUnavailableDescription:
      'Төлем статусын автоматты тексеру backend contract расталуын күтіп тұр. Фронтенд расталмаған сәтті статусты көрсетпейді.',
    noRedirectDescription:
      'Backend төлем сілтемесін қайтармады. Тапсырыс статусын кейінірек тексеріңіз немесе Sara Milan-ға хабарласыңыз.',
    stripeElementsRequired:
      'Stripe client_secret қайтарды. Картамен төлеу үшін Stripe Elements қосу қажет; frontend жалған сәтті статус көрсетпейді.',
    startPaymentError: 'Төлемді бастау мүмкін болмады',
    backToCatalog: 'Каталогқа қайту',
    goToOrders: 'Менің тапсырыстарым',
    backToCart: 'Себетке қайту',
  },
} as const satisfies Record<AppLocale, PaymentDictionary>;

export const getPaymentDictionary = (locale: AppLocale): PaymentDictionary =>
  paymentDictionary[locale];
