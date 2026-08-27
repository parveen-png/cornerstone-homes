import Link from "next/link";
import { CTA, PROJECT } from "@/data/project";

export function PricingStatus() {
  return (
    <section id="pricing" className="scroll-mt-24 border-b border-line bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">Cornerstone Pricing</h2>
        <p className="mt-6 font-serif text-4xl text-forest sm:text-5xl">{PROJECT.pricingDisplay}</p>
        <p className="mx-auto mt-5 max-w-2xl text-ink-muted">
          This is the current broad starting-price positioning advertised by Primont and is
          not an exact model price. Individual home pricing, premiums, taxes, closing costs,
          incentives and availability remain subject to the developer’s official release
          documents. No pricing table is shown here because an official price list has not
          been published.
        </p>
        <p className="mt-4 text-sm text-ink-muted">
          Source: Primont Cornerstone page, verified {PROJECT.verificationDateDisplay}.
        </p>
        <Link
          href="/#register"
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-forest px-6 font-semibold text-paper hover:bg-forest-hover"
        >
          {CTA.pricing}
        </Link>
      </div>
    </section>
  );
}
