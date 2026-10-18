import type { Lang } from "@/i18n/copy";

/**
 * Room music catalogue (2026-10, live).
 * Every room offers exactly one Chinese (中樂) and one Western (西樂) track.
 * On entry a room DEFAULTS to its Chinese guqin track (player attempts autoplay;
 * if the browser blocks it, playback starts on the first tap/keypress — see
 * room-music.tsx). The visitor can switch to Western or mute for that room visit.
 * All four Western tracks are genuinely DIFFERENT compositions — workId encodes
 * the parent work so no two rooms share one: Goldberg Variations appears ONLY
 * as the Aria (安神). Composers: Bach (x2 rooms, different works), Chopin, Satie.
 * Both composition and recording are licence-verified — see docs/yali-music-licences.md.
 * Chinese tracks keep each room's existing guqin recording and licence/credit.
 * Track titles/hints carry no efficacy promise: tempo/timbre/length only.
 * Homepage (clinician override 2026-10-18): ONLY the pre-existing Canon track
 * (`public/audio/calm.mp3`) — no Chinese/Western choice there. It shares the
 * same single player; entering a room stops it and the room default takes over.
 */
export type MusicRoom = "anshen" | "jieyu" | "anmei" | "yali";
/** Pages with music: the four rooms plus the homepage (single Canon track). */
export type MusicContext = MusicRoom | "home";
export type MusicGroup = "cn" | "west" | "home";

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

/** The track a music context starts with: rooms → Chinese guqin; homepage → its sole Canon track. */
export function defaultTrackFor(context: MusicContext): MusicTrack {
  if (context === "home") return HOME_MUSIC.tracks[0];
  return defaultTrack(context);
}

/** Track list + credit for any music context (room or homepage). */
export function musicSetFor(context: MusicContext): { tracks: MusicTrack[]; credit: Record<Lang, string> } {
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
    yue: "鋼琴 · 約 3 分鐘 · 很慢，音符疏落、安靜",
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
 * Homepage music: exactly ONE track, the site's pre-existing Canon file restored
 * as it was before the legacy AmbientMusic removal. No 中樂／西樂 choice here.
 * Credit wording is the site's previous homepage credit (composition public
 * domain; the recording's provenance was never documented in this repo — see
 * docs/yali-music-licences.md flag).
 */
export const HOME_MUSIC: { tracks: MusicTrack[]; credit: Record<Lang, string> } = {
  tracks: [
    {
      id: "canon",
      src: "/audio/calm.mp3",
      group: "home",
      composer: "Johann Pachelbel",
      workId: "pachelbel-canon-in-d",
      title: { yue: "Pachelbel《D 大調卡農》", cmn: "Pachelbel《D 大调卡农》", en: "Pachelbel · Canon in D" },
      hint: {
        yue: "鋼琴 · 約 7 分半鐘 · 慢，規律循環",
        cmn: "钢琴 · 约 7 分半钟 · 慢，规律循环",
        en: "Piano · about 7½ min · slow, steady loop",
      },
    },
  ],
  credit: {
    yue: "背景樂：Pachelbel《D 大調卡農》鋼琴，公有領域。",
    cmn: "背景乐：Pachelbel《D 大调卡农》钢琴，公有领域。",
    en: "Music: Pachelbel’s Canon in D, piano, public domain.",
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
    homeLead: string;
    homeSafety: string;
  }
> = {
  yue: {
    music: "音樂",
    sectionK: "聽一段",
    sectionT: "靜音樂",
    lead: "入房會先播中樂（古琴）。瀏覽器若擋住自動播放，會喺你第一次撳頁面或者㩒鍵時開始。可以隨時轉西樂，或者撳靜音。",
    safety: "對聲音敏感，隨時撳靜音；撳咗之後今次入房唔會再自動播。",
    cn: "中樂 · 古琴",
    west: "西樂 · 鋼琴",
    mute: "靜音",
    play: "播放",
    stop: "停止音樂",
    now: "播放緊：",
    vol: "音量",
    openPanel: "用頁頂音樂掣揀歌",
    homeLead: "首頁會先播 Pachelbel《D 大調卡農》。瀏覽器若擋住自動播放，會喺你第一次撳頁面或者㩒鍵時開始。可以隨時撳靜音，入房就會轉用嗰間房嘅音樂。",
    homeSafety: "對聲音敏感，隨時撳靜音；撳咗之後今次喺首頁唔會再自動播。",
  },
  cmn: {
    music: "音樂",
    sectionK: "聽一段",
    sectionT: "靜音樂",
    lead: "入房會先播中樂（古琴）。瀏覽器若擋住自動播放，會在你第一次按頁面或者按鍵時開始。可以隨時轉西樂，或者按靜音。",
    safety: "對聲音敏感，隨時按靜音；按了之後今次入房不會再自動播放。",
    cn: "中樂 · 古琴",
    west: "西樂 · 鋼琴",
    mute: "靜音",
    play: "播放",
    stop: "停止音樂",
    now: "正在播放：",
    vol: "音量",
    openPanel: "用頁頂音樂按鈕選曲",
    homeLead: "首页会先播 Pachelbel《D 大调卡农》。浏览器若挡住自动播放，会在你第一次按页面或者按键时开始。可以随时按静音，进入房间就会改用那间房的音乐。",
    homeSafety: "对声音敏感，随时按静音；按了之后这次在首页不会再自动播放。",
  },
  en: {
    music: "Music",
    sectionK: "Listen",
    sectionT: "Quiet music",
    lead: "Each room starts with its Chinese guqin track. If your browser blocks autoplay, it starts on your first tap or key press on the page. Switch to Western music or press mute any time.",
    safety: "If you are sensitive to sound, press mute any time; it will not restart during this room visit.",
    cn: "Chinese · guqin",
    west: "Western · piano",
    mute: "Mute",
    play: "Play",
    stop: "Stop music",
    now: "Playing: ",
    vol: "Volume",
    openPanel: "Use the music button at the top to choose",
    homeLead: "The homepage starts with Pachelbel's Canon in D. If your browser blocks autoplay, it starts on your first tap or key press on the page. Press mute any time; entering a room switches to that room's music.",
    homeSafety: "If you are sensitive to sound, press mute any time; it will not restart during this homepage visit.",
  },
};

export function roomFromPath(path: string): MusicRoom | null {
  if (path.startsWith("/anshen")) return "anshen";
  if (path.startsWith("/jieyu")) return "jieyu";
  if (path.startsWith("/anmei")) return "anmei";
  if (path.startsWith("/yali")) return "yali";
  return null;
}

/** Music context for a path: "/" is the homepage (single Canon), rooms are themselves, else none. */
export function contextFromPath(path: string): MusicContext | null {
  if (path === "/") return "home";
  return roomFromPath(path);
}
