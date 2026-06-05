"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BellMark } from "@/components/ui/BellMark";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { useBellChat, type Locale } from "@/lib/bell-chat/useBellChat";

export function LiveDemo() {
  const t = useTranslations("liveDemo");
  const locale = useLocale() as Locale;

  const chips = [t("chip1"), t("chip2"), t("chip3"), t("chip4")];

  // TODO: i18n — on /pt the greeting is still in EN; localize when i18n pass is done
  const greeting = t("bellOpening");

  const { messages, isSending, send } = useBellChat({ locale, greeting });
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Receive deep-link handoff from the Hero chip buttons (Surface A → Surface C)
  useEffect(() => {
    function onHeroHandoff(e: Event) {
      const text = (e as CustomEvent<{ text: string }>).detail?.text;
      if (text) handleSend(text);
    }
    window.addEventListener("bell:hero-handoff", onHeroHandoff);
    return () => window.removeEventListener("bell:hero-handoff", onHeroHandoff);
  }, [isSending]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    send(trimmed);
    setInputValue("");
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

        {/* Chat window — markup and styling unchanged from static mockup */}
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
                    {msg.pending ? (
                      /* Typing indicator — reuses existing bubble classes */
                      <div className="flex gap-1 py-0.5" aria-label="Bell is typing">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-text-on-ink/40"
                            style={{ animation: `bounce 1s ${i * 0.2}s infinite` }}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    ) : (
                      <p
                        className={
                          msg.role === "bell"
                            ? "text-sm font-sans text-text-on-ink/85 leading-relaxed whitespace-pre-wrap"
                            : "text-sm font-sans text-gold-light leading-relaxed"
                        }
                      >
                        {msg.text}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Quick reply chips */}
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {chips.map((label) => (
              <button
                key={label}
                onClick={() => handleSend(label)}
                disabled={isSending}
                className="px-3.5 py-1.5 rounded-full border text-[11px] font-sans transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-[rgba(201,162,75,0.30)] text-gold/70 hover:border-gold hover:text-gold"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input bar — <p> replaced with <input>, same visual container */}
          <div className="px-4 pb-4">
            <div className="rounded-full bg-ink-soft/60 border border-[rgba(201,162,75,0.20)] px-4 py-2.5 flex items-center justify-between gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend(inputValue);
                }}
                disabled={isSending}
                placeholder="Ask me anything..."
                aria-label="Send a message to Bell"
                className="bg-transparent text-sm font-sans text-text-on-ink/80 placeholder:text-text-on-ink/30 flex-1 outline-none min-w-0 disabled:cursor-not-allowed"
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={isSending || !inputValue.trim()}
                aria-label="Send message"
                className="w-7 h-7 rounded-full bg-gold/80 flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
              >
                <Send size={11} className="text-white" />
              </button>
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
