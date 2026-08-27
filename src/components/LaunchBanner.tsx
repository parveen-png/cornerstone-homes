import { LAUNCH_BLOCKERS, OPTIONAL_OFFICIAL_ASSETS } from "@/data/project";
import { getPublisher } from "@/data/publisher";

export function LaunchBanner() {
  const publisher = getPublisher();
  const remaining = LAUNCH_BLOCKERS.filter((blocker) => {
    if (blocker.id === "publisher" || blocker.id === "contact") return !publisher.isConfigured;
    if (blocker.id === "privacy") return !publisher.privacyReviewed;
    if (blocker.id === "lead-destination") return !publisher.leadDestinationConfigured;
    return true;
  });

  if (remaining.length === 0) return null;

  return (
    <div className="border-b border-gold/30 bg-canvas-warm px-4 py-3 text-sm text-ink">
      <div className="mx-auto max-w-6xl">
        <p className="font-medium">Launch blockers — this site is not ready for public advertising.</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-muted">
          {remaining.map((blocker) => (
            <li key={blocker.id}>
              <span className="font-medium text-ink">{blocker.label}.</span> {blocker.detail}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-ink-muted">
          Optional official assets not yet supplied: {OPTIONAL_OFFICIAL_ASSETS.join("; ")}.
        </p>
      </div>
    </div>
  );
}
