import type { AppLocale } from '@/shared/config';

type Translation = Record<AppLocale, string>;

const translations: Record<string, Translation> = {
  courier: { ru: 'Курьерская доставка', kk: 'Курьерлік жеткізу', en: 'Courier delivery' },
  'courier delivery': {
    ru: 'Курьерская доставка',
    kk: 'Курьерлік жеткізу',
    en: 'Courier delivery',
  },
  pickup: { ru: 'Самовывоз', kk: 'Өзіңіз алып кету', en: 'Pickup' },
  kazakhstan_delivery: {
    ru: 'Доставка по Казахстану',
    kk: 'Қазақстан бойынша жеткізу',
    en: 'Delivery across Kazakhstan',
  },
  'kazakhstan delivery': {
    ru: 'Доставка по Казахстану',
    kk: 'Қазақстан бойынша жеткізу',
    en: 'Delivery across Kazakhstan',
  },
  'demo courier delivery method.': {
    ru: 'Доставка курьером по указанному адресу.',
    kk: 'Көрсетілген мекенжайға курьермен жеткізу.',
    en: 'Courier delivery to the specified address.',
  },
  'demo pickup method.': {
    ru: 'Бесплатный самовывоз.',
    kk: 'Тегін өзіңіз алып кету.',
    en: 'Free pickup.',
  },
  'demo kazakhstan delivery method.': {
    ru: 'Доставка по Казахстану. Стоимость уточнит менеджер.',
    kk: 'Қазақстан бойынша жеткізу. Құнын менеджер нақтылайды.',
    en: 'Delivery across Kazakhstan. A manager will confirm the price.',
  },
  'men-shoes': { ru: 'Мужская обувь', kk: 'Ерлер аяқ киімі', en: "Men's shoes" },
  'men shoes': { ru: 'Мужская обувь', kk: 'Ерлер аяқ киімі', en: "Men's shoes" },
  'women-shoes': { ru: 'Женская обувь', kk: 'Әйелдер аяқ киімі', en: "Women's shoes" },
  'women shoes': { ru: 'Женская обувь', kk: 'Әйелдер аяқ киімі', en: "Women's shoes" },
  sneakers: { ru: 'Кроссовки', kk: 'Кроссовкалар', en: 'Sneakers' },
  bags: { ru: 'Сумки', kk: 'Сөмкелер', en: 'Bags' },
  caps: { ru: 'Кепки', kk: 'Кепкалар', en: 'Caps' },
  men: { ru: 'Мужчины', kk: 'Ерлерге', en: 'Men' },
  мужчины: { ru: 'Мужчины', kk: 'Ерлерге', en: 'Men' },
  women: { ru: 'Женщины', kk: 'Әйелдерге', en: 'Women' },
  женщины: { ru: 'Женщины', kk: 'Әйелдерге', en: 'Women' },
  shoes: { ru: 'Обувь', kk: 'Аяқ киім', en: 'Shoes' },
  обувь: { ru: 'Обувь', kk: 'Аяқ киім', en: 'Shoes' },
  accessories: { ru: 'Аксессуары', kk: 'Аксессуарлар', en: 'Accessories' },
  аксессуары: { ru: 'Аксессуары', kk: 'Аксессуарлар', en: 'Accessories' },
  black: { ru: 'Чёрный', kk: 'Қара', en: 'Black' },
  blue: { ru: 'Синий', kk: 'Көк', en: 'Blue' },
  red: { ru: 'Красный', kk: 'Қызыл', en: 'Red' },
  white: { ru: 'Белый', kk: 'Ақ', en: 'White' },
  green: { ru: 'Зелёный', kk: 'Жасыл', en: 'Green' },
  зеленый: { ru: 'Зелёный', kk: 'Жасыл', en: 'Green' },
  brown: { ru: 'Коричневый', kk: 'Қоңыр', en: 'Brown' },
  коричневый: { ru: 'Коричневый', kk: 'Қоңыр', en: 'Brown' },
  'one size': { ru: 'Единый размер', kk: 'Бір өлшем', en: 'One size' },
  all: { ru: 'Всесезонный', kk: 'Барлық маусымға', en: 'All seasons' },
  'local brand': { ru: 'Локальный бренд', kk: 'Жергілікті бренд', en: 'Local Brand' },
  'shop now': { ru: 'Перейти к покупкам', kk: 'Сатып алуға өту', en: 'Shop now' },
  'seed homepage hero': {
    ru: 'Новая коллекция Sara Milan',
    kk: 'Sara Milan жаңа коллекциясы',
    en: 'New Sara Milan collection',
  },
  'seed mid season promo': {
    ru: 'Сезонная акция',
    kk: 'Маусымдық акция',
    en: 'Mid-season promotion',
  },
  'demo banner created by seed_data.': {
    ru: 'Откройте актуальные предложения.',
    kk: 'Өзекті ұсыныстарды қараңыз.',
    en: 'Discover our latest offers.',
  },
  'seed-nike-cap-demo': { ru: 'Демо-кепка Nike', kk: 'Nike демо-кепкасы', en: 'Nike Cap Demo' },
  'seed-local-brand-tote-demo': {
    ru: 'Демо-сумка Local Brand',
    kk: 'Local Brand демо-сөмкесі',
    en: 'Local Brand Tote Demo',
  },
  'seed-puma-hoodie-demo': { ru: 'Демо-худи Puma', kk: 'Puma демо-худиі', en: 'Puma Hoodie Demo' },
  'seed-adidas-run-demo': {
    ru: 'Демо-кроссовки Adidas Run',
    kk: 'Adidas Run демо-кроссовкасы',
    en: 'Adidas Run Demo',
  },
  'seed-nike-air-demo': {
    ru: 'Демо-кроссовки Nike Air',
    kk: 'Nike Air демо-кроссовкасы',
    en: 'Nike Air Demo',
  },
  'one size cap demo product.': {
    ru: 'Демо-кепка единого размера.',
    kk: 'Бір өлшемді демо-кепка.',
    en: 'One-size demo cap.',
  },
  'local accessory demo product.': {
    ru: 'Демо-аксессуар локального бренда.',
    kk: 'Жергілікті брендтің демо-аксессуары.',
    en: 'Local brand demo accessory.',
  },
  'comfort hoodie used for demo catalog data.': {
    ru: 'Удобное худи из демо-каталога.',
    kk: 'Демо-каталогтағы ыңғайлы худи.',
    en: 'Comfortable hoodie from the demo catalog.',
  },
  'lightweight running shoes for demo data.': {
    ru: 'Лёгкие беговые кроссовки из демо-каталога.',
    kk: 'Демо-каталогтағы жеңіл жүгіру кроссовкасы.',
    en: 'Lightweight running shoes from the demo catalog.',
  },
  'multi-variant demo sneaker.': {
    ru: 'Демо-кроссовки в нескольких вариантах.',
    kk: 'Бірнеше нұсқадағы демо-кроссовка.',
    en: 'Demo sneakers available in several variants.',
  },
  canvas: { ru: 'Канвас', kk: 'Канвас', en: 'Canvas' },
  cotton: { ru: 'Хлопок', kk: 'Мақта', en: 'Cotton' },
  mesh: { ru: 'Сетка', kk: 'Торлы мата', en: 'Mesh' },
  textile: { ru: 'Текстиль', kk: 'Тоқыма', en: 'Textile' },
};

const normalize = (value: string): string => value.trim().toLocaleLowerCase().replace(/_/g, ' ');

export function localizeBackendValue(
  value: string | null | undefined,
  locale: AppLocale,
  stableKey?: string | null,
): string {
  const raw = value?.trim() ?? '';
  const byStableKey = stableKey ? translations[stableKey.trim().toLocaleLowerCase()] : undefined;
  const byValue = raw ? translations[normalize(raw)] : undefined;

  return (byStableKey ?? byValue)?.[locale] ?? raw;
}
