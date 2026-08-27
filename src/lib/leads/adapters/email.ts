import type { LeadAdapter, LeadSendResult } from "@/lib/leads/adapter";
import { acknowledgementEmail, internalLeadEmail } from "@/lib/leads/emails";
import type { CapturedLead } from "@/lib/leads/schema";

function resendKey() {
  return process.env.RESEND_API_KEY?.trim() || "";
}

function fromAddress() {
  return process.env.LEAD_FROM_EMAIL?.trim() || "Cornerstone Brampton Updates <updates@localhost>";
}

function notifyAddress() {
  return process.env.LEAD_NOTIFY_EMAIL?.trim() || "";
}

async function sendResendEmail(input: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<LeadSendResult> {
  const key = resendKey();
  if (!key) return { adapter: "email", ok: false, error: "RESEND_API_KEY is not set." };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress(),
      to: [input.to],
      subject: input.subject,
      text: input.text,
      html: input.html,
    }),
  });

  if (!response.ok) {
    return { adapter: "email", ok: false, error: `Resend responded ${response.status}` };
  }

  return { adapter: "email", ok: true };
}

export const emailAdapter: LeadAdapter = {
  name: "email",
  get enabled() {
    return Boolean(resendKey() && notifyAddress());
  },
  async send(lead: CapturedLead): Promise<LeadSendResult> {
    const notify = notifyAddress();
    if (!notify) return { adapter: this.name, ok: false, error: "LEAD_NOTIFY_EMAIL is not set." };

    const internal = internalLeadEmail(lead);
    const ack = acknowledgementEmail(lead);

    const internalResult = await sendResendEmail({
      to: notify,
      subject: internal.subject,
      text: internal.text,
      html: internal.html,
    });
    if (!internalResult.ok) return { adapter: this.name, ok: false, error: internalResult.error };

    const ackResult = await sendResendEmail({
      to: lead.email,
      subject: ack.subject,
      text: ack.text,
      html: ack.html,
    });
    if (!ackResult.ok) {
      console.error("[lead:ack-email]", ackResult.error);
    }

    return { adapter: this.name, ok: true };
  },
};
