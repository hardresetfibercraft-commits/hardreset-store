import {
  Gift,
  RefreshCw,
  Ticket,
  UserRound,
  Zap,
} from 'lucide-react';

import type { Product } from '../../lib/types';

type FulfillmentType =
  | 'auto'
  | 'staff'
  | 'ticket'
  | 'subscription'
  | 'free';

interface BadgeInfo {
  type: FulfillmentType;
  label: string;
}

interface Props {
  product: Product;
}

function normalize(value?: string | null) {
  return (value ?? '')
    .toLowerCase()
    .replace(/<[^>]*>/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function getProductSearchText(product: Product) {
  const extra = product as Product & {
    category?: string | {
      name?: string;
      slug?: string;
    };
    category_name?: string;
    category_slug?: string;
    description?: string;
  };

  const categoryText =
    typeof extra.category === 'string'
      ? extra.category
      : [
          extra.category?.name,
          extra.category?.slug,
        ]
          .filter(Boolean)
          .join(' ');

  return normalize(
    [
      product.name,
      product.slug,
      product.small_description,
      extra.description,
      extra.category_name,
      extra.category_slug,
      categoryText,
    ]
      .filter(Boolean)
      .join(' ')
  );
}

function getFulfillmentBadges(
  product: Product
): BadgeInfo[] {
  const text = getProductSearchText(product);

  const badges: BadgeInfo[] = [];

  const isFree =
    Number(product.price) <= 0 ||
    text.includes('free claim') ||
    text.includes('free starter pack');

  const isSubscription =
    Boolean(product.subscription);

  /*
   * Products we KNOW involve staff interaction.
   * Keep this list conservative so we do not call
   * normal Helena-delivered products "manual".
   */
  const isStaffFulfilled =
    text.includes('map buyer') ||
    text.includes('cave edit') ||
    text.includes('admin base build') ||
    text.includes('base build service') ||
    text.includes('team max survivor') ||
    text.includes('full tribe max survivor') ||
    text.includes('manual fulfillment') ||
    text.includes('staff fulfillment') ||
    text.includes('staff fulfilled');

  /*
   * Strong signals that the buyer needs to open
   * a ticket or make selections with staff.
   */
  const requiresTicket =
    text.includes('map buyer') ||
    text.includes('cave edit') ||
    text.includes('admin base build') ||
    text.includes('base build service') ||
    text.includes('team max survivor') ||
    text.includes('full tribe max survivor') ||
    text.includes('ticket required') ||
    text.includes('donation ticket');

  if (isFree) {
    badges.push({
      type: 'free',
      label: 'FREE CLAIM',
    });
  }

  if (isSubscription) {
    badges.push({
      type: 'subscription',
      label: 'SUBSCRIPTION',
    });
  }

  if (isStaffFulfilled) {
    badges.push({
      type: 'staff',
      label: 'STAFF FULFILLED',
    });

    if (
      requiresTicket &&
      badges.length < 2
    ) {
      badges.push({
        type: 'ticket',
        label: 'TICKET REQUIRED',
      });
    }

    return badges.slice(0, 2);
  }

  /*
   * Everything that is not specifically classified
   * as staff/manual is treated as Helena/automatic
   * delivery.
   *
   * Subscriptions keep the subscription badge instead
   * of also showing AUTO DELIVERY.
   */
  if (
    !isSubscription &&
    badges.length < 2
  ) {
    badges.push({
      type: 'auto',
      label: 'AUTO DELIVERY',
    });
  }

  return badges.slice(0, 2);
}

export default function FulfillmentBadge({
  product,
}: Props) {
  const badges =
    getFulfillmentBadges(product);

  if (badges.length === 0) {
    return null;
  }

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-1.5
      "
    >
      {badges.map((badge) => (
        <BadgeItem
          key={`${badge.type}-${badge.label}`}
          type={badge.type}
          label={badge.label}
        />
      ))}
    </div>
  );
}

function BadgeItem({
  type,
  label,
}: {
  type: FulfillmentType;
  label: string;
}) {
  const config = {
    auto: {
      icon: (
        <Zap className="w-3 h-3" />
      ),
      classes: `
        border-cyan-400/35
        bg-cyan-950/80
        text-cyan-300
        shadow-cyan-950/30
      `,
    },

    staff: {
      icon: (
        <UserRound className="w-3 h-3" />
      ),
      classes: `
        border-[#d6b35a]/40
        bg-[#171006]/90
        text-[#f0cf72]
        shadow-black/40
      `,
    },

    ticket: {
      icon: (
        <Ticket className="w-3 h-3" />
      ),
      classes: `
        border-orange-400/35
        bg-orange-950/85
        text-orange-300
        shadow-orange-950/30
      `,
    },

    subscription: {
      icon: (
        <RefreshCw className="w-3 h-3" />
      ),
      classes: `
        border-violet-400/35
        bg-violet-950/85
        text-violet-300
        shadow-violet-950/30
      `,
    },

    free: {
      icon: (
        <Gift className="w-3 h-3" />
      ),
      classes: `
        border-emerald-400/35
        bg-emerald-950/85
        text-emerald-300
        shadow-emerald-950/30
      `,
    },
  } satisfies Record<
    FulfillmentType,
    {
      icon: React.ReactNode;
      classes: string;
    }
  >;

  const selected = config[type];

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5

        rounded-md

        border

        px-2
        py-1

        text-[9px]
        sm:text-[10px]

        font-black

        uppercase

        tracking-[0.09em]

        backdrop-blur-md

        shadow-lg

        ${selected.classes}
      `}
    >
      {selected.icon}

      {label}
    </span>
  );
}
