/**
 * 節氣短文：以形神（身心）角度為主，附少量節氣文化。
 * key 用 jieqi.ts 嘅繁體名（han）。未有文章嘅節氣，頁面會顯示「整理中」。
 * room：連去相關房間（安神 /anshen、解鬱 /jieyu、安寐 /anmei）。
 */
export type Room = "/anshen" | "/jieyu" | "/anmei";

export type FoodNote = {
  name: string;
  quote: string;
  explain: string;
};

export type Recipe = {
  title: string;
  ingredients: string[];
  steps: string[];
};

export type SeasonFood = {
  kicker: string;
  intro: string;
  foods: FoodNote[];
  recipe: Recipe;
  note: string;
  source: string;
};

/** 每個節氣嘅時令飲食（只引用已核對嘅《隨息居飲食譜》原文）。 */
export const JIEQI_FOOD: Record<string, { yue: SeasonFood; cmn: SeasonFood; en: SeasonFood; urls: string[] }> = {
  寒露: {
    urls: ["https://ctext.org/wiki.pl?chapter=903886&if=gb"],
    yue: {
      kicker: "時令飲食 · 隨息居",
      intro: "清代王士雄嘅《隨息居飲食譜》，記錄咗好多日常食材嘅性味。秋天梨同百合當造，以下係書中原文，同一個屋企做得到嘅食法。",
      foods: [
        {
          name: "梨",
          quote: "「梨甘涼。潤肺，清胃，涼心，滌熱息風，化痰已嗽，養陰濡燥……中虛寒瀉、乳婦、金瘡忌之。新產及病後，須蒸熟食之。」",
          explain: "書中話梨味甘、性涼，屬滋潤一類嘅水果；亦提醒腸胃虛寒、易肚瀉嘅人唔宜，產後同病後要蒸熟先食。",
        },
        {
          name: "百合",
          quote: "「百合甘平。潤肺，補胃，清心，定魄，息驚，澤膚……或蒸或煮，而淡食之……風寒痰嗽、中寒便滑者勿食。」",
          explain: "書中話百合味甘、性平，建議蒸或者煮，淡淡哋食；傷風咳、腸胃寒、大便稀嘅時候就唔好食。",
        },
      ],
      recipe: {
        title: "百合蒸雪梨",
        ingredients: ["雪梨 1 個", "鮮百合 半個（約 20 克；乾百合要先浸軟）", "清水 少量", "冰糖 少許（可以唔放）"],
        steps: [
          "雪梨洗淨，切去頂部當蓋，用匙羹挖走梨心。",
          "鮮百合剝瓣洗淨，放入梨中間，加少量清水同冰糖。",
          "蓋返梨蓋，放碗入面，隔水中火蒸約 30 至 40 分鐘，至梨身軟身。",
          "攤暖先食，連汁一齊飲。",
        ],
      },
      note: "以上係傳統飲食文化介紹，唔係食療處方，亦唔保證有任何效果。飲食因人而異，有病情或者食緊藥，請先問醫師。",
      source: "原文出處：王士雄《隨息居飲食譜》果食類「梨」「百合」。",
    },
    cmn: {
      kicker: "時令飲食 · 隨息居",
      intro: "清代王士雄的《隨息居飲食譜》，記錄了許多日常食材的性味。秋天正是梨與百合的時節，以下是書中原文，和一個在家做得到的食法。",
      foods: [
        {
          name: "梨",
          quote: "「梨甘涼。潤肺，清胃，涼心，滌熱息風，化痰已嗽，養陰濡燥……中虛寒瀉、乳婦、金瘡忌之。新產及病後，須蒸熟食之。」",
          explain: "書中說梨味甘、性涼，屬滋潤一類的水果；也提醒腸胃虛寒、容易腹瀉的人不宜，產後與病後要蒸熟再吃。",
        },
        {
          name: "百合",
          quote: "「百合甘平。潤肺，補胃，清心，定魄，息驚，澤膚……或蒸或煮，而淡食之……風寒痰嗽、中寒便滑者勿食。」",
          explain: "書中說百合味甘、性平，建議蒸或煮，清淡地吃；傷風咳嗽、腸胃寒、大便稀的時候就不要吃。",
        },
      ],
      recipe: {
        title: "百合蒸雪梨",
        ingredients: ["雪梨 1 個", "鮮百合 半個（約 20 克；乾百合要先泡軟）", "清水 少量", "冰糖 少許（可不放）"],
        steps: [
          "雪梨洗淨，切下頂部當蓋，用小匙挖去梨心。",
          "鮮百合剝瓣洗淨，放進梨中間，加少量清水與冰糖。",
          "蓋回梨蓋，放入碗中，隔水中火蒸約 30 至 40 分鐘，至梨身變軟。",
          "放至溫熱再吃，連汁一起喝。",
        ],
      },
      note: "以上是傳統飲食文化介紹，不是食療處方，也不保證任何效果。飲食因人而異，有病情或正在服藥，請先問醫師。",
      source: "原文出處：王士雄《隨息居飲食譜》果食類「梨」「百合」。",
    },
    en: {
      kicker: "Seasonal food · Suixiju",
      intro: "The Qing-dynasty doctor Wang Shixiong's Suixiju Yinshipu (隨息居飲食譜) records the nature and flavour of many everyday foods. Pear and lily bulb are in season in autumn; below are the book's original words, and one way of preparing them that can be done at home.",
      foods: [
        {
          name: "Pear",
          quote: "「梨甘涼。潤肺，清胃，涼心，滌熱息風，化痰已嗽，養陰濡燥……中虛寒瀉、乳婦、金瘡忌之。新產及病後，須蒸熟食之。」",
          explain: "The book says pear is sweet in flavour and cool in nature, a moistening kind of fruit; it also warns that people with a weak, cold stomach who are prone to loose stools should avoid it, and that after childbirth or illness it should be steamed before eating.",
        },
        {
          name: "Lily bulb",
          quote: "「百合甘平。潤肺，補胃，清心，定魄，息驚，澤膚……或蒸或煮，而淡食之……風寒痰嗽、中寒便滑者勿食。」",
          explain: "The book says lily bulb is sweet and neutral in nature, and suggests steaming or boiling it and eating it plainly; it should not be eaten during a wind-cold cough, a cold stomach or loose stools.",
        },
      ],
      recipe: {
        title: "Steamed Snow Pear with Lily Bulb",
        ingredients: ["1 snow pear", "Half a fresh lily bulb (about 20 g; soak dried lily bulb until soft first)", "A little water", "A little rock sugar (optional)"],
        steps: [
          "Wash the snow pear, cut off the top to use as a lid, and scoop out the core with a small spoon.",
          "Separate and wash the fresh lily bulb petals, place them inside the pear, and add a little water and rock sugar.",
          "Put the lid back on, place the pear in a bowl, and steam over water on medium heat for about 30 to 40 minutes, until the pear is soft.",
          "Let it cool until warm before eating, and drink the juice with it.",
        ],
      },
      note: "The above introduces traditional food culture. It is not a dietary-therapy prescription and does not guarantee any effect. Food affects people differently; if you have a medical condition or are taking medication, please ask a doctor first.",
      source: "Source: Wang Shixiong, Suixiju Yinshipu (隨息居飲食譜), fruit section, \u201cPear\u201d and \u201cLily bulb\u201d.",
    },
  },
  霜降: {
    urls: ["https://ctext.org/wiki.pl?chapter=903886&if=gb", "http://www.wenxue100.com/book_ZhongYi/670_136.thtml"],
    yue: {
      kicker: "時令飲食 · 隨息居",
      intro: "清代王士雄嘅《隨息居飲食譜》，記錄咗好多日常食材嘅性味。霜降前後柿當造，鮮柿同柿餅喺書中分開記載，以下係原文，同一個屋企做得到嘅食法。",
      foods: [
        {
          name: "鮮柿",
          quote: "「鮮柿甘寒。養肺胃之陰，宜於火燥津枯之體。以大而無核，熟透不澀者良……凡中氣虛寒，痰濕內盛，外感風寒，胸腹痞悶，產後，病後，瀉痢……皆忌之。不可與蟹同食。」",
          explain: "書中話鮮柿味甘、性寒，要揀大、無核、熟透唔澀嘅；亦提醒腸胃虛寒、傷風、產後同病後嘅人唔宜，同埋唔好同蟹一齊食。",
        },
        {
          name: "柿餅",
          quote: "「乾柿甘平。健脾補胃，潤肺澀腸……老稚咸宜，果中聖品……柿餅、柿花功用相似，體堅耐久。」",
          explain: "書中話曬乾嘅柿味甘、性平，比鮮柿溫和，老人細路都啱；柿餅耐放，秋冬食好方便。",
        },
      ],
      recipe: {
        title: "飯面蒸柿餅",
        ingredients: ["柿餅 1 至 2 個", "煮緊嘅白飯 一煲（或者用碗隔水蒸）"],
        steps: [
          "柿餅用清水沖一沖，抹乾表面白霜外嘅灰塵（白霜可以保留）。",
          "飯煮到收水、面上見氣孔時，將柿餅放喺飯面，蓋返煲蓋。",
          "跟飯一齊焗熟，約 10 至 15 分鐘；冇煮飯嘅話，可以放碗隔水蒸 10 分鐘。",
          "攤暖先食，慢慢咀嚼。",
        ],
      },
      note: "以上係傳統飲食文化介紹，唔係食療處方，亦唔保證有任何效果。飲食因人而異，有病情或者食緊藥，請先問醫師。",
      source: "原文出處：王士雄《隨息居飲食譜》果食類「柿」。",
    },
    cmn: {
      kicker: "時令飲食 · 隨息居",
      intro: "清代王士雄的《隨息居飲食譜》，記錄了許多日常食材的性味。霜降前後正是柿子的時節，鮮柿與柿餅在書中分開記載，以下是原文，和一個在家做得到的食法。",
      foods: [
        {
          name: "鮮柿",
          quote: "「鮮柿甘寒。養肺胃之陰，宜於火燥津枯之體。以大而無核，熟透不澀者良……凡中氣虛寒，痰濕內盛，外感風寒，胸腹痞悶，產後，病後，瀉痢……皆忌之。不可與蟹同食。」",
          explain: "書中說鮮柿味甘、性寒，要挑大、無核、熟透不澀的；也提醒腸胃虛寒、感冒、產後與病後的人不宜，並且不要與螃蟹同吃。",
        },
        {
          name: "柿餅",
          quote: "「乾柿甘平。健脾補胃，潤肺澀腸……老稚咸宜，果中聖品……柿餅、柿花功用相似，體堅耐久。」",
          explain: "書中說曬乾的柿味甘、性平，比鮮柿溫和，老人小孩都適合；柿餅耐放，秋冬吃起來很方便。",
        },
      ],
      recipe: {
        title: "飯上蒸柿餅",
        ingredients: ["柿餅 1 至 2 個", "正在煮的白飯 一鍋（或用碗隔水蒸）"],
        steps: [
          "柿餅用清水略沖，擦去表面白霜以外的灰塵（白霜可保留）。",
          "飯煮到收水、表面出現氣孔時，把柿餅放在飯上，蓋回鍋蓋。",
          "隨飯一起燜熟，約 10 至 15 分鐘；沒有煮飯的話，可放碗中隔水蒸 10 分鐘。",
          "放至溫熱再吃，慢慢咀嚼。",
        ],
      },
      note: "以上是傳統飲食文化介紹，不是食療處方，也不保證任何效果。飲食因人而異，有病情或正在服藥，請先問醫師。",
      source: "原文出處：王士雄《隨息居飲食譜》果食類「柿」。",
    },
    en: {
      kicker: "Seasonal food · Suixiju",
      intro: "The Qing-dynasty doctor Wang Shixiong's Suixiju Yinshipu (隨息居飲食譜) records the nature and flavour of many everyday foods. Persimmons are in season around Frost's Descent, and fresh persimmon and dried persimmon are recorded separately in the book; below are the original words, and one way of preparing them that can be done at home.",
      foods: [
        {
          name: "Fresh persimmon",
          quote: "「鮮柿甘寒。養肺胃之陰，宜於火燥津枯之體。以大而無核，熟透不澀者良……凡中氣虛寒，痰濕內盛，外感風寒，胸腹痞悶，產後，病後，瀉痢……皆忌之。不可與蟹同食。」",
          explain: "The book says fresh persimmon is sweet and cold in nature, and to choose large, seedless fruit that is fully ripe and not astringent; it also warns that people with a weak, cold stomach, those with a cold, and those after childbirth or illness should avoid it, and that it should not be eaten together with crab.",
        },
        {
          name: "Dried persimmon",
          quote: "「乾柿甘平。健脾補胃，潤肺澀腸……老稚咸宜，果中聖品……柿餅、柿花功用相似，體堅耐久。」",
          explain: "The book says dried persimmon is sweet and neutral in nature, gentler than fresh persimmon, and suitable for old and young alike; dried persimmons keep well, which makes them convenient to eat in autumn and winter.",
        },
      ],
      recipe: {
        title: "Dried Persimmon Steamed on Rice",
        ingredients: ["1 to 2 dried persimmons", "A pot of white rice that is cooking (or steam in a bowl over water)"],
        steps: [
          "Rinse the dried persimmons briefly in clean water and wipe off any dust beyond the white bloom on the surface (the bloom can be kept).",
          "When the rice has absorbed its water and small steam holes appear on the surface, lay the persimmons on top of the rice and put the lid back on.",
          "Let them cook with the rice for about 10 to 15 minutes; if you are not cooking rice, steam them in a bowl over water for 10 minutes.",
          "Let them cool until warm before eating, and chew slowly.",
        ],
      },
      note: "The above introduces traditional food culture. It is not a dietary-therapy prescription and does not guarantee any effect. Food affects people differently; if you have a medical condition or are taking medication, please ask a doctor first.",
      source: "Source: Wang Shixiong, Suixiju Yinshipu (隨息居飲食譜), fruit section, \u201cPersimmon\u201d.",
    },
  },
};

export type JieqiArticle = {
  room: Room;
  /** Optional share card base path (no extension). Needs public<card>.webp + .jpg. */
  card?: string;
  yue: { title: string; paras: string[]; roomLine: string; source: string };
  cmn: { title: string; paras: string[]; roomLine: string; source: string };
  en: { title: string; paras: string[]; roomLine: string; source: string };
};

export const JIEQI_ARTICLES: Record<string, JieqiArticle> = {
  寒露: {
    room: "/anmei",
    card: "/jieqi/hanlu",
    yue: {
      title: "寒露：露水轉涼，心都想早啲收",
      paras: [
        "寒露係秋天第五個節氣。《月令七十二候集解》講：「九月節，露氣寒冷，將凝結也。」由白露到寒露，露水由清涼變成帶寒意，日短咗，夜長咗。",
        "呢個時候，有啲人會發覺自己傍晚特別容易靜落嚟，亦有人覺得心事多咗、夜晚翻來覆去。天色早暗、氣溫一轉，身體同心情跟著調節，係常見嘅事，唔一定代表有問題。",
        "《素問·四氣調神大論》講秋三月要「早臥早起，與雞俱興，使志安寧」，又講「收斂神氣」。放喺今日，可以係早少少熄燈、夜晚少啲追問自己「今日做得夠唔夠」，讓心同天時一齊收。",
        "如果近排主要係瞓唔著、易醒，可以慢慢行入安寐，睇下作息同放鬆嘅做法。呢度係教育內容，唔係診斷；持續影響生活嘅話，請搵醫師面診。",
      ],
      roomLine: "進入安寐 →",
      source: "引文：《月令七十二候集解》；《黃帝內經素問·四氣調神大論》。",
    },
    cmn: {
      title: "寒露：露水轉涼，心也想早些收",
      paras: [
        "寒露是秋天第五個節氣。《月令七十二候集解》說：「九月節，露氣寒冷，將凝結也。」從白露到寒露，露水由清涼轉為帶寒意，白天短了，夜晚長了。",
        "這個時候，有些人會發覺自己傍晚特別容易靜下來，也有人覺得心事多了、夜裏翻來覆去。天色早暗、氣溫一轉，身體和心情跟著調節，是常見的事，不一定代表有問題。",
        "《素問·四氣調神大論》說秋三月要「早臥早起，與雞俱興，使志安寧」，又說「收斂神氣」。放在今天，可以是早一點熄燈、夜裏少追問自己「今天做得夠不夠」，讓心與天時一起收。",
        "如果近來主要是睡不著、易醒，可以慢慢走進安寐，看看作息與放鬆的做法。這裏是教育內容，不是診斷；持續影響生活的話，請找醫師面診。",
      ],
      roomLine: "進入安寐 →",
      source: "引文：《月令七十二候集解》；《黃帝內經素問·四氣調神大論》。",
    },
    en: {
      title: "Cold Dew: the dew turns cold, and the heart wants to gather in earlier",
      paras: [
        "Cold Dew is the fifth solar term of autumn. The Yueling Qishier Hou Jijie (月令七十二候集解) says: \u201cIn the ninth-month term, the dew's qi is cold and about to congeal.\u201d From White Dew to Cold Dew, the dew changes from clear and cool to carrying a chill; the days grow shorter and the nights longer.",
        "At this time of year, some people notice that they settle down especially easily in the evening, while others find their worries multiply and they toss and turn at night. As the light fades earlier and the temperature turns, body and mood adjust along with it. This is common and does not necessarily mean anything is wrong.",
        "The Suwen's Sishi Tiaoshen Dalun (《素問·四氣調神大論》) says that in the three months of autumn one should \u201csleep early and rise early, rising with the chickens, and keep the will calm\u201d, and speaks of \u201cgathering in the spirit-qi\u201d. In today's terms, that might mean turning the lights off a little earlier, and at night asking yourself a little less often whether you did enough today — letting the heart gather in together with the season.",
        "If lately the main thing is being unable to fall asleep or waking easily, you can walk slowly into Restful Sleep and look at routines and ways of relaxing. This is educational content, not a diagnosis; if it keeps affecting your life, please see a doctor in person.",
      ],
      roomLine: "Enter Restful Sleep →",
      source: "Quotations: Yueling Qishier Hou Jijie; Huangdi Neijing Suwen, Sishi Tiaoshen Dalun.",
    },
  },
  霜降: {
    room: "/jieyu",
    card: "/jieqi/shuangjiang",
    yue: {
      title: "霜降：草木黃落，心事都可以落地",
      paras: [
        "霜降係秋天最後一個節氣。《月令七十二候集解》講：「霜降，九月中。氣肅而凝，露結為霜矣。」又記霜降三候之一係「草木黃落」，葉轉黃，慢慢落地。",
        "呢個時候，有啲人望住落葉會覺得失落，或者無端端提唔起勁；亦有人覺得年尾就嚟，心頭壓力多咗。季節轉冷、日照變短，情緒跟住低少少，係常見嘅事，唔一定代表有問題。",
        "《素問·四氣調神大論》講秋三月要「收斂神氣，使秋氣平，無外其志」。放喺今日，可以係少啲同人比較、將注意力收返嚟身邊嘅小事，好似落葉咁，讓懸住嘅心事慢慢落地。",
        "如果近排主要係心情鬱悶、提唔起勁，可以慢慢行入解鬱，睇下調節情緒嘅做法。呢度係教育內容，唔係診斷；持續影響生活嘅話，請搵醫師面診。",
      ],
      roomLine: "進入解鬱 →",
      source: "引文：《月令七十二候集解》；《黃帝內經素問·四氣調神大論》。",
    },
    cmn: {
      title: "霜降：草木黃落，心事也可以落地",
      paras: [
        "霜降是秋天最後一個節氣。《月令七十二候集解》說：「霜降，九月中。氣肅而凝，露結為霜矣。」又記霜降三候之一是「草木黃落」，葉子轉黃，慢慢落地。",
        "這個時候，有些人看著落葉會覺得失落，或者無緣無故提不起勁；也有人覺得年末將至，心頭壓力多了。季節轉冷、日照變短，情緒隨之低一些，是常見的事，不一定代表有問題。",
        "《素問·四氣調神大論》說秋三月要「收斂神氣，使秋氣平，無外其志」。放在今天，可以是少和別人比較、把注意力收回身邊的小事，像落葉一樣，讓懸著的心事慢慢落地。",
        "如果近來主要是心情鬱悶、提不起勁，可以慢慢走進解鬱，看看調節情緒的做法。這裏是教育內容，不是診斷；持續影響生活的話，請找醫師面診。",
      ],
      roomLine: "進入解鬱 →",
      source: "引文：《月令七十二候集解》；《黃帝內經素問·四氣調神大論》。",
    },
    en: {
      title: "Frost's Descent: plants yellow and fall, and worries can land too",
      paras: [
        "Frost's Descent is the last solar term of autumn. The Yueling Qishier Hou Jijie (月令七十二候集解) says: \u201cFrost's Descent, in the middle of the ninth month: the qi is stern and congeals, and dew freezes into frost.\u201d It also records one of the term's three pentads as \u201cplants yellow and fall\u201d — leaves turn yellow and slowly come down.",
        "At this time of year, some people feel a sense of loss watching the leaves fall, or find their energy low for no clear reason; others feel the year-end approaching and the pressure on their heart growing. As the season turns cold and daylight shortens, mood dipping a little along with it is common and does not necessarily mean anything is wrong.",
        "The Suwen's Sishi Tiaoshen Dalun (《素問·四氣調神大論》) says that in the three months of autumn one should \u201cgather in the spirit-qi, keep the autumn qi calm, and not let the will turn outward\u201d. In today's terms, that might mean comparing yourself with others a little less, and drawing your attention back to the small things beside you — like falling leaves, letting suspended worries slowly land.",
        "If lately the main thing is a low, stuck mood and little energy to move, you can walk slowly into Ease the Heart and look at ways of adjusting your mood. This is educational content, not a diagnosis; if it keeps affecting your life, please see a doctor in person.",
      ],
      roomLine: "Enter Ease the Heart →",
      source: "Quotations: Yueling Qishier Hou Jijie; Huangdi Neijing Suwen, Sishi Tiaoshen Dalun.",
    },
  },
};
