# 鬆弦 · 壓力繃緊同身心反應 — review notes (local branch `room/yali`, NOT pushed)

Status: ready for clinician review. Built and checked locally only. Do not merge or push until the decisions below are signed off.

## Page flow (same journey as 安神／解鬱／安寐)
1. `#breath` 先呼吸半分鐘: the shared BreathCircle, site rhythm 鼻吸 4、口呼 6, 3 rounds (src/lib/breath.ts)
2. `#follow` 跟住做: 4 lessons × 3 steps + 「如果做不到」 + 「何時停止」: 先返落地 / 肩膊放低 / 壓力暫存 / 收工交更
3. `#feel` 身體訊號: pick any of 7 sensations (long-term tension, fatigue, neck/shoulders, heart racing/chest tight, bloating, headache, poor sleep) → 「可以試」 + 「幾時要睇醫生」. No score, no result.
4. `#shoulder` 肩頸放低 · 一分鐘: guided 8 prompts, ~8 s each, start/stop, progress dots
5. `#park` 壓力暫存 · 揀一個細步: write a pressure + one 10-minute step. Kept in the tab only (not saved, not uploaded).
6. `#daily` 一日嘅鬆緊節奏: 6 cards
7. `#acu` 穴位: shared PointMap. Body: 印堂、內關、合谷、太衝. Ear: 神門、交感、皮質下. Locations and cautions come from src/lib/acupoints.ts.
8. `#play` 今日可試: 時辰 lamp (午／申／戌) + 今日小卡 (the clinic card)
9. `#music` 靜音樂: off by default, 2 guqin + 2 piano, see docs/yali-music-licences.md
10. `#care` 幾時要面診: urgent red flags, reasons to book soon, the FAQ crisis sentence (verbatim), a medication caution, and a link to the home 預約掛號 card. Always open, never folded.
11. `#view` 中醫點睇 (folded): 形神合一 / 氣機鬱滯. No 證型 typing, on purpose.

## Checks (all passing)
- `npx tsc --noEmit`
- static build (`vite build -c vite.static.config.ts`) prerenders `/yali`
- `node --test scripts/yali-content.test.mjs scripts/content-consistency.test.mjs`
- `node scripts/yali-browser-qa.mjs`: 51 browser checks, desktop and mobile, all 3 languages, reduced motion
