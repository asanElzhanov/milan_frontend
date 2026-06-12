import Link from 'next/link';

import type { ProductListItem } from '@/entities/product';
import { withLocale, type AppLocale } from '@/shared/config';
import { Button, Container, SectionTitle } from '@/shared/ui';
import { ProductGrid } from '@/widgets/product-grid';

import type { HomeDictionary } from './home.types';

type HomeProductsSectionProps = {
  dictionary: HomeDictionary;
  locale: AppLocale;
  products: ProductListItem[];
  type: 'new' | 'sale';
};

export function HomeProductsSection({
  dictionary,
  locale,
  products,
  type,
}: HomeProductsSectionProps) {
  const copy = type === 'new' ? dictionary.newProducts : dictionary.saleProducts;
  const catalogHref = withLocale(
    locale,
    type === 'new' ? '/catalog?is_new=true' : '/catalog?is_sale=true',
  );

  return (
    <section className="sara-section bg-sara-white">
      <Container>
        <SectionTitle
          action={
            <Button asChild variant="outline">
              <Link href={catalogHref}>{copy.cta}</Link>
            </Button>
          }
          description={copy.description}
          eyebrow={copy.eyebrow}
          title={copy.title}
        />
        <ProductGrid
          className="mt-10"
          columns={{ sm: 2, md: 3, lg: 4 }}
          emptyDescription={copy.emptyDescription}
          emptyTitle={copy.emptyTitle}
          locale={locale}
          products={products.slice(0, 4)}
        />
      </Container>
    </section>
  );
}
