"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
  ];

  return (
    <Section id="faq" soft>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col gap-10 max-w-2xl mx-auto"
      >
        <div className="flex flex-col gap-4 text-center items-center">
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

        <motion.div variants={fadeUp} className="flex flex-col divide-y divide-[rgba(26,35,50,0.08)]">
          {questions.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="font-sans font-medium text-ink text-sm md:text-base group-hover:text-gold transition-colors duration-200">
                    {q}
                  </span>
                  <span className="shrink-0 w-6 h-6 rounded-full border border-[rgba(201,162,75,0.30)] flex items-center justify-center text-gold transition-colors group-hover:border-gold">
                    {isOpen ? (
                      <Minus size={12} strokeWidth={2} />
                    ) : (
                      <Plus size={12} strokeWidth={2} />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-label={q}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-sm text-text-muted leading-relaxed pb-5">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </Section>
  );
}
