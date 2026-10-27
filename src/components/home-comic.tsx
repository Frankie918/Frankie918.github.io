import { Link } from "@tanstack/react-router";
import { useCopy, useLang } from "@/i18n/lang";
import {
  COMIC_THEME_ROOM,
  comicText,
  currentComic,
  type ComicTheme,
} from "@/lib/comics";

const UI = {
  yue: {
    kicker: "四格漫畫",
    badge: "逢周六更新",
    thisWeek: (room: string) => `本期：${room}`,
    roomGo: (room: string) => `去${room} →`,
  },
  cmn: {
    kicker: "四格漫畫",
    badge: "逢周六更新",
    thisWeek: (room: string) => `本期：${room}`,
    roomGo: (room: string) => `去${room} →`,
  },
  en: {
    kicker: "Four-panel comic",
    badge: "Updates every Saturday",
    thisWeek: (room: string) => `This week: ${room}`,
    roomGo: (room: string) => `Go to ${room} →`,
  },
} as const;

function roomName(theme: ComicTheme, home: ReturnType<typeof useCopy>["home"]) {
  if (theme === "anshen") return home.anshenT;
  if (theme === "jieyu") return home.jieyuT;
  if (theme === "anmei") return home.anmeiT;
  return home.yaliT;
}

/**
 * Homepage featured comic: one panel set at a time, themes rotate weekly
 * (安神 → 解鬱 → 安寐 → 舒壓). Rooms no longer host their own comics.
 */
export function HomeComic() {
  const { lang } = useLang();
  const { home } = useCopy();
  const comic = currentComic();
  const ui = UI[lang];
  const theme = roomName(comic.theme, home);
  const title = comicText(comic.title, lang);
  const alt = comicText(comic.alt, lang);

  return (
    <section id="comic" className="border-t border-line px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-xs tracking-[0.22em] text-accent">{ui.kicker}</p>
        <h2 className="mb-4 font-serif text-3xl md:text-4xl">{title}</h2>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <p className="inline-flex items-center rounded-full border border-line bg-paper px-4 py-1.5 text-xs tracking-[0.14em] text-accent">
            {ui.badge}
          </p>
          <p className="inline-flex items-center rounded-full border border-line bg-paper px-4 py-1.5 text-xs tracking-[0.14em] text-ink">
            {ui.thisWeek(theme)}
          </p>
        </div>
        <figure className="overflow-hidden rounded-card border border-line bg-paper">
          <img
            src={comic.image}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </figure>
        <p className="mt-5">
          <Link
            to={COMIC_THEME_ROOM[comic.theme]}
            className="text-sm text-accent no-underline"
          >
            {ui.roomGo(theme)}
          </Link>
        </p>
      </div>
    </section>
  );
}
