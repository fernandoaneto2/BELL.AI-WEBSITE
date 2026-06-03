"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function ForEstablishments() {
  const t = useTranslations("forEstablishments");
  const navT = useTranslations("nav");

  const outcomes = [
    t("outcome1"),
    t("outcome2"),
    t("outcome3"),
    t("outcome4"),
  ];

  return (
    <Section id="for-your-establishment" dark>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Text */}
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
          <motion.div variants={fadeUp}>
            <Button variant="gold" href="#">
              {navT("bookDemo")}
            </Button>
          </motion.div>
        </div>

        {/* Outcomes */}
        <motion.ul
          variants={stagger}
          className="flex flex-col gap-4"
          aria-label="Establishment outcomes"
        >
          {outcomes.map((outcome) => (
            <motion.li
              key={outcome}
              variants={fadeUp}
              className="flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={11} className="text-gold" strokeWidth={2.5} />
              </div>
              <p className="font-sans text-sm md:text-base text-text-on-ink/80 leading-relaxed">
                {outcome}
              </p>
            </motion.li>
          ))}
          {/* ROI metrics placeholder */}
          <motion.li variants={fadeUp} className="flex items-start gap-3 opacity-40">
            <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5">
              <Check size={11} className="text-gold" strokeWidth={2.5} />
            </div>
            <p className="font-sans text-sm text-text-on-ink/60 italic">
              {/* TODO: replace with real ROI metric when available */}
              [REAL METRIC — coming soon]
            </p>
          </motion.li>
        </motion.ul>
      </motion.div>
    </Section>
  );
}
