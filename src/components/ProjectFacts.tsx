import { FACT_STATUS, PROJECT, PROJECT_FACTS } from "@/data/project";

const STATUS_LABEL = {
  verified: "Verified",
  tba: "To be announced",
  conflicting: "Conflicting",
} as const;

export function ProjectFacts() {
  const confirmed = PROJECT_FACTS.filter((fact) => fact.status === FACT_STATUS.VERIFIED);
  const unpublished = PROJECT_FACTS.filter((fact) => fact.status === FACT_STATUS.TBA);
  const flagged = PROJECT_FACTS.filter((fact) => fact.status === FACT_STATUS.CONFLICTING);

  return (
    <section className="border-b border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            Project snapshot
          </p>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
            What is confirmed at Cornerstone
          </h2>
          <p className="mt-3 text-ink-muted">
            These values come from Primont’s current first-party marketing, last checked{" "}
            {PROJECT.verificationDateDisplay}.
          </p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          <dl className="contents">
            {confirmed.map((fact) => (
              <div key={fact.label} className="bg-paper px-5 py-6 sm:px-6">
                <dt className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2">
                  <p className="text-xl font-semibold leading-snug text-forest-deep">{fact.value}</p>
                  <span className="sr-only">{STATUS_LABEL[fact.status]}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col justify-end bg-canvas-warm px-5 py-6 sm:px-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
              Last verified
            </p>
            <p className="mt-2 text-xl font-semibold leading-snug text-forest-deep">
              {PROJECT.verificationDateDisplay}
            </p>
          </div>
        </div>

        {flagged.length > 0 ? (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {flagged.map((fact) => (
              <li key={fact.label} className="rounded-2xl border border-gold/40 bg-paper px-5 py-5">
                <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
                  {fact.label} · {STATUS_LABEL[fact.status]}
                </p>
                <p className="mt-2 font-semibold text-ink">{fact.value}</p>
                {fact.sourceNote ? (
                  <p className="mt-2 text-xs leading-5 text-ink-muted">{fact.sourceNote}</p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        {unpublished.length > 0 ? (
          <div className="mt-6 rounded-2xl bg-forest-deep px-5 py-7 text-paper sm:px-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              Not yet published
            </p>
            <p className="mt-2 max-w-2xl text-sm text-canvas-warm">
              Primont has not released these details. They will be shared here when they appear
              on the official project page.
            </p>
            <dl className="mt-6 grid gap-6 sm:grid-cols-3">
              {unpublished.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-lg font-semibold">{fact.label}</dt>
                  <dd className="mt-1 text-sm text-canvas-warm">
                    {fact.value}
                    <span className="sr-only"> — {STATUS_LABEL[fact.status]}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        <p className="mt-6 text-sm text-ink-muted">
          Official source:{" "}
          <a
            className="underline decoration-line underline-offset-2 hover:text-forest"
            href={PROJECT.officialProjectUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Primont Cornerstone project page
          </a>
          .
        </p>
      </div>
    </section>
  );
}
