import { useEffect, useRef, useState } from "react";
import { useCopy } from "@/i18n/lang";

const MUTE_KEY = "shenxin-music-off";

function later(fn: () => void) {
  const ric = (
    window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }
  ).requestIdleCallback;
  if (typeof ric === "function") return ric(fn, { timeout: 1500 });
  return window.setTimeout(fn, 500);
}

function isMuted() {
  try {
    return sessionStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function AmbientMusic({ src, onLabel }: { src: string; onLabel: string }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const pausedByUser = useRef(false);
  const [on, setOn] = useState(() => !isMuted());
  const ui = useCopy().ui;

  useEffect(() => {
    if (isMuted()) {
      pausedByUser.current = true;
      setOn(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    pausedByUser.current = isMuted();

    const ensure = () => {
      if (!audio.current) {
        const el = new Audio();
        el.loop = true;
        el.volume = 0.28;
        el.preload = "none";
        audio.current = el;
      }
      return audio.current;
    };

    const tryPlay = (e?: Event) => {
      if (cancelled || pausedByUser.current || isMuted()) return;
      const t = e?.target as HTMLElement | null;
      if (t?.closest?.(".ambient-toggle")) return;
      const el = ensure();
      if (!el.src.includes(src)) el.src = src;
      el.muted = false;
      void el
        .play()
        .then(() => {
          if (cancelled || pausedByUser.current || isMuted()) {
            el.pause();
            el.muted = true;
            return;
          }
          setOn(true);
        })
        .catch(() => {
          /* browsers often block until a gesture */
        });
    };

    const el = ensure();
    if (!el.src.includes(src)) {
      el.pause();
      el.src = src;
    }
    if (pausedByUser.current) {
      el.pause();
      el.muted = true;
      setOn(false);
    }

    const startWhenQuiet = () => {
      if (cancelled) return;
      later(() => tryPlay());
    };

    if (document.readyState === "complete") startWhenQuiet();
    else window.addEventListener("load", startWhenQuiet, { once: true });

    window.addEventListener("pointerdown", tryPlay);
    window.addEventListener("keydown", tryPlay);

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("keydown", tryPlay);
    };
  }, [src]);

  useEffect(() => {
    return () => {
      const el = audio.current;
      if (el) {
        el.pause();
        el.src = "";
        audio.current = null;
      }
    };
  }, []);

  function toggle(e: React.MouseEvent | React.PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const el = audio.current;
    if (on) {
      pausedByUser.current = true;
      try {
        sessionStorage.setItem(MUTE_KEY, "1");
      } catch {
        /* ignore */
      }
      if (el) {
        el.pause();
        el.muted = true;
      }
      setOn(false);
      return;
    }
    pausedByUser.current = false;
    try {
      sessionStorage.removeItem(MUTE_KEY);
    } catch {
      /* ignore */
    }
    const next = el ?? new Audio();
    next.loop = true;
    next.volume = 0.28;
    next.muted = false;
    if (!next.src.includes(src)) next.src = src;
    audio.current = next;
    void next
      .play()
      .then(() => setOn(true))
      .catch(() => setOn(false));
  }

  return (
    <button
      type="button"
      onPointerDown={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}
      onClick={toggle}
      className="ambient-toggle"
      aria-pressed={on}
      aria-label={on ? ui.musicPause : ui.musicPlay}
    >
      {on ? onLabel : ui.music}
    </button>
  );
}
