"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { StringLights } from "@/components/ui/StringLights";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function FinalCTA() {
  const t = useTranslations("finalCta");

  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-ink py-24 md:py-32 px-5"
    >
      {/* TODO: replace with real North Fork coastal background photo */}
      {/* Coastal background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #1a2332 0%, #243049 50%, #1e2d44 100%)",
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(201,162,75,0.20) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* String lights */}
      <div className="absolute top-8 inset-x-0 opacity-50" aria-hidden="true">
        <StringLights bulbs={16} light />
      </div>

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl mx-auto"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow light withLines>
            {t("eyebrow")}
          </Eyebrow>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.12]"
        >
          {t("headline")}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-sans text-base text-text-on-ink/70"
        >
          {t("subhead")}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
        >
          <Button variant="gold" href="#">
            {t("ctaPrimary")}
          </Button>
          <Button
            variant="ghost"
            href="mailto:hello@bell.ai"
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/60"
          >
            {t("ctaSecondary")}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
