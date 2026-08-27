"use client";

import { useEffect } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

const SECTIONS = [
  "overview",
  "homes",
  "pricing",
  "location",
  "developer",
  "faq",
  "register",
];

export function SectionTracker() {
  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (!id || seen.has(id)) continue;
          seen.add(id);
          trackEvent(ANALYTICS_EVENTS.sectionEngagement, { section: id });
        }
      },
      { threshold: 0.4 },
    );

    for (const id of SECTIONS) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
