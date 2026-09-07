import {
  useEffect,
  useState,
} from 'react';

import {
  ArrowUp,
} from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(
        window.scrollY > 700
      );
    }

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`
        fixed

        bottom-24
        right-5

        z-[75]

        flex
        h-11
        w-11

        items-center
        justify-center

        rounded-full

        border
        border-[#d6b35a]/30

        bg-[#12100b]/90

        text-[#d6b35a]

        shadow-xl
        shadow-black/40

        backdrop-blur-md

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#f0cf72]/60
        hover:bg-[#1a1409]
        hover:text-[#f0cf72]

        ${
          visible
            ? `
              translate-y-0
              opacity-100
              pointer-events-auto
            `
            : `
              translate-y-4
              opacity-0
              pointer-events-none
            `
        }
      `}
    >
      <ArrowUp
        className="
          h-5
          w-5
        "
      />
    </button>
  );
}
