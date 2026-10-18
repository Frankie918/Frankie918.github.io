import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AmbientMusic } from "@/components/ambient-music";
import { QuietWhisper } from "@/components/quiet-whisper";
import { useCopy } from "@/i18n/lang";

function musicFor(path: string, copy: ReturnType<typeof useCopy>) {
  // 舒壓 has its own in-page player that is OFF until the visitor starts it: no ambient autoplay.
  if (path.startsWith("/yali")) return null;
  if (path.startsWith("/anshen")) {
    return { src: "/audio/pingsha.mp3", onLabel: copy.anshen.musicOn };
  }
  if (path.startsWith("/jieyu")) {
    return { src: "/audio/yangguan.mp3", onLabel: copy.jieyu.musicOn };
  }
  if (path.startsWith("/anmei")) {
    return { src: "/audio/zuiyu.mp3", onLabel: copy.anmei.musicOn };
  }
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
