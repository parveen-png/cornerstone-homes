import Image from "next/image";
import { HIGHLIGHT_CHIPS, PROJECT } from "@/data/project";
import { LeadForm } from "@/components/LeadForm";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-forest-deep text-paper">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Artist's concept of Cornerstone townhomes on a landscaped street in Northwest Brampton."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/20" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-start lg:px-8 lg:py-24">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-canvas-warm uppercase">
            {PROJECT.releaseTimingEyebrow} · {PROJECT.region}
          </p>
          <h1 className="mt-4 max-w-xl font-serif text-[2.15rem] leading-[1.12] text-paper sm:text-5xl lg:text-[3.35rem]">
            Cornerstone by Primont in Brampton
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-canvas-warm sm:text-lg">
            Cornerstone is Primont Homes’ new master-planned community in Northwest
            Brampton. The current release is promoted as townhomes and detached homes,
            with 3–5 bedroom options and prices coming soon from the $600s.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {HIGHLIGHT_CHIPS.map((chip) => (
              <li
                key={chip}
                className="rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-sm text-paper"
              >
                {chip}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xl text-xs leading-5 text-canvas-warm/80">
            Rendering is an artist’s concept and may not represent the final community.
            Facts last verified {PROJECT.verificationDateDisplay} from Primont’s official
            project page.
          </p>
        </div>
        <LeadForm id="hero-register" />
      </div>
    </section>
  );
}
