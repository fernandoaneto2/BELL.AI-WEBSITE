"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, MessageSquareOff, MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const ICONS = [Clock, MessageSquareOff, MapPin];

export function TheShift() {
  const t = useTranslations("theShift");

  const painPoints = [
    { title: t("pain1Title"), body: t("pain1Body"), Icon: ICONS[0] },
    { title: t("pain2Title"), body: t("pain2Body"), Icon: ICONS[1] },
    { title: t("pain3Title"), body: t("pain3Body"), Icon: ICONS[2] },
  ];

  return (
    <Section id="the-shift" soft>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-4 max-w-2xl">
          <motion.div variants={fadeUp}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl font-medium text-ink leading-[1.15]"
            style={{ whiteSpace: "pre-line" }}
          >
            {t("headline")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-sans text-base text-text-muted leading-relaxed"
          >
            {t("body")}
          </motion.p>
        </div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {painPoints.map(({ title, body, Icon }) => (
            <motion.div key={title} variants={fadeUp}>
              <Card className="h-full flex flex-col gap-3 p-6">
                <div className="w-10 h-10 rounded-xl bg-sand flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-gold" strokeWidth={1.5} />
                </div>
                <p className="font-sans font-medium text-ink text-sm">{title}</p>
                <p className="font-sans text-sm text-text-muted leading-relaxed">{body}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
