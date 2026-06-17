import type { AppLocale } from '@/shared/config';

import type { OtpDictionary } from './model/otp.types';

export const otpDictionary: Record<AppLocale, OtpDictionary> = {
  ru: {
    otpTitle: 'Подтверждение кода',
    otpSubtitle: 'Введите код, отправленный на email или телефон.',
    otpCode: 'Код подтверждения',
    verifyCode: 'Подтвердить',
    resendCode: 'Отправить код повторно',
    changeContact: 'Изменить email или телефон',
    otpComingSoon: 'Проверка OTP будет подключена на следующем этапе.',
    invalidOtp: 'Введите корректный код',
    requiredField: 'Обязательное поле',
  },
  kk: {
    otpTitle: 'Кодты растау',
    otpSubtitle: 'Email немесе телефонға жіберілген кодты енгізіңіз.',
    otpCode: 'Растау коды',
    verifyCode: 'Растау',
    resendCode: 'Кодты қайта жіберу',
    changeContact: 'Email немесе телефонды өзгерту',
    otpComingSoon: 'OTP тексеруі келесі кезеңде қосылады.',
    invalidOtp: 'Дұрыс код енгізіңіз',
    requiredField: 'Міндетті өріс',
  },
};

export const getOtpDictionary = (locale: AppLocale): OtpDictionary => otpDictionary[locale];
