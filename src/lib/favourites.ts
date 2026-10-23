import type { Copy, Lang } from "@/i18n/copy";

/**
 * 我的收藏 (2026-10): readers star practices they like. Saved ONLY in this browser
 * (localStorage, key below); nothing is sent anywhere. A favourite is just a key
 * "room#anchor"; titles are looked up from the current language's copy, so the list
 * follows the language switch. Anchors must exist on the room page (see tests).
 */
export const FAV_STORAGE_KEY = "shenxin-favs-v1";
export const FAV_EVENT = "shenxin-favs";

export type FavRoom = "anshen" | "jieyu" | "anmei" | "yali";
export type FavItem = { key: string; room: FavRoom; anchor: string; title: (c: Copy) => string };

const item = (room: FavRoom, anchor: string, title: (c: Copy) => string): FavItem => ({ key: `${room}#${anchor}`, room, anchor, title });

export const FAV_ITEMS: readonly FavItem[] = [
  item("anshen", "breath", (c) => c.play.breathSecT),
  item("anshen", "follow", (c) => c.anshen.follow.title),
  item("anshen", "worry", (c) => c.anshen.worryT),
  item("anshen", "pmr", (c) => c.anshen.pmrT),
  item("anshen", "points", (c) => c.anshen.pointsT),
  item("anshen", "scan", (c) => c.anshen.scanT),
  item("jieyu", "breath", (c) => c.play.breathSecT),
  item("jieyu", "follow", (c) => c.jieyu.follow.title),
  item("jieyu", "steps", (c) => c.jieyu.stepsT),
  item("jieyu", "ba", (c) => c.jieyu.baT),
  item("jieyu", "weather", (c) => c.jieyu.weatherT),
  item("anmei", "breath", (c) => c.play.breathSecT),
  item("anmei", "sheep", (c) => c.anmei.sheepT),
  item("anmei", "follow", (c) => c.anmei.follow.title),
  item("anmei", "quiz", (c) => c.anmei.quizT),
  item("anmei", "cbti", (c) => c.anmei.cbtiT),
  item("anmei", "hygiene", (c) => c.anmei.hyT),
  item("anmei", "yangsheng", (c) => c.anmei.ysT),
  item("anmei", "diary", (c) => c.anmei.diaryT),
  item("yali", "breath", (c) => c.play.breathSecT),
  item("yali", "follow", (c) => c.yali.follow.title),
  item("yali", "feel", (c) => c.yali.feelT),
  item("yali", "shoulder", (c) => c.yali.shoulderT),
  item("yali", "park", (c) => c.yali.parkT),
  item("yali", "stand", (c) => c.yali.stand.title),
  item("yali", "friend", (c) => c.yali.friend.title),
  item("yali", "micro", (c) => c.yali.micro.title),
  item("yali", "trace", (c) => c.yali.trace.title),
  item("yali", "handover", (c) => c.yali.handover.title),
  item("yali", "bodymap", (c) => c.yali.bodymap.title),
  item("yali", "colourhunt", (c) => c.yali.hunt.title),
];

const KNOWN = new Set(FAV_ITEMS.map((i) => i.key));

/** Parse stored favourites, dropping anything unknown or malformed. */
export function parseFavs(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    if (!Array.isArray(v)) return [];
    return [...new Set(v.filter((k): k is string => typeof k === "string" && KNOWN.has(k)))];
  } catch {
    return [];
  }
}

export function toggleFav(list: readonly string[], key: string): string[] {
  return list.includes(key) ? list.filter((k) => k !== key) : [...list, key];
}

export function loadFavs(): string[] {
  try {
    return parseFavs(localStorage.getItem(FAV_STORAGE_KEY));
  } catch {
    return [];
  }
}

export function saveFavs(list: readonly string[]) {
  try {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* private mode: ignore */
  }
  try {
    window.dispatchEvent(new Event(FAV_EVENT));
  } catch {
    /* ignore */
  }
}

export const FAV_UI: Record<Lang, { add: (t: string) => string; remove: (t: string) => string; kicker: string; title: string; empty: string; note: string; clear: string }> = {
  yue: {
    add: (t) => `收藏「${t}」`,
    remove: (t) => `取消收藏「${t}」`,
    kicker: "我的收藏",
    title: "鍾意嘅練習",
    empty: "仲未收藏任何練習，見到鍾意嘅撳一下星星就得。",
    note: "只會儲喺你部機度，唔會傳去任何地方。",
    clear: "清除全部",
  },
  cmn: {
    add: (t) => `收藏「${t}」`,
    remove: (t) => `取消收藏「${t}」`,
    kicker: "我的收藏",
    title: "喜歡的練習",
    empty: "還沒有收藏任何練習，看到喜歡的按一下星星就可以。",
    note: "只會儲存在你的裝置上，不會傳到任何地方。",
    clear: "清除全部",
  },
  en: {
    add: (t) => `Save “${t}” to favourites`,
    remove: (t) => `Remove “${t}” from favourites`,
    kicker: "My favourites",
    title: "Practices you like",
    empty: "Nothing saved yet. Tap the star on any practice you like.",
    note: "Saved only on this device, never sent anywhere.",
    clear: "Clear all",
  },
};
