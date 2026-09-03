  // =========================================================
  // MUTATION CAP POTIONS
  // =========================================================

  const hasHealth = combined.includes('health');
  const hasMelee = combined.includes('melee');

  const hasStamina =
    combined.includes('stamina') ||
    combined.includes('stam');

  const statCount = [
    hasHealth,
    hasMelee,
    hasStamina,
  ].filter(Boolean).length;

  const isMutationProduct =
    combined.includes('mutation') ||
    combined.includes('mutated') ||
    category.includes('mutation');

  const isCapProduct =
    combined.includes('cap') ||
    combined.includes('capped');

  // Triple Mutation Cap
  if (
    isCapProduct &&
    (
      combined.includes('triple') ||
      statCount >= 3
    )
  ) {
    return '/images/store/triple-mutation-cap.webp';
  }

  // Double Mutation Cap
  if (
    isCapProduct &&
    (
      combined.includes('double') ||
      statCount === 2
    )
  ) {
    return '/images/store/double-mutation-cap.webp';
  }

  // Single Health / Melee / Stamina Mutation Cap
  if (
    isCapProduct &&
    (
      isMutationProduct ||
      statCount === 1
    )
  ) {
    return '/images/store/single-mutation-cap.webp';
  }
