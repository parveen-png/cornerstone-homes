import { PROJECT } from "@/data/project";

export function DeveloperSection() {
  return (
    <section id="developer" className="scroll-mt-24 border-b border-line bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">About Primont Homes</h2>
        <p className="mt-5 text-lg leading-8 text-ink">
          Primont Homes is a family-run Greater Toronto Area homebuilder. According to its
          official company website, the firm has more than 50 years of history, was
          incorporated in 1976, and has built more than 5,000 homes. Leadership is described
          as multi-generational, carried forward by the founder’s family.
        </p>
        <p className="mt-4 text-ink-muted">
          Primont currently lists communities across the GTA and beyond, spanning townhomes,
          detached homes and condominiums. For authoritative developer information, visit
          Primont’s official website. This independent page does not use Primont’s logo or
          claim affiliation.
        </p>
        <a
          href={PROJECT.officialAboutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 items-center text-forest underline decoration-line underline-offset-4 hover:text-forest-deep"
        >
          Primont Homes official website
        </a>
      </div>
    </section>
  );
}
