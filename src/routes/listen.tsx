import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ViewCount } from "@/components/view-count";
import { useCopy } from "@/i18n/lang";

export const Route = createFileRoute("/listen")({ component: ListenPage });

const FILES = [
  "/audio/calm.mp3",
  "/audio/pingsha.mp3",
  "/audio/yangguan.mp3",
  "/audio/listen/qiufeng.mp3",
  "/audio/zuiyu.mp3",
];

function ListenPage() {
  const copy = useCopy();
  const L = copy.listen;
  const players = useRef<(HTMLAudioElement | null)[]>([]);

  function onPlay(i: number) {
    players.current.forEach((el, j) => {
      if (el && j !== i) {
        el.pause();
        el.currentTime = 0;
      }
    });
  }

  return (
    <main className="min-h-screen bg-bg px-6 py-16 text-ink">
      <div className="mx-auto max-w-xl">
        <Link to="/" className="text-xs tracking-[0.22em] text-accent no-underline">
          {copy.ui.back}
        </Link>
        <p className="mt-10 text-xs tracking-[0.28em] text-accent">{L.kicker}</p>
        <h1 className="mt-3 font-serif text-5xl">{L.title}</h1>
        <p className="mt-4 text-muted">{L.lede}</p>

        <ol className="mt-10 space-y-4">
          {L.tracks.map((track, i) => (
            <li key={track.title} className="rounded-card border border-line bg-paper p-5">
              {i === 0 && (
                <p className="mb-2 text-[0.65rem] tracking-[0.22em] text-accent">{L.now}</p>
              )}
              <h2 className="font-serif text-2xl">{track.title}</h2>
              <p className="mt-1 text-sm text-muted">{track.hint}</p>
              <audio
                ref={(el) => {
                  players.current[i] = el;
                }}
                className="mt-4 w-full"
                controls
                preload="none"
                src={FILES[i]}
                onPlay={() => onPlay(i)}
              />
            </li>
          ))}
        </ol>

        <p className="mt-8 text-xs leading-relaxed text-muted">{L.credit}</p>
        <ViewCount page="listen" tone="light" />
      </div>
    </main>
  );
}
