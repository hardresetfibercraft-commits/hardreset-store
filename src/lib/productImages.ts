const productImageOverrides: Record<string, string> = {
  // BLUEPRINTS
  '10 saddle blueprint bundle': '/images/store/10-saddle-blueprint-bundle.webp',
  '10 saddle blueprints': '/images/store/10-saddle-blueprint-bundle.webp',
  '10 saddle bps': '/images/store/10-saddle-blueprint-bundle.webp',

  '25 tek blueprints': '/images/store/25-tek-blueprints.webp',
  '25 tek bps': '/images/store/25-tek-blueprints.webp',

  '25 weapon blueprints': '/images/store/25-weapon-blueprints.webp',
  '25 weapon bps': '/images/store/25-weapon-blueprints.webp',

  'saddle blueprint bundle': '/images/store/saddle-blueprint-bundle.webp',
  'saddle bundle': '/images/store/saddle-blueprint-bundle.webp',

  // DINOS
  'single dino 375': '/images/store/single-dino-375.webp',
  'level 375 dino': '/images/store/single-dino-375.webp',
  '375 dino': '/images/store/single-dino-375.webp',

  'single dino 450 tek': '/images/store/single-dino-450-tek.webp',
  'level 450 tek dino': '/images/store/single-dino-450-tek.webp',
  '450 tek dino': '/images/store/single-dino-450-tek.webp',

  'tek dino collection': '/images/store/tek-dino-collection.webp',
  'wyvern collection': '/images/store/wyvern-collection.webp',

  // DINO / WAR BUNDLES
  'air force': '/images/store/air-force-bundle.webp',
  'air force bundle': '/images/store/air-force-bundle.webp',

  'base defense': '/images/store/base-defense-bundle.webp',
  'base defense bundle': '/images/store/base-defense-bundle.webp',

  'main offense bundle': '/images/store/main-offense-bundle.webp',
  'main offense squad': '/images/store/main-offense-bundle.webp',

  'soaker squad': '/images/store/soaker-squad.webp',
  'soaker squad bundle': '/images/store/soaker-squad.webp',

  'platform army': '/images/store/platform-army.webp',
  'platform army bundle': '/images/store/platform-army.webp',

  'full tribe bundle': '/images/store/full-tribe-bundle.webp',
  'full tribe dino bundle': '/images/store/full-tribe-bundle.webp',

  // SPECIAL BUNDLES
  'armor bundle': '/images/store/armor-bundle.webp',

  'ascension bundle': '/images/store/ascension-bundle.webp',

  'farm bundle': '/images/store/farm-bundle.webp',

  'mutation package': '/images/store/mutation-package.webp',
  'mutation package bundle': '/images/store/mutation-package.webp',

  'rebuild bundle': '/images/store/rebuild-bundle.webp',

  'tool bundle': '/images/store/tool-bundle.webp',

  'tribelog bundle': '/images/store/tribelog-bundle.webp',
  'tribe log bundle': '/images/store/tribelog-bundle.webp',

  'vip room bundle': '/images/store/vip-room-bundle.webp',
  'vip bundle': '/images/store/vip-room-bundle.webp',

  // CAVE EDITS
  'cave edits': '/images/store/cave-edits.webp',
  'cave edit': '/images/store/cave-edits.webp',

  'cave edits bundle': '/images/store/cave-edits-bundle.webp',
  'cave edit bundle': '/images/store/cave-edits-bundle.webp',

  // STRUCTURES
  'single structure': '/images/store/single-structure.webp',
  'structures': '/images/store/single-structure.webp',

  'structure bundle': '/images/store/structure-bundle.webp',

  // DEDIS
  'advanced rifle dedi': '/images/store/advanced-rifle-dedi.webp',
  'arb dedi': '/images/store/advanced-rifle-dedi.webp',
  'advanced rifle bullet dedi': '/images/store/advanced-rifle-dedi.webp',

  'black pearl dedi': '/images/store/black-pearl-dedi.webp',

  'c4 dedi': '/images/store/c4-dedi.webp',

  'cementing paste dedi': '/images/store/cementing-paste-dedi.webp',
  'paste dedi': '/images/store/cementing-paste-dedi.webp',

  'crystal dedi': '/images/store/crystal-dedi.webp',

  'electronics dedi': '/images/store/electronics-dedi.webp',

  'element dedi': '/images/store/element-dedi.webp',

  'element shard dedi': '/images/store/element-shard-dedi.webp',
  'element shards dedi': '/images/store/element-shard-dedi.webp',
  'shard dedi': '/images/store/element-shard-dedi.webp',

  'fiber dedi': '/images/store/fiber-dedi.webp',

  'hard polymer dedi': '/images/store/hard-polymer-dedi.webp',
  'polymer dedi': '/images/store/hard-polymer-dedi.webp',

  'metal dedi': '/images/store/metal-dedi.webp',

  'obsidian dedi': '/images/store/obsidian-dedi.webp',

  'oil dedi': '/images/store/oil-dedi.webp',

  'rocket dedi': '/images/store/rocket-dedi.webp',
  'rockets dedi': '/images/store/rocket-dedi.webp',

  'power and ammo dedi': '/images/store/power-and-ammo-dedi-bundle.webp',
  'power and ammo dedi bundle': '/images/store/power-and-ammo-dedi-bundle.webp',
  'power ammo dedi': '/images/store/power-and-ammo-dedi-bundle.webp',
  'power ammo dedi bundle': '/images/store/power-and-ammo-dedi-bundle.webp',
};

function normalizeProductKey(value?: string | null): string {
  return (value ?? '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

export function getProductImage(product: {
  name?: string | null;
  slug?: string | null;
  image?: string | null;
  category?: {
    name?: string | null;
    slug?: string | null;
  } | null;
}): string | undefined {
  const name = normalizeProductKey(product.name);
  const slug = normalizeProductKey(product.slug);

  const categoryName = normalizeProductKey(product.category?.name);
  const categorySlug = normalizeProductKey(product.category?.slug);

  const combined = `${name} ${slug}`;
  const category = `${categoryName} ${categorySlug}`;

  // SINGLE DINOS
  if (
    category.includes('single dinos') ||
    category.includes('single dino')
  ) {
    // Tek creatures use the Level 450 Tek image
    if (combined.includes('tek')) {
      return '/images/store/single-dino-450-tek.webp';
    }

    // Every other single dino uses the Level 375 image
    return '/images/store/single-dino-375.webp';
  }

  // EXACT LOCAL IMAGE MATCHES
  const candidates = [slug, name];

  for (const key of candidates) {
    const override = productImageOverrides[key];

    if (override) {
      return override;
    }
  }

  // FLEXIBLE BLUEPRINT MATCHING

  // Saddle BPs
  if (
    combined.includes('saddle') &&
    (
      combined.includes('blueprint') ||
      combined.includes('bp')
    )
  ) {
    return '/images/store/saddle-blueprint-bundle.webp';
  }

  // Weapon BPs
  if (
    combined.includes('weapon') &&
    (
      combined.includes('blueprint') ||
      combined.includes('bp')
    )
  ) {
    return '/images/store/25-weapon-blueprints.webp';
  }

  // Armor BPs
  if (
    combined.includes('armor') &&
    (
      combined.includes('blueprint') ||
      combined.includes('bp')
    )
  ) {
    return '/images/store/armor-bundle.webp';
  }

  // Direct Level 375 product fallback
  if (
    combined.includes('375') &&
    combined.includes('dino')
  ) {
    return '/images/store/single-dino-375.webp';
  }

  // Direct Level 450 Tek product fallback
  if (
    combined.includes('450') &&
    combined.includes('tek') &&
    combined.includes('dino')
  ) {
    return '/images/store/single-dino-450-tek.webp';
  }

  // Tip4Serv fallback
  return product.image ?? undefined;
}
