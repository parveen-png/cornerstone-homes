# Cornerstone Brampton — independent landing page

Independent informational website for **Cornerstone by Primont Homes** in Northwest Brampton, Ontario. This is not the official Primont or Cornerstone website.

The page is a production-ready Next.js App Router lead-generation resource. Public advertising remains blocked until legal publisher identity, privacy review, lead destination and (if used) authorized renderings are supplied.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- Zod v4 server-side validation

## Installation

```bash
npm install
cp .env.example .env.local
```

Fill publisher and lead-destination values in `.env.local` before any public launch.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Environment variables

See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, JSON-LD and emails |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 measurement ID. Loaded lazily. Never receives PII. |
| `PUBLISHER_NAME` / `PUBLISHER_LEGAL_NAME` | Legal publisher or brokerage identity |
| `PUBLISHER_EMAIL` / `PUBLISHER_PHONE` / `PUBLISHER_ADDRESS` | Public contact details |
| `PRIVACY_POLICY_REVIEWED` | Set `true` only after counsel reviews `/privacy` |
| `LEAD_FILE_STORE` | Optional JSONL store in `.data/leads.jsonl`. Off automatically when Google Sheets is configured unless set to `true`. |
| `LEAD_WEBHOOK_URL` / `LEAD_WEBHOOK_SECRET` | CRM or automation webhook |
| `LEAD_NOTIFY_EMAIL` / `LEAD_FROM_EMAIL` / `RESEND_API_KEY` | Internal notice + acknowledgement email via Resend |
| `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET` / `GOOGLE_OAUTH_REFRESH_TOKEN` | Server-only OAuth credentials with Sheets access |
| `GOOGLE_SHEETS_SPREADSHEET_ID` / `GOOGLE_SHEETS_TAB_NAME` | Destination spreadsheet and tab for captured leads |

Do not put CRM credentials in client JavaScript.

## Lead integration

Server route: `POST /api/leads`.

Flow:

1. Zod validation and sanitization
2. Honeypot (`companyWebsite`)
3. In-memory rate limit and duplicate-submit window
4. Adapter routing:
   - **google-sheets** — appends the lead to the configured Google Sheet
   - **webhook** — JSON POST to `LEAD_WEBHOOK_URL`
   - **email** — Resend internal notification plus registrant acknowledgement
   - **file-store** — `.data/leads.jsonl` local fallback when Sheets is not configured

Success copy never claims that a price list or floor plans were emailed. Successful form submits redirect to `/thank-you` for Google Ads destination conversions.

## Analytics

Events (no names, emails, phones or free text):

- `hero_cta_click`
- `form_start`
- `form_field_error`
- `form_submit_attempt`
- `generate_lead` — only after confirmed server capture
- `thank_you_view` — `/thank-you` conversion page
- `phone_click`
- `email_click`
- `document_download` — only if a real download is later added
- `section_engagement`

## How to update project facts

Edit `src/data/project.ts`. That file is the source of truth for:

- release timing
- pricing display
- housing types
- bedroom positioning
- TBA fields
- CTA labels
- verification date

Do not hard-code competing values in components. After Primont publishes a price list or floor plans:

1. Re-check the official Cornerstone page and any official PDF supplied to `public/documents/`.
2. Update the relevant fields in `src/data/project.ts`.
3. Change the primary CTA to **Get Prices & Floor Plans** only after the files exist and delivery actually works.
4. Record the new verification date.

FAQ copy lives in `src/data/faqs.ts`. Source ledger: `src/data/sources.ts`.

## Official project assets

Place authorized files here:

- `public/images/` — authorized Cornerstone renderings (replace supporting Unsplash photos)
- `public/documents/` — official brochure, price list, floor plans, deposit schedule

Until authorized renderings arrive, images are supporting photography and must not be labelled as Cornerstone homes.

## Deployment

Any Node host that supports Next.js 16 (Vercel, similar). Set all environment variables on the host. Confirm:

1. `NEXT_PUBLIC_SITE_URL` is the public HTTPS origin
2. Publisher identity is real
3. Privacy policy has been reviewed
4. Google Sheets OAuth and spreadsheet ID are set (primary lead destination)
5. `LEAD_FILE_STORE=false` in production unless you also want filesystem capture

## Launch blockers

Still required before public launch:

- Legal publisher / brokerage name
- Publisher contact details
- Privacy policy review
- Google Sheets lead destination
- Authorized project renderings (if the hero should show Cornerstone itself)

Optional before publishing claims based on them:

- Official brochure
- Official price list
- Official floor plans
- Official deposit schedule
- Official incentives

## Official fact re-check (20 August 2026)

| Check | Result |
| --- | --- |
| September 2026 | Official project page still says “Coming September 2026.” Other Primont pages say “Coming Fall 2026.” |
| From the $600s | Still current on the official project page |
| Townhomes and detached homes | Still current |
| 3–5 bedrooms | Still current on the Primont homepage |
| Official price list | Not published |
| Official floor plans | Not published |
| Deposit schedule | Not published |
| Incentives | Not published |
| Precise civic address | Not published on the official project page |
| Now selling? | No — still coming soon |

Primary source: [https://primont.com/low-rise/brampton/cornerstone](https://primont.com/low-rise/brampton/cornerstone)
