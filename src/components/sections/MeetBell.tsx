"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BellMark } from "@/components/ui/BellMark";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

// TODO: Surface B — this is a curated static marketing illustration. Wire to useBellChat if the owner decides to make it interactive later.
export function MeetBell() {
  const t = useTranslations("meetBell");

  const chips = [t("chip1"), t("chip2"), t("chip3"), t("chip4")];

  return (
    <Section id="meet-bell">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
      >
        {/* Text side */}
        <div className="flex flex-col gap-6">
          <motion.div variants={fadeUp}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl font-medium text-ink leading-[1.15]"
          >
            {t("headline")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-sans text-base text-text-muted leading-relaxed"
          >
            {t("body")}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="px-3.5 py-1.5 rounded-full border border-[rgba(201,162,75,0.40)] text-sm font-sans text-gold-deep bg-[rgba(201,162,75,0.07)]"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Visual side — product screenshot placeholder */}
        <motion.div
          variants={fadeUp}
          className="relative"
          aria-label="[PRODUCT SCREENSHOT PLACEHOLDER] — TODO: replace with clean Bell app screenshot"
        >
          <div className="relative rounded-[28px] bg-ink overflow-hidden shadow-[0_32px_80px_rgba(26,35,50,0.18)]">
            <div className="p-6 flex flex-col gap-5 min-h-[380px]">
              {/* App header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-ink-soft flex items-center justify-center">
                  <BellMark size={32} color="#E5C580" />
                </div>
                <div>
                  <p className="text-sm font-sans font-medium text-text-on-ink">Bell</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-online" />
                    <p className="text-[10px] font-sans text-text-on-ink/50 tracking-wide uppercase">
                      Concierge Bell
                    </p>
                  </div>
                </div>
              </div>

              {/* Mock messages */}
              <div className="flex flex-col gap-3 flex-1">
                <div className="self-start max-w-[85%] rounded-2xl rounded-tl-sm bg-ink-soft px-4 py-3">
                  <p className="text-sm font-sans text-text-on-ink/85 leading-relaxed">
                    Hi! I&apos;m Bell, your North Fork concierge. What can I help you discover today?
                  </p>
                </div>
                <div className="self-end max-w-[80%] rounded-2xl rounded-tr-sm bg-[rgba(201,162,75,0.15)] border border-[rgba(201,162,75,0.25)] px-4 py-3">
                  <p className="text-sm font-sans text-gold-light leading-relaxed">
                    Can you plan a romantic evening?
                  </p>
                </div>
                <div className="self-start max-w-[90%] rounded-2xl rounded-tl-sm bg-ink-soft px-4 py-3">
                  <p className="text-sm font-sans text-text-on-ink/85 leading-relaxed">
                    Lovely. Start with sunset oysters by the water, then a quiet table at a local favorite, and finish with a walk under the string lights...
                  </p>
                </div>
              </div>

              {/* Input */}
              <div className="rounded-full bg-ink-soft/60 border border-[rgba(201,162,75,0.20)] px-4 py-2.5 flex items-center justify-between">
                <p className="text-sm font-sans text-text-on-ink/30">Ask anything...</p>
                <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Powered by */}
              <p className="text-center text-[9px] font-sans tracking-[0.18em] uppercase text-text-on-ink/25">
                POWERED BY BELL.AI
              </p>
            </div>
          </div>

          {/* Decorative gold glow */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-16 rounded-full opacity-30 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(201,162,75,0.6) 0%, transparent 70%)",
              filter: "blur(16px)",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>
    </Section>
  );
}
