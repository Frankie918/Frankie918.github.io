# 四間房 · 音樂來源與版權紀錄 (music sources & licences — all four rooms)

2026-10-18 update: all four rooms （安神／解鬱／安寐／舒壓） use the same
player (floating music button in the sticky top bar + in-page #music section).
2026-10-18 (west-distinct + room default): the earlier 解鬱/安寐 Western tracks
(Goldberg Variations 13 / 25, same work & performer as 安神's Aria) sounded
repeated and were REPLACED — see the two new rows below; `var13.mp3`/`var25.mp3`
were removed from `public/` and are no longer referenced anywhere. Each room
has exactly ONE Chinese and ONE Western track, and all four Western tracks are
genuinely DIFFERENT compositions (workIds in src/lib/room-music.ts; Goldberg
appears only once, as 安神's Aria; composers Bach, Chopin and Satie).
Default on room entry is now the room's CHINESE guqin track: the player attempts
autoplay at 20% volume with fade-in; browsers that block audible autoplay arm
it to start on the visitor's first tap/keypress (playing state is shown only
once playback actually starts). 靜音/mute persists for that room visit;
switching rooms resets to the new room's Chinese default:

| Room | 中樂 (Chinese) | 西樂 (Western) |
|---|---|---|
| 安神 anshen | 古琴《平沙落雁》 `public/audio/pingsha.mp3` — Charlie Huang, CC BY 2.5 (existing site track/credit) | Bach Goldberg Aria BWV 988, `public/audio/yali/aria.mp3` — Kimiko Ishizaka, CC0 (below) |
| 解鬱 jieyu | 古琴《陽關三疊》 `public/audio/yangguan.mp3` — Charlie Huang (Charles R Tsua), CC BY-SA 3.0 (existing) | Chopin Nocturne in E-flat major Op. 9 No. 2, `public/audio/yali/chopin-nocturne.mp3` — Frank Lévy, Musopen, public domain (below, new 2026-10-18) |
| 安寐 anmei | 古琴《醉漁唱晚》 `public/audio/zuiyu.mp3` — Charlie Huang (Charles R Tsua), CC BY-SA 3.0 (existing) | Satie Gymnopédie No. 1, `public/audio/yali/satie-gymnopedie.mp3` — Robin Alciatore, Musopen, public domain (below, new 2026-10-18) |
| 舒壓 yali | 古琴《孔子讀易》 `public/audio/yali/kongzi.mp3` — Charlie Huang, CC BY 2.5 (below; clinician's choice 2026-10-18, 《佩蘭》 kept out of this room's list) | Bach Prelude in C BWV 846, `public/audio/yali/prelude.mp3` — Kimiko Ishizaka, CC0 (below; clinician's preferred Western track for this room) |

Mood fit (no efficacy claims, tempo/timbre/length only): 解鬱 Chopin Nocturne
Op. 9 No. 2 is slow with a soft, slightly brighter singing melody (gentle,
warmer). 安寐 Satie Gymnopédie No. 1 is the slowest/quietest of the four
Western tracks — very slow, sparse notes, about 3 minutes. 舒壓 Chinese choice
is the clinician's: 《孔子讀易》 (slow, low register); 《佩蘭》
(`public/audio/yali/peilan.mp3`, licence below) is retained in the repo but is
NOT offered in any room list.
The home-page Canon (`public/audio/calm.mp3`) was NOT reused as a room Western track: its recording provenance is
not documented in this repo.

## Homepage Canon restoration (2026-10-18, clinician override)
The homepage again plays ONLY its pre-existing single Canon track
`public/audio/calm.mp3` (Pachelbel, Canon in D, piano; about 7½ min) via the
shared room-music player — no 中樂／西樂 choice on the homepage, default-play
on entry (first tap/keypress if autoplay is blocked), floating button to
stop/mute or replay, and it stops when a visitor enters a room (that room's
default takes over, single shared <audio>, no double audio).
Licence flag: the composition is public domain (Pachelbel, d. 1706) and the
site previously credited the recording itself as "Pachelbel《D 大調卡農》鋼琴，
公有領域 / Canon in D, piano, public domain". However the recording's
performer/source provenance was never documented in this repo, so that
recording-level public-domain claim cannot be re-verified here. It is restored
as-is as the site's pre-existing track per the clinician's instruction; no new
file was added. If provenance verification is required later, replace this
file with a verifiably licensed Canon recording and update this note. Behaviour in all four rooms: on entry the player attempts the room's Chinese
default (autoplay attempt, otherwise first-tap/keypress start), one track at a
time, gentle volume (20% default, max 50%), 靜音 stops it for that room visit,
switching rooms resets to the new room's default, leaving the rooms stops it.

# 舒壓 · 音樂來源與版權紀錄 (music sources & licences)

Checked 2026-10-18. Every shipped track has **two separate checks**: the composition (樂曲) and the
recording (錄音). Only tracks where **both** are clearly free to use were shipped. Nothing here is a
commercial recording. Player **defaults to the room's Chinese track on entry** (autoplay attempt; if blocked, first tap/keypress starts it; mute stops it for that room visit).

## Shipped in room lists (Western tracks for all rooms + 舒壓 Chinese; other rooms' Chinese tracks are pre-existing site files above)

| File | Piece | Composition status | Recording / performer | Recording licence | Source page |
|---|---|---|---|---|---|
| `public/audio/yali/peilan.mp3` | 古琴《佩蘭》 Pei Lan (Admiring the Orchid), silk strings | Traditional qin piece; score from 《天聞閣琴譜》 Tianwen Ge Qinpu (1876) → public domain | Charlie Huang (User:CharlieHuang), self-recorded 28 May 2006, Shaoyun Xuan, Birmingham | Uploader's own work, `{{Self\|GFDL\|Cc-by-sa-3.0-migrated\|Cc-by-2.5}}` → we use **CC BY 2.5** | https://commons.wikimedia.org/wiki/File:Pei_Lan.ogg |
| `public/audio/yali/kongzi.mp3` | 古琴《孔子讀易》 Kongzi Duyi (Confucius Reads the Book of Changes) | Traditional; score from 《天聞閣琴譜》 (1876) → public domain | Charlie Huang, self-recorded 15 Apr 2006 | `{{Self\|GFDL\|Cc-by-sa-3.0-migrated\|Cc-by-2.5}}` → **CC BY 2.5** | https://commons.wikimedia.org/wiki/File:Kongzi_Duyi.ogg |
| `public/audio/yali/aria.mp3` | J.S. Bach, Goldberg Variations BWV 988 — Aria | Bach (d. 1750) → public domain | Kimiko Ishizaka, *Open Goldberg Variations* (2012) | **CC0** (`{{cc0}}`, Commons licence-reviewed; project states "free of copyright, all uses allowed") | https://commons.wikimedia.org/wiki/File:Kimiko_Ishizaka_-_01_-_Aria.ogg · https://www.opengoldbergvariations.org/ |
| `public/audio/yali/prelude.mp3` | J.S. Bach, Well-Tempered Clavier I — Prelude No. 1 in C major, BWV 846 | Bach → public domain | Kimiko Ishizaka, *Open Well-Tempered Clavier* (2015) | **CC0** (`{{cc-zero}}`; Bandcamp: "licensed with the Creative Commons Zero – public domain – license"; PR Newswire 19 Mar 2015) | https://commons.wikimedia.org/wiki/File:Kimiko_Ishizaka_-_Bach_-_Well-Tempered_Clavier,_Book_1_-_01_Prelude_No._1_in_C_major,_BWV_846.ogg · https://kimikoishizaka.bandcamp.com/track/prelude-no-1-in-c-major-bwv-846 |
| `public/audio/yali/chopin-nocturne.mp3` | Frédéric Chopin, Nocturne in E-flat major, Op. 9 No. 2 → 解鬱 Western | Chopin (d. 1849) → public domain (Commons page: composition PD, author died 1849) | Frank Lévy (Frank Levy), via Musopen *Set Chopin Free* (Kickstarter post linked as source) | **Public domain** — verified 2026-10-18 on the Commons file page: "This work has been released into the public domain by its author, Musopen" (recording); LicenseShortName `Public domain` via Commons API | https://commons.wikimedia.org/wiki/File:Chopin_-_Nocturne_No._2_in_E-flat_major,_Op._9_No._2_(Frank_Levy).flac · direct file https://upload.wikimedia.org/wikipedia/commons/8/89/Chopin_-_Nocturne_No._2_in_E-flat_major%2C_Op._9_No._2_%28Frank_Levy%29.flac |
| `public/audio/yali/satie-gymnopedie.mp3` | Erik Satie, Gymnopédie No. 1 (Trois Gymnopédies, 1888) → 安寐 Western | Satie (d. 1925) → public domain | Robin Alciatore, via Musopen (musopen.com) | **Public domain** — verified 2026-10-18 on the Commons file page: "This work has been released into the public domain by its author, Robin Alciatore. This applies worldwide"; LicenseShortName `Public domain` via Commons API | https://commons.wikimedia.org/wiki/File:Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg · direct file https://upload.wikimedia.org/wikipedia/commons/9/90/Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg |

The Charlie Huang recordings are the same uploader/licence family already used on the site
(《平沙落雁》《秋風詞》 CC BY 2.5; 《陽關三疊》《醉漁唱晚》 CC BY-SA 3.0). Commons shows
"own work assumed / author assumed" only because these are 2006 uploads migrated from an old account;
the description names the uploader as the musician and the licence is a `{{Self}}` grant.

### Attribution (CC BY 2.5 requires it; shown in the room footer and under the player, all 3 languages)
> 古琴錄音：Charlie Huang 演奏，維基共享資源，CC BY 2.5；樂曲出自《天聞閣琴譜》（1876），屬公有領域。
> 鋼琴錄音：Kimiko Ishizaka 演奏（Open Goldberg Variations／Open Well-Tempered Clavier），CC0；巴赫樂曲屬公有領域。
> 本站已轉檔、修剪首尾靜音、統一音量及加淡入淡出。

### Changes we made (disclosed, as CC BY asks)
ffmpeg: trim leading/trailing silence (−55 dB) → loudness to ≈ −24 LUFS (same as the site's guqin tracks; true peak ≤ −3 dBFS)
→ 2 s fade-in, 4 s fade-out (soft loop seam) → mono MP3 96 kbps, 44.1 kHz, metadata stripped.

| File | Source SHA-1 (Commons original) | Output SHA-1 | Length | Size |
|---|---|---|---|---|
| peilan.mp3 | 4aca605e4d38136d35afecd68cd1d700b6960d55 | c951d07bcc785eb83919e213d2ec868031c32bda | 8:11 | 5.9 MB |
| kongzi.mp3 | f53004816718453081fafe8353ea0c63fda1800f | e8927867f902fd12e99fe3dd5cb83a3276bc2629 | 5:48 | 4.2 MB |
| aria.mp3 | dc04bd23c1bcbac792f37e1fa5472146634a1fdb | 21cb9d4b79976129815838b6514fa21bffca94f3 | 4:58 | 3.6 MB |
| prelude.mp3 | 520967d5e00d780e1e9ff6344dbbf0bf414530c1 | 000c112b5b31af782cf48627140c9d233129cde5 | 2:41 | 1.9 MB |
| chopin-nocturne.mp3 | c10c1175bb0955df8083bc1d67c8897114e9baf0 (downloaded FLAC) | 5a6dc80d55360348b772996a9dd82714e539332f | 4:28 (268 s) | 3,214,672 B (3.1 MB) |
| satie-gymnopedie.mp3 | 96b2343c81047abd9723488d8540b5a2af688233 (downloaded OGG) | f9ed61ae700ac25161e25c848a6bc04543b4aaf6 | 2:59 (179 s) | 2,149,817 B (2.1 MB) |

## Why these feel calming (for the clinician to confirm by ear)
- 《孔子讀易》 (舒壓 Chinese, clinician's choice): slow, low register, unhurried phrasing.
- 《佩蘭》: silk strings, soft attack, even loudness — retained in repo, not offered in any room (clinician chose 《孔子讀易》 for 舒壓）.
- Chopin Nocturne Op. 9 No. 2 （解鬱 Western): slow, soft singing melody, slightly brighter timbre — tempo/timbre description only.
- Satie Gymnopédie No. 1 （安寐 Western): very slow, sparse and quiet, about 3 minutes — tempo/texture description only, no sleep claim.
- Goldberg Aria: slow, steady pulse, simple repeated harmonic plan.
- Prelude in C: the same broken-chord shape repeats bar after bar, rising and falling much like a breath.
No lyrics, no sudden loud passages; all start softly (player fades in over 3 s at 20 % of device volume, max 50 %).

## Considered, not shipped
| Candidate | Reason |
|---|---|
| Satie, Gymnopédie No. 1 — Robin Alciatore via Musopen (Commons, `{{PD-author}}`) | NOW SHIPPED for 安寐 (2026-10-18, west-distinct): the Commons file page itself states the author, Robin Alciatore, released the work into the public domain worldwide — verified on the actual file page, not only the Musopen FAQ. Musopen attribution is given in the room credit as courtesy. |
| Satie Gymnopédie No. 1 — "Teknopazzo" (CC0) | Uploader identity / performer unclear. Not shipped. |
| Debussy, Clair de lune — Laurens Goedhart (Commons "PD") | PD claim links to SoundCloud; performer's release not verifiable. Not shipped. |
| Kevin MacLeod Gymnopédie (CC BY 3.0) | Synth arrangement; fine licence but less calm/natural. Not needed. |
| 1920 cylinder "Air on the G string" (PD) | Surface noise; not calming. |
| 古琴《流水》 (CC BY 2.5) | Long glissando "water" passages are lively, not ideal for tension. |
| 古琴《平沙落雁》 | Already the 安神 room's music; could be reused at zero extra size if preferred. |
