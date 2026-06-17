import type { AppLocale } from '@/shared/config';

export type AddressBookDictionary = {
  title: string;
  subtitle: string;
  addAddress: string;
  editAddress: string;
  deleteAddress: string;
  setDefault: string;
  defaultAddress: string;
  save: string;
  create: string;
  cancel: string;
  recipientName: string;
  phone: string;
  addressTitle: string;
  country: string;
  region: string;
  city: string;
  district: string;
  street: string;
  house: string;
  apartment: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  comment: string;
  isDefault: string;
  emptyTitle: string;
  emptyDescription: string;
  deleteTitle: string;
  deleteDescription: string;
  requiredField: string;
  invalidPhone: string;
  createSuccess: string;
  updateSuccess: string;
  deleteSuccess: string;
  setDefaultSuccess: string;
  createError: string;
  updateError: string;
  deleteError: string;
  setDefaultError: string;
  checkoutUsageNote: string;
};

export const addressBookDictionary: Record<AppLocale, AddressBookDictionary> = {
  ru: {
    title: 'Адреса',
    subtitle: 'Сохраните адреса доставки, чтобы быстрее оформлять заказы.',
    addAddress: 'Добавить адрес',
    editAddress: 'Редактировать адрес',
    deleteAddress: 'Удалить адрес',
    setDefault: 'Сделать основным',
    defaultAddress: 'Основной адрес',
    save: 'Сохранить',
    create: 'Создать адрес',
    cancel: 'Отмена',
    recipientName: 'Получатель',
    phone: 'Телефон',
    addressTitle: 'Название адреса',
    country: 'Страна',
    region: 'Область',
    city: 'Город',
    district: 'Район',
    street: 'Улица',
    house: 'Дом',
    apartment: 'Квартира',
    postalCode: 'Почтовый индекс',
    addressLine1: 'Адресная строка 1',
    addressLine2: 'Адресная строка 2',
    comment: 'Комментарий',
    isDefault: 'Сделать основным адресом',
    emptyTitle: 'Адресов пока нет',
    emptyDescription: 'Добавьте адрес доставки, чтобы использовать его при оформлении заказа.',
    deleteTitle: 'Удалить адрес?',
    deleteDescription: 'Это действие нельзя отменить.',
    requiredField: 'Обязательное поле',
    invalidPhone: 'Введите корректный телефон',
    createSuccess: 'Адрес добавлен',
    updateSuccess: 'Адрес обновлен',
    deleteSuccess: 'Адрес удален',
    setDefaultSuccess: 'Основной адрес обновлен',
    createError: 'Не удалось добавить адрес',
    updateError: 'Не удалось обновить адрес',
    deleteError: 'Не удалось удалить адрес',
    setDefaultError: 'Не удалось сделать адрес основным',
    checkoutUsageNote: 'Этот адрес можно будет выбрать при оформлении заказа.',
  },
  kk: {
    title: 'Мекенжайлар',
    subtitle: 'Тапсырысты тез рәсімдеу үшін жеткізу мекенжайларын сақтаңыз.',
    addAddress: 'Мекенжай қосу',
    editAddress: 'Мекенжайды өңдеу',
    deleteAddress: 'Мекенжайды жою',
    setDefault: 'Негізгі ету',
    defaultAddress: 'Негізгі мекенжай',
    save: 'Сақтау',
    create: 'Мекенжай жасау',
    cancel: 'Бас тарту',
    recipientName: 'Алушы',
    phone: 'Телефон',
    addressTitle: 'Мекенжай атауы',
    country: 'Ел',
    region: 'Облыс',
    city: 'Қала',
    district: 'Аудан',
    street: 'Көше',
    house: 'Үй',
    apartment: 'Пәтер',
    postalCode: 'Пошта индексі',
    addressLine1: 'Мекенжай жолы 1',
    addressLine2: 'Мекенжай жолы 2',
    comment: 'Пікір',
    isDefault: 'Негізгі мекенжай ету',
    emptyTitle: 'Әзірге мекенжай жоқ',
    emptyDescription: 'Тапсырысты рәсімдеу кезінде пайдалану үшін жеткізу мекенжайын қосыңыз.',
    deleteTitle: 'Мекенжайды жою керек пе?',
    deleteDescription: 'Бұл әрекетті қайтару мүмкін емес.',
    requiredField: 'Міндетті өріс',
    invalidPhone: 'Дұрыс телефон енгізіңіз',
    createSuccess: 'Мекенжай қосылды',
    updateSuccess: 'Мекенжай жаңартылды',
    deleteSuccess: 'Мекенжай жойылды',
    setDefaultSuccess: 'Негізгі мекенжай жаңартылды',
    createError: 'Мекенжайды қосу мүмкін болмады',
    updateError: 'Мекенжайды жаңарту мүмкін болмады',
    deleteError: 'Мекенжайды жою мүмкін болмады',
    setDefaultError: 'Мекенжайды негізгі ету мүмкін болмады',
    checkoutUsageNote: 'Бұл мекенжайды тапсырысты рәсімдеу кезінде таңдауға болады.',
  },
};

export const getAddressBookDictionary = (locale: AppLocale): AddressBookDictionary =>
  addressBookDictionary[locale];
