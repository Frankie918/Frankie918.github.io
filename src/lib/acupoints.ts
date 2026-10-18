/**
 * 穴位單一資料來源 · Single source of truth for acupoint names, locations and cautions.
 *
 * Every page/component that shows WHERE a point is, or a point-specific caution, must read
 * it from here (via <AcuInfo/>, <AcuPressGrid/> or acuPoint()). Room copy (src/i18n/*) only
 * keeps the room-specific "why / how to use" note for each point, never the location.
 *
 * Body points follow the conventional national-standard / WHO locations
 * (GB/T 12346-2021, WHO Standard Acupuncture Point Locations 2008).
 * Ear points follow GB/T 13734-2008 耳穴名稱與定位.
 *
 * ⚠ CLINICIAN REVIEW (2026-10 reorganisation) — wording chosen where earlier copies conflicted:
 *  - 三陰交 SP6: copies said both 「內踝上三橫指」 and 「內踝上四指、骨後」. Standard is 3 cun above
 *    the medial malleolus tip, posterior to the medial border of the tibia; 3 cun = 四橫指 (一夫法).
 *    Chose 「內踝尖上三寸（約四橫指），脛骨內側緣後方」. Pregnancy caution unified to the stricter
 *    existing wording 「孕婦請勿自行按」 (one card had said 「孕婦避免強刺激」).
 *  - 內關 PC6: copies said 「腕上三橫指」, 「腕上兩寸」, 「腕上三指、兩筋之間」, 「腕上內側」.
 *    Standard 2 cun above the palmar wrist crease between palmaris longus and flexor carpi radialis.
 *    Chose 「腕橫紋上兩寸（約三橫指），兩條筋之間」 (EN previously mixed "two thumb-widths" and
 *    "three finger-widths"; both now stated as 2 cun ≈ three finger-widths).
 *  - 神門 HT7 vs ear 神門 TF4: one anshen map entry merged both 「耳三角窩、腕橫紋尺側」. Now kept
 *    as two separate entries (body: wrist; ear: triangular fossa) shown by map mode.
 *  - 湧泉 KI1: copies said 「足心凹陷」 and 「足底前三分一凹陷」. 「足心」 is folk shorthand; the
 *    standard point sits at the anterior 1/3 of the sole (toe-web to heel line). Chose the latter.
 *  - Ear 肝 CO12: yue/EN copies said 「耳甲艇後上方 / posterior superior cymba」, which is 胰膽 CO11.
 *    GB/T 13734-2008 places 肝 at 耳甲艇後下部. Corrected to the standard.
 *  - Ear 脾 CO13: yue/cmn said 「耳甲腔外上方」, EN said "posterior superior cavum conchae".
 *    Standard 耳甲腔後上部; aligned all three languages to it.
 *  - The SVG dot positions in point-map.tsx / anshen-tools.tsx are schematic and were NOT moved.
 *  - 風池 GB20 / 肩井 GB21 added 2026-10 for 舒壓 on clinician approval: standard locations above;
 *    both gentle-press only, 肩井 also carries the pregnancy caution and must not be pressed deeply.
 */
import type { Lang } from "@/i18n/copy";

type L = Record<Lang, string>;

export type AcuPoint = {
  /** Display name. EN includes the standard code for body points. */
  name: L;
  /** Standard location description, one wording everywhere. */
  loc: L;
  /** Point-specific caution, shown wherever the point's location is shown. */
  caution?: L;
  kind: "body" | "ear";
};

const PREGNANCY: L = {
  yue: "孕婦請勿自行按。",
  cmn: "孕婦請勿自行按。",
  en: "Do not press this yourself in pregnancy.",
};

export const BODY_POINTS = {
  baihui: {
    kind: "body",
    name: { yue: "百會", cmn: "百會", en: "Baihui (GV20)" },
    loc: {
      yue: "頭頂正中，兩耳尖直上連線同頭頂正中線交點。",
      cmn: "頭頂正中，兩耳尖直上連線與頭頂正中線交點。",
      en: "Top of the head, where the line over the head joining the two ear apexes meets the midline.",
    },
  },
  yintang: {
    kind: "body",
    name: { yue: "印堂", cmn: "印堂", en: "Yintang (EX-HN3)" },
    loc: {
      yue: "兩眉頭連線中點。",
      cmn: "兩眉頭連線中點。",
      en: "Midway between the inner ends of the two eyebrows.",
    },
  },
  shenmen: {
    kind: "body",
    name: { yue: "神門", cmn: "神門", en: "Shenmen (HT7)" },
    loc: {
      yue: "腕掌側橫紋、小指一側，尺側腕屈肌腱（小指側嗰條筋）靠拇指一邊嘅凹陷處。",
      cmn: "腕掌側橫紋、小指一側，尺側腕屈肌腱（小指側那條筋）靠拇指一邊的凹陷處。",
      en: "On the palm-side wrist crease, little-finger side, in the hollow just thumb-side of the tendon there (flexor carpi ulnaris).",
    },
  },
  neiguan: {
    kind: "body",
    name: { yue: "內關", cmn: "內關", en: "Neiguan (PC6)" },
    loc: {
      yue: "前臂內側（掌側），腕橫紋上兩寸（約三橫指），兩條筋之間。",
      cmn: "前臂內側（掌側），腕橫紋上二寸（約三橫指），兩條筋之間。",
      en: "Inner (palm-side) forearm, 2 cun (about three finger-widths) above the wrist crease, between the two tendons.",
    },
  },
  taichong: {
    kind: "body",
    name: { yue: "太衝", cmn: "太衝", en: "Taichong (LR3)" },
    loc: {
      yue: "足背，第一、二跖骨結合部前方凹陷處。",
      cmn: "足背，第一、二跖骨結合部前方凹陷處。",
      en: "Top of the foot, in the hollow just in front of where the first and second metatarsal bones meet.",
    },
  },
  sanyinjiao: {
    kind: "body",
    name: { yue: "三陰交", cmn: "三陰交", en: "Sanyinjiao (SP6)" },
    loc: {
      yue: "小腿內側，內踝尖上三寸（約四橫指），脛骨內側緣後方。",
      cmn: "小腿內側，內踝尖上三寸（約四橫指），脛骨內側緣後方。",
      en: "Inner lower leg, 3 cun (about four finger-widths) above the tip of the inner ankle bone, just behind the inner edge of the shinbone.",
    },
    caution: PREGNANCY,
  },
  yongquan: {
    kind: "body",
    name: { yue: "湧泉", cmn: "湧泉", en: "Yongquan (KI1)" },
    loc: {
      yue: "足底，腳趾向下屈時前部嘅凹陷處，約喺第二、三趾趾縫至足跟連線嘅前三分一。",
      cmn: "足底，腳趾向下屈時前部的凹陷處，約在第二、三趾趾縫至足跟連線的前三分之一。",
      en: "On the sole, the hollow that appears in the front part when the toes curl — about one-third of the way from the web of the second and third toes to the heel.",
    },
  },
  hegu: {
    kind: "body",
    name: { yue: "合谷", cmn: "合谷", en: "Hegu (LI4)" },
    loc: {
      yue: "手背虎口，第一、二掌骨之間，約第二掌骨橈側中點。",
      cmn: "手背虎口，第一、二掌骨之間，約第二掌骨橈側中點。",
      en: "Back of the hand, in the web between thumb and index finger, about the middle of the second metacarpal on its thumb side.",
    },
    caution: PREGNANCY,
  },
  fengchi: {
    kind: "body",
    name: { yue: "風池", cmn: "風池", en: "Fengchi (GB20)" },
    loc: {
      yue: "後枕骨下，胸鎖乳突肌同斜方肌之間嘅凹陷處，約同耳珠同一水平。",
      cmn: "後枕骨下，胸鎖乳突肌與斜方肌之間的凹陷處，約與耳垂同一水平。",
      en: "Below the occipital bone, in the depression between the sternocleidomastoid and trapezius muscles, about level with the earlobe.",
    },
    caution: {
      yue: "只可輕按，唔好重按。",
      cmn: "只可輕按，不要重按。",
      en: "Press gently only; do not press heavily.",
    },
  },
  jianjing: {
    kind: "body",
    name: { yue: "肩井", cmn: "肩井", en: "Jianjing (GB21)" },
    loc: {
      yue: "肩部最高處，大椎同肩峰（膊頭尖端）連線中點嘅凹陷處。",
      cmn: "肩部最高處，大椎與肩峰（肩頭尖端）連線中點的凹陷處。",
      en: "Highest point of the shoulder, in the depression at the midpoint of the line joining Dazhui (GV14) and the tip of the shoulder (acromion).",
    },
    caution: {
      yue: "只可輕按，唔好深按或者重按。孕婦請勿自行按。",
      cmn: "只可輕按，不要深按或重按。孕婦請勿自行按。",
      en: "Press gently only; do not press deeply or heavily. Do not press this yourself in pregnancy.",
    },
  },
  qimen: {
    kind: "body",
    name: { yue: "期門", cmn: "期門", en: "Qimen (LR14)" },
    loc: {
      yue: "胸部，乳頭直下，第六肋間隙。",
      cmn: "胸部，乳頭直下，第六肋間隙。",
      en: "On the chest, directly below the nipple, in the sixth intercostal space.",
    },
  },
} satisfies Record<string, AcuPoint>;

export const EAR_POINTS = {
  shenmen: {
    kind: "ear",
    name: { yue: "神門", cmn: "神門", en: "Shenmen (ear)" },
    loc: {
      yue: "耳穴：耳廓三角窩後三分一嘅上部。",
      cmn: "耳穴：耳廓三角窩後三分之一的上部。",
      en: "Ear point: upper part of the back third of the triangular fossa.",
    },
  },
  xin: {
    kind: "ear",
    name: { yue: "心", cmn: "心", en: "Heart (Xin)" },
    loc: { yue: "耳甲腔正中凹陷處。", cmn: "耳甲腔正中凹陷處。", en: "Central hollow of the cavum conchae." },
  },
  pizhixia: {
    kind: "ear",
    name: { yue: "皮質下", cmn: "皮質下", en: "Subcortex" },
    loc: { yue: "對耳屏內側面。", cmn: "對耳屏內側面。", en: "Inner surface of the antitragus." },
  },
  gan: {
    kind: "ear",
    name: { yue: "肝", cmn: "肝", en: "Liver (Gan)" },
    loc: { yue: "耳甲艇後下部。", cmn: "耳甲艇後下部。", en: "Lower back part of the cymba conchae." },
  },
  jiaogan: {
    kind: "ear",
    name: { yue: "交感", cmn: "交感", en: "Sympathetic" },
    loc: {
      yue: "對耳輪下腳前端同耳輪內緣交界處。",
      cmn: "對耳輪下腳前端與耳輪內緣交界處。",
      en: "Where the front end of the inferior antihelix crus meets the inner edge of the helix.",
    },
  },
  zhen: {
    kind: "ear",
    name: { yue: "枕", cmn: "枕", en: "Occiput (Zhen)" },
    loc: { yue: "對耳屏外側面後部。", cmn: "對耳屏外側面後部。", en: "Back part of the outer surface of the antitragus." },
  },
  pi: {
    kind: "ear",
    name: { yue: "脾", cmn: "脾", en: "Spleen (Pi)" },
    loc: { yue: "耳甲腔後上部。", cmn: "耳甲腔後上部。", en: "Upper back part of the cavum conchae." },
  },
} satisfies Record<string, AcuPoint>;

export type BodyPointId = keyof typeof BODY_POINTS;
export type EarPointId = keyof typeof EAR_POINTS;

/** Look up a point. `kind` disambiguates 神門 (wrist HT7 vs ear TF4). */
export function acuPoint(id: string, kind: "body" | "ear" = "body"): AcuPoint | undefined {
  const table: Record<string, AcuPoint> = kind === "ear" ? EAR_POINTS : BODY_POINTS;
  return table[id];
}

export const ACU_LABELS: Record<Lang, { loc: string; use: string; caution: string }> = {
  yue: { loc: "位置", use: "點用", caution: "注意" },
  cmn: { loc: "位置", use: "怎樣用", caution: "注意" },
  en: { loc: "Where", use: "How", caution: "Caution" },
};
