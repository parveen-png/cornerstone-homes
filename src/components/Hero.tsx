import Image from "next/image";
import { CTA, PROJECT } from "@/data/project";
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
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/90 via-forest-deep/70 to-forest/20" />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:px-8 lg:py-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-canvas-warm uppercase">
            {PROJECT.releaseTimingEyebrow} · {PROJECT.region}
          </p>
          <h1 className="mt-3 max-w-xl font-serif text-[2.15rem] leading-[1.12] text-paper sm:text-5xl">
            Cornerstone by Primont in Brampton
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-canvas-warm sm:text-lg">
            Townhomes and detached homes from the $600s.
          </p>
        </div>
        <LeadForm id="hero-register" heading={CTA.primary} compact />
      </div>
    </section>
  );
}
