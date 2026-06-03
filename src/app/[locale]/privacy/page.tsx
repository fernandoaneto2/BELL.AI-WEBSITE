import { getLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";

export default async function PrivacyPage() {
  const locale = await getLocale();

  return (
    <Section className="pt-28">
      <div className="max-w-2xl flex flex-col gap-6">
        <h1 className="font-serif text-4xl font-medium text-ink">Privacy Policy</h1>
        <p className="font-sans text-sm text-gold tracking-wide uppercase">
          {/* TODO: add real effective date */}
          Effective date: [DATE]
        </p>
        <div className="prose prose-sm font-sans text-text-muted leading-relaxed space-y-4">
          {/* TODO: replace with real privacy policy */}
          <p>
            Bell (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting the privacy of guests and establishment partners.
          </p>
          <p>
            <strong className="text-ink">[PRIVACY POLICY CONTENT]</strong> — This page will contain the full privacy policy. Please check back soon.
          </p>
          <p>
            For questions, contact us at{" "}
            <a href="mailto:hello@bell.ai" className="text-gold hover:underline">
              hello@bell.ai
            </a>
          </p>
        </div>
        <a href={`/${locale}`} className="font-sans text-sm text-text-muted hover:text-ink transition-colors mt-4">
          ← Back to Bell
        </a>
      </div>
    </Section>
  );
}
