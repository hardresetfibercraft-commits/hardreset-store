import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  Clock3,
  Trash2,
} from 'lucide-react';

import type {
  Product,
} from '../../lib/types';

import ProductCard from '../products/ProductCard';

import {
  clearRecentlyViewedProducts,
  getRecentlyViewedProducts,
  recentlyViewedEvent,
} from '../../lib/recentlyViewed';

export default function RecentlyViewed() {
  const [
    products,
    setProducts,
  ] = useState<Product[]>([]);

  const refresh =
    useCallback(() => {
      setProducts(
        getRecentlyViewedProducts()
      );
    }, []);

  useEffect(() => {
    refresh();

    window.addEventListener(
      recentlyViewedEvent,
      refresh
    );

    window.addEventListener(
      'storage',
      refresh
    );

    window.addEventListener(
      'focus',
      refresh
    );

    return () => {
      window.removeEventListener(
        recentlyViewedEvent,
        refresh
      );

      window.removeEventListener(
        'storage',
        refresh
      );

      window.removeEventListener(
        'focus',
        refresh
      );
    };
  }, [refresh]);

  if (products.length === 0) {
    return null;
  }

  const visibleProducts =
    products.slice(0, 4);

  return (
    <section
      className="
        relative

        py-12
        sm:py-16

        overflow-hidden
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          pointer-events-none

          absolute
          left-1/2
          top-1/2

          h-72
          w-3/4

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-cyan-500/[0.035]

          blur-[120px]
        "
      />

      <div
        className="
          relative

          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* HEADER */}
        <div
          className="
            mb-7

            flex
            items-end
            justify-between

            gap-4
          "
        >
          <div>
            <div
              className="
                mb-2

                flex
                items-center

                gap-2

                text-[10px]
                sm:text-xs

                font-black

                uppercase

                tracking-[0.2em]

                text-cyan-400
              "
            >
              <Clock3
                className="
                  h-4
                  w-4
                "
              />

              YOUR HISTORY
            </div>

            <h2
              className="
                text-2xl
                sm:text-3xl

                font-black

                text-white
              "
            >
              Recently Viewed
            </h2>

            <p
              className="
                mt-1

                text-xs
                sm:text-sm

                text-neutral-500
              "
            >
              Jump back into products you were checking out.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              clearRecentlyViewedProducts();
              setProducts([]);
            }}
            className="
              hidden
              sm:inline-flex

              items-center

              gap-1.5

              rounded-lg

              border
              border-white/5

              bg-white/[0.025]

              px-3
              py-2

              text-[10px]

              font-bold

              uppercase

              tracking-wider

              text-neutral-600

              transition-all

              hover:border-red-500/20
              hover:bg-red-500/5
              hover:text-red-400
            "
          >
            <Trash2
              className="
                h-3.5
                w-3.5
              "
            />

            Clear
          </button>
        </div>

        {/* GOLD / TEK LINE */}
        <div
          className="
            mb-6

            h-px
            w-full

            bg-gradient-to-r
            from-[#d6b35a]/40
            via-cyan-400/30
            to-transparent
          "
        />

        {/* PRODUCTS */}
        <div
          className="
            grid

            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4

            gap-4
            lg:gap-6
          "
        >
          {visibleProducts.map(
            (product, index) => (
              <ProductCard
                key={`${product.id}-${product.slug}`}
                product={product}
                index={index}
              />
            )
          )}
        </div>

        {/* MOBILE CLEAR BUTTON */}
        <button
          type="button"
          onClick={() => {
            clearRecentlyViewedProducts();
            setProducts([]);
          }}
          className="
            mt-5

            sm:hidden

            inline-flex
            items-center

            gap-1.5

            text-[10px]

            font-bold

            uppercase

            tracking-wider

            text-neutral-600
          "
        >
          <Trash2
            className="
              h-3.5
              w-3.5
            "
          />

          Clear Recently Viewed
        </button>
      </div>
    </section>
  );
}
