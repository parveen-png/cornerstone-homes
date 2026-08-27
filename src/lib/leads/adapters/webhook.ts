import type { LeadAdapter, LeadSendResult } from "@/lib/leads/adapter";
import type { CapturedLead } from "@/lib/leads/schema";

function webhookUrl() {
  return process.env.LEAD_WEBHOOK_URL?.trim() || "";
}

export const webhookAdapter: LeadAdapter = {
  name: "webhook",
  get enabled() {
    return webhookUrl().length > 0;
  },
  async send(lead: CapturedLead): Promise<LeadSendResult> {
    const url = webhookUrl();
    if (!url) return { adapter: this.name, ok: false, error: "LEAD_WEBHOOK_URL is not set." };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.LEAD_WEBHOOK_SECRET
            ? { authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify(lead),
      });

      if (!response.ok) {
        return {
          adapter: this.name,
          ok: false,
          error: `Webhook responded ${response.status}`,
        };
      }

      return { adapter: this.name, ok: true };
    } catch (error) {
      return {
        adapter: this.name,
        ok: false,
        error: error instanceof Error ? error.message : "Webhook request failed",
      };
    }
  },
};
