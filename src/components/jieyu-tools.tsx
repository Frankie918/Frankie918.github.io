import { useEffect, useState } from "react";
import { GhostButton } from "@/components/clinic-layout";
import { todayInMacau } from "@/lib/almanac";
import { patchNote } from "@/lib/today-note";
import { useCopy } from "@/i18n/lang";

const WEATHER_KEYS = ["fog", "cloud", "thunder", "rain", "dry", "clear"] as const;
type WeatherKey = (typeof WEATHER_KEYS)[number];
type BaKind = "enjoy" | "master" | "close" | "body";

export function WoodSteps() {
  const c = useCopy().jieyu;
  const storageKey = `jieyu-bloom-${todayInMacau().key}`;
  const [done, setDone] = useState<boolean[]>([false, false, false, false, false]);
  const n = done.filter(Boolean).length;
  const open = n === 5;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as boolean[];
      if (Array.isArray(parsed) && parsed.length === 5) setDone(parsed);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  function toggle(i: number) {
    setDone((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      patchNote("jieyu", { bloom: next.filter(Boolean).length });
      return next;
    });
  }

  return (
    <div className="mt-5 rounded-card border border-line bg-paper p-5">
      <div className="bloom" data-open={open}>
        {done.map((on, i) => (
          <div key={i} className="bloom-arm" style={{ transform: `rotate(${i * 72}deg)` }}>
            <div className="bloom-petal" data-on={on} />
          </div>
        ))}
        <div className="bloom-heart" />
      </div>
      <p className="mb-4 text-center font-serif text-lg">{c.bloom[n]}</p>
      <div className="grid gap-2.5">
        {c.acts.map((act, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={`flex min-h-12 items-center justify-between rounded-xl border px-4 py-3 text-left text-sm ${
              done[i] ? "border-warm bg-bg" : "border-line bg-bg"
            }`}
          >
            <span>{act}</span>
            <span className="ml-3">{done[i] ? "○" : "＋"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function WeatherPick() {
  const c = useCopy().jieyu;
  const [key, setKey] = useState<WeatherKey | null>(null);
  const item = key ? c.weather[key] : null;

  return (
    <div>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {WEATHER_KEYS.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              setKey(k);
              patchNote("jieyu", { weather: c.weather[k].label });
            }}
            className={`min-h-14 rounded-xl border bg-paper px-3 py-3 text-sm ${
              key === k ? "border-warm outline outline-2 outline-warm" : "border-line"
            }`}
          >
            {c.weather[k].label}
          </button>
        ))}
      </div>
      {item && (
        <div className="mt-4 rounded-card border border-line bg-paper p-5">
          <h3 className="font-serif text-lg">{item.label}</h3>
          <p className="mt-2 text-sm text-muted">{item.note}</p>
        </div>
      )}
    </div>
  );
}

export function BaPlanner() {
  const c = useCopy().jieyu;
  const [kind, setKind] = useState<BaKind>("enjoy");
  const [plan, setPlan] = useState("");
  const [log, setLog] = useState("");
  const [pleasure, setPleasure] = useState("3");
  const [mastery, setMastery] = useState("3");

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {c.baKinds.map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k as BaKind)}
            className={`min-h-14 rounded-xl border bg-paper px-3 py-3 text-sm ${
              kind === k ? "border-warm outline outline-2 outline-warm" : "border-line"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <textarea
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
        placeholder={c.hints[kind]}
        className="mt-3 min-h-20 w-full rounded-xl border border-line bg-paper p-3 text-ink outline-none"
      />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="text-sm text-muted">
          {c.pleasure}
          <input
            className="ml-2 w-14 rounded-lg border border-line bg-paper px-2 py-1 tabular-nums"
            inputMode="numeric"
            value={pleasure}
            onChange={(e) => setPleasure(e.target.value)}
          />
        </label>
        <label className="text-sm text-muted">
          {c.mastery}
          <input
            className="ml-2 w-14 rounded-lg border border-line bg-paper px-2 py-1 tabular-nums"
            inputMode="numeric"
            value={mastery}
            onChange={(e) => setMastery(e.target.value)}
          />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <GhostButton
          onClick={() => {
            const t = plan.trim() || c.hints[kind];
            setLog(c.baSaved(t));
          }}
        >
          {c.baSave}
        </GhostButton>
        <GhostButton onClick={() => setLog(c.baScored(pleasure, mastery))}>
          {c.baScore}
        </GhostButton>
      </div>
      {log && (
        <div className="mt-4 rounded-card border border-line bg-paper p-5 text-sm">{log}</div>
      )}
    </div>
  );
}
