"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, Globe, MapPin, CalendarCheck, ShieldCheck, QrCode } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const ICONS = [Clock, Globe, MapPin, CalendarCheck, ShieldCheck, QrCode];

export function ForGuests() {
  const t = useTranslations("forGuests");

  const cards = [
    { title: t("card1Title"), body: t("card1Body"), Icon: ICONS[0] },
    { title: t("card2Title"), body: t("card2Body"), Icon: ICONS[1] },
    { title: t("card3Title"), body: t("card3Body"), Icon: ICONS[2] },
    { title: t("card4Title"), body: t("card4Body"), Icon: ICONS[3] },
    { title: t("card5Title"), body: t("card5Body"), Icon: ICONS[4] },
    { title: t("card6Title"), body: t("card6Body"), Icon: ICONS[5] },
  ];

  return (
    <Section id="for-guests" soft>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-4 max-w-xl">
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

        {/* Bento grid */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {cards.map(({ title, body, Icon }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className={i === 0 || i === 3 ? "col-span-2 md:col-span-1" : ""}
            >
              <Card
                gold
                className="h-full flex flex-col gap-3 p-5 hover:translate-y-[-2px] transition-transform duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-sand flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-gold" strokeWidth={1.5} />
                </div>
                <p className="font-sans font-medium text-ink text-sm">{title}</p>
                <p className="font-sans text-xs text-text-muted leading-relaxed">{body}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
