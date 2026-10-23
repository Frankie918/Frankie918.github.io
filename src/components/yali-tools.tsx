import { FavHeading } from "@/components/fav-star";
import { useEffect, useRef, useState } from "react";
import { GhostButton, SolidButton } from "@/components/clinic-layout";
import { BodySilhouette } from "@/components/acu-figure";
import { browserBagStore, dealFromBag } from "@/lib/quiet-bag";
import { loadNotes, patchNote } from "@/lib/today-note";
import { useCopy } from "@/i18n/lang";

function recordPlay(label: string) {
  const prev = loadNotes().yali.play ?? [];
  if (!prev.includes(label)) patchNote("yali", { play: [...prev, label] });
}

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

/** Timed prompt sequence shared by the seated shoulder drop and the standing reset. */
function TimedLines({ lines, idle, stopped, doneText, startLabel, stopLabel, stepMs }: { lines: readonly string[]; idle: string; stopped: string; doneText?: string; startLabel: string; stopLabel: string; stepMs: number }) {
  const [i, setI] = useState(-1);
  const timer = useRef<number | null>(null);
  function clear() { if (timer.current) window.clearInterval(timer.current); timer.current = null; }
  function stop() { clear(); setI(-2); }
  function start() {
    clear(); setI(0); let n = 0;
    timer.current = window.setInterval(() => {
      n += 1;
      if (n >= lines.length - 1) { clear(); setI(lines.length - 1); return; }
      setI(n);
    }, stepMs);
  }
  useEffect(() => clear, []);
  const running = i >= 0 && i < lines.length - 1;
  const finished = i === lines.length - 1;
  const text = i === -1 ? idle : i === -2 ? stopped : finished && doneText ? `${lines[i]} ${doneText}` : lines[i];
  return (
    <div className="mt-5 rounded-card border border-line bg-paper p-5">
      <p className="min-h-16 font-serif text-xl" aria-live="polite">{text}</p>
      <div className="guide-dots mt-4 flex gap-1.5" aria-hidden>{lines.map((_, k) => (<span key={k} data-on={i >= k} />))}</div>
      {i >= 0 && (<p className="mt-2 text-xs text-muted">{i + 1} / {lines.length}</p>)}
      <div className="mt-4 flex flex-wrap gap-2">
        <SolidButton onClick={start}>{startLabel}</SolidButton>
        {running && <GhostButton onClick={stop}>{stopLabel}</GhostButton>}
      </div>
    </div>
  );
}

/** One-minute guided shoulder drop; one prompt every ~8 s. Canonical seated sequence. */
export function ShoulderDrop() {
  const c = useCopy().yali;
  return <TimedLines lines={c.shoulderLines} idle={c.shoulderIdle} stopped={c.shoulderStopped} startLabel={c.shoulderStart} stopLabel={c.shoulderStop} stepMs={8000} />;
}

/** 90-second standing reset: six prompts, ~15 s each. Standing counterpart to ShoulderDrop. */
export function StandReset() {
  const t = useCopy().yali.stand;
  return (
    <div id="stand">
      <FavHeading fav="yali#stand" label={t.title} className="font-serif text-xl">{t.title}</FavHeading>
      <p className="mt-2 text-sm text-muted">{t.lead}</p>
      <TimedLines lines={t.lines} idle={t.idle} stopped={t.stopped} doneText={t.done} startLabel={t.start} stopLabel={t.stop} stepMs={15000} />
    </div>
  );
}

type Parked = { id: number; what: string; step: string; done: boolean; cat: number | null };

/** Park a pressure, sort what you can control (do / wait / ask), then choose one ten-minute step only for the doable kind. Local state only. */
export function PressurePark() {
  const c = useCopy().yali;
  const t = c.control;
  const [what, setWhat] = useState("");
  const [step, setStep] = useState("");
  const [cat, setCat] = useState<number | null>(null);
  const [items, setItems] = useState<Parked[]>([]);
  const nextId = useRef(1);

  function add() {
    const w = what.trim();
    if (!w) return;
    setItems((prev) => [...prev, { id: nextId.current++, what: w, step: cat === 0 ? step.trim() : "", done: false, cat }]);
    setWhat(""); setStep(""); setCat(null);
  }

  return (
    <div className="mt-5">
      <h3 className="font-serif text-xl">{t.title}</h3>
      <p className="mt-2 text-sm text-muted">{t.lead}</p>
      <label className="mt-4 block text-sm text-ink" htmlFor="yali-what">{c.parkWhatL}</label>
      <textarea id="yali-what" value={what} onChange={(e) => setWhat(e.target.value)} placeholder={c.parkWhatPh} className="mt-1 min-h-20 w-full rounded-xl border border-line bg-paper p-3 text-ink outline-none" />
      <div className="mt-2"><GhostButton onClick={() => setWhat(t.sampleWhat)}>{t.sample}</GhostButton></div>
      <p className="mt-4 text-sm text-ink">{t.pick}</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {t.cats.map((box, i) => (
          <button key={box.label} type="button" aria-pressed={cat === i} onClick={() => setCat(i)} className={`min-h-12 rounded-xl border px-3 py-3 text-left text-sm ${cat === i ? "border-accent bg-paper" : "border-line bg-paper"}`}>
            <span className="block">{box.label}</span><span className="mt-1 block text-xs text-muted">{box.hint}</span>
          </button>
        ))}
      </div>
      {cat !== null && <p className="mt-3 text-sm text-accent" aria-live="polite">{t.replies[cat]}</p>}
      {cat === 0 && (<>
        <label className="mt-3 block text-sm text-ink" htmlFor="yali-step">{c.parkStepL}</label>
        <input id="yali-step" value={step} onChange={(e) => setStep(e.target.value)} placeholder={c.parkStepPh} className="mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-ink outline-none" />
      </>)}
      <div className="mt-3 flex flex-wrap gap-2">
        <SolidButton onClick={add}>{c.parkAdd}</SolidButton>
        {items.length > 0 && <GhostButton onClick={() => setItems([])}>{c.parkClear}</GhostButton>}
      </div>
      <p className="mt-2 text-xs text-muted">{c.parkPrivacy}</p>
      <div className="mt-5 rounded-card border border-line bg-paper p-5" aria-live="polite">
        <h3 className="font-serif text-lg">{c.parkListT}</h3>
        {items.length === 0 ? (<p className="mt-2 text-sm text-muted">{c.parkEmpty}</p>) : (
          <ul className="mt-3 grid gap-3">
            {items.map((item) => (
              <li key={item.id} className="rounded-xl border border-line bg-bg px-4 py-3">
                <p className="text-sm text-ink">{item.what}</p>
                {item.cat !== null && <p className="mt-1 text-xs tracking-[0.14em] text-accent">{t.cats[item.cat].label}</p>}
                <p className={`mt-1 text-sm ${item.done ? "text-accent line-through" : "text-muted"}`}>→ {item.step || c.parkNoStep}</p>
                {item.step && (
                  <button type="button" aria-pressed={item.done} onClick={() => setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, done: !x.done } : x)))} className={`mt-2 min-h-11 rounded-full px-4 py-2 text-sm ${item.done ? "bg-bg-deep text-paper" : "border border-line text-ink"}`}>{c.parkDone}</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


/** If this were a friend: tap-to-flip reframing cards (MythFlip pattern) + optional own line, local only. */
export function FriendFlip() {
  const t = useCopy().yali.friend;
  const [open, setOpen] = useState<boolean[]>(() => t.cards.map(() => false));
  const [own, setOwn] = useState("");
  return (
    <div id="friend">
      <FavHeading fav="yali#friend" label={t.title} className="font-serif text-xl">{t.title}</FavHeading>
      <p className="mt-2 text-sm text-muted">{t.lead}</p>
      <div className="mt-4 grid gap-2.5">
        {t.cards.map((m, i) => (
          <button key={i} type="button" onClick={() => setOpen((prev) => { const n = [...prev]; n[i] = !n[i]; return n; })} className="rounded-xl border border-line bg-paper px-4 py-4 text-left">
            <p className="text-xs tracking-[0.16em] text-accent">{open[i] ? t.actually : t.heard}</p>
            <p className="mt-2 text-sm">{open[i] ? m.back : m.front}</p>
            <p className="mt-2 text-xs text-muted">{open[i] ? t.unflip : t.flip}</p>
          </button>
        ))}
      </div>
      <label className="mt-4 block text-sm text-ink" htmlFor="yali-own">{t.ownL}</label>
      <textarea id="yali-own" value={own} onChange={(e) => setOwn(e.target.value)} placeholder={t.ownPh} className="mt-1 min-h-20 w-full rounded-xl border border-line bg-paper p-3 text-ink outline-none" />
      <p className="mt-2 text-xs text-muted">{t.ownHint}</p>
    </div>
  );
}

/** Draw one, do one: shuffle-bag micro-action cards, max 2 swaps, completion noted on today's card. */
export function MicroDraw() {
  const t = useCopy().yali.micro;
  const [idx, setIdx] = useState<number | null>(null);
  const [swaps, setSwaps] = useState(0);
  const [done, setDone] = useState(false);
  function draw() { setIdx(dealFromBag("yali-micro-bag", t.cards, browserBagStore())); setDone(false); }
  function redraw() { if (swaps >= 2) return; setSwaps((n) => n + 1); draw(); }
  return (
    <div id="micro">
      <FavHeading fav="yali#micro" label={t.title} className="font-serif text-xl">{t.title}</FavHeading>
      <p className="mt-2 text-sm text-muted">{t.lead}</p>
      <div className="mt-4 rounded-card border border-line bg-paper p-5" aria-live="polite">
        <p className="min-h-12 font-serif text-xl">{idx === null ? t.idle : t.cards[idx]}</p>
        {done && <p className="mt-2 text-sm text-accent">{t.done}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <SolidButton onClick={() => { setSwaps(0); draw(); }}>{t.draw}</SolidButton>
          {idx !== null && swaps < 2 && <GhostButton onClick={redraw}>{t.redraw}</GhostButton>}
          {idx !== null && !done && <GhostButton onClick={() => { setDone(true); recordPlay(t.title); }}>{t.doneBtn}</GhostButton>}
        </div>
        {idx !== null && <p className="mt-2 text-xs text-muted">{t.left} {2 - swaps} / 2</p>}
      </div>
    </div>
  );
}

/** Follow a slow light point for about a minute. Pauseable; reduced-motion steps instead of gliding. */
export function SlowTrace() {
  const t = useCopy().yali.trace;
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => { try { setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch { setReduced(false); } }, []);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setElapsed((e) => {
      const next = (e ?? 0) + 0.25;
      if (next >= 60) { setRunning(false); return 60; }
      return next;
    }), 250);
    return () => window.clearInterval(id);
  }, [running]);
  const total = 60;
  const done = elapsed !== null && elapsed >= total;
  const frac = elapsed === null ? 0 : Math.min(1, elapsed / total);
  const stepFrac = reduced ? Math.round(frac * 12) / 12 : frac;
  const cx = 8 + 84 * stepFrac;
  const cy = 30 + 14 * Math.sin(stepFrac * Math.PI * 2);
  return (
    <div id="trace">
      <FavHeading fav="yali#trace" label={t.title} className="font-serif text-xl">{t.title}</FavHeading>
      <p className="mt-2 text-sm text-muted">{t.lead}</p>
      <div className="mt-4 rounded-card border border-line bg-paper p-5">
        <svg viewBox="0 0 100 60" className="w-full" role="img" aria-label={t.title}>
          <path d="M8 30 C 30 8, 45 52, 62 30 S 85 18, 92 30" fill="none" stroke="var(--color-line)" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="4" fill="var(--color-accent)" opacity="0.85" />
        </svg>
        <p className="mt-2 min-h-6 text-sm text-muted" aria-live="polite">{elapsed === null ? t.idle : done ? t.done : reduced ? t.reduced : ""}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <SolidButton onClick={() => { setElapsed(0); setRunning(true); }}>{t.start}</SolidButton>
          {running && <GhostButton onClick={() => setRunning(false)}>{t.pause}</GhostButton>}
          {!running && elapsed !== null && !done && <GhostButton onClick={() => setRunning(true)}>{t.resume}</GhostButton>}
          {elapsed !== null && !done && <GhostButton onClick={() => { setRunning(false); setElapsed(null); }}>{t.stop}</GhostButton>}
        </div>
        {elapsed !== null && <p className="mt-2 text-xs text-muted">{Math.floor(elapsed)} / {total}</p>}
      </div>
    </div>
  );
}

/** Wash-and-hand-over: four-tap clocking-off checklist, the single do-along home for 收工交更. */
export function HandoverChecklist() {
  const t = useCopy().yali.handover;
  const [on, setOn] = useState<boolean[]>(() => t.items.map(() => false));
  const all = on.every(Boolean);
  useEffect(() => { if (all) recordPlay(t.title); }, [all, t.title]);
  return (
    <div id="handover">
      <FavHeading fav="yali#handover" label={t.title} className="font-serif text-xl">{t.title}</FavHeading>
      <p className="mt-2 text-sm text-muted">{t.lead}</p>
      <div className="mt-3 grid gap-2">
        {t.items.map((item, i) => (
          <button key={i} type="button" aria-pressed={on[i]} onClick={() => setOn((prev) => { const n = [...prev]; n[i] = !n[i]; return n; })} className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm ${on[i] ? "border-accent bg-paper" : "border-line bg-paper"}`}>{on[i] ? "○　" : "＋　"}{item}</button>
        ))}
      </div>
      {all && <p className="mt-3 text-sm text-accent" aria-live="polite">{t.done}</p>}
      {all && <div className="mt-3"><GhostButton onClick={() => setOn(t.items.map(() => false))}>{t.again}</GhostButton></div>}
    </div>
  );
}

const BODY_AREAS = [
  { left: "50%", top: "8%" }, { left: "38%", top: "19%" }, { left: "50%", top: "36%" }, { left: "50%", top: "52%" }, { left: "16%", top: "63%" },
] as const;

/** Where is it tightest: tap an area on the silhouette (no acupoint claims) -> 30 s guided release. */
export function TensionMap() {
  const t = useCopy().yali.bodymap;
  const [area, setArea] = useState<number | null>(null);
  const [left, setLeft] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setLeft((v) => {
      if (v === null || v <= 1) { setRunning(false); return 0; }
      return v - 1;
    }), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  const done = left === 0;
  return (
    <div id="bodymap">
      <FavHeading fav="yali#bodymap" label={t.title} className="font-serif text-xl">{t.title}</FavHeading>
      <p className="mt-2 text-sm text-muted">{t.lead}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="relative mx-auto h-72 w-44">
          <BodySilhouette />
          {BODY_AREAS.map((pos, i) => (
            <button key={i} type="button" className="point-dot" data-active={area === i} style={{ left: pos.left, top: pos.top }} aria-label={t.areas[i].label} onClick={() => { setArea(i); setLeft(null); setRunning(false); }} />
          ))}
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {t.areas.map((a, i) => (
              <button key={a.label} type="button" aria-pressed={area === i} onClick={() => { setArea(i); setLeft(null); setRunning(false); }} className={`min-h-11 rounded-full px-4 py-2 text-sm ${area === i ? "bg-accent text-paper" : "border border-line text-ink"}`}>{a.label}</button>
            ))}
          </div>
          <div className="mt-4 rounded-card border border-line bg-paper p-5" aria-live="polite">
            <p className="text-sm">{area === null ? t.pick : t.areas[area].action}</p>
            <p className="mt-2 text-xs text-muted">{t.stopNote}</p>
            {left !== null && <p className="mt-2 text-xs text-muted">{left} / 30</p>}
            {done && <p className="mt-2 text-sm text-accent">{t.done}</p>}
            {area !== null && (
              <div className="mt-3 flex flex-wrap gap-2">
                <SolidButton onClick={() => { setLeft(30); setRunning(true); }}>{t.start}</SolidButton>
                {running && <GhostButton onClick={() => setRunning(false)}>{t.pause}</GhostButton>}
                {left !== null && !done && <GhostButton onClick={() => { setRunning(false); setLeft(null); }}>{t.stop}</GhostButton>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Find three things: colour / shape / sound grounding hunt, three prompts at a time from the bag. */
export function ColourHunt() {
  const t = useCopy().yali.hunt;
  const [round, setRound] = useState<number[]>([]);
  const [found, setFound] = useState<boolean[]>([false, false, false]);
  function deal() {
    const store = browserBagStore();
    const picks: number[] = [];
    while (picks.length < 3) { const i = dealFromBag("yali-hunt-bag", t.prompts, store); if (i >= 0 && !picks.includes(i)) picks.push(i); }
    setRound(picks); setFound([false, false, false]);
  }
  const all = round.length === 3 && found.every(Boolean);
  useEffect(() => { if (all) recordPlay(t.title); }, [all, t.title]);
  return (
    <div id="colourhunt">
      <FavHeading fav="yali#colourhunt" label={t.title} className="font-serif text-xl">{t.title}</FavHeading>
      <p className="mt-2 text-sm text-muted">{t.lead}</p>
      {round.length === 0 ? (
        <div className="mt-3"><SolidButton onClick={deal}>{t.start}</SolidButton></div>
      ) : (
        <div className="mt-3 grid gap-2">
          {round.map((pi, i) => (
            <button key={pi} type="button" aria-pressed={found[i]} onClick={() => setFound((prev) => { const n = [...prev]; n[i] = !n[i]; return n; })} className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm ${found[i] ? "border-accent bg-paper" : "border-line bg-paper"}`}>{found[i] ? "○　" : "＋　"}{t.prompts[pi]} — {t.found}</button>
          ))}
          {all && <p className="text-sm text-accent" aria-live="polite">{t.done}</p>}
          <div><GhostButton onClick={deal}>{t.again}</GhostButton></div>
        </div>
      )}
    </div>
  );
}

/* Quiet music for this room lives in the shared four-room player:
 * src/components/room-music.tsx + src/lib/room-music.ts (Chinese by default on entry; 中樂／西樂 choice). */
