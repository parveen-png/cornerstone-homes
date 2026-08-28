import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThankYouTracker } from "@/components/ThankYouTracker";
import { CTA, PROJECT } from "@/data/project";

export const metadata: Metadata = {
  title: "Thank you",
  description: `Thank you for requesting ${PROJECT.name} pricing and floor-plan updates.`,
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <>
      <ThankYouTracker />
      <Header />
      <main id="main" className="border-b border-line bg-paper">
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Request received</p>
          <h1 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">Thank you</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-ink">
            You’re on the list for Cornerstone by Primont in Northwest Brampton. We’ll email verified
            pricing, floor plans and release updates when Primont publishes them. This is not a home
            reservation and not a price list.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink-muted">
            Official project information remains on Primont’s Cornerstone page. You can unsubscribe
            from our emails at any time.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center rounded-md bg-forest px-5 font-semibold text-paper hover:bg-forest-hover"
            >
              Back to Cornerstone Brampton
            </Link>
            <a
              href={PROJECT.officialProjectUrl}
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex min-h-12 items-center rounded-md border border-line px-5 font-semibold text-ink hover:bg-canvas"
            >
              Official Primont page
            </a>
          </div>
          <p className="mt-8 text-sm text-ink-muted">{CTA.supporting}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
