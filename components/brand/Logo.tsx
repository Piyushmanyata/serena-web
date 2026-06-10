import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-6xl md:text-7xl",
};

export function Logo({ className = "", size = "md" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`font-serif font-bold tracking-[0.2em] uppercase select-none ${sizes[size]} ${className}`}
      style={{ color: "var(--serena-deep-burgundy)" }}
      aria-label="SERENA — Home"
    >
      <span className="text-gold-gradient">S</span>
      <span>ERENA</span>
    </Link>
  );
}

export function JarSVG({
  accentColor = "#c6a15b",
  label = "SERENA",
  className = "",
}: {
  accentColor?: string;
  label?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 280"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SERENA jewellery jar"
      role="img"
    >
      {/* Cork lid */}
      <rect x="50" y="22" width="100" height="8" rx="4" fill="#b8935a" />
      {/* Cork body */}
      <rect x="45" y="28" width="110" height="36" rx="10" fill="#c6a15b" />
      {/* Gold rim */}
      <rect x="18" y="62" width="164" height="16" rx="5" fill={accentColor} />
      {/* Jar body */}
      <path
        d="M22 78 L18 240 Q18 260 38 260 L162 260 Q182 260 182 240 L178 78 Z"
        fill="rgba(255,255,255,0.22)"
        stroke={accentColor}
        strokeWidth="1.5"
      />
      {/* Glass reflection left */}
      <path
        d="M36 90 L32 230 Q32 245 42 245 L50 245 L54 90 Z"
        fill="rgba(255,255,255,0.18)"
      />
      {/* Glass reflection right */}
      <path
        d="M155 90 L158 190 L148 190 L145 90 Z"
        fill="rgba(255,255,255,0.1)"
      />
      {/* Label background */}
      <rect x="38" y="100" width="124" height="120" rx="12" fill="rgba(248,239,226,0.85)" stroke={accentColor} strokeWidth="1" />
      {/* Label top border */}
      <line x1="48" y1="113" x2="152" y2="113" stroke={accentColor} strokeWidth="0.8" strokeDasharray="4 3" />
      {/* Label bottom border */}
      <line x1="48" y1="207" x2="152" y2="207" stroke={accentColor} strokeWidth="0.8" strokeDasharray="4 3" />
      {/* SERENA text on label */}
      <text
        x="100"
        y="148"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="5"
        fill="#52111c"
      >
        {label}
      </text>
      {/* Sub text */}
      <text
        x="100"
        y="168"
        textAnchor="middle"
        fontFamily="'Inter', sans-serif"
        fontSize="7"
        letterSpacing="3"
        fill="#7b6a62"
      >
        JEWELLERY JAR
      </text>
      {/* Small gold star accent */}
      <text x="100" y="195" textAnchor="middle" fontSize="10" fill={accentColor}>✦</text>
      {/* Bottom glow */}
      <ellipse cx="100" cy="262" rx="60" ry="6" fill={accentColor} opacity="0.15" />
    </svg>
  );
}
