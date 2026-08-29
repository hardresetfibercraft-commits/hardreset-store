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

  const featured = products.filter((product) => product.featured);

  if (featured.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
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
              Featured packages, dinos, resources, progression items,
              and other popular HardReset store options.
            </p>

            <Link
              to="/products"
              className="
                group inline-flex items-center gap-2
                text-sm font-semibold
                text-[#b58b3a]
                hover:text-[#d6b35a]
                transition-colors
              "
            >
              View All Products

              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

              w-11 h-11
              rounded-xl

              bg-[#090806]/95
              border border-[#8d692d]

              text-[#d6b35a]

              flex items-center justify-center

              hover:bg-[#b58b3a]
              hover:text-black

              transition-all duration-300
              shadow-xl shadow-black/40
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

              w-11 h-11
              rounded-xl

              bg-[#090806]/95
              border border-[#8d692d]

              text-[#d6b35a]

              flex items-center justify-center

              hover:bg-[#b58b3a]
              hover:text-black

              transition-all duration-300
              shadow-xl shadow-black/40
            "
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* SCROLLING PRODUCTS */}
          <div
            ref={scrollRef}
            className="
              flex
              gap-4
              overflow-x-auto
              scroll-smooth

              px-1
              pb-4

              snap-x
              snap-mandatory

              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {featured.map((product, idx) => (
              <div
                key={product.id}
                className="
                  min-w-[270px]
                  sm:min-w-[290px]
                  lg:min-w-[300px]
                  max-w-[300px]
                  snap-start
                "
              >
                <ProductCard
                  product={product}
                  index={idx}
                />
              </div>
            ))}
          </div>

          {/* BOTTOM TRACK */}
          <div className="mt-2 h-[3px] rounded-full bg-[#201c15] overflow-hidden">
            <div className="w-1/2 h-full bg-gradient-to-r from-[#8d692d] via-[#d6b35a] to-[#8d692d]" />
          </div>

        </div>

      </div>

    </section>
  );
}
