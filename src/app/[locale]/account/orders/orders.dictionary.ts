import type { AppLocale } from '@/shared/config';

export type OrdersDictionary = {
  title: string;
  subtitle: string;
  emptyTitle: string;
  emptyDescription: string;
  goToCatalog: string;
  order: string;
  orderDate: string;
  status: string;
  paymentStatus: string;
  items: string;
  total: string;
  details: string;
  continuePayment: string;
  repeatPayment: string;
  backToOrders: string;
  delivery: string;
  deliveryAddress: string;
  payment: string;
  customer: string;
  comment: string;
  subtotal: string;
  discount: string;
  deliveryPrice: string;
  loading: string;
  loadError: string;
  orderNotFound: string;
  created: string;
  processing: string;
  confirmed: string;
  packed: string;
  shipped: string;
  delivered: string;
  completed: string;
  cancelled: string;
  failed: string;
  paymentPending: string;
  paid: string;
  paymentFailed: string;
  provider: string;
  method: string;
  noData: string;
};

const ordersDictionary = {
  ru: {
    title: 'Заказы',
    subtitle: 'История ваших заказов и статусы оплаты.',
    emptyTitle: 'Заказов пока нет',
    emptyDescription: 'Когда вы оформите заказ, он появится здесь.',
    goToCatalog: 'Перейти в каталог',
    order: 'Заказ',
    orderDate: 'Дата заказа',
    status: 'Статус',
    paymentStatus: 'Оплата',
    items: 'Товары',
    total: 'Итого',
    details: 'Подробнее',
    continuePayment: 'Продолжить оплату',
    repeatPayment: 'Повторить оплату',
    backToOrders: 'Назад к заказам',
    delivery: 'Доставка',
    deliveryAddress: 'Адрес доставки',
    payment: 'Оплата',
    customer: 'Получатель',
    comment: 'Комментарий',
    subtotal: 'Подытог',
    discount: 'Скидка',
    deliveryPrice: 'Доставка',
    loading: 'Загружаем заказы',
    loadError: 'Не удалось загрузить заказы',
    orderNotFound: 'Заказ не найден',
    created: 'Создан',
    processing: 'В обработке',
    confirmed: 'Подтвержден',
    packed: 'Собран',
    shipped: 'Отправлен',
    delivered: 'Доставлен',
    completed: 'Завершен',
    cancelled: 'Отменен',
    failed: 'Ошибка',
    paymentPending: 'Ожидает оплаты',
    paid: 'Оплачен',
    paymentFailed: 'Ошибка оплаты',
    provider: 'Провайдер',
    method: 'Способ',
    noData: 'Не указано',
  },
  kk: {
    title: 'Тапсырыстар',
    subtitle: 'Тапсырыстарыңыздың тарихы және төлем статустары.',
    emptyTitle: 'Әзірге тапсырыс жоқ',
    emptyDescription: 'Тапсырыс рәсімдегеннен кейін ол осы жерде пайда болады.',
    goToCatalog: 'Каталогқа өту',
    order: 'Тапсырыс',
    orderDate: 'Тапсырыс күні',
    status: 'Статус',
    paymentStatus: 'Төлем',
    items: 'Тауарлар',
    total: 'Жалпы',
    details: 'Толығырақ',
    continuePayment: 'Төлемді жалғастыру',
    repeatPayment: 'Төлемді қайталау',
    backToOrders: 'Тапсырыстарға оралу',
    delivery: 'Жеткізу',
    deliveryAddress: 'Жеткізу мекенжайы',
    payment: 'Төлем',
    customer: 'Алушы',
    comment: 'Пікір',
    subtotal: 'Аралық сома',
    discount: 'Жеңілдік',
    deliveryPrice: 'Жеткізу',
    loading: 'Тапсырыстар жүктелуде',
    loadError: 'Тапсырыстарды жүктеу мүмкін болмады',
    orderNotFound: 'Тапсырыс табылмады',
    created: 'Жасалды',
    processing: 'Өңделуде',
    confirmed: 'Расталды',
    packed: 'Жиналды',
    shipped: 'Жіберілді',
    delivered: 'Жеткізілді',
    completed: 'Аяқталды',
    cancelled: 'Бас тартылды',
    failed: 'Қате',
    paymentPending: 'Төлем күтілуде',
    paid: 'Төленді',
    paymentFailed: 'Төлем қатесі',
    provider: 'Провайдер',
    method: 'Әдіс',
    noData: 'Көрсетілмеген',
  },
  en: {
    title: 'Orders',
    subtitle: 'Your order history and payment statuses.',
    emptyTitle: 'No orders yet',
    emptyDescription: 'Your orders will appear here after checkout.',
    goToCatalog: 'Browse catalog',
    order: 'Order',
    orderDate: 'Order date',
    status: 'Status',
    paymentStatus: 'Payment',
    items: 'Items',
    total: 'Total',
    details: 'View details',
    continuePayment: 'Continue payment',
    repeatPayment: 'Retry payment',
    backToOrders: 'Back to orders',
    delivery: 'Delivery',
    deliveryAddress: 'Delivery address',
    payment: 'Payment',
    customer: 'Recipient',
    comment: 'Comment',
    subtotal: 'Subtotal',
    discount: 'Discount',
    deliveryPrice: 'Delivery',
    loading: 'Loading orders',
    loadError: 'Unable to load orders',
    orderNotFound: 'Order not found',
    created: 'Created',
    processing: 'Processing',
    confirmed: 'Confirmed',
    packed: 'Packed',
    shipped: 'Shipped',
    delivered: 'Delivered',
    completed: 'Completed',
    cancelled: 'Cancelled',
    failed: 'Failed',
    paymentPending: 'Awaiting payment',
    paid: 'Paid',
    paymentFailed: 'Payment failed',
    provider: 'Provider',
    method: 'Method',
    noData: 'Not specified',
  },
} as const satisfies Record<AppLocale, OrdersDictionary>;

export const getOrdersDictionary = (locale: AppLocale): OrdersDictionary =>
  ordersDictionary[locale];

export const getOrderStatusLabels = (labels: OrdersDictionary) => ({
  created: labels.created,
  pending: labels.created,
  processing: labels.processing,
  confirmed: labels.confirmed,
  packed: labels.packed,
  shipped: labels.shipped,
  delivered: labels.delivered,
  completed: labels.completed,
  cancelled: labels.cancelled,
  failed: labels.failed,
});

export const getPaymentStatusLabels = (labels: OrdersDictionary) => ({
  pending: labels.paymentPending,
  payment_pending: labels.paymentPending,
  paid: labels.paid,
  failed: labels.paymentFailed,
  cancelled: labels.cancelled,
  refunded: labels.paymentFailed,
  not_required: labels.paid,
});
