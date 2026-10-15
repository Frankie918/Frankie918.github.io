/** 「本月小練習」— 3-month trial from Oct 2026. Relaxation / daily care only; no efficacy claims. */
export type PracticeText = { title: string; why: string; steps: [string, string, string] };
export type MonthlyPractice = { seconds: number; room?: "/anshen" | "/jieyu" | "/anmei"; yue: PracticeText; cmn: PracticeText; en: PracticeText };

export const MONTHLY_PRACTICE: Record<number, MonthlyPractice> = {
  1: {
    seconds: 120, room: "/jieyu",
    yue: { title: "早上曬一陣太陽，伸一伸", why: "小寒天冷，早上見下光、郁下身，係簡單嘅日常保養。", steps: ["朝早企近窗邊或者出門口，望一望天光。", "雙手慢慢向上伸，停三下呼吸。", "放低雙手，肩膊轉兩圈。"] },
    cmn: { title: "早上曬一會太陽，伸一伸", why: "小寒天冷，早上見見光、動動身，是簡單的日常保養。", steps: ["早上站近窗邊或走到門口，看一看天光。", "雙手慢慢向上伸，停三次呼吸。", "放下雙手，肩膀轉兩圈。"] },
    en: { title: "Morning light and a stretch", why: "In Minor Cold, a little light and movement in the morning is simple daily care.", steps: ["Stand by a window or the door and look at the daylight.", "Reach both arms up slowly; hold for three breaths.", "Lower the arms and roll the shoulders twice."] },
  },
  2: {
    seconds: 90, room: "/jieyu",
    yue: { title: "開一條窗縫，深吸慢呼", why: "立春之後，讓空氣流一流，當係一個放鬆練習。", steps: ["開一條窗縫，坐低或者企定。", "用鼻慢慢吸氣，數四下。", "用口慢慢呼氣，數六下，做五輪。"] },
    cmn: { title: "開一條窗縫，深吸慢呼", why: "立春之後，讓空氣流一流，當作一個放鬆練習。", steps: ["開一條窗縫，坐下或站穩。", "用鼻慢慢吸氣，數四下。", "用口慢慢呼氣，數六下，做五輪。"] },
    en: { title: "A crack of window, slow breaths", why: "After Start of Spring, let the air move — a simple relaxation practice.", steps: ["Open a window a crack; sit or stand steady.", "Breathe in through the nose for a count of four.", "Breathe out through the mouth for six. Five rounds."] },
  },
  3: {
    seconds: 120, room: "/jieyu",
    yue: { title: "行一段慢路", why: "春分晝夜平，慢慢行幾步，係日常保養嘅小習慣。", steps: ["揀一段短路，屋企走廊都得。", "每一步留意腳掌落地。", "行完停一停，慢呼一口氣。"] },
    cmn: { title: "走一段慢路", why: "春分晝夜平，慢慢走幾步，是日常保養的小習慣。", steps: ["選一段短路，家中走廊也可以。", "每一步留意腳掌落地。", "走完停一停，慢呼一口氣。"] },
    en: { title: "A slow short walk", why: "At the Spring Equinox, a few slow steps make a small daily-care habit.", steps: ["Pick a short path — a hallway is fine.", "Notice each foot landing.", "Pause at the end; breathe out slowly once."] },
  },
  4: {
    seconds: 60, room: "/anshen",
    yue: { title: "飲一杯暖水，慢慢飲", why: "穀雨潮濕，停低飲杯暖水，當係一分鐘嘅放鬆練習。", steps: ["倒一杯暖水，雙手捧住。", "感受杯嘅溫度，呼吸三下。", "分幾啖慢慢飲完。"] },
    cmn: { title: "喝一杯暖水，慢慢喝", why: "穀雨潮濕，停下喝杯暖水，當作一分鐘的放鬆練習。", steps: ["倒一杯暖水，雙手捧著。", "感受杯的溫度，呼吸三次。", "分幾口慢慢喝完。"] },
    en: { title: "One cup of warm water, slowly", why: "In damp Grain Rain, pausing for warm water is a one-minute relaxation practice.", steps: ["Pour warm water; hold the cup in both hands.", "Feel its warmth for three breaths.", "Drink it in several slow sips."] },
  },
  5: {
    seconds: 90, room: "/anshen",
    yue: { title: "一件事做完先開第二件", why: "立夏心開始忙，練習一次只做一件事，係一個放鬆嘅小習慣。", steps: ["揀一件好細嘅事。", "做嘅時候，其他嘢先放埋一邊。", "做完同自己講聲：做完咗。"] },
    cmn: { title: "一件事做完再開第二件", why: "立夏心開始忙，練習一次只做一件事，是一個放鬆的小習慣。", steps: ["選一件很小的事。", "做的時候，其他事先放一邊。", "做完對自己說：做完了。"] },
    en: { title: "Finish one thing before the next", why: "As summer begins, practising one thing at a time is a small relaxing habit.", steps: ["Pick one very small task.", "Set everything else aside while doing it.", "When done, tell yourself: done."] },
  },
  6: {
    seconds: 90, room: "/anshen",
    yue: { title: "午後留白一分鐘", why: "夏至日長，午後停一停，當係日常保養。", steps: ["放低手頭嘢，眼望遠處。", "肩膊沉一沉，牙關鬆一鬆。", "慢呼三口氣先返去做嘢。"] },
    cmn: { title: "午後留白一分鐘", why: "夏至日長，午後停一停，當作日常保養。", steps: ["放下手上的事，眼望遠處。", "肩膀沉一沉，牙關鬆一鬆。", "慢呼三口氣再回去工作。"] },
    en: { title: "One blank minute after lunch", why: "In the long days of summer, an afternoon pause is simple daily care.", steps: ["Put things down; look into the distance.", "Drop the shoulders; unclench the jaw.", "Three slow exhales, then return."] },
  },
  7: {
    seconds: 60, room: "/anshen",
    yue: { title: "熱嘅時候，講少一句", why: "小暑大暑天氣熱，練習停一停先回應，係一個放鬆練習。", steps: ["想即刻回應時，先停一下。", "慢呼一口氣，數三下。", "再決定講唔講。"] },
    cmn: { title: "熱的時候，少說一句", why: "小暑大暑天氣熱，練習停一停再回應，是一個放鬆練習。", steps: ["想立刻回應時，先停一下。", "慢呼一口氣，數三下。", "再決定說不說。"] },
    en: { title: "In the heat, one word less", why: "In summer heat, pausing before replying is a small relaxation practice.", steps: ["When you want to reply at once, pause.", "Breathe out slowly; count three.", "Then decide whether to speak."] },
  },
  8: {
    seconds: 90, room: "/jieyu",
    yue: { title: "開窗迎一絲涼", why: "立秋之後，讓少少涼風入屋，係日常保養嘅小動作。", steps: ["傍晚開窗，企喺窗邊。", "感受空氣嘅溫度，慢慢吸氣。", "慢呼氣，肩膊同時放鬆。"] },
    cmn: { title: "開窗迎一絲涼", why: "立秋之後，讓一點涼風進屋，是日常保養的小動作。", steps: ["傍晚開窗，站在窗邊。", "感受空氣的溫度，慢慢吸氣。", "慢呼氣，同時放鬆肩膀。"] },
    en: { title: "Open the window to a thread of cool", why: "After Start of Autumn, letting a little cool air in is a small daily-care habit.", steps: ["Open a window in the evening; stand by it.", "Feel the air; breathe in slowly.", "Breathe out slowly, letting the shoulders soften."] },
  },
  9: {
    seconds: 90, room: "/anshen",
    yue: { title: "肩頸暖一暖", why: "白露秋分轉涼，暖下肩頸，係簡單嘅日常保養。", steps: ["雙手搓暖。", "手心輕輕放喺頸後，停三下呼吸。", "肩膊慢慢向後轉三圈。"] },
    cmn: { title: "肩頸暖一暖", why: "白露秋分轉涼，暖暖肩頸，是簡單的日常保養。", steps: ["雙手搓暖。", "手心輕放在頸後，停三次呼吸。", "肩膀慢慢向後轉三圈。"] },
    en: { title: "Warm the neck and shoulders", why: "As autumn cools, warming the neck and shoulders is simple daily care.", steps: ["Rub the hands warm.", "Rest the palms on the back of the neck for three breaths.", "Roll the shoulders back slowly three times."] },
  },
  10: {
    seconds: 90, room: "/anshen",
    yue: { title: "慢呼氣，配沉肩", why: "寒露霜降天轉涼，人容易縮住膊頭，呢個係一個放鬆練習。", steps: ["坐定，雙腳踩實地面。", "吸氣時膊頭輕輕提高少少。", "慢慢呼氣，膊頭跟住沉落去，做六輪。"] },
    cmn: { title: "慢呼氣，配沉肩", why: "寒露霜降天轉涼，人容易縮著肩膀，這是一個放鬆練習。", steps: ["坐穩，雙腳踩實地面。", "吸氣時肩膀輕輕提高一點。", "慢慢呼氣，肩膀隨著沉下去，做六輪。"] },
    en: { title: "Slow exhale, shoulders down", why: "As the air turns cool we tend to hunch; this is a simple relaxation practice.", steps: ["Sit steady, feet flat on the floor.", "On the in-breath, lift the shoulders slightly.", "Breathe out slowly and let them sink. Six rounds."] },
  },
  11: {
    seconds: 120, room: "/anmei",
    yue: { title: "睡前搓暖腳心，配慢呼吸", why: "立冬入藏，睡前暖一暖腳，係一個睡前放鬆練習。", steps: ["坐喺床邊，一隻腳放上另一邊大腿。", "手心搓腳心，搓到暖，再換另一隻。", "躺低，慢呼吸五輪，呼氣長過吸氣。"] },
    cmn: { title: "睡前搓暖腳心，配慢呼吸", why: "立冬入藏，睡前暖一暖腳，是一個睡前放鬆練習。", steps: ["坐在床邊，一隻腳放到另一邊大腿上。", "手心搓腳心，搓到暖，再換另一隻。", "躺下，慢呼吸五輪，呼氣長過吸氣。"] },
    en: { title: "Warm the soles before bed, breathe slowly", why: "As winter begins, warming the feet before bed is a gentle wind-down practice.", steps: ["Sit on the bed edge; rest one foot on the other thigh.", "Rub the sole with your palm until warm; switch feet.", "Lie down; five slow breaths, out longer than in."] },
  },
  12: {
    seconds: 120, room: "/jieyu",
    yue: { title: "三件小事", why: "冬至夜長，每晚寫低今日做到嘅三件細事，係一個放鬆嘅小習慣。", steps: ["拎一張紙或者開手機備忘。", "寫低今日做到嘅三件細事，幾細都得。", "讀一次，就收埋佢。"] },
    cmn: { title: "三件小事", why: "冬至夜長，每晚寫下今天做到的三件小事，是一個放鬆的小習慣。", steps: ["拿一張紙或打開手機備忘。", "寫下今天做到的三件小事，再小也可以。", "讀一次，就收起來。"] },
    en: { title: "Three small things", why: "In the long nights of the Winter Solstice, noting three small things done today is a relaxing habit.", steps: ["Take a slip of paper or a phone note.", "Write three small things you did today, however small.", "Read them once, then put them away."] },
  },
};

export function practiceForMonth(month: number) {
  return MONTHLY_PRACTICE[month] ?? MONTHLY_PRACTICE[10]!;
}
