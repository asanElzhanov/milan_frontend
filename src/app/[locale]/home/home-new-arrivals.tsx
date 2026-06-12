import Link from 'next/link';

import type { AppLocale } from '@/shared/config';
import { withLocale } from '@/shared/lib';
import { Badge, Button, Container, EmptyState, Price, SectionTitle } from '@/shared/ui';

import type { homeDictionary } from './home.dictionary';
import type { HomeProductPreview } from './home.types';

function HomeProductPreviewCard({
  badge,
  product,
}: {
  badge: string;
  product: HomeProductPreview;
}) {
  return (
    <Link className="sara-focus group block" href={product.href}>
      <div className="relative aspect-[3/4] overflow-hidden border border-sara-beige-dark bg-sara-beige">
        {product.imageUrl ? (
          <div
            aria-label={product.name}
            className="h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
            role="img"
            style={{ backgroundImage: `url("${product.imageUrl}")` }}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#fcfbf9,#f4eee6)]">
            <span className="font-fashion text-4xl text-sara-bronze/55">SM</span>
          </div>
        )}
        {product.isNew ? (
          <Badge className="absolute left-4 top-4" variant="bronze">
            {badge}
          </Badge>
        ) : null}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="font-fashion text-2xl text-sara-black group-hover:text-sara-bronze">
          {product.name}
        </h3>
        <Price oldValue={product.oldPrice} value={product.price} />
      </div>
    </Link>
  );
}

export function HomeNewArrivals({
  dictionary,
  locale,
  products,
}: {
  dictionary: (typeof homeDictionary)[AppLocale];
  locale: AppLocale;
  products: HomeProductPreview[];
}) {
  const copy = dictionary.newArrivals;

  return (
    <section className="sara-section bg-sara-beige">
      <Container>
        <SectionTitle
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          action={
            <Button asChild variant="outline">
              <Link href={withLocale(locale, '/catalog')}>{copy.cta}</Link>
            </Button>
          }
        />

        {products.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <HomeProductPreviewCard badge={copy.badge} key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-10 bg-sara-white"
            title={copy.emptyTitle}
            description={copy.emptyDescription}
            action={
              <Button asChild>
                <Link href={withLocale(locale, '/catalog')}>{copy.cta}</Link>
              </Button>
            }
          />
        )}
      </Container>
    </section>
  );
}
