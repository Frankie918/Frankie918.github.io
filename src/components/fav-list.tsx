import { Link } from "@tanstack/react-router";
import { useCopy, useLang } from "@/i18n/lang";
import { useFavs } from "@/components/fav-star";
import { FAV_ITEMS, FAV_UI, saveFavs, type FavRoom } from "@/lib/favourites";

/** Homepage 我的收藏 card: links straight to each starred practice in its room. */
export function FavList() {
  const copy = useCopy();
  const ui = FAV_UI[useLang().lang];
  const favs = useFavs();
  const items = FAV_ITEMS.filter((i) => favs.includes(i.key));
  const room = (r: FavRoom) => (r === "anshen" ? copy.home.anshenT : r === "jieyu" ? copy.home.jieyuT : r === "anmei" ? copy.home.anmeiT : copy.home.yaliT);
  return (
    <section id="favourites" aria-labelledby="fav-title" className="rounded-card border border-line bg-paper p-7 text-ink">
      <p className="text-xs tracking-[0.22em] text-accent">
        <span aria-hidden="true">★ </span>
        {ui.kicker}
      </p>
      <h2 id="fav-title" className="mt-2 font-serif text-2xl">{ui.title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-muted">{ui.empty}</p>
      ) : (
        <ul className="mt-4 grid gap-2">
          {items.map((i) => (
            <li key={i.key}>
              <Link
                to={`/${i.room}`}
                hash={i.anchor}
                className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-line px-4 py-2 text-ink no-underline"
              >
                <span className="min-w-0 font-serif">{i.title(copy)}</span>
                <span className="shrink-0 text-xs tracking-[0.12em] text-accent">{room(i.room)} →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-xs text-muted">{ui.note}</p>
      {items.length > 0 && (
        <button type="button" onClick={() => saveFavs([])} className="mt-2 min-h-11 text-sm text-muted underline">
          {ui.clear}
        </button>
      )}
    </section>
  );
}
