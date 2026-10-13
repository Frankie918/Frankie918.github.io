import { useEffect, useRef, useState } from "react";
import { useCopy } from "@/i18n/lang";

function pickNext(len: number, last: number) {
  if (len <= 1) return 0;
  let i = last;
  while (i === last) i = Math.floor(Math.random() * len);
  return i;
}

export function QuietWhisper({ lines }: { lines: readonly string[] }) {
  const last = useRef(-1);
  const orb = useRef<HTMLButtonElement>(null);
  const raf = useRef(0);
  const [text, setText] = useState<string | null>(null);
  const [still, setStill] = useState(false);
  const ui = useCopy().ui;

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

  function reveal() {
    const i = pickNext(lines.length, last.current);
    last.current = i;
    setText(lines[i] ?? null);
  }

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
      {text && (
        <div className="quiet-card">
          <p className="font-serif text-lg text-ink">{text}</p>
          <button type="button" className="mt-3 text-xs tracking-[0.18em] text-accent" onClick={() => setText(null)}>
            {ui.close}
          </button>
        </div>
      )}
    </div>
  );
}
