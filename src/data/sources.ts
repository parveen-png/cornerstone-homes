/**
 * Source ledger for the 20 August 2026 official re-check.
 * Third-party brokerage/VIP pages are recorded only as non-authoritative discovery notes.
 */

export type SourceRecord = {
  id: string;
  title: string;
  url: string;
  authority: "official-developer" | "government" | "public-institution" | "third-party-discovery";
  usedFor: string;
  checkedOn: string;
};

export const SOURCES: SourceRecord[] = [
  {
    id: "primont-cornerstone",
    title: "Cornerstone by Primont — official project page",
    url: "https://primont.com/low-rise/brampton/cornerstone",
    authority: "official-developer",
    usedFor:
      "Project name, Northwest Brampton location, master-planned community, townhomes and detached homes, coming soon from the $600s, September 2026, future condos/townhomes/detached vision, registration for pricing and floor plans.",
    checkedOn: "2026-08-20",
  },
  {
    id: "primont-home",
    title: "Primont Homes — official homepage",
    url: "https://primont.com/",
    authority: "official-developer",
    usedFor:
      "3–5 bedroom townhomes and detached homes, from the $600s, Coming Fall 2026, family-owned GTA builder, more than 50 years, more than 5,000 homes.",
    checkedOn: "2026-08-20",
  },
  {
    id: "primont-communities",
    title: "Primont Homes — communities listing",
    url: "https://primont.com/communities",
    authority: "official-developer",
    usedFor: "Coming Fall 2026 status on the Cornerstone community card.",
    checkedOn: "2026-08-20",
  },
  {
    id: "primont-about",
    title: "Primont Homes — About",
    url: "https://primont.com/about",
    authority: "official-developer",
    usedFor:
      "Family tradition, incorporated 1976, more than 5,000 homes, multi-generational leadership, GTA homebuilder.",
    checkedOn: "2026-08-20",
  },
  {
    id: "brampton-heritage-heights",
    title: "City of Brampton — Heritage Heights",
    url: "https://www.brampton.ca/EN/Business/planning-development/projects-studies/Heritage-Heights",
    authority: "government",
    usedFor:
      "Northwest Brampton planned growth context (Heritage Heights Secondary Plan Areas 52 and 53). Not used to assign Cornerstone a civic address or confirm that Cornerstone sits inside Heritage Heights.",
    checkedOn: "2026-08-20",
  },
  {
    id: "creditview-sandalwood-park",
    title: "City of Brampton — Creditview Sandalwood Park",
    url: "https://www.brampton.ca/EN/residents/Recreation/Community-Centres/Pages/Creditview-Sandalwood-Park.aspx",
    authority: "government",
    usedFor: "Existing 100-acre park in Brampton, opened spring 2018.",
    checkedOn: "2026-08-20",
  },
  {
    id: "cassie-campbell",
    title: "City of Brampton — Cassie Campbell Community Centre",
    url: "https://www.brampton.ca/EN/residents/Recreation/Community-Centres/Pages/Cassie-Campbell.aspx",
    authority: "government",
    usedFor:
      "Existing northwest Brampton recreation centre at 1050 Sandalwood Parkway West.",
    checkedOn: "2026-08-20",
  },
  {
    id: "mount-pleasant-go",
    title: "GO Transit — Mount Pleasant GO",
    url: "https://www.gotransit.com/en/find-a-station-or-stop/00296/routes-departures",
    authority: "public-institution",
    usedFor:
      "Existing GO Transit station at 1600 Bovaird Drive West, Brampton, on the Kitchener line. Not used to state a driving time from Cornerstone.",
    checkedOn: "2026-08-20",
  },
  {
    id: "brampton-transit",
    title: "City of Brampton — Brampton Transit",
    url: "https://www.brampton.ca/EN/residents/transit/plan-your-trip/pages/service-changes.aspx",
    authority: "government",
    usedFor: "Existing municipal transit service in Brampton, including northwest-area routes.",
    checkedOn: "2026-08-20",
  },
  {
    id: "pdsb",
    title: "Peel District School Board",
    url: "https://peelschools.org/",
    authority: "public-institution",
    usedFor: "English public school board serving Brampton. Not used to assign a specific school to Cornerstone.",
    checkedOn: "2026-08-20",
  },
  {
    id: "dpcdsb",
    title: "Dufferin-Peel Catholic District School Board",
    url: "https://www.dpcdsb.org/",
    authority: "public-institution",
    usedFor: "English Catholic school board serving Brampton. Not used to assign a specific school to Cornerstone.",
    checkedOn: "2026-08-20",
  },
  {
    id: "osler",
    title: "William Osler Health System — Brampton Civic Hospital",
    url: "https://www.williamoslerhs.ca/for-professionals/school-of-medicine/",
    authority: "public-institution",
    usedFor: "Existing hospital campus at 2100 Bovaird Drive East, Brampton.",
    checkedOn: "2026-08-20",
  },
  {
    id: "tmu-medicine",
    title: "City of Brampton — TMU School of Medicine",
    url: "https://www.brampton.ca/EN/City-Hall/Relations/Pages/Health-Care.aspx",
    authority: "government",
    usedFor:
      "TMU School of Medicine opened 3 September 2025 at 150 Central Park Drive, Brampton. Peel Memorial hospital expansion is planned/under construction.",
    checkedOn: "2026-08-20",
  },
];

export const PRE_LAUNCH_FACT_CHECK = {
  checkedOn: "2026-08-20",
  items: [
    {
      question: "Is Cornerstone still scheduled for September 2026?",
      answer:
        "Yes on the official project page (“Coming September 2026”). Other Primont pages currently say “Coming Fall 2026.” September is used as the more specific first-party project-page value.",
    },
    {
      question: "Is “from the $600s” still current?",
      answer:
        "Yes. Official page: “Coming Soon from the $600's.” Homepage community card: “New Homes from the $600's.”",
    },
    {
      question: "Does Primont still describe the release as townhomes and detached homes?",
      answer: "Yes. Official page headline and product-type fields list Townhomes and Detached Homes.",
    },
    {
      question: "Is 3–5 bedroom positioning still current?",
      answer:
        "Yes on the Primont homepage: “3-5 Bedroom Townhomes & Detached Homes in Brampton Coming This Fall!”",
    },
    {
      question: "Has an official price list been released?",
      answer: "No public official price list was found on Primont’s Cornerstone page.",
    },
    {
      question: "Have official floor plans been released?",
      answer: "No. Primont currently invites registration to receive floor plans when available.",
    },
    {
      question: "Has a deposit schedule been published?",
      answer: "No official Cornerstone deposit schedule was found.",
    },
    {
      question: "Have incentives been published?",
      answer:
        "No current Cornerstone incentive list was published. Primont says registrants can learn about incentives as they are announced.",
    },
    {
      question: "Has a more precise official project address been published?",
      answer:
        "No civic address appears on the official Cornerstone page. Third-party sites citing 10629 or 10344 Mississauga Road were not used.",
    },
    {
      question: "Has the release status changed from coming soon to now selling?",
      answer: "No. Official materials still describe Cornerstone as coming soon / coming fall 2026.",
    },
  ],
} as const;
