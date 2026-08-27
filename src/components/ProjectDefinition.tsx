import { PROJECT } from "@/data/project";

export function ProjectDefinition() {
  return (
    <section id="overview" className="scroll-mt-24 border-b border-line bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Direct answer</p>
        <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
          What is Cornerstone in Brampton?
        </h2>
        <p className="mt-5 text-lg leading-8 text-ink">
          Cornerstone is an upcoming master-planned residential community by Primont Homes
          in Northwest Brampton, Ontario. Primont currently plans a September 2026 release
          of townhomes and detached homes, with 3–5 bedroom options and prices coming soon
          from the $600s. The broader community vision is expected to include additional
          housing types over time, including future condominiums. Buyers can register for
          verified pricing, floor plans and release updates as Primont publishes them.
        </p>
        <p className="mt-4 text-sm text-ink-muted">
          Source: official Primont Cornerstone page, last verified {PROJECT.verificationDateDisplay}.
        </p>
      </div>
    </section>
  );
}
