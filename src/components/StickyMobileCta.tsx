"use client";

import Link from "next/link";
import { CTA } from "@/data/project";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

export function StickyMobileCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-3 md:hidden">
      <Link
        href="/#register"
        className="pointer-events-auto flex min-h-12 items-center justify-center rounded-md bg-forest px-5 font-semibold text-paper shadow-lg shadow-ink/10"
        onClick={() => trackEvent(ANALYTICS_EVENTS.heroCtaClick, { location: "sticky-mobile" })}
      >
        {CTA.primary}
      </Link>
    </div>
  );
}
