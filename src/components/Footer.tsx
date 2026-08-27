import Link from "next/link";
import { DISCLOSURE, SITE } from "@/data/project";
import { getPublisher } from "@/data/publisher";
import { ContactLinks } from "@/components/ContactLinks";

export function Footer() {
  const publisher = getPublisher();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="font-serif text-2xl">{SITE.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-canvas-warm">
            Independent information about Cornerstone by Primont Homes in Northwest Brampton.
            Not affiliated with Primont Homes.
          </p>
          <p className="mt-5 text-sm">
            <strong className="font-semibold">Publisher:</strong> {publisher.legalName || publisher.name}
          </p>
          <p className="mt-1 text-sm">{publisher.address}</p>
          <ContactLinks email={publisher.email} phone={publisher.phone} />
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:underline" href="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/terms">
                Terms
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/accessibility">
                Accessibility
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/unsubscribe">
                Unsubscribe / preferences
              </Link>
            </li>
            <li>
              <a
                className="hover:underline"
                href="https://primont.com/low-rise/brampton/cornerstone"
                rel="noopener noreferrer"
                target="_blank"
              >
                Official Primont Cornerstone page
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-xs leading-6 text-canvas-warm">{DISCLOSURE.footer}</p>
          <p className="mt-4 text-xs text-canvas-warm/80">
            © {year} {publisher.name}. All rights reserved. Photo credits: Unsplash supporting
            photography; images are not Cornerstone renderings.
          </p>
        </div>
      </div>
    </footer>
  );
}
