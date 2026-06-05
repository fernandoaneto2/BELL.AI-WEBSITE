"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { BellMarkInline } from "./BellMarkInline";
import { useBellChat, type Locale } from "@/lib/bell-chat/useBellChat";

interface ChatLauncherProps {
  locale: Locale;
}

const GREETING_BY_LOCALE: Record<Locale, string> = {
  en: "Hi, I'm Bell — your North Fork concierge. Ask me anything: wineries, happy hour, ice cream, or let me plan your day.",
  es: "Hola, soy Bell — tu conserje del North Fork. Pregúntame lo que quieras: bodegas, happy hour, helados, o déjame planear tu día.",
  pt: "Olá, sou a Bell — sua concierge do North Fork. Pergunte o que quiser: vinícolas, happy hour, sorvetes, ou posso planejar seu dia.",
};

export function ChatLauncher({ locale }: ChatLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [hasShimmered, setHasShimmered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelId = "bell-chat-panel";

  const greeting = GREETING_BY_LOCALE[locale] ?? GREETING_BY_LOCALE.en;
  const { messages, isSending, send } = useBellChat({ locale, greeting });

  // One-time shimmer invitation on first load
  useEffect(() => {
    const timer = setTimeout(() => setHasShimmered(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    send(trimmed);
    setInputValue("");
  }

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Bell concierge chat"
            aria-modal="true"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed z-50 flex flex-col overflow-hidden bg-ink rounded-[24px] shadow-[0_24px_80px_rgba(26,35,50,0.35)]"
            style={{
              // Desktop: fixed panel above launcher
              bottom: "calc(env(safe-area-inset-bottom, 0px) + 88px)",
              right: "calc(env(safe-area-inset-right, 0px) + 24px)",
              width: "min(380px, calc(100vw - 32px))",
              maxHeight: "min(680px, calc(100svh - 100px))",
            }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[rgba(255,255,255,0.06)] shrink-0">
              <div className="w-11 h-11 rounded-full bg-ink-soft flex items-center justify-center shrink-0">
                <BellMarkInline size={28} className="text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-sans font-medium text-text-on-ink leading-none">Bell</p>
                <p className="text-[10px] font-sans text-text-on-ink/50 tracking-wide uppercase mt-0.5">
                  North Fork Concierge
                </p>
              </div>
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-1.5 h-1.5 rounded-full bg-online" aria-hidden="true" />
                <span className="sr-only">Online</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="w-7 h-7 rounded-full flex items-center justify-center text-text-on-ink/40 hover:text-text-on-ink/80 hover:bg-white/10 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages — reuses exact same bubble classes as #live-demo */}
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
              className="flex-1 px-4 py-4 flex flex-col gap-3 overflow-y-auto"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={msg.role === "bell" ? "self-start max-w-[88%]" : "self-end max-w-[80%]"}
                  >
                    <div
                      className={
                        msg.role === "bell"
                          ? "rounded-2xl rounded-tl-sm bg-ink-soft px-4 py-3"
                          : "rounded-2xl rounded-tr-sm bg-[rgba(201,162,75,0.15)] border border-[rgba(201,162,75,0.25)] px-4 py-3"
                      }
                    >
                      {msg.pending ? (
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

            {/* Input bar — same styling as #live-demo */}
            <div className="px-4 pb-4 pt-2 border-t border-[rgba(255,255,255,0.06)] shrink-0">
              <div className="rounded-full bg-ink-soft/60 border border-[rgba(201,162,75,0.20)] px-4 py-2.5 flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSend(inputValue); }}
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
              <p className="text-center mt-2 text-[8px] font-sans tracking-[0.16em] uppercase text-text-on-ink/20">
                POWERED BY BELL.AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Open Bell, the concierge chat"}
        aria-expanded={isOpen}
        aria-controls={panelId}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        animate={
          !hasShimmered
            ? {
                boxShadow: [
                  "0 0 0 0px rgba(201,162,75,0)",
                  "0 0 0 8px rgba(201,162,75,0.18)",
                  "0 0 0 0px rgba(201,162,75,0)",
                ],
              }
            : {}
        }
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="fixed z-50 flex items-center justify-center bg-transparent border-none cursor-pointer
          focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 rounded-full"
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
          right: "calc(env(safe-area-inset-right, 0px) + 24px)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="w-12 h-12 rounded-full bg-ink flex items-center justify-center shadow-[0_4px_16px_rgba(26,35,50,0.35)]"
            >
              <X size={20} className="text-gold" />
            </motion.span>
          ) : (
            <motion.span
              key="bell"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              style={{ marginTop: "-2px" }} // optical centering
            >
              <BellMarkInline size={80} className="text-gold drop-shadow-lg" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </>
  );
}
