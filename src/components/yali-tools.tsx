import { useEffect, useRef, useState } from "react";
import { GhostButton, SolidButton } from "@/components/clinic-layout";
import { patchNote } from "@/lib/today-note";
import { useCopy } from "@/i18n/lang";

/**
 * 鬆弦 room tools (2026-10 draft). Patterns follow 安神 (HeartScan / WorryPark / PmrGuide):
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

/* ---------------------------------------------------------------------------------------------
 * Quiet music — OFF by default. Nothing loads until the visitor presses play (no preload,
 * no autoplay, no resume across pages). One track at a time, looped; soft start volume with a
 * slow fade-in; a fixed "stop" pill stays on screen while anything plays; leaving the page stops it.
 * Sources and licences: docs/yali-music-licences.md (all tracks PD composition + CC BY 2.5 / CC0 recording).
 * ------------------------------------------------------------------------------------------- */

const MAX_VOLUME = 0.5; // slider 100% = half of the device volume
const DEFAULT_LEVEL = 40; // → 0.2 actual
const FADE_IN_MS = 3000;
const FADE_OUT_MS = 600;

function trackSrc(id: string) {
  return `${import.meta.env.BASE_URL}audio/yali/${id}.mp3`;
}

export function CalmMusic() {
  const c = useCopy().yali;
  const audio = useRef<HTMLAudioElement | null>(null);
  const fade = useRef<number | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const levelRef = useRef(level);
  levelRef.current = level;

  const target = () => (levelRef.current / 100) * MAX_VOLUME;

  function clearFade() {
    if (fade.current) window.clearInterval(fade.current);
    fade.current = null;
  }

  function ramp(el: HTMLAudioElement, to: number, ms: number, done?: () => void) {
    clearFade();
    const from = el.volume;
    const t0 = performance.now();
    fade.current = window.setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      el.volume = Math.max(0, Math.min(1, from + (to - from) * k));
      if (k >= 1) {
        clearFade();
        done?.();
      }
    }, 50);
  }

  function stop() {
    const el = audio.current;
    setPlaying(null);
    if (!el) return;
    ramp(el, 0, FADE_OUT_MS, () => {
      el.pause();
      el.currentTime = 0;
    });
  }

  function play(id: string) {
    if (playing === id) {
      stop();
      return;
    }
    const el = audio.current ?? new Audio();
    audio.current = el;
    clearFade();
    el.pause();
    el.loop = true;
    el.preload = "none";
    el.volume = 0;
    el.src = trackSrc(id);
    setPlaying(id);
    void el
      .play()
      .then(() => ramp(el, target(), FADE_IN_MS))
      .catch(() => setPlaying(null));
  }

  // Volume slider follows immediately while playing.
  useEffect(() => {
    const el = audio.current;
    if (el && playing && !fade.current) el.volume = target();
  }, [level, playing]);

  // Leaving the room always stops the music.
  useEffect(
    () => () => {
      clearFade();
      const el = audio.current;
      if (el) {
        el.pause();
        el.removeAttribute("src");
        el.load();
      }
      audio.current = null;
    },
    [],
  );

  const groups = [
    { key: "cn", label: c.musicCn },
    { key: "west", label: c.musicWest },
  ] as const;
  const now = c.tracks.find((t) => t.id === playing);

  return (
    <div className="mt-5">
      <p className="text-sm text-muted">{c.musicSafety}</p>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.key}>
            <p className="text-xs tracking-[0.18em] text-accent">{g.label}</p>
            <div className="mt-2 grid gap-2.5">
              {c.tracks
                .filter((t) => t.group === g.key)
                .map((t) => {
                  const on = playing === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => play(t.id)}
                      className="track-btn flex min-h-14 items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-left"
                    >
                      <span>
                        <span className="block font-serif">{t.title}</span>
                        <span className="mt-0.5 block text-xs text-muted">{t.hint}</span>
                      </span>
                      <span className="shrink-0 text-sm text-accent">{on ? `■ ${c.musicStop}` : `▶ ${c.musicPlay}`}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 rounded-card border border-line bg-paper p-4">
        <label className="flex items-center gap-3 text-sm text-ink" htmlFor="yali-vol">
          {c.musicVol}
          <input
            id="yali-vol"
            type="range"
            min={0}
            max={100}
            step={5}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-36 accent-[var(--color-accent)]"
          />
        </label>
        <GhostButton onClick={stop}>■ {c.musicStop}</GhostButton>
        <p className="text-sm text-muted" aria-live="polite">
          {now ? `${c.musicNow}${now.title}` : ""}
        </p>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">{c.musicCredits}</p>

      {playing && (
        <button
          type="button"
          onClick={stop}
          className="calm-stop inline-flex min-h-11 items-center rounded-full bg-bg-deep px-5 py-2 text-sm tracking-[0.12em] text-paper shadow-sm"
        >
          ■ {c.musicStop}
        </button>
      )}
    </div>
  );
}
