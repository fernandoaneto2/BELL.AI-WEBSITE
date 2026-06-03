"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Building2, Home, UtensilsCrossed, Wine } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const ICONS = [Building2, Home, UtensilsCrossed, Wine];

export function UseCases() {
  const t = useTranslations("useCases");

  const cases = [
    { title: t("case1Title"), body: t("case1Body"), Icon: ICONS[0] },
    { title: t("case2Title"), body: t("case2Body"), Icon: ICONS[1] },
    { title: t("case3Title"), body: t("case3Body"), Icon: ICONS[2] },
    { title: t("case4Title"), body: t("case4Body"), Icon: ICONS[3] },
  ];

  return (
    <Section id="use-cases" soft>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-4 text-center items-center max-w-xl mx-auto">
          <motion.div variants={fadeUp}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl font-medium text-ink leading-[1.15]"
          >
            {t("headline")}
          </motion.h2>
        </div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {cases.map(({ title, body, Icon }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group rounded-[22px] bg-white border border-[rgba(201,162,75,0.20)] p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(26,35,50,0.10)] hover:border-[rgba(201,162,75,0.45)] hover:translate-y-[-2px]"
            >
              {/* Photo placeholder */}
              <div
                className="w-full h-32 rounded-xl bg-sand flex items-center justify-center"
                aria-label={`[${title.toUpperCase()} PHOTO] — TODO: replace with real photo`}
                role="img"
              >
                <Icon size={28} className="text-gold/50" strokeWidth={1} />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-sans font-medium text-ink text-sm">{title}</p>
                <p className="font-sans text-xs text-text-muted leading-relaxed">{body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
