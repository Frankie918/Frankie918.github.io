import type { Lang } from "@/i18n/copy";

/**
 * 首頁四格漫畫（2026-10）：放喺首頁，四主題輪住逢周六更新，
 * 每周只換一張，唔再喺四間房各放一格。
 * 加新漫畫：喺 COMICS 陣列頂部（或任意位置）加一筆，published 用 ISO 日期，
 * currentComic() 會揀最新嗰張。
 */
export type ComicTheme = "anshen" | "jieyu" | "anmei" | "yali";

export type ComicText = { yue: string; cmn: string; en: string };

export type ComicEntry = {
  id: string;
  theme: ComicTheme;
  /** Public path, may include ?v= cache buster. */
  image: string;
  /** ISO date (YYYY-MM-DD); newest wins as the featured comic. */
  published: string;
  title: ComicText;
  alt: ComicText;
};

/** Rotation order for planning future weeks: 安神 → 解鬱 → 安寐 → 舒壓. */
export const COMIC_THEME_ORDER: readonly ComicTheme[] = [
  "anshen",
  "jieyu",
  "anmei",
  "yali",
] as const;

export const COMIC_THEME_ROOM: Record<ComicTheme, "/anshen" | "/jieyu" | "/anmei" | "/yali"> = {
  anshen: "/anshen",
  jieyu: "/jieyu",
  anmei: "/anmei",
  yali: "/yali",
};

/**
 * Catalog. Current featured: 安神「學識放下，孑然一身」; prior 舒壓「打工仔，放鬆啲」.
 * Next weeks can add anshen / jieyu / anmei entries without touching the rooms.
 */
export const COMICS: readonly ComicEntry[] = [
  {
    id: "cloud-no-rush",
    theme: "anshen",
    image: "/comics/cloud-no-rush.jpg?v=1",
    published: "2026-11-01",
    title: {
      yue: "學識放下，孑然一身 · 阿力同豆豆",
      cmn: "學識放下，孑然一身 · 阿力與豆豆",
      en: "Clouds don’t rush · Alex & Dodo",
    },
    alt: {
      yue: "四格漫畫：阿力坐喺霧山邊，話心跳嚟跳去停唔到；豆豆叫佢唔使趕，坐一陣睇下雲；阿力問係咪只係睇，豆豆應嗯；最後阿力話靜咗少少，豆豆話慢慢嚟就得。",
      cmn: "四格漫畫：阿力坐在霧山邊，說心跳來跳去停不了；豆豆叫他不用趕，坐一会儿看看云；阿力问是不是只是看，豆豆应嗯；最后阿力说静了一点点，豆豆说慢慢来就行。",
      en: "Four-panel comic: Alex sits by misty mountains; his heart won’t settle. Dodo says no rush—sit and watch the clouds. Alex asks if it’s just looking; Dodo says mm. Alex notices a little quiet; Dodo says slow is enough.",
    },
  },
  {
    id: "office-kids-loosen-up",
    theme: "yali",
    image: "/comics/office-kids-loosen-up.jpg?v=2",
    published: "2026-10-25",
    title: {
      yue: "打工仔，放鬆啲 · 阿力同豆豆",
      cmn: "打工仔，放鬆啲 · 阿力與豆豆",
      en: "Office kids, loosen up · Alex & Dodo",
    },
    alt: {
      yue: "四格漫畫：阿力同豆豆喺寫字樓後樓梯。阿力話膊頭硬到好似石屎；豆豆話佢係凍親嘅蛋撻，叫佢試下放鬆下個膊頭；阿力試住放低；豆豆話打工仔放鬆啲——工作唔會因為你鬆咗就完唔到。",
      cmn: "四格漫畫：阿力與豆豆在寫字樓後樓梯。阿力說肩膀硬得像混凝土；豆豆說他是涼了的蛋撻，叫他試著放鬆一下肩膀；阿力試著放下；豆豆說打工仔，放鬆啲——工作不會因為你鬆了就做不完。",
      en: "Four-panel comic: Alex and Dodo on an office back stair. Alex says his shoulders are as hard as concrete; Dodo says he is a chilled egg tart and tells him to try easing his shoulders; Alex tries; Dodo says office kids, loosen up—the work will not fail just because you eased up.",
    },
  },
];

/** Latest comic by published date (stable tie-break by id). */
export function currentComic(list: readonly ComicEntry[] = COMICS): ComicEntry {
  if (list.length === 0) {
    throw new Error("COMICS is empty");
  }
  return [...list].sort((a, b) => {
    const byDate = b.published.localeCompare(a.published);
    return byDate !== 0 ? byDate : b.id.localeCompare(a.id);
  })[0]!;
}

export function comicText(text: ComicText, lang: Lang): string {
  return text[lang];
}

/** Suggest the next theme in the weekly rotation after the given one. */
export function nextComicTheme(theme: ComicTheme): ComicTheme {
  const i = COMIC_THEME_ORDER.indexOf(theme);
  return COMIC_THEME_ORDER[(i < 0 ? 0 : i + 1) % COMIC_THEME_ORDER.length]!;
}
