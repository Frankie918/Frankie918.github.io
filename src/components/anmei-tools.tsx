import { useEffect, useMemo, useState } from "react";
import { GhostButton } from "@/components/clinic-layout";
import { todayInMacau } from "@/lib/almanac";
import { patchNote } from "@/lib/today-note";
import { useCopy } from "@/i18n/lang";

const LAT_KEYS = ["lt15", "m30", "h1", "gt1"] as const;
const WAKE_KEYS = ["none", "once", "twice", "more"] as const;
const OLD_LAT = ["少於十五分鐘", "約三十分鐘", "約一小時", "超過一小時"];
const OLD_WAKE = ["沒有", "一次", "兩次", "三次或以上"];

function migrate(v: string, old: string[], keys: readonly string[]) {
  const i = old.indexOf(v);
  if (i >= 0) return keys[i] ?? "";
  if (keys.includes(v)) return v;
  return v;
}

export function SleepQuiz() {
  const c = useCopy().anmei;
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const done = tags.length === 3;
  const winner = done
    ? [...tags].sort(
        (a, b) => tags.filter((t) => t === b).length - tags.filter((t) => t === a).length,
      )[0]
    : null;
  const result = winner ? c.quizRes[winner as keyof typeof c.quizRes] : null;
  const q = c.quizQs[step];

  if (result) {
    return (
      <div className="mt-4 rounded-card border border-line bg-paper p-5">
        <p className="text-xs tracking-[0.18em] text-accent">{c.quizNotDx}</p>
        <h3 className="mt-2 font-serif text-xl">{result.title}</h3>
        <p className="mt-3 text-muted">{result.body}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={result.href} className="text-sm text-accent">
            {c.quizSee}
          </a>
          <GhostButton
            onClick={() => {
              setStep(0);
              setTags([]);
            }}
          >
            {c.quizAgain}
          </GhostButton>
        </div>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="mt-4">
      <p className="text-xs tracking-[0.18em] text-accent">
        {String(step + 1).padStart(2, "0")} / 03
      </p>
      <h3 className="mt-2 font-serif text-xl">{q.q}</h3>
      <div className="mt-4 grid gap-2.5">
        {q.opts.map((o) => (
          <button
            key={o.tag + o.label}
            type="button"
            onClick={() => {
              setTags((t) => [...t, o.tag]);
              setStep((s) => s + 1);
            }}
            className="min-h-12 rounded-xl border border-line bg-paper px-4 py-3 text-left text-sm"
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MythFlip() {
  const c = useCopy().anmei;
  const [open, setOpen] = useState<boolean[]>(() => c.myths.map(() => false));
  return (
    <div className="mt-4 grid gap-2.5">
      {c.myths.map((m, i) => (
        <button
          key={i}
          type="button"
          onClick={() =>
            setOpen((prev) => {
              const next = [...prev];
              next[i] = !next[i];
              return next;
            })
          }
          className="rounded-xl border border-line bg-paper px-4 py-4 text-left"
        >
          <p className="text-xs tracking-[0.16em] text-accent">{open[i] ? c.actually : c.heard}</p>
          <p className="mt-2 text-sm">{open[i] ? m.back : m.front}</p>
          <p className="mt-2 text-xs text-muted">{open[i] ? c.unflip : c.flip}</p>
        </button>
      ))}
    </div>
  );
}

export function HygieneList() {
  const c = useCopy().anmei;
  const [on, setOn] = useState<boolean[]>(() => c.checks.map(() => false));
  const n = on.filter(Boolean).length;
  return (
    <div className="mt-4">
      <p className="text-sm text-muted">{c.doneN(n)}</p>
      <div className="mt-3 grid gap-2">
        {c.checks.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() =>
              setOn((prev) => {
                const next = [...prev];
                next[i] = !next[i];
                return next;
              })
            }
            className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm ${
              on[i] ? "border-warm bg-paper" : "border-line bg-paper"
            }`}
          >
            {on[i] ? "○　" : "＋　"}
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

type Night = {
  latency: string;
  wakes: string;
  energy: string;
};

function weekDates(dayShort: (m: number, d: number) => string) {
  const { key } = todayInMacau();
  const [y, m, d] = key.split("-").map(Number);
  const end = new Date(Date.UTC(y, m - 1, d));
  const days = [];
  for (let i = 6; i >= 0; i -= 1) {
    const dt = new Date(end);
    dt.setUTCDate(end.getUTCDate() - i);
    days.push({
      label: dayShort(dt.getUTCMonth() + 1, dt.getUTCDate()),
      id: dt.toISOString().slice(0, 10),
    });
  }
  return days;
}

export function SleepDiary() {
  const c = useCopy().anmei;
  const days = useMemo(() => weekDates(c.dayShort), [c.dayShort]);
  const storageKey = "anmei-diary-v1";
  const [nights, setNights] = useState<Record<string, Night>>({});
  const filled = days.filter((d) => nights[d.id]?.latency).length;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, Night>;
      const next: Record<string, Night> = {};
      for (const [id, row] of Object.entries(parsed)) {
        next[id] = {
          latency: migrate(row.latency ?? "", OLD_LAT, LAT_KEYS),
          wakes: migrate(row.wakes ?? "", OLD_WAKE, WAKE_KEYS),
          energy: row.energy ?? "",
        };
      }
      setNights(next);
    } catch {
      /* ignore */
    }
  }, []);

  function save(id: string, patch: Partial<Night>) {
    setNights((prev) => {
      const next = { ...prev, [id]: { ...{ latency: "", wakes: "", energy: "" }, ...prev[id], ...patch } };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      const n = Object.values(next).filter((r) => r.latency).length;
      patchNote("anmei", { diaryDays: n });
      return next;
    });
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-muted">{c.diaryLead}</p>
      <p className="mt-2 text-xs tracking-[0.16em] text-accent">{c.filled(filled)}</p>
      <div className="mt-4 grid gap-3">
        {days.map((d) => {
          const row = nights[d.id] ?? { latency: "", wakes: "", energy: "" };
          return (
            <div key={d.id} className="rounded-xl border border-line bg-paper p-4">
              <p className="font-serif">{d.label}</p>
              <label className="mt-2 block text-xs text-muted">
                {c.latency}
                <select
                  className="mt-1 w-full rounded-lg border border-line bg-bg px-2 py-2 text-sm text-ink"
                  value={row.latency}
                  onChange={(e) => save(d.id, { latency: e.target.value })}
                >
                  <option value="">{c.unset}</option>
                  {LAT_KEYS.map((k, i) => (
                    <option key={k} value={k}>
                      {c.latOpts[i]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="mt-2 block text-xs text-muted">
                {c.wakes}
                <select
                  className="mt-1 w-full rounded-lg border border-line bg-bg px-2 py-2 text-sm text-ink"
                  value={row.wakes}
                  onChange={(e) => save(d.id, { wakes: e.target.value })}
                >
                  <option value="">{c.unset}</option>
                  {WAKE_KEYS.map((k, i) => (
                    <option key={k} value={k}>
                      {c.wakeOpts[i]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="mt-2 block text-xs text-muted">
                {c.energy}
                <select
                  className="mt-1 w-full rounded-lg border border-line bg-bg px-2 py-2 text-sm text-ink"
                  value={row.energy}
                  onChange={(e) => save(d.id, { energy: e.target.value })}
                >
                  <option value="">{c.unset}</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
