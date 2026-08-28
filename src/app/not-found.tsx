import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-3xl px-4 py-24">
        <h1 className="font-serif text-4xl">Page not found</h1>
        <p className="mt-4 text-ink-muted">
          That page does not exist. Return to the Cornerstone Brampton overview for verified
          project facts and updates.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center rounded-md bg-forest px-5 font-semibold text-paper"
        >
          Back to Cornerstone Brampton
        </Link>
      </main>
      <Footer />
    </>
  );
}
