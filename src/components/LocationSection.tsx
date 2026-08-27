import Image from "next/image";
import { SOURCES } from "@/data/sources";

const CATEGORIES = [
  {
    title: "Getting around",
    status: "Existing",
    body: "Northwest Brampton is served by Brampton Transit, including routes that connect the Mississauga Road and Mount Pleasant areas. Mount Pleasant GO Station, at 1600 Bovaird Drive West, is an existing GO Transit stop on the Kitchener line. Highway 407 ETR and Highway 410 form part of Brampton’s wider road network. Travel times from Cornerstone are not stated here because a precise civic address has not been officially confirmed.",
  },
  {
    title: "Parks and recreation",
    status: "Existing",
    body: "Creditview Sandalwood Park is an existing City of Brampton park of about 100 acres, opened in spring 2018, with trails, sports fields and an accessible activity hub. Cassie Campbell Community Centre, at 1050 Sandalwood Parkway West, is an existing municipal recreation facility with ice rinks, pools, a fitness centre and outdoor sport amenities.",
  },
  {
    title: "Schools",
    status: "Existing boards / assignment TBA",
    body: "Brampton is served by the Peel District School Board and the Dufferin-Peel Catholic District School Board. French-language boards also operate in the region. School assignments depend on the final address, catchment reviews and board decisions. Specific Cornerstone school designations have not been officially confirmed.",
  },
  {
    title: "Healthcare",
    status: "Existing and planned",
    body: "William Osler Health System operates Brampton Civic Hospital at 2100 Bovaird Drive East. The Toronto Metropolitan University School of Medicine opened on 3 September 2025 at 150 Central Park Drive in Brampton. A new Peel Memorial Hospital is a planned/under-construction expansion of local hospital capacity, not a currently completed replacement campus.",
  },
  {
    title: "Shopping and employment",
    status: "Existing corridors",
    body: "Northwest Brampton includes established retail around Mount Pleasant Village and along major arterials such as Bovaird Drive, Mississauga Road and Sandalwood Parkway. Broader employment areas in Brampton and neighbouring Mississauga sit along the 407 and airport-area corridors. Exact walking or driving times from Cornerstone are not published here.",
  },
  {
    title: "Planned growth nearby",
    status: "Planned / proposed",
    body: "The City of Brampton’s Heritage Heights Secondary Plan covers last remaining large undeveloped lands in northwest Brampton, stretching from Mayfield Road to the Credit River valley and from Winston Churchill Boulevard to Mississauga Road. That plan is a municipal growth framework. This page does not claim that Cornerstone is located inside Heritage Heights unless Primont or a planning document confirms it.",
  },
];

export function LocationSection() {
  return (
    <section id="location" className="scroll-mt-24 border-b border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="font-serif text-3xl text-ink sm:text-4xl">Northwest Brampton Living</h2>
            <p className="mt-4 text-ink-muted">
              Cornerstone is in Northwest Brampton, Ontario, near the Mississauga Road
              corridor. Primont’s official project page does not currently publish a civic
              address, so this section describes the surrounding city context rather than
              claiming a precise intersection.
            </p>
            <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/supporting-park.jpg"
                alt="Sunlit forest landscape used as supporting location photography. Not a Cornerstone amenity photo."
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid gap-4">
            {CATEGORIES.map((item) => (
              <article key={item.title} className="rounded-2xl border border-line bg-paper p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-xl">{item.title}</h3>
                  <p className="text-xs font-semibold tracking-wide text-gold uppercase">{item.status}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
        <p className="mt-8 text-sm text-ink-muted">
          Public sources used for this section include the City of Brampton, GO Transit / Metrolinx,
          Peel District School Board, Dufferin-Peel Catholic District School Board, and William Osler
          Health System. See{" "}
          {SOURCES.filter((source) => source.authority !== "third-party-discovery")
            .slice(4, 8)
            .map((source) => source.title)
            .join("; ")}
          .
        </p>
      </div>
    </section>
  );
}
