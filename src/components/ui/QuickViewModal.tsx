import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  ChevronRight,
  RefreshCw,
  ShoppingBag,
  X,
} from 'lucide-react';

import type { Product } from '../../lib/types';

import {
  formatMoney,
  translatePeriodicity,
} from '../../lib/utils';

import {
  getProductImage,
} from '../../lib/productImages';

import {
  useLanguage,
} from '../../lib/i18n';

import {
  useStore,
} from '../../lib/store';

import FulfillmentBadge from './FulfillmentBadge';

interface Props {
  product: Product;
  open: boolean;
  onClose: () => void;
}

function getDescription(product: Product) {
  const extended = product as Product & {
    description?: string | null;
  };

  return (
    extended.description ||
    product.small_description ||
    ''
  );
}

export default function QuickViewModal({
  product,
  open,
  onClose,
}: Props) {
  const {
    lang,
  } = useLanguage();

  const {
    store,
  } = useStore();

  const currency =
    store?.currency;

  const productImage =
    getProductImage(product);

  const description =
    getDescription(product);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;

      document.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[120]

        flex
        items-center
        justify-center

        p-4
        sm:p-6
      "
    >
      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Close quick view"
        onClick={onClose}
        className="
          absolute
          inset-0

          bg-black/80

          backdrop-blur-sm
        "
      />

      {/* MODAL */}
      <div
        className="
          relative

          z-10

          w-full
          max-w-4xl

          max-h-[90vh]

          overflow-y-auto

          rounded-2xl

          border
          border-[#8d692d]/40

          bg-[#0b0906]/98

          shadow-2xl
          shadow-black/70

          animate-scale-in
        "
      >
        {/* GOLD TOP LINE */}
        <div
          className="
            pointer-events-none

            absolute
            top-0
            left-0
            right-0

            z-20

            h-px

            bg-gradient-to-r
            from-transparent
            via-[#d6b35a]
            to-transparent
          "
        />

        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="
            absolute
            top-3
            right-3

            z-30

            flex
            h-10
            w-10

            items-center
            justify-center

            rounded-full

            border
            border-white/10

            bg-black/70

            text-neutral-400

            backdrop-blur-md

            transition-all

            hover:border-[#d6b35a]/40
            hover:text-white
          "
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className="
            grid

            md:grid-cols-[1.05fr_0.95fr]
          "
        >
          {/* =================================================
              IMAGE
          ================================================== */}
          <div
            className="
              relative

              min-h-[280px]
              md:min-h-[520px]

              overflow-hidden

              bg-volcanic-900
            "
          >
            {productImage ? (
              <img
                src={productImage}
                alt={product.name}
                className="
                  absolute
                  inset-0

                  h-full
                  w-full

                  object-cover
                "
              />
            ) : (
              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-br
                  from-volcanic-800
                  to-black
                "
              />
            )}

            {/* IMAGE OVERLAYS */}
            <div
              className="
                absolute
                inset-0

                bg-gradient-to-t

                from-black/80
                via-transparent
                to-black/15
              "
            />

            <div
              className="
                absolute

                bottom-4
                left-4
                right-4

                z-10
              "
            >
              <FulfillmentBadge
                product={product}
              />
            </div>
          </div>

          {/* =================================================
              INFORMATION
          ================================================== */}
          <div
            className="
              relative

              flex
              flex-col

              p-5
              sm:p-7
              lg:p-8
            "
          >
            {/* LABEL */}
            <div
              className="
                mb-3

                text-[10px]

                font-black

                uppercase

                tracking-[0.2em]

                text-[#b58b3a]
              "
            >
              HARDRESET 25X STORE
            </div>

            {/* TITLE */}
            <h2
              className="
                pr-8

                text-2xl
                sm:text-3xl

                font-black

                leading-tight

                text-white
              "
            >
              {product.name}
            </h2>

            {/* SUBSCRIPTION INFO */}
            {product.subscription && (
              <div
                className="
                  mt-3

                  inline-flex
                  w-fit

                  items-center

                  gap-1.5

                  rounded-full

                  border
                  border-violet-400/20

                  bg-violet-500/10

                  px-3
                  py-1.5

                  text-[10px]

                  font-bold

                  uppercase

                  tracking-wider

                  text-violet-300
                "
              >
                <RefreshCw className="h-3 w-3" />

                Subscription

                {product.duration_periodicity && (
                  <>
                    {' • '}
                    {translatePeriodicity(
                      product.duration_periodicity,
                      lang
                    )}
                  </>
                )}
              </div>
            )}

            {/* PRICE */}
            <div
              className="
                mt-6

                flex
                items-end

                gap-3
              "
            >
              <span
                className="
                  text-3xl
                  sm:text-4xl

                  font-black

                  text-[#d6b35a]
                "
              >
                {formatMoney(
                  product.price,
                  currency
                )}
              </span>

              {product.old_price && (
                <span
                  className="
                    pb-1

                    text-sm

                    text-neutral-600

                    line-through
                  "
                >
                  {formatMoney(
                    product.old_price,
                    currency
                  )}
                </span>
              )}
            </div>

            {/* DISCOUNT */}
            {product.percent_off &&
              product.percent_off > 0 && (
                <div
                  className="
                    mt-2

                    text-xs

                    font-bold

                    text-emerald-400
                  "
                >
                  Save {product.percent_off}%
                </div>
              )}

            {/* DIVIDER */}
            <div
              className="
                my-6

                h-px

                bg-gradient-to-r
                from-[#8d692d]/50
                via-white/5
                to-transparent
              "
            />

            {/* DESCRIPTION */}
            {description && (
              <div
                className="
                  max-h-[210px]

                  overflow-y-auto

                  pr-2

                  text-sm
                  sm:text-[15px]

                  leading-relaxed

                  text-neutral-400

                  [&_strong]:text-neutral-200
                  [&_b]:text-neutral-200
                  [&_p]:mb-2
                  [&_ul]:my-2
                  [&_li]:mb-1
                "
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}

            {/* SPACER */}
            <div className="flex-1" />

            {/* ACTION */}
            <div
              className="
                mt-7

                border-t
                border-white/5

                pt-5
              "
            >
              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="
                  group

                  flex
                  w-full

                  items-center
                  justify-center

                  gap-2

                  rounded-xl

                  bg-[#b58b3a]

                  px-5
                  py-3.5

                  font-black

                  text-black

                  transition-all
                  duration-300

                  hover:-translate-y-0.5

                  hover:bg-[#d6b35a]

                  hover:shadow-xl
                  hover:shadow-[#b58b3a]/10
                "
              >
                <ShoppingBag className="h-5 w-5" />

                View Full Product

                <ChevronRight
                  className="
                    h-4
                    w-4

                    transition-transform

                    group-hover:translate-x-1
                  "
                />
              </Link>

              <div
                className="
                  mt-3

                  text-center

                  text-[10px]

                  uppercase

                  tracking-[0.12em]

                  text-neutral-600
                "
              >
                View full details before checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
