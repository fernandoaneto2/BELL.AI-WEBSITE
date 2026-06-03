"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "en", label: "EN", flag: "US" },
  { code: "es", label: "ES", flag: "ES" },
  { code: "pt", label: "PT", flag: "BR" },
] as const;

interface LanguageSwitcherProps {
  light?: boolean;
}

export function LanguageSwitcher({ light }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: string) {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Language selector">
      {LOCALES.map(({ code, label }, i) => {
        const isActive = locale === code;
        return (
          <button
            key={code}
            onClick={() => switchLocale(code)}
            aria-label={`Switch to ${label}`}
            aria-pressed={isActive}
            className={cn(
              "px-2.5 py-1 rounded-full text-[11px] font-sans font-medium tracking-wide transition-all duration-200",
              i < LOCALES.length - 1 && "mr-px",
              isActive
                ? light
                  ? "bg-white/20 text-white"
                  : "bg-ink text-text-on-ink"
                : light
                ? "text-white/60 hover:text-white"
                : "text-text-muted hover:text-text",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
