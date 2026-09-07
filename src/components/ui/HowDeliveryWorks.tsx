import {
  CheckCircle2,
  ChevronRight,
  Gamepad2,
  ShoppingBag,
  Ticket,
  Zap,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ShoppingBag,
    title: 'Choose Your Package',
    description:
      'Browse dinos, resources, kits, blueprints, services, Map Buyer packages and more.',
    tone: 'gold',
  },
  {
    number: '02',
    icon: Gamepad2,
    title: 'Identify Your Account',
    description:
      'Provide the required EOS, Discord or player information during checkout.',
    tone: 'cyan',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Receive Your Order',
    description:
      'Supported rewards are delivered automatically through Helena.',
    tone: 'cyan',
  },
  {
    number: '04',
    icon: Ticket,
    title: 'Staff Fulfillment',
    description:
      'Manual packages, selections and services are completed through a Donation Ticket.',
    tone: 'gold',
  },
] as const;

export default function HowDeliveryWorks() {
  return (
    <section
      className="
        relative
        overflow-hidden

        border-y
        border-white/5

        bg-[#070807]

        py-12
        sm:py-16
      "
    >
      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      {/* GOLD GLOW */}
      <div
        className="
          pointer-events-none

          absolute
          -left-24
          top-1/2

          h-72
          w-72

          -translate-y-1/2

          rounded-full

          bg-[#b58b3a]/10

          blur-[120px]
        "
      />

      {/* TEK BLUE GLOW */}
      <div
        className="
          pointer-events-none

          absolute
          -right-24
          top-1/2

          h-72
          w-72

          -translate-y-1/2

          rounded-full

          bg-cyan-500/10

          blur-[120px]
        "
      />

      {/* CENTER GLOW */}
      <div
        className="
          pointer-events-none

          absolute
          left-1/2
          top-1/2

          h-48
          w-2/3

          -translate-x-1/2
          -translate-y-1/2

          bg-gradient-to-r
          from-[#b58b3a]/5
          via-cyan-500/5
          to-[#b58b3a]/5

          blur-[100px]
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
        "
      >
        {/* =====================================================
            HEADING
        ====================================================== */}
        <div
          className="
            mb-8
            sm:mb-10

            text-center
          "
        >
          <div
            className="
              mb-2

              text-[10px]
              sm:text-xs

              font-black

              uppercase

              tracking-[0.24em]

              text-cyan-300
            "
          >
            HARDRESET 25X STORE
          </div>

          <h2
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl

              font-black

              tracking-tight

              text-white
            "
          >
            How Delivery Works
          </h2>

          <div
            className="
              mx-auto
              mt-3

              h-px
              w-40

              bg-gradient-to-r
              from-transparent
              via-[#d6b35a]
              to-cyan-400
            "
          />

          <p
            className="
              mx-auto
              mt-4

              max-w-2xl

              text-sm
              sm:text-base

              leading-relaxed

              text-neutral-500
            "
          >
            Some purchases are delivered automatically through Helena.
            Others require staff fulfillment through Discord.
          </p>
        </div>

        {/* =====================================================
            STEPS
        ====================================================== */}
        <div
          className="
            grid

            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4

            gap-4
          "
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            const isCyan =
              step.tone === 'cyan';

            return (
              <div
                key={step.number}
                className={`
                  group

                  relative

                  overflow-hidden

                  rounded-2xl

                  border

                  p-5
                  sm:p-6

                  backdrop-blur-md

                  transition-all
                  duration-300

                  hover:-translate-y-1

                  ${
                    isCyan
                      ? `
                        border-cyan-400/15
                        bg-gradient-to-br
                        from-cyan-950/20
                        via-[#0a0d0d]
                        to-[#080908]

                        hover:border-cyan-400/40

                        hover:shadow-xl
                        hover:shadow-cyan-950/20
                      `
                      : `
                        border-[#d6b35a]/18
                        bg-gradient-to-br
                        from-[#1a1409]/45
                        via-[#0c0a07]
                        to-[#080807]

                        hover:border-[#d6b35a]/40

                        hover:shadow-xl
                        hover:shadow-black/30
                      `
                  }
                `}
              >
                {/* TOP LINE */}
                <div
                  className={`
                    pointer-events-none

                    absolute
                    top-0
                    left-0
                    right-0

                    h-px

                    bg-gradient-to-r

                    from-transparent

                    ${
                      isCyan
                        ? 'via-cyan-300/70'
                        : 'via-[#d6b35a]/70'
                    }

                    to-transparent
                  `}
                />

                {/* CARD GLOW */}
                <div
                  className={`
                    pointer-events-none

                    absolute
                    -top-12
                    -right-12

                    h-28
                    w-28

                    rounded-full

                    blur-3xl

                    ${
                      isCyan
                        ? 'bg-cyan-400/10'
                        : 'bg-[#d6b35a]/10'
                    }
                  `}
                />

                {/* STEP NUMBER */}
                <div
                  className={`
                    absolute

                    right-4
                    top-2

                    text-5xl

                    font-black

                    ${
                      isCyan
                        ? 'text-cyan-300/[0.055]'
                        : 'text-[#d6b35a]/[0.07]'
                    }
                  `}
                >
                  {step.number}
                </div>

                {/* ICON */}
                <div
                  className={`
                    relative

                    mb-5

                    flex

                    h-12
                    w-12

                    items-center
                    justify-center

                    rounded-xl

                    border

                    transition-all
                    duration-300

                    ${
                      isCyan
                        ? `
                          border-cyan-400/25
                          bg-cyan-400/10
                          text-cyan-300

                          group-hover:border-cyan-300/50
                          group-hover:bg-cyan-400/15
                        `
                        : `
                          border-[#d6b35a]/25
                          bg-[#b58b3a]/10
                          text-[#d6b35a]

                          group-hover:border-[#d6b35a]/50
                          group-hover:bg-[#b58b3a]/15
                        `
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* TITLE */}
                <div
                  className="
                    relative

                    flex
                    items-center

                    gap-2
                  "
                >
                  <h3
                    className="
                      text-sm
                      sm:text-base

                      font-black

                      text-white
                    "
                  >
                    {step.title}
                  </h3>

                  {index < steps.length - 1 && (
                    <ChevronRight
                      className={`
                        hidden
                        xl:block

                        h-4
                        w-4

                        ${
                          isCyan
                            ? 'text-cyan-700'
                            : 'text-[#8d692d]'
                        }
                      `}
                    />
                  )}
                </div>

                {/* DESCRIPTION */}
                <p
                  className="
                    relative

                    mt-2

                    text-xs
                    sm:text-sm

                    leading-relaxed

                    text-neutral-500
                  "
                >
                  {step.description}
                </p>

                {/* STEP FOOTER */}
                <div
                  className={`
                    relative

                    mt-5

                    flex
                    items-center

                    gap-1.5

                    text-[9px]

                    font-black

                    uppercase

                    tracking-[0.13em]

                    ${
                      isCyan
                        ? 'text-cyan-500/70'
                        : 'text-[#8d692d]'
                    }
                  `}
                >
                  <CheckCircle2
                    className="
                      h-3
                      w-3
                    "
                  />

                  STEP {step.number}
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM MESSAGE
        ====================================================== */}
        <div
          className="
            mt-6

            flex
            items-center
            justify-center

            gap-2

            text-center

            text-[10px]
            sm:text-xs

            font-semibold

            text-neutral-600
          "
        >
          <Zap className="h-3.5 w-3.5 text-cyan-500" />

          Products marked AUTO DELIVERY are handled automatically where supported.

          <Ticket className="h-3.5 w-3.5 text-[#b58b3a]" />
        </div>
      </div>
    </section>
  );
}
