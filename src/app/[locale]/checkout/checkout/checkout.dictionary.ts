import type { AppLocale } from '@/shared/config';

export type CheckoutDictionary = {
  metadataTitle: string;
  title: string;
  subtitle: string;
  contactTitle: string;
  deliveryTitle: string;
  addressTitle: string;
  savedAddress: string;
  manualAddress: string;
  deliveryMethodTitle: string;
  paymentTitle: string;
  commentTitle: string;
  summaryTitle: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  postalCode: string;
  recipientName: string;
  country: string;
  region: string;
  district: string;
  addressLine1: string;
  addressLine2: string;
  comment: string;
  orderCommentPlaceholder: string;
  freedom: string;
  paymentComingNext: string;
  submit: string;
  submitting: string;
  backToCart: string;
  continueShopping: string;
  emptyCartTitle: string;
  emptyCartDescription: string;
  deliveryMethodsEmpty: string;
  addressesEmpty: string;
  useManualAddress: string;
  requiredField: string;
  checkoutError: string;
  checkoutSuccess: string;
  managerCalculation: string;
  freeDelivery: string;
  loading: string;
  retry: string;
  subtotal: string;
  discount: string;
  totalAfterDiscount: string;
  total: string;
  promoCode: string;
  defaultAddress: string;
  selected: string;
};

const checkoutDictionary = {
  ru: {
    metadataTitle: 'Оформление заказа — Sara Milan',
    title: 'Оформление заказа',
    subtitle: 'Проверьте данные доставки и выберите способ оплаты.',
    contactTitle: 'Контактные данные',
    deliveryTitle: 'Доставка',
    addressTitle: 'Адрес доставки',
    savedAddress: 'Сохранённый адрес',
    manualAddress: 'Новый адрес',
    deliveryMethodTitle: 'Способ доставки',
    paymentTitle: 'Способ оплаты',
    commentTitle: 'Комментарий к заказу',
    summaryTitle: 'Ваш заказ',
    fullName: 'ФИО',
    email: 'Email',
    phone: 'Телефон',
    address: 'Адрес',
    city: 'Город',
    street: 'Улица',
    house: 'Дом',
    apartment: 'Квартира',
    postalCode: 'Почтовый индекс',
    recipientName: 'Получатель',
    country: 'Страна',
    region: 'Область',
    district: 'Район',
    addressLine1: 'Адресная строка 1',
    addressLine2: 'Адресная строка 2',
    comment: 'Комментарий',
    orderCommentPlaceholder: 'Например: удобное время доставки или комментарий для менеджера',
    freedom: 'Онлайн-оплата картой (FreedomPay)',
    paymentComingNext: 'После оформления заказа вы перейдёте к онлайн-оплате картой через FreedomPay.',
    submit: 'Оформить заказ',
    submitting: 'Создаём заказ',
    backToCart: 'Вернуться в корзину',
    continueShopping: 'Перейти в каталог',
    emptyCartTitle: 'Корзина пуста',
    emptyCartDescription: 'Добавьте товары в корзину, чтобы оформить заказ.',
    deliveryMethodsEmpty: 'Способы доставки пока недоступны',
    addressesEmpty: 'Сохранённых адресов пока нет',
    useManualAddress: 'Ввести адрес вручную',
    requiredField: 'Обязательное поле',
    checkoutError: 'Не удалось оформить заказ',
    checkoutSuccess: 'Заказ создан',
    managerCalculation: 'Стоимость уточнит менеджер',
    freeDelivery: 'Бесплатно',
    loading: 'Загружаем оформление',
    retry: 'Повторить',
    subtotal: 'Подытог',
    discount: 'Скидка',
    totalAfterDiscount: 'Итого со скидкой',
    total: 'Итого',
    promoCode: 'Промокод',
    defaultAddress: 'Основной',
    selected: 'Выбрано',
  },
  kk: {
    metadataTitle: 'Тапсырысты рәсімдеу — Sara Milan',
    title: 'Тапсырысты рәсімдеу',
    subtitle: 'Жеткізу деректерін тексеріп, төлем әдісін таңдаңыз.',
    contactTitle: 'Байланыс деректері',
    deliveryTitle: 'Жеткізу',
    addressTitle: 'Жеткізу мекенжайы',
    savedAddress: 'Сақталған мекенжай',
    manualAddress: 'Жаңа мекенжай',
    deliveryMethodTitle: 'Жеткізу әдісі',
    paymentTitle: 'Төлем әдісі',
    commentTitle: 'Тапсырысқа пікір',
    summaryTitle: 'Сіздің тапсырысыңыз',
    fullName: 'Аты-жөні',
    email: 'Email',
    phone: 'Телефон',
    address: 'Мекенжай',
    city: 'Қала',
    street: 'Көше',
    house: 'Үй',
    apartment: 'Пәтер',
    postalCode: 'Пошта индексі',
    recipientName: 'Алушы',
    country: 'Ел',
    region: 'Облыс',
    district: 'Аудан',
    addressLine1: 'Мекенжай жолы 1',
    addressLine2: 'Мекенжай жолы 2',
    comment: 'Пікір',
    orderCommentPlaceholder: 'Мысалы: жеткізуге ыңғайлы уақыт немесе менеджерге пікір',
    freedom: 'Картамен онлайн төлеу (FreedomPay)',
    paymentComingNext: 'Тапсырысты рәсімдегеннен кейін FreedomPay арқылы картамен онлайн төлеуге өтесіз.',
    submit: 'Тапсырысты рәсімдеу',
    submitting: 'Тапсырыс жасалуда',
    backToCart: 'Себетке қайту',
    continueShopping: 'Каталогқа өту',
    emptyCartTitle: 'Себет бос',
    emptyCartDescription: 'Тапсырыс рәсімдеу үшін себетке тауар қосыңыз.',
    deliveryMethodsEmpty: 'Жеткізу әдістері әзірге қолжетімсіз',
    addressesEmpty: 'Сақталған мекенжайлар әзірге жоқ',
    useManualAddress: 'Мекенжайды қолмен енгізу',
    requiredField: 'Міндетті өріс',
    checkoutError: 'Тапсырысты рәсімдеу мүмкін болмады',
    checkoutSuccess: 'Тапсырыс жасалды',
    managerCalculation: 'Құнын менеджер нақтылайды',
    freeDelivery: 'Тегін',
    loading: 'Рәсімдеу жүктелуде',
    retry: 'Қайталау',
    subtotal: 'Аралық сома',
    discount: 'Жеңілдік',
    totalAfterDiscount: 'Жеңілдікпен жалпы',
    total: 'Жалпы',
    promoCode: 'Промокод',
    defaultAddress: 'Негізгі',
    selected: 'Таңдалды',
  },
  en: {
    metadataTitle: 'Checkout — Sara Milan',
    title: 'Checkout',
    subtitle: 'Review your delivery details and choose a payment method.',
    contactTitle: 'Contact information',
    deliveryTitle: 'Delivery',
    addressTitle: 'Delivery address',
    savedAddress: 'Saved address',
    manualAddress: 'New address',
    deliveryMethodTitle: 'Delivery method',
    paymentTitle: 'Payment method',
    commentTitle: 'Order comment',
    summaryTitle: 'Your order',
    fullName: 'Full name',
    email: 'Email',
    phone: 'Phone number',
    address: 'Address',
    city: 'City',
    street: 'Street',
    house: 'House',
    apartment: 'Apartment',
    postalCode: 'Postal code',
    recipientName: 'Recipient',
    country: 'Country',
    region: 'Region',
    district: 'District',
    addressLine1: 'Address line 1',
    addressLine2: 'Address line 2',
    comment: 'Comment',
    orderCommentPlaceholder: 'For example: a convenient delivery time or a note for the manager',
    freedom: 'Online card payment (FreedomPay)',
    paymentComingNext:
      'After placing the order you will proceed to online card payment via FreedomPay.',
    submit: 'Place order',
    submitting: 'Creating order',
    backToCart: 'Back to cart',
    continueShopping: 'Browse catalog',
    emptyCartTitle: 'Your cart is empty',
    emptyCartDescription: 'Add products to your cart before checkout.',
    deliveryMethodsEmpty: 'Delivery methods are currently unavailable',
    addressesEmpty: 'No saved addresses yet',
    useManualAddress: 'Enter address manually',
    requiredField: 'Required field',
    checkoutError: 'Unable to place order',
    checkoutSuccess: 'Order created',
    managerCalculation: 'A manager will confirm the price',
    freeDelivery: 'Free',
    loading: 'Loading checkout',
    retry: 'Try again',
    subtotal: 'Subtotal',
    discount: 'Discount',
    totalAfterDiscount: 'Total after discount',
    total: 'Total',
    promoCode: 'Promo code',
    defaultAddress: 'Default',
    selected: 'Selected',
  },
} as const satisfies Record<AppLocale, CheckoutDictionary>;

export const getCheckoutDictionary = (locale: AppLocale): CheckoutDictionary =>
  checkoutDictionary[locale];
