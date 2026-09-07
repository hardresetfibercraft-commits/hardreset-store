import { ShoppingBag } from 'lucide-react';

import type { Product } from '../../lib/types';

import ProductCard from './ProductCard';

import ProductSkeleton from '../ui/ProductSkeleton';

import { useT } from '../../lib/i18n';

interface Props {
  products: Product[];
  loading?: boolean;
}

export default function ProductGrid({
  products,
  loading,
}: Props) {
  const t = useT();

  // =========================================================
  // LOADING STATE
  // =========================================================
  if (loading) {
    return (
      <ProductSkeleton count={8} />
    );
  }

  // =========================================================
  // EMPTY STATE
  // =========================================================
  if (products.length === 0) {
    return (
      <div
        className="
          text-center
          py-20
          animate-fade-in
        "
      >
        <div
          className="
            w-16
            h-16

            rounded-full

            bg-volcanic-800/60

            flex
            items-center
            justify-center

            mx-auto
            mb-4
          "
        >
          <ShoppingBag
            className="
              w-8
              h-8

              text-volcanic-600
            "
          />
        </div>

        <p
          className="
            text-volcanic-400
            text-lg

            mb-1
          "
        >
          {t(
            'products.grid.empty_title'
          )}
        </p>

        <p
          className="
            text-volcanic-500
            text-sm
          "
        >
          {t(
            'products.grid.empty_help'
          )}
        </p>
      </div>
    );
  }

  // =========================================================
  // PRODUCT GRID
  // =========================================================
  return (
    <div
      className="
        grid

        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4

        gap-4
        lg:gap-6
      "
    >
      {products.map(
        (product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
          />
        )
      )}
    </div>
  );
}
