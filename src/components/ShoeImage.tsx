import Image from "next/image";

// Product image shell: keeps the existing tinted card backgrounds, but displays
// project-local catalog assets instead of the old generic silhouette.

function lighten(hex: string, amt = 40) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (n >> 16) + amt);
  const g = Math.min(255, ((n >> 8) & 0xff) + amt);
  const b = Math.min(255, (n & 0xff) + amt);
  return `rgb(${r},${g},${b})`;
}

export default function ShoeImage({
  tone = "#1f2937",
  src,
  alt = "",
  className = "",
  rounded = "rounded-xl",
}: {
  tone?: string;
  src?: string;
  alt?: string;
  className?: string;
  rounded?: string;
}) {
  const light = parseInt(tone.replace("#", ""), 16) > 0xaaaaaa;
  const stroke = light ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.85)";
  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${rounded} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${lighten(tone, 26)}, ${tone})`,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
        />
      ) : (
        <svg viewBox="0 0 120 70" className="h-3/5 w-3/5 drop-shadow-md">
          <path
            d="M6 46c0-4 2-7 7-8l18-4c4-1 7-3 11-7l9-9c3-3 7-4 10-2 3 2 4 6 3 10 8-1 18 1 30 6 9 4 14 8 15 13 1 4-2 7-7 7H14c-5 0-8-2-8-6z"
            fill={light ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.14)"}
            stroke={stroke}
            strokeWidth="1.4"
          />
          <path
            d="M6 50h109"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
