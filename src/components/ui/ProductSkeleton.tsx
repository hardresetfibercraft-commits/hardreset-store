interface Props {
  count?: number;
}

export default function ProductSkeleton({
  count = 8,
}: Props) {
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-5
        lg:gap-6
      "
    >
      {Array.from({
        length: count,
      }).map((_, index) => (
        <SkeletonCard
          key={index}
          index={index}
        />
      ))}
    </div>
  );
}

function SkeletonCard({
  index,
}: {
  index: number;
}) {
  return (
    <div
      className="
        overflow-hidden

        rounded-2xl

        border
        border-volcanic-800/50

        bg-volcanic-900/60

        shadow-lg
        shadow-black/10

        animate-fade-in
      "
      style={{
        animationDelay: `${index * 45}ms`,
        animationFillMode: 'both',
      }}
    >
      {/* =====================================================
          IMAGE PLACEHOLDER
      ====================================================== */}
      <div
        className="
          relative
          aspect-[4/3]

          overflow-hidden

          bg-volcanic-800/70
        "
      >
        <Shimmer />

        {/* FAKE TOP BADGE */}
        <div
          className="
            absolute
            top-3
            left-3

            h-5
            w-16

            rounded-md

            bg-volcanic-700/70
          "
        />

        {/* FAKE FULFILLMENT BADGE */}
        <div
          className="
            absolute
            bottom-3
            left-3

            h-6
            w-24

            rounded-md

            bg-volcanic-700/70
          "
        />
      </div>

      {/* =====================================================
          CONTENT PLACEHOLDER
      ====================================================== */}
      <div
        className="
          p-4
          lg:p-5
        "
      >
        {/* PRODUCT TITLE */}
        <SkeletonLine
          width="w-3/4"
          height="h-5"
        />

        {/* DESCRIPTION */}
        <div className="mt-4 space-y-2">
          <SkeletonLine
            width="w-full"
            height="h-3"
          />

          <SkeletonLine
            width="w-11/12"
            height="h-3"
          />

          <SkeletonLine
            width="w-2/3"
            height="h-3"
          />
        </div>

        {/* PRICE DIVIDER */}
        <div
          className="
            mt-6
            pt-4

            border-t
            border-volcanic-800/50
          "
        >
          <div
            className="
              flex
              items-center
              justify-between

              gap-4
            "
          >
            {/* PRICE */}
            <SkeletonLine
              width="w-20"
              height="h-6"
            />

            {/* PERIOD */}
            <SkeletonLine
              width="w-12"
              height="h-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonLine({
  width,
  height,
}: {
  width: string;
  height: string;
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden

        rounded-md

        bg-volcanic-800/70

        ${width}
        ${height}
      `}
    >
      <Shimmer />
    </div>
  );
}

function Shimmer() {
  return (
    <div
      className="
        pointer-events-none

        absolute
        inset-0

        -translate-x-full

        animate-[shimmer_1.7s_infinite]

        bg-gradient-to-r

        from-transparent

        via-white/[0.06]

        to-transparent
      "
    />
  );
}
