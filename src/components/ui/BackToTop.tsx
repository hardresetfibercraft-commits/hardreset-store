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
      const scrollPosition =
        window.scrollY +
        window.innerHeight;

      const pageHeight =
        document.documentElement
          .scrollHeight;

      const distanceFromBottom =
        pageHeight -
        scrollPosition;

      /*
       * Show once the customer is
       * within 350px of the bottom.
       */
      setVisible(
        distanceFromBottom <= 350 &&
        window.scrollY > 500
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

    window.addEventListener(
      'resize',
      handleScroll
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );

      window.removeEventListener(
        'resize',
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

        bottom-5
        left-1/2

        -translate-x-1/2

        z-[100]

        inline-flex
        items-center
        justify-center

        gap-2

        rounded-full

        border
        border-[#d6b35a]/35

        bg-[#12100b]/95

        px-5
        py-3

        text-xs
        sm:text-sm

        font-black

        uppercase

        tracking-[0.12em]

        text-[#d6b35a]

        shadow-2xl
        shadow-black/60

        backdrop-blur-xl

        transition-all
        duration-300

        hover:-translate-y-1
        hover:-translate-x-1/2

        hover:border-[#f0cf72]/70
        hover:bg-[#1a1409]
        hover:text-[#f0cf72]

        ${
          visible
            ? `
              opacity-100
              pointer-events-auto
              translate-y-0
            `
            : `
              opacity-0
              pointer-events-none
              translate-y-4
            `
        }
      `}
    >
      <ArrowUp
        className="
          h-4
          w-4
        "
      />

      Back to Top
    </button>
  );
}
