import {
  Gamepad2,
  MessageCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    description: 'Protected payments through Tip4Serv',
  },
  {
    icon: Zap,
    title: 'Helena Delivery',
    description: 'Automatic delivery where supported',
  },
  {
    icon: Gamepad2,
    title: 'Crossplay',
    description: 'Xbox • PlayStation • PC',
  },
  {
    icon: MessageCircle,
    title: 'Discord Support',
    description: 'Donation & support tickets available',
  },
];

export default function TrustStrip() {
  return (
    <section
      className="
        relative
        z-20
        overflow-hidden

        border-y
        border-[#8d692d]/20

        bg-[#090806]
      "
    >
      {/* GOLD CENTER GLOW */}
      <div
        className="
          pointer-events-none

          absolute
          left-1/2
          top-1/2

          h-24
          w-2/3

          -translate-x-1/2
          -translate-y-1/2

          bg-[#b58b3a]/5

          blur-3xl
        "
      />

      {/* TOP LIGHT */}
      <div
        className="
          pointer-events-none

          absolute
          top-0
          left-1/2

          h-px
          w-2/3

          -translate-x-1/2

          bg-gradient-to-r
          from-transparent
          via-[#d6b35a]/50
          to-transparent
        "
      />

      <div
        className="
          relative

          mx-auto
          max-w-7xl

          px-4
          sm:px-6
          lg:px-8

          py-5
          sm:py-6
        "
      >
        <div
          className="
            grid

            grid-cols-2
            lg:grid-cols-4

            gap-x-3
            gap-y-5

            lg:gap-0
          "
        >
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group

                  relative

                  flex
                  items-center

                  gap-3

                  px-2
                  sm:px-4
                  lg:px-6
                "
              >
                {/* DIVIDER */}
                {index > 0 && (
                  <div
                    className="
                      hidden
                      lg:block

                      absolute
                      left-0
                      top-1/2

                      h-10
                      w-px

                      -translate-y-1/2

                      bg-gradient-to-b
                      from-transparent
                      via-[#8d692d]/45
                      to-transparent
                    "
                  />
                )}

                {/* ICON */}
                <div
                  className="
                    flex

                    h-10
                    w-10

                    sm:h-11
                    sm:w-11

                    shrink-0

                    items-center
                    justify-center

                    rounded-xl

                    border
                    border-[#d6b35a]/20

                    bg-[#b58b3a]/8

                    text-[#d6b35a]

                    transition-all
                    duration-300

                    group-hover:border-[#d6b35a]/40
                    group-hover:bg-[#b58b3a]/12
                    group-hover:text-[#f0cf72]
                  "
                >
                  <Icon
                    className="
                      h-5
                      w-5
                    "
                  />
                </div>

                {/* TEXT */}
                <div
                  className="
                    min-w-0
                  "
                >
                  <div
                    className="
                      text-xs
                      sm:text-sm

                      font-black

                      text-white

                      tracking-wide
                    "
                  >
                    {item.title}
                  </div>

                  <div
                    className="
                      mt-0.5

                      hidden
                      sm:block

                      text-[10px]
                      lg:text-[11px]

                      leading-snug

                      text-neutral-500
                    "
                  >
                    {item.description}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM LIGHT */}
      <div
        className="
          pointer-events-none

          absolute
          bottom-0
          left-1/2

          h-px
          w-1/2

          -translate-x-1/2

          bg-gradient-to-r
          from-transparent
          via-[#8d692d]/30
          to-transparent
        "
      />
    </section>
  );
}
