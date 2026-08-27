"use client";

import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

export function ContactLinks({ email, phone }: { email: string; phone: string }) {
  const emailOk = Boolean(email) && !email.startsWith("[");
  const phoneOk = Boolean(phone) && !phone.startsWith("[");

  if (!emailOk && !phoneOk) return null;

  return (
    <p className="mt-3 flex flex-col gap-1 text-sm">
      {emailOk ? (
        <a
          href={`mailto:${email}`}
          className="underline decoration-line underline-offset-2"
          onClick={() => trackEvent(ANALYTICS_EVENTS.emailClick, { location: "footer" })}
        >
          {email}
        </a>
      ) : null}
      {phoneOk ? (
        <a
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
          className="underline decoration-line underline-offset-2"
          onClick={() => trackEvent(ANALYTICS_EVENTS.phoneClick, { location: "footer" })}
        >
          {phone}
        </a>
      ) : null}
    </p>
  );
}
