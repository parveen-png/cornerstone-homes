import { DISCLOSURE, PROJECT, SITE } from "@/data/project";
import { getPublisher } from "@/data/publisher";
import { absoluteUrl } from "@/lib/site";
import type { CapturedLead } from "@/lib/leads/schema";

function interestLabel(value: string) {
  if (value === "townhome") return "Townhome";
  if (value === "detached") return "Detached Home";
  return "Not Sure Yet";
}

function timelineLabel(value?: string) {
  switch (value) {
    case "researching":
      return "Just researching";
    case "0_6_months":
      return "Next 6 months";
    case "6_12_months":
      return "6–12 months";
    case "12_plus_months":
      return "12+ months";
    case "not_sure":
      return "Not sure";
    default:
      return "Not provided";
  }
}

export function acknowledgementEmail(lead: CapturedLead) {
  const publisher = getPublisher();
  const unsubscribe = absoluteUrl("/unsubscribe");
  const subject = "Your Cornerstone Brampton update request";
  const text = [
    `Hello ${lead.firstName},`,
    "",
    `Thank you for requesting updates about ${PROJECT.name} by ${PROJECT.developer} in ${PROJECT.region}.`,
    "",
    "We have received your inquiry. We will share new verified project information — including pricing, floor plans and release details — as it becomes available from official sources. This message does not include a price list or floor-plan package because those documents have not been released.",
    "",
    `${SITE.name} is an independent informational website and is not the official website of Primont Homes or Cornerstone.`,
    "",
    `If you no longer wish to receive these emails, unsubscribe here: ${unsubscribe}`,
    "",
    publisher.displayName ? `Publisher: ${publisher.displayName}` : `${SITE.name}`,
    publisher.email ? `Contact: ${publisher.email}` : "",
    "",
    DISCLOSURE.short,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const html = `
    <p>Hello ${escapeHtml(lead.firstName)},</p>
    <p>Thank you for requesting updates about <strong>${escapeHtml(PROJECT.name)}</strong> by ${escapeHtml(PROJECT.developer)} in ${escapeHtml(PROJECT.region)}.</p>
    <p>We have received your inquiry. We will share new verified project information — including pricing, floor plans and release details — as it becomes available from official sources. This message does not include a price list or floor-plan package because those documents have not been released.</p>
    <p>${escapeHtml(SITE.name)} is an independent informational website and is not the official website of Primont Homes or Cornerstone.</p>
    <p>If you no longer wish to receive these emails, <a href="${unsubscribe}">unsubscribe here</a>.</p>
    <p>${publisher.displayName ? `Publisher: ${escapeHtml(publisher.displayName)}` : escapeHtml(SITE.name)}${publisher.email ? `<br/>Contact: ${escapeHtml(publisher.email)}` : ""}</p>
    <p><em>${escapeHtml(DISCLOSURE.short)}</em></p>
  `;

  return { subject, text, html };
}

export function internalLeadEmail(lead: CapturedLead) {
  const publisher = getPublisher();
  const subject = `New Cornerstone update request — ${lead.firstName} ${lead.lastName}`;
  const lines = [
    `First name: ${lead.firstName}`,
    `Last name: ${lead.lastName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "Not provided"}`,
    `Home interest: ${interestLabel(lead.homeInterest)}`,
    `Buyer timeline: ${timelineLabel(lead.buyerTimeline)}`,
    `Source: ${lead.utmSource || "direct / unknown"}`,
    `Medium: ${lead.utmMedium || "n/a"}`,
    `Campaign: ${lead.utmCampaign || "n/a"}`,
    `Term: ${lead.utmTerm || "n/a"}`,
    `Content: ${lead.utmContent || "n/a"}`,
    `Landing page: ${lead.landingPageUrl}`,
    `Referrer: ${lead.referrer || "n/a"}`,
    `Click IDs: gclid=${lead.gclid || "n/a"}; wbraid=${lead.wbraid || "n/a"}; gbraid=${lead.gbraid || "n/a"}; msclkid=${lead.msclkid || "n/a"}; fbclid=${lead.fbclid || "n/a"}`,
    `Consent: yes`,
    `Consent text version: ${lead.consentTextVersion}`,
    `Consent timestamp: ${lead.consentTimestamp || lead.submittedAt}`,
    `Submission timestamp: ${lead.submittedAt}`,
    `Timezone: ${lead.timezone}`,
    `Form version: ${lead.formVersion}`,
    `Page version: ${lead.pageVersion}`,
    `Lead ID: ${lead.id}`,
    publisher.email ? `Notify mailbox: ${publisher.email}` : "",
  ].filter(Boolean);

  return {
    subject,
    text: lines.join("\n"),
    html: `<pre style="font-family: ui-monospace, monospace; white-space: pre-wrap;">${escapeHtml(lines.join("\n"))}</pre>`,
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
