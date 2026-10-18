import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { QuietWhisper } from "@/components/quiet-whisper";

// Music is never ambient/autoplay anywhere on the site: it starts only when a visitor
// picks 中樂／西樂 in a room's floating music button (room-music.tsx). The legacy Canon
// ambient toggle on non-room pages was retired with the four-room floating player.
export function SiteAtmosphere() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const listen = path.startsWith("/listen");

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
    </>
  );
}
