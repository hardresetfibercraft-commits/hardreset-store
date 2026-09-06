import { useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';

import type { Product } from '../../lib/types';
import ProductCard from '../products/ProductCard';

interface Props {
  products: Product[];
}

export default function FeaturedProducts({ products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const normalize = (value?: string | null) =>
    (value ?? '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ');

  const getProductText = (product: Product) => {
    const name = normalize(product.name);
    const slug = normalize(product.slug);

    return `${name} ${slug}`;
  };

  const isRenewalProduct = (product: Product) => {
    const text = getProductText(product);

    return (
      text.includes('renewal') ||
      text.includes('renew subscription')
    );
  };

  /*
   * Products we specifically want featured.
   */
  const preferredMatchers: Array<
    (product: Product) => boolean
  > = [

    // 1. 25x Map Buyer Bundle
    (product) => {
      const text = getProductText(product);

      return (
        text.includes('map buyer') &&
        !text.includes('fibercraft') &&
        !text.includes('renewal')
      );
    },

    // 2. Full Base Kit
    (product) => {
      const text = getProductText(product);

      return text.includes('full base kit');
    },

    // 3. Max Survivor
    (product) => {
      const text = getProductText(product);

      return (
        text.includes('max survivor') &&
        !text.includes('full tribe') &&
        !text.includes('8 player')
      );
    },

    // 4. Full Tribe Dino Bundle
    (product) => {
      const text = getProductText(product);

      return (
        text.includes('full tribe bundle') ||
        text.includes('full tribe dino bundle')
      );
    },

    // 5. Triple Mutation Cap
    (product) => {
      const text = getProductText(product);

      return (
        text.includes('triple mutation cap') ||
        text.includes('triple cap bundle')
      );
    },

    // 6. MEK Elite Pack
    (product) => {
      const text = getProductText(product);

      return (
        text.includes('mek') &&
        (
          text.includes('elite') ||
          text.includes('12 meks')
        )
      );
    },

    // 7. Raid Kit
    (product) => {
      const text = getProductText(product);

      return text.includes('raid kit');
    },

    // 8. Tek Structure Pack
    (product) => {
      const text = getProductText(product);

      return text.includes('tek structure pack');
    },
  ];

  const selectedProducts: Product[] = [];
  const selectedIds = new Set<Product['id']>();

  const addProduct = (product?: Product) => {
    if (!product) return;

    if (selectedIds.has(product.id)) return;

    selectedProducts.push(product);
    selectedIds.add(product.id);
  };

  /*
   * Add our preferred products first.
   */
  preferredMatchers.forEach((matcher) => {
    const match = products.find(
      (product) =>
        !isRenewalProduct(product) &&
        matcher(product)
    );

    addProduct(match);
  });

  /*
   * Fill remaining spots with Tip4Serv featured products.
   */
  products
    .filter(
      (product) =>
        product.featured &&
        !isRenewalProduct(product)
    )
    .forEach((product) => {
      if (selectedProducts.length < 8) {
        addProduct(product);
      }
    });

  /*
   * Final fallback.
   */
  products
    .filter(
      (product) =>
        !isRenewalProduct(product)
    )
    .forEach((product) => {
      if (selectedProducts.length < 8) {
        addProduct(product);
      }
    });

  const featured = selectedProducts.slice(0, 8);

  if (featured.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;

    if (!container) return;

    container.scrollBy({
      left: direction === 'left' ? -900 : 900,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative py-14 lg:py-20 bg-[#090806]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">

          <div>

            <div className="flex items-center gap-3 mb-2">

              <Star className="w-5 h-5 text-[#d6b35a]" />

              <span className="text-xs uppercase tracking-[0.3em] text-[#b58b3a] font-semibold">
                HardReset Highlights
              </span>

            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#eee9df] tracking-tight">
              FEATURED PRODUCTS
            </h2>

          </div>

          <div className="flex flex-col lg:items-end gap-3">

            <p className="text-sm text-neutral-400 max-w-sm lg:text-right">
              Some of the biggest packages, progression options,
              PvP bundles, and services available on HardReset 25x.
            </p>

            <Link
              to="/products"
              className="
                group
                inline-flex
                items-center
                gap-2

                text-sm
                font-semibold

                text-[#b58b3a]
                hover:text-[#d6b35a]

                transition-colors
              "
            >

              View All Products

              <ArrowRight
                className="
                  w-4
                  h-4

                  group-hover:translate-x-1

                  transition-transform
                "
              />

            </Link>

          </div>

        </div>

        {/* PRODUCT CAROUSEL */}
        <div className="relative">

          {/* LEFT ARROW */}
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll featured products left"
            className="
              absolute
              -left-3
              lg:-left-5
              top-1/2
              -translate-y-1/2
              z-20

              w-11
              h-11

              rounded-xl

              bg-[#090806]/95

              border
              border-[#8d692d]

              text-[#d6b35a]

              flex
              items-center
              justify-center

              hover:bg-[#b58b3a]
              hover:text-black

              transition-all
              duration-300

              shadow-xl
              shadow-black/40
            "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* RIGHT ARROW */}
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll featured products right"
            className="
              absolute
              -right-3
              lg:-right-5
              top-1/2
              -translate-y-1/2
              z-20

              w-11
              h-11

              rounded-xl

              bg-[#090806]/95

              border
              border-[#8d692d]

              text-[#d6b35a]

              flex
              items-center
              justify-center

              hover:bg-[#b58b3a]
              hover:text-black

              transition-all
              duration-300

              shadow-xl
              shadow-black/40
            "
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* PRODUCTS */}
          <div
            ref={scrollRef}
            className="
              flex
              gap-5

              overflow-x-auto
              scroll-smooth

              px-1
              pb-4

              snap-x
              snap-proximity

              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >

            {featured.map((product, index) => (
              <div
                key={product.id}
                className="
                  flex-none

                  min-w-[270px]
                  sm:min-w-[290px]
                  lg:min-w-[300px]

                  w-[270px]
                  sm:w-[290px]
                  lg:w-[300px]

                  snap-start
                "
              >

                <ProductCard
                  product={product}
                  index={index}
                />

              </div>
            ))}

          </div>

          {/* BOTTOM ACCENT */}
          <div className="mt-2 h-[3px] rounded-full bg-[#201c15] overflow-hidden">

            <div className="w-1/2 h-full bg-gradient-to-r from-[#8d692d] via-[#d6b35a] to-[#8d692d]" />

          </div>

        </div>

      </div>

    </section>
  );
}
