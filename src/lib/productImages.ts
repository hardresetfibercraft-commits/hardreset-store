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

export function getProductImage(product: {
  name?: string;
  slug?: string;
  image?: string;
}): string | undefined {
  const candidates = [
    normalizeProductKey(product.slug),
    normalizeProductKey(product.name),
  ];

  for (const key of candidates) {
    const override = productImageOverrides[key];

    if (override) {
      return override;
    }
  }

  for (const key of candidates) {
    if (key.includes('375') && key.includes('dino')) {
      return '/images/store/single-dino-375.webp';
    }

    if (key.includes('450') && key.includes('tek') && key.includes('dino')) {
      return '/images/store/single-dino-450-tek.webp';
    }
  }

  return product.image;
}
