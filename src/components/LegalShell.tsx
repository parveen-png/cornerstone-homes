import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" className="pb-16">
        <article className="prose-page mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl text-ink">{title}</h1>
          <div className="mt-8 text-ink-muted">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
