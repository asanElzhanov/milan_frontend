import type { ProductDetail } from '@/entities/product';
import { Tabs } from '@/shared/ui';

import type { ProductDetailDictionary } from './product-detail.types';

type ProductDescriptionProps = {
  dictionary: ProductDetailDictionary;
  product: ProductDetail;
};

export function ProductDescription({ dictionary, product }: ProductDescriptionProps) {
  const details = [
    product.composition ? `${dictionary.composition}: ${product.composition}` : null,
    product.material ? `${dictionary.material}: ${product.material}` : null,
    product.season ? `${dictionary.season}: ${product.season}` : null,
  ].filter((item): item is string => Boolean(item));

  const tabs = [
    product.description
      ? {
          value: 'description',
          label: dictionary.description,
          content: <p className="text-body text-sara-graphite/75">{product.description}</p>,
        }
      : null,
    details.length > 0
      ? {
          value: 'details',
          label: dictionary.material,
          content: (
            <dl className="space-y-3 text-sm text-sara-graphite/75">
              {details.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </dl>
          ),
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (tabs.length === 0) {
    return null;
  }

  return <Tabs tabs={tabs} />;
}
