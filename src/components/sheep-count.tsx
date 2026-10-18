import { useEffect, useRef, useState } from "react";
import { GhostButton, SolidButton } from "@/components/clinic-layout";
import { useCopy } from "@/i18n/lang";

const CYCLE_MS = 1500;
const CROSS_AT = 0.37;

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
      {/* soft crescent moon: muted cream, faint halo only, never bright or glowing */}
      <circle cx="580" cy="54" r="36" fill="#f3eee4" opacity="0.07" />
      <path d="M586 24 a31 31 0 1 0 21 52 a24 24 0 1 1 -21 -52" fill="#ede5d3" opacity="0.88" />
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
 * Counting sheep, without counting pressure: one sheep hops a low fence
 * every 1.5s while the next two wait in line behind it and shuffle gently
 * forward between hops. Driven by requestAnimationFrame against refs (no
 * per-frame React renders); the counter only changes when a sheep crosses
 * the fence. Pauses on: user pause, tab hidden, off-screen
 * (IntersectionObserver), and unmount. prefers-reduced-motion renders a
 * still scene (moon, fence and sheep standing in line) and never animates.
 */
export function CountingSheep() {
  const c = useCopy().anmei;
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const sheepRefs = useRef<Array<HTMLDivElement | null>>([]);
  // Queue roles by physical sheep index: [hopping, next in line, back of line].
  // Rotated on each cycle wrap so queued sheep keep their places (no popping);
  // the sheep that just hopped re-joins at the back and fades in there.
  const orderRef = useRef<number[]>([0, 1, 2]);
  const spawningRef = useRef<number | null>(null);
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
    const scene = sceneRef.current;
    if (!scene || sheepRefs.current.filter(Boolean).length < 3) return;

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const smooth = (t: number) => {
      const x = clamp01(t);
      return x * x * (3 - 2 * x);
    };

    const place = (p: number) => {
      const w = scene.clientWidth;
      const fenceC = w * 0.503;
      const spacing = Math.min(78, Math.max(52, w * 0.16));
      const front = fenceC - 72;
      const mid = front - spacing;
      const back = mid - spacing;
      const land = fenceC + 44;

      // Positions per queue role for this point in the cycle.
      const roles: Array<{ x: number; y: number; tilt: number; opacity: number }> = [];
      // Role 0: short approach, one gentle hop over the fence, then walks off
      // and fades out on the right.
      {
        let x = front;
        let y = 0;
        let tilt = 0;
        let opacity = 1;
        if (p < 0.12) {
          x = lerp(front, front + 18, smooth(p / 0.12));
        } else if (p < 0.62) {
          // Hop occupies 50% of the 1.5s cycle (750ms): the same sine rise /
          // peak / fall and tilt as before, scaled proportionally so the arc
          // stays gentle rather than snapping at the faster cadence.
          const hp = (p - 0.12) / 0.5;
          x = lerp(front + 18, land, hp);
          y = -Math.sin(Math.PI * hp) * 44;
          tilt = Math.sin(Math.PI * hp) * -5;
        } else {
          x = lerp(land, land + 78, smooth((p - 0.62) / 0.38));
          opacity = 1 - clamp01((p - 0.86) / 0.14);
        }
        roles[0] = { x, y, tilt, opacity };
      }
      // Roles 1-2: wait, then shuffle one place forward between hops with a
      // tiny bob. Their end places are exactly the next cycle's start places.
      const shift = smooth((p - 0.62) / 0.33);
      const bob = shift > 0 && shift < 1 ? -Math.sin(Math.PI * shift) * 3 : 0;
      roles[1] = { x: lerp(mid, front, shift), y: bob, tilt: 0, opacity: 1 };
      roles[2] = { x: lerp(back, mid, shift), y: bob, tilt: 0, opacity: 1 };

      orderRef.current.forEach((physical, role) => {
        const el = sheepRefs.current[physical];
        if (!el) return;
        const pos = roles[role];
        let opacity = pos.opacity;
        // Only the sheep that just re-joined at the back fades in.
        if (role === 2 && spawningRef.current === physical) {
          opacity = clamp01(p / 0.1);
          if (p >= 0.1) spawningRef.current = null;
        }
        el.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${pos.tilt}deg)`;
        el.style.opacity = String(opacity);
      });
    };

    const placeStill = () => {
      // Still scene: three sheep standing in line before the fence.
      const w = scene.clientWidth;
      const fenceC = w * 0.503;
      const spacing = Math.min(78, Math.max(52, w * 0.16));
      const front = fenceC - 72;
      const spots = [front, front - spacing, front - 2 * spacing];
      orderRef.current.forEach((physical, role) => {
        const el = sheepRefs.current[physical];
        if (!el) return;
        el.style.transform = `translate(${spots[role]}px, 0px) rotate(0deg)`;
        el.style.opacity = "1";
      });
    };

    if (reduced) {
      progressRef.current = 0;
      countedRef.current = false;
      spawningRef.current = null;
      orderRef.current = [0, 1, 2];
      placeStill();
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
        // The hopped sheep re-joins at the back; the line moves up a role.
        const [hopped, next, lastInLine] = orderRef.current;
        orderRef.current = [next, lastInLine, hopped];
        spawningRef.current = hopped;
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
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => {
              sheepRefs.current[i] = el;
            }}
            className="pointer-events-none absolute bottom-8 left-0 w-16 will-change-transform sm:w-[4.5rem]"
          >
            <SheepFigure />
          </div>
        ))}
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
