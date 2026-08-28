/**
 * Legal publisher identity, supplied via environment variables.
 * Public pages omit these fields until real values are configured.
 */

function read(name: string): string {
  return process.env[name]?.trim() || "";
}

function isPlaceholder(value: string): boolean {
  return value.length === 0 || value.startsWith("[");
}

export function getPublisher() {
  const name = read("PUBLISHER_NAME");
  const legalName = read("PUBLISHER_LEGAL_NAME");
  const email = read("PUBLISHER_EMAIL");
  const phone = read("PUBLISHER_PHONE");
  const address = read("PUBLISHER_ADDRESS");

  const isConfigured = !isPlaceholder(name) && !isPlaceholder(email);

  return {
    name,
    legalName,
    email,
    phone,
    address,
    displayName: isPlaceholder(legalName) ? (isPlaceholder(name) ? "" : name) : legalName,
    isConfigured,
    privacyReviewed: process.env.PRIVACY_POLICY_REVIEWED === "true",
    leadDestinationConfigured: Boolean(
      process.env.GOOGLE_SHEETS_SPREADSHEET_ID ||
        process.env.LEAD_WEBHOOK_URL ||
        process.env.LEAD_NOTIFY_EMAIL ||
        process.env.RESEND_API_KEY,
    ),
  };
}

export type Publisher = ReturnType<typeof getPublisher>;
