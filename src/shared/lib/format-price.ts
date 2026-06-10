const kztFormatter = new Intl.NumberFormat('ru-KZ', {
  currency: 'KZT',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  style: 'currency',
});

const toNumber = (value: number | string): number => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  const normalized = value.trim().replace(/\s/g, '').replace(',', '.');
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatPriceKzt = (value: number | string): string =>
  kztFormatter.format(toNumber(value));
