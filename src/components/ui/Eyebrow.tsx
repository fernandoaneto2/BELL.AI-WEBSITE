import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
  withLines?: boolean;
}

export function Eyebrow({ children, className, light, withLines }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-[11px] font-sans font-medium tracking-[0.22em] uppercase",
        light ? "text-gold-light" : "text-gold",
        className,
      )}
    >
      {withLines ? (
        <>
          <span className="mr-2 opacity-60">—</span>
          {children}
          <span className="ml-2 opacity-60">—</span>
        </>
      ) : (
        children
      )}
    </p>
  );
}
