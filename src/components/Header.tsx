"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CTA, SITE } from "@/data/project";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

const NAV = [
  { href: "/#overview", label: "Overview" },
  { href: "/#homes", label: "Homes" },
  { href: "/#location", label: "Location" },
  { href: "/#developer", label: "Developer" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center bg-white py-1">
          <Image
            src="/images/logo.png"
            alt={SITE.name}
            width={184}
            height={95}
            priority
            className="h-12 w-auto bg-white sm:h-[3.35rem]"
          />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#register"
            className="inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-sm font-semibold text-paper transition-colors hover:bg-forest-hover"
            onClick={() => trackEvent(ANALYTICS_EVENTS.heroCtaClick, { location: "header" })}
          >
            {CTA.primaryShort}
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/#register"
            className="inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-sm font-semibold text-paper"
            onClick={() => trackEvent(ANALYTICS_EVENTS.heroCtaClick, { location: "header-mobile" })}
          >
            {CTA.primaryShort}
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-white"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className="block h-px w-4 bg-ink" />
              <span className="block h-px w-4 bg-ink" />
              <span className="block h-px w-4 bg-ink" />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-white px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block min-h-11 py-2 text-base"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
