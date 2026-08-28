import type { LeadAdapter, LeadSendResult } from "@/lib/leads/adapter";
import type { CapturedLead } from "@/lib/leads/schema";

const SHEET_HEADERS = [
  "Date",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Product Interest",
  "Buyer Timing",
  "Marketing Consent",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "Landing Page",
  "Referrer",
  "Submission ID",
  "Project",
] as const;

function extractSpreadsheetId(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match?.[1] ?? trimmed;
}

export function googleSheetsConfigured(): boolean {
  return Boolean(
    (process.env.GOOGLE_OAUTH_CLIENT_ID || process.env.GOOGLE_CLIENT_ID) &&
      (process.env.GOOGLE_OAUTH_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET) &&
      (process.env.GOOGLE_OAUTH_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN) &&
      process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  );
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET / GOOGLE_OAUTH_REFRESH_TOKEN",
    );
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  const json = (await response.json().catch(() => null)) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  } | null;

  if (!response.ok || !json?.access_token) {
    throw new Error(
      json?.error_description || json?.error || `Failed to fetch Google access token (${response.status})`,
    );
  }

  return json.access_token;
}

async function callSheetsApi(endpoint: string, method = "GET", body: unknown = null): Promise<unknown> {
  const accessToken = await getAccessToken();
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const json = (await response.json().catch(() => null)) as {
    error?: { message?: string };
  } | null;

  if (!response.ok) {
    throw new Error(json?.error?.message || `Sheets API Error: ${response.status}`);
  }

  return json;
}

async function ensureSheetExists(spreadsheetId: string, title: string): Promise<void> {
  const metadata = (await callSheetsApi(spreadsheetId)) as {
    sheets?: Array<{ properties: { title: string } }>;
  };
  const sheetExists = metadata.sheets?.some((sheet) => sheet.properties.title === title);

  if (!sheetExists) {
    await callSheetsApi(`${spreadsheetId}:batchUpdate`, "POST", {
      requests: [{ addSheet: { properties: { title } } }],
    });
  }
}

async function ensureHeaders(spreadsheetId: string, sheetName: string, headers: readonly string[]): Promise<void> {
  const range = `${sheetName}!A1:Z1`;
  const result = (await callSheetsApi(`${spreadsheetId}/values/${encodeURIComponent(range)}`)) as {
    values?: string[][];
  };

  if (!result.values || result.values.length === 0) {
    await callSheetsApi(
      `${spreadsheetId}/values/${encodeURIComponent(`${sheetName}!A1`)}:append?valueInputOption=USER_ENTERED`,
      "POST",
      { values: [headers] },
    );
  }
}

function interestLabel(value?: string) {
  if (value === "townhome") return "Townhome";
  if (value === "detached") return "Detached Home";
  if (value === "not_sure") return "Not Sure Yet";
  return "";
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
      return "";
  }
}

function rowForLead(lead: CapturedLead) {
  return [
    lead.submittedAt,
    lead.firstName,
    lead.lastName,
    lead.email,
    lead.phone || "",
    interestLabel(lead.homeInterest),
    timelineLabel(lead.buyerTimeline),
    lead.consent ? "Yes" : "No",
    lead.utmSource || "",
    lead.utmMedium || "",
    lead.utmCampaign || "",
    lead.landingPageUrl || "",
    lead.referrer || "",
    lead.id,
    "Cornerstone Brampton",
  ];
}

export const sheetsAdapter: LeadAdapter = {
  name: "google-sheets",
  get enabled() {
    return googleSheetsConfigured();
  },
  async send(lead: CapturedLead): Promise<LeadSendResult> {
    const spreadsheetEnv = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
    if (!spreadsheetEnv) {
      return { adapter: this.name, ok: false, error: "GOOGLE_SHEETS_SPREADSHEET_ID is not set." };
    }

    const spreadsheetId = extractSpreadsheetId(spreadsheetEnv);
    const sheetName = process.env.GOOGLE_SHEETS_TAB_NAME?.trim() || "Sheet1";

    try {
      await ensureSheetExists(spreadsheetId, sheetName);
      await ensureHeaders(spreadsheetId, sheetName, SHEET_HEADERS);
      await callSheetsApi(
        `${spreadsheetId}/values/${encodeURIComponent(`${sheetName}!A1`)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        "POST",
        { values: [rowForLead(lead)] },
      );
      return { adapter: this.name, ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Google Sheets request failed";
      console.error("[lead:google-sheets]", message);
      return { adapter: this.name, ok: false, error: message };
    }
  },
};
