import type { Product } from './types';

const STORAGE_KEY =
  'hardreset_recently_viewed';

const EVENT_NAME =
  'hardreset-recently-viewed-updated';

const MAX_STORED_PRODUCTS = 6;

export function addRecentlyViewedProduct(
  product: Product
) {
  try {
    const current =
      getRecentlyViewedProducts();

    const filtered =
      current.filter(
        (item) =>
          item.id !== product.id &&
          item.slug !== product.slug
      );

    const updated = [
      product,
      ...filtered,
    ].slice(0, MAX_STORED_PRODUCTS);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new CustomEvent(EVENT_NAME)
    );
  } catch {
    // Recently viewed should never interfere
    // with normal store navigation.
  }
}

export function getRecentlyViewedProducts(): Product[] {
  try {
    const stored =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!stored) {
      return [];
    }

    const parsed =
      JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.slice(
      0,
      MAX_STORED_PRODUCTS
    );
  } catch {
    return [];
  }
}

export function clearRecentlyViewedProducts() {
  try {
    localStorage.removeItem(
      STORAGE_KEY
    );

    window.dispatchEvent(
      new CustomEvent(EVENT_NAME)
    );
  } catch {
    // Ignore storage failures.
  }
}

export const recentlyViewedEvent =
  EVENT_NAME;
