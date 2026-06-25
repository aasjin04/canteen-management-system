import { motion } from "framer-motion";

export function BrandMark({
  className = "h-11 w-11",
  animated = false,
  dark = false,
}) {
  const Wrapper = animated ? motion.div : "div";

  return (
    <Wrapper
      {...(animated ? { whileHover: { scale: 1.04, rotate: -1 } } : {})}
      className={`relative shrink-0 overflow-hidden rounded-xl shadow-md ${
        dark ? "shadow-black/20" : "shadow-[#3B2416]/15"
      } ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-full w-full">
        <defs>
          <linearGradient id="veyra-bg" x1="8" x2="58" y1="6" y2="60">
            <stop stopColor="#4A2A1A" />
            <stop offset="0.52" stopColor="#20130D" />
            <stop offset="1" stopColor="#0F0906" />
          </linearGradient>
          <linearGradient id="veyra-gold" x1="16" x2="50" y1="12" y2="54">
            <stop stopColor="#FFE2A4" />
            <stop offset="0.48" stopColor="#D79A4B" />
            <stop offset="1" stopColor="#A96325" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#veyra-bg)" />
        <path
          d="M14 17.5C20.3 19.1 26.3 28.4 31.8 44.7C37.3 28.4 43.4 19.1 50 17.5"
          fill="none"
          stroke="url(#veyra-gold)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 47.5H44"
          fill="none"
          stroke="#FFE2A4"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="32" cy="15" r="3.2" fill="#FFE2A4" />
      </svg>
    </Wrapper>
  );
}

export default function BrandLogo({
  compact = false,
  dark = false,
  animated = false,
  subtitle = "Canteen Hub",
}) {
  return (
    <div className="flex items-center gap-3">
      <BrandMark animated={animated} dark={dark} />
      {!compact && (
        <div className="leading-tight">
          <h1
            className={`brand-display text-xl font-black tracking-tight ${
              dark ? "text-white" : "text-[#20130D]"
            }`}
          >
            Veyra
          </h1>
          <p
            className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
              dark ? "text-white/60" : "text-[#8A7A6C]"
            }`}
          >
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
