"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BellMark } from "@/components/ui/BellMark";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type ScriptKey = "wineTasting" | "happyHour" | "romanticEvening" | "iceCream";

interface Message {
  id: string;
  role: "bell" | "user";
  text: string;
}

const TYPING_DELAY = 800;
const CHAR_DELAY = 18;

export function LiveDemo() {
  const t = useTranslations("liveDemo");

  const chips: { key: ScriptKey; label: string }[] = [
    { key: "wineTasting", label: t("chip1") },
    { key: "happyHour", label: t("chip2") },
    { key: "romanticEvening", label: t("chip3") },
    { key: "iceCream", label: t("chip4") },
  ];

  const openingMessage = t("bellOpening");

  const [messages, setMessages] = useState<Message[]>([
    { id: "opening", role: "bell", text: openingMessage },
  ]);
  const [typing, setTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [activeChip, setActiveChip] = useState<ScriptKey | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, displayText]);

  function handleChip(chipKey: ScriptKey) {
    if (typing) return;

    const userMsg = t(`script.${chipKey}.userMessage`);
    const bellResp = t(`script.${chipKey}.bellResponse`);

    setActiveChip(chipKey);
    setMessages([
      { id: "opening", role: "bell", text: openingMessage },
      { id: `user-${chipKey}`, role: "user", text: userMsg },
    ]);
    setTyping(true);
    setDisplayText("");

    setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayText(bellResp.slice(0, i));
        if (i >= bellResp.length) {
          clearInterval(interval);
          setMessages((msgs) => [
            ...msgs,
            { id: `bell-${chipKey}`, role: "bell", text: bellResp },
          ]);
          setTyping(false);
          setDisplayText("");
        }
      }, CHAR_DELAY);
    }, TYPING_DELAY);
  }

  return (
    <Section id="live-demo" soft>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-col gap-10 items-center"
      >
        <div className="flex flex-col items-center gap-4 text-center max-w-lg">
          <motion.div variants={fadeUp}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl font-medium text-ink leading-[1.15]"
          >
            {t("headline")}
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-base text-text-muted">
            {t("subhead")}
          </motion.p>
        </div>

        {/* Chat window */}
        <motion.div
          variants={fadeUp}
          className="w-full max-w-md rounded-[28px] bg-ink shadow-[0_32px_80px_rgba(26,35,50,0.18)] overflow-hidden"
          role="log"
          aria-live="polite"
          aria-label="Bell AI conversation demo"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
            <div className="w-9 h-9 rounded-full bg-ink-soft flex items-center justify-center shrink-0">
              <BellMark size={18} color="#E5C580" />
            </div>
            <div>
              <p className="text-sm font-sans font-medium text-text-on-ink">Bell</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-online" aria-hidden="true" />
                <p className="text-[10px] font-sans text-text-on-ink/50 tracking-wide uppercase">
                  Concierge Bell
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="px-4 py-5 flex flex-col gap-3 overflow-y-auto"
            style={{ minHeight: 240, maxHeight: 320 }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={
                    msg.role === "bell"
                      ? "self-start max-w-[88%]"
                      : "self-end max-w-[80%]"
                  }
                >
                  <div
                    className={
                      msg.role === "bell"
                        ? "rounded-2xl rounded-tl-sm bg-ink-soft px-4 py-3"
                        : "rounded-2xl rounded-tr-sm bg-[rgba(201,162,75,0.15)] border border-[rgba(201,162,75,0.25)] px-4 py-3"
                    }
                  >
                    <p
                      className={
                        msg.role === "bell"
                          ? "text-sm font-sans text-text-on-ink/85 leading-relaxed"
                          : "text-sm font-sans text-gold-light leading-relaxed"
                      }
                    >
                      {msg.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {typing && displayText && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="self-start max-w-[88%]"
              >
                <div className="rounded-2xl rounded-tl-sm bg-ink-soft px-4 py-3">
                  <p className="text-sm font-sans text-text-on-ink/85 leading-relaxed">
                    {displayText}
                    <span className="inline-block w-0.5 h-4 bg-gold ml-0.5 animate-pulse" aria-hidden="true" />
                  </p>
                </div>
              </motion.div>
            )}

            {typing && !displayText && (
              <div className="self-start flex gap-1 px-4 py-3 rounded-2xl rounded-tl-sm bg-ink-soft">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-text-on-ink/40"
                    style={{ animation: `bounce 1s ${i * 0.2}s infinite` }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick reply chips */}
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {chips.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleChip(key)}
                disabled={typing}
                aria-pressed={activeChip === key}
                className={`px-3.5 py-1.5 rounded-full border text-[11px] font-sans transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeChip === key
                    ? "border-gold bg-[rgba(201,162,75,0.25)] text-gold"
                    : "border-[rgba(201,162,75,0.30)] text-gold/70 hover:border-gold hover:text-gold"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input bar */}
          <div className="px-4 pb-4">
            <div className="rounded-full bg-ink-soft/60 border border-[rgba(201,162,75,0.20)] px-4 py-2.5 flex items-center justify-between gap-3">
              <p className="text-sm font-sans text-text-on-ink/30 flex-1 truncate">
                {/* TODO: wire to real Bell API (post-launch) */}
                Ask me anything...
              </p>
              <div className="w-7 h-7 rounded-full bg-gold/80 flex items-center justify-center shrink-0">
                <Send size={11} className="text-white" />
              </div>
            </div>
          </div>

          {/* Powered by */}
          <p className="text-center pb-3 text-[9px] font-sans tracking-[0.18em] uppercase text-text-on-ink/25">
            POWERED BY BELL.AI
          </p>
        </motion.div>

        <style>{`
          @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-4px); }
          }
        `}</style>
      </motion.div>
    </Section>
  );
}
