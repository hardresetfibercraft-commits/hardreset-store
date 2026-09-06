import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
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
  icon?: 'announcement' | 'event' | 'pvp' | 'secure' | 'launch';
};

const announcements: Announcement[] = [
  {
    id: 1,
    text: 'HARDRESET 25X LAUNCH IS SCHEDULED FOR NEXT WEEKEND',
    href: '/products',
    linkText: 'PREPARE FOR LAUNCH',
    icon: 'launch',
  },
  {
    id: 2,
    text: '25X PVP • CROSSPLAY • 8-MAN TRIBES',
    href: '/products',
    linkText: 'BROWSE STORE',
    icon: 'pvp',
  },
  {
    id: 3,
    text: 'MAP BUYER PACKAGES ARE AVAILABLE FOR TRIBES PREPARING FOR LAUNCH',
    href: '/products',
    linkText: 'VIEW STORE',
    icon: 'event',
  },
  {
    id: 4,
    text: 'NEED HELP WITH A PURCHASE? OPEN A DONATION TICKET IN DISCORD',
    icon: 'announcement',
  },
  {
    id: 5,
    text: 'SECURE CHECKOUT POWERED THROUGH TIP4SERV',
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
      return <Rocket className="w-3.5 h-3.5" />;
    case 'event':
      return <Sparkles className="w-3.5 h-3.5" />;
    case 'pvp':
      return <Swords className="w-3.5 h-3.5" />;
    case 'secure':
      return <ShieldCheck className="w-3.5 h-3.5" />;
    default:
      return <Megaphone className="w-3.5 h-3.5" />;
  }
}

export default function AnnouncementBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = announcements[activeIndex];

  useEffect(() => {
    if (announcements.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex >= announcements.length - 1
          ? 0
          : currentIndex + 1
      );
    }, 6000);

    return () => window.clearInterval(timer);
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
      currentIndex >= announcements.length - 1
        ? 0
        : currentIndex + 1
    );
  };

  return (
    <div
      className="
        relative z-[60] h-8 w-full overflow-hidden
        border-b border-[#6f5226]/40
        bg-gradient-to-r from-[#090806] via-[#171006] to-[#090806]
        text-[#eee9df]
      "
    >
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-16 bg-[#b58b3a]/10 blur-3xl" />

      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d6b35a]/70 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-2 sm:px-4 lg:px-6">
        <button
          type="button"
          onClick={previous}
          aria-label="Previous announcement"
          className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[#8d692d] transition-all duration-200 hover:bg-[#b58b3a]/10 hover:text-[#d6b35a]"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div
          key={current.id}
          className="flex min-w-0 flex-1 items-center justify-center gap-2 text-center animate-fade-in"
        >
          <span className="flex-none text-[#d6b35a]">
            <AnnouncementIcon type={current.icon} />
          </span>

          <span
            className={`truncate text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.12em] ${
              current.icon === 'launch'
                ? 'text-[#f0cf72]'
                : 'text-neutral-300'
            }`}
          >
            {current.text}
          </span>

          {current.href && current.linkText && (
            <Link
              to={current.href}
              className="hidden sm:inline-flex flex-none items-center gap-1 text-[9px] md:text-[10px] font-black tracking-[0.1em] text-[#d6b35a] transition-colors hover:text-[#f0cf72]"
            >
              {current.linkText}
              <ChevronRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next announcement"
          className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[#8d692d] transition-all duration-200 hover:bg-[#b58b3a]/10 hover:text-[#d6b35a]"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#8d692d]/40 to-transparent" />
    </div>
  );
}
