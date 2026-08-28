import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";
import { getPublisher } from "@/data/publisher";
import { PROJECT } from "@/data/project";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy practices for the independent Cornerstone Brampton information website.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const publisher = getPublisher();

  return (
    <LegalShell title="Privacy Policy">
      <p>Last updated {PROJECT.verificationDateDisplay}.</p>
      <h2 className="mt-10 font-serif text-2xl text-ink">Who we are</h2>
      <p>
        This website is an independent informational resource about Cornerstone by Primont Homes
        {publisher.displayName ? `, published by ${publisher.displayName}` : ""}. It is not the
        official website of Primont or Cornerstone.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">Information we collect</h2>
      <p>
        If you submit the update form, we collect first name, last name, email, phone, marketing
        consent, and technical attribution data such as landing-page URL, referrer, UTM parameters
        and advertising click IDs. We also collect a timestamp, timezone, form version and
        consent-text version.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">How we use it</h2>
      <p>
        We use this information to send project updates you requested, to contact you about
        Cornerstone, and to understand which campaigns referred you. We do not send names, email
        addresses, phone numbers or free-text messages to analytics platforms.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">Consent and electronic communications</h2>
      <p>
        Marketing email is sent only if you check the consent box. Consent is not pre-selected.
        You may unsubscribe at any time using the link in our emails or the{" "}
        <Link className="underline" href="/unsubscribe">
          unsubscribe page
        </Link>
        .
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">Retention and sharing</h2>
      <p>
        Lead records may be stored in Google Sheets and, if configured, a CRM, webhook destination
        or email provider for this website. We do not sell personal information. Service providers
        process data only to deliver the requested services.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">Contact</h2>
      <p>
        {publisher.email
          ? `Privacy questions: ${publisher.email}.`
          : "For privacy questions, use the update form on the homepage or the unsubscribe page to manage email preferences."}
      </p>
    </LegalShell>
  );
}
