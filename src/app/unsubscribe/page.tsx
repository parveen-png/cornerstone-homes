import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { UnsubscribeForm } from "@/components/UnsubscribeForm";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Stop commercial electronic messages from the independent Cornerstone Brampton website.",
  alternates: { canonical: "/unsubscribe" },
};

export default function UnsubscribePage() {
  return (
    <LegalShell title="Unsubscribe / email preferences">
      <p>
        Use this form to stop commercial electronic messages from this independent Cornerstone
        Brampton website. Unsubscribe handling should be connected to the production email
        provider before launch.
      </p>
      <UnsubscribeForm />
    </LegalShell>
  );
}
