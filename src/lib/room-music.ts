import type { Lang } from "@/i18n/copy";

/**
 * Room music catalogue (2026-10, live).
 * Every room offers exactly one Chinese (中樂) and one Western (西樂) track;
 * all four Western tracks are different. Visitors choose, nothing autoplays.
 * Western tracks: only Bach recordings where BOTH composition (public domain) and recording
 * (Kimiko Ishizaka, CC0) are documented — see docs/yali-music-licences.md.
 * Chinese tracks keep each room's existing guqin recording and licence/credit.
 * Track titles carry no efficacy promise: hints describe tempo/timbre/length only.
 */
export type MusicRoom = "anshen" | "jieyu" | "anmei" | "yali";
export type MusicGroup = "cn" | "west";

export type MusicTrack = {
  id: string;
  src: string;
  group: MusicGroup;
  title: Record<Lang, string>;
  hint: Record<Lang, string>;
};

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

const VAR13: MusicTrack = {
  id: "var13",
  src: "/audio/yali/var13.mp3",
  group: "west",
  title: {
    yue: "巴赫《哥德堡變奏曲》第13變奏",
    cmn: "巴赫《哥德堡變奏曲》第13變奏",
    en: "Bach · Goldberg Variations, Variation 13",
  },
  hint: {
    yue: "鋼琴 · 約 4 分鐘 · 慢，薩拉邦德舞步",
    cmn: "鋼琴 · 約 4 分鐘 · 慢，薩拉邦德舞步",
    en: "Piano · about 4 min · slow sarabande step",
  },
};

const VAR25: MusicTrack = {
  id: "var25",
  src: "/audio/yali/var25.mp3",
  group: "west",
  title: {
    yue: "巴赫《哥德堡變奏曲》第25變奏",
    cmn: "巴赫《哥德堡變奏曲》第25變奏",
    en: "Bach · Goldberg Variations, Variation 25",
  },
  hint: {
    yue: "鋼琴 · 約 9 分鐘 · 很慢，音符疏落",
    cmn: "鋼琴 · 約 9 分鐘 · 很慢，音符疏落",
    en: "Piano · about 9 min · very slow, sparse notes",
  },
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
        src: "/audio/yangguan.mp3",
        group: "cn",
        title: { yue: "《陽關三疊》", cmn: "《陽關三疊》", en: "Yangguan Sandie" },
        hint: {
          yue: "古琴 · 約 6 分鐘 · 慢，送別調",
          cmn: "古琴 · 約 6 分鐘 · 慢，送別調",
          en: "Guqin · about 6 min · slow farewell tune",
        },
      },
      VAR13,
    ],
    credit: {
      yue: `古琴錄音：Charlie Huang（Charles R Tsua）演奏，維基共享資源，CC BY-SA 3.0。${PIANO_CREDIT.yue}`,
      cmn: `古琴錄音：Charlie Huang（Charles R Tsua）演奏，維基共享資源，CC BY-SA 3.0。${PIANO_CREDIT.cmn}`,
      en: `Guqin: Charlie Huang (Charles R Tsua), Wikimedia Commons, CC BY-SA 3.0. ${PIANO_CREDIT.en}`,
    },
  },
  anmei: {
    room: "anmei",
    tracks: [
      {
        id: "zuiyu",
        src: "/audio/zuiyu.mp3",
        group: "cn",
        title: { yue: "《醉漁唱晚》", cmn: "《醉漁唱晚》", en: "Zuiyu Changwan" },
        hint: {
          yue: "古琴 · 約 5 分鐘 · 慢，聲線低",
          cmn: "古琴 · 約 5 分鐘 · 慢，聲線低",
          en: "Guqin · about 5 min · slow, low register",
        },
      },
      VAR25,
    ],
    credit: {
      yue: `古琴錄音：Charlie Huang（Charles R Tsua）演奏，維基共享資源，CC BY-SA 3.0。${PIANO_CREDIT.yue}`,
      cmn: `古琴錄音：Charlie Huang（Charles R Tsua）演奏，維基共享資源，CC BY-SA 3.0。${PIANO_CREDIT.cmn}`,
      en: `Guqin: Charlie Huang (Charles R Tsua), Wikimedia Commons, CC BY-SA 3.0. ${PIANO_CREDIT.en}`,
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
    lead: "預設靜音。想聽先撳，唔會自動播。可以揀中樂或者西樂。",
    safety: "對聲音敏感，可以唔開。聽到唔舒服，隨時撳靜音。",
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
    lead: "預設靜音。想聽才按，不會自動播放。可以選中樂或者西樂。",
    safety: "對聲音敏感，可以不開。聽起來不舒服，隨時按靜音。",
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
    lead: "Off by default. It plays only if you press play. Choose Chinese or Western music.",
    safety: "If you are sensitive to sound, you can leave it off. Press mute any time it feels uncomfortable.",
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
