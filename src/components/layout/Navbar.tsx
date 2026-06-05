"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BellMark } from "@/components/ui/BellMark";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t("howItWorks"), href: `/${locale}#how-it-works` },
    { label: t("liveDemo"), href: `/${locale}#live-demo` },
    { label: t("forYourBusiness"), href: `/${locale}#for-your-establishment` },
    { label: t("faq"), href: `/${locale}#faq` },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-sand/95 backdrop-blur-md border-b border-[rgba(201,162,75,0.20)] shadow-[0_2px_20px_rgba(26,35,50,0.06)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href={`/${locale}`}
          className="flex items-center gap-2.5 shrink-0 focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
          aria-label="Bell — home"
        >
          <BellMark size={52} />
          <span className="font-serif text-xl font-medium text-ink tracking-tight">
            Bell
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-sans text-text-muted hover:text-ink transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <Button variant="navy" href="#">
            {t("bookDemo")}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-ink hover:bg-ink/5 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="md:hidden bg-sand/98 backdrop-blur-md border-t border-[rgba(201,162,75,0.20)] px-5 pb-6 pt-4 flex flex-col gap-5">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-sans text-text hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-between pt-2 border-t border-[rgba(26,35,50,0.08)]">
            <LanguageSwitcher />
            <Button variant="navy" href="#">
              {t("bookDemo")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
