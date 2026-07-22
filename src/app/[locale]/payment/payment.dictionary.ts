import type { AppLocale } from '@/shared/config';

export type PaymentDictionary = {
  title: string;
  subtitle: string;
  order: string;
  provider: string;
  amount: string;
  status: string;
  payOnline: string;
  continuePayment: string;
  checkStatus: string;
  pendingTitle: string;
  pendingDescription: string;
  successTitle: string;
  successDescription: string;
  failTitle: string;
  failDescription: string;
  noRedirectDescription: string;
  startPaymentError: string;
  backToCatalog: string;
  goToOrders: string;
  backToCart: string;
};

const paymentDictionary = {
  ru: {
    title: 'Оплата заказа',
    subtitle: 'Оплатите заказ онлайн банковской картой через FreedomPay.',
    order: 'Заказ',
    provider: 'Оплата',
    amount: 'Сумма',
    status: 'Статус',
    payOnline: 'Оплатить онлайн',
    continuePayment: 'Онлайн-оплата',
    checkStatus: 'Проверить статус',
    pendingTitle: 'Ожидаем оплату',
    pendingDescription:
      'Нажмите «Оплатить онлайн», чтобы перейти на защищённую страницу FreedomPay. Статус обновится автоматически после оплаты.',
    successTitle: 'Оплата прошла успешно',
    successDescription: 'Спасибо за заказ. Мы свяжемся с вами для подтверждения.',
    failTitle: 'Оплата не прошла',
    failDescription: 'Попробуйте оплатить ещё раз.',
    noRedirectDescription:
      'Не удалось получить ссылку для оплаты. Попробуйте позже или обратитесь в Sara Milan.',
    startPaymentError: 'Не удалось начать оплату',
    backToCatalog: 'Вернуться в каталог',
    goToOrders: 'Мои заказы',
    backToCart: 'Вернуться в корзину',
  },
  kk: {
    title: 'Тапсырысты төлеу',
    subtitle: 'Тапсырысты FreedomPay арқылы онлайн банк картасымен төлеңіз.',
    order: 'Тапсырыс',
    provider: 'Төлем',
    amount: 'Сома',
    status: 'Статус',
    payOnline: 'Онлайн төлеу',
    continuePayment: 'Онлайн төлем',
    checkStatus: 'Статусты тексеру',
    pendingTitle: 'Төлем күтілуде',
    pendingDescription:
      'FreedomPay қорғалған бетіне өту үшін «Онлайн төлеу» түймесін басыңыз. Төлемнен кейін статус автоматты жаңарады.',
    successTitle: 'Төлем сәтті өтті',
    successDescription: 'Тапсырысыңыз үшін рақмет. Біз растау үшін хабарласамыз.',
    failTitle: 'Төлем орындалмады',
    failDescription: 'Қайтадан төлеп көріңіз.',
    noRedirectDescription:
      'Төлем сілтемесін алу мүмкін болмады. Кейінірек қайталаңыз немесе Sara Milan-ға хабарласыңыз.',
    startPaymentError: 'Төлемді бастау мүмкін болмады',
    backToCatalog: 'Каталогқа қайту',
    goToOrders: 'Менің тапсырыстарым',
    backToCart: 'Себетке қайту',
  },
  en: {
    title: 'Order payment',
    subtitle: 'Pay for your order online by bank card via FreedomPay.',
    order: 'Order',
    provider: 'Payment',
    amount: 'Amount',
    status: 'Status',
    payOnline: 'Pay online',
    continuePayment: 'Online payment',
    checkStatus: 'Check status',
    pendingTitle: 'Awaiting payment',
    pendingDescription:
      'Click “Pay online” to open the secure FreedomPay page. The status updates automatically after payment.',
    successTitle: 'Payment successful',
    successDescription: 'Thank you for your order. We will contact you to confirm it.',
    failTitle: 'Payment failed',
    failDescription: 'Please try to pay again.',
    noRedirectDescription:
      'Could not get a payment link. Try again later or contact Sara Milan.',
    startPaymentError: 'Unable to start payment',
    backToCatalog: 'Back to catalog',
    goToOrders: 'My orders',
    backToCart: 'Back to cart',
  },
} as const satisfies Record<AppLocale, PaymentDictionary>;

export const getPaymentDictionary = (locale: AppLocale): PaymentDictionary =>
  paymentDictionary[locale];
