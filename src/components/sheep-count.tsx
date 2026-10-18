import { useEffect, useRef, useState } from "react";
import { GhostButton, SolidButton } from "@/components/clinic-layout";
import { useCopy } from "@/i18n/lang";

const CYCLE_MS = 3600;
const CROSS_AT = 0.5;

/** Small, closed-eye sheep drawn as soft flat shapes — deliberately simple, not detailed. */
function SheepFigure() {
  return (
    <svg viewBox="0 0 96 72" className="block h-auto w-full" aria-hidden="true" focusable="false">
      {/* legs */}
      <g stroke="#d9d0ba" strokeWidth="3" strokeLinecap="round">
        <line x1="32" y1="48" x2="30" y2="64" />
        <line x1="62" y1="48" x2="64" y2="64" />
      </g>
      {/* wool: overlapping soft cream puffs */}
      <g fill="#f3eee4" stroke="#c9bb9c" strokeWidth="1.4">
        <circle cx="30" cy="30" r="13" />
        <circle cx="46" cy="24" r="15" />
        <circle cx="62" cy="30" r="13" />
        <circle cx="38" cy="38" r="13" />
        <circle cx="56" cy="38" r="13" />
      </g>
      <ellipse cx="47" cy="36" rx="25" ry="15" fill="#f3eee4" stroke="#c9bb9c" strokeWidth="1.4" />
      {/* head, resting at the front */}
      <ellipse cx="76" cy="34" rx="10" ry="8" fill="#5c7185" stroke="#f3eee4" strokeWidth="1.2" />
      <ellipse cx="70" cy="28" rx="5" ry="3" fill="#5c7185" transform="rotate(-24 70 28)" />
      {/* closed eye */}
      <path d="M73 34 q3 2 6 0" fill="none" stroke="#f3eee4" strokeWidth="1.6" strokeLinecap="round" />
      {/* tiny tail */}
      <circle cx="20" cy="34" r="5" fill="#f3eee4" stroke="#c9bb9c" strokeWidth="1.2" />
    </svg>
  );
}

/** Static night backdrop: indigo sky, moon, low celadon hills and a low fence at centre. */
function NightScene() {
  return (
    <svg
      viewBox="0 0 640 260"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="640" height="260" fill="#1a2834" />
      <g fill="#f3eee4" stroke="#c9bb9c" strokeWidth="1.4">
        <circle cx="70" cy="42" r="1.8" opacity="0.7" />
        <circle cx="150" cy="70" r="1.3" opacity="0.45" />
        <circle cx="250" cy="34" r="1.6" opacity="0.6" />
        <circle cx="360" cy="58" r="1.2" opacity="0.4" />
        <circle cx="470" cy="30" r="1.7" opacity="0.65" />
        <circle cx="560" cy="66" r="1.3" opacity="0.45" />
        <circle cx="610" cy="110" r="1.2" opacity="0.35" />
        <circle cx="40" cy="108" r="1.2" opacity="0.35" />
      </g>
      {/* crescent moon */}
      <path d="M566 34 a26 26 0 1 0 18 44 a20 20 0 1 1 -18 -44" fill="#f3eee4" opacity="0.9" />
      {/* hills */}
      <path d="M0 196 Q160 168 330 190 T640 184 V260 H0 Z" fill="#3f6b5c" opacity="0.55" />
      <path d="M0 220 Q200 198 420 216 T640 210 V260 H0 Z" fill="#3f6b5c" opacity="0.8" />
      {/* low fence the sheep hops, slightly right of centre */}
      <g stroke="#f3eee4" strokeWidth="5" strokeLinecap="round" opacity="0.85">
        <line x1="292" y1="176" x2="292" y2="224" />
        <line x1="352" y1="176" x2="352" y2="224" />
        <line x1="278" y1="190" x2="366" y2="190" />
        <line x1="278" y1="208" x2="366" y2="208" />
      </g>
    </svg>
  );
}

/**
 * Counting sheep, without counting pressure: one small sheep hops a low fence
 * every ~3.6s. Driven by requestAnimationFrame against refs (no per-frame
 * React renders); the counter only changes when a sheep crosses the fence.
 * Pauses on: user pause, tab hidden, off-screen (IntersectionObserver), and
 * unmount. prefers-reduced-motion renders a still scene and never animates.
 */
export function CountingSheep() {
  const c = useCopy().anmei;
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const sheepRef = useRef<HTMLDivElement | null>(null);
  const [wantsPlay, setWantsPlay] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [count, setCount] = useState(0);
  const progressRef = useRef(0);
  const countedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = wantsPlay && !reduced && inView && !hidden;

  useEffect(() => {
    const sheep = sheepRef.current;
    const scene = sceneRef.current;
    if (!sheep || !scene) return;

    const place = (p: number) => {
      const w = scene.clientWidth;
      const x = -70 + p * (w + 140);
      let y = 0;
      let tilt = 0;
      const hopSpan = 0.26;
      if (p > CROSS_AT - hopSpan / 2 && p < CROSS_AT + hopSpan / 2) {
        const hp = (p - (CROSS_AT - hopSpan / 2)) / hopSpan;
        y = -Math.sin(Math.PI * hp) * 44;
        tilt = Math.sin(Math.PI * hp) * -5;
      }
      sheep.style.transform = `translate(${x}px, ${y}px) rotate(${tilt}deg)`;
    };

    if (reduced) {
      // Still scene: one sheep standing before the fence, no motion at all.
      progressRef.current = 0.32;
      countedRef.current = false;
      place(progressRef.current);
      return;
    }
    place(progressRef.current);
    if (!playing) return;

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      progressRef.current += dt / CYCLE_MS;
      if (progressRef.current >= CROSS_AT && !countedRef.current) {
        countedRef.current = true;
        setCount((n) => n + 1);
      }
      if (progressRef.current >= 1) {
        progressRef.current -= 1;
        countedRef.current = false;
      }
      place(progressRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced]);

  return (
    <div className="mt-6 overflow-hidden rounded-card border border-line bg-paper">
      <div ref={sceneRef} className="relative h-52 overflow-hidden sm:h-60" role="img" aria-label={c.sheepT}>
        <NightScene />
        <div ref={sheepRef} className="absolute bottom-8 left-0 w-16 will-change-transform sm:w-[4.5rem]">
          <SheepFigure />
        </div>
      </div>
      <div className="p-5">
        <p className="text-muted">{c.sheepLead}</p>
        <p className="mt-2 text-xs tracking-[0.16em] text-accent" aria-live="polite">
          {c.sheepCounting(count)}
        </p>
        {reduced && <p className="mt-2 text-sm text-muted">{c.sheepStill}</p>}
        {!reduced && (
          <div className="mt-4">
            {wantsPlay ? (
              <GhostButton onClick={() => setWantsPlay(false)}>{c.sheepPause}</GhostButton>
            ) : (
              <SolidButton onClick={() => setWantsPlay(true)}>{c.sheepStart}</SolidButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
