import { CTA } from "@/data/project";
import { LeadForm } from "@/components/LeadForm";

export function FinalCTA() {
  return (
    <section id="register" className="scroll-mt-24 border-b border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:px-8 lg:py-20">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl">Get Cornerstone Updates</h2>
          <p className="mt-4 max-w-lg text-canvas-warm">
            {CTA.supporting} If a detail is still unpublished — including exact prices, floor
            plans or deposits — we will not invent it. Register to be notified when verified
            information is released.
          </p>
        </div>
        <LeadForm id="final-register" heading="Request project updates" compact />
      </div>
    </section>
  );
}
