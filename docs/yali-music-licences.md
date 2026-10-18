# 舒壓 · 音樂來源與版權紀錄 (music sources & licences)

Checked 2026-10-18. Every shipped track has **two separate checks**: the composition (樂曲) and the
recording (錄音). Only tracks where **both** are clearly free to use were shipped. Nothing here is a
commercial recording. Player is **off by default**: nothing loads or plays until the visitor taps a track.

## Shipped (4 tracks: 2 Chinese, 2 Western)

| File | Piece | Composition status | Recording / performer | Recording licence | Source page |
|---|---|---|---|---|---|
| `public/audio/yali/peilan.mp3` | 古琴《佩蘭》 Pei Lan (Admiring the Orchid), silk strings | Traditional qin piece; score from 《天聞閣琴譜》 Tianwen Ge Qinpu (1876) → public domain | Charlie Huang (User:CharlieHuang), self-recorded 28 May 2006, Shaoyun Xuan, Birmingham | Uploader's own work, `{{Self\|GFDL\|Cc-by-sa-3.0-migrated\|Cc-by-2.5}}` → we use **CC BY 2.5** | https://commons.wikimedia.org/wiki/File:Pei_Lan.ogg |
| `public/audio/yali/kongzi.mp3` | 古琴《孔子讀易》 Kongzi Duyi (Confucius Reads the Book of Changes) | Traditional; score from 《天聞閣琴譜》 (1876) → public domain | Charlie Huang, self-recorded 15 Apr 2006 | `{{Self\|GFDL\|Cc-by-sa-3.0-migrated\|Cc-by-2.5}}` → **CC BY 2.5** | https://commons.wikimedia.org/wiki/File:Kongzi_Duyi.ogg |
| `public/audio/yali/aria.mp3` | J.S. Bach, Goldberg Variations BWV 988 — Aria | Bach (d. 1750) → public domain | Kimiko Ishizaka, *Open Goldberg Variations* (2012) | **CC0** (`{{cc0}}`, Commons licence-reviewed; project states "free of copyright, all uses allowed") | https://commons.wikimedia.org/wiki/File:Kimiko_Ishizaka_-_01_-_Aria.ogg · https://www.opengoldbergvariations.org/ |
| `public/audio/yali/prelude.mp3` | J.S. Bach, Well-Tempered Clavier I — Prelude No. 1 in C major, BWV 846 | Bach → public domain | Kimiko Ishizaka, *Open Well-Tempered Clavier* (2015) | **CC0** (`{{cc-zero}}`; Bandcamp: "licensed with the Creative Commons Zero – public domain – license"; PR Newswire 19 Mar 2015) | https://commons.wikimedia.org/wiki/File:Kimiko_Ishizaka_-_Bach_-_Well-Tempered_Clavier,_Book_1_-_01_Prelude_No._1_in_C_major,_BWV_846.ogg · https://kimikoishizaka.bandcamp.com/track/prelude-no-1-in-c-major-bwv-846 |

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

## Why these feel calming (for the clinician to confirm by ear)
- 《佩蘭》: silk strings, soft attack, the most even loudness of the guqin candidates (loudness range 7.7 LU).
- 《孔子讀易》: slow, low register, unhurried phrasing.
- Goldberg Aria: slow, steady pulse, simple repeated harmonic plan.
- Prelude in C: the same broken-chord shape repeats bar after bar, rising and falling much like a breath.
No lyrics, no sudden loud passages; all start softly (player fades in over 3 s at 20 % of device volume, max 50 %).

## Considered, not shipped
| Candidate | Reason |
|---|---|
| Satie, Gymnopédie No. 1 — Robin Alciatore via Musopen (Commons, `{{PD-author}}`) | Likely fine, but Musopen asks for no resale/attribution "courtesy" terms and the PD claim rests on the site FAQ, not on the performer directly. Keep as an alternate if a 3rd Western option is wanted. |
| Satie Gymnopédie No. 1 — "Teknopazzo" (CC0) | Uploader identity / performer unclear. Not shipped. |
| Debussy, Clair de lune — Laurens Goedhart (Commons "PD") | PD claim links to SoundCloud; performer's release not verifiable. Not shipped. |
| Kevin MacLeod Gymnopédie (CC BY 3.0) | Synth arrangement; fine licence but less calm/natural. Not needed. |
| 1920 cylinder "Air on the G string" (PD) | Surface noise; not calming. |
| 古琴《流水》 (CC BY 2.5) | Long glissando "water" passages are lively, not ideal for tension. |
| 古琴《平沙落雁》 | Already the 安神 room's music; could be reused at zero extra size if preferred. |
