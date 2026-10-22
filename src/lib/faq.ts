export type QA = { q: string; a: string };

export const FAQ_COPY: Record<"yue" | "cmn" | "en", { kicker: string; title: string; lede: string; items: QA[] }> = {
  yue: {
    kicker: "常見問題",
    title: "問與答",
    lede: "第一次接觸中醫身心門診，有疑問好正常。以下係一般說明，唔係診斷，亦唔取代面診。",
    items: [
      {
        q: "中醫身心門診主要睇啲咩？",
        a: "如果你近排心慌、思慮多、情緒低落、瞓唔著，或者身體有唔舒服但檢查未搵到原因，中醫會由心同身一齊了解。醫師會按你嘅情況，同你傾生活、作息同調理方向。",
      },
      {
        q: "同精神科有咩唔同？",
        a: "兩者角度唔同，可以互相配合。精神科屬現代醫學，負責診斷同相關治療；中醫由形神合一、整體調理去睇。如果你已經喺精神科覆診或者食緊藥，請唔好自行停藥，並主動話俾中醫師知。",
      },
      {
        q: "第一次面診要準備啲咩？",
        a: "可以帶埋近排嘅檢查報告，同埋而家食緊嘅藥或者保健品名單。亦可以預先寫低幾句：唔舒服由幾時開始、瞓得點、邊啲時候會差啲。唔使寫得完整，記得幾多得幾多。",
      },
      {
        q: "第一次面診大概會點？",
        a: "醫師會先問你嘅情況同生活習慣，再按需要望舌、把脈。之後會同你講初步嘅調理方向。使唔使用藥、針灸，由醫師面診之後決定，每個人都唔同。",
      },
      {
        q: "面診時醫師用嘅問卷或者量表，係做咩用？",
        a: "面診時，醫師有時會請你填幾份簡短問卷，例如關於焦慮、情緒同睡眠。用意係幫你整理近排嘅感受，亦方便之後覆診時睇下有冇變化。分數唔等於診斷，醫師會配合面診一齊理解。",
      },
      {
        q: "網站會唔會記錄我嘅資料？",
        a: "本站唔收集病歷，亦唔會要求你提供個人資料。",
      },
      {
        q: "網站嘅呼吸、時辰同食療內容，可唔可以代替睇醫生？",
        a: "唔可以。呢啲係日常可以自己試嘅教育內容，幫你同身體相處。用藥、針灸要由註冊中醫師面診後決定。",
      },
      {
        q: "咩情況要盡快求助？",
        a: "如果你有傷害自己或者唔想再生存嘅念頭，或者情緒、行為突然有好大轉變，影響到安全，請唔好等預約，盡快聯絡緊急服務、去急症室，或者搵身邊信任嘅人陪你。",
      },
    ],
  },
  cmn: {
    kicker: "常見問題",
    title: "問與答",
    lede: "第一次接觸中醫身心門診，有疑問很正常。以下是一般說明，不是診斷，也不取代面診。",
    items: [
      {
        q: "中醫身心門診主要看什麼？",
        a: "如果你近來心慌、思慮多、情緒低落、睡不著，或者身體不適但檢查未找到原因，中醫會從心與身一起了解。醫師會按你的情況，和你談生活、作息與調理方向。",
      },
      {
        q: "和精神科有什麼不同？",
        a: "兩者角度不同，可以互相配合。精神科屬現代醫學，負責診斷與相關治療；中醫從形神合一、整體調理去看。如果你已經在精神科覆診或正在服藥，請不要自行停藥，並主動告訴中醫師。",
      },
      {
        q: "第一次面診要準備什麼？",
        a: "可以帶上近來的檢查報告、正在服用的藥物或保健品名單。也可以預先寫下幾句：不適從何時開始、睡得怎樣、哪些時候會差一些。不必寫得完整，記得多少寫多少。",
      },
      {
        q: "第一次面診大概會怎樣？",
        a: "醫師會先問你的情況與生活習慣，再按需要望舌、把脈。之後會和你談初步的調理方向。是否用藥、針灸，由醫師面診後決定，每個人都不同。",
      },
      {
        q: "面診時醫師使用的問卷或量表，是做什麼用的？",
        a: "面診時，醫師有時會請你填幾份簡短問卷，例如關於焦慮、情緒與睡眠。用意是幫你整理近來的感受，也方便日後覆診時看看有沒有變化。分數不等於診斷，醫師會配合面診一起理解。",
      },
      {
        q: "網站會不會記錄我的資料？",
        a: "本站不收集病歷，也不會要求你提供個人資料。",
      },
      {
        q: "網站的呼吸、時辰與食療內容，可以代替看醫生嗎？",
        a: "不可以。這些是日常可以自己嘗試的教育內容，幫你與身體相處。用藥、針灸要由註冊中醫師面診後決定。",
      },
      {
        q: "什麼情況要盡快求助？",
        a: "如果你有傷害自己或不想再活下去的念頭，或者情緒、行為突然有很大轉變，影響到安全，請不要等預約，盡快聯絡緊急服務、到急症室，或找身邊信任的人陪你。",
      },
    ],
  },
  en: {
    kicker: "Common questions",
    title: "Questions & Answers",
    lede: "It is normal to have questions before your first visit to a Chinese medicine body–mind clinic. What follows is general information only. It is not a diagnosis and does not replace an in-person consultation.",
    items: [
      {
        q: "What does a Chinese medicine body–mind clinic mainly deal with?",
        a: "If lately you have felt panicky, caught in too many thoughts, low in mood or unable to sleep, or your body has felt unwell but tests have not found a cause, Chinese medicine looks at heart and body together. The doctor will talk with you about your daily life, routines and directions for care, according to your situation.",
      },
      {
        q: "How is it different from psychiatry?",
        a: "The two take different angles and can work alongside each other. Psychiatry belongs to modern medicine and is responsible for diagnosis and related treatment; Chinese medicine works from the unity of form and spirit and from regulating the whole person. If you are already attending psychiatric follow-up or taking medication, please do not stop your medication on your own, and tell your Chinese medicine doctor about it.",
      },
      {
        q: "What should I prepare for my first visit?",
        a: "You can bring recent test reports and a list of any medicines or supplements you are taking. You can also write down a few lines beforehand: when the discomfort began, how you have been sleeping, and when it tends to feel worse. It does not need to be complete — write as much as you remember.",
      },
      {
        q: "What is a first visit usually like?",
        a: "The doctor will first ask about your situation and daily habits, then look at your tongue and take your pulse as needed. Afterwards they will talk with you about initial directions for care. Whether medicine or acupuncture is used is decided by the doctor after the in-person consultation, and it differs for everyone.",
      },
      {
        q: "What are the questionnaires or scales the doctor uses at a visit for?",
        a: "At a visit, the doctor may sometimes ask you to fill in a few short questionnaires, for example about anxiety, mood and sleep. They are meant to help you organise how you have been feeling lately, and to make it easier to see at later follow-up visits whether anything has changed. A score is not a diagnosis; the doctor reads it together with the in-person consultation.",
      },
      {
        q: "Will this website record my information?",
        a: "This site does not collect medical records and will not ask you to provide personal information.",
      },
      {
        q: "Can the breathing, timing and dietary content on this website replace seeing a doctor?",
        a: "No. These are educational materials you can try in daily life to help you live with your body. Medicine and acupuncture must be decided by a registered Chinese medicine doctor after an in-person consultation.",
      },
      {
        q: "When should I seek help as soon as possible?",
        a: "If you have thoughts of harming yourself or of not wanting to go on living, or if your emotions or behaviour change suddenly in a big way that affects your safety, please do not wait for an appointment. Contact emergency services, go to an emergency department, or ask someone you trust to stay with you, as soon as possible.",
      },
    ],
  },
};
