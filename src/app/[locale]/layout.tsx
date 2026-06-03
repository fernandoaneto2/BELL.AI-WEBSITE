import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { serif, sans } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "Bell — The North Fork Concierge",
  description:
    "Bell is an AI concierge that knows the North Fork by heart. Give every guest a local insider without adding to your team's plate.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "es" | "pt")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
