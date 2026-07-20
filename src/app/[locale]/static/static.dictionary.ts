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
    phone: string;
    email: string;
    instagram: string;
    address: string;
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
      phone: 'Телефон',
      email: 'Email',
      instagram: 'Instagram',
      address: 'Адрес',
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
            'Каталог строится вокруг моделей, которые легко сочетать между собой и с базовым гардеробом.',
            'Наличие, размеры и характеристики товаров отображаются на основе данных магазина и уточняются при оформлении заказа.',
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
            'После оформления заказа backend может вернуть ссылку на оплату или предложить доступный способ оплаты.',
            'Если подключен внешний платежный провайдер, покупатель может быть перенаправлен на защищенную страницу провайдера.',
          ],
        },
        {
          title: 'Статус платежа',
          body: [
            'Финальный статус оплаты подтверждается backend-системой магазина.',
            'Фронтенд не показывает успешную оплату без подтвержденного источника статуса.',
          ],
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
            'Добавьте товары в корзину, проверьте состав заказа и перейдите к оформлению. Доступные способы доставки и оплаты появятся на checkout.',
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
            'Отзывы доступны на странице товара. Возможность публикации и модерация контролируются backend-системой.',
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
      sections: [
        {
          title: 'Использование сайта',
          body: [
            'Используя сайт, покупатель просматривает каталог, добавляет товары в корзину и оформляет заказы через доступные интерфейсы.',
            'Информация о товарах, наличии и характеристиках может обновляться по данным магазина.',
          ],
        },
        {
          title: 'Заказы, оплата и доставка',
          body: [
            'Заказ считается оформленным после заполнения необходимых данных и подтверждения через checkout.',
            'Оплата и доставка зависят от выбранного способа и доступных backend-настроек.',
            'Условия возврата и обмена должны уточняться по актуальной политике магазина.',
          ],
        },
      ],
    },
  },
  kk: {
    labels: {
      catalog: 'Каталогқа өту',
      cart: 'Себетті ашу',
      checkout: 'Рәсімдеуге өту',
      contactsPending: 'Байланыс деректері жоба бапталғаннан кейін қосылады.',
      contactChannels: 'Қолжетімді байланыс арналары арқылы жазыңыз.',
      phone: 'Телефон',
      email: 'Email',
      instagram: 'Instagram',
      address: 'Мекенжай',
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
            'Каталог бір-бірімен және негізгі гардеробпен оңай үйлесетін модельдер айналасында құрылады.',
            'Тауардың болуы, өлшемдері және сипаттамалары дүкен деректеріне сүйеніп көрсетіледі және тапсырыс кезінде нақтыланады.',
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
          body: [
            'Тапсырыс рәсімделгеннен кейін backend төлем сілтемесін немесе қолжетімді төлем әдісін қайтара алады.',
            'Сыртқы төлем провайдері қосылған болса, сатып алушы провайдердің қауіпсіз бетіне бағытталуы мүмкін.',
          ],
        },
        {
          title: 'Төлем статусы',
          body: [
            'Төлемнің соңғы статусы дүкеннің backend жүйесі арқылы расталады.',
            'Фронтенд расталған статус көзі болмаса, төлем сәтті өтті деп көрсетпейді.',
          ],
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
            'Тауарларды себетке қосып, тапсырыс құрамын тексеріңіз және рәсімдеуге өтіңіз. Жеткізу мен төлем әдістері checkout кезінде көрсетіледі.',
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
            'Пікірлер тауар бетінде қолжетімді. Жариялау мүмкіндігі мен модерация backend жүйесі арқылы басқарылады.',
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
      sections: [
        {
          title: 'Сайтты пайдалану',
          body: [
            'Сайтты пайдалана отырып, сатып алушы каталогты қарайды, тауарларды себетке қосады және қолжетімді интерфейстер арқылы тапсырыс рәсімдейді.',
            'Тауарлар, қолжетімділік және сипаттамалар туралы ақпарат дүкен деректеріне қарай жаңартылуы мүмкін.',
          ],
        },
        {
          title: 'Тапсырыс, төлем және жеткізу',
          body: [
            'Тапсырыс қажетті деректер толтырылып, checkout арқылы расталғаннан кейін рәсімделген болып саналады.',
            'Төлем мен жеткізу таңдалған әдіске және қолжетімді backend баптауларына байланысты.',
            'Қайтару және айырбастау шарттарын дүкеннің өзекті саясаты бойынша нақтылау керек.',
          ],
        },
      ],
    },
  },
  en: {
    labels: {
      catalog: 'Browse catalog',
      cart: 'Open cart',
      checkout: 'Go to checkout',
      contactsPending: 'Contact details will be added after project setup.',
      contactChannels: 'Contact us through any available channel.',
      phone: 'Phone',
      email: 'Email',
      instagram: 'Instagram',
      address: 'Address',
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
            'A curated catalog, clear product information, and attentive service make every choice easier.',
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
          body: [
            'Available options may include Kaspi and bank card payment. The exact methods are shown during checkout.',
          ],
        },
        {
          title: 'Payment status',
          body: [
            'Payment status updates after confirmation from the payment provider. You can follow it in your account.',
          ],
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
            'Add products to your cart, proceed to checkout, and enter your contact and delivery details.',
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
      sections: [
        {
          title: 'Using the website',
          body: [
            'The website allows customers to browse products, add items to the cart, and place orders through the available interfaces.',
            'Product information and availability may change as store data is updated.',
          ],
        },
        {
          title: 'Orders, payment, and delivery',
          body: [
            'An order is placed after the required checkout details are submitted.',
            'Payment and delivery depend on the selected method and available service settings.',
            'Contact the store to confirm current return and exchange terms.',
          ],
        },
      ],
    },
  },
};

export const getStaticDictionary = (locale: AppLocale): StaticDictionary =>
  staticDictionary[locale];
