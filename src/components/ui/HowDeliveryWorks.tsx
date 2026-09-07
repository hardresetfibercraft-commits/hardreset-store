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
      'Browse dinos, resources, kits, blueprints, services and more.',
  },
  {
    number: '02',
    icon: Gamepad2,
    title: 'Identify Your Account',
    description:
      'Provide the required EOS, Discord or player information at checkout.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Receive Your Order',
    description:
      'Automatic Helena rewards are delivered where supported.',
  },
  {
    number: '04',
    icon: Ticket,
    title: 'Staff Fulfillment',
    description:
      'Manual packages and selections are completed through a Donation Ticket.',
  },
];

export default function HowDeliveryWorks() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-[#090806]

        py-12
        sm:py-16
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          pointer-events-none

          absolute
          left-1/2
          top-1/2

          h-72
          w-3/4

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-[#b58b3a]/5

          blur-[120px]
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
        {/* HEADING */}
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

              tracking-[0.22em]

              text-[#b58b3a]
            "
          >
            HARDRESET STORE
          </div>

          <h2
            className="
              text-2xl
              sm:text-3xl

              font-black

              text-white
            "
          >
            How Delivery Works
          </h2>

          <p
            className="
              mx-auto
              mt-3

              max-w-2xl

              text-sm
              sm:text-base

              text-neutral-500
            "
          >
            Some purchases are delivered automatically.
            Others require staff fulfillment through Discord.
          </p>
        </div>

        {/* STEPS */}
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

            return (
              <div
                key={step.number}
                className="
                  group

                  relative

                  overflow-hidden

                  rounded-2xl

                  border
                  border-[#8d692d]/20

                  bg-[#0d0b08]/80

                  p-5

                  transition-all
                  duration-300

                  hover:-translate-y-1

                  hover:border-[#d6b35a]/40

                  hover:bg-[#12100b]
                "
              >
                {/* TOP LIGHT */}
                <div
                  className="
                    pointer-events-none

                    absolute
                    top-0
                    left-0
                    right-0

                    h-px

                    bg-gradient-to-r
                    from-transparent
                    via-[#d6b35a]/40
                    to-transparent
                  "
                />

                {/* STEP NUMBER */}
                <div
                  className="
                    absolute

                    right-4
                    top-3

                    text-4xl

                    font-black

                    text-white/[0.035]
                  "
                >
                  {step.number}
                </div>

                {/* ICON */}
                <div
                  className="
                    mb-4

                    flex

                    h-11
                    w-11

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
                  <Icon className="h-5 w-5" />
                </div>

                {/* TITLE */}
                <div
                  className="
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
                      className="
                        hidden
                        xl:block

                        h-4
                        w-4

                        text-[#8d692d]
                      "
                    />
                  )}
                </div>

                {/* DESCRIPTION */}
                <p
                  className="
                    mt-2

                    text-xs
                    sm:text-sm

                    leading-relaxed

                    text-neutral-500
                  "
                >
                  {step.description}
                </p>

                {/* COMPLETE INDICATOR */}
                <div
                  className="
                    mt-4

                    flex
                    items-center

                    gap-1.5

                    text-[9px]

                    font-bold

                    uppercase

                    tracking-[0.12em]

                    text-neutral-600
                  "
                >
                  <CheckCircle2
                    className="
                      h-3
                      w-3

                      text-[#8d692d]
                    "
                  />

                  Step {step.number}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
