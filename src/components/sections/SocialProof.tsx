"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function SocialProof() {
  const t = useTranslations("socialProof");

  return (
    <Section id="social-proof">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col gap-12 items-center text-center"
      >
        <div className="flex flex-col gap-4 max-w-xl">
          <motion.div variants={fadeUp}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-4xl font-medium text-ink leading-[1.2]"
          >
            {t("headline")}
          </motion.h2>
        </div>

        {/* Partner logos placeholder */}
        <motion.div
          variants={fadeUp}
          className="w-full max-w-2xl"
          aria-label={`[${t("partnersPlaceholder")}] — TODO: replace with real partner logos`}
          role="region"
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-28 h-12 rounded-xl bg-sand-soft border border-[rgba(201,162,75,0.15)] flex items-center justify-center"
              >
                <span className="text-[10px] font-sans text-text-muted tracking-wide uppercase">
                  {/* TODO: replace with real partner logo */}
                  [PARTNER LOGO]
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials placeholder */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl"
          aria-label={`[${t("testimonialsPlaceholder")}] — TODO: replace with real testimonials`}
        >
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-[22px] bg-sand-soft border border-[rgba(201,162,75,0.15)] p-6 flex flex-col gap-4 text-left"
            >
              <div className="flex gap-1" aria-hidden="true">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-gold/40 text-sm">★</span>
                ))}
              </div>
              <p className="font-serif text-base text-text-muted italic leading-relaxed">
                {/* TODO: replace with real guest/partner quote */}
                &ldquo;[REAL QUOTE]&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-1 border-t border-[rgba(26,35,50,0.06)]">
                <div className="w-8 h-8 rounded-full bg-sand border border-[rgba(201,162,75,0.20)] flex items-center justify-center shrink-0">
                  <span className="text-[10px] text-text-muted">?</span>
                </div>
                <div>
                  <p className="text-xs font-sans font-medium text-ink">
                    {/* TODO: replace with real name */}
                    [GUEST NAME]
                  </p>
                  <p className="text-[10px] font-sans text-text-muted">
                    {/* TODO: replace with real establishment */}
                    [ESTABLISHMENT NAME]
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
