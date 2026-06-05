import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { serif, sans } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatLauncher } from "@/components/bell-chat/ChatLauncher";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  const title = "Bell — The North Fork Concierge";
  const description = t("subhead");

  const localeMap: Record<string, string> = {
    en: "en_US",
    es: "es_ES",
    pt: "pt_BR",
  };

  return {
    title,
    description,
    metadataBase: new URL("https://bell.ai"), // TODO: update with real domain
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "en-US": "/en",
        "es-ES": "/es",
        "pt-BR": "/pt",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      siteName: "Bell",
      locale: localeMap[locale] ?? "en_US",
      type: "website",
      // TODO: add real OG image
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: {
      icon: "/favicon.svg",
      apple: "/favicon.svg",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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
          {/* Skip to main content — keyboard accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-sans focus:font-medium"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <ChatLauncher locale={locale as "en" | "es" | "pt"} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
