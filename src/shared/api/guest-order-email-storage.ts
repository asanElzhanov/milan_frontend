// Гостевые заказы (order.user_id пуст) на бэкенде авторизуются по email заказа.
// Гость проходит путь checkout → редирект на страницу оплаты → редирект на
// FreedomPay и обратно, поэтому email нужно сохранить между этими шагами.
// Держим его в localStorage (переживает закрытие вкладки и возврат по прямой
// ссылке) с ограниченным сроком жизни, чтобы не хранить адрес вечно.

const GUEST_ORDER_EMAIL_PREFIX = 'sara_milan_guest_order_email:';
const GUEST_ORDER_EMAIL_TTL_MS = 48 * 60 * 60 * 1000; // 48 часов

type StoredGuestEmail = {
  email: string;
  expiresAt: number;
};

const getStorage = (): Storage | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const buildKey = (orderNumber: string): string => `${GUEST_ORDER_EMAIL_PREFIX}${orderNumber}`;

const normalize = (value: string | null | undefined): string | null => {
  const normalized = value?.trim();

  return normalized ? normalized : null;
};

export function saveGuestOrderEmail(
  orderNumber: string | null | undefined,
  email: string | null | undefined,
): void {
  const storage = getStorage();
  const normalizedOrder = normalize(orderNumber);
  const normalizedEmail = normalize(email);

  if (!storage || !normalizedOrder || !normalizedEmail) {
    return;
  }

  const payload: StoredGuestEmail = {
    email: normalizedEmail,
    expiresAt: Date.now() + GUEST_ORDER_EMAIL_TTL_MS,
  };

  try {
    storage.setItem(buildKey(normalizedOrder), JSON.stringify(payload));
  } catch {
    // Приватный режим / переполнение — просто не сохраняем, оплата не ломается.
  }
}

export function getGuestOrderEmail(orderNumber: string | null | undefined): string | null {
  const storage = getStorage();
  const normalizedOrder = normalize(orderNumber);

  if (!storage || !normalizedOrder) {
    return null;
  }

  const key = buildKey(normalizedOrder);

  try {
    const raw = storage.getItem(key);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<StoredGuestEmail>;
    const email = normalize(parsed?.email);

    if (!email || typeof parsed?.expiresAt !== 'number' || parsed.expiresAt < Date.now()) {
      storage.removeItem(key);
      return null;
    }

    return email;
  } catch {
    // Битое/чужое значение — удаляем и ведём себя как будто ничего нет.
    try {
      storage.removeItem(key);
    } catch {
      // ignore
    }
    return null;
  }
}

export function clearGuestOrderEmail(orderNumber: string | null | undefined): void {
  const storage = getStorage();
  const normalizedOrder = normalize(orderNumber);

  if (!storage || !normalizedOrder) {
    return;
  }

  try {
    storage.removeItem(buildKey(normalizedOrder));
  } catch {
    // ignore
  }
}
