import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
} from 'lucide-react';

import type { Category } from '../../lib/types';
import { getCategoryIcon } from '../../lib/categoryIcons';

interface Props {
  categories: Category[];
}

export default function CategorySection({ categories }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleCategories = categories.filter((cat) => !cat.hide);

  if (visibleCategories.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const amount = 650;

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative py-12 lg:py-16 bg-[#090806]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-7">

          <div>
            <div className="flex items-center gap-3 mb-2">
              <LayoutGrid className="w-5 h-5 text-[#d6b35a]" />

              <span className="text-xs uppercase tracking-[0.3em] text-[#b58b3a] font-semibold">
                Browse The Store
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#eee9df] tracking-tight">
              SHOP CATEGORIES
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md lg:text-right">
            Choose a category and find the gear, dinos, resources,
            progression packages, and other items you need.
          </p>

        </div>

        {/* CATEGORY CAROUSEL */}
        <div className="relative border border-[#3a301f] bg-[#11100d] rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/30">

          {/* LEFT BUTTON */}
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll categories left"
            className="
              absolute left-2 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 rounded-lg
              bg-[#090806]/95
              border border-[#8d692d]
              text-[#d6b35a]
              flex items-center justify-center
              hover:bg-[#b58b3a]
              hover:text-black
              transition-all duration-300
              shadow-lg
            "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* RIGHT BUTTON */}
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll categories right"
            className="
              absolute right-2 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 rounded-lg
              bg-[#090806]/95
              border border-[#8d692d]
              text-[#d6b35a]
              flex items-center justify-center
              hover:bg-[#b58b3a]
              hover:text-black
              transition-all duration-300
              shadow-lg
            "
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* SCROLL AREA */}
          <div
            ref={scrollRef}
            className="
              flex gap-4 overflow-x-auto scroll-smooth
              px-10 pb-2
              snap-x snap-mandatory
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {visibleCategories.map((cat) => {
              const Icon = getCategoryIcon(cat.slug || cat.name);

              const categoryValue = encodeURIComponent(
                cat.slug || cat.name
              );

              return (
                <Link
                  key={cat.id}
                  to={`/products?category=${categoryValue}`}
                  className="
                    group
                    min-w-[155px]
                    sm:min-w-[175px]
                    snap-start
                  "
                >

                  {/* IMAGE CARD */}
                  <div
                    className="
                      relative h-[105px]
                      rounded-xl overflow-hidden
                      border border-[#3a301f]
                      bg-[#16130e]
                      group-hover:border-[#d6b35a]
                      group-hover:shadow-[0_0_25px_rgba(214,179,90,0.15)]
                      transition-all duration-300
                    "
                  >

                    {cat.image ? (
                      <>
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="
                            w-full h-full object-cover
                            group-hover:scale-110
                            transition-transform duration-500
                          "
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1b1710] to-[#0b0a08]">
                        <Icon className="w-10 h-10 text-[#b58b3a] group-hover:text-[#d6b35a] group-hover:scale-110 transition-all duration-300" />
                      </div>
                    )}

                    {/* GOLD TOP LINE */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b58b3a]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  </div>

                  {/* CATEGORY BUTTON / LABEL */}
                  <div
                    className="
                      mt-3
                      min-h-[42px]
                      px-4 py-2
                      rounded-full
                      border border-[#332b1d]
                      bg-[#11100d]
                      flex items-center justify-center
                      text-center
                      group-hover:border-[#b58b3a]
                      group-hover:bg-[#1b160d]
                      transition-all duration-300
                    "
                  >
                    <span
                      className="
                        text-xs sm:text-sm
                        uppercase
                        tracking-[0.12em]
                        font-bold
                        text-[#d8d2c7]
                        group-hover:text-[#d6b35a]
                        transition-colors duration-300
                      "
                    >
                      {cat.name}
                    </span>
                  </div>

                </Link>
              );
            })}
          </div>

          {/* BOTTOM GOLD TRACK */}
          <div className="mt-4 h-[2px] bg-[#242017] overflow-hidden rounded-full">
            <div className="w-1/3 h-full bg-gradient-to-r from-[#8d692d] to-[#d6b35a]" />
          </div>

        </div>

      </div>

    </section>
  );
}
