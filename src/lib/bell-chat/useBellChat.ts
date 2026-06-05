"use client";

import { useState, useCallback, useRef } from "react";

export type Locale = "en" | "es" | "pt";

export interface ChatMessage {
  id: string;
  role: "user" | "bell";
  text: string;
  pending?: boolean;
}

interface UseBellChatOptions {
  locale: Locale;
  greeting?: string;
}

interface UseBellChatReturn {
  messages: ChatMessage[];
  isSending: boolean;
  error: string | null;
  send: (text: string) => void;
  reset: () => void;
}

function getOrCreateSessionId(): string {
  try {
    const stored = localStorage.getItem("bell:sessionId");
    if (stored) return stored;
    const id = crypto.randomUUID();
    localStorage.setItem("bell:sessionId", id);
    return id;
  } catch {
    // SSR or storage unavailable — generate ephemeral id
    return crypto.randomUUID();
  }
}

// TODO: review error copy with the owner
const ERROR_COPY: Record<number | "network", string> = {
  429: "One moment — you're sending those a little fast. Try again in a few seconds.",
  network: "I'm having a brief hiccup on my end. Give me a moment and try again.",
};

function errorMessage(status?: number): string {
  if (status === 429) return ERROR_COPY[429];
  return ERROR_COPY["network"];
}

export function useBellChat({ locale, greeting }: UseBellChatOptions): UseBellChatReturn {
  const initialMessages: ChatMessage[] = greeting
    ? [{ id: "greeting", role: "bell", text: greeting }]
    : [];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pendingIdRef = useRef<string | null>(null);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      setError(null);
      const userMsgId = `user-${Date.now()}`;
      const pendingId = `bell-pending-${Date.now()}`;
      pendingIdRef.current = pendingId;

      // Optimistic: append user message + pending Bell bubble
      setMessages((prev) => [
        ...prev,
        { id: userMsgId, role: "user", text: trimmed },
        { id: pendingId, role: "bell", text: "", pending: true },
      ]);
      setIsSending(true);

      try {
        const sessionId = getOrCreateSessionId();
        const res = await fetch("/api/concierge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, sessionId, language: locale }),
        });

        const data = await res.json();
        const reply =
          typeof data?.reply === "string" && data.reply.trim()
            ? data.reply
            : errorMessage(res.status);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingId ? { ...m, text: reply, pending: false } : m
          )
        );

        if (!res.ok) setError(reply);
      } catch {
        const msg = errorMessage();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === pendingIdRef.current ? { ...m, text: msg, pending: false } : m
          )
        );
        setError(msg);
      } finally {
        setIsSending(false);
        pendingIdRef.current = null;
      }
    },
    [isSending, locale]
  );

  const reset = useCallback(() => {
    setMessages(initialMessages);
    setError(null);
    setIsSending(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { messages, isSending, error, send, reset };
}
