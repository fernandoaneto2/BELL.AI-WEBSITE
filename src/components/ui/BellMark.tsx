import { cn } from "@/lib/utils";

interface BellMarkProps {
  className?: string;
  size?: number;
  light?: boolean;
}

export function BellMark({ className, size = 32, light }: BellMarkProps) {
  const fill = light ? "#E5C580" : "#C9A24B";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {/* Bell dome */}
      <path
        d="M20 4C20 4 8 10 8 24H32C32 10 20 4 20 4Z"
        fill={fill}
        opacity="0.95"
      />
      {/* Bell body base */}
      <rect x="6" y="24" width="28" height="4" rx="2" fill={fill} />
      {/* Bell stand */}
      <rect x="18" y="28" width="4" height="4" rx="1" fill={fill} opacity="0.8" />
      {/* Base plate */}
      <rect x="10" y="32" width="20" height="3" rx="1.5" fill={fill} />
      {/* Top button */}
      <circle cx="20" cy="4" r="2.5" fill={fill} opacity="0.7" />
      {/* Speed lines (AI motif) */}
      <line x1="33" y1="20" x2="37" y2="20" stroke={fill} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="34" y1="16" x2="37" y2="14" stroke={fill} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="34" y1="24" x2="37" y2="26" stroke={fill} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
