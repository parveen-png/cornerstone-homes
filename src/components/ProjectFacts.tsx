import { PROJECT, PROJECT_FACTS } from "@/data/project";

const STATUS_LABEL = {
  verified: "Verified",
  tba: "To be announced",
  conflicting: "Conflicting",
} as const;

export function ProjectFacts() {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">Cornerstone Project Facts</h2>
          <p className="mt-3 text-ink-muted">
            Time-sensitive details are labelled by status. Values below reflect Primont’s
            current first-party marketing as of {PROJECT.verificationDateDisplay}.
          </p>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper">
          <table className="w-full text-left">
            <caption className="sr-only">Verified and to-be-announced Cornerstone project facts</caption>
            <thead className="bg-canvas-warm">
              <tr>
                <th scope="col" className="px-4 py-3 text-sm font-semibold sm:px-5">
                  Fact
                </th>
                <th scope="col" className="px-4 py-3 text-sm font-semibold sm:px-5">
                  Current value
                </th>
                <th scope="col" className="hidden px-4 py-3 text-sm font-semibold sm:table-cell sm:px-5">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {PROJECT_FACTS.map((fact) => (
                <tr key={fact.label} className="border-t border-line align-top">
                  <th scope="row" className="px-4 py-4 text-sm font-medium text-ink sm:px-5">
                    {fact.label}
                  </th>
                  <td className="px-4 py-4 text-sm text-ink sm:px-5">
                    <div>{fact.value}</div>
                    {fact.sourceNote ? (
                      <p className="mt-1 text-xs leading-5 text-ink-muted">{fact.sourceNote}</p>
                    ) : null}
                    <p className="mt-1 text-xs text-gold sm:hidden">{STATUS_LABEL[fact.status]}</p>
                  </td>
                  <td className="hidden px-4 py-4 text-sm text-ink-muted sm:table-cell sm:px-5">
                    {STATUS_LABEL[fact.status]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          Last verified: {PROJECT.verificationDateDisplay}. Official source:{" "}
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
