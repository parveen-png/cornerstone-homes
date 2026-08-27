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
      <p>
        <strong>Launch blocker:</strong> this policy is a working draft. It must be reviewed by
        Ontario privacy and marketing-compliance counsel before personal information is collected
        in production. Last updated {PROJECT.verificationDateDisplay}.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">Who we are</h2>
      <p>
        This website is published by {publisher.legalName}. It is an independent informational
        resource about Cornerstone by Primont Homes and is not the official website of Primont or
        Cornerstone.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">Information we collect</h2>
      <p>
        If you submit the update form, we collect first name, last name, email, optional phone
        number, home interest, optional buyer timeline, marketing consent, and technical
        attribution data such as landing-page URL, referrer, UTM parameters and advertising click
        IDs. We also collect a timestamp, timezone, form version and consent-text version.
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
        Lead records may be stored with a CRM, webhook destination or email provider configured by
        the publisher. We do not sell personal information. Service providers process data only to
        deliver the requested services.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">Contact</h2>
      <p>
        Privacy questions: {publisher.email}. If this address is still a placeholder, do not
        collect live leads.
      </p>
    </LegalShell>
  );
}
