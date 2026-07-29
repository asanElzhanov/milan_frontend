import type { AppLocale } from '@/shared/config';

import type { HomeDictionary } from './home.types';

const homeDictionary = {
  ru: {
    metadata: {
      title: 'Sara Milan',
      description: 'Sara Milan',
    },
    hero: {
      eyebrow: 'Sara Milan',
      title: 'Обувь и аксессуары для выразительного гардероба',
      description:
        'Собираем лаконичные силуэты, благородные материалы и актуальные детали для повседневных и вечерних образов.',
      primaryCta: 'Смотреть каталог',
      secondaryCta: 'Новые поступления',
    },
    categories: {
      eyebrow: 'Категории',
      title: 'Выберите направление',
      description:
        'Нажмите на нужный каталог прямо сейчас, чтобы мгновенно познакомиться с нашим уникальным ассортиментом и сделать идеальную покупку.',
      emptyTitle: 'Категории скоро появятся',
      emptyDescription: 'Когда backend вернет дерево категорий, раздел заполнится автоматически.',
      cta: 'Все категории',
    },
    newProducts: {
      eyebrow: 'Новинки',
      title: 'Новые поступления',
      description: 'Свежие модели для обновления вашего стиля.',
      cta: 'Все новинки',
      emptyTitle: 'Новинки пока не загружены',
      emptyDescription: 'Раздел заполнится товарами после ответа каталога.',
    },
    saleProducts: {
      eyebrow: 'Скидки',
      title: 'Сезонные предложения',
      description: 'Товары со скидкой из актуального каталога.',
      cta: 'Смотреть sale',
      emptyTitle: 'Sale-позиции пока не загружены',
      emptyDescription: 'Раздел появится, когда в каталоге будут активные товары со скидкой.',
    },
    promo: {
      eyebrow: 'Акцент сезона',
      title: 'Подберите пару под свой ритм',
      description:
        'Подберите одежду, которая идеально подчеркнет ваш уникальный стиль - без лишних заморочек.',
      cta: 'Перейти к подборке',
    },
    story: {
      eyebrow: 'Brand story',
      title: 'Sara Milan строит гардероб вокруг уверенного шага',
      lead: 'Мы выбираем модели, которые выглядят собранно утром, уместно днем и достаточно выразительно вечером.',
      body: 'В основе витрины - чистая навигация, честная карточка товара и спокойный визуальный ритм, чтобы покупательница быстро находила нужную пару, размер и настроение.',
      cta: 'О бренде',
    },
    benefits: {
      eyebrow: 'Сервис',
      title: 'Покупка без лишнего шума',
      description: 'Короткие, практичные преимущества для онлайн-витрины.',
      items: [
        {
          title: 'Доставка по Казахстану',
          description: 'Способы доставки приходят из backend на следующих этапах checkout.',
        },
        {
          title: 'Удобная оплата',
          description: 'Kaspi и Stripe уже описаны в API-контракте для будущего платежного flow.',
        },
        {
          title: 'Поддержка менеджера',
          description: 'Поможем уточнить наличие, доставку и детали заказа.',
        },
        {
          title: 'Современный ассортимент',
          description: 'Витрина фокусируется на новых поступлениях, sale и ключевых категориях.',
        },
      ],
    },
  },
  kk: {
    metadata: {
      title: 'Sara Milan',
      description: 'Sara Milan',
    },
    hero: {
      eyebrow: 'Sara Milan',
      title: 'Сенімді образға арналған аяқ киім мен аксессуарлар',
      description:
        'Күнделікті және кешкі стильге сай келетін жинақы силуэттерді, сапалы материалдарды және өзекті детальдарды ұсынамыз.',
      primaryCta: 'Каталогты ашу',
      secondaryCta: 'Жаңа түсімдер',
    },
    categories: {
      eyebrow: 'Санаттар',
      title: 'Бағытты таңдаңыз',
      description:
        'Қажетті каталогты дәл қазір таңдаңыз да, бірегей ассортиментімізбен бірден танысып, мінсіз таңдауыңызды жасаңыз.',
      emptyTitle: 'Санаттар жақында пайда болады',
      emptyDescription: 'Backend санаттар ағашын қайтарған кезде бөлім автоматты түрде толады.',
      cta: 'Барлық санаттар',
    },
    newProducts: {
      eyebrow: 'Жаңа',
      title: 'Жаңа түсімдер',
      description: 'Стиліңізді жаңартуға арналған жаңа модельдер.',
      cta: 'Барлық жаңалықтар',
      emptyTitle: 'Жаңа тауарлар әзірге жүктелмеді',
      emptyDescription: 'Каталог жауап бергеннен кейін бөлім тауарлармен толады.',
    },
    saleProducts: {
      eyebrow: 'Жеңілдіктер',
      title: 'Маусымдық ұсыныстар',
      description: 'Актуалды каталогтағы жеңілдігі бар тауарлар.',
      cta: 'Sale қарау',
      emptyTitle: 'Sale тауарлары әзірге жүктелмеді',
      emptyDescription:
        'Каталогта жеңілдігі бар белсенді тауарлар болған кезде бөлім пайда болады.',
    },
    promo: {
      eyebrow: 'Маусым акценті',
      title: 'Өзіңіздің ырғағыңызға сай жұп таңдаңыз',
      description: 'Еш қиындықсыз бірегей стиліңізді мінсіз айқындайтын киімді таңдаңыз.',
      cta: 'Жинаққа өту',
    },
    story: {
      eyebrow: 'Brand story',
      title: 'Sara Milan гардеробты сенімді қадамнан бастайды',
      lead: 'Біз таңертең жинақы, күндіз орынды және кешке әсерлі көрінетін модельдерді таңдаймыз.',
      body: 'Витринаның негізі - түсінікті навигация, нақты тауар карточкасы және сабырлы визуалды ырғақ. Осылайша сатып алушы қажетті жұпты, өлшемді және көңіл күйді тез табады.',
      cta: 'Бренд туралы',
    },
    benefits: {
      eyebrow: 'Сервис',
      title: 'Артық кедергісіз сатып алу',
      description: 'Онлайн витринаға арналған қысқа әрі пайдалы артықшылықтар.',
      items: [
        {
          title: 'Қазақстан бойынша жеткізу',
          description: 'Жеткізу тәсілдері checkout кезеңінде backend-тен алынады.',
        },
        {
          title: 'Ыңғайлы төлем',
          description: 'Kaspi және Stripe болашақ төлем flow үшін API-келісімде сипатталған.',
        },
        {
          title: 'Менеджер қолдауы',
          description: 'Қойма, жеткізу және тапсырыс детальдарын нақтылауға көмектесеміз.',
        },
        {
          title: 'Таңдалған ассортимент',
          description: 'Витрина жаңа түсімдерге, sale және негізгі санаттарға назар аударады.',
        },
      ],
    },
  },
  en: {
    metadata: {
      title: 'Sara Milan',
      description: 'Shoes and accessories for a distinctive wardrobe.',
    },
    hero: {
      eyebrow: 'Sara Milan',
      title: 'Shoes and accessories for a distinctive wardrobe',
      description:
        'Clean silhouettes, refined materials, and considered details for everyday and evening looks.',
      primaryCta: 'Browse catalog',
      secondaryCta: 'New arrivals',
    },
    categories: {
      eyebrow: 'Categories',
      title: 'Find your direction',
      description:
        'Choose the catalog you need right now to instantly discover our unique assortment and make the perfect purchase.',
      emptyTitle: 'Categories are coming soon',
      emptyDescription: 'This section will update automatically when categories become available.',
      cta: 'All categories',
    },
    newProducts: {
      eyebrow: 'New in',
      title: 'New arrivals',
      description: 'Fresh styles to update your look.',
      cta: 'View all new arrivals',
      emptyTitle: 'New arrivals are not available yet',
      emptyDescription: 'Products will appear here after the catalog is updated.',
    },
    saleProducts: {
      eyebrow: 'Sale',
      title: 'Seasonal offers',
      description: 'Selected products at special prices.',
      cta: 'Shop the sale',
      emptyTitle: 'No sale products yet',
      emptyDescription: 'Special offers will appear here when they become available.',
    },
    promo: {
      eyebrow: 'Seasonal edit',
      title: 'Find a pair for your pace',
      description: 'Find clothing that perfectly highlights your unique style—without the hassle.',
      cta: 'Explore the edit',
    },
    story: {
      eyebrow: 'Brand story',
      title: 'Sara Milan starts with a confident step',
      lead: 'We select styles that feel polished in the morning, effortless by day, and expressive in the evening.',
      body: 'Clear navigation, honest product information, and a calm visual rhythm help you quickly find the right pair, size, and mood.',
      cta: 'About the brand',
    },
    benefits: {
      eyebrow: 'Service',
      title: 'Shopping without the noise',
      description: 'Simple, practical advantages for a comfortable online shopping experience.',
      items: [
        {
          title: 'Delivery across Kazakhstan',
          description: 'Choose from available delivery methods during checkout.',
        },
        {
          title: 'Convenient payment',
          description: 'Use the available Kaspi or bank card payment options.',
        },
        {
          title: 'Personal support',
          description: 'Our manager can help with availability, delivery, and order details.',
        },
        {
          title: 'Curated selection',
          description: 'A focused edit of new arrivals, sale pieces, and key categories.',
        },
      ],
    },
  },
} as const satisfies Record<AppLocale, HomeDictionary>;

export const getHomeDictionary = (locale: AppLocale): HomeDictionary => homeDictionary[locale];
