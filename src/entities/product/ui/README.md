# Product UI

## Purpose

Reusable product presentation components for catalog, home, and product-related widgets.

## Components

- ProductImage
- ProductPrice
- ProductBadges
- ProductRating
- ProductColorDots
- ProductSizePreview
- ProductCardSkeleton
- ProductCard

## Data Input

ProductCard consumes normalized `ProductListItem` data from the catalog API layer. Components do not
fetch data themselves.

## What Is Intentionally Not Included

- API calls.
- Add-to-cart behavior.
- Wishlist API integration.
- Product detail page UI.
- Reviews feature.

## Future Integrations

Wishlist is a placeholder callback only. Product detail UI, add-to-cart, and review flows will be
implemented later.
