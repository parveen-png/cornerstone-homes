import Link from "next/link";
import { CTA } from "@/data/project";

const BENEFITS = [
  "Official pricing when Primont releases it",
  "Floor plans when they are published",
  "Upcoming home releases as they are confirmed",
  "Confirmed incentives, if announced",
  "Deposit information when published",
  "Release and sales updates from verified sources",
];

export function RegistrationBenefits() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-20">
        <div>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            Stay Ahead of the Cornerstone Release
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            Registration on this independent site is a request for information. It does not
            reserve a home, grant allocation priority, or provide exclusive developer access.
            When Primont publishes new verified details, we share those updates with people
            who asked to receive them.
          </p>
          <ul className="mt-6 space-y-3">
            {BENEFITS.map((item) => (
              <li key={item} className="flex gap-3 text-ink">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-canvas px-6 py-8">
          <p className="font-serif text-2xl text-ink">What registration is — and is not</p>
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            Registrants can request updates. They are not promised first unit selection,
            VIP allocation, or a price list until those documents actually exist.
          </p>
          <Link
            href="/#register"
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-forest px-5 font-semibold text-paper hover:bg-forest-hover"
          >
            {CTA.primary}
          </Link>
        </div>
      </div>
    </section>
  );
}
