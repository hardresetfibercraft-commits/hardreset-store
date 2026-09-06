import { useEffect, useRef, useState } from 'react';

import {
  ChevronUp,
  Headphones,
  MessageCircle,
  Ticket,
  Users,
  X,
} from 'lucide-react';

const DISCORD_INVITE_URL =
  'https://discord.gg/hardreset25x';

const DONATION_TICKET_URL =
  'PASTE_DONATION_TICKET_URL_HERE';

export default function FloatingDiscordButton() {
  const [open, setOpen] = useState(false);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener(
        'mousedown',
        handleOutsideClick
      );
    }

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      );
    };
  }, [open]);

  const openExternal = (
    url: string
  ) => {
    if (
      !url ||
      url.includes('PASTE_')
    ) {
      return;
    }

    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      ref={wrapperRef}
      className="
        fixed
        bottom-5
        right-5
        z-[80]

        flex
        flex-col
        items-end

        gap-3
      "
    >
      {/* =====================================================
          EXPANDED SUPPORT MENU
      ====================================================== */}
      <div
        className={`
          origin-bottom-right

          transition-all
          duration-300

          ${
            open
              ? `
                translate-y-0
                scale-100
                opacity-100
                pointer-events-auto
              `
              : `
                translate-y-3
                scale-95
                opacity-0
                pointer-events-none
              `
          }
        `}
      >
        <div
          className="
            relative

            w-[285px]
            sm:w-[315px]

            overflow-hidden

            rounded-2xl

            border
            border-[#8d692d]/40

            bg-[#0b0906]/95

            shadow-2xl
            shadow-black/60

            backdrop-blur-xl
          "
        >
          {/* TOP GOLD LINE */}
          <div
            className="
              absolute
              top-0
              left-0
              right-0

              h-px

              bg-gradient-to-r
              from-transparent
              via-[#d6b35a]/80
              to-transparent
            "
          />

          {/* BACKGROUND GLOW */}
          <div
            className="
              pointer-events-none

              absolute
              -top-12
              right-0

              h-32
              w-32

              rounded-full

              bg-[#b58b3a]/10

              blur-3xl
            "
          />

          <div
            className="
              relative
              p-4
            "
          >
            {/* HEADER */}
            <div
              className="
                mb-4

                flex
                items-start
                justify-between

                gap-3
              "
            >
              <div
                className="
                  flex
                  items-center

                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10

                    items-center
                    justify-center

                    rounded-xl

                    border
                    border-[#d6b35a]/25

                    bg-[#b58b3a]/10
                  "
                >
                  <Headphones
                    className="
                      h-5
                      w-5

                      text-[#d6b35a]
                    "
                  />
                </div>

                <div>
                  <div
                    className="
                      text-sm
                      font-black

                      tracking-wide

                      text-white
                    "
                  >
                    HARDRESET SUPPORT
                  </div>

                  <div
                    className="
                      mt-0.5

                      text-xs

                      text-neutral-500
                    "
                  >
                    Need help with your order?
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                aria-label="Close support menu"
                className="
                  flex
                  h-8
                  w-8

                  items-center
                  justify-center

                  rounded-lg

                  text-neutral-500

                  transition-colors

                  hover:bg-white/5
                  hover:text-white
                "
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* OPTIONS */}
            <div className="space-y-2">

              {/* JOIN DISCORD */}
              <button
                type="button"
                onClick={() =>
                  openExternal(
                    DISCORD_INVITE_URL
                  )
                }
                className="
                  group

                  flex
                  w-full

                  items-center

                  gap-3

                  rounded-xl

                  border
                  border-white/5

                  bg-white/[0.025]

                  px-3
                  py-3

                  text-left

                  transition-all
                  duration-200

                  hover:border-[#d6b35a]/25
                  hover:bg-[#b58b3a]/8
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9

                    shrink-0

                    items-center
                    justify-center

                    rounded-lg

                    bg-[#5865F2]/15
                  "
                >
                  <Users
                    className="
                      h-4
                      w-4

                      text-[#7c86ff]
                    "
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <div
                    className="
                      text-sm
                      font-bold

                      text-white
                    "
                  >
                    Join HardReset Discord
                  </div>

                  <div
                    className="
                      text-[11px]

                      text-neutral-500
                    "
                  >
                    Community, updates and support
                  </div>
                </div>

                <ChevronUp
                  className="
                    h-4
                    w-4

                    rotate-90

                    text-neutral-600

                    transition-transform

                    group-hover:translate-x-0.5
                    group-hover:text-[#d6b35a]
                  "
                />
              </button>

              {/* DONATION TICKET */}
              <button
                type="button"
                onClick={() =>
                  openExternal(
                    DONATION_TICKET_URL
                  )
                }
                className="
                  group

                  flex
                  w-full

                  items-center

                  gap-3

                  rounded-xl

                  border
                  border-white/5

                  bg-white/[0.025]

                  px-3
                  py-3

                  text-left

                  transition-all
                  duration-200

                  hover:border-[#d6b35a]/25
                  hover:bg-[#b58b3a]/8
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9

                    shrink-0

                    items-center
                    justify-center

                    rounded-lg

                    bg-orange-500/10
                  "
                >
                  <Ticket
                    className="
                      h-4
                      w-4

                      text-orange-300
                    "
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <div
                    className="
                      text-sm
                      font-bold

                      text-white
                    "
                  >
                    Donation Ticket
                  </div>

                  <div
                    className="
                      text-[11px]

                      text-neutral-500
                    "
                  >
                    Purchases and manual fulfillment
                  </div>
                </div>

                <ChevronUp
                  className="
                    h-4
                    w-4

                    rotate-90

                    text-neutral-600

                    transition-transform

                    group-hover:translate-x-0.5
                    group-hover:text-[#d6b35a]
                  "
                />
              </button>
            </div>

            {/* FOOTER */}
            <div
              className="
                mt-4

                border-t
                border-white/5

                pt-3

                text-center

                text-[10px]
                font-semibold

                uppercase

                tracking-[0.12em]

                text-neutral-600
              "
            >
              HARDRESET 25X SUPPORT
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FLOATING BUTTON
      ====================================================== */}
      <button
        type="button"
        onClick={() =>
          setOpen((value) => !value)
        }
        aria-label="HardReset support"
        aria-expanded={open}
        className="
          group

          relative

          flex

          h-14
          w-14

          items-center
          justify-center

          rounded-full

          border
          border-[#d6b35a]/40

          bg-[#12100b]/95

          text-[#d6b35a]

          shadow-2xl
          shadow-black/50

          backdrop-blur-lg

          transition-all
          duration-300

          hover:-translate-y-1
          hover:border-[#f0cf72]/70
          hover:bg-[#1a1409]
          hover:text-[#f0cf72]

          sm:h-16
          sm:w-16
        "
      >
        {/* OUTER GLOW */}
        <span
          className="
            pointer-events-none

            absolute
            inset-0

            rounded-full

            bg-[#b58b3a]/15

            opacity-0

            blur-xl

            transition-opacity
            duration-300

            group-hover:opacity-100
          "
        />

        {/* PULSE RING */}
        {!open && (
          <span
            className="
              pointer-events-none

              absolute
              inset-0

              animate-ping

              rounded-full

              border
              border-[#d6b35a]/25

              opacity-30
            "
          />
        )}

        {open ? (
          <X
            className="
              relative

              h-5
              w-5

              sm:h-6
              sm:w-6
            "
          />
        ) : (
          <MessageCircle
            className="
              relative

              h-5
              w-5

              sm:h-6
              sm:w-6
            "
          />
        )}

        {/* SMALL ONLINE DOT */}
        {!open && (
          <span
            className="
              absolute

              right-0.5
              top-0.5

              h-3
              w-3

              rounded-full

              border-2
              border-[#12100b]

              bg-emerald-400

              shadow
            "
          />
        )}
      </button>
    </div>
  );
}
