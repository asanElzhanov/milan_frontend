import type { AppLocale } from '@/shared/config';

export type NotificationsDictionary = {
  title: string;
  subtitle: string;
  emptyTitle: string;
  emptyDescription: string;
  loadError: string;
  readAll: string;
  readAllError: string;
  unread: string;
  read: string;
  open: string;
  order: string;
  payment: string;
  delivery: string;
  review: string;
  promo: string;
  system: string;
  loading: string;
  retry: string;
  unreadCount: string;
};

export const notificationsDictionary: Record<AppLocale, NotificationsDictionary> = {
  ru: {
    title: 'Уведомления',
    subtitle: 'Здесь отображаются уведомления по заказам, оплате и аккаунту.',
    emptyTitle: 'Уведомлений пока нет',
    emptyDescription: 'Когда появятся новости по заказам или аккаунту, они будут здесь.',
    loadError: 'Не удалось загрузить уведомления',
    readAll: 'Отметить всё прочитанным',
    readAllError: 'Не удалось отметить уведомления прочитанными',
    unread: 'Не прочитано',
    read: 'Прочитано',
    open: 'Открыть',
    order: 'Заказ',
    payment: 'Оплата',
    delivery: 'Доставка',
    review: 'Отзыв',
    promo: 'Акция',
    system: 'Система',
    loading: 'Загружаем уведомления',
    retry: 'Повторить',
    unreadCount: 'Непрочитано',
  },
  kk: {
    title: 'Хабарламалар',
    subtitle: 'Бұл жерде тапсырыс, төлем және аккаунт бойынша хабарламалар көрсетіледі.',
    emptyTitle: 'Әзірге хабарлама жоқ',
    emptyDescription:
      'Тапсырыстар немесе аккаунт бойынша жаңалықтар болса, олар осы жерде пайда болады.',
    loadError: 'Хабарламаларды жүктеу мүмкін болмады',
    readAll: 'Барлығын оқылды деп белгілеу',
    readAllError: 'Хабарламаларды оқылды деп белгілеу мүмкін болмады',
    unread: 'Оқылмаған',
    read: 'Оқылды',
    open: 'Ашу',
    order: 'Тапсырыс',
    payment: 'Төлем',
    delivery: 'Жеткізу',
    review: 'Пікір',
    promo: 'Акция',
    system: 'Жүйе',
    loading: 'Хабарламалар жүктелуде',
    retry: 'Қайталау',
    unreadCount: 'Оқылмаған',
  },
  en: {
    title: 'Notifications',
    subtitle: 'Order, payment, and account updates appear here.',
    emptyTitle: 'No notifications yet',
    emptyDescription: 'Updates about your orders or account will appear here.',
    loadError: 'Unable to load notifications',
    readAll: 'Mark all as read',
    readAllError: 'Unable to mark notifications as read',
    unread: 'Unread',
    read: 'Read',
    open: 'Open',
    order: 'Order',
    payment: 'Payment',
    delivery: 'Delivery',
    review: 'Review',
    promo: 'Promotion',
    system: 'System',
    loading: 'Loading notifications',
    retry: 'Try again',
    unreadCount: 'Unread',
  },
};

export const getNotificationsDictionary = (locale: AppLocale): NotificationsDictionary =>
  notificationsDictionary[locale];
