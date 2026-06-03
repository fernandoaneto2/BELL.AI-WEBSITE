"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      number: t("step1Number"),
      title: t("step1Title"),
      body: t("step1Body"),
    },
    {
      number: t("step2Number"),
      title: t("step2Title"),
      body: t("step2Body"),
    },
    {
      number: t("step3Number"),
      title: t("step3Title"),
      body: t("step3Body"),
    },
  ];

  return (
    <Section id="how-it-works" dark>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col gap-14"
      >
        <div className="flex flex-col gap-4 max-w-xl">
          <motion.div variants={fadeUp}>
            <Eyebrow light>{t("eyebrow")}</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl font-medium text-text-on-ink leading-[1.15]"
          >
            {t("headline")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 relative">
          {/* Connecting line */}
          <div
            className="hidden md:block absolute top-7 left-[16.66%] right-[16.66%] h-px"
            style={{ background: "rgba(201,162,75,0.25)" }}
            aria-hidden="true"
          />

          {steps.map(({ number, title, body }) => (
            <motion.div
              key={number}
              variants={fadeUp}
              className="flex flex-col gap-5 px-0 md:px-8 py-0 md:py-0 relative"
            >
              {/* Number */}
              <div className="flex items-center gap-4">
                <span className="font-serif text-4xl font-light text-gold leading-none">
                  {number}
                </span>
                {/* Mobile connector */}
                <div
                  className="md:hidden flex-1 h-px"
                  style={{ background: "rgba(201,162,75,0.25)" }}
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-col gap-2 pb-10 md:pb-0">
                <p className="font-sans font-medium text-text-on-ink text-base">{title}</p>
                <p className="font-sans text-sm text-text-on-ink/60 leading-relaxed">{body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
