"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function OnlyBellKnows() {
  const t = useTranslations("onlyBellKnows");

  const chips = [t("chip1"), t("chip2"), t("chip3"), t("chip4"), t("chip5")];

  return (
    <Section id="only-bell-knows" dark>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="flex flex-col gap-6">
          <motion.div variants={fadeUp}>
            <Eyebrow light>{t("eyebrow")}</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl font-medium text-text-on-ink leading-[1.15]"
          >
            {t("headline")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-sans text-base text-text-on-ink/65 leading-relaxed"
          >
            {t("body")}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="px-3.5 py-1.5 rounded-full border border-[rgba(201,162,75,0.30)] text-sm font-sans text-gold/80"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Decorative local knowledge visual */}
        <motion.div variants={fadeUp} className="relative flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm">
            {/* Central circle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div
                className="w-48 h-48 rounded-full opacity-10"
                style={{
                  background: "radial-gradient(circle, rgba(201,162,75,0.8) 0%, transparent 70%)",
                  filter: "blur(32px)",
                }}
              />
            </div>

            {/* Knowledge cards */}
            <div className="flex flex-col gap-3 relative z-10">
              {[
                { place: "Bedell Cellars", type: "Winery · Estate tasting" },
                { place: "First and South", type: "Restaurant · Happy hour 4–6pm" },
                { place: "Greenport Harbor", type: "Brewery · Waterfront views" },
                { place: "Scoops Mattituck", type: "Ice cream · Open until 9pm" },
              ].map(({ place, type }) => (
                <div
                  key={place}
                  className="rounded-xl bg-ink-soft/80 border border-[rgba(201,162,75,0.15)] px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <div>
                    <p className="text-sm font-sans font-medium text-text-on-ink">{place}</p>
                    <p className="text-[11px] font-sans text-text-on-ink/50">{type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
