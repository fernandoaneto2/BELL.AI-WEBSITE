export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

// TODO: for serverless scale (multiple instances) replace with a shared store e.g. Upstash Redis
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

const VALID_LOCALES = new Set(["en", "es", "pt"]);

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.BELL_CONCIERGE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[concierge] BELL_CONCIERGE_WEBHOOK_URL is not set");
    return NextResponse.json(
      { reply: "I'm having a brief hiccup on my end. Give me a moment and try again." },
      { status: 500 }
    );
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { reply: "One moment — you're sending those a little fast. Try again in a few seconds." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { message, sessionId, language } = body as Record<string, unknown>;

  if (
    typeof message !== "string" ||
    message.trim().length === 0 ||
    message.length > 1000
  ) {
    return NextResponse.json(
      { error: "message must be a non-empty string up to 1000 characters" },
      { status: 400 }
    );
  }

  const safeLocale = VALID_LOCALES.has(language as string)
    ? (language as string)
    : "en";

  const safeSessionId =
    typeof sessionId === "string" && sessionId.trim().length > 0
      ? sessionId.trim()
      : randomUUID();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message.trim(),
        session_id: safeSessionId,
        language: safeLocale,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!upstream.ok) {
      console.error(`[concierge] upstream returned ${upstream.status}`);
      return NextResponse.json(
        { reply: "I'm having a brief hiccup on my end. Give me a moment and try again." },
        { status: 502 }
      );
    }

    const data = await upstream.json();
    const reply =
      typeof data?.reply === "string" && data.reply.trim().length > 0
        ? data.reply
        : "I'm having a brief hiccup on my end. Give me a moment and try again.";

    return NextResponse.json({ reply });
  } catch (err) {
    clearTimeout(timeout);
    const isTimeout =
      err instanceof Error && err.name === "AbortError";
    console.error(
      isTimeout ? "[concierge] upstream timed out" : "[concierge] fetch error",
      isTimeout ? "" : err
    );
    return NextResponse.json(
      { reply: "I'm having a brief hiccup on my end. Give me a moment and try again." },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
