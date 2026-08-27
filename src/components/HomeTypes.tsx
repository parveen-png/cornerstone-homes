import Image from "next/image";

export function HomeTypes() {
  return (
    <section id="homes" className="scroll-mt-24 border-b border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">New Homes Planned for Cornerstone</h2>
          <p className="mt-3 text-ink-muted">
            Primont currently promotes two housing categories for the upcoming release.
            Model names, sizes, lot widths, garages and tenure details have not been
            officially confirmed.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-line bg-paper">
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/supporting-townhomes.jpg"
                alt="Supporting photograph of contemporary townhome-style housing. Not a Cornerstone model or official rendering."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl">Townhomes</h3>
              <p className="mt-3 text-ink-muted">
                Townhomes are part of the currently advertised Cornerstone release. Primont
                has not yet published official townhome types, widths, square footage or
                floor-plan names for this community.
              </p>
              <p className="mt-4 text-sm font-medium text-forest">
                Detailed models and floor plans to be announced.
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-2xl border border-line bg-paper">
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/supporting-detached.jpg"
                alt="Supporting photograph of a contemporary detached house. Not a Cornerstone model or official rendering."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl">Detached Homes</h3>
              <p className="mt-3 text-ink-muted">
                Detached homes are also part of the currently advertised release. Lot sizes,
                elevations and model pricing have not been officially confirmed and should be
                verified from Primont’s release documents when published.
              </p>
              <p className="mt-4 text-sm font-medium text-forest">
                Detailed models and floor plans to be announced.
              </p>
            </div>
          </article>
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-6 text-ink-muted">
          Primont’s official project page describes a broader master-plan vision that is
          expected to incorporate additional housing choices over time, including future
          condominium residences as well as townhomes and detached homes. Future phases
          should not be treated as available for purchase now.
        </p>
      </div>
    </section>
  );
}
