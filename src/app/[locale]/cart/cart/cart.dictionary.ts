import type { AppLocale } from '@/shared/config';

export type CartDictionary = {
  metadataTitle: string;
  title: string;
  subtitle: string;
  emptyTitle: string;
  emptyDescription: string;
  continueShopping: string;
  clearCart: string;
  remove: string;
  quantity: string;
  subtotal: string;
  discount: string;
  totalAfterDiscount: string;
  total: string;
  proceedToCheckout: string;
  unavailable: string;
  stockLeft: string;
  updateError: string;
  removeError: string;
  clearError: string;
  loading: string;
  retry: string;
  summaryTitle: string;
  promoCode: string;
  promoTitle: string;
  promoPlaceholder: string;
  applyPromo: string;
  removePromo: string;
  promoApplied: string;
  promoInvalid: string;
  promoApplyError: string;
  promoRemoveError: string;
  clearConfirm: string;
};

const cartDictionary = {
  ru: {
    metadataTitle: 'Корзина — Sara Milan',
    title: 'Корзина',
    subtitle: 'Проверьте товары перед оформлением заказа.',
    emptyTitle: 'Корзина пуста',
    emptyDescription: 'Добавьте товары из каталога, чтобы продолжить оформление.',
    continueShopping: 'Перейти в каталог',
    clearCart: 'Очистить корзину',
    remove: 'Удалить',
    quantity: 'Количество',
    subtotal: 'Подытог',
    discount: 'Скидка',
    totalAfterDiscount: 'Итого со скидкой',
    total: 'Итого',
    proceedToCheckout: 'Перейти к оформлению',
    unavailable: 'Нет в наличии',
    stockLeft: 'Доступно',
    updateError: 'Не удалось обновить корзину',
    removeError: 'Не удалось удалить товар',
    clearError: 'Не удалось очистить корзину',
    loading: 'Загружаем корзину',
    retry: 'Повторить',
    summaryTitle: 'Сумма заказа',
    promoCode: 'Промокод',
    promoTitle: 'Промокод',
    promoPlaceholder: 'Введите промокод',
    applyPromo: 'Применить',
    removePromo: 'Удалить промокод',
    promoApplied: 'Промокод применён',
    promoInvalid: 'Промокод недействителен',
    promoApplyError: 'Не удалось применить промокод',
    promoRemoveError: 'Не удалось удалить промокод',
    clearConfirm: 'Очистить корзину?',
  },
  kk: {
    metadataTitle: 'Себет — Sara Milan',
    title: 'Себет',
    subtitle: 'Тапсырысты рәсімдеу алдында тауарларды тексеріңіз.',
    emptyTitle: 'Себет бос',
    emptyDescription: 'Рәсімдеуді жалғастыру үшін каталогтан тауар қосыңыз.',
    continueShopping: 'Каталогқа өту',
    clearCart: 'Себетті тазарту',
    remove: 'Жою',
    quantity: 'Саны',
    subtotal: 'Аралық сома',
    discount: 'Жеңілдік',
    totalAfterDiscount: 'Жеңілдікпен жалпы',
    total: 'Жалпы',
    proceedToCheckout: 'Рәсімдеуге өту',
    unavailable: 'Қоймада жоқ',
    stockLeft: 'Қолжетімді',
    updateError: 'Себетті жаңарту мүмкін болмады',
    removeError: 'Тауарды жою мүмкін болмады',
    clearError: 'Себетті тазарту мүмкін болмады',
    loading: 'Себет жүктелуде',
    retry: 'Қайталау',
    summaryTitle: 'Тапсырыс сомасы',
    promoCode: 'Промокод',
    promoTitle: 'Промокод',
    promoPlaceholder: 'Промокодты енгізіңіз',
    applyPromo: 'Қолдану',
    removePromo: 'Промокодты жою',
    promoApplied: 'Промокод қолданылды',
    promoInvalid: 'Промокод жарамсыз',
    promoApplyError: 'Промокодты қолдану мүмкін болмады',
    promoRemoveError: 'Промокодты жою мүмкін болмады',
    clearConfirm: 'Себетті тазарту керек пе?',
  },
  en: {
    metadataTitle: 'Cart — Sara Milan', title: 'Cart',
    subtitle: 'Review your items before checkout.', emptyTitle: 'Your cart is empty',
    emptyDescription: 'Add products from the catalog to continue.', continueShopping: 'Browse catalog',
    clearCart: 'Clear cart', remove: 'Remove', quantity: 'Quantity', subtotal: 'Subtotal',
    discount: 'Discount', totalAfterDiscount: 'Total after discount', total: 'Total',
    proceedToCheckout: 'Proceed to checkout', unavailable: 'Out of stock', stockLeft: 'Available',
    updateError: 'Could not update the cart', removeError: 'Could not remove the product',
    clearError: 'Could not clear the cart', loading: 'Loading cart', retry: 'Retry',
    summaryTitle: 'Order summary', promoCode: 'Promo code', promoTitle: 'Promo code',
    promoPlaceholder: 'Enter promo code', applyPromo: 'Apply', removePromo: 'Remove promo code',
    promoApplied: 'Promo code applied', promoInvalid: 'Invalid promo code',
    promoApplyError: 'Could not apply the promo code', promoRemoveError: 'Could not remove the promo code',
    clearConfirm: 'Clear the cart?',
  },
} as const satisfies Record<AppLocale | 'en', CartDictionary>;

export const getCartDictionary = (locale: AppLocale): CartDictionary => cartDictionary[locale];
