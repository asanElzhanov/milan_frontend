export type NotificationType =
  | 'order'
  | 'payment'
  | 'delivery'
  | 'review'
  | 'promo'
  | 'system'
  | string;

export type Notification = {
  id: string | number;
  type?: NotificationType | null;
  title: string;
  message?: string | null;
  isRead: boolean;
  link?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type NotificationListResponse = {
  notifications: Notification[];
  count: number;
  unreadCount: number;
  currentPage: number;
  totalPages: number;
};
