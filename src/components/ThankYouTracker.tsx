"use client";

import { useEffect } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

export function ThankYouTracker() {
  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.thankYouView, { page: "/thank-you" });
  }, []);

  return null;
}
