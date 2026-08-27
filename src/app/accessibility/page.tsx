import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { getPublisher } from "@/data/publisher";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility statement for the independent Cornerstone Brampton website.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  const publisher = getPublisher();

  return (
    <LegalShell title="Accessibility">
      <p>
        We aim to meet WCAG 2.2 AA fundamentals: semantic headings, keyboard access, visible
        focus, labelled form fields, accessible validation, and reduced-motion support.
      </p>
      <p>
        If you encounter a barrier, contact {publisher.email} and describe the page, the issue,
        and any assistive technology you use. We will work to address reported barriers.
      </p>
      <p>
        This statement does not constitute a certified audit. A formal accessibility review should
        be completed before high-traffic advertising.
      </p>
    </LegalShell>
  );
}
