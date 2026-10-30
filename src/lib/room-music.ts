import type { Lang } from "@/i18n/copy";

/**
 * Room music catalogue (2026-10, live).
 * Every room offers exactly one Chinese (中樂) and one Western (西樂) track.
 * On entry a room defaults to the visitor's REMEMBERED music group for this
 * device/browser (localStorage, see MUSIC_GROUP_STORAGE_KEY below): no stored
 * value → its Chinese guqin track; stored Western → that room's own Western
 * track; stored muted → silence. The player attempts autoplay; if the browser
 * blocks it, playback starts on the first tap/keypress (see room-music.tsx).
 * The preference is GLOBAL across all four rooms (one device preference, not
 * per-room): each room still plays its own track within the remembered group.
 * All four Western tracks are genuinely DIFFERENT compositions — workId encodes
 * the parent work so no two rooms share one: Goldberg Variations appears ONLY
 * as the Aria (安神). Composers: Bach (x2 rooms, different works), Chopin, Satie.
 * Both composition and recording are licence-verified — see docs/yali-music-licences.md.
 * Chinese tracks keep each room's existing guqin recording and licence/credit.
 * Track titles/hints carry no efficacy promise: tempo/timbre/length only.
 * Homepage: ONLY one quiet piano track (`public/audio/when-the-sky-rests.mp3`,
 * Matthew C. Wright, CC BY 4.0) — no Chinese/Western choice there. It shares
 * the same single player; entering a room stops it and the room default takes
 * over. Previous `canon-soft.mp3` and older `calm.mp3` are kept for rollback.
 */
export type MusicRoom = "anshen" | "jieyu" | "anmei" | "yali";
/** Pages with music: the four rooms plus the homepage (single quiet piano track). */
export type MusicContext = MusicRoom | "home";
export type MusicGroup = "cn" | "west" | "home";

/**
 * Remembered music preference for THIS device/browser only (no server, no
 * personal data; cleared with the browser's site data). Values are the full
 * words required by the clinician request (2026-10-18), distinct from the
 * per-track MusicGroup codes above. "muted" is stored too, so a visitor who
 * pressed 靜音 stays silent on re-entry until they pick a track again.
 * Homepage track is unaffected as a choice: playing it never overwrites the
 * remembered room group (preferenceForTrack returns null for it), though
 * muting on the homepage stores "muted" globally, like muting anywhere.
 */
export const MUSIC_GROUP_STORAGE_KEY = "shenxin-music-group";
export type MusicPreference = "chinese" | "western" | "muted";

/** Stored value → preference. Anything missing/invalid falls back to Chinese (the original default). */
export function parseMusicPreference(value: unknown): MusicPreference {
  return value === "western" || value === "muted" ? value : "chinese";
}

/** Preference implied by explicitly picking a track; homepage track has none (null = keep remembered group). */
export function preferenceForTrack(track: MusicTrack): MusicPreference | null {
  if (track.group === "cn") return "chinese";
  if (track.group === "west") return "western";
  return null;
}

type MusicPreferenceStorage = Pick<Storage, "getItem" | "setItem">;

function defaultStorage(): MusicPreferenceStorage | null {
  try {
    return typeof localStorage !== "undefined" ? localStorage : null;
  } catch {
    return null;
  }
}

/** Read the remembered preference (client-only effect code; SSR/prerender-safe, never throws). */
export function readMusicPreference(storage?: MusicPreferenceStorage | null): MusicPreference {
  try {
    const store = storage ?? defaultStorage();
    if (!store) return "chinese";
    return parseMusicPreference(store.getItem(MUSIC_GROUP_STORAGE_KEY));
  } catch {
    return "chinese";
  }
}

/** Persist the remembered preference immediately; private-mode/quota errors are ignored. */
export function writeMusicPreference(preference: MusicPreference, storage?: MusicPreferenceStorage | null): void {
  try {
    const store = storage ?? defaultStorage();
    if (!store) return;
    store.setItem(MUSIC_GROUP_STORAGE_KEY, preference);
  } catch {
    /* ignore */
  }
}

/** The track a room starts with for a remembered preference (muted is handled by the player, which starts nothing). */
export function trackForPreference(room: MusicRoom, preference: MusicPreference): MusicTrack {
  const group = preference === "western" ? "west" : "cn";
  const t = ROOM_MUSIC[room].tracks.find((x) => x.group === group);
  if (!t) throw new Error(`room ${room} has no ${group} track`);
  return t;
}

export type MusicTrack = {
  id: string;
  src: string;
  group: MusicGroup;
  /** Composer (Western) or tradition/source (Chinese) — used to prove distinct works. */
  composer: string;
  /** Parent composition ID. No two Western tracks may share a workId. */
  workId: string;
  title: Record<Lang, string>;
  hint: Record<Lang, string>;
};

/** The track a room starts with on entry: its Chinese guqin track. */
export function defaultTrack(room: MusicRoom): MusicTrack {
  const t = ROOM_MUSIC[room].tracks.find((x) => x.group === "cn");
  if (!t) throw new Error(`room ${room} has no Chinese default track`);
  return t;
}

/** The track a music context starts with: rooms → the room's track in the remembered group (default Chinese guqin); homepage → its sole track, regardless of the room group preference. */
export function defaultTrackFor(context: MusicContext, preference: MusicPreference = "chinese"): MusicTrack {
  if (context === "home") return HOME_MUSIC.tracks[0];
  return trackForPreference(context, preference);
}

/** Track list + credit for any music context (room or homepage). */
export function musicSetFor(context: MusicContext): { tracks: MusicTrack[]; credit?: Record<Lang, string> } {
  return context === "home" ? HOME_MUSIC : ROOM_MUSIC[context];
}

export type RoomMusic = {
  room: MusicRoom;
  tracks: MusicTrack[];
  /** Attribution for this room's tracks, shown under the player and in the floating panel. */
  credit: Record<Lang, string>;
};

const ARIA: MusicTrack = {
  id: "aria",
  src: "/audio/yali/aria.mp3",
  group: "west",
  composer: "J.S. Bach",
  workId: "bach-goldberg-variations-bwv988",
  title: {
    yue: "巴赫《哥德堡變奏曲》詠歎調",
    cmn: "巴赫《哥德堡變奏曲》詠歎調",
    en: "Bach · Goldberg Variations, Aria",
  },
  hint: {
    yue: "鋼琴 · 約 5 分鐘 · 慢，規律",
    cmn: "鋼琴 · 約 5 分鐘 · 慢，規律",
    en: "Piano · about 5 min · slow, steady",
  },
};

const PRELUDE: MusicTrack = {
  id: "prelude",
  src: "/audio/yali/prelude.mp3",
  group: "west",
  composer: "J.S. Bach",
  workId: "bach-well-tempered-clavier-bwv846",
  title: {
    yue: "巴赫《平均律》C 大調前奏曲",
    cmn: "巴赫《平均律》C 大調前奏曲",
    en: "Bach · Prelude in C major (Well-Tempered Clavier I)",
  },
  hint: {
    yue: "鋼琴 · 約 3 分鐘 · 分解和弦，好似呼吸咁起落",
    cmn: "鋼琴 · 約 3 分鐘 · 分解和弦，像呼吸般起落",
    en: "Piano · about 3 min · broken chords that rise and fall like breath",
  },
};

const NOCTURNE: MusicTrack = {
  id: "nocturne",
  src: "/audio/yali/chopin-nocturne.mp3",
  group: "west",
  composer: "Frédéric Chopin",
  workId: "chopin-nocturne-op9-no2",
  title: {
    yue: "蕭邦《夜曲》降E大調 Op. 9 No. 2",
    cmn: "蕭邦《夜曲》降E大調 Op. 9 No. 2",
    en: "Chopin · Nocturne in E-flat major, Op. 9 No. 2",
  },
  hint: {
    yue: "鋼琴 · 約 4 分半鐘 · 慢，旋律柔和、稍明亮",
    cmn: "鋼琴 · 約 4 分半鐘 · 慢，旋律柔和、稍明亮",
    en: "Piano · about 4½ min · slow, soft and slightly brighter melody",
  },
};

const GYMNOPEDIE: MusicTrack = {
  id: "gymnopedie",
  src: "/audio/yali/satie-gymnopedie.mp3",
  group: "west",
  composer: "Erik Satie",
  workId: "satie-gymnopedie-no1",
  title: {
    yue: "薩蒂《吉姆諾佩迪》第一首",
    cmn: "薩蒂《吉姆諾佩迪》第一首",
    en: "Satie · Gymnopédie No. 1",
  },
  hint: {
    yue: "鋼琴 · 約 3 分鐘 · 好慢，音符疏落、安靜",
    cmn: "鋼琴 · 約 3 分鐘 · 很慢，音符疏落、安靜",
    en: "Piano · about 3 min · very slow, sparse and quiet",
  },
};

const CHOPIN_CREDIT: Record<Lang, string> = {
  yue: "鋼琴錄音：Frank Lévy 演奏，Musopen《Set Chopin Free》，公有領域；蕭邦樂曲屬公有領域。",
  cmn: "鋼琴錄音：Frank Lévy 演奏，Musopen《Set Chopin Free》，公有領域；蕭邦樂曲屬公有領域。",
  en: "Piano: Frank Lévy, Musopen “Set Chopin Free”, public domain; Chopin's music is in the public domain.",
};

const SATIE_CREDIT: Record<Lang, string> = {
  yue: "鋼琴錄音：Robin Alciatore 演奏，Musopen，公有領域；薩蒂樂曲屬公有領域。",
  cmn: "鋼琴錄音：Robin Alciatore 演奏，Musopen，公有領域；薩蒂樂曲屬公有領域。",
  en: "Piano: Robin Alciatore, Musopen, public domain; Satie's music is in the public domain.",
};

const PIANO_CREDIT: Record<Lang, string> = {
  yue: "鋼琴錄音：Kimiko Ishizaka 演奏，CC0；巴赫樂曲屬公有領域。",
  cmn: "鋼琴錄音：Kimiko Ishizaka 演奏，CC0；巴赫樂曲屬公有領域。",
  en: "Piano: Kimiko Ishizaka, CC0; Bach's music is in the public domain.",
};

export const ROOM_MUSIC: Record<MusicRoom, RoomMusic> = {
  anshen: {
    room: "anshen",
    tracks: [
      {
        id: "pingsha",
        composer: "Traditional guqin",
        workId: "guqin-pingsha-luoyan",
        src: "/audio/pingsha.mp3",
        group: "cn",
        title: { yue: "《平沙落雁》", cmn: "《平沙落雁》", en: "Pingsha Luoyan" },
        hint: {
          yue: "古琴 · 約 7 分鐘 · 慢，起伏細",
          cmn: "古琴 · 約 7 分鐘 · 慢，起伏細",
          en: "Guqin · about 7 min · slow, small rises and falls",
        },
      },
      ARIA,
    ],
    credit: {
      yue: `古琴錄音：Charlie Huang 演奏，維基共享資源，CC BY 2.5。${PIANO_CREDIT.yue}`,
      cmn: `古琴錄音：Charlie Huang 演奏，維基共享資源，CC BY 2.5。${PIANO_CREDIT.cmn}`,
      en: `Guqin: Charlie Huang, Wikimedia Commons, CC BY 2.5. ${PIANO_CREDIT.en}`,
    },
  },
  jieyu: {
    room: "jieyu",
    tracks: [
      {
        id: "yangguan",
        composer: "Traditional guqin",
        workId: "guqin-yangguan-sandie",
        src: "/audio/yangguan.mp3",
        group: "cn",
        title: { yue: "《陽關三疊》", cmn: "《陽關三疊》", en: "Yangguan Sandie" },
        hint: {
          yue: "古琴 · 約 6 分鐘 · 慢，送別調",
          cmn: "古琴 · 約 6 分鐘 · 慢，送別調",
          en: "Guqin · about 6 min · slow farewell tune",
        },
      },
      NOCTURNE,
    ],
    credit: {
      yue: `古琴錄音：Charlie Huang（Charles R Tsua）演奏，維基共享資源，CC BY-SA 3.0。${CHOPIN_CREDIT.yue}`,
      cmn: `古琴錄音：Charlie Huang（Charles R Tsua）演奏，維基共享資源，CC BY-SA 3.0。${CHOPIN_CREDIT.cmn}`,
      en: `Guqin: Charlie Huang (Charles R Tsua), Wikimedia Commons, CC BY-SA 3.0. ${CHOPIN_CREDIT.en}`,
    },
  },
  anmei: {
    room: "anmei",
    tracks: [
      {
        id: "zuiyu",
        composer: "Traditional guqin",
        workId: "guqin-zuiyu-changwan",
        src: "/audio/zuiyu.mp3",
        group: "cn",
        title: { yue: "《醉漁唱晚》", cmn: "《醉漁唱晚》", en: "Zuiyu Changwan" },
        hint: {
          yue: "古琴 · 約 5 分鐘 · 慢，聲線低",
          cmn: "古琴 · 約 5 分鐘 · 慢，聲線低",
          en: "Guqin · about 5 min · slow, low register",
        },
      },
      GYMNOPEDIE,
    ],
    credit: {
      yue: `古琴錄音：Charlie Huang（Charles R Tsua）演奏，維基共享資源，CC BY-SA 3.0。${SATIE_CREDIT.yue}`,
      cmn: `古琴錄音：Charlie Huang（Charles R Tsua）演奏，維基共享資源，CC BY-SA 3.0。${SATIE_CREDIT.cmn}`,
      en: `Guqin: Charlie Huang (Charles R Tsua), Wikimedia Commons, CC BY-SA 3.0. ${SATIE_CREDIT.en}`,
    },
  },
  yali: {
    room: "yali",
    // Exactly one Chinese + one Western. Chinese: 《孔子讀易》, chosen by the
    // clinician 2026-10-18; 《佩蘭》 is kept out of this room's list.
    // Western: clinician-preferred Prelude BWV 846.
    tracks: [
      {
        id: "kongzi",
        composer: "Traditional guqin",
        workId: "guqin-kongzi-duyi",
        src: "/audio/yali/kongzi.mp3",
        group: "cn",
        title: {
          yue: "《孔子讀易》",
          cmn: "《孔子讀易》",
          en: "Kongzi Duyi (Confucius Reads the Book of Changes)",
        },
        hint: {
          yue: "古琴 · 約 6 分鐘 · 慢而沉",
          cmn: "古琴 · 約 6 分鐘 · 慢而沉",
          en: "Guqin · about 6 min · slow and low",
        },
      },
      PRELUDE,
    ],
    credit: {
      yue: "古琴錄音：Charlie Huang 演奏，維基共享資源，CC BY 2.5；樂曲出自《天聞閣琴譜》（1876），屬公有領域。鋼琴錄音：Kimiko Ishizaka 演奏（Open Well-Tempered Clavier），CC0 公有領域貢獻；巴赫樂曲屬公有領域。本站已轉檔、修剪首尾靜音、統一音量並加淡入淡出。",
      cmn: "古琴錄音：Charlie Huang 演奏，維基共享資源，CC BY 2.5；樂曲出自《天聞閣琴譜》（1876），屬公有領域。鋼琴錄音：Kimiko Ishizaka 演奏（Open Well-Tempered Clavier），CC0 公有領域貢獻；巴赫樂曲屬公有領域。本站已轉檔、修剪首尾靜音、統一音量並加淡入淡出。",
      en: "Guqin recording: performed by Charlie Huang, Wikimedia Commons, CC BY 2.5; the piece comes from the Tianwen Ge Qinpu (1876) and is in the public domain. Piano recording: Kimiko Ishizaka (Open Well-Tempered Clavier), CC0 public-domain dedication; Bach's music is in the public domain. This site transcoded the file, trimmed silence, matched loudness and added fades.",
    },
  },
};

/**
 * Homepage music: exactly ONE track — Matthew C. Wright's When the Sky Rests
 * (CC BY 4.0; replaces Kevin MacLeod Canon / older calm.mp3, both kept in
 * public/audio/ for rollback). No 中樂／西樂 choice here. Credit is shown in
 * the floating panel and homepage footer (CC BY attribution required).
 */
export const HOME_MUSIC: { tracks: MusicTrack[]; credit: Record<Lang, string> } = {
  tracks: [
    {
      id: "sky-rests",
      src: "/audio/when-the-sky-rests.mp3",
      group: "home",
      composer: "Matthew C. Wright",
      workId: "matthew-c-wright-when-the-sky-rests",
      title: { yue: "Wright《When the Sky Rests》", cmn: "Wright《When the Sky Rests》", en: "Wright · When the Sky Rests" },
      hint: {
        yue: "慢速鋼琴 · 約 5 分半 · 疏、靜",
        cmn: "慢速钢琴 · 约 5 分半 · 疏、静",
        en: "Slow piano · about 5½ min · sparse and quiet",
      },
    },
  ],
  credit: {
    yue: "Music by Matthew C. Wright (matthewcwright.com), Licensed under CC BY 4.0。",
    cmn: "Music by Matthew C. Wright (matthewcwright.com), Licensed under CC BY 4.0。",
    en: "Music by Matthew C. Wright (matthewcwright.com), Licensed under CC BY 4.0.",
  },
};

export const MUSIC_UI: Record<
  Lang,
  {
    music: string;
    sectionK: string;
    sectionT: string;
    lead: string;
    safety: string;
    cn: string;
    west: string;
    mute: string;
    play: string;
    stop: string;
    now: string;
    vol: string;
    openPanel: string;
  }
> = {
  yue: {
    music: "音樂",
    sectionK: "聽一段",
    sectionT: "靜音樂",
    lead: "入房會播返你上次揀嗰類音樂（未揀過就先播中樂古琴），呢部裝置會記住。瀏覽器若擋住自動播放，會喺你第一次撳頁面或者㩒鍵時開始。可以隨時轉西樂，或者撳靜音。",
    safety: "對聲音敏感，隨時撳靜音；撳咗之後再入房都唔會自動播，直到你再揀音樂。",
    cn: "中樂 · 古琴",
    west: "西樂 · 鋼琴",
    mute: "靜音",
    play: "播放",
    stop: "停止音樂",
    now: "播放緊：",
    vol: "音量",
    openPanel: "用頁頂音樂掣揀歌",
  },
  cmn: {
    music: "音樂",
    sectionK: "聽一段",
    sectionT: "靜音樂",
    lead: "入房會播回你上次選的那類音樂（未選過就先播中樂古琴），這部裝置會記住。瀏覽器若擋住自動播放，會在你第一次按頁面或者按鍵時開始。可以隨時轉西樂，或者按靜音。",
    safety: "對聲音敏感，隨時按靜音；按了之後再入房都不會自動播放，直到你再選音樂。",
    cn: "中樂 · 古琴",
    west: "西樂 · 鋼琴",
    mute: "靜音",
    play: "播放",
    stop: "停止音樂",
    now: "正在播放：",
    vol: "音量",
    openPanel: "用頁頂音樂按鈕選曲",
  },
  en: {
    music: "Music",
    sectionK: "Listen",
    sectionT: "Quiet music",
    lead: "Each room starts with the kind of music you last chose on this device (Chinese guqin if you have not chosen yet). If your browser blocks autoplay, it starts on your first tap or key press on the page. Switch to Western music or press mute any time.",
    safety: "If you are sensitive to sound, press mute any time; it will not restart on re-entry either, until you choose music again.",
    cn: "Chinese · guqin",
    west: "Western · piano",
    mute: "Mute",
    play: "Play",
    stop: "Stop music",
    now: "Playing: ",
    vol: "Volume",
    openPanel: "Use the music button at the top to choose",
  },
};

export function roomFromPath(path: string): MusicRoom | null {
  if (path.startsWith("/anshen")) return "anshen";
  if (path.startsWith("/jieyu")) return "jieyu";
  if (path.startsWith("/anmei")) return "anmei";
  if (path.startsWith("/yali")) return "yali";
  return null;
}

/** Music context for a path: "/" is the homepage (single quiet piano), rooms are themselves, else none. */
export function contextFromPath(path: string): MusicContext | null {
  if (path === "/") return "home";
  return roomFromPath(path);
}
