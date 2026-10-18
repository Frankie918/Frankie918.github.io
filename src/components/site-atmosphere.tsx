import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { QuietWhisper } from "@/components/quiet-whisper";

// No separate ambient track anywhere: the legacy Canon ambient toggle was retired.
// On the four rooms, the shared room player (room-music.tsx) defaults to that room's
// Chinese guqin track on entry (autoplay attempt, else first interaction), with
// 中樂／西樂／靜音 choices; other pages have no background music.
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
