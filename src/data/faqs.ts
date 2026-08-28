import { PROJECT } from "@/data/project";

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQS: FaqItem[] = [
  {
    question: "What is Cornerstone in Brampton?",
    answer:
      "Cornerstone is an upcoming master-planned residential community by Primont Homes in Northwest Brampton, Ontario. Primont currently promotes a September 2026 release of townhomes and detached homes, with 3–5 bedroom options and prices coming soon from the $600s. The broader community vision includes future condominiums alongside townhomes and detached homes over time.",
  },
  {
    question: "Who is developing Cornerstone?",
    answer:
      "Primont Homes is developing Cornerstone. Primont is a family-run Greater Toronto Area homebuilder that, according to its official company website, has more than 50 years of history and has built more than 5,000 homes.",
  },
  {
    question: "Where is Cornerstone located?",
    answer:
      "Cornerstone is located in Northwest Brampton, Ontario, near the Mississauga Road corridor. Primont’s current official project page does not publish a precise civic address. An exact street number should be confirmed from Primont’s official materials when released.",
  },
  {
    question: "What types of homes are planned at Cornerstone?",
    answer:
      "Primont currently promotes townhomes and detached homes for the upcoming Cornerstone release. The broader master-plan vision described on Primont’s official project page also includes future condominiums, townhomes and detached homes. Future housing types should not be treated as currently available for purchase until Primont confirms a release.",
  },
  {
    question: "How many bedrooms will Cornerstone homes have?",
    answer:
      "Primont currently promotes Cornerstone as 3–5 bedroom townhomes and detached homes. Individual bedroom counts by model have not yet been officially confirmed and remain subject to the final release.",
  },
  {
    question: "How much will homes at Cornerstone cost?",
    answer:
      "Primont currently advertises Cornerstone as coming soon from the $600s. That is broad starting-price positioning, not an exact purchase price. Individual model prices, lot premiums, taxes, closing costs, incentives and availability have not yet been officially confirmed.",
  },
  {
    question: "When is Cornerstone launching?",
    answer:
      "Primont’s official Cornerstone project page currently states the community is coming September 2026. Other Primont marketing pages currently use the broader phrase “Coming Fall 2026,” which is consistent with September. Confirm any later change against Primont’s official project page.",
  },
  {
    question: "Are Cornerstone floor plans available?",
    answer:
      "Official Cornerstone floor plans have not yet been published. They have not been officially confirmed for public release. Register for updates and Primont can share floor plans when they become available.",
  },
  {
    question: "What is the Cornerstone deposit structure?",
    answer:
      "The Cornerstone deposit structure has not yet been officially confirmed. Deposit amounts, timing and related purchase terms will be set out in the developer’s official release documents and Agreement of Purchase and Sale.",
  },
  {
    question: "How can I receive Cornerstone pricing and release updates?",
    answer: `Submit the request form on this independent Cornerstone Brampton page with your name, email and phone. We share new verified pricing, floor plans and release information for ${PROJECT.name} when Primont publishes it. You can unsubscribe at any time.`,
  },
];
