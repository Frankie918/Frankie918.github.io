type Lesson = {
  title: string;
  lead: string;
  steps: [string, string, string];
  ifNot: string;
  stop: string;
};

type FollowRoom = {
  kicker: string;
  title: string;
  lead: string;
  stepsK: string;
  ifNotK: string;
  stopK: string;
  done: string;
  lessons: [Lesson, Lesson, Lesson, Lesson];
};

const yueShell = {
  kicker: "跟住做",
  title: "四堂，一步一步",
  lead: "每堂都係三步，長短一樣。做唔到有退路。身體唔妥就停。呢度唔係治療。",
  stepsK: "三步",
  ifNotK: "如果做不到",
  stopK: "何時停止",
  done: "今日已完成",
};

const cmnShell = {
  kicker: "跟著做",
  title: "四堂，一步一步",
  lead: "每堂都是三步，長短一樣。做不到有退路。身體不對就停。這裏不是治療。",
  stepsK: "三步",
  ifNotK: "如果做不到",
  stopK: "何時停止",
  done: "今天已完成",
};

const enShell = {
  kicker: "Follow",
  title: "Four lessons, same length",
  lead: "Each lesson is three steps, the same length. If you cannot, there is a smaller way. Stop if the body is not right. This is not treatment.",
  stepsK: "Three steps",
  ifNotK: "If you cannot",
  stopK: "When to stop",
  done: "Done today",
};

export const FOLLOW = {
  yue: {
    anmei: {
      ...yueShell,
      lessons: [
        {
          title: "難入睡",
          lead: "難入睡唔使再加力。力愈大，個夜愈醒。",
          steps: [
            "燈暗咗之後，唔再查「點解我仲未瞓」。",
            "鼻吸 4、口呼 6，三輪，數住呼氣就得。",
            "三輪完仍然醒，就唔加第四輪，只係覺得被嘅重量。",
          ],
          ifNot: "數唔到三輪，就淨係覺得呼氣長過吸氣。",
          stop: "心跳好急、氣促，或者有傷害自己嘅念頭，就停，去求助。",
        },
        {
          title: "床只係用嚟瞓",
          lead: "張床唔使再做第二份工。一躺低，就可以交更。",
          steps: [
            "上床前，喺床以外講一句：今日嘅事留喺呢度。",
            "躺低之後只留兩樣：瞓，或者同人親近。",
            "手如果去搵機或者算數，就放返被面，停一停。",
          ],
          ifNot: "嗰句講唔出，就只係拍一拍枕頭，當係交更。",
          stop: "床上有人要你照顧，或者你要處理不適，就唔好硬套。",
        },
        {
          title: "環境唔係品格",
          lead: "房亂、燈猛、好嘈，都係房嘅事，唔係你嘅品格。",
          steps: [
            "望一望亂，講一句：呢個係房，唔係我。",
            "今晚唔收拾。只可以把一件刺眼嘅物件轉個向。",
            "一開始罵自己懶，就停罵，返去「呢個係房」。",
          ],
          ifNot: "一句都講唔出，就只係答應自己今晚唔執成間房。",
          stop: "有煙、漏電、熱到頂唔住，就停，先處理安全。",
        },
        {
          title: "早醒唔係失敗",
          lead: "早醒唔係你失敗。醒咗，先唔好判成個夜。",
          steps: [
            "唔好即刻睇鐘，亦唔好計自己瞓咗幾耐。",
            "天未光就留低，唔計劃聽日第一件事。",
            "天已光先坐起，唔開工作訊息，先接觸一下水。",
          ],
          ifNot: "唔想起身都得，留係床，只係唔開始審自己。",
          stop: "早醒同時心口痛、氣促或者大汗，就停，去求醫。",
        },
      ],
    },
    anshen: {
      ...yueShell,
      lessons: [
        {
          title: "念頭嚟開會",
          lead: "念頭可以入嚟開會。你唔使逐條審，你只係主持。",
          steps: [
            "念頭一到，喺心入面畀個位佢，唔使即刻發言。",
            "你只講一句：我聽到，呢陣未輪到你。",
            "然後望一望自己隻手，當係宣佈暫休會。",
          ],
          ifNot: "嗰句講唔出，就只係點一點頭，當係收到。",
          stop: "念頭係而家要處理嘅身體危險，就離開呢個會。",
        },
        {
          title: "氣暫時行唔通",
          lead: "氣一時行唔通，唔代表要而家打通佢。",
          steps: [
            "唔好推。先分係胸口、咽喉，定係兩脅。",
            "揀一個位置，手放上去，唔揉，只係陪住。",
            "呼氣慢少少就得，唔使通晒先算完成。",
          ],
          ifNot: "分唔到位置，就手放喺心口，停一陣。",
          stop: "手麻、胸痛、氣喘到講唔到話，就停，去求助。",
        },
        {
          title: "先認房間",
          lead: "驚來嘅時候，先認清楚自己而家喺邊、坐緊咩。",
          steps: [
            "講出三樣睇到嘅、兩樣摸到嘅、一樣聽到嘅。",
            "腳掌貼實地，問自己：而家呢度安唔安全。",
            "如果而家安全，就守住呢一下，唔彩排最壞。",
          ],
          ifNot: "講唔出三樣，就淨係摸住椅背，或者摸住杯。",
          stop: "而家真係唔安全，就離開現場，或者打求助電話。",
        },
        {
          title: "日間嘅預演",
          lead: "日間預演嘅係身體，唔係預演成件事點贏。",
          steps: [
            "揀一個你通常會緊嘅鐘點，而家先坐低。",
            "腳貼地，鼻吸 4、口呼 6，只做一輪。",
            "預演完就返去手上嘅事，唔寫劇本。",
          ],
          ifNot: "唔知邊個鐘點會緊，就只係而家做一輪呼吸。",
          stop: "一預演就恐慌、手震停唔到，就停，離開個想像。",
        },
      ],
    },
    jieyu: {
      ...yueShell,
      lessons: [
        {
          title: "只剩百分之八",
          lead: "今日如果只剩百分之八，就唔好再借聽日嘅氣。",
          steps: [
            "先講一句：我用百分之八，其餘唔借。",
            "百分之八只夠一件：覆一個字，或者唔覆。",
            "用完就當今日完成，唔好填滿剩餘時間。",
          ],
          ifNot: "百分之八都估唔到，就當今日只夠坐住。",
          stop: "連坐都辛苦，或者有傷害自己嘅念頭，就停，去求助。",
        },
        {
          title: "一件最小嘅事",
          lead: "最小嘅事唔係家務，係對身體一件好短嘅事。",
          steps: [
            "揀一下：抹一抹手、轉一轉頸，或者合埋雙掌。",
            "而家就做一下，做完唔寫落任何格子。",
            "唔加第二下，亦唔問自己夠唔夠努力。",
          ],
          ifNot: "連抹手都唔想，就只係覺得兩隻手掌係度。",
          stop: "一下都未做就自責到停唔到，就停，唔好再加。",
        },
        {
          title: "先停審判",
          lead: "未做任何事之前，可以先把審自己嘅庭停一停。",
          steps: [
            "審判一開口，你唔使答，亦唔使反駁。",
            "喺心入面講一句：呢單，今日休庭。",
            "休庭呢段，唔搵證據證明自己好定壞。",
          ],
          ifNot: "「休庭」兩個字講唔出，就只係唔好接話。",
          stop: "念頭去到想傷害自己，就停，即刻聯絡人或者熱線。",
        },
        {
          title: "興趣返一寸",
          lead: "興趣未返嚟，可以先返一寸，唔使一次過返晒。",
          steps: [
            "揀一件以前有少少喜歡嘅事，只做兩分鐘。",
            "兩分鐘到就停。就算未有感覺，都算接觸過。",
            "唔好問點解仲係咁悶。停低，呢堂就算完。",
          ],
          ifNot: "兩分鐘都唔想做，就只係望一望嗰樣嘢。",
          stop: "一接觸就更空虛、更想消失，就停，去搵一個人。",
        },
      ],
    },
    yali: {
      ...yueShell,
      lessons: [
        {
          title: "先返落地",
          lead: "壓力一嚟，人會向上提。先返落地面。",
          steps: [
            "雙腳踩實地面，覺得鞋底。",
            "跟頁頂個圈，做三輪。",
            "呼氣時講一句：我喺度，一樣一樣嚟。",
          ],
          ifNot: "數唔到三輪，就淨係覺得腳底。",
          stop: "心口痛、氣促或者頭暈，就停，先求醫。",
        },
        {
          title: "肩膊放低",
          lead: "繃緊最常收埋喺肩膊。呢堂先預備，唔使自己數拍子。",
          steps: [
            "坐穩，雙腳踩地。諗吓肩膊點解會先繃。",
            "唔使喺呢度做晒。下面「肩頸放低」會一句一句帶你做。",
            "而家只係手放大腿。肩膊唔用力，呼一口氣。",
          ],
          ifNot: "郁唔到，就淨係呼氣時想像肩膊重咗。",
          stop: "手臂麻痺、痛到放射，或者頭暈，就停。",
        },
        {
          title: "壓力暫存",
          lead: "腦入面嘅事，唔使一次記住。下面有個位，畀你慢慢分。",
          steps: [
            "而家先喺心入面，揀最重嗰一件。",
            "唔使喺呢度寫。落去「壓力暫存」嗰度先慢慢分。",
            "分到「做到／要等／問人」，再揀點做。",
          ],
          ifNot: "諗唔出，就淨係講一句：好多。都算。",
          stop: "如果係即刻有危險嘅事，就唔好暫存，即刻處理或者求助。",
        },
        {
          title: "收工交更",
          lead: "工作完咗，身體未必知。要一個清楚嘅交更。",
          steps: [
            "洗手，或者換件衫，當係交更。",
            "行十分鐘路，或者望一陣遠處。",
            "想跟住撳，可以去下面「洗手交更清單」逐格做。",
          ],
          ifNot: "成套做唔到，就洗手嗰下講一句：今日夠喇。",
          stop: "有傷害自己嘅念頭，就停，去求助。",
        },
      ],
    },
  },
  cmn: {
    anmei: {
      ...cmnShell,
      lessons: [
        {
          title: "難入睡",
          lead: "難入睡不必再加力。力愈大，這個夜愈醒。",
          steps: [
            "燈暗了之後，不再查「為什麼我還沒睡著」。",
            "鼻吸 4、口呼 6，三輪，數著呼氣就好。",
            "三輪完仍然醒，就不加第四輪，只感覺被子的重量。",
          ],
          ifNot: "數不到三輪，就只感覺呼氣長過吸氣。",
          stop: "心跳很急、氣促，或有傷害自己的念頭，就停，去求助。",
        },
        {
          title: "床只用來睡",
          lead: "這張床不必再做第二份工。一躺下，就可以交班。",
          steps: [
            "上床前，在床以外說一句：今天的事留在這裏。",
            "躺下之後只留兩樣：睡，或者與人親近。",
            "手如果去找手機或算帳，就放回被面，停一停。",
          ],
          ifNot: "那句說不出，就只拍一拍枕頭，當作交班。",
          stop: "床上有人要你照顧，或你要處理不適，就不要硬套。",
        },
        {
          title: "環境不是品格",
          lead: "房間亂、燈亮、很吵，都是房間的事，不是你的品格。",
          steps: [
            "看一看亂，說一句：這是房間，不是我。",
            "今晚不收拾。只可以把一件刺眼的東西轉個向。",
            "一開始罵自己懶，就停罵，回到「這是房間」。",
          ],
          ifNot: "一句都說不出，就只答應自己今晚不收拾整間房。",
          stop: "有煙、漏電、熱到受不住，就停，先處理安全。",
        },
        {
          title: "早醒不是失敗",
          lead: "早醒不是你失敗。醒了，先不要判決整個夜。",
          steps: [
            "不要立刻看鐘，也不要算自己睡了多久。",
            "天未亮就留下，不計劃明天第一件事。",
            "天已亮才坐起，不開工作訊息，先接觸一下水。",
          ],
          ifNot: "不想起身也可以，留在床上，只是不開始審自己。",
          stop: "早醒同時胸口痛、氣促或大汗，就停，去求醫。",
        },
      ],
    },
    anshen: {
      ...cmnShell,
      lessons: [
        {
          title: "念頭來開會",
          lead: "念頭可以進來開會。你不必逐條審，你只是主持。",
          steps: [
            "念頭一到，在心裏給它一個位，不必立刻發言。",
            "你只說一句：我聽到了，這陣還未輪到你。",
            "然後看一看自己的手，當作宣布暫時休會。",
          ],
          ifNot: "那句說不出，就只點一點頭，當作收到。",
          stop: "念頭是現在要處理的身體危險，就離開這個會。",
        },
        {
          title: "氣暫時走不通",
          lead: "氣一時走不通，不代表要現在打通它。",
          steps: [
            "不要推。先分是胸口、咽喉，還是兩脅。",
            "選一個位置，手放上去，不揉，只是陪著。",
            "呼氣慢一點就好，不必通完才算完成。",
          ],
          ifNot: "分不到位置，就手放在心口，停一陣。",
          stop: "手麻、胸痛、喘到說不出話，就停，去求助。",
        },
        {
          title: "先認房間",
          lead: "害怕來的時候，先認清自己現在在哪裏、坐著什麼。",
          steps: [
            "說出三樣看到的、兩樣摸到的、一樣聽到的。",
            "腳掌貼實地，問自己：現在這裏安不安全。",
            "如果現在安全，就守住這一下，不彩排最壞。",
          ],
          ifNot: "說不出三樣，就只摸住椅背，或摸住杯子。",
          stop: "現在真的不安全，就離開現場，或打求助電話。",
        },
        {
          title: "日間的預演",
          lead: "日間預演的是身體，不是預演整件事怎麼贏。",
          steps: [
            "選一個你通常會緊的鐘點，現在先坐下。",
            "腳貼地，鼻吸 4、口呼 6，只做一輪。",
            "預演完就回到手上的事，不寫劇本。",
          ],
          ifNot: "不知道哪個鐘點會緊，就只是現在做一輪呼吸。",
          stop: "一預演就恐慌、手震停不住，就停，離開那個想像。",
        },
      ],
    },
    jieyu: {
      ...cmnShell,
      lessons: [
        {
          title: "只剩百分之八",
          lead: "今天如果只剩百分之八，就不要再借明天的氣。",
          steps: [
            "先說一句：我用百分之八，其餘不借。",
            "百分之八只夠一件：回一個字，或不回。",
            "用完就當今天完成，不要填滿剩餘時間。",
          ],
          ifNot: "百分之八都估不到，就當今天只夠坐著。",
          stop: "連坐都辛苦，或有傷害自己的念頭，就停，去求助。",
        },
        {
          title: "一件最小的事",
          lead: "最小的事不是家務，是對身體一件很短的事。",
          steps: [
            "選一下：抹一抹手、轉一轉頸，或合上雙掌。",
            "現在就做一下，做完不寫進任何格子。",
            "不加第二下，也不問自己夠不夠努力。",
          ],
          ifNot: "連抹手都不想，就只感覺兩隻手掌在。",
          stop: "一下都還沒做就自責到停不住，就停，不要再加。",
        },
        {
          title: "先停審判",
          lead: "還沒做任何事之前，可以先把審自己的庭停一停。",
          steps: [
            "審判一開口，你不必答，也不必反駁。",
            "在心裏說一句：這案，今天休庭。",
            "休庭這段，不找證據證明自己好或壞。",
          ],
          ifNot: "「休庭」兩個字說不出，就只是不要接話。",
          stop: "念頭走到想傷害自己，就停，立刻聯絡人或熱線。",
        },
        {
          title: "興趣回一寸",
          lead: "興趣還沒回來，可以先回一寸，不必一次回完。",
          steps: [
            "選一件以前有一點喜歡的事，只做兩分鐘。",
            "兩分鐘到就停。即使還沒有感覺，也算接觸過。",
            "不要問為什麼還是這麼悶。停下，這堂就算完。",
          ],
          ifNot: "兩分鐘都不想做，就只是看一看那件東西。",
          stop: "一接觸就更空虛、更想消失，就停，去找一個人。",
        },
      ],
    },
    yali: {
      ...cmnShell,
      lessons: [
        {
          title: "先回到地面",
          lead: "壓力一來，人會往上提。先回到地面。",
          steps: [
            "雙腳踩實地面，感覺鞋底。",
            "跟頁頂的圈，做三輪。",
            "呼氣時說一句：我在這裏，一件一件來。",
          ],
          ifNot: "數不到三輪，就只感覺腳底。",
          stop: "胸口痛、氣促或頭暈，就停，先求醫。",
        },
        {
          title: "肩膀放下",
          lead: "緊繃最常藏在肩膀。這堂先預備，不必自己數拍子。",
          steps: [
            "坐穩，雙腳踩地。想想肩膀為何先緊繃。",
            "不必在這裏做完。下面「肩頸放下」會一句一句帶你做。",
            "現在只是手放在大腿。肩膀不用力，呼一口氣。",
          ],
          ifNot: "動不了，就只在呼氣時想像肩膀變重。",
          stop: "手臂發麻、疼痛往外放射，或頭暈，就停。",
        },
        {
          title: "壓力暫存",
          lead: "腦中的事，不必一次記住。下面有個位置，讓你慢慢分。",
          steps: [
            "現在先在心裏，選最重的那一件。",
            "不必在這裏寫。下去「壓力暫存」那裏再慢慢分。",
            "分到「能做／要等／問人」，再選怎樣做。",
          ],
          ifNot: "想不出來，就只說一句：很多。也算。",
          stop: "如果是馬上有危險的事，就不要暫存，立刻處理或求助。",
        },
        {
          title: "下班交接",
          lead: "工作結束了，身體未必知道。需要一個清楚的交接。",
          steps: [
            "洗手或換衣服，當作交接。",
            "走十分鐘路，或望一會兒遠處。",
            "想跟著點，可以去下面「洗手交接清單」逐格做。",
          ],
          ifNot: "整套做不到，就在洗手時說一句：今天夠了。",
          stop: "有傷害自己的念頭，就停，去求助。",
        },
      ],
    },
  },
  en: {
    anmei: {
      ...enShell,
      lessons: [
        {
          title: "Hard to fall asleep",
          lead: "Do not add more effort. The harder you try, the more awake the night becomes.",
          steps: [
            "Once the light is low, stop asking why you are not asleep yet.",
            "In through the nose for 4, out through the mouth for 6. Three rounds, counting the out-breath.",
            "If you are still awake, do not add a fourth round. Only feel the weight of the cover.",
          ],
          ifNot: "If you cannot count three rounds, only notice that the out-breath is longer.",
          stop: "Stop and get help if the heart races hard, breath is short, or there is a wish to harm yourself.",
        },
        {
          title: "The bed is only for sleep",
          lead: "The bed does not have to do a second job. Once you lie down, the day can hand over.",
          steps: [
            "Before you get in, say somewhere else: today’s tasks stay here.",
            "Once lying down, only two things remain: sleep, or closeness.",
            "If the hand reaches for the phone or the accounts, put it back on the cover and pause.",
          ],
          ifNot: "If the sentence will not come, only pat the pillow, as a handover.",
          stop: "Do not force this if someone in the bed needs your care, or you must tend to being unwell.",
        },
        {
          title: "The room is not your character",
          lead: "A mess, a bright lamp, or noise belongs to the room, not to your character.",
          steps: [
            "Look at the mess and say: this is the room, not me.",
            "Do not tidy tonight. You may only turn one glaring object the other way.",
            "If you start calling yourself lazy, stop, and return to: this is the room.",
          ],
          ifNot: "If no sentence comes, only promise yourself you will not tidy the whole room tonight.",
          stop: "Stop and deal with safety first if there is smoke, a fault, or heat you cannot bear.",
        },
        {
          title: "Waking early is not failure",
          lead: "Waking early is not your failure. You have woken. Do not sentence the whole night.",
          steps: [
            "Do not look at the clock at once, and do not count how long you slept.",
            "If it is still dark, stay. Do not plan tomorrow’s first task.",
            "Sit up only when it is light. Do not open work messages. Touch water first.",
          ],
          ifNot: "If you do not want to get up, stay in bed, and do not start the trial of yourself.",
          stop: "Stop and seek care if early waking comes with chest pain, shortness of breath, or heavy sweat.",
        },
      ],
    },
    anshen: {
      ...enShell,
      lessons: [
        {
          title: "Thoughts may hold a meeting",
          lead: "Thoughts may come in to meet. You do not have to judge each one. You only chair.",
          steps: [
            "When a thought arrives, give it a seat. It does not have to speak at once.",
            "You only say: I heard you. It is not your turn yet.",
            "Then look at your own hand, as if the meeting is paused.",
          ],
          ifNot: "If the sentence will not come, only nod, as if you have received it.",
          stop: "Leave the meeting if the thought is a bodily danger that needs care now.",
        },
        {
          title: "Qi is not moving, for now",
          lead: "If qi will not move for a while, that does not mean you must force it through now.",
          steps: [
            "Do not push. First tell whether it is the chest, the throat, or the ribs.",
            "Choose one place. Rest a hand there. Do not rub. Only stay.",
            "A slightly slower out-breath is enough. It need not all flow to count as done.",
          ],
          ifNot: "If you cannot tell where, rest a hand on the chest and pause.",
          stop: "Stop and get help if the hands go numb, the chest hurts, or you cannot speak for breath.",
        },
        {
          title: "Name the room first",
          lead: "When fear comes, first know where you are, and what you are sitting on.",
          steps: [
            "Name three things you see, two you can touch, and one you hear.",
            "Feet on the floor. Ask: is this place safe right now?",
            "If it is safe now, stay with this moment. Do not rehearse the worst.",
          ],
          ifNot: "If you cannot name three things, only touch the chair, or the cup.",
          stop: "If you are truly not safe now, leave, or call for help.",
        },
        {
          title: "A short rehearsal by day",
          lead: "What you rehearse by day is the body, not how to win the whole event.",
          steps: [
            "Pick the hour that usually feels tight, and sit down now.",
            "Feet on the floor. In 4, out 6. One round only.",
            "Then return to what is in your hands. Do not write a script.",
          ],
          ifNot: "If you do not know which hour, only do one round of breath now.",
          stop: "If the picture brings panic or shaking you cannot stop, stop, and leave the picture.",
        },
      ],
    },
    jieyu: {
      ...enShell,
      lessons: [
        {
          title: "Only eight percent left",
          lead: "If only eight percent is here today, do not borrow tomorrow’s strength.",
          steps: [
            "Say first: I will use eight percent. I will not borrow the rest.",
            "Eight percent holds one thing: reply with one word, or do not reply.",
            "When it is used, the day can be done. Do not fill the time that is left.",
          ],
          ifNot: "If you cannot guess eight percent, let today be enough just to sit.",
          stop: "Stop and get help if even sitting is too hard, or if there is a wish to harm yourself.",
        },
        {
          title: "One smallest thing",
          lead: "The smallest thing is not a chore. It is one very short kindness to the body.",
          steps: [
            "Choose: wipe the hands, turn the neck once, or bring the palms together.",
            "Do it once now. Do not write it into any box.",
            "Do not add a second time, and do not ask if you tried hard enough.",
          ],
          ifNot: "If you do not want to wipe the hands, only notice that both palms are here.",
          stop: "If blame starts before you have done even one, stop. Do not add more.",
        },
        {
          title: "Pause the judgement first",
          lead: "Before you do anything, the trial of yourself can adjourn.",
          steps: [
            "When judgement speaks, you need not answer, and you need not argue.",
            "Say inwardly: this case is adjourned for today.",
            "While it is adjourned, do not gather proof that you are good or bad.",
          ],
          ifNot: "If “adjourned” will not come, only do not take the next line.",
          stop: "If the thought turns toward harming yourself, stop, and contact someone or a hotline now.",
        },
        {
          title: "Interest, one inch back",
          lead: "If interest has not returned, it may come back one inch. Not all at once.",
          steps: [
            "Pick something you once liked a little. Do it for two minutes only.",
            "Stop at two minutes. Even with no feeling, you have touched it.",
            "Do not ask why it is still dull. Stop. This lesson is done.",
          ],
          ifNot: "If two minutes is too much, only look at the thing.",
          stop: "If touching it makes you feel emptier, or like disappearing, stop, and find a person.",
        },
      ],
    },
    yali: {
      ...enShell,
      lessons: [
        {
          title: "Back to the ground",
          lead: "Under pressure, the body pulls upward. Come back down first.",
          steps: [
            "Press both feet into the floor. Feel your soles.",
            "Follow the circle at the top of the page. Three rounds.",
            "On the out-breath, say: I am here. One thing at a time.",
          ],
          ifNot: "If three rounds is too many, only feel your soles.",
          stop: "Stop and get medical help if there is chest pain, breathlessness or dizziness.",
        },
        {
          title: "Let the shoulders drop",
          lead: "Tension likes to hide in the shoulders. This lesson only gets you ready.",
          steps: [
            "Sit steady, feet on the floor. Notice why the shoulders tighten first.",
            "You need not do it all here. Shoulders, below, will guide you line by line.",
            "For now, hands on your thighs. Shoulders at ease. One out-breath.",
          ],
          ifNot: "If moving is hard, only imagine the shoulders growing heavy as you breathe out.",
          stop: "Stop if an arm goes numb, pain spreads, or you feel dizzy.",
        },
        {
          title: "Park the pressure",
          lead: "You need not hold everything in your head. Below, there is a place to sort it slowly.",
          steps: [
            "For now, pick the heaviest one in your mind.",
            "No need to write here. Go down to Park the pressure and sort it there.",
            "Sort it as do, wait, or ask. Then choose what comes next.",
          ],
          ifNot: "If nothing comes, just say one word: lots. That counts.",
          stop: "If something is an immediate danger, do not park it. Deal with it or get help now.",
        },
        {
          title: "Clocking off",
          lead: "Work has ended, but the body may not know. Give it a clear hand-over.",
          steps: [
            "Wash your hands or change clothes, as a hand-over.",
            "Walk for ten minutes, or look into the distance for a while.",
            "To tap along step by step, use the wash-and-hand-over list below.",
          ],
          ifNot: "If the whole set is too much, say as you wash your hands: enough for today.",
          stop: "Stop and get help if there is a wish to harm yourself.",
        },
      ],
    },
  },
} as const satisfies Record<"yue" | "cmn" | "en", Record<"anshen" | "jieyu" | "anmei" | "yali", FollowRoom>>;
