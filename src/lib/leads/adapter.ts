import type { CapturedLead } from "@/lib/leads/schema";

export type LeadSendResult = {
  adapter: string;
  ok: boolean;
  error?: string;
};

export interface LeadAdapter {
  name: string;
  enabled: boolean;
  send(lead: CapturedLead): Promise<LeadSendResult>;
}

export function redactLeadForLogs(lead: CapturedLead) {
  return {
    id: lead.id,
    homeInterest: lead.homeInterest,
    buyerTimeline: lead.buyerTimeline,
    landingPageUrl: lead.landingPageUrl,
    utmSource: lead.utmSource,
    utmCampaign: lead.utmCampaign,
    submittedAt: lead.submittedAt,
    consentTextVersion: lead.consentTextVersion,
    hasPhone: Boolean(lead.phone),
    emailDomain: lead.email.split("@")[1] ?? "unknown",
  };
}
