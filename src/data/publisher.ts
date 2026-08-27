/**
 * Legal publisher identity.
 * Public launch is blocked until real identity is supplied via environment variables.
 */

function read(name: string, fallback: string): string {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : fallback;
}

export const PUBLISHER_PLACEHOLDERS = {
  name: "[LEGAL PUBLISHER / BROKERAGE NAME]",
  legalName: "[LEGAL PUBLISHER / BROKERAGE LEGAL NAME]",
  email: "[PUBLISHER EMAIL]",
  phone: "[PUBLISHER PHONE]",
  address: "[PUBLISHER ADDRESS]",
  city: "[CITY]",
  province: "Ontario",
  country: "Canada",
} as const;

export function getPublisher() {
  const name = read("PUBLISHER_NAME", PUBLISHER_PLACEHOLDERS.name);
  const legalName = read("PUBLISHER_LEGAL_NAME", PUBLISHER_PLACEHOLDERS.legalName);
  const email = read("PUBLISHER_EMAIL", PUBLISHER_PLACEHOLDERS.email);
  const phone = read("PUBLISHER_PHONE", PUBLISHER_PLACEHOLDERS.phone);
  const address = read("PUBLISHER_ADDRESS", PUBLISHER_PLACEHOLDERS.address);

  const isConfigured =
    name !== PUBLISHER_PLACEHOLDERS.name &&
    email !== PUBLISHER_PLACEHOLDERS.email &&
    !name.startsWith("[") &&
    !email.startsWith("[");

  return {
    name,
    legalName,
    email,
    phone,
    address,
    isConfigured,
    privacyReviewed: process.env.PRIVACY_POLICY_REVIEWED === "true",
    leadDestinationConfigured: Boolean(
      process.env.LEAD_WEBHOOK_URL ||
        process.env.LEAD_NOTIFY_EMAIL ||
        process.env.RESEND_API_KEY,
    ),
  };
}

export type Publisher = ReturnType<typeof getPublisher>;
