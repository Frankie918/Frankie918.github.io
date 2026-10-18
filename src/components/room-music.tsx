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
import { MUSIC_UI, ROOM_MUSIC, roomFromPath, type MusicRoom, type MusicTrack } from "@/lib/room-music";

/**
 * One shared player for all four rooms (安神／解鬱／安寐／舒壓).
 * OFF / silent by default: no preload, no autoplay, no autoplay-on-first-tap anywhere.
 * The visitor explicitly picks 中樂 or 西樂 (floating button at the top, or the in-page
 * #music section — both drive this same player). One track at a time, looped, gentle
 * volume (slider 100% = 50% of device volume), slow fade-in. 靜音 fully stops and
 * rewinds. Changing room or leaving the rooms stops the music.
 * Licences: docs/yali-music-licences.md (PD compositions; CC BY / CC BY-SA / CC0 recordings).
 */
const MAX_VOLUME = 0.5;
const DEFAULT_LEVEL = 40; // → 0.2 actual
const FADE_IN_MS = 3000;
const FADE_OUT_MS = 600;

type MusicCtx = {
  room: MusicRoom | null;
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
  const room = roomFromPath(path);
  const audio = useRef<HTMLAudioElement | null>(null);
  const fade = useRef<number | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [panelOpen, setPanelOpen] = useState(false);
  const levelRef = useRef(level);
  levelRef.current = level;
  const roomRef = useRef(room);
  roomRef.current = room;

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

  const hardStop = useCallback(() => {
    clearFade();
    const el = audio.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
      el.removeAttribute("src");
      el.load();
    }
    setPlayingId(null);
  }, [clearFade]);

  const stop = useCallback(() => {
    const el = audio.current;
    setPlayingId(null);
    if (!el) return;
    ramp(el, 0, FADE_OUT_MS, () => {
      el.pause();
      el.currentTime = 0;
    });
  }, [ramp]);

  const play = useCallback(
    (track: MusicTrack) => {
      if (playingId === track.id) {
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
      el.src = track.src;
      setPlayingId(track.id);
      void el
        .play()
        .then(() => ramp(el, (levelRef.current / 100) * MAX_VOLUME, FADE_IN_MS))
        .catch(() => setPlayingId(null));
    },
    [playingId, stop, clearFade, ramp],
  );

  // Volume slider follows immediately while playing.
  useEffect(() => {
    const el = audio.current;
    if (el && playingId && !fade.current) el.volume = (level / 100) * MAX_VOLUME;
  }, [level, playingId]);

  // Changing room (or leaving the four rooms) always stops the music and closes the panel.
  const prevRoom = useRef(room);
  useEffect(() => {
    if (prevRoom.current !== room) {
      prevRoom.current = room;
      hardStop();
      setPanelOpen(false);
    }
  }, [room, hardStop]);

  // Unmount (page leave) stops everything.
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
    [clearFade],
  );

  const value = useMemo<MusicCtx>(
    () => ({ room, playingId, level, setLevel, play, stop, panelOpen, setPanelOpen }),
    [room, playingId, level, play, stop, panelOpen],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function TrackGroups({ onPick }: { onPick?: () => void }) {
  const { lang } = useLang();
  const ui = MUSIC_UI[lang];
  const { room, playingId, play } = useMusic();
  if (!room) return null;
  const data = ROOM_MUSIC[room];
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
  const { room, playingId, level, setLevel, stop } = useMusic();
  if (!room) return null;
  const now = ROOM_MUSIC[room].tracks.find((t) => t.id === playingId);
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
      <p className="mt-4 text-xs leading-relaxed text-muted">{ROOM_MUSIC[room].credit[lang]}</p>
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
 * (.site-top in __root.tsx, next to .lang-bar), visible on the four room pages.
 * Tap opens a panel with 中樂 / 西樂 track choices and 靜音; tap again (or 靜音) closes/stops.
 */
export function FloatingMusic() {
  const { lang } = useLang();
  const ui = MUSIC_UI[lang];
  const { room, playingId, stop, panelOpen, setPanelOpen } = useMusic();
  if (!room) return null;
  const now = ROOM_MUSIC[room].tracks.find((t) => t.id === playingId);
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
          <p className="text-sm text-muted">{ui.lead}</p>
          <p className="mt-2 text-sm text-muted">{ui.safety}</p>
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
          <p className="mt-3 text-xs leading-relaxed text-muted">{ROOM_MUSIC[room].credit[lang]}</p>
        </div>
      )}
    </div>
  );
}
