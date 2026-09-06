import {
  useRef,
} from 'react';

import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  WheelEvent as ReactWheelEvent,
} from 'react';

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

interface DragState {
  active: boolean;
  startX: number;
  startScrollLeft: number;
}

export default function FeaturedProducts({
  products,
}: Props) {
  const scrollRef =
    useRef<HTMLDivElement>(null);

  const dragState = useRef<DragState>({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const suppressClick =
    useRef(false);

  /*
   * ---------------------------------------------------------
   * NORMALIZE PRODUCT TEXT
   * ---------------------------------------------------------
   */

  const normalize = (
    value?: string | null
  ) =>
    (value ?? '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ');

  const getProductText = (
    product: Product
  ) => {
    const name =
      normalize(product.name);

    const slug =
      normalize(product.slug);

    return `${name} ${slug}`;
  };

  /*
   * ---------------------------------------------------------
   * PRODUCTS WE NEVER WANT FEATURED
   * ---------------------------------------------------------
   */

  const isRenewalProduct = (
    product: Product
  ) => {
    const text =
      getProductText(product);

    return (
      text.includes('renewal') ||
      text.includes(
        'renew subscription'
      )
    );
  };

  /*
   * ---------------------------------------------------------
   * CURATED FEATURED PRODUCTS
   * ---------------------------------------------------------
   *
   * Order matters.
   *
   * These are the products we want representing
   * HardReset 25x on the homepage.
   */

  const preferredMatchers: Array<
    (product: Product) => boolean
  > = [

    /*
     * 1. MAP BUYER
     */
    (product) => {
      const text =
        getProductText(product);

      return (
        text.includes('map buyer') &&
        !text.includes(
          'fibercraft'
        ) &&
        !text.includes(
          'renewal'
        )
      );
    },

    /*
     * 2. FULL BASE KIT
     */
    (product) => {
      const text =
        getProductText(product);

      return text.includes(
        'full base kit'
      );
    },

    /*
     * 3. MAX SURVIVOR
     */
    (product) => {
      const text =
        getProductText(product);

      return (
        text.includes(
          'max survivor'
        ) &&
        !text.includes(
          'full tribe'
        ) &&
        !text.includes(
          '8 player'
        )
      );
    },

    /*
     * 4. FULL TRIBE DINO BUNDLE
     */
    (product) => {
      const text =
        getProductText(product);

      return (
        text.includes(
          'full tribe bundle'
        ) ||
        text.includes(
          'full tribe dino bundle'
        )
      );
    },

    /*
     * 5. TRIPLE MUTATION CAP
     */
    (product) => {
      const text =
        getProductText(product);

      return (
        text.includes(
          'triple mutation cap'
        ) ||
        text.includes(
          'triple cap bundle'
        )
      );
    },

    /*
     * 6. MEK ELITE
     */
    (product) => {
      const text =
        getProductText(product);

      return (
        text.includes('mek') &&
        (
          text.includes(
            'elite'
          ) ||
          text.includes(
            '12 meks'
          )
        )
      );
    },

    /*
     * 7. RAID KIT
     */
    (product) => {
      const text =
        getProductText(product);

      return text.includes(
        'raid kit'
      );
    },

    /*
     * 8. TEK STRUCTURE PACK
     */
    (product) => {
      const text =
        getProductText(product);

      return text.includes(
        'tek structure pack'
      );
    },
  ];

  /*
   * ---------------------------------------------------------
   * BUILD FEATURED LIST
   * ---------------------------------------------------------
   */

  const selectedProducts: Product[] =
    [];

  const selectedIds =
    new Set<Product['id']>();

  const addProduct = (
    product?: Product
  ) => {
    if (!product) {
      return;
    }

    if (
      selectedIds.has(product.id)
    ) {
      return;
    }

    selectedProducts.push(product);

    selectedIds.add(product.id);
  };

  /*
   * First add our curated products.
   */

  preferredMatchers.forEach(
    (matcher) => {
      const match = products.find(
        (product) =>
          !isRenewalProduct(
            product
          ) &&
          matcher(product)
      );

      addProduct(match);
    }
  );

  /*
   * Then fill empty slots using
   * Tip4Serv's own featured flag.
   */

  products
    .filter(
      (product) =>
        product.featured &&
        !isRenewalProduct(
          product
        )
    )
    .forEach((product) => {
      if (
        selectedProducts.length <
        8
      ) {
        addProduct(product);
      }
    });

  /*
   * Final fallback:
   * use normal products so we never
   * end up with one lonely card.
   */

  products
    .filter(
      (product) =>
        !isRenewalProduct(
          product
        )
    )
    .forEach((product) => {
      if (
        selectedProducts.length <
        8
      ) {
        addProduct(product);
      }
    });

  const featured =
    selectedProducts.slice(0, 8);

  if (featured.length === 0) {
    return null;
  }

  /*
   * ---------------------------------------------------------
   * ARROW SCROLLING
   * ---------------------------------------------------------
   */

  const scroll = (
    direction:
      | 'left'
      | 'right'
  ) => {
    const container =
      scrollRef.current;

    if (!container) {
      return;
    }

    container.scrollBy({
      left:
        direction === 'left'
          ? -900
          : 900,
      behavior: 'smooth',
    });
  };

  /*
   * ---------------------------------------------------------
   * MOUSE WHEEL / TRACKPAD
   * ---------------------------------------------------------
   */

  const handleWheel = (
    event: ReactWheelEvent<HTMLDivElement>
  ) => {
    const container =
      scrollRef.current;

    if (!container) {
      return;
    }

    const canScroll =
      container.scrollWidth >
      container.clientWidth;

    if (!canScroll) {
      return;
    }

    /*
     * Trackpads normally supply deltaX.
     * Normal mouse wheels supply deltaY.
     */

    const movement =
      Math.abs(event.deltaX) >
      Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    if (movement === 0) {
      return;
    }

    const atStart =
      container.scrollLeft <= 0;

    const atEnd =
      Math.ceil(
        container.scrollLeft +
          container.clientWidth
      ) >=
      container.scrollWidth;

    /*
     * When the carousel reaches an end,
     * give control back to normal page
     * scrolling.
     */

    if (
      (
        movement < 0 &&
        atStart
      ) ||
      (
        movement > 0 &&
        atEnd
      )
    ) {
      return;
    }

    event.preventDefault();

    container.scrollBy({
      left: movement,
      behavior: 'auto',
    });
  };

  /*
   * ---------------------------------------------------------
   * CLICK + DRAG SCROLLING
   * ---------------------------------------------------------
   */

  const handlePointerDown = (
    event:
      ReactPointerEvent<HTMLDivElement>
  ) => {
    /*
     * Touch devices already have
     * native swipe scrolling.
     */

    if (
      event.pointerType !==
      'mouse'
    ) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    const container =
      scrollRef.current;

    if (!container) {
      return;
    }

    dragState.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft:
        container.scrollLeft,
    };

    suppressClick.current =
      false;

    event.currentTarget
      .setPointerCapture(
        event.pointerId
      );
  };

  const handlePointerMove = (
    event:
      ReactPointerEvent<HTMLDivElement>
  ) => {
    if (
      !dragState.current.active
    ) {
      return;
    }

    const container =
      scrollRef.current;

    if (!container) {
      return;
    }

    const movement =
      event.clientX -
      dragState.current.startX;

    /*
     * Once the mouse has moved a few
     * pixels, treat this as a drag
     * instead of a product click.
     */

    if (
      Math.abs(movement) > 5
    ) {
      suppressClick.current =
        true;
    }

    container.scrollLeft =
      dragState.current
        .startScrollLeft -
      movement;

    event.preventDefault();
  };

  const finishPointerDrag = (
    event:
      ReactPointerEvent<HTMLDivElement>
  ) => {
    dragState.current.active =
      false;

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget
        .releasePointerCapture(
          event.pointerId
        );
    }

    /*
     * Keep suppressClick alive long
     * enough to block the click event
     * produced after a drag.
     */

    window.setTimeout(() => {
      suppressClick.current =
        false;
    }, 0);
  };

  const handleClickCapture = (
    event:
      ReactMouseEvent<HTMLDivElement>
  ) => {
    if (
      !suppressClick.current
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  };

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */

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
              Some of the biggest packages,
              progression options, PvP bundles,
              and services available on
              HardReset 25x.
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
            onClick={() =>
              scroll('left')
            }
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
            onClick={() =>
              scroll('right')
            }
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

          {/* SCROLLING PRODUCTS */}
          <div
            ref={scrollRef}

            onWheel={
              handleWheel
            }

            onPointerDown={
              handlePointerDown
            }

            onPointerMove={
              handlePointerMove
            }

            onPointerUp={
              finishPointerDrag
            }

            onPointerCancel={
              finishPointerDrag
            }

            onClickCapture={
              handleClickCapture
            }

            className="
              flex
              gap-5

              overflow-x-auto
              overscroll-x-contain

              scroll-smooth

              px-1
              pb-4

              snap-x
              snap-proximity

              select-none

              cursor-grab
              active:cursor-grabbing

              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >

            {featured.map(
              (
                product,
                index
              ) => (
                <div
                  key={
                    product.id
                  }
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
                    product={
                      product
                    }
                    index={index}
                  />

                </div>
              )
            )}

          </div>

          {/* BOTTOM SCROLL HINT */}
          <div className="mt-3 flex items-center gap-3">

            <div className="flex-1 h-[3px] rounded-full bg-[#201c15] overflow-hidden">

              <div className="w-1/3 h-full bg-gradient-to-r from-[#8d692d] via-[#d6b35a] to-[#8d692d]" />

            </div>

            <span className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-neutral-600 whitespace-nowrap">
              Drag or scroll to browse
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}
