import { useEffect, useRef, useState } from "react";
import { GhostButton, SolidButton } from "@/components/clinic-layout";
import { patchNote } from "@/lib/today-note";
import { useCopy } from "@/i18n/lang";

/**
 * 舒壓 room tools (2026-10 draft). Patterns follow 安神 (HeartScan / WorryPark / PmrGuide):
 * same buttons, cards and spacing; nothing is scored; nothing typed is stored or uploaded.
 */

const FEEL_KEYS = ["tense", "tired", "neck", "heart", "stomach", "head", "sleep"] as const;
type FeelKey = (typeof FEEL_KEYS)[number];

/** Pick the body signals you notice → everyday tips + when to see a doctor. Not a test. */
export function BodySignals() {
  const c = useCopy().yali;
  const [picked, setPicked] = useState<FeelKey[]>([]);

  function toggle(key: FeelKey) {
    setPicked((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
      patchNote("yali", { scan: next.map((k) => c.feel[k].label) });
      return next;
    });
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-muted">{c.feelPick}</p>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {FEEL_KEYS.map((key) => {
          const on = picked.includes(key);
          return (
            <button
              key={key}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(key)}
              className={`flex min-h-12 items-center justify-between rounded-xl border px-4 py-3 text-left text-sm ${
                on ? "border-accent bg-paper" : "border-line bg-paper"
              }`}
            >
              <span>{c.feel[key].label}</span>
              <span className="ml-3 text-accent" aria-hidden>
                {on ? "○" : "＋"}
              </span>
            </button>
          );
        })}
      </div>
      {picked.length > 0 && (
        <div className="mt-4 grid gap-3" aria-live="polite">
          {FEEL_KEYS.filter((k) => picked.includes(k)).map((key) => (
            <article key={key} className="rounded-card border border-line bg-paper p-5">
              <h3 className="font-serif text-lg">{c.feel[key].label}</h3>
              <p className="mt-3 text-xs tracking-[0.18em] text-accent">{c.feelTry}</p>
              <p className="mt-1 text-sm">{c.feel[key].try}</p>
              <p className="mt-3 text-xs tracking-[0.18em] text-accent">{c.feelSeek}</p>
              <p className="mt-1 text-sm text-muted">{c.feel[key].seek}</p>
            </article>
          ))}
          <p className="text-xs text-muted">{c.feelFoot}</p>
        </div>
      )}
    </div>
  );
}

const STEP_MS = 8000;

/** One-minute guided shoulder drop / mini body scan; one prompt every ~8 s. */
export function ShoulderDrop() {
  const c = useCopy().yali;
  const lines = c.shoulderLines;
  // -1 idle · -2 stopped · 0..n-1 current prompt
  const [i, setI] = useState(-1);
  const timer = useRef<number | null>(null);

  function clear() {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
  }

  function stop() {
    clear();
    setI(-2);
  }

  function start() {
    clear();
    setI(0);
    let n = 0;
    timer.current = window.setInterval(() => {
      n += 1;
      if (n >= lines.length - 1) {
        clear();
        setI(lines.length - 1);
        return;
      }
      setI(n);
    }, STEP_MS);
  }

  useEffect(() => clear, []);

  const running = i >= 0 && i < lines.length - 1 && timer.current !== null;
  const text = i === -1 ? c.shoulderIdle : i === -2 ? c.shoulderStopped : lines[i];

  return (
    <div className="mt-5 rounded-card border border-line bg-paper p-5">
      <p className="min-h-16 font-serif text-xl" aria-live="polite">
        {text}
      </p>
      <div className="guide-dots mt-4 flex gap-1.5" aria-hidden>
        {lines.map((_, k) => (
          <span key={k} data-on={i >= k} />
        ))}
      </div>
      {i >= 0 && (
        <p className="mt-2 text-xs text-muted">
          {i + 1} / {lines.length}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <SolidButton onClick={start}>{c.shoulderStart}</SolidButton>
        {running && <GhostButton onClick={stop}>{c.shoulderStop}</GhostButton>}
      </div>
    </div>
  );
}

type Parked = { id: number; what: string; step: string; done: boolean };

/** Park a pressure + choose one ten-minute step. Lives in component state only (not saved). */
export function PressurePark() {
  const c = useCopy().yali;
  const [what, setWhat] = useState("");
  const [step, setStep] = useState("");
  const [items, setItems] = useState<Parked[]>([]);
  const nextId = useRef(1);

  function add() {
    const w = what.trim();
    if (!w) return;
    setItems((prev) => [...prev, { id: nextId.current++, what: w, step: step.trim(), done: false }]);
    setWhat("");
    setStep("");
  }

  return (
    <div className="mt-5">
      <label className="block text-sm text-ink" htmlFor="yali-what">
        {c.parkWhatL}
      </label>
      <textarea
        id="yali-what"
        value={what}
        onChange={(e) => setWhat(e.target.value)}
        placeholder={c.parkWhatPh}
        className="mt-1 min-h-20 w-full rounded-xl border border-line bg-paper p-3 text-ink outline-none"
      />
      <label className="mt-3 block text-sm text-ink" htmlFor="yali-step">
        {c.parkStepL}
      </label>
      <input
        id="yali-step"
        value={step}
        onChange={(e) => setStep(e.target.value)}
        placeholder={c.parkStepPh}
        className="mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-ink outline-none"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <SolidButton onClick={add}>{c.parkAdd}</SolidButton>
        {items.length > 0 && <GhostButton onClick={() => setItems([])}>{c.parkClear}</GhostButton>}
      </div>
      <p className="mt-2 text-xs text-muted">{c.parkPrivacy}</p>

      <div className="mt-5 rounded-card border border-line bg-paper p-5" aria-live="polite">
        <h3 className="font-serif text-lg">{c.parkListT}</h3>
        {items.length === 0 ? (
          <p className="mt-2 text-sm text-muted">{c.parkEmpty}</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {items.map((item) => (
              <li key={item.id} className="rounded-xl border border-line bg-bg px-4 py-3">
                <p className="text-sm text-ink">{item.what}</p>
                <p className={`mt-1 text-sm ${item.done ? "text-accent line-through" : "text-muted"}`}>
                  → {item.step || c.parkNoStep}
                </p>
                {item.step && (
                  <button
                    type="button"
                    aria-pressed={item.done}
                    onClick={() =>
                      setItems((prev) => prev.map((p) => (p.id === item.id ? { ...p, done: !p.done } : p)))
                    }
                    className={`mt-2 min-h-11 rounded-full px-4 py-2 text-sm ${
                      item.done ? "bg-bg-deep text-paper" : "border border-line text-ink"
                    }`}
                  >
                    {c.parkDone}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* Quiet music for this room lives in the shared four-room player:
 * src/components/room-music.tsx + src/lib/room-music.ts (off by default; 中樂／西樂 choice). */
