export function getProductImage(product: {
  name?: string;
  slug?: string;
  image?: string;
  category?: {
    name?: string;
    slug?: string;
  };
}): string | undefined {
  const name = normalizeProductKey(product.name);
  const slug = normalizeProductKey(product.slug);

  const categoryName = normalizeProductKey(product.category?.name);
  const categorySlug = normalizeProductKey(product.category?.slug);

  const combined = `${name} ${slug}`;
  const category = `${categoryName} ${categorySlug}`;

  // SINGLE DINOS CATEGORY
  if (
    category.includes('single dinos') ||
    category.includes('single dino')
  ) {
    // Any Tek creature gets the Level 450 Tek image
    if (combined.includes('tek')) {
      return '/images/store/single-dino-450-tek.webp';
    }

    // All other single dinos get the Level 375 image
    return '/images/store/single-dino-375.webp';
  }

  // Direct 375 products
  if (combined.includes('375')) {
    return '/images/store/single-dino-375.webp';
  }

  // Direct 450 Tek products
  if (
    combined.includes('450') &&
    combined.includes('tek')
  ) {
    return '/images/store/single-dino-450-tek.webp';
  }

  // All other local image overrides
  const candidates = [slug, name];

  for (const key of candidates) {
    const override = productImageOverrides[key];

    if (override) {
      return override;
    }
  }

  // Tip4Serv fallback
  return product.image;
}
