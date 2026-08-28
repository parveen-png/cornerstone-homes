import { randomUUID } from "node:crypto";
import { CONSENT_TEXT, CONSENT_TEXT_VERSION, FORM_VERSION, PAGE_VERSION } from "@/data/project";
import { fileStoreAdapter } from "@/lib/leads/adapters/file-store";
import { emailAdapter } from "@/lib/leads/adapters/email";
import { webhookAdapter } from "@/lib/leads/adapters/webhook";
import { sheetsAdapter } from "@/lib/leads/adapters/sheets";
import type { LeadAdapter, LeadSendResult } from "@/lib/leads/adapter";
import { flattenLeadErrors, leadInputSchema, type CapturedLead } from "@/lib/leads/schema";
import { checkRateLimit, isDuplicateSubmission } from "@/lib/leads/rate-limit";
import { hashIdentifier, sanitizeEmail, sanitizePhone, sanitizeText } from "@/lib/leads/sanitize";
import { getSiteUrl } from "@/lib/site";

export type CaptureOutcome =
  | { ok: true; duplicate: boolean; leadId: string; adapters: LeadSendResult[] }
  | { ok: false; status: number; message: string; fieldErrors?: Record<string, string> };

function adapters(): LeadAdapter[] {
  return [sheetsAdapter, webhookAdapter, emailAdapter, fileStoreAdapter];
}

export async function captureLead(
  raw: unknown,
  meta: { ip: string },
): Promise<CaptureOutcome> {
  const parsed = leadInputSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      message: "Please correct the highlighted fields.",
      fieldErrors: flattenLeadErrors(parsed.error),
    };
  }

  const data = parsed.data;
  if (data.companyWebsite && data.companyWebsite.length > 0) {
    return { ok: true, duplicate: false, leadId: "ignored", adapters: [] };
  }

  const email = sanitizeEmail(data.email);
  const rateKey = `${meta.ip}:${hashIdentifier(email)}`;
  const limit = checkRateLimit(rateKey);
  if (!limit.ok) {
    return {
      ok: false,
      status: 429,
      message: "We couldn't submit your request. Please try again or contact us directly.",
    };
  }

  const captured: CapturedLead = {
    ...data,
    firstName: sanitizeText(data.firstName, 80),
    lastName: sanitizeText(data.lastName, 80),
    email,
    phone: sanitizePhone(data.phone),
    id: randomUUID(),
    consentText: CONSENT_TEXT,
    consentTextVersion: data.consentTextVersion || CONSENT_TEXT_VERSION,
    submittedAt: new Date().toISOString(),
    timezone: sanitizeText(data.timezone || "unknown", 80),
    landingPageUrl: sanitizeText(data.landingPageUrl || getSiteUrl(), 2048),
    pageVersion: sanitizeText(data.pageVersion || PAGE_VERSION, 40),
    formVersion: sanitizeText(data.formVersion || FORM_VERSION, 40),
    honeypotTriggered: false,
  };

  if (isDuplicateSubmission(email)) {
    return { ok: true, duplicate: true, leadId: captured.id, adapters: [] };
  }

  const enabled = adapters().filter((adapter) => adapter.enabled);
  if (enabled.length === 0) {
    return {
      ok: false,
      status: 503,
      message: "We couldn't submit your request. Please try again or contact us directly.",
    };
  }

  const results = await Promise.all(enabled.map((adapter) => adapter.send(captured)));
  const sheetsResult = results.find((result) => result.adapter === "google-sheets");
  if (sheetsAdapter.enabled && sheetsResult && !sheetsResult.ok) {
    console.error("[lead:delivery-failed]", sheetsResult.error);
    return {
      ok: false,
      status: 502,
      message: "We couldn't submit your request. Please try again or contact us directly.",
    };
  }

  const anyDurable = results.some((result) => result.ok);

  if (!anyDurable) {
    console.error(
      "[lead:delivery-failed]",
      results.map((result) => `${result.adapter}:${result.error ?? "ok"}`).join(", "),
    );
    return {
      ok: false,
      status: 502,
      message: "We couldn't submit your request. Please try again or contact us directly.",
    };
  }

  return { ok: true, duplicate: false, leadId: captured.id, adapters: results };
}
