import { useEffect, useState } from "react";
import { Section } from "@/components/clinic-layout";
import { useCopy } from "@/i18n/lang";
import { loadNotes, patchNote, type RoomId } from "@/lib/today-note";

type Room = RoomId;

export function FollowLessons({ room }: { room: Room }) {
  const f = useCopy()[room].follow;
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    const read = () => setDone(loadNotes()[room].follow ?? []);
    read();
    window.addEventListener("shenxin-note", read);
    return () => window.removeEventListener("shenxin-note", read);
  }, [room]);

  function toggle(index: number) {
    const prev = new Set(loadNotes()[room].follow ?? []);
    if (prev.has(index)) prev.delete(index);
    else prev.add(index);
    patchNote(room, { follow: [...prev].sort((a, b) => a - b) });
  }

  return (
    <Section id="follow" kicker={f.kicker} title={f.title}>
      <p className="text-muted">{f.lead}</p>
      <div className="mt-6 grid gap-4">
        {f.lessons.map((lesson, i) => {
          const on = done.includes(i);
          return (
            <article key={lesson.title} className="rounded-card border border-line bg-paper p-5">
              <p className="text-xs tracking-[0.18em] text-accent">
                {i + 1} / {f.lessons.length}
              </p>
              <h3 className="mt-1 font-serif text-2xl">{lesson.title}</h3>
              <p className="mt-2">{lesson.lead}</p>
              <p className="mt-4 text-xs tracking-[0.18em] text-accent">{f.stepsK}</p>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-muted">
                {lesson.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className="mt-4 text-xs tracking-[0.18em] text-accent">{f.ifNotK}</p>
              <p className="mt-1 text-sm">{lesson.ifNot}</p>
              <p className="mt-4 text-xs tracking-[0.18em] text-accent">{f.stopK}</p>
              <p className="mt-1 text-sm text-muted">{lesson.stop}</p>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i)}
                className={`mt-5 min-h-11 rounded-full px-5 py-2 text-sm ${
                  on ? "bg-bg-deep text-paper" : "border border-line text-ink"
                }`}
              >
                {f.done}
              </button>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
