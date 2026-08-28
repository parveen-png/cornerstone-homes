import { PROJECT } from "@/data/project";

const HIGHLIGHTS = [
  { label: "Developer", value: PROJECT.developer },
  { label: "Location", value: PROJECT.region },
  { label: "Homes", value: PROJECT.housingTypesCurrent.join(" & ") },
  { label: "Pricing", value: PROJECT.pricingDisplay },
] as const;

export function ProjectDefinition() {
  return (
    <section id="overview" className="scroll-mt-24 border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              Direct answer
            </p>
            <h2 className="mt-3 max-w-md font-serif text-3xl leading-[1.12] text-ink sm:text-5xl">
              What is Cornerstone in Brampton?
            </h2>
          </div>
          <div className="border-l-2 border-gold/70 pl-5 sm:pl-7">
            <p id="direct-answer" className="text-lg leading-8 text-ink">
              Cornerstone is an upcoming master-planned residential community by Primont Homes
              in Northwest Brampton, Ontario. Primont currently plans a September 2026 release
              of townhomes and detached homes, with 3–5 bedroom options and prices coming soon
              from the $600s. The broader community vision is expected to include additional
              housing types over time, including future condominiums. Buyers can register for
              verified pricing, floor plans and release updates as Primont publishes them.
            </p>
            <p className="mt-4 text-sm text-ink-muted">
              Source:{" "}
              <a
                className="underline decoration-line underline-offset-2 hover:text-forest"
                href={PROJECT.officialProjectUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                official Primont Cornerstone page
              </a>
              , last verified {PROJECT.verificationDateDisplay}.
            </p>
          </div>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="bg-canvas px-5 py-6 sm:px-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
                {item.label}
              </p>
              <p className="mt-2 font-semibold leading-snug text-forest-deep">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
