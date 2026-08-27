const ITEMS = [
  "Model and floor plan",
  "Purchase price",
  "Lot premium",
  "Deposit schedule",
  "Closing adjustments",
  "Development charges",
  "HST treatment",
  "Parking and garage details",
  "Assignment terms",
  "Incentives",
  "Construction and closing timing",
  "Lawyer review provisions",
];

export function BuyerChecklist() {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            What to Verify Before Buying at Cornerstone
          </h2>
          <p className="mt-4 text-ink-muted">
            Pre-construction terms change. Confirm the latest details in the developer’s
            official documents. The Agreement of Purchase and Sale governs the transaction.
            This section is general buyer information, not legal, tax, mortgage or investment
            advice.
          </p>
        </div>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, index) => (
            <li key={item} className="rounded-2xl border border-line bg-paper px-5 py-4">
              <span className="text-xs font-semibold tracking-wide text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 font-medium text-ink">{item}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-ink-muted">
          Where a detail is not yet published, use “Request the latest verified update” or
          treat it as “Details to be announced by the developer.” Have a real-estate lawyer
          review any agreement before you sign.
        </p>
      </div>
    </section>
  );
}
