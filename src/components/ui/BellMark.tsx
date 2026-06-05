import Image from "next/image";
import { cn } from "@/lib/utils";

interface BellMarkProps {
  className?: string;
  size?: number;
  color?: string; // kept for API compatibility — ignored (PNG has fixed colors)
}

export function BellMark({ className, size = 32 }: BellMarkProps) {
  return (
    <Image
      src="/logo bell sem fundo.PNG"
      alt="Bell logo"
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
      aria-hidden="true"
    />
  );
}
