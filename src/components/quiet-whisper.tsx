import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useLang } from "@/i18n/lang";
import { todayInMacau } from "@/lib/almanac";
import { jieqiOf } from "@/lib/jieqi";
import {
  classicalFor,
  jieqiQuietFor,
  pickQuietAction,
  type QuietLang,
  type QuietRoom,
} from "@/lib/quiet-lines";

type Reveal =
  | { kind: "line"; text: string; action: string }
  | { kind: "classical"; quote: string; plain: string; source: string; action: string };

function pickNext(len: number, last: number) {
  if (len <= 1) return 0;
  let i = last;
  while (i === last) i = Math.floor(Math.random() * len);
  return i;
}

function roomFromPath(path: string): QuietRoom {
  if (path.startsWith("/jieyu")) return "jieyu";
  if (path.startsWith("/anshen")) return "anshen";
  if (path.startsWith("/anmei") || path.startsWith("/listen")) return "anmei";
  return "home";
}

export function QuietWhisper() {
  const lastLine = useRef(-1);
  const lastAction = useRef(-1);
  const lastClassical = useRef(-1);
  const orb = useRef<HTMLButtonElement>(null);
  const raf = useRef(0);
  const [card, setCard] = useState<Reveal | null>(null);
  const [still, setStill] = useState(false);
  const { lang, copy } = useLang();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const ui = copy.ui;
  const qlang = lang as QuietLang;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStill(reduce);
    if (reduce) return;

    const t0 = performance.now();
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const el = orb.current;
      if (el) {
        const size = 100;
        const pad = 16;
        const padTop = 64;
        const vw = Math.max(size + pad * 2, window.innerWidth);
        const vh = Math.max(size + pad + padTop, window.innerHeight);
        const nx =
          0.5 +
          0.38 * Math.sin(t / 13) +
          0.16 * Math.sin(t / 7.4) +
          0.08 * Math.sin(t / 19);
        const ny =
          0.5 +
          0.32 * Math.cos(t / 16.5) +
          0.18 * Math.cos(t / 9.1) +
          0.08 * Math.sin(t / 11);
        const x = Math.min(
          vw - size - pad,
          Math.max(pad, pad + nx * (vw - size - pad * 2)),
        );
        const y = Math.min(
          vh - size - pad,
          Math.max(padTop, padTop + ny * (vh - size - pad - padTop - 24)),
        );
        const ry = Math.sin(t / 5.2) * 22;
        const rx = Math.cos(t / 6.8) * 12;
        const z = Math.sin(t / 8.5) * 36;
        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  function linesForRoom(room: ReturnType<typeof roomFromPath>): readonly string[] {
    if (room === "jieyu") return copy.lines.jieyu;
    if (room === "anshen") return copy.lines.anshen;
    if (room === "anmei") return copy.lines.anmei;
    return [
      ...copy.lines.anshen.slice(0, 13),
      ...copy.lines.jieyu.slice(0, 13),
      ...copy.lines.anmei.slice(0, 12),
    ];
  }

  function reveal() {
    const room = roomFromPath(path);
    const actionPick = pickQuietAction(room, qlang, lastAction.current);
    lastAction.current = actionPick.index;
    const action = actionPick.text;
    const roll = Math.random();

    // ~15% classical quote that fits this room
    const quotes = classicalFor(room);
    if (roll < 0.15 && quotes.length > 0) {
      const i = pickNext(quotes.length, lastClassical.current);
      lastClassical.current = i;
      const c = quotes[i]!;
      setCard({ kind: "classical", quote: c.quote, plain: c.plain[qlang], source: c.source, action });
      return;
    }

    // ~12% current 節氣 line (bedtime-themed ones only in 安寐)
    if (roll < 0.27) {
      const { month, day } = todayInMacau();
      const { han } = jieqiOf(month, day, qlang);
      const jq = jieqiQuietFor(han, qlang, room);
      if (jq.length > 0) {
        setCard({ kind: "line", text: jq[Math.floor(Math.random() * jq.length)]!, action });
        return;
      }
    }

    const lines = linesForRoom(room);
    const i = pickNext(lines.length, lastLine.current);
    lastLine.current = i;
    setCard({ kind: "line", text: lines[i] ?? "", action });
  }

  const mark =
    lang === "en"
      ? `${ui.site} · tcmmacau.github.io`
      : `${ui.site} · tcmmacau.github.io`;

  return (
    <div className="quiet-orb-stage" aria-live="polite">
      <button
        ref={orb}
        type="button"
        onClick={reveal}
        className={still ? "quiet-orb is-still" : "quiet-orb"}
        aria-label={`${ui.now} · ${ui.tap}`}
      >
        <span className="quiet-circle">
          <span>{ui.now}</span>
          <span className="quiet-tap">{ui.tap}</span>
        </span>
      </button>
      {card && (
        <div className="quiet-card">
          {card.kind === "classical" ? (
            <>
              <p className="font-serif text-lg text-ink quiet-card-quote">「{card.quote}」</p>
              <p className="quiet-card-plain">{card.plain}</p>
              <p className="quiet-card-source">{card.source}</p>
            </>
          ) : (
            <p className="font-serif text-lg text-ink">{card.text}</p>
          )}
          <p className="quiet-card-action">{card.action}</p>
          <button
            type="button"
            className="mt-3 text-xs tracking-[0.18em] text-accent"
            onClick={() => setCard(null)}
          >
            {ui.close}
          </button>
          <p className="quiet-card-mark">{mark}</p>
        </div>
      )}
    </div>
  );
}
