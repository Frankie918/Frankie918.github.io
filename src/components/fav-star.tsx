import { useEffect, useState, type ReactNode } from "react";
import { useLang } from "@/i18n/lang";
import { FAV_EVENT, FAV_UI, loadFavs, saveFavs, toggleFav } from "@/lib/favourites";

/** Current favourites; empty on the server and first paint (no hydration mismatch). */
export function useFavs() {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => {
    const read = () => setFavs(loadFavs());
    read();
    window.addEventListener(FAV_EVENT, read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener(FAV_EVENT, read);
      window.removeEventListener("storage", read);
    };
  }, []);
  return favs;
}

/** Small ☆/★ toggle. Saved in this browser only. */
export function FavStar({ fav, label }: { fav: string; label: string }) {
  const ui = FAV_UI[useLang().lang];
  const on = useFavs().includes(fav);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? ui.remove(label) : ui.add(label)}
      title={on ? ui.remove(label) : ui.add(label)}
      onClick={() => saveFavs(toggleFav(loadFavs(), fav))}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-xl leading-none ${on ? "text-accent" : "text-muted"}`}
    >
      <span aria-hidden="true">{on ? "★" : "☆"}</span>
    </button>
  );
}

/** Heading row with a star on the right; wraps cleanly on narrow screens. */
export function FavHeading({ fav, className, children, label }: { fav: string; className: string; children: ReactNode; label: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <h3 className={`min-w-0 ${className}`}>{children}</h3>
      <FavStar fav={fav} label={label} />
    </div>
  );
}
