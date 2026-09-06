import { useEffect, useState } from 'react';
import { Rocket, Timer } from 'lucide-react';
import { useT } from '../../lib/i18n';

interface Props {
  endTimestamp: number;
  compact?: boolean;

  // Keeps existing sale countdowns working by default.
  variant?: 'discount' | 'launch';

  // Optional custom text.
  label?: string;
  expiredText?: string;
}

function toMs(ts: number) {
  return ts < 1e12 ? ts * 1000 : ts;
}

function getTimeLeft(end: number) {
  const now = Date.now();
  const diff = toMs(end) - now;

  if (diff <= 0) return null;

  const days = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) /
      (1000 * 60)
  );

  const seconds = Math.floor(
    (diff % (1000 * 60)) / 1000
  );

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export default function DiscountCountdown({
  endTimestamp,
  compact = false,
  variant = 'discount',
  label,
  expiredText,
}: Props) {
  const t = useT();

  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeLeft(endTimestamp)
  );

  useEffect(() => {
    setTimeLeft(getTimeLeft(endTimestamp));

    const interval = window.setInterval(() => {
      const remaining =
        getTimeLeft(endTimestamp);

      setTimeLeft(remaining);

      if (!remaining) {
        window.clearInterval(interval);
      }
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [endTimestamp]);

  const isLaunch =
    variant === 'launch';

  if (!timeLeft) {
    if (!expiredText) {
      return null;
    }

    return (
      <div
        className="
          inline-flex
          items-center
          gap-2

          rounded-lg

          border
          border-[#d6b35a]/30

          bg-black/40

          px-4
          py-2

          backdrop-blur-md
        "
      >
        <Rocket className="w-4 h-4 text-[#d6b35a]" />

        <span
          className="
            text-sm
            font-black
            uppercase
            tracking-[0.14em]

            text-[#f0cf72]
          "
        >
          {expiredText}
        </span>
      </div>
    );
  }

  if (compact) {
    const parts: string[] = [];

    if (timeLeft.days > 0) {
      parts.push(
        `${timeLeft.days}${t(
          'countdown.unit_days'
        )}`
      );
    }

    parts.push(
      `${String(timeLeft.hours).padStart(
        2,
        '0'
      )}${t('countdown.unit_hours')}`
    );

    parts.push(
      `${String(timeLeft.minutes).padStart(
        2,
        '0'
      )}${t('countdown.unit_minutes')}`
    );

    if (
      timeLeft.days === 0
    ) {
      parts.push(
        `${String(
          timeLeft.seconds
        ).padStart(2, '0')}${t(
          'countdown.unit_seconds'
        )}`
      );
    }

    return (
      <div
        className={`
          flex
          items-center
          gap-1

          text-[10px]
          font-semibold

          ${
            isLaunch
              ? 'text-[#d6b35a]'
              : 'text-red-400'
          }
        `}
      >
        {isLaunch ? (
          <Rocket className="w-3 h-3" />
        ) : (
          <Timer className="w-3 h-3" />
        )}

        <span>
          {parts.join(' ')}
        </span>
      </div>
    );
  }

  if (isLaunch) {
    return (
      <div
        className="
          relative
          overflow-hidden

          rounded-2xl

          border
          border-[#8d692d]/40

          bg-black/35

          px-4
          py-4

          backdrop-blur-md

          shadow-2xl
          shadow-black/30
        "
      >
        {/* GOLD TOP LINE */}
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
            via-[#d6b35a]/80
            to-transparent
          "
        />

        {/* GLOW */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0

            h-16
            w-1/2

            -translate-x-1/2

            bg-[#b58b3a]/10
            blur-3xl
          "
        />

        <div
          className="
            relative

            flex
            flex-col
            items-center

            gap-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2

              text-[10px]
              sm:text-xs

              font-black

              uppercase

              tracking-[0.2em]

              text-[#d6b35a]
            "
          >
            <Rocket className="w-4 h-4" />

            {label ||
              'HARDRESET 25X LAUNCHING IN'}
          </div>

          <div
            className="
              grid
              grid-cols-4

              gap-2
              sm:gap-3
            "
          >
            <LaunchUnit
              value={timeLeft.days}
              label="DAYS"
            />

            <LaunchUnit
              value={timeLeft.hours}
              label="HOURS"
            />

            <LaunchUnit
              value={timeLeft.minutes}
              label="MIN"
            />

            <LaunchUnit
              value={timeLeft.seconds}
              label="SEC"
            />
          </div>
        </div>
      </div>
    );
  }

  // EXISTING DISCOUNT / SALE STYLE
  return (
    <div
      className="
        flex
        items-center
        gap-2.5

        rounded-lg

        border
        border-red-500/20

        bg-red-500/10

        px-3
        py-2
      "
    >
      <Timer
        className="
          w-4
          h-4

          shrink-0

          text-red-400
        "
      />

      <div
        className="
          flex
          items-center
          gap-1.5

          text-sm
          font-medium

          text-red-400
        "
      >
        <span
          className="
            text-xs
            text-red-300/80
          "
        >
          {label ||
            t('countdown.label')}
        </span>

        <div
          className="
            flex
            items-center
            gap-1
          "
        >
          {timeLeft.days >
            0 && (
            <Unit
              value={
                timeLeft.days
              }
              label={t(
                'countdown.unit_days'
              )}
            />
          )}

          <Unit
            value={timeLeft.hours}
            label={t(
              'countdown.unit_hours'
            )}
          />

          <Unit
            value={
              timeLeft.minutes
            }
            label={t(
              'countdown.unit_minutes'
            )}
          />

          <Unit
            value={
              timeLeft.seconds
            }
            label={t(
              'countdown.unit_seconds'
            )}
          />
        </div>
      </div>
    </div>
  );
}

function LaunchUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div
      className="
        min-w-[55px]
        sm:min-w-[68px]

        rounded-xl

        border
        border-white/10

        bg-black/40

        px-2
        sm:px-3

        py-2
        sm:py-3

        text-center

        shadow-inner
        shadow-black/30
      "
    >
      <div
        className="
          tabular-nums

          text-xl
          sm:text-2xl
          md:text-3xl

          font-black

          tracking-tight

          text-white
        "
      >
        {String(value).padStart(
          2,
          '0'
        )}
      </div>

      <div
        className="
          mt-0.5

          text-[8px]
          sm:text-[9px]

          font-bold

          uppercase

          tracking-[0.15em]

          text-[#b89a58]
        "
      >
        {label}
      </div>
    </div>
  );
}

function Unit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <span
      className="
        inline-flex
        items-baseline
      "
    >
      <span
        className="
          tabular-nums
          font-bold
          text-red-400
        "
      >
        {String(value).padStart(
          2,
          '0'
        )}
      </span>

      <span
        className="
          text-xs
          text-red-400/60
        "
      >
        {label}
      </span>
    </span>
  );
}
