import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { DISCLOSURE, PROJECT, SITE } from "@/data/project";
import { getPublisher } from "@/data/publisher";
import { AnalyticsLoader } from "@/components/AnalyticsLoader";
import { absoluteUrl } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const publisher = getPublisher();
const publisherName = publisher.displayName || SITE.name;

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: SITE.defaultTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: publisherName }],
  creator: publisherName,
  publisher: publisherName,
  keywords: [
    "Cornerstone Brampton",
    "Cornerstone Primont Homes",
    "Northwest Brampton new homes",
    "Primont townhomes Brampton",
    "Brampton detached homes",
    "Cornerstone from the $600s",
    "September 2026",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: absoluteUrl("/"),
    siteName: SITE.name,
    title: SITE.defaultTitle,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "real estate",
  other: {
    "geo.region": "CA-ON",
    "geo.placename": `${PROJECT.region}, ${PROJECT.province}`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${poppins.variable} h-full scroll-smooth antialiased`}
    >
      <AnalyticsLoader />
      <body className={`${poppins.className} min-h-full bg-canvas font-sans text-ink`}>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
        <p className="sr-only">{DISCLOSURE.short}</p>
      </body>
    </html>
  );
}
