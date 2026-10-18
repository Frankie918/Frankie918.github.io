import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouterState } from "@tanstack/react-router";
import { GhostButton } from "@/components/clinic-layout";
import { useLang } from "@/i18n/lang";
import { MUSIC_UI, contextFromPath, defaultTrackFor, musicSetFor, type MusicContext, type MusicTrack } from "@/lib/room-music";

/**
 * One shared player for the homepage and all four rooms (安神／解鬱／安寐／舒壓).
 * HOMEPAGE (clinician override, 2026-10-18): only the pre-existing Canon track
 * (/audio/calm.mp3), no 中樂／西樂 choice. On entering the homepage the player
 * calls play() IMMEDIATELY on mount (no panel interaction needed), exactly as
 * on the old site; if the browser rejects it, it retries on pageshow / when
 * the page becomes visible again, and stays armed for the first tap/keypress.
 * No muted-autoplay trick is used. No explanatory music copy is rendered on
 * the homepage — only the floating button, the Canon track name and mute/stop.
 * Entering a room stops it so the room's own default takes over (single shared
 * <audio>, never double audio).
 * DEFAULT (clinician, 2026-10-18): on entering a room, attempt to start that room's
 * Chinese guqin track at 20% volume (slider 40 x max 50%) with a slow fade-in.
 * Browsers usually block audible autoplay before any interaction: if play() is
 * rejected, the default stays ARMED (not shown as playing) and starts on the
 * visitor's first pointerdown/keydown anywhere on the page. The visitor can
 * switch to the room's Western track, or press 靜音/mute: mute persists for that
 * room visit (the default does not restart) until they leave and re-enter, and
 * switching contexts (homepage <-> room, or room <-> room) resets to the new
 * context's default. One shared <audio> element = one track at a time;
 * leaving the homepage/rooms stops everything.
 * Licences: docs/yali-music-licences.md (PD compositions; CC BY / CC BY-SA / CC0 / PD recordings).
 */
const MAX_VOLUME = 0.5;
const DEFAULT_LEVEL = 40; // → 0.2 actual
const FADE_IN_MS = 3000;
const FADE_OUT_MS = 600;

type MusicCtx = {
  context: MusicContext | null;
  playingId: string | null;
  level: number;
  setLevel: (n: number) => void;
  play: (track: MusicTrack) => void;
  stop: () => void;
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
};

const Ctx = createContext<MusicCtx | null>(null);

function useMusic() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("MusicProvider missing");
  return ctx;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const context = contextFromPath(path);
  const audio = useRef<HTMLAudioElement | null>(null);
  const fade = useRef<number | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [panelOpen, setPanelOpen] = useState(false);
  const levelRef = useRef(level);
  levelRef.current = level;
  const contextRef = useRef(context);
  contextRef.current = context;
  const playingIdRef = useRef<string | null>(null);
  /** Context whose visit the visitor muted in; default must not restart there. */
  const mutedVisitRef = useRef<MusicContext | null>(null);
  /** Default track armed to start on first interaction after blocked autoplay. */
  const pendingRef = useRef<MusicTrack | null>(null);
  const armHandlerRef = useRef<(() => void) | null>(null);
  /** Homepage-only visibility retry wrapper, removed by disarmDefault. */
  const retryHandlerRef = useRef<(() => void) | null>(null);
  /** Guards against overlapping play() attempts (immediate + pageshow/visibility retries). */
  const attemptInFlightRef = useRef(false);
  /** Last context value the entry effect has handled (mount + each switch). */
  const handledContextRef = useRef<MusicContext | null | undefined>(undefined);

  const clearFade = useCallback(() => {
    if (fade.current) window.clearInterval(fade.current);
    fade.current = null;
  }, []);

  const ramp = useCallback(
    (el: HTMLAudioElement, to: number, ms: number, done?: () => void) => {
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
    },
    [clearFade],
  );

  const disarmDefault = useCallback(() => {
    pendingRef.current = null;
    if (armHandlerRef.current) {
      window.removeEventListener("pointerdown", armHandlerRef.current);
      window.removeEventListener("keydown", armHandlerRef.current);
      window.removeEventListener("pageshow", armHandlerRef.current);
      armHandlerRef.current = null;
    }
    if (retryHandlerRef.current) {
      document.removeEventListener("visibilitychange", retryHandlerRef.current);
      retryHandlerRef.current = null;
    }
  }, []);

  const hardStop = useCallback(() => {
    playingIdRef.current = null;
    disarmDefault();
    clearFade();
    const el = audio.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
      el.removeAttribute("src");
      el.load();
    }
    setPlayingId(null);
  }, [clearFade, disarmDefault]);

  const startTrack = useCallback(
    async (track: MusicTrack): Promise<boolean> => {
      if (attemptInFlightRef.current) return false;
      attemptInFlightRef.current = true;
      const el = audio.current ?? new Audio();
      audio.current = el;
      clearFade();
      el.pause();
      el.loop = true;
      el.preload = "auto";
      el.volume = 0;
      el.src = track.src;
      try {
        await el.play();
      } catch {
        // Blocked (autoplay policy) or interrupted: do NOT claim it is playing.
        playingIdRef.current = null;
        setPlayingId(null);
        return false;
      } finally {
        attemptInFlightRef.current = false;
      }
      playingIdRef.current = track.id;
      setPlayingId(track.id);
      ramp(el, (levelRef.current / 100) * MAX_VOLUME, FADE_IN_MS);
      return true;
    },
    [clearFade, ramp],
  );

  const armDefault = useCallback(
    (track: MusicTrack) => {
      disarmDefault();
      pendingRef.current = track;
      const handler = () => {
        const pending = pendingRef.current;
        if (!pending) return;
        if (mutedVisitRef.current === contextRef.current) {
          disarmDefault();
          return;
        }
        if (playingIdRef.current) {
          disarmDefault();
          return;
        }
        void startTrack(pending).then((ok) => {
          if (ok) disarmDefault();
        });
      };
      armHandlerRef.current = handler;
      window.addEventListener("pointerdown", handler);
      window.addEventListener("keydown", handler);
      // HOMEPAGE ONLY (rooms keep their existing first-interaction behaviour):
      // retry the immediate play() attempt when the page is shown again
      // (pageshow, incl. back/forward cache) or becomes visible again, without
      // waiting for the visitor to open the music panel. Still honest: if the
      // browser rejects again it stays armed, never shown as playing.
      if (contextRef.current === "home") {
        window.addEventListener("pageshow", handler);
        const onVisible = () => {
          if (document.visibilityState === "visible") handler();
        };
        retryHandlerRef.current = onVisible;
        document.addEventListener("visibilitychange", onVisible);
      }
    },
    [disarmDefault, startTrack],
  );

  /** 靜音: stop now, cancel any armed default, and keep it off for this context visit. */
  const stop = useCallback(() => {
    mutedVisitRef.current = contextRef.current;
    disarmDefault();
    playingIdRef.current = null;
    const el = audio.current;
    setPlayingId(null);
    if (!el) return;
    ramp(el, 0, FADE_OUT_MS, () => {
      el.pause();
      el.currentTime = 0;
    });
  }, [ramp, disarmDefault]);

  const play = useCallback(
    (track: MusicTrack) => {
      // An explicit pick overrides the default and clears this visit's mute.
      disarmDefault();
      mutedVisitRef.current = null;
      if (playingIdRef.current === track.id) {
        stop();
        return;
      }
      void startTrack(track);
    },
    [stop, disarmDefault, startTrack],
  );

  // Volume slider follows immediately while playing.
  useEffect(() => {
    const el = audio.current;
    if (el && playingId && !fade.current) el.volume = (level / 100) * MAX_VOLUME;
  }, [level, playingId]);

  // Context entry / switching: stop the previous context, reset the visit's
  // mute, close the panel, then attempt the new context's default (room:
  // Chinese guqin; homepage: its sole Canon track). Switching contexts
  // therefore always resets to the new default; leaving them stops.
  useEffect(() => {
    if (handledContextRef.current === context) return;
    handledContextRef.current = context;
    hardStop();
    setPanelOpen(false);
    mutedVisitRef.current = null;
    if (!context) return;
    const def = defaultTrackFor(context);
    void startTrack(def).then((ok) => {
      if (ok) return;
      // Autoplay blocked: arm for the first tap/keypress, unless the visitor has
      // already muted or started something else in this context in the meantime.
      if (handledContextRef.current !== context) return;
      if (mutedVisitRef.current === context) return;
      if (playingIdRef.current) return;
      armDefault(def);
    });
  }, [context, hardStop, startTrack, armDefault]);

  // Unmount (page leave) stops everything.
  useEffect(
    () => () => {
      disarmDefault();
      clearFade();
      const el = audio.current;
      if (el) {
        el.pause();
        el.removeAttribute("src");
        el.load();
      }
      audio.current = null;
    },
    [clearFade, disarmDefault],
  );

  const value = useMemo<MusicCtx>(
    () => ({ context, playingId, level, setLevel, play, stop, panelOpen, setPanelOpen }),
    [context, playingId, level, play, stop, panelOpen],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function TrackGroups({ onPick }: { onPick?: () => void }) {
  const { lang } = useLang();
  const ui = MUSIC_UI[lang];
  const { context, playingId, play } = useMusic();
  if (!context) return null;
  const data = musicSetFor(context);
  // Homepage: exactly one Canon track — no 中樂／西樂 grouping.
  if (context === "home") {
    return (
      <div className="grid gap-2.5">
        {data.tracks.map((t) => {
          const on = playingId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={on}
              onClick={() => {
                play(t);
                onPick?.();
              }}
              className="track-btn flex min-h-14 items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-left"
            >
              <span>
                <span className="block font-serif">{t.title[lang]}</span>
                <span className="mt-0.5 block text-xs text-muted">{t.hint[lang]}</span>
              </span>
              <span className="shrink-0 text-sm text-accent">{on ? `■ ${ui.stop}` : `▶ ${ui.play}`}</span>
            </button>
          );
        })}
      </div>
    );
  }
  const groups = [
    { key: "cn", label: ui.cn },
    { key: "west", label: ui.west },
  ] as const;
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {groups.map((g) => (
        <div key={g.key}>
          <p className="text-xs tracking-[0.18em] text-accent">{g.label}</p>
          <div className="mt-2 grid gap-2.5">
            {data.tracks
              .filter((t) => t.group === g.key)
              .map((t) => {
                const on = playingId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      play(t);
                      onPick?.();
                    }}
                    className="track-btn flex min-h-14 items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-left"
                  >
                    <span>
                      <span className="block font-serif">{t.title[lang]}</span>
                      <span className="mt-0.5 block text-xs text-muted">{t.hint[lang]}</span>
                    </span>
                    <span className="shrink-0 text-sm text-accent">{on ? `■ ${ui.stop}` : `▶ ${ui.play}`}</span>
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

function VolumeAndStop() {
  const { lang } = useLang();
  const ui = MUSIC_UI[lang];
  const { context, playingId, level, setLevel, stop } = useMusic();
  if (!context) return null;
  const now = musicSetFor(context).tracks.find((t) => t.id === playingId);
  return (
    <>
      <div className="mt-5 flex flex-wrap items-center gap-4 rounded-card border border-line bg-paper p-4">
        <label className="flex items-center gap-3 text-sm text-ink" htmlFor="room-music-vol">
          {ui.vol}
          <input
            id="room-music-vol"
            type="range"
            min={0}
            max={100}
            step={5}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-36 accent-[var(--color-accent)]"
          />
        </label>
        <GhostButton onClick={stop}>■ {ui.mute}</GhostButton>
        <p className="text-sm text-muted" aria-live="polite">
          {now ? `${ui.now}${now.title[lang]}` : ""}
        </p>
      </div>
      {musicSetFor(context).credit && (
        <p className="mt-4 text-xs leading-relaxed text-muted">{musicSetFor(context).credit?.[lang]}</p>
      )}
      {playingId && (
        <button
          type="button"
          onClick={stop}
          className="calm-stop inline-flex min-h-11 items-center rounded-full bg-bg-deep px-5 py-2 text-sm tracking-[0.12em] text-paper shadow-sm"
        >
          ■ {ui.mute}
        </button>
      )}
    </>
  );
}

/** In-page #music section body, used by all four rooms (same player as the floating button). */
export function RoomMusicSection() {
  const { lang } = useLang();
  const ui = MUSIC_UI[lang];
  return (
    <div className="mt-5">
      <p className="text-sm text-muted">{ui.safety}</p>
      <div className="mt-4">
        <TrackGroups />
      </div>
      <VolumeAndStop />
    </div>
  );
}

/**
 * Floating music button, mirroring LanguageSwitch: a pill in the sticky top bar
 * (.site-top in __root.tsx, next to .lang-bar), visible on the homepage and the
 * four room pages. Rooms: 中樂 / 西樂 choices + 靜音. Homepage: only its single
 * Canon track + 靜音. Tap again (or 靜音) closes/stops.
 */
export function FloatingMusic() {
  const { lang } = useLang();
  const ui = MUSIC_UI[lang];
  const { context, playingId, stop, panelOpen, setPanelOpen } = useMusic();
  if (!context) return null;
  const now = musicSetFor(context).tracks.find((t) => t.id === playingId);
  // Homepage: NO explanatory music copy at all (clinician, 2026-10-18) — only
  // the track name and mute/stop below. Rooms keep their lead/safety/credit.
  const isHome = context === "home";
  return (
    <div className="music-float">
      <button
        type="button"
        className="music-float-btn"
        aria-expanded={panelOpen}
        aria-pressed={!!playingId}
        aria-label={playingId ? `${ui.now}${now?.title[lang] ?? ""}` : ui.music}
        onClick={() => setPanelOpen(!panelOpen)}
      >
        {playingId ? `♪ ${ui.now}${now?.title[lang] ?? ""}` : `♪ ${ui.music}`}
      </button>
      {panelOpen && (
        <div className="music-float-panel" role="group" aria-label={ui.music}>
          {!isHome && (
            <>
              <p className="text-sm text-muted">{ui.lead}</p>
              <p className="mt-2 text-sm text-muted">{ui.safety}</p>
            </>
          )}
          <div className="mt-4">
            <TrackGroups />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <GhostButton
              onClick={() => {
                stop();
                setPanelOpen(false);
              }}
            >
              ■ {ui.mute}
            </GhostButton>
            <p className="text-sm text-muted" aria-live="polite">
              {now ? `${ui.now}${now.title[lang]}` : ""}
            </p>
          </div>
          {!isHome && musicSetFor(context).credit && (
            <p className="mt-3 text-xs leading-relaxed text-muted">{musicSetFor(context).credit?.[lang]}</p>
          )}
        </div>
      )}
    </div>
  );
}
