import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
}

export function Card({ children, className, gold }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[22px] bg-white p-6 shadow-[0_4px_32px_rgba(26,35,50,0.07)]",
        "transition-all duration-300",
        "hover:shadow-[0_8px_40px_rgba(26,35,50,0.10)]",
        gold &&
          "border border-[rgba(201,162,75,0.30)] hover:border-[rgba(201,162,75,0.55)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
