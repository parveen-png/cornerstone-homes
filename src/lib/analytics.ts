export const ANALYTICS_EVENTS = {
  heroCtaClick: "hero_cta_click",
  formStart: "form_start",
  formFieldError: "form_field_error",
  formSubmitAttempt: "form_submit_attempt",
  generateLead: "generate_lead",
  thankYouView: "thank_you_view",
  phoneClick: "phone_click",
  emailClick: "email_click",
  documentDownload: "document_download",
  sectionEngagement: "section_engagement",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

const PII_KEYS = new Set([
  "firstName",
  "lastName",
  "email",
  "phone",
  "message",
  "name",
  "first_name",
  "last_name",
]);

export function stripPii(
  payload?: Record<string, unknown>,
): Record<string, unknown> | undefined {
  if (!payload) return undefined;
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (PII_KEYS.has(key)) continue;
    if (typeof value === "string" && value.includes("@")) continue;
    clean[key] = value;
  }
  return clean;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  event: AnalyticsEventName,
  payload?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  const clean = stripPii(payload) ?? {};

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...clean });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, clean);
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event, clean);
  }
}
