import { z } from "zod";
import {
  BUYER_TIMELINE_OPTIONS,
  CONSENT_TEXT,
  HOME_INTEREST_OPTIONS,
} from "@/data/project";

const homeInterestValues = HOME_INTEREST_OPTIONS.map((option) => option.value) as [
  string,
  ...string[],
];

const buyerTimelineValues = BUYER_TIMELINE_OPTIONS.filter((option) => option.value).map(
  (option) => option.value,
) as [string, ...string[]];

const phone = z
  .string()
  .trim()
  .min(7, "Enter your phone number.")
  .max(40, "Phone number is too long.");

function optionalClipped(max: number) {
  return z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((value) => {
      const trimmed = (value ?? "").trim();
      return trimmed ? trimmed.slice(0, max) : undefined;
    });
}

export const leadInputSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Enter your first name.")
    .max(80, "First name is too long."),
  lastName: z
    .string()
    .trim()
    .min(1, "Enter your last name.")
    .max(80, "Last name is too long."),
  email: z
    .string()
    .trim()
    .max(254, "Email is too long.")
    .pipe(z.email("Enter a valid email address.")),
  phone,
  homeInterest: z
    .enum(homeInterestValues)
    .optional()
    .or(z.literal(""))
    .transform((value) => (value ? value : undefined)),
  buyerTimeline: z
    .enum(buyerTimelineValues)
    .optional()
    .or(z.literal(""))
    .transform((value) => (value ? value : undefined)),
  consent: z.literal(true, {
    error: "Consent is required to receive updates.",
  }),
  companyWebsite: z.string().max(0, "Invalid submission.").optional().or(z.literal("")),
  landingPageUrl: optionalClipped(2048),
  pageVersion: optionalClipped(40),
  referrer: optionalClipped(2048),
  utmSource: optionalClipped(200),
  utmMedium: optionalClipped(200),
  utmCampaign: optionalClipped(200),
  utmTerm: optionalClipped(200),
  utmContent: optionalClipped(200),
  gclid: optionalClipped(200),
  wbraid: optionalClipped(200),
  gbraid: optionalClipped(200),
  msclkid: optionalClipped(200),
  fbclid: optionalClipped(200),
  ttclid: optionalClipped(200),
  liFatId: optionalClipped(200),
  formVersion: optionalClipped(40),
  consentTextVersion: optionalClipped(40),
  consentTimestamp: optionalClipped(80),
  timezone: optionalClipped(80),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

export type FieldErrors = Record<string, string>;

export function flattenLeadErrors(error: z.ZodError): FieldErrors {
  const fields: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fields[key]) {
      fields[key] = issue.message;
    }
  }
  return fields;
}

export type CapturedLead = LeadInput & {
  id: string;
  consentText: string;
  consentTextVersion: string;
  submittedAt: string;
  timezone: string;
  landingPageUrl: string;
  pageVersion: string;
  formVersion: string;
  honeypotTriggered: boolean;
};

export const CONSENT_COPY = CONSENT_TEXT;
