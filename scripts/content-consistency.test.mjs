// Content guards for the 2026-10 reorganisation (patient-facing copy).
// Run: node --test scripts/content-consistency.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const COPY_FILES = ["src/i18n/copy.ts", "src/i18n/copy-extra.ts", "src/lib/follow.ts", "src/lib/monthly-practice.ts"];
const SITE_TEXT = [
  ...COPY_FILES,
  "src/lib/acupoints.ts",
  "src/lib/faq.ts",
  "src/lib/quiet-lines.ts",
  "src/lib/jieqi-articles.ts",
  "src/routes/index.tsx",
];

test("one default breathing rhythm: inhale 4, exhale 6, no hold", () => {
  for (const f of COPY_FILES) {
    const s = read(f);
    assert.doesNotMatch(s, /停 ?2|hold 2|吸四秒，呼六秒/, `${f} still has an old breathing variant`);
  }
  const b = read("src/lib/breath.ts");
  assert.match(b, /BREATH_IN_SEC = 4;/);
  assert.match(b, /BREATH_OUT_SEC = 6;/);
  assert.match(read("src/components/breath-circle.tsx"), /BREATH_IN_SEC \* 1000/);
});

test("acupoint locations live only in src/lib/acupoints.ts", () => {
  // Location vocabulary that used to be copied into room copy.
  const LOC = /橫指|跖骨|腕橫紋|內踝|耳甲[艇腔]|三角窩|對耳屏|對耳輪|finger-width|metatarsal|inner ankle|cavum|cymba|triangular fossa|antitragus|antihelix/;
  for (const f of ["src/i18n/copy.ts", "src/i18n/copy-extra.ts"]) {
    for (const block of read(f).match(/(maps|points|press)\s*:\s*[{[][\s\S]*?\n\t{0,2} {0,4}[}\]],?\n/g) ?? []) {
      assert.doesNotMatch(block, LOC, `${f}: a point location crept back into room copy:\n${block.slice(0, 200)}`);
    }
  }
  const a = read("src/lib/acupoints.ts");
  for (const id of ["shenmen", "neiguan", "sanyinjiao", "yongquan", "taichong", "yintang", "baihui", "hegu", "qimen", "fengchi", "jianjing"]) {
    assert.match(a, new RegExp(`\\n  ${id}: \\{`), `missing ${id}`);
  }
  assert.match(a, /內踝尖上三寸（約四橫指）/);
  assert.match(a, /腕橫紋上兩寸（約三橫指）/);
});

test("no 着 and no common simplified-only characters in site text", () => {
  const SIMPLIFIED = /[着这为们说么吗会经过门关气头脚络针疗医药应发实问题现让给还进动学习觉样简乐饮热凉卧涌]/;
  for (const f of SITE_TEXT) {
    const lines = read(f).split("\n");
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      assert.doesNotMatch(line, SIMPLIFIED, `${f}:${i + 1}: ${line.trim().slice(0, 80)}`);
    });
  }
});
