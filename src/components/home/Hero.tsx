import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { getProducts } from '../../lib/api';

export default function Hero() {
  const [productCount, setProductCount] = useState<number | null>(null);

  useEffect(() => {
    getProducts(1)
      .then((res) => setProductCount(res.product_count))
      .catch(() => {});
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/background.png"
          alt=""
          className="w-full h-full object-cover scale-105"
        />

        {/* Dark ancient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090806] via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[#3b2a12]/10" />
      </div>

      {/* GOLD GLOW EFFECTS */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#b58b3a]/10 rounded-full blur-[130px] animate-glow-pulse" />

      <div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-[#d6b35a]/8 rounded-full blur-[110px] animate-glow-pulse"
        style={{ animationDelay: '1.5s' }}
      />

      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-[#8d692d]/5 rounded-full blur-[80px] animate-float" />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">

        <div className="max-w-3xl space-y-8">

          {/* BADGE */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#b58b3a]/10 border border-[#b58b3a]/30 backdrop-blur-md animate-fade-in">

            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d6b35a] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d6b35a]" />
            </span>

            <span className="text-sm text-[#d6b35a] font-semibold tracking-wide">
              ARK: SURVIVAL ASCENDED • 25X PVP
            </span>
          </div>

          {/* MAIN TITLE */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tight animate-slide-up">

            <span className="text-white">
              HARDRESET
            </span>

            <br />

            <span className="text-[#d6b35a]">
              25X STORE
            </span>

          </h1>

          {/* DESCRIPTION */}
          <p
            className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-2xl animate-slide-up"
            style={{
              animationDelay: '0.1s',
              animationFillMode: 'both',
            }}
          >
            Gear up, rebuild, progress, and get back into the fight.
            Browse dinos, blueprints, resources, structures, ascensions,
            mutations, base kits, MEKs, and other HardReset packages with
            automated in-game delivery.
          </p>

          {/* SMALL SECONDARY TEXT */}
          <p
            className="text-sm sm:text-base text-neutral-400 max-w-xl animate-slide-up"
            style={{
              animationDelay: '0.15s',
              animationFillMode: 'both',
            }}
          >
            Fast rates. Real progression. Competitive PvP.
          </p>

          {/* BUTTONS */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-slide-up"
            style={{
              animationDelay: '0.2s',
              animationFillMode: 'both',
            }}
          >

            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#b58b3a] hover:bg-[#d6b35a] text-black font-bold text-base transition-all duration-300 shadow-xl shadow-black/30"
            >
              <ShoppingBag className="w-5 h-5" />

              Browse Store

              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="https://hardresetark.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[#b58b3a]/40 bg-black/30 hover:bg-[#b58b3a]/10 text-[#d6b35a] font-semibold text-base backdrop-blur-sm transition-all duration-300"
            >
              Main Website

              <ExternalLink className="w-4 h-4" />
            </a>

          </div>

          {/* STATS */}
          <div
            className="flex flex-wrap items-center gap-6 sm:gap-8 pt-6 animate-slide-up"
            style={{
              animationDelay: '0.3s',
              animationFillMode: 'both',
            }}
          >

            <StatBlock
              value={
                productCount !== null
                  ? String(productCount)
                  : '...'
              }
              label="Store Products"
            />

            <Divider />

            <StatBlock
              value="24/7"
              label="Automated Delivery"
            />

            <Divider />

            <div className="flex items-center gap-3">

              <ShieldCheck className="w-7 h-7 text-[#d6b35a]" />

              <div>
                <div className="text-xl font-bold text-white">
                  Secure
                </div>

                <div className="text-xs text-neutral-500 uppercase tracking-wider">
                  Checkout
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#090806] to-transparent" />

    </section>
  );
}

function Divider() {
  return (
    <div className="hidden sm:block w-px h-10 bg-gradient-to-b from-transparent via-[#8d692d] to-transparent" />
  );
}

function StatBlock({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="group cursor-default">

      <div className="text-2xl font-bold text-white group-hover:text-[#d6b35a] transition-colors duration-300">
        {value}
      </div>

      <div className="text-xs text-neutral-500 uppercase tracking-wider mt-0.5">
        {label}
      </div>

    </div>
  );
}
