import { getTranslations, getLocale } from "next-intl/server";
import { BellMark } from "@/components/ui/BellMark";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function Footer() {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t("productTitle"),
      links: [
        { label: t("howItWorks"), href: `/${locale}#how-it-works` },
        { label: t("liveDemo"), href: `/${locale}#live-demo` },
        { label: t("faqLink"), href: `/${locale}#faq` },
      ],
    },
    {
      title: t("companyTitle"),
      links: [
        { label: t("about"), href: `/${locale}/about` },
        { label: t("contact"), href: "mailto:hello@bell.ai" },
      ],
    },
    {
      title: t("legalTitle"),
      links: [
        { label: t("privacy"), href: `/${locale}/privacy` },
        { label: t("terms"), href: `/${locale}/terms` },
      ],
    },
  ];

  return (
    <footer className="bg-ink text-text-on-ink">
      <div className="h-px bg-[rgba(201,162,75,0.25)]" />

      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1 flex flex-col gap-4">
            <a
              href={`/${locale}`}
              className="flex items-center gap-2.5 w-fit"
              aria-label="Bell — home"
            >
              <BellMark size={28} color="#E5C580" />
              <span className="font-serif text-xl font-medium text-text-on-ink tracking-tight">
                Bell
              </span>
            </a>
            <Eyebrow withLines light className="text-[10px]">
              {t("tagline")}
            </Eyebrow>
            <div className="mt-2">
              <LanguageSwitcher light />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="text-[11px] font-sans font-medium tracking-[0.15em] uppercase text-gold/70">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm font-sans text-text-on-ink/60 hover:text-text-on-ink transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-sans text-text-on-ink/40">
            © {year} {t("copyright")}
          </p>
          <p className="text-[10px] font-sans tracking-[0.15em] uppercase text-gold/40">
            {t("poweredBy")}
          </p>
        </div>
      </div>
    </footer>
  );
}
