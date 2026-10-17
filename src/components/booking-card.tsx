import { BOOKING_APP_STORE_URL, BOOKING_GOOGLE_PLAY_URL, BOOKING_URL } from "@/lib/booking";
import { useCopy } from "@/i18n/lang";

export function BookingCard() {
  const b = useCopy().ui.booking;
  return (
    <section id="booking" aria-label={b.nav} className="px-6 pb-20 md:px-12">
      <div className="rounded-card border border-line bg-paper p-7">
        <p className="text-xs tracking-[0.22em] text-accent">{b.kicker}</p>
        <h2 className="mt-2 font-serif text-2xl">{b.title}</h2>
        <p className="mt-4 text-ink">{b.have}</p>
        <p className="mt-3 text-muted">{b.none}</p>
        <p className="mt-3 text-muted">{b.login}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm text-paper no-underline"
          >
            {b.primary}
          </a>
          <a
            href={BOOKING_APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm text-ink no-underline"
          >
            {b.ios}
          </a>
          <a
            href={BOOKING_GOOGLE_PLAY_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm text-ink no-underline"
          >
            {b.android}
          </a>
        </div>
      </div>
    </section>
  );
}
