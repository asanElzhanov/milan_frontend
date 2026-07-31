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
      sections: [
        {
          title: 'Использование сайта',
          body: [
            'Используя сайт, покупатель просматривает каталог, добавляет товары в корзину и оформляет заказы через доступные интерфейсы.',
            'Информация о товарах, наличии и характеристиках может обновляться по данным магазина.',
          ],
        },
        {
          title: 'Договор-оферта и акцепт',
          body: [
            'Настоящее соглашение является публичной офертой ТОО «Sara Milan» в соответствии со статьями 395, 396 и 447 Гражданского кодекса Республики Казахстан.',
            'Оформляя заказ на сайте, покупатель безоговорочно и в полном объёме принимает условия оферты. Договор считается заключённым с момента оформления заказа.',
            'Магазин вправе изменять условия соглашения; актуальная редакция публикуется на сайте.',
          ],
        },
        {
          title: 'Статус и обязанности покупателя',
          body: [
            'Покупатель отвечает за достоверность данных, указанных при оформлении заказа, и их чистоту от претензий третьих лиц.',
            'Отметка о согласии с условиями договора при оформлении заказа подтверждает принятие соглашения.',
            'Товары приобретаются для личных, семейных и домашних нужд, не связанных с предпринимательской деятельностью; пользование сайтом является безвозмездным.',
          ],
        },
        {
          title: 'Информация о товарах',
          body: [
            'Изображения-образцы и описания на сайте носят справочный характер и могут не в полной мере передавать цвет, размер и иные характеристики товара.',
            'По вопросам о свойствах товара покупатель может обратиться к специалисту магазина до оформления заказа.',
            'Товары, указанные в счёте отдельными позициями, не являются комплектом.',
          ],
        },
        {
          title: 'Заказы, оплата и доставка',
          body: [
            'Заказ считается оформленным после заполнения необходимых данных и подтверждения через оплату',
            'Оплата и доставка зависят от выбранного способа',
            'Условия возврата и обмена должны уточняться по актуальной политике магазина.',
          ],
        },
        {
          title: 'Цена и способы оплаты',
          body: [
            'Цены указаны в тенге Республики Казахстан и могут быть изменены магазином в одностороннем порядке; цена уже оплаченного заказа изменению не подлежит.',
            'Доступные способы и порядок оплаты указаны в разделе «Оплата». Оплата возможна наличными при получении или безналичным расчётом.',
            'При безналичной оплате обязанность покупателя считается исполненной с момента зачисления средств на счёт магазина.',
          ],
        },
        {
          title: 'Оплата банковскими картами',
          body: [
            'К оплате принимаются карты VISA и MasterCard. Ввод данных карты выполняется на защищённой платёжной странице FreedomPay с использованием шифрования.',
            'Для подтверждения платежа покупатель перенаправляется на страницу банка для ввода кода 3DSecure из СМС.',
            'Данные банковской карты передаются только в зашифрованном виде и не сохраняются на сервере магазина.',
          ],
        },
        {
          title: 'Доставка и получение заказа',
          body: [
            'Доступны самовывоз, доставка магазином и доставка перевозчиком; способ выбирается при оформлении заказа.',
            'Право собственности и риск случайной гибели или повреждения товара переходят к покупателю в момент передачи товара покупателю, его представителю или перевозчику.',
            'Срок поставки товара составляет не более 30 календарных дней. При получении покупатель проверяет соответствие, количество и комплектность товара.',
          ],
        },
        {
          title: 'Гарантии на товар',
          body: [
            'Гарантийный срок на товар составляет 14 дней с момента передачи товара покупателю или его представителю, если иное не предусмотрено дополнительным соглашением.',
            'Гарантия не распространяется на товары, использованные не по назначению или с нарушением правил эксплуатации.',
          ],
        },
        {
          title: 'Возврат и обмен товара',
          body: [
            'Покупатель вправе отказаться от товара до его передачи, а после передачи — в течение 14 календарных дней в порядке, предусмотренном ЗРК «О защите прав потребителей».',
            'Возврат товара надлежащего качества возможен при сохранении товарного вида, потребительских свойств и документа, подтверждающего покупку. Товары с индивидуально-определёнными свойствами возврату не подлежат.',
            'При оплате картой возврат средств производится на банковскую карту в течение 21 рабочего дня с момента получения заявления о возврате на sara_milan.kz@mail.ru.',
          ],
        },
        {
          title: 'Обработка персональных данных',
          body: [
            'Оформляя заказ и регистрируясь, покупатель даёт согласие на обработку персональных данных в целях исполнения соглашения в соответствии с Законом РК «О персональных данных и их защите».',
            'Порядок обработки и защиты данных описан в Политике конфиденциальности магазина.',
          ],
        },
        {
          title: 'Ответственность и разрешение споров',
          body: [
            'Стороны несут ответственность в соответствии с законодательством Республики Казахстан и освобождаются от неё на время действия обстоятельств непреодолимой силы.',
            'Споры решаются путём переговоров, а при недостижении согласия — в судебных органах Республики Казахстан по месту нахождения магазина.',
          ],
        },
        {
          title: 'Реквизиты продавца',
          body: [
            'ТОО «Sara Milan», юридический адрес: г. Алматы, ул. Мендикулова, дом 84. БИН: 200940011821.',
            'Контакты: sara_milan.kz@mail.ru, +7 775 207 5443. Банк: АО «Kaspi Bank», БИК CASPKZKA, счёт KZ27722S000007860818.',
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
      sections: [
        {
          title: 'Сайтты пайдалану',
          body: [
            'Сайтты пайдалана отырып, сатып алушы каталогты қарайды, тауарларды себетке қосады және қолжетімді интерфейстер арқылы тапсырыс рәсімдейді.',
            'Тауарлар, қолжетімділік және сипаттамалар туралы ақпарат дүкен деректеріне қарай жаңартылуы мүмкін.',
          ],
        },
        {
          title: 'Шарт-оферта және акцепт',
          body: [
            'Осы келісім Қазақстан Республикасы Азаматтық кодексінің 395, 396 және 447-баптарына сәйкес «Sara Milan» ЖШС-нің жария офертасы болып табылады.',
            'Сайтта тапсырыс рәсімдей отырып, сатып алушы оферта шарттарын сөзсіз әрі толық көлемде қабылдайды. Шарт тапсырыс рәсімделген сәттен бастап жасалған болып саналады.',
            'Дүкен келісім шарттарын өзгертуге құқылы; өзекті редакция сайтта жарияланады.',
          ],
        },
        {
          title: 'Сатып алушының мәртебесі мен міндеттері',
          body: [
            'Сатып алушы тапсырыс рәсімдеу кезінде көрсетілген деректердің дұрыстығына және олардың үшінші тұлғалардың талаптарынан тазалығына жауап береді.',
            'Тапсырыс рәсімдеу кезінде шарт талаптарымен келісу белгісі келісімнің қабылданғанын растайды.',
            'Тауарлар кәсіпкерлік қызметпен байланысты емес жеке, отбасылық және тұрмыстық қажеттіліктер үшін сатып алынады; сайтты пайдалану тегін.',
          ],
        },
        {
          title: 'Тауар туралы ақпарат',
          body: [
            'Сайттағы үлгі суреттер мен сипаттамалар анықтамалық сипатта болады және тауардың түсін, өлшемін және басқа сипаттамаларын толық көлемде жеткізе алмауы мүмкін.',
            'Тауардың қасиеттері туралы сұрақтар бойынша сатып алушы тапсырыс рәсімдеуге дейін дүкен маманына хабарласа алады.',
            'Шотта жеке позициялармен көрсетілген тауарлар жинақ болып табылмайды.',
          ],
        },
        {
          title: 'Тапсырыс, төлем және жеткізу',
          body: [
            'Тапсырыс қажетті деректер толтырылып, төлем арқылы расталғаннан кейін рәсімделген болып саналады.',
            'Төлем мен жеткізу таңдалған әдіске байланысты.',
            'Қайтару және айырбастау шарттарын дүкеннің өзекті саясаты бойынша нақтылау керек.',
          ],
        },
        {
          title: 'Баға және төлем әдістері',
          body: [
            'Бағалар Қазақстан Республикасының теңгесінде көрсетілген және дүкенмен біржақты өзгертілуі мүмкін; төленген тапсырыстың бағасы өзгертілмейді.',
            'Қолжетімді төлем әдістері мен тәртібі «Төлем» бөлімінде көрсетілген. Төлем алу кезінде қолма-қол немесе қолма-қол ақшасыз есеп айырысу арқылы жасалады.',
            'Қолма-қол ақшасыз төлемде сатып алушының міндеті қаражат дүкен шотына түскен сәттен бастап орындалған болып саналады.',
          ],
        },
        {
          title: 'Банк карталарымен төлеу',
          body: [
            'Төлемге VISA және MasterCard карталары қабылданады. Карта деректерін енгізу шифрлау қолданылатын FreedomPay қорғалған төлем бетінде орындалады.',
            'Төлемді растау үшін сатып алушы СМС-тегі 3DSecure кодын енгізу үшін банк бетіне бағытталады.',
            'Банк картасының деректері тек шифрланған түрде беріледі және дүкен серверінде сақталмайды.',
          ],
        },
        {
          title: 'Жеткізу және тапсырысты алу',
          body: [
            'Өзін-өзі алып кету, дүкеннің жеткізуі және тасымалдаушының жеткізуі қолжетімді; әдіс тапсырыс рәсімдеу кезінде таңдалады.',
            'Меншік құқығы мен тауардың кездейсоқ жойылу немесе зақымдану тәуекелі тауар сатып алушыға, оның өкіліне немесе тасымалдаушыға берілген сәтте өтеді.',
            'Тауарды жеткізу мерзімі 30 күнтізбелік күннен аспайды. Алу кезінде сатып алушы тауардың сәйкестігін, санын және жиынтықтылығын тексереді.',
          ],
        },
        {
          title: 'Тауарға кепілдік',
          body: [
            'Тауарға кепілдік мерзімі, егер қосымша келісімде өзгеше көзделмесе, тауар сатып алушыға немесе оның өкіліне берілген сәттен бастап 14 күнді құрайды.',
            'Кепілдік мақсатына сай емес немесе пайдалану ережелерін бұзып қолданылған тауарларға қолданылмайды.',
          ],
        },
        {
          title: 'Тауарды қайтару және айырбастау',
          body: [
            'Сатып алушы тауарды беруге дейін, ал берілгеннен кейін — «Тұтынушылардың құқықтарын қорғау туралы» ҚР Заңында көзделген тәртіппен 14 күнтізбелік күн ішінде бас тартуға құқылы.',
            'Сапалы тауарды қайтару оның тауарлық түрі, тұтынушылық қасиеттері және сатып алуды растайтын құжат сақталса мүмкін. Жеке-дара анықталған қасиеттері бар тауарлар қайтарылмайды.',
            'Картамен төлеген жағдайда қаражат қайтару туралы өтініш sara_milan.kz@mail.ru мекенжайына түскеннен кейін 21 жұмыс күні ішінде банк картасына жүргізіледі.',
          ],
        },
        {
          title: 'Дербес деректерді өңдеу',
          body: [
            'Тапсырыс рәсімдеу және тіркелу арқылы сатып алушы «Дербес деректер және оларды қорғау туралы» ҚР Заңына сәйкес келісімді орындау мақсатында дербес деректерді өңдеуге келісім береді.',
            'Деректерді өңдеу және қорғау тәртібі дүкеннің Құпиялылық саясатында сипатталған.',
          ],
        },
        {
          title: 'Жауапкершілік және дауларды шешу',
          body: [
            'Тараптар Қазақстан Республикасының заңнамасына сәйкес жауапкершілік көтереді және еңсерілмейтін күш жағдайлары әрекет еткен уақытта одан босатылады.',
            'Даулар келіссөздер арқылы шешіледі, ал келісімге қол жеткізілмесе — дүкеннің орналасқан жері бойынша Қазақстан Республикасының сот органдарында шешіледі.',
          ],
        },
        {
          title: 'Сатушының деректемелері',
          body: [
            '«Sara Milan» ЖШС, заңды мекенжайы: Алматы қ., Меңдіқұлов көшесі, 84-үй. БСН: 200940011821.',
            'Байланыс: sara_milan.kz@mail.ru, +7 775 207 5443. Банк: «Kaspi Bank» АҚ, БСК CASPKZKA, шот KZ27722S000007860818.',
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
      sections: [
        {
          title: 'Using the website',
          body: [
            'The website allows customers to browse products, add items to the cart, and place orders through the available interfaces.',
            'Product information and availability may change as store data is updated.',
          ],
        },
        {
          title: 'Public offer and acceptance',
          body: [
            'These terms constitute a public offer by Sara Milan LLP under Articles 395, 396, and 447 of the Civil Code of the Republic of Kazakhstan.',
            'By placing an order on the website, the customer unconditionally accepts these terms in full. The agreement takes effect when the order is placed.',
            'The store may amend these terms; the current version is published on the website.',
          ],
        },
        {
          title: 'Customer status and obligations',
          body: [
            'The customer is responsible for the accuracy of the information provided at checkout and for keeping it free of third-party claims.',
            'Confirming the terms at checkout constitutes acceptance of this agreement.',
            'Products are purchased for personal, family, and household use unrelated to business activity; use of the website is free of charge.',
          ],
        },
        {
          title: 'Product information',
          body: [
            'Sample images and descriptions on the website are for reference and may not fully convey the color, size, or other characteristics of a product.',
            'For questions about a product, the customer may contact the store before placing an order.',
            'Products listed as separate line items on an invoice do not constitute a set.',
          ],
        },
        {
          title: 'Orders, payment, and delivery',
          body: [
            'An order is considered placed after the required information is completed and payment is confirmed.',
            'Payment and delivery depend on the selected method.',
            'Contact the store to confirm current return and exchange terms.',
          ],
        },
        {
          title: 'Prices and payment methods',
          body: [
            'Prices are shown in Kazakhstani tenge and may be changed by the store unilaterally; the price of an order already paid for is not subject to change.',
            'Available payment methods are shown in the Payment section. Payment can be made in cash on delivery or by bank transfer.',
            'For bank transfers, the customer’s obligation is fulfilled once the funds are credited to the store’s account.',
          ],
        },
        {
          title: 'Card payments',
          body: [
            'VISA and MasterCard are accepted. Card details are entered on the secure FreedomPay payment page using encryption.',
            'To confirm the payment, the customer is redirected to their bank’s page to enter the 3DSecure code sent by SMS.',
            'Card details are transmitted only in encrypted form and are not stored on the store’s server.',
          ],
        },
        {
          title: 'Delivery and receiving orders',
          body: [
            'Pickup, store delivery, and courier delivery are available; the method is chosen at checkout.',
            'Ownership and the risk of accidental loss or damage pass to the customer when the product is handed over to the customer, their representative, or the carrier.',
            'The delivery period does not exceed 30 calendar days. On receipt, the customer checks the product against the order for condition, quantity, and completeness.',
          ],
        },
        {
          title: 'Product warranty',
          body: [
            'The warranty period is 14 days from the handover of the product to the customer or their representative, unless otherwise agreed.',
            'The warranty does not cover products used improperly or in breach of operating rules.',
          ],
        },
        {
          title: 'Returns and exchanges',
          body: [
            'The customer may decline a product before handover and, after handover, within 14 calendar days under the Law of the Republic of Kazakhstan “On Consumer Protection”.',
            'A return of a product of proper quality is possible if its presentation, consumer properties, and proof of purchase are preserved. Products with individually defined properties are non-returnable.',
            'For card payments, refunds are made to the bank card within 21 business days of receiving the refund request at sara_milan.kz@mail.ru.',
          ],
        },
        {
          title: 'Personal data processing',
          body: [
            'By placing an order and registering, the customer consents to the processing of personal data to perform this agreement, in accordance with the Law of the Republic of Kazakhstan “On Personal Data and Its Protection”.',
            'How data is processed and protected is described in the store’s Privacy Policy.',
          ],
        },
        {
          title: 'Liability and dispute resolution',
          body: [
            'The parties are liable under the laws of the Republic of Kazakhstan and are released from liability during force majeure events.',
            'Disputes are resolved through negotiation and, failing agreement, in the courts of the Republic of Kazakhstan at the store’s location.',
          ],
        },
        {
          title: 'Seller details',
          body: [
            'Sara Milan LLP, registered address: Almaty, Mendikulov St., 84. BIN: 200940011821.',
            'Contact: sara_milan.kz@mail.ru, +7 775 207 5443. Bank: Kaspi Bank JSC, BIC CASPKZKA, account KZ27722S000007860818.',
          ],
        },
      ],
    },
  },
};

export const getStaticDictionary = (locale: AppLocale): StaticDictionary =>
  staticDictionary[locale];
