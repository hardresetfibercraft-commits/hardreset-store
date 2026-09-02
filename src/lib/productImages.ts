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

  // AUTO CRAFT BPS
  'ammo auto craft bps': '/images/store/ammo-auto-craft-bps.webp',
  'auto craft bps': '/images/store/ammo-auto-craft-bps.webp',
  'auto craft bp': '/images/store/ammo-auto-craft-bps.webp',

  // ASCENSION / XP
  'max ascension': '/images/store/ascension-unlock.webp',
  'ascension unlock': '/images/store/ascension-unlock.webp',
  'ascension bundle': '/images/store/ascension-unlock.webp',

  'max xp': '/images/store/max-level-230.webp',
  'max level 230': '/images/store/max-level-230.webp',
  'level 230': '/images/store/max-level-230.webp',

  'max survivor': '/images/store/max-survivor-bundle.webp',
  'max survivor bundle': '/images/store/max-survivor-bundle.webp',

  'full tribe max survivor': '/images/store/full-tribe-max-survivor.webp',
  '8 player full tribe max survivor': '/images/store/full-tribe-max-survivor.webp',

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

  // DEDIS / RESOURCES
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

  // =========================================================
  // SINGLE DINOS
  // =========================================================

  if (
    category.includes('single dinos') ||
    category.includes('single dino')
  ) {
    if (combined.includes('tek')) {
      return '/images/store/single-dino-450-tek.webp';
    }

    return '/images/store/single-dino-375.webp';
  }

  // =========================================================
  // ASCENSION / MAX SURVIVOR / XP
  // =========================================================

  // 8 Player / Full Tribe Max Survivor
  // MUST come before general Max Survivor rule
  if (
    combined.includes('max survivor') &&
    (
      combined.includes('full tribe') ||
      combined.includes('8 player') ||
      combined.includes('8 man')
    )
  ) {
    return '/images/store/full-tribe-max-survivor.webp';
  }

  // Single + 2-7 Player Max Survivor packages
  if (combined.includes('max survivor')) {
    return '/images/store/max-survivor-bundle.webp';
  }

  // Max XP / Level 230 packages
  if (
    combined.includes('max xp') ||
    combined.includes('max experience') ||
    combined.includes('max level 230') ||
    combined.includes('level 230 xp')
  ) {
    return '/images/store/max-level-230.webp';
  }

  // Ascension-only packages
  if (
    combined.includes('max ascension') ||
    combined.includes('ascension unlock') ||
    (
      combined.includes('ascension') &&
      !combined.includes('survivor')
    )
  ) {
    return '/images/store/ascension-unlock.webp';
  }

  // =========================================================
  // CAVE EDITS
  // =========================================================

  if (category.includes('cave edit')) {
    if (combined.includes('bundle')) {
      return '/images/store/cave-edits-bundle.webp';
    }

    return '/images/store/cave-edits.webp';
  }

  // =========================================================
  // EXACT LOCAL IMAGE MATCHES
  // =========================================================

  const candidates = [slug, name];

  for (const key of candidates) {
    const override = productImageOverrides[key];

    if (override) {
      return override;
    }
  }

  // =========================================================
  // AUTO CRAFT BLUEPRINTS
  // =========================================================

  if (
    combined.includes('auto craft') ||
    combined.includes('autocraft')
  ) {
    return '/images/store/ammo-auto-craft-bps.webp';
  }

  // =========================================================
  // BLUEPRINTS
  // =========================================================

  if (
    combined.includes('saddle') &&
    (
      combined.includes('blueprint') ||
      combined.includes('bp')
    )
  ) {
    return '/images/store/saddle-blueprint-bundle.webp';
  }

  if (
    combined.includes('weapon') &&
    (
      combined.includes('blueprint') ||
      combined.includes('bp')
    )
  ) {
    return '/images/store/25-weapon-blueprints.webp';
  }

  if (
    combined.includes('armor') &&
    (
      combined.includes('blueprint') ||
      combined.includes('bp')
    )
  ) {
    return '/images/store/armor-bundle.webp';
  }

  if (
    combined.includes('tek') &&
    (
      combined.includes('blueprint') ||
      combined.includes('bp')
    )
  ) {
    return '/images/store/25-tek-blueprints.webp';
  }

  // =========================================================
  // VIP PRODUCTS
  // =========================================================

  if (
    combined.includes('tribe') &&
    combined.includes('log')
  ) {
    return '/images/store/tribelog-bundle.webp';
  }

  if (combined.includes('tribelog')) {
    return '/images/store/tribelog-bundle.webp';
  }

  if (
    combined.includes('vip') &&
    combined.includes('room')
  ) {
    return '/images/store/vip-room-bundle.webp';
  }

  // =========================================================
  // RESOURCES / DEDIS
  // =========================================================

  if (
    category.includes('resource') ||
    category.includes('dedi') ||
    category.includes('dedicated')
  ) {
    if (
      combined.includes('advanced rifle') ||
      combined.includes('arb')
    ) {
      return '/images/store/advanced-rifle-dedi.webp';
    }

    if (
      combined.includes('black pearl') ||
      combined.includes('blackpearls')
    ) {
      return '/images/store/black-pearl-dedi.webp';
    }

    if (
      combined.includes('cementing paste') ||
      combined.includes('paste')
    ) {
      return '/images/store/cementing-paste-dedi.webp';
    }

    if (combined.includes('electronics')) {
      return '/images/store/electronics-dedi.webp';
    }

    // Shards before regular Element
    if (
      combined.includes('element shard') ||
      combined.includes('shard')
    ) {
      return '/images/store/element-shard-dedi.webp';
    }

    if (combined.includes('element')) {
      return '/images/store/element-dedi.webp';
    }

    if (combined.includes('crystal')) {
      return '/images/store/crystal-dedi.webp';
    }

    if (combined.includes('fiber')) {
      return '/images/store/fiber-dedi.webp';
    }

    if (combined.includes('polymer')) {
      return '/images/store/hard-polymer-dedi.webp';
    }

    if (combined.includes('metal')) {
      return '/images/store/metal-dedi.webp';
    }

    if (combined.includes('obsidian')) {
      return '/images/store/obsidian-dedi.webp';
    }

    if (combined.includes('oil')) {
      return '/images/store/oil-dedi.webp';
    }

    if (combined.includes('rocket')) {
      return '/images/store/rocket-dedi.webp';
    }

    if (combined.includes('c4')) {
      return '/images/store/c4-dedi.webp';
    }

    if (
      combined.includes('power') &&
      combined.includes('ammo')
    ) {
      return '/images/store/power-and-ammo-dedi-bundle.webp';
    }
  }

  // =========================================================
  // DIRECT DINO FALLBACKS
  // =========================================================

  if (
    combined.includes('375') &&
    combined.includes('dino')
  ) {
    return '/images/store/single-dino-375.webp';
  }

  if (
    combined.includes('450') &&
    combined.includes('tek') &&
    combined.includes('dino')
  ) {
    return '/images/store/single-dino-450-tek.webp';
  }

  // =========================================================
  // FINAL FALLBACK
  // =========================================================

  return product.image ?? undefined;
}
