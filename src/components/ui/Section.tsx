import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  soft?: boolean;
}

export function Section({ children, className, id, dark, soft }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full px-5 py-20 md:py-28 lg:py-32",
        dark && "bg-ink text-text-on-ink",
        soft && !dark && "bg-sand-soft",
        !dark && !soft && "bg-sand",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
