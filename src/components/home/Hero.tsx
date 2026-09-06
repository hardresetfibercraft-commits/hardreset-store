import { Link } from 'react-router-dom';

import {
  ShoppingBag,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Swords,
  Gamepad2,
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}
      <div className="absolute inset-0">

        <img
          src="/hardreset-25x-background.webp"
          alt=""
          className="
            w-full
            h-full
            object-cover
            object-center
            scale-[1.02]
          "
        />

        {/* Strong left-side readability */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black
            via-black/85
            to-black/25
          "
        />

        {/* Bottom blend into the rest of the storefront */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#090806]
            via-transparent
            to-black/45
          "
        />

        {/* Slight warm HardReset tint */}
        <div className="absolute inset-0 bg-[#291b09]/10" />

        {/* Soft vignette */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]
          "
        />

      </div>

      {/* =====================================================
          AMBIENT GOLD GLOW
      ====================================================== */}
      <div
        className="
          absolute
          top-1/4
          right-1/4
          w-96
          h-96
          bg-[#b58b3a]/10
          rounded-full
          blur-[140px]
          animate-glow-pulse
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-1/4
          left-1/3
          w-72
          h-72
          bg-[#d6b35a]/8
          rounded-full
          blur-[120px]
          animate-glow-pulse
          pointer-events-none
        "
        style={{
          animationDelay: '1.5s',
        }}
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-32
          lg:py-40
          w-full
        "
      >

        <div className="max-w-3xl space-y-8">

          {/* SERVER BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-3
              px-4
              py-2

              rounded-full

              bg-black/40
              border
              border-[#b58b3a]/40

              backdrop-blur-md

              shadow-lg
              shadow-black/30

              animate-fade-in
            "
          >

            <span className="relative flex h-2 w-2">

              <span
                className="
                  animate-ping
                  absolute
                  inline-flex
                  h-full
                  w-full
                  rounded-full
                  bg-[#d6b35a]
                  opacity-75
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  rounded-full
                  h-2
                  w-2
                  bg-[#d6b35a]
                "
              />

            </span>

            <span
              className="
                text-xs
                sm:text-sm
                text-[#d6b35a]
                font-semibold
                tracking-[0.12em]
              "
            >
              ARK: SURVIVAL ASCENDED • 25X PVP
            </span>

          </div>

          {/* =================================================
              MAIN TITLE
          ================================================== */}
          <h1
            className="
              text-5xl
              sm:text-6xl
              lg:text-8xl

              font-black
              leading-[0.92]
              tracking-tight

              animate-slide-up
            "
          >

            <span className="text-white drop-shadow-2xl">
              HARDRESET
            </span>

            <br />

            <span
              className="
                text-[#d6b35a]
                drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]
              "
            >
              25X STORE
            </span>

          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}
          <p
            className="
              text-lg
              sm:text-xl

              text-neutral-300

              leading-relaxed

              max-w-2xl

              drop-shadow-lg

              animate-slide-up
            "
            style={{
              animationDelay: '0.1s',
              animationFillMode: 'both',
            }}
          >
            Gear up, rebuild, progress, and get back into the fight.
            Browse dinos, blueprints, resources, structures, ascensions,
            mutations, PvP kits, MEKs, Map Buyer packages, and more.
          </p>

          {/* SECONDARY LINE */}
          <p
            className="
              text-sm
              sm:text-base

              text-neutral-400

              max-w-xl

              animate-slide-up
            "
            style={{
              animationDelay: '0.15s',
              animationFillMode: 'both',
            }}
          >
            Fast rates. Real progression. Competitive PvP.
          </p>

          {/* =================================================
              BUTTONS
          ================================================== */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-4

              animate-slide-up
            "
            style={{
              animationDelay: '0.2s',
              animationFillMode: 'both',
            }}
          >

            {/* STORE */}
            <Link
              to="/products"
              className="
                group

                inline-flex
                items-center
                justify-center
                gap-2

                px-8
                py-4

                rounded-lg

                bg-[#b58b3a]
                hover:bg-[#d6b35a]

                text-black

                font-bold
                text-base

                transition-all
                duration-300

                shadow-xl
                shadow-black/30

                hover:-translate-y-0.5
              "
            >

              <ShoppingBag className="w-5 h-5" />

              Browse Store

              <ChevronRight
                className="
                  w-4
                  h-4
                  group-hover:translate-x-1
                  transition-transform
                "
              />

            </Link>

            {/* MAIN WEBSITE */}
            <a
              href="https://hardresetark.com"
              className="
                group

                inline-flex
                items-center
                justify-center
                gap-2

                px-8
                py-4

                rounded-lg

                border
                border-[#b58b3a]/50

                bg-black/45

                hover:bg-[#b58b3a]/10
                hover:border-[#d6b35a]

                text-[#d6b35a]

                font-semibold
                text-base

                backdrop-blur-md

                transition-all
                duration-300
              "
            >

              Main Website

              <ExternalLink
                className="
                  w-4
                  h-4
                  group-hover:translate-x-0.5
                  transition-transform
                "
              />

            </a>

          </div>

          {/* =================================================
              STORE / SERVER INFO
          ================================================== */}
          <div
            className="
              flex
              flex-wrap
              items-center

              gap-6
              sm:gap-8

              pt-6

              animate-slide-up
            "
            style={{
              animationDelay: '0.3s',
              animationFillMode: 'both',
            }}
          >

            {/* 25X PVP */}
            <InfoBlock
              icon={
                <Swords className="w-7 h-7 text-[#d6b35a]" />
              }
              value="25X"
              label="PVP"
            />

            <Divider />

            {/* CROSSPLAY */}
            <InfoBlock
              icon={
                <Gamepad2 className="w-7 h-7 text-[#d6b35a]" />
              }
              value="Crossplay"
              label="All Platforms"
            />

            <Divider />

            {/* SECURE */}
            <InfoBlock
              icon={
                <ShieldCheck className="w-7 h-7 text-[#d6b35a]" />
              }
              value="Secure"
              label="Checkout"
            />

          </div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM PAGE TRANSITION
      ====================================================== */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0

          h-32

          bg-gradient-to-t
          from-[#090806]
          via-[#090806]/75
          to-transparent

          pointer-events-none
        "
      />

    </section>
  );
}

function Divider() {
  return (
    <div
      className="
        hidden
        sm:block

        w-px
        h-11

        bg-gradient-to-b
        from-transparent
        via-[#8d692d]
        to-transparent
      "
    />
  );
}

function InfoBlock({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">

      {icon}

      <div>

        <div
          className="
            text-lg
            sm:text-xl

            font-bold
            text-white
          "
        >
          {value}
        </div>

        <div
          className="
            text-[10px]
            sm:text-xs

            text-neutral-500

            uppercase
            tracking-wider
          "
        >
          {label}
        </div>

      </div>

    </div>
  );
}
