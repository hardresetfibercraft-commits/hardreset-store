import {
  useEffect,
  useState,
} from 'react';

import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Swords,
  Rocket,
} from 'lucide-react';

type Announcement = {
  id: number;
  text: string;
  href?: string;
  linkText?: string;
  external?: boolean;
  icon?:
    | 'announcement'
    | 'event'
    | 'pvp'
    | 'secure'
    | 'launch';
};

const announcements: Announcement[] = [
  {
    id: 1,
    text: 'HARDRESET 25X LAUNCH IS SCHEDULED FOR NEXT WEEKEND',
    href: '/products',
    linkText: 'Prepare For Launch',
    icon: 'launch',
  },

  {
    id: 2,
    text: 'HardReset 25x PvP • Crossplay • 8-Man Tribes',
    href: '/products',
    linkText: 'Browse Store',
    icon: 'pvp',
  },

  {
    id: 3,
    text: 'Map Buyer packages are available for tribes preparing for launch.',
    href: '/products?category=map-buyer',
    linkText: 'View Map Buyers',
    icon: 'event',
  },

  {
    id: 4,
    text: 'Need help before launch? Open a Donation Ticket in Discord.',
    icon: 'announcement',
  },

  {
    id: 5,
    text: 'Secure checkout powered through Tip4Serv.',
    icon: 'secure',
  },
];

function AnnouncementIcon({
  type,
}: {
  type?: Announcement['icon'];
}) {
  switch (type) {
    case 'launch':
      return (
        <Rocket className="w-4 h-4" />
      );

    case 'event':
      return (
        <Sparkles className="w-4 h-4" />
      );

    case 'pvp':
      return (
        <Swords className="w-4 h-4" />
      );

    case 'secure':
      return (
        <ShieldCheck className="w-4 h-4" />
      );

    default:
      return (
        <Megaphone className="w-4 h-4" />
      );
  }
}

export default function AnnouncementBar() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const current =
    announcements[activeIndex];

  useEffect(() => {
    if (announcements.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex >=
        announcements.length - 1
          ? 0
          : currentIndex + 1
      );
    }, 6000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const previous = () => {
    setActiveIndex((currentIndex) =>
      currentIndex <= 0
        ? announcements.length - 1
        : currentIndex - 1
    );
  };

  const next = () => {
    setActiveIndex((currentIndex) =>
      currentIndex >=
      announcements.length - 1
        ? 0
        : currentIndex + 1
    );
  };

  return (
    <div
      className="
        relative
        z-50
        w-full

        border-b
        border-[#6f5226]/40

        bg-gradient-to-r
        from-[#090806]
        via-[#171006]
        to-[#090806]

        text-[#eee9df]
        overflow-hidden
      "
    >

      {/* GOLD AMBIENT GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          -top-10
          h-20
          bg-[#b58b3a]/10
          blur-3xl
        "
      />

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
          via-[#d6b35a]/70
          to-transparent
        "
      />

      <div
        className="
          relative
          max-w-7xl
          mx-auto

          min-h-[42px]

          px-4
          sm:px-6
          lg:px-8

          flex
          items-center
          justify-between
          gap-3
        "
      >

        {/* LEFT ARROW */}
        <button
          type="button"
          onClick={previous}
          aria-label="Previous announcement"
          className="
            flex-none
            w-7
            h-7
            rounded-full

            flex
            items-center
            justify-center

            text-[#8d692d]

            hover:text-[#d6b35a]
            hover:bg-[#b58b3a]/10

            transition-all
            duration-200
          "
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* ANNOUNCEMENT */}
        <div
          key={current.id}
          className="
            min-w-0
            flex-1

            flex
            items-center
            justify-center

            gap-2
            sm:gap-3

            text-center
            animate-fade-in
          "
        >

          <span
            className="
              flex-none
              text-[#d6b35a]
            "
          >
            <AnnouncementIcon
              type={current.icon}
            />
          </span>

          <span
            className={`
              truncate

              text-[11px]
              sm:text-xs
              md:text-sm

              font-semibold
              tracking-wide

              ${
                current.icon === 'launch'
                  ? 'text-[#f0cf72]'
                  : 'text-neutral-300'
              }
            `}
          >
            {current.text}
          </span>

          {current.href &&
            current.linkText && (
              current.external ? (
                <a
                  href={current.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    hidden
                    sm:inline-flex

                    flex-none

                    items-center
                    gap-1

                    text-xs
                    font-bold

                    text-[#d6b35a]
                    hover:text-[#f0cf72]

                    transition-colors
                  "
                >
                  {current.linkText}

                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <a
                  href={current.href}
                  className="
                    hidden
                    sm:inline-flex

                    flex-none

                    items-center
                    gap-1

                    text-xs
                    font-bold

                    text-[#d6b35a]
                    hover:text-[#f0cf72]

                    transition-colors
                  "
                >
                  {current.linkText}

                  <ChevronRight className="w-3 h-3" />
                </a>
              )
            )}

        </div>

        {/* RIGHT ARROW */}
        <button
          type="button"
          onClick={next}
          aria-label="Next announcement"
          className="
            flex-none
            w-7
            h-7
            rounded-full

            flex
            items-center
            justify-center

            text-[#8d692d]

            hover:text-[#d6b35a]
            hover:bg-[#b58b3a]/10

            transition-all
            duration-200
          "
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

      {/* BOTTOM LIGHT */}
      <div
        className="
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2

          w-1/2
          h-px

          bg-gradient-to-r
          from-transparent
          via-[#8d692d]/40
          to-transparent
        "
      />

    </div>
  );
}
