import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "navy" | "ghost" | "gold";
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  variant = "navy",
  children,
  href,
  onClick,
  className,
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-sans font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    navy:
      "bg-ink text-text-on-ink hover:bg-ink-soft active:scale-[0.98]",
    ghost:
      "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/5 active:scale-[0.98]",
    gold:
      "bg-gold text-white hover:bg-gold-deep active:scale-[0.98]",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
