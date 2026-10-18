import { createFileRoute, Link } from "@tanstack/react-router";
import { ViewCount } from "@/components/view-count";
import { useCopy } from "@/i18n/lang";

export const Route = createFileRoute("/listen")({ component: ListenPage });

const ROOMS = ["/anshen", "/jieyu", "/anmei", "/yali"] as const;

function ListenPage() {
  const copy = useCopy();
  const L = copy.listen;
  return (
    <main className="min-h-screen bg-bg px-6 py-16 text-ink">
      <div className="mx-auto max-w-xl">
        <Link to="/" className="text-xs tracking-[0.22em] text-accent no-underline">
          {copy.ui.back}
        </Link>
        <p className="mt-10 text-xs tracking-[0.28em] text-accent">{L.kicker}</p>
        <h1 className="mt-3 font-serif text-5xl">{L.title}</h1>
        <p className="mt-4 text-muted">{L.lede}</p>

        <p className="mt-10 text-[0.65rem] tracking-[0.22em] text-accent">{L.now}</p>
        <ol className="mt-4 space-y-4">
          {L.tracks.map((track, i) => (
            <li key={track.title} className="rounded-card border border-line bg-paper p-5">
              <Link to={ROOMS[i]} className="font-serif text-2xl text-ink no-underline">
                {track.title} →
              </Link>
              <p className="mt-1 text-sm text-muted">{track.hint}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-xs leading-relaxed text-muted">{L.credit}</p>
        <ViewCount page="listen" tone="light" />
      </div>
    </main>
  );
}
