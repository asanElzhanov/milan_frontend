import { describe, expect, it } from 'vitest';

import { adaptDeliveryMethod } from './delivery-method.adapters';

const backendMethod = {
  id: 1,
  code: 'courier',
  name_ru: 'Courier delivery',
  name_kz: '',
  name_en: '',
  description_ru: 'Demo courier delivery method.',
  description_kz: '',
  description_en: '',
};

describe('adaptDeliveryMethod localization', () => {
  it('localizes mislabeled backend seed values in Russian', () => {
    expect(adaptDeliveryMethod(backendMethod, 'ru')).toMatchObject({
      name: 'Курьерская доставка',
      description: 'Доставка курьером по указанному адресу.',
    });
  });

  it('falls back to localized code copy in Kazakh', () => {
    expect(adaptDeliveryMethod(backendMethod, 'kk')).toMatchObject({
      name: 'Курьерлік жеткізу',
      description: 'Көрсетілген мекенжайға курьермен жеткізу.',
    });
  });
});
