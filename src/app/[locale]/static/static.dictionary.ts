import type { AppLocale } from '@/shared/config';

import type {
  StaticFaqItem,
  StaticPageContent,
  StaticPageKey,
  StaticSection,
} from './static.types';

type StaticDictionary = Record<
  StaticPageKey,
  StaticPageContent & {
    sections?: StaticSection[];
    faq?: StaticFaqItem[];
  }
> & {
  labels: {
    catalog: string;
    cart: string;
    checkout: string;
    contactsPending: string;
    contactChannels: string;
    whatsapp: string;
    phone: string;
    email: string;
    instagram: string;
    address: string;
    documents: string;
  };
};

export const staticDictionary: Record<AppLocale, StaticDictionary> = {
  ru: {
    labels: {
      catalog: 'Перейти в каталог',
      cart: 'Открыть корзину',
      checkout: 'Перейти к оформлению',
      contactsPending: 'Контакты будут добавлены после настройки проекта.',
      contactChannels: 'Напишите нам в доступные каналы связи.',
      whatsapp: 'WhatsApp',
      phone: 'Телефон',
      email: 'Email',
      instagram: 'Instagram',
      address: 'Адрес',
      documents: 'Документы',
    },
    about: {
      title: 'О Sara Milan',
      subtitle: 'Премиальный магазин женской обуви и аксессуаров.',
      metaTitle: 'О Sara Milan — Sara Milan',
      metaDescription:
        'Информация о Sara Milan, подходе к подбору женской обуви, аксессуаров и клиентскому сервису.',
      sections: [
        {
          title: 'История бренда',
          body: [
            'Sara Milan создан как спокойное fashion-пространство для выбора выразительной женской обуви и аксессуаров.',
            'Мы уделяем внимание силуэту, фактуре и тому, как вещь вписывается в повседневный и вечерний гардероб.',
          ],
        },
        {
          title: 'Качество и подбор',
          body: [
            'Товар идеального качества с трендовым дизайном созданный именно для вас! Мы ловим самые горячие модные течения, чтобы подарить вам лучшее.',
            'Подбираем товар на основе ваших интересов.',
          ],
        },
        {
          title: 'Подход к сервису',
          body: [
            'Мы стараемся сделать путь от выбора до оформления заказа понятным: корзина, доставка, оплата и история заказов собраны в одном интерфейсе.',
            'Финальные условия заказа подтверждаются на этапе оформления и зависят от выбранных товаров и доступных способов доставки.',
          ],
        },
      ],
    },
    delivery: {
      title: 'Доставка',
      subtitle: 'Условия доставки и получения заказа.',
      metaTitle: 'Доставка — Sara Milan',
      metaDescription:
        'Информация о доставке Sara Milan: доступные способы, стоимость и подтверждение условий при оформлении заказа.',
      sections: [
        {
          title: 'Способы доставки',
          body: [
            'Доступные варианты доставки зависят от города, состава заказа и настроек магазина.',
            'На этапе оформления заказа система показывает актуальные способы доставки, которые доступны для выбранных товаров.',
          ],
        },
        {
          title: 'Стоимость и сроки',
          body: [
            'Стоимость доставки может быть фиксированной, бесплатной или рассчитываться менеджером в зависимости от подключенного способа.',
            'Финальные сроки и условия доставки подтверждаются во время оформления заказа или после уточнения деталей менеджером.',
          ],
        },
      ],
    },
    payment: {
      title: 'Оплата',
      subtitle: 'Доступные способы оплаты заказа.',
      metaTitle: 'Оплата — Sara Milan',
      metaDescription:
        'Информация об оплате Sara Milan: общий порядок оплаты, платежные провайдеры и подтверждение статуса backend-системой.',
      sections: [
        {
          title: 'Как проходит оплата',
          body: [
            'Для обеспечения удобства и оперативности проведения платежей мы применяем систему Freedom Pay.',
          ],
        },
        {
          title: 'Статус платежа',
          body: ['Финальный статус оплаты подтверждается системой магазина'],
        },
      ],
    },
    faq: {
      title: 'Вопросы и ответы',
      subtitle: 'Короткие ответы по заказам, доставке, оплате и аккаунту.',
      metaTitle: 'FAQ — Sara Milan',
      metaDescription:
        'Ответы на частые вопросы о заказах, доставке, оплате и аккаунте Sara Milan.',
      faq: [
        {
          question: 'Как оформить заказ?',
          answer:
            'Добавьте товары в корзину, проверьте состав заказа и перейдите к оформлению. Доступные способы доставки и оплаты появятся во время оформления заказа.',
        },
        {
          question: 'Можно ли изменить заказ после оформления?',
          answer:
            'Изменение заказа зависит от его статуса. Если заказ уже передан в обработку, условия нужно уточнить через доступные каналы связи.',
        },
        {
          question: 'Как узнать статус заказа?',
          answer:
            'Авторизованные покупатели могут смотреть заказы в личном кабинете в разделе истории заказов.',
        },
        {
          question: 'Как добавить адрес доставки?',
          answer:
            'Адрес можно добавить в личном кабинете или во время оформления заказа, если такой вариант доступен.',
        },
        {
          question: 'Как оставить отзыв?',
          answer:
            'Отзывы доступны на странице товара. Возможность публикации только после получения товара.',
        },
        {
          question: 'Что делать, если оплата не прошла?',
          answer:
            'Вернитесь к заказу и попробуйте доступный способ оплаты повторно. Если проблема сохраняется, уточните статус через контакты магазина.',
        },
      ],
    },
    contacts: {
      title: 'Контакты',
      subtitle: 'Свяжитесь с нами по вопросам заказов, доставки и ассортимента.',
      metaTitle: 'Контакты — Sara Milan',
      metaDescription:
        'Контактная страница Sara Milan. Данные связи отображаются только после настройки публичных контактов проекта.',
    },
    privacy: {
      title: 'Политика конфиденциальности',
      metaTitle: 'Политика конфиденциальности — Sara Milan',
      metaDescription:
        'Общая информация о том, какие данные могут обрабатываться Sara Milan для оформления заказов и сервиса.',
      sections: [
        {
          title: 'Какие данные могут обрабатываться',
          body: [
            'Для работы магазина могут использоваться данные аккаунта, контактные данные, адрес доставки, состав заказа и история взаимодействия с сервисом.',
            'Эти данные нужны для оформления заказа, доставки, уведомлений по заказу и улучшения качества сервиса.',
          ],
        },
        {
          title: 'Как используются данные',
          body: [
            'Данные используются в рамках работы магазина и не предназначены для продажи третьим лицам.',
            'Покупатель может запросить уточнение, обновление или удаление данных через доступный контактный канал после его настройки.',
          ],
        },
      ],
    },
    terms: {
      title: 'Пользовательское соглашение',
      metaTitle: 'Пользовательское соглашение — Sara Milan',
      metaDescription:
        'Общие условия использования сайта Sara Milan, оформления заказов, оплаты и доставки.',
    },
  },
  kk: {
    labels: {
      catalog: 'Каталогқа өту',
      cart: 'Себетті ашу',
      checkout: 'Рәсімдеуге өту',
      contactsPending: 'Байланыс деректері жоба бапталғаннан кейін қосылады.',
      contactChannels: 'Қолжетімді байланыс арналары арқылы жазыңыз.',
      whatsapp: 'WhatsApp',
      phone: 'Телефон',
      email: 'Email',
      instagram: 'Instagram',
      address: 'Мекенжай',
      documents: 'Құжаттар',
    },
    about: {
      title: 'Sara Milan туралы',
      subtitle: 'Әйелдер аяқ киімі мен аксессуарларының премиум дүкені.',
      metaTitle: 'Sara Milan туралы — Sara Milan',
      metaDescription:
        'Sara Milan туралы ақпарат: әйелдер аяқ киімі, аксессуарлар және клиенттік сервиске көзқарас.',
      sections: [
        {
          title: 'Бренд тарихы',
          body: [
            'Sara Milan әйелдер аяқ киімі мен аксессуарларын таңдауға арналған жинақы fashion-кеңістік ретінде құрылған.',
            'Біз силуэтке, материал әсеріне және бұйымның күнделікті не кешкі гардеробқа үйлесуіне мән береміз.',
          ],
        },
        {
          title: 'Сапа және таңдау',
          body: [
            'Сіз үшін арнайы жасалған мінсіз сапа мен трендтегі дизайн! Сізге ең жақсысын ұсыну үшін сәннің ең қызу трендтерін қадағалаймыз.',
            'Тауарларды қызығушылықтарыңызға қарай таңдаймыз.',
          ],
        },
        {
          title: 'Сервис тәсілі',
          body: [
            'Таңдаудан тапсырыс рәсімдеуге дейінгі жол түсінікті болуы үшін себет, жеткізу, төлем және тапсырыс тарихы бір интерфейске жиналған.',
            'Тапсырыстың соңғы шарттары рәсімдеу кезінде расталады және таңдалған тауарлар мен жеткізу әдістеріне байланысты.',
          ],
        },
      ],
    },
    delivery: {
      title: 'Жеткізу',
      subtitle: 'Тапсырысты жеткізу және алу шарттары.',
      metaTitle: 'Жеткізу — Sara Milan',
      metaDescription:
        'Sara Milan жеткізуі туралы ақпарат: қолжетімді әдістер, құны және тапсырыс рәсімдеу кезіндегі шарттар.',
      sections: [
        {
          title: 'Жеткізу әдістері',
          body: [
            'Қолжетімді жеткізу нұсқалары қалаға, тапсырыс құрамына және дүкен баптауларына байланысты.',
            'Тапсырыс рәсімдеу кезінде жүйе таңдалған тауарларға қолжетімді өзекті жеткізу әдістерін көрсетеді.',
          ],
        },
        {
          title: 'Құны және мерзімі',
          body: [
            'Жеткізу құны бекітілген, тегін немесе менеджер арқылы есептелетін болуы мүмкін.',
            'Соңғы мерзімдер мен шарттар тапсырыс рәсімдеу кезінде немесе менеджер нақтылағаннан кейін расталады.',
          ],
        },
      ],
    },
    payment: {
      title: 'Төлем',
      subtitle: 'Тапсырысты төлеу әдістері.',
      metaTitle: 'Төлем — Sara Milan',
      metaDescription:
        'Sara Milan төлемі туралы ақпарат: төлем тәртібі, провайдер бетіне өту және backend арқылы статус растау.',
      sections: [
        {
          title: 'Төлем қалай өтеді',
          body: ['Төлемдерді ыңғайлы әрі жедел жүргізу үшін Freedom Pay жүйесін қолданамыз.'],
        },
        {
          title: 'Төлем статусы',
          body: ['Төлемнің соңғы статусы дүкен жүйесі арқылы расталады.'],
        },
      ],
    },
    faq: {
      title: 'Сұрақтар мен жауаптар',
      subtitle: 'Тапсырыс, жеткізу, төлем және аккаунт бойынша қысқа жауаптар.',
      metaTitle: 'FAQ — Sara Milan',
      metaDescription:
        'Sara Milan тапсырыстары, жеткізуі, төлемі және аккаунты бойынша жиі қойылатын сұрақтар.',
      faq: [
        {
          question: 'Тапсырысты қалай рәсімдеймін?',
          answer:
            'Тауарларды себетке қосып, тапсырыс құрамын тексеріңіз де, рәсімдеуге өтіңіз. Қолжетімді жеткізу және төлем тәсілдері тапсырысты рәсімдеу кезінде көрсетіледі.',
        },
        {
          question: 'Тапсырысты рәсімдегеннен кейін өзгертуге бола ма?',
          answer:
            'Тапсырысты өзгерту оның статусына байланысты. Тапсырыс өңдеуге берілсе, шарттарды қолжетімді байланыс арналары арқылы нақтылау керек.',
        },
        {
          question: 'Тапсырыс статусын қалай білемін?',
          answer:
            'Авторизацияланған сатып алушылар жеке кабинеттегі тапсырыс тарихынан статусын көре алады.',
        },
        {
          question: 'Жеткізу мекенжайын қалай қосамын?',
          answer:
            'Мекенжайды жеке кабинетте немесе мұндай мүмкіндік болса, тапсырыс рәсімдеу кезінде қосуға болады.',
        },
        {
          question: 'Пікірді қалай қалдырамын?',
          answer:
            'Пікірлер тауар бетінде қолжетімді. Пікірді тауарды алғаннан кейін ғана жариялауға болады.',
        },
        {
          question: 'Төлем өтпесе не істеу керек?',
          answer:
            'Тапсырысқа қайта оралып, қолжетімді төлем әдісін қайталап көріңіз. Мәселе сақталса, дүкен контактілері арқылы статусын нақтылаңыз.',
        },
      ],
    },
    contacts: {
      title: 'Байланыс',
      subtitle: 'Тапсырыс, жеткізу және ассортимент сұрақтары бойынша бізге хабарласыңыз.',
      metaTitle: 'Байланыс — Sara Milan',
      metaDescription:
        'Sara Milan байланыс беті. Байланыс деректері жобаның жария контактілері бапталғаннан кейін көрсетіледі.',
    },
    privacy: {
      title: 'Құпиялылық саясаты',
      metaTitle: 'Құпиялылық саясаты — Sara Milan',
      metaDescription:
        'Sara Milan тапсырыстар мен сервис үшін қандай деректерді өңдей алатыны туралы жалпы ақпарат.',
      sections: [
        {
          title: 'Қандай деректер өңделуі мүмкін',
          body: [
            'Дүкен жұмысы үшін аккаунт деректері, байланыс деректері, жеткізу мекенжайы, тапсырыс құрамы және сервиспен әрекет тарихы қолданылуы мүмкін.',
            'Бұл деректер тапсырыс рәсімдеу, жеткізу, тапсырыс бойынша хабарламалар және сервисті жақсарту үшін қажет.',
          ],
        },
        {
          title: 'Деректер қалай қолданылады',
          body: [
            'Деректер дүкен жұмысы аясында қолданылады және үшінші тұлғаларға сатуға арналмаған.',
            'Сатып алушы байланыс арнасы бапталғаннан кейін деректерді нақтылау, жаңарту немесе жою туралы сұрай алады.',
          ],
        },
      ],
    },
    terms: {
      title: 'Пайдаланушы келісімі',
      metaTitle: 'Пайдаланушы келісімі — Sara Milan',
      metaDescription:
        'Sara Milan сайтын пайдалану, тапсырыс рәсімдеу, төлем және жеткізу бойынша жалпы шарттар.',
    },
  },
  en: {
    labels: {
      catalog: 'Browse catalog',
      cart: 'Open cart',
      checkout: 'Go to checkout',
      contactsPending: 'Contact details will be added after project setup.',
      contactChannels: 'Contact us through any available channel.',
      whatsapp: 'WhatsApp',
      phone: 'Phone',
      email: 'Email',
      instagram: 'Instagram',
      address: 'Address',
      documents: 'Documents',
    },
    about: {
      title: 'About Sara Milan',
      subtitle: 'A premium store for women’s shoes and accessories.',
      metaTitle: 'About Sara Milan — Sara Milan',
      metaDescription:
        'Learn about Sara Milan, our selection, and our approach to customer service.',
      sections: [
        {
          title: 'Our story',
          body: [
            'Sara Milan is a calm fashion space for choosing distinctive women’s shoes and accessories.',
            'We focus on silhouette, texture, and pieces that work across everyday and evening wardrobes.',
          ],
        },
        {
          title: 'Our approach',
          body: [
            'Perfect quality and on-trend design, created especially for you! We follow the hottest fashion trends to bring you the very best.',
            'We select products based on your interests.',
          ],
        },
      ],
    },
    delivery: {
      title: 'Delivery',
      subtitle: 'Available delivery options are shown during checkout.',
      metaTitle: 'Delivery — Sara Milan',
      metaDescription: 'Delivery terms and options for Sara Milan orders.',
      sections: [
        {
          title: 'Delivery options',
          body: [
            'Available methods, timing, and prices are loaded during checkout for your address.',
            'A manager may contact you to confirm delivery details.',
          ],
        },
        {
          title: 'Receiving your order',
          body: ['Check the package and product condition when receiving your order.'],
        },
      ],
    },
    payment: {
      title: 'Payment',
      subtitle: 'Choose an available payment method when placing your order.',
      metaTitle: 'Payment — Sara Milan',
      metaDescription: 'Payment methods and payment status information for Sara Milan orders.',
      sections: [
        {
          title: 'Payment methods',
          body: ['For convenient and efficient payments, we use the Freedom Pay system.'],
        },
        {
          title: 'Payment status',
          body: ['The final payment status is confirmed by the store system.'],
        },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      subtitle: 'Answers about orders, delivery, payment, and returns.',
      metaTitle: 'FAQ — Sara Milan',
      metaDescription: 'Frequently asked questions about shopping at Sara Milan.',
      faq: [
        {
          question: 'How do I place an order?',
          answer:
            'Add products to your cart, review your order, and proceed to checkout. Available delivery and payment methods will appear while you place your order.',
        },
        {
          question: 'How can I pay?',
          answer: 'The available payment methods are displayed during checkout.',
        },
        {
          question: 'How can I track my order?',
          answer: 'Sign in and open the Orders section in your account.',
        },
        {
          question: 'Can I change my delivery address?',
          answer:
            'You can manage saved addresses in your account or enter a new address during checkout.',
        },
        {
          question: 'How can I leave a review?',
          answer:
            'Reviews are available on the product page. You can publish a review only after receiving the product.',
        },
        {
          question: 'How do returns work?',
          answer:
            'Contact Sara Milan to confirm the current return and exchange terms for your order.',
        },
      ],
    },
    contacts: {
      title: 'Contacts',
      subtitle: 'We are here to help with products, orders, and delivery.',
      metaTitle: 'Contacts — Sara Milan',
      metaDescription: 'Contact information for Sara Milan.',
    },
    privacy: {
      title: 'Privacy policy',
      metaTitle: 'Privacy policy — Sara Milan',
      metaDescription: 'How Sara Milan processes and protects customer data.',
      sections: [
        {
          title: 'Data we collect',
          body: [
            'We process contact, delivery, account, and order information required to provide the store’s services.',
          ],
        },
        {
          title: 'How data is used',
          body: [
            'Data is used to process orders, deliver purchases, provide support, and maintain account functionality.',
          ],
        },
        {
          title: 'Your choices',
          body: [
            'You may contact us to request clarification, correction, or deletion of your personal data where applicable.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms of use',
      metaTitle: 'Terms of use — Sara Milan',
      metaDescription: 'General terms for using the Sara Milan website and placing orders.',
    },
  },
};

export const getStaticDictionary = (locale: AppLocale): StaticDictionary =>
  staticDictionary[locale];
