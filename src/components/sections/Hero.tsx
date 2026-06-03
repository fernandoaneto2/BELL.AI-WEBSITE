"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StringLights } from "@/components/ui/StringLights";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-ink">
      {/* TODO: replace with real North Fork hero photo */}
      {/* Placeholder coastal background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(175deg, #1e2d42 0%, #243049 40%, #2a3d56 70%, #1a2332 100%)",
        }}
        aria-hidden="true"
      >
        {/* Warm coastal tint overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(201,162,75,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 70% 60%, rgba(247,243,234,0.4) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* String lights decoration */}
      <div className="absolute top-16 inset-x-0 px-0 opacity-60" aria-hidden="true">
        <StringLights bulbs={14} light />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-28 pb-20 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow withLines light>
              {t("eyebrow")}
            </Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.12] tracking-tight"
            style={{ whiteSpace: "pre-line" }}
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-sans text-base md:text-lg text-text-on-ink/75 leading-relaxed max-w-xl"
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
            <Button variant="ghost" href="#live-demo" className="border-white/30 text-white hover:bg-white/10 hover:border-white/60">
              {t("ctaSecondary")}
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-xs font-sans text-text-on-ink/40 tracking-wide"
          >
            {t("trustLine")}
          </motion.p>
        </motion.div>

        {/* App mockup placeholder */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative mt-16 w-full max-w-[320px] rounded-[28px] bg-sand/10 border border-[rgba(201,162,75,0.25)] backdrop-blur-sm overflow-hidden"
          style={{ minHeight: 200 }}
          aria-label="[APP MOCKUP PLACEHOLDER] — TODO: replace with real Bell app screenshot"
        >
          <div className="p-5 flex flex-col gap-4">
            {/* Status bar */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-online animate-pulse" />
              <span className="text-[11px] font-sans text-text-on-ink/60 tracking-wide uppercase">
                CONCIERGE BELL
              </span>
            </div>
            {/* Mock chat bubble */}
            <div className="rounded-2xl rounded-tl-sm bg-sand/15 px-4 py-3">
              <p className="text-sm font-sans text-text-on-ink/80 leading-relaxed">
                Hi, I&apos;m Bell — your North Fork concierge. Ask me anything!
              </p>
            </div>
            {/* Mock chips */}
            <div className="flex flex-wrap gap-2">
              {["Wineries", "Happy hour", "Plan my day"].map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 rounded-full border border-[rgba(201,162,75,0.35)] text-[11px] font-sans text-gold"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          {/* Powered by */}
          <p className="text-center pb-3 text-[9px] font-sans tracking-[0.18em] uppercase text-text-on-ink/30">
            POWERED BY BELL.AI
          </p>
        </motion.div>
      </div>

      {/* Gradient fade to sand */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #F7F3EA)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
