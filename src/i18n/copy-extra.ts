// recovered overlay; lines updated 2026-09-22
const EN_MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
const EN_MONTHS_SHORT = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];

export const CMN = {
	ui: {
		language: "語言",
		site: "身心課堂",
		back: "← 返回身心課堂",
		now: "此刻",
		tap: "按我",
		close: "收起",
		expand: "點開看",
		music: "背景樂",
		musicOn: "卡農 · 開",
		musicPlay: "播放卡農",
		musicPause: "關閉卡農",
		musicCredit: "音樂：入房先播中樂，可轉西樂／靜音。",
		today: "今日",
		yi: "宜",
		ji: "忌",
		desk: "前台",
		contact: "澳門鏡湖醫院中醫科 · 何政恆醫生",
		dept: "中醫科",
		qrAlt: "身心課堂網站二維碼",
		qrCap: "用相機一掃即可進入身心課堂",
		qrDl: "下載二維碼",
		qrFile: "身心課堂-二維碼.png",
		langYue: "廣東話",
		langCmn: "普通話",
		langEn: "English",
		booking: {
			nav: "預約掛號（澳門地區）",
			kicker: "預約掛號（澳門地區）",
			title: "想來面診，可以慢慢預約",
			have: "有鏡湖醫院掛號卡號碼，可用「鏡湖通」網上掛號預約；未有號碼，請親臨醫院現場辦理。",
			none: "有掛號卡號碼：按「網上預約（鏡湖通）」，會去到掛號入口。未有「鏡湖通」：請先下載並註冊，完成後回來再按預約掣。",
			login: "網頁版可能需要重新登入；「鏡湖通」入面一般會保持登入。",
			primary: "網上預約（鏡湖通）",
			ios: "下載鏡湖通（蘋果）",
			android: "下載鏡湖通（安卓）"
		},
		footerHome: "用藥與針灸須由註冊中醫師面診。若功能明顯受損，請同時求助精神健康服務。身心課堂不收集病歷。",
		views: "瀏覽量"
	},
	home: {
		feelK: "現在哪一種最像你？",
		feelLead: "選一個，直接進房，先做半分鐘呼吸。",
		feelAnshen: "心慌坐不住",
		feelJieyu: "提不起勁",
		feelAnmei: "睡不著",
		feelYali: "常常緊繃",
		kicker: "慢慢來，不必一次完成",
		lede: "呼吸可以再慢一拍。這裏不趕，只陪你把心與氣，輕輕放回來。",
		anshenK: "焦慮",
		anshenT: "安神",
		anshenD: "心散了，可以慢慢收回來。這裏陪你安一安神。",
		anshenGo: "進入安神 →",
		jieyuK: "抑鬱",
		jieyuT: "解鬱",
		jieyuD: "氣滯住了，細步也算前行。這裏陪你把鬱氣鬆開。",
		jieyuGo: "進入解鬱 →",
		anmeiK: "失眠",
		anmeiT: "安寐",
		anmeiD: "睡不著，不代表懶。這裏陪你把床還給夜。",
		anmeiGo: "進入安寐 →",
		yaliK: "壓力緊繃",
		yaliT: "舒壓",
		yaliD: "長期繃著，肩頸、胃、心跳都會說話。這裏陪你鬆一格。",
		yaliGo: "進入舒壓 →",
		qrK: "市民掃入",
		qrT: "一掃即到身心課堂",
		listenGo: "試聽其他背景樂 →",
		aboutK: "這裏是什麼",
		aboutT: "身心課堂",
		aboutLead: "你來到這裏，可以當作自己上了一堂小課。不必掛號、不會收你的病歷，也不取代面診。只用淺白的字，陪你把心與氣，慢慢放回來。",
		aboutBody: "裏面有四間房：安神、解鬱、安寐、舒壓。你選現在最貼近自己的那一間就好。裏面有「這一刻」短句、呼吸、時辰、耳穴位置，以及你可以帶去面診的小卡。每間房都有中樂與西樂，你可以隨時選來聽，或者關掉它，靜靜地閱讀。",
		illnessK: "為什麼叫身心",
		illnessT: "心與身，本來在一起",
		illnessLead: "中醫講形神合一。如果你心慌、胸悶、睡不著、胃口淡，很多時候不是「只是心理」或「只是身體」，而是精、氣、神亂了。這類情況，中醫會從心與身一起看。這裏不是幫你診斷，只和你講可以怎樣同這副身體相處。",
		illnessBody: "你覺得身心不適，不等於想像出來，也不等於軟弱。這堂課幫你先認得這些訊號。如果已經影響你工作、上學，或你有傷害自己的念頭，請同時求助精神健康服務，並盡快面診。",
		illnessA: "如果你怕、心跳、坐不定——神散了，可以進安神。",
		illnessB: "如果你悶悶不樂、不想動、心口翳悶——氣滯住，可以進解鬱。",
		illnessC: "如果你睡不著、易醒——寐未歸，可以進安寐。",
		illnessD: "如果你長期緊繃、肩頸僵硬、胃脹、心跳快——弦拉得太緊，可以進舒壓。"
	},
	qr: {
		kicker: "掃入網站",
		sub: "安神 · 解鬱 · 安寐 · 舒壓",
	},
	listen: {
		kicker: "房間音樂",
		title: "每間房都可以選",
		lede: "入房會先播中樂；瀏覽器若擋住，會在你第一次按頁面時開始。按上方的浮動音樂按鈕，可以轉西樂或者靜音。每間房各有一首中樂和一首不同的西樂。",
		now: "各房曲目",
		credit: "每首錄音的出處與版權，寫在每間房音樂欄的下方。",
		tracks: [
			{ title: "安神", hint: "中樂《平沙落雁》 · 西樂 巴赫《哥德堡變奏曲》詠歎調" },
			{ title: "解鬱", hint: "中樂《陽關三疊》 · 西樂 蕭邦《夜曲》降E大調 Op. 9 No. 2" },
			{ title: "安寐", hint: "中樂《醉漁唱晚》 · 西樂 薩蒂《裸體歌舞》第一首" },
			{ title: "舒壓", hint: "中樂《孔子讀易》 · 西樂 巴赫《平均律》C 大調前奏曲" }
		]
	},
	play: {
		kicker: "今日可試",
		title: "陪你做三件很小的事",
		lead: "呼吸、時辰、面診小卡。每間房都有，只是時辰不同。不計分，不過關。",
		breathIdle: "圈會跟著脹縮",
		breathHint: "鼻吸 4 秒，口呼 6 秒 · 三輪約半分鐘",
		breathIn: "吸",
		breathOut: "呼",
		breathStart: "開始半分鐘",
		breathStop: "停",
		breathDone: "完。隨時再來。",
		breathSecK: "先做一件事",
		breathSecT: "先慢慢呼吸半分鐘",
		breathSecLead: "不用準備，坐著或躺下都可以。跟著圓圈做三輪就夠。",
		breathNav: "先呼吸",
		breathGo: "先呼吸半分鐘 ↓",
		breathMoved: "呼吸圓圈在頁頂「先呼吸」↑",
		hourNow: "現在",
		hours: {
			anshen: {
				kicker: "心時",
				title: "神，可以在這幾個時辰收回來",
				lead: "焦慮不必對著時鐘比賽。點一下，記住哪一段適合收神。",
				slots: [
					{ start: 11, end: 13, name: "午", line: "少思。這段不要開會審自己。" },
					{ start: 19, end: 21, name: "戌", line: "把燈調暗，螢幕遠一點。" },
					{ start: 21, end: 23, name: "亥", line: "收神。心開始放工。" }
				]
			},
			jieyu: {
				kicker: "氣時",
				title: "氣，最想在這幾個時辰走",
				lead: "鬱的時候不必一次走完。點一下，記住哪一段適合疏。",
				slots: [
					{ start: 5, end: 7, name: "卯", line: "開一條窗縫，氣有入口。" },
					{ start: 7, end: 9, name: "辰", line: "走一段沒有目的的路，十分鐘也行。" },
					{ start: 15, end: 17, name: "申", line: "兩脅隨呼吸起落，不要硬辯。" }
				]
			},
			anmei: {
				kicker: "寐時",
				title: "亥時燈",
				lead: "床要還給夜。點一下，記住哪一段適合收。",
				slots: [
					{ start: 19, end: 21, name: "戌", line: "減光。不要再加濃茶。" },
					{ start: 21, end: 23, name: "亥", line: "收心。把床還給睡。" },
					{ start: 23, end: 1, name: "子", line: "已臥。不翻帳、不核對手機。" }
				]
			},
			yali: {
				kicker: "鬆時",
				title: "鬆一格的時辰",
				lead: "不必整天都放鬆。點一下，記住哪一段可以鬆一格。",
				slots: [
					{ start: 11, end: 13, name: "午", line: "吃飯離開桌面，不看工作。" },
					{ start: 15, end: 17, name: "申", line: "站起來兩分鐘，肩膀放下。" },
					{ start: 19, end: 21, name: "戌", line: "收起工作，做一個交接。" }
				]
			}
		},
		mapEar: "耳穴",
		mapBody: "身體",
		mapNote: "點一下看位置。輕按可以，不代替針灸。酸脹則停。",
		maps: {
			anshen: {
				shenmen: { d: "安神常用。輕按至微酸。" },
				xin: { d: "心悸、易驚時可作教育標記。" },
				pizhixia: { d: "助神識收回，不要大力揉。" },
				yintang: { d: "煩時停一分鐘，隨呼氣輕按。" },
				neiguan: { d: "心慌時可按。" },
				taichong: { d: "肝鬱煩躁可輕按。" }
			},
			jieyu: {
				gan: { d: "氣鬱、胸脅脹的教育標記。" },
				shenmen: { d: "鬱而煩、睡差可記這個位置。" },
				jiaogan: { d: "胸悶、氣不順時標記。" },
				qimen: { d: "兩脅隨呼吸起落，不要死力。" },
				neiguan: { d: "悶而欲嘔、心慌可輕按。" },
				hegu: { d: "氣滯、頭緊可記。" },
				taichong: { d: "鬱而欲怒，隨呼氣按。" }
			},
			anmei: {
				shenmen: { d: "耳穴和腕部都叫神門。入睡難、易驚可輕按。" },
				zhen: { d: "頭未放低、醒後重可標記。" },
				pi: { d: "多夢易醒、納差的教育標記。" },
				neiguan: { d: "躺下心慌可按。" },
				sanyinjiao: { d: "陰血不足、夜醒可記。" },
				yongquan: { d: "搓熱至暖，引火下行。" }
			},
			yali: {
				shenmen: { d: "耳穴常用的安神位置。輕輕捏耳廓就好。" },
				jiaogan: { d: "緊繃、心急時，可作教育標記。" },
				pizhixia: { d: "思緒停不下時，可作教育標記。不要用力揉。" },
				yintang: { d: "眉心皺起時，用指腹輕輕打圈，隨呼氣放鬆。" },
				neiguan: { d: "胸口悶、胃脹、心跳快時可以輕按。心跳伴胸痛就不要等，先求醫。" },
				hegu: { d: "頭、臉、牙關緊繃時，可以輕按半分鐘。" },
				fengchi: { d: "頭頸緊繃時，用指腹輕輕按，隨呼氣放鬆。" },
				jianjing: { d: "肩膀緊繃時，用指腹輕輕按，不要深按。" },
				taichong: { d: "傳統上與合谷一起用，稱為「四關」。煩躁、肩緊時，隨呼氣輕按。" }
			}
		},
		cardK: "帶去面診",
		cardT: "今日小卡",
		cardLead: "不是診斷。只記下你今天在這間房做過／選過的，方便和醫師講一句。",
		cardEmpty: "今天尚未記下。呼吸、時辰、掃描、天氣或日記之後會出現在這裏。",
		cardCopy: "複製文字",
		cardCopied: "已複製。",
		cardBreath: "呼吸",
		cardHour: "時辰",
		cardScan: "掃描",
		cardWeather: "天氣",
		cardBloom: "疏氣瓣",
		cardDiary: "日記夜數",
		cardPoints: "穴位",
		cardFollow: "跟著做",
		cardFoot: "教育記錄，不構成診斷。",
		jieqi: "節氣"
	},
	week: [
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六"
	],
	date: (y: number, m: number, d: number, w: string) => `${y}年${m}月${d}日　星期${w}`,
	anshen: {
		title: "安神",
		kicker: "心，可以再靜一點",
		lede: "不必立刻好起來。先把呼吸放慢，把散了的神，輕輕收回胸臆之間。",
		footerName: "身心課堂 · 安神",
		footerNote: "內容屬傳統中醫普及教育，不構成診斷或處方。用藥必須由註冊中醫師面診。若出現持續功能受損、恐慌，請聯絡當地急症或精神健康熱線。本站不收集個人病歷。",
		musicOn: "平沙 · 開",
		musicCredit: "音樂（入房先播中樂，可轉西樂／靜音）：古琴《平沙落雁》，Charlie Huang 演奏，CC BY 2.5（維基共享資源）；巴赫《哥德堡變奏曲》詠歎調，Kimiko Ishizaka 演奏，CC0。",
		nav: [
			{
				href: "#view",
				label: "中醫如何看"
			},
			{
				href: "#types",
				label: "常見證型"
			},
			{
				href: "#points",
				label: "五穴安神"
			},
			{
				href: "#scan",
				label: "心神掃描"
			},
			{
				href: "#cbt",
				label: "自助練習"
			},
			{
				href: "#acu",
				label: "針灸耳穴"
			},
			{
				href: "#play",
				label: "今日可試"
			},
			{
				href: "#daily",
				label: "日常"
			}
		],
		photo: "青瓷茶碗，日光靜物",
		viewK: "先停一停",
		viewT: "焦慮，在中醫裏叫「神無所歸」",
		viewP1: "《內經》講「驚則氣亂」「思則氣結」。焦慮往往不是單一情緒，而是心、肝、膽、腎之間的氣機亂了：肝氣鬱則煩，心神浮則驚，膽氣虛則易恐，陰液不足則虛火擾神。",
		viewP2: "這裏是教育內容，不代替看醫生。若焦慮已經影響日常、出現恐慌發作，請即時尋求正規醫療。",
		typesK: "慢慢認識",
		typesT: "六種常見證型",
		types: [
			{
				title: "肝鬱化火",
				body: "煩躁易怒、善太息、口苦、胸脅脹。日常可試：少辣少熬夜，兩脅與太衝輕按，煩時先離開半分鐘。"
			},
			{
				title: "心膽氣虛",
				body: "善驚易恐、膽小、稍有風吹草動就心慌。日常可試：減少驚嚇資訊，神門、內關輕按，日間做一件很小而做得到的事。"
			},
			{
				title: "心脾兩虛",
				body: "多思善慮、疲倦、納差、面色萎黃。日常可試：定時食暖、少空轉思想，散步代替夜撐。"
			},
			{
				title: "心腎不交",
				body: "心煩、腰酸、盜汗、入睡難。日常可試：提早關燈、少夜螢幕，湧泉搓熱。"
			},
			{
				title: "痰火上擾",
				body: "心煩口黏、痰多、坐立不安。日常可試：清淡飲食、少甜膩，食後走一小圈。"
			},
			{
				title: "陰虛內熱",
				body: "五心煩熱、口乾、潮熱。日常可試：少辛辣熬夜，多潤少燥，午後留白，不要再加濃茶。"
			}
		],
		pointsK: "輕按一下",
		pointsT: "五穴安神",
		pointsLead: "點選穴位，再按住按鈕約 20 秒——模擬輕按。配合慢呼吸，節奏見下面提示（和頁頂呼吸圓圈一樣）。",
		scanK: "聽一聽自己",
		scanT: "心神掃描",
		scanLead: "選最接近你近日狀態的一項（最多兩項），會給生活上可以跟著試的指導，不是診斷，也不是處方。",
		cbtK: "可以自己練",
		cbtT: "可以自己做的練習",
		cbtLead: "下面兩種方法，市民可以自己跟著做。不必一次學完。嚴重驚恐、強迫、創傷，或者已經影響上班上學，請同時求醫，不要只靠此頁。",
		worryT: "練習一 · 擔憂延後",
		worryP: "腦裏轉著的擔憂，不必立刻審完。日間只登記，約定一個短時段再處理。像把神暫時收回來，不是叫你當無事。",
		worrySteps: [
			["先定時段。", "選今日一個 15 分鐘，例如晚飯後 8:00–8:15。這段叫「擔憂時段」。其餘時間，不展開擔心。"],
			["日間驚念一來。", "不與自己辯論、不立刻上網查。只在下面格子寫一句：擔心什麼、大概何時。然後對自己說：「放到 8 點再看。」轉身做手頭那件小事。"],
			["到時段再打開。", "坐定。每條最多看兩分鐘：有沒有一件現在做得到的小事？有就寫下；無就寫「未到時候」。不准一邊看一邊加新的災難劇本。"],
			["時段一完就收。", "合上清單，去做一件身體上的事：倒水、洗手、走到窗邊。未審完的，留待明日同一個時段。"]
		],
		worryNote: "如果擔心的是即刻危險（例如現在身體不適要處理），就不要延後，立刻處理或求助。這個練習只用於「腦裏轉著、但現在做不到」的驚。",
		worryTry: "現在試一次：寫下一句，寄放。",
		pmrT: "練習二 · 漸進放鬆",
		pmrP: "焦慮時身體會自己收緊，心就跟著浮。這個練習教你：先故意輕輕收一組肌肉，再完全放開，讓身體記得「鬆」是什麼感覺。熟了之後，日間繃緊那一下，可以一呼氣就鬆。",
		pmrPrep: "如何準備：坐穩或躺下，鞋可以脫。手機靜音。不必完美，頭暈、麻、不適就停。",
		pmrSteps: [
			["每組肌肉只做一件事。", "輕輕收緊約 5 秒（力度大約四成，不要死力），然後一次放開，留意鬆開後的暖、重、麻。停 10 秒再換下一組。"],
			["順序可以由手開始：", "握拳 → 前臂與肩 → 臉與顎 → 胸腹 → 腿與腳。下面有個引導，按開始就會逐組提示，每組大約 8 秒。"],
			["開頭幾日。", "每日練一輪，選你較靜的時候。不必計「放鬆得分」，做完一輪就算。"],
			["熟了再縮短。", "之後可以改做：發現肩頸收緊 → 鼻吸 4 → 口呼 6，呼氣時把那組肌肉卸力。這一下才叫「一呼即鬆」，用在排隊、開會前、心口緊的時候。"]
		],
		pmrTry: "跟著引導做一輪（大約一分鐘）。",
		avoidT: "如果常常避開某些事",
		avoidP: "例如不敢坐車、不敢回訊息、不敢單獨出門。迴避當下會舒服，之後擔憂會更大。可以自己試：寫下你避開的一件事，再切成「細到幾乎不會失敗」的第一步（例如只是走到樓下門口就回）。做完不要立刻評分成敗。這步只適合症狀尚未嚴重影響生活者；驚恐發作、創傷記憶請由專業人員帶領。",
		acuK: "門診可以幫忙",
		acuT: "針灸與耳穴",
		acuP: "除了生活上的練習，針灸與耳穴都可以幫忙把散了的神收回來。適不適合、用哪些位置，要由醫生面診再定。",
		acuItems: [{
			title: "針灸為什麼有用",
			body: "針刺經穴，目的是通經絡、調氣血，令心神有位可歸。肝氣鬱則瀉其有餘，心神浮則幫它沉回來。現代也見到，適當針刺可以調節自主神經與身體的壓力反應，令繃緊的系統有機會慢下來。"
		}, {
			title: "耳穴為什麼有用",
			body: "中醫講耳為「宗脈之所聚」，臟腑在耳廓有對應區。用籽或珠輕壓耳穴，刺激細而持久，門診之間可以按醫生指導輕輕按。常見會用到與神、心、肝相關的區域，但組合因人而異。"
		}],
		acuNote: "留針多久、耳珠貼幾日、有無禁忌（例如皮膚敏感、懷孕、出血傾向），這裏不列出操作。詳情請向鏡湖醫院中醫科醫生查詢。",
		dailyK: "日子可以輕一點",
		dailyT: "安神小日課",
		daily: [
			{
				title: "飲",
				body: "玫瑰＋麥冬，或蓮子心極少量。口苦煩者少薑、少酒。"
			},
			{
				title: "動",
				body: "散步時雙手輕搓內關。避免睡前劇烈、避免臨睡刷短影片。"
			},
			{
				title: "時",
				body: "戌時（19–21）心包經當令，適合收手機、暖足、暗燈。"
			},
			{
				title: "忌",
				body: "過量咖啡、深夜辣炸、與人反覆核對「最壞情況」。"
			},
			{
				title: "百合",
				body: "王士雄《隨息居飲食譜》：百合甘平，清心定魄、息驚，療悲哀。蒸煮淡食，或煮粥。風寒痰嗽、中寒便滑者勿食。蓮心苦涼，清熱養神，只宜極少。飲食常識，不是處方。"
			}
		],
		points: {
			baihui: {
				d: "升清、定神。適合頭脹、思緒上浮。"
			},
			yintang: {
				d: "收神、紓眉心緊。適合心煩、眉心繃住。"
			},
			shenmen: {
				d: "心經原穴，寧心安神。"
			},
			neiguan: {
				d: "寬胸、止悸、和胃。"
			},
			taichong: {
				d: "疏肝降逆，煩躁時用。"
			}
		},
		breath: "呼吸提示：鼻吸 4 · 口呼 6",
		hold: "按住輕揉 · 20 秒",
		held: "夠了 · 換口氣",
		scan: {
			fire: {
				label: "容易煩、嘆氣、口苦、胸脅脹",
				note: "這段日子肝氣容易鬱而化熱。指導：少辣少酒、少熬夜；嘆氣時輕輕按太衝、合谷，把肩沉低。煩的時候先離開現場半分鐘，再決定要不要說。"
			},
			timid: {
				label: "易驚、膽小、稍有聲響就心跳",
				note: "神比較散，容易被聲與訊息帶走。指導：日間減少驚嚇資訊；神門、內關輕按；固定一件很小、一定完成得到的事，給心一個落腳處。"
			},
			spleen: {
				label: "想得多、倦、胃納差、大便爛",
				note: "思慮過度，脾胃與心神一齊累。指導：定時食暖、不要空腹長想；散步勝過夜撐；一件家務做到一半也算完成。"
			},
			kidney: {
				label: "心煩兼腰酸、夜汗、難入睡",
				note: "心火與腎水接不上。指導：提早關燈、少夜螢幕；臨睡搓熱湧泉；日間不要再加一杯濃咖啡。"
			},
			phlegm: {
				label: "口黏痰多、坐不定、夢多",
				note: "內裏偏濕熱，神被痰火擾。指導：清淡飲食、少甜膩油炸；食後走一小圈；睡前不再刷短片。"
			}
		},
		scanNote: "掃描筆記",
		scanFoot: "以上是生活指導，不是診斷，也不是處方。用藥請面診註冊中醫師。",
		worryPh: "例如：會不會搞砸明天那場會議",
		park: "寄放",
		parkLater: "寄放，今晚再看",
		parkOpen: "到時段，打開寄存",
		parked: "已寄放。日間不必再審。",
		parkedN: (n: number) => `已寄放 ${n} 條。現在可以回到手頭事，到你定的時段再按下面「打開寄存」。`,
		worrySlot: "擔憂時段",
		worryEmpty: "寄存是空的。",
		worryReview: "逐條看：有沒有一件現在做得到的小事？有就做或者寫下；無就當「未到時候」。兩分鐘一條，完了就收。",
		pmrIdle: "坐定，按開始。每組會停大約 8 秒。",
		pmrStop: "已停。不舒服就休息，隨時可以再來。",
		pmrStart: "開始",
		pmrPause: "停",
		pmrLines: [
			"手：輕輕握拳 5 秒……一次放開，感到手心暖、手指沉。",
			"肩：輕輕聳起，不要死力……呼氣時放下，鎖骨鬆開。",
			"臉：微微咬實牙關、皺一下眉……鬆開顎，舌尖可抵上顎。",
			"胸腹：吸氣時肚微微收……呼氣整段放軟，不必挺胸。",
			"腿：腳尖輕輕踩地 5 秒……整條腿卸力，膝可以微彎。",
			"收功：鼻吸 4，口呼 6。把注意帶回胸口。完。隨時可以再來。"
		]
	},
	jieyu: {
		title: "解鬱",
		kicker: "氣，可以再緩一點",
		lede: "不是叫你堅強。給一條很細、很慢的路，讓肝氣有位可行。",
		footerName: "身心課堂 · 解鬱",
		footerNote: "教育內容，不構成診斷或處方。用藥、針灸須由註冊中醫師執行。若抑鬱持續、功能明顯下降，請同時求助精神健康服務。本站不儲存你的選擇。",
		musicOn: "陽關 · 開",
		musicCredit: "音樂（入房先播中樂，可轉西樂／靜音）：古琴《陽關三疊》，Charlie Huang（Charles R Tsua）演奏，CC BY-SA 3.0（維基共享資源）；蕭邦《夜曲》降E大調 Op. 9 No. 2，Frank Lévy 演奏，Musopen，公有領域。",
		nav: [
			{
				href: "#view",
				label: "中醫如何看"
			},
			{
				href: "#types",
				label: "常見證型"
			},
			{
				href: "#steps",
				label: "疏氣小步"
			},
			{
				href: "#weather",
				label: "今日天氣"
			},
			{
				href: "#ba",
				label: "行為激活"
			},
			{
				href: "#acu",
				label: "針灸耳穴"
			},
			{
				href: "#play",
				label: "今日可試"
			},
			{
				href: "#daily",
				label: "日常"
			}
		],
		photo: "窗邊綠植，日光靜室",
		viewK: "先停一停",
		viewT: "抑鬱，往往由「氣鬱」開始",
		viewP1: "中醫將抑鬱歸入鬱證。核心病理往往是肝失疏泄，氣機不暢，然後兼夾痰、火、虛、瘀。病位在肝，常累及心、脾、腎。所以調理不止「開心一點」，而是疏、養、運三者一起。",
		viewP2: "本站是教育用途。中重度抑鬱必須同時接受現代精神醫療。中醫可以是同伴，不是替代。",
		typesK: "慢慢認識",
		typesT: "常見證型",
		types: [
			{
				title: "肝氣鬱結",
				body: "悶悶不樂、善太息、胸脅脹、噯氣。日常可試：開窗、慢行、兩脅隨呼吸起落，不要一次排滿日程。"
			},
			{
				title: "肝鬱脾虛",
				body: "鬱加上倦、納差、便溏。日常可試：溫食、任務再細一格，護脾先於要求自己振作。"
			},
			{
				title: "肝鬱化火",
				body: "煩躁、口苦、目赤、便乾。日常可試：少辣少酒，煩時用短寫或合歡花茶作出口，不要硬辯。"
			},
			{
				title: "痰氣鬱結",
				body: "梅核氣、胸悶、痰多。日常可試：清淡、少甜膩，慢慢把胸廓隨呼氣放寬。"
			},
			{
				title: "心神失養",
				body: "心悸、易驚、神疲、喜悲欲哭。日常可試：溫一杯、少驚嚇資訊，允許自己停一停。"
			},
			{
				title: "心脾兩虛",
				body: "多思、乏力、健忘、面色萎黃。日常可試：定時進食、一件小事做到完，散步勝過長想。"
			}
		],
		stepsK: "細步也算",
		stepsT: "疏氣小步",
		stepsLead: "五件很小的行動，一項一瓣。做完一項就按一下。五瓣齊，中間會開一朵花。不必一次做完，今日做到多少都算。",
		weatherK: "今日怎樣",
		weatherT: "今日心肝天氣",
		weatherLead: "選一個最接近的天氣，會給一句很短的提示。",
		baK: "可以自己練",
		baT: "行為激活",
		baLead: "心情還沒回來的時候，很容易等「有動力才動」。行為激活掉轉過來：行動可以很小，心情遲一點再跟上。中重度必須同時求醫，這裏只是第一步骨架。",
		baSteps: [
			["不要等心情。", "抑鬱時常會說「沒興趣就不做」。你可以選一件細到幾乎不會失敗的事，做完再評心情，而不是等心情才肯做。"],
			["分兩種分數。", "「愉悅」是身體有沒有半點舒服；「掌控」是有沒有做到、有沒有完成。兩者都由 0 到 10，低分也算數。往往掌控會先回來，愉悅遲一些。"],
			["切到再細一格。", "「打掃房間」太大。改成「把杯子洗乾淨」。累就再切：「把杯子拿到水槽」。氣要有位可行，路要短。"],
			["做完先記，不要立刻判決。", "寫下做了什麼、兩個分數。明日再看，不要當晚審判自己。分數低不等於失敗，只是資料。"]
		],
		baNote: "下面先選一類，寫下你的細版，收進今日格；做完再打分。不必四類都做。",
		baToday: "今日一格",
		acuK: "門診可以幫忙",
		acuT: "針灸與耳穴",
		acuP: "氣滯住的時候，針灸與耳穴都可以給氣一條出路。適不適合、用哪些位置，要由醫生面診再定。",
		acuItems: [{
			title: "針灸為什麼有用",
			body: "針刺經穴，疏通經絡、調和氣血。肝主疏泄，氣鬱則脹悶、欲哭、走不通；針灸就是幫這股氣走回來。現代也見到，適當針刺可以調節自主神經與壓力荷爾蒙，令郁滯的系統有機會鬆一鬆。"
		}, {
			title: "耳穴為什麼有用",
			body: "耳為「宗脈之所聚」，全身臟腑在耳廓有對應區。用籽或珠輕壓，刺激細而持久，門診之間可以按醫生指導輕輕按。常用會涉及肝、心、神門一帶，但怎樣配、貼多久，要因人而異。"
		}],
		acuNote: "這裏不列出針方與貼法。留針、耳珠、禁忌（皮膚敏感、懷孕、出血傾向等）請向鏡湖醫院中醫科醫生查詢。",
		dailyK: "日子可以輕一點",
		dailyT: "解鬱日用",
		daily: [
			{
				title: "香與飲",
				body: "玫瑰、合歡花、陳皮。肝鬱化火者少喝濃玫瑰，改麥冬、菊花少許。"
			},
			{
				title: "時",
				body: "清晨天剛亮，哪怕只是拉開窗簾，都是順一日的氣。"
			},
			{
				title: "食",
				body: "少生冷油膩。山藥、小米護脾，以免肝氣過旺連累脾胃。"
			},
			{
				title: "界",
				body: "不要用「振作」責備自己。氣滯要走，不是要打。"
			},
			{
				title: "舒鬱",
				body: "《隨息居飲食譜》：玫瑰花甘辛溫，調中活血、舒鬱結、和肝，可蒸露熏茶。熟藕養心生血、開胃舒鬱。蓮子性澀滯氣，氣鬱痞脹、便秘者忌。飲食常識，不是處方。"
			}
		],
		acts: [
			"開窗一分鐘，望遠處一棵樹或一塊天",
			"用暖杯捧住，聞一下茶或白開水的蒸氣",
			"兩脅輕按期門方向，隨呼氣沉肩",
			"寫一句「今日身體哪裏最重」就收筆",
			"出門走 200 步，不計步數美醜"
		],
		bloom: [
			"尚未開花。按一項，先有一瓣。",
			"一瓣。已經不是零。",
			"兩瓣。氣有入口。",
			"三瓣。氣開始鬆。",
			"四瓣。再一瓣就開。",
			"一朵花開了。今日夠了，不必再加。"
		],
		weather: {
			fog: {
				label: "霧 · 提不起",
				note: "霧天適合極小動作：暖一杯水、開一條窗縫。脾未醒，不要要求效率。"
			},
			cloud: {
				label: "陰 · 悶脹",
				note: "陰悶多是氣滯。兩脅隨呼吸起落，或走一段無目的的路。"
			},
			thunder: {
				label: "雷 · 煩而欲哭",
				note: "雷象近肝鬱化火。少辯少酒，改用合歡花或短寫，讓火有出口。"
			},
			rain: {
				label: "雨 · 想睡",
				note: "雨象近虛、近脾。溫食、早臥，任務再細一格，不要對自己說振作。"
			},
			dry: {
				label: "燥 · 口苦易怒",
				note: "燥熱宜清、宜綠葉、宜少熬夜。太衝可輕按，不要硬撐怒。"
			},
			clear: {
				label: "薄晴 · 有一絲縫",
				note: "薄晴就保護這條縫：不要一次填滿日程。留白本身是疏泄。"
			}
		},
		hints: {
			enjoy: "感官細版：聞茶蒸汽、摸暖杯、望一棵樹。",
			master: "掌控細版：倒水、摺一件、回一個字。",
			close: "連結細版：傳一個表情、同窗台說一句。",
			body: "身體細版：站 30 秒、肩鬆三次、走到門口。"
		},
		baKinds: [
			["enjoy", "愉悅 · 感官"],
			["master", "掌控 · 一件小事"],
			["close", "連結 · 一句話"],
			["body", "身體 · 三分鐘"]
		],
		pleasure: "愉悅",
		mastery: "掌控",
		baSave: "收進今日格",
		baScore: "我做完，記低分",
		baSaved: (t: string) => `今日格已定：${t}。不必等心情好才開始。`,
		baScored: (p: string, m: string) => `記下了。愉悅 ${p}／掌控 ${m}。分數低也算完成——激活先於評價。`
	},
	anmei: {
		title: "安寐",
		kicker: "夜，可以再軟一點",
		lede: "睡不著，不代表懶。先把床還給睡眠，把心在亥時收工。",
		footerName: "身心課堂 · 安寐",
		footerNote: "教育內容，不構成診斷或處方。用藥、針灸須由註冊中醫師執行。安眠藥只宜短用，停藥須經醫生。本站不收集病歷。很大聲鼻鼾、日間控制不住打瞌睡請盡快求醫。若有自傷念頭，請打 999，或澳門明愛生命熱線 2852 5222。",
		musicOn: "醉漁 · 開",
		musicCredit: "音樂（入房先播中樂，可轉西樂／靜音）：古琴《醉漁唱晚》，Charlie Huang（Charles R Tsua）演奏，CC BY-SA 3.0（維基共享資源）；薩蒂《裸體歌舞》第一首，Robin Alciatore 演奏，Musopen，公有領域。",
		nav: [
			{
				href: "#view",
				label: "中醫如何看"
			},
			{
				href: "#quiz",
				label: "今晚像哪種"
			},
			{
				href: "#myths",
				label: "流言"
			},
			{
				href: "#cbti",
				label: "CBT-I"
			},
			{
				href: "#hygiene",
				label: "衞生"
			},
			{
				href: "#yangsheng",
				label: "養生"
			},
			{
				href: "#acu",
				label: "針灸耳穴"
			},
			{
				href: "#play",
				label: "今日可試"
			},
			{
				href: "#diary",
				label: "日記"
			}
		],
		photo: "暖燈與牀頭，黃昏睡房",
		viewK: "先停一停",
		viewT: "失眠，中醫叫「不寐」",
		viewP1: "陽入於陰則寐。白天把陽用完，夜晚才有陰可睡。同樣睡不著，土壤可以很不同：思慮心脾兩虛、肝鬱化火、陰虛內熱、痰熱內擾、心膽氣虛。抄別人的藥，常常對錯土壤。",
		viewP2: "這裏是教育。慢性失眠（每週至少三晚、持續三個月、日間無精打采）宜同時看現代睡眠醫療。中醫可以是同伴，不是替代。",
		soils: [
			{
				title: "心脾兩虛",
				body: "多夢易醒、疲倦食少。日常可試：定時溫食、少夜撐腦，神門、內關輕按。"
			},
			{
				title: "陰虛內熱",
				body: "心煩盜汗、後半夜醒、口乾。日常可試：早關燈、少辛辣，湧泉搓熱。"
			},
			{
				title: "肝鬱化火",
				body: "入睡難、易怒口苦。日常可試：少辯少酒，煩時把一句寫下就收筆。"
			},
			{
				title: "痰熱內擾",
				body: "頭重胸悶、苔膩、躺下不清爽。日常可試：晚餐宜少宜清，少甜膩。"
			},
			{
				title: "心膽氣虛",
				body: "易驚多夢、一點聲就醒。日常可試：減少驚嚇資訊，允許自己停。"
			}
		],
		quizK: "不是測驗",
		quizT: "今晚比較像哪一種",
		quizLead: "答三條，會帶到最值得先看的一段。不是診斷。",
		mythsK: "點一下翻面",
		mythsT: "睡眠流言",
		mythsLead: "這些說話很常見。背面才是想帶走的那句。",
		cbtiK: "可以自己練",
		cbtiT: "認知行為治療 CBT-I",
		cbtiP: "天花板已經很熟面孔。時鐘一格一格走，愈用力愈清醒。許多人初期由壓力引起，其後「努力入睡」本身成了問題。床漸漸變成緊張的地方。CBT-I 第一課：把「床＝睡眠」重新教回給大腦。",
		cbtiSteps: [
			["床只用來睡。", "不工作、不滑手機、不算帳。許多失眠由「在床上清醒」練出來。把床還給睡。"],
			["清醒就起身。", "約廿分鐘仍醒，去微暗的地方坐一坐、看低刺激的東西，有睡意再回。不要在床上開會給自己。"],
			["每日同一時間起床。", "包括週末（假日可寬限一小時內）。無論昨晚怎樣，這件是這個星期就可以開始、也最有效的一件。"],
			["不要用力入睡。", "「今晚一定要睡足八小時」會令神經系統更醒。完整 CBT-I 約四至八週，由受訓人員帶領。睡眠限制證據強，但最易用錯，不要自行縮短睡眠。"]
		],
		cbtiNote: "安眠藥只宜短用，停藥須經醫生。雙相情感障礙、癲癇、懷孕、駕駛值夜者，不要自行做睡眠限制。可與中醫調理並行。",
		hyK: "今晚可勾",
		hyT: "優質睡眠與睡眠衞生",
		hyP1: "好眠看翌日，不只看鐘數。「又沒睡滿八小時」——先停一停。多數三十分鐘內能入睡、醒後有恢復感，日間大致應付得了生活。偶有一兩晚差，人人都會。",
		hyP2: "有足夠睡眠機會與環境，仍入睡難、易醒或早醒，並且日間疲倦、易煩或很怕失眠——才是醫學上的失眠，不是只換枕頭就解決。",
		ysK: "先調生活",
		ysT: "日常養生",
		ysLead: "白天把陽用完，夜晚才有陰可睡。穴位與食療是保健，不能代替診症。",
		ys: [
			{
				title: "亥時收心",
				body: "廿一至廿三時關燈，少說話、少屏幕。清晨見光十至二十分鐘，晚上較易有睡意。"
			},
			{
				title: "子時已臥",
				body: "廿三時前後上床，不處理公事。午間可閉目十至二十分鐘，睡太長反而攪亂晚上。"
			},
			{
				title: "晚餐宜早宜少",
				body: "胃不和則臥不安。過飽、過油、過辣都不利入睡。蓮子、百合、紅棗可作食療方向；痰濕、胃脹、血糖高者慎用。"
			},
			{
				title: "情志放下",
				body: "煩惱寫在紙上，留待明日。傍晚散步、八段錦或太極，比臨睡劇烈操練更合適。溫水足浴十至十五分鐘至足暖。"
			},
			{
				title: "食養",
				body: "《隨息居飲食譜》：乾蓮子甘溫，安神補氣，可同米煮粥；外感前後、氣鬱痞脹、便秘者忌。龍眼甘溫，補心氣、安志定神，宜煎汁；外感未清、內有鬱火、脹滿不飢者忌。乾棗潤肺安神，紅棗開胃養心，多食生痰助熱。飲食常識，不是處方。"
			}
		],
		pressT: "睡前輕按",
		pressLead: "每穴約一分鐘，酸脹為度。孕婦、糖尿病足、皮膚破損者先問醫師。",
		press: [
			{
				id: "shenmen",
				body: "安神常用。配合慢呼吸。"
			},
			{
				id: "neiguan",
				body: "思慮、心悸、胃氣上逆可按。"
			},
			{
				id: "sanyinjiao",
				body: "肝脾腎交會。"
			},
			{
				id: "yongquan",
				body: "足浴後按揉。"
			}
		],
		acuK: "門診可以幫忙",
		acuT: "針灸與耳穴",
		acuP: "針、耳穴、推拿、艾灸按證選擇，不是「補眠針」。適不適合要面診。",
		acuItems: [{
			title: "針灸為什麼有用",
			body: "通經絡、調氣血，幫陽入回陰。現代也見到適當針刺可調節自主神經。常用會涉及神門、內關、百會一帶，但組合因人而異。"
		}, {
			title: "耳穴為什麼有用",
			body: "耳為宗脈之所聚。籽或珠輕壓，刺激細而持久，方便上班族。怎樣配、貼多久，請向鏡湖醫院中醫科醫生查詢。"
		}],
		acuNote: "陰虛火旺、痰熱者不宜亂灸。一兩次針藥很少根治已數月的失眠，作息功課仍要做。懷孕、肝腎病、抗凝血或精神科藥物，必須告知中醫。",
		diaryK: "覆診可帶",
		diaryT: "七天睡眠日記",
		quizNotDx: "不是測驗，也不是診斷",
		quizSee: "看這一段 →",
		quizAgain: "再答一次",
		heard: "常常聽人說",
		actually: "其實是",
		flip: "點我翻面",
		unflip: "再點轉回來",
		doneN: (n: number) => `已做 ${n} / 6。只保存在這部裝置。`,
		diaryLead: "每晚填一兩分鐘。覆診時把屏幕給醫師看，比只說「睡得很差」有用得多。內容只留在這部裝置。",
		filled: (n: number) => `已填 ${n} / 7 晚`,
		dayShort: (m: number, d: number) => `${m}月${d}日`,
		latency: "躺下後多久睡著",
		wakes: "夜間醒來",
		energy: "翌日精神（1 很差 · 5 很好）",
		unset: "未填",
		latOpts: [
			"少於十五分鐘",
			"約三十分鐘",
			"約一小時",
			"超過一小時"
		],
		wakeOpts: [
			"沒有",
			"一次",
			"兩次",
			"三次或以上"
		],
		quizQs: [
			{
				q: "夜裏最常發生什麼？",
				opts: [
					{
						label: "躺下去很久才睡得著",
						tag: "cbti"
					},
					{
						label: "半夜醒來，再睡很難",
						tag: "cbti"
					},
					{
						label: "天未亮就醒，之後很難再睡",
						tag: "yangsheng"
					},
					{
						label: "偶有一兩晚，日間精神還可以",
						tag: "hygiene"
					}
				]
			},
			{
				q: "近日較常做哪樣？",
				opts: [
					{
						label: "滑手機、飲酒，想催自己睡",
						tag: "hygiene"
					},
					{
						label: "週末補眠，周一更難起",
						tag: "hygiene"
					},
					{
						label: "自己買安神茶、中成藥",
						tag: "treatment"
					},
					{
						label: "足浴、少熬夜、把心事寫下",
						tag: "yangsheng"
					}
				]
			},
			{
				q: "日間比較像哪種？",
				opts: [
					{
						label: "有點累，但應付得了",
						tag: "hygiene"
					},
					{
						label: "很累、易煩、記性差",
						tag: "cbti"
					},
					{
						label: "心煩、口乾、胃脹或易怒",
						tag: "treatment"
					},
					{
						label: "心悸、易驚，聽見聲就醒",
						tag: "treatment"
					}
				]
			}
		],
		quizRes: {
			cbti: {
				title: "床，可能已經變成戰場",
				body: "躺著清醒、怕今晚又睡不好，這套循環很常見。國際上會先教 CBT-I，而不是先加藥。下面「可以自己練」有逐步做法。",
				href: "#cbti"
			},
			hygiene: {
				title: "先由節奏與環境開始",
				body: "好眠看翌日有沒有恢復感，不是看夠不夠八小時。下面「睡眠衞生」有今晚可勾的小事。",
				href: "#hygiene"
			},
			yangsheng: {
				title: "白天的賬，夜晚想關門",
				body: "中醫講陽入於陰則寐。先讓心收工：亥時入靜、晚餐宜早、心事寫下。詳細在「日常養生」。",
				href: "#yangsheng"
			},
			treatment: {
				title: "不要自己長食安神藥",
				body: "同樣睡不著，土壤可以很不同。用藥、針灸、耳穴要面診。下面「中醫如何看」與「針灸耳穴」是教育，不是處方。",
				href: "#view"
			}
		},
		myths: [
			{
				front: "人人都要睡滿八小時",
				back: "好眠看翌日有沒有恢復感。大多數成人約七至九小時，個別差異很大。"
			},
			{
				front: "睡不著就躺到天亮",
				back: "床會慢慢變成「緊張的地方」。約廿分鐘仍清醒，起身做低刺激的事，有睡意再回。"
			},
			{
				front: "喝一杯酒比較容易睡",
				back: "前半段或會較易入睡，後半夜卻更易醒。酒精不是安眠藥。"
			},
			{
				front: "週末補眠就可以還數",
				back: "起床時間差太遠，星期一更難入睡。節奏比「補回鐘數」更重要。"
			},
			{
				front: "有一款最有效的安神藥",
				back: "中醫講辨證：心脾兩虛、陰虛、肝鬱，調理方向完全不同。不要自行長期買中成藥。"
			},
			{
				front: "衞生做齊，慢性失眠就會好",
				back: "衞生是地基。已經「學成」緊張睡眠，更需要 CBT-I，必要時中西醫協作。"
			}
		],
		checks: [
			"固定起床時間（連週末，可寬限一小時內）",
			"睡前一小時把手機放到伸手不到",
			"下午後少咖啡、濃茶、能量飲",
			"睡房陰涼安靜（約十八至廿二度）",
			"約廿分鐘仍醒就起身，有睡意再返床",
			"不用酒催睡"
		]
	},
	almanac: [
		{
			yi: "把窗拉開一條縫，偷一塊天色回家。",
			ji: "用「我又廢」為今日收尾。"
		},
		{
			yi: "對著杯子說聲早晨，當它識聽。",
			ji: "翻舊帳打自己。"
		},
		{
			yi: "把一隻襪配成對，當今日有少少秩序。",
			ji: "一次答應完所有人。"
		},
		{
			yi: "出走廊走到轉角就回，當旅行。",
			ji: "用「振作」當鞭。"
		},
		{
			yi: "把一粒水果切開，一半自己，一半也可以留。",
			ji: "比較別人今日有多精神。"
		},
		{
			yi: "把枕頭拍鬆，當自己值得睏。",
			ji: "把「應該」掛滿全日。"
		},
		{
			yi: "對花草點頭，當打招呼。",
			ji: "深夜重播尷尬片段。"
		},
		{
			yi: "把鞋擺整齊，門口也會鬆一點。",
			ji: "空腹長想。"
		},
		{
			yi: "傳一個表情出去，不必寫長文。",
			ji: "對自己說「你看你」。"
		},
		{
			yi: "把收音機開很小聲，當家裏有人。",
			ji: "把未完成當成人格。"
		},
		{
			yi: "用暖水淋手二十秒，當幫心洗手。",
			ji: "為了證明自己而硬撐。"
		},
		{
			yi: "望著一朵雲，等它自己走。",
			ji: "追問「為什麼我還未好」。"
		},
		{
			yi: "把一句謝謝說出口，小聲也可以。",
			ji: "把休息當成偷懶。"
		},
		{
			yi: "摺一件衫，當今日有過。",
			ji: "與昨日的自己比賽。"
		},
		{
			yi: "把窗台抹一小格，光會識路。",
			ji: "把計劃寫到自己都怕。"
		},
		{
			yi: "哼半句歌，走調也算開花。",
			ji: "禁止自己覺得悶。"
		},
		{
			yi: "把一封未覆的訊息標「明天」，現在先吃。",
			ji: "用忙碌掩蓋未歇。"
		},
		{
			yi: "踩實地板三下，告訴腿：我在這裏。",
			ji: "聽完別人成功就收起自己。"
		},
		{
			yi: "把被角摺好，當與夜晚說拜拜。",
			ji: "把焦慮當身份。"
		},
		{
			yi: "加一滴香，不必成爐煙。",
			ji: "為了「不想麻煩人」而一個人頂。"
		},
		{
			yi: "把明日只寫一件事，其他留白。",
			ji: "用最壞結局彩排全日。"
		},
		{
			yi: "對鏡子以外的窗微笑，當借光。",
			ji: "把「開心一點」交給自己做功課。"
		},
		{
			yi: "把一頁紙撕成兩半，一半寫煩，一半丟掉。",
			ji: "收藏所有責罵自己的句子。"
		},
		{
			yi: "慢吞吞喝完一杯，不設時間賽。",
			ji: "把身體訊號當成軟弱。"
		},
		{
			yi: "把鑰匙放回原位，當有處可回。",
			ji: "連睡覺都要有成績。"
		},
		{
			yi: "望一棵樹十秒，當認親。",
			ji: "把今日過得不好當成永遠。"
		},
		{
			yi: "把袖口捲高，當準備做一件很小的事。",
			ji: "與螢幕核對自己夠不夠好。"
		},
		{
			yi: "把椅子拉近窗，坐到光過身。",
			ji: "用「算了」蓋過真實的累。"
		},
		{
			yi: "把一粒糖含住，甜可以很短。",
			ji: "把請求幫助當成認輸。"
		},
		{
			yi: "寫下「竟然做到」的一件事，再細也要記。",
			ji: "把沉默當成自己消失。"
		},
		{
			yi: "把毛巾擰乾，當氣有出口。",
			ji: "把日程塞到連呼吸都要排隊。"
		},
		{
			yi: "讓一首舊歌播完，不跳過。",
			ji: "用別人的進度量自己。"
		},
		{
			yi: "把杯底洗乾淨，當給自己一個乾淨開始。",
			ji: "把「不想動」說成罪。"
		},
		{
			yi: "伸懶腰到手指發麻，當筋骨也識醒。",
			ji: "把溫柔只留給其他人。"
		},
		{
			yi: "把窗簾拉開一半，留一半陰涼。",
			ji: "逼自己今日就要好起來。"
		},
		{
			yi: "把一封信寫下不寄，當氣走過一輪。",
			ji: "把獨自難過當成秘密刑罰。"
		}
	],
	yali: {
		title: "舒壓",
		kicker: "壓力緊繃與身心反應",
		lede: "壓力大，身體會先知道。不必立刻解決，先把呼吸放慢，把弦鬆一格。",
		footerName: "身心課堂 · 舒壓",
		musicCredit: "音樂（入房先播中樂，可轉西樂／靜音）：古琴《孔子讀易》，Charlie Huang 演奏，CC BY 2.5（維基共享資源，已轉檔並加淡入淡出）；巴赫《平均律》第一冊 C 大調前奏曲，Kimiko Ishizaka 演奏，CC0。",
		nav: [
			{ href: "#feel", label: "身體訊號" },
			{ href: "#shoulder", label: "肩頸放下" },
			{ href: "#park", label: "壓力暫存" },
			{ href: "#daily", label: "一日節奏" },
			{ href: "#acu", label: "穴位" },
			{ href: "#play", label: "今日可試" },
			{ href: "#music", label: "靜音樂" },
			{ href: "#care", label: "何時面診" },
			{ href: "#view", label: "中醫怎麼看" }
		],
		feelK: "認一認",
		feelT: "壓力在身體裏，會怎樣說話",
		feelLead: "壓力不只在腦中。很多人會在身上感覺到。選你最近留意到的，看看可以怎樣陪它。",
		feelPick: "可以選多於一個。不是測驗，不計分。",
		feelTry: "可以試",
		feelSeek: "何時要看醫生",
		feelFoot: "以上是生活上可以試的做法，不是診斷，也不是處方。",
		cardFeel: "留意到",
		feel: {
			tense: {
				label: "長期緊繃，放不下",
				try: "每個小時停一停，問自己：肩、牙關、手，哪裏在用力？鬆一格就夠。",
				seek: "緊繃到常常發脾氣、做不了事，或幾個星期都沒有改善，可以預約面診談談。"
			},
			tired: {
				label: "很累，睡醒也不夠",
				try: "不必一次補回來。今天選一件可以不做的事，把它刪掉。",
				seek: "累了幾個星期都不退，或伴有發燒、氣促、體重無故下降，請看醫生檢查。"
			},
			neck: {
				label: "肩頸僵硬，肩膀聳高",
				try: "跟下面「肩頸放下」做一分鐘。坐久了，站起來走兩步。",
				seek: "手臂發麻、無力，或頸痛伴發燒、頸部僵硬，請盡快求醫。"
			},
			heart: {
				label: "心跳快，胸口悶",
				try: "先做頁頂的半分鐘呼吸。呼氣慢慢拉長。",
				seek: "胸口痛、胸口像被壓住、氣促、冒冷汗或暈眩，請立刻求醫或到急症室。"
			},
			stomach: {
				label: "胃脹，胃口變了",
				try: "吃飯時離開桌面和螢幕。吃慢一點，七分飽。",
				seek: "持續肚痛、嘔吐、黑便或便血、吞嚥困難、體重無故下降，請盡快看醫生。"
			},
			head: {
				label: "頭痛，頭緊",
				try: "放下螢幕，望遠處。鬆一鬆眉心和牙關，喝一口水。",
				seek: "突然劇烈頭痛、從未有過的頭痛，或伴手腳無力、說話不清、視力模糊，請立刻到急症室。"
			},
			sleep: {
				label: "睡得差，睡醒還累",
				try: "睡前一小時收起工作。想多了解，可以去安寐。",
				seek: "睡不好持續幾個星期，影響白天生活，可以預約面診。"
			}
		},
		shoulderK: "鬆一鬆",
		shoulderT: "肩頸放下 · 一分鐘",
		shoulderLead: "跟著提示做。每段約 8 秒。坐著或站著都可以。",
		shoulderPrep: "不必做到足。哪裏痛，或頭暈，就停。",
		shoulderIdle: "坐穩，點開始。",
		shoulderStopped: "已停。不舒服就休息，隨時再來。",
		shoulderStart: "開始",
		shoulderStop: "停",
		shoulderLines: [
			"坐穩。雙腳踩實地面。",
			"留意牙關。上下牙分開一點，舌頭放鬆。",
			"留意眉心。眉頭放開，眼皮放軟。",
			"吸氣，肩膀輕輕提高一點……",
			"呼氣，一次放下。感覺手臂變重。",
			"頭慢慢側向左邊，停一停。回到中間。",
			"頭慢慢側向右邊，停一停。回到中間。",
			"雙手放在大腿。鼻吸 4，口呼 6。完成。隨時再來。"
		],
		parkK: "放下一點",
		parkT: "壓力暫存 · 選一個小步",
		parkLead: "腦中轉著的事，不必一次解決。寫下來，選一個小步，其餘暫存。",
		parkSteps: [
			["寫下一件。", "選現在最重的那件，一句就夠。不必寫原因。"],
			["選一個小步。", "十分鐘內做得到，小到幾乎不會失敗。例如：打開檔案、回一句「收到」。"],
			["其餘暫存。", "還沒到時候的，就留在清單。做完小步，不必馬上想下一步。"]
		],
		parkNote: "如果擔心的是馬上有危險的事，就不要暫存，立刻處理或求助。",
		parkWhatL: "壓著你的事",
		parkWhatPh: "例如：報告星期五要交",
		parkStepL: "十分鐘內的小步（可以留空）",
		parkStepPh: "例如：打開檔案，寫好標題",
		parkAdd: "暫存",
		parkListT: "暫存清單",
		parkEmpty: "清單是空的。",
		parkNoStep: "還沒選小步，也可以。",
		parkDone: "小步做完了",
		parkClear: "清空清單",
		parkPrivacy: "只留在這個分頁，關掉就沒有了。不會儲存，不會上傳。",
		dailyK: "日子有鬆有緊",
		dailyT: "一天的鬆緊節奏",
		dailyLead: "不必整天都放鬆。在幾個位置，鬆一格就夠。",
		daily: [
			{ title: "早上", body: "起床先喝溫水，望一會兒窗外的光。不要一醒就看工作訊息。" },
			{ title: "工作中", body: "每六十至九十分鐘，站起來兩分鐘。肩膀放下，望遠處。" },
			{ title: "吃飯", body: "離開桌面和螢幕吃。吃慢一點，七分飽。" },
			{ title: "下班", body: "做一個交接動作：寫下明天第一件事，闔上電腦。" },
			{ title: "晚上", body: "睡前一小時收起工作。燈調暗。少咖啡，少酒。" },
			{ title: "動一動", body: "每天走路或伸展一點就好。不必練到很累。" }
		],
		acuK: "輕按一下",
		acuT: "舒壓常用穴位",
		acuLead: "點選身上的點，看位置和用法。輕按就好，不代替針灸。適不適合你，要醫生面診才能決定。",
		acuNote: "每個位置輕按約半分鐘，配合慢呼吸。酸脹就停。皮膚有傷口、懷孕，或有出血傾向，請先問醫生。",
		musicK: "聽一段",
		musicT: "靜音樂",
		musicLead: "入房會先播中樂。瀏覽器若擋住，會在你第一次按頁面時開始。音量小，會慢慢淡入，會循環播放。可以隨時轉西樂或靜音。",
		musicSafety: "對聲音敏感，可以不開。聽了不舒服，隨時停。",
		musicPlay: "播放",
		musicStop: "停止音樂",
		musicNow: "正在播放：",
		musicVol: "音量",
		musicCn: "中樂 · 古琴",
		musicWest: "西樂 · 鋼琴",
		tracks: [
			{ id: "kongzi", group: "cn", title: "《孔子讀易》", hint: "古琴 · 約 6 分鐘 · 慢而沉" },
			{ id: "prelude", group: "west", title: "巴赫《平均律》C 大調前奏曲", hint: "鋼琴 · 約 3 分鐘 · 分解和弦，像呼吸般起落" },
		],
		musicCredits: "古琴錄音：Charlie Huang 演奏，維基共享資源，CC BY 2.5；樂曲出自《天聞閣琴譜》（1876），屬公有領域。鋼琴錄音：Kimiko Ishizaka 演奏（Open Well-Tempered Clavier），CC0 公有領域貢獻；巴赫樂曲屬公有領域。本站已轉檔、修剪首尾靜音、統一音量並加淡入淡出。",
		careK: "不要硬撐",
		careT: "何時要面診",
		careLead: "這頁不是診斷。以下情況，請不要只靠自己練習。",
		careNowT: "立刻求醫，或到急症室",
		careNow: [
			"胸口痛、胸口像被壓住，或痛到手臂、下巴、背部。",
			"氣促、冒冷汗、昏倒。",
			"突然劇烈頭痛，或手腳無力、嘴角歪斜、說話不清。",
			"吐血、黑便或便血。"
		],
		careSoonT: "盡快預約面診",
		careSoon: [
			"身體反應持續兩個星期以上沒有改善，或越來越差。",
			"睡不好、胃口差，或體重無故變化。",
			"已經影響工作、上學，或照顧家人。",
			"開始要靠酒、菸或藥物撐著。",
			"新出現心跳不規則、陣發心悸。"
		],
		careMeds: "如果你正在服藥，請不要自行停藥或改藥。中西醫可以一起看。",
		careBook: "預約掛號（澳門地區）→",
		viewK: "慢慢認識",
		viewT: "弦拉得太緊",
		viewP1: "中醫講形神合一。壓力長期不散，氣機容易鬱住。往上走，頭會緊、肩頸會硬。橫在中間，胃會脹、胃口會變。擾到心，心跳會快、睡得淺。",
		viewP2: "身體有反應，不代表你軟弱，也不是想像出來的。調理方向因人而異，要醫生面診才能決定。這裏只是教育內容，不代替看醫生。"
	},
	lines: {
    yali: [
      "肩膀可以低一格。",
      "今天做不完，也很正常。",
      "我一次只做一件事。",
      "緊繃是身體在幫忙，我可以告訴它：夠了。",
      "呼氣比吸氣長，就夠。",
      "未回的訊息，可以等我喝完這口水。",
      "我不必證明自己很忙。",
      "一步小小的，也是一步。",
      "牙關鬆一鬆，世界照樣轉。",
      "休息不是偷懶。",
      "今天的事，可以放在桌面上。",
      "我可以說：晚一點回覆你。"
    ],
    anshen: [
      "現在這一口氣，已經夠我用。",
      "心慌出現，不代表我做錯。",
      "害怕的事可以排隊，我不必一次處理完。",
      "我不必立刻答。",
      "肩上的重擔，我可以放低一點。",
      "神回來，是慢慢回，我不必衝。",
      "這個身體現在在這裏，已經是一件實事。",
      "最壞的情況，我不必現在就考慮。",
      "我有能力把手機反轉不看。",
      "坐不定也可以，我走兩步也行。",
      "心跳快，是它努力；我可以陪它慢回來。",
      "我不必向任何人交代為什麼要停。",
      "一口茶涼了，我都還可以啜。",
      "今晚未到，明天的事我先放下。",
      "我會緊張，這不可恥。",
      "我不是唯一把燈調暗的人。",
      "我把牙關鬆一鬆，世界不會倒。",
      "擔心過了，我都還在這裏。",
      "我小聲呼吸，也算呼吸。",
      "門我可以關，窗我可以留一條縫。",
      "我不必做好，才配休息。",
      "念頭來，我看它過，好像看雲。",
      "現在安全的話，我就守住現在。",
      "手按住心口，告訴這顆心：我在這裏，放心。",
      "一次搞不定，不等於我永遠搞不定。",
      "嘈音大，我可以小聲，不必心煩。",
      "計劃可以寫明天，身體要今晚——我知道。",
      "我已經撐過很多個「撐不過」。",
      "可以怕，我不必裝作鎮定。",
      "怕與勇敢，可以並存。",
      "這一分鐘，我不必進步。",
      "我把眉心放開，事情就會自己排開。",
      "我不欠世界一個即時回覆。",
      "燈暗一格，我的神就近一格。",
      "我回來就好，快慢不要緊。",
      "杯我可以捧住，不必立刻喝完。",
      "資訊，我可以遲一點再看。"
    ],
    jieyu: [
      "現在不想動，我也不算懶。",
      "細到幾乎看不見的一步，也是我的一步。",
      "心情未回，我的動作可以先到門口。",
      "我不必先覺得感恩，才值得被好好對待。",
      "留白，不是我放棄。",
      "今天我只開一扇窗，已經足夠。",
      "重的東西我可以放下一陣，不必永遠放下。",
      "我不是負擔。",
      "吃每一口，都是養我自己。",
      "無人催我開花。",
      "空，不等於沒有我。",
      "我不要用「振作」打自己。",
      "霧天也有路，我只是看不遠。",
      "我可以慢過所有時間表。",
      "還未好起來，但是我還在這裏。",
      "摺好一件衫，也算我今天有努力過。",
      "興趣還沒回來，我的身體也可以被溫柔對待。",
      "我不必證明自己值得被幫。",
      "明天再決定明天，我現在不必。",
      "力氣小，我就用少一點力。",
      "不開心，我不必裝飾。",
      "窗邊那點光，夠我借一陣。",
      "我停下來，不是跌出去。",
      "世界闊過我現在見到的那格。",
      "喝一杯暖水，已經是我照顧自己。",
      "我還在這裏，這句已經很重。",
      "任務，我可以再切細。",
      "我不必喜歡今日，才過今日。",
      "肩上，我不必載完所有人的預期。",
      "氣滯住，我給它一條縫。",
      "我慢慢來，花也是這樣開。",
      "我已經夠努力。",
      "就算只開一瓣花瓣，也是我努力的成果。",
      "不回訊息，不代表我不存在。"
    ],
    anmei: [
      "睡不著，不代表我懶。",
      "我不必用力才睡得著。",
      "床，我只用來睡與親密，不開會。",
      "廿分鐘睡不著，我就起身坐一陣。",
      "不管明早幾點起，我先守住今晚。",
      "酒不是我的安眠藥。",
      "我不必睡滿八小時才算好。",
      "睡醒夠精神，已經是好眠，和睡多久無關。",
      "手機，我可以放到伸手拿不到的地方。",
      "最壞的明天，我不必現在彩排。",
      "亥時，我讓心收工。",
      "心事寫下，留待明天，我現在可以放下。",
      "我不會一直依賴安眠藥。",
      "偶有一兩晚差，人人都會，包括我。",
      "節奏回來，鐘數會慢慢跟。",
      "天花板我已經很熟，我不必再盯著它。",
      "腳夠暖，我就容易入睡一些。",
      "我回床，是因為有睡意，不是因為鐘。",
      "想睡我就睡一陣，醒了再算。"
    ]
  }};
export const EN = {
	ui: {
		language: "Language",
		site: "Body & Mind Classroom",
		back: "← Back to classroom",
		now: "now",
		tap: "tap",
		close: "Close",
		expand: "Tap to open",
		music: "Music",
		musicOn: "Canon · on",
		musicPlay: "Play Canon in D",
		musicPause: "Pause Canon in D",
		musicCredit: "Music: Chinese music starts on entry in each room; Western music or mute available.",
		today: "Today",
		yi: "Do",
		ji: "Don’t",
		desk: "Front desk",
		contact: "Kiang Wu Hospital TCM · Dr. Ho Cheng Hang",
		dept: "TCM",
		qrAlt: "QR code for Body & Mind Classroom",
		qrCap: "Scan with a camera to open the classroom",
		qrDl: "Download QR code",
		qrFile: "shenxin-classroom-qr.png",
		langYue: "Cantonese",
		langCmn: "Written Chinese",
		langEn: "English",
		booking: {
			nav: "Booking (Macau)",
			kicker: "Booking (Macau)",
			title: "Booking an in-person visit, at an easy pace",
			have: "If you have a Kiang Wu Hospital registration card number, you can use the Kiang Wu app to register and book online; if you do not have a number, please attend in person at the hospital.",
			none: "With a registration card number: tap “Online booking (Kiang Wu)” to go to the registration entrance. If you do not have the app yet: please download and register first, then come back and tap booking again.",
			login: "The web version may ask you to sign in again; the app usually keeps you signed in.",
			primary: "Online booking (Kiang Wu)",
			ios: "Download app (Apple)",
			android: "Download app (Android)"
		},
		footerHome: "Herbs and acupuncture must be prescribed in person by a registered Chinese medicine practitioner. If daily function is clearly impaired, also seek mental-health care. This site does not collect medical records.",
		views: "Visits"
	},
	home: {
		feelK: "Which feels closest right now?",
		feelLead: "Pick one to go straight into a room and start with half a minute of breathing.",
		feelAnshen: "Heart racing, can’t sit still",
		feelJieyu: "No energy to get going",
		feelAnmei: "Can’t fall asleep",
		feelYali: "Wound up all the time",
		kicker: "Slow is allowed. Nothing has to be finished today.",
		lede: "Let the breath drop one beat slower. No rush here — only a place to set the heart and the qi down again.",
		anshenK: "Anxiety",
		anshenT: "Calm the Mind",
		anshenD: "When the mind has scattered, it can be gathered back. This room keeps you company.",
		anshenGo: "Enter Calm the Mind →",
		jieyuK: "Low mood",
		jieyuT: "Ease the Heart",
		jieyuD: "When qi is stuck, a small step still counts. This room helps the heaviness loosen.",
		jieyuGo: "Enter Ease the Heart →",
		anmeiK: "Insomnia",
		anmeiT: "Restful Sleep",
		anmeiD: "Lying awake is not laziness. This room gives the bed back to night.",
		anmeiGo: "Enter Restful Sleep →",
		yaliK: "Stress & tension",
		yaliT: "Stress Relief",
		yaliD: "Wound up for long, the neck, stomach and heartbeat start to speak. This room helps you loosen one notch.",
		yaliGo: "Enter Stress Relief →",
		qrK: "For visitors",
		qrT: "One scan to the classroom",
		listenGo: "Listen to other background music →",
		aboutK: "What this is",
		aboutT: "Body & Mind Classroom",
		aboutLead: "You can treat this as a small class of your own. No registration, no records of yours kept, and it does not replace a visit. Plain words, to help you set the heart and the qi down again.",
		aboutBody: "There are four rooms: Calm the Mind, Ease the Heart, Restful Sleep and Stress Relief. Choose the one that feels closest to you right now. Inside you will find short ‘in this moment’ lines, breathing, time-of-day guidance, ear-point locations, and a small card you can bring to a consultation. Each room has Chinese and Western music you can play whenever you like, or turn off to read quietly.",
		illnessK: "Why body and mind",
		illnessT: "Heart and body were never two things",
		illnessLead: "Chinese medicine speaks of form and spirit as one. If your chest races, tightens, nights stay wakeful, appetite dull — this is often not “only mental” or “only physical”, but essence, qi, and spirit out of place. These belong to body-mind illness. This page is not here to diagnose you; we talk with you about living with this body.",
		illnessBody: "If you feel unwell in body and mind, it is not imagined, and it is not weakness. This class helps you notice the signals first. If work or school is already slipping for you, or if there is a wish to harm yourself, please also seek mental-health care and come in for a visit soon.",
		illnessA: "If you are afraid, the heart is fast, you cannot sit still — spirit is scattered. Try Calm the Mind.",
		illnessB: "If you feel low and joyless, do not want to move, and the chest is stuffy — qi is stuck. Try Ease the Heart.",
		illnessC: "If you lie awake or wake easily — sleep has not returned. Try Restful Sleep.",
		illnessD: "If you have been wound up for long — stiff neck, bloated stomach, a racing heart — the string is pulled too tight. Try Stress Relief."
	},
	qr: {
		kicker: "Scan to enter",
		sub: "Calm the Mind · Ease the Heart · Restful Sleep · Stress Relief",
	},
	listen: {
		kicker: "Room music",
		title: "Every room lets you choose",
		lede: "Chinese music starts when you enter a room; if your browser blocks it, it starts on your first tap on the page. Tap the floating music button above to switch to Western music or mute. Each room has one Chinese piece and a different Western piece.",
		now: "Music in each room",
		credit: "The source and licence of each recording are shown at the foot of each room's music section.",
		tracks: [
			{ title: "Calm the Mind", hint: "Chinese: Pingsha Luoyan · Western: Bach, Goldberg Variations, Aria" },
			{ title: "Ease the Heart", hint: "Chinese: Yangguan Sandie · Western: Chopin, Nocturne in E-flat major, Op. 9 No. 2" },
			{ title: "Restful Sleep", hint: "Chinese: Zuiyu Changwan · Western: Satie, Gymnopédie No. 1" },
			{ title: "Stress Relief", hint: "Chinese: Kongzi Duyi · Western: Bach, Prelude in C major (Well-Tempered Clavier I)" }
		]
	},
	play: {
		kicker: "Try today",
		title: "Three small things, with you",
		lead: "Breath, the hours, and a clinic card. Every room has them; only the hours change. No scores, no levels.",
		breathIdle: "The circle grows and settles with you",
		breathHint: "In through the nose for 4, out through the mouth for 6 · three rounds, about half a minute",
		breathIn: "in",
		breathOut: "out",
		breathStart: "Begin half a minute",
		breathStop: "Stop",
		breathDone: "Done. Come back whenever.",
		breathSecK: "One thing first",
		breathSecT: "Half a minute of slow breathing",
		breathSecLead: "No preparation needed — sitting or lying down is fine. Follow the circle for three rounds; that is enough.",
		breathNav: "Breathe",
		breathGo: "Breathe for half a minute ↓",
		breathMoved: "The breathing circle is at the top: “Breathe” ↑",
		hourNow: "now",
		hours: {
			anshen: {
				kicker: "Heart hours",
				title: "Spirit can be gathered in these hours",
				lead: "Anxiety need not race the clock. Tap once, and remember which stretch suits gathering the mind.",
				slots: [
					{ start: 11, end: 13, name: "Wu", line: "Think less. Do not put yourself on trial in this stretch." },
					{ start: 19, end: 21, name: "Xu", line: "Dim the lamp. Keep the screen farther away." },
					{ start: 21, end: 23, name: "Hai", line: "Gather the spirit. The heart begins to clock off." }
				]
			},
			jieyu: {
				kicker: "Qi hours",
				title: "Qi most wants to move in these hours",
				lead: "When it is heavy, you need not walk the whole way at once. Tap once, and remember which stretch suits easing.",
				slots: [
					{ start: 5, end: 7, name: "Mao", line: "Open a crack of window so qi has a way in." },
					{ start: 7, end: 9, name: "Chen", line: "Walk a little with no errand. Ten minutes still counts." },
					{ start: 15, end: 17, name: "Shen", line: "Let the ribs rise and fall with the breath. Do not argue hard." }
				]
			},
			anmei: {
				kicker: "Sleep hours",
				title: "The Hai-hour lamp",
				lead: "Give the bed back to night. Tap once, and remember which stretch suits gathering in.",
				slots: [
					{ start: 19, end: 21, name: "Xu", line: "Less light. No more strong tea." },
					{ start: 21, end: 23, name: "Hai", line: "Draw the heart in. Give the bed back to sleep." },
					{ start: 23, end: 1, name: "Zi", line: "Already lying down. Do not check the books, or the phone." }
				]
			},
			yali: {
				kicker: "Easing hours",
				title: "Hours to loosen one notch",
				lead: "You need not be relaxed all day. Tap once, and remember which stretch suits loosening.",
				slots: [
					{ start: 11, end: 13, name: "Wu", line: "Eat away from the desk. No work." },
					{ start: 15, end: 17, name: "Shen", line: "Stand for two minutes. Drop the shoulders." },
					{ start: 19, end: 21, name: "Xu", line: "Put work away. Make a hand-over." }
				]
			}
		},
		mapEar: "Ear points",
		mapBody: "Body",
		mapNote: "Tap a point to see where it is. Light pressure is fine; this is not acupuncture. Stop if it aches.",
		maps: {
			anshen: {
				shenmen: { d: "Often used to calm the mind. Press until a mild ache." },
				xin: { d: "An educational mark when the heart startles or races." },
				pizhixia: { d: "Helps awareness settle. Do not rub hard." },
				yintang: { d: "When restless, pause one minute; press lightly on the out-breath." },
				neiguan: { d: "Press when the chest races." },
				taichong: { d: "Light press when liver qi is irritable." }
			},
			jieyu: {
				gan: { d: "An educational mark for stuck qi and tightness in the chest and sides." },
				shenmen: { d: "Note this place when heaviness comes with restlessness and poor sleep." },
				jiaogan: { d: "Mark it when the chest is tight and qi will not move." },
				qimen: { d: "Let the ribs follow the breath; do not press hard." },
				neiguan: { d: "Light press when tightness comes with nausea or a racing chest." },
				hegu: { d: "Note it for stuck qi and a tight head." },
				taichong: { d: "Press on the out-breath when heaviness turns toward anger." }
			},
			anmei: {
				shenmen: { d: "Both the ear point and the wrist point share this name. Light press when sleep will not come, or startles easily." },
				zhen: { d: "Mark it when the head will not lower, or feels heavy on waking." },
				pi: { d: "An educational mark for dream-filled nights and a poor appetite." },
				neiguan: { d: "Press if the chest races once you lie down." },
				sanyinjiao: { d: "Note it for yin-blood shortage and night waking." },
				yongquan: { d: "Rub until warm, to draw fire downward." }
			},
			yali: {
				shenmen: { d: "An ear point often used to settle the mind. A gentle pinch of the ear is enough." },
				jiaogan: { d: "An educational mark for times of tension and hurry." },
				pizhixia: { d: "An educational mark for when thoughts will not stop. Do not rub hard." },
				yintang: { d: "When the brow knits, circle gently with a fingertip and let go on the out-breath." },
				neiguan: { d: "Light press when the chest is tight, the stomach bloated or the heart racing. If a racing heart comes with chest pain, do not wait: seek medical care first." },
				hegu: { d: "Press lightly for half a minute when the head, face or jaw feel tight." },
				fengchi: { d: "When the head and neck feel tight, press gently with a fingertip and let go on the out-breath." },
				jianjing: { d: "When the shoulders feel tight, press very gently with a fingertip. Do not press deeply." },
				taichong: { d: "Traditionally used together with Hegu, called the “Four Gates”. Press on the out-breath when irritable or the shoulders are tight." }
			}
		},
		cardK: "Take to clinic",
		cardT: "Today’s card",
		cardLead: "Not a diagnosis. Only what you did or chose in this room today, so you can say one sentence to the physician.",
		cardEmpty: "Nothing noted yet today. Breath, hours, a scan, weather or the diary will appear here afterwards.",
		cardCopy: "Copy text",
		cardCopied: "Copied.",
		cardBreath: "Breath",
		cardHour: "Hours",
		cardScan: "Scan",
		cardWeather: "Weather",
		cardBloom: "Qi petals",
		cardDiary: "Diary nights",
		cardPoints: "Points",
		cardFollow: "Follow",
		cardFoot: "An education note, not a diagnosis.",
		jieqi: "Solar term"
	},
	week: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	date: (y: number, m: number, d: number, w: string) => `${w}, ${d} ${EN_MONTHS[m - 1]} ${y}`,
	anshen: {
		title: "Calm the Mind",
		kicker: "The heart can be a little quieter",
		lede: "You do not have to get well at once. Slow the breath first, and gather the scattered spirit back into the chest.",
		footerName: "Body & Mind Classroom · Calm the Mind",
		footerNote: "This is traditional Chinese medicine education, not a diagnosis or prescription. Herbs must be prescribed in person. If function stays impaired or panic appears, contact emergency or mental-health services. We do not collect records.",
		musicOn: "Pingsha · on",
		musicCredit: "Music (Chinese music starts on entry; Western or mute available): guqin “Pingsha Luoyan”, performed by Charlie Huang, CC BY 2.5 (Wikimedia Commons); Bach, Goldberg Variations Aria, performed by Kimiko Ishizaka, CC0.",
		nav: [
			{
				href: "#view",
				label: "TCM view"
			},
			{
				href: "#types",
				label: "Patterns"
			},
			{
				href: "#points",
				label: "Five points"
			},
			{
				href: "#scan",
				label: "Scan"
			},
			{
				href: "#cbt",
				label: "Self-help"
			},
			{
				href: "#acu",
				label: "Acupuncture"
			},
			{
				href: "#play",
				label: "Try today"
			},
			{
				href: "#daily",
				label: "Daily"
			}
		],
		photo: "Celadon bowl in daylight",
		viewK: "Pause first",
		viewT: "Anxiety, in Chinese medicine, is spirit with nowhere to rest",
		viewP1: "The Inner Classic says fright scatters qi, and overthinking knots it. Anxiety is often not one feeling, but qi between heart, liver, gallbladder and kidney gone unruly: stagnant liver qi turns irritable; a floating heart-spirit startles; weak gallbladder qi fears easily; insufficient yin lets empty heat disturb the mind.",
		viewP2: "This is education, not a substitute for care. If anxiety already disrupts daily life or panic attacks appear, seek proper medical help now.",
		typesK: "Know them slowly",
		typesT: "Six common patterns",
		types: [
			{
				title: "Liver qi transforming into fire",
				body: "Irritable, sighing, bitter taste, tightness in the sides. Try: less spice and late nights; lightly press the sides and Taichong (LR3); leave the room for half a minute when heat rises."
			},
			{
				title: "Heart–gallbladder qi deficiency",
				body: "Easily startled, timid, a small sound sets the heart racing. Try: fewer frightening feeds; light press on Shenmen (HT7) and Neiguan (PC6); one tiny task you can finish in the day."
			},
			{
				title: "Heart–spleen dual deficiency",
				body: "Overthinking, tired, poor appetite, sallow face. Try: warm meals on time; less rumination; a walk instead of night grinding."
			},
			{
				title: "Heart–kidney not communicating",
				body: "Restless, lumbar ache, night sweat, hard to fall asleep. Try: turn the lights off earlier; less night screen; rub Yongquan (KI1) warm."
			},
			{
				title: "Phlegm-fire harassing above",
				body: "Restless, sticky mouth, much phlegm, cannot sit still. Try: lighter food, less sweet and greasy; a short walk after meals."
			},
			{
				title: "Yin deficiency with inner heat",
				body: "Five-centre heat, dry mouth, tidal warmth. Try: less spice and late nights; moisten rather than dry; leave the afternoon empty; no extra strong tea."
			}
		],
		pointsK: "A light press",
		pointsT: "Five points to settle spirit",
		pointsLead: "Choose a point, then hold the button about 20 seconds — a stand-in for a light press. Breathe slowly — the rhythm is in the hint below (the same as the breathing circle at the top).",
		scanK: "Listen inward",
		scanT: "Heart-spirit scan",
		scanLead: "Pick what is closest to recent days (up to two). You will get living guidance — not a diagnosis, not a prescription.",
		cbtK: "Practise yourself",
		cbtT: "Practices you can do",
		cbtLead: "Two methods you can follow on your own. You need not learn both today. Severe panic, OCD, trauma, or work and school already harmed: seek care as well — do not rely on this page alone.",
		worryT: "Practice 1 · Postpone worry",
		worryP: "Worries circling in the mind need not be tried at once. Log them by day, and keep a short slot for them. This gathers spirit for a while — it does not say nothing is wrong.",
		worrySteps: [
			["Set the slot first.", "Choose 15 minutes today, e.g. 8:00–8:15 after dinner. That is the worry period. Outside it, do not unpack the worry."],
			["When a scare arrives.", "Do not debate yourself or search at once. Write one line: what, roughly when. Tell yourself: “Look at 8.” Return to the small thing in your hands."],
			["Open it only then.", "Sit. Two minutes per line: is there a tiny act you can do now? If yes, write it; if no, write “not yet.” Do not add new disaster scripts as you read."],
			["Close when time is up.", "Shut the list. Do something bodily: pour water, wash hands, walk to a window. Unfinished items wait for the same slot tomorrow."]
		],
		worryNote: "If the worry is immediate danger (body symptoms that need care now), do not postpone — act or get help. This practice is only for fears that spin in the mind and cannot be done now.",
		worryTry: "Try once: write a line and set it down.",
		pmrT: "Practice 2 · Progressive relaxation",
		pmrP: "In anxiety the body tightens by itself and the mind floats after it. This practice: gently tense one group, then let go fully, so the body remembers looseness. Later, a tight moment in the day can soften on one out-breath.",
		pmrPrep: "Sit or lie down; shoes may come off. Phone silent. No need to be perfect. Stop if dizzy, numb, or unwell.",
		pmrSteps: [
			["One job per group.", "Tense lightly about 5 seconds (about 40% effort), then release all at once. Notice warmth, heaviness, tingles. Rest 10 seconds, then the next group."],
			["Start from the hands:", "Fist → forearm and shoulder → face and jaw → chest and belly → legs and feet. A guide below prompts each group for about 8 seconds."],
			["The first days.", "One round a day, at a quieter time. Do not score “relaxation.” Finishing a round is enough."],
			["Shorten once familiar.", "Later: notice neck and shoulders tight → in 4 → out 6, and drop that group on the out-breath. That is “soften on one breath,” for queues, before meetings, when the chest is tight."]
		],
		pmrTry: "Follow one round (about a minute).",
		avoidT: "If you keep avoiding something",
		avoidP: "Not riding, not replying, not going out alone. Avoidance soothes now and grows the fear later. Try: name one avoided thing, cut it to a first step almost too small to fail (walk to the downstairs door and return). Do not grade success at once. Only if life is not yet badly impaired; panic attacks and trauma memories need a professional.",
		acuK: "Clinic can help",
		acuT: "Acupuncture and ear points",
		acuP: "Besides living practice, acupuncture and ear points can help gather scattered spirit. Whether they suit you, and which sites, is decided in person.",
		acuItems: [{
			title: "Why acupuncture",
			body: "Needling channels aims to open meridians and regulate qi and blood, so spirit has a place to rest. Excess liver qi is drained; a floating heart-spirit is helped to settle. Modern work also sees autonomic and stress responses slow when needling is appropriate."
		}, {
			title: "Why ear points",
			body: "The ear is said to gather the ancestral vessels; viscera have corresponding zones on the auricle. Seeds or beads give a small, lasting stimulus; between visits you may press as taught. Spirit, heart and liver zones are common, but combinations differ by person."
		}],
		acuNote: "Needle time, how many days beads stay, and cautions (skin, pregnancy, bleeding tendency) are not listed here. Ask a doctor in the Kiang Wu TCM department.",
		dailyK: "The day can be lighter",
		dailyT: "A small day of calming",
		daily: [
			{
				title: "Drink",
				body: "Rose with Ophiopogon, or a tiny amount of lotus plumule. If mouth is bitter and restless: less ginger, less wine."
			},
			{
				title: "Move",
				body: "On a walk, rub Neiguan (PC6) lightly. Avoid hard exercise before bed and short videos at lights-out."
			},
			{
				title: "Hour",
				body: "7–9 pm is pericardium time: put the phone away, warm the feet, dim the lamp."
			},
			{
				title: "Avoid",
				body: "Too much coffee, late fried spice, and rehearsing the worst case with someone on a loop."
			},
			{
				title: "Lily bulb",
				body: "Wang Shixiong, Suixiju Diet Manual: lily bulb is sweet and neutral — clears the heart, steadies the spirit, eases fright, and soothes sorrow. Steam or boil it plain, or as congee. Do not eat it in a wind-cold cough, or with loose stool from cold in the middle. Lotus plumule is bitter and cool; it clears heat and nourishes spirit — only a tiny amount. Food knowledge, not a prescription."
			}
		],
		points: {
			baihui: {
				d: "Raises the clear and steadies spirit. For a heavy head and thoughts floating up."
			},
			yintang: {
				d: "Gathers spirit, eases the frown. For restlessness and a tight brow."
			},
			shenmen: {
				d: "Source point of the heart channel; calms the heart."
			},
			neiguan: {
				d: "Opens the chest, stills palpitations, settles the stomach."
			},
			taichong: {
				d: "Courses liver and brings uprising qi down. For irritability."
			}
		},
		breath: "Breath: nose in 4 · mouth out 6",
		hold: "Hold and rub · 20 s",
		held: "Enough · change the breath",
		scan: {
			fire: {
				label: "Irritable, sighing, bitter taste, tightness in the sides",
				note: "Liver qi is apt to stagnate and turn to heat. Guidance: less spice and wine, fewer late nights; on a sigh, lightly press Taichong (LR3) and Hegu (LI4) and drop the shoulders. Leave the scene for half a minute before deciding whether to speak."
			},
			timid: {
				label: "Easily startled; a sound sets the heart racing",
				note: "Spirit is scattered, easily taken by sound and messages. Guidance: fewer frightening feeds by day; light press on Shenmen (HT7) and Neiguan (PC6); one tiny, finishable task so the heart has a place to land."
			},
			spleen: {
				label: "Overthinking, tired, poor appetite, loose stool",
				note: "Thought has worn spleen, stomach and heart-spirit together. Guidance: warm meals on time, no long thinking on an empty stomach; a walk beats night grinding; half a chore still counts as done."
			},
			kidney: {
				label: "Restless with lumbar ache, night sweat, hard to sleep",
				note: "Heart fire and kidney water are not meeting. Guidance: turn the lights off earlier, less night screen; rub Yongquan (KI1) warm at bedtime; no extra strong coffee in the day."
			},
			phlegm: {
				label: "Sticky mouth, much phlegm, cannot sit, many dreams",
				note: "Damp-heat within; phlegm-fire disturbs spirit. Guidance: lighter food, less sweet fry; a short walk after meals; no short videos before bed."
			}
		},
		scanNote: "Scan notes",
		scanFoot: "Living guidance, not a diagnosis or prescription. Herbs: see a registered practitioner in person.",
		worryPh: "e.g. I will ruin tomorrow’s meeting",
		park: "Set down",
		parkLater: "Set down; look tonight",
		parkOpen: "Open the hold when the slot comes",
		parked: "Set down. You need not try it by day.",
		parkedN: (n: number) => `${n} set down. Return to what is in your hands; open the hold in your chosen slot.`,
		worrySlot: "Worry period",
		worryEmpty: "The hold is empty.",
		worryReview: "Look line by line: is there a tiny act you can do now? If yes, do it or write it; if no, treat it as “not yet.” Two minutes each, then close.",
		pmrIdle: "Sit. Press start. Each group rests about 8 seconds.",
		pmrStop: "Stopped. Rest if unwell. You can return any time.",
		pmrStart: "Start",
		pmrPause: "Stop",
		pmrLines: [
			"Hands: light fist 5 seconds… release at once; palms warm, fingers heavy.",
			"Shoulders: rise a little, not with force… drop on the out-breath; collarbones open.",
			"Face: a light clench of the jaw, a brief frown… unclench; tongue may rest on the palate.",
			"Chest and belly: a slight draw-in on the in-breath… soften the whole out-breath; no need to lift the chest.",
			"Legs: toes press the floor 5 seconds… drop the whole leg; knees may bend a little.",
			"Close: in 4, out 6. Bring attention to the chest. Done. Return any time."
		]
	},
	jieyu: {
		title: "Ease the Heart",
		kicker: "Qi can move a little slower",
		lede: "No one is asking you to be strong. A very small, very slow path, so liver qi has somewhere to go.",
		footerName: "Body & Mind Classroom · Ease the Heart",
		footerNote: "Education, not diagnosis or prescription. Herbs and acupuncture must be given by a registered practitioner. If low mood lasts and function falls, also seek mental-health care. This site does not store your choices.",
		musicOn: "Yangguan · on",
		musicCredit: "Music (Chinese music starts on entry; Western or mute available): guqin “Yangguan Sandie”, performed by Charlie Huang (Charles R Tsua), CC BY-SA 3.0 (Wikimedia Commons); Chopin, Nocturne in E-flat major Op. 9 No. 2, performed by Frank Lévy, Musopen, public domain.",
		nav: [
			{
				href: "#view",
				label: "TCM view"
			},
			{
				href: "#types",
				label: "Patterns"
			},
			{
				href: "#steps",
				label: "Small steps"
			},
			{
				href: "#weather",
				label: "Weather"
			},
			{
				href: "#ba",
				label: "Activation"
			},
			{
				href: "#acu",
				label: "Acupuncture"
			},
			{
				href: "#play",
				label: "Try today"
			},
			{
				href: "#daily",
				label: "Daily"
			}
		],
		photo: "A green plant by a sunlit window",
		viewK: "Pause first",
		viewT: "Low mood often begins as stuck qi",
		viewP1: "Chinese medicine places this among the constraint patterns. The core is often liver failing to course, qi not moving, then phlegm, fire, vacuity or stasis joining. The seat is liver, often involving heart, spleen and kidney. Care is not only “cheer up,” but course, nourish and move together.",
		viewP2: "This site is for education. Moderate to severe depression needs modern psychiatric care as well. Chinese medicine can walk beside it, not replace it.",
		typesK: "Know them slowly",
		typesT: "Common patterns",
		types: [
			{
				title: "Liver qi stagnation",
				body: "Low, sighing, tightness in the sides, belching. Try: open a window, walk slowly, let the sides rise and fall with the breath; do not fill the whole day at once."
			},
			{
				title: "Liver constraint with spleen vacuity",
				body: "Heaviness plus fatigue, poor appetite, loose stool. Try: warm food, cut the task one size smaller; protect spleen before demanding cheer."
			},
			{
				title: "Liver constraint turning to fire",
				body: "Irritable, bitter taste, red eyes, dry stool. Try: less spice and wine; a short write or silk-tree flower tea as an outlet, not a hard argument."
			},
			{
				title: "Phlegm-qi binding",
				body: "Plum-pit qi, chest tightness, much phlegm. Try: lighter food, less sweet grease; let the chest widen on the out-breath."
			},
			{
				title: "Heart-spirit unnourished",
				body: "Palpitations, easily startled, weary spirit, ready to weep. Try: a warm cup, fewer frightening feeds; allow a pause."
			},
			{
				title: "Heart–spleen dual deficiency",
				body: "Overthinking, weak, forgetful, sallow. Try: meals on time, finish one small thing, a walk instead of long rumination."
			}
		],
		stepsK: "A small step counts",
		stepsT: "Small steps for qi",
		stepsLead: "Five tiny acts, one petal each. Tap when done. Five petals, and a flower opens in the middle. You need not do all today. However many you do still counts.",
		weatherK: "How today feels",
		weatherT: "Heart–liver weather",
		weatherLead: "Pick the closest weather. You will get one short hint.",
		baK: "Practise yourself",
		baT: "Behavioural activation",
		baLead: "When mood has not returned, it is easy to wait for drive. Activation turns it around: the act can be tiny; mood may follow later. Moderate to severe cases must also seek care — this is only a first frame.",
		baSteps: [
			["Do not wait for mood.", "Depression often says “no interest, so I won’t.” Pick something almost too small to fail; rate mood after, rather than waiting for mood to allow the act."],
			["Two scores.", "Pleasure: did the body feel even a little ease? Mastery: did you do it, finish it? Both 0–10; low scores still count. Mastery often returns first; pleasure later."],
			["Cut one size smaller.", "“Clean the room” is too big. Make it “wash the cup.” If tired, smaller: “carry the cup to the sink.” Qi needs a path; the path should be short."],
			["Log first; do not judge yet.", "Write what you did and both scores. Look tomorrow; do not put yourself on trial tonight. A low score is data, not failure."]
		],
		baNote: "Pick one kind, write your tiny version, save it to today’s slot; score after. You need not do all four.",
		baToday: "Today’s slot",
		acuK: "Clinic can help",
		acuT: "Acupuncture and ear points",
		acuP: "When qi is stuck, acupuncture and ear points can offer a way through. Whether they suit you, and which sites, is decided in person.",
		acuItems: [{
			title: "Why acupuncture",
			body: "Needling opens channels and harmonises qi and blood. Liver governs coursing; stuck qi swells, wants to weep, cannot go. Needling helps that qi move again. Modern work also sees autonomic tone and stress hormones shift when needling is appropriate."
		}, {
			title: "Why ear points",
			body: "The ear gathers the ancestral vessels; viscera map onto the auricle. Seeds or beads give a small, lasting stimulus; between visits you may press as taught. Liver, heart and Shenmen (ear) are often involved; pairing and duration differ by person."
		}],
		acuNote: "Formulas and taping methods are not listed. Needle time, beads, and cautions (skin, pregnancy, bleeding) — ask a doctor in the Kiang Wu TCM department.",
		dailyK: "The day can be lighter",
		dailyT: "Easing the heart in daily life",
		daily: [
			{
				title: "Scent and drink",
				body: "Rose, silk-tree flower, tangerine peel. If liver constraint has turned to fire, less strong rose; a little Ophiopogon and chrysanthemum instead."
			},
			{
				title: "Hour",
				body: "At first light, even opening the curtain is a way of coursing the day’s qi."
			},
			{
				title: "Food",
				body: "Less cold and greasy. Yam and millet protect spleen, so exuberant liver qi does not drag the middle."
			},
			{
				title: "Boundary",
				body: "Do not use “cheer up” as a whip. Stuck qi needs a path, not a beating."
			},
			{
				title: "Ease constraint",
				body: "Suixiju Diet Manual: rose is sweet, pungent and warm — harmonises the middle, moves blood, eases constraint and soothes the liver. It may be distilled, or taken as a light tea. Cooked lotus root nourishes the heart, generates blood, opens the appetite and eases constraint. Lotus seed astringes and stalls qi — avoid it if qi is stuck with fullness, or with constipation. Food knowledge, not a prescription."
			}
		],
		acts: [
			"Open a window for a minute; look at a tree or a piece of sky",
			"Hold a warm cup; smell tea or plain water’s steam",
			"Lightly press toward Qimen (LR14) at the sides; drop the shoulders on the out-breath",
			"Write one line — “where the body is heaviest today” — then stop",
			"Walk 200 steps outside; do not score how pretty the steps look"
		],
		bloom: [
			"Not yet in bloom. Tap one act for a first petal.",
			"One petal. Already not zero.",
			"Two petals. Qi has a way in.",
			"Three petals. Qi begins to loosen.",
			"Four petals. One more and it opens.",
			"A flower opened. Enough for today; add nothing more."
		],
		weather: {
			fog: {
				label: "Fog · cannot lift",
				note: "Fog days suit tiny acts: warm a cup, crack a window. Spleen is not awake; do not ask for efficiency."
			},
			cloud: {
				label: "Overcast · tight and dull",
				note: "Dull tightness is often stuck qi. Let the sides move with breath, or walk a path with no goal."
			},
			thunder: {
				label: "Thunder · restless, near tears",
				note: "Thunder sits near liver constraint turning to fire. Less argument and wine; silk-tree flower or a short write so fire has an exit."
			},
			rain: {
				label: "Rain · wants to sleep",
				note: "Rain sits near vacuity and spleen. Warm food, lie down early, cut the task smaller; do not tell yourself to cheer up."
			},
			dry: {
				label: "Dry · bitter mouth, easy anger",
				note: "Dry heat likes clear food, greens, fewer late nights. Taichong (LR3) may be pressed lightly; do not hold the anger rigid."
			},
			clear: {
				label: "Thin sun · a seam of light",
				note: "Protect the seam: do not fill the day at once. Leaving space is itself coursing."
			}
		},
		hints: {
			enjoy: "Tiny sensory version: steam of tea, a warm cup, one tree.",
			master: "Tiny mastery: pour water, fold one thing, reply one word.",
			close: "Tiny contact: send an emoji, say one line to the windowsill.",
			body: "Tiny body: stand 30 seconds, drop the shoulders three times, walk to the door."
		},
		baKinds: [
			["enjoy", "Pleasure · senses"],
			["master", "Mastery · one small thing"],
			["close", "Contact · one line"],
			["body", "Body · three minutes"]
		],
		pleasure: "Pleasure",
		mastery: "Mastery",
		baSave: "Save to today’s slot",
		baScore: "I did it — log the scores",
		baSaved: (t: string) => `Today’s slot is set: ${t}. You need not wait for a good mood to start.`,
		baScored: (p: string, m: string) => `Logged. Pleasure ${p} / mastery ${m}. A low score still counts as done — activation before judgement.`
	},
	anmei: {
		title: "Restful Sleep",
		kicker: "Night can be a little softer",
		lede: "Lying awake is not laziness. Give the bed back to sleep, and let the heart clock off between 9 and 11 pm.",
		footerName: "Body & Mind Classroom · Restful Sleep",
		footerNote: "Education, not diagnosis or prescription. Herbs and acupuncture must be given by a registered practitioner. Sleeping pills are for short use; stopping them needs a doctor. We do not collect records. Loud snoring or irresistible daytime sleep: seek care soon. If there are thoughts of self-harm, call 999 or Caritas Macau Life Hotline 2852 5222.",
		musicOn: "Zuiyu · on",
		musicCredit: "Music (Chinese music starts on entry; Western or mute available): guqin “Zuiyu Changwan”, performed by Charlie Huang (Charles R Tsua), CC BY-SA 3.0 (Wikimedia Commons); Satie, Gymnopédie No. 1, performed by Robin Alciatore, Musopen, public domain.",
		nav: [
			{
				href: "#view",
				label: "TCM view"
			},
			{
				href: "#quiz",
				label: "Tonight’s pattern"
			},
			{
				href: "#myths",
				label: "Myths"
			},
			{
				href: "#cbti",
				label: "CBT-I"
			},
			{
				href: "#hygiene",
				label: "Hygiene"
			},
			{
				href: "#yangsheng",
				label: "Living"
			},
			{
				href: "#acu",
				label: "Acupuncture"
			},
			{
				href: "#play",
				label: "Try today"
			},
			{
				href: "#diary",
				label: "Diary"
			}
		],
		photo: "Warm lamp and a bedside in a dusk bedroom",
		viewK: "Pause first",
		viewT: "Insomnia, in Chinese medicine, is sleeplessness — yang not entering yin",
		viewP1: "Yang entering yin is sleep. Spend yang by day, and yin can receive it at night. The same sleeplessness can grow in different soil: overthinking with heart–spleen vacuity, liver constraint turning to fire, yin vacuity with inner heat, phlegm-heat harassing within, heart–gallbladder qi deficiency. Copying someone else’s herbs often meets the wrong soil.",
		viewP2: "This is education. Chronic insomnia (at least three nights a week, three months, daytime dullness) should also meet modern sleep care. Chinese medicine can walk beside it, not replace it.",
		soils: [
			{
				title: "Heart–spleen dual deficiency",
				body: "Dream-disturbed, easy waking, tired, little appetite. Try: warm meals on time, less night grinding; light press on Shenmen (HT7) and Neiguan (PC6)."
			},
			{
				title: "Yin deficiency with inner heat",
				body: "Restless, night sweat, waking after midnight, dry mouth. Try: lights off earlier, less spice; rub Yongquan (KI1) warm."
			},
			{
				title: "Liver constraint turning to fire",
				body: "Hard to fall asleep, irritable, bitter taste. Try: less argument and wine; write one line when heat rises, then stop."
			},
			{
				title: "Phlegm-heat harassing within",
				body: "Heavy head, tight chest, greasy tongue, not clear lying down. Try: a small, clear supper; less sweet grease."
			},
			{
				title: "Heart–gallbladder qi deficiency",
				body: "Easily startled, many dreams, a small sound wakes you. Try: fewer frightening feeds; allow a pause."
			}
		],
		quizK: "Not a test",
		quizT: "Which does tonight most resemble",
		quizLead: "Three questions lead to the section worth reading first. Not a diagnosis.",
		mythsK: "Tap to turn",
		mythsT: "Sleep myths",
		mythsLead: "These lines are common. The back is the sentence to take away.",
		cbtiK: "Practise yourself",
		cbtiT: "Cognitive behavioural therapy for insomnia (CBT-I)",
		cbtiP: "The ceiling is already familiar. The clock ticks; trying harder wakes you more. Many begin with stress; later “trying to sleep” is the problem. The bed becomes a tense place. CBT-I’s first lesson: teach the brain again that bed equals sleep.",
		cbtiSteps: [
			["Bed is for sleep.", "No work, no scrolling, no accounts. Much insomnia is trained by being awake in bed. Give the bed back to sleep."],
			["If awake, get up.", "After about twenty minutes still awake, sit somewhere dim with low-stimulus material; return only with sleepiness. Do not hold a meeting with yourself in bed."],
			["Same rise time every day.", "Weekends included (a holiday may flex within an hour). Whatever last night was, this is the one thing you can start this week — and the most effective."],
			["Do not force sleep.", "“I must get eight hours tonight” wakes the nervous system more. Full CBT-I is about four to eight weeks with a trained guide. Sleep restriction has strong evidence and is easy to misuse — do not shorten sleep on your own."]
		],
		cbtiNote: "Sleeping pills are for short use; stopping them needs a doctor. Bipolar disorder, epilepsy, pregnancy, night driving or shift work: do not self-apply sleep restriction. It can run alongside Chinese medicine care.",
		hyK: "Tonight’s ticks",
		hyT: "Good sleep and sleep hygiene",
		hyP1: "Good sleep is judged by the next day, not the clock. “I didn’t get eight hours” — pause. Most people fall asleep within thirty minutes, wake restored, and get through the day. One or two poor nights happen to everyone.",
		hyP2: "If there is enough chance and a decent setting, yet falling asleep is hard, waking is easy or early, and the day is tired, irritable or frightened of insomnia — that is clinical insomnia, not a pillow swap.",
		ysK: "Start with living",
		ysT: "Daily cultivation",
		ysLead: "Spend yang by day so yin can receive it at night. Points and food therapy are care, not a substitute for a visit.",
		ys: [
			{
				title: "9–11 pm, heart off duty",
				body: "Lights down 21–23, fewer words, fewer screens. Ten to twenty minutes of morning light makes sleepiness likelier at night."
			},
			{
				title: "Around 11 pm, already lying down",
				body: "To bed around 23; no office work. A ten-to-twenty-minute midday close of the eyes is fine; a long nap disturbs night."
			},
			{
				title: "Supper early and small",
				body: "An uneasy stomach will not lie quiet. Too full, oily or spicy all hinder sleep. Lotus seed, lily bulb and red date are food-therapy directions; use care if phlegm-damp, bloating or high blood sugar."
			},
			{
				title: "Set the affect down",
				body: "Write the worry on paper for tomorrow. An evening walk, eight-section brocade or tai chi suits better than hard exercise at lights-out. A 10–15 minute warm foot bath until the feet are warm."
			},
			{
				title: "Food care",
				body: "Suixiju Diet Manual: dried lotus seed is sweet and warm, calms spirit and supplements qi; cook it with rice as congee. Avoid it around an external illness, with qi constraint and fullness, or with constipation. Longan is sweet and warm — supplements heart qi and steadies the spirit; best as a decoction. Avoid it if an external illness is not cleared, if there is constrained fire, or if you are full and not hungry. Dried jujube moistens the lung and calms spirit; the red date opens the appetite and nourishes the heart. Too much produces phlegm and heat. Food knowledge, not a prescription."
			}
		],
		pressT: "A light press before bed",
		pressLead: "About a minute each point, to a sore-distending feel. Pregnancy, diabetic feet, broken skin: ask a practitioner first.",
		press: [
			{
				id: "shenmen",
				body: "Often used to calm spirit. Pair with slow breath."
			},
			{
				id: "neiguan",
				body: "For overthinking, palpitations, rebellious stomach qi."
			},
			{
				id: "sanyinjiao",
				body: "Meeting of liver, spleen and kidney."
			},
			{
				id: "yongquan",
				body: "Rub after a foot bath."
			}
		],
		acuK: "Clinic can help",
		acuT: "Acupuncture and ear points",
		acuP: "Needle, ear points, Chinese massage and moxibustion are chosen by pattern — not a “sleep-top-up needle.” Suitability needs an in-person visit.",
		acuItems: [{
			title: "Why acupuncture",
			body: "Opens channels and regulates qi and blood so yang can enter yin. Modern work also sees autonomic shift with appropriate needling. Shenmen (HT7), Neiguan (PC6) and Baihui (GV20) are often involved; combinations differ."
		}, {
			title: "Why ear points",
			body: "The ear gathers the ancestral vessels. Seeds or beads give a small, lasting stimulus, useful for people at work. Pairing and duration: ask a doctor in the Kiang Wu TCM department."
		}],
		acuNote: "Yin vacuity with fire, or phlegm-heat, should not receive casual moxibustion. One or two treatments rarely root out months of insomnia; living work still matters. Pregnancy, liver or kidney disease, anticoagulants or psychiatric drugs must be told to the practitioner.",
		diaryK: "Bring to follow-up",
		diaryT: "Seven-day sleep diary",
		quizNotDx: "Not a test, and not a diagnosis",
		quizSee: "Read this section →",
		quizAgain: "Answer again",
		heard: "People often say",
		actually: "In fact",
		flip: "Tap to turn",
		unflip: "Tap to turn back",
		doneN: (n: number) => `${n} / 6 done. Stored only on this device.`,
		diaryLead: "A minute or two each night. Showing the screen at follow-up is far more useful than only saying “I sleep badly.” It stays on this device.",
		filled: (n: number) => `${n} / 7 nights filled`,
		dayShort: (m: number, d: number) => `${d} ${EN_MONTHS_SHORT[m - 1]}`,
		latency: "How long to fall asleep after lying down",
		wakes: "Waking in the night",
		energy: "Next-day energy (1 poor · 5 good)",
		unset: "Not filled",
		latOpts: [
			"Under fifteen minutes",
			"About thirty minutes",
			"About an hour",
			"More than an hour"
		],
		wakeOpts: [
			"None",
			"Once",
			"Twice",
			"Three times or more"
		],
		quizQs: [
			{
				q: "What happens most at night?",
				opts: [
					{
						label: "It takes a long time to fall asleep",
						tag: "cbti"
					},
					{
						label: "I wake in the night and cannot return",
						tag: "cbti"
					},
					{
						label: "I wake before light and cannot return",
						tag: "yangsheng"
					},
					{
						label: "One or two poor nights; days are still all right",
						tag: "hygiene"
					}
				]
			},
			{
				q: "What have you been doing more of?",
				opts: [
					{
						label: "Scrolling or drinking to force sleep",
						tag: "hygiene"
					},
					{
						label: "Catching up at the weekend; Mondays are harder",
						tag: "hygiene"
					},
					{
						label: "Buying calming teas or patent medicines myself",
						tag: "treatment"
					},
					{
						label: "Foot baths, fewer late nights, writing worries down",
						tag: "yangsheng"
					}
				]
			},
			{
				q: "Which is closer by day?",
				opts: [
					{
						label: "A little tired, but I manage",
						tag: "hygiene"
					},
					{
						label: "Exhausted, irritable, poor memory",
						tag: "cbti"
					},
					{
						label: "Restless, dry mouth, bloating or easy anger",
						tag: "treatment"
					},
					{
						label: "Palpitations, easily startled; a sound wakes me",
						tag: "treatment"
					}
				]
			}
		],
		quizRes: {
			cbti: {
				title: "The bed may already be a battlefield",
				body: "Lying awake, fearing another bad night — this loop is common. Internationally, CBT-I is taught before adding medicine. “Practise yourself” below has steps.",
				href: "#cbti"
			},
			hygiene: {
				title: "Start with rhythm and setting",
				body: "Good sleep is next-day restoration, not eight hours on the clock. “Sleep hygiene” below has small ticks for tonight.",
				href: "#hygiene"
			},
			yangsheng: {
				title: "The day’s account wants to close at night",
				body: "Yang entering yin is sleep. Let the heart clock off: quiet from 9 pm, an early supper, worries written down. Detail is in “Daily cultivation.”",
				href: "#yangsheng"
			},
			treatment: {
				title: "Do not take calming herbs long on your own",
				body: "The same sleeplessness can grow in different soil. Herbs, acupuncture and ear points need an in-person visit. “TCM view” and “Acupuncture” below are education, not a prescription.",
				href: "#view"
			}
		},
		myths: [
			{
				front: "Everyone needs eight hours",
				back: "Judge by next-day restoration. Most adults need about seven to nine hours; people differ a lot."
			},
			{
				front: "If I cannot sleep I should stay in bed till dawn",
				back: "The bed slowly becomes a tense place. After about twenty minutes still awake, get up for something low-stimulus; return with sleepiness."
			},
			{
				front: "A drink makes sleep easier",
				back: "The first half may come sooner; the second half of the night is more broken. Alcohol is not a sleeping pill."
			},
			{
				front: "Weekend catch-up pays the debt",
				back: "If rise times drift too far, Monday is harder. Rhythm matters more than clawing hours back."
			},
			{
				front: "There is one most effective calming medicine",
				back: "Chinese medicine differentiates: heart–spleen vacuity, yin vacuity, liver constraint — directions differ completely. Do not buy patent medicines long on your own."
			},
			{
				front: "If hygiene is perfect, chronic insomnia will lift",
				back: "Hygiene is the ground. Sleep that has been trained tense needs CBT-I, and sometimes Chinese and Western care together."
			}
		],
		checks: [
			"Fixed rise time (weekends too; flex within an hour)",
			"Phone out of reach for the hour before bed",
			"Less coffee, strong tea and energy drinks after noon",
			"Bedroom cool and quiet (about 18–22°C)",
			"If still awake after about twenty minutes, get up; return with sleepiness",
			"Do not use alcohol to force sleep"
		]
	},
	almanac: [
		{
			yi: "Open the window a crack and steal a piece of sky home.",
			ji: "Do not end the day with “I am useless again.”"
		},
		{
			yi: "Say morning to the cup, as if it can hear.",
			ji: "Do not reopen old accounts to hit yourself."
		},
		{
			yi: "Pair one sock. A little order still counts.",
			ji: "Do not say yes to everyone at once."
		},
		{
			yi: "Walk the corridor to the corner and back, as if travelling.",
			ji: "Do not use “cheer up” as a whip."
		},
		{
			yi: "Cut a fruit in two; keep half, leave half.",
			ji: "Do not compare how lively other people look today."
		},
		{
			yi: "Fluff the pillow, as if you deserve to rest.",
			ji: "Do not hang the day with “should.”"
		},
		{
			yi: "Nod to a plant, as a greeting.",
			ji: "Do not replay awkward scenes late at night."
		},
		{
			yi: "Line the shoes up; the doorway loosens too.",
			ji: "Do not think long on an empty stomach."
		},
		{
			yi: "Send one emoji. No essay required.",
			ji: "Do not tell yourself “look at you.”"
		},
		{
			yi: "Turn the radio very low, as if someone is home.",
			ji: "Do not treat unfinished work as a personality."
		},
		{
			yi: "Warm water over the hands for twenty seconds — wash the heart too.",
			ji: "Do not brace just to prove you can."
		},
		{
			yi: "Watch one cloud until it moves by itself.",
			ji: "Do not keep asking “why am I not well yet.”"
		},
		{
			yi: "Say thank you out loud, even softly.",
			ji: "Do not call rest laziness."
		},
		{
			yi: "Fold one shirt, as proof the day happened.",
			ji: "Do not race yesterday’s self."
		},
		{
			yi: "Wipe one square of the sill so light can find a path.",
			ji: "Do not write a plan that frightens you."
		},
		{
			yi: "Hum half a line. Off-key still counts as bloom.",
			ji: "Do not forbid yourself boredom."
		},
		{
			yi: "Mark an unreplied message “tomorrow,” then eat.",
			ji: "Do not hide unrest under busyness."
		},
		{
			yi: "Stamp the floor three times. Tell the legs: I am here.",
			ji: "Do not hide after hearing someone else’s success."
		},
		{
			yi: "Fold the quilt corner; say goodbye to the night.",
			ji: "Do not wear anxiety as an identity."
		},
		{
			yi: "One drop of scent is enough; no need for a whole burner.",
			ji: "Do not carry it all so as not to trouble anyone."
		},
		{
			yi: "Write only one thing for tomorrow. Leave the rest blank.",
			ji: "Do not rehearse the worst ending all day."
		},
		{
			yi: "Smile at a window that is not a mirror; borrow light.",
			ji: "Do not set “be happier” as homework."
		},
		{
			yi: "Tear a page in two: worry on one half, throw the other.",
			ji: "Do not keep every sentence that scolds you."
		},
		{
			yi: "Finish a cup slowly. No race against the clock.",
			ji: "Do not treat body signals as weakness."
		},
		{
			yi: "Put the keys back. There is a place to return.",
			ji: "Do not ask sleep to produce a grade."
		},
		{
			yi: "Look at a tree for ten seconds, as if greeting kin.",
			ji: "Do not make a hard day into forever."
		},
		{
			yi: "Roll a cuff, as if ready for one small thing.",
			ji: "Do not check the screen to see if you are enough."
		},
		{
			yi: "Draw a chair to the window and sit until light passes you.",
			ji: "Do not cover real tiredness with “never mind.”"
		},
		{
			yi: "Hold one sweet on the tongue. Sweetness may be brief.",
			ji: "Do not treat asking for help as losing."
		},
		{
			yi: "Write one “I actually did it,” however small.",
			ji: "Do not treat silence as disappearing."
		},
		{
			yi: "Wring a towel dry, so qi has an exit.",
			ji: "Do not pack the day until breath has to queue."
		},
		{
			yi: "Let an old song finish. Do not skip.",
			ji: "Do not measure yourself by someone else’s progress."
		},
		{
			yi: "Wash the cup clean, a clean start for yourself.",
			ji: "Do not call “I don’t want to move” a crime."
		},
		{
			yi: "Stretch until the fingers tingle; let sinew wake too.",
			ji: "Do not save gentleness only for other people."
		},
		{
			yi: "Open the curtain halfway; leave half in shade.",
			ji: "Do not force yourself to be well today."
		},
		{
			yi: "Write a letter you will not send, so qi can complete a round.",
			ji: "Do not make private sadness a secret punishment."
		}
	],
	yali: {
		title: "Stress Relief",
		kicker: "Stress, tension and body–mind reactions",
		lede: "Under pressure, the body knows first. Nothing has to be solved at once. Slow the breath, and let the tight string loosen one notch.",
		footerName: "Body & Mind Classroom · Stress Relief",
		musicCredit: "Music (Chinese music starts on entry): guqin “Kongzi Duyi”, performed by Charlie Huang, CC BY 2.5 (Wikimedia Commons; transcoded, fades added). Bach, Well-Tempered Clavier I Prelude in C major, performed by Kimiko Ishizaka, CC0.",
		nav: [
			{ href: "#feel", label: "Body signals" },
			{ href: "#shoulder", label: "Shoulders" },
			{ href: "#park", label: "Park it" },
			{ href: "#daily", label: "Daily rhythm" },
			{ href: "#acu", label: "Points" },
			{ href: "#play", label: "Try today" },
			{ href: "#music", label: "Music" },
			{ href: "#care", label: "When to see us" },
			{ href: "#view", label: "TCM view" }
		],
		feelK: "Notice",
		feelT: "How pressure speaks through the body",
		feelLead: "Pressure is not only in the head. Many people feel it in the body. Choose what you have noticed lately, and see how to keep it company.",
		feelPick: "You can choose more than one. This is not a test. Nothing is scored.",
		feelTry: "You could try",
		feelSeek: "When to see a doctor",
		feelFoot: "These are everyday things to try. They are not a diagnosis or a prescription.",
		cardFeel: "Noticed",
		feel: {
			tense: {
				label: "Wound up for a long time, can’t let go",
				try: "Once an hour, pause. Ask: shoulders, jaw, hands — where am I gripping? Loosen one notch. That is enough.",
				seek: "If the tension keeps you snapping at people, stops you getting things done, or has not eased for weeks, book a visit to talk it through."
			},
			tired: {
				label: "Very tired, sleep is never enough",
				try: "You need not catch up all at once. Pick one thing you can drop today, and drop it.",
				seek: "If tiredness lasts for weeks, or comes with fever, breathlessness or unexplained weight loss, please see a doctor for a check-up."
			},
			neck: {
				label: "Stiff neck, shoulders up by the ears",
				try: "Follow “Shoulders” below for one minute. After sitting a while, stand and take two steps.",
				seek: "If an arm goes numb or weak, or neck pain comes with fever and a stiff neck, seek medical care soon."
			},
			heart: {
				label: "Heart racing, chest feels tight",
				try: "Do the half-minute breath at the top of the page first. Let the out-breath grow longer.",
				seek: "Chest pain, a feeling of pressure on the chest, breathlessness, cold sweat or fainting: seek medical care now, or go to the emergency department."
			},
			stomach: {
				label: "Bloated stomach, appetite has changed",
				try: "Eat away from the desk and screen. Eat slowly. Stop at about seven-tenths full.",
				seek: "Ongoing stomach pain, vomiting, black or bloody stools, trouble swallowing or unexplained weight loss: please see a doctor soon."
			},
			head: {
				label: "Headache, a tight head",
				try: "Put the screen down and look far away. Ease the brow and jaw. Sip some water.",
				seek: "A sudden severe headache, a headache unlike any before, or one with weak limbs, slurred speech or blurred vision: go to the emergency department now."
			},
			sleep: {
				label: "Poor sleep, still tired on waking",
				try: "Put work away an hour before bed. To learn more, visit Restful Sleep.",
				seek: "If poor sleep lasts for weeks and affects your days, book a visit."
			}
		},
		shoulderK: "Loosen",
		shoulderT: "Let the shoulders drop · one minute",
		shoulderLead: "Follow the prompts. Each lasts about 8 seconds. Sitting or standing is fine.",
		shoulderPrep: "No need to do it fully. Stop if anything hurts, or you feel dizzy.",
		shoulderIdle: "Sit steady, then press Start.",
		shoulderStopped: "Stopped. Rest if you feel unwell. Come back any time.",
		shoulderStart: "Start",
		shoulderStop: "Stop",
		shoulderLines: [
			"Sit steady. Press both feet into the floor.",
			"Notice the jaw. Let the teeth part a little. Soften the tongue.",
			"Notice the brow. Let it open. Let the eyelids soften.",
			"Breathe in. Lift the shoulders a little…",
			"Breathe out. Let them drop at once. Feel the arms grow heavy.",
			"Tilt the head slowly to the left. Pause. Back to centre.",
			"Tilt the head slowly to the right. Pause. Back to centre.",
			"Hands on your thighs. In through the nose for 4, out through the mouth for 6. Done. Come back any time."
		],
		parkK: "Set some down",
		parkT: "Park the pressure · pick one small step",
		parkLead: "What spins in your head need not be solved at once. Write it down, pick one small step, and park the rest.",
		parkSteps: [
			["Write one thing.", "Choose the heaviest thing right now. One line is enough. No need to explain why."],
			["Pick one small step.", "Something you can do in ten minutes, so small it can hardly fail. For example: open the file, or reply “got it”."],
			["Park the rest.", "Whatever is not due yet stays on the list. After the small step, you need not think about the next one straight away."]
		],
		parkNote: "If the worry is about an immediate danger, do not park it. Deal with it or get help now.",
		parkWhatL: "What is pressing on you",
		parkWhatPh: "For example: the report is due on Friday",
		parkStepL: "A small step for the next ten minutes (optional)",
		parkStepPh: "For example: open the file and write the title",
		parkAdd: "Park it",
		parkListT: "Parked list",
		parkEmpty: "The list is empty.",
		parkNoStep: "No small step yet. That is fine.",
		parkDone: "Small step done",
		parkClear: "Clear the list",
		parkPrivacy: "This stays in this tab only and is gone when you close it. Nothing is saved or uploaded.",
		dailyK: "Days can loosen and tighten",
		dailyT: "A daily rhythm of tight and loose",
		dailyLead: "You need not be relaxed all day. Loosening one notch at a few points is enough.",
		daily: [
			{ title: "Morning", body: "Start with warm water and a moment of window light. Do not open work messages the moment you wake." },
			{ title: "While working", body: "Every 60 to 90 minutes, stand for two minutes. Drop the shoulders. Look far away." },
			{ title: "Meals", body: "Eat away from the desk and screen. Slowly. About seven-tenths full." },
			{ title: "Clocking off", body: "Make a hand-over: write tomorrow’s first task, then close the laptop." },
			{ title: "Evening", body: "Put work away an hour before bed. Dim the lights. Less coffee, less alcohol." },
			{ title: "Move a little", body: "A walk or a little stretching each day is enough. No need to wear yourself out." }
		],
		acuK: "A light press",
		acuT: "Points often used for tension",
		acuLead: "Tap a dot to see where it is and how to use it. A light press is enough; this is not acupuncture. Whether it suits you is for a doctor to decide in person.",
		acuNote: "Press each point lightly for about half a minute, with slow breathing. Stop if it aches. If the skin is broken, you are pregnant, or you bleed easily, ask a doctor first.",
		musicK: "Listen",
		musicT: "Quiet music",
		musicLead: "Chinese music starts when you enter. If your browser blocks it, it starts on your first tap on the page. It starts soft, fades in slowly, and loops. Switch to Western music or mute any time.",
		musicSafety: "If you are sensitive to sound, you can leave it off. Stop any time it feels uncomfortable.",
		musicPlay: "Play",
		musicStop: "Stop music",
		musicNow: "Playing: ",
		musicVol: "Volume",
		musicCn: "Chinese · guqin",
		musicWest: "Western · piano",
		tracks: [
			{ id: "kongzi", group: "cn", title: "Kongzi Duyi (Confucius Reads the Book of Changes)", hint: "Guqin · about 6 min · slow and low" },
			{ id: "prelude", group: "west", title: "Bach · Prelude in C major (Well-Tempered Clavier I)", hint: "Piano · about 3 min · broken chords that rise and fall like breath" },
		],
		musicCredits: "Guqin recording: performed by Charlie Huang, Wikimedia Commons, CC BY 2.5; the piece comes from the Tianwen Ge Qinpu (1876) and is in the public domain. Piano recording: Kimiko Ishizaka (Open Well-Tempered Clavier), CC0 public-domain dedication; Bach's music is in the public domain. This site transcoded the files, trimmed silence, matched loudness and added fades.",
		careK: "No need to push through",
		careT: "When to see a doctor in person",
		careLead: "This page is not a diagnosis. In these situations, please do not rely on self-practice alone.",
		careNowT: "Seek medical care now, or go to the emergency department",
		careNow: [
			"Chest pain or pressure, or pain spreading to the arm, jaw or back.",
			"Breathlessness, cold sweat, fainting.",
			"A sudden severe headache, or weak limbs, a drooping mouth, or slurred speech.",
			"Vomiting blood, or black or bloody stools."
		],
		careSoonT: "Book a visit soon",
		careSoon: [
			"Body reactions that have not eased after two weeks or more, or are getting worse.",
			"Poor sleep, poor appetite, or weight changing for no clear reason.",
			"Work, school or caring for family is already affected.",
			"Starting to rely on alcohol, smoking or medicines to get through.",
			"New irregular heartbeat, or bouts of palpitations."
		],
		careCrisis: "If you have thoughts of harming yourself or of not wanting to live, or your mood or behaviour suddenly changes a great deal and affects safety, please do not wait for an appointment. Contact emergency services or go to the emergency department as soon as you can, or ask someone you trust to stay with you.",
		careMeds: "If you are taking medicines now, please do not stop or change them on your own. Chinese and Western medicine can work together.",
		careBook: "Book an appointment (Macao) →",
		viewK: "Getting to know it",
		viewT: "A string pulled too tight",
		viewP1: "Chinese medicine sees body and spirit as one. When pressure does not lift for a long time, the movement of qi tends to get stuck. Rising upward, the head feels tight and the neck and shoulders stiffen. Lodged in the middle, the stomach bloats and appetite changes. Disturbing the heart, it beats faster and sleep turns shallow.",
		viewP2: "Body reactions do not mean you are weak, and they are not imagined. The right care differs from person to person and is for a doctor to decide in person. This is education only, not a replacement for seeing a doctor."
	},
	lines: {
    yali: [
      "The shoulders can sit one notch lower.",
      "Not finishing everything today is normal.",
      "I do one thing at a time.",
      "Tension is the body trying to help. I can tell it: that is enough.",
      "An out-breath longer than the in-breath is enough.",
      "Unanswered messages can wait until I finish this sip of water.",
      "I do not need to prove how busy I am.",
      "A small step is still a step.",
      "Unclench the jaw. The world keeps turning.",
      "Rest is not laziness.",
      "Today’s things can stay on the desk.",
      "I can say: I will reply a little later."
    ],
    anshen: [
      "This breath, right now, is already enough for me.",
      "A racing heart does not mean I did wrong.",
      "Frightening things can wait in line. I do not have to handle them all at once.",
      "I do not have to answer yet.",
      "The weight on my shoulders can come down a little.",
      "Spirit returns slowly. I do not have to rush it.",
      "This body, here, is already a fact.",
      "The worst case: I need not think it through now.",
      "I can turn the phone face down and not look.",
      "I may not sit still. Two steps still count.",
      "A fast heart is working; I can keep it company as it slows.",
      "I owe no one an explanation for stopping.",
      "The tea has cooled. I can still sip.",
      "Tonight has not arrived. Tomorrow’s tasks I set down.",
      "I know how to be tense. That is not shameful.",
      "I am not the only one who dimmed the lamp.",
      "If I unclench my jaw, the world will not fall.",
      "The worry passed. I am still here.",
      "A quiet breath still counts as breath.",
      "I may close the door. I may leave the window a crack.",
      "I do not have to be good before I rest.",
      "A thought comes; I watch it pass, like a cloud.",
      "If I am safe now, I will keep this now.",
      "Hand on the chest, I tell the heart: I am here. Rest.",
      "Not managing once is not never managing.",
      "The noise can be loud. I can be quiet, without taking it to heart.",
      "Plans can wait for tomorrow. The body needs tonight — I know.",
      "I have already come through many “I can’t.”",
      "I may be afraid. I do not have to look composed.",
      "Fear and courage can stand together.",
      "This minute, I do not have to improve.",
      "If I unfrown, things will line themselves up.",
      "I do not owe the world an instant reply.",
      "One step dimmer, and spirit comes one step nearer.",
      "Coming back is enough. Speed does not matter.",
      "I can hold the cup. I need not finish it now.",
      "News can wait. I will look later."
    ],
    jieyu: [
      "Not wanting to move does not make me lazy.",
      "A step almost too small to see is still my step.",
      "Mood has not returned. My body can still reach the door.",
      "I do not have to feel grateful first before I deserve to be treated well.",
      "Leaving space is not giving up.",
      "Opening one window today is already enough.",
      "I can set the heavy thing down for a while, not forever.",
      "I am not a burden.",
      "Each mouthful is still feeding myself.",
      "No one is hurrying me to bloom.",
      "Empty is not the same as gone.",
      "I will not use “cheer up” to hit myself.",
      "There is still a path in fog. I simply cannot see far.",
      "I may be slower than every timetable.",
      "Not well yet — but I am still here.",
      "One shirt folded still counts as effort today.",
      "Interest has not returned. This body can still be treated kindly.",
      "I do not have to prove I am worth help.",
      "Tomorrow can decide tomorrow. I need not now.",
      "If strength is small, I use a little less force.",
      "Unhappy needs no decoration.",
      "The light at the window is enough to borrow for a while.",
      "Stopping is not falling out.",
      "The world is wider than the square I see now.",
      "A cup of warm water is already care.",
      "I am still here. That sentence is already heavy.",
      "A task can be cut smaller.",
      "I do not have to like today in order to live it.",
      "I need not carry everyone’s expectation on these shoulders.",
      "If qi is stuck, I give it a seam.",
      "I go slowly. Flowers open that way too.",
      "I have already tried enough.",
      "Even one petal opening is still the fruit of effort.",
      "Not replying does not mean I am gone."
    ],
    anmei: [
      "Lying awake does not mean I am lazy.",
      "I do not have to force sleep to arrive.",
      "The bed is for sleep and closeness, not meetings.",
      "If I cannot sleep in twenty minutes, I get up and sit.",
      "Never mind how early tomorrow is. I keep tonight first.",
      "Wine is not my sleeping pill.",
      "I do not need eight hours for the night to count.",
      "Waking rested is already good sleep, whatever the hours.",
      "The phone can sit where my hand cannot reach.",
      "I do not have to rehearse the worst tomorrow now.",
      "From 9 pm I let the heart clock off.",
      "Worries on paper till tomorrow. I can set them down now.",
      "I will not keep leaning on sleeping pills.",
      "One or two poor nights happen to everyone, including me.",
      "When rhythm returns, the hours follow.",
      "I already know the ceiling. I need not keep staring.",
      "If the feet are warm, sleep comes a little easier.",
      "I return to bed because I am sleepy, not because of the clock.",
      "If I want to sleep, I sleep a while. Waking can wait."
    ]
  }};
