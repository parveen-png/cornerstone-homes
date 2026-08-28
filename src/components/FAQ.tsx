import { FAQS } from "@/data/faqs";

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 border-b border-line bg-paper">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">Frequently asked questions</h2>
        <p className="mt-3 text-ink-muted">
          Answers start with the current verified fact. Unavailable details are marked as not
          yet officially confirmed.
        </p>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {FAQS.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
                <span className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-medium">{item.question}</h3>
                  <span aria-hidden className="mt-1 text-gold group-open:hidden">
                    +
                  </span>
                  <span aria-hidden className="mt-1 hidden text-gold group-open:inline">
                    –
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-ink-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
