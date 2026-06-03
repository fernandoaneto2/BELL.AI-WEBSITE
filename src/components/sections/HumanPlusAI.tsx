"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, Users, TrendingUp } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const ICONS = [Sparkles, Users, TrendingUp];

export function HumanPlusAI() {
  const t = useTranslations("humanPlusAI");

  const pillars = [
    { title: t("pillar1Title"), body: t("pillar1Body"), Icon: ICONS[0] },
    { title: t("pillar2Title"), body: t("pillar2Body"), Icon: ICONS[1] },
    { title: t("pillar3Title"), body: t("pillar3Body"), Icon: ICONS[2] },
  ];

  return (
    <Section id="human-ai">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col gap-12"
      >
        <div className="flex flex-col gap-5 max-w-2xl">
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
          {pillars.map(({ title, body, Icon }) => (
            <motion.div key={title} variants={fadeUp}>
              <Card className="h-full flex flex-col gap-4 p-6 border border-[rgba(201,162,75,0.20)]">
                <div className="w-10 h-10 rounded-xl bg-[rgba(201,162,75,0.10)] flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-gold" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="font-sans font-medium text-ink text-sm">{title}</p>
                  <p className="font-sans text-sm text-text-muted leading-relaxed">{body}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Anchor message banner */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl bg-[rgba(201,162,75,0.08)] border border-[rgba(201,162,75,0.25)] px-6 py-5 flex items-start gap-4"
        >
          <div className="w-1 self-stretch rounded-full bg-gold shrink-0" aria-hidden="true" />
          <p className="font-serif text-xl md:text-2xl font-medium text-ink leading-relaxed italic">
            &ldquo;Bell handles the questions. Your team handles the moments.&rdquo;
          </p>
        </motion.div>
      </motion.div>
    </Section>
  );
}
