import { createFileRoute, Link } from "@tanstack/react-router";
import { useCopy, useLang } from "@/i18n/lang";
import { FAQ_COPY } from "@/lib/faq";

export const Route = createFileRoute("/faq")({ component: FaqPage });

function FaqPage() {
  const copy = useCopy();
  const { lang } = useLang();
  const F = FAQ_COPY[lang === "yue" ? "yue" : "cmn"];
  return (
    <main className="min-h-screen bg-bg px-6 py-16 text-ink">
      <div className="mx-auto max-w-xl">
        <Link to="/" className="text-xs tracking-[0.22em] text-accent no-underline">
          {copy.ui.back}
        </Link>
        <p className="mt-10 text-xs tracking-[0.28em] text-accent">{F.kicker}</p>
        <h1 className="mt-3 font-serif text-5xl">{F.title}</h1>
        <p className="mt-4 text-muted">{F.lede}</p>
        <dl className="mt-10 space-y-4">
          {F.items.map((it) => (
            <div key={it.q} className="rounded-card border border-line bg-paper p-5">
              <dt className="font-serif text-xl">{it.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{it.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
