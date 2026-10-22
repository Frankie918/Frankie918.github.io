/** Approximate 節氣 dates (month*100+day). Enough for a daily classroom card. */
const TERMS: { md: number; n: [string, string, string]; a: [string, string, string] }[] = [
  { md: 105, n: ["小寒", "小寒", "Minor Cold"], a: ["暖一暖手心，先再掂凍嘅嘢。", "暖一暖掌心，再去触冷的东西。", "Warm the palms before touching anything cold."] },
  { md: 120, n: ["大寒", "大寒", "Major Cold"], a: ["早啲熄燈，留返啲暖畀夜晚。", "早点收灯，留一点热给夜晚。", "Dim the lights early; keep a little warmth for night."] },
  { md: 204, n: ["立春", "立春", "Start of Spring"], a: ["打開少少窗，透吓氣。", "开一条窗缝，让气有入口。", "Open a crack of window so qi has a way in."] },
  { md: 219, n: ["雨水", "雨水", "Rain Water"], a: ["飲啲暖嘢，唔好空肚諗嚟諗去。", "喝暖的，不要空肚长想。", "Drink something warm. Don’t think on an empty stomach."] },
  { md: 305, n: ["驚蟄", "惊蛰", "Awakening Insects"], a: ["心煩時走開半分鐘，等把火過咗先。", "烦时离开半分钟，让雷过去。", "When heat rises, leave the room for half a minute."] },
  { md: 320, n: ["春分", "春分", "Spring Equinox"], a: ["日夜一樣長，心入面都留返一半空位。", "昼夜平，心情也留一半空白。", "Day and night are even — leave half the day blank."] },
  { md: 404, n: ["清明", "清明", "Clear and Bright"], a: ["出去走廊望吓天，都係照顧自己。", "出走廊望一下天，当扫墓自己。", "Step out and look at the sky; tend your own heart."] },
  { md: 420, n: ["穀雨", "谷雨", "Grain Rain"], a: ["潤吓喉，少食燥熱、辛辣嘢。", "润喉、少燥，不要辛辣硬撑。", "Keep the throat moist; skip spice used as armour."] },
  { md: 505, n: ["立夏", "立夏", "Start of Summer"], a: ["心火開始旺，工作切細啲。", "心开始旺，工作切细一格。", "The heart fires up — cut work into smaller squares."] },
  { md: 521, n: ["小滿", "小满", "Grain Buds"], a: ["未要滿。留一口氣畀自己。", "未要满。留一口气给自己。", "Need not be full. Keep one breath for yourself."] },
  { md: 605, n: ["芒種", "芒种", "Grain in Ear"], a: ["一件小事做到完，勝過開十單。", "一件小事做到完，胜过开十单。", "Finish one small thing rather than open ten."] },
  { md: 621, n: ["夏至", "夏至", "Summer Solstice"], a: ["日照最長，提早收返個神。", "阳最长，提早把神收回。", "The longest light — gather the spirit home earlier."] },
  { md: 707, n: ["小暑", "小暑", "Minor Heat"], a: ["下晝留啲空檔，濃茶可以唔飲。", "午后留白，浓茶可以不喝。", "Leave the afternoon blank; strong tea can wait."] },
  { md: 723, n: ["大暑", "大暑", "Major Heat"], a: ["熱嘅時候少啲同人拗，等股火有出口就得。", "热时少辩，让火有出口即可。", "In heat, argue less; let fire have an exit."] },
  { md: 807, n: ["立秋", "立秋", "Start of Autumn"], a: ["打開窗，等少少涼風入嚟。", "把窗拉开，让一丝凉入肺。", "Open the window; let a thread of cool into the lung."] },
  { md: 823, n: ["處暑", "处暑", "End of Heat"], a: ["熱開始退，步伐可以再慢。", "热开始退，步伐可以再慢。", "Heat is leaving; the step can be slower."] },
  { md: 907, n: ["白露", "白露", "White Dew"], a: ["肩頸要暖，唔好對住風坐耐。", "肩颈要暖，不要对着风坐久。", "Keep neck and shoulders warm; don’t sit in a draft."] },
  { md: 923, n: ["秋分", "秋分", "Autumnal Equinox"], a: ["收多過開，放低一件事。", "收多于开。把一桩事放下。", "Gather more than you start. Set one matter down."] },
  { md: 1008, n: ["寒露", "寒露", "Cold Dew"], a: ["早臥，湧泉搓熱。", "早卧，涌泉搓热。", "Lie down earlier; rub Yongquan until warm."] },
  { md: 1023, n: ["霜降", "霜降", "Frost Descent"], a: ["護肺護鼻，少吹冷風。", "护肺护鼻，少吹冷风。", "Guard lung and nose; less cold wind."] },
  { md: 1107, n: ["立冬", "立冬", "Start of Winter"], a: ["要藏。摺好被角，同夜晚講聲晚安。", "藏。被角折好，当同夜讲拜拜。", "Store. Fold the quilt; say goodnight to the dark."] },
  { md: 1122, n: ["小雪", "小雪", "Minor Snow"], a: ["食暖啲，要做嘅事再切細啲。", "温食，任务再细一格。", "Warm food; make the task one size smaller."] },
  { md: 1207, n: ["大雪", "大雪", "Major Snow"], a: ["少啲比較、少啲睇螢幕，等陰氣有地方返。", "少比较、少屏幕，让阴有处可回。", "Less comparing, less screen, so yin has somewhere to return."] },
  { md: 1221, n: ["冬至", "冬至", "Winter Solstice"], a: ["一陽來復。今日只要求自己暖。", "一阳来复。今天只要求自己暖。", "Yang begins to return. Today, only ask yourself to be warm."] },
];

export function jieqiOf(month: number, day: number, lang: "yue" | "cmn" | "en") {
  const md = month * 100 + day;
  let cur = TERMS[TERMS.length - 1];
  for (const t of TERMS) {
    if (t.md <= md) cur = t;
  }
  const i = lang === "en" ? 2 : lang === "cmn" ? 1 : 0;
  return { name: cur.n[i], act: cur.a[i], han: cur.n[0] };
}
