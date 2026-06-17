import type { AppLocale } from '@/shared/config';

export type WishlistPageDictionary = {
  title: string;
  subtitle: string;
  emptyTitle: string;
  emptyDescription: string;
  goToCatalog: string;
  remove: string;
  add: string;
  loginRequired: string;
  loadError: string;
  toggleError: string;
};

export const wishlistPageDictionary: Record<AppLocale, WishlistPageDictionary> = {
  ru: {
    title: 'Избранное',
    subtitle: 'Сохраняйте товары, чтобы вернуться к ним позже.',
    emptyTitle: 'В избранном пока ничего нет',
    emptyDescription: 'Добавляйте понравившиеся товары из каталога.',
    goToCatalog: 'Перейти в каталог',
    remove: 'Удалить из избранного',
    add: 'Добавить в избранное',
    loginRequired: 'Войдите, чтобы добавлять товары в избранное',
    loadError: 'Не удалось загрузить избранное',
    toggleError: 'Не удалось обновить избранное',
  },
  kk: {
    title: 'Таңдаулылар',
    subtitle: 'Ұнаған тауарларды кейін қарау үшін сақтаңыз.',
    emptyTitle: 'Таңдаулыларда әзірге ештеңе жоқ',
    emptyDescription: 'Ұнаған тауарларды каталогтан қосыңыз.',
    goToCatalog: 'Каталогқа өту',
    remove: 'Таңдаулылардан жою',
    add: 'Таңдаулыларға қосу',
    loginRequired: 'Тауарларды таңдаулыларға қосу үшін кіріңіз',
    loadError: 'Таңдаулыларды жүктеу мүмкін болмады',
    toggleError: 'Таңдаулыларды жаңарту мүмкін болмады',
  },
};

export const getWishlistPageDictionary = (locale: AppLocale): WishlistPageDictionary =>
  wishlistPageDictionary[locale];
