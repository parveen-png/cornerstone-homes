/**
 * Central source of truth for Cornerstone project facts.
 *
 * Update this file when Primont publishes newer first-party information.
 * Do not let page components hard-code competing values.
 *
 * Last official re-check: 20 August 2026
 * Primary source: https://primont.com/low-rise/brampton/cornerstone
 */

export const FACT_STATUS = {
  VERIFIED: "verified",
  TBA: "tba",
  CONFLICTING: "conflicting",
} as const;

export type FactStatus = (typeof FACT_STATUS)[keyof typeof FACT_STATUS];

export type ProjectFact = {
  label: string;
  value: string;
  status: FactStatus;
  sourceNote?: string;
};

export const PAGE_VERSION = "2026.08.20.1";
export const FORM_VERSION = "1.2.0";
export const CONSENT_TEXT_VERSION = "2026-08-28.1";

export const CONSENT_TEXT =
  "I agree to receive email updates about Cornerstone.";

export const SITE = {
  name: "Cornerstone Brampton",
  shortName: "Cornerstone Brampton",
  tagline: "Independent information for Primont's Northwest Brampton community",
  defaultTitle: "Cornerstone Brampton by Primont | New Homes & Updates",
  description:
    "Cornerstone by Primont Homes is a master-planned community in Northwest Brampton with townhomes and detached homes coming September 2026, currently advertised from the $600s. Register for verified pricing, floor plans and project updates.",
  path: "/",
} as const;

export const PROJECT = {
  name: "Cornerstone",
  developer: "Primont Homes",
  city: "Brampton",
  region: "Northwest Brampton",
  province: "Ontario",
  country: "Canada",
  communityType: "Master-planned residential community",
  status: "Coming soon",
  releaseTimingDisplay: "September 2026",
  releaseTimingEyebrow: "Coming September 2026",
  housingTypesCurrent: ["Townhomes", "Detached homes"] as const,
  housingTypesFutureVision: [
    "Condominiums",
    "Townhomes",
    "Detached homes",
  ] as const,
  bedroomsDisplay: "3–5 bedrooms",
  pricingDisplay: "Coming soon from the $600s",
  pricingQualifier:
    "Current advertised starting-price positioning. Not an exact model price.",
  floorPlansStatus: "Request latest update",
  depositStatus: "To be announced",
  occupancyStatus: "To be announced",
  verificationDateIso: "2026-08-20",
  verificationDateDisplay: "20 August 2026",
  officialProjectUrl: "https://primont.com/low-rise/brampton/cornerstone",
  officialDeveloperUrl: "https://primont.com/",
  officialAboutUrl: "https://primont.com/about",
} as const;

export const CTA = {
  primary: "Get VIP Pricing & Floorplans",
  primaryShort: "Get VIP Pricing & Floorplans",
  supporting:
    "Receive new pricing, floor plans, release information and project updates as they become available.",
  pricing: "Get VIP Pricing & Floorplans",
  requestVerified: "Request the latest verified update",
} as const;

export const DISCLOSURE = {
  short:
    "Independent informational website. Not the official website of Primont Homes or Cornerstone.",
  footer:
    "This is an independent informational website and is not the official website of the developer, builder or project. Project details, prices, incentives, specifications, dates and availability are subject to change without notice. Renderings are artists' concepts and may not represent the final community. This website is not an offering for sale. Any offering may be made only through the developer's official documents and applicable Agreement of Purchase and Sale. E.&O.E.",
} as const;

export const HOME_INTEREST_OPTIONS = [
  { value: "townhome", label: "Townhome" },
  { value: "detached", label: "Detached Home" },
  { value: "not_sure", label: "Not Sure Yet" },
] as const;

export const BUYER_TIMELINE_OPTIONS = [
  { value: "", label: "Select a timeline (optional)" },
  { value: "researching", label: "Just researching" },
  { value: "0_6_months", label: "Next 6 months" },
  { value: "6_12_months", label: "6–12 months" },
  { value: "12_plus_months", label: "12+ months" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const PROJECT_FACTS: ProjectFact[] = [
  {
    label: "Developer",
    value: "Primont Homes",
    status: FACT_STATUS.VERIFIED,
    sourceNote: "Official Primont Cornerstone page and Primont company website.",
  },
  {
    label: "Location",
    value: "Northwest Brampton, Ontario",
    status: FACT_STATUS.VERIFIED,
    sourceNote:
      "Official Primont Cornerstone page. A precise civic address has not been published on that page as of the verification date.",
  },
  {
    label: "Community",
    value: "Master-planned residential community",
    status: FACT_STATUS.VERIFIED,
    sourceNote: "Official Primont Cornerstone page.",
  },
  {
    label: "Current release",
    value: "Townhomes and detached homes",
    status: FACT_STATUS.VERIFIED,
    sourceNote:
      "Official Primont Cornerstone page currently promotes new townhomes and detached homes. Future condominiums are described as part of the broader community vision, not as confirmed inventory in the current release.",
  },
  {
    label: "Bedrooms",
    value: "3–5 bedrooms, subject to final release details",
    status: FACT_STATUS.VERIFIED,
    sourceNote:
      "Primont homepage currently promotes Cornerstone as 3–5 bedroom townhomes and detached homes. Individual model bedroom counts remain subject to the official release.",
  },
  {
    label: "Pricing",
    value: "Coming soon from the $600s",
    status: FACT_STATUS.VERIFIED,
    sourceNote:
      'Official Cornerstone page: "Coming Soon from the $600\'s." This is advertised positioning, not an exact starting purchase price.',
  },
  {
    label: "Release",
    value: "September 2026",
    status: FACT_STATUS.VERIFIED,
    sourceNote:
      'Official Cornerstone project page currently states "Coming September 2026." Other Primont marketing pages currently use the broader phrase "Coming Fall 2026," which is consistent with September. Use the project page value until Primont publishes a newer dated change.',
  },
  {
    label: "Floor plans",
    value: "Request latest update",
    status: FACT_STATUS.TBA,
    sourceNote:
      "No official public floor-plan package was available on Primont's Cornerstone page as of the verification date.",
  },
  {
    label: "Deposit structure",
    value: "To be announced",
    status: FACT_STATUS.TBA,
    sourceNote:
      "No official deposit schedule has been published by Primont for Cornerstone as of the verification date.",
  },
  {
    label: "Occupancy / closing",
    value: "To be announced",
    status: FACT_STATUS.TBA,
    sourceNote:
      "No official occupancy or closing timeline has been published by Primont for Cornerstone as of the verification date.",
  },
];

export const LAUNCH_BLOCKERS = [
  {
    id: "publisher",
    label: "Legal publisher / brokerage name",
    detail:
      "A real legal publisher or brokerage identity must be supplied before public launch. Placeholder identity is shown until then.",
  },
  {
    id: "contact",
    label: "Publisher contact details",
    detail:
      "Public contact email, phone and mailing identity are required before launch.",
  },
  {
    id: "privacy",
    label: "Privacy policy",
    detail:
      "The privacy page is a working draft and must be reviewed by counsel before collection of personal information in production.",
  },
  {
    id: "lead-destination",
    label: "Lead CRM / webhook / email destination",
    detail:
      "Configure Google Sheets, LEAD_WEBHOOK_URL and/or Resend notification email variables. Until then, submissions are stored only through the documented launch placeholder.",
  },
  {
    id: "renderings",
    label: "Authorized project renderings",
    detail:
      "No authorized Cornerstone renderings were supplied. The page uses clearly labelled supporting photography that is not a Cornerstone rendering.",
  },
] as const;

export const OPTIONAL_OFFICIAL_ASSETS = [
  "Official Cornerstone brochure",
  "Official Cornerstone price list",
  "Official floor plans",
  "Official deposit schedule",
  "Official incentives",
] as const;

export const DO_NOT_PUBLISH = [
  "Phase 1 contains exactly 129 homes",
  "Specific square-footage ranges",
  "A 10% extended deposit",
  "Occupancy in 2028",
  "Free assignment",
  "Capped development charges",
  "A standard Futura or other smart-home package",
  "Exactly six layouts",
  "Civic addresses 10344 or 10629 Mississauga Road",
  "VIP or Platinum allocation",
  "Preferential unit selection for registrants",
] as const;
