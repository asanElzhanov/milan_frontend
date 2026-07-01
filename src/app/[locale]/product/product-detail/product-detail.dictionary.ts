import type { AppLocale } from '@/shared/config';

import type { ProductDetailDictionary } from './product-detail.types';

const productDetailDictionary = {
  ru: {
    size: 'Размер',
    color: 'Цвет',
    chooseSize: 'Выберите размер',
    chooseColor: 'Выберите цвет',
    inStock: 'В наличии',
    outOfStock: 'Нет в наличии',
    stockLeft: 'Осталось',
    addToCart: 'Добавить в корзину',
    selectVariant: 'Выберите размер и цвет',
    description: 'Описание',
    composition: 'Состав',
    material: 'Материал',
    season: 'Сезон',
    reviews: 'Отзывы',
    noReviews: 'Отзывов пока нет',
    similar: 'Похожие товары',
    notFoundTitle: 'Товар не найден',
    notFoundDescription: 'Возможно, товар был снят с продажи или ссылка устарела.',
    backToCatalog: 'Вернуться в каталог',
    addedToCart: 'Товар добавлен в корзину.',
  },
  kk: {
    size: 'Өлшем',
    color: 'Түс',
    chooseSize: 'Өлшемді таңдаңыз',
    chooseColor: 'Түсті таңдаңыз',
    inStock: 'Қоймада бар',
    outOfStock: 'Қоймада жоқ',
    stockLeft: 'Қалды',
    addToCart: 'Себетке қосу',
    selectVariant: 'Өлшем мен түсті таңдаңыз',
    description: 'Сипаттама',
    composition: 'Құрамы',
    material: 'Материал',
    season: 'Маусым',
    reviews: 'Пікірлер',
    noReviews: 'Әзірге пікірлер жоқ',
    similar: 'Ұқсас тауарлар',
    notFoundTitle: 'Тауар табылмады',
    notFoundDescription: 'Тауар сатылымнан алынған болуы немесе сілтеме ескірген болуы мүмкін.',
    backToCatalog: 'Каталогқа қайту',
    addedToCart: 'Тауар себетке қосылды.',
  },
} as const satisfies Record<AppLocale, ProductDetailDictionary>;

export const getProductDetailDictionary = (locale: AppLocale): ProductDetailDictionary =>
  productDetailDictionary[locale];
