import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Eye,
  Star,
} from 'lucide-react';

import type {
  Product,
} from '../../lib/types';

import {
  formatMoney,
  translatePeriodicity,
} from '../../lib/utils';

import {
  getProductImage,
} from '../../lib/productImages';

import {
  addRecentlyViewedProduct,
} from '../../lib/recentlyViewed';

import Badge from '../ui/Badge';
import DiscountCountdown from '../ui/DiscountCountdown';
import FulfillmentBadge from '../ui/FulfillmentBadge';
import QuickViewModal from '../ui/QuickViewModal';

import {
  useLanguage,
} from '../../lib/i18n';

import {
  useStore,
} from '../../lib/store';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({
  product,
  index = 0,
}: Props) {
  const [
    quickViewOpen,
    setQuickViewOpen,
  ] = useState(false);

  const {
    t,
    lang,
  } = useLanguage();

  const {
    store,
  } = useStore();

  const currency =
    store?.currency;

  const productImage =
    getProductImage(product);

  const isNew =
    product.slug
      ?.toLowerCase()
      .includes('new') ||

    product.name
      ?.toLowerCase()
      .includes('nouveau') ||

    Boolean(
      product.id &&
      product.id > 9000
    );

  const stockTracked =
    typeof product.stock ===
    'number';

  const outOfStock =
    stockTracked &&
    (product.stock ?? 0) <= 0;

  const lowStock =
    stockTracked &&
    !outOfStock &&
    (product.stock ?? 0) <= 5;

  function recordView() {
    addRecentlyViewedProduct(
      product
    );
  }

  return (
    <>
      <div
        className="
          group
          relative

          glass-card-hover
          card-shine

          flex
          flex-col

          animate-fade-in-up
        "
        style={{
          animationDelay:
            `${index * 60}ms`,

          animationFillMode:
            'both',
        }}
      >
        <Link
          to={`/product/${product.slug}`}
          onClick={recordView}
          className="
            flex
            flex-1
            flex-col
          "
        >
          {/* PRODUCT IMAGE */}
          <div
            className="
              relative

              aspect-[4/3]

              overflow-hidden

              bg-volcanic-800
            "
          >
            {productImage ? (
              <img
                src={productImage}
                alt={product.name}
                className="
                  h-full
                  w-full

                  object-cover

                  transition-transform
                  duration-500

                  group-hover:scale-110
                "
                loading="lazy"
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full

                  items-center
                  justify-center

                  bg-gradient-to-br
                  from-volcanic-800
                  to-volcanic-900
                "
              >
                <Star
                  className="
                    h-12
                    w-12

                    text-volcanic-600
                  "
                />
              </div>
            )}

            {/* IMAGE DARKENING */}
            <div
              className="
                absolute
                inset-0

                bg-gradient-to-t
                from-volcanic-950/80
                via-volcanic-950/15
                to-transparent

                opacity-60

                transition-opacity
                duration-300

                group-hover:opacity-80
              "
            />

            {/* TOP LEFT BADGES */}
            <div
              className="
                absolute
                top-3
                left-3

                flex
                flex-wrap

                gap-1.5
              "
            >
              {isNew && (
                <Badge variant="new">
                  {t(
                    'product.badge.new'
                  )}
                </Badge>
              )}

              {product.percent_off &&
                product.percent_off >
                  0 && (
                  <Badge variant="discount">
                    -
                    {
                      product.percent_off
                    }
                    %
                  </Badge>
                )}

              {product.featured && (
                <Badge variant="featured">
                  {t(
                    'product.badge.star'
                  )}
                </Badge>
              )}
            </div>

            {/* STOCK */}
            {stockTracked && (
              <div
                className="
                  absolute
                  top-3
                  right-3
                "
              >
                {outOfStock ? (
                  <Badge variant="out_of_stock">
                    {t(
                      'product.stock.out_of_stock'
                    )}
                  </Badge>
                ) : lowStock ? (
                  <Badge variant="low_stock">
                    {t(
                      'product.stock.low_stock',
                      {
                        qty:
                          product.stock ??
                          0,
                      }
                    )}
                  </Badge>
                ) : (
                  <Badge variant="in_stock">
                    {t(
                      'product.stock.in_stock'
                    )}
                  </Badge>
                )}
              </div>
            )}

            {/* FULFILLMENT */}
            {!outOfStock && (
              <div
                className="
                  absolute
                  bottom-3
                  left-3
                  right-14

                  z-10
                "
              >
                <FulfillmentBadge
                  product={product}
                />
              </div>
            )}

            {outOfStock && (
              <div
                className="
                  absolute
                  inset-0

                  bg-volcanic-950/50

                  backdrop-blur-[1px]
                "
                aria-hidden="true"
              />
            )}
          </div>

          {/* PRODUCT INFORMATION */}
          <div
            className="
              relative

              flex
              flex-1
              flex-col

              p-4
              lg:p-5
            "
          >
            <h3
              className="
                mb-2

                text-base

                font-semibold

                text-heading

                transition-colors
                duration-200

                group-hover:text-ark-400
              "
            >
              {product.name}
            </h3>

            {product.small_description && (
              <div
                className="
                  mb-4

                  line-clamp-2

                  flex-1

                  text-sm

                  leading-relaxed

                  text-volcanic-400

                  [&_*]:inline
                "
                dangerouslySetInnerHTML={{
                  __html:
                    product.small_description,
                }}
              />
            )}

            <div
              className="
                mt-auto

                space-y-2

                border-t
                border-volcanic-800/50

                pt-3
              "
            >
              <div
                className="
                  flex
                  items-end
                  justify-between
                "
              >
                <div
                  className="
                    flex
                    items-baseline

                    gap-2
                  "
                >
                  <span
                    className="
                      text-xl

                      font-bold

                      text-heading

                      transition-colors
                      duration-200

                      group-hover:text-ark-400
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
                        text-sm

                        text-volcanic-500

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

                {product.subscription &&
                  product.duration_periodicity && (
                    <span
                      className="
                        text-xs

                        text-volcanic-500
                      "
                    >
                      /
                      {translatePeriodicity(
                        product.duration_periodicity,
                        lang
                      )}
                    </span>
                  )}
              </div>

              {product.discount_end &&
                (
                  product.discount_end <
                  1e12
                    ? product.discount_end *
                      1000
                    : product.discount_end
                ) > Date.now() && (
                  <DiscountCountdown
                    endTimestamp={
                      product.discount_end
                    }
                    compact
                  />
                )}
            </div>
          </div>
        </Link>

        {/* QUICK VIEW */}
        <button
          type="button"
          onClick={() => {
            recordView();
            setQuickViewOpen(
              true
            );
          }}
          aria-label={`Quick view ${product.name}`}
          title="Quick View"
          className="
            absolute
            right-3

            top-[calc(75%-3.25rem)]

            z-20

            flex
            h-9
            w-9

            items-center
            justify-center

            rounded-full

            border
            border-white/10

            bg-black/75

            text-neutral-300

            opacity-0

            shadow-xl

            backdrop-blur-md

            transition-all
            duration-200

            hover:border-[#d6b35a]/50
            hover:bg-[#171006]
            hover:text-[#d6b35a]

            group-hover:opacity-100

            focus:opacity-100
          "
        >
          <Eye
            className="
              h-4
              w-4
            "
          />
        </button>
      </div>

      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onClose={() =>
          setQuickViewOpen(
            false
          )
        }
      />
    </>
  );
}
