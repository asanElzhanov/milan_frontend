import Link from 'next/link';

import { withLocale } from '@/shared/config';
import { getLocalizedField, localizeBackendValue } from '@/shared/lib';
import { Button, Container, ErrorState } from '@/shared/ui';

import { getProductDetailData } from './product-detail.api';
import { getProductGalleryItems } from './product-detail.adapters';
import { getProductDetailDictionary } from './product-detail.dictionary';
import { ProductDescription } from './product-description';
import { ProductDetailGallery } from './product-detail-gallery';
import { ProductDetailInfo } from './product-detail-info';
import { ProductReviewsPreview } from './product-reviews-preview';
import { ProductSimilar } from './product-similar';
import type { ProductDetailPageProps } from './product-detail.types';

export async function ProductDetailPage({ locale, slug }: ProductDetailPageProps) {
  const dictionary = getProductDetailDictionary(locale);
  const data = await getProductDetailData(slug);

  if (!data.product) {
    return (
      <Container className="sara-section">
        <ErrorState
          action={
            <Button asChild>
              <Link href={withLocale(locale, '/catalog')}>{dictionary.backToCatalog}</Link>
            </Button>
          }
          description={dictionary.notFoundDescription}
          title={dictionary.notFoundTitle}
        />
      </Container>
    );
  }

  const galleryItems = getProductGalleryItems(data.product);
  const localizedProduct = {
    ...data.product,
    name: getLocalizedField(data.product, 'name', locale),
    description: getLocalizedField(data.product, 'description', locale),
    composition: getLocalizedField(data.product, 'composition', locale),
    material: getLocalizedField(data.product, 'material', locale),
    categoryName: localizeBackendValue(data.product.categoryName, locale),
    availableColors: data.product.availableColors?.map((color) =>
      localizeBackendValue(color, locale),
    ),
    availableSizes: data.product.availableSizes?.map((size) => localizeBackendValue(size, locale)),
    season: localizeBackendValue(data.product.season, locale),
    variants: data.product.variants?.map((variant) => ({
      ...variant,
      color: localizeBackendValue(variant.color, locale),
      size: localizeBackendValue(variant.size, locale),
    })),
  };

  return (
    <Container className="sara-section space-y-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <ProductDetailGallery items={galleryItems} productName={localizedProduct.name} />
        <ProductDetailInfo dictionary={dictionary} locale={locale} product={localizedProduct} />
      </div>

      <ProductDescription dictionary={dictionary} product={localizedProduct} />
      <ProductReviewsPreview
        dictionary={dictionary}
        locale={locale}
        productId={data.product.id}
        productSlug={decodeURIComponent(slug)}
        reviews={data.reviews}
      />
      <ProductSimilar dictionary={dictionary} locale={locale} products={data.similarProducts} />
    </Container>
  );
}
