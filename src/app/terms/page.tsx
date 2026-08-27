import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { DISCLOSURE, SITE } from "@/data/project";
import { getPublisher } from "@/data/publisher";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the independent Cornerstone Brampton information website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const publisher = getPublisher();

  return (
    <LegalShell title="Terms of Use">
      <p>
        These terms describe an independent information website
        {publisher.displayName ? ` published by ${publisher.displayName}` : ` operated as ${SITE.name}`}.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">No affiliation</h2>
      <p>
        This website is not the official website of Primont Homes or Cornerstone. It is not an
        offering for sale. Any offering may be made only through the developer’s official
        documents and applicable Agreement of Purchase and Sale.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">Accuracy</h2>
      <p>
        Project details, prices, incentives, specifications, dates and availability are subject to
        change without notice. We do not invent unpublished pre-construction facts. Where a fact
        is not officially confirmed, we say so.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">No professional advice</h2>
      <p>
        Nothing on this website is legal, tax, mortgage or investment advice. Confirm all purchase
        terms with qualified professionals and the developer’s official documents.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">Disclaimer</h2>
      <p>{DISCLOSURE.footer}</p>
    </LegalShell>
  );
}
