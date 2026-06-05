import Image from "next/image";

interface BellMarkInlineProps {
  size?: number;
  className?: string;
}

export function BellMarkInline({ size = 24, className }: BellMarkInlineProps) {
  return (
    <Image
      src="/logo bell sem fundo.PNG"
      alt="Bell logo"
      width={size}
      height={size}
      className={`object-contain shrink-0${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    />
  );
}
