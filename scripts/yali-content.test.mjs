// Content & safety guards for the 舒壓 room (壓力繃緊同身心反應), 2026-10 draft.
// Run: node --test scripts/yali-content.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const root = fileURLToPath(new URL("..", import.meta.url));
const jiti = createJiti(import.meta.url, { alias: { "@": `${root}src` }, jsx: true });
const { COPY, YUE } = await jiti.import(`${root}src/i18n/copy.ts`);
const { CMN, EN } = await jiti.import(`${root}src/i18n/copy-extra.ts`);
const { FOLLOW } = await jiti.import(`${root}src/lib/follow.ts`);
const { FAQ_COPY } = await jiti.import(`${root}src/lib/faq.ts`);
const { BODY_POINTS, EAR_POINTS } = await jiti.import(`${root}src/lib/acupoints.ts`);
const { YALI_LINES, QUIET_ACTIONS } = await jiti.import(`${root}src/lib/quiet-lines.ts`);

/** Every [path, string] leaf of a value. */
function leaves(v, path = []) {
  if (typeof v === "string") return [[path.join("."), v]];
  if (typeof v === "function" || v == null || typeof v !== "object") return [];
  return Object.entries(v).flatMap(([k, x]) => leaves(x, [...path, k]));
}
const get = (o, path) => path.split(".").reduce((a, k) => (a == null ? a : a[k]), o);

// Shared on purpose (see withYaliShared in copy.ts): not re-translated in copy-extra.ts.
const SHARED = new Set(["footerNote", "careCrisis"]);

const YALI_HOME = ["feelYali", "yaliK", "yaliT", "yaliD", "yaliGo", "illnessD"];

test("translations are explicit and complete (no silent fallback to Cantonese)", () => {
  for (const [name, over] of [["CMN", CMN], ["EN", EN]]) {
    for (const [p] of leaves(YUE.yali)) {
      if (SHARED.has(p.split(".")[0])) continue;
      assert.equal(typeof get(over.yali, p), "string", `${name}.yali.${p} missing`);
    }
    for (const k of YALI_HOME) assert.equal(typeof over.home[k], "string", `${name}.home.${k} missing`);
    for (const [p] of leaves(YUE.play.hours.yali)) assert.equal(typeof get(over.play.hours.yali, p), "string", `${name}.play.hours.yali.${p}`);
    for (const [p] of leaves(YUE.play.maps.yali)) assert.equal(typeof get(over.play.maps.yali, p), "string", `${name}.play.maps.yali.${p}`);
    assert.ok(Array.isArray(over.lines.yali) && over.lines.yali.length === YALI_LINES.length, `${name}.lines.yali`);
  }
  for (const lang of ["yue", "cmn", "en"]) {
    assert.equal(FOLLOW[lang].yali.lessons.length, 4, `FOLLOW.${lang}.yali has 4 lessons`);
    assert.equal(QUIET_ACTIONS.yali[lang].length, QUIET_ACTIONS.yali.yue.length);
  }
});

function roomText(lang) {
  const c = COPY[lang];
  return [
    ...leaves(c.yali),
    ...YALI_HOME.map((k) => [`home.${k}`, c.home[k]]),
    ...leaves(c.play.hours.yali),
    ...leaves(c.play.maps.yali),
    ...c.lines.yali.map((t, i) => [`lines.${i}`, t]),
    ...QUIET_ACTIONS.yali[lang].map((t, i) => [`actions.${i}`, t]),
  ];
}

const SIMPLIFIED = /[着这为们说么吗会经过门关气头脚络针疗医药应发实问题现让给还进动学习觉样简乐饮热凉卧涌压绷紧松脏晕呕规钢变叹调录贡献转档颈软轻缓长时间预约挂号诊]/;
const CANTONESE = /[嘅咗唔喺嚟啲佢冇嘢睇攰瞓郁撳畀咁嗰呢噉乜]/;

test("Mandarin copy: Traditional characters only, no 着, no Cantonese words", () => {
  for (const [p, t] of roomText("cmn")) {
    if (p === "careCrisis" || p === "footerNote") continue; // verbatim approved copy
    assert.doesNotMatch(t, SIMPLIFIED, `cmn ${p}: ${t}`);
    assert.doesNotMatch(t, CANTONESE, `cmn ${p}: ${t}`);
  }
  for (const l of FOLLOW.cmn.yali.lessons) for (const t of [l.title, l.lead, ...l.steps, l.ifNot, l.stop]) {
    assert.doesNotMatch(t, SIMPLIFIED, t);
    assert.doesNotMatch(t, CANTONESE, t);
  }
});

test("Cantonese copy: no simplified characters, no 着", () => {
  for (const [p, t] of roomText("yue")) assert.doesNotMatch(t, SIMPLIFIED, `yue ${p}: ${t}`);
});

test("English copy has no leftover Chinese except proper names in credits", () => {
  for (const [p, t] of roomText("en")) {
    if (/musicCredit/.test(p)) continue;
    assert.doesNotMatch(t, /[\u3400-\u9fff]/, `en ${p}: ${t}`);
  }
});

test("safety: crisis and footer wording reused verbatim; no new hotline numbers", () => {
  for (const lang of ["yue", "cmn"]) {
    const faq = FAQ_COPY[lang].items.find((i) => i.q.includes("盡快求助")).a;
    assert.equal(COPY[lang].yali.careCrisis, faq, `${lang} crisis line must equal FAQ`);
  }
  for (const lang of ["yue", "cmn", "en"]) {
    assert.equal(COPY[lang].yali.footerNote, COPY[lang].anshen.footerNote);
    for (const [p, t] of roomText(lang)) {
      if (p === "footerNote" || /musicCredit/.test(p)) continue; // verbatim 安神 footer; credits carry years
      assert.doesNotMatch(t, /\d{3,}|熱線|hotline/i, `${lang} ${p}: no phone numbers / new hotline copy`);
    }
    assert.ok(COPY[lang].yali.careNow.length >= 4 && COPY[lang].yali.careSoon.length >= 4);
  }
});

test("no efficacy promises, no diagnosis labels, no scores", () => {
  const BAD = /根治|治好|治癒|療效|保證|包好|一定(會|能)|藥到|cure|guarantee|proven|will fix|\bscores?\b|分數|量表|測評|焦慮症|抑鬱症|驚恐症|disorder/i;
  for (const lang of ["yue", "cmn", "en"]) {
    for (const [p, t] of roomText(lang)) assert.doesNotMatch(t, BAD, `${lang} ${p}: ${t}`);
  }
});

test("breathing follows the site standard (in 4, out 6, no hold)", () => {
  const all = ["yue", "cmn", "en"].flatMap((l) => [
    ...roomText(l).map(([, t]) => t),
    ...FOLLOW[l].yali.lessons.flatMap((x) => x.steps),
  ]);
  const mentions = all.filter((t) => /[吸呼]\s*\d|(in|out) through the (nose|mouth) for \d/i.test(t));
  assert.ok(mentions.length >= 3);
  for (const t of mentions) {
    assert.match(t, /吸 4|for 4/, t);
    assert.match(t, /呼 6|for 6/, t);
    assert.doesNotMatch(t, /停 ?\d|hold/i, t);
  }
});

test("acupoints come from the shared standard; no locations in room copy", () => {
  for (const id of Object.keys(YUE.play.maps.yali)) {
    assert.ok(id in BODY_POINTS || id in EAR_POINTS, `unknown point ${id}`);
  }
  // Clinician-approved 2026-10: 肩井 (GB21) + 風池 (GB20) in the 舒壓 room, gentle press only.
  for (const id of ["jianjing", "fengchi"]) assert.ok(id in BODY_POINTS && id in YUE.play.maps.yali, `missing ${id}`);
  assert.match(BODY_POINTS.jianjing.caution.yue, /輕按/);
  assert.match(BODY_POINTS.jianjing.caution.yue, /孕婦請勿自行按/);
  assert.match(BODY_POINTS.fengchi.caution.yue, /輕按/);
  const LOC = /橫指|跖骨|腕橫紋|內踝|耳甲|三角窩|對耳屏|對耳輪|虎口|掌骨|finger-width|metatarsal|cun\b/;
  for (const lang of ["yue", "cmn", "en"]) {
    for (const [p, t] of leaves(COPY[lang].play.maps.yali)) assert.doesNotMatch(t, LOC, `${lang} ${p}`);
  }
});

test("short lines: Chinese sentences stay short", () => {
  for (const lang of ["yue", "cmn"]) {
    for (const [p, t] of roomText(lang)) {
      if (/careCrisis|footerNote|musicCredit/.test(p)) continue;
      for (const s of t.split(/[。！？]/)) assert.ok([...s].length <= 48, `${lang} ${p}: sentence too long (${[...s].length}): ${s}`);
    }
  }
});

test("music: every track has a local file, licences documented, nothing autoplays", () => {
  const doc = readFileSync(`${root}docs/yali-music-licences.md`, "utf8");
  for (const t of YUE.yali.tracks) {
    const f = `${root}public/audio/yali/${t.id}.mp3`;
    assert.ok(existsSync(f), f);
    assert.ok(statSync(f).size < 7_000_000, `${t.id} too large`);
    assert.match(doc, new RegExp(`audio/yali/${t.id}\\.mp3`), `licence doc lists ${t.id}`);
  }
  const groups = YUE.yali.tracks.map((t) => t.group);
  assert.ok(groups.includes("cn") && groups.includes("west"), "Chinese and Western balance");
  const tools = readFileSync(`${root}src/components/room-music.tsx`, "utf8");
  assert.doesNotMatch(tools, /autoPlay|autoplay\s*=/);
  assert.match(tools, /useState<string \| null>\(null\)/, "player starts stopped");
  const atmo = readFileSync(`${root}src/components/site-atmosphere.tsx`, "utf8");
  assert.doesNotMatch(atmo, /AmbientMusic|calm\.mp3/, "no ambient autoplay anywhere (rooms or other pages)");
});
