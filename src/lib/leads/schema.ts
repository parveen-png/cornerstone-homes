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

const optionalPhone = z
  .string()
  .trim()
  .max(40)
  .optional()
  .or(z.literal(""))
  .transform((value) => (value ? value : undefined));

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
  email: z.email("Enter a valid email address.").max(254),
  phone: optionalPhone,
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
  landingPageUrl: z.string().trim().max(2048).optional(),
  pageVersion: z.string().trim().max(40).optional(),
  referrer: z.string().trim().max(2048).optional(),
  utmSource: z.string().trim().max(200).optional(),
  utmMedium: z.string().trim().max(200).optional(),
  utmCampaign: z.string().trim().max(200).optional(),
  utmTerm: z.string().trim().max(200).optional(),
  utmContent: z.string().trim().max(200).optional(),
  gclid: z.string().trim().max(200).optional(),
  wbraid: z.string().trim().max(200).optional(),
  gbraid: z.string().trim().max(200).optional(),
  msclkid: z.string().trim().max(200).optional(),
  fbclid: z.string().trim().max(200).optional(),
  ttclid: z.string().trim().max(200).optional(),
  liFatId: z.string().trim().max(200).optional(),
  formVersion: z.string().trim().max(40).optional(),
  consentTextVersion: z.string().trim().max(40).optional(),
  consentTimestamp: z.string().trim().max(80).optional(),
  timezone: z.string().trim().max(80).optional(),
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
