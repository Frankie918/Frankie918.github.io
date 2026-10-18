import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AmbientMusic } from "@/components/ambient-music";
import { QuietWhisper } from "@/components/quiet-whisper";
import { useCopy } from "@/i18n/lang";

const ROOM_PATHS = ["/anshen", "/jieyu", "/anmei", "/yali"];
function musicFor(path: string, copy: ReturnType<typeof useCopy>) {
  // All four rooms: no ambient autoplay. Music is OFF by default and starts only when the
  // visitor picks 中樂／西樂 in the floating music button or the room's #music section
  // (shared player in room-music.tsx). Other pages keep the existing ambient toggle.
  if (ROOM_PATHS.some((r) => path.startsWith(r))) return null;
  return { src: "/audio/calm.mp3", onLabel: copy.ui.musicOn };
}

export function SiteAtmosphere() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const copy = useCopy();
  const listen = path.startsWith("/listen");
  const music = musicFor(path, copy);

  useEffect(() => {
    const theme = path.startsWith("/yali")
      ? "yali"
      : path.startsWith("/jieyu")
      ? "jieyu"
      : path.startsWith("/anshen")
        ? "anshen"
        : path.startsWith("/anmei")
          ? "anmei"
          : "";
    if (theme) document.documentElement.setAttribute("data-theme", theme);
    else document.documentElement.removeAttribute("data-theme");
  }, [path]);

  return (
    <>
      {!listen && <QuietWhisper />}
      {!listen && music && <AmbientMusic src={music.src} onLabel={music.onLabel} />}
    </>
  );
}
