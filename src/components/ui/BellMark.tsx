import { cn } from "@/lib/utils";

interface BellMarkProps {
  className?: string;
  size?: number;
  color?: string;
}

export function BellMark({ className, size = 32, color = "#C9A24B" }: BellMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {/* Handle — top bar */}
      <rect x="22" y="2" width="9" height="4" rx="2" fill={color} />
      {/* Handle — stem */}
      <rect x="24.5" y="5.5" width="4" height="4.5" rx="2" fill={color} />

      {/* Bell dome — arc stroke */}
      <path
        d="M 5 38 C 5 18 14 9 26.5 9 C 39 9 48 18 48 38"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Collar ring */}
      <rect x="3" y="38" width="45" height="5.5" rx="2.75" fill={color} />

      {/* Base */}
      <rect x="8" y="45" width="35" height="7" rx="3.5" fill={color} />

      {/* Speed lines — right side */}
      {/* Line 1 (longest) */}
      <rect x="40" y="18" width="14" height="3" rx="1.5" fill={color} />
      {/* Line 2 + dot */}
      <rect x="40" y="26" width="9.5" height="3" rx="1.5" fill={color} />
      <circle cx="52" cy="27.5" r="2" fill={color} />
      {/* Line 3 + dot */}
      <rect x="40" y="34" width="6" height="3" rx="1.5" fill={color} />
      <circle cx="48.5" cy="35.5" r="2" fill={color} />
    </svg>
  );
}
